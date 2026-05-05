import "./styles/Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer section-container">
      <div className="footer-content">
        <div className="footer-left">
          <p>Design & Developed by<br />Mohammed Fuaaduddin</p>
        </div>
        <div className="footer-center">
          <a
            href="https://www.linkedin.com/in/fuaaduddin/"
            target="_blank"
            className="footer-pill"
          >
            LINKEDIN
          </a>
          <a
            href="https://www.instagram.com/mohammed_fuaaduddin?igsh=b21lODJ4Z2UwMjVv"
            target="_blank"
            className="footer-pill"
          >
            INSTAGRAM
          </a>
          <a href="mailto:fuaaduddin15@gmail.com" className="footer-pill">
            EMAIL
          </a>
        </div>
        <div className="footer-right">
          <button onClick={scrollToTop} className="back-to-top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
