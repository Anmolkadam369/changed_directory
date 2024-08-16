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
import backendUrl from '../../environment';
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



const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const VendorMasterEdit = ({ id, onUpdate }) => {
  const location = useLocation();
  // const { id } = location.state || {};
  console.log("Received ID:", id);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  const [comingData, setComingData] = useState([]);
  const [IsReadOnly, setIsReadOnly] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
  }, [token, userId, navigate, id]); // Removed comingData from dependencies

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
      setLocation("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation(`Latitude: ${lat}, Longitude: ${lon}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      latitude: lat,
      longitude: lon
    }))
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
        latitude: comingData.latitude || ""
      }));
    }
  }, [comingData]);

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
    longitude: ""
  });

  console.log("setformda ta", formData)

  useEffect(() => {
    if (formData.address|| formData.district|| formData.pincode|| formData.state) {
      const getLonLat = async () => {
        try {
          const fullAddress = `${formData.address}, ${formData.district},${formData.pincode}, ${formData.state}`;
          console.log("FULLADDRSS", fullAddress)
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
          const response = await axios.get(url);
          const location = response.data[0];
          console.log("lokaced", response)
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


  const getDataById = async (id) => {
    const response = await axios.get(`${backendUrl}/api/getVendor/${id}`);
    console.log("daa", response.data.data)
    console.log("response", response.data.data[0]);
    setComingData(response.data.data[0])
  }

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const agreementRef = useRef(null);

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
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    else if (name === "vendorPhone" || name === "contactPersonNum" || name === "contactPersonNum2") {
      const validValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: validValue,
      });
    }
    else if (name === "pincode" || name === "rate") {
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
    else {
      const { value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
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
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
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
    if (!aadhaarRegex.test(formData.adharNo)) {
      return 'Please enter a valid Aadhaar Number.';
    }

    // const gstRegex = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/;
    // if (formData.GSTNo !== "" && !gstRegex.test(formData.GSTNo)) {
    //   return 'Please enter a valid GST number (e.g., 22ABCDE1234F1Z5).';
    // }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNo)) {
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
          if (key === 'rate' && formData[key] === "") {
            formDataObj.append(key, "0");
          } else {
            formDataObj.append(key, formData[key]);
          }
        }
      }
    }

    // Debugging FormData contents
    for (let pair of formDataObj.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios({
        method: 'PUT',
        url: `${backendUrl}/api/venderUpdate/${id}/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': token
        }
      });
      console.log("response", response.data);
      setSnackbarMessage("Form submitted successfully!");
      setOpenSnackbar(true);
      setIsLoading(false);
      setTimeout(() => {
        onUpdate();
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
        setSnackbarMessage("Failed to submit the form.", error)
      }
      setOpenSnackbar(true);
    }
  };

  const editable = () => {
    setIsReadOnly(!IsReadOnly)
  }
  const handleBack = () => {
    onUpdate();
  }


  return (
    <div>
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
            Accident - City : {formData.district}
            <select
              name="district"
              readOnly={IsReadOnly}
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
            Vendor Code: {/* This might not be editable if it's system generated */}
            <input
              type="text"
              name="vendorCode"
              value={formData.vendorCode}
              className="form-control"
              readOnly
            />
          </label>

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
              formData.panCard !== "Pan Value" ? (
                <>
                  <img
                    src={formData.panCard}
                    alt="PAN Card"
                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border:'solid black 2px', padding: "3px", marginTop:"6px"  }}
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
                    <img src={formData.panCard} alt="PAN Card" className="modal-image"/>
                    </div>
                  </Modal>
                </>
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
            Adhar Card:
            {IsReadOnly ? (
              formData.adharCard !== "Adhar Value" ? (
                <>
                  <img
                    src={formData.adharCard}
                    alt="Adhar Card"
                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer',border:'solid black 2px', padding: "3px", marginTop:"6px"  }}
                    onClick={openAdharModal}
                  />
                  <Modal isOpen={isAdharModalOpen} onRequestClose={closeAdharModal} contentLabel="Adhar Card Modal">
                    <div className='modal-header'>
                      <IconButton href={formData.adharCard} download color="primary">
                        <DownloadIcon />
                      </IconButton>
                      <IconButton onClick={closeAdharModal} color="secondary">
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="modal-image-container">
                    <img src={formData.adharCard} alt="Adhar Card" className="modal-image"  />
                    </div>
                  </Modal>
                </>
              ) : (
                <p className='notUploaded'>No Adhar Card uploaded</p>
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
          {IsReadOnly ? (
              <div>
                {formData.agreement ? (
                  <>
                    Download Agreement
                    <p >
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
                        onClick={(e) => handlePreviewClick(e, formData.agreement)}
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
              formData.GST !== "default-GST-value" ? (
                <>
                  <img
                    src={formData.GST}
                    alt="GSTIN"
                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer',   border:'solid black 2px', padding: "3px", marginTop:"6px"  }}
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
                  readOnly={IsReadOnly}
                  title="Aadhaar number must be exactly 12 digits."
                  required />
              </label>
              <label className="form-field"></label>
              <label className="form-field"></label>
              <label className="form-field"></label>
            </div>
          )}
        {formData.vendorType != "crane" && (
          <label className="form-field"></label>
        )}
        <label className="form-field"></label>



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

export default VendorMasterEdit;
