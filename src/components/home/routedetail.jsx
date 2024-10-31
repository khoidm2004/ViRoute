import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate} from 'react-router-dom';
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
        const busRoute = `${encodeURIComponent(start)}-${encodeURIComponent(destination)}`;
        navigate(`/${busRoute}`);
    };

    return (
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

                    {/* Departure box */}
                    <div className='departure-box'>
                        <Icon icon="mage:clock" className='departure-icon' />
                        <span className="departure-text">Departure now?</span>
                    </div>

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
        </div>
    );
};

export default RouteDetail;
