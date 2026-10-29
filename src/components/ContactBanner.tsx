import "./styles/ContactBanner.css";

const ContactBanner = () => {
  return (
    <div id="contact" className="contact-banner section-container">
      <div className="contact-banner-inner">
        <h2 className="contact-banner-heading">
          <span className="contact-heading-dark">Interested in</span>
          <span className="contact-heading-bottom">
            <span className="contact-heading-dark">working</span>
            <span className="contact-heading-blue">together?</span>
          </span>
        </h2>

        <div className="contact-pill-container">
          <div className="contact-pill-ambient-glow" aria-hidden="true" />
          <a
            href="mailto:fuaaduddin15@gmail.com"
            className="contact-pill-card"
            aria-label="Email fuaaduddin15@gmail.com"
          >
            <span className="contact-pill-address">fuaaduddin15@gmail.com</span>
            <span className="contact-pill-icon-circle" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
