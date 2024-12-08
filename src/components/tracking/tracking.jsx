import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './tracking.css';
import '../map/map.css';
import fetchBuses from '../../services/fetchBus'; 
import fetchImage from '../../services/fetchImage';

const Tracking = () => {
  const [buses, setBuses] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [activeBus, setActiveBus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); 
  const [loadingImage, setLoadingImage] = useState(false); 
  const [errorImage, setErrorImage] = useState(null); 
  const [loadingBuses, setLoadingBuses] = useState(true); 
  const [errorBuses, setErrorBuses] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

 
  useEffect(() => {
    const loadBuses = async () => {
      try {
        const data = await fetchBuses(); 
        setBuses(data); 
      } catch (error) {
        setErrorBuses('Failed to load buses.');
      } finally {
        setLoadingBuses(false);
      }
    };

    loadBuses();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    if (term) {
      const filtered = buses.filter(bus => 
        bus.bus_Name.includes(term) || 
        bus.bus_start.toLowerCase().includes(term.toLowerCase()) || 
        bus.bus_end.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses([]); 
    }
  };
  

  const handleBusClick = async (bus_Name) => {
    if (activeBus === bus_Name) {
      setActiveBus(null);
      setImageUrl(null);
      setErrorImage(null);
      return;
    }

    setActiveBus(bus_Name);
    setImageUrl(null);
    setErrorImage(null);
    setLoadingImage(true);

    try {
      const url = await fetchImage(bus_Name);
      setImageUrl(url);
    } catch (error) {
      setErrorImage('Failed to load image.');
    } finally {
      setLoadingImage(false);
    }
  };

 
  const busesToDisplay = searchTerm ? filteredBuses : buses;

  const sortedBuses = busesToDisplay.sort((a, b) => {
    if (a.bus_Name < b.bus_Name) return -1;
    if (a.bus_Name > b.bus_Name) return 1;
    return 0;
  });


  const indexOfLastBus = currentPage * itemsPerPage;
  const indexOfFirstBus = indexOfLastBus - itemsPerPage;
  const currentBuses = sortedBuses.slice(indexOfFirstBus, indexOfLastBus);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedBuses.length / itemsPerPage);

  return (
    <div className='full-width-wrapper'>
    <div className='tracking-container'>
      {loadingBuses ? (
        <p>Loading buses...</p>
      ) : errorBuses ? (
        <p className="error">{errorBuses}</p>
      ) : (
        <>
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
          {currentBuses.map((bus, index) => (
            <React.Fragment key={bus.number}>
              <div
                className={`tracking-item ${activeBus === bus.bus_Name ? 'active' : ''}`}
                onClick={() => handleBusClick(bus.bus_Name)}
              >
                Bus {bus.bus_Name}: {bus.bus_start} - {bus.bus_end}
              </div>
              {activeBus === bus.bus_Name && (
                <div className="map-container-tracking active">
                  {loadingImage ? (
                    <p>Loading image...</p>
                  ) : errorImage ? (
                    <p className="error">{errorImage}</p>
                  ) : imageUrl ? (
                    <img src={imageUrl} alt={`Bus ${bus.bus_Name}`} className="bus-image" />
                  ) : null}
                </div>
              )}
              {index < currentBuses.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Tracking;
