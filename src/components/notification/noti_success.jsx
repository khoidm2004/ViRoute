import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessNotify = ({ message }) => {
  const notifySuccess = () => {
    toast.success(message, {
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

  // Call notifySuccess whenever the component mounts or the message prop changes
  React.useEffect(() => {
    if (message) {
      notifySuccess();
    }
  }, [message]);

  return (
    <div>
      <ToastContainer
        style={{
          width: '90%', // Makes it take 90% of the viewport width for smaller screens
          maxWidth: '320px', // Maximum width for larger screens
          margin: '0 auto', // Center the notification horizontally
        }}
      />
    </div>
  );
};

export const triggerSuccessNotification = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default SuccessNotify;
