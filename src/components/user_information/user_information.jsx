import React, { useState } from 'react';
import './user_information.css';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti_success.jsx';
import ErrorNotify, { triggerErrorNotification } from '../notification/noti_error.jsx';
import useUserInformationStore from '../../stores/userinfoStore';
import HidePass from '../hidepass/hidePass.jsx';

function UserInformation() {
  const {
    activeTab,
    setActiveTab,
    avatar,
    setAvatar,
    userId,
    selectedFile,
    setSelectedFile,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    resetPasswords,
  } = useUserInformationStore();

  // Local states to manage temp avatar and temp full name before saving
  const [tempAvatar, setTempAvatar] = useState(avatar);
  const [tempFullName, setTempFullName] = useState(fullName); // Temporary full name state
  const [nameError, setNameError] = useState(''); // Error message for name validation

  // Local state to manage password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSaveChanges = () => {
    // Validate the tempFullName before saving
    if (/^[A-Za-z\s]*$/.test(tempFullName)) {
      setAvatar(tempAvatar);
      setFullName(tempFullName); // Update global store fullName
      triggerSuccessNotification('Profile updated successfully!');
      setNameError(''); // Clear error if successful
    } else {
      setNameError('Full name can only contain letters and spaces.'); // Set error if invalid
    }
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      triggerSuccessNotification('Password changed successfully!');
      resetPasswords(); // Reset password fields after success
    } else {
      alert('Passwords do not match!');
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
                  ID: {userId}
                </div>
                <div className="top-text">
                  <label>Balance: 100 Euro</label>
                </div>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={tempFullName} // Use tempFullName for input
                  placeholder="Enter your full name"
                  onChange={(e) => setTempFullName(e.target.value)} // Update tempFullName locally
                />
                {nameError && <span className="error-message">{nameError}</span>} {/* Show error if invalid */}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mobile Phone</label>
                <input
                  type="text"
                  value={phone}
                  placeholder="Enter your mobile phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button className="save-button" onClick={handleSaveChanges}>
                Save changes
              </button>
            </div>
          )}

          {activeTab === 'changePassword' && (
            <div className="change-password-tab">
              <div className="form-group">
                <label>Current Password</label>
                <HidePass
                  values={{ password: currentPassword, showPassword: false }}
                  handlePasswordChange={(e) => setCurrentPassword(e.target.value)}
                  handleClickShowPassword={() => {}}
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
              <button className="save-button" onClick={handleChangePassword}>
                Change password
              </button>
            </div>
          )}
        </div>
      </div>
      <SuccessNotify />
    </div>
  );
}

export default UserInformation;
