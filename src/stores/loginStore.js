import { create } from 'zustand';

const useLoginStore = create((set) => ({
  email: '',
  password: '',
  isLoggedIn: false, // Default to false
  error: null,
  showPassword: false,
  showNotification: false, 

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setError: (error) => set({ error }),
  setShowPassword: (status) => set({ showPassword: status }), 
  togglePopupOpen: () => set((state) => ({ isPopupOpen: !state.isPopupOpen })),// Function to set showPassword
  closePopup: () => set({ isPopupOpen: false }),
  triggerNotification: () => {
    set({ showNotification: true });
    setTimeout(() => set({ showNotification: false }), 2000); 
  },
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
  reset: () => set({
    showNotification: false,
  })
}));

export default useLoginStore;
