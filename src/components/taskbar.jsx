import React, { useState } from 'react';
import './Taskbar.css'; // Add styling as needed
import { Icon } from '@iconify/react';
const Taskbar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const handleClick = (item) => {}
  return (
    <div className="taskbar">
      <img className="logo" src="./images/ViRoute_white.png"/>
      <div className='taskbar-item'>
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
    </div>
  );
};
export default Taskbar;
