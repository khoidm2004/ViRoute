import React from 'react';
import './Footer.css'; 
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-item-section'>
        <span className="footer-heading">About </span>
        <span className="footer-text">Company</span>
        <span className="footer-text">Customers</span>
        <span className="footer-text">Products</span>
      </div>
      <div className="footer-item-section">
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
      <div className="footer-item-section">
        <div className="social-media-section">
          <span className="footer-heading">Follow us on social media</span>
          <div className="social-icons">
            <a href="#"><Icon icon="mdi:facebook" /></a>
            <a href="#"><Icon icon="mdi:linkedin" /></a>
            <a href="#"><Icon icon="mdi:github" /></a>
          </div>
        </div>
        <div className="social-app-section">
          <span className="footer-heading">Download our app</span>
          <div className="app-icons">
            <div className="app-icon-wrapper">
              <a href="#">
                <Icon icon="simple-icons:googleplay" alt="Google Play" />
                <span>Google Play</span>
              </a>
            </div>
            <div className="app-icon-wrapper">
              <a href="#">
                <Icon icon="ion:logo-apple-appstore" alt="App Store" />
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*<h1 className='copyright'>@Project</h1>*/}
    </div>
    );
};
export default Footer;