import { create } from 'zustand';

const authStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  updateUser: (updates) => set((state) => {
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
    return { user: updatedUser };
  }),
}));

export default authStore;
