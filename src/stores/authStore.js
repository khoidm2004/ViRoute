import { create } from 'zustand';

const authStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }, 
  })),
}));

export default authStore;
