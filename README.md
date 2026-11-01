# MAHARASHTRA PUNJAB CONTAINER SERVICE
### Luxury Industrial Web Platform for Dedicated 32-Foot Container Transportation & Freight Coordination

An enterprise-grade, luxury industrial transportation and logistics web application engineered for **Maharashtra Punjab Container Service (MPCS)**.

Built with a **Matte Black (`#0B0B0B`)**, **Charcoal (`#171717`)**, and **Metallic Gold (`#D6AD59` / `#F1D58F`)** brand identity, featuring an interactive **3D 32-Foot Golden Container Truck Canvas Engine**, live **GPS telematics tracking simulation**, a **bilingual English/Hindi system**, and an **instant WhatsApp quotation generator**.

---

## 🏛️ 1. Business Profile & Identity

- **Company Name:** Maharashtra Punjab Container Service (MPCS / महाराष्ट्र पंजाब कंटेनर सर्विस)
- **Industry:** Goods Transportation & Freight Logistics Coordination
- **Experience:** 15 Years of Established Excellence (Est. 2011)
- **Primary Business:** Arranging and coordinating 32-foot container trucks for high-value and volume goods transportation.
- **Headquarters:** Dehradun, Uttarakhand, India.
- **Industrial Hub:** Selaqui Pharma & Manufacturing Cluster, Uttarakhand.
- **Western Commercial Gateway:** Mumbai / Bhiwandi Freight Terminal, Maharashtra.
- **Service Coverage:** Selected states and cities across North, West, and Central India.
  - *Strict Operational Policy:* **Southern States are EXCLUDED** (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana).
- **Primary Vehicle Focus:** **32-Foot Container Trucks** (Single-Axle SXL & Multi-Axle MX).
- **Fleet Arrangement Model:** Combines company-owned vehicles with a verified network of independent container truck owners for maximum capacity and zero transshipment delays.
- **Languages:** English and Hindi (हिंदी).
- **Communication Channels:** Direct Phone Dialing and Instant WhatsApp Quotations.

---

## 🎨 2. Luxury Industrial Brand Identity

| Element | Specification | Hex / Value |
|---|---|---|
| **Primary Background** | Matte Black | `#0B0B0B` |
| **Secondary Background** | Charcoal | `#171717` |
| **Surface / Card Background** | Deep Obsidian Glass | `#141414` / `rgba(23, 23, 23, 0.85)` |
| **Primary Accent** | Metallic Gold | `#D6AD59` |
| **Secondary Accent** | Champagne Gold | `#F1D58F` |
| **Borders & Highlights** | Antique Gold Foil | `rgba(214, 173, 89, 0.22)` |
| **Text Primary** | Pure Crisp White | `#FFFFFF` |
| **Text Secondary** | Soft Industrial Grey | `#B8B8B8` |

### Custom Vector Company Logo
The emblem is an engineered vector SVG depicting a modern 32-foot container truck with corrugated ribbed body panels, the **"MP"** monogram crest, heavy tractor cabin, metallic gold wheel rims, and refined industrial typography.

---

## 🚛 3. Interactive Features & Key Modules

