import React, { useState, useEffect } from 'react';
import './feedback.css';
import Footer from '../footer/footer.jsx';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti_success.jsx';
import authStore from '../../stores/authStore'; // Import authStore để lấy thông tin người dùng

const Feedback = () => {
    const user = authStore((state) => state.user); // Lấy thông tin người dùng từ store

    const [formData, setFormData] = useState({
        Email: '',
        Name: '',
        Score: '',
        Feedback: ''
    });

    useEffect(() => {
        // Tự động điền email và tên khi component được mount
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                Email: user.userEmail || '',
                Name: user.fullName || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (!formData.Score) {
            alert('Please select a score between 1 and 5');
            return;
        }

        const dataToSend = [
            {
                Name: formData.Name,
                Email: formData.Email,
                Score: formData.Score,
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
                setFormData({ Email: user.userEmail || '', Name: user.fullName || '', Score: '', Feedback: '' });
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
                        <label>Give us a score (1-5)</label>
                        <select
                            name="Score"
                            value={formData.Score}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a score</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
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
