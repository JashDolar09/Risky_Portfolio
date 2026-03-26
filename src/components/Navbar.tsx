"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";

type NavbarProps = {
  onOpenMenu: () => void;
};

export function Navbar({ onOpenMenu }: NavbarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.logo} aria-label="Rishi logo">
          <Image
            src="/person_Rishi.jpg"
            alt="Rishi"
            width={80}
            height={80}
            priority
            className={styles.logoImg}
          />
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className={styles.button}
          onClick={onOpenMenu}
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

