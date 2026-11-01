/**
 * MAHARASHTRA PUNJAB CONTAINER SERVICE
 * Master Client-Side Application Controller
 * Features:
 * - Bilingual Switcher (English & Hindi)
 * - Dynamic Quotation Request & WhatsApp Message Builder
 * - Live GPS Consignment Tracker & Checkpoint Telematics
 * - Interactive Corridor Explorer & Southern Route Boundary Filter
 * - 32-Foot Container Technical Specification Explorer
 * - Truck Owner Fleet Attachment System
 * - Modals, Toasts & Contact Hotline Triggers
 */

const MPCS = window.MPCS_DATA || {};

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSystem();
  initHeaderScroll();
  initMobileNav();
  initContainerSpecTabs();
  initCorridorExplorer();
  initTrackingSystem();
  initQuotationEngine();
  initTruckOwnerModal();
  initSplineModal();
  initSampleTrackPills();
  initGallerySystem();
});

/* ==========================================================================
   1. BILINGUAL LANGUAGE ENGINE (English & Hindi)
   ========================================================================== */
let currentLang = localStorage.getItem("mpcs_language") || "en";

function initLanguageSystem() {
  const btnEn = document.getElementById("langBtnEn");
  const btnHi = document.getElementById("langBtnHi");

  if (btnEn) {
    btnEn.addEventListener("click", () => setLanguage("en"));
  }
  if (btnHi) {
    btnHi.addEventListener("click", () => setLanguage("hi"));
  }

  // Apply current language
  applyLanguage(currentLang);
}

function setLanguage(lang) {
  if (lang !== "en" && lang !== "hi") return;
  currentLang = lang;
  localStorage.setItem("mpcs_language", lang);
  applyLanguage(lang);
  showToast(lang === "hi" ? "भाषा बदलकर हिंदी कर दी गई है" : "Language set to English");
}

function applyLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);

  // Update button active state
  const btnEn = document.getElementById("langBtnEn");
  const btnHi = document.getElementById("langBtnHi");
  if (btnEn && btnHi) {
    btnEn.classList.toggle("active", lang === "en");
    btnHi.classList.toggle("active", lang === "hi");
  }

  const dict = MPCS.translations ? MPCS.translations[lang] : null;
  if (!dict) return;

  // Replace text in elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  // Replace placeholders in inputs with data-i18n-ph attribute
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Update document title
  if (dict.siteTitle) {
    document.title = dict.siteTitle;
  }
}

/* ==========================================================================
   2. NAVBAR, SCROLL BEHAVIOR & MOBILE DRAWER
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById("mobileNavToggle");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !mobileDrawer) return;

  const toggle = () => {
    const isOpen = mobileDrawer.classList.toggle("active");
    toggleBtn.setAttribute("aria-expanded", isOpen.toString());
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  toggleBtn.addEventListener("click", toggle);

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileDrawer.classList.remove("active");
      document.body.style.overflow = "";
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   3. 32-FOOT CONTAINER TECHNICAL SPECIFICATION TABS
   ========================================================================== */
function initContainerSpecTabs() {
  const tabButtons = document.querySelectorAll(".container-spec-tab-btn");
  const specDisplayArea = document.getElementById("containerSpecDisplay");

  if (!tabButtons.length || !specDisplayArea) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const specId = btn.getAttribute("data-spec-id");
      renderContainerSpec(specId);
    });
  });

  // Initial render with first container
  renderContainerSpec("32ft-single-axle");
}

