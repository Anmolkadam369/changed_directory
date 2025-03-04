import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import '../Login/LoginPage.css';
import { Alert } from '@mui/material';
// '../../environment';
import trucks1 from "../../Assets/logintime_truck.webp";
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const ContactUs = () => {
    const navigate = useNavigate();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [token, setToken] = useRecoilState(tokenState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const [showPassword, setShowPassword] = useState(false);
    const [fontSize, setFontSize] = useState("35px");


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNo: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNo = (phoneNo) => {
        const re = /^\d{10}$/;
        return re.test(String(phoneNo));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.email === "" || formData.fullName === "" || formData.phoneNo === "" || formData.message === "") {
            setAlertInfo({ show: true, message: 'Please fill all the details', severity: 'error' });
            return;
        }

        if (!validateEmail(formData.email)) {
            setAlertInfo({ show: true, message: 'Invalid email address', severity: 'error' });
            return;
        }

        if (!validatePhoneNo(formData.phoneNo)) {
            setAlertInfo({ show: true, message: 'Invalid phone number. It should be 10 digits.', severity: 'error' });
            return;
        }

        console.log('Form data submitted:', formData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contactUs`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("response", response.data);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            setTimeout(() => {
                navigate("../")
            }, 2000);
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    };


    const backgroundStyle = {
        height: '100vh',
        backgroundImage: `url(${trucks1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
    };

    const loginContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingTop: '20px',
        paddingBottom: '50px',
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        margin: '30px',
        marginLeft: '50px'
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
        marginTop: '5px',
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
        marginBottom: "20px"
    };

    const headerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
    };

    const backButtonStyle = {
        marginRight: '10px',
    };

    const handleBack = () => {
        navigate("../")
    }
    return (
        <div>
            <Header />
            <div style={backgroundStyle}>
                <Helmet>
                    <title>Contact Form - Claimpro</title>
                    <meta name="description" content="Contact form for the query" />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,customer form,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/ContactUs`} />
                </Helmet>
                <div style={loginContainerStyle}>
                    <div style={headerContainerStyle}>
                        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} style={backButtonStyle} />
                        <h1 style={headerStyle}>Contact Us</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={formGroupStyle}>
                            <label htmlFor="fullName" style={labelStyle}>Full Name</label>
                            <input
                                style={inputStyle}
                                type="text"
                                name="fullName"
                                required
                                onChange={handleChange}
                                value={formData.fullName}
                            />
                        </div>

                        <div style={formGroupStyle}>
                            <label htmlFor="email" style={labelStyle}>Email</label>
                            <input
                                style={inputStyle}
                                type="email"
                                name="email"
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div style={formGroupStyle}>
                            <label htmlFor="phoneNo" style={labelStyle}>Phone No</label>
                            <input
                                style={inputStyle}
                                type="text"
                                name="phoneNo"
                                required
                                onChange={handleChange}
                                value={formData.phoneNo}
                            />
                        </div>
                        <div style={formGroupStyle}>
                            <label htmlFor="message" style={labelStyle}>Message</label>
                            <textarea
                                style={inputStyle}
                                name="message"
                                required
                                onChange={handleChange}
                                value={formData.message}
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
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
