import { create } from 'zustand';

const useMapStore = create((set) => ({
  position: [51.505, -0.09], // Vị trí mặc định
  setPosition: (newPosition) => set({ position: newPosition }),
}));

export default useMapStore;
