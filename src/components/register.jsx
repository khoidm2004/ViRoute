import React, { useState } from 'react';
import './login_reg.css';
import { Icon } from '@iconify/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const turnback = () => {
      navigate(-1);
    };
  return (
    <div className='login-page'>
      <span className='turn-back'>
        <Icon icon="material-symbols:arrow-back-rounded" className='back-icon' onClick={turnback}/>
        <img className='logo' src='./images/ViRoute_green.png'/>
      </span>
      <form className='login-container'>             {/*action='' to send data*/}
        <label className='header'>Register</label>
        <label className='register-text'>Name:</label>
        <input type='register-text' className='reg-input-field' placeholder='Name'/>
        <label className='register-text'>Email:</label>
        <input type='register-text' className='reg-input-field' placeholder='Email'/>
        <label className='register-text'>Phone number</label>
        <input type='register-text' className='reg-input-field' placeholder='Phone number'/>
        <label className='register-text'>Password:</label>
        <input type='register-text' className='reg-input-field' id='password' placeholder='Password'/>
        <label className='register-text'>Confirm password:</label>
        <input type='register-text' className='reg-input-field' id='password' placeholder='Password'/>
        <input type='button' className='button' value="Register"/>
      </form>  
    </div>
  );
};
export default Register