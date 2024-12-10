import React, { useState, useEffect } from 'react';
import './Taskbar.css';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserInformationStore from '../../stores/userinfoStore';
import authStore from '../../stores/authStore';

const Taskbar = () => {
    const user = authStore((state) => state.user);
    const { avatar} = useUserInformationStore(); 
    const [activeItem, setActiveItem] = useState('');
    const [showCities, setShowCities] = useState(false);
    const [cityCode, setCityCode] = useState('hn'); 
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const defaultAvatar = `../images/Default_avatar.png`;
    const userAvatar = user && user.avatar
      ? `https://test-production-1774.up.railway.app/media/${user.avatar}?t=${Date.now()}`
      : defaultAvatar;

    console.log("avatar in taskbar: ", userAvatar);
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
        authStore.getState().logout();
        setIsMobileMenuOpen(false);
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
                { user && (
                    <div className="mobile-menu-item user-info" onClick={() => { navigate(`/${user.userID}`); setIsMobileMenuOpen(false); }}>
                        <div className="user-info">
                            <img className="user-avatar" src={user.avatar ? userAvatar : defaultAvatar} alt="User Avatar" />
                            <div className="welcome-container">
                                <span className="welcome-text">Welcome,</span>
                                <span className="user-name">{user.fullName}</span>
                            </div>
                        </div>
                    </div>
                )}
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
                <div className="mobile-menu-item" onClick={ user ?  handleLogout : () => { navigate('/login'); setIsMobileMenuOpen(false); }}>
                    <span>{user ? 'Logout' : 'Login'}</span>
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
            <div className={`login-reg ${! user ? 'logged-out-bg' : ''}`}>
                { user ? (
                    <div className="taskbar-item user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                        <div className="user-info"> 
                            <img className="user-avatar" src={user.avatar ? userAvatar : defaultAvatar} alt="User Avatar" />
                            <div className="welcome-container">
                                <span className="welcome-text">Welcome,</span>
                                <span className="user-name">{user.fullName}</span>
                            </div>
                        </div>
                        {showUserDropdown && (
                            <div className="user-dropdown">
                                <div className="user-dropdown-item" onClick={() => navigate(`/user/${user.userID}`)}>Edit Profile</div>
                                <div className="user-dropdown-item" onClick={() => navigate('/feedback')}>Feedback</div>
                                <div className="user-dropdown-item" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="login-content" onClick={() => navigate('/login')}>
                        <img className="login-avatar" src={defaultAvatar} alt="User Avatar" />
                        <span className='login-text'>Log In</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Taskbar;
