import { create } from 'zustand';

const useLoginStore = create((set) => ({
  email: '',
  password: '',
  isLoggedIn: false, // Default to false
  error: null,
  showPassword: false, // State to manage password visibility

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setError: (error) => set({ error }),
  setShowPassword: (status) => set({ showPassword: status }), // Function to set showPassword

  login: async (email, password) => {
    try {
      const response = await fetch('https://your-api-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        set({ isLoggedIn: true, error: null });
      } else {
        set({ error: 'Login failed. Please check your credentials.' });
      }
    } catch (err) {
      set({ error: 'An error occurred. Please try again later.' });
    }
  },
}));

export default useLoginStore;
