import React from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import HidePass from '../hidepass/hidePass.jsx';
import SuccessNotify from '../notification/noti.jsx';
import Footer from '../footer/footer.jsx';
import useRegisterStore from '../../stores/registerStore';

const Register = () => {
  const navigate = useNavigate();
  const {
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    showNotification,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    triggerNotification,
    resetForm,
  } = useRegisterStore();

  const handleRegister = (e) => {
    e.preventDefault();

    triggerNotification(); // Show success notification
    setTimeout(() => {
      resetForm();
      navigate('/login');
    }, 2000);
  };

  return (
    <body>
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
          handleClickShowPassword={toggleShowPassword}
          handlePasswordChange={(e) => setPassword(e.target.value)}
        />
        <label className='register-text'>Confirm password:</label>
        <HidePass
          values={{ password: confirmPassword, showPassword: showConfirmPassword }}
          handleClickShowPassword={toggleShowConfirmPassword}
          handlePasswordChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type='button' className='button' value="Register" onClick={handleRegister} />
      </form>
      {showNotification && <SuccessNotify message="Register Successful!" />}
    </div>
    <Footer />
    </body>
  );
};

export default Register;
