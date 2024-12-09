import React, { useState, useParams} from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, Button } from '@mui/material';
import './routedetail.css';
import '../map/map.css';
import Map from '../map/map';

const RouteDetail = () => {
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState(today);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const { bus_start, bus_end } = useParams();
    const findBusRoute = () => {
        navigate(`/${encodeURIComponent(start)}-${encodeURIComponent(destination)}`);
    };

    const swapLocations = () => {
        setStart(destination);
        setDestination(start);
    };

    const toggleTimeDropdown = () => {
        setShowTimeDropdown(!showTimeDropdown);
    };
    
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };
    
    const handleDateInput = (event) => {
        setSelectedDate(event.target.value);
    };
    
    const confirmTimeSelection = () => {
        setShowTimeDropdown(false);
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

    return (
        <>
            <div className='route-detail-container'>
                <div className='sidebar'>
                    <div className='route-info'>
                        {/* Input boxes for start and destination */}
                        <div className='input-box'>
                            <Icon icon="material-symbols:search" className='icon-left' />
                            <input
                                type="text"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                placeholder="Enter your start"
                                className="input-route"
                            />
                            <Icon icon="material-symbols:swap-vert" className='icon-right' onClick={swapLocations} />
                        </div>

                        <div className='input-box'>
                            <Icon icon="material-symbols:search" className='icon-left' />
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Enter your destination"
                                className="input-route"
                            />
                        </div>

                        {/* Departure box */}
                        <div className="departure-option" onClick={toggleTimeDropdown}>
                            <Icon icon="mage:clock" className="option-icon" />
                            <span className="departure-text"> {getDisplayedTime()}</span>
                            </div>
                            {showTimeDropdown && (
                                <div className="dropdown-routedetails">
                                    <Select
                                    value={selectedTime || `Now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                                    onChange={handleTimeChange}
                                    displayEmpty
                                    className="routedetails-timeselect"
                                    >
                                    {getTimeOptions().map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                    </Select>
                                    
                                    <input
                                        type="date"
                                        value={selectedDate} 
                                        onChange={handleDateInput}
                                        className="routedetails-dateselect"
                                    />
                                    <Button variant="contained" onClick={confirmTimeSelection} class="confirm-button">Confirm</Button>
                                </div>
                            )}

                        {/* Scrollable list of route items */}
                        <div className='route-item'>Route Detail 1</div>
                        <div className="divider" />

                        <div className='route-item'>Route Detail 2</div>
                        <div className="divider" />

                        <div className='route-item'>Route Detail 3</div>
                        <div className="divider" />

                        <div className='route-item'>Route Detail 4</div>
                        <div className="divider" />

                        <div className='route-item'>Route Detail 5</div>
                    </div>
                </div>
                <Map className="map-routedetail"/>
            </div>
            <p>{decodeURIComponent(start)} - {decodeURIComponent(destination)}</p>
        </>
    );
};

export default RouteDetail;
