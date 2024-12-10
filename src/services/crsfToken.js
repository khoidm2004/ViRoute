import axios from 'axios';

const getCsrfToken = async () => {
  try {
    const response = await axios.get(
      'https://test-production-1774.up.railway.app/api/csrf_token/',
      { withCredentials: true }
    );
    return response.data.csrf_token; 
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    throw error;
  }
};

export default getCsrfToken;
