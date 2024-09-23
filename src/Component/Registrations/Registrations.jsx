import React, { useState, useEffect, useRef } from 'react';
import './Registrations.css'
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import '../VenderMaster/VendorMasterForm.css'
import signup1 from '../../Assets/signup1.jpg'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import claimproassist from "../../Assets/claimproassistwithoutNameblue.jpg";

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const Registrations = () => {


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

    console.log("isclicknext", isClickedNext)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;




    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const toggleDropdown1 = () => setShowDropdownVendor(!showDropdownVendor);
    const toggleDropdown2 = () => setShowDropdownCustomer(!showDropdownCustomer);

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirmPassword(!showConfirmPassword);
    };

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
        joinInType: "Customer",
        vendorType: '',
        customerType: '',
        phone: '',
        email: '',
        country: 'India',
        state: '',
        district: "",
        address: '',
        pincode: '',
        password: "",
        latitude: "",
        longitude: ""
    });

    console.log("formdata", formData)

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


    const handleSelect = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            joinInType: value
        });
        setShowDropdown(false);
    };

    const handleSelect1 = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            vendorType: value,
            customerType: ""
        });
        setShowDropdownVendor(false);
    };

    const handleSelect2 = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            customerType: value,
            vendorType: ""
        });
        setShowDropdownCustomer(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Create a copy of formData
        let updatedValue = value;

        // Process specific fields differently
        if (name === "phone") {
            updatedValue = value.replace(/\D/g, '').slice(0, 10); // Only allow digits and limit to 10
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


    const goToNext = () => {
        setIsClickedNext(!isClickedNext)
        setIsClicked(!isClicked);
    }

    const validateForm = () => {
        const { customerType, vendorType, ...otherFields } = formData;

        if (customerType === "" && vendorType === "") {
            return `Please choose either customer type or vendor type.`;
        }

        const cleanedPhone = formData.phone.replace(/\D/g, '');
        console.log("cleandPhone", cleanedPhone)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(cleanedPhone)) {
            return 'Please enter a valid Phone Number.';
        }
        for (const [key, value] of Object.entries(otherFields)) {
            if (value === "") {
                return `Please Fill All Details. The field '${key}' is required.`;
            }
        }
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(formData.password) || !validatePassword(formData.confirmPassword)) {
            setAlertInfo({ show: true, message: 'Password and Confirm Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol.', severity: 'error' });
            return;
        }

        if (!validateEmail(formData.email)) {
            setAlertInfo({ show: true, message: 'Please Enter Valid Email', severity: 'error' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setAlertInfo({ show: true, message: 'Passwords does not match.', severity: 'error' });
            return;
        }


        setIsLoading(true);

        const validationMessage = validateForm();
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsLoading(false);
            return;
        }

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

        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/signupByUser`,
                data: formData,
            });
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

            setTimeout(() => {
                navigate('/LoginPage')
            }, 2000);

            setFormData({});
            sendData = {};

        } catch (error) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';

            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    }
    const loginFunc = () => {
        navigate('/LoginPage')
    }
    const [width, setWidth]= useState("50%")
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



    return (
        <section className="" style={{ height: "auto", background: "linear-gradient(to right, rgb(27 71 144), rgb(240 240 240))" }}>
            <div className="container py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100" >
                    <div className="col-12" style={{ marginBottom: "20px" }}>
                        <div className="card card-registration card-registration-2"
                            style={{
                                borderRadius: "15px",
                                marginBottom: "20px",
                                width:"90%",
                                marginLeft:"30px"
                            }}>


                            <div className="card-body p-0">
                                <div className="row g-0">
                                    {/* <div className="col-lg-6 bg-lightblue text-white" style={{ background: "lightblue" }}>
                                        <div className="p-5"> */}
                                    <div className="col-12 col-md-6 text-bg-primary custom-background" style={{width}}>
                                        <div className="d-flex justify-content-center h-100" style={{ marginTop: '20px' }}>
                                            <div className="col-10 col-xl-8 py-3">
                                                <img src={claimproassist} style={{ width: "90px", height: 'auto' }} alt="company logo" />
                                                <p style={{ alignItems: "center", justifyContent: "center" }}>BVC CLAIM PRO</p>
                                                <hr className="border-primary-subtle mb-4" />
                                                <h4 className="h3 mb-4 gradient-background" style={{ color: "white", textAlign: "center" }}>BVC ClaimPro Assist is providing services for you in toughest time.</h4>
                                                <p className="lead m-0" style={{ color: "yellow", textAlign: "center" }}>Ensuring smooth business continuity post accidents . Come and join your business with us and be relaxed.</p>
                                                <img src={signup1} style={{ marginTop: "20px", height: 'auto', borderRadius: "20px", boxShadow: "rgb(0 0 0) 20px 20px 60px, rgba(255, 255, 255, 0.28) -13px 20px 60px 20px inset" }} alt="company logo" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                                <div className="col-md-5 mb-4">
                                                    <div className="form-outline form-white">
                                                        <input type="text" id="form3Examplea7" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="form3Examplea7">Code +</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-7 mb-4">
                                                    <div className="form-outline form-white">
                                                        <input type="text" id="form3Examplea8" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="form3Examplea8">Phone Number</label>
                                                    </div>
                                                </div>
                                            </div> */}



                                    {/* <div className="form-check d-flex justify-content-start mb-4 pb-3">
                                                <input className="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label text-white" htmlFor="form2Example3">
                                                    I do accept the <a href="#!" className="text-white"><u>Terms and Conditions</u></a> of your site.
                                                </label>
                                            </div> */}

                                    {/* </div>
                                    </div> */}
                                    {!isClickedNext && (<div className="col-lg-6" style={{ background: "#ccccc" }}>
                                        <div className="p-5">
                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <div className='row'>
                                                <div className=" col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            // id="form3Examplev2"
                                                            className="form-control form-control-lg"
                                                            name="FullName"
                                                            onChange={handleChange}
                                                            value={formData.FullName}
                                                            style={{ border: "1px solid black" }}

                                                        />
                                                        <label className="form-label" htmlFor="form3Examplev2">Full Name</label>
                                                    </div>
                                                </div>
                                                <div className=" col-md-6 mb-4">
                                                    <div className="form-outline form-white">
                                                        <input type="text" id="form3Examplea6" className="form-control form-control-lg" name='country' value={"India"} readOnly style={{ border: "1px solid black" }} />
                                                        <label className="form-label" htmlFor="form3Examplea6">Country</label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="row">

                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Examplev3" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="form3Examplev3">Last name</label>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="row">
                                                <div className="col-md-6 mb-4" style={{ paddingLeft: "7px" }}>
                                                    <div className="form-outline form-white">
                                                        <div className="dropdown green-dropdown form-field">
                                                            <button
                                                                className="form-field input-group mb-3"
                                                                type="button"
                                                                id="dropdownMenuButton"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                onClick={toggleDropdown}
                                                                style={{ borderRadius: "5px", padding: "15px", background: 'white', marginTop: "0px", border: '1px solid black' }}
                                                            >
                                                                <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                                                                    <p style={{ alignItems: "left" }}>{formData.joinInType || "Select Type"}</p>
                                                                </div>
                                                            </button>
                                                            <ul style={{ alignItems: "center" }} className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                                                <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "Vendor")}>Vendor</a></li>
                                                                <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "Customer")}>Customer</a></li>
                                                            </ul>
                                                            <label className="form-label" htmlFor="dropdownMenuButton" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Select Type</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {formData.joinInType === "Vendor" && (
                                                    <div className="col-md-6 mb-4" style={{ paddingLeft: "7px" }}>
                                                        <div className="form-outline form-white">
                                                            <div className="dropdown green-dropdown form-field">
                                                                <button
                                                                    className="form-field input-group mb-3 form-control-lg"
                                                                    type="button"
                                                                    id="dropdownMenuButton1"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                    onClick={toggleDropdown1}
                                                                    style={{ borderRadius: "5px", padding: "15px", background: 'white', marginTop: "0px", border: '1px solid black' }}
                                                                >
                                                                    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                                                                        <p style={{ alignItems: "left" }}>{formData.vendorType || "Select Vendor Type"}</p>
                                                                    </div>
                                                                </button>
                                                                <ul style={{ alignItems: "center" }} className={`dropdown-menu${showDropdownVendor ? " show" : ""}`} aria-labelledby="dropdownMenuButton1">
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "advocate")}>Advocate</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "crane")}>Crane</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "mechanic")}>Mechanic</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "workshop")}>Workshop</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "partsDistributor")}>Parts Distributor</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "insuranceCompany")}>Insurance Company</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "surveyor")}>Surveyor</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "scrapBuyer")}>Scrap Buyer</a></li>
                                                                </ul>
                                                                <label className="form-label" htmlFor="dropdownMenuButton" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Vendor Type</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {formData.joinInType === "Customer" && (
                                                    <div className="col-md-6 mb-4" style={{ paddingLeft: "7px" }}>
                                                        <div className="form-outline form-white">
                                                            <div className="dropdown green-dropdown form-field">
                                                                <button
                                                                    className="form-field input-group mb-3 form-control-lg"
                                                                    type="button"
                                                                    id="dropdownMenuButton2"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                    onClick={toggleDropdown2}
                                                                    style={{ borderRadius: "5px", padding: "15px", background: 'white', marginTop: "0px", border: '1px solid black' }}
                                                                >

                                                                    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                                                                        <p style={{ alignItems: "left" }}>{formData.customerType || "Select Customer Type"}</p>
                                                                    </div>
                                                                </button>
                                                                <ul style={{ alignItems: "center" }} className={`dropdown-menu${showDropdownCustomer ? " show" : ""}`} aria-labelledby="dropdownMenuButton2">
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect2(e, "retail")}>Retailer</a></li>
                                                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect2(e, "fleetOwner")}>Fleet Owner</a></li>
                                                                </ul>
                                                                <label className="form-label" htmlFor="dropdownMenuButton2" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Customer Type</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                            <div className='row'>
                                                <div className=" col-md-6 mb-4">
                                                    <div className="form-outline form-white">
                                                        <input type="text" name="phone" id="form3Examplea8" className="form-control form-control-lg" onChange={handleChange} value={formData.phone} style={{ border: "1px solid black" }} />
                                                        <label className="form-label" htmlFor="form3Examplea8">Phone Number</label>
                                                    </div>
                                                </div>

                                                <div className=" col-md-6 mb-4">
                                                    <div className="form-outline form-white">
                                                        <input type="text" id="form3Examplea9" className="form-control form-control-lg" name="email" onChange={handleChange} value={formData.email} style={{ border: "1px solid black" }} />
                                                        <label className="form-label" htmlFor="form3Examplea9">Your Email</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4" style={{ paddingLeft: "7px" }}>
                                                    <div className="form-outline form-white">
                                                        <div className="dropdown green-dropdown form-field col-md-6 mb-4">
                                                            <select
                                                                name="state"
                                                                style={{
                                                                    borderRadius: "5px",
                                                                    padding: "15px",
                                                                    background: 'white',
                                                                    marginTop: "0px",
                                                                    border: '1px solid black',
                                                                    width: '100%' // Makes sure it takes up the full width like the button
                                                                }}
                                                                onChange={handleChange}
                                                                disabled={isLoadingStates}
                                                                value={formData.state}>
                                                                <option value="">Select State</option>
                                                                {states.map(state => (
                                                                    <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                                                ))}
                                                            </select>
                                                            <label className="form-label" htmlFor="dropdownMenuButton" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Select State</label>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-4" style={{ paddingLeft: "7px" }}>
                                                    <div className="form-outline form-white">
                                                        <div className="dropdown green-dropdown form-field col-md-6 mb-4">
                                                            <select
                                                                name="district"
                                                                style={{
                                                                    padding: "15px",
                                                                    borderRadius: "5px",
                                                                    background: 'white',
                                                                    marginTop: "0px",
                                                                    border: '1px solid black',
                                                                    width: '100%' // Full-width to match the button style
                                                                }}
                                                                value={formData.district}
                                                                onChange={handleChange}
                                                                disabled={isLoadingCities || !formData.state}
                                                            >
                                                                <option value="">Select City</option>
                                                                {!cities.error && cities.map(city => (
                                                                    <option key={city.iso2} value={city.iso2}>
                                                                        {city.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <label className="form-label" htmlFor="dropdownMenuButton" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px", fontSize: "12px" }}>Select City</label>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className=" col-md-6 mb-4">
                                                    <div className="form-outline form-white">
                                                        <textarea
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                            required
                                                            className="form-control"
                                                            style={{ border: "1px solid black" }}
                                                        />
                                                        <label className="form-label" htmlFor="form3Examplea2">Address</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline form-white">
                                                        <input
                                                            type='tel'
                                                            name="pincode"
                                                            value={formData.pincode}
                                                            onChange={handleChange}
                                                            required
                                                            pattern="\d{6}"
                                                            title="Pincode must be 6 digits"
                                                            className="form-control"
                                                            style={{ border: "1px solid black" }}
                                                        />
                                                        <label className="form-label" htmlFor="form3Examplea4">Pin Code</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="button" className={`btn btn-dark btn-lg ${isClicked ? 'clicked' : ''}`} data-mdb-ripple-color="dark" onClick={goToNext} style={{ borderRadius: "30px", background: "none", color: "green", fontSize: "15px", paddingRight: "0px", paddingLeft: "10px" }} >
                                                    <div style={{ alignItems: 'center', display: "flex", flexDirection: "column" }}>
                                                        <Button startIcon={<ArrowForwardIcon />} style={{ background: "none", color: "#077ede" }} onClick={goToNext} />
                                                    </div>
                                                </button>
                                            </div>

                                        </div>
                                    </div>)}

                                    {isClickedNext && (
                                        <div className="col-lg-6" style={{ background: "#ccccc" }}>
                                            <div className="p-5">
                                                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                                                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={goToNext} />
                                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create Password</p>
                                                </div>
                                                <div className=" mb-4">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            // id="form3Examplev2"
                                                            className="form-control form-control-lg"
                                                            name="FullName"
                                                            onChange={handleChange}
                                                            value={formData.FullName}
                                                            style={{ border: "1px solid black" }}

                                                        />
                                                        <label className="form-label" htmlFor="form3Examplev2">Full Name</label>
                                                    </div>
                                                </div>


                                                {/* <div className="row">
 
                                                 <div className="col-md-6 mb-4">
                                                     <div className="form-outline">
                                                         <input type="text" id="form3Examplev3" className="form-control form-control-lg" />
                                                         <label className="form-label" htmlFor="form3Examplev3">Last name</label>
                                                     </div>
                                                 </div>
                                             </div> */}
                                                {/* <div className="row">
                                                 <div className="col-md-6 mb-4" style={{paddingLeft:"7px"}}>
                                                     <div className="form-outline form-white">
                                                         <div className="dropdown green-dropdown form-field">
                                                             <button
                                                                 className="form-field input-group mb-3"
                                                                 type="button"
                                                                 id="dropdownMenuButton"
                                                                 data-bs-toggle="dropdown"
                                                                 aria-expanded="false"
                                                                 onClick={toggleDropdown}
                                                                 style={{ borderRadius: "5px", padding: "15px", background: 'white', marginTop: "0px", border: '1px solid black' }}
                                                             >
                                                                 <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                                                                 <p style={{alignItems:"left"}}>{formData.joinInType || "Select Type"}</p>
                                                                 </div>
                                                             </button>
                                                             <ul style={{ alignItems: "center" }} className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                                                 <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "Vendor")}>Vendor</a></li>
                                                                 <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "Customer")}>Customer</a></li>
                                                             </ul>
                                                             <label className="form-label" htmlFor="dropdownMenuButton" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Select Type</label>
                                                         </div>
                                                     </div>
                                                 </div>
 
                                                 {formData.joinInType === "Vendor" && (
                                                     <div className="col-md-6 mb-4" style={{paddingLeft:"7px"}}>
                                                         <div className="form-outline form-white">
                                                             <div className="dropdown green-dropdown form-field">
                                                                 <button
                                                                     className="form-field input-group mb-3 form-control-lg"
                                                                     type="button"
                                                                     id="dropdownMenuButton1"
                                                                     data-bs-toggle="dropdown"
                                                                     aria-expanded="false"
                                                                     onClick={toggleDropdown1}
                                                                     style={{ borderRadius: "5px", padding: "15px", background: 'white', marginTop: "0px", border: '1px solid black' }}
                                                                 >
                                                                     <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                                                                 <p style={{alignItems:"left"}}>{formData.vendorType || "Select Vendor Type"}</p>
                                                                 </div>
                                                                 </button>
                                                                 <ul style={{ alignItems: "center" }} className={`dropdown-menu${showDropdownVendor ? " show" : ""}`} aria-labelledby="dropdownMenuButton1">
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "advocate")}>Advocate</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "crane")}>Crane</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "mechanic")}>Mechanic</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "workshop")}>Workshop</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "partsDistributor")}>Parts Distributor</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "insuranceCompany")}>Insurance Company</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "surveyor")}>Surveyor</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect1(e, "scrapBuyer")}>Scrap Buyer</a></li>
                                                                 </ul>
                                                                 <label className="form-label" htmlFor="dropdownMenuButton" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Vendor Type</label>
                                                             </div>
                                                         </div>
                                                     </div>
                                                 )}
 
                                                 {formData.joinInType === "Customer" && (
                                                     <div className="col-md-6 mb-4" style={{paddingLeft:"7px"}}>
                                                         <div className="form-outline form-white">
                                                             <div className="dropdown green-dropdown form-field">
                                                                 <button
                                                                     className="form-field input-group mb-3 form-control-lg"
                                                                     type="button"
                                                                     id="dropdownMenuButton2"
                                                                     data-bs-toggle="dropdown"
                                                                     aria-expanded="false"
                                                                     onClick={toggleDropdown2}
                                                                     style={{ borderRadius: "5px", padding: "15px", background: 'white', marginTop: "0px", border: '1px solid black' }}
                                                                 >
                                                                     
                                                                     <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                                                                 <p style={{alignItems:"left"}}>{formData.customerType || "Select Customer Type"}</p>
                                                                 </div>
                                                                 </button>
                                                                 <ul style={{ alignItems: "center" }} className={`dropdown-menu${showDropdownCustomer ? " show" : ""}`} aria-labelledby="dropdownMenuButton2">
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect2(e, "retail")}>Retailer</a></li>
                                                                     <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect2(e, "fleetOwner")}>Fleet Owner</a></li>
                                                                 </ul>
                                                                 <label className="form-label" htmlFor="dropdownMenuButton2" style={{ top: '-10px', left: '8px', color: "blue", fontSize: "12px" }}>Customer Type</label>
                                                             </div>
                                                         </div>
                                                     </div>
                                                 )}
                                             </div>
  */}



                                                <div className="mb-4">
                                                    <div className="form-outline form-white">
                                                        <input type="text" id="form3Examplea9" className="form-control form-control-lg" name="email" onChange={handleChange} value={formData.email} style={{ border: "1px solid black" }} />
                                                        <label className="form-label" htmlFor="form3Examplea9">Your Email</label>
                                                        {emailError && <div style={{ color: 'red', marginTop: '5px' }}>{emailError}</div>}
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="form-outline form-white">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            id="form3Examplea9"
                                                            className="form-control form-control-lg"
                                                            name="password"
                                                            onChange={handleChange}
                                                            value={formData.password}
                                                            style={{ border: "1px solid black" }}
                                                        />
                                                        <label className="form-label" htmlFor="form3Examplea9">Password</label>

                                                        <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={togglePasswordVisibility}
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </div>

                                                        {passwordError && (
                                                            <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="form-outline form-white">
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            id="form3Examplea9"
                                                            className="form-control form-control-lg"
                                                            name="confirmPassword"
                                                            onChange={handleChange}
                                                            value={formData.confirmPassword}
                                                            style={{ border: "1px solid black" }}
                                                        />
                                                        <label className="form-label" htmlFor="form3Examplea9">Confirm Password</label>

                                                        <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={togglePasswordVisibility1}
                                                            >
                                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </div>

                                                        {confirmPasswordError && (
                                                            <div style={{ color: 'red', marginTop: '5px' }}>{confirmPasswordError}</div>
                                                        )}
                                                    </div>
                                                </div>




                                                {alertInfo.show && (
                                                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                                        {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                                                    </Alert>
                                                )}
                                                <div className="d-flex justify-content-center" style={{ marginTop: "20px" }}>
                                                    <button type="button" style={{ marginRight: '10px' }} className="btn btn-dark btn-lg" data-mdb-ripple-color="dark" onClick={handleSubmit} >
                                                        Register
                                                    </button>

                                                </div>
                                                <div className='linkStyle'
                                                    onClick={loginFunc}
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
                                                        // boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Add shadow on hover
                                                        transition: 'color 0.3s', // Smooth transition
                                                        cursor: 'pointer'
                                                    }}>
                                                    Account Already Created ? Sign In
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Registrations;


