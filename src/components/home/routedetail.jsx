import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import './routedetail.css';
import '../map/map.css';
import Map from '../map/map';
import useRouteStore from '../../stores/routeStore';

const RouteDetail = () => {
    const navigate = useNavigate();
    const { start, destination, setStart, setDestination, swapLocations } = useRouteStore();

    const findBusRoute = () => {
        const busRoute = `${encodeURIComponent(start)}-${encodeURIComponent(destination)}`;
        navigate(`/${busRoute}`);
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
                <Map className="map-routedetail"/>
            </div>
            
        </>
    );
};

export default RouteDetail;