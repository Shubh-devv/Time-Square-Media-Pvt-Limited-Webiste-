// Content sourced from timesquaremedia.in

export type ServiceExtended = {
  tagline: string;
  overview: string;
  process: string[];
  suitableFor: string;
  simpleExplainer?: string;
};

export type Service = {
  code: string;
  title: string;
  body: string;
  points: string[];
  extended: ServiceExtended;
};

export const COMPANY = {
  name: "Time Square Media",
  legalName: "TimesSquare Media Services Pvt. Ltd.",
  tagline: "Out-of-Home. Amplified by Digital.",
  phone: "+91 95060 17729",
  phone2: "+91 98387 98388",
  email: "info@timesquaremedia.in",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/timesquare_media/" },
    { label: "Facebook",  href: "https://www.facebook.com/TimeSquareServices" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/company/timesquare-media/" },
    { label: "Twitter",   href: "https://twitter.com/timesquarmedia" },
    { label: "Pinterest", href: "https://in.pinterest.com/timesquaremedia/" },
  ],
};

export const NAV = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work" },
  { label: "Presence", href: "/presence" },
  { label: "Blog",     href: "/blog" },
];

export const IMPACT_STATS = [
  { value: 92, suffix: "%", label: "Noticeability", note: "of people notice OOH ads every month" },
  { value: 76, suffix: "%", label: "Recall",        note: "recall the ads they see on OOH" },
  { value: 93, suffix: "%", label: "Confidence",    note: "feel more confident in brands seen on OOH" },
  { value: 85, suffix: "%", label: "Action",        note: "take some form of action after seeing OOH" },
];

export const HOUSE_STATS = [
  { value: 12,  suffix: "+", label: "Years in advertising" },
  { value: 6,   suffix: "",  label: "Cities across India" },
  { value: 100, suffix: "+", label: "Brands trusted us" },
  { value: 1,   suffix: "",  label: "In-house fabrication unit" },
];

