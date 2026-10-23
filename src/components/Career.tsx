import "./styles/Career.css";
import { FaBriefcase } from "react-icons/fa";

const Career = () => {
  return (
    <div className="experience-section section-container" id="experience">
      <div className="experience-container">
        <h2 className="section-title">EXPERIENCE</h2>
        <div className="experience-list">
          <div className="experience-item">
            <div className="experience-header">
              <div className="experience-logo">
                <FaBriefcase />
              </div>
              <div className="experience-info">
                <h3 className="company-name">IBaseIT</h3>
                <div className="role-date-container">
                  <h4 className="experience-role">UX/UI Designer</h4>
                </div>
              </div>
              <div className="experience-date">
                <span className="experience-date">Nov 2022 - Jan 2026</span>
              </div>
            </div>
            <div className="experience-desc">
              <ul>
                <li>Designed UX/UI for web and mobile products, from requirements and user flows to high-fidelity Figma designs and developer handoff.</li>
                <li>Simplified complex user flows and restructured outdated experiences so they’re easier to understand and use.</li>
                <li>Turned complex requirements into clear interfaces and interactive Figma prototypes, gathering early stakeholder feedback to reduce rework.</li>
                <li>Redesigned and modernized UI across web and mobile, keeping it consistent and responsive across screens.</li>
                <li>Built reusable Figma components to keep the UI consistent and speed up design work.</li>
                <li>Collaborated with developers and stakeholders in Agile sprints to deliver user-centered, developer-ready designs.</li>
                <li>Used AI tools to speed up ideation, documentation, and design iteration, checking outputs against user needs.</li>
              </ul>
              <div className="experience-tags">
                <span className="experience-tag">UI Design</span>
                <span className="experience-tag">UX Design</span>
                <span className="experience-tag">Figma</span>
                <span className="experience-tag">UX Research</span>
                <span className="experience-tag">Wireframing</span>
                <span className="experience-tag">Prototyping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
