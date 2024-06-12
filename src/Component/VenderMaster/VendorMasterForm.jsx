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



const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};
// import 'bootstrap/dist/css/bootstrap.min.css';

const VendorMasterForm = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);


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
    panCard: "info",
    adharNo: '',
    adharCard: "info",
    rate: "" || "0",
    GSTNo: "",
    GST: "info"
  });

  console.log("formdata", formData)

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);

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
    }  else {
      const { value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'panCard' || key === 'adharCard' || key === 'GST') {
        if (value === null || value === undefined || value.size === 0)
          return `Field '${key}' is required.`;
      }
      if (value === '') {
        return `Field '${key}' is required.`;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    return '';
  };

  console.log("firm", formData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      setAlertInfo({ show: true, message: `${e.target.key} should be in correct format`, severity: 'error' });
      setIsLoading(false);
      return;
    }
    const validationMessage = validateForm();
    if (validationMessage) {
      setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
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

    for (let pair of formDataObj.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${backendUrl}/api/venderInfo/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': token
        }
      });
      console.log("response", response.data);
      setIsLoading(false);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
      setTimeout(() => {
        navigate("../Admin");
      }, 2000);
    } catch (error) {
      console.error("Error during form submission:", error);
      const errorMessage = error.response?.data || 'An error occurred';
      setIsLoading(false);
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };
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

  return (
    <div>
      <Helmet>
        <title>Vendor Details - Claimpro</title>
        <meta name="description" content="Vendor for BVC ClaimPro Assist and for vehicle accidents. Keep track of Vendors." />
        <meta name="keywords" content="Vehicle Accidents, vendor, vendor Information, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/VendorMaster`}/>
      </Helmet>
      <form onSubmit={handleSubmit} className="Customer-master-form">
        <div class="header-container">
          <h3 class="bigtitle">Vendor Master</h3>
          <span class="mandatory-note">All fields are mandatory</span>
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
            Accident Place - State:
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
            Accident Place - City:
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
        </div>

        <div className='form-row'>

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
            <button
              className="form-field input-group mb-3"
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
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crain")}>Crane</a></li>
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "machanic")}>Mechanic</a></li>
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
              required
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
              required
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
              required
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
              accept=".pdf,image/*"
              className="form-control"
              ref={panRef}
              capture="environment"
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
              accept=".pdf,image/*"
              ref={adharCardRef}
              className="form-control"
              capture="environment"
              required />
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
              onChange={handleChange}
              accept=".pdf,image/*"
              ref={GSTRef}
              capture="environment"
              className="form-control"
              required />
          </label>

          {formData.vendorType == "crain" && 
         ( <label className="form-field">
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
        )}
        {formData.vendorType != "crain" && (
          <label className="form-field"></label>
        )}
        </div>

        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

        <div style={{ textAlign: 'center' }}>
          <button type="submit"
            style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
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
    </div>
  );
};

export default VendorMasterForm;
