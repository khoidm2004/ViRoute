import { create } from 'zustand';

const useUserInformationStore = create((set) => ({
  activeTab: 'general',
  setActiveTab: (tab) => set({ activeTab: tab }),

  avatar: '../images/Default_avatar.png',
  setAvatar: (newAvatar) => set({ avatar: newAvatar }),

  userId: '123456487',
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),

  tempFullName: '', 
  setTempFullName: (name) => set({ tempFullName: name }),

  fullName: '',
  setFullName: (name) => set({ fullName: name }),

  email: '',
  setEmail: (email) => set({ email }),

  phone: '',
  setPhone: (phone) => set({ phone }),

  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  setCurrentPassword: (password) => set({ currentPassword: password }),
  setNewPassword: (password) => set({ newPassword: password }),
  setConfirmPassword: (password) => set({ confirmPassword: password }),

  resetPasswords: () => set({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }),

  applyTempFullName: () => set((state) => ({ fullName: state.tempFullName })),

  favouritePlaces: JSON.parse(localStorage.getItem('favouritePlaces')) || [],
  error: null,

  addFavouritePlace: (place) => set((state) => {
    const isDuplicate = state.favouritePlaces.some(
      (fav) =>
        fav.locationName === place.locationName ||
        fav.streetAddress === place.streetAddress
    );

    if (isDuplicate) {
      return { error: 'Duplicate name or address' };
    }

    const updatedPlaces = [...state.favouritePlaces, place];
    localStorage.setItem('favouritePlaces', JSON.stringify(updatedPlaces));
    return { favouritePlaces: updatedPlaces, error: null }; 
  }),

  deleteFavoritePlace: (index) => set((state) => {
    const updatedPlaces = state.favouritePlaces.filter((_, i) => i !== index);
    localStorage.setItem('favouritePlaces', JSON.stringify(updatedPlaces));
    return { favouritePlaces: updatedPlaces };
  }),

  clearError: () => set({ error: null }),
}));

export default useUserInformationStore;
