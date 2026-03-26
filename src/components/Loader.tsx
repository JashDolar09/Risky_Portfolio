"use client";

import { motion } from "framer-motion";
import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <motion.div
          aria-label="Loading"
          className={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
        />
        <motion.p
          className={styles.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.85] }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        >
          LOADING
        </motion.p>
      </div>
    </div>
  );
}

