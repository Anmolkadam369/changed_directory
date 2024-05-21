import React, { useState ,useEffect } from 'react';
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
  const [fontSize, setFontSize] = useState("35px");



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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 360) {
        setFontSize("20px"); // Adjust the font size as needed to fit the text in one line
      } else {
        setFontSize("30px");
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial font size

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const backgroundStyle = {
    height: '100vh',
    backgroundImage: `url(${trucks1})`, // Add the correct path to your image
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const loginContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingTop: '50px',
    paddingBottom: '50px',
    paddingLeft:"20px",
    paddingRight :"20px",
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    margin:'10px'
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '15px',
    fontSize: '1em', // Adjust font size
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'transparent',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0e4823ff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };
  const headerStyle = {
    fontSize,
    color: "#0e4823ff",
    textAlign: "center",
    marginBottom: '50px'
  };

  return (
    <div style={backgroundStyle}>
      <div style={loginContainerStyle}>
        <h1 style={headerStyle}>Claim Pro Assist</h1>
        <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              style={inputStyle}
              type="text"
              id="username"
              name="username"
              required
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <Input
              style={inputStyle}
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
          </div>
          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {alertInfo.message}
            </Alert>
          )}


<div style={buttonContainerStyle}>
            <Button
              style={buttonStyle}
              onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;