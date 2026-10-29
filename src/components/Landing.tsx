import { useState, useEffect } from "react";
import "./styles/Landing.css";
import { smoother } from "./utils/smoother";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeroChatbox from "./HeroChatbox";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const DESIGN_SPECIALTIES = ["Websites", "Apps", "User Flows", "Wireframes", "Prototypes", "Final UI"];
const TICKER_ITEMS = [...DESIGN_SPECIALTIES, DESIGN_SPECIALTIES[0]];

// Natural alternating tilt angles for playful micro-interaction on hover
const TILT_ANGLES = [-7, 6, -5, 8, -6.5, 7, -8, 5.5, -6, 7.5, -5, 6.5, -7.5, 6, -6, 7];

const Landing = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [hoveredLetterKey, setHoveredLetterKey] = useState<string | null>(null);

  const renderInteractiveLetters = (text: string, prefix: string) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span key={`${prefix}-space-${index}`} className="hero-letter-space">
            &nbsp;
          </span>
        );
      }
      const letterKey = `${prefix}-${index}`;
      const isHovered = hoveredLetterKey === letterKey;
      const tilt = TILT_ANGLES[index % TILT_ANGLES.length];
      return (
        <span
          key={letterKey}
          className={`hero-letter ${isHovered ? "is-hovered" : ""}`}
          style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
          onMouseEnter={() => setHoveredLetterKey(letterKey)}
          onMouseLeave={() => setHoveredLetterKey(null)}
          onPointerEnter={() => setHoveredLetterKey(letterKey)}
          onPointerLeave={() => setHoveredLetterKey(null)}
        >
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setEnableTransition(true);
      setSpecialtyIndex((prev) => {
        if (prev >= DESIGN_SPECIALTIES.length) {
          return 1;
        }
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handleTickerTransitionEnd = () => {
    if (specialtyIndex >= DESIGN_SPECIALTIES.length) {
      setEnableTransition(false);
      setSpecialtyIndex(0);
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  useEffect(() => {
    if (isChatOpen) {
      document.body.classList.add("chat-mode-active");
      if (smoother) {
        smoother.scrollTop(0);
        smoother.paused(true);
      }
    } else {
      document.body.classList.remove("chat-mode-active");
      if (smoother) {
        smoother.paused(false);
        setTimeout(() => {
          ScrollSmoother.refresh(true);
        }, 120);
      }
    }

    return () => {
      document.body.classList.remove("chat-mode-active");
      if (smoother) {
        smoother.paused(false);
      }
    };
  }, [isChatOpen]);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    if (smoother) {
      smoother.scrollTo("#work", true, "top 100px");
    } else {
      window.location.hash = "#work";
    }
  };

  return (
    <div
      className={`landing-section ${isChatOpen ? "chat-transformed" : ""}`}
      id="landingDiv"
    >
      {/* Blueprint Canvas Grid & Ambient Soft Blue Radial Glow */}
      <div className="hero-figma-canvas-bg" aria-hidden="true">
        <div className="canvas-grid-pattern"></div>
        <div className="canvas-radial-glow canvas-glow-left"></div>
        <div className="canvas-radial-glow canvas-glow-center"></div>

        {/* Smooth Gradient Blur Overlay to gracefully dissolve the grid pattern into the plain section below */}
        <div className="canvas-grid-bottom-blur"></div>

        {/* Full-width Horizontal Guide Lines */}
        <div className="figma-guideline-h figma-guideline-top"></div>
        <div className="figma-guideline-h figma-guideline-bottom"></div>

        {/* Vertical Guide Lines */}
        <div className="figma-guideline-v figma-guideline-v-left"></div>
        <div className="figma-guideline-v figma-guideline-v-right"></div>
      </div>

      {/* Main Centered Hero Viewport */}
      <div className="landing-container section-container hero-stage-container">
        {/* Profile Content View (Centered) */}
        <div className={`hero-view-content ${isChatOpen ? "view-hidden" : "view-active"}`}>

          {/* Top Figma Badge Pill: "Hi, I'm Fuaad, a" */}
          <div className="hero-top-pill">
            <span>Hi, I'm Fuaad</span>
          </div>

          {/* Figma Inspect Frame Container with Border & Badges */}
          <div className="figma-artboard-frame">

            {/* Main Giant Headline */}
            <h1 className="hero-figma-title">
              {/* Line 1: UX/UI + [3+ years designing (animated: Websites, Apps, User Flows, Wireframes, Prototypes, Final UI)] + & + [Fuaad Cursor] */}
              <div className="hero-title-line hero-line-top">
                <span className="hero-text-glyph">
                  {renderInteractiveLetters("UX/UI", "uxui")}
                </span>

                {/* 3+ Years Designing Capsule with Animated Specialty Words */}
                <div className="hero-systems-capsule">
                  <span className="systems-capsule-badge">3+</span>
                  <span className="systems-capsule-text">
                    <span className="capsule-text-top">years designing</span>
                    <span className="capsule-ticker-box">
                      <span
                        className="capsule-ticker-track"
                        onTransitionEnd={handleTickerTransitionEnd}
                        style={{
                          transform: `translateY(-${(specialtyIndex * 100) / TICKER_ITEMS.length}%)`,
                          transition: enableTransition
                            ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
                            : "none",
                        }}
                      >
                        {TICKER_ITEMS.map((word, index) => (
                          <span
                            key={`${word}-${index}`}
                            className="capsule-ticker-item"
                          >
                            {word}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </div>

                {/* Ampersand & with Figma Multiplayer Cursor Badge (Fuaad) */}
                <div className="hero-ampersand-wrap">
                  <span className="hero-text-glyph hero-ampersand">
                    {renderInteractiveLetters("&", "amp")}
                  </span>

                  {/* Figma Cursor Badge (Fuaad) */}
                  <div className="figma-cursor-badge figma-cursor-fuaad" aria-hidden="true">
                    <svg
                      className="figma-cursor-arrow"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 1.5L6.5 14.5L9 9L14.5 6.5L1.5 1.5Z"
                        fill="#1f5bff"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="figma-cursor-tag">Fuaad</span>
                  </div>
                </div>
              </div>

              {/* Line 2: Product Designer + [Rotating Circular Resume Badge] */}
              <div className="hero-title-line hero-line-bottom">
                <div className="hero-product-wrap">
                  {/* Duplicated Figma Cursor Badge (User) near bottom left side beside Product text */}
                  <div className="figma-cursor-badge figma-cursor-user" aria-hidden="true">
                    <svg
                      className="figma-cursor-arrow"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 1.5L6.5 14.5L9 9L14.5 6.5L1.5 1.5Z"
                        fill="#1f5bff"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="figma-cursor-tag">User</span>
                  </div>

                  <span className="hero-text-glyph">
                    {renderInteractiveLetters("PRODUCT DESIGNER", "pd")}
                  </span>
                </div>

                {/* Inline Circular Rotating Resume Badge */}
                <div className="hero-inline-resume-wrapper">
                  <a
                    href="/resume/Fuaaduddin_UXUI_Designer_Resume.pdf?v=20261022"
                    download="Fuaaduddin_UXUI_Designer_Resume.pdf"
                    className="hero-inline-resume-btn"
                    aria-label="Download Resume"
                  >
                    <svg viewBox="0 0 100 100" className="inline-resume-svg">
                      <defs>
                        <path id="inlineResumeArc" d="M 14, 50 a 36,36 0 0,1 72,0" />
                      </defs>
                      <g className="inline-resume-text-group">
                        <text className="inline-resume-text" fill="#ffffff">
                          <textPath href="#inlineResumeArc" startOffset="50%" textAnchor="middle">
                            RESUME
                          </textPath>
                          <textPath href="#inlineResumeArc" startOffset="83.33%" textAnchor="middle">
                            •
                          </textPath>
                        </text>
                        <g transform="rotate(120 50 50)">
                          <text className="inline-resume-text" fill="#ffffff">
                            <textPath href="#inlineResumeArc" startOffset="50%" textAnchor="middle">
                              RESUME
                            </textPath>
                            <textPath href="#inlineResumeArc" startOffset="83.33%" textAnchor="middle">
                              •
                            </textPath>
                          </text>
                        </g>
                        <g transform="rotate(240 50 50)">
                          <text className="inline-resume-text" fill="#ffffff">
                            <textPath href="#inlineResumeArc" startOffset="50%" textAnchor="middle">
                              RESUME
                            </textPath>
                            <textPath href="#inlineResumeArc" startOffset="83.33%" textAnchor="middle">
                              •
                            </textPath>
                          </text>
                        </g>
                      </g>
                    </svg>
                    <div className="inline-resume-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </h1>

            {/* Action CTA Buttons (View projects ↗  +  Ask AI) */}
            <div className="hero-cta-buttons">
              <a
                href="#work"
                className="btn-projects-figma"
                onClick={handleScrollToWork}
              >
                <span>View projects</span>
              </a>

              <button
                type="button"
                className="btn-ask-ai-figma"
                onClick={handleOpenChat}
                aria-label="Chat with my AI"
              >
                <span className="btn-ai-avatar-wrapper" aria-hidden="true">
                  <img
                    src="/images/ai-girl-avatar.jpg"
                    alt=""
                    className="btn-ai-avatar-img"
                  />
                  <span className="btn-ai-avatar-dot" />
                </span>
                <span>Ask AI</span>
              </button>
            </div>

            {/* Centered Social Icon Buttons in a Row Below Buttons */}
            <div className="hero-social-row">
              <a
                href="https://www.linkedin.com/in/fuaaduddin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/fuaad_uddin"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-btn"
                aria-label="Instagram"
              >
                <RiInstagramFill />
              </a>
              <a
                href="mailto:fuaaduddin15@gmail.com"
                className="hero-social-btn"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

        </div>

        {/* Transformed Chatbox View */}
        <div
          className={`hero-view-chatbox ${isChatOpen ? "view-active" : "view-hidden"}`}
        >
          <HeroChatbox onClose={handleCloseChat} />
        </div>
      </div>
    </div>
  );
};

export default Landing;

