import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/GlassTag.css";

interface GlassTagProps {
  label: string;
  className?: string;
}

const GlassTag: React.FC<GlassTagProps> = ({ label, className }) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tag = tagRef.current;
    if (!tag) return;

    // Small, slow floating animation
    const randomShiftX = Math.random() * 10 - 5;
    const randomShiftY = Math.random() * 15 - 7;
    const randomDuration = 2.5 + Math.random() * 1.5;

    gsap.to(tag, {
      x: `+=${randomShiftX}`,
      y: `+=${randomShiftY}`,
      duration: randomDuration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Suble rotate
    gsap.to(tag, {
      rotate: Math.random() * 4 - 2,
      duration: randomDuration * 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={tagRef} className={`glass-tag ${className || ""}`}>
      <span>{label}</span>
    </div>
  );
};

export default GlassTag;
