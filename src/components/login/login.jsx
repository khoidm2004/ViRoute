import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import SuccessNotify from '../notification/noti_success';
import ErrorNotify from '../notification/noti_error';
import PopupRepass from '../repass/repass';
import HidePassLogin from '../hidepass/hidePassLogin';
import Footer from '../footer/footer';
import login from '../../services/useLogin.js';
import authStore from '../../stores/authStore';

const Login = () => {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup state locally
  const [errorMessage, setErrorMessage] = useState('');
  const { login: setUser } = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(userEmail);
      console.log(password.password);
      const userData = await login(userEmail, password.password);
      setUser(userData);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrorMessage('Invalid login credentials. Please try again.');
      setErrorMessage(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPassword((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  return (
    <>
      <div className="login-page">
        <img
          className="logo-login"
          src="./images/ViRoute_green.png"
          alt="logo"
          onClick={() => navigate('/')}
        />
        <form className="login-container" onSubmit={handleLogin}>
          <label className="header">Login</label>
          <label className="text">Email:</label>
          <input
            type="email"
            className="input-field-login"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text">Password:</label>
          <HidePassLogin
            values={password}
            handleClickShowPassword={togglePasswordVisibility}
            handlePasswordChange={(e) => setPassword({ ...password, password: e.target.value })}
          />
          z<label className="repass-text" onClick={() => setIsPopupOpen(true)}>
            Forgot your password?
          </label>
          <button type="submit" className="login-button">Login</button>
          <label className="reg-text" onClick={() => navigate('/register')}>
            Don't have an account? Create new account
          </label>
        </form>
        <PopupRepass isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        {showNotification && <SuccessNotify message="Login Successful!" />}
        {errorMessage && <ErrorNotify message={errorMessage} />}
      </div>
    </>
  );
};

export default Login;
