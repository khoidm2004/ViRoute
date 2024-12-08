import axios from 'axios';

const fetchBuses = async () => {
  try {
    const { data } = await axios.get(`https://test-production-1774.up.railway.app/api/bus_routes/`);
    console.log('Fetched bus data:', data);
    return data; // Array of bus objects
  } catch (error) {
    console.error('Error fetching buses:', error.response?.data || error.message);
    throw error;
  }
};

export default fetchBuses;
