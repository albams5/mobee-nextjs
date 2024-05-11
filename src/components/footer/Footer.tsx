import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
import {
  faInstagram,
  faFacebook,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <section className="footer-menu">
        <h3>Menu</h3>
        <p>About Us</p>
        <p>Community</p>
      </section>
      <section className="footer-support">
        <h3>Support</h3>
        <p>Help & FAQ</p>
        <p>Terms and Conditions</p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </section>
      <section className="footer-icons">
        <h3>Follow us</h3>
        <div className="footer-icons-display">
          <FontAwesomeIcon
            className="footer-socialmedia-icon"
            icon={faInstagram}
          />
          <FontAwesomeIcon
            className="footer-socialmedia-icon"
            icon={faFacebook}
          />
          <FontAwesomeIcon
            className="footer-socialmedia-icon"
            icon={faSquareXTwitter}
          />
        </div>
      </section>
    </footer>
  );
};
