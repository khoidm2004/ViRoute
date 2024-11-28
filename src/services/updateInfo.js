import axios from 'axios';

// Function to update user info
const updateUser = async (userId, updatedInfo) => {
  try {
    const { data } = await axios.put(
      `http://127.0.0.1:8000/update_user/${userId}/`, // API endpoint
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