function renderContainerSpec(specId) {
  const container = MPCS.containers?.find(c => c.id === specId);
  const display = document.getElementById("containerSpecDisplay");
  if (!container || !display) return;

  const isHindi = currentLang === "hi";

  display.innerHTML = `
    <div class="spec-card-grid">
      <div class="spec-visual-pane">
        <div class="spec-badge-pill">${isHindi ? container.badgeHindi : container.badge}</div>
        <h3 class="spec-title">${isHindi ? container.nameHindi : container.name}</h3>
        <p class="spec-ideal-text"><strong>${isHindi ? "उपयुक्त कार्गो:" : "Ideal For:"}</strong> ${isHindi ? container.idealForHindi : container.idealFor}</p>

        <!-- Container Blueprint Vector -->
        <div class="blueprint-vector-wrap">
          <svg viewBox="0 0 600 240" class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#D6AD59"/>
                <stop offset="50%" stop-color="#F1D58F"/>
                <stop offset="100%" stop-color="#9B7A2F"/>
              </linearGradient>
              <pattern id="corrugationPattern" width="16" height="100" patternUnits="userSpaceOnUse">
                <line x1="8" y1="0" x2="8" y2="100" stroke="#D6AD59" stroke-opacity="0.18" stroke-width="1.2"/>
              </pattern>
            </defs>

            <!-- Ground line -->
            <line x1="20" y1="210" x2="580" y2="210" stroke="#333333" stroke-width="1.5" stroke-dasharray="6,4"/>

            <!-- Dimension dimension arrows -->
            <line x1="40" y1="225" x2="520" y2="225" stroke="#F1D58F" stroke-width="1"/>
            <polygon points="40,225 48,221 48,229" fill="#F1D58F"/>
            <polygon points="520,225 512,221 512,229" fill="#F1D58F"/>
            <text x="280" y="238" fill="#F1D58F" font-size="11" font-family="'JetBrains Mono', monospace" text-anchor="middle">32 FEET OVERALL CONTAINER LENGTH (9.75 M)</text>

            <!-- Chassis Frame -->
            <rect x="50" y="160" width="480" height="14" rx="2" fill="#141414" stroke="url(#goldStrokeGrad)" stroke-width="1.2"/>

            <!-- 32-Foot Corrugated Container Body -->
            <rect x="50" y="45" width="370" height="115" rx="3" fill="#181818" stroke="url(#goldStrokeGrad)" stroke-width="1.8"/>
            <rect x="50" y="45" width="370" height="115" rx="3" fill="url(#corrugationPattern)"/>

            <!-- Container Corner Castings -->
            <rect x="50" y="45" width="10" height="10" fill="#D6AD59"/>
            <rect x="410" y="45" width="10" height="10" fill="#D6AD59"/>
            <rect x="50" y="150" width="10" height="10" fill="#D6AD59"/>
            <rect x="410" y="150" width="10" height="10" fill="#D6AD59"/>

            <!-- Rear Door Rods & Lock -->
            <line x1="62" y1="45" x2="62" y2="160" stroke="#F1D58F" stroke-width="2"/>
            <line x1="72" y1="45" x2="72" y2="160" stroke="#F1D58F" stroke-width="2"/>
            <rect x="58" y="100" width="18" height="8" rx="2" fill="#D6AD59"/>

            <!-- Side Branding on Blueprint -->
            <text x="235" y="98" fill="#F1D58F" font-size="14" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle" letter-spacing="1">MAHARASHTRA PUNJAB</text>
            <text x="235" y="118" fill="#D6AD59" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="middle">32 FT CONTAINER SERVICE • DEHRADUN - MUMBAI</text>

            <!-- Cab Outline -->
            <path d="M420,160 L420,80 L465,80 L495,120 L530,120 L530,174 L420,174 Z" fill="#1a1a1a" stroke="url(#goldStrokeGrad)" stroke-width="1.5"/>
            <!-- Windshield -->
            <polygon points="467,84 492,118 450,118 450,84" fill="#2c3848" stroke="#D6AD59" stroke-width="1"/>
            <!-- Headlights -->
            <rect x="525" y="145" width="5" height="12" fill="#F1D58F"/>

            <!-- Wheels -->
            <!-- Front Steer Wheel -->
            <circle cx="495" cy="188" r="22" fill="#0c0c0c" stroke="#D6AD59" stroke-width="1.8"/>
            <circle cx="495" cy="188" r="9" fill="#D6AD59"/>

            <!-- Rear Wheel Set (${container.id === '32ft-single-axle' ? 'Single Axle' : 'Multi-Axle Tandem'}) -->
            ${container.id === '32ft-single-axle' ? `
              <circle cx="120" cy="188" r="22" fill="#0c0c0c" stroke="#D6AD59" stroke-width="1.8"/>
              <circle cx="120" cy="188" r="9" fill="#D6AD59"/>
            ` : `
              <circle cx="105" cy="188" r="22" fill="#0c0c0c" stroke="#D6AD59" stroke-width="1.8"/>
              <circle cx="105" cy="188" r="9" fill="#D6AD59"/>
              <circle cx="155" cy="188" r="22" fill="#0c0c0c" stroke="#D6AD59" stroke-width="1.8"/>
              <circle cx="155" cy="188" r="9" fill="#D6AD59"/>
            `}
          </svg>
        </div>

        <div class="spec-action-row">
          <button class="btn btn-primary btn-sm" onclick="prefillQuoteContainer('${container.id}')">
            ${isHindi ? "इस 32-फ़ीट कंटेनर के लिए कोटेशन लें" : "Book This 32ft Container"}
          </button>
          <a href="tel:${MPCS.company.contact.primaryPhone}" class="btn btn-secondary btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            ${isHindi ? "कॉल से जानकारी लें" : "Call Dispatch Desk"}
          </a>
        </div>
      </div>

      <div class="spec-technical-table-wrap">
        <h4 class="table-heading">${isHindi ? "तकनीकी विनिर्देश (Specifications)" : "Institutional Technical Specs"}</h4>
        <table class="spec-table">
          <tbody>
            <tr>
              <td>${isHindi ? "पे-लोड क्षमता (Payload Weight)" : "Rated Payload Weight"}</td>
              <td class="val-highlight">${container.payloadWeight}</td>
            </tr>
            <tr>
              <td>${isHindi ? "आयतन क्षमता (Cubic Volume)" : "Interior Cubic Capacity"}</td>
              <td class="val-highlight">${container.payloadVolume}</td>
            </tr>
            <tr>
              <td>${isHindi ? "कंटेनर लंबाई (Length)" : "Container Exterior Length"}</td>
              <td>${container.length}</td>
            </tr>
            <tr>
              <td>${isHindi ? "कंटेनर चौड़ाई (Width)" : "Container Exterior Width"}</td>
              <td>${container.width}</td>
            </tr>
            <tr>
              <td>${isHindi ? "कंटेनर ऊँचाई (Height)" : "Container Exterior Height"}</td>
              <td>${container.height}</td>
            </tr>
            <tr>
              <td>${isHindi ? "एक्सल संरचना (Axle Configuration)" : "Axle Configuration"}</td>
              <td>${container.axleType}</td>
            </tr>
            <tr>
              <td>${isHindi ? "पैलेट क्षमता (Pallet Capacity)" : "Pallet Placement Capacity"}</td>
              <td>${container.palletCapacity}</td>
            </tr>
            <tr>
              <td>${isHindi ? "बॉडी निर्माण (Body Material)" : "Body Shell Material"}</td>
              <td>${container.bodyMaterial}</td>
            </tr>
            <tr>
              <td>${isHindi ? "लॉकिंग सिस्टम (Locking Mechanism)" : "Security & Sealing"}</td>
              <td>${container.doorType}</td>
            </tr>
          </tbody>
        </table>

        <div class="spec-features-checklist">
          <h5>${isHindi ? "मुख्य सुरक्षा विशेषताएँ" : "Institutional Fleet Features"}</h5>
          <ul class="feature-bullets">
            ${container.features.map(f => `<li><span class="gold-check">✓</span> ${f}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// Global hook for button
window.prefillQuoteContainer = function(containerId) {
  const containerSelect = document.getElementById("quoteContainerType");
  const quoteSection = document.getElementById("quotation");
  if (containerSelect) {
    containerSelect.value = containerId;
  }
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: "smooth" });
  }
};

