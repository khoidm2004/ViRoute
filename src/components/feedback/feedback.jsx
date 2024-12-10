import React, { useState } from 'react';
import './feedback.css';
import Footer from '../footer/footer.jsx';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti_success.jsx';

const Feedback = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Name: '',
        Organization: '',
        Feedback: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSend = async (e) => {
        e.preventDefault(); // Ngăn chặn tải lại trang
        const dataToSend = [
            {
                Name: formData.Name,
                Email: formData.Email,
                "Rating (1-5)": "5", // Hoặc thêm một trường để người dùng nhập giá trị này
                Feedback: formData.Feedback
            }
        ];

        try {
            const response = await fetch('https://sheetdb.io/api/v1/46eg92vstb7zq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                triggerSuccessNotification('Send Successful!');
                setFormData({ Email: '', Name: '', Organization: '', Feedback: '' });
            } else {
                alert('Failed to send feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='full-width-wrapper-feedback'>
            <div className='feedback-container'>
                <div className='feedback-text'>
                    <h1>Can we help you?</h1>
                    <h2>If you are looking for answers, want to solve a problem, or want to give us your opinion, you can do so here.<br /><br />Fill out your information and a Viroute representative will reach out to you.</h2>
                </div>  
                <div className="feedback-form">
                    <form onSubmit={handleSend}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="*your@company.com"
                            required
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            placeholder="*Your name"
                            required
                        />
                        <label>Company or Organization</label>
                        <input
                            type="text"
                            name="Organization"
                            value={formData.Organization}
                            onChange={handleChange}
                            placeholder="The name of your organization"
                        />
                        <label>Opinion</label>
                        <input
                            type="text"
                            name="Feedback"
                            value={formData.Feedback}
                            onChange={handleChange}
                            placeholder="Your opinion"
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
                <SuccessNotify />
            </div>
        </div>
    );
};

export default Feedback;
