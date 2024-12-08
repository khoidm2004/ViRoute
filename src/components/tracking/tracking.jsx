import React, { useState } from 'react'; 
import { Icon } from '@iconify/react';
import './tracking.css';
import '../map/map.css'; 
import Map from '../map/map';
import fetchImage from '../../services/fetchImage';

const Tracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [activeBus, setActiveBus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State for the image URL
  const [loadingImage, setLoadingImage] = useState(false); // State for loading indicator
  const [errorImage, setErrorImage] = useState(null); // State for error messages

  const buses = [
    { number: '01', route: 'Gia Lam Bus Station - Yen Nghia Bus Station' },
    { number: '2', route: 'Some route 2' },
    { number: '3', route: 'Some route 3' },
    { number: '4', route: 'Some route 4' },
    { number: '5', route: 'Some route 5' },
    { number: '10', route: 'Some route 10' },
    { number: '11', route: 'Some route 11' },
    { number: '100', route: 'Some route 100' },
    { number: '101', route: 'Some route 101' },
    { number: '102', route: 'Some route 102' }
  ];

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = buses.filter(bus => bus.number.includes(term));
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses([]);
    }
  };

  const handleBusClick = async (busNumber) => {
    if (activeBus === busNumber) {
      setActiveBus(null);
      setImageUrl(null); // Reset image on deselect
      setErrorImage(null);
      return;
    }

    setActiveBus(busNumber);
    setImageUrl(null);
    setErrorImage(null);
    setLoadingImage(true);

    try {
      const url = await fetchImage(busNumber);
      setImageUrl(url); // Update state with the fetched image URL
    } catch (error) {
      setErrorImage('Failed to load image.');
    } finally {
      setLoadingImage(false);
    }
  };

  const busesToDisplay = searchTerm ? filteredBuses : buses;

  return (
    <div className='tracking-container'>
      <div className='search-tracking'>
        <Icon icon="material-symbols:search" className='icon-bus-metro' />
        <input
          type="text"
          placeholder="Enter the bus/metro number"
          className="input-tracking"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {busesToDisplay.map((bus, index) => (
        <React.Fragment key={bus.number}>
          <div
            className={`tracking-item ${activeBus === bus.number ? 'active' : ''}`}
            onClick={() => handleBusClick(bus.number)}
          >
            Bus {bus.number}: {bus.route}
          </div>
          {activeBus === bus.number && (
            <div className="map-container-tracking active">
              {loadingImage ? (
                <p>Loading image...</p>
              ) : errorImage ? (
                <p className="error">{errorImage}</p>
              ) : imageUrl ? (
                <img src={imageUrl} alt={`Bus ${bus.number}`} className="bus-image" />
              ) : null}
            </div>
          )}
          {index < busesToDisplay.length - 1 && <div className="divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tracking;