/* ==========================================================================
   4. ROUTE NETWORK & INTERACTIVE CORRIDOR EXPLORER
   ========================================================================== */
function initCorridorExplorer() {
  const corridorFilterBtns = document.querySelectorAll(".corridor-filter-btn");
  const corridorContainer = document.getElementById("corridorsGrid");

  if (!corridorContainer) return;

  renderCorridors("all");

  corridorFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      corridorFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderCorridors(filter);
    });
  });
}

function renderCorridors(filter) {
  const container = document.getElementById("corridorsGrid");
  if (!container || !MPCS.coverage) return;

  const corridors = MPCS.coverage.majorCorridors || [];
  const isHindi = currentLang === "hi";

  const filtered = filter === "all" ? corridors : corridors.filter(c => {
    if (filter === "uttarakhand") return c.origin.includes("Uttarakhand") || c.destination.includes("Uttarakhand");
    if (filter === "maharashtra") return c.origin.includes("Maharashtra") || c.destination.includes("Maharashtra");
    if (filter === "punjab") return c.origin.includes("Punjab") || c.destination.includes("Punjab");
    if (filter === "gujarat") return c.origin.includes("Gujarat") || c.destination.includes("Gujarat");
    return true;
  });

  container.innerHTML = filtered.map(c => `
    <div class="corridor-card ${c.featured ? 'featured' : ''}">
      <div class="corridor-card-header">
        <span class="corridor-freq-badge">${c.frequency}</span>
        <span class="corridor-dist"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${c.estimatedTransitHrs}</span>
      </div>

      <div class="corridor-endpoints">
        <div class="endpoint origin">
          <div class="endpoint-dot"></div>
          <div class="endpoint-name">${c.origin}</div>
        </div>
        <div class="endpoint-transit-line">
          <div class="transit-line-vector"></div>
          <span class="distance-km">${c.distanceKm} KM</span>
        </div>
        <div class="endpoint destination">
          <div class="endpoint-dot dest"></div>
          <div class="endpoint-name">${c.destination}</div>
        </div>
      </div>

      <div class="corridor-details">
        <div class="detail-item">
          <span class="detail-label">${isHindi ? "प्रमुख माल ढुलाई:" : "Primary Commodities:"}</span>
          <span class="detail-value">${c.goodsTypes}</span>
        </div>
      </div>

      <div class="corridor-footer">
        <button class="btn btn-secondary btn-xs" onclick="bookCorridorRoute('${c.origin}', '${c.destination}')">
          ${isHindi ? "इस रूट पर 32-फ़ीट ट्रक बुक करें" : "Book 32ft Truck on this Route"}
        </button>
      </div>
    </div>
  `).join("");
}

