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
            {/* <div className="experience-desc">
              <p>
                Building Solid, a proprietary low-code platform using Angular, Next.js & NestJS. Delivering production-ready CMS-based projects including e-commerce, CRM, and import-export automation systems.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
