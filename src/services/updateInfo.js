import axios from 'axios';

const updateUser = async (userId, updatedInfo) => {
  try {
    const { data } = await axios.put(
      `https://test-production-1774.up.railway.app/update_user/${userId}`, // API endpoint
      updatedInfo, // Data to update
      {
        headers: {
          'Content-Type': 'application/json', // Optional: specify headers if needed
        },
      }
    );
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update user info',
    };
  }
};
export default updateUser;