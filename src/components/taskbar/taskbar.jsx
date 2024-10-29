import React, { useState, useEffect } from 'react';
import './Taskbar.css'; 
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';

const Taskbar = () => {
    const [activeItem, setActiveItem] = useState('');
    const [showCities, setShowCities] = useState(false);
    const [cityCode, setCityCode] = useState('hn'); // Default city set to Hanoi
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname.split('/').slice(2).join('/');
    const cities = [
        { code: 'hcm', name: 'Ho Chi Minh' },
        { code: 'hn', name: 'Hanoi' },
    ];
    useEffect(() => {
        // Set default route if no specific path is defined
        if (location.pathname === '/') {
            navigate('/hn/tracking');
        } else if (location.pathname.startsWith('/hn')) {
            setCityCode('hn');
        } else if (location.pathname.startsWith('/hcm')) {
            setCityCode('hcm');
        }
        // Set active item based on route
        if (location.pathname.endsWith('/tracking')) setActiveItem('Tracking');
        else if (location.pathname.endsWith('/tickets')) setActiveItem('Tickets');
        else if (location.pathname.endsWith('/feedback')) setActiveItem('Feedback');
        else setActiveItem('Home');
    }, [location.pathname, navigate]);
    const handleCityChange = (code) => {
        setCityCode(code);
        setShowCities(false);
        navigate(`/${code}/${currentRoute}`);
    };
    return (
        <div className="taskbar">
            <img className="logo" src="../images/ViRoute_white.png" alt="Logo" />
            <div className={`taskbar-item ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => navigate(`/${cityCode}/`)}>
                <Icon icon="subway:home-1" className='icon' />
                <span className='icon-text'>Home</span>
            </div>
            <div className={`taskbar-item ${activeItem === 'Tracking' ? 'active' : ''}`} onClick={() => navigate(`/${cityCode}/tracking`)}>
                <Icon icon="mdi:sign-direction-plus" className='icon' />
                <span className='icon-text'>Tracking</span>
            </div>
            <div className={`taskbar-item ${activeItem === 'Tickets' ? 'active' : ''}`} onClick={() => navigate(`/${cityCode}/tickets`)}>
                <Icon icon="heroicons:ticket-solid" className='icon'/>
                <span className='icon-text'>Tickets</span>
            </div>
            <div className={`taskbar-item ${activeItem === 'Feedback' ? 'active' : ''}`} onClick={() => navigate(`/${cityCode}/feedback`)}>
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
            <div className='taskbar-item login-reg' onClick={() => navigate(`/login`)}>
                <span className='login-content'>
                    <Icon icon="material-symbols:account-circle" className='login-icon'/>
                    <span className='login-text'>Login/ Sign up</span>
                </span>
                <img className="logo" src="../images/Green_background.png" alt="Login Background"/>
            </div>
        </div>
    );
};

export default Taskbar;
