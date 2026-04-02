"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import SkillSection from "@/components/SkillSection";
import ContactSection from "@/components/ContactSection";
import styles from "./page.module.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsLargeDevice(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update body scroll lock based on animation state
  useEffect(() => {
    if (isLargeDevice && (loading || isAnimating)) {
      document.body.style.overflow = "hidden";
    } else if (!isLargeDevice && loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading, isAnimating, isLargeDevice]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 2.5s Loader + 4s Hero Animation = ~6.5s for Desktop
    const animDuration = isLargeDevice ? 6500 : 2500;
    
    const tLoader = window.setTimeout(() => setLoading(false), 2500);
    const tAnim = window.setTimeout(() => setIsAnimating(false), animDuration);
    
    return () => {
      window.clearTimeout(tLoader);
      window.clearTimeout(tAnim);
    };
  }, [isLargeDevice]);

  return (
    <div className={styles.page}>
      <Navbar onOpenMenu={() => setMenuOpen(true)} isScrolled={isScrolled} isAnimating={isAnimating} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} isScrolled={isScrolled} />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <section id="home">
              <Hero startStackMs={2500} />
            </section>
            
            <AboutSection />
            <SkillSection />
            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

