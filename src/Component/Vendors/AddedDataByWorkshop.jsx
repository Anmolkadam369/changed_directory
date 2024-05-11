import React, { useEffect, useState, useRef } from 'react';
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

function AddedDataByWorkshop() {
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
    console.log("existingData", existingData)


    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        getDataById(id);
        if (id != null && userId != null) getExistingData(id, userId)
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

    const vehicleHandover = useRef(null);
    const estimateGiven = useRef(null);
    const agreementCPA = useRef(null);
    const deadlineSheet = useRef(null);
    const supplementryEstimate = useRef(null);
    const preApproval = useRef(null);
    const allBillCopy = useRef(null);

    const handleChange = (e) => {
        const { name, type, files } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 500000) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    vehicleHandover: vehicleHandover,
                    estimateGiven: estimateGiven,
                    agreementCPA: agreementCPA,
                    deadlineSheet: deadlineSheet,
                    supplementryEstimate: supplementryEstimate,
                    preApproval: preApproval,
                    allBillCopy: allBillCopy
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
    console.log('the id which want to send', formData, id, userId);

    const validateForm = () => {
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'firCopy' || key === 'POA' || key === 'petitionCopy'
                || key === 'policeReportCopy' || key === 'bailerDetails' || key === 'releaseOrderCopy' ||
                key === "indemnityBondCopy" || key === "releaseUploead") {
                if (value === null || value === undefined || value.size === 0)
                    return `Field '${key}' is required.`;
            }
            if (key === 'feedback' && value === '') {
                return `Field '${key}' is required.`;
            }
        }
    };

    const onSubmsit = async (e) => {
        e.preventDefault();
        console.log('formData', formData, id, userId);
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
        console.log('formData', formData);
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
            console.log(`${pair[0]}:`, pair[1] instanceof Blob ? `${pair[1].name}, size: ${pair[1].size}` : pair[1]);
        }
        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/vendorOnAssignedVehicle/${id}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });

            console.log("RESPONSE", response)
            if (response.data.message === "data inserted successfully")
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            console.log("Data sent to the backend:", formDataObj);

        } catch (error) {
            console.error("Error during form submission:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Status code:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        };
    };

    const onSubmit = async (e) => {
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
        console.log('formData', formData);
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

        // Debug log for FormData contents
        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1] instanceof Blob ? `${pair[1].name}, size: ${pair[1].size}` : pair[1]);
        }

        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/vendorOnAssignedVehicle/${id}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });

            console.log("RESPONSE", response)
            if (response.data.message === "data inserted successfully")
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            console.log("Data sent to the backend:", formDataObj);

        } catch (error) {
            console.error("Error during form submission:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Status code:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        };
    }
    const handleBack = () => {
        navigate("../WorkshopDashboard")
    }
    return (
        <div className='container'>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack}/>
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
                <h2 className='bigtitle'>Document Upload - Workshop</h2>
            </div>
            <br />


            <div className='form-row'>

                <div>
                    <p className="form-field">Agreement to CPA:</p>
                    {existingData?.agreementCPA ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Agreement CPA is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="agreementCPA"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={agreementCPA}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>


                <div>
                    <p className="form-field">Vehicle Handover:</p>
                    {existingData?.vehicleHandover ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Vehicle Handover is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="vehicleHandover"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={vehicleHandover}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Estimate Given:</p>
                    {existingData?.estimateGiven ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Vehicle Handover is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="estimateGiven"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={estimateGiven}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>

            </div>

            <div className='form-row'>



                <div>
                    <p className="form-field">Deadline Sheet:</p>
                    {existingData?.deadlineSheet ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Deadline Sheet is already uploaded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="deadlineSheet"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={deadlineSheet}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>
                <div>

                    <p className="form-field">Supplementary Estimate:</p>
                    {existingData?.supplementryEstimate ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Supplementary Estimate is already uploaded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="supplementryEstimate"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={supplementryEstimate}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Surveyor Pre Approval On Both:</p>
                    {existingData?.preApproval ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Pre Approval is already uploaded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="preApproval"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={preApproval}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>
            </div>

            <div className='form-row'>

                <div>
                    <p className="form-field">1st Advanced payment (50% of Estimate):</p>
                    {existingData?.firstAdvancedPayment ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>1st Advanced payment is already recorded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="firstAdvancedPayment"
                                value={formData.firstAdvancedPayment}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>
                <div>
                    <p className="form-field">Parts order Status:</p>
                    {existingData?.partsOrderStatus ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Parts order Status is already uploaded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="partsOrderStatus"
                                value={formData.partsOrderStatus}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>
                <div>
                    <p className="form-field">Final bills and payment :</p>
                    {existingData?.allBillCopy ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>All bill copy is already recorded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="allBillCopy"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={allBillCopy}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>

            </div>

            <div className='form-row'>

                <div>
                    <p className="form-field">Driver Arrangement:</p>
                    {existingData?.contactofDriver ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Driver arrangement details are already recorded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="contactofDriver"
                                value={formData.contactofDriver}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>


                <div>
                    <p className="form-field">Inspection And Trial:</p>
                    {existingData?.driverFeedback ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Inspection and trial feedback is already recorded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="driverFeedback"
                                value={formData.driverFeedback}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>
                <div>
                    <p className="form-field">2nd Advanced payment (50% of Estimate):</p>
                    {existingData?.secondAdvancedPayment ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>2nd Advanced payment is already recorded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="secondAdvancedPayment"
                                value={formData.secondAdvancedPayment}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>
            </div>

            <div className='form-row'>
                <div>
                    <p className="form-field">Payment:</p>
                    {existingData?.payment ? (
                        <label className="form-field">
                            <p className='notUploaded1'>Payment is already existed</p>
                        </label>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="payment"
                                value={formData.payment}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Feedback:</p>
                    {existingData?.feedback ? (
                        <p className='notUploaded' style={{ marginTop: "20px" }}>Feedback is already recorded</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="text"
                                className='inputField form-control'
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        </label>
                    )}
                </div>

                <div></div>
                <div></div>

            </div>




            {
                alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )
            }

            <div style={{ textAlign: 'center' }}>
                <button type="submit" onClick={onSubmit} style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}>
                    Submit
                </button>
            </div>
        </div >

    );
}

export default AddedDataByWorkshop;
