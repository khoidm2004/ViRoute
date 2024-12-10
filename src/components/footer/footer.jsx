import React from 'react';
import './Footer.css'; 
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-item-section'>
        <span className="footer-heading">About </span>
        <span className="footer-text"><a href="/company">Company</a></span>
        <span className="footer-text"><a href="/customers">Customers</a></span>
        <span className="footer-text"><a href="/products">Products</a></span>
      </div>
      <div className="footer-item-section">
        <span className="footer-heading">Contact us</span>
        <div className="contact-item">
            <Icon icon="material-symbols:mail" className="footer-icon" />
            <span className="footer-text"><a href="mailto:viroute.service@gmail.com">viroute.service@gmail.com</a></span>
        </div>
        <div className="contact-item">
            <Icon icon="iconoir:phone-solid" className="footer-icon" />
            <span className="footer-text"><a href="tel:+013201545">013201545</a></span>
        </div>
        <div className="contact-item">
          <Icon icon="mdi:map-marker" className="footer-icon" />
          <span className="footer-text"><a href="https://maps.google.com?q=Yliopistonkatu%20123456">Yliopistonkatu 123456</a></span>
        </div>
      </div>
      <div className="footer-item-section">
        <div className="social-media-section">
          <span className="footer-heading">Follow us</span>
          <div className="social-icons">
            <a href="https://facebook.com"><Icon icon="mdi:facebook" /></a>
            <a href="https://linkedin.com"><Icon icon="mdi:linkedin" /></a>
            <a href="https://github.com"><Icon icon="mdi:github" /></a>
          </div>
        </div>
        <div className="social-app-section">
          <span className="footer-heading">Download our app</span>
          <div className="app-icons">
            <div className="app-icon-wrapper">
              <a href="https://play.google.com">
                <Icon icon="simple-icons:googleplay" alt="Google Play" />
                <span>Google Play</span>
              </a>
            </div>
            <div className="app-icon-wrapper">
              <a href="https://www.apple.com/app-store/">
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