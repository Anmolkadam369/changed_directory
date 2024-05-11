import React, { useState, useEffect, useRef } from 'react';
import './CustomerMaster.css'
import axios from 'axios';
import { Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerMaster = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);
  const today = new Date().toISOString().split('T')[0];
  const [isRetail, setIsRetail] = useState(false);
  const [isFleetOwner, setIsFleetOwner] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    systemDate: today,
    CustomerCode: 'SYSTEM GENERATED',
    CustomerName: '',
    CustomerType: '',
    address: '',
    CustomerCity: '',
    pincode: '',
    CustomerPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: '',
    cusLocation: '',
    panNo: "",
    panCard: "",
    adharNo: '',
    adharCard: "",
    rate: "",
    fleetSize: "",
    plan: '',
    vehicleNo: "", chassisNo: "", engineNo: "", make: "", model: "", year: "", type: "", application: "", GVW: "", ULW: "", InsuranceName: "", choosenPlan: ""
  });

  const handleSelect = (event, value) => {
    event.preventDefault();
    setFormData({
      ...formData,
      choosenPlan: value
    });
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const fleetSizeRef = useRef(null);

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'panCard' || key === 'adharCard' || key === 'GST') {
        if (value === null || value === undefined || (value && value.size === 0)) {
          return `Field '${key}' is required here.`;
        }
      }
    }
    console.log("type", formData['CustomerType'])


    for (const [key, value] of Object.entries(formData)) {

      if (formData['CustomerType'] === 'fleetOwner') {
        if (!formData['plan']) {
          return "Field 'plan' is required in fleetOwner.";
        }

      } else if (formData['CustomerType'] === 'retail') {
        const requiredFields = ['vehicleNo', 'chassisNo', 'engineNo', 'make', 'model', 'year', 'type', 'application', 'GVW', 'ULW', 'InsuranceName'];
        for (const field of requiredFields) {
          if (!formData[field]) {
            return `Field '${field}' is required in retail.`;
          }
        }
      }

      if (key !== 'panCard' && key !== 'adharCard' && key !== 'GST' && key != 'fleetSize' && key != 'vehicleNo' && key != 'chassisNo' && key != 'engineNo' && key != 'make' && key != 'model' && key != 'year' && key != 'type' && key != 'application' && key != 'GVW' && key != 'ULW' && key != 'InsuranceName' && key != 'plan') {
        if (value === '') return `Fields '${key}' is required.`;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    return ''; // If all checks pass, return an empty string
  };

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 102400) {
        console.log("SOM    ")
        setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
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
    } else {
      const { value } = e.target;
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
console.log("FORm", formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        url: `${backendUrl}/api/customerInfo/${userId}`,
        data: formDataObj,
        headers: {
          'Authorization': token
        }
      })
      console.log("response", response.data);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      console.error('Error response:', error.response);
      const errorMessage = error.response?.data || 'An error occurred';
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };
  return (
    <div>

      <form onSubmit={handleSubmit} className="Customer-master-form">

        <div class="header-container">
          <h3 class="bigtitle">Customer Master</h3>
          <span class="mandatory-note">All fields are mandatory</span>
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
            Customer Location:
            <input
              type="text"
              name="cusLocation"
              value={formData.cusLocation}
              onChange={handleChange}
              className="form-control"

            />
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
          <label className="form-field input-group mb-3">
            Customer Name:
            <input
              type="text"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>

        <div className='form-row'>

          
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
            <textarea name="address" value={formData.address} className="form-control" onChange={handleChange} required />
          </label>
          <label className="form-field">
            Customer City  :
            <input type='text' name="CustomerCity" value={formData.CustomerCity}  className="form-control" onChange={handleChange} required />
          </label>
          <label className="form-field">
            Pincode:
            <input
              type='tel'
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
              required
              pattern="\d{6}"
              title="Pincode must be 6 digits"
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
            Contact Person Number :
            <input
              type='text'
              name="contactPersonNum"
              value={formData.contactPersonNum}
              onChange={handleChange}
              className="form-control"
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            Contact Person Number 2 :
            <input
              type='text'
              name="contactPersonNum2"
              value={formData.contactPersonNum2}
              onChange={handleChange}
              className="form-control"
              required />
          </label>
          <label className="form-field">
            PAN Number:
            <input
              type='text'
              name="panNo"
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
              // value={formData.panCard}
              onChange={handleChange}
              className="form-control"
              ref={panRef}
              accept=".pdf,image/*"
              required />
          </label>
          <label className="form-field">
            Adhar Number :
            <input
              type='text'
              name="adharNo"
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
              ref={adharCardRef}
              className="form-control"
              accept=".pdf,image/*"
              required />
          </label>
          <label className="form-field">
            Rate/KM :
            <input
              type='text'
              name="rate"
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
              ref={GSTRef}
              onChange={handleChange}
              accept=".pdf,image/*"
              className="form-control"
              required />
          </label>
        </div>

        <div className='form-row'>

        <div className="dropdown green-dropdown form-field">
      <button
        className="btn btn-secondary dropdown-toggle"
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
    <label className="form-field"></label>
    <label className="form-field"></label>
    <label className="form-field"></label>


        </div>

        <div>

          {isFleetOwner && (
            <div className="selected-container">
              <div class="header-container">
                <h3 class="bigtitle">Fleet Owner</h3>
                <span class="mandatory-note">All fields are mandatory</span>
              </div>
              <div className='form-row'>
                <label className="form-field">
                  Plan:
                  <input
                    type='text'
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    required />
                </label>
                <label className="form-field">
                  Fleet Size:
                  <input
                    type='file'
                    name="fleetSize"
                    ref={fleetSizeRef}
                    onChange={handleChange}
                    required />
                </label>
              </div>
            </div>
          )}

        </div>

        {isRetail &&(
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

            </div>
          </div>
          </div>
        )}

        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}


        <div style={{ textAlign: 'center' }}>
          <button type="submit" 
          style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerMaster;