window.bookCorridorRoute = function(origin, dest) {
  const originInput = document.getElementById("quoteOrigin");
  const destInput = document.getElementById("quoteDestination");
  const quoteSection = document.getElementById("quotation");

  if (originInput) originInput.value = origin.split(" (")[0];
  if (destInput) destInput.value = dest.split(" (")[0];

  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: "smooth" });
  }
};

/* ==========================================================================
   5. LIVE GPS CONSIGNMENT TELEMATICS SYSTEM
   ========================================================================== */
function initTrackingSystem() {
  const searchBtn = document.getElementById("btnTrackConsignment");
  const searchInput = document.getElementById("trackInputCode");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const code = searchInput.value.trim();
      executeTrackLookup(code);
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        executeTrackLookup(searchInput.value.trim());
      }
    });
  }

  // Pre-load default simulation shipment
  executeTrackLookup("MPCS-LR-8821", false);
}

function initSampleTrackPills() {
  document.querySelectorAll(".sample-track-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const code = pill.getAttribute("data-code");
      const searchInput = document.getElementById("trackInputCode");
      if (searchInput) searchInput.value = code;
      executeTrackLookup(code, true);
    });
  });
}

function executeTrackLookup(searchQuery, scrollIntoView = true) {
  if (!searchQuery) {
    showToast("Please enter an LR Number or Truck Registration Number");
    return;
  }

  const records = MPCS.telematicsRecords || {};
  const queryClean = searchQuery.toUpperCase().replace(/\s+/g, " ");

  // Match by LR Number or Vehicle Number
  let matchedKey = Object.keys(records).find(k => {
    const r = records[k];
    return k === queryClean ||
           r.lrNumber.toUpperCase() === queryClean ||
           r.vehicleNumber.toUpperCase() === queryClean ||
           r.vehicleNumber.replace(/\s+/g, "") === queryClean.replace(/\s+/g, "");
  });

  const displayContainer = document.getElementById("trackingResultContainer");
  if (!displayContainer) return;

  if (!matchedKey) {
    // Show polite not found state with live dispatcher contact
    displayContainer.innerHTML = `
      <div class="tracking-not-found">
        <div class="not-found-icon">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#D6AD59" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="12"></line>
            <line x1="11" y1="16" x2="11.01" y2="16"></line>
          </svg>
        </div>
        <h4>Consignment Query: "${searchQuery}"</h4>
        <p>No active GPS record matches this exact code in current active runs. If your 32ft container was dispatched within the last 60 minutes, telematics synchronization may be pending gate clearance.</p>
        <div class="not-found-actions">
          <a href="tel:${MPCS.company.contact.primaryPhone}" class="btn btn-primary btn-sm">Call 24/7 Dispatch Control</a>
          <a href="https://wa.me/${MPCS.company.contact.whatsappNumber}?text=Hello%20MPCS,%20please%20check%20live%20status%20for%20consignment%20${encodeURIComponent(searchQuery)}" target="_blank" class="btn btn-secondary btn-sm">Inquire on WhatsApp</a>
        </div>
      </div>
    `;
    return;
  }

  const record = records[matchedKey];
  const percentComplete = Math.min(100, Math.round((record.distanceCoveredKm / record.totalDistanceKm) * 100));

  displayContainer.innerHTML = `
    <div class="tracking-live-card">
      <!-- Card Header -->
      <div class="tl-header">
        <div class="tl-identity">
          <div class="tl-lr-badge">${record.lrNumber}</div>
          <h3 class="tl-vehicle-title">${record.vehicleNumber} <span class="tl-truck-type">(${record.containerType})</span></h3>
          <p class="tl-commodity">${record.commodity} • Consignor: ${record.consignor}</p>
        </div>
        <div class="tl-status-pill ${record.statusCategory}">
          <span class="pulsing-radar-dot"></span>
          <span>${record.status}</span>
        </div>
      </div>

      <!-- Telematics Sensor Vitals -->
      <div class="tl-vitals-grid">
        <div class="vital-item">
          <span class="vital-label">Current Location</span>
          <span class="vital-value gold">${record.currentLocation}</span>
        </div>
        <div class="vital-item">
          <span class="vital-label">Live Speed</span>
          <span class="vital-value">${record.speedKmh} km/h</span>
        </div>
        <div class="vital-item">
          <span class="vital-label">Ignition & Engine</span>
          <span class="vital-value">${record.ignitionStatus} (${record.batteryVoltage})</span>
        </div>
        <div class="vital-item">
          <span class="vital-label">GPS Satellites</span>
          <span class="vital-value">${record.gpsSignal}</span>
        </div>
      </div>

      <!-- Route Progress Bar -->
      <div class="tl-route-progress">
        <div class="tl-progress-meta">
          <span><strong>Origin:</strong> ${record.origin}</span>
          <span class="progress-pct">${percentComplete}% Completed (${record.distanceCoveredKm} / ${record.totalDistanceKm} KM)</span>
          <span><strong>Destination:</strong> ${record.destination}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${percentComplete}%;"></div>
        </div>
        <div class="tl-eta-notice">
          <span>Dispatched: ${record.dispatchDate}</span>
          <span class="eta-highlight">Expected Arrival: ${record.estimatedArrival}</span>
        </div>
      </div>

      <!-- Checkpoint Milestones Timeline -->
      <div class="tl-timeline-wrap">
        <h4 class="timeline-title">Route Checkpoint Telematics & En-Route Cleared Tolls</h4>
        <div class="tl-timeline">
          ${record.checkpoints.map(cp => `
            <div class="timeline-step ${cp.passed ? 'passed' : 'upcoming'}">
              <div class="step-marker">
                ${cp.passed ? '✓' : '○'}
              </div>
              <div class="step-content">
                <div class="step-time">${cp.time}</div>
                <div class="step-title">${cp.title}</div>
                <div class="step-note">${cp.note}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="tl-footer">
        <div class="tl-disclaimer">
          <small>GPS hardware installed on-board vehicle. Certified telemetry logged at 60-second intervals.</small>
        </div>
        <div class="tl-actions">
          <a href="https://wa.me/${MPCS.company.contact.whatsappNumber}?text=Tracking%20Update%20Request%20for%20${record.lrNumber}%20(${record.vehicleNumber})" target="_blank" class="btn btn-secondary btn-xs">
            WhatsApp Dispatcher
          </a>
          <a href="tel:${MPCS.company.contact.primaryPhone}" class="btn btn-primary btn-xs">
            Call Control Room
          </a>
        </div>
      </div>
    </div>
  `;

  if (scrollIntoView) {
    displayContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ==========================================================================
   6. QUOTATION REQUEST ENGINE (WhatsApp & Call Integration)
   ========================================================================== */
function initQuotationEngine() {
  const form = document.getElementById("quotationForm");
  const btnWhatsApp = document.getElementById("btnQuoteWhatsApp");
  const btnSubmit = document.getElementById("btnQuoteSubmit");
  const destSelect = document.getElementById("quoteDestination");
  const southernAlert = document.getElementById("southernRouteAlert");

  if (destSelect && southernAlert) {
    destSelect.addEventListener("change", () => {
      const selectedDest = destSelect.value.toLowerCase();
      // Southern State check
      const isSouth = ["chennai", "bangalore", "bengaluru", "hyderabad", "kochi", "coimbatore", "kerala", "tamil nadu", "karnataka", "andhra", "telangana"].some(s => selectedDest.includes(s));

      if (isSouth) {
        southernAlert.style.display = "block";
      } else {
        southernAlert.style.display = "none";
      }
    });
  }

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener("click", (e) => {
      e.preventDefault();
      handleWhatsAppQuote();
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleCallbackQuote();
    });
  }
}

function getQuoteFormData() {
  const origin = document.getElementById("quoteOrigin")?.value || "";
  const destination = document.getElementById("quoteDestination")?.value || "";
  const containerType = document.getElementById("quoteContainerType")?.value || "32ft-single-axle";
  const commodity = document.getElementById("quoteCommodity")?.value || "";
  const weight = document.getElementById("quoteWeight")?.value || "";
  const date = document.getElementById("quoteDate")?.value || "Immediate";
  const clientType = document.getElementById("quoteClientType")?.value || "Business";
  const name = document.getElementById("quoteName")?.value || "";
  const phone = document.getElementById("quotePhone")?.value || "";

  return { origin, destination, containerType, commodity, weight, date, clientType, name, phone };
}

function handleWhatsAppQuote() {
  const data = getQuoteFormData();

  if (!data.origin || !data.destination) {
    showToast("Please provide both Origin and Destination for quotation");
    return;
  }

  const containerLabel = data.containerType === "32ft-multi-axle" ? "32-Foot Multi-Axle (MX Heavy)" : "32-Foot Single Axle (SXL)";

  const messageText = 
`*NEW TRANSPORTATION QUOTE REQUEST*
*Company:* Maharashtra Punjab Container Service

*Origin:* ${data.origin}
*Destination:* ${data.destination}
*Vehicle Required:* ${containerLabel}
*Cargo / Commodity:* ${data.commodity || "General Goods"}
*Approx Weight:* ${data.weight || "Standard"}
*Target Dispatch Date:* ${data.date}
*Shipper Type:* ${data.clientType}

*Contact Person:* ${data.name || "Customer"}
*Phone:* ${data.phone || "Enquiry from Website"}

Please provide transportation freight quotation and truck availability.`;

  const waUrl = `https://wa.me/${MPCS.company.contact.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
  window.open(waUrl, "_blank");
}

