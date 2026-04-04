import "./styles/Landing.css";
import { smoother } from "./utils/smoother";

const Landing = () => {
  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    if (smoother) {
      smoother.scrollTo("#work", true, "top 100px");
    } else {
      window.location.hash = "#work";
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        {/* Animated Resonance Background */}
        <div className="hero-animated-bg"></div>

        {/* Blended Background Image */}
        <div className="hero-bg-image"></div>

        {/* Centered Hero Content */}
        <div className="landing-container section-container hero-center">
          <div className="hero-content" style={{ position: "relative" }}>
            <h4 className="hero-intro">
              Hi 👋, I'm Mohammed Fuaaduddin
            </h4>
            <h1 className="hero-title">
              <span className="hero-title-row">
                UX/UI <span className="hero-pill pill-long"></span>
              </span>
              <span className="hero-title-row">
                <span className="hero-pill pill-short"></span> DESIGNER
              </span>
            </h1>
            <p className="hero-desc">
              I design intuitive digital experiences that simplify complexity and deliver real impact.
            </p>
            <div className="hero-buttons">
              <a href="#work" className="btn-primary" onClick={handleScrollToWork}>
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Hero Footer Bar: Vertically Centered Socials and Resume */}
        <div className="hero-footer">
          {/* Left: Social Icons (Vertical on Desktop, Horizontal on Mobile) */}
          <div className="hero-socials-wrapper">
            <div className="hero-socials">
              <a href="https://www.linkedin.com/in/fuaaduddin/" target="_blank" rel="noopener noreferrer" className="social-text">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/fuaad_uddin" target="_blank" rel="noopener noreferrer" className="social-text">
                Instagram
              </a>
              <a href="mailto:fuaaduddin15@gmail.com" className="social-text">
                Email
              </a>
            </div>
          </div>

          {/* Right: Circular Rotating Resume */}
          <div className="hero-resume-circular">
            <a href="/resume/Fuaaduddin_UXUI_Designer_Resume.pdf" download="Fuaaduddin_UXUI_Designer_Resume.pdf" className="circular-resume-link">
              <svg viewBox="0 0 100 100" className="rotating-text-svg">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text className="rotating-text" fill="currentColor">
                  <textPath href="#circlePath">
                    RESUME • RESUME • RESUME •
                  </textPath>
                </text>
              </svg>
              <div className="resume-icon-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M12 6v12" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
