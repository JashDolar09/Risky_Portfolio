/* ==========================================================================
   SKILL SECTION - REIMAGINED CAROUSEL UI
   ========================================================================== */

"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentIndex, setCurrentIndex] = useState(2); // Start with more centered focus (3rd card)
  const [isSwiping, setIsSwiping] = useState(false);
  const touchX = useRef<number | null>(null);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < SKILLS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const finalX = e.changedTouches[0].clientX;
    const diff = touchX.current - finalX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchX.current = null;
    setIsSwiping(false);
  };

  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.title}>Skill Sets</h2>

      {/* Main Carousel Wrapper */}
      <div className={styles.carouselContainer}>
        
        <div 
          className={styles.carouselWrapper} 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons (Desktop only visible via CSS) */}
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

          <div className={styles.carouselTrack}>
            <AnimatePresence initial={false}>
              {SKILLS_DATA.map((item, index) => {
                const distanceFromCenter = index - currentIndex;
                const isActive = index === currentIndex;
                const isVisible = Math.abs(distanceFromCenter) <= 2; // Only show center + 2 neighbors

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={index}
                    className={`${styles.card} ${isActive ? styles.active : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      // Offset calculation for perfect spacing
                      // 100% is the card width, plus some gap
                      x: `calc(${distanceFromCenter * 105}%)`, 
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : (Math.abs(distanceFromCenter) === 1 ? 0.6 : 0.2),
                      zIndex: 10 - Math.abs(distanceFromCenter),
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 25,
                      opacity: { duration: 0.3 }
                    }}
                  >
                    <div className={styles.cardGlass} />
                    
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
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicator - Properly Separated Offset Container */}
        <div className={styles.indicatorContainer}>
          <motion.div 
            className={styles.progressBar} 
            animate={{ width: `${((currentIndex + 1) / SKILLS_DATA.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
