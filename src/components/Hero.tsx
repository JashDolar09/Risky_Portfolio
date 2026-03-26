"use client";

import { useEffect, useState } from "react";
import { DesktopHeroAnimation } from "./DesktopHeroAnimation";
import { MobileHero } from "./MobileHero";

type HeroProps = {
  startStackMs?: number;
};

export function Hero({ startStackMs = 2400 }: HeroProps) {
  const [isMdUp, setIsMdUp] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMdUp === null) return null;
  return isMdUp ? (
    <DesktopHeroAnimation startStackMs={startStackMs} />
  ) : (
    <MobileHero />
  );
}

