import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Customer Care</h3>
          <p>Help Center</p>
          <p>Track Order</p>
          <p>Returns & Refunds</p>
          <p>FAQs</p>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Company Info</p>
          <p>Careers</p>
          <p>Store Locator</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>
      <p className="footer-bottom">© 2025 Mobile Store | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
