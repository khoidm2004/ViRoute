import axios from 'axios';

const useRegister = async (userData) => {
  try {
    const response = await axios.post('https://test-production-b0ae.up.railway.app/signup/', userData); 
    return { success: true, message: response.data.message || 'Registration successful!' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export default useRegister;