"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Hero.module.css";

type DesktopHeroAnimationProps = {
  startStackMs?: number;
};

type Phase = "stack" | "final";

export function DesktopHeroAnimation({ startStackMs = 2400 }: DesktopHeroAnimationProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("stack");
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("final"), startStackMs);
    const t2 = window.setTimeout(() => setFloating(true), startStackMs + 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [startStackMs]);

  const easePremium = useMemo<[number, number, number, number]>(
    () => [0.22, 1, 0.36, 1],
    [],
  );

  const floatAnim = floating && !reduceMotion;
  const stackScale = 1.08;
  const roles = ["Videographer", "Content Creator"] as const;
  const [isLgUp, setIsLgUp] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLgUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const letters = (text: string) => Array.from(text).map((ch) => (ch === " " ? "\u00A0" : ch));

  const textContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.045, delayChildren: 0.08 },
    },
  };

  const textChar = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.26 },
    },
  };

  const currentRole = roles[roleIndex];
  const visibleRole = reduceMotion
    ? currentRole
    : currentRole.slice(0, Math.min(typedCount, currentRole.length));

  const lensX = isLgUp === false ? 290 : 420;
  const lensY = isLgUp === false ? 310 : 285;
  const lensScale = isLgUp === false ? 0.95 : 1.05;
  const coverY = isLgUp === false ? 310 : 285;
  const coverScale = isLgUp === false ? 0.94 : 1.02;

  return (
    <section className={styles.section}>
      <div className={styles.centerGrid}>
        <div className={styles.stage}>
          {/* Text pills (desktop/tablet only) */}
          <div className={styles.pillGrid}>
            <motion.div
              className={`${styles.pill} ${styles.pillLeft}`}
            >
              <div className={styles.pillText}>
                <span className={styles.pillNamePrefix}>I am&nbsp;</span>
                <motion.span
                  variants={textContainer}
                  initial="hidden"
                  animate="show"
                  className={styles.pillNameStrong}
                >
                  {letters("RISHI RAJPUT").map((ch, i) => (
                    <motion.span key={i} variants={textChar}>
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
              </div>
            </motion.div>

            <div className={styles.pillSpacer} aria-hidden="true" />

            <div className={`${styles.pill} ${styles.pillRight} ${styles.pillRightFixed}`}>
              <div className={styles.pillText}>
                <span>{visibleRole}</span>
                <span className={styles.cursor}>|</span>
              </div>
            </div>
          </div>

          {/* Shadow */}
          <div className={styles.centerAbs}>
            <motion.div
              className={styles.centerWrap}
              initial={false}
              animate={
                phase === "stack"
                  ? { y: 185, scale: 1.08, opacity: 0.44 }
                  : { y: 150, scale: 0.98, opacity: 0.57 }
              }
              transition={{ duration: 1.15, ease: easePremium }}
            >
              <div className={styles.shadow}>
                <motion.div
                  className="h-full w-full"
                  animate={floatAnim ? { scale: [1, 0.97, 1] } : { scale: 1 }}
                  transition={
                    floatAnim
                      ? { duration: 6.5, ease: "easeInOut", repeat: Infinity }
                      : undefined
                  }
                />
              </div>
            </motion.div>
          </div>

          {/* Camera (main) */}
          <div className={`${styles.centerAbs} ${styles.layerCamera}`}>
            <motion.div
              className={styles.centerWrap}
              initial={false}
              animate={
                phase === "stack"
                  ? { x: 0, y: 0, scale: stackScale }
                  : { x: 0, y: -70, scale: 0.96 }
              }
              transition={{ duration: 1.15, ease: easePremium }}
            >
              <motion.div
                animate={floatAnim ? { y: [0, -8, 0] } : { y: 0 }}
                transition={
                  floatAnim
                    ? { duration: 6.6, ease: "easeInOut", repeat: Infinity }
                    : undefined
                }
              >
                <Image
                  src="/hero/main_hero_camera.png"
                  alt="Camera"
                  width={900}
                  height={900}
                  priority
                  className={styles.imgCamera}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Lens 1 (right) */}
          <div className={`${styles.centerAbs} ${styles.layerLens}`}>
            <motion.div
              className={styles.centerWrap}
              initial={false}
              animate={
                phase === "stack"
                  ? { x: 0, y: 0, scale: stackScale, rotate: 0 }
                  : {
                    x: lensX,
                    y: lensY,
                    scale: lensScale,
                    rotate: reduceMotion ? 0 : 320,
                  }
              }
              transition={{ duration: 1.35, ease: easePremium, delay: 0.12 }}
            >
              <motion.div
                animate={floatAnim ? { y: [0, -7, 0] } : { y: 0 }}
                transition={
                  floatAnim
                    ? {
                      duration: 6.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.2,
                    }
                    : undefined
                }
              >
                <Image
                  src="/hero/camera_lens_1.png"
                  alt="Lens"
                  width={700}
                  height={700}
                  className={styles.imgLens1}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Lens 2 (left) */}
          <div className={`${styles.centerAbs} ${styles.layerLens}`}>
            <motion.div
              className={styles.centerWrap}
              initial={false}
              animate={
                phase === "stack"
                  ? { x: 0, y: 0, scale: stackScale, rotate: 0 }
                  : {
                    x: -lensX,
                    y: lensY,
                    scale: lensScale,
                    rotate: reduceMotion ? 0 : -320,
                  }
              }
              transition={{ duration: 1.35, ease: easePremium, delay: 0.2 }}
            >
              <motion.div
                animate={floatAnim ? { y: [0, -7, 0] } : { y: 0 }}
                transition={
                  floatAnim
                    ? {
                      duration: 6.4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.4,
                    }
                    : undefined
                }
              >
                <Image
                  src="/hero/camera_lens_2.png"
                  alt="Lens"
                  width={700}
                  height={700}
                  className={styles.imgLens2}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Camera Cover */}
          <div className={`${styles.centerAbs} ${styles.layerCover}`}>
            <motion.div
              className={styles.centerWrap}
              initial={false}
              animate={
                phase === "stack"
                  ? { x: 0, y: 0, scale: stackScale, rotate: 0 }
                  : { x: 0, y: coverY, scale: coverScale, rotate: reduceMotion ? 0 : 6 }
              }
              transition={{ duration: 1.25, ease: easePremium, delay: 0.08 }}
            >
              <motion.div
                animate={floatAnim ? { y: [0, -6, 0] } : { y: 0 }}
                transition={
                  floatAnim
                    ? {
                      duration: 6.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.15,
                    }
                    : undefined
                }
              >
                <Image
                  src="/hero/camera_cover.png"
                  alt="Camera cover"
                  width={700}
                  height={700}
                  className={styles.imgCover}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

