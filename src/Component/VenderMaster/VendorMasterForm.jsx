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

// import 'bootstrap/dist/css/bootstrap.min.css';

const VendorMasterForm = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);
  console.log("userIIIIIID", userId);

  const [formData, setFormData] = useState({
    systemDate: today,
    vendorCode: 'SYSTEM GENERATED',
    vendorName: '',
    vendorType: '',
    address: '',
    vendorCity: '',
    pincode: '',
    vendorPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: '',
    cusLocation: '',
    panNo: "",
    panCard: "info",
    adharNo: '',
    adharCard: "info",
    rate: "",
    GSTNo: "",
    GST: "info"
  });

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 102400) {
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
    } else {
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
            Vendor Location:
            <input
              type="text"
              name="cusLocation"
              placeholder='Customer Location'
              value={formData.cusLocation}
              onChange={handleChange}
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
        </div>

        <div className='form-row'>


          <div className="dropdown green-dropdown form-field">
            <button
              className="btn btn-secondary dropdown-toggle"
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
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crain")}>Crain</a></li>
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "machanic")}>Machanic</a></li>
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
            </ul>
          </div>
          <label className="form-field">
            Address  :
            <textarea name="address" value={formData.address} onChange={handleChange} required className="form-control" placeholder='Address' />
          </label>
          <label className="form-field">
            Vendor City  :
            <input type='text' name="vendorCity" value={formData.vendorCity} className="form-control" onChange={handleChange} placeholder='Vendor City' required />
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
              pattern="\d{10}|(\d{3}[-\s]?\d{3}[-\s]?\d{4})"
              title="Phone number must be 10 digits"
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
              pattern="\d{10}|(\d{3}[-\s]?\d{3}[-\s]?\d{4})"
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
              pattern="\d{10}|(\d{3}[-\s]?\d{3}[-\s]?\d{4}) "
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

              required />
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
              required />
          </label>
          <label className="form-field">
            Adhar Number :
            <input
              type='text'
              name="adharNo"
              placeholder='Adhar Card Number'
              value={formData.adharNo}
              onChange={handleChange}
              className="form-control"

              required />
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

              required />
          </label>

          <label className="form-field">
            Rate/KM :
            <input
              type='text'
              name="rate"
              placeholder='Rate Per KM'
              value={formData.rate}
              onChange={handleChange}
              className="form-control"

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

              required />
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
              className="form-control"

              required />
          </label>
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
