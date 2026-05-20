"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

// Gear Data
const gearItems = [
  {
    id: "camera",
    name: "Sony A7IV",
    tagline: "Cinema-grade 4K storytelling",
    specs: ["4K 60FPS", "Low-light beast", "Fast AF"],
    image: "/Sony_A7IV_Rishi_videographer.webp",
    imgSize: "w-full h-full",
    isMain: true,
    floatDelay: 0,
  },
  {
    id: "lens",
    name: "Sigma 24-70mm f/2.8",
    tagline: "The versatile prime killer",
    specs: ["Tack sharp", "Smooth bokeh", "Weather sealed"],
    image: "/Sigma_24_70m_f2.8_Rishi_Videographer.webp",
    imgSize: "w-[120%] h-[120%]",
    isMain: false,
    floatDelay: 0.2,
  },
  {
    id: "gimbal",
    name: "DJI RS 3 Pro",
    tagline: "Buttery smooth movement",
    specs: ["Carbon fiber", "LiDAR focus", "Heavy payload"],
    image: "/DJI_RS_3_Pro_Rishi_Videographer.webp",
    imgSize: "w-[105%] h-[105%]",
    isMain: false,
    floatDelay: 0.4,
  },
  {
    id: "lighting",
    name: "Aputure 120d II",
    tagline: "Cinematic studio lighting",
    specs: ["Daylight balanced", "Bowens mount", "Silent fan"],
    image: "/Aputure_120d_Rishi_Videographer.webp",
    imgSize: "w-[75%] h-[75%]",
    isMain: false,
    floatDelay: 0.6,
  },
  {
    id: "godox",
    name: "GODOX Light",
    tagline: "Dynamic colored atmospheres",
    specs: ["RGB LED Light", "FX effect mode", "Versatile"],
    image: "/Light_Rishi_Videographer.webp",
    imgSize: "w-[120%] h-[120%]",
    isMain: false,
    floatDelay: 0.8,
  },
  {
    id: "mic",
    name: "Hollyland LARK M2",
    tagline: "Crystal clear audio",
    specs: ["Wireless", "Noise Cancel", "Long Battery"],
    image: "/Mic_Rishi_Videographer.webp",
    imgSize: "w-[120%] h-[120%]",
    isMain: true,
    floatDelay: 1.0,
  },
];

function GearCard({ item }: { item: typeof gearItems[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col items-center ${
        item.isMain ? "w-full max-w-md lg:p-10 lg:max-w-lg" : "w-full max-w-xs lg:max-w-[280px]"
      }`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: item.floatDelay * 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: 'hidden' }} // Keep glow contained inside the rounded borders
    >
      {/* Mouse hover glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.12),
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: item.floatDelay }}
        className="flex flex-col items-center z-10 w-full h-full"
      >
        <div className={`relative w-full flex justify-center items-center mb-6 ${item.isMain ? "h-64 lg:h-72" : "h-48"}`}>
          <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110 flex justify-center items-center">
            <div className={`relative flex justify-center items-center ${item.imgSize || 'w-full h-full'}`}>
              <Image 
                src={item.image} 
                alt={item.name}
                fill
                className="object-contain drop-shadow-2xl mix-blend-lighten"
                sizes={item.isMain ? "(max-width: 768px) 100vw, 500px" : "(max-width: 768px) 100vw, 300px"}
              />
            </div>
          </div>
        </div>
        
        <div className="text-center w-full mt-auto">
          <h3 className={`font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-white ${item.isMain ? "text-2xl lg:text-3xl mb-2" : "text-xl mb-1"}`}>
            {item.name}
          </h3>
          <p className="text-white/50 text-sm mb-5 font-light group-hover:text-white/80 transition-colors duration-300">
            {item.tagline}
          </p>
          
          <ul className="flex flex-wrap justify-center gap-2 mt-4">
            {item.specs.map((spec, i) => (
              <li 
                key={i} 
                className="text-[11px] uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md text-white/60 border border-white/5 group-hover:border-white/20 group-hover:text-white/90 group-hover:bg-white/10 transition-all duration-300"
              >
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GearSection() {
  return (
    <section className="relative w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5" id="gear">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Spotlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <motion.h2 
            className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f0f0] to-[#888888] drop-shadow-sm mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Tools Behind The Vision
          </motion.h2>
          <motion.p
            className="text-white/40 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light tracking-wide text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Industry-standard equipment for uncompromising cinematic quality. Every piece carefully selected to tell your story perfectly.
          </motion.p>
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:flex justify-between items-center w-full gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-16 w-1/3 items-end">
            <GearCard item={gearItems[1]} />
            <GearCard item={gearItems[2]} />
          </div>
          
          {/* Center Column */}
          <div className="flex flex-col gap-16 w-1/3 items-center z-20">
            <GearCard item={gearItems[0]} />
            <GearCard item={gearItems[5]} />
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-16 w-1/3 items-start">
            <GearCard item={gearItems[3]} />
            <GearCard item={gearItems[4]} />
          </div>
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-10 place-items-center max-w-4xl mx-auto">
          <div className="col-span-2 w-full flex justify-center mb-4">
             <GearCard item={gearItems[0]} />
          </div>
          <GearCard item={gearItems[1]} />
          <GearCard item={gearItems[2]} />
          <GearCard item={gearItems[3]} />
          <GearCard item={gearItems[4]} />
          <div className="col-span-2 w-full flex justify-center mt-4">
            <GearCard item={gearItems[5]} />
          </div>
        </div>

        {/* Mobile Layout (< md) */}
        <div 
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
        >
          {gearItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`snap-center shrink-0 w-[85vw] max-w-[320px] flex justify-center ${index === 0 ? 'ml-0' : ''} ${index === gearItems.length - 1 ? 'pr-6' : ''}`}
            >
              <GearCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
