/**
 * MAHARASHTRA PUNJAB CONTAINER SERVICE
 * ADVANCED 3D MULTI-MODEL & HOLOGRAPHIC CONTAINER TRUCK ENGINE
 * 
 * Features:
 *  1. Model Mode A: 32-Foot Multi-Axle (MX Heavy High-Cube)
 *  2. Model Mode B: 32-Foot Single-Axle (SXL Agile Volume)
 *  3. Model Mode C: 32-Foot Cargo Cutaway (3D Interior Palletized Cargo Loading)
 *  4. Model Mode D: 3D Hologram HUD Scanner (Glowing Wireframe, Laser Scanlines, Floor Radar, 3D Hotspots)
 *  5. Full 360° Mouse/Touch Orbit, Pinch Zoom, Solid/Wireframe, Dimensions Callouts
 *  6. Retains Spline 3D Scene Loader support via @splinetool/viewer
 */

class MPCSHero3D {
  constructor() {
    this.canvas = document.getElementById("heroCanvas");
    this.splineContainer = document.getElementById("splineViewerContainer");
    this.stageStatus = document.getElementById("stageStatusText");
    this.splineActive = false;
    this.splineUrl = localStorage.getItem("mpcs_spline_url") || "";

    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Active 3D Model Mode: 'mx' | 'sxl' | 'cutaway' | 'hologram'
    this.activeModel = "mx";
    this.isHologram = false;

    // Camera & Orbit State
    this.rotY = -0.42;
    this.rotX = 0.22;
    this.targetRotY = -0.42;
    this.targetRotX = 0.22;
    this.zoom = 1.05;
    this.targetZoom = 1.05;
    this.autoRotate = true;
    this.showDimensions = true;
    this.renderStyle = "metallic"; // 'metallic' | 'wireframe'

    // Interaction
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.time = 0;
    this.scanProgress = 0;
    this.animationFrameId = null;

    // Particles & Hologram Matrix
    this.particles = [];
    this.initParticles(45);

    // Geometry Caches
    this.modelFaces = [];
    this.modelLines = [];
    this.pallets = [];
    this.hotspots = [];

    this.buildCurrentGeometry();
    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());

    // Mouse & Touch Orbit
    const stage = this.canvas.parentElement;
    if (stage) {
      stage.addEventListener("mousedown", (e) => this.onPointerDown(e.clientX, e.clientY));
      window.addEventListener("mousemove", (e) => this.onPointerMove(e.clientX, e.clientY));
      window.addEventListener("mouseup", () => this.onPointerUp());

      stage.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          this.onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener("touchmove", (e) => {
        if (this.isDragging && e.touches.length === 1) {
          this.onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener("touchend", () => this.onPointerUp());

      stage.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = Math.sign(e.deltaY) * -0.05;
        this.targetZoom = Math.max(0.65, Math.min(1.45, this.targetZoom + delta));
      }, { passive: false });
    }

    this.bindControls();

    if (this.splineUrl) {
      this.enableSplineMode(this.splineUrl);
    } else {
      this.startCanvasLoop();
    }
  }

