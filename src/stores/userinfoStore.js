// userinfoStore.js
import {create} from 'zustand';

const useUserInformationStore = create((set) => ({
  activeTab: 'general',
  setActiveTab: (tab) => set({ activeTab: tab }),

  avatar: '../images/Default_avatar.png',
  setAvatar: (avatar) => set({ avatar }),

  userId: '123456487',
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),

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
  })
}));

export default useUserInformationStore;
