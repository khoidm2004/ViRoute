// userinfoStore.js
import { create } from 'zustand';

const useUserInformationStore = create((set) => ({
  activeTab: 'general',
  setActiveTab: (tab) => set({ activeTab: tab }),

  avatar: '../images/Default_avatar.png',
  setAvatar: (newAvatar) => set({ avatar: newAvatar }),

  userId: '123456487',
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),

  // Temporary fields for unsaved changes
  tempFullName: '', // Store temp full name here
  setTempFullName: (name) => set({ tempFullName: name }),

  fullName: '',
  setFullName: (name) => set({ fullName: name }),

  email: '',
  setEmail: (email) => set({ email }),

  phone: '',
  setPhone: (phone) => set({ phone }),

  // New password states
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  setCurrentPassword: (password) => set({ currentPassword: password }),
  setNewPassword: (password) => set({ newPassword: password }),
  setConfirmPassword: (password) => set({ confirmPassword: password }),

  // Function to reset passwords after successful change
  resetPasswords: () => set({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }),

  // Function to apply temp full name to the main fullName
  applyTempFullName: () => set((state) => ({ fullName: state.tempFullName })),
}));

export default useUserInformationStore;
