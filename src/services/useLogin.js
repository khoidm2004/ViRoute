import axios from 'axios';

const login = async (userEmail, password) => {
  try {
    const { data } = await axios.post('http://127.0.0.1:8000/api/login/', { userEmail, password });
    return data.user;
  } catch {
    throw new Error('Invalid login credentials. Please try again.');
  }
};

export default login;
