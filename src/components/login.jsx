import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import LoginSuccessNotify, { triggerLoginSuccessNotification } from './noti-login.jsx';
import Popup_repass from './repass.jsx';
import HidePassLogin from './hidePassLogin.jsx'; 
import Footer from './footer.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [isRepass, setIsRepass] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const register = () => {
    navigate('/register');
  };
  const handleLogin = (e) => {
    e.preventDefault();
    //login logic here
    //const loginSuccess = true; 
    triggerLoginSuccessNotification(); 

    //if (loginSuccess) {
    //  triggerLoginSuccessNotification(); 
    //  navigate('/'); 
    //} else {
    //  console.log('Login failed');
  };
  const home = () => {
    navigate('/');
  };
  const handleRepass = () => {
    setIsRepass(true);
  };
  const closeRepass = () => {
    setIsRepass(false);
  };

  // Password visibility toggle handlers
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className='login-page'>
      <div className='turn-back'>
        <img className='logo-login' src='./images/ViRoute_green.png' onClick={home}/>
      </div>
      <form className='login-container'>
        <label className='header'>Login</label>
        <label className='text'>Email:</label>
        <input type='email' className='input-field' placeholder='Email'/>
        <label className='text'>Password:</label>
        <HidePassLogin
          values={values}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          handlePasswordChange={handlePasswordChange}
        />
        <label className='repass-text' onClick={handleRepass}>Forgot your password?</label>
        <input type='button' className='button' value="Login" onClick={handleLogin} />
        <label className='reg-text' onClick={register}>Create new account</label>
      </form>
      <Popup_repass isOpen={isRepass} closePopup={closeRepass} />
      <LoginSuccessNotify />
      <Footer />
    </div>
  );
};

export default Login;
