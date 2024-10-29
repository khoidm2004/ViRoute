import React, { useState } from 'react';
import './login_reg.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Popupcustom from './popup-login.jsx';
import Popup_repass from './repass.jsx';
import 'reactjs-popup/dist/index.css'

const Login = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isRepass, setIsRepass] = useState(false);

    const turnback = () => {
      navigate(-1);
    };
    const register = () => {
      navigate('/register');
    };
    const handleLogin = () => {
      setIsPopupOpen(true);
    };
    const closePopup = () => {
      setIsPopupOpen(false);
      navigate('/');
    };
    const handleRepass = () => {
      setIsRepass(true);
    };
    const closeRepass = () => {
      setIsRepass(false);
    };
  return (
    <div className='login-page'>
      <div className='turn-back'>
        <Icon icon="material-symbols:arrow-back-rounded" className='back-icon' onClick={turnback}/>
        <img className='logo-login' src='./images/ViRoute_green.png'/>
      </div>
      <form className='login-container'>             {/*action='' to send data*/}
        <label className='header'>Login</label>
        <label className='text'>Email:</label>
        <input type='text' className='input-field' placeholder='Email' />
        <label className='text'>Password:</label>
        <input type='text' className='input-field' id='password' placeholder='Password'/>
        <label className='repass-text' onClick={handleRepass}>Forgot your password ?</label>
        <input type='button' className='button' value="Login" onClick={handleLogin}/>
        <label className='reg-text' onClick={register}>Create new account</label>
      </form>
      <Popupcustom isOpen={isPopupOpen} closePopup={closePopup}/>  
      <Popup_repass isOpen={isRepass} closePopup={closeRepass}/>
    </div>
  );
};
export default Login;