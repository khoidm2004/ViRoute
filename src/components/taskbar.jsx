import React, { useState } from 'react';
import './Taskbar.css'; // Add styling as needed
import { Icon } from '@iconify/react';
const Taskbar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const handleClick = (item) => {}
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
    </div>
  );
};
export default Taskbar;
