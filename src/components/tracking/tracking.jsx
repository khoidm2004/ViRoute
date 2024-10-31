import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './tracking.css';

const Tracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBuses, setFilteredBuses] = useState([]);

  const buses = [
    { number: '1', route: 'Gia Lam Bus Station - Yen Nghia Bus Station' },
    { number: '2', route: 'Some route 2' },
    { number: '3', route: 'Some route 3' },
    { number: '4', route: 'Some route 4' },
    { number: '5', route: 'Some route 5' },
    { number: '10', route: 'Some route 10' },
    { number: '11', route: 'Some route 11' },
    { number: '100', route: 'Some route 100' },
    { number: '101', route: 'Some route 101' }
  ];

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = buses.filter(bus => bus.number.includes(term));
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses([]);
    }
  };

  const busesToDisplay = searchTerm ? filteredBuses : buses;

  return (
    <div className='tracking-container'>
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
          <div className='tracking-item'>Bus {bus.number}: {bus.route}</div>
          {index < busesToDisplay.length - 1 && <div className="divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tracking;