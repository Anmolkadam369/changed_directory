import React, { useState, useEffect, useRef } from 'react';
import './CustomerMaster.css'
import axios from 'axios';
import { Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { constSelector, useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';
import demoexcel from '../../Assets/demoexcel.png'
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import customerInfo1 from '../../Assets/customerInfo1.jpg'
import customerInfo2 from '../../Assets/customerInfo2.jpg'
import customerInfo from '../../Assets/customerInfo.xlsx';
import fleetInfo from '../../Assets/fleetInfo.xlsx';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


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


const CustomerMaster = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [singleCustomer, setSingleCustomer] = useState(true);
  const [isZoomed1, setIsZoomed1] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSwitchChange = (event) => {
    setSingleCustomer(event.target.checked);
  };


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

  const today = new Date().toISOString().split('T')[0];
  const [isRetail, setIsRetail] = useState(false);
  const [isFleetOwner, setIsFleetOwner] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [formData, setFormData] = useState({
    systemDate: today,
    CustomerCode: 'SYSTEM GENERATED',
    CustomerName: '',
    CustomerType: '',
    address: '',
    district: '',
    pincode: '',
    CustomerPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: "",
    state: '',
    panNo: "",
    panCard: "",
    adharNo: '',
    adharCard: "",
    rate: "N/A",
    GSTNo: "",
    fleetSize: "",
    plan: '',
    vehicleNo: "", chassisNo: "", engineNo: "", make: "", model: "", year: "", type: "", application: "", GVW: "", ULW: "", InsuranceName: "", choosenPlan: ""
  });

  const fullAddress = `${formData.address}, ${formData.district}, ${formData.state}`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
  console.log("fullAddress", fullAddress)

  const [otherFormData, setOtherFormData] = useState({
    customersInfo: ''
  })
  console.log("otherformdata", otherFormData)
  console.log("FORMDATA", formData)


  useEffect(() => {
    const getLonLat = async () => {
      try {
        const response = await axios.get(url);
        // if (response.data.length > 0) {
        const location = response.data[0];
        console.log("LOCATION", location)
        setLatitude(location.lat);
        setLongitude(location.lon);
        setLocation(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
        // } else {
        //   setLocation("Geocoding was not successful. Please check the address.");
        // }
      } catch (error) {
        // setLocation("An error occurred while fetching the coordinates.");
      }
    }
    getLonLat()
  }, [fullAddress])




  const handleSelect = (event, value) => {
    event.preventDefault();
    setFormData({
      ...formData,
      choosenPlan: value
    });
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleZoom = () => setIsZoomed(!isZoomed);
  const toggleZoom1 = () => setIsZoomed1(!isZoomed1);
  const toggleZoom2 = () => setIsZoomed2(!isZoomed2);

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const fleetSizeRef = useRef(null);
  const customersInfoRef = useRef(null);

  const validateForm = () => {
    // for (const [key, value] of Object.entries(formData)) {
    //   if (key === 'panCard' || key === 'adharCard') {
    //     if (value === null || value === "" || value === undefined || (value && value.size === 0)) {
    //       return `Fields '${key}' is required here.`;
    //     }
    //   }
    // }
    console.log("type", formData['CustomerType'])


    for (const [key, value] of Object.entries(formData)) {

      if (formData['CustomerType'] === 'retail') {
        const requiredFields = ['vehicleNo', 'chassisNo', 'engineNo', 'make', 'model', 'year', 'type', 'application', 'GVW', 'ULW', 'InsuranceName'];
        for (const field of requiredFields) {
          if (!formData[field]) {
            return `Field '${field}' is required in retail.`;
          }
        }
      }

      if (key !== "GSTNo" && key !== "GST" && key !== "adharNo" && key !== "panNo" && key !== "contactPersonNum2" && key !== 'panCard' && key !== 'adharCard' && key !== 'GST' && key != 'fleetSize' && key != 'vehicleNo' && key != 'chassisNo' && key != 'engineNo' && key != 'make' && key != 'model' && key != 'year' && key != 'type' && key != 'application' && key != 'GVW' && key != 'ULW' && key != 'InsuranceName' && key != 'plan') {
        if (value === '') return `Fields '${key}' is required.`;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.CustomerPhone)) {
      return 'Please enter a valid Customer Phone Number.';
    }
    if (!phoneRegex.test(formData.contactPersonNum)) {
      console.log("contada", formData.contactPersonNum)
      return 'Please enter a valid Contact Person Number.';
    }
    if (formData.contactPersonNum2 !== "" && !phoneRegex.test(formData.contactPersonNum2)) {
      return 'Please enter a valid Secondary Contact Person Number.';
    }

    const gstRegex = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/;
    if (formData.GSTNo !== "" && !gstRegex.test(formData.GSTNo)) {
      return 'Please enter a valid GST number (e.g., 22ABCDE1234F1Z5).';
    }

    const aadhaarRegex = /^\d{12}$/;
    if (formData.adharNo !== "" && !aadhaarRegex.test(formData.adharNo)) {
      return 'Please enter a valid Aadhaar Number.';
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.panNo !== "" && !panRegex.test(formData.panNo)) {
      return 'Please enter a valid PAN Number.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    const value = e.target.value;  // Added to define 'value'
    if (type === 'file') {
      if (files[0] && files[0].size > 2097152) {
        setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
        if (name == 'fleetSize' && value !== "") {
          if (files[0].type !== 'application/vnd.ms-excel' && files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setAlertInfo({ show: true, message: "should be only excel file!!!", severity: 'error' });
          }
          setFormData(prevState => ({
            ...prevState,
            plan: '',
            vehicleNo: '',
            chassisNo: '',
            engineNo: '',
            make: '',
            model: '',
            year: '',
            type: '',
            application: '',
            GVW: '',
            ULW: '',
            InsuranceName: '',
          }));
        }
        const refs = {
          GST: GSTRef,
          panCard: panRef,
          adharCard: adharCardRef,
          fleetSize: fleetSizeRef
        };

        if (refs[name] && refs[name].current) {
          refs[name].current.value = "";
        }

        setFormData(prevState => ({
          ...prevState,
          [name]: null
        }));
        return;
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
    else if (name === "pincode") {
      const validValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData({
        ...formData,
        [name]: validValue,
      });
    }
    else if (name === "adharNo") {
      const validValue = value.replace(/\D/g, '').slice(0, 12);
      setFormData({
        ...formData,
        [name]: validValue,
      });
    }
    else if(name ==="district"){
      setFormData({
        ...formData,
        [name]:value,
      })
    }
    else if (name === "CustomerPhone" || name === "contactPersonNum" || name === "contactPersonNum2") {
      const validValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: validValue,
      });
    }else if (name === "email") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    else if (name === "CustomerType") {
      console.log("valueinside", value)
      if (value === "retail") {
      console.log("valueinsideretail", value)
        setIsRetail(true);
        setIsFleetOwner(false);
      } else if (value === "fleetOwner") {
        setIsFleetOwner(true);
        setIsRetail(false);
      }
      setFormData({
        ...formData,
        [name]:value,
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


  console.log("customerFormdata", formData)
  console.log("LATIIII", latitude)
  console.log("LONGIIII", longitude)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationMessage = validateForm();
    if (validationMessage) {
      setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
      setIsLoading(false);
      return;
    }

    console.log('Form data submitted:', formData);
    setAlertInfo({ ...alertInfo, show: false });

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

    console.log("latitude", latitude, "longitiude", longitude, "location", location)
    if (latitude === "" || longitude === "" || location === "Geolocation is not supported by this browser.") {
      setAlertInfo({ show: true, message: "Please Give latitude and Longitude", severity: 'error' });
      setIsLoading(true);
      return;
    }

    formDataObj.append('latitude', latitude);
    formDataObj.append('longitude', longitude);

    for (let pair of formDataObj.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${backendUrl}/api/customerInfo/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': token
        }
      })
      console.log("response", response.data);
      setIsLoading(false);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      console.error('Error response:', error.response);
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
  };


  const handleExcelSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Start loading
    const formDataObj = new FormData();
    for (const key in otherFormData) {
      if (otherFormData[key]) {
        formDataObj.append(key, otherFormData[key], otherFormData[key].name);
      }
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${backendUrl}/api/customerInfoExcel/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': token
        }
      });
      setIsLoading(false);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
      setTimeout(() => {
        navigate("../Admin");
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


  const handleExcelChange = (e) => {
    const { name, files } = e.target;
    if (name === 'customersInfo') {
      if (files[0].type !== 'application/vnd.ms-excel' && files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setAlertInfo({ show: true, message: "should be only excel file!!!", severity: 'error' });
        const refs = {
          customersInfo: customersInfoRef
        }
        if (refs[name] && refs[name].current) {
          refs[name].current.value = "";
        }
        setOtherFormData(prevState => ({
          ...prevState,
          [name]: ''
        }));
        return;
      }

      setOtherFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };


  return (
    <div>
      <Helmet>
        <title>Customer Service - Claimpro</title>
        <meta name="description" content="Customer Service form" />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/CustomerMaster`} />
      </Helmet>

      <div className='switchparent-container'>
        <div className="switch-container">
          <FormControlLabel
            control={<Android12Switch defaultChecked />}
            checked={singleCustomer}
            onChange={handleSwitchChange}
          />
        </div>
      </div>


      {!singleCustomer && (
        <form onSubmit={handleExcelSubmit} style={{ background: "#f1f1f1" }} className="Customer-master-form">
          <div>
            <div class="header-container">
              <h3 class="bigtitle">Customer Excel File</h3>
              <span class="mandatory-note">All fields are mandatory</span>
            </div>
            <div className='form-row'>
              <label className="form-field">
                Customer's Data : (only Excel files should be inserted)
                <input
                  type='file'
                  name="customersInfo"
                  ref={customersInfoRef}
                  onChange={handleExcelChange}
                  className="form-control"
                  required />
              </label>
              <label className='form-field'>
                <IconButton href={customerInfo} download="customerInfo.xlsx" color="primary">
                  <p style={{ fontSize: "12px" }}>Download Reference Excel File</p>
                  <DownloadIcon />
                </IconButton>
              </label>
              <div style={{ border: "2px solid lightblue", padding: "20px", borderRadius: "10px" }}>
                <p style={{ fontSize: "13px", fontWeight: "bold" }}>have a look how structure looks :</p>
                <div className={isZoomed1 ? "overlay" : ""}>
                  <label className="form-field" onClick={toggleZoom1}>
                    <img
                      src={customerInfo1}
                      alt="Dashboard Icon"
                      style={{
                        height: isZoomed1 ? '90%' : '35px',
                        width: isZoomed1 ? '90%' : '90%',
                        marginRight: '8px',
                        marginLeft: "8px",
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                        border: "#aa98d6"
                      }}
                    />
                  </label>
                </div>

                <div className={isZoomed2 ? 'overlay' : ''}>
                  <label className="form-field" onClick={toggleZoom2}>
                    <img
                      src={customerInfo2}
                      alt="Dashboard Icon"
                      style={{
                        height: isZoomed2 ? '90%' : '35px',
                        width: isZoomed2 ? '90%' : '80%',
                        marginRight: '8px',
                        marginLeft: "8px",
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                        border: "#aa98d6"
                      }}
                    />
                  </label>
                </div>
              </div>


            </div>
          </div>

          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {alertInfo.message}
            </Alert>
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
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
        </form>
      )}

      {singleCustomer && (
        <form onSubmit={handleSubmit}>


          <form className='Customer-master-form' style={{ marginBottom: "40px" }}>

            <div class="header-container">
              <h3 class="bigtitle">Customer Master</h3>
              <span class="mandatory-note">* All fields are mandatory</span>
            </div>

            <div className='form-row'>
              <label className="form-field input-group mb-3">
                System Date:
                <input
                  type="date"
                  name="systemDate"
                  value={formData.systemDate}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </label>
              <label className="form-field input-group mb-3">
                State
                <select
                  name="state"
                  onChange={handleChange}
                  disabled={isLoadingStates}
                  value={formData.state}>
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.iso2} value={state.iso2}>{state.name}</option>
                  ))}
                </select>
              </label>

              <label className="form-field input-group mb-3">
                City : 
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={isLoadingCities || !formData.state}
                >
                  <option value="">Select City</option>
                  {!cities.error && cities.map(city => (
                    <option key={city.iso2} value={city.iso2}>{city.name}</option>
                  ))}
                </select>
              </label>
              <label className="form-field input-group mb-3 ">
                Customer Code: {/* This might not be editable if it's system generated */}
                <input
                  type="text"
                  name="CustomerCode"
                  value={formData.CustomerCode}
                  className="form-control"
                  readOnly
                />
              </label>

            </div>

            <div className='form-row'>

              <label className="form-field input-group mb-3">
                Customer Name:
                <input
                  type="text"
                  name="CustomerName"
                  value={formData.CustomerName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder='Customer Name'
                  required
                />
              </label>

              <label className="form-field input-group mb-3">
                Customer Type:
                <select name="CustomerType" value={formData.CustomerType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="retail">Retail</option>
                  <option value="fleetOwner">Fleet Owner</option>
                </select>
              </label>

              <label className="form-field">
                Address  :
                <textarea name="address" value={formData.address} className="form-control" placeholder='Address' onChange={handleChange} required />
              </label>

              <label className="form-field">
                Pincode:
                <input
                  type='tel'
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder='Pincode'
                  required
                  pattern="\d{6}"
                  title="Pincode must be 6 digits"
                  className="form-control"
                />
              </label>
            </div>

            <div className='form-row'>
              <label className="form-field">
                Customer Phone No:
                <input
                  type='tel'
                  name="CustomerPhone"
                  value={formData.CustomerPhone}
                  placeholder='Customer Phone No'
                  onChange={handleChange}
                  className="form-control"
                  required
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                />
              </label>
              <label className="form-field">
                E-Mail:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address."
                />
              </label>
              <label className="form-field">
                Contact Person:
                <input
                  type='text'
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="form-control"
                  required />
              </label>
              <label className="form-field">
                Contact Person Number:
                <input
                  type='tel'
                  name="contactPersonNum"
                  value={formData.contactPersonNum}
                  onChange={handleChange}
                  placeholder='Contact Person Phone'
                  required
                  pattern="\d{10}"
                  className="form-control"
                  title="Phone number must be 10 digits" />
              </label>
            </div>

            <div className='form-row'>
              <label className="form-field">
                Contact Person Number 2 :
                <input
                  type='tel'
                  name="contactPersonNum2"
                  value={formData.contactPersonNum2}
                  placeholder='Contact Person Phone'
                  onChange={handleChange}
                  // required
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                  className="form-control"

                />
              </label>
              <label className="form-field">
                PAN Number:
                <input
                  type='text'
                  name="panNo"
                  placeholder='Pan Card Number'
                  value={formData.panNo}
                  onChange={handleChange}
                  className="form-control"
                  // required
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                />
              </label>
              <label className="form-field">
                PAN Card :
                <input
                  type='file'
                  name="panCard"
                  // value={formData.panCard}
                  onChange={handleChange}
                  className="form-control"
                  ref={panRef}
                  accept="image/*"
                // required 
                />
              </label>
              <label className="form-field">
                Aadhaar Number:
                <input
                  type='text'
                  name="adharNo"
                  placeholder='Aadhaar Card Number'
                  value={formData.adharNo}
                  onChange={handleChange}
                  className="form-control"
                  // required
                  pattern="\d{12}"
                  title="Aadhaar number must be exactly 12 digits."
                />
              </label>
            </div>

            <div className='form-row'>
              <label className="form-field">
                Adhar Card:
                <input
                  type='file'
                  name="adharCard"
                  // value={formData.adharCard}
                  onChange={handleChange}
                  ref={adharCardRef}
                  className="form-control"
                  accept="image/*"
                // required 
                />
              </label>
              <label className="form-field">
                GST Number:
                <input
                  type='text'
                  name="GSTNo"
                  placeholder='GST Number'
                  value={formData.GSTNo}
                  onChange={handleChange}
                  className="form-control"
                  required
                  pattern="^([0-9]{2})([A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1})$"
                  title="Please enter a valid GST number (e.g., 22ABCDE1234F1Z5)."
                />
              </label>

              <label className="form-field">
                GSTIN :
                <input
                  type='file'
                  name="GST"
                  // value={formData.GST}
                  ref={GSTRef}
                  onChange={handleChange}
                  accept="image/*"
                  className="form-control"
                />
              </label>

              <div className="dropdown green-dropdown form-field">
                Select Plan :
                <button
                  className="form-field input-group mb-3"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={showDropdown}
                  onClick={toggleDropdown}
                >
                  {formData.choosenPlan || "Select Plan"}
                </button>
                <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "pro")}>Pro Plan</a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "plus")}>Plus Plan</a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advanced")}>Advanced Plan</a></li>
                </ul>
              </div>
            </div>
          </form>

          <form className='Customer-master-form' style={{ marginBottom: "40px" }}>
            <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>
           <p> Send Your Current Location (if it's same for filling address):</p>
            <div className='form-row'>
              <Button variant="contained" onClick={getLocation}>Send Location</Button>
            </div>

           <p> Send Location Of Address (this is by your address):</p>
            <div className='form-row'>
              <label className='form-field'>
                Latitude:
                <input type="text" value={latitude} onChange={handleLatitudeChange} />
              </label>
              <label className='form-field'>
                Longitude:
                <input type="text" value={longitude} onChange={handleLongitudeChange} />
              </label>
              <label className='form-field'></label>
            </div>
            {location && (location.startsWith("Error:") ? <Alert severity="error">{location}</Alert> : <Alert severity="success">{location}</Alert>)}
          </form>
          <div>

            {isFleetOwner && (
              <div className="selected-container">
                <div class="header-container">
                  <h3 class="bigtitle">Fleet Owner</h3>
                  <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className='form-row'>
                  <label className="form-field">
                    Fleet : (only Excel files should be inserted)
                    <input
                      type='file'
                      name="fleetSize"
                      ref={fleetSizeRef}
                      onChange={handleChange}
                      className="form-control"
                      required />
                  </label>
                  <label className="form-field">
                    <IconButton href={fleetInfo} download="fleetInfo.xlsx" color="primary">
                      <p style={{ fontSize: "12px" }}>Download Reference Excel File</p>
                      <DownloadIcon />
                    </IconButton>
                  </label>
                  <div className={isZoomed ? "overlay" : ""}>
                    <label className="form-field" onClick={toggleZoom}>
                      have a look how structure looks :
                      <img
                        src={demoexcel}
                        alt="Dashboard Icon"
                        style={{
                          height: isZoomed ? '90%' : '45px',
                          width: isZoomed ? '90%' : '80%',
                          marginRight: '8px',
                          marginLeft: "8px",
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer'
                        }}
                      />
                    </label>
                  </div>


                </div>
              </div>
            )}

          </div>

          {isRetail && (
            <div className="selected-container">
              <div class="header-container">
                <h3 class="bigtitle">Retail Owner</h3>
                <span class="mandatory-note">All fields are mandatory</span>
              </div>
              <div>
                <div className='form-row'>
                  <label className="form-field">
                    Vehical Number:
                    <input
                      type='text'
                      name="vehicleNo"
                      value={formData.vehicleNo}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    Chassis Number:
                    <input
                      type='text'
                      name="chassisNo"
                      value={formData.chassisNo}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    Engine Number:
                    <input
                      type='text'
                      name="engineNo"
                      value={formData.engineNo}
                      onChange={handleChange}
                      required />
                  </label>

                </div>

                <div className='form-row'>
                  <label className="form-field">
                    Make:
                    <input
                      type='text'
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    Model:
                    <input
                      type='text'
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    Year:
                    <input
                      type='text'
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required />
                  </label>

                </div>

                <div className='form-row'>
                  <label className="form-field">
                    Type:
                    <input
                      type='text'
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    Application:
                    <input
                      type='text'
                      name="application"
                      value={formData.application}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    GVW:
                    <input
                      type='text'
                      name="GVW"
                      value={formData.GVW}
                      onChange={handleChange}
                      required />
                  </label>

                </div>

                <div className='form-row'>
                  <label className="form-field">
                    ULW:
                    <input
                      type='text'
                      name="ULW"
                      value={formData.ULW}
                      onChange={handleChange}
                      required />
                  </label>

                  <label className="form-field">
                    InsuranceName:
                    <input
                      type='text'
                      name="InsuranceName"
                      value={formData.InsuranceName}
                      onChange={handleChange}
                      required />
                  </label>
                  <label className="form-field"></label>
                </div>
              </div>
            </div>
          )}

          {alertInfo.show && (
            <div style={{ marginTop: "20px" }}>
              <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                {alertInfo.message}
              </Alert>
            </div>
          )}


          <div style={{ textAlign: 'center', marginTop: "40px" }}>
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
        </form>
      )}
    </div>
  );
};

export default CustomerMaster;
