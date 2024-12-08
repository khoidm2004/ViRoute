import axios from "axios";
const login = async (userEmail, password) => {
  try {
    const { data } = await axios.post('https://test-production-1774.up.railway.app/api/login/', {
      userEmail,
      password,
    });
    console.log('Login response data:', data);
    return data.user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
export default login;