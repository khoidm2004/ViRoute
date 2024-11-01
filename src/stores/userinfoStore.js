import { create } from 'zustand';

const useUserInformationStore = create((set) => ({
  activeTab: 'general',
  avatar: '../images/Default_avatar.png',
  selectedFile: null,
  fullName: 'Thang',
  email: 'thang@mail.com',
  phone: '0123456789',

  setActiveTab: (tab) => set({ activeTab: tab }),
  setAvatar: (avatar) => set({ avatar }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setFullName: (fullName) => set({ fullName }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
}));

export default useUserInformationStore;
