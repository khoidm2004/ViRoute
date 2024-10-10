import React, { useState } from 'react';
import './Taskbar.css'; // Add styling as needed
import { Icon } from '@iconify/react';
import {useNavigate} from 'react-router-dom';
const Taskbar = () => {
    const navigate = useNavigate();
    const loginClick = () => {
      navigate('/login');
    };
    const [activeItem, setActiveItem] = useState(null);
    const itemClick = (item) => {}
  return (
    <div className="taskbar">
      <img className="logo" src="./images/ViRoute.png"/>
      <div className='taskbar-item'>
        <Icon icon="ion:home" className='icon'/>
        <span className='icon-text'>Home</span>
      </div>
      <div className='taskbar-item'>
        <Icon icon="" className='icon'/>
      </div>
      <div className='taskbar-item login-reg' onClick={loginClick}>
        <span className='login-content'>
          <Icon icon="material-symbols:account-circle" className='login-icon'/>
          <span className='login-text'>Login/Sign up</span>
        </span>
      </div>
    </div>
  );
};
export default Taskbar;
