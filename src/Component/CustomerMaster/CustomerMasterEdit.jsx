import React, { useState, useEffect, useRef } from 'react';
import './CustomerMaster.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';

const CustomerMasterEdit = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const location = useLocation();
  const { id } = location.state || {};
  console.log("Received IDssssssssssssssssssssss:", id);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [comingData, setComingData] = useState([]);

  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    getDataById(id);
  }, [token, userId, navigate, id]);

  useEffect(() => {
    if (comingData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        // systemDate:comingData.systemDate || "",
        CustomerCode: comingData.CustomerCode || "",
        CustomerName: comingData.CustomerName || "",
        CustomerType: comingData.CustomerType || "",
        address: comingData.address || "",
        CustomerCity: comingData.CustomerCity || "",
        pincode: comingData.pincode || "",
        CustomerPhone: comingData.CustomerPhone || "",
        email: comingData.email || "",
        contactPerson: comingData.contactPerson || "",
        contactPersonNum: comingData.contactPersonNum || "",
        contactPersonNum2: comingData.contactPersonNum2 || "",
        cusLocation: comingData.cusLocation || "",
        panNo: comingData.panNo || "",
        // panCard : comingData.panCard || "",
        adharNo: comingData.adharNo || "",
        // adharCard : comingData.adharCard || "",
        // agreement : comingData.agreement || "",
        rate: comingData.rate || "",
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
        GSTNo:comingData.GSTNo || ""
        // GST:"",
        // fleetSize:""
      }));
    }
  }, [comingData]); // Separate useEffect for handling comingData updates


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
    agreement: "",
    rate: "",
    fleetSize: "",
    plan: '',
    GST:"",
    GSTNo:"",
    vehicleNo: "", chassisNo: "", engineNo: "", make: "", model: "",
    year: "", type: "", application: "", GVW: "", ULW: "",
    InsuranceName: ""
  });

  const GSTRef = useRef(null);
  const panRef = useRef(null);
  const adharCardRef = useRef(null);
  const agreementRef = useRef(null);
  const fleetSizeRef = useRef(null);



  const getDataById = async (id) => {
    const response = await axios.get(`http://localhost:3001/api/getCustomer/${id}`);
    console.log("daa", response.data.data)
    console.log("response", response.data.data[0]);
    setComingData(response.data.data[0])
  }

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
        if (key === 'panCard' || key === 'adharCard' || key === 'agreement' || key === 'GST') {
            if (value === null || value === undefined || (value && value.size === 0)) {
                return `Field '${key}' is required here.`;
            }
        }
    }
    console.log("type",formData['CustomerType'])


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

      if (key !== 'panCard' && key !== 'adharCard' && key !== 'agreement' && key !== 'GST' && key != 'fleetSize' && key != 'vehicleNo' && key != 'chassisNo'&& key !=  'engineNo'&& key !=  'make'&& key !=  'model'&& key !=  'year'&& key !=  'type'&& key !=  'application'&& key !=  'GVW'&& key !=  'ULW'&& key !=  'InsuranceName' && key != 'plan') {
        if (value === '')   return `Fields '${key}' is required.`;
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
    } else {
      const { value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      if(name === "CustomerType") {
        if(value === "retail") {
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
        method: 'PUT',
        url: `http://localhost:3001/api/customerUpdate/${id}/${userId}`,
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
    } 
    catch (error) {
      console.error("Error during form submission:", error);
      const errorMessage = error.response?.data || 'An error occurred';
      setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <div style={{ display: 'flex' }}>

      <form onSubmit={handleSubmit} className="Customer-master-form">
          <h3 className='titles'>Customer Master Edit</h3>

        <div className='form-row'>
          <label className="form-field" style={{ width: '20px' }}>
            System Date:
            <input
              type="date"
              name="systemDate"
              value={formData.systemDate}
              onChange={handleChange}
              readOnly={IsReadOnly}
              style={{ width: '250px' }}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            Customer Location:
            <input
              type="text"
              name="cusLocation"
              value={formData.cusLocation}
              onChange={handleChange}
              readOnly={IsReadOnly}
            />
          </label>
          <label className="form-field">
            Customer Code: {/* This might not be editable if it's system generated */}
            <input
              type="text"
              name="CustomerCode"
              value={formData.CustomerCode}
              readOnly
            />
          </label>
          <label className="form-field">
            Customer Name:
            <input
              type="text"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              required
              readOnly={IsReadOnly}
            />
          </label>
        </div>

        <div className='form-row'>
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
            <textarea name="address" value={formData.address} onChange={handleChange} required readOnly={IsReadOnly} />
          </label>
          <label className="form-field">
            Customer City  :
            <input type='text' name="CustomerCity" value={formData.CustomerCity} onChange={handleChange} required readOnly={IsReadOnly} />
          </label>
        </div>

        <div className='form-row'>
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
            />
          </label>
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
        </div>

        <div className='form-row'>
          <label className="form-field">
            Contact Person:
            <input
              type='text'
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              readOnly={IsReadOnly}
              required />
          </label>

          <label className="form-field">
            Contact Person Number :
            <input
              type='text'
              name="contactPersonNum"
              value={formData.contactPersonNum}
              onChange={handleChange}
              readOnly={IsReadOnly}
              required />
          </label>
          <label className="form-field">
            Contact Person Number 2 :
            <input
              type='text'
              name="contactPersonNum2"
              value={formData.contactPersonNum2}
              onChange={handleChange}
              readOnly={IsReadOnly}
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            PAN Number:
            <input
              type='text'
              name="panNo"
              value={formData.panNo}
              readOnly={IsReadOnly}
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
              ref={panRef}
              disabled={IsReadOnly}
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
              readOnly={IsReadOnly}
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
              disabled={IsReadOnly}
              ref={adharCardRef}
              accept=".pdf,image/*"
              required />
          </label>

          <label className="form-field">
            Agreement :
            <input
              type='file'
              name="agreement"
              // value={formData.agreement}
              onChange={handleChange}
              disabled={IsReadOnly}
              ref={agreementRef}
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
              readOnly={IsReadOnly}
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            GST Number:
            <input
              type='text'
              name="GSTNo"
              value={formData.GSTNo}
              onChange={handleChange}
              readOnly={IsReadOnly}
              required />
          </label>

          <label className="form-field">
            GSTIN :
            <input
              type='file'
              name="GST"
              // value={formData.GST}
              onChange={handleChange}
              ref={GSTRef}
              accept=".pdf,image/*"
              disabled={IsReadOnly}
              required />
          </label>
          {isFleetOwner && <div>
            <label className="form-field">
              Plan:
              <input
                type='text'
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
                name="fleetSize"
                // value={formData.fleetSize}
                onChange={handleChange}
                ref={fleetSizeRef}
                disabled={IsReadOnly}
                required />
            </label>
          </div>}
        </div>


        {isRetail &&
          <div>
            <div className='form-row'>
              <label className="form-field">
                Vehical Number:
                <input
                  type='text'
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
            <button
              type="submit"
              style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
              onClick={handleSubmit}
            >
              Submit
            </button>
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
