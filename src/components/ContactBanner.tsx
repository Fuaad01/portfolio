import "./styles/ContactBanner.css";

const ContactBanner = () => {
  return (
    <div id="contact" className="contact-banner section-container">
      <div className="contact-banner-inner">
        <h2 className="contact-banner-heading">
          INTERESTED IN<br />WORKING TOGETHER?
        </h2>
        <div className="contact-banner-email-block">
          <a
            href="mailto:fuaaduddin15@gmail.com"
            className="contact-banner-email"
          >
            fuaaduddin15@gmail.com
            <span className="contact-banner-cursor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
