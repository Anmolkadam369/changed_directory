import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import '../Login/LoginPage.css';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';
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
import claimproassist from "../../Assets/claimproassistwithoutName.jpg";
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';


const CreatePassword = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const [isHovered, setIsHovered] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showemail, setShowemail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fontSize, setFontSize] = useState("35px");

  const handleemailChange = (e) => {
    setemail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setAlertInfo({ show: true, message: 'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol.', severity: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      setAlertInfo({ show: true, message: 'Passwords does not match.', severity: 'error' });
      return;
    }

    console.log("email", email, "password", password, "confirmPassword", confirmPassword)
    try {
      const response = await axios.put(`${backendUrl}/api/changePassword/${userType}`, {
       email,password,confirmPassword
      });
      if (response.status === 200) {
        setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
        setemail('');
        setPassword('')
        setConfirmPassword('')
        window.location.href = 'https://claimpro.in/LoginPage';
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 360) {
        setFontSize("20px");
      } else {
        setFontSize("30px");
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const backgroundStyle = {
    height: '100vh',
    backgroundImage: `url(${trucks1})`,
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
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: '10px',
    maxWidth: '400px',
    width: '100%',
    margin: '10px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '15px',
    fontSize: '1em',
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
    marginTop: '20px',
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
    marginLeft: "5px"
  };
  const headerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  };
  const imgStyle = {
    width: '80px',
    height: 'auto',
  };
  const remembermecontainer = {
    display: "flex",
    alignItems: "center",
  };

  const labelStyle2 = {
    marginLeft: "8px", // Adjust the spacing between checkbox and label
  };

  const linkStyle = {
    marginRight: "20px",
    textAlign: "right",
    color: isHovered ? 'darkblue' : 'blue', // Change color on hover
    textDecoration: "underline",
    boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Add shadow on hover
    transition: 'color 0.3s', // Smooth transition
    cursor:'pointer'
  };

  return (
    <div style={backgroundStyle}>
      <Helmet>
        <title>BVC claimPro assist Password change- Claimpro</title>
        <meta name="description" content="Password Change BVC ClaimPro Assist." />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/LoginPage`} />
      </Helmet>
      <div className="slide-in" style={loginContainerStyle}>
        <div style={headerContainerStyle}>
          <img src={claimproassist} style={imgStyle} alt="company logo" />
          <h1 style={headerStyle}>BVC ClaimPro Assist</h1>
        </div>
        <form onSubmit={handleSubmit}>

          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="text"
              id="email"
              value={email}
              onChange={handleemailChange}
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
          <div style={formGroupStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
            <Input
              style={inputStyle}
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div style={linkStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <a href="https://claimpro.in/LoginPage" style={{ color: 'inherit', textDecoration: 'inherit' }}>
              Log In
            </a>
          </div>
          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {alertInfo.message}
            </Alert>
          )}
          <div style={buttonContainerStyle}>
            <Button
              // style={buttonStyle}
              className='buy_btn'
              onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={handleSubmit}
            >
              Set Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
