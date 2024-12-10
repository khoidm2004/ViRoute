import axios from "axios";
const login = async (userEmail, password) => {
  try {
    const { data } = await axios.post('https://test-production-1774.up.railway.app/api/login/', {
      userEmail,
      password,
    });
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      console.log('Token saved:', data.access_token);
    } else {
      console.error('Token not found in response');
    }
    return data.user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
export default login;