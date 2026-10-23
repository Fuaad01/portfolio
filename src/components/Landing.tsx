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

      {/* Left-side Floating Social Bar ("FIND ME ON") */}
      <aside className="hero-social-rail" aria-label="Social Links">
        <div className="hero-social-line" aria-hidden="true"></div>
        <span className="hero-social-label">FIND ME ON</span>
        <div className="hero-social-icons">
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
      </aside>

      {/* Main Centered Hero Viewport */}
      <div className="landing-container section-container hero-stage-container">
        {/* Profile Content View (Centered) */}
        <div className={`hero-view-content ${isChatOpen ? "view-hidden" : "view-active"}`}>
          <h1 className="hero-title">
            <span className="hero-title-row">
              <span><span className="text-grey">Hi </span>I'm Fuaad</span>{" "}
              <span className="hero-pill profile-pill">
                <img src="/images/my-profile-1.png" alt="Fuaad" />
              </span>
            </span>
            <span className="hero-title-row">
              <span><span className="text-grey">a </span>UX/UI<span className="text-grey"> Designer</span></span>
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
            <a
              href="/resume/Fuaaduddin_UXUI_Designer_Resume.pdf?v=20261022"
              download="Fuaaduddin_UXUI_Designer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
            >
              <svg
                className="btn-icon-download"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="3" x2="12" y2="15" />
                <polyline points="7 10 12 15 17 10" />
                <path d="M5 20h14" />
              </svg>
              <span>Download Resume</span>
            </a>
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

      {/* Bottom Right Floating Chat Trigger Pill */}
      {!isChatOpen && (
        <button
          type="button"
          className="hero-chat-trigger-pill"
          onClick={handleOpenChat}
          aria-label="Chat with my AI"
        >
          <span className="pill-liquid-bg" aria-hidden="true">
            <span className="liquid-fluid-wave-1"></span>
            <span className="liquid-fluid-wave-2"></span>
            <span className="liquid-fluid-sheen"></span>
            <span className="liquid-fluid-blob blob-1"></span>
            <span className="liquid-fluid-blob blob-2"></span>
          </span>
          <span className="trigger-pill-avatar-wrapper">
            <img
              src="/images/ai-girl-avatar.jpg"
              alt="AI Assistant"
              className="trigger-pill-avatar"
            />
            <span className="trigger-pill-online-dot"></span>
          </span>
          <span className="trigger-pill-text">Chat with my AI</span>
        </button>
      )}
    </div>
  );
};

export default Landing;

