
// Replace these with your actual Supabase keys when ready
// For the demo to work immediately, we will default to a 'demo' mode if keys are missing.

export const SUPABASE_URL = "https://lbhfwwgtkslzgdgaoiae.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_O0niX5aUMSpHF7cMAwd7SQ_-K9c9HzA";

export const TELEGRAM_LINK = "https://t.me/gobishiftu"; 
export const INSTAGRAM_LINK = "https://www.instagram.com/gobishoftu/";
export const ADMIN_ACCESS_CODE = "azanazi@32"; // Simple MVP protection

// Using the thumbnail endpoint is much more reliable for img tags than the export=view endpoint
export const LOGO_URL = "https://drive.google.com/thumbnail?id=1St5sgAktLrPLzVZHpODXVvpdfyjnYfMv&sz=s400";
export const FOOTER_LOGO_URL = "https://drive.google.com/thumbnail?id=15JciA4oa_24d84iGNDpsiKSOhb8_2-hp&sz=w1000";

export const CITY_HERO_IMAGES = [
  "https://drive.google.com/thumbnail?id=1lJwm-8vmy1G4mMMpNf16SCG3ccUhVDWv&sz=w1920",
  "https://drive.google.com/thumbnail?id=13d8nqp8mCWQH2tg7Daf8dqV8w1NPdPez&sz=w1920",
  "https://drive.google.com/thumbnail?id=1VUasrCmU8T14UEno-rPV1_fKd-YCHtOW&sz=w1920",
  "https://drive.google.com/thumbnail?id=1z9RrII3AjEtauVBcO2SkjPppdUE-TT5r&sz=w1920",
  "https://drive.google.com/thumbnail?id=12tpAR_k6-b69AWS8XJSPxHJOheRwsIPR&sz=w1920",
  "https://drive.google.com/thumbnail?id=1tMAtW6aZ6xibxFxi01kht0gmuWqWB8-u&sz=w1920"
];

export const LAKE_IMAGES = {
  hora: "https://drive.google.com/thumbnail?id=1MdeG2aVGpgtmypYaHRFlbmitrAxdmgBG&sz=w1200",
  babogaya: "https://drive.google.com/thumbnail?id=1Q5mKPimt6nwqooFkRUQ-r5gbKvmwldT-&sz=w1200",
  kuriftu: "https://drive.google.com/thumbnail?id=1yah2IPpn_4qTYJ2k4IRGqREIvtZKuvMQ&sz=w1200"
};

export const WEEKEND_VIBES_IMAGE = "https://drive.google.com/thumbnail?id=1oyIshus1zBCbgNxJpXhakyG3CtaVq5ET&sz=w1920";

export const PLACEHOLDER_IMAGES = {
  hero: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg",
  lake: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg",
  resort: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg",
  nature: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg",
  comingSoon: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg"
};

export const IS_DEMO_MODE = !SUPABASE_URL || !SUPABASE_ANON_KEY;