function handleCallbackQuote() {
  const data = getQuoteFormData();

  if (!data.name || !data.phone || !data.origin || !data.destination) {
    showToast("Please enter Name, Phone, Origin and Destination");
    return;
  }

  // Generate Reference ID
  const refCode = "MPCS-QUO-" + Math.floor(1000 + Math.random() * 9000);

  // Show Success Modal
  showModal({
    title: "Transportation Quotation Request Registered",
    content: `
      <div class="quote-modal-success">
        <div class="modal-gold-check">✓</div>
        <h3>Reference Code: <span class="gold-code">${refCode}</span></h3>
        <p>Thank you <strong>${data.name}</strong>. Your quotation request for a <strong>${data.containerType === '32ft-multi-axle' ? '32ft Multi-Axle' : '32ft Single Axle'} Container</strong> from <strong>${data.origin}</strong> to <strong>${data.destination}</strong> has been assigned to our Central Dispatch Desk.</p>
        <div class="dispatch-details-box">
          <div><strong>Estimated Callback:</strong> Within 15-20 minutes</div>
          <div><strong>Assigned Hub:</strong> Dehradun & Selaqui Operations Control</div>
          <div><strong>Registered Phone:</strong> ${data.phone}</div>
        </div>
        <div class="modal-actions-row">
          <a href="tel:${MPCS.company.contact.primaryPhone}" class="btn btn-primary btn-sm">Call Dispatcher Now</a>
          <a href="https://wa.me/${MPCS.company.contact.whatsappNumber}?text=Follow-up%20on%20Quote%20Ref%20${refCode}" target="_blank" class="btn btn-secondary btn-sm">Send via WhatsApp</a>
        </div>
      </div>
    `
  });
}

