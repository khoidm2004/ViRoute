import React from 'react';
import './not_found.css';
import Footer from '../footer/footer';

function NotFound() {
    return (
        <>
        <div className='full-width-wrapper-notfound'>
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
                <a href="/" className="not-found-home-link">Go back to Home</a>
            </div>
            </div>
        <Footer/>
        </>
    );
}

export default NotFound;
