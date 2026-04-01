"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import styles from './SkillSection.module.css';

/**
 * Skill data based on user input.
 */
const SKILLS_DATA = [
  {
    category: "PRODUCT SHOOT :",
    skills: [
      "Product Lighting Techniques",
      "E-commerce Product Videography",
      "Creative Product Composition",
      "Brand-Focused Visual Styling"
    ]
  },
  {
    category: "VIDEOGRAPHY :",
    skills: [
      "Anchor Shoot Production",
      "Camera Handling & Framing",
      "Shot Planning & Storyboarding",
      "Cinematic Video Shooting"
    ]
  },
  {
    category: "PHOTOGRAPHY :",
    skills: [
      "Product Photography",
      "Lighting & Composition",
      "Detail-Oriented Shooting",
      "Background & Setup Styling"
    ]
  },
  {
    category: "CAPCUT PRO EDITING :",
    skills: [
      "Short-Form Video Editing (Reels/Shorts)",
      "Color Correction & Basic Grading",
      "Smooth Transitions & Effects",
      "Audio Sync & Basic Sound Design"
    ]
  },
  {
    category: "BRAND COLLABORATION & CONTENT :",
    skills: [
      "Brand Collaboration Handling",
      "Social Media Content Creation",
      "Daily Content Uploading (Instagram & Facebook)",
      "Audience-Focused Content Strategy"
    ]
  },
  {
    category: "LIGHTING & SETUP :",
    skills: [
      "Studio Lighting Setup",
      "3-Point Lighting",
      "Product Lighting Control",
      "Shadow & Reflection Management"
    ]
  },
  {
    category: "SOCIAL MEDIA MANAGEMENT :",
    skills: [
      "Instagram Reels Optimization",
      "Facebook Video Publishing",
      "Content Scheduling",
      "Hashtag & Caption Strategy"
    ]
  },
  {
    category: "POST-PRODUCTION :",
    skills: [
      "Video Post-Production Workflow",
      "Clip Selection & Sequencing",
      "Basic Color Grading",
      "Export Optimization for Social Media"
    ]
  },
  {
    category: "PRE-PRODUCTION :",
    skills: [
      "Concept Planning",
      "Script Understanding for Anchor Shoots",
      "Shot List Creation",
      "Location Setup Planning"
    ]
  }
];

const SkillSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the second card (index 1) for better visual balance
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Navigation handlers
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < SKILLS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Touch Swipe behavior using Framer Motion
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // pixels to trigger a change
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (info.offset.x < -threshold && currentIndex < SKILLS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    setDragOffset(0);
  };

  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.title}>Skill</h2>

      {/* Main Carousel Container */}
      <div className={styles.carouselWrapper} ref={containerRef}>
        {/* Desktop Navigation Buttons */}
        <button 
          className={`${styles.navBtn} ${styles.prevBtn}`} 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous Skill"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>

        <button 
          className={`${styles.navBtn} ${styles.nextBtn}`} 
          onClick={handleNext}
          disabled={currentIndex === SKILLS_DATA.length - 1}
          aria-label="Next Skill"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>

        {/* Carousel Inner with Framer Motion */}
        <motion.div
           className={styles.carouselTrack}
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           onDragEnd={onDragEnd}
           animate={{
            x: `calc(50% - (var(--card-width) * ${currentIndex}) - (var(--card-gap) * ${currentIndex}) - (var(--card-width) / 2))`
           }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {SKILLS_DATA.map((item, index) => (
            <motion.div
              key={index}
              className={`${styles.card} ${index === currentIndex ? styles.active : ""}`}
              animate={{
                scale: index === currentIndex ? 1.05 : 0.85,
                opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0.4,
                zIndex: index === currentIndex ? 10 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardCategory}>{item.category}</h3>
                <ul className={styles.list}>
                  {item.skills.map((skill, sIdx) => (
                    <li key={sIdx} className={styles.listItem}>
                      <span className={styles.bullet}>•</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress / Scroll Indicator */}
      <div className={styles.indicatorContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${((currentIndex + 1) / SKILLS_DATA.length) * 100}%` }} 
        />
      </div>
    </section>
  );
};

export default SkillSection;
