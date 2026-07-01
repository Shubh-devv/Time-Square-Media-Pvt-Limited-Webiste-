"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "bot" | "user"; text: string; followUps?: string[]; connectCTA?: boolean };

const GREETING =
  "Namaste! 🙏 I'm the TSM Smart Assistant.\n\nI can help you with OOH advertising, digital marketing, web solutions, pricing, and city coverage — in any language.\n\nAsk me anything, or pick a topic below.";

const QUICK_REPLIES = [
  "What is OOH advertising?",
  "Cities you cover",
  "Pricing / Quote",
  "Digital marketing",
  "Web & app solutions",
  "Talk to our team",
];

/* ─── Language detection ─── */
type Lang = "ta"|"te"|"ml"|"kn"|"bn"|"gu"|"pa"|"hi"|"mr"|"ar"|"zh"|"en";

/* Marathi-specific Devanagari words that don't appear in standard Hindi */
const MARATHI_WORDS = /\b(आहे|आहोत|नाही|करायचे|सांगा|द्यायचे|घ्यायचे|आपले|कसे|म्हणजे|आणि|होते|असते|केले|बघा|करतो|करतात|द्या|घ्या|येतो|जातो|पाहिजे)\b/;

function detectLang(text: string): Lang {
  if (/[஀-௿]/.test(text)) return "ta";   // Tamil
  if (/[ఀ-౿]/.test(text)) return "te";   // Telugu
  if (/[ഀ-ൿ]/.test(text)) return "ml";   // Malayalam
  if (/[ಀ-೿]/.test(text)) return "kn";   // Kannada
  if (/[ঀ-৿]/.test(text)) return "bn";   // Bengali
  if (/[઀-૿]/.test(text)) return "gu";   // Gujarati
  if (/[਀-੿]/.test(text)) return "pa";   // Punjabi
  if (/[ऀ-ॿ]/.test(text)) {
    return MARATHI_WORDS.test(text) ? "mr" : "hi"; // Devanagari: Marathi or Hindi
  }
  if (/[؀-ۿ]/.test(text)) return "ar";   // Arabic
  if (/[一-鿿぀-ヿ]/.test(text)) return "zh"; // Chinese/Japanese
  return "en";
}

/* ─── Tamil full translations (key → translated response) ─── */
const TAMIL: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: {
    a: "வணக்கம்! 🙏 Time Square Media-க்கு வரவேற்கிறோம்!\n\n12+ ஆண்டுகள் விளம்பர அனுபவம் கொண்ட நிறுவனம்.\n\nகீழுள்ள தலைப்புகளில் கேளுங்கள்:",
    followUps: ["OOH விளம்பரம் என்ன?", "விலை / மேற்கோள்", "நகரங்கள்", "குழுவுடன் பேசுங்கள்"],
  },
  team: {
    a: "எங்கள் குழு உங்களுக்காக தயாராக உள்ளது!\n\n📞 லக்னோ - +91 95060 17729\n📞 டெல்லி - +91 98387 98388\n📧 info@timesquaremedia.in\n💬 WhatsApp பட்டனை அழுத்துங்கள்\n\nவேலை நாட்களில் 2 மணி நேரத்தில் பதிலளிக்கிறோம்.",
    followUps: ["விலை / மேற்கோள்", "நகரங்கள்", "OOH விளம்பரம் என்ன?"],
    connectCTA: true,
  },
  ooh: {
    a: "OOH (Out-of-Home) விளம்பரம் — 24/7 ஆயிரக்கணக்கான மக்களுக்கு தெரியும்!\n\nவடிவங்கள்:\n• பெரிய விளம்பர பலகைகள் (Hoardings)\n• Unipoles & Gantries\n• LED வீடியோ சுவர்கள்\n• பேருந்து நிலைய பலகைகள்\n• மெட்ரோ நிலைய விளம்பரங்கள்\n\nடிஜிட்டல் விளம்பரத்தை யாரும் skip செய்யலாம் — OOH-ஐ யாரும் தவிர்க்க முடியாது!",
    followUps: ["விலை / மேற்கோள்", "நகரங்கள்", "குழுவுடன் பேசுங்கள்"],
    connectCTA: true,
  },
  roi: {
    a: "OOH விளம்பரத்தின் நிரூபிக்கப்பட்ட முடிவுகள்:\n• 92% மக்கள் மாதமும் OOH விளம்பரங்களை கவனிக்கிறார்கள்\n• 76% பலகை விளம்பரங்களை நினைவில் வைக்கிறார்கள்\n• 93% OOH-இல் பார்த்த பிராண்டுகளில் நம்பிக்கை வைக்கிறார்கள்\n• 85% OOH பார்த்த பிறகு நடவடிக்கை எடுக்கிறார்கள்",
    followUps: ["OOH விளம்பரம் என்ன?", "விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்"],
  },
  digital: {
    a: "எங்கள் டிஜிட்டல் மார்க்கெட்டிங் சேவைகள்:\n• Google Ads & Meta (Facebook/Instagram)\n• சமூக வலைதளங்கள் மேலாண்மை\n• SEO & உள்ளடக்க உருவாக்கம்\n• YouTube & வீடியோ பிரச்சாரங்கள்\n• Influencer மார்க்கெட்டிங்\n\nOOH பிரச்சாரத்துடன் இணைந்த டிஜிட்டல் — இரட்டிப்பு பலன்!",
    followUps: ["வலைத்தள தீர்வுகள்", "விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்"],
    connectCTA: true,
  },
  web: {
    a: "நாங்கள் உண்மையில் வாடிக்கையாளர்களை கொண்டுவரும் வலைத்தளங்கள் கட்டுகிறோம்:\n• வணிக வலைத்தளங்கள்\n• E-commerce தளங்கள்\n• Campaign landing pages\n• SEO-optimised & மொபைல்-ஃபர்ஸ்ட்\n• 30 நாள் இலவச ஆதரவு\n\nவலைத்தளம் — உங்கள் 24/7 விற்பனையாளர்!",
    followUps: ["டிஜிட்டல் மார்க்கெட்டிங்", "விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்"],
    connectCTA: true,
  },
  mobile: {
    a: "மொபைல் மீடியா — உங்கள் பிராண்டை எங்கும் கொண்டு செல்கிறோம்:\n• ஆட்டோ & டோட்டோ பிராண்டிங்\n• பேருந்து & மெட்ரோ wraps\n• Activity vans & canters\n• Promo stands & tents\n\nநிலையான பலகைகளால் சென்றடைய முடியாத இடங்களுக்கும் செல்கிறோம்!",
    followUps: ["OOH விளம்பரம் என்ன?", "விலை / மேற்கோள்", "நகரங்கள்"],
  },
  btl: {
    a: "BTL & Activation பிரச்சாரங்கள்:\n• Mall & கல்லூரி activations\n• தயாரிப்பு மாதிரி விநியோகம்\n• Experiential brand setups\n• On-ground promo campaigns\n\nமக்கள் அனுபவித்ததை நீண்ட நாள் நினைவில் வைக்கிறார்கள்!",
    followUps: ["டிஜிட்டல் மார்க்கெட்டிங்", "விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்"],
  },
  retail: {
    a: "Retail & Signage தீர்வுகள்:\n• Neon & Crystal LED signs\n• Dealer & ACP boards\n• In-store display branding\n• Visual merchandising\n\nனாங்களே தயாரிக்கிறோம் — வெளியில் ஒப்படைக்கவில்லை!",
    followUps: ["OOH விளம்பரம் என்ன?", "விலை / மேற்கோள்", "நகரங்கள்"],
  },
  price: {
    a: "தோராயமான விலை வழிகாட்டி:\n• ஒரு பலகை — மாதம் ₹50,000 முதல்\n• முழு நகர பிரச்சாரம் — ₹3L முதல் ₹15L வரை\n• ஆட்டோ பிராண்டிங் — ₹15,000 முதல்\n• டிஜிட்டல் மார்க்கெட்டிங் — மாதம் ₹20,000 முதல்\n• வலைத்தளம் — ₹25,000 முதல்\n\nதனிப்பட்ட மேற்கோளுக்கு +91 95060 17729 அழையுங்கள்!",
    followUps: ["குழுவுடன் பேசுங்கள்", "நகரங்கள்", "OOH விளம்பரம் என்ன?"],
    connectCTA: true,
  },
  cities: {
    a: "நாங்கள் 6 நகரங்களில் செயல்படுகிறோம்:\n\n📍 லக்னோ — தலைமை · +91 95060 17729\n📍 கான்பூர் · +91 83539 72277\n📍 டெல்லி · +91 98387 98388\n📍 போபால் · +91 81759 88988\n📍 ஆக்ரா · +91 99979 27300\n📍 பிரயாக்ராஜ் — பிராந்திய குழு\n\nபான் இந்தியா பிரச்சாரமும் ஏற்பாடு செய்கிறோம்!",
    followUps: ["விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்", "OOH விளம்பரம் என்ன?"],
    connectCTA: true,
  },
  contact: {
    a: "எங்களை தொடர்புகொள்ளுங்கள்:\n\n📞 லக்னோ — +91 95060 17729\n📞 டெல்லி — +91 98387 98388\n📧 info@timesquaremedia.in\n💬 கீழுள்ள WhatsApp பட்டனை அழுத்துங்கள்\n\nவேலை நாட்களில் 2 மணி நேரத்தில் பதிலளிக்கிறோம்.",
    followUps: ["விலை / மேற்கோள்", "நகரங்கள்", "OOH விளம்பரம் என்ன?"],
    connectCTA: true,
  },
  about: {
    a: "Time Square Media பற்றி:\n• 2012-ல் தொடங்கப்பட்டது — 12+ ஆண்டுகள்\n• 6 நகரங்கள் — இந்தியா முழுவதும்\n• 100+ பிராண்டுகள் நம்பிக்கை வைத்தன\n• 500+ பிரச்சாரங்கள் வெற்றிகரமாக நடந்தன\n• சொந்த தயாரிப்பு அலகு — லக்னோவில்",
    followUps: ["OOH விளம்பரம் என்ன?", "நகரங்கள்", "குழுவுடன் பேசுங்கள்"],
  },
  start: {
    a: "தொடங்குவது மிக எளிது — 4 படிகள்:\n\n1️⃣ உங்கள் நகரம் & இலக்கு சொல்லுங்கள்\n2️⃣ நாங்கள் சிறந்த இடங்களை தேர்ந்தெடுப்போம்\n3️⃣ 24 மணி நேரத்தில் திட்டம் தயார்\n4️⃣ பிரச்சாரம் தொடங்கும்!\n\n+91 95060 17729 அழையுங்கள் அல்லது WhatsApp செய்யுங்கள்!",
    followUps: ["விலை / மேற்கோள்", "நகரங்கள்", "குழுவுடன் பேசுங்கள்"],
    connectCTA: true,
  },
  services: {
    a: "நாங்கள் 7 சேவைகள் வழங்குகிறோம் — அனைத்தும் in-house:\n• OOH Brand Building (பலகைகள், LEDs)\n• Mobile Media (ஆட்டோ, பேருந்து, வேன்)\n• Digital Marketing (Google, Meta, SEO)\n• On/In Media (Signage, Neons)\n• BTL Activations (நிகழ்வுகள்)\n• Retail Consultancy\n• Web Solutions\n\nஒரே நிறுவனம். ஒரே bill. தொந்தரவே இல்லை.",
    followUps: ["விலை / மேற்கோள்", "நகரங்கள்", "குழுவுடன் பேசுங்கள்"],
  },
  intl: {
    a: "ஆம், NRI மற்றும் சர்வதேச வாடிக்கையாளர்களுடனும் பணிபுரிகிறோம்!\n\n• வீடியோ கால் மூலம் ஆலோசனை\n• திட்டம் டிஜிட்டலாக அனுப்பப்படும்\n• Live campaign புகைப்படங்கள் & புதுப்பிப்புகள்\n• சர்வதேச பணம் செலுத்துதல் ஏற்றுக்கொள்ளப்படும்\n\ninfo@timesquaremedia.in அல்லது WhatsApp +91 95060 17729",
    followUps: ["நகரங்கள்", "விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்"],
    connectCTA: true,
  },
  fallback: {
    a: "நல்ல கேள்வி! எங்கள் குழுவிடம் சரியான பதில் கிடைக்கும்.\n\n📞 +91 95060 17729\n📧 info@timesquaremedia.in\n\nகீழுள்ள தலைப்புகளில் கேளுங்கள்:",
    followUps: ["OOH விளம்பரம் என்ன?", "விலை / மேற்கோள்", "குழுவுடன் பேசுங்கள்"],
    connectCTA: true,
  },
};

