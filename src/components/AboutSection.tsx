"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './AboutSection.module.css';

/**
 * AboutSection component for photography/videography portfolio.
 * Optimized for mobile with a specific spotlight beam layout.
 */
const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Floating animation settings
  const floatingAnimation = {
    y: [0, -10, 0],
  };

  const floatingTransition = {
    duration: 6,
    ease: "easeInOut" as const,
    repeat: Infinity,
  };

  return (
    <section id="about" className={styles.section}>
      {/* Gradient fade strip: Cream to Black */}
      <div className={styles.fadeStrip} />

      {/* DESKTOP/TABLET: Single full image with float effect */}
      <div className={styles.desktopView}>
        <motion.div
          animate={shouldReduceMotion ? {} : floatingAnimation}
          transition={shouldReduceMotion ? {} : floatingTransition}
          className={styles.desktopFloatWrapper}
        >
          <Image
            src="/hero/about_us_full.png"
            alt="About Rishi Rajput"
            fill
            className={styles.desktopFullImage}
            priority
          />
        </motion.div>
      </div>

      {/* MOBILE: Single full image for small screens */}
      <div className={styles.mobileView}>
        <motion.div
          animate={shouldReduceMotion ? {} : floatingAnimation}
          transition={shouldReduceMotion ? {} : floatingTransition}
          className={styles.mobileFloatWrapper}
        >
          <Image
            src="/hero/about_us_mobile.png"
            alt="About Rishi Rajput Mobile"
            fill
            className={styles.mobileFullImage}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
