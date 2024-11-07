import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import SuccessNotify from '../notification/noti_success';
import PopupRepass from '../repass/repass';
import HidePassLogin from '../hidepass/hidePassLogin';
import Footer from '../footer/footer';
import login from '../services/useLogin';
import loginStore from '../../stores/loginStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
      password: '',
      showPassword: false,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { login: setUser } = loginStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      setUser(userData); 
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      alert('Invalid login credentials. Please try again.');
    }
  };
  
  const togglePasswordVisibility = () => {
    setPassword((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };
  return (
    <body>
    <div className="login-page">
      <img
        className="logo-login"
        src="./images/ViRoute_green.png"
        alt="logo"
        onClick={() => navigate(-1)}
      />
      <form className="login-container" onSubmit={handleLogin}>
        <label className="header">Login</label>
        <label className="text">Email:</label>
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
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
    </div>
    {/*<Footer />*/}
    </body>
  );
};

export default Login;
