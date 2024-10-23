// LoginSuccessNotify.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSuccessNotify = () => {
  const notifySuccess = () => {
    toast.success('Login Successful!', {
      position: "top-right",
      autoClose: 3000, // Notification closes automatically after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", // Can be light or dark theme too
    });
  };

  return (
    <div>
      <ToastContainer /> {/* Toast Container where notifications appear */}
    </div>
  );
};

export const triggerLoginSuccessNotification = () => {
  toast.success('Login Successful!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default LoginSuccessNotify;
