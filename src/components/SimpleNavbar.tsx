import { Link } from "react-router-dom";
import "./styles/SimpleNavbar.css";

const SimpleNavbar = () => {
  return (
    <div className="simple-header">
      <a href="/" className="navbar-logo">
        <img src="/images/logo-white.png" alt="Fuaad Studio" className="logo-img" />
      </a>
      <ul>
        <li><Link to="/#about">About</Link></li>
        <li><Link to="/#work">Work</Link></li>
        <li><Link to="/#contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default SimpleNavbar;
