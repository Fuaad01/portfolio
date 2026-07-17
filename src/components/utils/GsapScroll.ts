import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up the landing fade-out and section reveal timelines.
 * Uses scrub with a lag value for buttery smoothness.
 */
export function setCharTimeline() {
  // ── Landing: fade out as user scrolls away ──
  gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,          // lag = smoothing factor (seconds to "catch up")
      invalidateOnRefresh: true,
    },
  }).to(".landing-container", {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "none",          // scrub handles easing; ease:"none" avoids double-easing
  });

  // ── WhatIDo: smooth fade + rise on scroll-in ──
  if (window.innerWidth > 1024) {
    gsap.fromTo(
      ".what-box-in",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".whatIDO",
          start: "top 70%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      }
    );
  } else {
    // Mobile: same fade-in without y shift
    gsap.fromTo(
      ".what-box-in",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
}

/**
 * Sets up timeline-draw and section parallax for Career & Work sections.
 */
export function setAllTimeline() {
  // ── Career: timeline draw animation ──
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 35%",
      end: "80% center",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "0%", opacity: 0 },
      { maxHeight: "100%", opacity: 1, duration: 0.6, ease: "none" },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: "none" },
      0.05          // slight offset so line draws first, then items appear
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      { animationIterationCount: "1", duration: 0.1 },
      0.4
    );

  // Desktop: subtle parallax lift as user scrolls past
  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "15%", duration: 1, ease: "none" },
      0
    );
  }

  // ── Work Section: smooth entrance ──
  gsap.fromTo(
    ".work-stack-layout",
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    }
  );

  // ── About: fade+rise entrance ──
  gsap.fromTo(
    ".about-box",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    }
  );
}
