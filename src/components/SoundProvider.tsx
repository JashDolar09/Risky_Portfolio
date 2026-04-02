"use client";

import { useScrollSound } from "@/hooks/useScrollSound";

/**
 * Global provider for the scroll sound effect.
 * This component is used in the layout to ensure the sound hook stays active globally.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Use the global scroll sound hook
  useScrollSound("/sounds/scroll.mpeg");

  return <>{children}</>;
}