/* ─── Marathi full translations (key → translated response) ─── */
const MARATHI: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: {
    a: "नमस्कार! 🙏 Time Square Media मध्ये आपले स्वागत आहे!\n\n12+ वर्षांचा जाहिरात अनुभव.\n\nखालील विषयांवर विचारा:",
    followUps: ["OOH जाहिरात म्हणजे काय?", "किंमत / कोटेशन", "शहरे", "टीमशी बोला"],
  },
  team: {
    a: "आमची टीम तुमच्यासाठी तयार आहे!\n\n📞 लखनौ — +91 95060 17729\n📞 दिल्ली — +91 98387 98388\n📧 info@timesquaremedia.in\n💬 WhatsApp बटण दाबा\n\nकामाच्या दिवसांत 2 तासांत उत्तर देतो.",
    followUps: ["किंमत / कोटेशन", "शहरे", "OOH जाहिरात म्हणजे काय?"],
    connectCTA: true,
  },
  ooh: {
    a: "OOH (Out-of-Home) जाहिरात — 24/7 हजारो लोकांना दिसते!\n\nप्रकार:\n• मोठे होर्डिंग्स आणि बिलबोर्ड्स\n• Unipoles आणि Gantries\n• LED व्हिडिओ भिंती\n• बस थांब्यावरील फलक\n• मेट्रो स्टेशन जाहिराती\n\nडिजिटल जाहिराती कोणीही skip करू शकतो — OOH कोणालाही टाळता येत नाही!",
    followUps: ["किंमत / कोटेशन", "शहरे", "टीमशी बोला"],
    connectCTA: true,
  },
  roi: {
    a: "OOH जाहिरातीचे सिद्ध परिणाम:\n• 92% लोक दर महिना OOH जाहिराती पाहतात\n• 76% होर्डिंग जाहिराती लक्षात ठेवतात\n• 93% OOH मध्ये पाहिलेल्या ब्रँडवर विश्वास ठेवतात\n• 85% OOH पाहिल्यानंतर कृती करतात",
    followUps: ["OOH जाहिरात म्हणजे काय?", "किंमत / कोटेशन", "टीमशी बोला"],
  },
  digital: {
    a: "आमच्या डिजिटल मार्केटिंग सेवा:\n• Google Ads आणि Meta (Facebook/Instagram)\n• सोशल मीडिया व्यवस्थापन\n• SEO आणि कंटेंट निर्मिती\n• YouTube आणि व्हिडिओ मोहिमा\n• Influencer मार्केटिंग\n\nOOH सोबत डिजिटल — दुप्पट परिणाम!",
    followUps: ["वेबसाइट / अ‍ॅप", "किंमत / कोटेशन", "टीमशी बोला"],
    connectCTA: true,
  },
  web: {
    a: "आम्ही खरोखर ग्राहक आणणाऱ्या वेबसाइट्स बनवतो:\n• व्यवसाय आणि portfolio वेबसाइट्स\n• E-commerce प्लॅटफॉर्म\n• Campaign landing pages\n• SEO-optimised आणि mobile-first\n• 30 दिवस मोफत सपोर्ट\n\nवेबसाइट — तुमचा 24/7 विक्रेता!",
    followUps: ["डिजिटल मार्केटिंग", "किंमत / कोटेशन", "टीमशी बोला"],
    connectCTA: true,
  },
  mobile: {
    a: "मोबाइल मीडिया — तुमचा ब्रँड सर्वत्र पोहोचतो:\n• ऑटो आणि टोटो ब्रँडिंग\n• बस आणि मेट्रो wraps\n• Activity vans आणि canters\n• Promo stands आणि tents\n\nस्थिर होर्डिंग पोहोचत नाही त्या ठिकाणीही पोहोचतो!",
    followUps: ["OOH जाहिरात म्हणजे काय?", "किंमत / कोटेशन", "शहरे"],
  },
  btl: {
    a: "BTL आणि Activation मोहिमा:\n• Mall आणि कॉलेज activations\n• उत्पादन नमुना वाटप\n• Experiential brand setups\n• On-ground promo campaigns\n\nलोक अनुभव जास्त काळ लक्षात ठेवतात!",
    followUps: ["डिजिटल मार्केटिंग", "किंमत / कोटेशन", "टीमशी बोला"],
  },
  retail: {
    a: "Retail आणि Signage उपाय:\n• Neon आणि Crystal LED signs\n• Dealer आणि ACP boards\n• In-store display branding\n• Visual merchandising\n\nआम्हीच बनवतो — बाहेरून काम देत नाही!",
    followUps: ["OOH जाहिरात म्हणजे काय?", "किंमत / कोटेशन", "शहरे"],
  },
  price: {
    a: "अंदाजे किंमत मार्गदर्शक:\n• एक होर्डिंग — महिन्याला ₹50,000 पासून\n• संपूर्ण शहर मोहीम — ₹3L ते ₹15L\n• ऑटो ब्रँडिंग — ₹15,000 पासून\n• डिजिटल मार्केटिंग — महिन्याला ₹20,000 पासून\n• वेबसाइट — ₹25,000 पासून\n\nकस्टम कोटसाठी +91 95060 17729 वर कॉल करा!",
    followUps: ["टीमशी बोला", "शहरे", "OOH जाहिरात म्हणजे काय?"],
    connectCTA: true,
  },
  cities: {
    a: "आम्ही 6 शहरांमध्ये काम करतो:\n\n📍 लखनौ — मुख्यालय · +91 95060 17729\n📍 कानपूर · +91 83539 72277\n📍 दिल्ली · +91 98387 98388\n📍 भोपाळ · +91 81759 88988\n📍 आग्रा · +91 99979 27300\n📍 प्रयागराज — प्रादेशिक टीम\n\nपॅन-इंडिया मोहिमाही आयोजित करतो!",
    followUps: ["किंमत / कोटेशन", "टीमशी बोला", "OOH जाहिरात म्हणजे काय?"],
    connectCTA: true,
  },
  contact: {
    a: "आमच्याशी संपर्क साधा:\n\n📞 लखनौ — +91 95060 17729\n📞 दिल्ली — +91 98387 98388\n📧 info@timesquaremedia.in\n💬 खाली WhatsApp बटण दाबा\n\nकामाच्या दिवसांत 2 तासांत उत्तर देतो.",
    followUps: ["किंमत / कोटेशन", "शहरे", "OOH जाहिरात म्हणजे काय?"],
    connectCTA: true,
  },
  about: {
    a: "Time Square Media बद्दल:\n• 2012 मध्ये स्थापित — 12+ वर्षे\n• 6 शहरे — संपूर्ण भारत\n• 100+ ब्रँड्सचा विश्वास\n• 500+ मोहिमा यशस्वीरित्या पूर्ण\n• स्वतःची उत्पादन युनिट — लखनौमध्ये",
    followUps: ["OOH जाहिरात म्हणजे काय?", "शहरे", "टीमशी बोला"],
  },
  start: {
    a: "सुरुवात करणे अगदी सोपे आहे — 4 टप्पे:\n\n1️⃣ तुमचे शहर आणि ध्येय सांगा\n2️⃣ आम्ही उत्तम जागा निवडतो\n3️⃣ 24 तासांत योजना तयार\n4️⃣ मोहीम सुरू!\n\n+91 95060 17729 वर कॉल करा किंवा WhatsApp करा!",
    followUps: ["किंमत / कोटेशन", "शहरे", "टीमशी बोला"],
    connectCTA: true,
  },
  services: {
    a: "आम्ही 7 सेवा देतो — सर्व in-house:\n• OOH Brand Building (होर्डिंग, LEDs)\n• Mobile Media (ऑटो, बस, व्हॅन)\n• Digital Marketing (Google, Meta, SEO)\n• On/In Media (Signage, Neons)\n• BTL Activations (कार्यक्रम)\n• Retail Consultancy\n• Web Solutions\n\nएकच कंपनी. एकच बिल. त्रास नाही.",
    followUps: ["किंमत / कोटेशन", "शहरे", "टीमशी बोला"],
  },
  intl: {
    a: "होय, आम्ही NRI आणि आंतरराष्ट्रीय ग्राहकांसोबतही काम करतो!\n\n• व्हिडिओ कॉलद्वारे सल्लामसलत\n• प्रस्ताव डिजिटली पाठवला जातो\n• Live campaign फोटो आणि अपडेट्स\n• आंतरराष्ट्रीय पेमेंट स्वीकारले जाते\n\ninfo@timesquaremedia.in किंवा WhatsApp +91 95060 17729",
    followUps: ["शहरे", "किंमत / कोटेशन", "टीमशी बोला"],
    connectCTA: true,
  },
  fallback: {
    a: "चांगला प्रश्न! आमची टीम तुम्हाला अचूक उत्तर देईल.\n\n📞 +91 95060 17729\n📧 info@timesquaremedia.in\n\nखालील विषयांवर विचारा:",
    followUps: ["OOH जाहिरात म्हणजे काय?", "किंमत / कोटेशन", "टीमशी बोला"],
    connectCTA: true,
  },
};

