import axios from 'axios';
import authStore from '../stores/authStore';
const fetchFavPlace = async () => {
    const user = authStore((state) => state.user);
    try {
        const response = await axios.get(`https://test-production-1774.up.railway.app/fav-place/${user.userID}/`);
        console.log(response.data)
        setFavouritePlaces(response.data);
      } catch (err) {
        console.error('Error fetching favourite places:', err);
      }
};
export default fetchFavPlace;