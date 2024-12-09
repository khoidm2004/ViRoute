import axios from 'axios';

const useRegister = async (userData) => {
  try {
    const response = await axios.post('https://test-production-1774.up.railway.app/signup/', userData); 
    console.log(userData)
    return { success: true, message: response.data.message || 'Registration successful!' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export default useRegister;