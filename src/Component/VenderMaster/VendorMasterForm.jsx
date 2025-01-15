import React, { useState, useEffect, useRef } from 'react';
import './VendorMasterForm.css'
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
import vendorInfo1 from '../../Assets/vendorInfo1.jpg'
import vendorInfo2 from '../../Assets/vendorInfo2.jpg'
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
import Admin from '../Admin/Admin';


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

const VendorMasterForm = () => {
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

  console.log('latitude longitude', latitude, longitude)
  console.log("locatin", location)

  const handleSwitchChange = (event) => {
    setSingleVendor(event.target.checked);
  };


  const handleSwitchInputBox = (event) => {
    setToInputBox(!toInputBox)
  };


  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    bankAccount: '',
    ifscCode: '',
    branchName: ''
  });
  const [upiDetails, setUpiDetails] = useState({
    mobileNumber: '',
    upiId: ''
  });
  const [errors, setErrors] = useState({
    recipientName: '',
    paymentMethod: '',
    bankDetails: '',
    upiDetails: ''
  });

  useEffect(() => {
    loadStates();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);
  console.log("userIIIIIID", userId);

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
    vendorCode: 'SYSTEM GENERATED',
    vendorName: '',
    vendorType: '',
    address: '',
    state: '',
    district: "",
    pincode: '',
    vendorPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: '',
    panNo: "",
    panCard: "",
    adharNo: '',
    adharCard: "",
    rate: "" || "0",
    perHR: "" || '0',
    GSTNo: "",
    GST: "info",
    remark: ""
  });

  console.log("FORMDATA908", formData)
  const fullAddress = `${formData.address}, ${formData.district},${formData.pincode}, ${formData.state}`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(fullAddress)}`;
  console.log("URL", url)
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
        setLocation(` Latitude: ${location.lat}, Longitude: ${location.lon}`);
      } catch (error) {
        // setLocation("An error occurred while fetching the coordinates.");
      }
    }
    getLonLat()
  }, [fullAddress])


  const [otherFormData, setOtherFormData] = useState({
    vendorsInfo: ''
  })
  console.log("otherformdata", otherFormData)
  console.log("formdata", formData)

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const vendorsInfoRef = useRef(null);

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value
      .split(' ')
      .map(word => word.toUpperCase())
      .join(' ');

    setBankDetails({ ...bankDetails, [name]: capitalizedValue });
  };

  const handleUpiDetailsChange = (e) => {
    const { name, value } = e.target;
    setUpiDetails({ ...upiDetails, [name]: value });
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

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 2097152) {
        setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
        const refs = {
          GST: GSTRef,
          panCard: panRef,
          adharCard: adharCardRef,
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
    } else if (["vendorPhone", "contactPersonNum", "contactPersonNum2"].includes(name)) {
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
    } else if (["pincode", "rate", "perHR"].includes(name)) {
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
    else if (name === "district") {
      console.log("vauel", value)
      const changedValue = value
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  setFormData({
      ...formData,
      [name]: changedValue
  });
    }
    else if (name === "vendorType") {
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
      if ((key !== "remark" && key !== 'email' && key !== "GSTNo" && key !== "GST" && key !== "adharNo" && key !== "adharCard" && key !== "panNo" && key !== "panCard" && key !== "contactPersonNum2") && value === '') {
        return `Field '${key}' is required.`;
      }
    }

    if (formData.email !== "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        return 'Please enter a valid email address.';
      }
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.vendorPhone)) {
      return 'Please enter a valid Vendor Phone Number.';
    }
    if (!phoneRegex.test(formData.contactPersonNum)) {
      console.log("contada", formData.contactPersonNum)
      return 'Please enter a valid Contact Person Number.';
    }
    if (formData.contactPersonNum2 !== "" && !phoneRegex.test(formData.contactPersonNum2)) {
      return 'Please enter a valid Secondary Contact Person Number.';
    }

    const aadhaarRegex = /^\d{12}$/;
    if (formData.adharNo !== "" && !aadhaarRegex.test(formData.adharNo)) {
      return 'Please enter a valid Aadhaar Number.';
    }

    const gstRegex = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/;
    if (formData.GSTNo !== "" && !gstRegex.test(formData.GSTNo)) {
      return 'Please enter a valid GST number (e.g., 22ABCDE1234F1Z5).';
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.panNo !== "" && !panRegex.test(formData.panNo)) {
      return 'Please enter a valid PAN number (e.g., ABCDE1234F).';
    }

    return '';
  };


  const validateInnerForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!recipientName) {
      formErrors.recipientName = 'Please enter recipient name';
      isValid = false;
    }

    if (paymentMethod === 'bank') {
      if (!bankDetails.bankName || !bankDetails.bankAccount || !bankDetails.ifscCode || !bankDetails.branchName) {
        formErrors.bankDetails = 'Please fill all bank details';
        isValid = false;
      }
      if (bankDetails.bankAccount && !/^\d{9,18}$/.test(bankDetails.bankAccount)) {
        formErrors.bankAccount = 'Please enter a valid bank account number';
        isValid = false;
      }
      if (bankDetails.ifscCode && !/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/.test(bankDetails.ifscCode)) {
        formErrors.ifscCode = 'Please enter a valid IFSC code';
        isValid = false;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiDetails.mobileNumber || !upiDetails.upiId) {
        formErrors.upiDetails = 'Please fill both mobile number and UPI ID';
        isValid = false;
      }
      if (upiDetails.mobileNumber && !/^\d{10}$/.test(upiDetails.mobileNumber)) {
        formErrors.mobileNumber = 'Please enter a valid mobile number';
        isValid = false;
      }
      if (upiDetails.upiId && !/^[\w.-]+@[\w.-]+$/.test(upiDetails.upiId)) {
        formErrors.upiId = 'Please enter a valid UPI ID';
        isValid = false;
      }
    } else {
      formErrors.paymentMethod = 'Please select a payment method';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid ? '' : formErrors;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

    if (paymentMethod === 'bank') {
      sendData = {
        recipientName,
        ...bankDetails
      };
    } else if (paymentMethod === 'upi') {
      sendData = {
        recipientName,
        ...upiDetails
      };
    }

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

    formDataObj.append('latitude', latitude);
    formDataObj.append('longitude', longitude);

    for (let pair of formDataObj.entries()) {
      console.log(pair[0] + ":" + pair[1])
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${backendUrl}/api/venderInfo/${userId}`,
        data: formDataObj,
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
        url: `${backendUrl}/api/venderInfoExcel/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': `Bearer ${token}`
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

  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelect = (event, value) => {
    event.preventDefault(); // Prevent default link behavior
    setFormData({
      ...formData,
      vendorType: value
    });
    setShowDropdown(false); // Close dropdown after selection
  };
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const bankFormOpen = () => setShowBankForm(!showBankForm);
  const toggleZoom = () => setIsZoomed(!isZoomed);
  const toggleZoom1 = () => setIsZoomed1(!isZoomed1);


  const handleExcelChange = (e) => {
    const { name, files } = e.target;
    if (name === 'vendorsInfo') {
      if (files[0].type !== 'application/vnd.ms-excel' && files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setAlertInfo({ show: true, message: "should be only excel file!!!", severity: 'error' });
        const refs = {
          vendorsInfo: vendorsInfoRef
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
  console.log("Rendering Form 1");


  return (
    <div>
      {/* <Sidebar/> */}
{/* <Admin/> */}
      <Helmet>
        <title>Vendor Details - Claimpro</title>
        <meta name="description" content="Vendor for BVC ClaimPro Assist and for vehicle accidents. Keep track of Vendors." />
        <meta name="keywords" content="Vehicle Accidents, vendor, vendor Information, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/VendorMaster`} />
      </Helmet>

      <div className='switchparent-container'>
        <div className="switch-container">
          <FormControlLabel
            control={<Android12Switch defaultChecked />}
            checked={singleVendor}
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      {!singleVendor && (
        <form onSubmit={handleExcelSubmit} style={{ background: "#f1f1f1" }} className="Customer-master-form">
          <div>
            <div class="header-container">
              <h3 class="bigtitle">Vendor Excel File</h3>
              <span class="mandatory-note">All fields are mandatory</span>
            </div>
            <div className='form-row'>
              <label className="form-field">
                Vendors Data : (only Excel files should be inserted)
                <input
                  type='file'
                  name="vendorsInfo"
                  ref={vendorsInfoRef}
                  onChange={handleExcelChange}
                  className="form-control"
                  required />
              </label>
              <label className="form-field">

                <IconButton href={vendorsInfo} download="vendorsInfo.xlsx" color="primary">
                  <p style={{ fontSize: "12px" }}>Download Reference Excel File</p>
                  <DownloadIcon />
                </IconButton>
              </label>



              <div style={{ border: "2px solid lightblue", padding: "20px", borderRadius: "10px" }}>
                <p style={{ fontSize: "13px", fontWeight: "bold" }}>have a look how structure looks :</p>
                <div className={isZoomed ? "overlay" : ""}>
                  <label className="form-field" onClick={toggleZoom}>
                    <img
                      src={vendorInfo1}
                      alt="Dashboard Icon"
                      style={{
                        height: isZoomed ? '90%' : '35px',
                        width: isZoomed ? '90%' : '90%',
                        marginRight: '8px',
                        marginLeft: "8px",
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer'
                      }}
                    />
                  </label>
                </div>

                <div className={isZoomed1 ? 'overlay' : ''}>
                  <label className="form-field" onClick={toggleZoom1}>
                    <img
                      src={vendorInfo2}
                      alt="Dashboard Icon"
                      style={{
                        height: isZoomed ? '90%' : '35px',
                        width: isZoomed ? '90%' : '90%',
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

      {singleVendor && (
        <form onSubmit={handleSubmit} >

          <form className='Customer-master-form' style={{ marginBottom: "40px" }}>
            <div class="header-container">
              <h3 class="bigtitle">Vendor Master</h3>
              <span class="mandatory-note">* All fields are mandatory</span>
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
                Vendor Code:
                <input
                  type="text"
                  name="vendorCode"
                  placeholder='SYSTEM GENERATED'
                  value={formData.vendorCode}
                  className="form-control"
                  readOnly
                />
              </label>
              <label className="form-field input-group mb-3">
                Vendor Place -State:
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

              {!toInputBox && (<label className="form-field input-group mb-3">
                <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                  <span style={{ marginRight: '10px' }}>Vendor Place - City:</span>
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
                        onChange={handleSwitchInputBox}
                        label="" // You can add a label here if needed
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="district"
                    placeholder='District'
                    value={formData.district}
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
                Vendor Name:
                <input
                  type="text"
                  name="vendorName"
                  placeholder='Vendor Name'
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </label>

              <div className="dropdown green-dropdown form-field">
                Select Vendor Type:
                <button
                  className="form-field input-group mb-3 mt-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={toggleDropdown}
                >
                  {formData.vendorType || "Select Vendor Type"}
                </button>
                <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advocate")}>Advocate</a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crane")}>Crane</a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "mechanic")}>Mechanic</a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                </ul>
              </div>
              <label className="form-field">
                Address  :
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder='Address' />
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
                Vendor Phone No:
                <input
                  type='tel'
                  name="vendorPhone"
                  value={formData.vendorPhone}
                  onChange={handleChange}
                  placeholder='Vendor Phone No'
                  required
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                  className="form-control"
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
                  // required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address."
                  className="form-control"
                />
              </label>

              <label className="form-field">
                Contact Person:
                <input
                  type='text'
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder='Contact Person Name'
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
                  onChange={handleChange}
                  accept="image/*"
                  className="form-control"
                  ref={panRef}
                  capture="environment"
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
                  accept="image/*"
                  ref={adharCardRef}
                  className="form-control"
                  capture="environment"
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
                  // required
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
                  onChange={handleChange}
                  accept="image/*"
                  ref={GSTRef}
                  capture="environment"
                  className="form-control"
                // required
                />
              </label>

              <label className="form-field">
                Remark :
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  className="form-control"
                  placeholder='Remark' />
              </label>
            </div>

            <div>
              {formData.vendorType == "crane" &&
                (
                  <div className='form-row'>
                    <label className="form-field">
                      Rate/KM :
                      <input
                        type='text'
                        name="rate"
                        placeholder='Rate Per KM'
                        value={formData.rate}
                        onChange={handleChange}
                        className="form-control"
                        title="Aadhaar number must be exactly 12 digits."
                        required />
                    </label>

                    <label className="form-field">
                      per HR:
                      <input
                        type='text'
                        name="perHR"
                        placeholder='Rate Per HR'
                        value={formData.perHR}
                        onChange={handleChange}
                        className="form-control"
                        title="Aadhaar number must be exactly 12 digits."
                        required />
                    </label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>
                  </div>
                )}
              {formData.vendorType != "crane" && (
                <label className="form-field"></label>
              )}
            </div>

          </form>



          <form className='Customer-master-form' style={{ marginBottom: "40px" }}>
            <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>
            <p>   Send Your Current Location (if it's same for filling address):</p>
            <div className='form-row'>
              <Button variant="contained" onClick={getLocation}>Send Location</Button>
            </div>


            <p>   Send Location Of Address (this is by your address):</p>
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
          </form>


          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
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
      )}
    </div>
  );
};

export default VendorMasterForm;
