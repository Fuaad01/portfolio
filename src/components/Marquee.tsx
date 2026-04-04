import React from "react";
import "./styles/Marquee.css";

const Marquee = () => {
  const items = [
    "UX DESIGN",
    "UI DESIGN",
    "PRODUCT DESIGN",
    "USER RESEARCH",
    "PROTOTYPING",
    "WIREFRAMING",
    "INTERACTION DESIGN",
    "RESPONSIVE DESIGN",
    "USABILITY TESTING",
    "DESIGN SYSTEM",
    "USER FLOWS",
  ];

  // Repeat items for a seamless loop
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-content">
          {displayItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">✱</span>
            </React.Fragment>
          ))}
        </div>
        {/* Duplicate content for seamless looping */}
        <div className="marquee-content" aria-hidden="true">
          {displayItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">✱</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
