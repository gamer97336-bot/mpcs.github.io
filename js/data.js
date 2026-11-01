/**
 * MAHARASHTRA PUNJAB CONTAINER SERVICE
 * Master Business Data, Fleet Specifications, Route Corridors, GPS Telematics & Bilingual Dictionary
 * Established: 15 Years of Dedicated 32ft Container Transportation & Fleet Coordination
 */

const MPCS_DATA = {
  company: {
    name: "Maharashtra Punjab Container Service",
    nameHindi: "महाराष्ट्र पंजाब कंटेनर सर्विस",
    shortName: "MPCS",
    tagline: "15 Years of Precision 32-Foot Container Transportation & Freight Coordination",
    taglineHindi: "15 वर्षों का विश्वसनीय 32-फ़ीट कंटेनर परिवहन एवं माल ढुलाई समन्वय",
    experienceYears: 15,
    establishedYear: 2011,
    primaryLocations: {
      headquarters: {
        city: "Dehradun",
        state: "Uttarakhand",
        label: "Headquarters & Central Dispatch",
        labelHindi: "मुख्यालय एवं केंद्रीय प्रेषण",
        address: "Transport Nagar, Saharanpur Road, Dehradun, Uttarakhand - 248001",
        phone: "+91 99670 69606",
        email: "dehradun@mpcslogistics.com",
        role: "Administrative Headquarters, Regional Fleet Booking & North India Control Tower"
      },
      industrialHub: {
        city: "Selaqui",
        state: "Uttarakhand",
        label: "Pharma & Industrial Express Hub",
        labelHindi: "फार्मा एवं औद्योगिक एक्सप्रेस हब",
        address: "Industrial Area, Pharma City Road, Selaqui, Dehradun, Uttarakhand - 248197",
        phone: "+91 99670 69606",
        email: "selaqui@mpcslogistics.com",
        role: "Primary Industrial Placement Terminal: Dedicated Pharmaceuticals, FMCG & Manufacturing Dispatch"
      },
      westernHub: {
        city: "Mumbai",
        state: "Maharashtra",
        label: "Western Commercial & Port Gateway",
        labelHindi: "पश्चिमी व्यापारिक एवं पोर्ट गेटवे",
        address: "Bhiwandi Freight Complex, Mumbai-Nashik Expressway, Thane/Mumbai, Maharashtra - 421302",
        phone: "+91 99670 69606",
        email: "mumbai@mpcslogistics.com",
        role: "Western India Operations, Port Drayage Coordination, Nhava Sheva (JNPT) & Maharashtra Transit"
      }
    },
    contact: {
      primaryPhone: "+91 99670 69606",
      secondaryPhone: "+91 99670 69606",
      whatsappNumber: "919967069606",
      whatsappDisplay: "+91 99670 69606",
      email: "dispatch@mpcslogistics.com",
      hours: "24/7 En-Route Coordination & Truck Placement Desk"
    },
    businessModel: {
      summary: "Maharashtra Punjab Container Service coordinates and arranges 32-foot container trucks for manufacturers, enterprises, transport brokers, and traders across North, West, and Central India. Operating both company-owned vehicles and a verified network of independent truck owners, we guarantee verified drivers, sealed container security, installed GPS telematics, and zero transshipment damage.",
      summaryHindi: "महाराष्ट्र पंजाब कंटेनर सर्विस उत्तर, पश्चिम और मध्य भारत में 32-फ़ीट कंटेनर ट्रकों की व्यवस्था एवं समन्वय करती है। अपने स्वयं के ट्रकों और स्वतंत्र ट्रक मालिकों के सत्यापित नेटवर्क के साथ, हम समयबद्ध और सुरक्षित माल ढुलाई सुनिश्चित करते हैं।"
    }
  },

  // 32-FOOT CONTAINER VEHICLE SPECIALIZATION
  containers: [
    {
      id: "32ft-single-axle",
      name: "32-Foot Single Axle Container (SXL)",
      nameHindi: "32-फ़ीट सिंगल एक्सल कंटेनर (SXL)",
      badge: "High-Volume Lightweight Cargo",
      badgeHindi: "उच्च आयतन / लाइटवेट कार्गो",
      axleType: "Single Rear Axle (6 Wheels)",
      payloadWeight: "7.0 to 9.5 Tonnes",
      payloadVolume: "1,850 - 2,050 cu. ft.",
      length: "32 Feet (9.75 m)",
      width: "8.2 Feet (2.50 m)",
      height: "8.5 Feet standard (2.60 m)",
      palletCapacity: "16-18 Standard Pallets",
      doorType: "Double Rear Hinged with High-Security Seal Lock",
      bodyMaterial: "High-Tensile Corrugated Weatherproof Steel",
      idealFor: "Pharmaceutical formulations (Selaqui Pharma Belt), FMCG, textiles, electronics, packaging material, white goods.",
      idealForHindi: "फार्मास्युटिकल दवाइयाँ (सेलाकुई फार्मा क्लस्टर), एफएमसीजी, टेक्सटाइल, इलेक्ट्रॉनिक्स और पैकेजिंग माल।",
      features: [
        "100% Waterproof & Weather-Sealed Corrugated Shell",
        "E-Lock & Tamper-Proof Seal Compatibility",
        "Factory-to-Warehouse Direct Movement (No Transshipment)",
        "Equipped with Installed GPS Tracking Device",
        "Smooth Floorboards for Pallet Jack Loading"
      ]
    },
    {
      id: "32ft-multi-axle",
      name: "32-Foot Multi-Axle Container (MX / Heavy)",
      nameHindi: "32-फ़ीट मल्टी एक्सल कंटेनर (MX / हैवी)",
      badge: "Heavy-Duty High-Capacity Freight",
      badgeHindi: "भारी वजन एवं उच्च क्षमता ढुलाई",
      axleType: "Multi Axle / Tandem Bogie (10-12 Wheels)",
      payloadWeight: "14.0 to 18.5 Tonnes",
      payloadVolume: "2,150 - 2,400 cu. ft. (High Cube)",
      length: "32 Feet (9.75 m)",
      width: "8.5 Feet (2.60 m)",
      height: "9.5 Feet High Cube (2.90 m)",
      palletCapacity: "18-20 Standard Pallets",
      doorType: "Reinforced Heavy Steel Lock Rods with Custom Seal Eyes",
      bodyMaterial: "Heavy-Gauge Industrial Corrugated Steel with Steel Base Floor",
      idealFor: "Auto components, industrial machinery, chemicals, heavy electrical equipment, raw materials, heavy commercial hardware.",
      idealForHindi: "ऑटो कंपोनेंट्स, औद्योगिक मशीनरी, केमिकल ड्रम, भारी इलेक्ट्रिकल उपकरण और कच्चा माल।",
      features: [
        "Higher Payload Capability for Heavy Industrial Loads",
        "High Cube 9.5ft Interior Clearance for Maximum Volume",
        "Multi-Axle Air/Heavy Suspension for Fragile Cargo Stability",
        "Equipped with Installed GPS Device & Route Telematics",
        "Strictly Non-Southern Corridors for Maximum Turnaround Speed"
      ]
    }
  ],

  // GEOGRAPHIC COVERAGE & CORRIDOR DIRECTORY (Strictly EXCLUDING Southern States)
  coverage: {
    policyNotice: "Maharashtra Punjab Container Service operates exclusively across Northern, Western, Central, and select Eastern industrial freight corridors. Southern States (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana) are strictly excluded from our operational network.",
    policyNoticeHindi: "महाराष्ट्र पंजाब कंटेनर सर्विस विशेष रूप से उत्तर, पश्चिम और मध्य भारत में परिचालन करती है। दक्षिण भारत के राज्य हमारी सेवा क्षेत्र में शामिल नहीं हैं।",
    allowedStates: [
      { name: "Uttarakhand", code: "UK", hub: "Dehradun & Selaqui (HQ)", active: true },
      { name: "Maharashtra", code: "MH", hub: "Mumbai, Bhiwandi, Pune, Nashik", active: true },
      { name: "Delhi NCR", code: "DL", hub: "Delhi, Gurugram, Faridabad, Noida, Ghaziabad", active: true },
      { name: "Punjab", code: "PB", hub: "Ludhiana, Jalandhar, Amritsar, Bathinda", active: true },
      { name: "Haryana", code: "HR", hub: "Panipat, Ambala, Kundli, Bawal, Sonipat", active: true },
      { name: "Rajasthan", code: "RJ", hub: "Jaipur, Bhiwadi, Neemrana, Kota, Jodhpur", active: true },
      { name: "Gujarat", code: "GJ", hub: "Ahmedabad, Surat, Vadodara, Vapi, Mundra", active: true },
      { name: "Uttar Pradesh", code: "UP", hub: "Kanpur, Lucknow, Agra, Meerut, Ghaziabad", active: true },
      { name: "Madhya Pradesh", code: "MP", hub: "Indore, Bhopal, Pithampur, Gwalior", active: true },
      { name: "Bihar", code: "BR", hub: "Patna, Muzaffarpur (Upon Dispatch Scheduling)", active: true },
      { name: "West Bengal", code: "WB", hub: "Kolkata, Durgapur, Siliguri (Scheduled Lines)", active: true }
    ],
    excludedStates: [
      { name: "Tamil Nadu", reason: "Outside operational corridor" },
      { name: "Kerala", reason: "Outside operational corridor" },
      { name: "Karnataka", reason: "Outside operational corridor" },
      { name: "Andhra Pradesh", reason: "Outside operational corridor" },
      { name: "Telangana", reason: "Outside operational corridor" }
    ],
    majorCorridors: [
      {
        id: "corridor-selaqui-mumbai",
        origin: "Selaqui / Dehradun (Uttarakhand)",
        destination: "Mumbai / Bhiwandi (Maharashtra)",
        distanceKm: 1680,
        estimatedTransitHrs: "42 - 48 Hours",
        frequency: "Daily Scheduled Dispatches",
        goodsTypes: "Pharmaceuticals, Cosmetics, Auto Parts, FMCG",
        featured: true
      },
      {
        id: "corridor-dehradun-delhi",
        origin: "Dehradun / Selaqui (Uttarakhand)",
        destination: "Delhi NCR / Kundli / Gurugram",
        distanceKm: 290,
        estimatedTransitHrs: "10 - 14 Hours",
        frequency: "Multiple Daily Movements",
        goodsTypes: "Pharma Formulations, Electronics, General Freight",
        featured: true
      },
      {
        id: "corridor-ludhiana-mumbai",
        origin: "Ludhiana / Punjab Belt",
        destination: "Mumbai / Pune (Maharashtra)",
        distanceKm: 1640,
        estimatedTransitHrs: "44 - 50 Hours",
        frequency: "Regular Express Service",
        goodsTypes: "Textiles, Hosiery, Bicycle Spares, Hardware",
        featured: true
      },
      {
        id: "corridor-ahmedabad-dehradun",
        origin: "Ahmedabad / Vapi (Gujarat)",
        destination: "Dehradun / Selaqui (Uttarakhand)",
        distanceKm: 1240,
        estimatedTransitHrs: "32 - 38 Hours",
        frequency: "Tri-Weekly Express",
        goodsTypes: "Chemicals, Industrial Packaging, Pharma Bulk",
        featured: true
      },
      {
        id: "corridor-mumbai-indore",
        origin: "Mumbai / Bhiwandi (Maharashtra)",
        destination: "Indore / Pithampur (Madhya Pradesh)",
        distanceKm: 585,
        estimatedTransitHrs: "16 - 20 Hours",
        frequency: "Daily Connections",
        goodsTypes: "FMCG, Machinery Spares, Consumer Electronics",
        featured: false
      },
      {
        id: "corridor-bhiwadi-dehradun",
        origin: "Bhiwadi / Jaipur (Rajasthan)",
        destination: "Dehradun / Haridwar (Uttarakhand)",
        distanceKm: 380,
        estimatedTransitHrs: "12 - 16 Hours",
        frequency: "Daily Connections",
        goodsTypes: "Glassware, Cable Wires, Automobile Components",
        featured: false
      }
    ]
  },

  // CLIENT PROFILES & TAILORED LOGISTICS SOLUTIONS
  clientSegments: [
    {
      title: "Manufacturing Enterprises",
      titleHindi: "विनिर्माण एवं औद्योगिक कंपनियाँ",
      description: "Dedicated 32ft weather-tight containers ensuring zero dampness, zero pilferage, and direct factory-to-distributor transit for pharma, FMCG, and electronics.",
      benefits: ["Sealed Container Door Integrity", "Direct Selaqui & Dehradun Loading", "En-route Telematics Support"]
    },
    {
      title: "Transport Brokers & Intermediaries",
      titleHindi: "ट्रांसपोर्ट ब्रोकर्स एवं मध्यस्थ",
      description: "Reliable truck placement partner for logistics brokers. When your clients demand 32ft containers, we supply vetted vehicles and transparent dispatch coordination.",
      benefits: ["Immediate Truck Placement Desk", "Honest Commercial Terms", "Driver Documentation Verification"]
    },
    {
      title: "Independent Truck Owners",
      titleHindi: "स्वतंत्र ट्रक मालिक एवं पार्टनर्स",
      description: "We partner with container truck owners to provide guaranteed round-trip freight, transparent billing, prompt trip advances, and round-the-clock route coordination.",
      benefits: ["Regular Returns from Dehradun & Mumbai", "Prompt Freight Settlements", "Operational Support"]
    },
    {
      title: "Traders & Commercial Shippers",
      titleHindi: "व्यापारी एवं कमर्शियल शिपर",
      description: "Complete truckload solutions for bulk consignments, warehouse transfers, and commercial distribution across North, West, and Central India.",
      benefits: ["Single Point of Accountability", "Quotation Clarity", "No Hidden Surcharges"]
    }
  ],

  // GPS CONSIGNMENT TELEMATICS SIMULATION
  // Built with clean structure ready to plug into real GPS APIs (LocoNav, WheelsEye, Fleetx, etc.)
  telematicsRecords: {
    "MPCS-LR-8821": {
      lrNumber: "MPCS-LR-8821",
      vehicleNumber: "UK 07 CB 4921",
      containerType: "32-Foot Multi-Axle (MX High Cube)",
      origin: "Selaqui Industrial Hub (Uttarakhand)",
      destination: "Bhiwandi / Mumbai (Maharashtra)",
      commodity: "Pharmaceutical Finished Formulations",
      consignor: "Premier Healthcare Labs (Selaqui)",
      consignee: "Central Pharma Depots (Mumbai)",
      dispatchDate: "29 Oct 2026, 06:30 AM",
      currentLocation: "Surat Outer Bypass, NH 48, Gujarat",
      status: "In Transit — Running On Schedule",
      statusCategory: "in-transit",
      speedKmh: 54,
      ignitionStatus: "ON",
      batteryVoltage: "24.6 V (Optimal)",
      gpsSignal: "Strong Satellite Lock (18 Satellites)",
      distanceCoveredKm: 1395,
      totalDistanceKm: 1680,
      estimatedArrival: "30 Oct 2026, 04:30 PM",
      checkpoints: [
        { title: "Loaded & Sealed at Selaqui Hub", time: "29 Oct, 06:30 AM", passed: true, note: "Tamper Seal #MPCS-88902 applied" },
        { title: "Roorkee Toll Plaza Clearance", time: "29 Oct, 09:45 AM", passed: true, note: "Weighbridge certified: 14.8 MT" },
        { title: "Eastern Peripheral Expressway Bypass", time: "29 Oct, 02:15 PM", passed: true, note: "Steady speed 56 km/h" },
        { title: "Jaipur Express Corridor Checkpoint", time: "29 Oct, 08:30 PM", passed: true, note: "Driver rest & fuel stop: 45 min" },
        { title: "Ahmedabad Outer Ring Ringway", time: "30 Oct, 04:10 AM", passed: true, note: "All systems nominal" },
        { title: "Surat Bypass NH 48 Telematics Ping", time: "30 Oct, 11:20 AM", passed: true, note: "Approaching Maharashtra Border (Active Point)" },
        { title: "Thane - Bhiwandi Terminal Arrival", time: "30 Oct, 04:30 PM (Est)", passed: false, note: "Delivery gate appointment scheduled" }
      ]
    },
    "MPCS-LR-9410": {
      lrNumber: "MPCS-LR-9410",
      vehicleNumber: "MH 04 GP 8832",
      containerType: "32-Foot Single Axle (SXL)",
      origin: "Mumbai Harbor Gateway (Maharashtra)",
      destination: "Dehradun Transport Nagar (Uttarakhand)",
      commodity: "FMCG Consumer Products & Packaging",
      consignor: "Apex Logistics Distribution (Mumbai)",
      consignee: "Uttarakhand Supply Network (Dehradun)",
      dispatchDate: "28 Oct 2026, 11:00 PM",
      currentLocation: "Neemrana Industrial Belt, Rajasthan",
      status: "In Transit — En Route to NCR Hub",
      statusCategory: "in-transit",
      speedKmh: 48,
      ignitionStatus: "ON",
      batteryVoltage: "24.2 V (Normal)",
      gpsSignal: "Active GPS Fix (14 Satellites)",
      distanceCoveredKm: 1210,
      totalDistanceKm: 1680,
      estimatedArrival: "30 Oct 2026, 07:45 PM",
      checkpoints: [
        { title: "Dispatched from Bhiwandi Mega Yard", time: "28 Oct, 11:00 PM", passed: true, note: "Physical seal inspected" },
        { title: "Nashik Ghat Section Traversed", time: "29 Oct, 03:30 AM", passed: true, note: "Speed controlled downhill" },
        { title: "Indore Bypass NH 52 Junction", time: "29 Oct, 12:40 PM", passed: true, note: "On-schedule milestone" },
        { title: "Kotputli - Neemrana Corridor", time: "30 Oct, 10:50 AM", passed: true, note: "Active checkpoint location" },
        { title: "Gurugram / Delhi Western Peripheral", time: "30 Oct, 01:30 PM (Est)", passed: false, note: "Bypass routing" },
        { title: "Dehradun Transport Nagar Terminal", time: "30 Oct, 07:45 PM (Est)", passed: false, note: "Final unloading terminal" }
      ]
    },
    "MPCS-LR-7235": {
      lrNumber: "MPCS-LR-7235",
      vehicleNumber: "PB 10 DT 3319",
      containerType: "32-Foot Single Axle (SXL)",
      origin: "Ludhiana Focal Point (Punjab)",
      destination: "Selaqui Industrial Area (Uttarakhand)",
      commodity: "Automotive Precision Spares & Hardware",
      consignor: "Punjab Precision Forgings",
      consignee: "Himalayan Assembling Works (Selaqui)",
      dispatchDate: "30 Oct 2026, 02:00 AM",
      currentLocation: "Roorkee Bypass, NH 344, Uttarakhand",
      status: "Approaching Destination — Sub-2 Hours ETA",
      statusCategory: "approaching",
      speedKmh: 42,
      ignitionStatus: "ON",
      batteryVoltage: "24.8 V (Optimal)",
      gpsSignal: "Precision GPS Fix (19 Satellites)",
      distanceCoveredKm: 285,
      totalDistanceKm: 340,
      estimatedArrival: "30 Oct 2026, 01:15 PM",
      checkpoints: [
        { title: "Departed Ludhiana Industrial Area", time: "30 Oct, 02:00 AM", passed: true, note: "Consignment locked" },
        { title: "Ambala Cantt Bypass Clearance", time: "30 Oct, 05:15 AM", passed: true, note: "Smooth transit" },
        { title: "Saharanpur Express Junction", time: "30 Oct, 08:30 AM", passed: true, note: "Toll tagged" },
        { title: "Roorkee Bypass Gate Check", time: "30 Oct, 11:30 AM", passed: true, note: "Entering final Uttarakhand approach" },
        { title: "Selaqui Delivery Point Unloading", time: "30 Oct, 01:15 PM (Est)", passed: false, note: "Consignee notified" }
      ]
    }
  },

  // REAL-WORLD 32-FOOT CONTAINER PHOTOGRAPHY & FLEET GALLERY
  gallery: [
    {
      id: "photo-32ft-mx-highway",
      title: "32-Foot Multi-Axle High-Cube (MX Heavy)",
      titleHindi: "32-फ़ीट मल्टी-एक्सल हाई-क्यूब (MX हैवी)",
      category: "multi-axle",
      tag: "Express Highway Trunk Route",
      tagHindi: "एक्सप्रेस हाईवे ट्रंक रूट",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
      specs: "Length: 32ft | Height: 9.5ft High Cube | Payload: 18.5 MT | Installed GPS Telematics",
      location: "Mumbai - Gujarat - Delhi NCR Freight Corridor",
      description: "Class-leading 32ft High-Cube container truck en-route along the Western express corridor. Heavy tandem multi-axle bogie engineered for maximum stability with heavy industrial goods."
    },
    {
      id: "photo-selaqui-pharma-dock",
      title: "Selaqui Pharma Facility - Factory Dock Placement",
      titleHindi: "सेलाकुई फार्मा फैक्ट्री - डॉक लोडिंग",
      category: "loading",
      tag: "Selaqui Pharma Cluster",
      tagHindi: "सेलाकुई फार्मा क्लस्टर",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      specs: "Sealed container loading, palletized healthcare cartons, zero transshipment",
      location: "Industrial Area, Selaqui, Dehradun",
      description: "Direct factory gate placement for pharmaceutical formulations at Selaqui Pharma City. Closed weatherproof container eliminates moisture and dust contamination."
    },
    {
      id: "photo-32ft-sxl-express",
      title: "32-Foot Single Axle (SXL) Fast Volume Carrier",
      titleHindi: "32-फ़ीट सिंगल एक्सल (SXL) वॉल्यूम कैरियर",
      category: "single-axle",
      tag: "Rapid Inter-City Express",
      tagHindi: "तेज़ इंटर-सिटी एक्सप्रेस",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
      specs: "Length: 32ft | Height: 8.5ft | Payload: 8.5 MT | Volume: 2,050 cu. ft.",
      location: "Dehradun - Haryana - Punjab Belt",
      description: "Optimized for lightweight high-volume consignments including FMCG, cosmetics, electronics, and packaging materials. Single rear axle configuration for agile turnaround."
    },
    {
      id: "photo-mumbai-bhiwandi-hub",
      title: "Mumbai / Bhiwandi Terminal & Port Gateway",
      titleHindi: "मुंबई / भिवंडी टर्मिनल एवं पोर्ट गेटवे",
      category: "terminal",
      tag: "Bhiwandi Freight Hub & Port Drayage",
      tagHindi: "भिवंडी फ्रेट हब एवं पोर्ट लिंक",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      specs: "Western consolidation hub, Nhava Sheva (JNPT) port transfers, return freight coordination",
      location: "Bhiwandi Freight Complex, Mumbai-Nashik Expressway",
      description: "Our Western commercial hub in Bhiwandi coordinates incoming and outgoing 32ft container dispatches between Maharashtra and Northern manufacturing centers."
    },
    {
      id: "photo-night-gps-corridor",
      title: "24/7 Monitored Highway Transit with Active GPS",
      titleHindi: "सक्रिय जीपीएस सहित 24/7 हाईवे ट्रांजिट",
      category: "corridor",
      tag: "Active GPS Telematics",
      tagHindi: "सक्रिय जीपीएस टेलीमैटिक्स",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
      specs: "Speed geofencing, automated checkpoint logging, tamper-proof seal integrity",
      location: "NH 48 Golden Quadrilateral Western Corridor",
      description: "Non-stop overnight freight movement across high-density national highway corridors, monitored minute-by-minute by our Dehradun central dispatch control room."
    },
    {
      id: "photo-heavy-machinery-32ft",
      title: "Heavy Engineering & Precision Spares Transport",
      titleHindi: "भारी मशीनरी एवं ऑटो स्पेयर परिवहन",
      category: "multi-axle",
      tag: "Reinforced Multi-Axle Chassis",
      tagHindi: "रीइन्फोर्स्ड मल्टी-एक्सल चेसिस",
      image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80",
      specs: "Heavy-duty steel corrugated container with internal anchor points and heavy suspension",
      location: "Ludhiana - Ahmedabad - Pune Manufacturing Belt",
      description: "High-capacity multi-axle 32ft container handling dense industrial parts, precision automotive components, and heavy commercial machinery without en-route handling."
    }
  ],

  // BILINGUAL TRANSLATION DICTIONARY (English & Hindi)
  translations: {
    en: {
      siteTitle: "Maharashtra Punjab Container Service | 32ft Container Transportation",
      experiencePill: "15 Years Logistics Excellence • Est. 2011",
      callUs: "Call Dispatch Desk",
      whatsappUs: "Chat on WhatsApp",
      getQuote: "Request Quotation",
      navAbout: "About MPCS",
      navContainers: "32ft Containers",
      navGallery: "32ft Photos & 3D",
      navNetwork: "Route Network",
      navSolutions: "Who We Serve",
      navGPS: "Live GPS Tracking",
      navTruckOwners: "Truck Owners",
      navContact: "Contact & Hubs",
      
      galleryHeading: "32-Foot Container Fleet & Operations Gallery",
      galleryTag: "Real-World Field Operations",
      galleryDesc: "High-definition photography of our 32-foot single-axle and multi-axle container fleet in active operation across Selaqui industrial docks, national expressways, and Mumbai port terminals.",
      
      heroTitleLine1: "15 Years of Precision",
      heroTitleLine2: "32-Foot Container Transportation",
      heroTitleLine3: "& Freight Coordination",
      heroSubtitle: "Connecting Dehradun, Selaqui, Mumbai, and high-volume industrial corridors across North, West, and Central India. Company-owned trucks and vetted partner fleets engineered for secure, damage-free freight.",
      
      heroBtnQuote: "Request Transport Quote",
      heroBtnTrack: "Track Consignment GPS",
      heroBtnAttach: "Attach Your 32ft Truck",

      statYears: "15+ Years",
      statYearsLabel: "Industry Trust & Experience",
      statSize: "32-Foot",
      statSizeLabel: "Dedicated Weatherproof Containers",
      statHubs: "Dehradun • Selaqui • Mumbai",
      statHubsLabel: "Strategic Tri-Hub Operations",
      statSafety: "100% Sealed",
      statSafetyLabel: "Tamper-Proof Factory to Hub Transit",

      aboutHeading: "Trust Built Over 15 Years of Reliable Freight Coordination",
      aboutTag: "Established Logistics Partner",
      aboutDesc1: "Maharashtra Punjab Container Service was founded on an unwavering commitment: providing dependable, secure, and disciplined 32-foot container truck transportation. Operating out of our registered base in Dehradun, Uttarakhand, with direct industrial operations in Selaqui Pharma Hub and Western port access via Mumbai, Maharashtra.",
      aboutDesc2: "We maintain complete commercial transparency. We coordinate freight movement using both our company-owned 32ft container vehicles and a rigorously vetted roster of independent container truck owners. This coordination model ensures our clients benefit from massive capacity flexibility, competitive market rates, and zero transit delays.",
      aboutPoint1Title: "Strict Quality Control",
      aboutPoint1Desc: "Every arranged truck undergoes verification of driver credentials, GPS activation, and mechanical fitness before loading.",
      aboutPoint2Title: "No Southern Routes — Razor Focus",
      aboutPoint2Desc: "By focusing strictly on North, West, and Central industrial corridors (excluding Southern States), our turnaround speed remains unmatched.",
      aboutPoint3Title: "Zero Cargo Damage Record",
      aboutPoint3Desc: "Closed corrugated containers eliminate rain damage, pilferage, dust contamination, and multiple-handling risks.",

      containerHeading: "Our Specialized Fleet: The 32-Foot Container Truck",
      containerTag: "Gold Standard of Freight",
      containerDesc: "In modern supply chain logistics, the 32-foot closed container is the premier vehicle for high-value and volume cargo. Choose between our Single-Axle (SXL) for light/volume goods or Multi-Axle (MX) for heavy industrial loads.",

      networkHeading: "Operating Route Network & Corridors",
      networkTag: "Strict Regional Precision",
      networkNotice: "Notice: We do NOT provide transportation to Southern States (Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana). We specialize in North, West, Central, and Eastern trade corridors.",
      
      calculatorHeading: "Get a Transportation Quotation",
      calculatorTag: "Transparent Freight Rates",
      calculatorDesc: "Rates vary based on origin, destination, commodity weight, and real-time corridor demand. Fill out the details below to receive a fast, customized quotation via phone call or direct WhatsApp.",

      trackingHeading: "Live GPS Consignment Tracking",
      trackingTag: "Vehicle Telematics Ready",
      trackingDesc: "Every vehicle operated or arranged by MPCS has an active GPS tracking unit installed. Track your consignment in real-time or test with our sample manifests.",

      partnerHeading: "Truck Owners & Transporters: Attach Your 32ft Truck",
      partnerTag: "Partner With MPCS",
      partnerDesc: "Are you an independent 32-foot container truck owner? Partner with a 15-year established company. Enjoy continuous loads from Selaqui, Dehradun, Mumbai, and North Indian industrial belts with transparent payment settlements.",
      
      contactHeading: "Contact Our Central Dispatch Desk",
      contactTag: "24/7 Operations",
      contactDesc: "Reach our dispatchers and fleet coordinators immediately via direct phone call or WhatsApp."
    },

    hi: {
      siteTitle: "महाराष्ट्र पंजाब कंटेनर सर्विस | 32-फ़ीट कंटेनर ट्रांसपोर्टेशन",
      experiencePill: "15 वर्षों का विश्वसनीय अनुभव • स्था. 2011",
      callUs: "कॉल करें",
      whatsappUs: "व्हाट्सएप पर संपर्क करें",
      getQuote: "भाड़ा कोटेशन लें",
      navAbout: "हमारे बारे में",
      navContainers: "32-फ़ीट कंटेनर",
      navGallery: "32-फ़ीट फोटो व 3D",
      navNetwork: "रूट नेटवर्क",
      navSolutions: "सेवाएँ",
      navGPS: "लाइव GPS ट्रैकिंग",
      navTruckOwners: "ट्रक मालिक",
      navContact: "संपर्क एवं हब",
      
      galleryHeading: "32-फ़ीट कंटेनर फ्लीट एवं परिचालन गैलरी",
      galleryTag: "वास्तविक ऑन-ग्राउंड ऑपरेशंस",
      galleryDesc: "सेलाकुई औद्योगिक हब, नेशनल हाईवे कॉरीडोर्स और मुंबई पोर्ट टर्मिनल्स पर कार्यरत हमारे 32-फ़ीट सिंगल-एक्सल एवं मल्टी-एक्सल कंटेनर ट्रकों की तस्वीरें।",
      
      heroTitleLine1: "15 वर्षों का अटूट विश्वास",
      heroTitleLine2: "32-फ़ीट कंटेनर ट्रक परिवहन",
      heroTitleLine3: "एवं कुशल माल ढुलाई समन्वय",
      heroSubtitle: "देहरादून, सेलाकुई, मुंबई और उत्तर, पश्चिम व मध्य भारत के प्रमुख औद्योगिक क्षेत्रों में सुरक्षित एवं समयबद्ध कंटेनर ट्रक सेवा। स्वयं के ट्रक एवं सत्यापित स्वतंत्र ट्रक मालिकों का नेटवर्क।",
      
      heroBtnQuote: "ट्रांसपोर्ट कोटेशन प्राप्त करें",
      heroBtnTrack: "कंटेनर GPS ट्रैक करें",
      heroBtnAttach: "अपना 32-फ़ीट ट्रक जोड़ें",

      statYears: "15+ वर्ष",
      statYearsLabel: "उद्योग में विश्वसनीयता एवं अनुभव",
      statSize: "32-फ़ीट",
      statSizeLabel: "वॉटरप्रूफ एवं सीलबंद सुरक्षित कंटेनर",
      statHubs: "देहरादून • सेलाकुई • मुंबई",
      statHubsLabel: "रणनीतिक 3-हब संचालन",
      statSafety: "100% सीलबंद",
      statSafetyLabel: "फैक्ट्री से वेयरहाउस तक सुरक्षित डिलीवरी",

      aboutHeading: "15 वर्षों की निष्ठा एवं माल ढुलाई समन्वय की शक्ति",
      aboutTag: "विश्वसनीय लॉजिस्टिक्स पार्टनर",
      aboutDesc1: "महाराष्ट्र पंजाब कंटेनर सर्विस की स्थापना 15 वर्ष पूर्व माल परिवहन को सुरक्षित, समयबद्ध और व्यवस्थित बनाने के उद्देश्य से हुई थी। हमारा पंजीकृत कार्यालय देहरादून (उत्तराखंड) में है, और मुख्य औद्योगिक परिचालन सेलाकुई फार्मा हब तथा मुंबई (महाराष्ट्र) से संचालित होता है।",
      aboutDesc2: "हम अपने ग्राहकों के समक्ष पूर्ण पारदर्शिता रखते हैं। हम अपने स्वयं के 32-फ़ीट कंटेनर ट्रकों के साथ-साथ विश्वसनीय एवं सत्यापित स्वतंत्र ट्रक मालिकों के विशाल नेटवर्क के माध्यम से गाड़ियों की व्यवस्था करते हैं। यह मॉडल ग्राहकों को तुरंत गाड़ी की उपलब्धता और उचित भाड़ा दरें सुनिश्चित करता है।",
      aboutPoint1Title: "सख्त सत्यापन प्रक्रिया",
      aboutPoint1Desc: "लोडिंग से पूर्व हर गाड़ी का जीपीएस, ड्राइवर दस्तावेज़ और फिटनेस पूरी तरह जांची जाती है।",
      aboutPoint2Title: "दक्षिण भारत से मुक्त — विशेष फोकस",
      aboutPoint2Desc: "हम दक्षिण भारत के राज्यों में सेवा नहीं देते, जिससे उत्तर, पश्चिम एवं मध्य भारत के रूट्स पर हमारा टर्नअराउंड सबसे तेज़ रहता है।",
      aboutPoint3Title: "शून्य माल क्षति का रिकॉर्ड",
      aboutPoint3Desc: "बंद कंटेनर से बारिश, चोरी, धूल और रास्ते में माल बदले जाने का कोई खतरा नहीं रहता।",

      containerHeading: "हमारा मुख्य वाहन: 32-फ़ीट कंटेनर ट्रक",
      containerTag: "सुरक्षित लॉजिस्टिक्स का प्रतीक",
      containerDesc: "आधुनिक उद्योग में 32-फ़ीट का बंद कंटेनर सबसे सुरक्षित माना जाता है। हल्के और वॉल्यूम वाले माल के लिए सिंगल-एक्सल (SXL) या भारी औद्योगिक माल के लिए मल्टी-एक्सल (MX) का चयन करें।",

      networkHeading: "परिचालन रूट नेटवर्क एवं औद्योगिक कॉरीडोर",
      networkTag: "निश्चित क्षेत्रीय नेटवर्क",
      networkNotice: "महत्वपूर्ण सूचना: हमारी सेवा दक्षिण भारत के राज्यों (केरल, तमिलनाडु, कर्नाटक, आंध्र प्रदेश, तेलंगाना) के लिए उपलब्ध नहीं है। हम उत्तर, पश्चिम, मध्य और चुनिंदा पूर्वी राज्यों में सेवा प्रदान करते हैं।",
      
      calculatorHeading: "ट्रांसपोर्टेशन कोटेशन प्राप्त करें",
      calculatorTag: "पारदर्शी भाड़ा दरें",
      calculatorDesc: "भाड़ा रूट, माल के वजन और मौजूदा डीजल दर पर निर्भर करता है। नीचे अपनी जानकारी भरें और तुरंत फोन या व्हाट्सएप पर आधिकारिक कोटेशन प्राप्त करें।",

      trackingHeading: "लाइव GPS कंटेनर ट्रैकिंग",
      trackingTag: "वाहन टेलीमैटिक्स युक्त",
      trackingDesc: "हमारे द्वारा संचालित एवं व्यवस्थित प्रत्येक वाहन में GPS लगा हुआ है। अपने LR नंबर या वाहन नंबर से स्थिति जानें या हमारे डेमो रिकॉर्ड देखें।",

      partnerHeading: "ट्रक मालिक एवं ट्रांसपोर्टर्स: अपना 32-फ़ीट ट्रक जोड़ें",
      partnerTag: "MPCS के साथ जुड़ें",
      partnerDesc: "क्या आपके पास 32-फ़ीट कंटेनर ट्रक है? 15 साल पुरानी प्रतिष्ठित कंपनी के साथ जुड़ें। सेलाकुई, देहरादून, मुंबई और उत्तर भारत के औद्योगिक हब से लगातार वापसी का माल और समय पर भुगतान पाएँ।",
      
      contactHeading: "हमारे मुख्य डिस्पैच डेस्क से संपर्क करें",
      contactTag: "24/7 परिचालन",
      contactDesc: "हमारे डिस्पैचर्स एवं फ्लीट समन्वयकों से तुरंत फोन कॉल या व्हाट्सएप के माध्यम से जुड़ें।"
    }
  }
};

// Expose globally for browsers
if (typeof window !== "undefined") {
  window.MPCS_DATA = MPCS_DATA;
}
