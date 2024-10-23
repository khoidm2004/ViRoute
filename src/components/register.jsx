import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import HidePass from './hidePass.jsx'; 
import RegisterSuccessNotify, { triggerRegisterSuccessNotification } from './noti-reg.jsx';
import 'reactjs-popup/dist/index.css';
import Footer from './footer.jsx';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "", 
    showPassword: false,
    showConfirmPassword: false
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    triggerRegisterSuccessNotification(); 
    navigate('/login');
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const home = () => {
    navigate('/');
  };

  return (
    <div className='register-page'>
      <div className='turn-back'>
        <img className='logo-login' src='./images/ViRoute_green.png' onClick={home} />
      </div>
      <form className='register-container'>
        <label className='header'>Register</label>
        <label className='register-text'>Name:</label>
        <input type='text' className='reg-input-field' placeholder='Name'/>
        <label className='register-text'>Email:</label>
        <input type='email' className='reg-input-field' placeholder='Email'/>
        <label className='register-text'>Phone number:</label>
        <input type='tel' pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" className='reg-input-field' placeholder='Phone number'/>
        
        <label className='register-text'>Password:</label>
        <HidePass
          values={{ password: values.password, showPassword: values.showPassword }} 
          handleMouseDownPassword={handleMouseDownPassword}
          handlePasswordChange={handlePasswordChange("password")}
        />        
        
        <label className='register-text'>Confirm password:</label>
        <HidePass
          values={{ password: values.confirmPassword, showPassword: values.showConfirmPassword }} 
          handleClickShowPassword={handleClickShowConfirmPassword} 
          handleMouseDownPassword={handleMouseDownPassword}
          handlePasswordChange={handlePasswordChange("confirmPassword")} 
        />        

        <input type='button' className='button' value="Register" onClick={handleRegister}/>
      </form> 
      <RegisterSuccessNotify />
      <Footer />
    </div>    
  );
};

export default Register;
