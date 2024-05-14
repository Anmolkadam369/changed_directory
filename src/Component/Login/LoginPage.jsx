import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import './LoginPage.css';
import download from '../../Assets/download.png';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import trucks1 from "../../Assets/trucks1.jpg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useRecoilState(tokenState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/login`, {
        username,
        password,
      });
      console.log("Response data:", response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setToken(response.data.token);
        setUserId(response.data.userId);
        setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

        if (response.data.data.username === "admin" || response.data.data.username === "admin2") {
          navigate("../Admin");
        } else if (response.data.data.vendorType === "advocate") {
          navigate("../advocateDashboard");
        } else if (response.data.data.vendorType === "machanic") {
          navigate("../MachanicDashboard");
        } else if (response.data.data.vendorType === "crain") {
          navigate("../CrainDashboard");
        } else if (response.data.data.vendorType === "workshop") {
          navigate("../WorkshopDashboard");
        } else {
          navigate('../userDashboard');
        }
      }
    } catch (error) {
      console.error('Error response:', error.response);
      const errorMessage = error.response.data.message || 'An error occurred';
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: '0 auto',
    maxWidth: '1200px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const imageSectionStyle = {
    flex: 1,
    height: '100%', // Make sure the div has a height
    backgroundImage: `url(${trucks1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'


  };


  const loginContainerStyle = {
    flex: 1,
    padding: '2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: "10px"
  };

  const inputGroupStyle = {
    width: '100%',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%', // Reset to 100% to prevent overflow
    padding: '15px 10px', // Increased vertical padding for a better touch feel
    // border: '2px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '16px',
    margin: '10px 0',
    background: 'lightgrey' // Slightly more transparent than the container
  };
  const inputStyle2 = {
    width: '100%', // Reset to 100% to prevent overflow
    padding: '8px 2px', // Increased vertical padding for a better touch feel
    // border: '2px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '16px',
    margin: '10px 0',
    background: 'lightgrey' // Slightly more transparent than the container
  };

  const buttonStyle = {
    backgroundColor: '#0e4823ff',
    color: 'white',
    border: 'none',
    padding: '15px 20px',
    textTransform: 'uppercase',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%', // Reset to 100% to maintain layout consistency
    fontSize: '18px',
    letterSpacing: '1px',
    outline: 'none',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' // Adds subtle shadow for depth
  };

  const formStyle = {
    width: '100%', // Ensures the form takes the full width of its container
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px' // Adds padding around the form elements inside the container
  };


  return (
    <div style={containerStyle}>
      <div className="image-section" style={imageSectionStyle} />
      <div style={loginContainerStyle}>
        <h1 style={{ fontSize: "35px", color: "#0e4823ff", textAlign: "center" }}>Claim Pro Assist</h1>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              style={inputStyle}
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password">Password</label>
            <Input
              style={inputStyle2}
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            {alertInfo.show && (
              <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                {alertInfo.message}
              </Alert>
            )}
          </div>
          <Button style={buttonStyle} onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
