import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorNotify = ({ message }) => {
  const notifyError = () => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", 
    });
  };

  return (
    <div>
      <ToastContainer /> 
    </div>
  );
};


export const triggerErrorNotification = (message) => {
  toast.error(message, {
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

export default ErrorNotify;