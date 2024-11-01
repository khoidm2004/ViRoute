import React, { useState } from 'react';
import './user_information.css'; // Link to your CSS file for styling

function UserInformation() {
  const [activeTab, setActiveTab] = useState('general');
  const [avatar, setAvatar] = useState('../images/Default_avatar.png'); // Initial avatar URL
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  const [fullName, setFullName] = useState('Thang'); // State for full name
  const [email, setEmail] = useState('thang@mail.com'); // State for email
  const [phone, setPhone] = useState('0123456789'); // State for phone

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Optionally, create a URL for the selected image to preview it
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="account-settings-container">
      {/* Account Information Header */}
      <h2 className="account-info-header">Account Information</h2>

      {/* Main Content Wrapper with Shadow Box */}
      <div className="settings-box">
        <div className="tabs-container">
          <button
            className={activeTab === 'general' ? 'active' : ''}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={activeTab === 'changePassword' ? 'active' : ''}
            onClick={() => setActiveTab('changePassword')}
          >
            Change Password
          </button>
        </div>

        <div className="content">
          {activeTab === 'general' && (
            <div className="general-tab">
              {/* Balance and Avatar Upload Section */}
              <div className="balance-avatar-container">
                <div className="avatar-section">
                  <div className="avatar">
                    <img src={avatar} alt="Avatar" /> {/* Replace with user's avatar URL */}
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
                  onChange={handleInputChange(setFullName)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleInputChange(setEmail)}
                />
              </div>
              <div className="form-group">
                <label>Mobile Phone</label>
                <input
                  type="text"
                  value={phone}
                  placeholder="Enter your mobile phone"
                  onChange={handleInputChange(setPhone)}
                />
              </div>
              <button className="save-button">Save changes</button>
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
              <button className="save-button">Change password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
