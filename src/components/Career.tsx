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
                <li>Led end-to-end UI/UX design for 3+ web and mobile products, improving task completion and user satisfaction across key flows.</li>
                <li>Identified and resolved 10+ UX friction points through research and testing, reducing user drop-offs in critical journeys.</li>
                <li>Collaborated with developers & stakeholders in agile sprints, ensuring timely delivery.</li>
                <li>Leveraged AI tools to optimize design workflows, improving efficiency in ideation, documentation, and iteration.</li>
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
