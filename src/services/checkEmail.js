import axios from 'axios';
import getCsrfToken from './crsfToken';

const checkPass = async (userEmail) => {
    try {
      const csrfToken = await getCsrfToken();
  
      const response = await axios.post(
        'https://test-production-1774.up.railway.app/password_reset/',
        { userEmail },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
  
      return response.data;  // Lấy dữ liệu phản hồi từ server
    } catch (error) {
      if (error.response) {
        console.error('Error Response Data:', error.response.data);  // Lỗi phản hồi từ server
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.error('Error Request:', error.request);  // Lỗi khi không nhận được phản hồi từ server
        alert('Error: No response from server');
      } else {
        console.error('Error Message:', error.message);  // Lỗi khác
        alert(`Error: ${error.message}`);
      }
      throw error;
    }
  };

export default checkPass;