import React, { useState } from 'react';
import './login_reg.css';
import { Icon } from '@iconify/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const turnback = () => {
      navigate(-1);
    };
    const register = () => {
      navigate('/register');
    };
  return (
    <div className='login-page'>
      <span className='turn-back'>
        <Icon icon="material-symbols:arrow-back-rounded" className='back-icon' onClick={turnback}/>
        <img className='logo' src='./images/ViRoute_green.png'/>
      </span>
      <form className='login-container'>             {/*action='' to send data*/}
        <label className='header'>Login</label>
        <label className='text'>Email:</label>
        <input type='text' className='input-field' placeholder='Email' />
        <label className='text'>Password:</label>
        <input type='text' className='input-field' id='password' placeholder='Password'/>
        <label className='repass-text'>Forgot your password ?</label>
        <input type='button' className='button' value="Login"/>
        <label className='reg-text' onClick={register}>Create new account</label>
      </form>  
    </div>
  );
};
export default Login