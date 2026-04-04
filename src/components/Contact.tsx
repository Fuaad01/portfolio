import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h2 className="section-title">GET IN TOUCH</h2>
        <div className="contact-flex">
          <div className="contact-box">
            {/* <h4>Email</h4>
            <p>
              <a href="mailto:fuaaduddin007@gmail.com">
                fuaaduddin15@gmail.com
              </a>
            </p> */}
            <h4>Education</h4>
            <p><b>BE in Computer Science</b><br />(Guru Nanak Dev Engineering College, Bidar)</p>
          </div>
          <div className="contact-box">
            <h4>Socials</h4>
            <a
              href="https://www.linkedin.com/in/fuaaduddin/"
              target="_blank"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/mohammed_fuaaduddin?igsh=b21lODJ4Z2UwMjVv"
              target="_blank"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="mailto:fuaaduddin15@gmail.com"
              className="contact-social"
            >
              Mail <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Mohammed Fuaaduddin</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
