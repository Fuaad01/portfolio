import "./styles/About.css";
import SectionHeader from "./SectionHeader";

const toolkitRow1 = [
  "Figma",
  "User Research",
  "User Flows",
  "User Journey Mapping",
  "Wireframing",
  "Prototyping",
  "Usability Testing",
  "Information Architecture",
];

const toolkitRow2 = [
  "Responsive Design",
  "Design Systems",
  "Visual Hierarchy",
  "Interaction Design",
  "Design Thinking",
  "Color Theory",
  "Typography",
  "UI Design",
];

const doubleToolkitRow1 = [...toolkitRow1, ...toolkitRow1];
const doubleToolkitRow2 = [...toolkitRow2, ...toolkitRow2];

const About = () => {
  return (
    <section className="about-section section-container" id="about">
      <div className="about-box">
        <SectionHeader
          tag="ABOUT"
          title="A little about me"
        />
        <div className="about-bento-grid">
          {/* ════════════════════ ROW 1 (TOP) ════════════════════ */}
          <div className="bento-row bento-row-top">
            {/* Card 1: WHO I AM */}
            <div className="bento-card bento-card-whoiam">
              <div className="bento-card-tag">WHO I AM</div>
              <h3 className="whoiam-headline">
                A UX/UI and Product Designer, with 3+ years of experience in designing intuitive digital experiences. Skilled in UX strategy, wireframing, prototyping, and high-fidelity UI design with a focus on user-centered design. Experienced in Agile environments and AI-assisted design tools for research, ideation, and rapid prototyping.
              </h3>
            </div>

            {/* Card 2: PROFILE PHOTO (Middle column) */}
            <div className="bento-card bento-card-photo">
              <img
                src="/images/my-profile-1.png"
                alt="Fuaad - UX/UI and Product Designer"
                className="bento-photo-img"
              />
            </div>

            {/* Column: Right Stack — 3+ experience on top, location below */}
            <div className="bento-col-right-top">
              {/* Card 3: 3+ EXPERIENCE */}
              <div className="bento-card bento-card-stat-exp">
                <div className="stat-exp-number">
                  3<span className="stat-exp-plus">+</span>
                </div>
                <div className="stat-exp-info">
                  <h4 className="stat-exp-label">
                    years designing intuitive digital products
                  </h4>
                  <p className="stat-exp-subtext">Most recently at IBaseIT</p>
                </div>
              </div>

              {/* Card 4: LOCATION */}
              <div className="bento-card bento-card-location">
                <div className="bento-card-tag">LOCATION</div>
                <div className="location-card-body">
                  <div className="location-info">
                    <h4 className="location-city-name">Bidar, Karnataka</h4>
                    <p className="location-subtext">
                      Open to relocation &amp; remote
                    </p>
                  </div>
                  <div
                    className="location-radar-indicator"
                    title="Active in Bidar, Karnataka"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════ ROW 2 (BOTTOM) ════════════════════ */}
          <div className="bento-row bento-row-bottom">
            {/* Card 4: EXPERIENCE */}
            <div className="bento-card bento-card-experience">
              <div className="bento-card-tag">EXPERIENCE</div>
              <div className="bottom-card-body">
                <h4 className="bottom-card-title">UX/UI Designer</h4>
                <p className="bottom-card-subtitle">IBaseIT, Hyderabad</p>
              </div>
              <div className="bottom-card-footer">
                <span className="bento-pill bento-date-pill">
                  Nov 2022 - Jan 2026
                </span>
              </div>
            </div>

            {/* Card 5: EDUCATION */}
            <div className="bento-card bento-card-education">
              <div className="bento-card-tag">EDUCATION</div>
              <div className="bottom-card-body">
                <h4 className="bottom-card-title">
                  BE, Computer Science and Engineering
                </h4>
                <p className="bottom-card-subtitle">
                  Guru Nanak Dev Engineering College, Bidar
                </p>
              </div>
              <div className="bottom-card-footer">
                <span className="bento-pill bento-date-pill">2017 - 2021</span>
              </div>
            </div>

            {/* Card 6: TOOLKIT */}
            <div className="bento-card bento-card-toolkit">
              <div className="bento-card-tag">SKILLS</div>
              <div className="toolkit-marquee-wrap">
                {/* Row 1: Scrolling Left */}
                <div className="toolkit-row">
                  <div className="toolkit-track track-left">
                    {doubleToolkitRow1.map((tool, idx) => (
                      <span key={`r1-${idx}`} className="bento-pill toolkit-pill">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Row 2: Scrolling Right */}
                <div className="toolkit-row">
                  <div className="toolkit-track track-right">
                    {doubleToolkitRow2.map((tool, idx) => (
                      <span key={`r2-${idx}`} className="bento-pill toolkit-pill">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
