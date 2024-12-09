import React, { useState, useEffect, useRef } from 'react';
import './homescreen.css';
import { Icon } from '@iconify/react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Map from '../map/map.jsx';
import authStore from '../../stores/authStore';
import axios from 'axios';
import useUserInformationStore from '../../stores/userinfoStore';
import fetchBuses from '../../services/fetchBus.js';

const Homescreen = () => {
  const { favouritePlaces, addFavouritePlace, deleteFavoritePlace } = useUserInformationStore();
  const navigate = useNavigate();
  const [bus_start, setStart] = useState('');
  const [bus_end, setDestination] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [startSelected, setStartSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [favouriteSuggestions, setFavouriteSuggestions] = useState([]);
  const favouriteInputRef = useRef(null);
  const [searchError, setSearchError] = useState('');
  const [showFavouritePlace, setShowFavouritePlace] = useState(false);
  const [streetAddress, setStreetAddress] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [error, setError] = useState('');
  const startInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const [buses, setBuses] = useState([]);
  const user = authStore((state) => state.user);
  useEffect(() => {
    console.log('Start Suggestions:', startSuggestions);    
    fetchCurrentLocation();
    fetchBusData();
    if (buses.length > 0) {
      fetchFavouriteSuggestions('', setFavouriteSuggestions);
    };
  }, [startSuggestions],[buses]); 
  

  const fetchBusData = async () => {
    try {
      const busData = await fetchBuses();
      setBuses(busData);  
    } catch (err) {
      setError('Failed to fetch bus data');
      console.error(err);
    }
  };

  const findbusroute = () => {
    const isStartValid = buses.some(bus => bus.bus_start.toLowerCase() === bus_start.toLowerCase());
    const isDestinationValid = buses.some(bus => bus.bus_end.toLowerCase() === bus_end.toLowerCase());
  
    if (!isStartValid && !isDestinationValid) { // Ensure at least one input is valid
      setSearchError('You must select at least a valid start or destination from the available options');
      return;
    }
  
    setSearchError('');
    const start = encodeURIComponent(bus_start || 'unknown');
    const end = encodeURIComponent(bus_end || 'unknown');
    navigate(`/route/${start}-${end}`);
  };
  

  const handleInputChange = (e, setField, setSuggestions, field, setSelected) => {
    const value = e.target.value;
    console.log('Input changed to:', value);
    setField(value);
    setSelected(false);
    if (value.trim() === '') {
      setSuggestions([]);
  } else {
      fetchSuggestions(value, setSuggestions, field);
  }
  };
  const handleFavouriteChange = (e) => {
    const value = e.target.value;
    setLocationName(value);
    fetchFavouriteSuggestions(value, setFavouriteSuggestions); 
  };

  const toggleFavouritePlace = () => {
    if (!user) {
      setError('You have to log in to use this function');
      return;
    }
    setShowFavouritePlace(!showFavouritePlace);
  };

  const handleConfirmFavourite = () => {
    // Validate if the location name exists in bus_start or bus_end
    const isValidLocation = buses.some(
      (bus) => bus.bus_start.toLowerCase() === locationName.toLowerCase() || bus.bus_end.toLowerCase() === locationName.toLowerCase()
    );
  
    if (!locationName || !selectedIcon) {
      setError('Please fill in all fields and select an icon');
      return;
    }
  
    if (!isValidLocation) {
      setError('The location must be a valid bus start or bus end location');
      return;
    }
  
    const newPlace = {
      locationName,
      selectedIcon,
    };
  
    const { favouritePlaces, error: addError } = useUserInformationStore.getState();
  
    if (addError) {
      setError(
        addError === 'Duplicate name or address'
          ? 'The address or name has already been used.'
          : 'An unexpected error occurred.'
      );
      return;
    }
  
    addFavouritePlace(newPlace);
    setLocationName('');
    setSelectedIcon('');
    setError('');
    setShowFavouritePlace(false);
  };
  
  

  const handlePlaceClick = (place) => {
    setLocationName(place.locationName);
  };

  const handleAddPlace = (place) => {
    addFavouritePlace(place); 
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = (query, setSuggestions, field) => {
    console.log(`Fetching suggestions for: ${query}`);
    if (!query.trim()) {
      setSuggestions([]); 
      return;
    }
  
    const uniqueSuggestions = new Set();
    const results = [];
  
    buses.forEach((bus) => {
      if (field === 'bus_start' && bus.bus_start.toLowerCase().includes(query.toLowerCase())) {
        if (!uniqueSuggestions.has(bus.bus_start)) {
          uniqueSuggestions.add(bus.bus_start);
          results.push({ display_name: bus.bus_start });
        }
      } else if (field === 'bus_end' && bus.bus_end.toLowerCase().includes(query.toLowerCase())) {
        if (!uniqueSuggestions.has(bus.bus_end)) {
          uniqueSuggestions.add(bus.bus_end);
          results.push({ display_name: bus.bus_end });
        }
      }
    });
  
    console.log('Suggestions:', results);
    setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
  };
  
  
  const debouncedFetchSuggestions = useRef(debounce(fetchSuggestions, 300)).current;

  const fetchFavouriteSuggestions = async (query, setSuggestions) => {
    try {
      if (!Array.isArray(buses) || buses.length === 0) {
        console.log('Bus data is not available yet.');
        setSuggestions([]); // Clear suggestions if buses data is not ready
        return;
      }
  
      if (!query) {
        setSuggestions([]);
        return;
      }
  
      const uniquePlaces = new Set();
      const results = [];
  
      buses.forEach((item) => {
        if (item.bus_start.toLowerCase().includes(query.toLowerCase()) && !uniquePlaces.has(item.bus_start)) {
          results.push({ place_id: `${item.bus_id}_start`, display_name: item.bus_start });
          uniquePlaces.add(item.bus_start);
        }
        if (item.bus_end.toLowerCase().includes(query.toLowerCase()) && !uniquePlaces.has(item.bus_end)) {
          results.push({ place_id: `${item.bus_id}_end`, display_name: item.bus_end });
          uniquePlaces.add(item.bus_end);
        }
      });
  
      if (results.length > 0) {
        setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
      } else {
        setSuggestions([]); // No matches found
      }
    } catch (error) {
      console.error('Error fetching favourite suggestions:', error);
    }
  };
  

  useEffect(() => {
    fetchFavouriteSuggestions('', setFavouriteSuggestions);
    setStreetAddress('');
    setLocationName('');
    setSelectedIcon('');
  }, []);

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          setCurrentLocation(response.data.display_name);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <>
      <div className="home">
          <div className="pics-homescreen">
            <img src="../images/Train_home.jpg" alt="Train-home" className="image" />
            <div className="homescreen-optioncontainer">
              
              <h1 className="homescreen-title">Where do you want to go?</h1>
              <div className="information-container">

              {/* Start Search */}
              <div className="search-start">
                <Icon icon="material-symbols:search" className="icon" />
                <input
                  type="text"
                  value={bus_start}
                  onChange={(e) => handleInputChange(e, setStart, setStartSuggestions, 'bus_start', setStartSelected)}
                  placeholder="Enter your start"
                  className="search-input"
                  ref={startInputRef}
                />
                {startSuggestions.length > 0 && !startSelected && (
                  <div className="suggestions-box">
                    <ul className="suggestions-list">
                      {startSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setStart(suggestion.display_name);
                            setStartSuggestions([]);
                            setStartSelected(true);
                          }}
                        >
                          {suggestion.display_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="swap-container">
                <Icon icon="eva:swap-fill" className="swap-icon" onClick={() => { setStart(bus_start); setDestination(bus_end); }} />
              </div>  
              <div className="search-destination">
                <Icon icon="material-symbols:search" className="icon" />
                <input
                  type="text"
                  value={bus_end}
                  onChange={(e) => handleInputChange(e, setDestination, setDestinationSuggestions, 'bus_end', setDestinationSelected)}
                  placeholder="Enter your destination"
                  className="search-input"
                  ref={destinationInputRef}
                />
                {destinationSuggestions.length > 0 && !destinationSelected && (
                  <div className="suggestions-box">
                    <ul className="suggestions-list">
                      {destinationSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setDestination(suggestion.display_name);
                            setDestinationSuggestions([]);
                            setDestinationSelected(true);
                          }}
                        >
                          {suggestion.display_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

                <Button class="search-btn--find" type="button" onClick={findbusroute}>Find</Button>
              </div>
              {searchError && <div className="error-message">{searchError}</div>}

              <button className="favorite-btn" onClick={toggleFavouritePlace}>
                <Icon icon="ic:outline-plus" className="option-icon" />
                <span className="addfav-text">Add favourite place</span>
              </button>

              {showFavouritePlace && (
                <div className="favourite-form">
                  <div className="fav-box">
                    <input
                      placeholder="Name your location"
                      value={locationName}
                      onChange={(e) => handleFavouriteChange(e)}
                      fullWidth
                      margin="normal"
                      className="fav-input"
                    />
                    {favouriteSuggestions.length > 0 && (
                      <div className="suggestions-box-fav">
                        <ul className="suggestions-list-fav">
                          {favouriteSuggestions.map((suggestion) => (
                            <li
                              key={suggestion.place_id}
                              onClick={() => {
                                setLocationName(suggestion.display_name);
                                setFavouriteSuggestions([]);
                              }}
                            >
                              {suggestion.display_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="icon-selection">
                    <span style={{ textAlign: 'left' }}>Select an icon</span>
                    <div className="addfav-icons">
                      <Icon
                        icon="mdi:home"
                        onClick={() => setSelectedIcon('mdi:home')}
                        className={selectedIcon === 'mdi:home' ? 'icon-selected' : ''}
                      />
                      <Icon
                        icon="mdi:work"
                        onClick={() => setSelectedIcon('mdi:work')}
                        className={selectedIcon === 'mdi:work' ? 'icon-selected' : ''}
                      />
                      <Icon
                        icon="mdi:school"
                        onClick={() => setSelectedIcon('mdi:school')}
                        className={selectedIcon === 'mdi:school' ? 'icon-selected' : ''}
                      />
                    </div>
                  </div>
                  <Button variant="contained" className="confirm-button" onClick={handleConfirmFavourite}>Confirm</Button>
                </div>
              )}


            {user && (
              <div className="places-container">
              {favouritePlaces.map((place, index) => (
                <div key={index} className="places-btn" onClick={() => handlePlaceClick(place.streetAddress)}>
                  {place.selectedIcon && <Icon icon={place.selectedIcon} className="place-icon" />}
                  <div className="placetext-container">
                    {place.locationName && <span className="location-name">{place.locationName}</span>}
                    {/* Removed the address-name rendering */}
                  </div>
                  <span className="delete-icon" onClick={(e) => { e.stopPropagation(); deleteFavoritePlace(index); }}>&times;</span>
                </div>
              ))}
            </div>
            
            )}
            {error && <div className="error-message">{error}</div>}
            </div>
          </div>

          <div className="location-info-section">
            <div className="location-left">
              <h2>Your location now</h2>
              <p>Your location now: {currentLocation || "Fetching location..."}</p>
              {user ? (
                <p>Hello <a>{user.fullName}</a>, have a nice day!</p>
              ) : (
                <p>Want to add your favourite place? <a href="/login">Login/Signup</a></p>
              )}
            </div>
            <Map className="map-container"/>  
          </div>
        </div>        
    </>
  );
};

export default Homescreen;
