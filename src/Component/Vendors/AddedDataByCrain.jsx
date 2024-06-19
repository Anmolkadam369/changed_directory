import React, { useEffect, useState } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';


function AddedDataByCrain({ id, item, onUpdate }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    let adminResponse = "not requested yet";
    if (item.details.length != 0) {
        adminResponse = item.details[0].acceptedByAdmin
    }
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [existingData, setExistingData] = useState([]);
    const [showPopup, setShowPopup] = useState(true);

    const [formData, setFormData] = useState({
        vehicleInspection: "",
        workEstimate: "",
        recoveryVanEstimate: "",
        vehicleHandover: "",
        advancedPayment: "",
        vehicleTakeOver: "",
        balancePayment: "",
        feedback: ""
    });

    useEffect(() => {
        if (existingData) {
            setFormData({
                firCopy: existingData.firCopy || "",
                companyRepresentative: existingData.companyRepresentative || "",
                POA: existingData.POA || "",
                petitionCopy: existingData.petitionCopy || "",
                policeReportCopy: existingData.policeReportCopy || "",
                indemnityBondCopy: existingData.indemnityBondCopy || "",
                releaseOrderCopy: existingData.releaseOrderCopy || "",
                bailerDetails: existingData.bailerDetails || "",
                feedback: existingData.feedback || "",
                releaseUpload: existingData.releaseUpload || "",
            });
        }
    }, [existingData]);

    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        getDataById(id);
        getExistingData(id, userId)
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
        console.log("getAccidentVehicleInfo", response)
        console.log("getAccidentVehicleInfo", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const getExistingData = async (id, userId) => {
        try {
            const response = await axios.get(`${backendUrl}/api/getVendorOnAssignedVehicle/${id}/${userId}`);
            setExistingData(response.data.data[0]);
            console.log("getExistingData success", response);
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

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('formData', formData, id, userId);
        try {
            const response = await axios.post(`${backendUrl}/api/vendorOnAssignedVehicle/${id}/${userId}`, JSON.stringify(formData), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            console.log("response", response.data.status);
            if (response.data.message === "data inserted successfully") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
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
    }
    return (
        <div>
            <form className='Customer-master-form'>

                <Helmet>
                    <title>Accident Data Added By Crane - Claimpro</title>
                    <meta name="description" content="Accident Data By Crane." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/AddedDataByCrain`} />
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
                            value={formData.CustomerName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Choosen Plan:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="choosenPlan"
                            value={formData.choosenPlan}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Chasis No:
                        <input
                            type="text"
                            name="chassisNo"
                            className='inputField form-control'
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
                            className='inputField form-control'
                            value={formData.engineNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        Make:
                        <input
                            type="text"
                            name="make"
                            className='inputField form-control'
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
                            className='inputField form-control'
                            value={formData.latitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Longitude:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        accidentFileNo:
                        <input
                            type="text"
                            name="accidentFileNo"
                            className='inputField form-control'
                            value={formData.accidentFileNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        accidentFileNo:
                        <input
                            type="text"
                            name="accidentFileNo"
                            className='inputField form-control'
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
                            className='inputField form-control'
                            value={formData.model}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No FrontLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No frontRH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No front View Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>

                </div>
            </form>


            <form className='Customer-master-form' onSubmit={onSubmit}>

                <div class='header-container'>
                    <h2 className='bigtitle'>Document Upload - Crane</h2>
                </div>

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
                        Work Estimate :
                        <input
                            type="text"
                            className='inputField form-control'
                            name="workEstimate"
                            value={formData.workEstimate}
                            onChange={handleChange}
                            readOnly={!!existingData?.workEstimate}
                        />
                    </label>

                    <label className="form-field">
                        Recovery Van Estimate:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="recoveryVanEstimate"
                            value={formData.recoveryVanEstimate}
                            onChange={handleChange}
                            readOnly={!!existingData?.recoveryVanEstimate}
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Handover:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="vehicleHandover"
                            value={formData.vehicleHandover}
                            onChange={handleChange}
                            readOnly={!!existingData?.vehicleHandover}
                        />
                    </label>
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        Advanced Payment:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="advancedPayment"
                            value={formData.advancedPayment}
                            onChange={handleChange}
                            readOnly={!!existingData?.advancedPayment}
                        />
                    </label>


                    <label className="form-field">
                        Vehicle TakeOver:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="vehicleTakeOver"
                            value={formData.vehicleTakeOver}
                            onChange={handleChange}
                            readOnly={!!existingData?.vehicleTakeOver}
                        />
                    </label>

                    <label className="form-field">
                        Balance Payment:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="balancePayment"
                            value={formData.balancePayment}
                            onChange={handleChange}
                            readOnly={!!existingData?.balancePayment}
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

export default AddedDataByCrain;
