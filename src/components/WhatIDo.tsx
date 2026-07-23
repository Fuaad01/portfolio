import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const row1Skills = [
  { name: "Figma", image: "/images/figma.png" },
  { name: "User Research", image: "/images/user-research.png" },
  { name: "User Flows", image: "/images/user-flows.png" },
  { name: "User Journey Mapping", image: "/images/user-journey-mapping.png" },
  { name: "Wireframing", image: "/images/wireframing.png" },
  { name: "Prototyping", image: "/images/prototyping.png" },
  { name: "Usability Testing", image: "/images/usability-testing.png" },
  { name: "Information Architecture", image: "/images/information-architecture.png" },
];

const row2Skills = [
  { name: "Responsive Design", image: "/images/responsive-design.png" },
  { name: "Design Systems", image: "/images/design-system.png" },
  { name: "Visual Hierarchy", image: "/images/visual-hirarchhy.png" },
  { name: "Interaction Design", image: "/images/interaction-design.png" },
  { name: "Design Thinking", image: "/images/design-thinking.png" },
  { name: "Color Theory", image: "/images/color-theory.png" },
  { name: "Typography", image: "/images/typograph.png" },
  { name: "UI Design", image: "/images/ui-design.png" },
];

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

  // Double items for infinite marquee scrolling effect
  const doubleRow1 = [...row1Skills, ...row1Skills];
  const doubleRow2 = [...row2Skills, ...row2Skills];

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
              <h5>Skillset &amp; tools</h5>

              <div className="skills-carousel-container">
                {/* Row 1: Scrolls Left */}
                <div className="carousel-row row-left">
                  <div className="carousel-track">
                    {doubleRow1.map((skill, index) => (
                      <div key={`row1-${index}`} className="carousel-item">
                        <img src={skill.image} alt={skill.name} className="skill-image" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Scrolls Right */}
                <div className="carousel-row row-right">
                  <div className="carousel-track">
                    {doubleRow2.map((skill, index) => (
                      <div key={`row2-${index}`} className="carousel-item">
                        <img src={skill.image} alt={skill.name} className="skill-image" />
                      </div>
                    ))}
                  </div>
                </div>
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
