import React from 'react';
import Popup from 'reactjs-popup';
import './repass.css';
import 'reactjs-popup/dist/index.css';
import useLoginStore from '../../stores/loginStore';

const Popup_repass = () => {
  const isOpen = useLoginStore((state) => state.isPopupOpen);
  const closePopup = useLoginStore((state) => state.closePopup); // Use closePopup

  return (
    <Popup open={isOpen} onClose={closePopup} className='popup'>
      <div className='popup-inner'>
        <h1>Password reset</h1>
        <p>You will receive instructions for resetting your password</p>
        <input type='text' placeholder='Your email address' />
        <button onClick={closePopup}>Submit</button>
      </div>
    </Popup>
  );
};

export default Popup_repass;
