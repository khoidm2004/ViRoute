import React, {useState} from 'react';
import { Icon } from '@iconify/react';
import { useNavigate} from 'react-router-dom';
const RouteDetail = () => {
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();
    const findbusroute = () => {
        navigate('')
    };
    return (
      <div>
        <div className='information'>
          <div className="search">
            <Icon icon="material-symbols:search" className='icon' />
            <input
              type="text"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="Enter your start"
              className="search-input"
            />
          </div>
          <Icon
            icon="material-symbols:swap-vert"
            className='swap-icon'
            onClick={handleSwap}
          />
          <div className="search">
            <Icon icon="material-symbols:search" className='icon' />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="search-input"
            />
          </div>
        </div>
      </div>
    );
};

export default RouteDetail;