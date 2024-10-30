import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import './routedetail.css';

const RouteDetail = () => {
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();
    const { cityCode } = useParams();

    const handleSwap = () => {
        const temp = start;
        setStart(destination);
        setDestination(temp);
    };

    const findBusRoute = () => {
        const busRoute = `${encodeURIComponent(start)}${encodeURIComponent(destination)}`;
        navigate(`/${cityCode}/${busRoute}`);
    };

    return (
        <div className='route-detail-container'>
            <div className='sidebar'>
                <div className='route-info'>
                    <div className='input-box'>
                        <Icon icon="material-symbols:search" className='icon-left' />
                        <input
                            type="text"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            placeholder="Enter your start"
                            className="input-route"
                        />
                        <Icon icon="material-symbols:swap-vert" className='icon-right' onClick={handleSwap} />
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

                    <div className='departure-box'>
                        <Icon icon="mage:clock" className='departure-icon' />
                        <span className="departure-text">Departure now?</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteDetail;
