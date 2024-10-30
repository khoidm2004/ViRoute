import React, { useState } from 'react';
import './homescreen.css';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Homescreen = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSwap = () => {
    const temp = start;
    setStart(destination);
    setDestination(temp);
  };

  const findbusroute = (start, destination) => {
    const busroute = `/${encodeURIComponent(start)}/${encodeURIComponent(destination)}`;
    navigate(busroute);
  };

  return (
    <div className='home'>
        <div className='information-container'>
          <div className="search">
            <Icon icon="material-symbols:search" className='icon' />
            <input
              type="text"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="Enter your start"
              className="search-input"
            />
          </div>
          <Icon icon="eva:swap-fill" className='swap-icon' onClick={handleSwap} />
          <div className="search">
            <Icon icon="material-symbols:search" className='icon' />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="search-input"
            />
          </div>
          <Button class="search-btn--find" type="button" onClick={() => findbusroute(start, destination)}>Find</Button>
        </div>
        <div className="options-container">
          <div className="departure-option">
            <Icon icon="mage:clock" className="option-icon" />
            <span className='departure-text'>Departure now?</span>
          </div>
          <button className="favorite-btn">
            <Icon icon="ic:outline-plus" className="option-icon" />
            <span className='addfav-text'>Add favourite place</span>
          </button>
        </div>
      <div className="divider" />
    </div>
  );
};

export default Homescreen;
