import React, { useState } from 'react';
import './Taskbar.css'; 
import { Icon } from '@iconify/react';
import {useNavigate} from 'react-router-dom';
const Taskbar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const login= () => {
      navigate('/login');
    };
    const home =() => {
      setActiveItem('home');
      navigate('/');
    };
  return (
    <div className="taskbar">
      <img className="logo" src="./images/ViRoute_white.png"/>
      <div className={`taskbar-item ${activeItem === 'Home' ? 'active' : ''}`}
        onClick={home} >
        <Icon icon="subway:home-1" className='icon' />
        <span className='icon-text'>Home</span>
      </div>
      <div className='taskbar-item'>
        <Icon icon="mdi:sign-direction-plus" className='icon'/>
        <span className='icon-text'>Tracking</span>
      </div>
      <div className='taskbar-item'>
        <Icon icon="heroicons:ticket-solid" className='icon'/>
        <span className='icon-text'>Tickets</span>
      </div>
      <div className='taskbar-item'>
        <Icon icon="majesticons:phone" className='icon'/>
        <span className='icon-text'>Feedback</span>
      </div>
      <div className='taskbar-item'>
        <Icon icon="icon-park-outline:change" className='icon'/>
        <span className='icon-text'>Change city</span>
      </div>
      <div className='city-text'>
        <span className='city-text'>Hanoi</span>
      </div>
      <div className='taskbar-item login-reg' onClick={login}>
        <span className='login-content'>
          <Icon icon="material-symbols:account-circle" className='login-icon'/>
          <span className='login-text'>Login/ Sign up</span>
        </span>
        <img className="logo" src="./images/Green_background.png"/>
      </div>
    </div>
  );
};
export default Taskbar;
