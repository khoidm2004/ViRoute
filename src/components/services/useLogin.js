import axios from 'axios';

const login = async (email, password) => {
  try {
    const { data } = await axios.post('/api/login/', { email, password });
    return data.user;
  } catch {
    throw new Error('Invalid login credentials. Please try again.');
  }
};

export default login;