export const SERVICES: Service[] = [
  {
    code: "OOH",
    title: "Brand Building",
    body: "Billboards, hoardings, gantries and LED video walls that create lasting brand landmarks across cities, highways and high-footfall corridors.",
    points: ["Hoardings & billboards", "Unipole & gantries", "LED video walls", "Bus shelters & FOBs"],
    extended: {
      tagline: "Make Your Brand a City Landmark",
      overview: "Out-of-Home advertising puts your brand in the physical world — unavoidable, 24/7, and impossible to scroll past or ad-block. A well-placed hoarding works around the clock, building brand recall with every commuter, every single day. We manage everything from site selection to installation, entirely in-house.",
      process: [
        "Site selection — high-footfall, high-visibility locations across 6 cities",
        "Creative design tailored for the format and local audience",
        "In-house fabrication for faster timelines and guaranteed quality",
        "Professional installation, monitoring and monthly campaign reporting",
      ],
      suitableFor: "Real estate, retail, FMCG, banks, healthcare — any brand that wants city-wide awareness that cannot be skipped, blocked or scrolled past.",
    },
  },
  {
    code: "MOB",
    title: "Mobile Media",
    body: "Dynamic advertising on the move — wrapping autos, metro trains, canters and Volvo buses so your brand travels wherever your audience does.",
    points: ["Auto & toto branding", "Metro & bus wraps", "Activity vans & canters", "Promo stands & tents"],
    extended: {
      tagline: "Your Brand, Always Moving",
      overview: "Mobile media takes your message to every corner of the city — residential lanes, busy markets, IT corridors and everywhere your customers go throughout the day. Unlike fixed hoardings, branded vehicles cover ground that traditional OOH simply cannot reach.",
      process: [
        "Route mapping — we identify high-density areas matching your target audience",
        "Creative design optimised for each vehicle format",
        "Professional vinyl wrapping with quality-guaranteed materials",
        "Fleet activation, route tracking and daily impression reporting",
      ],
      suitableFor: "E-commerce, food & beverage, apparel, telecom, and local businesses wanting high city-wide impressions at an efficient cost-per-thousand (CPM).",
    },
  },
  {
    code: "DGM",
    title: "Digital Marketing",
    body: "Performance ads, social campaigns, SEO and influencer marketing that carry the outdoor story onto every screen your audience holds.",
    points: ["Google & Meta ads", "Social media management", "SEO & content creation", "Influencer marketing"],
    extended: {
      tagline: "On Every Screen, In Every Feed",
      overview: "Digital marketing extends the reach of your outdoor campaign onto every screen — Google Search, Instagram, Facebook, YouTube. We run targeted ads, manage your social presence, build SEO-driven content and connect you with the right influencers — all aligned with your OOH messaging for a seamless brand story.",
      process: [
        "Audience research, buyer persona creation and competitive analysis",
        "Full campaign strategy and creative brief aligned with your OOH theme",
        "Ad setup, targeting configuration and creative A/B testing",
        "Weekly performance reports with actionable insights and continuous optimisation",
      ],
      suitableFor: "Businesses wanting to combine offline visibility with online conversions — particularly powerful when run alongside OOH campaigns for cross-channel brand reinforcement.",
    },
  },
  {
    code: "IOM",
    title: "On / In Media",
    body: "In-store and on-site advertising — from neon signage and crystal LEDs to dealer boards, window displays and vinyl applications.",
    points: ["Neons & crystal LED", "Dealer & ACP boards", "Signage & stickers", "LED running displays"],
    extended: {
      tagline: "Own the Space Around You",
      overview: "On/In media turns your physical premises into a powerful brand statement. From glowing neon signs that stop people in their tracks to dealer boards that build credibility on every street, our in-house fabrication team handles everything from design to installation.",
      process: [
        "Site visit and precise measurements",
        "Design selection aligned with brand guidelines and material choices",
        "In-house fabrication — quality control at every step",
        "Professional installation with clean finishing and handover documentation",
      ],
      suitableFor: "Retail shops, showrooms, dealer networks, banks, hospitals, restaurants and any brand with a physical touchpoint that needs to make a strong first impression.",
    },
  },
  {
    code: "BTL",
    title: "BTL & Activations",
    body: "On-ground activations and below-the-line campaigns that turn passing attention into real, in-person engagement with your brand.",
    points: ["Event activations", "Experiential setups", "Promotional drives", "On-ground campaigns"],
    extended: {
      tagline: "From Attention to Real Engagement",
      overview: "BTL (Below The Line) marketing creates direct, personal connections between your brand and your audience. Activations, product sampling, experiential events — people remember what they experience far longer than what they simply see. We plan and execute every detail so your activation runs flawlessly.",
      process: [
        "Campaign concept development and activation plan",
        "Venue / location shortlisting with footfall analysis",
        "Staff, props, branded material and full logistics coordination",
        "Execution, photo/video documentation and post-campaign analysis report",
      ],
      suitableFor: "FMCG product launches, new market entries, college and mall activations, and any brand wanting to personally engage with a specific demographic and drive trial or sign-ups.",
    },
  },
  {
    code: "RTL",
    title: "Retail Consultancy",
    body: "Retail branding and in-store solutions, backed by our own fabrication unit — so every campaign is delivered end-to-end under one roof.",
    points: ["Retail branding", "In-store solutions", "In-house fabrication", "Visual merchandising"],
    extended: {
      tagline: "A Brand-New Store Experience",
      overview: "Great retail branding turns a shop into a destination. Our consultancy covers everything from store fascia boards and in-aisle displays to visual merchandising and point-of-sale materials — all fabricated and installed in-house. One agency, one invoice, zero coordination headaches.",
      process: [
        "Retail audit — we review your current store branding and identify opportunities",
        "Design concept aligned with your brand identity and footfall patterns",
        "In-house fabrication of all signage, display and branding materials",
        "Professional installation, final walkthrough and handover",
      ],
      suitableFor: "Multi-outlet retail chains, dealer networks, showrooms, pharmacies, QSR brands and any business building a consistent, professional store identity across locations.",
    },
  },
  {
    code: "WEB",
    title: "Web Solutions",
    body: "Fast, mobile-first websites, landing pages and e-commerce platforms built to convert — SEO-ready and optimised for lead generation from day one.",
    points: ["Website design & development", "E-commerce & landing pages", "SEO & performance optimisation", "Maintenance & support"],
    extended: {
      tagline: "Your Digital Shopfront, Done Right",
      overview: "Your website is your 24/7 salesperson. We design and build websites that load fast, look professional on mobile, and turn visitors into actual leads. No confusing tech jargon — just clean, effective websites that work for real businesses and are understood by anyone who visits them.",
      process: [
        "Discovery call — we understand your business, goals and target customers",
        "Design mockup in your brand colours and style (you approve before we build anything)",
        "Development: fast-loading, mobile-first, search-engine-friendly code",
        "Launch + 30 days post-launch support at no extra charge",
      ],
      suitableFor: "Startups, local businesses, real estate agencies, clinics, schools, restaurants, retail brands — anyone who needs an online presence that actually brings in customers.",
      simpleExplainer: "Think of us as the people who build your online office or shop. When someone searches for your business online, they find a clean, professional website that tells them exactly who you are, what you do, and how to reach you. We handle everything — design, development, launch — and explain every step in plain language.",
    },
  },
];

