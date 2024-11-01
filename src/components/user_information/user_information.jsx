// UserInformation.js
import React from 'react';
import './user_information.css';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti.jsx';
import useUserInformationStore from '../../stores/userinfoStore';

function UserInformation() {
  const {
    activeTab,
    setActiveTab,
    avatar,
    setAvatar,
    selectedFile,
    setSelectedFile,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
  } = useUserInformationStore();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSaveChanges = () => {
    triggerSuccessNotification('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    triggerSuccessNotification('Password changed successfully!');
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
                <div className="avatar-section">
                  <div className="avatar">
                    <img src={avatar} alt="Avatar" />
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/png"
                    onChange={handleFileChange}
                  />
                  <button className="upload-button" onClick={handleUploadClick}>
                    Upload new photo
                  </button>
                </div>
                <div className="balance">
                  <label>Balance: 100 Euro</label>
                </div>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  placeholder="Enter your full name"
                  onChange={(e) => setFullName(e.target.value)}
                />
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
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Repeat New Password</label>
                <input type="password" placeholder="Repeat new password" />
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
