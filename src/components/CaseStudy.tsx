import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

// Module-level variable — survives HMR remounts so scroll-to-top
// only fires on genuine page navigation, not on every file save.
let _lastNavigatedId: string | null = null;

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const { setLoading } = useLoading();
  const insightsRef = useRef<HTMLDivElement>(null);
  const [activeInsight, setActiveInsight] = useState(0);
  const isUserInteracting = useRef(false);
  const interactTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const craftedRef = useRef<HTMLDivElement>(null);
  const [activeCrafted, setActiveCrafted] = useState(0);
  const [selectedScreen, setSelectedScreen] = useState<{ url: string; title: string; mobileUrl?: string } | null>(null);

  const handleCraftedScroll = () => {
    if (!craftedRef.current || !project?.craftedSolution?.features) return;
    const container = craftedRef.current;
    const cardCount = project.craftedSolution.features.length;
    const cardWidth = container.scrollWidth / cardCount;
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeCrafted && index >= 0 && index < cardCount) {
      setActiveCrafted(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!insightsRef.current || window.innerWidth > 768 || isUserInteracting.current) return;
      const container = insightsRef.current;
      const cardCount = project?.researchInsights?.insights.length || 1;
      const cardWidth = container.scrollWidth / cardCount;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [project]);

  const handleInsightScroll = () => {
    if (!insightsRef.current || !project?.researchInsights) return;
    const container = insightsRef.current;
    const cardCount = project.researchInsights.insights.length;
    const cardWidth = container.scrollWidth / cardCount;
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeInsight && index >= 0 && index < cardCount) {
      setActiveInsight(index);
    }

    isUserInteracting.current = true;
    if (interactTimeout.current) clearTimeout(interactTimeout.current);
    interactTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 4000);
  };

  useEffect(() => {
    const progress = setProgress(setLoading);
    progress.loaded();

    // Only scroll to top on genuine navigation (not HMR remounts).
    // _lastNavigatedId is module-level so it survives hot reloads.
    const isNewNavigation = _lastNavigatedId !== id;
    if (isNewNavigation) _lastNavigatedId = id ?? null;

    // Reset scroll position and refresh
    const timeoutId = setTimeout(() => {
      if (smoother) {
        smoother.paused(false);
        if (isNewNavigation) smoother.scrollTop(0);
        ScrollSmoother.refresh(true);
      } else {
        if (isNewNavigation) window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    }, 500);

    const timeoutId2 = setTimeout(() => {
      if (smoother) ScrollSmoother.refresh(true);
      ScrollTrigger.refresh();
    }, 1500);

    const timeoutId3 = setTimeout(() => {
      if (smoother) ScrollSmoother.refresh(true);
      ScrollTrigger.refresh();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [setLoading, id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedScreen(null);
    };
    if (selectedScreen) {
      window.addEventListener("keydown", handleKeyDown);
      if (smoother) smoother.paused(true);
    } else {
      if (smoother && !document.querySelector(".loading-screen")) smoother.paused(false);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedScreen]);

  useEffect(() => {
    if (!project) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        const cards = gsap.utils.toArray('.cs-crafted-2col, .cs-crafted-2col-reverse') as HTMLElement[];
        const section = document.getElementById("crafted-solution-section");

        if (cards.length > 1 && section) {
          const updateLayout = () => {
            const maxDist = cards[cards.length - 1].offsetTop - cards[0].offsetTop - ((cards.length - 1) * 20);
            section.style.marginBottom = `-${maxDist}px`;
          };

          updateLayout();
          ScrollTrigger.addEventListener("refreshInit", updateLayout);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cards[0],
              start: "top 140px",
              end: () => `+=${cards[cards.length - 1].offsetTop - cards[0].offsetTop}`,
              pin: section,
              scrub: true,
              invalidateOnRefresh: true,
            }
          });

          cards.forEach((card, i) => {
            if (i === 0) return;
            tl.to(card, {
              y: () => -(card.offsetTop - cards[0].offsetTop - (i * 20)),
              ease: "none",
              duration: i
            }, 0);
          });

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", updateLayout);
            section.style.marginBottom = "0px";
          };
        }
      });
    });

    return () => ctx.revert();
  }, [project]);

  useLayoutEffect(() => {
    if (!project || project.id !== 'mdoc-redesign' || !project.finalScreens || project.finalScreens.length <= 1) return;

    let ctx: gsap.Context;

    // Safety delay to ensure DOM and images are rendered so widths are accurate before pinning
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", () => {
          const section = document.getElementById("final-screens-section");
          const grid = document.getElementById("final-screens-grid");
          const track = document.getElementById("final-screens-track");

          if (section && grid && track) {
            const getScrollAmount = () => {
              return -(grid.scrollWidth - track.offsetWidth + 450);
            };

            gsap.to(grid, {
              x: getScrollAmount,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 140px",
                end: () => `+=${Math.abs(getScrollAmount())}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              }
            });

            const t1 = setTimeout(() => {
              ScrollTrigger.refresh();
              if (smoother) ScrollSmoother.refresh(true);
            }, 1000);
            const t2 = setTimeout(() => {
              ScrollTrigger.refresh();
              if (smoother) ScrollSmoother.refresh(true);
            }, 2500);

            return () => {
              clearTimeout(t1);
              clearTimeout(t2);
            };
          }
        });
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, [project]);


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


              {/* Summary */}
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
                    {project.platform && (
                      <div className="cs-summary-item">
                        <span className="cs-summary-label">Platform</span>
                        <span className="cs-summary-value">{project.platform}</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* 1. Project Goal */}
              <section className="cs-section">
                <h2 className="section-title">The Challenge</h2>
                <p className="cs-body">{project.projectGoal}</p>
              </section>

              {/* 2. Problem Statement */}
              <section className="cs-section">
                <h2 className="section-title">What Was Broken</h2>
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

              {/* Research Insights */}
              {project.researchInsights && (
                <section className="cs-section cs-research-section">
                  <h2 className="section-title">{project.researchInsights.title}</h2>
                  <p className="cs-body cs-research-intro">{project.researchInsights.description}</p>
                  <div className="cs-insights-container" ref={insightsRef} onScroll={handleInsightScroll}>
                    {project.researchInsights.insights.map((insight, index) => (
                      <div key={index} className="cs-insight-card">
                        <div className="cs-insight-header">
                          <div className="cs-insight-num">{insight.number}</div>
                          <strong className="cs-insight-bold">{insight.title}</strong>
                        </div>
                        <p className="cs-insight-text">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                  {project.researchInsights.insights.length > 1 && (
                    <div className="cs-carousel-dots">
                      {project.researchInsights.insights.map((_, idx) => (
                        <button
                          key={idx}
                          className={`cs-carousel-dot ${activeInsight === idx ? 'active' : ''}`}
                          onClick={() => {
                            if (!insightsRef.current) return;
                            const container = insightsRef.current;
                            const cardWidth = container.scrollWidth / project.researchInsights!.insights.length;
                            container.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
                            setActiveInsight(idx);
                          }}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* User Personas */}
              {project.userPersonas && project.userPersonas.length > 0 && (
                <section className="cs-section cs-personas-section">
                  <h2 className="section-title">User Personas</h2>
                  <div className="cs-personas-grid">
                    {project.userPersonas.map((persona, idx) => (
                      <div key={idx} className="cs-persona-card">
                        <div className="cs-persona-header">
                          <div className="cs-persona-avatar">
                            {persona.image
                              ? <img src={persona.image} alt={persona.name} className="cs-persona-avatar-img" />
                              : <span>{persona.name.split(' ').map((n: string) => n[0]).join('')}</span>
                            }
                          </div>
                          <div className="cs-persona-identity">
                            <h3 className="cs-persona-name">{persona.name}</h3>
                            <div className="cs-persona-meta">
                              <span className="cs-persona-meta-item">Age {persona.age}</span>
                            </div>
                          </div>
                        </div>
                        <p className="cs-persona-need-label">{persona.healthcareNeed}</p>
                        <p className="cs-persona-bio">{persona.bio}</p>
                        <div className="cs-persona-columns">
                          <div className="cs-persona-col">
                            <h4 className="cs-persona-col-title cs-persona-goals-title">Goals</h4>
                            <ul className="cs-persona-list cs-persona-goals-list">
                              {persona.goals.map((g, i) => <li key={i}>{g}</li>)}
                            </ul>
                          </div>
                          <div className="cs-persona-col">
                            <h4 className="cs-persona-col-title cs-persona-pain-title">Pain Points</h4>
                            <ul className="cs-persona-list cs-persona-pain-list">
                              {persona.painPoints.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* What I Changed & Why */}
              {project.whatIChanged && (
                <section className="cs-section cs-comparison-table-section">
                  <h2 className="section-title">{project.whatIChanged.title}</h2>
                  <p className="cs-body cs-table-intro">{project.whatIChanged.description}</p>

                  <div className="cs-table-wrapper">
                    <table className="cs-comparison-table">
                      <thead>
                        <tr>
                          {project.whatIChanged.headers.map((header, i) => (
                            <th key={i}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {project.whatIChanged.rows.map((row, i) => (
                          <tr key={i}>
                            <td className="cs-table-feature">{row.feature}</td>
                            <td className="cs-table-change">{row.whatChanged}</td>
                            <td className="cs-table-why">{row.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Competitor Analysis */}
              {project.competitorAnalysis && (
                <section className="cs-section cs-competitor-section">
                  <h2 className="section-title">{project.competitorAnalysis.title}</h2>
                  <div className="cs-table-wrapper cs-competitor-wrapper">
                    <table className="cs-competitor-table">
                      <thead>
                        <tr>
                          {project.competitorAnalysis.headers.map((header, i) => (
                            <th key={i} className={i > 0 ? "text-center" : ""}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {project.competitorAnalysis.rows.map((row, i) => (
                          <tr key={i}>
                            <td className="cs-table-criteria">{row.criteria}</td>
                            {row.values.map((val, j) => (
                              <td key={j} className="cs-table-val text-center">
                                {val === 'yes' && (
                                  <div className="cs-icon-yes">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                  </div>
                                )}
                                {val === 'no' && (
                                  <div className="cs-icon-no">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ff4757" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                  </div>
                                )}
                                {val === 'partial' && (
                                  <div className="cs-icon-partial">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffa502" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13" stroke="#222"></line><line x1="12" y1="17" x2="12.01" y2="17" stroke="#222"></line></svg>
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* 3. Crafted Solution */}
              <section id="crafted-solution-section" className="cs-section">
                <h2 className="section-title">Crafted Solution</h2>
                {project.craftedSolution.content && <p className="cs-body">{project.craftedSolution.content}</p>}

                {project.craftedSolution.video && (
                  <div className="cs-crafted-video-card">
                    <video
                      src={project.craftedSolution.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="cs-crafted-video"
                    />
                  </div>
                )}
                {project.craftedSolution.features && (
                  <>
                    <div className="cs-crafted-cards-container" ref={craftedRef} onScroll={handleCraftedScroll}>
                      {project.craftedSolution.features.map((feature, idx) => {
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
                    </div>
                    {project.craftedSolution.features.length > 1 && (
                      <div className="cs-carousel-dots">
                        {project.craftedSolution.features.map((_, idx) => (
                          <button
                            key={idx}
                            className={`cs-carousel-dot ${activeCrafted === idx ? 'active' : ''}`}
                            onClick={() => {
                              if (!craftedRef.current) return;
                              const container = craftedRef.current;
                              const cardWidth = container.scrollWidth / project.craftedSolution.features!.length;
                              container.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
                              setActiveCrafted(idx);
                            }}
                            aria-label={`Crafted Solution Slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
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

              {/* User Flow Diagram */}
              {project.userFlowDiagram && (
                <section className="cs-section cs-user-flow-section">
                  <h2 className="section-title">User Flow Diagram</h2>
                  <div className="cs-user-flow-img-wrapper">
                    <img src={project.userFlowDiagram} alt="User Flow Diagram" className="cs-user-flow-img" />
                  </div>
                </section>
              )}

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
                <section className={`cs-section ${project.id === 'mdoc-redesign' && project.finalScreens.length > 1 ? 'cs-gallery-section' : ''}`} id="final-screens-section">
                  {project.id === 'mdoc-redesign' && project.finalScreens.length > 1 ? (
                    <div className="cs-gallery-layout">
                      <div className="cs-gallery-info">
                        <h2 className="cs-gallery-title"><em>Final UI Screens</em></h2>
                        <p className="cs-gallery-desc">Explore the redesigned mobile app experience. Each screen was crafted for clarity, accessibility, and ease of use.</p>
                        <div className="cs-gallery-explore">
                          <span>SCROLL TO EXPLORE</span>
                          <span className="cs-gallery-arrow">→</span>
                        </div>
                      </div>
                      <div className="cs-gallery-track-container" id="final-screens-track">
                        <div className="cs-final-screen-grid horizontal" id="final-screens-grid">
                          {project.finalScreens.map((item, i) => (
                            <div key={i} className="cs-final-screen-card horizontal" onClick={() => setSelectedScreen(item)}>
                              <picture>
                                {item.mobileUrl && <source media="(max-width: 768px)" srcSet={item.mobileUrl} />}
                                <img
                                  src={item.url}
                                  alt={item.title}
                                  style={{ width: "100%", height: "auto" }}
                                  onLoad={() => {
                                    ScrollTrigger.refresh();
                                    if (smoother) ScrollSmoother.refresh(true);
                                  }}
                                />
                              </picture>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="section-title">Final UI Screens</h2>
                      <div className="cs-final-screen-grid">
                        {project.finalScreens.map((item, i) => (
                          <div key={i} className="cs-final-screen-card" onClick={() => setSelectedScreen(item)}>
                            <picture>
                              {item.mobileUrl && <source media="(max-width: 768px)" srcSet={item.mobileUrl} />}
                              <img
                                src={item.url}
                                alt={item.title}
                                style={{ width: "100%", height: "auto" }}
                                onLoad={() => {
                                  ScrollTrigger.refresh();
                                  if (smoother) ScrollSmoother.refresh(true);
                                }}
                              />
                            </picture>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
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

              {/* Scope of Improvements */}
              {project.scopeOfImprovements && project.scopeOfImprovements.length > 0 && (
                <section className="cs-section">
                  <h2 className="section-title">Scope of Improvements</h2>
                  <ul className="cs-improvements-list">
                    {project.scopeOfImprovements.map((item, i) => (
                      <li key={i} className="cs-improvements-item">
                        <strong className="cs-improvements-heading">{item.heading}</strong>
                        <p className="cs-improvements-desc">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

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
          <Footer />
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      {selectedScreen && (
        <div className="cs-screen-overlay" onClick={() => setSelectedScreen(null)}>
          <div className="cs-screen-overlay-backdrop" />
          <div className="cs-screen-overlay-content" onClick={() => setSelectedScreen(null)} style={{ cursor: "pointer" }}>
            <picture>
              {selectedScreen.mobileUrl && <source media="(max-width: 768px)" srcSet={selectedScreen.mobileUrl} />}
              <img src={selectedScreen.url} alt={selectedScreen.title} className="cs-screen-overlay-img" />
            </picture>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudy;
