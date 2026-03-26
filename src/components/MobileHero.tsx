"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./MobileHero.module.css";

export function MobileHero() {
  const reduceMotion = useReducedMotion();
  const roles = ["Videographer", "Content Creator"] as const;

  // Name typing (once)
  const [nameCount, setNameCount] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const full = "RISHI RAJPUT";
    if (nameCount >= full.length) return;
    const id = window.setTimeout(() => setNameCount((c) => c + 1), 55);
    return () => window.clearTimeout(id);
  }, [nameCount, reduceMotion]);

  // Role type → pause → erase → switch (loop)
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedCount, setTypedCount] = useState(0);
  const [mode, setMode] = useState<"typing" | "pausing" | "erasing">("typing");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const word = roles[roleIndex];
    const typeSpeed = 55;
    const eraseSpeed = 38;
    const pauseMs = 900;

    const clear = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    clear();

    if (mode === "typing") {
      if (typedCount < word.length) {
        timeoutRef.current = window.setTimeout(() => {
          setTypedCount((c) => c + 1);
        }, typeSpeed);
      } else {
        timeoutRef.current = window.setTimeout(() => setMode("pausing"), pauseMs);
      }
    } else if (mode === "pausing") {
      timeoutRef.current = window.setTimeout(() => setMode("erasing"), pauseMs);
    } else {
      if (typedCount > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setTypedCount((c) => c - 1);
        }, eraseSpeed);
      } else {
        setRoleIndex((v) => (v + 1) % roles.length);
        setMode("typing");
      }
    }

    return clear;
  }, [mode, reduceMotion, roleIndex, roles, typedCount]);

  const currentRole = roles[roleIndex];
  const visibleRole = reduceMotion
    ? currentRole
    : currentRole.slice(0, Math.min(typedCount, currentRole.length));

  const visibleName = reduceMotion ? "RISHI RAJPUT" : "RISHI RAJPUT".slice(0, nameCount);

  return (
    <section className={styles.section}>
      <div className={styles.center}>
        <div className={styles.wrap}>
          <div className={styles.textWrap}>
            <div className={styles.pill}>
              <div className={styles.pillText}>
                <span className={styles.namePrefix}>I am&nbsp;</span>
                <span className={styles.nameStrong}>{visibleName}</span>
              </div>
            </div>

            <motion.div
              className={styles.pill}
              layout
              transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
            >
              <div className={styles.pillText} style={{ position: "relative" }}>
                <span style={{ visibility: "hidden" }}>{currentRole}</span>
                <span style={{ position: "absolute", left: 0, right: 0, top: 0 }}>
                  {visibleRole}
                </span>
              </div>
            </motion.div>
          </div>

          <div className={styles.shadowWrap} aria-hidden="true">
            <div className={styles.shadow} />
          </div>

          <div className={styles.cameraWrap}>
            <motion.div
              initial={false}
              animate={reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 7, ease: "easeInOut", repeat: Infinity }
              }
            >
              <Image
                src="/hero/mobile_hero_camera.png"
                alt="Camera"
                width={900}
                height={900}
                priority
                className={styles.img}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

