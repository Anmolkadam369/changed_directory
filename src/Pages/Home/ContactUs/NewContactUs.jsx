import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../../../Auth/Atoms';
import '../../Authentication/Login/LoginPage.css';
import { Alert } from '@mui/material';
import trucks1 from "../../../Assets/logintime_truck.webp";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import Header from '../Header';
import Footer from '../Footer';

import item4 from '../../../Assets/login/item4.svg'
import user from '../../../Assets/login/user.svg'
import item5 from '../../../Assets/login/item5.svg'
import item6 from '../../../Assets/login/item6.svg'
import item7 from '../../../Assets/login/item7.svg'
import item8 from '../../../Assets/login/item8.svg'
import item9 from '../../../Assets/login/item9.svg'
import item10 from '../../../Assets/login/item10.svg'
import image from '../../../Assets/login/image.png'
import { ClipLoader } from 'react-spinners';




function ContactUs() {
    const navigate = useNavigate();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [token, setToken] = useRecoilState(tokenState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const [showPassword, setShowPassword] = useState(false);
    const [fontSize, setFontSize] = useState("35px");
    const [isLoading, setIsLoading] = useState(false);


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNo: '',
        message: '',
        address: ''
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
        setIsLoading(true);
        if (formData.email === "" || formData.fullName === "" || formData.phoneNo === "" || formData.message === "" || formData.address === "") {

            setIsLoading(false);
            setAlertInfo({ show: true, message: 'Please fill all the details', severity: 'error' });
            return;
        }

        if (!validateEmail(formData.email)) {
            setIsLoading(false);
            setAlertInfo({ show: true, message: 'Invalid email address', severity: 'error' });
            return;
        }

        if (!validatePhoneNo(formData.phoneNo)) {
            setIsLoading(false);
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
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            setTimeout(() => {
                navigate("../")
            }, 5000);
        } catch (error) {
            setIsLoading(false);
            console.error("Error during form submission:", error);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    };

    return (
        <div className='bg-white'>
            <div className="contact-section relative md:px-[80px] px-[20px]">
                <h1 className='text-center m-0 pt-[106px] font-satoshi font-[700] text-[60px] text-[#FFFFFF]'>Contact Us</h1>
                <h6 className="m-0 absolute bottom-[18px] font-satoshi font-[500] text-[48px] leading-[68px] text-[#000000]">Contact To Claim Pro Assist</h6>
            </div>
            <div className='md:px-[80px] px-[20px] pt-[35px]'>
                <p className="max-w-[560px] w-full ml-auto mb-0 font-satoshi font-[400] text-[18px] leading-[30px] text-[#515151]">
                    Whether you have a question about services, prices, need a any other details please contact us using the form and the other information on this page.
                </p>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-[40px] md:pt-[90px] pt-[40px] md:pb-[120px] pb-[40px]">
                    <div className='rounded-[16px] px-[30px] bg-[#EFF9FD] pt-[18px] pb-[30px]'>
                        <img src={item4} className='pb-[22px] h-[70px] w-[60px]' alt="" />
                        <h6 className="font-[700] text-[20px] font-satoshi leading-[26px] text-[#000000] pb-[10px]">Support Email</h6>
                        <p className="font-[400] text-[16px] font-satoshi text-[#000000] mb-[20px]">Hello@claimproassist.com</p>
                        <button className='bg-[#21A6E9] rounded-[32px] py-[14px] w-full font-[700] font-satoshi text-[17px] text-[#FFFFFF]'>Email Us</button>
                    </div>
                    <div className='rounded-[16px] px-[30px] bg-[#EFF9FD] pt-[18px] pb-[30px]'>
                        <img src={item5} className='pb-[22px] h-[70px] w-[60px]' alt="" />
                        <h6 className="font-[700] text-[20px] font-satoshi leading-[26px] text-[#000000] pb-[10px]">Phone Number</h6>
                        <p className="font-[400] text-[16px] font-satoshi text-[#000000] mb-[20px]">+91 3266565656565</p>
                        <button className='bg-[#21A6E9] rounded-[32px] py-[14px] w-full font-[700] font-satoshi text-[17px] text-[#FFFFFF]'>Call Us</button>
                    </div>
                    <div className='rounded-[16px] px-[30px] bg-[#EFF9FD] pt-[18px] pb-[30px]'>
                        <img src={item6} className='pb-[22px] h-[70px] w-[60px]' alt="" />
                        <h6 className="font-[700] text-[20px] font-satoshi leading-[26px] text-[#000000] pb-[10px]">Address</h6>
                        <p className="font-[400] text-[16px] font-satoshi text-[#000000] mb-[20px]">12 Cherry street , NJ 10384</p>
                        <button className='bg-[#21A6E9] rounded-[32px] py-[14px] w-full font-[700] font-satoshi text-[17px] text-[#FFFFFF]'>Visit Us</button>
                    </div>
                </div>
                {/* <div className='grid grid-cols-2 grid-cols-1 md:gap-[42px] gap-[42px]'>
                    <div className='bg-[#F9F9F9] rounded-[16px] py-[26px] px-[40px]'>
                        <h6 className="mb-0 font-[500] font-satoshi text-[40px] text-[#102441] pb-[26px]">Get In Touch</h6>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Your Full Name</label>
                                <div className="flex items-center justify-between  px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8]">
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        onChange={handleChange}
                                        value={formData.fullName}
                                        placeholder='Your Full Name'
                                        className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B]' />
                                    <img src={user} className='h-[20px] w-[20px]' alt="" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Your Email</label>
                                <div className="flex items-center justify-between  px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8]">
                                    <input
                                        type="text"
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        value={formData.email}
                                        placeholder='Your Email'
                                        className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B]' />
                                    <img src={item7} className='h-[20px] w-[20px]' alt="" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Your Phone</label>
                                <div className="flex items-center justify-between  px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8]">
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        required
                                        onChange={handleChange}
                                        value={formData.phoneNo}
                                        placeholder='Your Phone' className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B]' />
                                    <img src={item8} className='h-[20px] w-[20px]' alt="" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px] '>Your Address</label>
                                <div className=" flex items-center justify-between px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8] h-[55px]">
                                    <textarea
                                        name="address"
                                        required
                                        onChange={handleChange}
                                        value={formData.address}
                                        placeholder="Your Address"
                                        className="font-[400] pt-[10px] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B] h-full w-full resize-none bg-transparent outline-none self-center"
                                    />
                                    <img src={item9} className="h-[20px] w-[20px]" alt="" />
                                </div>

                            </div>

                            <div className="col-span-2">
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Message</label>
                                <div className="flex items-center justify-between px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8] h-[55px]">
                                    <textarea
                                        name="message"
                                        required
                                        onChange={handleChange}
                                        value={formData.message}
                                        placeholder="Write Message.."
                                        className="font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B] h-[40px] w-full resize-none bg-transparent outline-none self-center"
                                    />
                                    <img src={item9} className="h-[20px] w-full" alt="" />
                                </div>

                            </div>

                        </div>
                        <div className='mt-3 mb-3'>
                            {alertInfo.show && (
                                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                    {alertInfo.message}
                                </Alert>
                            )}
                        </div>
                        <button
                            className='bg-[#21A6E9] rounded-[32px] py-[14px] w-full font-[400] font-satoshi text-[17px] text-[#FFFFFF] mt-[20px]'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : ' Send Message'}
                        </button>
                        {isLoading && (
                            <div className=' flex flex-col items-center justify-center mt-[10px]'>
                                <ClipLoader color="#4CAF50" loading={isLoading} />
                                <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                            </div>
                        )}
                    </div>
                    <div>
                        <img src={image} className='w-full' alt="" />
                    </div>
                </div> */}


                <div className='grid md:grid-cols-2 grid-cols-1 md:gap-[42px] gap-[20px]'>
                    <div className='bg-[#F9F9F9] rounded-[16px] py-[26px] px-[40px]'>
                        <h6 className="mb-0 font-[500] font-satoshi text-[40px] text-[#102441] pb-[26px]">Get In Touch</h6>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Your Full Name</label>
                                <div className="flex items-center justify-between  px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8]">
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        onChange={handleChange}
                                        value={formData.fullName}
                                        placeholder='Your Full Name'
                                        className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B]' />
                                    <img src={user} className='h-[20px] w-[20px]' alt="" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Your Email</label>
                                <div className="flex items-center justify-between  px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8]">
                                    <input
                                        type="text"
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        value={formData.email}
                                        placeholder='Your Email'
                                        className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B]' />
                                    <img src={item7} className='h-[20px] w-[20px]' alt="" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Your Phone</label>
                                <div className="flex items-center justify-between  px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8]">
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        required
                                        onChange={handleChange}
                                        value={formData.phoneNo}
                                        placeholder='Your Phone' className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B]' />
                                    <img src={item8} className='h-[20px] w-[20px]' alt="" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px] '>Your Address</label>
                                <div className=" flex items-center justify-between px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8] h-[55px]">
                                    <textarea
                                        name="address"
                                        required
                                        onChange={handleChange}
                                        value={formData.address}
                                        placeholder="Your Address"
                                        className="font-[400] pt-[10px] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B] h-full w-full resize-none bg-transparent outline-none self-center"
                                    />
                                    <img src={item9} className="h-[20px] w-[20px]" alt="" />
                                </div>

                            </div>

                          

                            <div className="md:col-span-2 col-span-1">
                                <label htmlFor="" className='font-[400] font-satoshi text-[16px] leading-[30px] text-[#0E0E0E] pb-[5px]'>Message</label>
                                <div className="flex items-center justify-between px-[20px] rounded-[8px] bg-[#FFFFFF] border border-[#E3DBD8] h-[55px]">
                                    <textarea
                                        name="message"
                                        required
                                        onChange={handleChange}
                                        value={formData.message}
                                        placeholder="Write Message.."
                                        className="font-[400] font-satoshi text-[16px] leading-[30px] text-[#5B5B5B] h-[40px] w-full resize-none bg-transparent outline-none self-center"
                                    />
                                    <img src={item10} className="h-[20px] w-[20px]" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='mt-3 mb-3'>
                            {alertInfo.show && (
                                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                    {alertInfo.message}
                                </Alert>
                            )}
                        </div>

                        <button
                            className='bg-[#21A6E9] rounded-[32px] py-[14px] w-full font-[400] font-satoshi text-[17px] text-[#FFFFFF] mt-[20px]'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : ' Send Message'}
                        </button>

                        {isLoading && (
                            <div className='flex flex-col items-center justify-center mt-[10px]'>
                                <ClipLoader color="#4CAF50" loading={isLoading} />
                                <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                            </div>
                        )}
                       
                    </div>
                    <div>
                        <img src={image} className='w-full' alt="" />
                    </div>
                </div>

            </div>
            {/* <div className='md:pt-[120px] pt-[40px]'>
                <h6 className='mb-0 pb-[75px] font-[700] font-satoshi text-[48px] leading-[68px] text-[#000000] text-center'>Our Location</h6>
            </div> */}
        </div>
    )
}

export default ContactUs