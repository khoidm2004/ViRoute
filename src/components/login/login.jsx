import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import SuccessNotify from '../notification/noti_success';
import ErrorNotify from '../notification/noti_error'; // Import ErrorNotify
import PopupRepass from '../repass/repass';
import HidePassLogin from '../hidepass/hidePassLogin';
import Footer from '../footer/footer';
import login from '../../services/useLogin.js'
import authStore from '../../stores/authStore';

const Login = () => {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState({
      password: '',
      showPassword: false,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const { login: setUser } = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(userEmail, password.password);
      setUser(userData);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrorMessage('Invalid login credentials. Please try again.'); // Set error message
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
            className="input-field"
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
          <label className="repass-text" onClick={() => setIsPopupOpen(!isPopupOpen)}>
            Forgot your password?
          </label>
          <button type="submit" className="login-button">Login</button>
          <label className="reg-text" onClick={() => navigate('/register')}>
            Don't have an account? Create new account
          </label>
        </form>
        {isPopupOpen && <PopupRepass onClose={() => setIsPopupOpen(false)} />}
        {showNotification && <SuccessNotify message="Login Successful!" />}
        {errorMessage && <ErrorNotify message={errorMessage} />} {/* Show error notification */}
      </div>
      <Footer style={{ margin: '0', padding: '0', width: '100vw' }} />
    </>
  );
};

export default Login;
