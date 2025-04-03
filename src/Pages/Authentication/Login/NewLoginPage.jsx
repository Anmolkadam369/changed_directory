import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import loginimage from '../../../Assets/login/login.svg'
import item1 from '../../../Assets/login/item1.svg'
import item3 from '../../../Assets/login/item3.svg'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState, typeState } from '../../../Auth/Atoms.jsx';
import './LoginPage.css';
import { Alert, Checkbox } from '@mui/material';
// '../../environment';
import trucks1 from "../../../Assets/trucks1.jpg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import claimproassist from "../../../Assets/claimproassistwithoutName.jpg";
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux'
import { login } from './authSlice';
import Footer from '../../Home/Footer';
import encrypt from '../../../Services/Encryption/Encyption.js';

function Login() {
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

    const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';
    const urlBase64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };



    const sendLoginNotification = async (getUserId, getToken) => {
        try {
            console.log('Registering service worker...');
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service worker registered:', registration);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
            console.log('Push Manager subscription:', subscription);

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscription/${getUserId}`, subscription, { headers: { Authorization: `Bearer ${getToken}` } });

        } catch (error) {
            console.error('Error sending login notification:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("userName", email, typeof (email))
        console.log("password", password)

        if (email === "" || password === "") {
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

            let response
            try {
                response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                    email: encryptedEmail.encryptedData,
                    emailIv: encryptedEmail.iv,
                    password: encryptedPassword.encryptedData,
                    passwordIv: encryptedPassword.iv,
                });

            } catch (error) {
                console.log('Error occurred: ', error);
            }


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
                // dispatch(login({ userId, token }));
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
                sendLoginNotification(response.data.userId, response.data.token);
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
                } else if (response.data.data.vendorType === "recoveryVan") {
                    localStorage.setItem("userRole", "recoveryVan");
                    navigate("../crane-user-dashboard");
                } else if (response.data.data.vendorType === "workshop") {
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
                    localStorage.setItem("userType", response.data.data.VendorType);
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

    //   const signupFunc = () => {
    //     navigate('/Registration')
    //   }
    return (
        <>
            <div className='md:px-0 px-[20px] bg-white'>
                <div className="flex items-center md:flex-row flex-col gap-[68px] md:pr-[80px] pr-0">
                    <div className='max-w-[862px] w-full'>
                        <img src={loginimage} alt="" />
                    </div>
                    <div className='max-w-[430px] w-full'>
                        <h6 className="font-[500] font-satoshi text-[30px] text-[#000000] pb-[26px] m-0">Log in</h6>
                        <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0">If you don’t have an account register</p>
                        <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0 pb-[52px]">You can
                            <Link to="/signUp" className='no-underline'>
                                <span className='font-[600] text-[#21A6E9]'> Register here !</span>
                            </Link>
                        </p>
                        <div className="flex flex-col gap-[42px]">
                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Email</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item1} alt="" className="w-[20px] h-[20px]" />
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        required
                                        onChange={handleEmailChange}
                                        value={email}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {emailError && <div style={{ color: 'red', marginTop: '5px', marginLeft: '20px' }}>{emailError}</div>}
                            </div>
                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Password</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item3} alt="" className="w-[20px] h-[20px]" />
                                    <input
                                        className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]'
                                        placeholder='Enter your Password'
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmit(e);
                                            }
                                        }}
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
                                {passwordError && <div style={{ color: 'red', marginTop: '5px', marginLeft: '20px' }}>{passwordError}</div>}

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-[16px]">
                                        <input type="checkbox" onChange={handleRememberMeChange} checked={rememberMe} name="rememberMe" id="rememberMe" />
                                        <p className="font-[400] font-satoshi text-[12px] text-[#000000] m-0">Rememebr me</p>
                                    </div>
                                    <p className="m-0 font-satoshi font-[400] text-[12px] text-[#000000]">Forgot Password ?</p>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className='bg-[#21A6E9] rounded-[32px] py-[14px] font-[500] font-satoshi text-[17px] text-[#FFFFFF]'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
