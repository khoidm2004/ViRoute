import axios from 'axios';

const login = async (userEmail, password) => {
  try {
    const { data } = await axios.post('https://test-production-79d6.up.railway.app/api/login/', { userEmail, password });
    return data.user;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};

export default login;