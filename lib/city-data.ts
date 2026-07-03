// OOH Plan Brochure data — one entry per city

export type OOHFormat = {
  code: string;
  name: string;
  category: "static" | "mobile" | "digital" | "ambient";
  sizes: string[];
  locations: string[];   // key areas in this city where format is available
  dailyReach: string;    // "50,000 – 2,00,000"
  units: string;         // "35+ sites"
  rateRange: string;     // "₹25K – ₹1.2L / month"
  usp: string;           // one-liner selling point
};

export type AdZone = {
  name: string;
  type: "commercial" | "residential" | "transit" | "highway" | "tourism" | "mixed";
  description: string;
  bestFormats: string[];
};

export type PastCampaign = {
  brand: string;
  format: string;
  area: string;
  year: string;
  accent: string; // hex brand colour for the card bg
};

export type CityPage = {
  slug: string;
  name: string;
  number: string;         // "01"
  tagline: string;
  heroStat: string;       // big hero number shown in hero
  heroStatLabel: string;
  population: string;
  dailyCommuters: string;
  keyMarkets: number;
  totalSites: number;
  overview: string;
  whyHere: string[];      // 4 bullet reasons
  formats: OOHFormat[];
  zones: AdZone[];
  campaigns: PastCampaign[];
  office: {
    person: string;
    phone: string;
    address: string;
  };
};

