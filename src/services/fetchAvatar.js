import axios from "axios";
const fetchAvatar = async (imageUrl) => {
    try {
        const response = await axios.get(`https://test-production-1774.up.railway.app${imageUrl}`, {
            responseType: 'blob', 
          });
        const imgUrl = URL.createObjectURL(response.data);
        console.log('Image fetch response data:', imgUrl);
        return imgUrl
    } catch (error) {
        console.error('Image fetch error:', error.response?.data || error.message);
        throw error;
      }
}
export default fetchAvatar;