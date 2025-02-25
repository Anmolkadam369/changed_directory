import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt, faClipboardList, faCar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './UserProfileDetials.css';
import axios from 'axios';
import backendUrl from '../../../environment';
import { Button } from '@mui/material';
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { FaIdCard, FaEnvelope, FaMobile, FaCreditCard } from "react-icons/fa";

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const UserProfileDetails = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState(null);
    const [comingData, setComingData] = useState([]);
    console.log('comingdata', comingData)
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);


    useEffect(() => {
        loadStates();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

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

    useEffect(() => {
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,

                driverName: comingData.driverName || "",
                driverNumber: comingData.driverNumber || "",
                driverEmail: comingData.driverEmail || "",
                customerDriverCode: comingData.customerDriverCode || "",
                vendorDriverCode: comingData.vendorDriverCode || "",
                CustomerCode: comingData.CustomerCode || "",
                CustomerName: comingData.CustomerName || "",
                CustomerType: comingData.CustomerType || "",
                address: comingData.address || "",
                district: comingData.district || "",
                pincode: comingData.pincode || "",
                CustomerPhone: comingData.CustomerPhone || "",
                email: comingData.email || "",
                contactPerson: comingData.contactPerson || "",
                contactPersonNum: comingData.contactPersonNum || "",
                contactPersonNum2: comingData.contactPersonNum2 || "",
                state: comingData.state || "",
                panNo: comingData.panNo || "",
                panCard: comingData.panCard || "",
                adharNo: comingData.adharNo || "",
                adharCard: comingData.adharCard || "",
                agreement: comingData.agreement || "",
                fleetSize: comingData.fleetSize || "",
                plan: comingData.plan || "",
                vehicleNo: comingData.vehicleNo || "",
                chassisNo: comingData.chassisNo || "",
                engineNo: comingData.engineNo || "",
                make: comingData.make || "",
                model: comingData.model || "",
                year: comingData.year || "",
                type: comingData.type || "",
                application: comingData.application || "",
                GVW: comingData.GVW || "",
                ULW: comingData.ULW || "",
                InsuranceName: comingData.InsuranceName || "",
                GSTNo: comingData.GSTNo || "",
                GST: comingData.GST || "",
                longitude: comingData.longitude !== null ? comingData.longitude : "",
                latitude: comingData.latitude !== null ? comingData.latitude : "",
                id: comingData.id,
                choosenPlan: comingData.choosenPlan,
                contactPersonNum: comingData.contactPersonNum || "",
                vendorType: comingData.vendorType || "",

                vendorName: comingData.vendorName || "",
                CustomerName: comingData.CustomerName || "",

                vehicleNo: comingData.vehicleNo || '',
                chassisNo: comingData.chassisNo || '',
                engineNo: comingData.engineNo || '',
                make: comingData.make || '',
                model: comingData.model || '',
                type: comingData.type || '',
                application: comingData.application || '',
                InsuranceName: comingData.InsuranceName || '',
                GVW: comingData.GVW || '',
                ULW: comingData.ULW || '',
                DLCard: comingData.DLCard || '',
                DLNo: comingData.DLNo || '',
                year: comingData.year || ''
            }));
        }
    }, [comingData]);

    const [formData, setFormData] = useState({

        customerDriverCode: "",
        vendorDriverCode: "",
        CustomerName: "",
        contactPerson: "",
        contactPersonNum: "",
        email: '',
        CustomerPhone: '',
        plan: '',
        vehicles: '',
        CustomerType: '',
        choosenPlan: "",
        vendorType: '',

        panNo: '',
        GSTNo: '',
        adharNo: '',
        adharCard: '',
        panCard: '',
        GST: '',


        vendorName: '',
        CustomerName: '',
        driverName: "",
        driverNumber: "",
        driverEmail: "",
        vehicleNo: '',
        chassisNo: '',
        engineNo: '',
        make: '',
        model: '',
        type: '',
        application: '',
        InsuranceName: '',
        GVW: '',
        ULW: '',
        DLCard: '',
        DLNo: '',
        year: ''

    });
    console.log('formdata', formData)
    useEffect(() => {
        getDataById();
    }, [userId, token])

    const getDataById = async (id) => {
        let response;
        if (userId.startsWith("CUD-")) response = await axios.get(`${backendUrl}/api/getDriverInfo/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (userId.startsWith("CC-")) response = await axios.get(`${backendUrl}/api/getCustomerById/${userId}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (userId.startsWith("VC-")) response = await axios.get(`${backendUrl}/api/getVendor/${userId}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (userId.startsWith("VED-")) response = await axios.get(`${backendUrl}/api/getVendorDriverInfo/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });


        console.log("daa", response.data.data)
        console.log("response123", response.data.data[0]);
        setComingData(response.data.data[0])
    }


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: 'File size should be less than 2 MB!', severity: 'error' });
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else if (name === 'state') {
            loadCities(value);
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
        else setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }
        let urlPart = ''
        if (userId.startsWith("CC-")) urlPart = 'customerUpdate';
        if (userId.startsWith("CUD-")) urlPart = 'updateCustomerDriver';
        if (userId.startsWith("VC-")) urlPart = 'venderUpdate';
        if (userId.startsWith("VED-")) urlPart = 'updateDriverInfoVendor';


        console.log("formDataObj", formDataObj)
        try {
            const response = await axios({
                method: 'PUT',
                url: `${backendUrl}/api/${urlPart}/${userId}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("response", response.data);

            if (response.data.status === true) {
                setAlertInfo({
                    type: 'success',
                    message: 'Information updated successfully!'
                });
                setTimeout(() => {
                    navigate(-1)
                }, 2000);
            } else if (response.data.status === 400) {
                setAlertInfo({
                    type: 'error',
                    message: 'Already assigned Number!'
                });
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                // Server responded with a status other than 2xx
                if (error.response.status === 404) {
                    setAlertInfo({
                        type: 'error',
                        message: 'Resource not found!'
                    });
                } else if (error.response.status === 400) {
                    setAlertInfo({
                        type: 'error',
                        message: 'Already assigned Number!'
                    });
                } else {
                    setAlertInfo({
                        type: 'error',
                        message: `Unexpected error: ${error.response.status}`
                    });
                }
            } else if (error.request) {
                // No response was received
                setAlertInfo({
                    type: 'error',
                    message: 'No response from the server. Please try again.'
                });
            } else {
                // Something else happened
                setAlertInfo({
                    type: 'error',
                    message: 'An error occurred while making the request.'
                });
            }
        }

    };

    const handleBack = () => {
        navigate(-1);
    }

    const [isUpdatePan, setIsUpdatePan] = useState(false)
    const [isUpdateAdhar, setIsUpdateAdhar] = useState(false)
    const [isUpdateGST, setIsUpdateGST] = useState(false)
    const [isUpdateDL, setIsUpdateDL] = useState(false)
    console.log('formData.DLCard', formData.DLCard)


    return (
        <div className="user-form-container">
            <div className='flex'>

                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px', marginTop: '15px', position: 'fixed', background: '#b2b2b2', padding: '5px 3px 5px 0px', marginLeft: '20px', borderRadius: '30px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "black" }} onClick={handleBack} />
                </div>
                {/* <p style={{ textAlign: "center", marginTop: "30px", fontSize: "20px", fontWeight: "bold", color: "green" }}>Profile Details</p> */}

            </div>
            {userId.startsWith("CC-") && (
                <form className="user-form" onSubmit={handleSubmit}>

                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "16px", fontWeight: "bold", color: "#538553b3" }}>Company Details</p>


                    <div className="user-form-group">
                        <i className="fa fa-building user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="CustomerName"
                            placeholder="Enter Company Name"
                            value={formData.CustomerName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-address-book-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="CustomerType"
                            placeholder="Enter your name"
                            value={formData.CustomerType ? formData.CustomerType.charAt(0).toUpperCase() + formData.CustomerType.slice(1) : ""}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            style={{ fontSize: '0.8rem' }}
                            className='input-profile'
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            style={{ fontSize: '0.8rem' }}
                            className='input-profile'
                            type="tel"
                            name="CustomerPhone"
                            placeholder="Enter your mobile number"
                            value={formData.CustomerPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-list user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="choosenPlan"
                            placeholder="Your current plan"
                            value={formData.choosenPlan ? formData.choosenPlan.charAt(0).toUpperCase() + formData.choosenPlan.slice(1) : ""}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <hr className='text-red-700' />

                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "14px", fontWeight: "bold", color: "#538553b3" }}>Company Address</p>

                    <div className="user-form-group">
                        <CorporateFareIcon className='user-icon' />
                        <select
                            style={{ fontSize: '0.8rem', }}
                            className='input-profile w-[100%]'
                            name="state"
                            onChange={handleChange}
                            value={formData.state}>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="user-form-group">
                        <LocationCityIcon className='user-icon' />
                        <select
                            style={{ fontSize: '0.8rem' }}
                            className='input-profile w-[100%]'
                            name="district"
                            value={formData.district} // This should match city.iso2
                            onChange={handleChange}
                            disabled={isLoadingCities || !formData.state}
                        >
                            <option value="">Select City</option>
                            {!cities.error && cities.map(city => (
                                <option key={city.iso2} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="user-form-group">
                        <BusinessIcon className='user-icon' />
                        <input
                            className='input-profile'
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>


                    <hr className='text-red-700' />

                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "14px", fontWeight: "bold", color: "#538553b3" }}>Personal Details</p>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="contactPerson"
                            placeholder="Enter your name"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-id-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="panNo"
                            placeholder="Enter Pan Number"
                            value={formData.panNo}
                            onChange={handleChange}
                        // pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        // title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-id-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="adharNo"
                            placeholder="Enter Adhar Number"
                            value={formData.adharNo}
                            onChange={handleChange}
                        // pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        // title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                        />
                    </div>

                    <div className='flex items-center'>
                        <div className="user-form-group">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdatePan && (
                                <div>
                                    {formData.panCard == 'Pan Value' && (<p className='text-xs' >No pan uploaded</p>)}
                                    {formData.panCard !== 'Pan Value' && (<img className='text-sm mt-1 text-gray-600' src={formData.panCard} alt="PAN Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}
                            {isUpdatePan && (
                                <input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="panCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                        </div>
                        <button onClick={() => { setIsUpdatePan(!isUpdatePan) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black', display: "flex" }} >
                            <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>Pan</p>
                        </button>
                    </div>
                    <div className='flex'>
                        <div className="user-form-group">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdateAdhar && (
                                <div>
                                    {formData.adharCard == 'Adhar Value' && (<p className='text-xs'>No Adhar uploaded</p>)}
                                    {formData.adharCard !== 'Adhar Value' && (<img className='text-sm mt-1 text-gray-600' src={formData.adharCard} alt="Adhar Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}

                            {isUpdateAdhar && (
                                <input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="adharCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                            <button onClick={() => { setIsUpdateAdhar(!isUpdateAdhar) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black' }} className="flex gap-2 ">
                                <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>Adhar</p>
                            </button>
                        </div>
                    </div>



                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <div className='flex gap-2'>

                        <button type="submit" style={{ borderRadius: '20px', paddingLeft: '5px' }} className="user-submit-button p-2  bg-[#515355] ">
                            <i className='fa fa-paper-plane user-icon text-white' style={{ marginRight: '10px' }}></i> Update
                        </button>
                    </div>
                </form>)}

            {userId.startsWith("CUD-") && (

                <form className="user-form" onSubmit={handleSubmit}>
                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "14px", fontWeight: "bold", color: "#538553b3" }}>Personal Details</p>
                    <div className="user-form-group">
                        <i class="fa fa-building-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="CustomerName"
                            placeholder="Enter your name"
                            value={formData.CustomerName}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="driverName"
                            placeholder="Enter your name"
                            value={formData.driverName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="email"
                            name="driverEmail"
                            placeholder="Enter your email"
                            value={formData.driverEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="tel"
                            name="driverNumber"
                            placeholder="Enter your mobile number"
                            value={formData.driverNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-id-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="DLNo"
                            placeholder="Enter your DL number"
                            value={formData.DLNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex items-center'>
                        <div className="user-form-group">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdateDL && (
                                <div>

                                    {formData.DLCard == "" && (<p className='text-xs' >Not uploaded</p>)}
                                    {formData.DLCard !== "" && (<img className='text-sm mt-1 text-gray-600' src={formData.DLCard} alt="DL Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}
                            {isUpdateDL && (
                                <input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="DLCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                        </div>
                        <button onClick={() => { setIsUpdateDL(!isUpdateDL) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black', display: "flex" }} >
                            <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>DL Card</p>
                        </button>
                    </div>


                    <hr className='text-red-700' />

                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "14px", fontWeight: "bold", color: "#538553b3" }}>Vehicle Details</p>

                    <div className="user-form-group">
                        <i className="fa fa-bus user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="vehicleNo"
                            placeholder="Enter your vehicle number"
                            value={formData.vehicleNo}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-id-card user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="chassisNo"
                            placeholder="Enter your chassis number"
                            value={formData.chassisNo}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-cogs user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="engineNo"
                            placeholder="Enter your engine number"
                            value={formData.engineNo}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-industry user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="make"
                            placeholder="Enter your make"
                            value={formData.make}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-tasks user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="model"
                            placeholder="Enter your model number"
                            value={formData.model}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-calendar-alt user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="year"
                            placeholder="Enter your year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-truck user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="type"
                            placeholder="Enter your type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-wrench user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="application"
                            placeholder="Enter your application number"
                            value={formData.application}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-shield-alt user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="InsuranceName"
                            placeholder="Enter your Insurance"
                            value={formData.InsuranceName}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-address-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="GVW"
                            placeholder="Enter your GVW"
                            value={formData.GVW}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-address-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="ULW"
                            placeholder="Enter your ULW"
                            value={formData.ULW}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>


                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <button type="submit" style={{ borderRadius: '20px' }} className="user-submit-button  bg-[#515355 ">
                        <i className='fa fa-paper-plane user-icon text-white' ></i> Update Information
                    </button>
                </form>
            )}

            {userId.startsWith("VC-") && (
                <motion.form
                    className="mt-5 mb-5 bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg mx-auto space-y-6"
                    onSubmit={handleSubmit}
                    style={{ borderRadius: '50px 50px 0px 0px ' }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, y: 20 }} // Smooth exit animation if needed
                >
                    <h2
                        className="text-lg mt-5 font-bold text-center text-green-700"
                        as={motion.h2}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        Company Details
                    </h2>

                    {/* Vendor Name */}
                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <AccountCircleIcon className="text-green-700   mt-2 pl-2" />
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.input
                                className="w-full bg-transparent focus:outline-none"
                                type="text"
                                name="vendorName"
                                placeholder="Enter vendor name"
                                value={formData.vendorName}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.05 }} // Slight zoom on focus
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                    </div>

                    {/* Company Name */}
                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <BusinessIcon className="text-green-700  mt-2 pl-2 " />
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            // style={{border:'1px solid grey'}}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <motion.input
                                className="w-full bg-transparent focus:outline-none"
                                type="text"
                                name="companyName"
                                placeholder="Enter your company name"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.05 }}
                            />
                        </motion.div>
                    </div>

                    {/* State Selection */}
                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <CorporateFareIcon className="text-green-700  mt-2 pl-2 " />
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <motion.select
                                className="w-full bg-transparent text-sm focus:outline-none"
                                name="state"
                                onChange={handleChange}
                                value={formData.state}
                                whileFocus={{ scale: 1.05 }}
                            >
                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                ))}
                            </motion.select>
                        </motion.div>
                    </div>

                    {/* City Selection */}
                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <LocationCityIcon className="text-green-700  mt-2 pl-2 " />
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <motion.select
                                className="w-full bg-transparent  text-sm focus:outline-none"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                disabled={isLoadingCities || !formData.state}
                                whileFocus={{ scale: 1.05 }}
                            >
                                <option className='text-sm' value="">Select City</option>
                                {!cities.error && cities.map(city => (
                                    <option key={city.iso2} value={city.name}>{city.name}</option>
                                ))}
                            </motion.select>
                        </motion.div>
                    </div>

                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <BusinessIcon className='text-green-700  mt-2 pl-2' />
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.input
                                className="w-full bg-transparent focus:outline-none"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                whileFocus={{ scale: 1.05 }} // Slight zoom on focus
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                    </div>


                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"

                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <i class="fa fa-id-card-o text-green-700" aria-hidden="true"></i>
                            <motion.input
                                className='w-full bg-transparent focus:outline-none'
                                type="text"
                                name="panNo"
                                placeholder="Enter Pan Number"
                                value={formData.panNo}
                                onChange={handleChange}
                                whileFocus={{ scale: 1.05 }} // Slight zoom on focus
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            // pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            // title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                            />
                        </motion.div>
                    </div>

                    <div className='flex items-center'>
                        <div className="user-form-group">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdatePan && (
                                <div>
                                    {formData.panCard == 'Pan Value' && (<p className='text-xs' >No pan uploaded</p>)}
                                    {formData.panCard !== 'Pan Value' && (<img className='text-sm mt-1 text-gray-600' src={formData.panCard} alt="PAN Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}
                            {isUpdatePan && (
                                <motion.input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="panCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                        </div>
                        <button onClick={() => { setIsUpdatePan(!isUpdatePan) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black', display: "flex" }} >
                            <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>Pan</p>
                        </button>
                    </div>



                    <h2
                        className="text-lg  mt-5 font-bold text-center text-green-700"
                        as={motion.h2}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        Personal Details
                    </h2>

                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <i class="fa fa-user text-green-700" aria-hidden="true"></i>
                            <motion.input
                                className='w-full bg-transparent focus:outline-none'
                                type="text"
                                name="contactPerson"
                                placeholder="Enter your name"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                    </div>


                    {/* Email */}

                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"

                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            <FaEnvelope className="text-green-700" />
                            <motion.input
                                className="w-full bg-transparent focus:outline-none"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.05 }}
                            />
                        </motion.div>
                    </div>

                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        {/* Mobile */}
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <FaMobile className="text-green-700" />
                            <motion.input
                                className="w-full bg-transparent focus:outline-none"
                                type="tel"
                                name="contactPersonNum"
                                placeholder="Enter your mobile number"
                                value={formData.contactPersonNum}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.05 }}
                            />
                        </motion.div>
                    </div>

                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"

                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <BusinessIcon className='text-green-700' />
                            <motion.input
                                className="w-full bg-transparent focus:outline-none"
                                type="text"
                                name="typeOfOwnership"
                                placeholder="Type Of Ownership"
                                value={formData.typeOfOwnership}
                                onChange={handleChange}
                                whileFocus={{ scale: 1.05 }}

                            />
                        </motion.div>
                    </div>

                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"

                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <i class="fa fa-id-card-o text-green-700" aria-hidden="true"></i>
                            <motion.input
                                className='w-full bg-transparent focus:outline-none'
                                type="text"
                                name="panNo"
                                placeholder="Enter Pan Number"
                                value={formData.panNo}
                                onChange={handleChange}
                                whileFocus={{ scale: 1.05 }}

                            // pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            // title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                            />
                        </motion.div>
                    </div>
                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <i class="fa fa-id-card-o text-green-700" aria-hidden="true"></i>
                            <motion.input
                                className='w-full bg-transparent focus:outline-none'
                                type="text"
                                name="adharNo"
                                placeholder="Enter Adhar Number"
                                value={formData.adharNo}
                                onChange={handleChange}
                                whileFocus={{ scale: 1.05 }}

                            // pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            // title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                            />
                        </motion.div>
                    </div>
                    <div className='flex space-x-3 rounded-lg p-1'
                        style={{ border: '1px solid grey' }}
                    >
                        <motion.div
                            className="flex w-full items-center space-x-3 bg-gray-100 p-2 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <i class="fa fa-id-card-o text-green-700" aria-hidden="true"></i>
                            {/* <i  class="user-icon" aria-hidden="true"></i> */}
                            <motion.input
                                className='w-full bg-transparent focus:outline-none'
                                type="text"
                                name="GSTNo"
                                placeholder="Enter GST Number"
                                value={formData.GSTNo}
                                onChange={handleChange}
                                whileFocus={{ scale: 1.05 }}

                            />
                        </motion.div>
                    </div>


                    <div className='flex'>
                        <div className="user-form-group  m-0">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdateAdhar && (
                                <div>
                                    {formData.adharCard == 'Adhar Value' && (<p className='text-xs text-red-400'>No Adhar uploaded</p>)}
                                    {formData.adharCard !== 'Adhar Value' && (<img className='text-sm mt-1 text-gray-600' src={formData.adharCard} alt="Adhar Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}

                            {isUpdateAdhar && (
                                <motion.input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="adharCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                            <button onClick={() => { setIsUpdateAdhar(!isUpdateAdhar) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black' }} className="flex gap-2 ">
                                <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>Adhar</p>
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="user-form-group  m-0">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdateGST && (
                                <div>
                                    {formData.GST == 'default-GST-value' && (<p className='text-xs text-red-400' >No GST uploaded</p>)}
                                    {formData.GST !== 'default-GST-value' && (<img className='text-sm mt-1 text-gray-600' src={formData.GST} alt="PAN Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}
                            {isUpdateGST && (
                                <motion.input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="panCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                        </div>
                        <button onClick={() => { setIsUpdateGST(!isUpdateGST) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black', display: "flex" }} >
                            <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>GST</p>
                        </button>
                    </div>



                    {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }} // Shrinks when clicked
                        >
                            Submit
                        </motion.button>

                </motion.form>

            )}

            {userId.startsWith("VED-") && (
                <form className="user-form mb-5 pb-5" onSubmit={handleSubmit}>
                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "14px", fontWeight: "bold", color: "#538553b3" }}>Personal Details</p>

                    <div className="user-form-group">
                        <i class="fa fa-building-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="vendorName"
                            placeholder="Enter your name"
                            value={formData.vendorName}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="driverName"
                            placeholder="Enter your name"
                            value={formData.driverName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            style={{ fontSize: '0.8rem' }}
                            className='input-profile'
                            type="email"
                            name="driverEmail"
                            placeholder="Enter your email"
                            value={formData.driverEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            style={{ fontSize: '0.8rem' }}
                            className='input-profile'
                            type="tel"
                            name="driverNumber"
                            placeholder="Enter your mobile number"
                            value={formData.driverNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-id-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="DLNo"
                            placeholder="Enter your DL number"
                            value={formData.DLNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex items-center'>
                        <div className="user-form-group">
                            <i class="fa fa-picture-o user-icon" aria-hidden="true"></i>
                            {!isUpdateDL && (
                                <div>

                                    {formData.DLCard == undefined && (<p className='text-xs' >Not uploaded</p>)}
                                    {formData.DLCard !== undefined && (<img className='text-sm mt-1 text-gray-600' src={formData.DLCard} alt="DL Card" style={{ width: '125px', borderRadius: '20px', height: '200px' }} />)}
                                </div>
                            )}
                            {isUpdateDL && (
                                <input
                                    style={{ fontSize: '0.5rem' }}
                                    type="file"
                                    name="DLCard"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="form-control"
                                    required
                                />)}
                        </div>
                        <button onClick={() => { setIsUpdateDL(!isUpdateDL) }} style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '-60px', paddingLeft: '5px', background: 'white', color: 'black', display: "flex" }} >
                            <i className='fa fa-pencil user-icon text-red-500' style={{ marginRight: '5px' }} ></i> <p className='text-xs text-red-500'>DL Card</p>
                        </button>
                    </div>

                    <hr className='text-red-700' />

                    <p style={{ marginTop: "10px", marginBottom: '50px', fontSize: "14px", fontWeight: "bold", color: "#538553b3" }}>Vehicle Details</p>

                    <div className="user-form-group">
                        <i className="fa fa-bus user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="vehicleNo"
                            placeholder="Enter your vehicle number"
                            value={formData.vehicleNo}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-id-card user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="chassisNo"
                            placeholder="Enter your chassis number"
                            value={formData.chassisNo}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-cogs user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="engineNo"
                            placeholder="Enter your engine number"
                            value={formData.engineNo}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-industry user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="make"
                            placeholder="Enter your make"
                            value={formData.make}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-tasks user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="model"
                            placeholder="Enter your model number"
                            value={formData.model}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-calendar-alt user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="year"
                            placeholder="Enter your year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-truck user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="type"
                            placeholder="Enter your type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-wrench user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="application"
                            placeholder="Enter your application number"
                            value={formData.application}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-shield-alt user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="InsuranceName"
                            placeholder="Enter your Insurance"
                            value={formData.InsuranceName}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-address-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="GVW"
                            placeholder="Enter your GVW"
                            value={formData.GVW}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-address-card-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="ULW"
                            placeholder="Enter your ULW"
                            value={formData.ULW}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>

                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <button type="submit" style={{ borderRadius: '20px' }} className="user-submit-button  bg-[#515355 ">
                        <i className='fa fa-paper-plane user-icon text-white' ></i> Update Information
                    </button>
                </form>
            )}

        </div>
    );
};

export default UserProfileDetails;