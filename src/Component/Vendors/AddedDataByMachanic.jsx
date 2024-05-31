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
import { Helmet } from 'react-helmet';


function AddedDataByMachanic() {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [existingData, setExistingData] = useState([]);


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
                VehicleInspection: "",
                labourEstimate: "",
                partsArrangment: "",
                trial: "",
                payment: "",
                feedback: ""
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

    const [formData, setFormData] = useState({
        VehicleInspection: "",
        labourEstimate: "",
        partsArrangment: "",
        trial: "",
        payment: "",
        feedback: ""
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

    const handleBack = () => {
        navigate("../MachanicDashboard")
    }

    return (
        <div className='container'>
            <Helmet>
                <title>Mechanic Data Entry - Claimpro</title>
                <meta name="description" content="Enter and manage mechanic data for vehicle inspections, labour estimates, parts arrangements, trials, and payments on Claimpro." />
                <meta name="keywords" content="Mechanic Data Entry, Vehicle Inspection, Labour Estimate, Parts Arrangement, Trial, Payment, Claimpro" />
            </Helmet>

            <Button startIcon={<ArrowBackIcon />} onClick={handleBack} />
            <div class='header-container'>
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

            </div>

            <div className='form-row'>
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
                        className='inputField form-control'
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
                        className='inputField form-control'
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
            </div>


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

            <div class='header-container'>
                <h2 className='bigtitle'>Document Upload - Mechanic</h2>
            </div>
            <br />


            <div className='form-row'>
                <div>
                    <label className="form-field">
                        Vehicle Inspection Remarks:
                        {existingData?.VehicleInspection ? (
                            <p className='notUploaded1'>Vehicle Inspection is already existed</p>
                        ) : (
                            <textarea
                                className='inputField form-control'
                                name="vehicleInspection"
                                value={formData.VehicleInspection}
                                onChange={handleChange}
                            />)}
                    </label>
                </div>
                <div>
                    <label className="form-field">
                        Labour Estimate:
                        {existingData?.labourEstimate ? (
                            <p className='notUploaded1'>Labour Estimate is already existed</p>
                        ) : (
                            <input
                                type="text"
                                className='inputField form-control'
                                name="labourEstimate"
                                value={formData.labourEstimate}
                                onChange={handleChange}
                            />)}
                    </label>
                </div>
                <div>
                    <label className="form-field">
                        Parts Arrangement:
                        {existingData?.partsArrangement ? (
                            <p className='notUploaded1'>Parts Arrangement is already existed</p>
                        ) : (
                            <textarea
                                name="partsArrangement" // corrected spelling from 'Arrangment' to 'Arrangement'
                                className='inputField form-control'
                                value={formData.partsArrangement}
                                onChange={handleChange}
                            />)}
                    </label>
                </div>
                <div>
                    <label className="form-field">
                        Trial:
                        {existingData?.trial ? (
                            <p className='notUploaded1'>Trial is already existed</p>
                        ) : (
                            <textarea
                                name="trial"
                                className='inputField form-control'
                                value={formData.trial}
                                onChange={handleChange}
                            />)}
                    </label>
                </div>
            </div>
            <div className='form-row'>
                <label className="form-field">
                    Payment:
                    {existingData?.payment ? (
                        <p className='notUploaded1'>Payment is already existed</p>
                    ) : (
                        <textarea
                            name="payment"
                            className='inputField form-control'
                            value={formData.payment}
                            onChange={handleChange}
                        />
                    )}
                </label>
                <label className="form-field">
                    Feedback:
                    {existingData?.feedback ? (
                        <p className='notUploaded1'>Feedback is already existed</p>
                    ) : (
                        <textarea
                            name="feedback"
                            className='inputField form-control'
                            value={formData.feedback}
                            onChange={handleChange}
                        />
                    )}
                </label>
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
        </div>
    );
}

export default AddedDataByMachanic;
