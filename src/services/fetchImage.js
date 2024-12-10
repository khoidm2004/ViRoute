import axios from "axios";

const fetchImage = async (busName) => {
  try {
    const isMobile = window.innerWidth <= 480;
    const suffix = isMobile ? '_mobile' : '_web';
    console.log(`https://test-production-1774.up.railway.app/get_image/${busName}${suffix}/`)

    const response = await axios.get(`https://test-production-1774.up.railway.app/get_image/${busName}${suffix}/`, {
      responseType: 'blob', 
    });

    const imageUrl = URL.createObjectURL(response.data);
    console.log('Image fetch response data:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Image fetch error:', error.response?.data || error.message);
    throw error;
  }
};

export default fetchImage;