export const CITY_PAGES: CityPage[] = [
  /* ─────────────────────── 01 LUCKNOW ─────────────────────── */
  {
    slug: "lucknow",
    name: "Lucknow",
    number: "01",
    tagline: "Capital of UP · City of Nawabs · North India's Crown Market",
    heroStat: "3.5M+",
    heroStatLabel: "Population",
    population: "3.5 million+",
    dailyCommuters: "8 lakh+",
    keyMarkets: 12,
    totalSites: 110,
    overview:
      "Lucknow, the capital of Uttar Pradesh, is one of North India's fastest-growing advertising markets. Home to a sprawling urban population of over 3.5 million, the city blends cultural heritage with a booming economy — IT parks in Gomti Nagar, retail hubs in Hazratganj, and industrial corridors on the Kanpur and Faizabad roads. As the political and commercial nerve centre of UP, Lucknow commands premium brand visibility for any campaign targeting North India.",
    whyHere: [
      "State capital — highest concentration of government, business and media decision-makers in UP",
      "LuLu Mall, Fun Republic, Phoenix Palassio and Wave Mall drive premium footfall every day",
      "Faizabad Road (Airport corridor) and Sultanpur Road are the fastest-growing media corridors in the city",
      "Auto-rickshaws, city buses and e-rickshaws create affordable mass-reach across every neighbourhood",
    ],
    formats: [
      {
        code: "LFH",
        name: "Large Format Hoardings",
        category: "static",
        sizes: ["40×20 ft", "30×15 ft", "20×10 ft", "60×20 ft (panoramic)"],
        locations: ["Hazratganj", "Alambagh Bypass", "Gomti Nagar", "Faizabad Road", "Vikas Nagar", "Aliganj Chauraha"],
        dailyReach: "50,000 – 2,00,000",
        units: "35+ sites",
        rateRange: "₹25,000 – ₹1,20,000 / month",
        usp: "24×7 unavoidable brand presence at Lucknow's busiest junctions",
      },
      {
        code: "UPG",
        name: "Unipoles & Gantries",
        category: "static",
        sizes: ["60×30 ft (gantry)", "40×20 ft (unipole)", "50×25 ft (mega unipole)"],
        locations: ["NH-27 Bypass", "Outer Ring Road", "Raebareli Road", "Sultanpur Road", "Kanpur Road Flyover"],
        dailyReach: "1,00,000 – 4,00,000",
        units: "12+ sites",
        rateRange: "₹45,000 – ₹2,50,000 / month",
        usp: "Maximum highway visibility — massive format reaching lakhs of daily commuters",
      },
      {
        code: "ARB",
        name: "Auto Rickshaw Branding",
        category: "mobile",
        sizes: ["Full body wrap", "Back panel (3×2 ft)", "Side panels (both sides)"],
        locations: ["All major routes — Hazratganj, Aliganj, Indira Nagar, Gomti Nagar, Alambagh, Charbagh"],
        dailyReach: "5,000 – 20,000 per auto",
        units: "200+ autos available",
        rateRange: "₹3,500 – ₹8,000 per auto / month",
        usp: "Mobile billboards that enter lanes and markets no hoarding can reach",
      },
      {
        code: "CBB",
        name: "City Bus Branding",
        category: "mobile",
        sizes: ["Full bus wrap", "Back panel (8×4 ft)", "Side strip panels"],
        locations: ["All UPSRTC city routes, Charbagh to Gomti Nagar, Alambagh to Mahanagar"],
        dailyReach: "20,000 – 50,000 per bus",
        units: "30+ buses available",
        rateRange: "₹18,000 – ₹45,000 per bus / month",
        usp: "Moving hoardings covering 50+ km of city routes every single day",
      },
      {
        code: "LDS",
        name: "LED Digital Screens",
        category: "digital",
        sizes: ["20×10 ft", "15×8 ft", "12×6 ft"],
        locations: ["Hazratganj Circle", "Gomti Nagar Main Road", "Fun Republic Mall vicinity", "LuLu Mall Corridor", "Phoenix Palassio Gate"],
        dailyReach: "40,000 – 1,20,000",
        units: "6 premium locations",
        rateRange: "₹50,000 – ₹2,00,000 / month",
        usp: "Dynamic content — change creatives hourly, target by time of day",
      },
      {
        code: "BSP",
        name: "Bus Shelter & FOB Panels",
        category: "ambient",
        sizes: ["6×3 ft", "4×2 ft", "3×1.5 ft"],
        locations: ["Major intersections across Hazratganj, Mahanagar, Indira Nagar, Aliganj, Gomti Nagar"],
        dailyReach: "10,000 – 30,000 per panel",
        units: "60+ panels",
        rateRange: "₹8,000 – ₹22,000 per panel / month",
        usp: "Eye-level brand contact at pedestrian dwell-points — highest attention time",
      },
    ],
    zones: [
      { name: "Hazratganj", type: "commercial", description: "Lucknow's Connaught Place — highest footfall, premium brands, government offices and retail", bestFormats: ["LFH", "LDS", "BSP"] },
      { name: "Gomti Nagar", type: "mixed", description: "IT parks, luxury malls (Fun Republic, Phoenix), premium residential — city's most affluent corridor", bestFormats: ["LFH", "UPG", "LDS"] },
      { name: "Alambagh", type: "transit", description: "Major bus terminus, railway station approach, dense commercial — highest transit volume in city", bestFormats: ["LFH", "CBB", "ARB"] },
      { name: "Aliganj", type: "residential", description: "Dense upper-middle-class residential with busy local markets and educational institutions", bestFormats: ["LFH", "ARB", "BSP"] },
      { name: "Faizabad Road", type: "highway", description: "Airport approach corridor — first impression for every arriving visitor, rapid commercial growth", bestFormats: ["UPG", "LFH"] },
      { name: "Sultanpur Road", type: "highway", description: "Lucknow's fastest-growing corridor — new malls, apartments, IT offices expanding rapidly", bestFormats: ["UPG", "LFH"] },
      { name: "Indira Nagar / Mahanagar", type: "residential", description: "Established upper-middle-class residential colonies, strong consumer spending power", bestFormats: ["ARB", "BSP", "LFH"] },
      { name: "Chinhat / Kursi Road", type: "mixed", description: "Industrial and logistics corridor, expanding warehousing and residential projects", bestFormats: ["LFH", "UPG"] },
    ],
    campaigns: [
      { brand: "Paras Hospital", format: "Large Hoarding × 8", area: "Hazratganj, Gomti Nagar", year: "2024", accent: "#E8511A" },
      { brand: "Tanishq", format: "Auto Branding × 50", area: "City-wide", year: "2023", accent: "#B8860B" },
      { brand: "BlueStone", format: "Hoarding + LED Screen", area: "Hazratganj Circle", year: "2024", accent: "#1A6FA5" },
      { brand: "Tea Valley", format: "Bus Branding × 15", area: "All city routes", year: "2023", accent: "#3A7D44" },
      { brand: "Pan Bahar", format: "Unipole × 3", area: "Outer Ring Road", year: "2024", accent: "#C0392B" },
      { brand: "Allen", format: "Auto + Bus Branding", area: "Alambagh, Charbagh", year: "2023", accent: "#1A73E8" },
    ],
    office: {
      person: "Narjis",
      phone: "+91 95060 17729",
      address: "Flat No. 5, Greenwood Apartment, 22 Gokhle Marg, Lucknow — 226001",
    },
  },

  /* ─────────────────────── 02 KANPUR ─────────────────────── */
  {
    slug: "kanpur",
    name: "Kanpur",
    number: "02",
    tagline: "Industrial Capital of UP · Manchester of the East",
    heroStat: "3.1M+",
    heroStatLabel: "Population",
    population: "3.1 million+",
    dailyCommuters: "7 lakh+",
    keyMarkets: 10,
    totalSites: 85,
    overview:
      "Kanpur is Uttar Pradesh's largest industrial city and one of India's most important commercial hubs. Known as the 'Manchester of the East' for its leather and textile industries, Kanpur has a massive working-class and business community. Mall Road is the city's primary artery — a kilometre of banks, showrooms, offices and retail that rivals any metro high street.",
    whyHere: [
      "Largest industrial base in UP — massive B2B and workforce advertising opportunity",
      "GT Road (NH-19) connects Delhi to Kolkata through Kanpur — premium highway inventory",
      "Mall Road is one of India's highest-value OOH corridors outside of metro cities",
      "Dense population with strong disposable income in Civil Lines, Swaroop Nagar and Kidwai Nagar",
    ],
    formats: [
      {
        code: "LFH",
        name: "Large Format Hoardings",
        category: "static",
        sizes: ["40×20 ft", "30×15 ft", "20×10 ft"],
        locations: ["Mall Road", "Civil Lines", "Swaroop Nagar", "Juhi", "Kidwai Nagar", "Harsh Nagar", "Naveen Market"],
        dailyReach: "40,000 – 1,80,000",
        units: "28+ sites",
        rateRange: "₹20,000 – ₹1,00,000 / month",
        usp: "Mall Road hoardings — among UP's most-seen static OOH inventory",
      },
      {
        code: "UPG",
        name: "Unipoles & Gantries",
        category: "static",
        sizes: ["60×30 ft (gantry)", "40×20 ft (unipole)"],
        locations: ["GT Road (NH-19)", "Kanpur–Lucknow Expressway", "Outer Ring Road", "Jajmau Bridge approach"],
        dailyReach: "80,000 – 3,00,000",
        units: "10+ sites",
        rateRange: "₹40,000 – ₹2,00,000 / month",
        usp: "National highway gantries visible to Delhi–Lucknow corridor traffic",
      },
      {
        code: "ARB",
        name: "Auto Rickshaw Branding",
        category: "mobile",
        sizes: ["Full body wrap", "Back panel", "Side panels"],
        locations: ["Mall Road, Swaroop Nagar, Juhi Chauraha, Civil Lines, Harsh Nagar, Naveen Market"],
        dailyReach: "5,000 – 18,000 per auto",
        units: "150+ autos available",
        rateRange: "₹3,000 – ₹7,500 per auto / month",
        usp: "Penetrates deep into Kanpur's dense residential and market lanes",
      },
      {
        code: "CBB",
        name: "City Bus & Tempo Branding",
        category: "mobile",
        sizes: ["Full wrap", "Back panel", "Side strip"],
        locations: ["All KMC and private bus routes"],
        dailyReach: "20,000 – 45,000 per bus",
        units: "25+ buses available",
        rateRange: "₹16,000 – ₹40,000 per bus / month",
        usp: "Complete city-wide coverage — reaches factory workers, market visitors and commuters",
      },
      {
        code: "ACV",
        name: "Activity Vans / Canters",
        category: "mobile",
        sizes: ["Canter (12 ft), Mini canter (8 ft), Promotional van"],
        locations: ["Markets, malls, residential areas, factory gate activations"],
        dailyReach: "10,000 – 40,000 per event",
        units: "On-demand fleet",
        rateRange: "₹20,000 – ₹60,000 per day",
        usp: "Perfect for product launches, sampling and BTL activations across city zones",
      },
      {
        code: "BSP",
        name: "Bus Shelter Panels",
        category: "ambient",
        sizes: ["6×3 ft", "4×2 ft"],
        locations: ["Civil Lines, Swaroop Nagar, Mall Road, Juhi bus stops"],
        dailyReach: "8,000 – 25,000 per panel",
        units: "40+ panels",
        rateRange: "₹7,000 – ₹18,000 per panel / month",
        usp: "Eye-level visibility at high-dwell bus stops on Kanpur's busiest roads",
      },
    ],
    zones: [
      { name: "Mall Road", type: "commercial", description: "Kanpur's premium commercial strip — banks, showrooms, offices, retail, equivalent to a mini CP", bestFormats: ["LFH", "BSP"] },
      { name: "Civil Lines", type: "mixed", description: "Upscale residential and commercial — HNI households, government offices, premium brands", bestFormats: ["LFH", "UPG"] },
      { name: "Swaroop Nagar", type: "commercial", description: "Busy market zone with dense retail, wholesale and daily shoppers", bestFormats: ["LFH", "ARB", "BSP"] },
      { name: "GT Road (NH-19)", type: "highway", description: "National highway passing through Kanpur — massive through-traffic Delhi to Varanasi", bestFormats: ["UPG", "LFH"] },
      { name: "Juhi / Harsh Nagar", type: "residential", description: "Dense residential areas with high daily movement, strong local consumer base", bestFormats: ["ARB", "CBB", "BSP"] },
      { name: "Kidwai Nagar", type: "mixed", description: "Government offices, established residential, educational institutions", bestFormats: ["LFH", "ARB"] },
      { name: "Panki", type: "mixed", description: "Industrial estate area — factory workers commute, large workforce audience", bestFormats: ["LFH", "CBB"] },
      { name: "Naveen Market", type: "commercial", description: "Central Kanpur retail hub — high footfall, shopping and market traffic", bestFormats: ["LFH", "BSP", "ARB"] },
    ],
    campaigns: [
      { brand: "Rudra Group", format: "Outdoor Hoarding × 6", area: "Mall Road, GT Road", year: "2024", accent: "#C0392B" },
      { brand: "Digiway Net", format: "Hoarding + Auto Branding", area: "Civil Lines, Swaroop Nagar", year: "2023", accent: "#2D78C8" },
      { brand: "BlueStone", format: "Large Hoarding × 4", area: "Mall Road", year: "2024", accent: "#1A6FA5" },
      { brand: "Aakash", format: "Bus Branding × 12", area: "All city routes", year: "2023", accent: "#E67E22" },
      { brand: "Pan Bahar", format: "Unipole × 2 + Gantry × 1", area: "NH-19, Outer Ring Road", year: "2024", accent: "#C0392B" },
      { brand: "Maruti Suzuki", format: "Hoarding × 5", area: "Mall Road, Kidwai Nagar", year: "2023", accent: "#003087" },
    ],
    office: {
      person: "Khushi",
      phone: "+91 83539 72277",
      address: "63/2C Mega Mall, 706–707, 7th Floor, Mall Road, Kanpur — 208001",
    },
  },

  /* ─────────────────────── 03 DELHI ─────────────────────── */
  {
    slug: "delhi",
    name: "Delhi",
    number: "03",
    tagline: "India's Capital · 20M+ Population · India's No.1 OOH Market",
    heroStat: "20M+",
    heroStatLabel: "Population",
    population: "20 million+ (NCR: 32M+)",
    dailyCommuters: "45 lakh+ (Metro: 65L trips/day)",
    keyMarkets: 22,
    totalSites: 60,
    overview:
      "Delhi is India's largest OOH advertising market and the country's political, commercial and cultural capital. With a population exceeding 20 million in the city alone (NCR 32M+) and 65 lakh daily metro trips, no Indian market offers the sheer reach and prestige of a Delhi campaign. Our Delhi team operates from CR Park with strong connections across South, Central and West Delhi corridors.",
    whyHere: [
      "India's highest-value OOH market — brands see the highest prestige lift from a Delhi campaign",
      "Metro rail network (65L daily trips) creates unparalleled captive audience opportunities",
      "Ring Road and Outer Ring Road carry 30L+ vehicles daily — premium highway inventory",
      "South Delhi HNI corridor (GK, Lajpat, Saket, Vasant Kunj) is India's most affluent consumer cluster",
    ],
    formats: [
      {
        code: "LFH",
        name: "Large Format Hoardings",
        category: "static",
        sizes: ["60×30 ft", "40×20 ft", "30×15 ft"],
        locations: ["CR Park", "Lajpat Nagar", "Nehru Place", "Saket", "Karol Bagh", "Rohini", "Dwarka"],
        dailyReach: "80,000 – 5,00,000",
        units: "25+ sites",
        rateRange: "₹40,000 – ₹3,00,000 / month",
        usp: "Delhi hoardings deliver the highest per-impression prestige in India",
      },
      {
        code: "UPG",
        name: "Highway Unipoles & Mega Gantries",
        category: "static",
        sizes: ["80×40 ft (mega)", "60×30 ft", "40×20 ft"],
        locations: ["Ring Road", "Outer Ring Road", "NH-44", "NH-48", "Mathura Road", "NH-24 (Noida Link)"],
        dailyReach: "2,00,000 – 10,00,000",
        units: "15+ sites",
        rateRange: "₹80,000 – ₹5,00,000 / month",
        usp: "Delhi's ring roads carry 30L+ vehicles daily — unmatched highway OOH inventory",
      },
      {
        code: "MPB",
        name: "Metro Pillar & Station Branding",
        category: "ambient",
        sizes: ["Pillar wrap (full height)", "Concourse panel", "Platform panel"],
        locations: ["South Delhi metro stations", "CR Park corridor", "South Extension, Hauz Khas, AIIMS"],
        dailyReach: "30,000 – 2,00,000 per station",
        units: "Select stations available",
        rateRange: "₹30,000 – ₹1,50,000 / month",
        usp: "Captive audience in metro stations — 100% attention, zero distraction",
      },
      {
        code: "ARB",
        name: "Auto Rickshaw Branding",
        category: "mobile",
        sizes: ["Full body wrap", "Back panel", "Side panels"],
        locations: ["CR Park, GK I & II, Lajpat Nagar, Karol Bagh, South Ex"],
        dailyReach: "8,000 – 25,000 per auto",
        units: "100+ autos available",
        rateRange: "₹5,000 – ₹12,000 per auto / month",
        usp: "Last-mile OOH reaching Delhi's premium residential colonies",
      },
      {
        code: "LDS",
        name: "LED Digital Screens",
        category: "digital",
        sizes: ["20×10 ft", "30×15 ft (mega)"],
        locations: ["Select commercial corridors, Connaught Place area, South Delhi market zones"],
        dailyReach: "50,000 – 3,00,000",
        units: "Select locations",
        rateRange: "₹80,000 – ₹4,00,000 / month",
        usp: "Dynamic content — reach Delhi's decision-makers with real-time creative flexibility",
      },
      {
        code: "DTC",
        name: "DTC / Private Bus Branding",
        category: "mobile",
        sizes: ["Full bus wrap", "Back panel (8×4 ft)", "Side strips"],
        locations: ["All DTC routes covering South, Central and West Delhi"],
        dailyReach: "25,000 – 60,000 per bus",
        units: "30+ buses available",
        rateRange: "₹25,000 – ₹60,000 per bus / month",
        usp: "DTC buses cover every part of Delhi — total city coverage in one campaign",
      },
    ],
    zones: [
      { name: "Connaught Place", type: "commercial", description: "India's most iconic commercial address — premium brands, government offices, embassies, highest footfall", bestFormats: ["LFH", "LDS"] },
      { name: "South Delhi (GK / Lajpat)", type: "mixed", description: "India's wealthiest consumer belt — premium residential, upscale retail, HNI households", bestFormats: ["LFH", "ARB", "BSP"] },
      { name: "CR Park", type: "mixed", description: "Our home base — established community hub, strong brand recall zone for targeted campaigns", bestFormats: ["LFH", "ARB"] },
      { name: "Karol Bagh", type: "commercial", description: "One of India's biggest retail markets — jewellery, apparel, electronics, massive daily footfall", bestFormats: ["LFH", "DTC"] },
      { name: "Ring Road", type: "highway", description: "Delhi's arterial highway — 30L+ vehicles daily, premium inventory for mass reach", bestFormats: ["UPG", "LFH"] },
      { name: "Nehru Place / Saket", type: "mixed", description: "IT hub and premium mall corridor — tech professionals and upscale shoppers", bestFormats: ["LFH", "LDS"] },
      { name: "Rohini / Dwarka", type: "residential", description: "West Delhi's massive planned colonies — 40L+ residents, large working-class consumer base", bestFormats: ["LFH", "DTC", "ARB"] },
      { name: "Outer Ring Road", type: "highway", description: "Delhi's outer highway — connects all satellite towns, premium highway inventory", bestFormats: ["UPG"] },
    ],
    campaigns: [
      { brand: "PNG", format: "Metro Pillar Branding", area: "South Delhi stations", year: "2024", accent: "#DAA520" },
      { brand: "Paras Hospital", format: "Hoarding × 10 + LED", area: "Ring Road, CR Park, GK", year: "2024", accent: "#E8511A" },
      { brand: "Tanishq", format: "Bus Branding × 20", area: "South & Central Delhi routes", year: "2023", accent: "#B8860B" },
      { brand: "Kashi", format: "Auto Branding × 30", area: "South Delhi", year: "2024", accent: "#FF6B35" },
      { brand: "Siggnature", format: "Mega Hoarding × 2", area: "Outer Ring Road", year: "2023", accent: "#2C3E50" },
      { brand: "Digiway", format: "LED Screen Campaign", area: "CP area, Nehru Place", year: "2024", accent: "#2D78C8" },
    ],
    office: {
      person: "Akshay Sinha",
      phone: "+91 98387 98388",
      address: "A-39, CR Park, New Delhi — 110019",
    },
  },

  /* ─────────────────────── 04 BHOPAL ─────────────────────── */
  {
    slug: "bhopal",
    name: "Bhopal",
    number: "04",
    tagline: "Capital of MP · City of Lakes · Central India's Rising Market",
    heroStat: "2.1M+",
    heroStatLabel: "Population",
    population: "2.1 million+",
    dailyCommuters: "4 lakh+",
    keyMarkets: 8,
    totalSites: 70,
    overview:
      "Bhopal, the capital of Madhya Pradesh and the 'City of Lakes', is Central India's most important advertising market. A rapidly modernising city with a strong government, education and IT presence, Bhopal is seeing explosive commercial growth along the Hoshangabad Road and DB City Mall corridor. Our Arera Colony team covers the entire city with a strong network of hoardings, mobile media and ambient formats.",
    whyHere: [
      "State capital — highest concentration of MP government, CPSE offices and institutional buyers",
      "DB City Mall (Hoshangabad Road) is Central India's premium retail destination with massive daily footfall",
      "IT SEZ and new township developments on Hoshangabad Road and Ayodhya Bypass are fastest-growing corridors",
      "Cost-efficient market with high-quality audience — CPM significantly lower than metros",
    ],
    formats: [
      {
        code: "LFH",
        name: "Large Format Hoardings",
        category: "static",
        sizes: ["40×20 ft", "30×15 ft", "20×10 ft"],
        locations: ["MP Nagar Zone I & II", "Arera Colony", "New Market", "TT Nagar", "DB City corridor", "Ayodhya Bypass"],
        dailyReach: "30,000 – 1,20,000",
        units: "22+ sites",
        rateRange: "₹18,000 – ₹80,000 / month",
        usp: "Bhopal's hoardings deliver premium-quality eyeballs at Central India's most efficient CPM",
      },
      {
        code: "UPG",
        name: "Unipoles & Gantries",
        category: "static",
        sizes: ["60×30 ft (gantry)", "40×20 ft (unipole)"],
        locations: ["Hoshangabad Road", "Ayodhya Bypass", "Airport Road", "BHEL Chauraha", "Lalghati"],
        dailyReach: "60,000 – 2,00,000",
        units: "8+ sites",
        rateRange: "₹35,000 – ₹1,50,000 / month",
        usp: "Highway unipoles on Hoshangabad Road — Central India's fastest-growing corridor",
      },
      {
        code: "ARB",
        name: "Auto Rickshaw Branding",
        category: "mobile",
        sizes: ["Full body wrap", "Back panel", "Side panels"],
        locations: ["All routes — MP Nagar, Kohefiza, Hoshangabad Road, Arera Colony, Habibganj"],
        dailyReach: "4,000 – 15,000 per auto",
        units: "120+ autos available",
        rateRange: "₹2,500 – ₹6,500 per auto / month",
        usp: "Bhopal's dense auto network reaches every lane, colony and market",
      },
      {
        code: "CBB",
        name: "City Bus Branding (BCLL)",
        category: "mobile",
        sizes: ["Full wrap", "Back panel", "Side strip"],
        locations: ["All BCLL city bus routes"],
        dailyReach: "15,000 – 35,000 per bus",
        units: "20+ buses available",
        rateRange: "₹14,000 – ₹35,000 per bus / month",
        usp: "BCLL buses connect old city to new Bhopal — full demographic coverage",
      },
      {
        code: "BSP",
        name: "Bus Shelter Panels",
        category: "ambient",
        sizes: ["6×3 ft", "4×2 ft"],
        locations: ["MP Nagar, New Market, TT Nagar, Ayodhya Bypass stops, Hoshangabad Road"],
        dailyReach: "6,000 – 20,000 per panel",
        units: "35+ panels",
        rateRange: "₹6,000 – ₹16,000 per panel / month",
        usp: "Eye-level dwell-point contact at Bhopal's busiest bus stops",
      },
    ],
    zones: [
      { name: "MP Nagar Zone I & II", type: "commercial", description: "Bhopal's premier business district — offices, banks, showrooms, restaurants, highest footfall zone", bestFormats: ["LFH", "BSP"] },
      { name: "Arera Colony", type: "residential", description: "Premium residential colony — executives, government officials, professionals with high spending power", bestFormats: ["LFH", "ARB"] },
      { name: "New Market", type: "commercial", description: "Bhopal's oldest and busiest retail market — all-day heavy footfall from across the city", bestFormats: ["LFH", "BSP", "ARB"] },
      { name: "Hoshangabad Road", type: "mixed", description: "Bhopal's fastest-growing corridor — DB City Mall, IT offices, new apartments, hospitals", bestFormats: ["UPG", "LFH"] },
      { name: "TT Nagar", type: "mixed", description: "Government offices, schools, residential mix — established central Bhopal zone", bestFormats: ["LFH", "ARB", "BSP"] },
      { name: "Ayodhya Bypass", type: "highway", description: "Outer city highway — connects Indore road and Raisen road, heavy through-traffic", bestFormats: ["UPG", "LFH"] },
      { name: "Kohefiza", type: "residential", description: "Large residential area, strong local market presence", bestFormats: ["ARB", "CBB"] },
      { name: "BHEL / Govindpura", type: "mixed", description: "Industrial township — BHEL workers and government employees, large captive audience", bestFormats: ["LFH", "CBB"] },
    ],
    campaigns: [
      { brand: "Tanishq", format: "Auto Branding × 40", area: "City-wide", year: "2024", accent: "#B8860B" },
      { brand: "Paras Hospital", format: "Hoarding × 5", area: "MP Nagar, TT Nagar", year: "2023", accent: "#E8511A" },
      { brand: "Tea Valley", format: "Bus Branding × 8", area: "All BCLL routes", year: "2024", accent: "#3A7D44" },
      { brand: "Baljiwan Ghutti", format: "Hoarding × 6 + Auto × 25", area: "City-wide", year: "2024", accent: "#16A085" },
      { brand: "Pan Bahar", format: "Gantry × 1 + Unipole × 2", area: "Hoshangabad Road", year: "2023", accent: "#C0392B" },
      { brand: "Allen", format: "Bus Branding × 10", area: "All city routes", year: "2023", accent: "#1A73E8" },
    ],
    office: {
      person: "Syed Iqbal",
      phone: "+91 81759 88988",
      address: "8/1 Nupur Kunj E3, Arera Colony, Hoshangabad Road, Bhopal — 462016",
    },
  },

  /* ─────────────────────── 05 AGRA ─────────────────────── */
  {
    slug: "agra",
    name: "Agra",
    number: "05",
    tagline: "City of the Taj · 60L+ Annual Tourists · UP's Premier Tourism Market",
    heroStat: "60L+",
    heroStatLabel: "Annual tourists",
    population: "1.6 million+",
    dailyCommuters: "3 lakh+",
    keyMarkets: 7,
    totalSites: 55,
    overview:
      "Agra is unique in India's OOH landscape — a city where your brand is seen not just by 1.6 million residents but by over 60 lakh domestic and international tourists every year. The Fatehabad Road tourist corridor is one of India's most distinctive OOH environments. Add to this Agra's growing industrial base (leather, footwear, chemicals) and its strategic position on the Taj Expressway and GT Road, and you have a powerful dual audience of locals and high-spending visitors.",
    whyHere: [
      "Dual audience: 1.6M residents + 60L+ annual tourists — unique OOH opportunity in India",
      "Fatehabad Road is one of India's most distinctive advertising corridors — seen by every Taj visitor",
      "Taj Expressway connects Agra directly to Noida/Greater Noida — premium highway inventory",
      "Agra's leather and footwear industry makes it a major B2B market for raw materials and trade branding",
    ],
    formats: [
      {
        code: "LFH",
        name: "Large Format Hoardings",
        category: "static",
        sizes: ["40×20 ft", "30×15 ft", "20×10 ft"],
        locations: ["Sanjay Place", "MG Road", "Agra Cantt area", "Bodla Road", "Kamla Nagar", "Shahganj"],
        dailyReach: "25,000 – 1,00,000",
        units: "20+ sites",
        rateRange: "₹15,000 – ₹70,000 / month",
        usp: "Agra's hoardings hit both the high-spending tourist market and the local consumer",
      },
      {
        code: "UPG",
        name: "Unipoles & Highway Gantries",
        category: "static",
        sizes: ["60×30 ft (gantry)", "40×20 ft (unipole)"],
        locations: ["Taj Expressway", "NH-19 (GT Road)", "NH-44 (Agra Bypass)", "Agra–Jaipur Highway"],
        dailyReach: "50,000 – 2,50,000",
        units: "8+ sites",
        rateRange: "₹30,000 – ₹1,20,000 / month",
        usp: "Taj Expressway gantries — seen by every Delhi–Agra tourist and commuter",
      },
      {
        code: "TCP",
        name: "Tourist Corridor Panels",
        category: "static",
        sizes: ["20×10 ft (backlit)", "30×15 ft (LED)"],
        locations: ["Fatehabad Road (Taj approach)", "East Gate Road", "Sikandra corridor", "Agra Fort approach"],
        dailyReach: "20,000 – 80,000 (tourists + locals)",
        units: "10+ premium sites",
        rateRange: "₹20,000 – ₹90,000 / month",
        usp: "Unique India inventory — tourist-facing OOH seen by international and domestic visitors",
      },
      {
        code: "ARB",
        name: "Auto / E-Rickshaw Branding",
        category: "mobile",
        sizes: ["Full body wrap", "Back panel", "Side panels"],
        locations: ["Tourist triangle routes, city-wide and Fatehabad Road"],
        dailyReach: "3,000 – 12,000 per vehicle",
        units: "100+ autos and e-rickshaws available",
        rateRange: "₹2,500 – ₹6,000 per vehicle / month",
        usp: "E-rickshaws serve the tourist triangle — reaching visitors during their Agra experience",
      },
      {
        code: "CBB",
        name: "City Bus & E-Rickshaw Fleet",
        category: "mobile",
        sizes: ["Full wrap", "Back panel"],
        locations: ["City routes and tourist connecting routes"],
        dailyReach: "8,000 – 25,000 per unit",
        units: "20+ available",
        rateRange: "₹10,000 – ₹30,000 per unit / month",
        usp: "Rolling brand presence across Agra's local and tourism transport network",
      },
    ],
    zones: [
      { name: "Sanjay Place", type: "commercial", description: "Agra's primary commercial hub — offices, banks, showrooms, retail. Highest daily footfall.", bestFormats: ["LFH", "BSP"] },
      { name: "Fatehabad Road", type: "tourism", description: "Taj Mahal tourist approach — every visitor passes this road. Unique India-only inventory.", bestFormats: ["TCP", "LFH"] },
      { name: "MG Road", type: "commercial", description: "Busy commercial stretch with retail, eateries and offices", bestFormats: ["LFH", "ARB"] },
      { name: "Agra Cantt / Shahganj", type: "mixed", description: "Upscale commercial area near railway station — business travellers, premium shoppers", bestFormats: ["LFH", "UPG"] },
      { name: "Taj Expressway", type: "highway", description: "Premium expressway connecting Delhi NCR to Agra — 1 crore+ vehicles annually", bestFormats: ["UPG"] },
      { name: "GT Road (NH-19)", type: "highway", description: "Historic national highway — heavy commercial and tourist through-traffic", bestFormats: ["UPG", "LFH"] },
      { name: "Sikandra", type: "tourism", description: "Akbar's tomb corridor — tourist traffic and upscale residential expansion", bestFormats: ["TCP", "LFH"] },
      { name: "Bodla Road / Kalindi Vihar", type: "residential", description: "Large growing residential zone — new apartments and colonies, emerging consumer base", bestFormats: ["LFH", "ARB"] },
    ],
    campaigns: [
      { brand: "Pan Bahar", format: "Unipole × 2 + Gantry × 1", area: "GT Road, Taj Expressway", year: "2024", accent: "#C0392B" },
      { brand: "Maruti Suzuki", format: "Hoarding × 4", area: "Sanjay Place, MG Road", year: "2023", accent: "#003087" },
      { brand: "Tanishq", format: "Auto Branding × 30", area: "Tourist triangle + city", year: "2024", accent: "#B8860B" },
      { brand: "Aakash", format: "Hoarding × 3 + Bus × 5", area: "City-wide", year: "2023", accent: "#E67E22" },
      { brand: "Tea Valley", format: "Tourist Corridor Panel × 4", area: "Fatehabad Road", year: "2024", accent: "#3A7D44" },
      { brand: "BlueStone", format: "Backlit Hoarding × 2", area: "Sanjay Place", year: "2024", accent: "#1A6FA5" },
    ],
    office: {
      person: "Shubhashish",
      phone: "+91 99979 27300",
      address: "501A Corporate Park Building, Sanjay Place, Agra — 282002",
    },
  },

  /* ─────────────────────── 06 PRAYAGRAJ ─────────────────────── */
  {
    slug: "prayagraj",
    name: "Prayagraj",
    number: "06",
    tagline: "City of the Sangam · Maha Kumbh City · UP's Spiritual Capital",
    heroStat: "40Cr+",
    heroStatLabel: "Maha Kumbh visitors",
    population: "1.5 million+",
    dailyCommuters: "3 lakh+",
    keyMarkets: 6,
    totalSites: 45,
    overview:
      "Prayagraj is one of India's most culturally significant cities — home to the historic Sangam of three rivers and the world's largest religious gathering, the Maha Kumbh. During Kumbh and Maha Kumbh events, the city receives 40 crore+ pilgrims, creating India's single largest OOH advertising opportunity. Even outside of Kumbh, Prayagraj is a major legal, educational and administrative centre with a growing urban economy.",
    whyHere: [
      "Maha Kumbh 2025 brought 40Cr+ visitors — the world's single largest OOH advertising event",
      "High Court, Central Government offices and premier educational institutions (Allahabad University, IIT) create elite audience",
      "NH-19 and NH-27 pass through Prayagraj — gateway city on the Delhi–Varanasi corridor",
      "Emerging smart city project and infrastructure development creating new premium OOH corridors",
    ],
    formats: [
      {
        code: "LFH",
        name: "Large Format Hoardings",
        category: "static",
        sizes: ["40×20 ft", "30×15 ft", "20×10 ft"],
        locations: ["Civil Lines", "MG Marg", "Zero Road", "Rambagh", "Allahpur", "Naini"],
        dailyReach: "25,000 – 80,000",
        units: "15+ sites",
        rateRange: "₹12,000 – ₹60,000 / month",
        usp: "Strategic positioning in Prayagraj's established commercial and institutional zones",
      },
      {
        code: "UPG",
        name: "Unipoles & Gantries",
        category: "static",
        sizes: ["60×30 ft (gantry)", "40×20 ft (unipole)"],
        locations: ["GT Road (NH-19)", "Lucknow Road (NH-27)", "Allahabad Bypass", "Naini Industrial Approach"],
        dailyReach: "40,000 – 1,50,000",
        units: "6+ sites",
        rateRange: "₹28,000 – ₹1,00,000 / month",
        usp: "Gateway city on the Delhi–Varanasi corridor — highway traffic from both directions",
      },
      {
        code: "ARB",
        name: "Auto Rickshaw Branding",
        category: "mobile",
        sizes: ["Full body wrap", "Back panel", "Side panels"],
        locations: ["All city routes, Sangam road, Mela corridors during events"],
        dailyReach: "3,000 – 10,000 per auto",
        units: "80+ autos available",
        rateRange: "₹2,500 – ₹6,000 per auto / month",
        usp: "Prayagraj's auto fleet reaches every corner including the pilgrimage and mela corridors",
      },
      {
        code: "KBE",
        name: "Kumbh / Event Special Inventory",
        category: "ambient",
        sizes: ["Flex boards, Temporary hoardings, LED walls", "Multiple formats"],
        locations: ["Mela grounds approach, Sangam corridor, Railway and Bus station approaches"],
        dailyReach: "Lakhs per day during Kumbh period",
        units: "On demand during Kumbh events",
        rateRange: "On request (seasonal premium rates)",
        usp: "World's largest OOH opportunity — 40Cr+ captive visitors during Maha Kumbh",
      },
    ],
    zones: [
      { name: "Civil Lines", type: "commercial", description: "Prayagraj's upscale commercial area — premium brands, government offices, HNI residential", bestFormats: ["LFH", "BSP"] },
      { name: "MG Marg", type: "commercial", description: "Main road with high-end establishments, restaurants and offices", bestFormats: ["LFH", "ARB"] },
      { name: "Zero Road", type: "commercial", description: "Busy commercial junction — central Prayagraj retail and market activity", bestFormats: ["LFH", "ARB"] },
      { name: "Rambagh", type: "transit", description: "Bus station and railway junction area — massive transit footfall", bestFormats: ["LFH", "CBB"] },
      { name: "Sangam / Mela Corridor", type: "tourism", description: "Pilgrimage corridor — during Kumbh: largest single-event OOH opportunity in the world", bestFormats: ["KBE", "LFH"] },
      { name: "Naini", type: "mixed", description: "Industrial zone across the Yamuna — manufacturing and logistics audience", bestFormats: ["LFH", "UPG"] },
    ],
    campaigns: [
      { brand: "Tanishq", format: "Auto Branding × 25", area: "City-wide", year: "2024", accent: "#B8860B" },
      { brand: "Maruti Suzuki", format: "Hoarding × 3", area: "Civil Lines, MG Marg", year: "2023", accent: "#003087" },
      { brand: "Pan Bahar", format: "Unipole × 1 + Gantry × 1", area: "NH-19, Bypass", year: "2024", accent: "#C0392B" },
      { brand: "Baljiwan Ghutti", format: "Hoarding × 5 + Auto × 20", area: "City-wide", year: "2024", accent: "#16A085" },
      { brand: "Tea Valley", format: "Kumbh Special: LED + Flex", area: "Sangam corridor", year: "2025", accent: "#3A7D44" },
      { brand: "Allen", format: "Bus Branding × 8", area: "All city routes", year: "2023", accent: "#1A73E8" },
    ],
    office: {
      person: "Regional Team",
      phone: "+91 95060 17729",
      address: "Serving brands across the Prayagraj region. Managed from Lucknow HQ.",
    },
  },
];
