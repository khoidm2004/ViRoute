import { create } from 'zustand';

const useLoginStore = create((set) => ({
  email: '',
  password: '',
  isLoggedIn: false,
  error: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setError: (error) => set({ error }),

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
