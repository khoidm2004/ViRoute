import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti.jsx';
import Popup_repass from '../repass/repass.jsx';
import HidePassLogin from '../hidepass/hidePassLogin.jsx';
import Footer from '../footer/footer.jsx';
import useLoginStore from '../../stores/loginStore';

const Login = () => {
  const navigate = useNavigate();
  const togglePopupOpen = useLoginStore((state) => state.togglePopupOpen);

  const changepage = (page) => navigate(page);
  const {
    email,
    password,
    isLoggedIn,
    error,
    setEmail,
    setPassword,
    login,
  } = useLoginStore();

  const [showNotification, setShowNotification] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (isLoggedIn) {
      triggerSuccessNotification('Login Successful!');
      setShowNotification(true);
      navigate('/');
    }
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <body>
      <div className='login-page'>
        <img className='logo-login' src='./images/ViRoute_green.png' onClick={() => navigate(-1)} />
        <form className='login-container'>
          <label className='header'>Login</label>
          <label className='text'>Email:</label>
          <input
            type='email'
            className='input-field'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='text'>Password:</label>
          <HidePassLogin
            values={{ password }}
            handlePasswordChange={(e) => setPassword(e.target.value)}
          />
          <label className='repass-text' onClick={togglePopupOpen}>Forgot your password?</label> {/* Open popup */}
          <input type='button' className='button' value="Login" onClick={handleLogin} />
          <label className='reg-text' onClick={() => changepage('/register')}>Don't have an account? Create new account</label>
        </form>
        <Popup_repass />
        {showNotification && <SuccessNotify />}
      </div>
      <Footer />
    </body>
  );
};

export default Login;