/* ─── Brief acknowledgment for other detected languages ─── */
/* ─── Telugu ─── */
const TELUGU: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "నమస్కారం! 🙏 Time Square Media కి స్వాగతం!\n\n12+ సంవత్సరాల ప్రకటనల అనుభవం.\n\nదయచేసి అడగండి:", followUps: ["OOH ప్రకటన అంటే ఏమిటి?", "ధర / కోటేషన్", "నగరాలు", "టీమ్‌తో మాట్లాడండి"] },
  team: { a: "మా టీమ్ మీకు సహాయం చేయడానికి సిద్ధంగా ఉంది!\n\n📞 లక్నో — +91 95060 17729\n📞 ఢిల్లీ — +91 98387 98388\n📧 info@timesquaremedia.in\n\nపని దినాలలో 2 గంటల్లో స్పందిస్తాం.", followUps: ["ధర / కోటేషన్", "నగరాలు", "OOH ప్రకటన అంటే ఏమిటి?"], connectCTA: true },
  ooh: { a: "OOH (Out-of-Home) ప్రకటన — ప్రతిరోజూ 24/7 వేలాది మందికి కనిపిస్తుంది!\n\nరకాలు:\n• పెద్ద హోర్డింగ్‌లు & బిల్‌బోర్డ్‌లు\n• Unipoles & Gantries\n• LED వీడియో వాల్స్\n• బస్ స్టాప్ ప్యానెల్స్\n• మెట్రో స్టేషన్ ప్రకటనలు\n\nడిజిటల్ ప్రకటనలను skip చేయవచ్చు — OOH ని skip చేయలేరు!", followUps: ["ధర / కోటేషన్", "నగరాలు", "టీమ్‌తో మాట్లాడండి"], connectCTA: true },
  roi: { a: "OOH ప్రకటనల నిరూపిత ఫలితాలు:\n• 92% మంది ప్రతి నెలా OOH చూస్తారు\n• 76% హోర్డింగ్ ప్రకటనలు గుర్తుంచుకుంటారు\n• 93% OOH బ్రాండ్‌లపై నమ్మకం ఉంచుతారు", followUps: ["OOH ప్రకటన అంటే ఏమిటి?", "ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి"] },
  digital: { a: "మా డిజిటల్ మార్కెటింగ్ సేవలు:\n• Google Ads & Meta (Facebook/Instagram)\n• సోషల్ మీడియా నిర్వహణ\n• SEO & కంటెంట్\n• YouTube & వీడియో\n• Influencer మార్కెటింగ్", followUps: ["వెబ్‌సైట్ పరిష్కారాలు", "ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి"], connectCTA: true },
  web: { a: "నిజంగా కస్టమర్లను తీసుకొచ్చే వెబ్‌సైట్‌లు:\n• వ్యాపార వెబ్‌సైట్‌లు · E-commerce\n• Landing pages · SEO & mobile-first\n• 30 రోజుల ఉచిత సపోర్ట్", followUps: ["డిజిటల్ మార్కెటింగ్", "ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి"], connectCTA: true },
  mobile: { a: "మొబైల్ మీడియా — బ్రాండ్ అన్నిచోట్లా:\n• ఆటో & టోటో బ్రాండింగ్\n• బస్ & మెట్రో wraps · vans & canters", followUps: ["OOH ప్రకటన అంటే ఏమిటి?", "ధర / కోటేషన్", "నగరాలు"] },
  btl: { a: "BTL & Activation:\n• Mall & కళాశాల activations\n• ఉత్పత్తి నమూనా పంపిణీ\n• On-ground promo campaigns", followUps: ["డిజిటల్ మార్కెటింగ్", "ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి"] },
  retail: { a: "Retail & Signage:\n• Neon & Crystal LED signs\n• Dealer & ACP boards · In-store branding\n\nమేమే తయారు చేస్తాం — outsource ఇవ్వం!", followUps: ["OOH ప్రకటన అంటే ఏమిటి?", "ధర / కోటేషన్", "నగరాలు"] },
  price: { a: "సుమారు ధర:\n• ఒక హోర్డింగ్ — నెలకు ₹50,000 నుండి\n• పూర్తి నగరం — ₹3L–₹15L\n• ఆటో బ్రాండింగ్ — ₹15,000\n• డిజిటల్ — ₹20,000/నెల\n• వెబ్‌సైట్ — ₹25,000\n\nకస్టమ్ కోటేషన్: +91 95060 17729!", followUps: ["టీమ్‌తో మాట్లాడండి", "నగరాలు", "OOH ప్రకటన అంటే ఏమిటి?"], connectCTA: true },
  cities: { a: "6 నగరాల్లో:\n\n📍 లక్నో — ప్రధాన కార్యాలయం · +91 95060 17729\n📍 కాన్పూర్ · +91 83539 72277\n📍 ఢిల్లీ · +91 98387 98388\n📍 భోపాల్ · +91 81759 88988\n📍 ఆగ్రా · +91 99979 27300\n📍 ప్రయాగ్‌రాజ్\n\nపాన్-ఇండియా ప్రచారాలు కూడా!", followUps: ["ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి", "OOH ప్రకటన అంటే ఏమిటి?"], connectCTA: true },
  contact: { a: "మాతో సంప్రదించండి:\n\n📞 లక్నో — +91 95060 17729\n📞 ఢిల్లీ — +91 98387 98388\n📧 info@timesquaremedia.in", followUps: ["ధర / కోటేషన్", "నగరాలు", "OOH ప్రకటన అంటే ఏమిటి?"], connectCTA: true },
  about: { a: "Time Square Media:\n• 2012 — 12+ సంవత్సరాలు · 6 నగరాలు\n• 100+ బ్రాండ్‌లు · 500+ ప్రచారాలు", followUps: ["OOH ప్రకటన అంటే ఏమిటి?", "నగరాలు", "టీమ్‌తో మాట్లాడండి"] },
  start: { a: "ప్రారంభించడం సులభం — 4 దశలు:\n\n1️⃣ నగరం & లక్ష్యం చెప్పండి\n2️⃣ ఉత్తమ స్థానాలు ఎంపిక\n3️⃣ 24 గంటల్లో ప్రతిపాదన\n4️⃣ ప్రచారం మొదలు!\n\n+91 95060 17729!", followUps: ["ధర / కోటేషన్", "నగరాలు", "టీమ్‌తో మాట్లాడండి"], connectCTA: true },
  services: { a: "7 సేవలు — అన్నీ in-house:\n• OOH · Mobile Media · Digital · Signage · BTL · Retail · Web\n\nఒకే కంపెనీ. ఒకే బిల్. సమన్వయ తలనొప్పి లేదు.", followUps: ["ధర / కోటేషన్", "నగరాలు", "టీమ్‌తో మాట్లాడండి"] },
  intl: { a: "అవును, NRI మరియు అంతర్జాతీయ క్లయింట్‌లతో కూడా పనిచేస్తాం!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["నగరాలు", "ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి"], connectCTA: true },
  fallback: { a: "మంచి ప్రశ్న! మా టీమ్ మీకు సరైన సమాధానం ఇస్తుంది.\n\n📞 +91 95060 17729\n📧 info@timesquaremedia.in", followUps: ["OOH ప్రకటన అంటే ఏమిటి?", "ధర / కోటేషన్", "టీమ్‌తో మాట్లాడండి"], connectCTA: true },
};
/* ─── Malayalam ─── */
const MALAYALAM: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "നമസ്കാരം! 🙏 Time Square Media-ലേക്ക് സ്വാഗതം!\n\n12+ വർഷത്തെ പരസ്യ അനുഭവം.\n\nചോദിക്കൂ:", followUps: ["OOH പരസ്യം എന്താണ്?", "വില / ഉദ്ധരണി", "നഗരങ്ങൾ", "ടീമുമായി സംസാരിക്കൂ"] },
  team: { a: "ഞങ്ങളുടെ ടീം സഹായിക്കാൻ തയ്യാർ!\n\n📞 ലഖ്‌നൗ — +91 95060 17729\n📞 ഡൽഹി — +91 98387 98388\n📧 info@timesquaremedia.in\n\nജോലി ദിവസങ്ങളിൽ 2 മണിക്കൂറിൽ മറുപടി.", followUps: ["വില / ഉദ്ധരണി", "നഗരങ്ങൾ", "OOH പരസ്യം എന്താണ്?"], connectCTA: true },
  ooh: { a: "OOH (Out-of-Home) പരസ്യം — ദിവസവും 24/7 ആയിരങ്ങൾ കാണുന്നു!\n\nരൂപങ്ങൾ:\n• വലിയ ഹോർഡിംഗുകൾ & ബിൽബോർഡുകൾ\n• Unipoles & Gantries · LED Video Walls\n• ബസ് ഷെൽറ്ററുകൾ · മെട്രോ ഫലകങ്ങൾ\n\nഡിജിറ്റൽ skip ചെയ്യാം — OOH ഒഴിവാക്കാനാകില്ല!", followUps: ["വില / ഉദ്ധരണി", "നഗരങ്ങൾ", "ടീമുമായി സംസാരിക്കൂ"], connectCTA: true },
  roi: { a: "OOH-ന്റെ തെളിയിക്കപ്പെട്ട ഫലങ്ങൾ:\n• 92% ആൾക്കാർ OOH ശ്രദ്ധിക്കുന്നു\n• 76% ഹോർഡിംഗ് ഓർക്കുന്നു\n• 93% OOH ബ്രാൻഡുകളിൽ വിശ്വാസം", followUps: ["OOH പരസ്യം എന്താണ്?", "വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ"] },
  digital: { a: "ഡിജിറ്റൽ മാർക്കറ്റിംഗ് സേവനങ്ങൾ:\n• Google Ads & Meta · SEO & കണ്ടന്റ്\n• YouTube ക്യാമ്പെയ്‌നുകൾ · Influencer Marketing", followUps: ["വെബ്‌സൈറ്റ് സൊലൂഷൻ", "വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ"], connectCTA: true },
  web: { a: "ഞങ്ങൾ ഉപഭോക്താക്കളെ കൊണ്ടുവരുന്ന വെബ്‌സൈറ്റുകൾ നിർമ്മിക്കുന്നു:\n• ബിസിനസ് · E-commerce · Landing pages\n• SEO-optimised & mobile-first\n• 30 ദിവസം സൗജന്യ സപ്പോർട്ട്", followUps: ["ഡിജിറ്റൽ മാർക്കറ്റിംഗ്", "വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ"], connectCTA: true },
  mobile: { a: "മൊബൈൽ മീഡിയ:\n• ഓട്ടോ & ടോടോ ബ്രാൻഡിംഗ് · ബസ് & മെട്രോ wraps\n• Activity vans & canters", followUps: ["OOH പരസ്യം എന്താണ്?", "വില / ഉദ്ധരണി", "നഗരങ്ങൾ"] },
  btl: { a: "BTL & Activation:\n• Mall & കോളേജ് activations\n• ഉൽപ്പന്ന സാമ്പിൾ · On-ground promo", followUps: ["ഡിജിറ്റൽ മാർക്കറ്റിംഗ്", "വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ"] },
  retail: { a: "Retail & Signage:\n• Neon & Crystal LED signs · ACP boards\n• In-store display branding\n\nഞങ്ങൾ തന്നെ നിർമ്മിക്കുന്നു!", followUps: ["OOH പരസ്യം എന്താണ്?", "വില / ഉദ്ധരണി", "നഗരങ്ങൾ"] },
  price: { a: "ഏകദേശ വില:\n• ഒരു ഹോർഡിംഗ് — മാസം ₹50,000 മുതൽ\n• പൂർണ്ണ നഗരം — ₹3L–₹15L\n• ഓട്ടോ ബ്രാൻഡിംഗ് — ₹15,000\n• ഡിജിറ്റൽ — ₹20,000/മാസം\n• വെബ്‌സൈറ്റ് — ₹25,000\n\n+91 95060 17729!", followUps: ["ടീമുമായി സംസാരിക്കൂ", "നഗരങ്ങൾ", "OOH പരസ്യം എന്താണ്?"], connectCTA: true },
  cities: { a: "6 നഗരങ്ങളിൽ:\n\n📍 ലഖ്‌നൗ — ആസ്ഥാനം · +91 95060 17729\n📍 കാൺപൂർ · +91 83539 72277\n📍 ഡൽഹി · +91 98387 98388\n📍 ഭോപ്പാൽ · +91 81759 88988\n📍 ആഗ്ര · +91 99979 27300\n📍 പ്രയാഗ്‌രാജ്", followUps: ["വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ", "OOH പരസ്യം എന്താണ്?"], connectCTA: true },
  contact: { a: "ഞങ്ങളുമായി ബന്ധപ്പെടൂ:\n\n📞 ലഖ്‌നൗ — +91 95060 17729\n📞 ഡൽഹി — +91 98387 98388\n📧 info@timesquaremedia.in", followUps: ["വില / ഉദ്ധരണി", "നഗരങ്ങൾ", "OOH പരസ്യം എന്താണ്?"], connectCTA: true },
  about: { a: "Time Square Media:\n• 2012 — 12+ വർഷം · 6 നഗരങ്ങൾ\n• 100+ ബ്രാൻഡ് · 500+ ക്യാമ്പെയ്‌ൻ", followUps: ["OOH പരസ്യം എന്താണ്?", "നഗരങ്ങൾ", "ടീമുമായി സംസാരിക്കൂ"] },
  start: { a: "ആരംഭം ലളിതം — 4 ഘട്ടം:\n\n1️⃣ നഗരം & ലക്ഷ്യം · 2️⃣ ഞങ്ങൾ സ്ഥലം തിരഞ്ഞെടുക്കും\n3️⃣ 24 മണിക്കൂർ · 4️⃣ ക്യാമ്പെയ്‌ൻ!\n\n+91 95060 17729!", followUps: ["വില / ഉദ്ധരണി", "നഗരങ്ങൾ", "ടീമുമായി സംസാരിക്കൂ"], connectCTA: true },
  services: { a: "7 സേവനങ്ങൾ — in-house:\n• OOH · Mobile Media · Digital · Signage · BTL · Retail · Web\n\nഒരു ഏജൻസി. ഒരു ഇൻവോയ്‌സ്.", followUps: ["വില / ഉദ്ധരണി", "നഗരങ്ങൾ", "ടീമുമായി സംസാരിക്കൂ"] },
  intl: { a: "NRI & അന്താരാഷ്ട്ര ക്ലയന്റുകളുമായും ഞങ്ങൾ പ്രവർത്തിക്കുന്നു!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["നഗരങ്ങൾ", "വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ"], connectCTA: true },
  fallback: { a: "നല്ല ചോദ്യം! ഞങ്ങളുടെ ടീം ഉത്തരം നൽകും.\n\n📞 +91 95060 17729\n📧 info@timesquaremedia.in", followUps: ["OOH പരസ്യം എന്താണ്?", "വില / ഉദ്ധരണി", "ടീമുമായി സംസാരിക്കൂ"], connectCTA: true },
};
/* ─── Kannada ─── */
const KANNADA: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "ನಮಸ್ಕಾರ! 🙏 Time Square Media ಗೆ ಸ್ವಾಗತ!\n\n12+ ವರ್ಷಗಳ ಜಾಹೀರಾತು ಅನುಭವ.\n\nಕೇಳಿ:", followUps: ["OOH ಜಾಹೀರಾತು ಎಂದರೇನು?", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"] },
  team: { a: "ನಮ್ಮ ತಂಡ ಸಹಾಯ ಮಾಡಲು ಸಿದ್ಧ!\n\n📞 ಲಖನೌ — +91 95060 17729\n📞 ದೆಹಲಿ — +91 98387 98388\n📧 info@timesquaremedia.in\n\nಕೆಲಸದ ದಿನಗಳಲ್ಲಿ 2 ಗಂಟೆಯಲ್ಲಿ ಉತ್ತರ.", followUps: ["ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು", "OOH ಜಾಹೀರಾತು ಎಂದರೇನು?"], connectCTA: true },
  ooh: { a: "OOH (Out-of-Home) ಜಾಹೀರಾತು — ಪ್ರತಿದಿನ 24/7 ಸಾವಿರಾರು ಜನರಿಗೆ ಕಾಣಿಸುತ್ತದೆ!\n\nರೀತಿಗಳು:\n• ಹೋರ್ಡಿಂಗ್ & ಬಿಲ್‌ಬೋರ್ಡ್ · Unipoles & Gantries\n• LED ವಾಲ್ · ಬಸ್ ಫಲಕ · ಮೆಟ್ರೋ ಜಾಹೀರಾತು\n\nDigital skip ಮಾಡಬಹುದು — OOH skip ಸಾಧ್ಯವಿಲ್ಲ!", followUps: ["ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"], connectCTA: true },
  roi: { a: "OOH ನ ಸಾಬೀತಾದ ಫಲಿತಾಂಶಗಳು:\n• 92% ಜನರು ಪ್ರತಿ ತಿಂಗಳು OOH ನೋಡುತ್ತಾರೆ\n• 76% ಹೋರ್ಡಿಂಗ್ ನೆನಪಿಡುತ್ತಾರೆ\n• 93% OOH ಬ್ರಾಂಡ್‌ಗಳ ಮೇಲೆ ವಿಶ್ವಾಸ", followUps: ["OOH ಜಾಹೀರಾತು ಎಂದರೇನು?", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"] },
  digital: { a: "ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಸೇವೆಗಳು:\n• Google Ads & Meta · SEO & ಕಂಟೆಂಟ್\n• YouTube & ವೀಡಿಯೋ · Influencer Marketing", followUps: ["ವೆಬ್‌ಸೈಟ್ ಪರಿಹಾರ", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"], connectCTA: true },
  web: { a: "ನಿಜವಾದ ಗ್ರಾಹಕರನ್ನು ತರುವ ವೆಬ್‌ಸೈಟ್‌ಗಳು:\n• ವ್ಯಾಪಾರ · E-commerce · Landing pages\n• SEO & mobile-first · 30 ದಿನ ಉಚಿತ ಸಪೋರ್ಟ್", followUps: ["ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"], connectCTA: true },
  mobile: { a: "ಮೊಬೈಲ್ ಮೀಡಿಯಾ:\n• ಆಟೋ & ಟೋಟೋ ಬ್ರಾಂಡಿಂಗ് · ಬಸ್ & ಮೆಟ್ರೋ wraps", followUps: ["OOH ಜಾಹೀರಾತು ಎಂದರೇನು?", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು"] },
  btl: { a: "BTL & Activation:\n• Mall & ಕಾಲೇಜ್ activations · ಸ್ಯಾಂಪ್ಲಿಂಗ್ · On-ground promo", followUps: ["ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"] },
  retail: { a: "Retail & Signage:\n• Neon & Crystal LED signs · ACP boards\n• In-store branding · ನಾವೇ ತಯಾರಿಸುತ್ತೇವೆ!", followUps: ["OOH ಜಾಹೀರಾತು ಎಂದರೇನು?", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು"] },
  price: { a: "ಅಂದಾಜು ಬೆಲೆ:\n• ಒಂದು ಹೋರ್ಡಿಂಗ್ — ₹50,000/ತಿಂಗಳು\n• ಪೂರ್ಣ ನಗರ — ₹3L–₹15L\n• ಆಟೋ ಬ್ರ್ಯಾಂಡಿಂಗ್ — ₹15,000\n• ಡಿಜಿಟಲ್ — ₹20,000/ತಿಂಗಳು\n• ವೆಬ್‌ಸೈಟ್ — ₹25,000\n\n+91 95060 17729!", followUps: ["ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ", "ನಗರಗಳು", "OOH ಜಾಹೀರಾತು ಎಂದರೇನು?"], connectCTA: true },
  cities: { a: "6 ನಗರಗಳಲ್ಲಿ:\n\n📍 ಲಖನೌ · +91 95060 17729\n📍 ಕಾನ್ಪೂರ್ · +91 83539 72277\n📍 ದೆಹಲಿ · +91 98387 98388\n📍 ಭೋಪಾಲ್ · +91 81759 88988\n📍 ಆಗ್ರಾ · +91 99979 27300\n📍 ಪ್ರಯಾಗ್‌ರಾಜ್", followUps: ["ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ", "OOH ಜಾಹೀರಾತು ಎಂದರೇನು?"], connectCTA: true },
  contact: { a: "ಸಂಪರ್ಕ:\n\n📞 ಲಖನೌ — +91 95060 17729\n📞 ದೆಹಲಿ — +91 98387 98388\n📧 info@timesquaremedia.in", followUps: ["ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು", "OOH ಜಾಹೀರಾತು ಎಂದರೇನು?"], connectCTA: true },
  about: { a: "Time Square Media:\n• 2012 — 12+ ವರ್ಷ · 6 ನಗರ · 100+ ಬ್ರಾಂಡ್ · 500+ ಅಭಿಯಾನ", followUps: ["OOH ಜಾಹೀರಾತು ಎಂದರೇನು?", "ನಗರಗಳು", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"] },
  start: { a: "ಪ್ರಾರಂಭಿಸಿ — 4 ಹಂತ:\n\n1️⃣ ನಗರ & ಗುರಿ ಹೇಳಿ · 2️⃣ ಸ್ಥಳ ಆಯ್ಕೆ\n3️⃣ 24 ಗಂಟೆ ಪ್ರಸ್ತಾವ · 4️⃣ ಅಭಿಯಾನ ಶುರು!\n\n+91 95060 17729!", followUps: ["ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"], connectCTA: true },
  services: { a: "7 ಸೇವೆಗಳು — in-house:\n• OOH · Mobile · Digital · Signage · BTL · Retail · Web\n\nಒಂದೇ ಏಜೆನ್ಸಿ. ಒಂದೇ ಬಿಲ್.", followUps: ["ಬೆಲೆ / ಕೋಟೇಶನ್", "ನಗರಗಳು", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"] },
  intl: { a: "NRI & ಅಂತರ್ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಹಕರೊಂದಿಗೂ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["ನಗರಗಳು", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"], connectCTA: true },
  fallback: { a: "ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! ನಮ್ಮ ತಂಡ ಉತ್ತರ ನೀಡುತ್ತದೆ.\n\n📞 +91 95060 17729\n📧 info@timesquaremedia.in", followUps: ["OOH ಜಾಹೀರಾತು ಎಂದರೇನು?", "ಬೆಲೆ / ಕೋಟೇಶನ್", "ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ"], connectCTA: true },
};
/* ─── Bengali ─── */
const BENGALI: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "নমস্কার! 🙏 Time Square Media-তে আপনাকে স্বাগতম!\n\n12+ বছরের বিজ্ঞাপন অভিজ্ঞতা।\n\nজিজ্ঞেস করুন:", followUps: ["OOH বিজ্ঞাপন কী?", "মূল্য / কোটেশন", "শহরগুলি", "আমাদের টিমের সাথে কথা বলুন"] },
  team: { a: "আমাদের টিম সাহায্য করতে প্রস্তুত!\n\n📞 লখনউ — +91 95060 17729\n📞 দিল্লি — +91 98387 98388\n📧 info@timesquaremedia.in\n\nকার্যদিবসে 2 ঘণ্টার মধ্যে উত্তর।", followUps: ["মূল্য / কোটেশন", "শহরগুলি", "OOH বিজ্ঞাপন কী?"], connectCTA: true },
  ooh: { a: "OOH (Out-of-Home) বিজ্ঞাপন — হাজার হাজার মানুষ প্রতিদিন 24/7 দেখে!\n\nধরন:\n• বড় হোর্ডিং ও বিলবোর্ড · Unipoles & Gantries\n• LED ভিডিও ওয়াল · বাস ও মেট্রো প্যানেল\n\nডিজিটাল skip করা যায় — OOH করা যায় না!", followUps: ["মূল্য / কোটেশন", "শহরগুলি", "টিমের সাথে কথা বলুন"], connectCTA: true },
  roi: { a: "OOH-এর প্রমাণিত ফলাফল:\n• 92% মানুষ প্রতি মাসে OOH দেখে\n• 76% হোর্ডিং মনে রাখে · 93% বিশ্বাস করে", followUps: ["OOH বিজ্ঞাপন কী?", "মূল্য / কোটেশন", "টিমের সাথে কথা বলুন"] },
  digital: { a: "ডিজিটাল মার্কেটিং সেবা:\n• Google Ads ও Meta · SEO ও কন্টেন্ট\n• YouTube · Influencer মার্কেটিং", followUps: ["ওয়েবসাইট সমাধান", "মূল্য / কোটেশন", "টিমের সাথে কথা বলুন"], connectCTA: true },
  web: { a: "গ্রাহক আনার মতো ওয়েবসাইট:\n• ব্যবসায়িক · E-commerce · Landing pages\n• SEO & mobile-first · 30 দিন বিনামূল্যে সাপোর্ট", followUps: ["ডিজিটাল মার্কেটিং", "মূল্য / কোটেশন", "টিমের সাথে কথা বলুন"], connectCTA: true },
  mobile: { a: "মোবাইল মিডিয়া:\n• অটো ও বাস ব্র্যান্ডিং · Activity vans", followUps: ["OOH বিজ্ঞাপন কী?", "মূল্য / কোটেশন", "শহরগুলি"] },
  btl: { a: "BTL ও Activation:\n• Mall ও কলেজ activations · পণ্যের নমুনা · On-ground promo", followUps: ["ডিজিটাল মার্কেটিং", "মূল্য / কোটেশন", "টিমের সাথে কথা বলুন"] },
  retail: { a: "Retail ও Signage:\n• Neon ও LED signs · ACP boards · In-store branding\n\nআমরা নিজেই তৈরি করি!", followUps: ["OOH বিজ্ঞাপন কী?", "মূল্য / কোটেশন", "শহরগুলি"] },
  price: { a: "আনুমানিক মূল্য:\n• একটি হোর্ডিং — ₹50,000/মাস\n• পূর্ণ শহর — ₹3L–₹15L\n• অটো ব্র্যান্ডিং — ₹15,000\n• ডিজিটাল — ₹20,000/মাস\n• ওয়েবসাইট — ₹25,000\n\n+91 95060 17729!", followUps: ["টিমের সাথে কথা বলুন", "শহরগুলি", "OOH বিজ্ঞাপন কী?"], connectCTA: true },
  cities: { a: "6টি শহরে:\n\n📍 লখনউ · +91 95060 17729\n📍 কানপুর · +91 83539 72277\n📍 দিল্লি · +91 98387 98388\n📍 ভোপাল · +91 81759 88988\n📍 আগ্রা · +91 99979 27300\n📍 প্রয়াগরাজ", followUps: ["মূল্য / কোটেশন", "টিমের সাথে কথা বলুন", "OOH বিজ্ঞাপন কী?"], connectCTA: true },
  contact: { a: "আমাদের সাথে যোগাযোগ:\n\n📞 লখনউ — +91 95060 17729\n📞 দিল্লি — +91 98387 98388\n📧 info@timesquaremedia.in", followUps: ["মূল্য / কোটেশন", "শহরগুলি", "OOH বিজ্ঞাপন কী?"], connectCTA: true },
  about: { a: "Time Square Media:\n• 2012 — 12+ বছর · 6 শহর · 100+ ব্র্যান্ড · 500+ ক্যাম্পেইন", followUps: ["OOH বিজ্ঞাপন কী?", "শহরগুলি", "টিমের সাথে কথা বলুন"] },
  start: { a: "শুরু সহজ — 4 ধাপ:\n\n1️⃣ শহর ও লক্ষ্য · 2️⃣ সেরা স্থান নির্বাচন\n3️⃣ 24 ঘণ্টায় প্রস্তাব · 4️⃣ ক্যাম্পেইন!\n\n+91 95060 17729!", followUps: ["মূল্য / কোটেশন", "শহরগুলি", "টিমের সাথে কথা বলুন"], connectCTA: true },
  services: { a: "7টি সেবা — in-house:\n• OOH · Mobile · Digital · Signage · BTL · Retail · Web\n\nএকটি এজেন্সি. একটি বিল.", followUps: ["মূল্য / কোটেশন", "শহরগুলি", "টিমের সাথে কথা বলুন"] },
  intl: { a: "NRI ও আন্তর্জাতিক ক্লায়েন্টদের সাথেও কাজ করি!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["শহরগুলি", "মূল্য / কোটেশন", "টিমের সাথে কথা বলুন"], connectCTA: true },
  fallback: { a: "চমৎকার প্রশ্ন! আমাদের টিম সঠিক উত্তর দেবে।\n\n📞 +91 95060 17729\n📧 info@timesquaremedia.in", followUps: ["OOH বিজ্ঞাপন কী?", "মূল্য / কোটেশন", "টিমের সাথে কথা বলুন"], connectCTA: true },
};
/* ─── Gujarati ─── */
const GUJARATI: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "નમસ્તે! 🙏 Time Square Media માં આपनुं સ્વાગત છે!\n\n12+ વર્ષોનો જાહેરાત અનુભવ.\n\nપૂછો:", followUps: ["OOH જાહેરાત શું છે?", "ભાવ / ક્વોટ", "શહેરો", "ટીમ સાથે વાત કરો"] },
  team: { a: "અમારી ટીમ મદદ કરવા તૈયાર!\n\n📞 લખનઊ — +91 95060 17729\n📞 દિલ્હી — +91 98387 98388\n📧 info@timesquaremedia.in\n\nકામકાજના દિવસોમાં 2 કલાકમાં.", followUps: ["ભાવ / ક્વોટ", "શહેરો", "OOH જાહેરાત શું છે?"], connectCTA: true },
  ooh: { a: "OOH (Out-of-Home) જાહેરાત — 24/7 હજારો જુએ!\n\nપ્રકારો:\n• હોર્ડિંગ & બિલબોર્ડ · Unipoles & Gantries\n• LED વૉલ · બસ/મેટ્રો પૅનલ\n\nDigital skip કરી શકાય — OOH ટાળી ન શકાય!", followUps: ["ભાવ / ક્વોટ", "શહેરો", "ટીમ સાથે વાત કરો"], connectCTA: true },
  roi: { a: "OOH ની સિદ્ધ અસરો:\n• 92% દર મહિને OOH જુએ · 76% હોર્ડિંગ યાદ · 93% ભરોસો", followUps: ["OOH જાહેરાત શું છે?", "ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો"] },
  digital: { a: "ડિજિટલ માર્કેટિંગ:\n• Google Ads & Meta · SEO & કન્ટેન્ટ · YouTube · Influencer", followUps: ["વેબસાઇટ ઉકેલ", "ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો"], connectCTA: true },
  web: { a: "ગ્રાહક લાવે તેવી વેબસાઇટ:\n• Business · E-commerce · Landing pages\n• SEO & mobile-first · 30 દિન ફ્રી", followUps: ["ડિજિટલ માર્કેટિંગ", "ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો"], connectCTA: true },
  mobile: { a: "મોબાઈલ મીડિયા:\n• ઑટો & બસ બ્રૅન્ડિંગ · vans & canters", followUps: ["OOH જાહેરાત શું છે?", "ભાવ / ક્વોટ", "શહેરો"] },
  btl: { a: "BTL & Activation:\n• Mall & કૉલેજ · સૅમ્પલિંગ · On-ground", followUps: ["ડિજિટલ માર્કેટિંગ", "ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો"] },
  retail: { a: "Retail & Signage:\n• Neon & LED · ACP boards · In-store\n\nઅમે જ બનાવીએ!", followUps: ["OOH જાહેરાત શું છે?", "ભાવ / ક્વોટ", "શહેરો"] },
  price: { a: "અંદાજ ભાવ:\n• હોર્ડિંગ — ₹50,000/માસ\n• પૂર્ણ શહેર — ₹3L–₹15L\n• ઑટો — ₹15,000 · ડિજિટલ — ₹20,000/માસ · Web — ₹25,000\n\n+91 95060 17729!", followUps: ["ટીમ સાથે વાત કરો", "શહેરો", "OOH જાહેરાત શું છે?"], connectCTA: true },
  cities: { a: "6 શહેરોમાં:\n\n📍 લખનઊ · +91 95060 17729\n📍 કાનપુર · +91 83539 72277\n📍 દિલ્હી · +91 98387 98388\n📍 ભોપાલ · +91 81759 88988\n📍 આગ્રા · +91 99979 27300\n📍 પ્રયાગ્રાજ", followUps: ["ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો", "OOH જાહેરાત શું છે?"], connectCTA: true },
  contact: { a: "📞 +91 95060 17729 (Lucknow) | +91 98387 98388 (Delhi)\n📧 info@timesquaremedia.in", followUps: ["ભાવ / ક્વોટ", "શહેરો", "OOH જાહેરાત શું છે?"], connectCTA: true },
  about: { a: "Time Square Media:\n• 2012 — 12+ વર્ષ · 6 શહેર · 100+ બ્રૅન્ડ · 500+ ઝુંબેશ", followUps: ["OOH જાહેરાત શું છે?", "શહેરો", "ટીમ સાથે વાત કરો"] },
  start: { a: "4 પગલાં:\n1️⃣ શહેર & ધ્યેય · 2️⃣ સ્થળ પસંદ · 3️⃣ 24 કલાક · 4️⃣ શરૂ!\n\n+91 95060 17729!", followUps: ["ભાવ / ક્વોટ", "શહેરો", "ટીમ સાથે વાત કરો"], connectCTA: true },
  services: { a: "7 સેવા — in-house:\n• OOH · Mobile · Digital · Signage · BTL · Retail · Web\n\nએક કંપની. એક bill.", followUps: ["ભાવ / ક્વોટ", "શહેરો", "ટીમ સાથે વાત કરો"] },
  intl: { a: "NRI & આંતરરાષ્ટ્રીય ક્લાયન્ટ સાથે પણ!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["શહેરો", "ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો"], connectCTA: true },
  fallback: { a: "સારો સવાલ! +91 95060 17729 · info@timesquaremedia.in", followUps: ["OOH જાહેરાત શું છે?", "ભાવ / ક્વોટ", "ટીમ સાથે વાત કરો"], connectCTA: true },
};
/* ─── Punjabi ─── */
const PUNJABI: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! 🙏 Time Square Media ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ!\n\n12+ ਸਾਲਾਂ ਦਾ ਤਜ਼ਰਬਾ।\n\nਪੁੱਛੋ:", followUps: ["OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"] },
  team: { a: "ਸਾਡੀ ਟੀਮ ਤਿਆਰ ਹੈ!\n\n📞 ਲਖਨਊ — +91 95060 17729\n📞 ਦਿੱਲੀ — +91 98387 98388\n📧 info@timesquaremedia.in\n\n2 ਘੰਟੇ ਵਿੱਚ ਜਵਾਬ.", followUps: ["ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ", "OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?"], connectCTA: true },
  ooh: { a: "OOH (Out-of-Home) ਇਸ਼ਤਿਹਾਰ — 24/7 ਹਜ਼ਾਰਾਂ ਨੂੰ ਦਿਖਦਾ!\n\nਕਿਸਮਾਂ:\n• ਹੋਰਡਿੰਗ & ਬਿਲਬੋਰਡ · Unipoles & Gantries\n• LED ਵਾਲ · ਬੱਸ/ਮੈਟਰੋ ਪੈਨਲ\n\nDigital skip — OOH ਨਹੀਂ!", followUps: ["ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"], connectCTA: true },
  roi: { a: "OOH ਦੇ ਸਾਬਿਤ ਨਤੀਜੇ:\n• 92% ਮਹੀਨੇ OOH ਦੇਖਦੇ · 76% ਯਾਦ · 93% ਭਰੋਸਾ", followUps: ["OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"] },
  digital: { a: "ਡਿਜੀਟਲ ਮਾਰਕੀਟਿੰਗ:\n• Google Ads & Meta · SEO & ਕੰਟੈਂਟ · YouTube · Influencer", followUps: ["ਵੈੱਬਸਾਈਟ", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"], connectCTA: true },
  web: { a: "ਗਾਹਕ ਲਿਆਉਣ ਵਾਲੀਆਂ ਵੈੱਬਸਾਈਟਾਂ:\n• Business · E-commerce · Landing · SEO & mobile\n• 30 ਦਿਨ ਮੁਫ਼ਤ ਸਪੋਰਟ", followUps: ["ਡਿਜੀਟਲ", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"], connectCTA: true },
  mobile: { a: "ਮੋਬਾਈਲ ਮੀਡੀਆ:\n• ਆਟੋ & ਬੱਸ ਬ੍ਰਾਂਡਿੰਗ · vans & canters", followUps: ["OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ"] },
  btl: { a: "BTL & Activation:\n• Mall & ਕਾਲਜ · ਸੈਂਪਲਿੰਗ · On-ground", followUps: ["ਡਿਜੀਟਲ", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"] },
  retail: { a: "Retail & Signage:\n• Neon & LED · ACP boards · In-store\n\nਅਸੀਂ ਖ਼ੁਦ ਬਣਾਉਂਦੇ ਹਾਂ!", followUps: ["OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ"] },
  price: { a: "ਕੀਮਤ:\n• ਹੋਰਡਿੰਗ — ₹50,000/ਮਹੀਨਾ · ਪੂਰਾ ਸ਼ਹਿਰ — ₹3L–₹15L\n• ਆਟੋ — ₹15,000 · Digital — ₹20,000/ਮਹੀਨਾ · Web — ₹25,000\n\n+91 95060 17729!", followUps: ["ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ", "ਸ਼ਹਿਰ", "OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?"], connectCTA: true },
  cities: { a: "6 ਸ਼ਹਿਰਾਂ ਵਿੱਚ:\n\n📍 ਲਖਨਊ · +91 95060 17729\n📍 ਕਾਨਪੁਰ · +91 83539 72277\n📍 ਦਿੱਲੀ · +91 98387 98388\n📍 ਭੋਪਾਲ · +91 81759 88988\n📍 ਆਗਰਾ · +91 99979 27300\n📍 ਪ੍ਰਯਾਗਰਾਜ", followUps: ["ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ", "OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?"], connectCTA: true },
  contact: { a: "📞 +91 95060 17729 (ਲਖਨਊ) | +91 98387 98388 (ਦਿੱਲੀ)\n📧 info@timesquaremedia.in", followUps: ["ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ", "OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?"], connectCTA: true },
  about: { a: "Time Square Media:\n• 2012 — 12+ ਸਾਲ · 6 ਸ਼ਹਿਰ · 100+ ਬ੍ਰਾਂਡ · 500+ ਮੁਹਿੰਮਾਂ", followUps: ["OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?", "ਸ਼ਹਿਰ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"] },
  start: { a: "4 ਕਦਮ:\n1️⃣ ਸ਼ਹਿਰ & ਮਕਸਦ · 2️⃣ ਸਾਡੀ ਜਗ੍ਹਾ ਚੋਣ · 3️⃣ 24 ਘੰਟੇ · 4️⃣ ਸ਼ੁਰੂ!\n\n+91 95060 17729!", followUps: ["ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"], connectCTA: true },
  services: { a: "7 ਸੇਵਾਵਾਂ — in-house:\n• OOH · Mobile · Digital · Signage · BTL · Retail · Web\n\nਇੱਕ ਏਜੰਸੀ. ਇੱਕ ਬਿੱਲ.", followUps: ["ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਸ਼ਹਿਰ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"] },
  intl: { a: "NRI & ਅੰਤਰਰਾਸ਼ਟਰੀ ਕਲਾਇੰਟ ਵੀ!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["ਸ਼ਹਿਰ", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"], connectCTA: true },
  fallback: { a: "ਵਧੀਆ ਸਵਾਲ! +91 95060 17729 · info@timesquaremedia.in", followUps: ["OOH ਇਸ਼ਤਿਹਾਰ ਕੀ ਹੈ?", "ਕੀਮਤ / ਕੋਟੇਸ਼ਨ", "ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ"], connectCTA: true },
};
/* ─── Arabic ─── */
const ARABIC: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "مرحباً! 🙏 أهلاً بك في Time Square Media!\n\nخبرة أكثر من 12 عاماً.\n\nاسألنا:", followUps: ["ما هو إعلان OOH؟", "الأسعار / عرض", "المدن", "تحدث مع فريقنا"] },
  team: { a: "فريقنا جاهز!\n\n📞 لكناو — +91 95060 17729\n📞 دلهي — +91 98387 98388\n📧 info@timesquaremedia.in\n\nنرد خلال ساعتين.", followUps: ["الأسعار / عرض", "المدن", "ما هو إعلان OOH؟"], connectCTA: true },
  ooh: { a: "إعلان OOH — يراه الآلاف يومياً 24/7!\n\nالأشكال:\n• لوحات إعلانية · Unipoles & Gantries\n• جدران LED · محطات الباص والمترو\n\nالإعلانات الرقمية تُتخطى — OOH لا!", followUps: ["الأسعار / عرض", "المدن", "تحدث مع فريقنا"], connectCTA: true },
  roi: { a: "نتائج OOH المثبتة:\n• 92% يلاحظون OOH شهرياً\n• 76% يتذكرون اللوحات · 93% ثقة بالعلامة التجارية", followUps: ["ما هو إعلان OOH؟", "الأسعار / عرض", "تحدث مع فريقنا"] },
  digital: { a: "التسويق الرقمي:\n• Google Ads & Meta · SEO وإنشاء المحتوى\n• YouTube · التسويق عبر المؤثرين", followUps: ["موقع إلكتروني", "الأسعار / عرض", "تحدث مع فريقنا"], connectCTA: true },
  web: { a: "مواقع إلكترونية تجلب العملاء:\n• مواقع أعمال · تجارة إلكترونية · صفحات هبوط\n• SEO & mobile-first · دعم مجاني 30 يوماً", followUps: ["التسويق الرقمي", "الأسعار / عرض", "تحدث مع فريقنا"], connectCTA: true },
  mobile: { a: "الإعلان المتنقل:\n• طلاء السيارات والحافلات · شاحنات الترويج", followUps: ["ما هو إعلان OOH؟", "الأسعار / عرض", "المدن"] },
  btl: { a: "BTL والتفعيل:\n• المراكز التجارية والجامعات · توزيع العينات · حملات On-ground", followUps: ["التسويق الرقمي", "الأسعار / عرض", "تحدث مع فريقنا"] },
  retail: { a: "لافتات ومبيعات التجزئة:\n• لافتات Neon & LED · لوحات ACP · عرض داخل المتجر\n\nننتج بأنفسنا!", followUps: ["ما هو إعلان OOH؟", "الأسعار / عرض", "المدن"] },
  price: { a: "الأسعار التقريبية:\n• لوحة واحدة — ₹50,000/شهر\n• حملة مدينة — ₹3L–₹15L\n• سيارات — ₹15,000 · رقمي — ₹20,000/شهر · موقع — ₹25,000\n\n+91 95060 17729!", followUps: ["تحدث مع فريقنا", "المدن", "ما هو إعلان OOH؟"], connectCTA: true },
  cities: { a: "6 مدن:\n\n📍 لكناو · +91 95060 17729\n📍 كانبور · +91 83539 72277\n📍 دلهي · +91 98387 98388\n📍 بوبال · +91 81759 88988\n📍 أغرا · +91 99979 27300\n📍 براياغ راج", followUps: ["الأسعار / عرض", "تحدث مع فريقنا", "ما هو إعلان OOH؟"], connectCTA: true },
  contact: { a: "📞 +91 95060 17729 (لكناو) | +91 98387 98388 (دلهي)\n📧 info@timesquaremedia.in", followUps: ["الأسعار / عرض", "المدن", "ما هو إعلان OOH؟"], connectCTA: true },
  about: { a: "Time Square Media:\n• تأسست 2012 — 12+ عاماً · 6 مدن · 100+ علامة تجارية · 500+ حملة", followUps: ["ما هو إعلان OOH؟", "المدن", "تحدث مع فريقنا"] },
  start: { a: "البدء سهل — 4 خطوات:\n1️⃣ مدينتك & هدفك · 2️⃣ نختار المواقع · 3️⃣ 24 ساعة · 4️⃣ انطلاق!\n\n+91 95060 17729!", followUps: ["الأسعار / عرض", "المدن", "تحدث مع فريقنا"], connectCTA: true },
  services: { a: "7 خدمات — داخلياً:\n• OOH · Mobile · Digital · Signage · BTL · Retail · Web\n\nوكالة واحدة. فاتورة واحدة.", followUps: ["الأسعار / عرض", "المدن", "تحدث مع فريقنا"] },
  intl: { a: "نعم — NRI والعملاء الدوليون مرحب بهم!\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["المدن", "الأسعار / عرض", "تحدث مع فريقنا"], connectCTA: true },
  fallback: { a: "سؤال رائع! +91 95060 17729 · info@timesquaremedia.in", followUps: ["ما هو إعلان OOH؟", "الأسعار / عرض", "تحدث مع فريقنا"], connectCTA: true },
};
/* ─── Chinese ─── */
const CHINESE: Record<string, { a: string; followUps: string[]; connectCTA?: boolean }> = {
  greeting: { a: "您好！🙏 欢迎来到 Time Square Media！\n\n12年以上广告经验。\n\n请问我们：", followUps: ["什么是OOH广告？", "价格/报价", "覆盖城市", "联系我们的团队"] },
  team: { a: "我们的团队随时为您服务！\n\n📞 勒克瑙 — +91 95060 17729\n📞 德里 — +91 98387 98388\n📧 info@timesquaremedia.in\n\n工作日2小时内回复。", followUps: ["价格/报价", "覆盖城市", "什么是OOH广告？"], connectCTA: true },
  ooh: { a: "OOH（户外）广告 — 每天24/7被数千人看到！\n\n形式：\n• 大型广告牌 · 单柱广告塔 · LED视频墙\n• 公交站 & 地铁站广告\n\n数字广告可以跳过 — OOH不能！", followUps: ["价格/报价", "覆盖城市", "联系我们的团队"], connectCTA: true },
  roi: { a: "OOH效果数据：\n• 92%每月注意到OOH · 76%记住广告牌\n• 93%更信任OOH品牌 · 85%采取行动", followUps: ["什么是OOH广告？", "价格/报价", "联系我们的团队"] },
  digital: { a: "数字营销服务：\n• Google Ads & Meta广告 · SEO & 内容创作\n• YouTube视频营销 · KOL营销", followUps: ["网站建设", "价格/报价", "联系我们的团队"], connectCTA: true },
  web: { a: "真正带来客户的网站：\n• 企业网站 · 电商平台 · 落地页\n• SEO优化 & 移动优先 · 30天免费支持", followUps: ["数字营销", "价格/报价", "联系我们的团队"], connectCTA: true },
  mobile: { a: "移动媒体：\n• 车辆品牌展示 · 活动车辆 · 促销展台", followUps: ["什么是OOH广告？", "价格/报价", "覆盖城市"] },
  btl: { a: "BTL & 品牌活动：\n• 商场&大学活动 · 产品试用 · 体验式品牌展示", followUps: ["数字营销", "价格/报价", "联系我们的团队"] },
  retail: { a: "零售 & 标识：\n• 霓虹灯 & LED · ACP展板 · 店内陈列\n\n自营生产 — 不外包！", followUps: ["什么是OOH广告？", "价格/报价", "覆盖城市"] },
  price: { a: "大致价格：\n• 单块广告牌 — ₹50,000/月\n• 全城市 — ₹3L–₹15L · 车辆 — ₹15,000\n• 数字营销 — ₹20,000/月 · 网站 — ₹25,000\n\n+91 95060 17729!", followUps: ["联系我们的团队", "覆盖城市", "什么是OOH广告？"], connectCTA: true },
  cities: { a: "6个城市：\n\n📍 勒克瑙 · +91 95060 17729\n📍 坎普尔 · +91 83539 72277\n📍 德里 · +91 98387 98388\n📍 博帕尔 · +91 81759 88988\n📍 阿格拉 · +91 99979 27300\n📍 布拉亚格拉杰", followUps: ["价格/报价", "联系我们的团队", "什么是OOH广告？"], connectCTA: true },
  contact: { a: "📞 +91 95060 17729 (勒克瑙) | +91 98387 98388 (德里)\n📧 info@timesquaremedia.in", followUps: ["价格/报价", "覆盖城市", "什么是OOH广告？"], connectCTA: true },
  about: { a: "Time Square Media：\n• 成立2012年 — 12年以上 · 6城市 · 100+品牌 · 500+活动", followUps: ["什么是OOH广告？", "覆盖城市", "联系我们的团队"] },
  start: { a: "4步开始：\n1️⃣ 告诉我们城市&目标 · 2️⃣ 筛选最佳位置\n3️⃣ 24小时出方案 · 4️⃣ 活动启动!\n\n+91 95060 17729!", followUps: ["价格/报价", "覆盖城市", "联系我们的团队"], connectCTA: true },
  services: { a: "7项服务 — 全部自营：\n• OOH · 移动媒体 · 数字营销 · 标识 · BTL · 零售咨询 · 网站\n\n一家机构. 一张发票.", followUps: ["价格/报价", "覆盖城市", "联系我们的团队"] },
  intl: { a: "是的 — 欢迎NRI及国际客户！\n\ninfo@timesquaremedia.in | WhatsApp +91 95060 17729", followUps: ["覆盖城市", "价格/报价", "联系我们的团队"], connectCTA: true },
  fallback: { a: "好问题！+91 95060 17729 · info@timesquaremedia.in", followUps: ["什么是OOH广告？", "价格/报价", "联系我们的团队"], connectCTA: true },
};
/* ─── Translations lookup map ─── */
const TRANSLATIONS: Partial<Record<Lang, Record<string, { a: string; followUps: string[]; connectCTA?: boolean }>>> = {
  ta: TAMIL, mr: MARATHI, te: TELUGU, ml: MALAYALAM,
  kn: KANNADA, bn: BENGALI, gu: GUJARATI, pa: PUNJABI,
  ar: ARABIC, zh: CHINESE,
};

/* ─── Comprehensive FAQ — English + Hindi/Hinglish + all scripts ─── */
const FAQ: Array<{ key: string; q: RegExp; a: string; followUps?: string[]; connectCTA?: boolean }> = [

  /* ── Greetings – all languages ── */
  {
    key: "greeting",
    q: /\b(hi|hello|hey|namaste|namaskar|hola|salut|bonjour|hallo|مرحبا|नमस्ते|नमस्कार|kem\s*cho|vanakkam|sat\s*sri\s*akal|adaab|assalamu|salam|good\s*(morning|afternoon|evening)|good\s*day)\b|[஀-௿]/i,
    a: "Hello! Welcome to Time Square Media — 12+ years of advertising excellence.\n\nI can answer questions about:\n• OOH / Billboard advertising\n• Digital & social media marketing\n• Web solutions\n• Pricing & campaigns\n• Our cities across India\n\nWhat are you looking for?",
    followUps: ["What is OOH advertising?", "Pricing / Quote", "Cities you cover"],
  },

  /* ── Talk to team / human ── */
  {
    key: "team",
    q: /talk|team|human|agent|connect|speak|call\s*me|callback|representative|expert|sales|consult|meeting|demo|enquiry|inquiry|संपर्क|बात|टीम/i,
    a: "Absolutely! Our team is ready to help you.\n\n📞 Lucknow HQ — +91 95060 17729\n📞 Delhi — +91 98387 98388\n📧 info@timesquaremedia.in\n\nOr tap the green WhatsApp button — we reply within 2 hours on working days.\n\nYou can also fill our contact form and we'll call you back.",
    followUps: ["Pricing / Quote", "Cities you cover", "What is OOH advertising?"],
    connectCTA: true,
  },

  /* ── OOH / Billboard / Hoarding ── */
  {
    key: "ooh",
    q: /billboard|hoarding|outdoor|ooh|unipole|gantry|led\s*wall|flex|banner|hording|होर्डिंग|बिलबोर्ड|आउटडोर|outdoor\s*ad/i,
    a: "OOH (Out-of-Home) advertising = your brand, visible 24/7 to thousands of people every day.\n\nFormats we handle:\n• Hoardings & Billboards\n• Unipoles & Gantries\n• LED Video Walls\n• Bus Shelters & FOBs\n• Metro Station Panels\n• Neon & Crystal LED signs\n\nAll formats are designed, fabricated and installed in-house — faster delivery, better quality.",
    followUps: ["Pricing / Quote", "Cities you cover", "Talk to our team"],
    connectCTA: true,
  },

  /* ── Why OOH / ROI / Effectiveness ── */
  {
    key: "roi",
    q: /why\s*ooh|effective|roi|return|impact|result|benefit|advantage|work|achha|fayda|worth|value/i,
    a: "OOH advertising delivers proven results:\n• 92% of people notice OOH ads every month\n• 76% recall ads they see on hoardings\n• 93% feel more confident in brands seen on OOH\n• 85% take action after seeing an OOH ad\n\nUnlike digital ads — OOH cannot be skipped, blocked or scrolled past. It works 24/7.",
    followUps: ["What is OOH advertising?", "Pricing / Quote", "Talk to our team"],
  },

  /* ── Digital marketing ── */
  {
    key: "digital",
    q: /digital|social\s*media|seo|google\s*ads?|meta|facebook|instagram|influencer|ppc|content|youtube|डिजिटल|सोशल\s*मीडिया/i,
    a: "Our Digital Marketing services:\n• Google Ads & Meta (Facebook/Instagram) Ads\n• Social Media Management\n• SEO & Content Creation\n• Influencer Marketing\n• YouTube & Video campaigns\n\nWe run digital campaigns in sync with your OOH — so your brand story is consistent everywhere your audience sees it.",
    followUps: ["Web & app solutions", "Pricing / Quote", "Talk to our team"],
    connectCTA: true,
  },

  /* ── Web / Website ── */
  {
    key: "web",
    q: /web|website|landing\s*page|ecommerce|e-commerce|app|online|develop|वेबसाइट|ऑनलाइन/i,
    a: "We build websites that actually bring in customers:\n• Business & portfolio websites\n• E-commerce platforms\n• Landing pages for campaigns\n• SEO-optimised & mobile-first\n• 30 days free post-launch support\n\nYour website is your 24/7 salesperson — we build it right.",
    followUps: ["Digital marketing", "Pricing / Quote", "Talk to our team"],
    connectCTA: true,
  },

  /* ── Mobile media / Auto / Van ── */
  {
    key: "mobile",
    q: /mobile\s*media|auto\s*branding|bus\s*wrap|canter|van|toto|vehicle|tempo|truck|ऑटो\s*ब्रांडिंग/i,
    a: "Mobile Media takes your brand everywhere:\n• Auto & Toto branding\n• Bus & Metro wraps\n• Activity vans & canters\n• Promo stands & tents\n\nReaches lanes and areas that fixed hoardings simply can't — ideal for hyper-local targeting.",
    followUps: ["What is OOH advertising?", "Pricing / Quote", "Cities you cover"],
  },

  /* ── BTL / Activations ── */
  {
    key: "btl",
    q: /btl|activation|event|experiential|ground|sampling|promo|stall|mall|college|एक्टिवेशन|इवेंट/i,
    a: "BTL & Activation campaigns we run:\n• Mall & college activations\n• Product sampling drives\n• Experiential brand setups\n• On-ground promo campaigns\n\nPeople remember experiences far longer than anything they simply see. Our BTL campaigns create that real connection.",
    followUps: ["Digital marketing", "Pricing / Quote", "Talk to our team"],
  },

  /* ── Retail / Signage / In-store ── */
  {
    key: "retail",
    q: /retail|store|shop|signage|neon|dealer\s*board|in.store|acp|साइनेज|दुकान/i,
    a: "Retail & Signage solutions:\n• Neon & Crystal LED signs\n• Dealer & ACP boards\n• In-store display branding\n• Visual merchandising\n• Running LED displays\n\nAll fabricated in-house at our own production unit — no outsourcing, no markup.",
    followUps: ["What is OOH advertising?", "Pricing / Quote", "Cities you cover"],
  },

  /* ── Pricing / Cost / Budget ── */
  {
    key: "price",
    q: /cost|price|rate|budget|how\s*much|charges|fees|expensive|cheap|quote|kitna|daam|paisa|rupee|₹|rate\s*list|package|plan/i,
    a: "Rough pricing guide (starting rates):\n• Single hoarding — from ₹50,000/month\n• Full city campaign — ₹3L to ₹15L\n• Auto branding — from ₹15,000\n• Digital marketing — from ₹20,000/month\n• Website — from ₹25,000\n• BTL activation — from ₹50,000\n\nFinal pricing depends on city, duration & format. Call us for a custom quote — no obligation!",
    followUps: ["Talk to our team", "Cities you cover", "What is OOH advertising?"],
    connectCTA: true,
  },

  /* ── Cities / Locations ── */
  {
    key: "cities",
    q: /city|cities|lucknow|kanpur|delhi|bhopal|agra|prayagraj|allahabad|location|pan\s*india|north\s*india|up|uttar\s*pradesh|शहर|लखनऊ|दिल्ली|कानपुर|भोपाल|आगरा/i,
    a: "We operate across 6 cities in North & Central India:\n\n📍 Lucknow — HQ · +91 95060 17729\n📍 Kanpur · +91 83539 72277\n📍 Delhi · +91 98387 98388\n📍 Bhopal · +91 81759 88988\n📍 Agra · +91 99979 27300\n📍 Prayagraj — Regional team\n\nNeed a Pan-India campaign? We coordinate multi-city campaigns across our network.",
    followUps: ["Pricing / Quote", "Talk to our team", "What is OOH advertising?"],
    connectCTA: true,
  },

  /* ── Contact / Phone / Email ── */
  {
    key: "contact",
    q: /contact|phone|number|email|reach|whatsapp|address|office|mail|नंबर|ईमेल|पता/i,
    a: "Get in touch with us:\n\n📞 Lucknow HQ — +91 95060 17729\n📞 Delhi — +91 98387 98388\n📧 info@timesquaremedia.in\n💬 WhatsApp — tap the green button below\n\nWe respond within 2 hours on working days.",
    followUps: ["Pricing / Quote", "Cities you cover", "What is OOH advertising?"],
    connectCTA: true,
  },

  /* ── Experience / History / About ── */
  {
    key: "about",
    q: /year|since|found|establish|experience|history|old|about|कितने\s*साल|पुराना|company|agency|who\s*are/i,
    a: "About Time Square Media:\n• Founded in 2012 — 12+ years in advertising\n• 6 cities across India\n• 100+ brands served\n• 500+ campaigns executed\n• In-house fabrication unit in Lucknow\n\nBrands we've worked with:\n• Nestlé, HDFC Bank, Vaseline\n• BlueStone, Tea Valley, Pan Bahar\n• Campus, Siggnature, Rudra & more",
    followUps: ["What is OOH advertising?", "Cities you cover", "Talk to our team"],
  },

  /* ── In-house fabrication ── */
  {
    key: "ooh",
    q: /fabricat|print|install|produc|manufactur|in.house|खुद|अपना|इन-हाउस/i,
    a: "We own our fabrication unit — here's why that matters for you:\n• Faster turnaround (no waiting for vendors)\n• Consistent print & material quality\n• No outsourcing markups = better pricing\n• Same team from design to installation\n\nMost agencies outsource this. We don't.",
    followUps: ["What is OOH advertising?", "Pricing / Quote", "Cities you cover"],
  },

  /* ── Hindi/Hinglish general service questions ── */
  {
    key: "services",
    q: /kya\s*karte|kya\s*hai|service|kaam|काम|सेवा|क्या\s*करते|क्या\s*है/i,
    a: "Time Square Media 7 services देती है:\n• OOH Brand Building (Hoardings, LED walls)\n• Mobile Media (Auto, Bus, Van branding)\n• Digital Marketing (Google, Meta, SEO)\n• On/In Media (Signage, Neons)\n• BTL Activations (Events, Sampling)\n• Retail Consultancy (Store branding)\n• Web Solutions (Websites, Landing pages)\n\nSabhi services in-house — ek hi jagah, ek hi team.",
    followUps: ["Pricing / Quote", "Cities you cover", "Talk to our team"],
  },

  /* ── International / foreign clients ── */
  {
    key: "intl",
    q: /international|foreign|abroad|overseas|nri|global|expat|uk|usa|uae|dubai|america|europe|कितने देश/i,
    a: "Yes, we work with NRI and international clients too!\n\nFor businesses wanting to advertise their brand in North India:\n• Remote consultation via video call\n• Proposal & campaign plan sent digitally\n• Real-time updates & photos of live campaigns\n• Payment via international transfer accepted\n\nContact: info@timesquaremedia.in or WhatsApp +91 95060 17729.",
    followUps: ["Cities you cover", "Pricing / Quote", "Talk to our team"],
    connectCTA: true,
  },

  /* ── How to start / Get started ── */
  {
    key: "start",
    q: /start|begin|first\s*step|how\s*to|get\s*in\s*touch|approach|kaise\s*shuru|शुरू|process|procedure/i,
    a: "Getting started is simple — 4 steps:\n\n1️⃣ Tell us your city & campaign goal\n2️⃣ We shortlist sites & best formats\n3️⃣ Custom proposal within 24 hours\n4️⃣ Campaign goes live\n\nCall +91 95060 17729 or tap the WhatsApp button — we'll take it from there!",
    followUps: ["Pricing / Quote", "Cities you cover", "Talk to our team"],
    connectCTA: true,
  },

  /* ── All services overview ── */
  {
    key: "services",
    q: /service|offer|do\s*you|speciali[sz]|what\s*do|सब\s*कुछ|सारी/i,
    a: "We offer 7 services — all in-house:\n• OOH Brand Building (hoardings, LEDs)\n• Mobile Media (autos, buses, vans)\n• Digital Marketing (Google, Meta, SEO)\n• On/In Media (signage, neons)\n• BTL Activations (events, sampling)\n• Retail Consultancy (store branding)\n• Web Solutions (websites, landing pages)\n\nOne agency. One invoice. Zero coordination headaches.",
    followUps: ["Pricing / Quote", "Cities you cover", "Talk to our team"],
  },
];

/* ── Language-aware response engine ── */
function getResponse(input: string, forceLang?: Lang): { a: string; followUps?: string[]; connectCTA?: boolean } {
  const lang = forceLang ?? detectLang(input);
  const normalised = input.toLowerCase().trim();
  const t = TRANSLATIONS[lang];

  for (const item of FAQ) {
    if (item.q.test(input) || item.q.test(normalised)) {
      if (t) {
        const r = t[item.key ?? ""] ?? t["fallback"];
        if (r) return { a: r.a, followUps: r.followUps, connectCTA: r.connectCTA };
      }
      return { a: item.a, followUps: item.followUps, connectCTA: item.connectCTA };
    }
  }

  if (t?.fallback) return { a: t.fallback.a, followUps: t.fallback.followUps, connectCTA: t.fallback.connectCTA };
  return {
    a: "That's a great question! Our team can give you the most accurate answer.\n\nFor now, here are the topics I can help with:",
    followUps: ["What is OOH advertising?", "Pricing / Quote", "Cities you cover", "Talk to our team"],
    connectCTA: true,
  };
}

/* ── Bot text renderer ── */
function renderBotText(text: string) {
  const blocks = text.split("\n\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const bullets = lines.filter((l) => l.match(/^[•\-›\d️⃣📞📧📍💬]/u));
        const prose = lines.filter((l) => !l.match(/^[•\-›\d️⃣📞📧📍💬]/u)).join(" ").trim();
        return (
          <div key={bi}>
            {prose && (
              <p style={{ margin: 0, marginBottom: bullets.length ? 5 : 0, lineHeight: 1.65 }}>
                {prose}
              </p>
            )}
            {bullets.length > 0 && (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                {bullets.map((b, li) => (
                  <li key={li} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <span style={{ color: "#5BA3E8", flexShrink: 0, marginTop: 1, fontWeight: "bold" }}>›</span>
                    <span style={{ lineHeight: 1.6 }}>{b.replace(/^[•\-›]/u, "").trim()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Attractive chat icon (speech bubble + sparkle) ── */
function ChatIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* Main bubble */}
      <path
        d="M5 5C5 3.9 5.9 3 7 3H25C26.1 3 27 3.9 27 5V20C27 21.1 26.1 22 25 22H18.5L13 27.5V22H7C5.9 22 5 21.1 5 20V5Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Three dots */}
      <circle cx="11" cy="12.5" r="2" fill="#2D78C8" />
      <circle cx="16" cy="12.5" r="2" fill="#1a5a9e" />
      <circle cx="21" cy="12.5" r="2" fill="#2D78C8" />
      {/* Sparkle top-right */}
      <path d="M26 2 L26.6 3.4 L28 4 L26.6 4.6 L26 6 L25.4 4.6 L24 4 L25.4 3.4Z" fill="white" fillOpacity="0.85" />
    </svg>
  );
}

/* ── Chip buttons ── */
function Chips({ items, onPick }: { items: string[]; onPick: (q: string) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>
      {items.map((q) => (
        <button
          key={q}
          onClick={() => onPick(q)}
          style={{
            padding: "5px 11px",
            borderRadius: 20,
            border: "1px solid rgba(45,120,200,0.35)",
            background: "rgba(45,120,200,0.08)",
            color: "#5BA3E8",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            letterSpacing: "0.01em",
            lineHeight: 1.4,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget;
            b.style.background = "rgba(45,120,200,0.22)";
            b.style.color = "#fff";
            b.style.borderColor = "#2D78C8";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget;
            b.style.background = "rgba(45,120,200,0.08)";
            b.style.color = "#5BA3E8";
            b.style.borderColor = "rgba(45,120,200,0.35)";
          }}
        >
          {q}
        </button>
      ))}
    </div>
  );
}

/* ── Connect CTA ── */
function ConnectCTA() {
  return (
    <div style={{
      marginTop: 10,
      padding: "9px 12px",
      borderRadius: 12,
      background: "linear-gradient(135deg, rgba(45,120,200,0.18), rgba(26,90,158,0.12))",
      border: "1px solid rgba(45,120,200,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    }}>
      <div>
        <p style={{ margin: 0, fontSize: 11, color: "#f0f0f8", fontFamily: "var(--font-grotesk)", fontWeight: 600 }}>
          Want a free consultation?
        </p>
        <p style={{ margin: 0, fontSize: 10, color: "#888898", fontFamily: "var(--font-mono)", marginTop: 2 }}>
          Our team responds in 2 hrs
        </p>
      </div>
      <a
        href="tel:+919506017729"
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          background: "linear-gradient(135deg, #2D78C8, #1a5a9e)",
          color: "#fff",
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          textDecoration: "none",
          whiteSpace: "nowrap",
          letterSpacing: "0.02em",
          boxShadow: "0 2px 8px rgba(45,120,200,0.4)",
        }}
      >
        Call Now →
      </a>
    </div>
  );
}

/* ─── Language picker config ─── */
const LANG_OPTIONS: { code: Lang | "auto"; label: string; script: string }[] = [
  { code: "auto", label: "Auto-detect",  script: "🌐" },
  { code: "en",   label: "English",      script: "A"  },
  { code: "hi",   label: "हिंदी",         script: "अ"  },
  { code: "mr",   label: "मराठी",         script: "म"  },
  { code: "ta",   label: "தமிழ்",         script: "த"  },
  { code: "te",   label: "తెలుగు",        script: "అ"  },
  { code: "ml",   label: "മലയാളം",       script: "മ"  },
  { code: "kn",   label: "ಕನ್ನಡ",         script: "ಕ"  },
  { code: "bn",   label: "বাংলা",         script: "ক"  },
  { code: "gu",   label: "ગુજરાતી",       script: "ગ"  },
  { code: "pa",   label: "ਪੰਜਾਬੀ",        script: "ਪ"  },
  { code: "ar",   label: "عربي",          script: "ع"  },
  { code: "zh",   label: "中文",           script: "中" },
];

export default function ChatBot() {
  const [open, setOpen]           = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [msgs, setMsgs]           = useState<Msg[]>([
    { role: "bot", text: GREETING, followUps: QUICK_REPLIES },
  ]);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [activeLang, setActiveLang] = useState<Lang | "auto">("auto");
  const [showLangPicker, setShowLangPicker] = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [open, msgs]);

  /* close lang picker when clicking outside */
  useEffect(() => {
    if (!showLangPicker) return;
    const handler = () => setShowLangPicker(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [showLangPicker]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMsgs((prev) => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      const forced = activeLang === "auto" ? undefined : activeLang;
      const { a, followUps, connectCTA } = getResponse(msg, forced);
      setTyping(false);
      setMsgs((prev) => [...prev, { role: "bot", text: a, followUps, connectCTA }]);
    }, 600 + Math.random() * 350);
  };

  return (
    <>
      {/* ── FAB button ── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open TSM chat assistant"
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "1.5rem",
          zIndex: 50,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #2D78C8 0%, #1a5a9e 100%)",
          boxShadow: "0 4px 24px rgba(45,120,200,0.55), 0 0 0 4px rgba(45,120,200,0.12)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pulse ring */}
        {!open && hasUnread && (
          <span style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: "2px solid rgba(45,120,200,0.45)",
            animation: "pulse-ring 2s ease-out infinite",
          }} />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
              <ChatIcon size={26} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {!open && hasUnread && (
          <span style={{
            position: "absolute", top: 0, right: 0,
            width: 18, height: 18, borderRadius: "50%",
            background: "#ef4444",
            border: "2px solid #0F0F1A",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 700, color: "#fff",
            fontFamily: "var(--font-mono)",
          }}>
            1
          </span>
        )}
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            style={{
              position: "fixed",
              bottom: "10.3rem",
              right: "1.5rem",
              zIndex: 60,
              width: 348,
              maxHeight: "72vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: 20,
              border: "1px solid rgba(45,120,200,0.2)",
              background: "#0F0F1A",
              overflow: "hidden",
              boxShadow: "0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(45,120,200,0.1)",
            }}
          >
            {/* ── Header ── */}
            <div style={{
              padding: "13px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 11,
              background: "linear-gradient(135deg, rgba(45,120,200,0.18), rgba(45,120,200,0.07))",
              flexShrink: 0,
              position: "relative",
            }}>
              {/* Logo avatar */}
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "linear-gradient(135deg, #2D78C8 0%, #1a5a9e 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 12px rgba(45,120,200,0.5)",
                border: "2px solid rgba(255,255,255,0.15)",
              }}>
                <ChatIcon size={22} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#f0f0f8", fontFamily: "var(--font-grotesk)", letterSpacing: "0.01em" }}>
                  TSM Smart Assistant
                </div>
                <div style={{ fontSize: 10.5, color: "#22c55e", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)", marginTop: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e", animation: "blink 2s infinite" }} />
                  Online · OOH · Digital · Web
                </div>
              </div>

              {/* ── Language picker button ── */}
              <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowLangPicker((v) => !v)}
                  aria-label="Select language"
                  title="Select reply language"
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 9px", borderRadius: 8,
                    border: "1px solid rgba(45,120,200,0.4)",
                    background: showLangPicker ? "rgba(45,120,200,0.25)" : "rgba(45,120,200,0.12)",
                    color: "#5BA3E8", cursor: "pointer",
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* Script badge */}
                  <span style={{
                    width: 18, height: 18, borderRadius: 5,
                    background: "rgba(45,120,200,0.3)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: "#fff",
                  }}>
                    {LANG_OPTIONS.find((l) => l.code === activeLang)?.script ?? "🌐"}
                  </span>
                  {LANG_OPTIONS.find((l) => l.code === activeLang)?.label ?? "Auto"}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {showLangPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.13 }}
                      style={{
                        position: "absolute", top: "calc(100% + 6px)", right: 0,
                        zIndex: 200,
                        background: "#141420",
                        border: "1px solid rgba(45,120,200,0.3)",
                        borderRadius: 12,
                        boxShadow: "0 12px 36px rgba(0,0,0,0.7)",
                        overflow: "hidden",
                        minWidth: 150,
                      }}
                    >
                      {LANG_OPTIONS.map((opt) => (
                        <button
                          key={opt.code}
                          onClick={() => { setActiveLang(opt.code); setShowLangPicker(false); }}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            width: "100%", padding: "8px 14px",
                            border: "none", background: activeLang === opt.code ? "rgba(45,120,200,0.2)" : "transparent",
                            color: activeLang === opt.code ? "#5BA3E8" : "#c8c8d8",
                            fontSize: 12, fontFamily: "var(--font-grotesk)",
                            cursor: "pointer", textAlign: "left",
                            borderLeft: activeLang === opt.code ? "2px solid #2D78C8" : "2px solid transparent",
                            transition: "all 0.1s",
                          }}
                          onMouseEnter={(e) => { if (activeLang !== opt.code) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                          onMouseLeave={(e) => { if (activeLang !== opt.code) e.currentTarget.style.background = "transparent"; }}
                        >
                          <span style={{
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                            background: activeLang === opt.code ? "rgba(45,120,200,0.3)" : "rgba(255,255,255,0.08)",
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            fontSize: opt.script.length === 1 && opt.script !== "A" ? 13 : 11,
                            fontWeight: 700, color: activeLang === opt.code ? "#5BA3E8" : "#a0a0b8",
                          }}>
                            {opt.script}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 16, padding: "2px 4px", lineHeight: 1, flexShrink: 0 }}
              >
                ✕
              </button>
            </div>

            {/* ── Language note ── */}
            <div style={{
              padding: "6px 14px",
              background: "rgba(45,120,200,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              flexShrink: 0,
            }}>
              <p style={{ margin: 0, fontSize: 10, color: "#888898", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
                {activeLang === "auto"
                  ? "🌐 Auto-detect · Hindi · Marathi · Tamil · English & more"
                  : `🌐 Replying in: ${LANG_OPTIONS.find((l) => l.code === activeLang)?.script} ${LANG_OPTIONS.find((l) => l.code === activeLang)?.label}`}
              </p>
            </div>

            {/* ── Messages ── */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 4px", display: "flex", flexDirection: "column", gap: 10 }}>
              {msgs.map((m, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 6 }}>
                    {/* Bot avatar dot */}
                    {m.role === "bot" && (
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #2D78C8, #1a5a9e)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 1px 6px rgba(45,120,200,0.4)",
                      }}>
                        <ChatIcon size={12} />
                      </div>
                    )}
                    <div style={{
                      maxWidth: "84%",
                      padding: "9px 13px",
                      borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                      background: m.role === "user"
                        ? "linear-gradient(135deg, #2D78C8, #1a5a9e)"
                        : "rgba(255,255,255,0.055)",
                      border: m.role === "bot" ? "1px solid rgba(255,255,255,0.07)" : "none",
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: "#f0f0f8",
                      fontFamily: "var(--font-grotesk)",
                    }}>
                      {m.role === "bot" ? renderBotText(m.text) : m.text}
                    </div>
                  </div>

                  {m.role === "bot" && m.followUps && (
                    <div style={{ paddingLeft: 28 }}>
                      <Chips items={m.followUps} onPick={send} />
                    </div>
                  )}
                  {m.role === "bot" && m.connectCTA && (
                    <div style={{ paddingLeft: 28 }}>
                      <ConnectCTA />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, #2D78C8, #1a5a9e)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ChatIcon size={12} />
                  </div>
                  <div style={{ display: "flex", gap: 4, padding: "10px 14px", borderRadius: "4px 16px 16px 16px", background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D78C8", animation: `tDot 1.2s ease-in-out infinite ${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Connect to team persistent strip ── */}
            <div style={{
              padding: "8px 12px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(45,120,200,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              flexShrink: 0,
            }}>
              <p style={{ margin: 0, fontSize: 10.5, color: "#888898", fontFamily: "var(--font-mono)" }}>
                📞 Connect our team
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                <a
                  href="tel:+919506017729"
                  style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(45,120,200,0.2)", color: "#5BA3E8", fontSize: 10, fontFamily: "var(--font-mono)", textDecoration: "none", border: "1px solid rgba(45,120,200,0.3)", fontWeight: 600 }}
                >
                  Call
                </a>
                <a
                  href="mailto:info@timesquaremedia.in"
                  style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(45,120,200,0.2)", color: "#5BA3E8", fontSize: 10, fontFamily: "var(--font-mono)", textDecoration: "none", border: "1px solid rgba(45,120,200,0.3)", fontWeight: 600 }}
                >
                  Email
                </a>
              </div>
            </div>

            {/* ── Input ── */}
            <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, flexShrink: 0, background: "rgba(0,0,0,0.3)" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything in any language..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: 12.5,
                  color: "#f0f0f8",
                  outline: "none",
                  fontFamily: "var(--font-grotesk)",
                }}
              />
              <button
                onClick={() => send()}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "linear-gradient(135deg, #2D78C8, #1a5a9e)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, boxShadow: "0 2px 10px rgba(45,120,200,0.45)",
                }}
              >
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes tDot { 0%,100%{opacity:.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-3px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.6);opacity:0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </>
  );
}
