import axios from 'axios';

const useRegister = async (userData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/signup/', userData); 
    return { success: true, message: response.data.message || 'Registration successful!' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export default useRegister;