export const CITIES = [
  {
    city: "Lucknow",
    address: "Flat No.5 Greenwood Apartment, 22 Gokhle Marg, Lucknow — 226001",
    contact: "Narjis",
    phone: "+91 95060 17729",
  },
  {
    city: "Kanpur",
    address: "63/2C Mega Mall, 706–707, 7th Floor, Mall Road, Kanpur — 208001",
    contact: "Khushi",
    phone: "+91 83539 72277",
  },
  {
    city: "Delhi",
    address: "A-39, CR Park, New Delhi — 110019",
    contact: "Akshay Sinha",
    phone: "+91 98387 98388",
  },
  {
    city: "Bhopal",
    address: "8/1 Nupur Kunj E3, Arera Colony, Hoshangabad Road, Bhopal",
    contact: "Syed Iqbal",
    phone: "+91 81759 88988",
  },
  {
    city: "Agra",
    address: "501A Corporate Park Building, Sanjay Place, Agra — 282002",
    contact: "Shubhashish",
    phone: "+91 99979 27300",
  },
  {
    city: "Prayagraj",
    address: "Serving brands across the Prayagraj region.",
    contact: "",
    phone: "",
  },
];

export const WORK = [
  { name: "Rudra",                 category: "Outdoor Hoarding",            city: "Kanpur" },
  { name: "Digiway Net Pvt. Ltd.", category: "Branding · Outdoor Hoarding", city: "" },
  { name: "BlueStone",             category: "Outdoor Hoarding",            city: "" },
  { name: "Siggnature",            category: "Outdoor Hoarding",            city: "" },
  { name: "Tea Valley",            category: "Branding",                    city: "" },
  { name: "Pan Bahar",             category: "Branding",                    city: "" },
  { name: "Paras Hospital",         category: "Branding",                    city: "" },
];

export const CLIENTS = [
  "BlueStone",
  "Tea Valley",
  "Pan Bahar",
  "Digiway",
  "Baljiwan Ghutti",
  "Siggnature",
  "Rudra",
  "Paras Hospital",
  "Tanishq",
  "Maruti Suzuki",
  "Aakash",
  "Allen",
  "Kashi",
  "PNG",
];

export const TICKER_TERMS = [
  "Brand Building",
  "Mobile Media",
  "Digital Marketing",
  "On / In Media",
  "BTL & Activations",
  "Retail Consultancy",
  "Web Solutions",
  "Hoardings",
  "LED Video Walls",
  "In-House Fabrication",
];
