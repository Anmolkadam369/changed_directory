import React, { useState, useEffect, useRef } from 'react';
import './CustomerMaster.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import '@react-pdf-viewer/core/lib/styles/index.css';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const CustomerMasterEdit = ({ id, onUpdate }) => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const location = useLocation();
  // const { id } = location.state || {};
  console.log("Received IDssssssssssssssssssssss:", id);
  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  const [comingData, setComingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [isAdharModalOpen, setIsAdharModalOpen] = useState(false);
  const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);

  const [locations, setLocation] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [isAgreementPreviewOpen, setIsAgreementPreviewOpen] = useState(false);

  const openPreviewModal = () => {
    setIsAgreementPreviewOpen(true);
  };

  const closePreviewModal = () => {
    setIsAgreementPreviewOpen(false);
  };

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

  useEffect(() => {
    loadStates();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    getDataById(id);
  }, [token, userId, navigate, id]);

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





  const today = new Date().toISOString().split('T')[0];
  const [isRetail, setIsRetail] = useState(false);
  const [isFleetOwner, setIsFleetOwner] = useState(false);
  const [IsReadOnly, setIsReadOnly] = useState(true);


  const [formData, setFormData] = useState({
    systemDate: today,
    CustomerCode: 'SYSTEM GENERATED',
    CustomerName: '',
    CustomerType: '',
    address: '',
    city: '',
    pincode: '',
    CustomerPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: '',
    state: '',
    panNo: "",
    panCard: "",
    adharNo: '',
    adharCard: "",
    agreement: "",
    fleetSize: "",
    plan: '',
    GST: "",
    GSTNo: "",
    vehicleNo: "", chassisNo: "", engineNo: "", make: "", model: "",
    year: "", type: "", application: "", GVW: "", ULW: "",
    InsuranceName: "",
    longitude: '', latitude: ""
  });
  console.log("FORDSTA", formData)

  useEffect(() => {
    if (formData.address|| formData.district|| formData.pincode|| formData.state) {
      const getLonLat = async () => {
        try {
          const fullAddress = `${formData.address}, ${formData.district},${formData.pincode}, ${formData.state}`;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
          const response = await axios.get(url);
          const location = response.data[0];
          if (response.data.length > 0) {
            setLatitude(location.lat);
            setLongitude(location.lon);
            setFormData(prevState => ({
              ...prevState,
              latitude: location.lat,
              longitude: location.lon
            }));
            setLocation(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
          } else {
            setLocation("Geocoding was not successful. Please check the address.");
          }
        } catch (error) {
          setLocation("An error occurred while fetching the coordinates.");
        }
      }
      getLonLat();
    }
  }, [formData.address, formData.district, formData.pincode, formData.state]);



  console.log("formdata", formData)

  useEffect(() => {
    if (comingData) {
      setFormData(prevFormData => ({
        ...prevFormData,
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
        latitude: comingData.latitude !== null ? comingData.latitude : ""
      }));
    }
  }, [comingData]);

  console.log("COMINGDATA-DATA", comingData)


  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const agreementRef = useRef(null);
  const fleetSizeRef = useRef(null);

  console.log("FORMAT", formData)


  const getDataById = async (id) => {
    const response = await axios.get(`${backendUrl}/api/getCustomer/${id}`);
    console.log("daa", response.data.data)
    console.log("response123", response.data.data[0]);
    setComingData(response.data.data[0])
  }

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key === "city") continue;
      if (key === 'panCard' || key === 'adharCard' || key === 'agreement' || key === 'GST') {
        if (value === null || value === undefined || (value && value.size === 0)) {
          return `Field '${key}' is required here.`;
        }
      }
    }
    console.log("type", formData['CustomerType'])


    for (const [key, value] of Object.entries(formData)) {

      //   if (formData['CustomerType'] === 'retail') {
      //     if (!formData['plan']) {
      //         return "Field 'plan' is required in retail.";
      //     }

      // } else if (formData['CustomerType'] === 'fleetOwner') {
      //     const requiredFields = ['vehicleNo', 'chassisNo', 'engineNo', 'make', 'model', 'year', 'type', 'application', 'GVW', 'ULW', 'InsuranceName'];
      //     for (const field of requiredFields) {
      //         if (!formData[field]) {
      //             return `Field '${field}' is required in fleetOwner.`;
      //         }
      //     }
      // }
      if (key === "city") continue;

      if (key !== 'panCard' && key !== 'adharCard' && key !== 'agreement' && key !== 'GST' && key != 'fleetSize' && key != 'vehicleNo' && key != 'chassisNo' && key != 'engineNo' && key != 'make' && key != 'model' && key != 'year' && key != 'type' && key != 'application' && key != 'GVW' && key != 'ULW' && key != 'InsuranceName' && key != 'plan') {
        if (value === '') return `Fields '${key}' is required.`;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    const phoneRegex =  /^[0-9]{10}$/
    if (!phoneRegex.test(formData.CustomerPhone)) {
      return 'Please enter a valid Customer Phone Number.';
    }
    if (!phoneRegex.test(formData.contactPersonNum)) {
      console.log("contada", formData.contactPersonNum)
      return 'Please enter a valid Contact Person Number.';
    }
    if (!phoneRegex.test(formData.contactPersonNum2)) {
      return 'Please enter a valid Secondary Contact Person Number.';
    }

    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(formData.adharNo)) {
      return 'Please enter a valid Aadhaar Number.';
    }
  
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNo)) {
      return 'Please enter a valid PAN Number.';
    }

    return ''; // If all checks pass, return an empty string
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


  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 2097152) {
        setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
        const refs = {
          GST: GSTRef,
          panCard: panRef,
          adharCard: adharCardRef,
          agreement: agreementRef,
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
    } else if (name === 'state') {
      loadCities(value);
      setFormData(prevState => ({ ...prevState, [name]: value }));
    } else if (name === "pincode") {
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
    } else if (name === "CustomerPhone" || name === "contactPersonNum" || name === "contactPersonNum2") {
      const validValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: validValue,
      });
    } else if (name === 'latitude' || name === 'longitude') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      if (name === "CustomerType") {
        if (value === "retail") {
          setIsRetail(true);
          setIsFleetOwner(false);
        } else if (value === "fleetOwner") {
          setIsFleetOwner(true);
          setIsRetail(false);
        }
      }
    }
  };




  const editable = () => {
    setIsReadOnly(!IsReadOnly)
  }
  const handleBack = () => {
    // navigate("../Admin")
    onUpdate()
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationMessage = validateForm();
    if (validationMessage) {
      setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
      setIsLoading(false); // Set isLoading to false if there is a validation error
      return;
    }
    console.log('Form data submitted:', formData);
    setAlertInfo({ ...alertInfo, show: false });

    const formDataObj = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        if (formData[key] instanceof File) {
          formDataObj.append(key, formData[key], formData[key].name);
        } else if (
          key === "vehicleNo" ||
          key === "chassisNo" ||
          key === "engineNo" ||
          key === "make" ||
          key === "model" ||
          key === "year" ||
          key === "type" ||
          key === "application" ||
          key === "GVW" ||
          key === "ULW" ||
          key === "InsuranceName" ||
          key === "fleetSize"
        ) {
          continue;
        } else {
          formDataObj.append(key, formData[key]);
        }
      }
    }

    console.log("latitude", latitude, "longitiude", longitude, "location", location)
    if (formData.latitude === "" || formData.longitude === "" || location === "Geolocation is not supported by this browser.") {
      setAlertInfo({ show: true, message: "Please Give latitude and Longitude", severity: 'error' });
      setIsLoading(false);
      return;
    }

    for (let pair of formDataObj.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios({
        method: 'PUT',
        url: `${backendUrl}/api/customerUpdate/${id}/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': token
        }
      });
      console.log("response", response.data);
      setIsLoading(false);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
      setTimeout(() => {
        // navigate("../Admin");
        onUpdate();
      }, 2000);
    }
    catch (error) {
      console.error("Error during form submission:", error);
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

  return (
    <div >
      <Helmet>
        <title>Customer Info Edit - Claimpro</title>
        <meta name="description" content="Edit the Customer Information." />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/CustomerMasterEdit`} />
      </Helmet>
      <form onSubmit={handleSubmit} className="Customer-master-form">
        <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
          <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />

          <div class='header-container'>
            <h2 className='bigtitle'>Customer Master Edit</h2>
          </div>
        </div>
        <div className="form-row">
          <label className="form-field">
            System Date:
            <input
              type="date"
              name="systemDate"
              value={formData.systemDate}
              onChange={handleChange}
              readOnly={IsReadOnly}
            />
          </label>
          <label className="form-field input-group mb-3">
            Accident Place - State:
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

          <label className="form-field input-group mb-3">
            Accident - City  : {formData.district}
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
          <label className="form-field">
            Customer Code:
            <input
              type="text"
              className="form-control"
              name="CustomerCode"
              value={formData.CustomerCode}
              readOnly
            />
          </label>

        </div>

        <div className='form-row'>
          <label className="form-field">
            Customer Name:
            <input
              type="text"
              className="form-control"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              required
              readOnly={IsReadOnly}
            />
          </label>
          <label className="form-field">
            Customer Type:
            <select name="CustomerType" value={formData.CustomerType} onChange={handleChange} required disabled >
              <option value="">Select</option>
              <option value="retail">Retail</option>
              <option value="fleetOwner">Fleet Owner</option>
            </select>
          </label>
          <label className="form-field">
            Address  :
            <textarea
              className="form-control" name="address" value={formData.address} onChange={handleChange} required readOnly={IsReadOnly} />
          </label>

          <label className="form-field">
            Pincode:
            <input
              type='tel'
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              pattern="\d{6}"
              title="Pincode must be 6 digits"
              readOnly={IsReadOnly}
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
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Phone number must be 10 digits"
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
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address."
              readOnly={IsReadOnly}
            />
          </label>
          <label className="form-field">
            Contact Person:
            <input
              type='text'
              className="form-control"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              readOnly={IsReadOnly}
              required />
          </label>
          <label className="form-field">
            Contact Person Number :
            <input
              type='tel'
              name="contactPersonNum"
              value={formData.contactPersonNum}
              onChange={handleChange}
              readOnly={IsReadOnly}
              placeholder='Contact Person Phone'
              className="form-control"
              pattern="\d{10}"
              title="Phone number must be 10 digits"
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            Contact Person Number 2 :
            <input
              type='tel'
              className="form-control"
              name="contactPersonNum2"
              placeholder='Contact Person Phone'
              value={formData.contactPersonNum2}
              onChange={handleChange}
              readOnly={IsReadOnly}
              pattern="\d{10}"
              title="Phone number must be 10 digits"
              required />
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
            GST Number:
            <input
              type='text'
              name="GSTNo"
              placeholder='GST Number'
              value={formData.GSTNo}
              onChange={handleChange}
              className="form-control"
              pattern="^([0-9]{2})([A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1})$"
              title="Please enter a valid GST number (e.g., 22ABCDE1234F1Z5)."
              readOnly={IsReadOnly}
              required />
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
              readOnlyj={IsReadOnly}
              title="Aadhaar number must be exactly 12 digits."
            />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            Adhar Card:
            {IsReadOnly ? (
              formData.adharCard ? (
                <>
                  <img
                    src={formData.adharCard}
                    alt="Adhar Card"
                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' ,   border:'solid black 2px', padding: "3px", marginTop:"6px"   }}
                    onClick={openAdharModal}
                  />
                  <Modal isOpen={isAdharModalOpen} onRequestClose={closeAdharModal} contentLabel="Adhar Card Modal">
                    <div className="modal-header">
                      <IconButton href={formData.adharCard} download color="primary">
                        <DownloadIcon />
                      </IconButton>
                      <IconButton onClick={closeAdharModal} color="secondary">
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="modal-image-container">
                      <img src={formData.adharCard} alt="Adhar Card" style={{ width: '100%' }} />
                    </div>
                  </Modal>
                </>
              ) : (
                <p>No Adhar Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="adharCard"
                onChange={handleChange}
                accept=".pdf,image/*"
                ref={adharCardRef}
                className="form-control"
                required
              />
            )}
          </label>
          <label className="form-field">
            PAN Card:
            {IsReadOnly ? (
              formData.panCard ? (
                <>
                  <img
                    src={formData.panCard}
                    alt="PAN Card"
                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' ,   border:'solid black 2px', padding: "3px", marginTop:"6px"   }}
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
                <p>No PAN Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="panCard"
                onChange={handleChange}
                accept=".pdf,image/*"
                ref={panRef}
                required
                className="form-control"
              />
            )}
          </label>
          <label className="form-field">
            GSTIN:
            {IsReadOnly ? (
              formData.GST != "default-GST-value" ? (
                <>
                  <img
                    src={formData.GST}
                    alt="GSTIN"
                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' ,   border:'solid black 2px', padding: "3px", marginTop:"6px"   }}
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
                      <img src={formData.GST} alt="GSTIN" style={{ width: '100%' }} />
                    </div>
                  </Modal>
                </>
              ) : (
                <p  className='notUploaded'>No GST Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="GST"
                onChange={handleChange}
                accept=".pdf,image/*"
                ref={GSTRef}
                required
                className="form-control"
              />
            )}
          </label>

        </div>

        <div className='form-row'>
          <label className="form-field">
            {IsReadOnly ? (
              <div>
                {formData.agreement ? (
                  <>
                    Download Agreement
                    <p>
                      <a
                        href={formData.agreement}
                        className="docx-link"
                        style={{
                          cursor: 'pointer',
                          color:'green'
                      }}
                      download
                  >
                      <DownloadingOutlinedIcon/> Download
                      </a>
                      <button
                        type="button"
                        onClick={(e) =>  handlePreviewClick(e, formData.agreement)}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: "white",
                          color:"#560303",
                          fontSize:"13px"
                      }}
                  >
                      <RemoveRedEyeOutlinedIcon/> Preview
                      </button>

                
                    </p>
                  </>
                ) : (
                  <p>No Agreement uploaded</p>
                )}
              </div>
            ) : null}
          </label>

          {formData.fleetSize && (
            <label className="form-field">
              {IsReadOnly ? (
                <div>
                  {formData.fleetSize !== "No fleetSize" ? (
                    <>
                      Download Fleet Excel
                      <p>
                        <a
                          href={formData.fleetSize}
                          className="docx-link"
                          style={{
                            cursor: 'pointer',
                            color:'green'
                        }}
                        download
                    >
                        <DownloadingOutlinedIcon/> Download
                        </a>

                        <button
                          type="button"
                          onClick={(e) => handlePreviewClick(e, formData.fleetSize)}
                          style={{
                            cursor: 'pointer',
                            border: 'none',
                            background: "white",
                            color:"#560303",
                            fontSize:"13px"
                        }}
                    >
                        <RemoveRedEyeOutlinedIcon/> Preview
                        </button>

                      </p>
                    </>
                  ) : (
                    <p  className='notUploaded'>No Fleet Doc uploaded</p>
                  )}
                </div>
              ) : null}
            </label>)}

          <label className="form-field"></label>

          <label className="form-field"></label>
        </div>

        <label className='form-field'>
          {IsReadOnly ? (
            formData.longitude == "" ? (
              <p className='notUploaded'>No Location Uploaded</p>
            ) : (
              <>
                <Button variant="contained">Send Location</Button>
              </>
            )
          ) : (
            <>
              <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }}>
                <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>
                Send Your Current Location (if it's same for filling address):
                <div className='form-row'>
                  <label className='form-field'>
                    <Button variant="contained" onClick={getLocation}>Send Location</Button>
                  </label>
                </div>

                Send Location Of Address (this is by your address):
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


        <div className='form-row'>

        </div>
        <div>
          {isFleetOwner && (
            <div className='selected-container'>
              <div class="header-container">
                <h3 class="bigtitle">Fleet Owner</h3>
                <span class="mandatory-note">All fields are mandatory</span>
              </div>
              <div className='form-row'>
                <label className="form-field">
                  Plan:
                  <input
                    type='text'
                    className="form-control"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    readOnly={IsReadOnly}
                    required />
                </label>
                <label className="form-field">
                  Fleet Size :
                  <input
                    type='file'
                    className="form-control"
                    name="fleetSize"
                    // value={formData.fleetSize}
                    onChange={handleChange}
                    ref={fleetSizeRef}
                    disabled={IsReadOnly}
                    required />
                </label>
              </div>
            </div>
          )}
        </div>



        {isRetail &&
          <div>
            <div className='form-row'>
              <label className="form-field">
                Vehical Number:
                <input
                  type='text'
                  className="form-control"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

              <label className="form-field">
                Chassis Number:
                <input
                  type='text'
                  className="form-control"
                  name="chassisNo"
                  value={formData.chassisNo}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

              <label className="form-field">
                Engine Number:
                <input
                  type='text'
                  className="form-control"
                  name="engineNo"
                  value={formData.engineNo}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

            </div>

            <div className='form-row'>
              <label className="form-field">
                Make:
                <input
                  type='text'
                  className="form-control"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

              <label className="form-field">
                Model:
                <input
                  type='text'
                  className="form-control"
                  name="model"
                  value={formData.model}
                  readOnly={IsReadOnly}
                  onChange={handleChange}
                  required />
              </label>

              <label className="form-field">
                Year:
                <input
                  type='text'
                  className="form-control"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

            </div>

            <div className='form-row'>
              <label className="form-field">
                Type:
                <input
                  type='text'
                  className="form-control"
                  name="type"
                  value={formData.type}
                  readOnly={IsReadOnly}
                  onChange={handleChange}
                  required />
              </label>

              <label className="form-field">
                Application:
                <input
                  type='text'
                  className="form-control"
                  name="application"
                  value={formData.application}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

              <label className="form-field">
                GVW:
                <input
                  type='text'
                  name="GVW"
                  value={formData.GVW}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
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
                  readOnly={IsReadOnly}
                  required />
              </label>

              <label className="form-field">
                InsuranceName:
                <input
                  type='text'
                  name="InsuranceName"
                  value={formData.InsuranceName}
                  onChange={handleChange}
                  readOnly={IsReadOnly}
                  required />
              </label>

            </div>
          </div>
        }
        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

        <div style={{ textAlign: 'center' }}>
          {!IsReadOnly && (
            <div>
              <button type="submit"
                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
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
              style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
              onClick={editable}
            >
              EDIT
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerMasterEdit;
