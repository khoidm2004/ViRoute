import axios from "axios";
import authStore from "../stores/authStore";
const saveImage = async (file) => {
    try {
      const user = authStore.getState().user; // Lấy user từ store
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userID', user.userID); // Thêm userID vào payload
  
      const response = await axios.put(
        `https://test-production-1774.up.railway.app/update-avatar/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      return response.data.avatar_url; // Giả sử API trả về URL của avatar mới
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  };
export default saveImage;