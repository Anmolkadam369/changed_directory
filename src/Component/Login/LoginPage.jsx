import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState, typeState } from '../Auth/Atoms';
import './LoginPage.css';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';
// '../../environment';
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
import logintime_truck from '../../Assets/logintime_truck.webp'
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux'
import { login } from './authSlice';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import encrypt from '../../Services/Encyption';


const Login = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [typeOf, setTypeOf] = useRecoilState(typeState);
  const [showPassword, setShowPassword] = useState(false);
  const [fontSize, setFontSize] = useState("35px");
  const [emailError, setEmailError] = useState('');
  let [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const rememberMeFlag = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && rememberMeFlag) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(rememberMeFlag);
    }
  }, []);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!emailPattern.test(newEmail)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(e.target.value);
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol.');
    } else {
      setPasswordError('');
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  // const [selected, setSelected] = useState(0);
  // const handleClick = (value) => {
  //   setSelected((prevSelected) => (prevSelected === value ? null : value));
  // };

  // const getStyles = () => {
  //   switch (selected) {
  //     case 1:
  //       return {
  //         backgroundColor: "#ffffffa1",
  //         border: '1px solid red',
  //         boxShadow: 'rgba(0, 0, 0, 0.2) -10px -20px 14px 4px'
  //       };
  //     case 2:
  //       return {
  //         backgroundColor: "#ffffffa1",
  //         border: '1px solid blue',
  //         boxShadow: 'rgba(0, 0, 0, 0.8) 13px -20px 20px'
  //       };
  //     default:
  //       return {
  //         backgroundColor:"#ffffffa1",
  //         border: '1px solid green', // No border color
  //         // boxShadow: 'inset rgba(0, 0, 0, 0.8) -3px -1px 20px 0px' // No box-shadow
  //       };
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userName", email, typeof (email))
    console.log("password", password)

    if (email == "" || password == "") {
      setAlertInfo({ show: true, message: "Please Fill Form Properly", severity: 'error' });
      return;
    }

    try {
      const encryptedEmail = await encrypt(email);
      const encryptedPassword = await encrypt(password);
      console.log("email", encryptedEmail)
      console.log("password", encryptedPassword)

      console.log({
        email: encryptedEmail.encryptedData,
        emailIv: encryptedEmail.iv,
        password: encryptedPassword.encryptedData,
        passwordIv: encryptedPassword.iv,
      })

      console.log(process.env.REACT_APP_BACKEND_URL);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        email: encryptedEmail.encryptedData,
        emailIv: encryptedEmail.iv,
        password: encryptedPassword.encryptedData,
        passwordIv: encryptedPassword.iv,
      });
      if (response.status === 200) {
        console.log('some', response.data)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("loginId", response.data.loginId);
        localStorage.setItem('loginTime', Date.now());
        document.cookie = `token=${response.data.token}; path=/; max-age=${48 * 60 * 60}; secure; samesite=strict`;

        if (response.data?.data.department) {
          localStorage.setItem("department", response.data.data.department);
        }
        setToken(response.data.token);
        setUserId(response.data.userId);
        setTypeOf(response.data.data.department ? response.data.data.department : "");
        dispatch(login({ userId, token }));
        console.log("I AM TOKEN MASTER222222")


        // Save in cookies (accessible from the backend)

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);

          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberedaEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.removeItem("rememberMe");

        }

        setAlertInfo({ show: true, messageAdvocate: response.data.message, severity: 'success' });

        console.log("RESPONSEONDSTS", response.data.data.userType)
        if (response.data.data?.userType === "admin" ||
          response.data.data.department?.trim() === "Management") {
          localStorage.setItem("userRole", "Management");
          navigate("../admin-dashboard-vendor-customer");
        } else if (response.data.data.department?.trim() === "IT") {
          console.log("trim department", response.data.data.department)
          localStorage.setItem("userRole", "IT");
          navigate("../admin-dashboard-vendor-customer");
        }
        else if (response.data.data.vendorType === "advocate") {
          localStorage.setItem("userRole", "advocate");
          navigate("../advocateDashboard");
        } else if (response.data.data.vendorType === "mechanic") {
          localStorage.setItem("userRole", "mechanic");
          navigate("../MechanicDashboard");
        } else if (response.data.data.vendorType === "crane") {
          localStorage.setItem("userRole", "crane");
            navigate("../crane-user-dashboard");
        }else if (response.data.data.vendorType === "recoveryVan") {
          localStorage.setItem("userRole", "recoveryVan");
            navigate("../crane-user-dashboard");
        }else if (response.data.data.vendorType === "workshop") {
          localStorage.setItem("userRole", "workshop");
          navigate("../WorkshopDashboard");
        } else if (response.data.data.department === "Administration") {
          localStorage.setItem("userRole", "Administration");
          navigate("../Admin");
        }
        else if (response.data.data.department === "Sales") {
          localStorage.setItem("userRole", "sales");
          navigate("../Salesteam");
        }
        else if (response.data.data.customerDriverCode) {
          console.log("userRole", "customerDriver");

          localStorage.setItem("userRole", "customerDriver");
          navigate("../register-new-accidentvehicle");
        }
        else if (response.data.data.vendorDriverCode) {
          console.log("userRole", "vendorDriver");
          localStorage.setItem("userRole", "vendorDriver");
          localStorage.setItem("userType", response.data.data.type);
          navigate("../crane-driver-home");
        }
        else {
          localStorage.setItem("userRole", "customer");
          localStorage.setItem("fromLogin", true)
          navigate('../user-landing-page');
        }
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

  const signupFunc = () => {
    navigate('/Registration')
  }

  const backgroundStyle = {
    height: '110vh',
    backgroundImage: `url(${trucks1})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  };

  const loginContainerStyle = {
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingTop: '30px',
    paddingBottom: '30px',
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: '10px',
    maxWidth: '400px',
    width: '100%',
    margin: '10px',
    backgroundColor: `rgba(255, 255, 255, 0.63)`,
    border: `1px solid green`,
    boxShadow: `rgba(0, 0, 0, 0.8) -3px -1px 20px 0px inset`,
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
    fontSize: "25px",
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
    cursor: 'pointer'
  };

  return (
    <div>
      {/* <Header /> */}
      <div style={backgroundStyle}>
        <Helmet>
          <title>BVC claimPro assist Login - Claimpro</title>
          <meta name="description" content="login for BVC ClaimPro Assist." />
          <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
          <link rel='canonical' href={`https://claimpro.in/LoginPage`} />
        </Helmet>
        <div className="slide-in" style={loginContainerStyle}>
          <div style={headerContainerStyle}>
            <img src={claimproassist} style={imgStyle} alt="company logo" />
            <h1 className='text-base' style={headerStyle}>BVC ClaimPro Assist</h1>
          </div>

          <div className="selecting-container">
            {/* <div
              className={`selecting-box vendorselected ${selected === 1 ? 'selected' : ''}`}
              onClick={() => handleClick(1)}
            >
              Vendor
            </div>
            <div
              className={`selecting-box customerselected ${selected === 2 ? 'selected' : ''}`}
              onClick={() => handleClick(2)}
            >
              Customer
            </div> */}
          </div>
          <form onSubmit={handleSubmit} style={{
            marginTop: "20px",
            padding: "5px",
            borderRadius: "10px",
            // ...getStyles()
            border: '1px solid green',
          }}>
            <div style={formGroupStyle}>
              <label htmlFor="email" style={labelStyle}>Email : </label>
              <input
                style={inputStyle}
                type="text"
                id="email"
                name="email"
                required
                onChange={handleEmailChange}
                value={email}
              />
              {emailError && <div style={{ color: 'red', marginTop: '5px' }}>{emailError}</div>}
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="password" style={labelStyle}>Password :</label>
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
              {passwordError && <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gap: "10px" }}>
              <div style={remembermecontainer}>
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  name="rememberMe"
                  color="primary"
                />
                <span style={labelStyle2}>Remember Me</span>
              </div>
              {/* <div style={linkStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
              <span onClick={signupFunc}>sign up</span>
            </div> */}
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
                Login
              </Button>

            </div>
            <div className='linkStyle'
              onClick={signupFunc}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)} style={{
                display: 'flex',
                justifyContent: "flex-end",
                fontSize: "15px",
                padding: "10px",
                marginRight: "20px",
                textAlign: "right",
                color: isHovered ? 'darkblue' : 'blue', // Change color on hover
                textDecoration: "underline",
                boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Add shadow on hover
                transition: 'color 0.3s', // Smooth transition
                cursor: 'pointer'
              }}>
              Account not created ? sign up
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
