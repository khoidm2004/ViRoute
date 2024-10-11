import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className='login-page'>
      <form className='login-container'> {/*action='' to send data*/}
        <label className='text'>Email</label>
        <input type="text" className='input-field' placeholder='Password'/>
        <label className='text'>Password</label>
        <input type="text" className='input-field' placeholder='Email' />
      </form>
    </div>
  );
};
export default Login