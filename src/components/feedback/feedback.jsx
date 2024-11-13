import React from 'react';
import './feedback.css';
import Footer from '../footer/footer.jsx';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti_success.jsx';

const Feedback = () => {
    const handleSend = () => {
        triggerSuccessNotification('Send Successful!');
    }
    return (
        <>
        <div className='feedback-container'>
            <div className='feedback-text'>
                <h1>Can we help you?</h1>
                <h2>If you are looking for answers, want to solve a problem, or want to give us your opinion, you can do so here.<br /><br />Fill out your information and a Viroute representative will reach out to you.</h2>
            </div>  
            <div className="feedback-form">
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="*your@company.com" />
                    <label>Name</label>
                    <input type="text" placeholder="*Your name" />
                    <label>Company or Organization</label>
                    <input type="text" placeholder="The name of your organization" />
                    <label>Phone</label>
                    <input type="tel" placeholder="Your phone number" />
                    <button type="submit" onClick={handleSend}>Send</button>
                </form>
            </div>
            <SuccessNotify />
        </div>
        <Footer/>
        </>
    )
}
export default Feedback;