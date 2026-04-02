"use client";

import { motion } from "framer-motion";
import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.lensContainer}>
          {/* Outer Ring */}
          <motion.div 
            className={styles.outerRing}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />

          {/* Aperture Blades Simulation */}
          <div className={styles.aperture}>
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className={styles.blade}
                style={{ rotate: `${i * 60}deg` }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>

          {/* Central Lens Pulse */}
          <motion.div 
            className={styles.center}
            animate={{ 
              scale: [0.9, 1.1, 0.9],
              boxShadow: [
                "0 0 20px rgba(255, 255, 255, 0.2)",
                "0 0 50px rgba(255, 255, 255, 0.5)",
                "0 0 20px rgba(255, 255, 255, 0.2)"
              ]
            }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        <div className={styles.textContainer}>
          <motion.p
            className={styles.text}
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            INITIALIZING
          </motion.p>
          <motion.div 
            className={styles.progress}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
