import React from 'react';
import './Footer.css'; 
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <div className="footer">
      {/* Contact Section */}
      <div className="footer-item contact-section">
        <span className="footer-heading">Contact us</span>
        <div className="contact-item">
            <Icon icon="material-symbols:mail" className="footer-icon" />
            <span className="footer-text">viroute.service@gmail.com</span>
        </div>
        <div className="contact-item">
            <Icon icon="iconoir:phone-solid" className="footer-icon" />
            <span className="footer-text">013201545</span>
        </div>
        <div className="contact-item">
          <Icon icon="mdi:map-marker" className="footer-icon" />
          <span className="footer-text">Yliopistonkatu 123456</span>
        </div>
      </div>

      {/* Social Media + App Section (grouped in one column) */}
      <div className="footer-item social-app-section">
        <div className="social-media-section">
          <span className="footer-heading">Follow us on social media</span>
          <div className="footer-icon">
            <a href="#"><Icon icon="mdi:facebook" className="footer-icon" /></a>
            <a href="#"><Icon icon="mdi:linkedin" className="footer-icon" /></a>
            <a href="#"><Icon icon="mdi:github" className="footer-icon" /></a>
          </div>
        </div>

        <div className="app-section">
          <span className="footer-heading">Download our app</span>
          <div className="app-icons">
            <a href="#"><Icon icon="simple-icons:googleplay" alt="Google Play"/>Google Play</a>
            <a href="#"><Icon icon="ion:logo-apple-appstore" alt="App Store"/>App Store</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
