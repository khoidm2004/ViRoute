import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import HidePass from '../hidepass/hidePass.jsx';
import SuccessNotify from '../notification/noti_success.jsx';
import ErrorNotify from '../notification/noti_error.jsx'; 
import Footer from '../footer/footer.jsx';
import useRegister from '../../services/useRegister';

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    userEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNotificationMessage('Passwords do not match');
      setShowErrorNotification(true); 
      return;
    }

    const userData = { fullName, userEmail, phoneNumber, password };
    const result = await useRegister(userData);

    if (result.success) {
      setNotificationMessage(result.message);
      setShowSuccessNotification(true);
      setTimeout(() => {
        resetForm();
        navigate('/login');
      }, 2000);
    } else {
      setNotificationMessage(result.message || 'Registration failed. Please try again.');
      setShowErrorNotification(true); 
    }
  };

  const resetForm = () => {
    setFullName('');
    setUserEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowSuccessNotification(false);
    setShowErrorNotification(false);
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label className='register-text'>Email:</label>
          <input
            type='email'
            className='reg-input-field'
            placeholder='Email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
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
        {showSuccessNotification && <SuccessNotify message={notificationMessage} />}
        {showErrorNotification && <ErrorNotify message={notificationMessage} />}
      </div>
      <Footer />
    </>
  );
};

export default Register;
