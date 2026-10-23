import { useState, useEffect } from "react";
import "./styles/Landing.css";
import { smoother } from "./utils/smoother";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeroChatbox from "./HeroChatbox";
import { FaLinkedinIn, FaInstagram, FaRegEnvelope } from "react-icons/fa";

const Landing = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      {/* Animated Resonance Background */}
      <div className="hero-animated-bg"></div>

      {/* Blended Background Image */}
      <div className="hero-bg-image"></div>

      {/* Main Centered Hero Viewport */}
      <div className="landing-container section-container hero-stage-container">
        {/* Profile Content View (Centered) */}
        <div className={`hero-view-content ${isChatOpen ? "view-hidden" : "view-active"}`}>
          <h1 className="hero-title">
            <span className="hero-title-row">
              <span>Hi, I'm Fuaad</span>
            </span>
            <span className="hero-title-row">
              <span><span className="text-grey">a </span>UX/UI &amp; Product</span>
            </span>
            <span className="hero-title-row">
              <span>Designer</span>
            </span>
          </h1>


          <div className="hero-buttons">
            <a
              href="#work"
              className="btn-hero-primary"
              onClick={handleScrollToWork}
            >
              <span>View Projects</span>
              <svg
                className="btn-icon-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <button
              type="button"
              className="btn-hero-secondary btn-hero-chat"
              onClick={handleOpenChat}
              aria-label="Chat with my AI"
            >
              <span className="btn-chat-avatar-wrapper">
                <img
                  src="/images/ai-girl-avatar.jpg"
                  alt="AI Assistant"
                  className="btn-chat-avatar"
                />
                <span className="btn-chat-online-dot"></span>
              </span>
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        {/* Transformed Chatbox View */}
        <div
          className={`hero-view-chatbox ${isChatOpen ? "view-active" : "view-hidden"
            }`}
        >
          <HeroChatbox onClose={handleCloseChat} />
        </div>
      </div>

      {/* Hero Footer Bar: Aligned Left Social Icons and Right Rotating Circular Resume */}
      {!isChatOpen && (
        <div className="hero-footer">
          {/* Left: Social Icons (Only Icons) */}
          <div className="hero-socials-wrapper">
            <div className="hero-socials">
              <a
                href="https://www.linkedin.com/in/fuaaduddin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-circle"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/fuaad_uddin"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-circle"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:fuaaduddin15@gmail.com"
                className="hero-social-circle"
                aria-label="Email"
              >
                <FaRegEnvelope />
              </a>
            </div>
          </div>

          {/* Right: Circular Rotating Resume */}
          <div className="hero-resume-circular">
            <a
              href="/resume/Fuaaduddin_UXUI_Designer_Resume.pdf?v=20261022"
              download="Fuaaduddin_UXUI_Designer_Resume.pdf"
              className="circular-resume-link"
              aria-label="Download Resume"
            >
              <svg viewBox="0 0 100 100" className="rotating-text-svg">
                <defs>
                  <path id="resumeArc" d="M 13, 50 a 37,37 0 0,1 74,0" />
                </defs>
                <g className="rotating-text-group">
                  <text className="rotating-text" fill="currentColor">
                    <textPath href="#resumeArc" startOffset="50%" textAnchor="middle">
                      RESUME
                    </textPath>
                    <textPath href="#resumeArc" startOffset="83.33%" textAnchor="middle">
                      •
                    </textPath>
                  </text>
                  <g transform="rotate(120 50 50)">
                    <text className="rotating-text" fill="currentColor">
                      <textPath href="#resumeArc" startOffset="50%" textAnchor="middle">
                        RESUME
                      </textPath>
                      <textPath href="#resumeArc" startOffset="83.33%" textAnchor="middle">
                        •
                      </textPath>
                    </text>
                  </g>
                  <g transform="rotate(240 50 50)">
                    <text className="rotating-text" fill="currentColor">
                      <textPath href="#resumeArc" startOffset="50%" textAnchor="middle">
                        RESUME
                      </textPath>
                      <textPath href="#resumeArc" startOffset="83.33%" textAnchor="middle">
                        •
                      </textPath>
                    </text>
                  </g>
                </g>
              </svg>
              <div className="resume-icon-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M12 6v12" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

