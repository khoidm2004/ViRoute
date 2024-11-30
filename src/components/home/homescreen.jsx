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

const Homescreen = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [startSelected, setStartSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [showFavouritePlace, setShowFavouritePlace] = useState(false);
  const [streetAddress, setStreetAddress] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [favouritePlaces, setFavouritePlaces] = useState([]);
  const [error, setError] = useState('');
  const startInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const user = authStore((state) => state.user);

  const findbusroute = () => {
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
    setFavouritePlaces([...favouritePlaces, { streetAddress, locationName, selectedIcon }]);
    setShowFavouritePlace(false);
    setStreetAddress('');
    setLocationName('');
    setSelectedIcon('');
    setError('');
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

  const deleteFavoritePlace = (index) => {
    setFavouritePlaces(favouritePlaces.filter((_, i) => i !== index));
  };

  const handlePlaceClick = (streetAddress) => {
    setStart(streetAddress);
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

  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const results = response.data.slice(0, 3); // Lấy 3 kết quả đầu tiên
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
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
          setStart(response.data.display_name);
        } catch (error) {
          console.error('Error fetching current location:', error);
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

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
      !event.target.closest('.suggestions-box') // Ngăn đóng khi nhấn vào danh sách gợi ý
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
    fetchSuggestions(value, setStartSuggestions);
  } else {
    setStartSuggestions([]); // Đóng gợi ý nếu input bị xóa
  }
};

const handleDestinationChange = (e) => {
  const value = e.target.value;
  setDestination(value);
  setDestinationSelected(false);
  if (value) {
    fetchSuggestions(value, setDestinationSuggestions);
  } else {
    setDestinationSuggestions([]); // Đóng gợi ý nếu input bị xóa
  }
};


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
                <Icon icon="eva:swap-fill" className="swap-icon" onClick={() => { setStart(destination); setDestination(start); }} />
              </div> 
              <div className="search-destination">
                <Icon icon="material-symbols:search" className="icon" />
                <input
                  type="text"
                  value={destination}
                  onChange={handleDestinationChange}
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
              <div className="departure-option" onClick={toggleTimeDropdown}>
                <Icon icon="mage:clock" className="option-icon" />
                <span className="departure-text">{getDisplayedTime()}</span>
              </div>

              {showTimeDropdown && (
                <div className="time-dropdown">
                  <Select
                    value={selectedTime || `Now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                    onChange={handleTimeChange}
                    displayEmpty
                    className="time-select"
                  >
                    {getTimeOptions().map((option, index) => (
                      <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  <TextField
                    type="date"
                    value={selectedDate}
                    onChange={handleDateInput}
                    className="date-select"
                  />
                  <Button variant="contained" onClick={confirmTimeSelection} class="confirm-button">Confirm</Button>
                </div>
              )}

              <button className="favorite-btn" onClick={toggleFavouritePlace}>
                <Icon icon="ic:outline-plus" className="option-icon" />
                <span className="addfav-text">Add favourite place</span>
              </button>
              {error && <div className="error-message">{error}</div>}
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
                  {error && <div className="error-message">{error}</div>}
                  <Button variant="contained" class="confirm-button" onClick={handleConfirmFavourite}>Confirm</Button>
                </div>
              )}  

              <div className="places-container">
                {favouritePlaces.map((place, index) => (
                  <div key={index} className="places-btn" onClick={() => handlePlaceClick(place.streetAddress)}>
                    <Icon icon={place.selectedIcon} className="place-icon" />
                    <div className="placetext-container">
                      <span className="location-name">{place.locationName}</span>
                      <span className="address-name">{place.streetAddress}</span>
                    </div>
                    <span className="delete-icon" onClick={(e) => { e.stopPropagation(); deleteFavoritePlace(index); }}>&times;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="location-info-section">
              <div className="location-left">
                <h2>Your location now</h2>
                <p>Your location now: {start || "Fetching location..."}</p>
                <p>Want to add your favourite place? <a href="/login">Login/Signup</a></p>
              </div>
                <Map className="map-container"/>  
          </div>
        </div>
        <Footer/>
    </>
  );
};

export default Homescreen;