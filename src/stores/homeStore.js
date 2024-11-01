import { create } from 'zustand';

const useHomescreenStore = create((set) => ({
  start: '',
  destination: '',
  
  setStart: (start) => set({ start }),
  setDestination: (destination) => set({ destination }),
  swapLocations: () => set((state) => ({
    start: state.destination,
    destination: state.start,
  })),
}));

export default useHomescreenStore;
