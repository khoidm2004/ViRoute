import React from 'react';
import './homescreen.css';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Map from '../map/map.jsx';
import useHomescreenStore from '../../stores/homeStore';

const Homescreen = () => {
  const navigate = useNavigate();
  const { start, destination, setStart, setDestination, swapLocations } = useHomescreenStore();

  const findbusroute = () => {
    const busroute = `/${encodeURIComponent(start)}-${encodeURIComponent(destination)}`;
    navigate(busroute);
  };

  return (
    <>
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
          <Icon icon="eva:swap-fill" className='swap-icon' onClick={swapLocations} />
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
          <Button class="search-btn--find" type="button" onClick={findbusroute}>Find</Button>
        </div>
        <div className="departure-option">
          <Icon icon="mage:clock" className="option-icon" />
          <span className='departure-text'>Departure now?</span>
        </div>
        <button className="favorite-btn">
          <Icon icon="ic:outline-plus" className="option-icon" />
          <span className='addfav-text'>Add favourite place</span>
        </button>
        <div className="divider" />
      </div>
      <Map className="map-container"/>
    </>
  );
};

export default Homescreen;
