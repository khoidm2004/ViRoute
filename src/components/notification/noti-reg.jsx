// LoginSuccessNotify.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterSuccessNotify = () => {
  const notifySuccess = () => {
    toast.success('Register Successful!', {
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

export const triggerRegisterSuccessNotification = () => {
  toast.success('Register Successful!', {
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

export default RegisterSuccessNotify;
