"use client";

import WaterCursor from "./WaterCursor";
import WhatsAppWidget from "./WhatsAppWidget";
import ChatBot from "./ChatBot";
import ScrollProgress from "./ScrollProgress";
import ClassicSite from "./ClassicSite";

export default function GlobalUI() {
  return (
    <>
      <ScrollProgress />
      <WaterCursor />
      <ClassicSite />
      <WhatsAppWidget />
      <ChatBot />
    </>
  );
}
