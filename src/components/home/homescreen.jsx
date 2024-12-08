import React, { useState, useEffect, useRef } from 'react';
import './homescreen.css';
import { Icon } from '@iconify/react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer.jsx';
import Map from '../map/map.jsx';
import authStore from '../../stores/authStore';
import axios from 'axios';
import Taskbar from '../taskbar/taskbar.jsx';
import useUserInformationStore from '../../stores/userinfoStore';

const Homescreen = () => {
  const { favouritePlaces, addFavouritePlace, deleteFavoritePlace } = useUserInformationStore();
  const navigate = useNavigate();
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [startSelected, setStartSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [searchError, setSearchError] = useState('');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [showFavouritePlace, setShowFavouritePlace] = useState(false);
  const [streetAddress, setStreetAddress] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [error, setError] = useState('');
  const startInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const user = authStore((state) => state.user);

  const findbusroute = () => {
    if (!start || !destination) {
      setSearchError('Please fill in both start and destination');
      return;
    }
    setSearchError(''); 
    const busroute = `/route/${encodeURIComponent(start)}-${encodeURIComponent(destination)}`;
    navigate(busroute);
  };

  const toggleTimeDropdown = () => {
    setShowTimeDropdown(!showTimeDropdown);
  };

  const handleTimeChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedTime(selectedOption);
  };

  const handleDateInput = (event) => {
    const inputDate = event.target.value;
    setSelectedDate(inputDate);
  };

  const confirmTimeSelection = () => {
    setShowTimeDropdown(false);
  };

  const toggleFavouritePlace = () => {
    if (!user) {
      setError('You have to log in to use this function');
      return;
    }
    setShowFavouritePlace(!showFavouritePlace);
  };

  const handleConfirmFavourite = () => {
    if (!streetAddress || !locationName || !selectedIcon) {
      setError('Please fill in all fields and select an icon');
      return;
    }

    const newPlace = {
      streetAddress,
      locationName,
      selectedIcon,
    };

    const { favouritePlaces, error: addError } = useUserInformationStore.getState();
  
    useUserInformationStore.getState().addFavouritePlace(newPlace);

    if (addError) {
      setError(addError === 'Duplicate name or address'
        ? 'The address or name has already been used.'
        : 'An unexpected error occurred.');
      return;
    }

    addFavouritePlace(newPlace);
    setStreetAddress('');
    setLocationName('');
    setSelectedIcon('');
    setError('');
    setShowFavouritePlace(false);
  };

  const getTimeOptions = () => {
    const now = new Date();
    const options = [];
    const isToday = selectedDate === today;
    let startHour = 0;

    if (isToday) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      options.push({ label: `Now (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`, value: 'Now' });
      startHour = Math.floor(currentMinutes / 15) * 15 + 15;
    }

    for (let minutes = startHour; minutes < 24 * 60; minutes += 15) {
      const optionTime = new Date(selectedDate);
      optionTime.setHours(0, minutes, 0, 0);
      const label = optionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      options.push({ label, value: label });
    }

    return options;
  };

  const handlePlaceClick = (streetAddress) => {
    setStart(streetAddress);
  };

  const handleAddPlace = (place) => {
    addFavouritePlace(place); 
  };

  const getDisplayedTime = () => {
    const isToday = selectedDate === today;
    if (selectedTime === 'Now') {
      return `Now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    } else if (selectedTime && isToday) {
      return `${selectedTime} (Today)`;
    } else if (selectedTime) {
      return `${selectedTime} (${new Date(selectedDate).toLocaleDateString()})`;
    }
    return `Departure now? (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
  };

  const fetchSuggestions = async (query, setSuggestions, isDestination = false) => {
    try {
      if (!query && !isDestination) {
        setSuggestions([]);
        return;
      }
  
      const { data } = await axios.get("https://test-production-1774.up.railway.app/api/bus_routes/");
      const uniquePlaces = new Set();
      const results = [];
  
      if (isDestination && start) {
        // Lọc những điểm đến phù hợp với điểm xuất phát đã chọn
        data.forEach((item) => {
          if (item.bus_start.toLowerCase() === start.toLowerCase() && !uniquePlaces.has(item.bus_end)) {
            results.push({ place_id: `${item.bus_id}_end`, display_name: item.bus_end });
            uniquePlaces.add(item.bus_end);
          }
        });
      } else {
        // Tìm kiếm thông thường cho cả điểm đi và điểm đến
        data.forEach((item) => {
          if (item.bus_start.toLowerCase().includes(query.toLowerCase()) && !uniquePlaces.has(item.bus_start)) {
            results.push({ place_id: `${item.bus_id}_start`, display_name: item.bus_start });
            uniquePlaces.add(item.bus_start);
          }
          if (item.bus_end.toLowerCase().includes(query.toLowerCase()) && !uniquePlaces.has(item.bus_end)) {
            results.push({ place_id: `${item.bus_id}_end`, display_name: item.bus_end });
            uniquePlaces.add(item.bus_end);
          }
        });
      }
  
      if (results.length > 0) {
        setSuggestions(results.slice(0, 5));
      } else {
        setSuggestions([{ place_id: 'no_match', display_name: 'No matched finding' }]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error.response?.data || error.message);
    }
  };  
  
  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          setCurrentLocation(response.data.display_name);
        } catch (error) {
          console.error('Error fetching current location:', error);
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchSuggestions(start, setStartSuggestions);
  }, [start]);

  useEffect(() => {
    fetchSuggestions(destination, setDestinationSuggestions);
  }, [destination]);

  const handleClickOutside = (event) => {
    if (
      (!startInputRef.current || !startInputRef.current.contains(event.target)) &&
      (!destinationInputRef.current || !destinationInputRef.current.contains(event.target)) &&
      !event.target.closest('.suggestions-box') 
    ) {
      setStartSuggestions([]);
      setDestinationSuggestions([]);
    }
  };
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const handleStartChange = (e) => {
  const value = e.target.value;
  setStart(value);
  setStartSelected(false);
  if (value) {
    fetchSuggestions(value, setStartSuggestions, true);
  } else if (destination) {
    fetchSuggestions('', setStartSuggestions, true);
  } else {
    setStartSuggestions([]);
  }
};

const handleDestinationChange = (e) => {
  const value = e.target.value;
  setDestination(value);
  setDestinationSelected(false);
  if (value) {
    fetchSuggestions(value, setDestinationSuggestions, true);
  } else if (start) {
    fetchSuggestions('', setDestinationSuggestions, true);
  } else {
    setDestinationSuggestions([]);
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

              <div className="search-start">
                <Icon icon="material-symbols:search" className="icon" />
                <input
                type="text"
                value={start}
                onChange={handleStartChange}
                onFocus={() => {
                  if (destination) {
                    fetchSuggestions('', setStartSuggestions, true);
                  }
                }}
                placeholder="Enter your start"
                className="search-input"
                ref={startInputRef}
              />
              {!startSelected && startSuggestions.length > 0 && (
                <div className="suggestions-box">
                  <ul className="suggestions-list">
                    {startSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        onClick={() => {
                          if (suggestion.place_id !== 'no_match') {
                            setStart(suggestion.display_name);
                            setStartSuggestions([]);
                            setStartSelected(true);
                          }
                        }}
                        className={suggestion.place_id === 'no_match' ? 'no-match' : ''}
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
              <div className="swap-container">
                <Icon icon="eva:swap-fill" className="swap-icon" onClick={() => { setStart(destination); setDestination(start); }} />
              </div> 
              <div className="search-destination">
                <Icon icon="material-symbols:search" className="icon" />
                <input
                  type="text"
                  value={destination}
                  onChange={handleDestinationChange}
                  onFocus={() => {
                    if (start) {
                      fetchSuggestions('', setDestinationSuggestions, true);
                    }
                  }}
                  placeholder="Enter your destination"
                  className="search-input"
                  ref={destinationInputRef}
                />
                {!destinationSelected && destinationSuggestions.length > 0 && (
                  <div className="suggestions-box">
                    <ul className="suggestions-list">
                      {destinationSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.place_id}
                          onClick={() => {
                            if (suggestion.place_id !== 'no_match') {
                              setDestination(suggestion.display_name);
                              setDestinationSuggestions([]);
                              setDestinationSelected(true);
                            }
                          }}
                          className={suggestion.place_id === 'no_match' ? 'no-match' : ''}
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
              //file time.js
              <button className="favorite-btn" onClick={toggleFavouritePlace}>
                <Icon icon="ic:outline-plus" className="option-icon" />
                <span className="addfav-text">Add favourite place</span>
              </button>
              {showFavouritePlace && (
                <div className="favourite-form">
                  <TextField
                    placeholder="Street address or place name"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="fav-input"
                  />
                  <TextField
                    placeholder="Name your location"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="fav-input"
                  />
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
                  <Button variant="contained" class="confirm-button" onClick={handleConfirmFavourite}>Confirm</Button>
                  {error && <div className="error-message">{error}</div>}
                </div>
              )}  
            {user && (
              <div className="places-container">
                {favouritePlaces.map((place, index) => (
                  <div key={index} className="places-btn" onClick={() => handlePlaceClick(place.streetAddress)}>
                    {place.selectedIcon &&<Icon icon={place.selectedIcon} className="place-icon" />}
                    <div className="placetext-container">
                      {place.locationName &&<span className="location-name">{place.locationName}</span>}
                      {place.streetAddress && <span className="address-name">{place.streetAddress}</span>}
                    </div>
                    <span className="delete-icon" onClick={(e) => { e.stopPropagation(); deleteFavoritePlace(index); }}>&times;</span>
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>

          <div className="location-info-section">
              <div className="location-left">
                <h2>Your location now</h2>
                <p>Your location now: {currentLocation || "Fetching location..."}</p>
                <p>Want to add your favourite place? <a href="/login">Login/Signup</a></p>
              </div>
                <Map className="map-container"/>  
          </div>
        </div>        
    </>
  );
};

export default Homescreen;