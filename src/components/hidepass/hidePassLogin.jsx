import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton"; 
import InputAdornment from "@mui/material/InputAdornment"; 
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff"; 
import Input from "@mui/material/Input"; 
import './hidePass.css';

const HidePassLogin = ({ values, handleClickShowPassword, handleMouseDownPassword, handlePasswordChange }) => {
  const inputRef = useRef(null);

  const handleTogglePasswordVisibility = () => {
    const currentPos = inputRef.current.selectionStart;
    handleClickShowPassword();
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(currentPos, currentPos); 
      }
    }, 0); 
  };

  return (
    <Input
      placeholder="Password"
      sx={{
        width: "80%", 
        fontSize: "25px",  
        padding: "10px",  
        paddingLeft: "20px",
        color: "#000", 
        '& input::placeholder': {  
          color: "#000",
          opacity: 0.5,  
          fontSize: "25px", 
        },
        backgroundColor: '#fff',  
        borderRadius: "10px",  
      }}
      inputRef={inputRef} 
      type={values.showPassword ? "text" : "password"}
      onChange={handlePasswordChange}
      value={values.password}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={handleTogglePasswordVisibility}
            onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      disableUnderline={true} 
    />
  );
};

export default HidePassLogin;
