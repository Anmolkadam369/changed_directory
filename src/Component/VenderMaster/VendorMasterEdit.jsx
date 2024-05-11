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

const VendorMasterEdit = () => {
  const location = useLocation();
  const { id } = location.state || {};
  console.log("Received ID:", id);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [comingData, setComingData] = useState([]);
  const [IsReadOnly, setIsReadOnly] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    getDataById(id);
  }, [token, userId, navigate, id]); // Removed comingData from dependencies

  useEffect(() => {
    if (comingData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        vendorCode: comingData.vendorCode || "",
        vendorName: comingData.vendorName || "",
        vendorType: comingData.vendorType || "",
        address: comingData.address || "",
        vendorCity: comingData.vendorCity || "",
        pincode: comingData.pincode || "",
        vendorPhone: comingData.vendorPhone || "",
        email: comingData.email || "",
        contactPerson: comingData.contactPerson || "",
        contactPersonNum: comingData.contactPersonNum || "",
        contactPersonNum2: comingData.contactPersonNum2 || "",
        cusLocation: comingData.cusLocation || "",
        panNo: comingData.panNo || "",
        panCard: comingData.panCard || "",
        adharNo: comingData.adharNo || "",
        adharCard: comingData.adharCard || "",
        agreement: comingData.agreement || "",
        GST: comingData.GST || "",
        rate: comingData.rate || "",
        GSTNo: comingData.GSTNo || ""

      }));
    }
  }, [comingData]);


  const [formData, setFormData] = useState({
    systemDate: today,
    vendorCode: 'SYSTEM GENERATED',
    vendorName: '',
    vendorType: "",
    address: '',
    vendorCity: "",
    pincode: '',
    vendorPhone: '',
    email: '',
    contactPerson: '',
    contactPersonNum: "",
    contactPersonNum2: '',
    cusLocation: '',
    panNo: "",
    panCard: null,
    adharNo: "",
    adharCard: null,
    agreement: null,
    rate: "",
    GSTNo: "",
    GST: null,
  });
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
    const { name, type, files } = e.target;
    if (type === 'file') {
      if (files[0] && files[0].size > 102400) {
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
    const validationMessage = validateForm();
    if (validationMessage) {
      setSnackbarMessage(validationMessage);
      setOpenSnackbar(true);
      return;
    }
    console.log('Form data submitted:', formData);
    const formDataObj = new FormData();
    for (const key in formData) {
      if (formData[key]) {  // Check if the data is not undefined or null
        if (formData[key] instanceof File) {
          formDataObj.append(key, formData[key], formData[key].name);
        } else {
          formDataObj.append(key, formData[key]);
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
      setTimeout(() => {
        navigate("../Admin");
      }, 2000);
    } catch (error) {
      console.error("Error during form submission:", error);
      setSnackbarMessage("Failed to submit the form.");
      setOpenSnackbar(true);
    }
  };

  const editable = () => {
    setIsReadOnly(!IsReadOnly)
  }
  const handleBack = () => {
    navigate("../Admin")
}
  return (
    <div>

      <form onSubmit={handleSubmit} className="Customer-master-form" style={{marginBottom:"50px"}}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}/>
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


        <div className="form-row">
          <label className="form-field input-group mb-3">
            System Date:
            <input
              type="date"
              name="systemDate"
              value={formData.systemDate}
              onChange={handleChange}
              readOnly={IsReadOnly}
              className="form-control"
            />
          </label>
          <label className="form-field input-group mb-3">
            Customer Location:
            <input
              type="text"
              name="cusLocation"
              value={formData.cusLocation}
              onChange={handleChange}
              readOnly={IsReadOnly}
              className="form-control"

            />
          </label>
          <label className="form-field">
            Vendor Code: {/* This might not be editable if it's system generated */}
            <input
              type="text"
              name="vendorCode"
              value={formData.vendorCode}
              className="form-control"
            />
          </label>
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
        </div>

        <div className='form-row'>
          <label className="form-field">
            Vendor Type:
            <select name="vendorType" value={formData.vendorType} onChange={handleChange} className="form-control"  required>
              <option value="">Select</option>
              <option value="advocate">Advocate</option>
              <option value="crain">Crain</option>
              <option value="crain">Machnic</option>
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
            Vendor City  :
            <input
              type='text'
              name="vendorCity"
              value={formData.vendorCity}
              onChange={handleChange}
              required
              className="form-control"
              readOnly={IsReadOnly} />
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
            Vendor Phone No:
            <input
              type='tel'
              name="vendorPhone"
              value={formData.vendorPhone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Phone number must be 10 digits"
              readOnly={IsReadOnly}
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
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address."
              readOnly={IsReadOnly}
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
              required
              readOnly={IsReadOnly}
              className="form-control"
            />
          </label>
          <label className="form-field">
            Contact Person Number :
            <input
              type='text'
              name="contactPersonNum"
              value={formData.contactPersonNum}
              onChange={handleChange}
              readOnly={IsReadOnly}
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
              readOnly={IsReadOnly}
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
              readOnly={IsReadOnly}
              className="form-control"
              required />
          </label>

          <label className="form-field">
            PAN Card:
            {IsReadOnly ? (
              formData.panCard ? (
                <img src={formData.panCard} alt="PAN Card" />
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
            Adhar Number :
            <input
              type='text'
              name="adharNo"
              value={formData.adharNo}
              onChange={handleChange}
              readOnly={IsReadOnly}
              className="form-control"
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            Adhar Card:
            {IsReadOnly ? (
              formData.adharCard ? (
                <img src={formData.adharCard} alt="Adhar Card"/>
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
            Agreement :
            {IsReadOnly ? (
              formData.agreement ? (
                <img src={formData.agreement} alt="Agreement" style={{ maxWidth: '100px', display: 'block' }} />
              ) : (
                <p>No Adhar Card uploaded</p>
              )
            ) : (
              <input
                type="file"
                name="agreement"
                onChange={handleChange}
                accept=".pdf,image/*"
                ref={agreementRef}
              className="form-control"
                required
              />
            )}
          </label>
          <label className="form-field">
            Rate/KM :
            <input
              type='text'
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              readOnly={IsReadOnly}
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
              readOnly={IsReadOnly}
              className="form-control"
              required />
          </label>
        </div>

        <div className='form-row'>
          <label className="form-field">
            GSTIN :
            {IsReadOnly ? (
              formData.GST ? (
                <img src={formData.GST} alt="GSTIN" style={{ maxWidth: '100px', display: 'block' }} />
              ) : (
                <p>No Adhar Card uploaded</p>
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
          <label className="form-field"></label>
          <label className="form-field"></label>
          <label className="form-field"></label>

        </div>

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

export default VendorMasterEdit;
