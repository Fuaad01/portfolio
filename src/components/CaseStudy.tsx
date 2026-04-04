import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import Navbar from "./Navbar";
import { smoother } from "./utils/smoother";
import Contact from "./Contact";
import { setProgress } from "./utils/loadingUtils";
import { useLoading } from "../context/LoadingContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/CaseStudy.css";
import BackgroundGlows from "./utils/BackgroundGlows";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const { setLoading } = useLoading();

  useEffect(() => {
    const progress = setProgress(setLoading);
    progress.loaded();

    // Reset scroll position and refresh
    const timeoutId = setTimeout(() => {
      if (smoother) {
        smoother.paused(false);
        smoother.scrollTop(0);
        ScrollSmoother.refresh(true);
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [setLoading]);

  if (!project) {
    return (
      <div className="cs-not-found">
        <h2>Case study not found.</h2>
        <Link to="/" className="cs-back-btn">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="cs-page">
      <BackgroundGlows />
      <div className="page-stripes"></div>
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="cs-container">
            {/* Hero image - now contained */}
            <div className="cs-hero">
              <img src={project.image} alt={project.title} className="cs-hero-img" />
              <div className="cs-hero-overlay" />
            </div>

            {/* Content Area */}
            <div className="cs-content">
              {/* Header Info */}
              <header className="cs-header-info">
                <div className="cs-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="cs-tag">{tag}</span>
                  ))}
                </div>
                <h1 className="cs-title">{project.title}</h1>
                <p className="cs-subtitle">{project.description}</p>

              </header>

              {/* 1. Project Goal */}
              <section className="cs-section">
                <h2 className="section-title">Project Goal</h2>
                <p className="cs-body">{project.projectGoal}</p>
              </section>

              {/* 2. Problem Statement */}
              <section className="cs-section">
                <h2 className="section-title">Problem Statement</h2>
                <p className="cs-body">{project.problemStatement}</p>
              </section>

              {/* 3. Crafted Solution */}
              <section className="cs-section">
                <h2 className="section-title">Crafted Solution</h2>
                <p className="cs-body">{project.craftedSolution.content}</p>
                <div className="cs-collage">
                  {project.craftedSolution.images.map((img, i) => (
                    <div key={i} className={`cs-collage-item item-${i + 1}`}>
                      <img src={img} alt={`Solution detail ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Summary */}
              <section className="cs-section">
                <div className="cs-summary-box">
                  <h2 className="cs-summary-title">Summary</h2>
                  <div className="cs-summary-grid">
                    <div className="cs-summary-item">
                      <span className="cs-summary-label">Duration</span>
                      <span className="cs-summary-value">{project.duration}</span>
                    </div>
                    <div className="cs-summary-item">
                      <span className="cs-summary-label">Role</span>
                      <span className="cs-summary-value">{project.role}</span>
                    </div>
                    <div className="cs-summary-item">
                      <span className="cs-summary-label">Tools</span>
                      <span className="cs-summary-value">{project.tools}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Wireframes */}
              <section className="cs-section">
                <h2 className="section-title">Wireframes</h2>
                <div className="cs-grid cs-grid-1">
                  {project.wireframes.map((item, i) => (
                    <div key={i} className="cs-grid-item">
                      <span className="cs-grid-item-title">{item.title}</span>
                      <img src={item.url} alt={item.title} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Final UI Screens */}
              <section className="cs-section">
                <h2 className="section-title">Final UI Screens</h2>
                <div className="cs-grid cs-grid-1">
                  {project.finalScreens.map((item, i) => (
                    <div key={i} className="cs-grid-item">
                      <span className="cs-grid-item-title">{item.title}</span>
                      <img src={item.url} alt={item.title} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Before and After Screens */}
              <section className="cs-section">
                <h2 className="section-title">Before and After</h2>
                <div className="cs-comparison-list">
                  {project.beforeAfter.map((img, i) => (
                    <div key={i} className="cs-comparison-single">
                      <img src={img} alt={`Comparison ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 8. Outcome */}
              <section className="cs-section">
                <h2 className="section-title">Outcome</h2>
                <p className="cs-body">{project.outcome}</p>
              </section>

              {/* CTA if available */}
              {project.link && project.link !== "#" && (
                <div className="cs-cta-wrapper">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="cs-cta">
                    View Live Project ↗
                  </a>
                </div>
              )}

              {/* 9. Thank You */}
              <section className="cs-section">
                <footer className="cs-footer">
                  <h2 className="section-title">Thank You</h2>
                  <p className="cs-footer-body">{project.thankYou}</p>
                  <a href="mailto:fuaaduddin15@gmail.com" className="btn-primary cs-footer-btn">
                    Let's Connect
                  </a>
                </footer>
              </section>
            </div>
          </div>
          <div className="cs-footer-contact">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
