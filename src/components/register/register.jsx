import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import HidePass from '../hidepass/hidePass.jsx';
import SuccessNotify from '../notification/noti_success.jsx';
import Footer from '../footer/footer.jsx';
import useRegister from '../../services/useRegister';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNotificationMessage('Passwords do not match');
      setShowNotification(true);
      return;
    }

    const userData = { name, email, phoneNumber, password };
    const result = await useRegister(userData);

    if (result.success) {
      setNotificationMessage(result.message);
      setShowNotification(true);
      setTimeout(() => {
        resetForm();
        navigate('/login');
      }, 2000);
    } else {
      setNotificationMessage(result.message);
      setShowNotification(true);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowNotification(false);
  };

  return (
    <>
    <div className='register-page'>
      <img className='logo-login' src='./images/ViRoute_green.png' onClick={() => navigate('/')} alt="Logo" />
      <form className='register-container'>
        <label className='header'>Register</label>
        <label className='register-text'>Name:</label>
        <input
          type='text'
          className='reg-input-field'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className='register-text'>Email:</label>
        <input
          type='email'
          className='reg-input-field'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='register-text'>Phone number:</label>
        <input
          type='tel'
          className='reg-input-field'
          placeholder='Phone number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label className='register-text'>Password:</label>
        <HidePass
          values={{ password, showPassword }}
          handleClickShowPassword={() => setShowPassword(!showPassword)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
        />
        <label className='register-text'>Confirm password:</label>
        <HidePass
          values={{ password: confirmPassword, showPassword: showConfirmPassword }}
          handleClickShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          handlePasswordChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type='button' className='button' value="Register" onClick={handleRegister} />
      </form>
      {showNotification && <SuccessNotify message={notificationMessage} />}
    </div>
    <Footer/>
    </>
  );
};

export default Register;
