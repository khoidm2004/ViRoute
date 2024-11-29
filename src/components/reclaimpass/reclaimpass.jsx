import React, {useState} from 'react';
import HidePass from '../hidepass/hidePass.jsx';
import '../reclaimpass/reclaimpass.css'
import Footer from '../footer/footer';

const Reclaimpass = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="reclaim-password-tab">
          <h2 className="reclaim-header">Change the password</h2>
              <form>
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
    );
};
export default Reclaimpass;