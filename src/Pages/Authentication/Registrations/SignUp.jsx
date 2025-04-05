import React, { useState, useEffect } from 'react';
import './Registrations.css'
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
// import '../VenderMaster/VendorMasterForm.css'
import '../../CompanyAdmin/VendorsDetails/VenderMaster/VendorMasterForm.css';
import signup1 from '../../../Assets/signup1.jpg'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
// '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import claimproassist from "../../../Assets/claimproimage.png";
import Header from '../../Home/Header';
import Footer from '../../Home/Footer';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom'
import signupImage from '../../../Assets/login/signup.svg'
import item1 from '../../../Assets/login/item1.svg'
import item2 from '../../../Assets/login/item2.svg'
import item3 from '../../../Assets/login/item3.svg'
import loginimage from '../../../Assets/login/login.svg'


const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};


const SignUp = () => {

    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownVendor, setShowDropdownVendor] = useState(false);
    const [showDropdownCustomer, setShowDropdownCustomer] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [isClickedNext, setIsClickedNext] = useState(false)
    let [passwordError, setPasswordError] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    let [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error('Error loading states:', error);
                setIsLoadingStates(false);
            });
    }
    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Error loading cities:', error);
                setIsLoadingCities(false);
            });
    };

    const [formData, setFormData] = useState({

        FullName: '',
        phone: '',
        joinInType: "",
        vendorType: '',
        customerType: '',
        email: '',
        password: "",
        // country: 'India',
        // state: '',
        // district: "",
        // address: '',
        // pincode: '',
        // latitude: "",
        // longitude: ""       

    });

    // console.log("formdata", formData)

    useEffect(() => {
        if (latitude !== "") {
            setFormData(prevFormData => ({
                ...prevFormData,
                latitude: latitude,
            }));
        }
    }, [latitude]);

    // Update formData when longitude changes
    useEffect(() => {
        if (longitude !== "") {
            setFormData(prevFormData => ({
                ...prevFormData,
                longitude: longitude,
            }));
        }
    }, [longitude]);


    const fullAddress = `${formData.address}, ${formData.district},${formData.pincode}, ${formData.state}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;

    useEffect(() => {
        const getLonLat = async () => {
            try {
                console.log("fulladdress", fullAddress)
                const response = await axios.get(url);
                console.log("response latitude", response.data)
                const location = response.data[0];
                setLatitude(location.lat);
                setLongitude(location.lon);
                console.log(`ANMOL Latitudehere: ${location.lat}, Longitudehere: ${location.lon}`)
            } catch (error) {
                // setLocation("An error occurred while fetching the coordinates.");
            }
        }
        getLonLat()
    }, [fullAddress])

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Create a copy of formData
        let updatedValue = value;

        if (name === "phone") {
            console.log("phonenois", value)
            updatedValue = value.replace(/\D/g, ''); // Remove non-digit characters
            if (updatedValue && updatedValue[0].match(/[6-9]/)) {
                updatedValue = updatedValue.slice(0, 10); // Only keep up to 10 digits if it starts with 6-9
            } else {
                updatedValue = ''; // Return an empty string if the first digit isn't between 6-9
            }
            setFormData({
                ...formData,
                [name]: updatedValue,
            });
        }

        else if (name === "password") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: updatedValue
            }));

            // Password validation
            if (!passwordRegex.test(updatedValue)) {
                setPasswordError('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol.');
            } else {
                setPasswordError('');
            }
            return; // Stop further execution for password
        }

        else if (name === "confirmPassword") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: updatedValue
            }));

            // Confirm Password validation
            if (!passwordRegex.test(updatedValue)) {
                setConfirmPasswordError('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol.');
            } else {
                setConfirmPasswordError('');
            }
            return; // Stop further execution for confirmPassword
        }

        else if (name === "pincode") {
            updatedValue = value.replace(/\D/g, '').slice(0, 6); // Allow digits only, limit to 6 characters
        }

        else if (name === 'email') {
            if (!emailPattern.test(value)) {
                setEmailError('Invalid email address');
            } else {
                setEmailError('');
            }
        }

        else if (name === "address") {
            // No modifications for address, leave as is
            updatedValue = value;
        }

        else if (name === 'state') {
            loadCities(value); // Load cities when state changes
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: updatedValue,
                district: "",
                address: "",
                pincode: ""
            }));
            return; // Stop further execution for state change
        }

        // Capitalize other fields (excluding email, address, phone, etc.)
        if (!["email", "address", "phone", "pincode", "state", "district", "password", "confirmPassword"].includes(name)) {
            updatedValue = value
                .split(' ')
                .map(word => word.toUpperCase())
                .join(' ');
        }

        // Update the formData with the new value
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue
        }));
    };

    const validateForm2 = () => {
        const { customerType, vendorType, ...otherFields } = formData;

        if (formData.joinInType === 'Customer' && formData.customerType === '') {
            return `The field Customer type is required.`;
        }

        else if (formData.joinInType === 'Vendor' && formData.vendorType === '') {
            return `The field Vendor type is required.`;
        }

        for (const [key, value] of Object.entries(otherFields)) {
            if (value === "") {
                return `The field '${key}' is required.`;
            }
        }
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    const validatePhone = (phone) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phone);
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const [width, setWidth] = useState("50%")

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 990) {
                setWidth("100%");
            } else {
                setWidth("50%");
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [email, setEmail] = useState('');

    const handleRoleChange = (e) => {
        setFormData({ ...formData, joinInType: e.target.value });
    };

    const handleCustomerTypeChange = (e) => {
        setFormData({ ...formData, customerType: e.target.value });
    };

    const handleVendorTypeChange = (e) => {
        setFormData({ ...formData, vendorType: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('hellow')
        if (!validateEmail(formData.email)) {
            setAlertInfo({ show: true, message: 'Please Enter Valid Email', severity: 'error' });
            return;
        }

        if (!validatePhone(formData.phone)) {
            setAlertInfo({ show: true, message: 'Please Enter Valid phone Number', severity: 'error' });
            return;
        }

        const validationMessage = validateForm2();
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsLoading(false);
            return;
        }

        if (!validatePassword(formData.password)) {
            setAlertInfo({ show: true, message: 'Please Enter Valid password', severity: 'error' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setAlertInfo({ show: true, message: `Password and Confirm password doesn't match`, severity: 'error' });
            return;
        }

        setIsLoading(true);

       

        let sendData = {};

        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }

        for (const key in sendData) {
            if (sendData[key]) formDataObj.append(key, sendData[key]);
        }

        for (let pair of formDataObj.entries()) {
            console.log(pair[0] + ":" + pair[1])
        }

        console.log(formData);


        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/signupByUser`,
                data: formData,
            });

            console.log('Here is the resposne: =============');
            console.log(response);

            if (response.data.message == 'Thank You !!! You are added successfully! You Will Get Mail For Further Infomation!!!') {
                setIsLoading(false);
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            }
            if (response.data.message == 'We Have An Existing Email !!!') {
                setIsLoading(false);
                setAlertInfo({ show: true, message: response.data.message, severity: 'error' });
            }

            setTimeout(() => {
                // navigate('/LoginPage')
                navigate('/NewLoginPage')

            }, 2000);

            setFormData({});
            sendData = {};

        } catch (error) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';

            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    }

    return (
        <>
            {/* <div className='ps-5 md:px-0 px-[20px] bg-white'>


                <div className="">

                    <div className="row">
                        <div className="col-7">
                            <div >
                                <img src={signupImage} alt="" />
                            </div>
                        </div>
                        <div className="col p-5">
                            <div className=' pb-[10px]'>
                                <h6 className="font-[500] font-satoshi text-[30px] text-[#000000] pb-[26px] m-0 ">Sign up</h6>
                                <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0">If you already have an account register</p>
                                <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0 pb-[26px]">You can  <Link to="/login" className='no-underline'><span className='font-[600] text-[#21A6E9]'>Login here !</span></Link></p>
                                <div className="flex flex-col gap-[42px] pe-[100px]">

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Email</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item1} alt="" className="w-[20px] h-[20px]" />
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                                placeholder="Enter your email address"
                                            />
                                        </div>

                                        {emailError && <div style={{ color: 'red', marginTop: '5px', marginLeft: '20px' }}>{emailError}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Username</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                            <input
                                                type="text"
                                                id="FullName"
                                                name="FullName"
                                                required
                                                value={formData.FullName}
                                                onChange={handleChange}
                                                className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                                placeholder="Enter your User name"
                                            />
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Mobile No.</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                                placeholder="Enter your Mobile No."
                                            />
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Role</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                            <select className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]'
                                                id="joinInType"
                                                name="joinInType"
                                                value={formData.joinInType}
                                                onChange={handleRoleChange}
                                            >
                                                <option value="">Role</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Vendor">Vendor</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Role Type</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                            <select className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]'
                                                id="customerType"
                                                name="customerType"
                                                value={formData.customerType}
                                                onChange={handleCustomerTypeChange}
                                            >
                                                <option value="">Role Type</option>
                                                <option value="retail">Retailer</option>
                                                <option value="fleetOwner">Fleet Owner</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Password</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item3} alt="" className="w-[20px] h-[20px]" />
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                                placeholder="Enter your Password"
                                            />
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Confirm Password</label>
                                        <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                            <img src={item3} alt="" className="w-[20px] h-[20px]" />
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                                placeholder="Confirm your Password"
                                            />
                                        </div>

                                    </div>


                                    <button onClick={handleSubmit} className='bg-[#21A6E9] rounded-[32px] py-[14px] font-[500] font-satoshi text-[17px] text-[#FFFFFF]'>Register</button>

                                </div>

                            </div>
                        </div>
                    </div>



                </div>
            </div> */}

            <div className='md:px-0 px-[20px] bg-white'>
                <div className="flex items-center justify-center md:flex-row flex-col-reverse gap-[68px] md:pr-[80px] pr-0">
                    <div className='max-w-[862px] md:block hidden w-full'>
                        <img src={signupImage} className='mt-[-115px]' alt="" />
                    </div>
                    <div className='max-w-[430px] w-full '>
                        <h6 className="font-[500] font-satoshi text-[30px] text-[#000000] pb-[26px] " style={{ marginTop: '60px' }}>Sign up</h6>
                        <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0">If you already have an account register</p>
                        <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0 pb-[52px] mt-2">You can  <Link to="/login" className='no-underline'><span className='font-[600] text-[#21A6E9]'>Login here !</span></Link></p>
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
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Full Name</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                    {/* <input type="text" className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]' placeholder='Enter your User name' /> */}
                                    <input
                                        type="text"
                                        id="FullName"
                                        name="FullName"
                                        required
                                        value={formData.FullName}
                                        onChange={handleChange}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Enter your Full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Mobile No.</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Enter your Mobile No."
                                    />
                                </div>

                            </div>

                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Role</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                    <select className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]'
                                        id="joinInType"
                                        name="joinInType"
                                        value={formData.joinInType}
                                        onChange={handleRoleChange}
                                    >
                                        <option value="">Role</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Vendor">Vendor</option>
                                    </select>
                                </div>

                            </div>

                            {formData.joinInType === "Customer" && (
                                <div>
                                    <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Role Type</label>
                                    <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                        <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                        <select className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]'
                                            id="customerType"
                                            name="customerType"
                                            value={formData.customerType}
                                            onChange={handleCustomerTypeChange}
                                        >
                                            <option value="">Role Type</option>
                                            <option value="retail">Retailer</option>
                                            <option value="fleetOwner">Fleet Owner</option>
                                        </select>
                                    </div>

                                </div>)}

                            {formData.joinInType === "Vendor" && (
                                <div>
                                    <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Role Type</label>
                                    <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                        <img src={item2} alt="" className="w-[20px] h-[20px]" />
                                        <select className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]'
                                            id="vendorType"
                                            name="vendorType"
                                            value={formData.vendorType}
                                            onChange={handleVendorTypeChange}
                                        >
                                            <option value="">Role Type</option>
                                            <option value="crane">Crane</option>
                                            <option value="mechanic">Mechanic</option>
                                        </select>
                                    </div>

                                </div>)}


                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Password</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item3} alt="" className="w-[20px] h-[20px]" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Enter your Password"
                                    />
                                </div>

                            </div>
                            <div>
                                <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Confirm Password</label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item3} alt="" className="w-[20px] h-[20px]" />
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Confirm your Password"
                                    />
                                </div>

                            </div>
                            <div className='mt-3 mb-3'>
                                {alertInfo.show && (
                                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                        {alertInfo.message}
                                    </Alert>
                                )}
                            </div>
                            <button className='bg-[#21A6E9] rounded-[32px] py-[14px] font-[500] font-satoshi text-[17px] text-[#FFFFFF]' onClick={handleSubmit} >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                            {isLoading && (   
                                <div className='flex flex-col items-center justify-center mt-[10px]'>
                                    <ClipLoader color="#21A6E9" loading={isLoading} />
                                    <div style={{ marginTop: '10px', color: '#21A6E9' }}>Registering you, please wait...</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignUp;


