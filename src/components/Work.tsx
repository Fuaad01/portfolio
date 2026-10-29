import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Work.css";
import SectionHeader from "./SectionHeader";
import projects from "../data/projects";

const allSlides = projects;

interface TransitionState {
  from: number;
  to: number;
  dir: "next" | "prev";
}

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const dragStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timers and RAF on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Helper to clear any inline styles applied during direct drag or transition handoff
  const clearDragInlineStyles = () => {
    cardRefs.current.forEach((el) => {
      if (el) {
        el.removeAttribute("style");
      }
    });
    textRefs.current.forEach((el) => {
      if (el) {
        el.removeAttribute("style");
      }
    });
  };

  // Trigger smooth class-driven swipe transition
  const executeSwipe = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // Ensure any direct drag inline styles are cleared so CSS classes control the motion
      clearDragInlineStyles();

      const fromIdx = currentIndex;
      const toIdx =
        dir === "next"
          ? (currentIndex + 1) % allSlides.length
          : (currentIndex - 1 + allSlides.length) % allSlides.length;

      // Begin CSS class animation
      setTransitionState({
        from: fromIdx,
        to: toIdx,
        dir,
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // Disable transition on the exited element so it snaps to the back slot without flying back across
        const exitedEl = cardRefs.current[fromIdx];
        if (exitedEl) {
          exitedEl.style.transition = "none";
        }

        setCurrentIndex(toIdx);
        setTransitionState(null);
        isAnimatingRef.current = false;

        // Clean up inline styles on the next frame so CSS classes fully govern the stack
        requestAnimationFrame(() => {
          clearDragInlineStyles();
        });
      }, 350);
    },
    [currentIndex]
  );

  // Pointer drag start
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimatingRef.current) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Safe ignore
    }
  };

  // Pointer drag move - 120 FPS direct GPU transforms with real-time bottom card & text interpolation
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isAnimatingRef.current) return;

    const rawDx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    // Detect vertical scroll intent early (only activate drag when pulling left)
    if (!hasMovedRef.current) {
      if (Math.abs(dy) > Math.abs(rawDx) && Math.abs(dy) > 10) {
        isDraggingRef.current = false;
        setIsDragging(false);
        clearDragInlineStyles();
        return;
      }
      if (rawDx < -4) {
        hasMovedRef.current = true;
      }
    }

    if (!hasMovedRef.current) return;

    // Restrict drag on the right side: only allow dragging to the left (dx <= 0)
    const dx = Math.min(0, rawDx);

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const frontEl = cardRefs.current[currentIndex];
      const backIdx = (currentIndex + 1) % allSlides.length;
      const backEl = cardRefs.current[backIdx];

      if (!frontEl || !backEl) return;

      // 1:1 top card physics - only leftward drag, completely solid (opacity 1)
      const rot = dx * 0.045;
      frontEl.style.transition = "none";
      frontEl.style.transform = `translate3d(${dx}px, ${dy * 0.22}px, 0) rotate(${rot}deg) scale(1)`;
      frontEl.style.zIndex = "2";
      frontEl.style.opacity = "1";

      // Real-time bottom card elevation as top card is pulled away
      const progress = Math.min(Math.abs(dx) / 200, 1);
      const curX = 18 * (1 - progress);
      const curY = 12 * (1 - progress);
      const curRot = 4 * (1 - progress);
      const curScale = 0.96 + 0.04 * progress;

      backEl.style.transition = "none";
      backEl.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) rotate(${curRot.toFixed(2)}deg) scale(${curScale.toFixed(3)})`;
      backEl.style.zIndex = "1";
      backEl.style.opacity = "1";
    });
  };

  // Pointer drag release
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Safe ignore
    }

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const rawDx = e.clientX - dragStartRef.current.x;
    const elapsed = Date.now() - dragStartRef.current.time;
    const velocity = Math.abs(rawDx) / Math.max(elapsed, 1);

    const isFlick = velocity > 0.35 && Math.abs(rawDx) > 22;
    const isPastThreshold = Math.abs(rawDx) > 55;

    // Only allow leftward swipe to advance to next card
    if (rawDx < 0 && (isFlick || isPastThreshold)) {
      executeSwipe("next");
    } else {
      // Release without swipe: clear drag inline styles so CSS classes spring everything back smoothly
      clearDragInlineStyles();
    }
  };

  // Determine card CSS class based on active index and transition state
  const getCardClass = (index: number) => {
    if (transitionState) {
      if (index === transitionState.from) {
        return transitionState.dir === "next"
          ? "work-stack-card is-exiting-left"
          : "work-stack-card is-exiting-right";
      }
      if (index === transitionState.to) {
        return "work-stack-card is-entering-front";
      }
    }

    const isCurrent = index === currentIndex;
    const isIncoming = index === (currentIndex + 1) % allSlides.length;

    if (isCurrent) return "work-stack-card is-front";
    if (isIncoming) return "work-stack-card is-back";
    return "work-stack-card is-hidden";
  };

  // Determine text slide CSS class based on active index and transition state
  const getTextClass = (index: number) => {
    if (transitionState) {
      if (index === transitionState.from) {
        return transitionState.dir === "next"
          ? "work-stack-text-slide is-exiting-up"
          : "work-stack-text-slide is-exiting-down";
      }
      if (index === transitionState.to) {
        return transitionState.dir === "next"
          ? "work-stack-text-slide is-entering-up"
          : "work-stack-text-slide is-entering-down";
      }
    }

    if (index === currentIndex) return "work-stack-text-slide is-active";
    return "work-stack-text-slide";
  };

  const isAnimating = !!transitionState;
  const targetCounterIndex = transitionState ? transitionState.to : currentIndex;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <SectionHeader tag="SELECTED PROJECTS" title="My work" />

        <div className="work-stack-layout">
          {/* ── Persistent Stacked Cards ── */}
          <div
            className={`work-stack-cards ${isDragging ? "is-dragging" : ""} ${isAnimating ? "is-animating" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {allSlides.map((project, index) => {
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={getCardClass(index)}
                >
                  <div className="work-card-image">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        draggable={false}
                        style={{ pointerEvents: "none" }}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        draggable={false}
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Info Panel with Synchronized Transitions ── */}
          <div className="work-stack-info">
            {/* Rolling Counter Ticker */}
            <div className="work-stack-counter">
              <div className="counter-ticker-wrapper">
                <div
                  className="counter-ticker-track"
                  style={{
                    transform: `translateY(-${targetCounterIndex * 28}px)`,
                  }}
                >
                  {allSlides.map((_, i) => (
                    <span key={i} className="counter-current">
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
              <span className="counter-sep"> / </span>
              <span className="counter-total">{allSlides.length}</span>
            </div>

            {/* Overlapping Text Slides (Zero Layout Shift) */}
            <div className="work-stack-text-container">
              {allSlides.map((project, index) => {
                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                    className={getTextClass(index)}
                  >
                    <div className="work-stack-title-wrap">
                      <h3 className="work-stack-title">{project.title}</h3>
                      {project.subtitle && (
                        <p className="work-stack-subtitle">{project.subtitle}</p>
                      )}
                    </div>
                    <p className="work-stack-desc">{project.description}</p>
                    <Link
                      to={`/casestudy/${project.id}`}
                      className="work-stack-link"
                    >
                      View Case Study →
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Arrow Navigation */}
            <div className="work-stack-nav">
              <button
                className="work-nav-btn"
                onClick={() => executeSwipe("prev")}
                aria-label="Previous project"
                disabled={isAnimating}
              >
                ←
              </button>
              <button
                className="work-nav-btn"
                onClick={() => executeSwipe("next")}
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