/* ==========================================================================
   7. TRUCK OWNER / TRANSPORTER ATTACHMENT MODAL
   ========================================================================== */
function initTruckOwnerModal() {
  const btnAttach = document.getElementById("openAttachTruckModal");
  if (btnAttach) {
    btnAttach.addEventListener("click", () => {
      openAttachTruckDialog();
    });
  }
}

function openAttachTruckDialog() {
  showModal({
    title: "Attach Your 32-Foot Container Truck with MPCS",
    content: `
      <form id="truckAttachForm" class="modal-form">
        <p class="modal-desc">Partner with Maharashtra Punjab Container Service. Guaranteed round-trip loads from Dehradun, Selaqui, Mumbai, Ludhiana, and North-West industrial belts with prompt trip advances and settlements.</p>
        <div class="form-row">
          <div class="form-group">
            <label>Truck Owner / Transporter Name *</label>
            <input type="text" id="attachOwnerName" required placeholder="e.g. Gurpreet Singh / Rajesh Sharma">
          </div>
          <div class="form-group">
            <label>Mobile Number (WhatsApp) *</label>
            <input type="tel" id="attachPhone" required placeholder="e.g. 9967069606">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Vehicle Registration Number *</label>
            <input type="text" id="attachTruckNumber" required placeholder="e.g. UK 07 CB XXXX or MH 04 GP XXXX">
          </div>
          <div class="form-group">
            <label>Container Specification *</label>
            <select id="attachTruckType">
              <option value="32ft-SXL">32-Foot Single Axle Container (SXL)</option>
              <option value="32ft-MX">32-Foot Multi-Axle Container (MX)</option>
              <option value="multiple">Multiple 32ft Container Trucks</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Base Location / Operating City *</label>
            <input type="text" id="attachBaseCity" required placeholder="e.g. Dehradun, Selaqui, Mumbai, Ludhiana, Jaipur">
          </div>
          <div class="form-group">
            <label>Is GPS Device Installed? *</label>
            <select id="attachGpsStatus">
              <option value="yes">Yes, GPS Device Already Installed</option>
              <option value="no">No, Need MPCS GPS Device Assistance</option>
            </select>
          </div>
        </div>
        <div class="modal-form-actions">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Attachment Details</button>
        </div>
      </form>
    `
  });

  const attachForm = document.getElementById("truckAttachForm");
  if (attachForm) {
    attachForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("attachOwnerName")?.value || "";
      const phone = document.getElementById("attachPhone")?.value || "";
      const truck = document.getElementById("attachTruckNumber")?.value || "";
      const type = document.getElementById("attachTruckType")?.value || "";

      closeModal();
      showToast(`Truck ${truck} details registered! Fleet manager will call ${phone}`);

      const waMsg = `*TRUCK OWNER ATTACHMENT REGISTRATION*%0A*Owner:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Truck:* ${encodeURIComponent(truck)}%0A*Type:* ${encodeURIComponent(type)}%0A*Company:* Maharashtra Punjab Container Service`;
      window.open(`https://wa.me/${MPCS.company.contact.whatsappNumber}?text=${waMsg}`, "_blank");
    });
  }
}

