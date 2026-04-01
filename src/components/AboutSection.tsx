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

      {/* MOBILE: Camera + beam + text */}
      <div className={styles.mobileView}>
        <div className={styles.cameraContainer}>
          <motion.div
            animate={shouldReduceMotion ? {} : floatingAnimation}
            transition={shouldReduceMotion ? {} : floatingTransition}
            className={styles.cameraWrapper}
          >
            <Image
              src="/hero/camera_about_mobile.png"
              alt="Sony Professional Camera"
              width={900}
              height={900}
              className={styles.cameraImage}
              priority
            />
          </motion.div>
          <div className={styles.shadow} aria-hidden="true" />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.beamBackground} />
          <h2 className={styles.heading}>About Us</h2>
          <p className={styles.description}>
            I am a videographer specializing in anchor shoots and product videography, with hands-on experience creating visually compelling content. Skilled in camera operation, lighting, and composition, I deliver professional-quality footage tailored to each project. Proficient in product video editing using CapCut Pro, I ensure polished, brand-focused results. Known for attention to detail, efficient workflow, and consistently meeting deadlines, I bring creativity and precision to every shoot.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
