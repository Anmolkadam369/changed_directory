import React, { useState, useEffect, useRef } from 'react';
import '../VenderMaster/VendorMasterForm.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import backendUrl from '../../environment';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import VendorPaymentDetail from '../PaymentPage/VendorPaymentDetail';
import surveyorImageExcel from '../../Assets/surveyorImageExcel.png'
// import vendorInfo2 from '../../Assets/vendorInfo2.jpg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import customerInfo from '../../Assets/customerInfo.xlsx';
import vendorsInfo from '../../Assets/vendorsInfo.xlsx';
import fleetInfo from '../../Assets/fleetInfo.xlsx';
import { IconButton } from '@mui/material';
import Sidebar from '../Home/Sidebar';


const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 15,
        height: 15,
        margin: 1.7,
    },
}));


const SurveyorMasterEdit = ({ id, onUpdate }) => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [showBankForm, setShowBankForm] = useState(false);
    const [recipientName, setRecipientName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [singleVendor, setSingleVendor] = useState(true)
    const [isZoomed, setIsZoomed] = useState(false);
    const [isZoomed1, setIsZoomed1] = useState(false);
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [toInputBox, setToInputBox] = useState(false)
    const [comingData, setComingData] = useState([]);
    console.log("comingDataHERE ", comingData)
    const [IsReadOnly, setIsReadOnly] = useState(true);


    console.log('latitude longitude', latitude, longitude)
    console.log("locatin", location)

    const handleSwitchChange = (event) => {
        setSingleVendor(event.target.checked);
    };


    const handleSwitchInputBox = (event) => {
        setToInputBox(!toInputBox)
    };

    useEffect(() => {
        loadStates();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);
    console.log("userIIIIIID", userId);

    useEffect(() => {
        getDataById(id);
    }, [id])
    const getDataById = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getSurveyById/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
            console.log("daa", response.data.data)
            console.log("response", response.data.data[0]);
            setComingData(response.data.data[0])
        } catch (error) {
            console.log("error", error.message)
        }
    }

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
        systemDate: today,
        surveyorCode: 'SYSTEM GENERATED',
        ROCode: '',
        fullName: '',
        state: '',
        location: "",
        SLANo: '',
        phone: '',
        email: '',
        IIISLAHipNo: '',
        category: "",
        licenceExpiry: '',
        INLIASCode: "",
        latitude:"",
        longitude:''
    });

    useEffect(() => {
        if (comingData && Object.keys(comingData).length) {
            setFormData(prevFormData => ({
                ...prevFormData,
                surveyorCode: comingData.surveyorCode || '',
                ROCode: comingData.ROCode || '',
                fullName: comingData.fullName || '',
                state: '',
                location: comingData.location || '',
                SLANo: comingData.SLANo || '',
                phone: comingData.phone || '',
                email: comingData.email || '',
                IIISLAHipNo: comingData.IIISLAHipNo || '',
                category: comingData.category || '',
                licenceExpiry: comingData.licenceExpiry || '',
                INLIASCode: comingData.INLIASCode || '',
                latitude: comingData.latitude || '',
                longitude: comingData.longitude || ''
            }));
        }
    }, [comingData]);
    

    console.log("FORMDATA908", formData)
    const fullAddress = `${formData.location}, ${formData.state}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(fullAddress)}`;

    useEffect(() => {
       if(formData.location != "") {
            const getLonLat = async () => {
            try {
                console.log("fulladdress", fullAddress)
                const response = await axios.get(url);
                console.log("response latitude", response.data)
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    const location1 = response.data[0];
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        latitude: location1.lat || '',
                        longitude: location1.lon || ''
                    }));
                    setLatitude(location1.lat);
                    setLongitude(location1.lon);
                    console.log(`ANMOL Latitude: ${location1.lat}, Longitude: ${location1.lon}`);
                    setLocation(`Latitude: ${location1.lat}, Longitude: ${location1.lon}`);
                } else {
                    console.log("No valid location data found");
                    // setLocation("No valid location data available.");
                }
            } catch (error) {
                // setLocation("An error occurred while fetching the coordinates.");
            }
        }
        getLonLat();
    }
    console.log("FULL ADDRESSSSSSSSS", fullAddress)
    console.log("LOCATION", formData.location)

    }, [fullAddress,formData.location])


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setLocation("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`Latitude: ${lat}, Longitude: ${lon}`);
        setLatitude(lat);
        setLongitude(lon);
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setLocation("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setLocation("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setLocation("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setLocation("An unknown error occurred.");
                break;
        }
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };
    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    // GST: GSTRef,
                    // panCard: panRef,
                    // adharCard: adharCardRef,
                };

                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }

                setFormData(prevState => ({
                    ...prevState,
                    [name]: null // Reset the file state
                }));
                return;
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else if (name === 'state') {
            loadCities(value);
            setFormData(prevState => ({ ...prevState, [name]: value }));
        } else if (["phone"].includes(name)) {
            let validValue = value.replace(/\D/g, ''); // Remove non-digit characters
            if (validValue && validValue[0].match(/[6-9]/)) {
                validValue = validValue.slice(0, 10); // Only keep up to 10 digits if it starts with 6-9
            } else {
                validValue = ''; // Return an empty string if the first digit isn't between 6-9
            }

            setFormData({
                ...formData,
                [name]: validValue,
            });
        } else if (["SLANo", "rate"].includes(name)) {
            const validValue = value.replace(/\D/g, '').slice(0, 6);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        } else if (name === "adharNo") {
            const validValue = value.replace(/\D/g, '').slice(0, 12);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        } else if (name === "email") {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        else if (name === "location" || name === "vendorType") {
            setFormData({
                ...formData,
                [name]: value,
            })
        }


        else {
            const capitalizedValue = value
                .split(' ')
                .map(word => word.toUpperCase())
                .join(' ');

            setFormData(prevState => ({
                ...prevState,
                [name]: capitalizedValue
            }));
        }
    };
    const validateForm = () => {
        for (const [key, value] of Object.entries(formData)) {
            if (["panCard", "adharCard"].includes(key)) {
                if (value === null || value === undefined || value.size === 0) {
                    return `Field '${key}' is required.`;
                }
            }
            if ((key !== "state" && key !== "remark" && key !== "GSTNo" && key !== "GST" && key !== "adharNo" && key !== "adharCard" && key !== "INLIASCode" && key !== "panCard" && key !== "licenceExpiry") && value === '') {
                return `Field '${key}' is required.`;
            }
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log("formdata", formData)
        let strEmail = formData.email;
        console.log("strEmai", strEmail)
        let emailArray = strEmail.split(',');
        console.log('emailssssssssssssss1', emailArray)
        
        for(let i=0; i<emailArray.length; i++){
            console.log("emailArray[i]",emailArray[i])
            if (!emailRegex.test(emailArray[i])) {
                return 'Please enter a valid email address.';
            }
        }

        const phoneRegex = /^[0-9]{10}$/
        if (!phoneRegex.test(formData.phone)) {
            return 'Please enter a valid Phone Number.';
        }
        // if (!phoneRegex.test(formData.category)) {
        //     console.log("contada", formData.category)
        //     return 'Please enter a valid Contact Person Number.';
        // }
        // if (formData.licenceExpiry !== "" && !phoneRegex.test(formData.licenceExpiry)) {
        //     return 'Please enter a valid Secondary Contact Person Number.';
        // }

        // const aadhaarRegex = /^\d{12}$/;
        // if (formData.adharNo !== "" && !aadhaarRegex.test(formData.adharNo)) {
        //     return 'Please enter a valid Aadhaar Number.';
        // }

        // const gstRegex = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/;
        // if (formData.GSTNo !== "" && !gstRegex.test(formData.GSTNo)) {
        //     return 'Please enter a valid GST number (e.g., 22ABCDE1234F1Z5).';
        // }

        // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        // if (formData.INLIASCode !== "" && !panRegex.test(formData.INLIASCode)) {
        //     return 'Please enter a valid PAN number (e.g., ABCDE1234F).';
        // }

        return '';
    };

    console.log("formDataHEre", formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsLoading(true);

        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            setIsLoading(false);
            return;
        }

        const validationMessage = validateForm();
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsLoading(false);
            return;
        }

        // const innerValidationMessage = validateInnerForm();
        // if (innerValidationMessage) {
        //   setAlertInfo({ show: true, message: "Fill form Appropriately.", severity: 'error' });
        //   setIsLoading(false);
        //   return;
        // }

        console.log("latitude", latitude, "longitiude", longitude, "location", location)
        if (latitude === "" || longitude === "" || location === "Geolocation is not supported by this browser.") {
            setAlertInfo({ show: true, message: "Please Give latitude and Longitude", severity: 'error' });
            setIsLoading(false);
            return;
        }

        let sendData = {};

        // if (paymentMethod === 'bank') {
        //     sendData = {
        //         recipientName,
        //         ...bankDetails
        //     };
        // } else if (paymentMethod === 'upi') {
        //     sendData = {
        //         recipientName,
        //         ...upiDetails
        //     };
        // }

     
        console.log("SUBMITTED", formData)
        try {
            const response = await axios({
                method: 'PUT',
                url: `${backendUrl}/api/surveyorDataUpdate/${userId}/${formData.surveyorCode}`,
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

            setFormData({});
            sendData = {};
            setLatitude("");
            setLongitude("");
            setTimeout(() => {
                onUpdate();
              }, 2000);

        } catch (error) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        }
    }
    const editable = () => {
        setIsReadOnly(!IsReadOnly)
    }
    const handleBack = () => {
        onUpdate();
      }

    return (
        <form onSubmit={handleSubmit} >

            <form className='Customer-master-form' style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
            <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                <div class="header-container">
                    <h3 class="bigtitle">Surveyor Edit</h3>
                </div>
                
            </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        System Date:
                        <input
                            type="date"
                            name="systemDate"
                            value={formData.systemDate}
                            onChange={handleChange}
                            readOnly
                            className="form-control"
                        />
                    </label>

                    <label className="form-field input-group mb-3">
                        Surveyor Code:
                        <input
                            type="text"
                            name="surveyorCode"
                            placeholder='SYSTEM GENERATED'
                            value={formData.surveyorCode}
                            className="form-control"
                            readOnly
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Vendor Place -State:
                        <select
                            name="state"
                            onChange={handleChange}
                            disabled={IsReadOnly || isLoadingStates}
                            value={formData.state}>
                                
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>

                    {!toInputBox && (<label className="form-field input-group mb-3">
                        <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                            <span style={{ marginRight: '10px' }}>Surveyor Location:{formData.location}</span>
                            <div className="switch-container">
                                <FormControlLabel
                                    control={<Android12Switch defaultChecked />}
                                    checked={singleVendor}
                                    onChange={handleSwitchInputBox}
                                    label="" // You can add a label here if needed
                                />
                            </div>
                        </div>


                        <select
                            name="location"
                            value={formData.location} // This should match city.iso2
                            onChange={handleChange}
                            disabled={isLoadingCities || !formData.state}
                        >
                            <option value="">Select Location</option>
                            {!cities.error && cities.map(city => {
                                console.log('Rendering city:', city.iso2, city.name); // Debug: Check city values
                                return (
                                    <option key={city.iso2} value={city.iso2}>
                                        {city.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>)}

                    {toInputBox && (
                        <label className="form-field input-group mb-3">

                            {/* Vendor Place - City: */}
                            <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                                <span style={{ marginRight: '10px' }}>Vendor Place - City:</span>
                                <div className="switch-container">
                                    <FormControlLabel
                                        control={<Android12Switch defaultChecked />}
                                        checked={singleVendor}
                                        readOnly={IsReadOnly}
                                        onChange={handleSwitchInputBox}
                                        label="" // You can add a label here if needed
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                name="location"
                                placeholder='Location'
                                value={formData.location}
                                onChange={handleChange}
                                className="form-control"
                                readOnly={formData.state === ""}
                                required
                            />
                        </label>
                    )}

                </div>

                <div className='form-row'>

                    <label className="form-field input-group mb-3">
                        RO Code:
                        <input
                            type="text"
                            name="ROCode"
                            placeholder='RO Code'
                            value={formData.ROCode}
                            onChange={handleChange}
                            className="form-control"
                            required
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Full Name :
                        <input
                            type="text"
                            name="fullName"
                            placeholder='Full Name'
                            value={formData.fullName}
                            onChange={handleChange}
                            className="form-control"
                            required
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        SLA No:
                        <input
                            type='tel'
                            name="SLANo"
                            value={formData.SLANo}
                            onChange={handleChange}
                            placeholder='SLA No'
                            required
                            className="form-control"
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        IIISLAHip No:
                        <input
                            type='text'
                            name="IIISLAHipNo"
                            value={formData.IIISLAHipNo}
                            onChange={handleChange}
                            placeholder='IIISLAHip No'
                            className="form-control"
                            readOnly={IsReadOnly}

                            required />
                    </label>
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        Phone No:
                        <input
                            type='tel'
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder=' Phone No'
                            required
                            pattern="\d{10}"
                            title="Phone number must be exactly 10 digits"
                            className="form-control"
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        E-Mail:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='E-Mail'
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address."
                            className="form-control"
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Licence Expiry :
                        <input
                            type='tel'
                            name="licenceExpiry"
                            value={formData.licenceExpiry}
                            placeholder='Licence Expiry'
                            onChange={handleChange}
                            // required
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                            className="form-control"
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Category :
                        <input
                            type='tel'
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder='Category'
                            required
                            pattern="\d{10}"
                            className="form-control"
                            readOnly={IsReadOnly}
                            title="Phone number must be 10 digits" />
                    </label>
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        INLIAS Code :
                        <input
                            type='text'
                            name="INLIASCode"
                            placeholder='INLIAS Code'
                            value={formData.INLIASCode}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            // required
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                        />
                    </label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>

                </div>

            </form>



            <form className='Customer-master-form' style={{ marginBottom: "40px" }}>
            <label className='form-field'>
          {IsReadOnly ? (
            formData.longitude == "" ? (
              <p className='notUploaded'>No Location Uploaded</p>
            ) : (
              <div>
                {/* <Button variant="contained">Send Location</Button> */}
                <>
                  <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>

                    Send Location Of Address (this is by your address):
                    <div className='form-row'>
                      <label className='form-field'>
                        Latitude:
                        <input type="text" name="latitude" readOnly={IsReadOnly} value={formData.latitude} onChange={handleChange} />
                      </label>
                      <label className='form-field'>
                        Longitude:
                        <input type="text" name="longitude" readOnly={IsReadOnly} value={formData.longitude} onChange={handleChange} />
                      </label>
                      <label className='form-field'></label>
                    </div>
                  </form>
                </>
              </div>


            )
          ) : (
            <>
                <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>
               <p> Send Your Current Location (if it's same for filling address):</p>
                <div className='form-row'>
                  <Button variant="contained" onClick={getLocation}>Send Location</Button>
                </div>

                <p>  Send Location Of Address (this is by your address):</p> 
                <div className='form-row'>
                  <label className='form-field'>
                    Latitude:
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
                  </label>
                  <label className='form-field'>
                    Longitude:
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
                  </label>
                  <label className='form-field'></label>
                </div>
                {typeof location === 'string' && location && (
                  location.startsWith("Error:") ?
                    <Alert severity="error">{location}</Alert> :
                    <Alert severity="success">{location}</Alert>
                )}
            </>
          )}
        </label>
            </form>
            {/* 
        <form className="Customer-master-form" style={{ background: "#c4c4ff3d", marginBottom: "30px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)", borderRadius: "30px" }}>
            <div class="header-container">
                <h3 class="bigtitle">Bank Information</h3>
            </div>
            <div className="form-row">
                <label className="form-field input-group mb-3">
                    Recipient's Name:
                    <input
                        type="text"
                        name="recipientName"
                        value={recipientName}
                        onChange={(e) => {
                            const capitalizedValue = e.target.value.split(' ').map(word => word.toUpperCase()).join(' ');
                            setRecipientName(capitalizedValue);
                        }}
                        className="form-control"
                    />
                    {errors.recipientName && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.recipientName}</p>}
                </label>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    disabled={!recipientName}
                    style={{ flex: 1 }}
                >
                    Bank Transfer
                </button>
                <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    disabled={!recipientName}
                    style={{ flex: 1 }}
                >
                    UPI
                </button>
            </div>
            {errors.paymentMethod && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.paymentMethod}</p>}

            {paymentMethod === 'bank' && (
                <div className="Customer-master-form" style={{ marginLeft: "0px", marginRight: "0px", paddingLeft: '15px', paddingRight: "25px" }}>
                    <label className="form-field input-group mb-3">
                        Bank Name:
                        <input
                            type="text"
                            name="bankName"
                            value={bankDetails.bankName}
                            onChange={handleBankDetailsChange}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Bank Account:
                        <input
                            type="text"
                            name="bankAccount"
                            value={bankDetails.bankAccount}
                            onChange={handleBankDetailsChange}
                            className="form-control"
                        />
                        {errors.bankAccount && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.bankAccount}</p>}
                    </label>
                    <label className="form-field input-group mb-3">
                        IFSC Code:
                        <input
                            type="text"
                            name="ifscCode"
                            value={bankDetails.ifscCode}
                            onChange={handleBankDetailsChange}
                            className="form-control"
                        />
                        {errors.ifscCode && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.ifscCode}</p>}
                    </label>
                    <label className="form-field input-group mb-3">
                        Branch Name:
                        <input
                            type="text"
                            name="branchName"
                            value={bankDetails.branchName}
                            onChange={handleBankDetailsChange}
                            className="form-control"
                        />
                    </label>
                    {errors.bankDetails && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.bankDetails}</p>}
                </div>
            )}

            {paymentMethod === 'upi' && (
                <div className="Customer-master-form" style={{ marginLeft: "0px", marginRight: "0px", paddingLeft: '15px', paddingRight: "25px" }}>
                    <label className="form-field input-group mb-3">
                        Registered Mobile Number:
                        <input
                            type="text"
                            name="mobileNumber"
                            value={upiDetails.mobileNumber}
                            onChange={handleUpiDetailsChange}
                            className="form-control"
                        />
                        {errors.mobileNumber && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.mobileNumber}</p>}
                    </label>
                    <label className="form-field input-group mb-3">
                        UPI ID:
                        <input
                            type="text"
                            name="upiId"
                            value={upiDetails.upiId}
                            onChange={handleUpiDetailsChange}
                            className="form-control"
                        />
                        {errors.upiId && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.upiId}</p>}
                    </label>
                    {errors.upiDetails && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.upiDetails}</p>}
                </div>
            )}
        </form> */}


            {alertInfo.show && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                    {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                </Alert>
            )}


            <div style={{ textAlign: 'center' }}>
                {!IsReadOnly && (
                    <div>
                        <button type="submit"
                            style={{
                                fontSize: "14px",
                                padding: "5px 20px",
                                border: "3px solid lightblue",
                                borderRadius: "4px",
                                cursor: "pointer",
                                backgroundColor: "transparent",
                                color: "green",
                            }}
                            disabled={isLoading} // Disable button while loading
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        {isLoading && (
                            <div style={{ marginTop: '10px' }}>
                                <ClipLoader color="#4CAF50" loading={isLoading} />
                                <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                            </div>
                        )}
                    </div>
                )}

                {IsReadOnly && (
                    <button
                        type="submit"
                        style={{
                            fontSize: "14px",
                            padding: "5px 20px",
                            border: "3px solid lightblue",
                            borderRadius: "4px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            color: "green",
                        }}
                        onClick={editable}
                    >
                        EDIT
                    </button>
                )}
            </div>

            {/* <div style={{ textAlign: 'center' }}>
    <button type="submit"
      style={{                     fontSize: "14px",
              padding: "5px 20px",
              border: "3px solid lightblue",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "green",}}
      disabled={isLoading} // Disable button while loading
    >{ 'Submit'}
    </button>
</div> */}

        </form>
    )
}
export default SurveyorMasterEdit;