import React, { useEffect, useState } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation, json } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';


function AddedDataByMachanic({ id, item, onUpdate }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    console.log("item", item)
    let adminResponse = "not requested yet";
    if (item.details.length != 0) {
        adminResponse = item.details[0].acceptedByAdmin
    }
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [existingData, setExistingData] = useState(null);
    const [showPopup, setShowPopup] = useState(true);

    const [formData, setFormData] = useState({
        vehicleInspection: "",
        labourEstimate: "",
        partsArrangment: "",
        trial: "",
        payment: "",
        feedback: ""
    });

    useEffect(() => {
        if (existingData) {
            setFormData({
                vehicleInspection: existingData.vehicleInspection || "",
                labourEstimate: existingData.labourEstimate || "",
                partsArrangment: existingData.partsArrangment || "",
                trial: existingData.trial || "",
                payment: existingData.payment || "",
                feedback: existingData.feedback || ""
            });
        }
    }, [existingData]);

    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        getDataById(id);
        getExistingData(id, userId);
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
                CustomerName: comingData.CustomerName || "",
                choosenPlan: comingData.choosenPlan || '',
                randomId: comingData.randomId || "",
            }));
        }
    }, [comingData])

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo/${id}`);
        console.log("daa", response)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }
    const getExistingData = async (id, userId) => {
        try {
            const response = await axios.get(`${backendUrl}/api/getVendorOnAssignedVehicle/${id}/${userId}`);
            console.log("getExistingData success", response.data.data);
            setExistingData(response.data.data[0]);
        } catch (error) {
            console.error("Failed to fetch existing data", error.response || error);
            if (error.response) {
                console.log("Error data:", error.response.data);
                console.log("Error status:", error.response.status);
                console.log("Error headers:", error.response.headers);
            } else {
                console.log("Error message:", error.message);
            }
        }
    };


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
        console.log('formData', formData);
        try {
            const response = await axios.post(`${backendUrl}/api/vendorOnAssignedVehicle/${id}/${userId}`, JSON.stringify(formData), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            console.log("response", response.data);
            console.log("response", response.data.status);

            if (response.data.status === true) {
                setAlertInfo({ show: true, message: "Information Added successfully", severity: 'success' });
                setTimeout(() => {
                    // navigate("../MachanicDashboard");
                    onUpdate()
                }, 2000);
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

    const handleBack = () => {
        onUpdate()
        // navigate("../MachanicDashboard")
    }

    console.log("adminResponse:", adminResponse);
    console.log("showPopup:", showPopup);

    return (
        <div>
            <form className='Customer-master-form'>
                <Helmet>
                    <title>Mechanic Data Entry - Claimpro</title>
                    <meta name="description" content="Enter and manage mechanic data for vehicle inspections, labour estimates, parts arrangements, trials, and payments on Claimpro." />
                    <meta name="keywords" content="Mechanic Data Entry, Vehicle Inspection, Labour Estimate, Parts Arrangement, Trial, Payment, Claimpro" />
                    <link rel='canonical' href={`https://claimpro.in/AddedDataByMachanic`} />
                </Helmet>

                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <h2 className='bigtitle'>User Details</h2>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Users Name:
                        <input
                            type="text"
                            name="CustomerName"
                            className='inputField form-control'
                            value={formData.CustomerName || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>

                    <label className="form-field">
                        Choosen Plan:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="choosenPlan"
                            value={formData.choosenPlan || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Chasis No:
                        <input
                            type="text"
                            name="chassisNo"
                            className='inputField form-control'
                            value={formData.chassisNo || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Engine No:
                        <input
                            type="text"
                            name="engineNo"
                            className='inputField form-control'
                            value={formData.engineNo || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Make:
                        <input
                            type="text"
                            name="make"
                            className='inputField form-control'
                            value={formData.make || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Latitude:
                        <input
                            type="text"
                            name="latitude"
                            className='inputField form-control'
                            value={formData.latitude || 0.0}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Longitude:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="longitude"
                            value={formData.longitude || 0.0}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Vehicle No:
                        <input
                            type="text"
                            name="vehicleNo"
                            className='inputField form-control'
                            value={formData.vehicleNo || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Accident File No:
                        <input
                            type="text"
                            name="accidentFileNo"
                            className='inputField form-control'
                            value={formData.accidentFileNo || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Model:
                        <input
                            type="text"
                            name="model"
                            className='inputField form-control'
                            value={formData.model || ''}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                </div>
            </form>


            <form className='Customer-master-form'>
                <div class='header-container'>
                    <h2 className='bigtitle'>Accident Images</h2>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Chassis Number:
                        {comingData.ChassisNoView ? (
                            <>
                                <img
                                    src={comingData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />
                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Cluster Number:
                        {comingData.ClusterView ? (
                            <>
                                <img
                                    src={comingData.ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />
                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        FrontLH Number:
                        {comingData.frontLH ? (
                            <>
                                <img
                                    src={comingData.frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No FrontLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        frontRH:
                        {comingData.frontRH ? (
                            <>
                                <img
                                    src={comingData.frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />
                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No frontRH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        front View:
                        {comingData.frontView ? (
                            <>
                                <img
                                    src={comingData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No front View Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear LH:
                        {comingData.rearLH ? (
                            <>
                                <img
                                    src={comingData.rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear RH:
                        {comingData.rearRH ? (
                            <>
                                <img
                                    src={comingData.rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo:
                        {comingData.MajorDamages1 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 2:
                        {comingData.MajorDamages2 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 3:
                        {comingData.MajorDamages3 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 4:
                        {comingData.MajorDamages4 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 5:
                        {comingData.MajorDamages5 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>

                </div>

            </form>

            <form className='Customer-master-form' onSubmit={onSubmit}>
                <div class='header-container'>
                    <h2 className='bigtitle'>Document Upload - Mechanic</h2>
                </div>
                <br />


                <div className='form-row'>
                    <label className="form-field">
                        Vehicle Inspection Remarks:
                        <textarea
                            className='inputField form-control'
                            name="vehicleInspection"
                            value={formData.vehicleInspection}
                            onChange={handleChange}
                            readOnly={!!existingData?.vehicleInspection}
                        />
                    </label>
                    <label className="form-field">
                        Labour Estimate:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="labourEstimate"
                            value={formData.labourEstimate}
                            onChange={handleChange}
                            readOnly={!!existingData?.labourEstimate}
                        />
                    </label>
                    <label className="form-field">
                        Parts Arrangement:
                        <textarea
                            name="partsArrangment"
                            className='inputField form-control'
                            value={formData.partsArrangment}
                            onChange={handleChange}
                            readOnly={!!existingData?.partsArrangment}
                        />
                    </label>
                    <label className="form-field">
                        Trial:
                        <textarea
                            name="trial"
                            className='inputField form-control'
                            value={formData.trial}
                            onChange={handleChange}
                            readOnly={!!existingData?.trial}
                        />
                    </label>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Payment:
                        <textarea
                            name="payment"
                            className='inputField form-control'
                            value={formData.payment}
                            onChange={handleChange}
                            readOnly={!!existingData?.payment}
                        />
                    </label>

                    {(adminResponse === "not requested yet" || adminResponse === null || adminResponse === undefined) && (
                        <>
                            <label className="form-field">
                                Feedback:
                                <textarea
                                    name="feedback"
                                    className="inputField form-control"
                                    value={formData.feedback}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </label>
                            {showPopup && (
                                <div style={{
                                    position: 'fixed',
                                    top: '10px',
                                    right: '10px',
                                    background: 'lightgrey',
                                    width: 'fit-content',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000, // Ensure it stays above other elements
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '120px',
                                    marginRight: "30px",
                                }}>
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        style={{
                                            background: 'grey',
                                            border: 'none',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            top: '-30px',
                                            right: '-12px',
                                        }}
                                    >
                                        &times;
                                    </button>
                                    <h3 style={{ margin: '0 20px 0 0' }}>Your Information is not Accepted By the Admin that's why Feedback section is blocked </h3>
                                </div>
                            )}
                        </>
                    )}

                    {adminResponse === 'accept' && (
                        <label className="form-field">
                            Feedback:
                            <textarea
                                name="feedback"
                                className="inputField form-control"
                                value={formData.feedback}
                                onChange={handleChange}
                                readOnly={!!existingData?.feedback}
                            />
                        </label>
                    )}


                    <label className="form-field"></label>
                    <label className="form-field"></label>



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
            </form>
        </div>
    );
}

export default AddedDataByMachanic;
