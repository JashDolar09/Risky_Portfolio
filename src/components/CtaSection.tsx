"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const CTA_BUTTONS = [
  {
    label: "Book a Shoot",
    href: "https://wa.me/917600853192",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M12 18v-6"/>
        <path d="M9 15h6"/>
      </svg>
    )
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/risky__rajput48/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917600853192",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/>
      </svg>
    )
  }
];

function CtaButton({ button, index }: { button: typeof CTA_BUTTONS[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={button.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center gap-3 w-full md:w-auto px-8 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Interactive Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Icon with slight slide animation */}
      <span className="relative z-10 text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1">
        {button.icon}
      </span>
      
      <span className="relative z-10 text-white font-medium tracking-wide">
        {button.label}
      </span>

      {/* Animated Arrow on Hover */}
      <span className="relative z-10 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-white transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </motion.a>
  );
}

export default function CtaSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#000000] py-32 overflow-hidden border-t border-white/5" id="cta">
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Spotlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.015] blur-[150px] rounded-full" />
        
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
        />
        
        {/* Moving Light Rays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        
        {/* Staggered Heading Reveal */}
        <div className="mb-8 overflow-hidden">
          <motion.h2 
            className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f0f0] to-[#888888] drop-shadow-sm"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's Create<br />
            Visuals People<br />
            Remember
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-white/40 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light tracking-wide mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Cinematic storytelling for brands, creators, and modern businesses.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-sm md:max-w-none mx-auto">
          {CTA_BUTTONS.map((button, index) => (
            <CtaButton key={button.label} button={button} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
