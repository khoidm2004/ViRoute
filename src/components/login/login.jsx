import React, { useState } from 'react';
import './login.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoginSuccessNotify, { triggerLoginSuccessNotification } from '../notification/noti-login.jsx';
import Popup_repass from '../repass/repass.jsx';
import HidePassLogin from '../hidepass/hidePassLogin.jsx'; 
import Footer from '../footer/footer.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { cityCode } = useParams();
  const [isRepass, setIsRepass] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const handleLogin = (e) => {
    e.preventDefault();
    triggerLoginSuccessNotification(); 
  };
  const handleRepass = () => {
    setIsRepass(true);
  };
  const closeRepass = () => {
    setIsRepass(false);
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const changepage = (page) => {
    navigate(page);
};
  return (
    <body>
      <div className='login-page'>
        <img className='logo-login' src='./images/ViRoute_green.png' onClick={() => changepage(`/${cityCode}/`)}/>
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
          <label className='reg-text' onClick={() => changepage('/register')}>Create new account</label>
        </form>
        <Popup_repass isOpen={isRepass} closePopup={closeRepass} />
        <LoginSuccessNotify />
      </div>
      <Footer/>
    </body>

  );
};

export default Login;
