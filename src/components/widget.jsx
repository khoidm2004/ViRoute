import React, { useState } from 'react';
import 'widget.css';

const TopUpWidget = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleLogin = () => { /*for test only*/
    setLoggedIn(true);
    setShowMessage(true); 
    setTimeout(() => {
      setShowMessage(false);
    },3000);
  };
  return (
    <div className='topup'>
      
    </div>
  );
};