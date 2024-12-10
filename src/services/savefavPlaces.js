import axios from 'axios';

const saveFavPlace = async (place) => {
  try {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No token found, please login first.');
      return;
    }

    const response = await axios.post(
      'https://test-production-1774.up.railway.app/fav-place/create/', 
      place,
      {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,  // Đảm bảo rằng token là đúng format
        },
      }
    );

    console.log('Favourite place saved successfully:', response.data);
  } catch (err) {
    console.error('Error saving favourite place:', err.response?.data || err.message);
  }
};

export default saveFavPlace;