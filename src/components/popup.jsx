import React from 'react';
import Popup from 'reactjs-popup';
import './popup.css';
import 'reactjs-popup/dist/index.css';

const Popupcustom = ({ isOpen, closePopup }) => {
    return (
      <Popup open={isOpen} onClose={closePopup} className='popup'>
        <div className='popup-inner'>
          <h className='success-text'>Login Successful</h>
          <button onClick={closePopup}>Continue to Home</button>
        </div>
      </Popup>
    );
  };
  
  export default Popupcustom;