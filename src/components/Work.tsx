import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/Work.css";
import projects from "../data/projects";

const allSlides = projects;

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const goTo = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        dir === "next"
          ? prev === allSlides.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? allSlides.length - 1
          : prev - 1
      );
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
    if (delta < -50) goTo("next");
    else if (delta > 50) goTo("prev");
  };

  const current = allSlides[currentIndex];
  const nextIndex = (currentIndex + 1) % allSlides.length;
  const next = allSlides[nextIndex];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="section-title">MY WORK</h2>

        <div className="work-stack-layout">
          {/* ── Stacked Card Area ── */}
          <div
            className="work-stack-cards"
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onPointerLeave={handleDragEnd}
            style={{
              transform: dragOffset ? `translateX(${dragOffset * 0.08}px)` : undefined,
            }}
          >
            {/* Back card (peek) */}
            <div
              className={`work-stack-card work-stack-card--back ${isAnimating ? `animating-${direction}` : ""}`}
            >
              <div className="work-card-image">
                {next.video ? (
                  <video src={next.video} autoPlay loop muted playsInline />
                ) : (
                  <img src={next.image} alt={next.title} />
                )}
              </div>
            </div>

            {/* Front card (active) */}
            <div
              className={`work-stack-card work-stack-card--front ${isAnimating ? `animating-${direction}` : ""}`}
            >
              <div className="work-card-image">
                {current.video ? (
                  <video src={current.video} autoPlay loop muted playsInline />
                ) : (
                  <img src={current.image} alt={current.title} />
                )}
              </div>
            </div>
          </div>

          {/* ── Info Panel ── */}
          <div className="work-stack-info">
            <div className="work-stack-counter">
              <span className="counter-current">{String(currentIndex + 1).padStart(1, "0")}</span>
              <span className="counter-sep"> / </span>
              <span className="counter-total">{allSlides.length}</span>
            </div>

            <div className={`work-stack-text ${isAnimating ? "fading" : ""}`}>
              <h3 className="work-stack-title">{current.title}</h3>
              <p className="work-stack-desc">{current.description}</p>
              <Link
                to={`/casestudy/${current.id}`}
                className="work-stack-link"
              >
                View Case Study →
              </Link>
            </div>

            {/* Arrow Buttons */}
            <div className="work-stack-nav">
              <button
                className="work-nav-btn"
                onClick={() => goTo("prev")}
                aria-label="Previous project"
                disabled={isAnimating}
              >
                ←
              </button>
              <button
                className="work-nav-btn"
                onClick={() => goTo("next")}
                aria-label="Next project"
                disabled={isAnimating}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
