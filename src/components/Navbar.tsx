import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

import { setSmoother, smoother } from "./utils/smoother";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const smootherInstance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(smootherInstance);

    smoother.scrollTop(0);
    // Only pause if loading screen is active
    if (document.querySelector(".loading-screen")) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
    }
    ScrollSmoother.refresh(true);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    const smoothContent = document.getElementById("smooth-content");
    if (smoothContent) {
      resizeObserver.observe(smoothContent);
    }

    const handleLinkClick = (e: Event) => {
      const element = e.currentTarget as HTMLAnchorElement;
      const sectionId = element.getAttribute("data-href");

      if (window.innerWidth > 1024) {
        e.preventDefault();

        if (location.pathname === "/") {
          // On homepage: smooth scroll with offset for fixed header
          smoother.scrollTo(sectionId, true, "top 100px");
        } else {
          // On other page: navigate to homepage section
          navigate(`/${sectionId}`);
        }
      } else {
        // Mobile behavior: let the link handle it or navigate
        if (location.pathname !== "/") {
          e.preventDefault();
          navigate(`/${sectionId}`);
        }
      }
      setMenuOpen(false);
    };

    const links = document.querySelectorAll(".nav-links a, .mobile-menu a");
    links.forEach((elem) => {
      elem.addEventListener("click", handleLinkClick);
    });

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });

    return () => {
      if (smoothContent) {
        resizeObserver.unobserve(smoothContent);
      }
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [location.pathname, navigate]);

  return (
    <>
      <div className={`header ${menuOpen ? "menu-open" : ""}`}>
        <Link to="/" className="navbar-logo">
          <img src="/images/logo-white.png" alt="Fuaad Studio" className="logo-img" />
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links">
          <li>
            <a data-href="#about" href="#about">
              About
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              Work
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile dropdown menu — always rendered, animated via .open class */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a data-href="#about" href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a data-href="#work" href="#work" onClick={() => setMenuOpen(false)}>Work</a>
        <a data-href="#contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </>
  );
};

export default Navbar;
