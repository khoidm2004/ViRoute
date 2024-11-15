import React, { useState, useEffect } from 'react';
import './Taskbar.css';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserInformationStore from '../../stores/userinfoStore';

const Taskbar = () => {
    const { avatar, fullName } = useUserInformationStore(); 
    const [activeItem, setActiveItem] = useState('');
    const [showCities, setShowCities] = useState(false);
    const [cityCode, setCityCode] = useState('hn'); 
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true); // Mobile menu toggle state
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
        setIsLoggedIn(false);
    };

    const handleCityChange = (code) => {
        setCityCode(code);
        setShowCities(false);
    };

    return (
        <div className="taskbar">
            <img className="logo" src="../images/ViRoute_white.png" alt="Logo" />
            {/* Hamburger Menu */}
            <div className='taskbar-menu' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Icon icon="mdi:menu" className="mobile-menu-icon" />
            </div>

            {/* Mobile Menu Items */}
            {isMobileMenuOpen && (
            <div className="mobile-menu">
                <div className="mobile-menu-item" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>
                    <span>Home</span>
                </div>
                <div className="mobile-menu-item" onClick={() => { navigate('/tracking'); setIsMobileMenuOpen(false); }}>
                    <span>Tracking</span>
                </div>
                <div className="mobile-menu-item" onClick={() => { navigate('/tickets'); setIsMobileMenuOpen(false); }}>
                    <span>Tickets</span>
                </div>
                <div className="mobile-menu-item" onClick={() => { navigate('/feedback'); setIsMobileMenuOpen(false); }}>
                    <span>Feedback</span>
                </div>

                {/* Change City Button */}
                <div className="mobile-menu-item" onClick={() => setShowCities(!showCities)}>
                    <span>Choose City</span>
                </div>

                {/* City Dropdown */}
                {showCities && (
                    <div className="city-dropdown-mobile">
                        {cities.map((city) => (
                            <div key={city.code} onClick={() => handleCityChange(city.code)} className="city-option">
                                {city.name}
                            </div>
                        ))}
                    </div>
                )}

                {/* Login/Signup or Logout */}
                <div className="mobile-menu-item" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>
                    <span>Login/Signup</span>
                </div>
            </div>
        )}

            {/* Full Taskbar for larger screens */}
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
            <div className={`login-reg ${!isLoggedIn ? 'logged-out-bg' : ''}`}>
                {isLoggedIn ? (
                    <div className="taskbar-item user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                        <div className="user-info"> 
                            <img className="user-avatar" src={avatar} alt="User Avatar" />
                            <div className="welcome-container">
                                <span className="welcome-text">Welcome,</span>
                                <span className="user-name">{fullName}</span>
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
                    <div className="login-content" onClick={() => navigate('/login')}>
                        <Icon icon="material-symbols:account-circle" className='login-icon'/>
                        <span className='login-text'>Login/ Sign up</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Taskbar;
