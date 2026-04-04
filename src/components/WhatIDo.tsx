import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Skill {
  name: string;
  rating: number;
}

const skills: Skill[] = [
  { name: "Figma", rating: 5 },
  { name: "User Research", rating: 4.5 },
  { name: "User Flows", rating: 4.5 },
  { name: "User Journey Mapping", rating: 4.5 },
  { name: "Wireframing", rating: 5 },
  { name: "Prototyping", rating: 5 },
  { name: "Usability Testing", rating: 4 },
  { name: "Information Architecture", rating: 4 },
  { name: "Responsive Design", rating: 5 },
  { name: "Design Systems", rating: 4.5 },
  { name: "Visual Hierarchy", rating: 4.5 },
  { name: "Interaction Design", rating: 4 },
];

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // Half star: empty star base + filled star clipped to left half
      stars.push(
        <span key={i} className="star half-star-wrapper">
          <span className="half-star-empty">☆</span>
          <span className="half-star-filled">★</span>
        </span>
      );
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }
  return <div className="star-rating">{stars}</div>;
};

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const containers = containerRef.current;
    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containers.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO section-container" id="whatIDo">
      <div className="what-box-outer">
        <h2 className="section-title">WHAT I DO</h2>
      </div>
      <div className="what-box">
        <div className="what-box-in visible">
          <div className="what-border2">
            <svg width="100%" height="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%" width="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>UX/UI DESIGN</h3>
              <p>
                I create thoughtful, user-focused interfaces that combine
                functionality with modern design, ensuring smooth and engaging
                digital experiences across platforms.
              </p>
              <h5>Skillset & tools</h5>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <StarRating rating={skill.rating} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
