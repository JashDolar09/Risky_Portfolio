"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

const testimonials = [
  {
    id: 1,
    name: "Elena Rostova",
    project: "FASHION REEL CAMPAIGN",
    quote: "An incredible eye for detail. He transformed our brand visuals into cinematic content that boosted engagement instantly.",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    isMain: false,
    delay: 0.2
  },
  {
    id: 2,
    name: "Rahul Sharma",
    project: "PRODUCT COMMERCIAL",
    quote: "Working with him felt like having a Hollywood director on set. The final edit exceeded every single expectation we had.",
    rating: "2M+ VIEWS CAMPAIGN",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    isMain: true,
    delay: 0
  },
  {
    id: 3,
    name: "Marcus Chen",
    project: "BRAND COLLABORATION",
    quote: "The lighting, the pacing, everything was perfectly crafted. A true master of visual storytelling and luxury aesthetics.",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
    isMain: false,
    delay: 0.4
  }
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] flex flex-col justify-between ${
        item.isMain 
          ? "w-full lg:w-[450px] lg:scale-105 z-10 lg:shadow-[0_0_40px_rgba(0,0,0,0.5)]" 
          : "w-full lg:w-[380px] lg:opacity-80 lg:hover:opacity-100 z-0"
      }`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: 'hidden' }}
    >
      {/* Dynamic Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.12),
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Floating inner wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        className="relative z-10 flex flex-col h-full"
      >
        {/* Quote Icon */}
        <div className="absolute -top-4 -right-2 text-white/10 text-7xl font-serif leading-none select-none transition-transform duration-500 group-hover:rotate-6 group-hover:text-white/20 group-hover:scale-110">
          "
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:border-white/30">
            <Image 
              src={item.image}
              alt={item.name}
              fill
              className={`object-cover transition-all duration-500 ${!item.isMain ? 'grayscale group-hover:grayscale-0' : ''}`}
              sizes="56px"
            />
          </div>
          <div>
            <h4 className="text-white font-medium text-lg tracking-wide">{item.name}</h4>
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5">{item.project}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-2 mb-8 flex-grow">
          <p className="text-white/80 font-light leading-relaxed text-[15px] lg:text-[16px]">
            "{item.quote}"
          </p>
        </div>

        {/* Rating / Proof */}
        <div className="mt-auto border-t border-white/5 pt-4">
          <p className="text-white/60 text-xs tracking-widest font-medium group-hover:text-white/90 transition-colors duration-300">
            {item.rating}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="relative w-full bg-[#020202] py-32 lg:py-40 overflow-hidden border-t border-white/5" id="testimonials">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Giant Faded Quote Symbol */}
        <div className="absolute text-[600px] font-serif text-white/[0.015] leading-none select-none -translate-y-20">
          "
        </div>
        
        {/* Moving Spotlight */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-white/[0.015] blur-[100px] rounded-full"
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-28">
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-5xl font-bold text-white mb-4 tracking-tighter uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Trusted By Creators & Brands
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm md:text-base max-w-xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Delivering cinematic excellence that elevates every story.
          </motion.p>
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:flex justify-center items-center w-full gap-8 h-auto pb-10">
          <TestimonialCard item={testimonials[0]} />
          <TestimonialCard item={testimonials[1]} />
          <TestimonialCard item={testimonials[2]} />
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 max-w-4xl mx-auto place-items-center">
          <div className="col-span-2 w-full flex justify-center mb-4">
             <TestimonialCard item={testimonials[1]} />
          </div>
          <TestimonialCard item={testimonials[0]} />
          <TestimonialCard item={testimonials[2]} />
        </div>

        {/* Mobile Layout (< md) */}
        <div 
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
        >
          {/* Re-order for mobile so main review is first, or keep same order? I'll keep the visual order logically: main first, then the rest. */}
          <div className="snap-center shrink-0 w-[85vw] max-w-[340px] ml-0">
            <TestimonialCard item={testimonials[1]} />
          </div>
          <div className="snap-center shrink-0 w-[85vw] max-w-[340px]">
            <TestimonialCard item={testimonials[0]} />
          </div>
          <div className="snap-center shrink-0 w-[85vw] max-w-[340px] pr-6">
            <TestimonialCard item={testimonials[2]} />
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="flex justify-center mt-12 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="group relative px-8 py-4 bg-white text-black font-semibold tracking-wide rounded-full overflow-hidden transition-transform duration-300 hover:scale-105">
            <span className="relative z-10">Let's Create Your Story</span>
            <div className="absolute inset-0 h-full w-full bg-white/20 group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
