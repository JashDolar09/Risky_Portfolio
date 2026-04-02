"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';

const SOCIALS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  {
    name: "Email",
    url: "mailto:hello@rishi.com",
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
      </svg>
    )
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/",
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/>
      </svg>
    )
  }
];

const ContactSection: React.FC = () => {
  return (
    <footer id="contact" className={styles.section}>
      <motion.div 
        className={styles.titleWrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.subtitle}>READY TO WORK?</span>
        <h2 className={styles.title}>GET IN TOUCH</h2>
      </motion.div>

      <div className={styles.socials}>
        {SOCIALS.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {social.icon}
            <span className={styles.label}>{social.name}</span>
          </motion.a>
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.copyright}>© 2026 RISHI PORTFOLIO. ALL RIGHTS RESERVED.</p>
        <p className={styles.credit}>DESIGNED WITH PASSION FOR PREMIUM VISUALS.</p>
      </div>
    </footer>
  );
};

export default ContactSection;
