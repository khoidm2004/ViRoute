import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorNotify = ({ message }) => {
  React.useEffect(() => {
    if (message) {
      toast.error(message, {
        position: "top-right",
        autoClose: 1000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        style: {
          width: '90%', // Responsive width for smaller screens
          maxWidth: '320px', // Maximum width for larger screens
          margin: '0 auto', // Center the toast
        },
      });
    }
  }, [message]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export const triggerErrorNotification = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      width: '90%', // Responsive width for smaller screens
      maxWidth: '320px', // Maximum width for larger screens
      margin: '0 auto', // Center the toast
    },
  });
};

export default ErrorNotify;