/* ==========================================================================
   8. SPLINE 3D INTEGRATION MODAL
   ========================================================================== */
function initSplineModal() {
  const openBtn = document.getElementById("openSplineModalBtn");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      showModal({
        title: "Spline 3D Scene Configurator",
        content: `
          <div class="spline-config-box">
            <p>You can embed any custom <strong>Spline 3D Scene</strong> directly into the hero stage using the official Spline Web Component (<code>&lt;spline-viewer&gt;</code>).</p>
            <div class="form-group">
              <label>Enter Spline Export Scene URL (.splinecode):</label>
              <input type="url" id="customSplineInput" placeholder="https://prod.spline.design/YOUR_SCENE/scene.splinecode" value="${localStorage.getItem("mpcs_spline_url") || ""}">
            </div>
            <div class="spline-preset-row">
              <small>Or choose an action:</small>
              <div class="spline-buttons">
                <button type="button" class="btn btn-primary btn-sm" id="applySplineBtn">Apply Spline Scene</button>
                <button type="button" class="btn btn-secondary btn-sm" id="reset3dEngineBtn">Reset to MPCS 3D Engine</button>
              </div>
            </div>
          </div>
        `
      });

      document.getElementById("applySplineBtn")?.addEventListener("click", () => {
        const url = document.getElementById("customSplineInput")?.value.trim();
        if (url && window.hero3DEngine) {
          window.hero3DEngine.enableSplineMode(url);
          closeModal();
          showToast("Spline 3D Scene loaded into Hero stage");
        } else {
          showToast("Please provide a valid .splinecode URL");
        }
      });

      document.getElementById("reset3dEngineBtn")?.addEventListener("click", () => {
        if (window.hero3DEngine) {
          window.hero3DEngine.disableSplineMode();
          closeModal();
          showToast("Restored MPCS Golden 32ft Container 3D Engine");
        }
      });
    });
  }
}

/* ==========================================================================
   9. MODAL & TOAST COMPONENT HELPERS
   ========================================================================== */
