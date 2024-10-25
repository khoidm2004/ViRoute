import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton"; 
import InputAdornment from "@mui/material/InputAdornment"; 
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff"; 
import Input from "@mui/material/Input"; 
import './hidePass.css'

const HidePassLogin = ({ values, handleClickShowPassword, handleMouseDownPassword, handlePasswordChange }) => {
  const inputRef = useRef(null); // Create a ref for the input

  const handleTogglePasswordVisibility = () => {
    const currentPos = inputRef.current.selectionStart; // Get current cursor position

    handleClickShowPassword(); // Toggle password visibility

    // Wait for the state to update and re-render, then set the caret position
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(currentPos, currentPos); // Restore the cursor position
      }
    }, 0); 
  };

  return (
    <Input
      placeholder="Password"
      sx={{
        width: "80%",  // Control width of input field
        fontSize: "25px",  // Control text size inside the input
        padding: "10px",  // Add some padding to the input
        paddingLeft: "20px",
        color: "#000czx",  // Input text color
        '& input::placeholder': {  // Placeholder styling via Material-UI sx prop
          color: "#000",
          opacity: 0.5,  // Placeholder text color
          fontSize: "25px", // Placeholder text size
        },
        backgroundColor: '#fff',  // Set background color of input field
        borderRadius: "10px",  // Round the corners
      }}
      inputRef={inputRef} 
      type={values.showPassword ? "text" : "password"}
      onChange={handlePasswordChange("password")}
      value={values.password}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            className="input-adornment-icon" 
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
