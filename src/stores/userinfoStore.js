// temporary
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
}));

export default useUserInformationStore;
