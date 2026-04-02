"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import SkillSection from "@/components/SkillSection";
import styles from "./page.module.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 2500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

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
            <Hero startStackMs={2500} />
            <AboutSection />
            <SkillSection />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

