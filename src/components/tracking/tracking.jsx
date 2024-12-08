import React, { useState } from 'react'; 
import { Icon } from '@iconify/react';
import './tracking.css';
import '../map/map.css'; 
import Map from '../map/map';
import fetchImage from '../../services/fetchImage';
import Footer from '../footer/footer.jsx';

const Tracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [activeBus, setActiveBus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageUrl, setImageUrl] = useState(null); // State for the image URL
  const [loadingImage, setLoadingImage] = useState(false); // State for loading indicator
  const [errorImage, setErrorImage] = useState(null); // State for error messages

  const buses = [
    { number: '01', route: 'Gia Lam Bus Station - Yen Nghia Bus Station' },
    { number: '2', route: 'Some route 2' },
    { number: '3', route: 'Some route 3' },
    { number: '4', route: 'Some route 4' },
    { number: '5', route: 'Some route 5' },
    { number: '6', route: 'Some route 6' },
    { number: '7', route: 'Some route 7' },
    { number: '8', route: 'Some route 8' },
    { number: '9', route: 'Some route 9' },
    { number: '10', route: 'Some route 10' },
    { number: '11', route: 'Some route 11' },
    { number: '12', route: 'Some route 12' },
    { number: '13', route: 'Some route 13' },
    { number: '14', route: 'Some route 14' },
    { number: '15', route: 'Some route 15' },
    { number: '16', route: 'Some route 16' },
    { number: '17', route: 'Some route 17' },
    { number: '18', route: 'Some route 18' },
    { number: '19', route: 'Some route 19' },
    { number: '20', route: 'Some route 20' },
    { number: '100', route: 'Some route 100' },
    { number: '101', route: 'Some route 101' },
    { number: '102', route: 'Some route 102' }
  ];

  const ITEMS_PER_PAGE = 10;

  // Filter and paginate buses
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
    if (term) {
      const filtered = buses.filter(bus => bus.number.includes(term));
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses([]);
    }
  };

  const handleBusClick = async (busNumber) => {
    if (activeBus === busNumber) {
      setActiveBus(null);
      setImageUrl(null); // Reset image on deselect
      setErrorImage(null);
      return;
    }

    setActiveBus(busNumber);
    setImageUrl(null);
    setErrorImage(null);
    setLoadingImage(true);

    try {
      const url = await fetchImage(busNumber);
      setImageUrl(url); // Update state with the fetched image URL
    } catch (error) {
      setErrorImage('Failed to load image.');
    } finally {
      setLoadingImage(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const busesToDisplay = searchTerm ? filteredBuses : buses;
  const totalPages = Math.ceil(busesToDisplay.length / ITEMS_PER_PAGE);
  const paginatedBuses = busesToDisplay.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
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
      {paginatedBuses.map((bus, index) => (
        <React.Fragment key={bus.number}>
          <div
            className={`tracking-item ${activeBus === bus.number ? 'active' : ''}`}
            onClick={() => handleBusClick(bus.number)}
          >
            Bus {bus.number}: {bus.route}
          </div>
          {activeBus === bus.number && (
            <div className="map-container-tracking-wrapper">
              {loadingImage ? (
                <p>Loading image...</p>
              ) : errorImage ? (
                <p className="error">{errorImage}</p>
              ) : imageUrl ? (
                <img src={imageUrl} alt={`Bus ${bus.number}`} className="bus-image" />
              ) : null}
            </div>
          )}
          {index < paginatedBuses.length - 1 && <div className="divider" />}
        </React.Fragment>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button
          className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First page
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last page
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Tracking;
