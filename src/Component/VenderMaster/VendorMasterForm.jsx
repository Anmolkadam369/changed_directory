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

const VendorMasterForm = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const navigate = useNavigate();
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
    agreement: "info",
    rate: "",
    GSTNo: "",
    GST: "info"
  });

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const agreementRef = useRef(null);

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 102400) {
        setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
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
      if (key === 'panCard' || key === 'adharCard' || key === 'agreement' || key === 'GST') {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      setAlertInfo({ show: true, message: `${e.target.key} should be in correct format`, severity: 'error' });
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
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
      setTimeout(() => {
        navigate("../Admin");
      }, 2000);
    } catch (error) {
      console.error("Error during form submission:", error);
      const errorMessage = error.response?.data || 'An error occurred';
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit} className="Customer-master-form">
        <div class="header-container">
          <h3 class="bigtitle">Vendor Master</h3>
          <span class="mandatory-note">All fields are mandatory</span>
        </div>

        <div className="form-row">
          <label className="form-field">
            System Date:
            <input
              type="date"
              name="systemDate"
              value={formData.systemDate}
              onChange={handleChange}
              readOnly
            />
          </label>

          <label className="form-field">
            Vendor Location:
            <input
              type="text"
              name="cusLocation"
              placeholder='Customer Location'
              value={formData.cusLocation}
              onChange={handleChange}
            />
          </label>
          <label className="form-field">
            Vendor Code:
            <input
              type="text"
              name="vendorCode"
              placeholder='SYSTEM GENERATED'
              value={formData.vendorCode}
              readOnly
            />
          </label>
          <label className="form-field">
            Vendor Name:
            <input
              type="text"
              name="vendorName"
              placeholder='Vendor Name'
              value={formData.vendorName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            Vendor Type:
            <select name="vendorType" value={formData.vendorType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="advocate">Advocate</option>
              <option value="crain">Crain</option>
              <option value="machanic">Machnic</option>
              <option value="workshop">Workshop</option>
            </select>
          </label>
          <label className="form-field">
            Address  :
            <textarea name="address" value={formData.address} onChange={handleChange} required placeholder='Address' />
          </label>
          <label className="form-field">
            Vendor City  :
            <input type='text' name="vendorCity" value={formData.vendorCity} onChange={handleChange} placeholder='Vendor City' required />
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
              required />
          </label>
          <label className="form-field">
            PAN Card :
            <input
              type='file'
              name="panCard"
              // value={formData.panCard}
              onChange={handleChange}
              accept=".pdf,image/*"
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
              required />
          </label>
          <label className="form-field">
            Agreement :
            <input
              type='file'
              name="agreement"
              // value={formData.agreement}
              onChange={handleChange}
              accept=".pdf,image/*"
              ref={agreementRef}
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
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            GSTIN :
            <input
              type='file'
              name="GST"
              // value={formData.GST}
              onChange={handleChange}
              accept=".pdf,image/*"
              ref={GSTRef}
              style={{ width: '250px' }}
              required />
          </label>
        </div>

        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#0e4823ff', color: 'white' }}>
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default VendorMasterForm;
