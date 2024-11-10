import React, { useState, useEffect } from 'react';
import './Taskbar.css'; 
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserInformationStore from '../../stores/userinfoStore';

const Taskbar = () => {
    const { avatar, fullName } = useUserInformationStore();  // Access fullName from the store
    const [activeItem, setActiveItem] = useState('');
    const [showCities, setShowCities] = useState(false);
    const [cityCode, setCityCode] = useState('hn'); 
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const navigate = useNavigate();
    const location = useLocation();

    const cities = [
        { code: 'hcm', name: 'Ho Chi Minh' },
        { code: 'hn', name: 'Hanoi' },
    ];

    useEffect(() => {
        if (location.pathname === '/') setActiveItem('Home');
        else if (location.pathname === '/tracking') setActiveItem('Tracking');
        else if (location.pathname === '/tickets') setActiveItem('Tickets');
        else if (location.pathname === '/feedback') setActiveItem('Feedback');
    }, [location.pathname]);

    const handleLogout = () => {
        setIsLoggedIn(false); // Update login state to false
    };

    const handleCityChange = (code) => {
        setCityCode(code);
        setShowCities(false);
    };

    return (
        <div className="taskbar">
            <img className="logo" src="../images/ViRoute_white.png" alt="Logo" />
            <div className={`taskbar-item ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => navigate('/')}>
                <Icon icon="subway:home-1" className='icon' />
                <span className='icon-text'>Home</span>
            </div>
            <div className={`taskbar-item ${activeItem === 'Tracking' ? 'active' : ''}`} onClick={() => navigate('/tracking')}>
                <Icon icon="mdi:sign-direction-plus" className='icon' />
                <span className='icon-text'>Tracking</span>
            </div>
            <div className={`taskbar-item ${activeItem === 'Tickets' ? 'active' : ''}`} onClick={() => navigate('/tickets')}>
                <Icon icon="heroicons:ticket-solid" className='icon'/>
                <span className='icon-text'>Tickets</span>
            </div>
            <div className={`taskbar-item ${activeItem === 'Feedback' ? 'active' : ''}`} onClick={() => navigate('/feedback')}>
                <Icon icon="majesticons:phone" className='icon'/>
                <span className='icon-text'>Feedback</span>
            </div>
            <div className="taskbar-item" onClick={() => setShowCities(!showCities)}>
                <Icon icon="icon-park-outline:change" className='icon'/>
                <span className='icon-text'>Change City</span>
                {showCities && (
                    <div className="city-dropdown">
                        {cities.map((city) => (
                            <div key={city.code} onClick={() => handleCityChange(city.code)} className="city-option">
                                {city.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="city-text">
                <span>{cityCode === 'hn' ? 'Hanoi' : 'Ho Chi Minh'}</span>
            </div>
            <div className='login-reg'>
            {isLoggedIn ? (
                <div className="taskbar-item user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                    <div className="user-info">
                        <img className="user-avatar" src={avatar} alt="User Avatar" />
                        <div className="welcome-container">
                            <span className="welcome-text">Welcome,</span>
                            <span className="user-name">{fullName}</span> {/* Display fullName */}
                        </div>
                    </div>
                    {showUserDropdown && (
                        <div className="user-dropdown">
                            <div className="user-dropdown-item" onClick={() => navigate('/user_information')}>Edit Profile</div>
                            <div className="user-dropdown-item" onClick={() => navigate('/feedback')}>Feedback</div>
                            <div className="user-dropdown-item" onClick={handleLogout}>Logout</div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="taskbar-item" onClick={() => navigate('/login')}>
                    <span className='login-content'>
                        <Icon icon="material-symbols:account-circle" className='login-icon'/>
                        <span className='login-text'>Login/ Sign up</span>
                    </span>
                </div>
            )}
            </div>
        </div>
    );
};

export default Taskbar;
