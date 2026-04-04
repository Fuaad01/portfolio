import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/Work.css";
import projects from "../data/projects";


const COMING_SOON = {
  id: "coming-soon",
  title: "Next Case Study",
  description: "Something new is in the works. Stay tuned.",
  tags: ["Coming Soon"],
  image: "",
};

const allSlides = [...projects, COMING_SOON];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const isDragging = useRef(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  // Drag / touch handlers
  const handleDragStart = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    isDragging.current = true;
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    // If vertical scrolling dominates, cancel the horizontal drag
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
      isDragging.current = false;
      setDragOffset(0);
      return;
    }

    setDragOffset(deltaX);
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - dragStartX.current;
    setDragOffset(0);
    if (delta < -50) {
      goToSlide(currentIndex === allSlides.length - 1 ? 0 : currentIndex + 1);
    } else if (delta > 50) {
      goToSlide(currentIndex === 0 ? allSlides.length - 1 : currentIndex - 1);
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="section-title">MY WORK</h2>

        {/* ── Desktop: 2-column card grid ── */}
        <div className="work-cards-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="work-card"
            >
              <div className="work-card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="work-card-info">
                <div className="work-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="work-card-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-desc">{project.description}</p>

                <Link to={`/casestudy/${project.id}`} className="btn-primary work-btn">
                  View Now
                </Link>

              </div>
            </div>
          ))}

          {/* Coming soon */}
          <div className="work-card work-card-coming-soon">
            <div className="work-card-image">
              <img src="/images/work-under-progress.png" alt="Coming Soon" />
              <div className="lock-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
                  <rect x="4" y="11" width="16" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>

            <div className="work-card-info">
              <div className="work-card-tags">
                {/* <span className="work-card-tag">Coming Soon</span> */}
              </div>
              <h3 className="work-card-title">Coming Soon</h3>
              <p className="work-card-desc">Something new is in the works. Stay tuned.</p>

              <button className="btn-primary work-btn" disabled>View Now</button>

            </div>
          </div>
        </div>

        {/* ── Mobile: drag carousel ── */}
        <div className="work-carousel">
          <div
            className="work-carousel-track"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px - ${currentIndex * 16}px))`,
              transition: isDragging.current ? "none" : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onPointerLeave={handleDragEnd}
          >
            {allSlides.map((slide) =>
              slide.id === "coming-soon" ? (
                <div className="work-carousel-slide" key="coming-soon">
                  <div className="work-card work-card-coming-soon">
                    <div className="work-card-image">
                      <img src="/images/work-under-progress.png" alt="Coming Soon" />
                      <div className="lock-overlay">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
                          <rect x="4" y="11" width="16" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    </div>

                    <div className="work-card-info">
                      {/* <div className="work-card-tags">
                        <span className="work-card-tag">Coming Soon</span>
                      </div> */}
                      <h3 className="work-card-title">Coming Soon</h3>
                      <p className="work-card-desc">Something new is in the works. Stay tuned.</p>

                      <button className="btn-primary work-btn" disabled>View Now</button>

                    </div>
                  </div>
                </div>
              ) : (
                <div className="work-carousel-slide" key={slide.id}>
                  <div className="work-card">
                    <div className="work-card-image">
                      <img src={slide.image} alt={slide.title} />
                    </div>
                    <div className="work-card-info">
                      <div className="work-card-tags">
                        {slide.tags.map((tag) => (
                          <span key={tag} className="work-card-tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="work-card-title">{slide.title}</h3>
                      <p className="work-card-desc">{slide.description}</p>

                      <Link to={`/casestudy/${slide.id}`} className="btn-primary work-btn">
                        View Now
                      </Link>

                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Dots */}
          <div className="work-carousel-dots">
            {allSlides.map((_, i) => (
              <button
                key={i}
                className={`work-carousel-dot ${i === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
