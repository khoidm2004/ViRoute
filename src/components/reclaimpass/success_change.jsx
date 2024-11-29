import React from 'react';
import './success_change.css';
import Footer from '../footer/footer';

function SuccessChange() {
    return (
        <>
        <div className="success-changepass-container">
            <h1 className="success-changepass-title">The password has been changed successfully!</h1>
            <a href="/" className="changepass-home-link">Go back to Home</a>
        </div>
        <Footer/>
        </>
    );
}

export default SuccessChange;
