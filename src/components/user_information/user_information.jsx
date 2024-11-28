import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './user_information.css';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti_success.jsx';
import ErrorNotify, { triggerErrorNotification } from '../notification/noti_error.jsx';
import useUserInformationStore from '../../stores/userinfoStore';
import HidePass from '../hidepass/hidePass.jsx';
import authStore from '../../stores/authStore.js';
import updateUser from '../../services/updateInfo.js';

function UserInformation() {
  const user = authStore((state) => state.user);
  const navigate = useNavigate();
  if (!user) {
    navigate('/'); 
    return null; 
  }
  const {
    activeTab,
    setActiveTab,
    avatar,
    setAvatar,
    selectedFile,
    setSelectedFile,

    resetPasswords,
  } = useUserInformationStore();
  
  const [tempAvatar, setTempAvatar] = useState(avatar);
  const [tempFullName, setTempFullName] = useState(''); 
  const [nameError, setNameError] = useState(''); 
  const [fullName, setFullName] = useState('')

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTempAvatar(URL.createObjectURL(file)); // Update temp avatar locally
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
  
    // Validate the tempFullName before saving
    if (!/^[A-Za-z\s]*$/.test(tempFullName)) {
      setNameError('Full name can only contain letters and spaces.');
      return;
    }
  
    try {
      const updatedData = {
        fullName: tempFullName || user.fullName,
        phoneNumber: phone || user.phoneNumber,
      };
      
      const response = await updateUser(user.userID, updatedData);
  
      if (response.status === 200) {
        triggerSuccessNotification('Profile updated successfully!');
        setNameError('');
        setFullName(tempFullName); // Update the fullName in state
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile.';
      triggerErrorNotification(errorMessage);
    }
  };
  return (

    <div className="account-settings-container">
      <h2 className="account-info-header">Account Information</h2>
      <div className="settings-box">
        <div className="tabs-container">
          <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>
            General
          </button>
          <button className={activeTab === 'changePassword' ? 'active' : ''} onClick={() => setActiveTab('changePassword')}>
            Change Password
          </button>
        </div>

        <div className="content">
          {activeTab === 'general' && (
            <div className="general-tab">

              <div className="balance-avatar-container">
                <div className="avatar-section" onClick={handleUploadClick}>
                  <div className="avatar">
                    <img src={tempAvatar} alt="Avatar" /> {/* Show temp avatar */}
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/png"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="top-text">
                  ID: {user.userID}
                </div>
                <div className="top-text">
                  <label>Balance: {user.balance} Euro</label>
                </div>
              </div>

              <form onSubmit={handleSaveChanges}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={tempFullName} // Use tempFullName for input
                  placeholder={user.fullName}
                  onChange={(e) => setTempFullName(e.target.value)} // Update tempFullName locally
                />
                {nameError && <span className="error-message">{nameError}</span>} {/* Show error if invalid */}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder={user.userEmail}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  placeholder={user.phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type='submit' className="save-button">
                Save changes
              </button>
              </form>
            </div>
          )}



          {activeTab === 'changePassword' && (
            <div className="change-password-tab">
              <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <HidePass
                  values={{ password: currentPassword, showPassword: showCurrentPassword }}
                  handlePasswordChange={(e) => setCurrentPassword(e.target.value)}
                  handleClickShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
                  handleMouseDownPassword={(e) => e.preventDefault()}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <HidePass
                  values={{ password: newPassword, showPassword: showNewPassword }}
                  handlePasswordChange={(e) => setNewPassword(e.target.value)}
                  handleClickShowPassword={() => setShowNewPassword(!showNewPassword)}
                  handleMouseDownPassword={(e) => e.preventDefault()}
                />
              </div>
              <div className="form-group">
                <label>Repeat New Password</label>
                <HidePass
                  values={{ password: confirmPassword, showPassword: showConfirmPassword }}
                  handlePasswordChange={(e) => setConfirmPassword(e.target.value)}
                  handleClickShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  handleMouseDownPassword={(e) => e.preventDefault()}
                />
              </div>
              <button type='submit' className="save-button" >Change password</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <SuccessNotify />
    </div>
  );
}

export default UserInformation;