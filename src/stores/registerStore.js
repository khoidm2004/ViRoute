import { create } from 'zustand';

const useRegisterStore = create((set) => ({
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  showNotification: false,

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleShowConfirmPassword: () => set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  
  triggerNotification: () => {
    set({ showNotification: true });
    setTimeout(() => set({ showNotification: false }), 2000); 
  },

  resetForm: () => set({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    showNotification: false,
  }),
}));

export default useRegisterStore;
