import "./styles/About.css";


const About = () => {
  return (
    <div className="about-section section-container" id="about">
      <div className="about-box">
        <div className="about-content-wrapper">
          <div className="about-me">
            <h2 className="section-title">ABOUT ME</h2>
            <p>
              UX/UI Designer with 3+ years of experience designing responsive websites and mobile applications. Skilled in translating business and user requirements into user flows, wireframes, prototypes, and high-fidelity interfaces to improve usability. Experienced in Agile environments and leveraging AI-assisted tools to support research, ideation, and rapid prototyping. Strong understanding of HTML, CSS, and Bootstrap for effective collaboration with developers.
            </p>
            <div className="about-btn">

              <a href="mailto:fuaaduddin15@gmail.com" className="btn-primary">
                Let's Connect
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
