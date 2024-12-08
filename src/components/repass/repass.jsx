import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './repass.css';
import 'reactjs-popup/dist/index.css';
import checkPass from '../../services/checkEmail';

const PopupRepass = ({ isOpen, onClose }) => {
  const [userEmail, setUserEmail] = useState(''); // Đảm bảo dùng userEmail thay vì email

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngừng việc gửi form mặc định

    try {
      // Gọi hàm checkPass và đợi kết quả
      await checkPass(userEmail);
      alert('Password reset instructions sent.');
      onClose(); // Đóng popup khi thành công
    } catch (error) {
      // Thông báo lỗi nếu không thể gửi yêu cầu
      alert('Failed to send password reset instructions.');
    }
  };

  return (
    <Popup open={isOpen} onClose={onClose} className="popup">
      <form className="popup-inner" onSubmit={handleSubmit}>
        <h1>Password reset</h1>
        <p>You will receive instructions for resetting your password</p>
        <input
          type="email"
          placeholder="Your email address"
          value={userEmail} // Giá trị là userEmail
          onChange={(e) => setUserEmail(e.target.value)} // Cập nhật khi thay đổi input
          required
        />
        <button type="submit">Submit</button>
      </form>
    </Popup>
  );
};
export default PopupRepass;