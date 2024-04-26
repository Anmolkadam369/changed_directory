import React, { useEffect, useState } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';

function AddedDataByCrain() {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);


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
                chassisNo: comingData.chassisNo || '',
                engineNo: comingData.engineNo || '',
                entry_date: comingData.entry_date || '',
                make: comingData.make || '',
                model: comingData.model || '',
                latitude: comingData.latitude || '',
                longitude: comingData.longitude || '',
                vehicleNo: comingData.vehicleNo || '',
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
                advocate: "", workshop: '', machanic: "", crain: "",
                randomId: comingData.randomId || "",
                vehicleInspection: "",
                workEstimate: "",
                recoveryVanEstimate: "",
                vehicleHandover: "",
                advancedPayment: "",
                vehicleTakeOver: "",
                balancePayment: "",
                feedback: ""
            }));
        }

    }, [comingData])

    const getDataById = async (id) => {
        const response = await axios.get(`http://localhost:3001/api/getAccidentVehicleInfo/${id}`);
        console.log("getAccidentVehicleInfo", response)
        console.log("getAccidentVehicleInfo", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const [formData, setFormData] = useState({
        vehicleInspection: "", 
        workEstimate: "",
        recoveryVanEstimate: "", 
        vehicleHandover: "", 
        advancedPayment: "", 
        vehicleTakeOver: "",
        balancePayment:"",
        feedback:""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    console.log('the id which want to send', formData, id, userId);

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('formData', formData, id, userId);
        try {
            const response = await axios.post(`http://localhost:3001/api/vendorOnAssignedVehicle/${id}/${userId}`, JSON.stringify(formData),{
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                  }
                })
            console.log("response", response.data.status);
            if (response.data.message === "data inserted successfully") {
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


    return (
        <div className='container'>
            <div style={{
                textAlign: 'center',
                backgroundColor: '#4CAF50', // Choose your color
                color: 'white', // Choose text color
                padding: '20px 0', // Vertical padding and no horizontal padding
                marginBottom: '30px', // Space below the header
            }}>
                <h1>USER'S PERSONAL DATA (UPDATING)</h1>
                <hr style={{
                    border: '0',
                    height: '2px', // Thickness of the hr
                    backgroundColor: '#fff', // Same as the text color for consistency
                    maxWidth: '50%', // Width of the hr
                    margin: '0 auto', // Center the hr
                }} />
            </div>

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
                        type="text"
                        className='inputField'
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
                        name="chassisNo"
                        className='inputField'
                        value={formData.chassisNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    Engine No:
                    <input
                        type="text"
                        name="engineNo"
                        className='inputField'
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
                        value={formData.latitude || 0.0}
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
                        className='inputField'
                        name="longitude"
                        value={formData.longitude || 0.0}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    Vehicle No:
                    <input
                        type="text"
                        name="vehicleNo"
                        className='inputField'
                        value={formData.vehicleNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    accidentFileNo:
                    <input
                        type="text"
                        name="accidentFileNo"
                        className='inputField'
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

            <div style={{
                textAlign: 'center',
                backgroundColor: 'lightblue', // Choose your color
                color: 'brown', // Choose text color
                padding: '20px 0', // Vertical padding and no horizontal padding
                marginBottom: '30px', // Space below the header
            }}>
                <h1>DATA UPLOADED BY CRAIN</h1>
                <hr style={{
                    border: '0',
                    height: '2px', // Thickness of the hr
                    backgroundColor: '#fff', // Same as the text color for consistency
                    maxWidth: '50%', // Width of the hr
                    margin: '0 auto', // Center the hr
                }} />
            </div>


            <div className='form-row'>
                <label className="form-field">
                    Vehicle Inspection Remarks:
                    <textarea
                        className='inputField'
                        name="vehicleInspection"
                        value={formData.vehicleInspection}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    Work Estimate:
                    <input
                        type="text"
                        className='inputField'
                        name="workEstimate"
                        value={formData.workEstimate}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    Recovery Van Estimate:
                    <input
                        type="text"
                        className='inputField'
                        name="recoveryVanEstimate"
                        value={formData.recoveryVanEstimate}
                        onChange={handleChange}
                    />
                </label>

            </div>
            {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

<div style={{ textAlign: 'center' }}>
          <button type="submit" onClick={onSubmit} style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}>
            Submit
          </button>
        </div>
        </div>
    );
}

export default AddedDataByCrain;
