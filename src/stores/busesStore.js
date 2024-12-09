import { create } from 'zustand';
import fetchBuses from './fetchBuses';

const busesStore = create((set) => ({
  buses: [],
  filteredBuses: [],
  searchTerm: '',
  loading: false,
  error: null,

  fetchBusesData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchBuses();
      set({ buses: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
    }
  },

  setFilteredBuses: (filteredBuses, searchTerm) => set({ filteredBuses, searchTerm }),
  resetBuses: () => set({ buses: [], filteredBuses: [], searchTerm: '', loading: false, error: null }),
}));

export default busesStore;
