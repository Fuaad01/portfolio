import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import Navbar from "./Navbar";
import { smoother } from "./utils/smoother";
import Footer from "./Footer";
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
          <div className="cs-container section-container">
            {/* Hero image/video - now contained */}
            <div className="cs-hero">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="cs-hero-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <img src={project.image} alt={project.title} className="cs-hero-img" />
              )}
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
                {project.problemStatementPoints && project.problemStatementPoints.length > 0 && (
                  <ul className="cs-problem-list">
                    {project.problemStatementPoints.map((item, i) => (
                      <li key={i} className="cs-problem-item">
                        <strong className="cs-problem-heading">{item.heading}</strong>
                        <ul className="cs-problem-sub-list">
                          {item.points.map((pt, j) => (
                            <li key={j} className="cs-problem-sub-item">{pt}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
                {project.problemStatementScreens && project.problemStatementScreens.length > 0 && (
                  <div className="cs-problem-screens-unified">
                    <div className="cs-problem-screens-content">
                      <ul className="cs-problem-list cs-problem-list-single">
                        {project.problemStatementScreens.flatMap((screen, i) =>
                          screen.problems.map((item, j) => (
                            <li key={`${i}-${j}`} className="cs-problem-item">
                              <strong className="cs-problem-heading">{item.heading}</strong>
                              <ul className="cs-problem-sub-list">
                                {item.points.map((pt, k) => (
                                  <li key={k} className="cs-problem-sub-item">{pt}</li>
                                ))}
                              </ul>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                    <div className="cs-problem-screens-images">
                      {project.problemStatementScreens.flatMap((screen) => screen.images).map((img, i) => (
                        <div key={i} className="cs-problem-screen-thumb">
                          <img src={img} alt={`Problem Screen ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* 3. Crafted Solution */}
              <section className="cs-section">
                <h2 className="section-title">Crafted Solution</h2>
                {project.craftedSolution.content && <p className="cs-body">{project.craftedSolution.content}</p>}
                    {project.craftedSolution.features && project.craftedSolution.features.map((feature, idx) => {
                      const hasImage = feature.image || (feature.images && feature.images.length > 0);
                      const textContent = (
                        <div className={hasImage ? "cs-crafted-left" : ""} key={hasImage ? undefined : idx}>
                          <div className="cs-feature">
                            <h3 className="cs-feature-title">{feature.title}</h3>
                            <div className="cs-feature-section">
                              <ul className="cs-feature-list">
                                {feature.solution.map((pt, i) => (
                                  <li key={i}>{pt}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );

                      const imageContent = feature.images && feature.images.length > 0 ? (
                        <div className="cs-crafted-right cs-crafted-multi-img">
                          {feature.images.map((imgSrc, i) => (
                            <img key={i} src={imgSrc} alt={`${feature.title} ${i + 1}`} />
                          ))}
                        </div>
                      ) : feature.image ? (
                        <div className="cs-crafted-right">
                          <img src={feature.image} alt={feature.title} />
                        </div>
                      ) : null;

                      if (hasImage) {
                        const isLeft = feature.imagePosition === 'left';
                        const colClass = isLeft ? "cs-crafted-2col-reverse" : "cs-crafted-2col";
                        return (
                          <div key={idx} className={colClass}>
                            {isLeft ? (
                              <>
                                {imageContent}
                                {textContent}
                              </>
                            ) : (
                              <>
                                {textContent}
                                {imageContent}
                              </>
                            )}
                          </div>
                        );
                      }

                      return textContent;
                    })}
                {project.craftedSolution.images && project.craftedSolution.images.length > 0 && (
                  <div className="cs-collage">
                    {project.craftedSolution.images.map((img, i) => (
                      <div key={i} className={`cs-collage-item item-${i + 1}`}>
                        <img src={img} alt={`Solution detail ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
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
              {project.wireframes && project.wireframes.length > 0 && (
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
              )}

              {/* 6. Final UI Screens */}
              {project.finalScreens && project.finalScreens.length > 0 && (
                <section className="cs-section">
                  <h2 className="section-title">Final UI Screens</h2>
                  <div>
                    {project.finalScreens.map((item, i) => (
                      <div key={i} style={{ background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "30px" }}>
                        <img src={item.url} alt={item.title} style={{ width: "100%" }} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 7. Before and After Screens */}
              {project.beforeAfter && project.beforeAfter.length > 0 && (
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
              )}

              {/* 8. Outcome */}
              <section className="cs-section">
                <h2 className="section-title">Outcome</h2>
                <p className="cs-body">{project.outcome}</p>
              </section>

              {/* 9. Prototype Link (Optional) */}
              {(project.prototypeLink || project.mobilePrototypeLink) && (
                <section className="cs-section">
                  <h2 className="section-title">{project.mobilePrototypeLink ? "Prototypes" : "Prototype"}</h2>
                  <p className="cs-body">Explore the prototypes to see the full experience across different devices.</p>
                  <div className="cs-prototype-grid">
                    {project.prototypeLink && (
                      <a href={project.prototypeLink} target="_blank" rel="noopener noreferrer" className="cs-cta">
                        {project.mobilePrototypeLink ? "View Website Prototype" : "View Prototype"} <span className="cs-cta-icon">↗</span>
                      </a>
                    )}
                    {project.mobilePrototypeLink && (
                      <a href={project.mobilePrototypeLink} target="_blank" rel="noopener noreferrer" className="cs-cta">
                        View Mobile Prototype <span className="cs-cta-icon">↗</span>
                      </a>
                    )}
                  </div>
                </section>
              )}

              {/* 10. Thank You */}
              <section className="cs-section">
                <footer className="cs-footer">
                  <h2 className="section-title cs-thank-you-title">Thank You</h2>
                  <p className="cs-footer-body">{project.thankYou}</p>
                  <a href="mailto:fuaaduddin15@gmail.com" className="btn-primary cs-footer-btn">
                    Let's Connect
                  </a>
                </footer>
              </section>
            </div>
          </div>
          <div className="cs-footer-contact">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
