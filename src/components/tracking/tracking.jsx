import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './tracking.css';
import '../map/map.css';
import Map from '../map/map';
import fetchBuses from '../../services/fetchBus'; // Import fetchBuses
import fetchImage from '../../services/fetchImage';

const Tracking = () => {
  const [buses, setBuses] = useState([]); // State for bus data
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [activeBus, setActiveBus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State for the image URL
  const [loadingImage, setLoadingImage] = useState(false); // State for loading indicator
  const [errorImage, setErrorImage] = useState(null); // State for error messages
  const [loadingBuses, setLoadingBuses] = useState(true); // State for bus loading
  const [errorBuses, setErrorBuses] = useState(null); // State for bus error

  // Fetch buses on component mount
  useEffect(() => {
    const loadBuses = async () => {
      try {
        const data = await fetchBuses(); // Fetch bus data
        setBuses(data); // Update state with fetched buses
      } catch (error) {
        setErrorBuses('Failed to load buses.');
      } finally {
        setLoadingBuses(false);
      }
    };

    loadBuses();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = buses.filter(bus => bus.bus_Name.includes(term));
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses([]);
    }
  };

  const handleBusClick = async (bus_Name) => {
    if (activeBus === bus_Name) {
      setActiveBus(null);
      setImageUrl(null); // Reset image on deselect
      setErrorImage(null);
      return;
    }

    setActiveBus(bus_Name);
    setImageUrl(null);
    setErrorImage(null);
    setLoadingImage(true);

    try {
      const url = await fetchImage(bus_Name);
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
      {loadingBuses ? (
        <p>Loading buses...</p>
      ) : errorBuses ? (
        <p className="error">{errorBuses}</p>
      ) : (
        <>
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
                className={`tracking-item ${activeBus === bus.bus_Name ? 'active' : ''}`}
                onClick={() => handleBusClick(bus.bus_Name)}
              >
                Bus {bus.bus_Name}: {bus.bus_start} - {bus.bus_end}
              </div>
              {activeBus === bus.bus_Name && (
                <div className="map-container-tracking active">
                  {loadingImage ? (
                    <p>Loading image...</p>
                  ) : errorImage ? (
                    <p className="error">{errorImage}</p>
                  ) : imageUrl ? (
                    <img src={imageUrl} alt={`Bus ${bus.bus_Name}`} className="bus-image" />
                  ) : null}
                </div>
              )}
              {index < busesToDisplay.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default Tracking;
