"use client";

import { useEffect, useRef } from 'react';

/**
 * Custom hook to play a sound effect that IS ONLY AUDIBLE WHILE THE USER IS ACTIVELY SCROLLING.
 * The sound starts on scroll, stops immediately when scrolling ends, and its speed (playbackRate)
 * is dynamically controlled by the physical scroll velocity.
 */
export function useScrollSound(url: string = "/sounds/scroll.mpeg") {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastScrollY = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const lastScrollInteractionTime = useRef<number>(0);
  const initialized = useRef(false);
  const currentPlaybackRate = useRef(1);

  useEffect(() => {
    // 1. Initialise the audio element (NO LOOP requested for manual control)
    const audio = new Audio(url);
    audio.loop = true; // Use loop only as a backup for long scrolls, but control is manual
    audio.volume = 0.8; 
    audioRef.current = audio;

    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    // 2. Play only after first user interaction (browser policy)
    const initializeAudio = () => {
      if (!initialized.current && audioRef.current) {
        initialized.current = true;
      }
    };

    // 3. Monitor scroll activity and control sound state
    const updateScrollSound = () => {
      if (!audioRef.current || !initialized.current) {
        requestAnimationFrame(updateScrollSound);
        return;
      }

      const currentTime = performance.now();
      const currentScrollY = window.scrollY;
      
      const deltaTime = currentTime - lastTime.current;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      
      let isScrolling = false;

      if (deltaTime > 0 && deltaY > 0.5) {
        // User is currently scrolling
        const speed = deltaY / deltaTime;
        isScrolling = true;
        lastScrollInteractionTime.current = currentTime;

        // Map speed to playbackRate (0.6x to 2.5x)
        const targetRate = Math.min(Math.max(speed * 4.5, 0.6), 2.5);
        
        // Smoothly lerp the playback rate
        const lerpFactor = 0.15;
        currentPlaybackRate.current += (targetRate - currentPlaybackRate.current) * lerpFactor;
        
        audioRef.current.playbackRate = currentPlaybackRate.current;

        // Ensure the audio is playing if movement is detected
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
      } else {
        // No movement detected in this frame, but check for timeout
        const timeSinceLastScroll = currentTime - lastScrollInteractionTime.current;
        
        if (timeSinceLastScroll > 100) {
          // ACTIVE STOP: If no scroll for > 100ms, silence the audio immediately
          if (!audioRef.current.paused) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset for a fresh start next time
          }
        }
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
      
      requestAnimationFrame(updateScrollSound);
    };

    // Global listeners for interaction
    window.addEventListener('scroll', initializeAudio, { once: true });
    window.addEventListener('mousedown', initializeAudio, { once: true });
    window.addEventListener('touchstart', initializeAudio, { once: true });
    
    // Start the animation loop
    const rafId = requestAnimationFrame(updateScrollSound);

    return () => {
      window.removeEventListener('scroll', initializeAudio);
      window.removeEventListener('mousedown', initializeAudio);
      window.removeEventListener('touchstart', initializeAudio);
      cancelAnimationFrame(rafId);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  return null;
}
