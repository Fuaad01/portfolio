import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagnetProps {
  children: React.ReactNode;
  magnetStrength?: number;
  style?: React.CSSProperties;
}

const Magnet: React.FC<MagnetProps> = ({ children, magnetStrength = 0.3, style }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = trigger.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(content, {
        x: x * magnetStrength,
        y: y * magnetStrength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    trigger.addEventListener("mousemove", onMouseMove);
    trigger.addEventListener("mouseleave", onMouseLeave);

    return () => {
      trigger.removeEventListener("mousemove", onMouseMove);
      trigger.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [magnetStrength]);

  const combinedStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "20px",
    ...style,
  };

  return (
    <div ref={triggerRef} style={combinedStyle}>
      <div ref={contentRef} style={{ margin: "-20px" }}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
