import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import './LoginPage.css';
import download from '../../Assets/download.png';
import { Alert } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useRecoilState(tokenState);
  const [userId, setUserId] = useRecoilState(userIdState);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });
      console.log("Response data:", response.data);
      if (response.status === 200) {  // Check should typically be against status code 200 for OK
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
      const errorMessage = error.response?.message || 'An error occurred';
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };
  console.log(alertInfo);

  return (
    
    <div className="wrapper">
      <div className="title">Login Form</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input type="text" onChange={handleUsernameChange} value={username} required />
          <label>User Name</label>
        </div>
        <div className="field">
          <input type="password" onChange={handlePasswordChange} value={password} required />
          <label>Password</label>
        </div>
        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}
        <div className="field">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <a href="#">Signup now</a>
        </div>
      </form>
      
    </div>
  );
};

export default Login;
