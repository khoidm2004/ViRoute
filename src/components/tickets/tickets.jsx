import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // Use react-qr-code
import './tickets.css'; 
import { Icon } from '@iconify/react';

const TicketPage = () => {
  //const [timeLeft, setTimeLeft] = useState(300); // Countdown time in seconds (e.g., 5 minutes)
//
  //// Function to format time in mm:ss
  //const formatTime = (seconds) => {
  //  const minutes = Math.floor(seconds / 60);
  //  const secs = seconds % 60;
  //  return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  //};
//
  //useEffect(() => {
  //  const timer = setInterval(() => {
  //    setTimeLeft((prevTime) => {
  //      if (prevTime <= 0) {
  //        clearInterval(timer);
  //        return 0; 
  //      }
  //      return prevTime - 1;
  //    });
  //  }, 1000);
//
  //  return () => clearInterval(timer); // Cleanup on component unmount
  //}, []);
//
  return (
    <div className="ticket-page">
        <div className='download-container'>
            <h1>VIROUTE APP</h1>
            <h2>Using the ViRoute app to stay up-to-date with the latest changes. Travel all around the city with just one app. Download the free app to look up directions and buy tickets for public transport.</h2>
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
        <div className='ticket-container'>
            <h1>ViRoute</h1>
            <div className="qr-code">
              <QRCode value="https://your-ticket-url.com" size={256} /> {/* Replace with your ticket URL */}
            </div>
            <h2>Scan me!</h2>
            {/*<div className="countdown-timer">*/}
            {/*  <h2>Available for:</h2>*/}
            {/*  <p>{formatTime(timeLeft)}</p>*/}
            {/*</div>*/}
        </div>
      
    </div>
  );
};

export default TicketPage;
