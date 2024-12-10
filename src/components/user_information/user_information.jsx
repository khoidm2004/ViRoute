import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './user_information.css';
import SuccessNotify, { triggerSuccessNotification } from '../notification/noti_success.jsx';
import ErrorNotify, { triggerErrorNotification } from '../notification/noti_error.jsx';
import useUserInformationStore from '../../stores/userinfoStore';
import HidePass from '../hidepass/hidePass.jsx';
import authStore from '../../stores/authStore.js';
import updateUser from '../../services/updateInfo.js';
import saveImage from '../../services/saveImage.js';

function UserInformation() {
  const user = authStore((state) => state.user);
  const navigate = useNavigate();
  if (!user) {
    navigate('/'); 
    return null; 
  }
  const defaultAvatar = `../images/Default_avatar.png`;
  const userAvatar = `https://test-production-1774.up.railway.app${user.avatar}?t=${Date.now()}`;
  const {
    activeTab,
    setActiveTab,
    selectedFile,
    setSelectedFile,
    favouritePlaces,
    resetPasswords,
    deleteFavoritePlace
  } = useUserInformationStore();
  
  const [tempAvatar, setTempAvatar] = useState();
  const [tempFullName, setTempFullName] = useState(''); 
  const [nameError, setNameError] = useState(''); 

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [phoneNumber, setPhone] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTempAvatar(URL.createObjectURL(file)); 
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); 
  
    if (!/^[A-Za-z\s]*$/.test(tempFullName)) {
      setNameError('Full name can only contain letters and spaces.');
      return;
    }
  
    try {
      const updatedData = {
        fullName: tempFullName || user.fullName,
      };
      if (selectedFile) {
        const image_name = await saveImage(selectedFile);  //avatars/screenshot_8.png
        updatedData.avatar = image_name;
      }
      const response = await updateUser(user.userID, updatedData);
  
      if (response.success) {
        triggerSuccessNotification('Profile updated successfully!');
        setNameError('');
        
        authStore.setState({
          user: {
            ...user, 
            fullName: updatedData.fullName,
            avatar: updatedData.avatar,
          },
        });
        console.log("Avatar after user.avatar: ", user.avatar)
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to update profile.';
      triggerErrorNotification(errorMessage);
    }
  };
  
  
  const handleDeletePlace = (indexToRemove) => {
    deleteFavoritePlace(indexToRemove);
  };

  return (
    <div className='full-width-wrapper-user'>
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
          <button className={activeTab === 'yourplace' ? 'active' : ''} onClick={() => setActiveTab('yourplace')}>
            Your place
          </button>
        </div>

        <div className="content">
          {activeTab === 'general' && (
            <div className="general-tab">

              <div className="balance-avatar-container">
                <div className="avatar-section" onClick={handleUploadClick}>
                  <div className="avatar">
                    <img src={user.avatar ? userAvatar : defaultAvatar} alt="Avatar"  /> {/* Show temp avatar */}
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

              <form onSubmit={handleSaveChanges} className="form-container">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={tempFullName} 
                    placeholder={user.fullName}
                    onChange={(e) => setTempFullName(e.target.value)} 
                  />
                  {nameError && <span className="error-message">{nameError}</span>} 
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={user.userEmail}
                    placeholder={user.userEmail}
                    disabled
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Phone</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    placeholder={user.phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    readonly
                    disabled
                  />
                </div>
                <div className="spacer"></div>
                <button type='submit' className="save-button">
                  Save changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'changePassword' && (
            <div className="change-password-tab">
              <form >
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

          {activeTab === 'yourplace' && (
            <div className="your-place-tab">
              {favouritePlaces.length > 0 ? (
                <ul className="favourite-places-list">
                  {favouritePlaces.map((place, index) => (
                    <li className="favourite-place-item" key={index}>
                      <div className="user-place-row">
                        <Icon icon={place.selectedIcon || 'mdi:map-marker'} className="user-place-icon" />
                        <div className="user-place-details">
                          <strong className="user-place-name">{place.locationName || 'N/A'}</strong>
                          <div className="user-place-address">{place.streetAddress || 'N/A'}</div>
                        </div>
                        <button
                          className="delete-place-button"
                          onClick={() => handleDeletePlace(index)}
                          aria-label="Delete place"
                        >
                          &times;
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You have no favourite places yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <SuccessNotify />
    </div>
    </div>
  );
}

export default UserInformation;