  handleResize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : 800;
    this.height = parent ? parent.clientHeight : 560;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);
  }

  bindControls() {
    // Stage floating buttons
    const btnRotate = document.getElementById("btn3dRotate");
    const btnDims = document.getElementById("btn3dDims");
    const btnStyle = document.getElementById("btn3dStyle");
    const btnReset = document.getElementById("btn3dReset");

    if (btnRotate) {
      btnRotate.addEventListener("click", () => {
        this.autoRotate = !this.autoRotate;
        btnRotate.classList.toggle("active", this.autoRotate);
      });
    }

    if (btnDims) {
      btnDims.addEventListener("click", () => {
        this.showDimensions = !this.showDimensions;
        btnDims.classList.toggle("active", this.showDimensions);
      });
    }

    if (btnStyle) {
      btnStyle.addEventListener("click", () => {
        this.renderStyle = this.renderStyle === "metallic" ? "wireframe" : "metallic";
        btnStyle.innerText = this.renderStyle === "metallic" ? "Gold Solid" : "Blueprint Wire";
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        this.targetRotY = -0.42;
        this.targetRotX = 0.22;
        this.targetZoom = 1.05;
      });
    }

    // Model Selector Buttons (Tab buttons above/below stage)
    document.querySelectorAll(".model-switch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".model-switch-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const modelId = btn.getAttribute("data-model");
        this.switchModel(modelId);
      });
    });
  }

  switchModel(modelId) {
    this.activeModel = modelId;
    this.isHologram = (modelId === "hologram");

    if (this.stageStatus) {
      const titles = {
        mx: "32ft Multi-Axle High-Cube (18.5 MT)",
        sxl: "32ft Single-Axle SXL (8.5 MT Agile)",
        cutaway: "32ft Cargo Cutaway (18 Pallet Load)",
        hologram: "3D Hologram Telematics HUD & Laser Scanner"
      };
      this.stageStatus.innerText = `Active: ${titles[modelId] || "32ft Container Model"}`;
    }

    // Camera preset adjustments
    if (modelId === "cutaway") {
      this.targetRotY = -0.75;
      this.targetRotX = 0.32;
      this.targetZoom = 1.15;
    } else if (modelId === "hologram") {
      this.targetRotY = -0.55;
      this.targetRotX = 0.25;
      this.targetZoom = 1.1;
    }

    this.buildCurrentGeometry();
  }

  onPointerDown(x, y) {
    this.isDragging = true;
    this.lastMouseX = x;
    this.lastMouseY = y;
  }

  onPointerMove(x, y) {
    if (!this.isDragging) return;
    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;
    this.lastMouseX = x;
    this.lastMouseY = y;

    this.targetRotY += dx * 0.007;
    this.targetRotX = Math.max(-0.25, Math.min(0.68, this.targetRotX + dy * 0.005));
    this.autoRotate = false;
  }

  onPointerUp() {
    this.isDragging = false;
  }

  initParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 700,
        y: (Math.random() - 0.7) * 400,
        z: (Math.random() - 0.5) * 700,
        size: Math.random() * 2.2 + 0.8,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.4 ? "#D6AD59" : "#00ffcc"
      });
    }
  }

  /* ========================================================================
     GEOMETRY BUILDER: 32FT CONTAINER VARIANTS + PALLET CARGO CUTAWAY
     ======================================================================== */
  buildCurrentGeometry() {
    this.modelFaces = [];
    this.modelLines = [];
    this.pallets = [];
    this.hotspots = [];

    const isCutaway = (this.activeModel === "cutaway");
    const isSingleAxle = (this.activeModel === "sxl");
    const isMX = (this.activeModel === "mx" || this.activeModel === "hologram");

    // Colors
    const goldPrimary = this.isHologram ? "#00ffcc" : "#D6AD59";
    const goldAccent = this.isHologram ? "#55ffff" : "#F1D58F";
    const goldDark = this.isHologram ? "#008877" : "#8a6a28";
    const charcoalMatte = this.isHologram ? "rgba(0, 30, 35, 0.4)" : "#161616";
    const charcoalDeep = this.isHologram ? "rgba(0, 20, 25, 0.6)" : "#0d0d0d";

    // Helper: Add 3D Box
    const addBox = (x, y, z, w, h, d, faceColor, edgeColor, type = "normal", metadata = {}) => {
      const hw = w / 2;
      const hh = h / 2;
      const hd = d / 2;

      const v = [
        { x: x - hw, y: y - hh, z: z - hd }, // 0
        { x: x + hw, y: y - hh, z: z - hd }, // 1
        { x: x + hw, y: y + hh, z: z - hd }, // 2
        { x: x - hw, y: y + hh, z: z - hd }, // 3
        { x: x - hw, y: y - hh, z: z + hd }, // 4
        { x: x + hw, y: y - hh, z: z + hd }, // 5
        { x: x + hw, y: y + hh, z: z + hd }, // 6
        { x: x - hw, y: y + hh, z: z + hd }  // 7
      ];

      const faces = [
        { indices: [0, 1, 2, 3], color: faceColor, edgeColor, type, name: "front", metadata },
        { indices: [5, 4, 7, 6], color: faceColor, edgeColor, type, name: "back", metadata },
        { indices: [4, 0, 3, 7], color: faceColor, edgeColor, type, name: "left", metadata },
        { indices: [1, 5, 6, 2], color: faceColor, edgeColor, type, name: "right", metadata },
        { indices: [4, 5, 1, 0], color: faceColor, edgeColor, type, name: "top", metadata },
        { indices: [3, 2, 6, 7], color: "#0d0d0d", edgeColor, type, name: "bottom", metadata }
      ];

      faces.forEach(f => {
        this.modelFaces.push({
          vertices: f.indices.map(idx => v[idx]),
          color: f.color,
          edgeColor: f.edgeColor,
          type: f.type,
          name: f.name,
          metadata: f.metadata
        });
      });
    };

    // 1. CHASSIS MAIN I-BEAMS
    addBox(0, 32, 0, 390, 8, 48, charcoalDeep, goldDark, "chassis");

    // 2. THE 32-FOOT CONTAINER BODY
    // MX is High-Cube (Height 94), SXL is Standard (Height 84)
    const containerH = isSingleAxle ? 84 : 94;
    const containerY = isSingleAxle ? -14 : -19;

    if (isCutaway) {
      // CUTAWAY: Omit or make transparent the viewer-side flank so inside pallets are visible
      // Bottom floor
      addBox(-45, 28, 0, 280, 4, 78, "#252525", goldPrimary, "floor");
      // Back wall (passenger side)
      addBox(-45, containerY, -38, 280, containerH, 2, charcoalDeep, goldPrimary, "containerWall");
      // Front container bulkhead
      addBox(95, containerY, 0, 2, containerH, 78, charcoalDeep, goldPrimary, "containerFront");
      // Top roof rib rails
      addBox(-45, containerY - containerH/2, 0, 280, 2, 78, "rgba(214, 173, 89, 0.3)", goldPrimary, "roofCut");
      // Rear door frame
      addBox(-185, containerY, 0, 2, containerH, 78, charcoalDeep, goldPrimary, "rearDoorCut");

      // BUILD 18 CARGO PALLETS INSIDE 32-FT CONTAINER (2 rows of 9 pallets)
      for (let row = -1; row <= 1; row += 2) {
        for (let col = 0; col < 9; col++) {
          const px = -170 + col * 28 + 14;
          const pz = row * 20;
          const py = 16;
          // Wood Pallet Base
          addBox(px, py + 8, pz, 22, 4, 24, "#8b5a2b", "#d2a679", "palletWood");
          // Stacked Pharma / FMCG Cargo Boxes
          addBox(px, py - 6, pz, 20, 24, 22, (col % 2 === 0 ? "#D6AD59" : "#e8c988"), "#ffffff", "palletCargo", {
            isCargo: true,
            label: `PLT-${col+1}`
          });
        }
      }
    } else {
      // FULL SOLID CONTAINER
      addBox(-45, containerY, 0, 280, containerH, 78, charcoalMatte, goldPrimary, "container", {
        isContainer: true,
        hasText: true,
        hasCorrugation: true
      });

      // Top edge gold rail
      addBox(-45, containerY - containerH/2 - 2, 0, 284, 4, 82, goldPrimary, goldAccent, "goldRail");
      // Bottom sill
      addBox(-45, 29, 0, 284, 4, 82, goldDark, goldPrimary, "goldRail");
      // Rear Double Doors & Lock Bars
      addBox(-186, containerY, 0, 4, containerH - 2, 76, charcoalDeep, goldPrimary, "rearDoor");
    }

    // 3. TRACTOR CABIN
    addBox(140, -4, 0, 92, 66, 74, charcoalMatte, goldPrimary, "cabMain");
    addBox(126, -42, 0, 68, 18, 68, charcoalDeep, goldPrimary, "roofFairing");
    addBox(168, -12, 0, 18, 30, 64, (this.isHologram ? "rgba(0, 255, 204, 0.3)" : "#222a36"), goldAccent, "windshield");
    addBox(187, 8, 0, 4, 30, 52, goldPrimary, goldAccent, "frontGrille");
    addBox(187, 26, 0, 8, 14, 76, goldDark, goldPrimary, "bumper");

    // Under-chassis equipment
    addBox(55, 34, 32, 48, 18, 18, goldDark, goldPrimary, "fuelTank");
    addBox(55, 34, -32, 48, 18, 18, charcoalMatte, goldDark, "batteryBox");
    addBox(-45, 36, 36, 120, 6, 4, goldPrimary, goldAccent, "sideGuard");
    addBox(-45, 36, -36, 120, 6, 4, goldPrimary, goldAccent, "sideGuard");

    // 4. WHEEL CONFIGURATION
    const addWheel = (wx, wy, wz, radius, width) => {
      this.modelLines.push({ type: "wheel", cx: wx, cy: wy, cz: wz, radius, width });
    };

    // Front Steer Axle (Both models)
    addWheel(152, 38, 36, 17, 8);
    addWheel(152, 38, -36, 17, 8);

    if (isSingleAxle) {
      // 32ft SXL: Single Rear Axle (6 wheels total)
      addWheel(-135, 38, 36, 17, 10);
      addWheel(-135, 38, -36, 17, 10);
    } else {
      // 32ft MX / Hologram: Tandem Dual Rear Axles (10 wheels total)
      addWheel(-115, 38, 36, 17, 10);
      addWheel(-115, 38, -36, 17, 10);
      addWheel(-155, 38, 36, 17, 10);
      addWheel(-155, 38, -36, 17, 10);
    }

    // 5. 3D HOTSPOT ANNOTATION BEACONS (For Hologram & Interactive views)
    this.hotspots = [
      {
        pos: { x: 160, y: -45, z: 20 },
        tag: "GPS HUD",
        title: "Satellite Telematics Active",
        desc: "Instant location ping, speed telematics & geofence logging"
      },
      {
        pos: { x: -45, y: -65, z: 38 },
        tag: "32-FT SPECS",
        title: "Weatherproof Steel Shell",
        desc: "100% moisture sealed, corrugated industrial wall"
      },
      {
        pos: { x: -188, y: -10, z: 0 },
        tag: "E-LOCK",
        title: "Tamper-Proof Lock Bar",
        desc: "Reinforced vertical steel rods with digital seal"
      },
      {
        pos: { x: -135, y: 46, z: 38 },
        tag: "BOGIE",
        title: isSingleAxle ? "Single Rear Axle (8.5 MT)" : "Tandem Multi-Axle (18.5 MT)",
        desc: "High stability suspension for long-haul routes"
      }
    ];
  }

  // 3D Isometric / Perspective Projection Helper
  project(p, rotY, rotX, scale, cx, cy) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y2 = p.y * cosX - z1 * sinX;
    const z2 = p.y * sinX + z1 * cosX;

    const fov = 750;
    const dist = 650;
    const factor = fov / (dist + z2);

    return {
      x: cx + x1 * factor * scale,
      y: cy + y2 * factor * scale,
      z: z2,
      depth: factor
    };
  }

  /* ========================================================================
     ANIMATION & RENDER LOOP
     ======================================================================== */
  startCanvasLoop() {
    const render = () => {
      this.time += 0.016;
      this.scanProgress = (this.scanProgress + 0.008) % 1; // 0 to 1 scan cycle

      if (this.autoRotate) {
        this.targetRotY += 0.0035;
      }
      this.rotY += (this.targetRotY - this.rotY) * 0.08;
      this.rotX += (this.targetRotX - this.rotX) * 0.08;
      this.zoom += (this.targetZoom - this.zoom) * 0.08;

      this.drawScene();
      this.animationFrameId = requestAnimationFrame(render);
    };

    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(render);
  }

  drawScene() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2 + 30;
    const scale = this.zoom * (this.width < 600 ? 0.72 : 1.0);

    // 1. Ambient Background Glow
    this.drawBackgroundGlow(ctx, cx, cy);

    // 2. Ground Grid or Holographic Concentric Radar Rings
    if (this.isHologram) {
      this.drawHologramRadar(ctx, cx, cy, scale);
    } else {
      this.drawGroundGrid(ctx, cx, cy, scale);
    }

    // 3. Floating Particles (Gold / Hologram Cyan)
    this.drawParticles(ctx, cx, cy, scale);

    // 4. Sort and Cull Faces
    const renderedFaces = [];
    this.modelFaces.forEach(face => {
      const projVerts = face.vertices.map(v => this.project(v, this.rotY, this.rotX, scale, cx, cy));

      const v0 = projVerts[0];
      const v1 = projVerts[1];
      const v2 = projVerts[2];
      const cross = (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x);

      // Back-face culling or draw transparent if cutaway/hologram
      if (cross > 0 || this.isHologram || face.metadata?.isCargo) {
        let avgZ = 0;
        projVerts.forEach(pv => avgZ += pv.z);
        avgZ /= projVerts.length;

        renderedFaces.push({ projVerts, face, avgZ, cross });
      }
    });

    // Painter's sort back-to-front
    renderedFaces.sort((a, b) => b.avgZ - a.avgZ);

    // 5. Headlight Beams (Forward +X)
    if (!this.isHologram) {
      this.drawHeadlightBeams(ctx, cx, cy, scale);
    }

    // 6. Render All Faces
    renderedFaces.forEach(rf => {
      this.drawPolygon(ctx, rf);
    });

    // 7. Render Wheels
    this.drawWheels(ctx, cx, cy, scale);

    // 8. Holographic Laser Scanning Plane
    if (this.isHologram) {
      this.drawHologramScanner(ctx, cx, cy, scale);
    }

    // 9. Hotspot Pins (Hologram or Dimension Mode)
    if (this.isHologram) {
      this.drawHologramHotspots(ctx, cx, cy, scale);
    } else if (this.showDimensions) {
      this.drawDimensionCallouts(ctx, cx, cy, scale);
    }
  }

  drawBackgroundGlow(ctx, cx, cy) {
    const glow = ctx.createRadialGradient(cx, cy - 20, 10, cx, cy, Math.max(this.width, this.height) * 0.6);
    if (this.isHologram) {
      glow.addColorStop(0, "rgba(0, 255, 204, 0.14)");
      glow.addColorStop(0.4, "rgba(11, 28, 32, 0.5)");
      glow.addColorStop(1, "rgba(11, 11, 11, 0)");
    } else {
      glow.addColorStop(0, "rgba(214, 173, 89, 0.09)");
      glow.addColorStop(0.5, "rgba(23, 23, 23, 0.4)");
      glow.addColorStop(1, "rgba(11, 11, 11, 0)");
    }
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGroundGrid(ctx, cx, cy, scale) {
    ctx.save();
    ctx.lineWidth = 1;
    const gridSize = 380;
    const step = 45;
    const groundY = 56;

    for (let x = -gridSize; x <= gridSize; x += step) {
      const p1 = this.project({ x, y: groundY, z: -gridSize }, this.rotY, this.rotX, scale, cx, cy);
      const p2 = this.project({ x, y: groundY, z: gridSize }, this.rotY, this.rotX, scale, cx, cy);
      const alpha = Math.max(0.03, 0.18 - Math.abs(x) / (gridSize * 1.5));
      ctx.strokeStyle = `rgba(214, 173, 89, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    for (let z = -gridSize; z <= gridSize; z += step) {
      const p1 = this.project({ x: -gridSize, y: groundY, z }, this.rotY, this.rotX, scale, cx, cy);
      const p2 = this.project({ x: gridSize, y: groundY, z }, this.rotY, this.rotX, scale, cx, cy);
      const alpha = Math.max(0.03, 0.18 - Math.abs(z) / (gridSize * 1.5));
      ctx.strokeStyle = `rgba(214, 173, 89, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawHologramRadar(ctx, cx, cy, scale) {
    ctx.save();
    const groundY = 56;
    const rings = [60, 140, 240, 340];

    rings.forEach((rad, idx) => {
      ctx.beginPath();
      const segments = 36;
      for (let i = 0; i <= segments; i++) {
        const ang = (i / segments) * Math.PI * 2 + (this.time * (idx % 2 === 0 ? 0.3 : -0.2));
        const px = Math.cos(ang) * rad;
        const pz = Math.sin(ang) * rad;
        const p = this.project({ x: px, y: groundY, z: pz }, this.rotY, this.rotX, scale, cx, cy);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = idx === 2 ? "rgba(0, 255, 204, 0.4)" : "rgba(214, 173, 89, 0.25)";
      ctx.lineWidth = idx === 2 ? 1.5 : 1;
      if (idx === 1) ctx.setLineDash([6, 6]);
      else ctx.setLineDash([]);
      ctx.stroke();
    });

    // Holographic radar cross-hairs
    const pN = this.project({ x: 0, y: groundY, z: -350 }, this.rotY, this.rotX, scale, cx, cy);
    const pS = this.project({ x: 0, y: groundY, z: 350 }, this.rotY, this.rotX, scale, cx, cy);
    const pW = this.project({ x: -350, y: groundY, z: 0 }, this.rotY, this.rotX, scale, cx, cy);
    const pE = this.project({ x: 350, y: groundY, z: 0 }, this.rotY, this.rotX, scale, cx, cy);

    ctx.strokeStyle = "rgba(0, 255, 204, 0.2)";
    ctx.beginPath();
    ctx.moveTo(pN.x, pN.y); ctx.lineTo(pS.x, pS.y);
    ctx.moveTo(pW.x, pW.y); ctx.lineTo(pE.x, pE.y);
    ctx.stroke();

    ctx.restore();
  }

  drawHeadlightBeams(ctx, cx, cy, scale) {
    const leftLight = this.project({ x: 191, y: 26, z: -28 }, this.rotY, this.rotX, scale, cx, cy);
    const rightLight = this.project({ x: 191, y: 26, z: 28 }, this.rotY, this.rotX, scale, cx, cy);
    const beamEndL = this.project({ x: 380, y: 55, z: -60 }, this.rotY, this.rotX, scale, cx, cy);
    const beamEndR = this.project({ x: 380, y: 55, z: 60 }, this.rotY, this.rotX, scale, cx, cy);

    ctx.save();
    const beamGrad = ctx.createRadialGradient(
      (leftLight.x + rightLight.x) / 2, (leftLight.y + rightLight.y) / 2, 5,
      (beamEndL.x + beamEndR.x) / 2, (beamEndL.y + beamEndR.y) / 2, 180
    );
    beamGrad.addColorStop(0, "rgba(241, 213, 143, 0.35)");
    beamGrad.addColorStop(0.4, "rgba(214, 173, 89, 0.12)");
    beamGrad.addColorStop(1, "rgba(214, 173, 89, 0)");

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(leftLight.x, leftLight.y);
    ctx.lineTo(beamEndL.x, beamEndL.y);
    ctx.lineTo(beamEndR.x, beamEndR.y);
    ctx.lineTo(rightLight.x, rightLight.y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawParticles(ctx, cx, cy, scale) {
    ctx.save();
    this.particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -230) p.y = 80;

      const proj = this.project(p, this.rotY, this.rotX, scale, cx, cy);
      if (proj.depth > 0) {
        ctx.fillStyle = this.isHologram ? `rgba(0, 255, 204, ${p.opacity * 0.8})` : `rgba(241, 213, 143, ${p.opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.depth * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  drawPolygon(ctx, rf) {
    const { projVerts, face } = rf;
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(projVerts[0].x, projVerts[0].y);
    for (let i = 1; i < projVerts.length; i++) {
      ctx.lineTo(projVerts[i].x, projVerts[i].y);
    }
    ctx.closePath();

    if (this.isHologram) {
      // 3D HOLOGRAM SHADING: Glowing translucent neon cyan & gold
      ctx.fillStyle = "rgba(0, 45, 50, 0.25)";
      ctx.fill();
      ctx.strokeStyle = face.type === "container" ? "#00ffcc" : "#D6AD59";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (face.name === "left" || face.name === "right") {
        this.drawHologramMeshLines(ctx, projVerts);
      }
    } else if (this.renderStyle === "metallic") {
      let baseColor = face.color;

      if (face.type === "container") {
        if (face.name === "left" || face.name === "right") {
          const grad = ctx.createLinearGradient(projVerts[0].x, projVerts[0].y, projVerts[2].x, projVerts[2].y);
          grad.addColorStop(0, "#1d1d1d");
          grad.addColorStop(0.5, "#141414");
          grad.addColorStop(1, "#0d0d0d");
          ctx.fillStyle = grad;
          ctx.fill();

          this.drawCorrugatedRibs(ctx, projVerts);
          this.drawContainerBranding(ctx, projVerts);
        } else if (face.name === "top") {
          ctx.fillStyle = "#1e1e1e";
          ctx.fill();
        } else {
          ctx.fillStyle = "#111111";
          ctx.fill();
        }
      } else if (face.metadata?.isCargo) {
        // Pallet Cargo Boxes in Cutaway View
        ctx.fillStyle = face.color;
        ctx.fill();
      } else if (face.type === "roofFairing" || face.type === "cabMain") {
        const cabGrad = ctx.createLinearGradient(projVerts[0].x, projVerts[0].y, projVerts[2].x, projVerts[2].y);
        cabGrad.addColorStop(0, "#242424");
        cabGrad.addColorStop(1, "#121212");
        ctx.fillStyle = cabGrad;
        ctx.fill();
      } else if (face.type === "windshield") {
        const winGrad = ctx.createLinearGradient(projVerts[0].x, projVerts[0].y, projVerts[2].x, projVerts[2].y);
        winGrad.addColorStop(0, "rgba(40, 52, 68, 0.95)");
        winGrad.addColorStop(1, "rgba(15, 20, 28, 0.98)");
        ctx.fillStyle = winGrad;
        ctx.fill();
      } else if (face.type === "goldRail" || face.type === "frontGrille") {
        const goldGrad = ctx.createLinearGradient(projVerts[0].x, projVerts[0].y, projVerts[1].x, projVerts[1].y);
        goldGrad.addColorStop(0, "#D6AD59");
        goldGrad.addColorStop(0.5, "#F1D58F");
        goldGrad.addColorStop(1, "#9B7A2F");
        ctx.fillStyle = goldGrad;
        ctx.fill();
      } else {
        ctx.fillStyle = baseColor;
        ctx.fill();
      }

      ctx.strokeStyle = face.edgeColor || "rgba(214, 173, 89, 0.4)";
      ctx.lineWidth = face.type === "container" ? 1.4 : 1;
      ctx.stroke();
    } else {
      // Wireframe Mode
      ctx.fillStyle = "rgba(11, 11, 11, 0.85)";
      ctx.fill();
      ctx.strokeStyle = face.edgeColor || "#D6AD59";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    ctx.restore();
  }

  drawHologramMeshLines(ctx, projVerts) {
    const pTL = projVerts[0];
    const pTR = projVerts[1];
    const pBR = projVerts[2];
    const pBL = projVerts[3];

    ctx.save();
    ctx.strokeStyle = "rgba(0, 255, 204, 0.25)";
    ctx.lineWidth = 1;

    // Vertical scan ribs
    for (let i = 1; i < 20; i++) {
      const t = i / 20;
      const tx = pTL.x + (pTR.x - pTL.x) * t;
      const ty = pTL.y + (pTR.y - pTL.y) * t;
      const bx = pBL.x + (pBR.x - pBL.x) * t;
      const by = pBL.y + (pBR.y - pBL.y) * t;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    // Horizontal mesh lines
    for (let j = 1; j < 5; j++) {
      const u = j / 5;
      const lx = pTL.x + (pBL.x - pTL.x) * u;
      const ly = pTL.y + (pBL.y - pTL.y) * u;
      const rx = pTR.x + (pBR.x - pTR.x) * u;
      const ry = pTR.y + (pBR.y - pTR.y) * u;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(rx, ry);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawCorrugatedRibs(ctx, projVerts) {
    const pTopLeft = projVerts[0];
    const pTopRight = projVerts[1];
    const pBotRight = projVerts[2];
    const pBotLeft = projVerts[3];

    ctx.save();
    ctx.strokeStyle = "rgba(214, 173, 89, 0.16)";
    ctx.lineWidth = 1;

    const ribCount = 22;
    for (let i = 1; i < ribCount; i++) {
      const t = i / ribCount;
      const tx = pTopLeft.x + (pTopRight.x - pTopLeft.x) * t;
      const ty = pTopLeft.y + (pTopRight.y - pTopLeft.y) * t;
      const bx = pBotLeft.x + (pBotRight.x - pBotLeft.x) * t;
      const by = pBotLeft.y + (pBotRight.y - pBotLeft.y) * t;

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawContainerBranding(ctx, projVerts) {
    const pTopLeft = projVerts[0];
    const pTopRight = projVerts[1];

    const midX = (pTopLeft.x + pTopRight.x) / 2;
    const midY = (pTopLeft.y + pTopRight.y) / 2 + 18;
    const angle = Math.atan2(pTopRight.y - pTopLeft.y, pTopRight.x - pTopLeft.x);
    const span = Math.hypot(pTopRight.x - pTopLeft.x, pTopRight.y - pTopLeft.y);

    if (span > 120) {
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(angle);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#F1D58F";
      ctx.font = `bold ${Math.max(9, Math.floor(span * 0.045))}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText("MAHARASHTRA PUNJAB", 0, -6);

      ctx.fillStyle = "rgba(214, 173, 89, 0.85)";
      ctx.font = `600 ${Math.max(7, Math.floor(span * 0.032))}px "JetBrains Mono", monospace`;
      ctx.fillText("32-FT HIGH-CUBE CONTAINER • DEHRADUN - MUMBAI", 0, 10);
      ctx.restore();
    }
  }

  drawWheels(ctx, cx, cy, scale) {
    this.modelLines.filter(l => l.type === "wheel").forEach(w => {
      const center = this.project({ x: w.cx, y: w.cy, z: w.cz }, this.rotY, this.rotX, scale, cx, cy);
      const rad = w.radius * center.depth * scale;

      ctx.save();
      if (this.isHologram) {
        ctx.fillStyle = "rgba(0, 30, 35, 0.8)";
        ctx.strokeStyle = "#00ffcc";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "#F1D58F";
        ctx.beginPath();
        ctx.arc(center.x, center.y, rad * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = "#0a0a0a";
        ctx.strokeStyle = "#D6AD59";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const rimRad = rad * 0.55;
        const hubGrad = ctx.createRadialGradient(center.x, center.y, 1, center.x, center.y, rimRad);
        hubGrad.addColorStop(0, "#F1D58F");
        hubGrad.addColorStop(0.7, "#D6AD59");
        hubGrad.addColorStop(1, "#5c4314");
        ctx.fillStyle = hubGrad;
        ctx.beginPath();
        ctx.arc(center.x, center.y, rimRad, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#F1D58F";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  /* ========================================================================
     HOLOGRAM LASER SCANNER PLANE & 3D HOTSPOT BEACONS
     ======================================================================== */
  drawHologramScanner(ctx, cx, cy, scale) {
    // Scan line moves between -185 and +95 (along 32ft container length)
    const scanX = -185 + this.scanProgress * 280;

    const pTopL = this.project({ x: scanX, y: -65, z: -40 }, this.rotY, this.rotX, scale, cx, cy);
    const pTopR = this.project({ x: scanX, y: -65, z: 40 }, this.rotY, this.rotX, scale, cx, cy);
    const pBotR = this.project({ x: scanX, y: 35, z: 40 }, this.rotY, this.rotX, scale, cx, cy);
    const pBotL = this.project({ x: scanX, y: 35, z: -40 }, this.rotY, this.rotX, scale, cx, cy);

    ctx.save();
    // Laser scanning slice
    const scanGrad = ctx.createLinearGradient(pTopL.x, pTopL.y, pBotL.x, pBotL.y);
    scanGrad.addColorStop(0, "rgba(0, 255, 204, 0.45)");
    scanGrad.addColorStop(0.5, "rgba(241, 213, 143, 0.75)");
    scanGrad.addColorStop(1, "rgba(0, 255, 204, 0.1)");

    ctx.fillStyle = scanGrad;
    ctx.beginPath();
    ctx.moveTo(pTopL.x, pTopL.y);
    ctx.lineTo(pTopR.x, pTopR.y);
    ctx.lineTo(pBotR.x, pBotR.y);
    ctx.lineTo(pBotL.x, pBotL.y);
    ctx.closePath();
    ctx.fill();

    // Glowing laser beam edge
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00ffcc";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(pTopR.x, pTopR.y);
    ctx.lineTo(pBotR.x, pBotR.y);
    ctx.stroke();

    ctx.restore();
  }

  drawHologramHotspots(ctx, cx, cy, scale) {
    ctx.save();
    this.hotspots.forEach((hs, idx) => {
      const p = this.project(hs.pos, this.rotY, this.rotX, scale, cx, cy);

      // Pulsing hotspot ring
      const pulse = Math.sin(this.time * 3 + idx) * 3;
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8 + pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#F1D58F";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Connecting lead line
      const badgeX = p.x + (hs.pos.x > 0 ? 35 : -35);
      const badgeY = p.y - 30;

      ctx.strokeStyle = "rgba(0, 255, 204, 0.6)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(badgeX, badgeY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Floating Badge Box
      const textW = Math.max(120, ctx.measureText(hs.title).width + 20);
      const boxLeft = hs.pos.x > 0 ? badgeX : badgeX - textW;

      ctx.fillStyle = "rgba(10, 22, 26, 0.9)";
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 1;
      this.roundRect(ctx, boxLeft, badgeY - 14, textW, 36, 4, true, true);

      // Tag & Title
      ctx.fillStyle = "#00ffcc";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`[${hs.tag}]`, boxLeft + 6, badgeY);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(hs.title, boxLeft + 6, badgeY + 14);
    });
    ctx.restore();
  }

  drawDimensionCallouts(ctx, cx, cy, scale) {
    const pFront = this.project({ x: 95, y: 50, z: 44 }, this.rotY, this.rotX, scale, cx, cy);
    const pRear = this.project({ x: -185, y: 50, z: 44 }, this.rotY, this.rotX, scale, cx, cy);

    ctx.save();
    ctx.strokeStyle = "rgba(241, 213, 143, 0.75)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(pFront.x, pFront.y);
    ctx.lineTo(pRear.x, pRear.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const midX = (pFront.x + pRear.x) / 2;
    const midY = (pFront.y + pRear.y) / 2 + 16;

    ctx.fillStyle = "rgba(18, 18, 18, 0.9)";
    ctx.strokeStyle = "#D6AD59";
    ctx.lineWidth = 1;
    this.roundRect(ctx, midX - 60, midY - 12, 120, 24, 6, true, true);

    ctx.fillStyle = "#F1D58F";
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LENGTH: 32 FT", midX, midY);

    // Height callout
    const pTopRear = this.project({ x: -185, y: -60, z: 44 }, this.rotY, this.rotX, scale, cx, cy);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(241, 213, 143, 0.5)";
    ctx.beginPath();
    ctx.moveTo(pRear.x - 15, pRear.y);
    ctx.lineTo(pTopRear.x - 15, pTopRear.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const hMidX = (pRear.x + pTopRear.x) / 2 - 25;
    const hMidY = (pRear.y + pTopRear.y) / 2;
    ctx.fillStyle = "rgba(18, 18, 18, 0.9)";
    ctx.strokeStyle = "#D6AD59";
    this.roundRect(ctx, hMidX - 44, hMidY - 11, 88, 22, 5, true, true);

    ctx.fillStyle = "#F1D58F";
    ctx.font = "bold 9px 'JetBrains Mono', monospace";
    ctx.fillText(this.activeModel === "sxl" ? "HT: 8.5 FT STD" : "HT: 9.5 FT HIGH CUBE", hMidX, hMidY);
    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  /* Spline 3D Integration */
  enableSplineMode(url) {
    if (!this.splineContainer || !url) return;
    this.splineActive = true;
    this.splineUrl = url;
    localStorage.setItem("mpcs_spline_url", url);

    if (this.canvas) this.canvas.style.display = "none";
    this.splineContainer.style.display = "block";
    this.splineContainer.innerHTML = `<spline-viewer url="${url}" style="width: 100%; height: 100%;"></spline-viewer>`;

    if (!document.getElementById("splineScript")) {
      const script = document.createElement("script");
      script.id = "splineScript";
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js";
      document.head.appendChild(script);
    }

    if (this.stageStatus) {
      this.stageStatus.innerText = "Active: External Spline 3D Scene";
    }
  }

  disableSplineMode() {
    this.splineActive = false;
    this.splineUrl = "";
    localStorage.removeItem("mpcs_spline_url");

    if (this.splineContainer) {
      this.splineContainer.style.display = "none";
      this.splineContainer.innerHTML = "";
    }
    if (this.canvas) {
      this.canvas.style.display = "block";
      this.handleResize();
    }
    if (this.stageStatus) {
      this.stageStatus.innerText = "3D Engine: 32ft Golden Container Engine";
    }
    this.startCanvasLoop();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.hero3DEngine = new MPCSHero3D();
});
