import React from 'react';
import Popup from 'reactjs-popup';
import './repass.css';
import 'reactjs-popup/dist/index.css';

const Popup_repass = ({ isOpen, closePopup }) => {
    return (
      <Popup open={isOpen} onClose={closePopup} className='popup'>
        <div className='popup-inner'>
          <h>Password reset</h>
          <p>You will receive instructions for reseting your password</p>
          <input type='text' placeholder='Your email address'/>   {/*Kh chỉnh được nền input white*/}
          <button onClick={closePopup}>Submit</button>
        </div>
      </Popup>
    );
  };
  
  export default Popup_repass;