### A. 32-Foot Golden Container Truck 3D Engine (`js/hero-3d.js`)
- Hand-crafted 60 FPS Canvas 3D engine with isometric perspective.
- Accurately renders a **32-foot container truck**:
  - Detailed cab unit with aerodynamic roof deflector and dual headlights casting road beams.
  - 32-foot corrugated container shell with side branding (*"MAHARASHTRA PUNJAB CONTAINER SERVICE"*).
  - Front steer wheels and dual rear tandem axles with gold metallic rim detailing.
  - Interactive 360° mouse drag / mobile touch orbit, dimension line callouts (32' L × 8' W × 8.5' H), and solid/wireframe toggles.
  - Built-in external Spline 3D loader compatibility (`<spline-viewer>`).

### B. Live GPS Consignment Telematics Tracker (`js/main.js`)
- Search by Lorry Receipt (LR) number or Truck Registration Number.
- Includes pre-configured live shipments:
  - `MPCS-LR-8821` (`UK 07 CB 4921`): Selaqui Pharma Belt to Mumbai Port Gateway (Surat Bypass telematics ping, 54 km/h).
  - `MPCS-LR-9410` (`MH 04 GP 8832`): Mumbai to Dehradun FMCG Consignment (Neemrana corridor).
  - `MPCS-LR-7235` (`PB 10 DT 3319`): Ludhiana to Selaqui Engineering Spares (Roorkee bypass approach).
- Shows live speeds, ignition status, GPS satellite lock, battery voltage, journey progress bar, and timestamped toll/checkpoint logs.
- Ready for plug-and-play integration with telematics APIs (LocoNav, WheelsEye, Fleetx, MapmyIndia, BlackBuck).

### C. Bilingual Language Switcher (English & Hindi)
- Real-time instant language toggle (`EN` / `हिंदी`) in the top navigation bar.
- Changes headings, badges, technical specs, network notices, and form labels seamlessly.
- State is preserved in `localStorage`.

### D. Quotation Request Engine (Phone & WhatsApp Optimized)
- Multi-field quotation builder (Origin, Destination, 32ft Single/Multi Axle, Commodity, Weight, Shipper type, Contact).
- **Southern State Exclusion Guard:** Instantly warns users if they enter destinations in South India, preserving operational focus.
- **WhatsApp Instant Quote:** Automatically generates a formatted quotation enquiry message and launches WhatsApp chat.
- **Direct Callback Registration:** Generates an official reservation code (e.g., `MPCS-QUO-XXXX`) and assigns it to the Dehradun/Selaqui dispatch control room.

### E. Truck Owner & Partner Attachment Portal
- Dedicated onboarding workflow for independent 32ft container truck owners.
- Explains guaranteed round-trip freight from Selaqui/Dehradun/Mumbai, prompt payment settlements, and 24/7 en-route support.
- One-click modal form connected directly to the Fleet Onboarding desk.

---

## 📁 4. Project Directory Structure

```
3D Website/
├── index.html            # Master semantic HTML structure & luxury industrial layout
├── css/
│   └── style.css         # Luxury industrial design system (#0B0B0B, #D6AD59, gold foil glass)
├── js/
│   ├── data.js           # Business master data, 32ft specs, corridors, GPS logs & Hindi translations
│   ├── hero-3d.js        # 3D interactive 32ft golden container truck canvas engine & Spline loader
│   └── main.js           # Bilingual switcher, quote engine, GPS tracker, modals & controllers
└── README.md             # Complete technical & business documentation
```

---

## 🚀 5. How to Run Locally

### Method 1: Double-Click
Double-click `index.html` in Windows Explorer to open the website directly in any modern browser (Chrome, Edge, Firefox, Brave, Safari).

### Method 2: Local Python Server (Recommended)
Open PowerShell in this project folder and run:
```powershell
python -m http.server 3000
```
Then navigate to:
```
http://localhost:3000
```

---

## ⚙️ 6. How to Configure for Production

### Updating Phone Numbers & WhatsApp:
Open `js/data.js` and edit the `contact` block:
```javascript
contact: {
  primaryPhone: "+91 99670 69606",
  secondaryPhone: "+91 99670 69606",
  whatsappNumber: "919967069606",
  whatsappDisplay: "+91 99670 69606",
  email: "dispatch@mpcslogistics.com"
}
```

### Connecting Live GPS Provider API:
In `js/main.js`, locate `executeTrackLookup(searchQuery)`. Replace or augment the local lookup with an `async fetch()` call to your GPS vendor endpoint:
```javascript
// Example API Integration hook:
const response = await fetch(`https://api.your-gps-provider.com/v1/vehicles/${searchQuery}`, {
  headers: { "Authorization": "Bearer YOUR_API_KEY" }
});
const liveData = await response.json();
// Map liveData.speed, liveData.lat/lng, liveData.checkpoints to displayContainer
```

---

*Designed & Developed with Luxury Industrial Precision for Maharashtra Punjab Container Service.*