function showModal({ title, content }) {
  let modalWrap = document.getElementById("mpcsModalWrap");
  if (!modalWrap) {
    modalWrap = document.createElement("div");
    modalWrap.id = "mpcsModalWrap";
    modalWrap.className = "modal-overlay";
    modalWrap.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 id="modalTitleText"></h3>
          <button class="modal-close-btn" onclick="closeModal()" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body" id="modalBodyContent"></div>
      </div>
    `;
    document.body.appendChild(modalWrap);

    modalWrap.addEventListener("click", (e) => {
      if (e.target === modalWrap) closeModal();
    });
  }

  document.getElementById("modalTitleText").innerText = title;
  document.getElementById("modalBodyContent").innerHTML = content;
  modalWrap.classList.add("active");
  document.body.style.overflow = "hidden";
}

window.closeModal = function() {
  const modalWrap = document.getElementById("mpcsModalWrap");
  if (modalWrap) {
    modalWrap.classList.remove("active");
    document.body.style.overflow = "";
  }
};

function showToast(message, duration = 3500) {
  let toast = document.getElementById("mpcsToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "mpcsToast";
    toast.className = "mpcs-toast";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add("show");

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}
window.showToast = showToast;

/* ==========================================================================
   10. 32-FOOT CONTAINER PHOTOGRAPHY & FLEET GALLERY
   ========================================================================== */
function initGallerySystem() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryGrid = document.getElementById("fleetGalleryGrid");

  if (!galleryGrid) return;

  renderGallery("all");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-gallery-filter");
      renderGallery(filter);
    });
  });
}

function renderGallery(filter) {
  const grid = document.getElementById("fleetGalleryGrid");
  if (!grid || !MPCS.gallery) return;

  const isHindi = currentLang === "hi";
  const items = filter === "all" ? MPCS.gallery : MPCS.gallery.filter(item => {
    if (filter === "multi-axle") return item.category === "multi-axle";
    if (filter === "single-axle") return item.category === "single-axle";
    if (filter === "loading") return item.category === "loading";
    if (filter === "corridors") return item.category === "corridor" || item.category === "terminal";
    return true;
  });

  grid.innerHTML = items.map(item => `
    <div class="gallery-photo-card" onclick="openPhotoLightbox('${item.id}')">
      <div class="photo-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="gallery-img">
        <div class="photo-tag-badge">${isHindi && item.tagHindi ? item.tagHindi : item.tag}</div>
        <div class="photo-overlay-view">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          <span>${isHindi ? "विस्तृत दृश्य देखें" : "View High-Res Photo"}</span>
        </div>
      </div>
      <div class="photo-card-info">
        <h4 class="photo-card-title">${isHindi && item.titleHindi ? item.titleHindi : item.title}</h4>
        <p class="photo-card-specs">${item.specs}</p>
        <div class="photo-card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${item.location}</span>
        </div>
      </div>
    </div>
  `).join("");
}

window.openPhotoLightbox = function(photoId) {
  const item = MPCS.gallery?.find(g => g.id === photoId);
  if (!item) return;

  const isHindi = currentLang === "hi";

  showModal({
    title: isHindi && item.titleHindi ? item.titleHindi : item.title,
    content: `
      <div class="lightbox-modal-content">
        <div class="lightbox-img-wrap">
          <img src="${item.image}" alt="${item.title}" class="lightbox-modal-img">
          <div class="lightbox-img-tag">${isHindi && item.tagHindi ? item.tagHindi : item.tag}</div>
        </div>
        <div class="lightbox-details-wrap">
          <p class="lightbox-desc">${item.description}</p>
          <div class="lightbox-spec-bar">
            <strong>${isHindi ? "विशिष्टताएँ:" : "Technical Specs:"}</strong> ${item.specs}
          </div>
          <div class="lightbox-location-bar">
            <strong>${isHindi ? "परिचालन क्षेत्र:" : "Operating Region:"}</strong> ${item.location}
          </div>
          <div class="lightbox-action-row">
            <button class="btn btn-primary btn-sm" onclick="closeModal(); prefillQuoteContainer('${item.category === "single-axle" ? "32ft-single-axle" : "32ft-multi-axle"}')">
              ${isHindi ? "इस 32-फ़ीट कंटेनर के लिए कोटेशन लें" : "Book This 32-Foot Container"}
            </button>
            <a href="https://wa.me/${MPCS.company.contact.whatsappNumber}?text=Inquiry%20regarding%20${encodeURIComponent(item.title)}" target="_blank" class="btn btn-whatsapp btn-sm">
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    `
  });
};
