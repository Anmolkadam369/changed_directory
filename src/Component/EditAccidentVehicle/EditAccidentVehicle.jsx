import React, { useEffect, useState } from 'react';
import './EditAccidentVehicle.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditAccidentVehicle() {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    console.log("vendor", vendorData)
    console.log("vendorData type:", typeof vendorData, vendorData);



    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        getDataById(id);
        getVendorInfo();
    }, [token, userId, navigate, id]);

    useEffect(() => {
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                chassisNo: comingData.chassisNo || '',
                engineNo: comingData.engineNo || '',
                entry_date: comingData.entry_date || '',
                make: comingData.make || '',
                model: comingData.model || '',
                latitude: comingData.latitude || '',
                longitude: comingData.longitude || '',
                CustomerCity: comingData.CustomerCity || '',
                accidentFileNo: comingData.accidentFileNo || "",
                ChassisNoView: null,
                ClusterView: null,
                MajorDamages1: null,
                MajorDamages2: null,
                MajorDamages3: null,
                MajorDamages4: null,
                MajorDamages5: null,
                frontLH: null,
                frontRH: null,
                rearLH: null,
                rearRH: null,
                frontView: null,
                rearView: null,
                CustomerName: comingData.CustomerName || "",
                choosenPlan: comingData.choosenPlan || '',
                advocate: comingData.advocate || "",
                workshop: comingData.workshop || "", 
                machanic: comingData.machanic || "", 
                crain: comingData.crain || "", 
                randomId: comingData.randomId || ""
            }));
            console.log("RANDOMID", comingData.randomId)
        }

    }, [comingData])



    const getDataById = async (id) => {
        console.log("getdatabyid",id)
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo/${id}`);
        console.log("getDataByID", response)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }
    const getVendorInfo = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getVendor`);
        console.log("vendorInfo", response)
        console.log("response", response.data);
        setVendorData(response.data)
    }

    const [formData, setFormData] = useState({
        accidentFileNo: "",
        chassisNo: '',
        engineNo: '',
        entry_date: '',
        make: '',
        model: '',
        latitude: '',
        longitude: '',
        CustomerCity: '',
        ChassisNoView: null,
        ClusterView: null,
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null,
        frontLH: null,
        frontRH: null,
        rearLH: null,
        rearRH: null,
        frontView: null,
        rearView: null,
        CustomerName: "",
        choosenPlan: "",
        advocate: "", workshop: '', machanic: "", crain: ""

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const validateForm = () => {
        if(formData.choosenPlan === "advanced"){
        const requiredFields = ['advocate', 'workshop', 'machanic', 'crain'];
        for (const key of requiredFields) {
          if (formData[key] === '') {
            return `Field '${key}' is required.`;
          }
        }
        return '';
    }
    if(formData.choosenPlan === "plus"){
        const requiredFields = [ 'workshop', 'machanic', 'crain'];
        for (const key of requiredFields) {
          if (formData[key] === '') {
            return `Field '${key}' is required.`;
          }
        }
        return '';
    }
    if(formData.choosenPlan === "pro"){
        const requiredFields = ['workshop'];
        for (const key of requiredFields) {
          if (formData[key] === '') {
            return `Field '${key}' is required.`;
          }
        }
        return '';
    }
      };
      console.log('Form data submitted:', formData);
      console.log('Form data submitted:', userId);
      

    const onSubmit = async (event) => {
        event.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
          setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
          return;
        }
        console.log('Form data submitted:', formData);
        console.log('Form data submitted:', userId);

        setAlertInfo({ ...alertInfo, show: false });
        console.log('myformdataformData', formData);
        try {
            const response = await axios.put(`${backendUrl}/editVehicleInfo/${formData.accidentFileNo}/${userId}`, JSON.stringify(formData),{
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                  }
            });
            console.log("response", response);
            if (response.data.status == true) {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            } else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
          }
    };

    
    console.log("advocate", formData.advocate)
    console.log("workshop", formData.workshop)
    console.log("machanic", formData.machanic)
    console.log("crain", formData.crain)

    const handleBack = () => {
        navigate("../Admin")
    }

    return (
        <div style={{marginTop:"40px"}}>    
        <div className='container'>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}/>
                <h1 className='bigtitle'>Assign Vendors To Customer</h1>

            <div className='form-row'>

                <label className="form-field">
                    Users Name:
                    <input
                        type="text"
                        name="CustomerName"
                        className='inputField'
                        value={formData.CustomerName}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>

                <label className="form-field">
                    Choosen Plan:
                    <input
                        className='inputField'
                        type="text"
                        name="choosenPlan"
                        value={formData.choosenPlan}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>

            </div>

            <div className='form-row'>
                <label className="form-field">
                    Chasis No:
                    <input
                        type="text"
                        className='inputField'
                        name="chassisNo"
                        value={formData.chassisNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    Engine No:
                    <input
                        type="text"
                        className='inputField'
                        name="engineNo"
                        value={formData.engineNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    Make:
                    <input
                        type="text"
                        name="make"
                        className='inputField'
                        value={formData.make}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    latitude:
                    <input
                        type="text"
                        name="latitude"
                        className='inputField'
                        value={formData.latitude}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
            </div>


            <div className='form-row'>
                <label className="form-field">
                    Longitude:
                    <input
                        type="text"
                        name="longitude"
                        className='inputField'
                        value={formData.longitude}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    City:
                    <input
                        type="text"
                        className='inputField'
                        name="CustomerCity"
                        value={formData.CustomerCity}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    accidentFileNo:
                    <input
                        type="text"
                        className='inputField'
                        name="accidentFileNo"
                        value={formData.accidentFileNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    model:
                    <input
                        type="text"
                        name="model"
                        className='inputField'
                        value={formData.model}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
            </div>


            <>
                {formData.choosenPlan === "advanced" && vendorData.length !== 0 && (
                    <div className='form-row'>
                        <label className="form-field">
                            Give Advocate:
                            <select
                                type='text'
                                className='inputField'
                                name="advocate"
                                value={formData.advocate}
                                onChange={handleChange}
                                disabled={formData.advocate !== null && formData.advocate !== ""}
                            >
                                <option value="">Select a Advocate</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "advocate").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-field">
                            Crain:
                            <select
                                className='inputField'
                                name="crain"
                                value={formData.crain}
                                onChange={handleChange}
                                disabled={formData.crain !== null && formData.crain !== ""}
                            >
                                <option value="">Select a Crain</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "crain").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-field">
                            Machanic:
                            <select
                                className='inputField'
                                name="machanic"
                                value={formData.machanic}
                                onChange={handleChange}
                                disabled={formData.machanic !== null && formData.machanic !== ""}
                            >
                                <option value="">Select a Machanic</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "machanic").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-field">
                            WorkShop:
                            <select
                                className='inputField'
                                name="workshop"
                                value={formData.workshop}
                                onChange={handleChange}
                                disabled={formData.workshop !== null && formData.workshop !== ""}
                            >
                                <option value="">Select a Workshop</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}

                {formData.choosenPlan === "plus" && vendorData.length !== 0 && (
                    <div className='form-row'>
                        <label className="form-field">
                            Crain:
                            <select
                                className='inputField'
                                name="crain"
                                value={formData.crain}
                                onChange={handleChange}
                                disabled={formData.crain !== null && formData.crain !== ""}
                            >
                                <option value="">Select a Crain</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "crain").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-field">
                            Machanic:
                            <select
                                className='inputField'
                                name="machanic"
                                value={formData.machanic}
                                onChange={handleChange}
                                disabled={formData.machanic !== null && formData.machanic !== ""}
                            >
                                <option value="">Select a Workshop</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "machanic").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-field">
                            WorkShop:
                            <select
                                className='inputField'
                                name="workshop"
                                value={formData.workshop}
                                onChange={handleChange}
                                disabled={formData.workshop !== null && formData.workshop !== ""}
                            >
                                <option value="">Select a Workshop</option>
                                {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                    <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}


                {formData.choosenPlan === "pro" && vendorData.length !== 0 && (
                    <div className='form-row'>
                        <label className="form-field">
                            WorkShop:
                            <select
                                className='inputField'
                                name="workshop"
                                value={formData.workshop}
                                onChange={handleChange}
                                disabled={formData.workshop !== null && formData.workshop !== ""}
                            >
                                <option value="">Select a Workshop</option>
                                {vendorData?.data?.length > 0 ? (
                                    vendorData.data.filter(vendor => vendor.vendorType === "workshop").map(vendor => (
                                        <option key={vendor.vendorCode} value={vendor.vendorCode}>
                                            {`${vendor.vendorName} - ${vendor.vendorCode}`}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Loading workshops...</option>
                                )}
                            </select>
                        </label>
                    </div>
                )}

            </>
            {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

            <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }} onClick={onSubmit}>
            Submit
          </button>
        </div>
        </div>
        </div>
    );
}

export default EditAccidentVehicle;
