"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";

type NavbarProps = {
  onOpenMenu: () => void;
  isScrolled: boolean;
  isAnimating: boolean;
};

export function Navbar({ onOpenMenu, isScrolled, isAnimating }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.wrap}>
        {/* Logo Section */}
        <div className={styles.logo} aria-label="Rishi logo" onClick={() => scrollToSection('home')}>
          <Image
            src="/person_Rishi.jpg"
            alt="Rishi"
            width={80}
            height={80}
            priority
            className={styles.logoImg}
          />
        </div>

        {/* Hamburger Menu Button (No visible text) */}
        <button
          type="button"
          aria-label="Open menu"
          className={styles.button}
          onClick={onOpenMenu}
          disabled={isAnimating}
        >
          <span className={styles.srOnly}>Open menu</span>
          <span className={styles.lines}>
            <span className={styles.lineTop} />
            <span className={styles.lineMid} />
            <span className={styles.lineBottom} />
          </span>
        </button>
      </div>
    </header>
  );
}

