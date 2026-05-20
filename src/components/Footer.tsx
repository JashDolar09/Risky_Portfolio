"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
        
        <p className="text-white/30 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light">
          © {new Date().getFullYear()} Rishi Portfolio. All Rights Reserved.
        </p>
        
        <div className="flex items-center gap-8">
          <Link 
            href="https://www.instagram.com/risky__rajput48/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white text-[11px] md:text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
          >
            Instagram
          </Link>
          <Link 
            href="mailto:hello@rishi.com" 
            className="text-white/50 hover:text-white text-[11px] md:text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
          >
            Email
          </Link>
          <Link 
            href="https://wa.me/917600853192" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white text-[11px] md:text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
          >
            WhatsApp
          </Link>
        </div>

      </div>
    </footer>
  );
}
