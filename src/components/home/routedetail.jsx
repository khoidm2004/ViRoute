import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import './routedetail.css';

const RouteDetail = () => {
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();
    const handleSwap = () => {
        const temp = start;
        setStart(destination);
        setDestination(temp);
    };
    const findBusRoute = () => {
        const busRoute = `${encodeURIComponent(start)}${encodeURIComponent(destination)}`;
        navigate(`/${busRoute}`); 
    };
    return (
        <div className='homescreen'>
            <div className='info'>
                <div className="search-field">
                    <Icon icon="material-symbols:search" className='icon' />
                    <input
                        type="text"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        placeholder="Enter your start"
                        className="input"
                    />
                </div>
                <Icon
                    icon="material-symbols:swap-vert"
                    className='swap-icon'
                    onClick={handleSwap}
                />
                <div className="search-field">
                    <Icon icon="material-symbols:search" className='icon' />
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter your destination"
                        className="input"
                    />
                </div>
            </div>
        </div>
    );
};

export default RouteDetail;
