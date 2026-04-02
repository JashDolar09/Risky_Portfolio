"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./Menu.module.css";

type MenuProps = {
  open: boolean;
  onClose: () => void;
  isScrolled: boolean;
};

const items = ["HOME", "ABOUT", "SKILL", "CONTACT"] as const;

export function Menu({ open, onClose, isScrolled }: MenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={onClose}
          />

          <motion.aside
            className={`${styles.panel} ${isScrolled ? styles.panelScrolled : ""}`}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.inner}>
              <div className={styles.topRow}>
                <button
                  type="button"
                  aria-label="Close menu"
                  className={styles.closeButton}
                  onClick={onClose}
                >
                  <span className={styles.closeIcon}>×</span>
                </button>
              </div>

              <nav className={styles.nav}>
                <ul className={styles.list}>
                  {items.map((label) => {
                    const sectionId = label.toLowerCase() === 'skill' ? 'skills' : label.toLowerCase();
                    
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          className={styles.itemButton}
                          onClick={() => {
                            onClose();
                            const element = document.getElementById(sectionId);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className={styles.footer}>
                <p className={styles.brand}>CAMERA MAN PORTFOLIO</p>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

