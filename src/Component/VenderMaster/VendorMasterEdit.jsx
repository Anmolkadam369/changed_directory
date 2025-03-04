import React, { useState, useEffect, useRef } from 'react';
import './VendorMasterForm.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// '../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Admin from '../Admin/Admin';


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

const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const VendorMasterEdit = () => {
  const {state,location} = useLocation();
  
  // const { id } = location.state || {};
  console.log("Received ID:", state.id);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [comingData, setComingData] = useState([]);
  console.log("COmInddasdfasdfasfdasdf", comingData.first_approval)
  const [IsReadOnly, setIsReadOnly] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isGeneratedAgreement, setIsGeneratedAgreement] = useState(false);


  const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [isAdharModalOpen, setIsAdharModalOpen] = useState(false);
  const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);

  const [addressLocation, setAddressLocation] = useState(null);
  console.log("addressLocation123", addressLocation)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedActionHere, setSelectedActionHere] = useState(null);

  const [toInputBox, setToInputBox] = useState(false)

  const generateOfficePreviewLink = (fileUrl) => {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
  };

  const generateGooglePreviewLink = (fileUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
  };

  const handlePreviewClick = (e, fileUrl) => {
    e.stopPropagation();
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    let previewLink;
    if (fileExtension === 'pdf') {
      previewLink = generateGooglePreviewLink(fileUrl);
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
      previewLink = generateOfficePreviewLink(fileUrl);
    } else {
      alert('Preview not available for this file type.');
      return;
    }
    window.open(previewLink, '_blank');
  };

  console.log("latitude-", latitude, "longitude-", longitude)



  const handleSwitchInputBox = (event) => {
    setToInputBox(!toInputBox)
  };

  useEffect(() => {
    loadStates();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    getDataById(state.id);
  }, [token, userId, navigate, state.id]); // Removed comingData from dependencies

  const openPANModal = () => {
    setIsPANModalOpen(true);
  };

  const closePANModal = () => {
    setIsPANModalOpen(false);
  };

  const openAdharModal = () => {
    setIsAdharModalOpen(true);
  };

  const closeAdharModal = () => {
    setIsAdharModalOpen(false);
  };

  const openGSTModal = () => {
    setIsGSTModalOpen(true);
  };

  const closeGSTModal = () => {
    setIsGSTModalOpen(false);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setAddressLocation("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setAddressLocation(`Latitude: ${lat}, Longitude: ${lon}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      latitude: lat,
      longitude: lon
    }))
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setAddressLocation("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setAddressLocation("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setAddressLocation("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setAddressLocation("An unknown error occurred.");
        break;
    }
  };

  useEffect(() => {
    if (comingData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        vendorCode: comingData.vendorCode || "",
        vendorName: comingData.vendorName || "",
        vendorType: comingData.vendorType || "",
        address: comingData.address || "",
        district: comingData.district || "",
        pincode: comingData.pincode || "",
        vendorPhone: comingData.vendorPhone || "",
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
        GST: comingData.GST || "",
        rate: comingData.rate || "",
        GSTNo: comingData.GSTNo || "",
        longitude: comingData.longitude || "",
        latitude: comingData.latitude || "",
        id: comingData.id || "",
        remark: comingData.remark || "",
        perHR: comingData.perHR || "",
        first_approval: comingData.first_approval || "",
        second_approval: comingData.second_approval || "",

        recipientName : comingData.recipientName || "",
        bankAccount : comingData.bankAccount || "",
        ifscCode : comingData.ifscCode || "",
        bankName : comingData.bankName || "",
        branchName : comingData.branchName || "",
        mobileNumber : comingData.mobileNumber || "",
        upiId : comingData.upiId || "",




      }));
    }
  }, [comingData]);

  useEffect(() => {
    if (comingData.agreement !== "agreement Value") setIsGeneratedAgreement(true);
  }, [comingData])

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
  const [paymentMethod, setPaymentMethod] = useState('');

  const [formData, setFormData] = useState({
    systemDate: today,
    vendorCode: 'SYSTEM GENERATED',
    vendorName: '',
    vendorType: "",
    address: '',
    district: "",
    pincode: '',
    vendorPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: '',
    state: '',
    panNo: "",
    panCard: null,
    adharNo: "",
    adharCard: null,
    agreement: null,
    rate: "",
    GSTNo: "",
    GST: null,
    latitude: "",
    longitude: "",
    id: "",
    remark: "",
    perHR: "",
    first_approval: "",
    second_approval: "",
    recipientName :  "",
    bankAccount : "",
    ifscCode : "",
    bankName :  "",
    branchName :  "",
    mobileNumber :  "",
    upiId : "",
    
  });

  console.log("setformda ta", formData)
  console.log("COMBING", comingData)

  console.log("locatin")

  const [coordinates, setCoordinates] = useState("Fetching location...");

  const fullAddress = `${formData.address.trim()}, ${formData.district.trim()}, ${formData.pincode.trim()}, ${formData.state.trim()}`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&timestamp=${new Date().getTime()}`;

  useEffect(() => {
    if (!IsReadOnly) {
      const debounceTimer = setTimeout(() => {
        const getLonLat = async () => {
          try {
            console.log("FULL ADDRESS:", fullAddress);
            const response = await axios.get(url);
            console.log("Response data:", response.data);

            const location = response.data[0];
            if (location) {
              setLatitude(location.lat);
              setLongitude(location.lon);
              console.log(`ANMOL Latitude: ${location.lat}, Longitude: ${location.lon}`);
              setCoordinates(`ANMOL Latitude: ${location.lat}, Longitude: ${location.lon}`);
              setFormData(prevState => ({
                ...prevState,
                latitude: location.lat,
                longitude: location.lon,
              }));
            } else {
              setCoordinates("No location data found.");
            }
          } catch (error) {
            console.error("Error fetching coordinates:", error);
            setCoordinates("An error occurred while fetching the coordinates.");
          }
        };
        getLonLat();
      }, 500); // Adjust the debounce time as necessary

      return () => clearTimeout(debounceTimer);
    }
  }, [fullAddress, IsReadOnly]);




  const getDataById = async (id) => {
    let response;
    if (state.pageFrom == "VendorSignUp") {
      response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPotentialVendorById/${id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
    }
    else {
      response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendor/${state.id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
    }
    console.log("daa", response.data.data)
    console.log("response", response.data.data[0]);
    setComingData(response.data.data[0])
  }


  const approvalFunc1 = async (action) => {
    let response;
    console.log("userId:", userId);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/api/vendorApproval1/${action}/${formData.vendorCode}/${userId}`);

    try {
      response = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/vendorApproval1/${action}/${formData.vendorCode}/${userId}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });


      console.log("response.status", response.status)
      if (response.status === 200) {
        setSelectedActionHere(action)
        console.log("response", response.data);
        setSnackbarMessage(response.data.message);
        setOpenSnackbar(true);
        setIsLoading(false);
        setSnackbarMessage(response.data.message);
        setOpenSnackbar(true);
        setIsLoading(false);
        setTimeout(() => {
         navigate(-1)
        }, 2000);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      if (errorMessage === "jwt expired") {
        setSnackbarMessage("Your session has expired. Redirecting to login...", error);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setSnackbarMessage(errorMessage, error);
      }
      setOpenSnackbar(true);
    }
  };
  const approvalFunc = async (action) => {
    let response;
    console.log("userId:", userId);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/api/vendorApproval/${action}/${formData.vendorCode}/${userId}`);

    try {
      response = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/vendorApproval/${action}/${formData.vendorCode}/${userId}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });


      console.log("response.status", response.status)
      if (response.status === 200) {
        setSelectedActionHere(action)
        console.log("response", response.data);
        setSnackbarMessage(response.data.message);
        setOpenSnackbar(true);
        setIsLoading(false);
        setSnackbarMessage(response.data.message);
        setOpenSnackbar(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate(-1)
        }, 2000);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      if (errorMessage === "jwt expired") {
        setSnackbarMessage("Your session has expired. Redirecting to login...", error);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setSnackbarMessage(errorMessage, error);
      }
      setOpenSnackbar(true);
    }
  };


  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const agreementRef = useRef(null);

  const generateAgreement = (e) => {
    setIsGeneratedAgreement(true)
    console.log("setIsGeneratedAgreement", isGeneratedAgreement)
  }

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 2097152) {
        setSnackbarMessage("File size should be less than 2 MB!");
        setOpenSnackbar(true);
        const refs = {
          GST: GSTRef,
          panCard: panRef,
          adharCard: adharCardRef,
          agreement: agreementRef
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
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        district: "",
        address: "",
        pincode: ""
      }));
    }
    else if (name === "vendorPhone" || name === "contactPersonNum" || name === "contactPersonNum2") {
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
    }
    else if (name === "pincode" || name === "rate" || name == 'perHR') {
      const validValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData({
        ...formData,
        [name]: validValue,
      });
    }
    else if (name === "vendorPhone") {
      const validValue = value.replace(/\D/g, '').slice(0, 10);
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
    else if (name === "email") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    else if (name === "district"){
      let changedValue = value.charAt(0).toUpperCase()+value.slice(1).toLowerCase();
      setFormData({
        ...formData,
        [name]:changedValue
      })
    }
    else if (name === "vendorType") {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    else if(name=='bankName'|| name=='recipientName'|| name=='bankAccount' || name =='ifscCode' || name == 'branchName' || name == "mobileNumber" || name=='upiId'){
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
      if (key === 'panCard' || key === 'adharCard' || key === 'agreement' || key === 'GST') {
        if (value === null || value === undefined || value.size === 0)
          return `Field '${key}' is required.`;
      }
      if (key === "rate") continue;
      if (key === "perHR") continue;
    }

    if(formData.email  !== "No Email ID"){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }}

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
    if (formData.adharNo !== "No Adhar No" && !aadhaarRegex.test(formData.adharNo)) {
      return 'Please enter a valid Aadhaar Number.';
    }

    // const gstRegex = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/;
    // if (formData.GSTNo !== "" && !gstRegex.test(formData.GSTNo)) {
    //   return 'Please enter a valid GST number (e.g., 22ABCDE1234F1Z5).';
    // }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.panNo !== "No Pan No" && !panRegex.test(formData.panNo)) {
      return 'Please enter a valid PAN number (e.g., ABCDE1234F).';
    }

    return '';
  };
  console.log("FOEMRDD", formData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationMessage = validateForm();
    if (validationMessage) {
      setSnackbarMessage(validationMessage);
      setOpenSnackbar(true);
      setIsLoading(false);
      return;
    }
    console.log('Form data submitted:', formData);
    const formDataObj = new FormData();
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
        if (formData[key] instanceof File) {
          formDataObj.append(key, formData[key], formData[key].name);
        } else {
          if (key === 'rate' && key == "perHR" && formData[key] === "") {
            formDataObj.append(key, "0");
          } else {
            formDataObj.append(key, formData[key]);
          }
        }
      }
    }
    let response;
    // Debugging FormData contents
    for (let pair of formDataObj.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      response = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/venderUpdate/${state.id}/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response", response.data);
      setSnackbarMessage(response.data.message);
      setOpenSnackbar(true);
      setIsLoading(false);
      setTimeout(() => {
        navigate(-1)
      }, 2000);
    } catch (error) {
      console.error("Error during form submission:", error);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      if (errorMessage === "jwt expired") {
        setSnackbarMessage("Your session has expired. Redirecting to login...", error);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setSnackbarMessage(errorMessage, error)
      }
      setOpenSnackbar(true);
    }
  };

  const editable = () => {
    setIsReadOnly(!IsReadOnly)
  }
  const handleBack = () => {
    navigate(-1)
  }


  return (
    <div>
      <Admin/>
      <Helmet>
        <title>Vendor Info Edit - Claimpro</title>
        <meta name="description" content="Edit the Vendor Information." />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/VendorMasterEdit`} />
      </Helmet>
      <form onSubmit={handleSubmit} className="Customer-master-form" style={{ marginBottom: "50px" }}>
        <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
          <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
          <div>
            <h3 className='bigtitle' >Vendor Master Edits</h3>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>

          </div>
        </div>

        <div className="form-row">
          <label className="form-field input-group mb-3">
            Vendor Id:
            <input
              type="text"
              name="id"
              value={String(formData.id).padStart(4, '0')}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </label>

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
              <span style={{ marginRight: '10px' }}>Vendor Place - City:  {formData.district}</span>
              <div className="switch-container">
                <FormControlLabel
                  control={<Android12Switch defaultChecked />}
                  // checked={singleVendor}
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
                <span style={{ marginRight: '10px' }}>Vendor Place - City: {formData.district}</span>
                <div className="switch-container">
                  <FormControlLabel
                    control={<Android12Switch defaultChecked />}
                    // checked={singleVendor}
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
                readOnly={IsReadOnly}
                required
              />
            </label>
          )}

        </div>

        <div className='form-row'>

          <label className="form-field">
            Vendor Name:
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              readOnly={IsReadOnly}
              className="form-control"
              required
            />
          </label>
          <label className="form-field">
            Vendor Type:
            <select name="vendorType" value={formData.vendorType} onChange={handleChange} className="form-control" required disabled={IsReadOnly}>
              <option value="">Select</option>
              <option value="advocate">Advocate</option>
              <option value="crane">Crane</option>
              <option value="mechanic">Mechanic</option>
              <option value="workshop">Workshop</option>
            </select>

          </label>

          <label className="form-field">
            Address  :
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              readOnly={IsReadOnly}
              className="form-control"
            />
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
              readOnly={IsReadOnly}
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
              readOnly={IsReadOnly}
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
              required
              readOnly={IsReadOnly}
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
              required
              readOnly={IsReadOnly} />
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
              readOnly={IsReadOnly}
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
              required
              pattern="\d{10}"
              title="Phone number must be 10 digits"
              className="form-control"
              readOnly={IsReadOnly}
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
              required
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Please enter a valid PAN number (e.g., ABCDE1234F)."
              readOnly={IsReadOnly}
            />
          </label>
          <label className="form-field">
            PAN Card:
            {IsReadOnly ? (
              formData.panCard && formData.panCard !== "Pan Value" ? (
                formData.panCard.endsWith(".jpg") ||
                  formData.panCard.endsWith(".jpeg") ||
                  formData.panCard.endsWith(".webp") ||
                  formData.panCard.endsWith(".jfif") ||
                  formData.panCard.endsWith(".png") ||
                  formData.panCard.endsWith(".gif") ||
                  formData.panCard.endsWith(".bmp") ||
                  formData.panCard.endsWith(".tiff") ||
                  formData.panCard.endsWith(".svg") ? (
                  <>
                    <img
                      src={formData.panCard}
                      alt="PAN Card"
                      style={{
                        maxWidth: '100px',
                        display: 'block',
                        cursor: 'pointer',
                        border: 'solid black 2px',
                        padding: '3px',
                        marginTop: '6px'
                      }}
                      onClick={openPANModal}
                    />
                    <Modal isOpen={isPANModalOpen} onRequestClose={closePANModal} contentLabel="PAN Card Modal">
                      <div className="modal-header">
                        <IconButton href={formData.panCard} download color="primary">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton onClick={closePANModal} color="secondary">
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div className="modal-image-container">
                        <img src={formData.panCard} alt="PAN Card" style={{ width: '100%' }} />
                      </div>
                    </Modal>
                  </>
                ) : (
                  <>
                    <p>
                      <a
                        href={formData.panCard}
                        className="docx-link"
                        style={{
                          cursor: 'pointer',
                          color: 'green'
                        }}
                        download
                      >
                        <DownloadingOutlinedIcon /> Download
                      </a>
                      <button
                        type="button"
                        onClick={(e) => handlePreviewClick(e, formData.panCard)}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'white',
                          color: '#560303',
                          fontSize: '13px',
                          boxShadow: 'none'
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon /> Preview
                      </button>
                    </p>
                  </>
                )
              ) : (
                <p className='notUploaded'>No PAN Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="panCard"
                onChange={handleChange}
                accept="image/*"
                ref={panRef}
                required
                className="form-control"
              />
            )}
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
              required
              pattern="\d{12}"
              title="Aadhaar number must be exactly 12 digits."
              readOnly={IsReadOnly}
            />
          </label>

        </div>

        <div className='form-row'>

          <label className="form-field">
            Aadhaar Card:
            {IsReadOnly ? (
              formData.adharCard && formData.adharCard !== "Adhar Value" ? (
                formData.adharCard.endsWith(".jpg") ||
                  formData.adharCard.endsWith(".jpeg") ||
                  formData.adharCard.endsWith(".webp") ||
                  formData.adharCard.endsWith(".jfif") ||
                  formData.adharCard.endsWith(".png") ||
                  formData.adharCard.endsWith(".gif") ||
                  formData.adharCard.endsWith(".bmp") ||
                  formData.adharCard.endsWith(".tiff") ||
                  formData.adharCard.endsWith(".svg") ? (
                  <>
                    <img
                      src={formData.adharCard}
                      alt="Aadhaar Card"
                      style={{
                        maxWidth: '100px',
                        display: 'block',
                        cursor: 'pointer',
                        border: 'solid black 2px',
                        padding: '3px',
                        marginTop: '6px'
                      }}
                      onClick={openAdharModal}
                    />
                    <Modal isOpen={isAdharModalOpen} onRequestClose={closeAdharModal} contentLabel="Aadhaar Card Modal">
                      <div className="modal-header">
                        <IconButton href={formData.adharCard} download color="primary">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton onClick={closeAdharModal} color="secondary">
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div className="modal-image-container">
                        <img src={formData.adharCard} alt="Aadhaar Card" className="modal-image" />
                      </div>
                    </Modal>
                  </>
                ) : (
                  <>
                    <p>
                      <a
                        href={formData.adharCard}
                        className="docx-link"
                        style={{
                          cursor: 'pointer',
                          color: 'green'
                        }}
                        download
                      >
                        <DownloadingOutlinedIcon /> Download
                      </a>
                      <button
                        type="button"
                        onClick={(e) => handlePreviewClick(e, formData.adharCard)}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'white',
                          color: '#560303',
                          fontSize: '13px',
                          boxShadow: 'none'
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon /> Preview
                      </button>
                    </p>
                  </>
                )
              ) : (
                <p className='notUploaded'>No Aadhaar Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="adharCard"
                onChange={handleChange}
                accept="image/*"
                ref={adharCardRef}
                className="form-control"
                required
              />
            )}
          </label>
          <label className="form-field">
            Agreement :
            {IsReadOnly ? (
              <div>
                {formData.agreement !== "agreement Value" ? (
                  <>
                    <p>
                      <a
                        href={formData.agreement}
                        className="docx-link"
                        style={{
                          cursor: 'pointer',
                          color: 'green',
                        }}
                        download
                      >
                        <DownloadingOutlinedIcon /> Download
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handlePreviewClick(e, formData.agreement)}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'white',
                          color: '#560303',
                          fontSize: '13px',
                          boxShadow: 'none',
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon /> Preview
                      </button>
                    </p>
                  </>
                ) : (
                  <p className="notUploaded">No Agreement uploaded</p>
                )}
              </div>
            ) : !isGeneratedAgreement ? (
              <label
                className="form-control generate-button"
                onClick={generateAgreement}
                style={{
                  fontSize: '12px',
                  padding: '10px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: 'blue',
                }}
              >
                Generate Agreement
              </label>
            ) : (
              <label
                className="form-control generate-button"
                style={{
                  fontSize: '12px',
                  padding: '10px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: 'blue',
                }}
              >
                <CheckCircleOutlineOutlinedIcon /> EDIT
              </label>
            )}
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
              readOnly={IsReadOnly}
              pattern="^([0-9]{2})([A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1})$"
              title="Please enter a valid GST number (e.g., 22ABCDE1234F1Z5)."
            />
          </label>
          <label className="form-field">
            GSTIN:
            {IsReadOnly ? (
              formData.GST && formData.GST !== "default-GST-value" ? (
                formData.GST.endsWith(".jpg") ||
                  formData.GST.endsWith(".jpeg") ||
                  formData.GST.endsWith(".webp") ||
                  formData.GST.endsWith(".jfif") ||
                  formData.GST.endsWith(".png") ||
                  formData.GST.endsWith(".gif") ||
                  formData.GST.endsWith(".bmp") ||
                  formData.GST.endsWith(".tiff") ||
                  formData.GST.endsWith(".svg") ? (
                  <>
                    <img
                      src={formData.GST}
                      alt="GSTIN"
                      style={{
                        maxWidth: '100px',
                        display: 'block',
                        cursor: 'pointer',
                        border: 'solid black 2px',
                        padding: '3px',
                        marginTop: '6px'
                      }}
                      onClick={openGSTModal}
                    />
                    <Modal isOpen={isGSTModalOpen} onRequestClose={closeGSTModal} contentLabel="GSTIN Modal">
                      <div className="modal-header">
                        <IconButton href={formData.GST} download color="primary">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton onClick={closeGSTModal} color="secondary">
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div className="modal-image-container">
                        <img src={formData.GST} alt="GSTIN" className="modal-image" />
                      </div>
                    </Modal>
                  </>
                ) : (
                  <>
                    <p>
                      <a
                        href={formData.GST}
                        className="docx-link"
                        style={{
                          cursor: 'pointer',
                          color: 'green'
                        }}
                        download
                      >
                        <DownloadingOutlinedIcon /> Download
                      </a>
                      <button
                        type="button"
                        onClick={(e) => handlePreviewClick(e, formData.GST)}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'white',
                          color: '#560303',
                          fontSize: '13px',
                          boxShadow: 'none'
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon /> Preview
                      </button>
                    </p>
                  </>
                )
              ) : (
                <p className='notUploaded'>No GST Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="GST"
                onChange={handleChange}
                accept="image/*"
                ref={GSTRef}
                required
                className="form-control"
              />
            )}
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            Remark:
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="form-control"
              placeholder='Remark'
              readOnly={IsReadOnly}
            />
          </label>

          {
            formData.vendorType == "crane" &&
            (
              <div>
                <label className="form-field">
                  Rate/KM :
                  <input
                    type='text'
                    name="rate"
                    placeholder='Rate Per KM'
                    value={formData.rate}
                    onChange={handleChange}
                    className="form-control"
                    readOnly={IsReadOnly}
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
                    readOnly={IsReadOnly}
                    title="Aadhaar number must be exactly 12 digits."
                    required />
                </label>
              </div>
            )
          }
          {
            formData.vendorType != "crane" && (
              <label className="form-field"></label>
            )
          }
          {state.pageFrom == "VendorSignUp" &&
          (
            <div>
            {userId === "EMPID-94cda3d2-a317-49f5-8faf-f59cf18906e2" && (
            <div>
              <div style={{ fontSize: "12px" }}> Pre Approval:</div>
              {formData.first_approval === "" && (
                <>
                  <label
                    className="form-control generate-button"
                    onClick={() => {
                      approvalFunc("approved");
                      setSelectedAction("approved"); // Set the selected action
                    }}
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'blue',
                      backgroundColor: selectedAction === "approved" ? '#e0f7fa' : 'transparent', // Change background color if selected
                    }}
                  >
                    Approve
                  </label>
                  <label
                    className="form-control generate-button"
                    onClick={() => {
                      approvalFunc("not_approved");
                      setSelectedAction("not_approved"); // Set the selected action
                    }}
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'red',
                      backgroundColor: selectedAction === "not_approved" ? '#e0f7fa' : 'transparent', // Change background color if selected
                    }}
                  >
                    Don't Approve
                  </label>
                </>
              )}
            </div>
          )}

          {comingData && (
            (comingData.first_approval === "approved" || comingData.first_approval === 'not_approved') && (
              <div>
                <div style={{ fontSize: "12px" }}>Approved / Not Approved</div>
                {comingData.first_approval === "approved" ? (
                  <label
                    className="form-control generate-button"
                    onClick={generateAgreement} // Make sure you have this function defined
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon /> Pre Approved
                  </label>
                ) : (
                  <label
                    className="form-control generate-button"
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                  >
                    <CancelIcon /> Not Approved
                  </label>
                )}
              </div>
            )
          )}

          {userId === "EMPID-f2251370-99ac-40ee-a05d-dcc37c3534e2" && (
            <div>
              <div style={{ fontSize: "12px" }}> Admin Approval:</div>
              {formData.second_approval === "" && (
                <>
                  <label
                    className="form-control generate-button"
                    onClick={() => {
                      approvalFunc1("approved");
                      setSelectedAction("approved"); // Set the selected action
                    }}
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'blue',
                      backgroundColor: selectedAction === "approved" ? '#e0f7fa' : 'transparent', // Change background color if selected
                    }}
                  >
                    Approve
                  </label>
                  <label
                    className="form-control generate-button"
                    onClick={() => {
                      approvalFunc1("not_approved");
                      setSelectedAction("not_approved"); // Set the selected action
                    }}
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'red',
                      backgroundColor: selectedAction === "not_approved" ? '#e0f7fa' : 'transparent', // Change background color if selected
                    }}
                  >
                    Don't Approve
                  </label>
                </>
              )}
            </div>
          )}

          {comingData && (
            (comingData.second_approval === "approved" || comingData.second_approval === 'not_approved') && (
              <div>
                <div style={{ fontSize: "12px" }}>Admin Approved / Not Approved</div>
                {comingData.second_approval === "approved" ? (
                  <label
                    className="form-control generate-button"
                    onClick={generateAgreement} // Make sure you have this function defined
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'purple',
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon /> Fully Approved
                  </label>
                ) : (
                  <label
                    className="form-control generate-button"
                    style={{
                      fontSize: '12px',
                      padding: '10px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                  >
                    <CancelIcon /> Not Approved
                  </label>
                )}
              </div>
            )
          )}
          </div>
          )}



          <label className="form-field"></label>
          <label className="form-field"></label>
          <label className="form-field"></label>
        </div>

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
              <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }}>
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
              </form>
            </>
          )}
        </label>

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
                  value={formData.recipientName}
                  readOnly={IsReadOnly}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                style={{ flex: 1 }}
              >
                Bank Transfer
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                style={{ flex: 1 }}
              >
                UPI
              </button>
            </div>

            {paymentMethod === 'bank' && (
              <div className="Customer-master-form" style={{ marginLeft: "0px", marginRight: "0px", paddingLeft: '15px', paddingRight: "25px" }}>
                <label className="form-field input-group mb-3">
                  Bank Name:
                  <input
                    type="text"
                    name="bankName"
                  readOnly={IsReadOnly}
                    value={formData.bankName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
                <label className="form-field input-group mb-3">
                  Bank Account:
                  <input
                    type="text"
                    name="bankAccount"
                  readOnly={IsReadOnly}
                    value={formData.bankAccount}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
                <label className="form-field input-group mb-3">
                  IFSC Code:
                  <input
                    type="text"
                    name="ifscCode"
                  readOnly={IsReadOnly}
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
                <label className="form-field input-group mb-3">
                  Branch Name:
                  <input
                    type="text"
                    name="branchName"
                  readOnly={IsReadOnly}
                    value={formData.branchName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="Customer-master-form" style={{ marginLeft: "0px", marginRight: "0px", paddingLeft: '15px', paddingRight: "25px" }}>
                <label className="form-field input-group mb-3">
                  Registered Mobile Number:
                  <input
                    type="text"
                    name="mobileNumber"
                  readOnly={IsReadOnly}
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
                <label className="form-field input-group mb-3">
                  UPI ID:
                  <input
                    type="text"
                    name="upiId"
                  readOnly={IsReadOnly}
                    value={formData.upiId}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
              </div>
            )}
          </form>





        {state.pageFrom == "viewVendor" && (
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
        )}
      </form >
    </div >
  );
};

export default VendorMasterEdit;
