import React, { useState } from 'react';
import './homescreen.css';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';

const Homescreen = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const handleSwap = () => {
    const temp = start;
    setStart(destination);
    setDestination(temp);
  };

  return (
    <div className='home'>
      <div className='information'>
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
        <Icon
          icon="material-symbols:swap-vert"
          className='swap-icon'
          onClick={handleSwap}
        />
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
        <Button variant="contained" className="search-btn">Find</Button>
      </div>

      <div className='options'>
        <div className="departure-option">
          <Icon icon="mage:clock" className="option-icon" />
          <label htmlFor="departureNow">Departure now?</label>
        </div>
        <button className="favorite-btn">
          <Icon icon="ic:outline-plus" className="option-icon" />
          Add favourite place
        </button>
      </div>

      <div className="divider" />
    </div>
  );
};

export default Homescreen;
