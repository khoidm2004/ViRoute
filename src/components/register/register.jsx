import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import HidePass from '../hidepass/hidePass.jsx'; 
import RegisterSuccessNotify, { triggerRegisterSuccessNotification } from '../notification/noti-reg.jsx';
import 'reactjs-popup/dist/index.css';
import Footer from '../footer/footer.jsx';

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

    triggerRegisterSuccessNotification(); 
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
    <body>
      <div className='register-page'>
        <img className='logo-login' src='./images/ViRoute_green.png' onClick={home} />
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
            handleClickShowPassword={handleClickShowPassword} 
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
      </div>  
      <Footer/>
    </body>
     
  );
};

export default Register;
