"use client";

import WaterCursor from "./WaterCursor";
import WhatsAppWidget from "./WhatsAppWidget";
import ChatBot from "./ChatBot";
import ScrollProgress from "./ScrollProgress";

export default function GlobalUI() {
  return (
    <>
      <ScrollProgress />
      <WaterCursor />
      <WhatsAppWidget />
      <ChatBot />
    </>
  );
}
