import axios from 'axios';
import authStore from '../stores/authStore';

const useRegister = async (userData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/signup/', userData); 
    authStore.getState().login(response.data);
    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export default useRegister;