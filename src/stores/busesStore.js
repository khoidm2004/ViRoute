import { create } from 'zustand';

const busesStore = create((set) => ({
  startLocation: '',
  setStartLocation: (startLocation) => set({ startLocation }),
}));

export default busesStore;
