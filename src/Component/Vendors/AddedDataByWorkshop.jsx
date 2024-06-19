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
import { Helmet } from 'react-helmet-async';


function AddedDataByWorkshop({ id, item, onUpdate }) {
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
        agreementCPA: "",
        vehicleInspection: "",
        estimateGiven: "",
        deadlineSheet: "",
        supplementryEstimate: "",
        preApproval: "",
        vehicleHandover: "",
        firstAdvancedPayment: "",
        partsOrderStatus: "",
        allBillCopy: "",
        contactofDriver: "",
        driverFeedback: "",
        secondAdvancedPayment: "",
        payment: "",
        feedback: "",
    });

    useEffect(() => {
        if (existingData) {
            setFormData({
                agreementCPA: existingData.agreementCPA || "",
                vehicleHandover: existingData.vehicleHandover || "",
                vehicleInspection: existingData.vehicleInspection || "",
                estimateGiven: existingData.estimateGiven || "",
                deadlineSheet: existingData.deadlineSheet || "",
                supplementryEstimate: existingData.supplementryEstimate || "",
                preApproval: existingData.preApproval || "",
                firstAdvancedPayment: existingData.firstAdvancedPayment || "",
                partsOrderStatus: existingData.partsOrderStatus || "",
                allBillCopy: existingData.allBillCopy || "",
                contactofDriver: existingData.contactofDriver || "",
                driverFeedback: existingData.driverFeedback || "",
                secondAdvancedPayment: existingData.secondAdvancedPayment || "",
                payment: existingData.payment || "",
                feedback: existingData.feedback || "",
            });
        }
    }, [existingData]);

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

    const agreementCPA = useRef(null);
    const vehicleHandover = useRef(null);
    const estimateGiven = useRef(null);
    const deadlineSheet = useRef(null);
    const supplementryEstimate = useRef(null);
    const preApproval = useRef(null);
    const allBillCopy = useRef(null);

    const handleChange = (e) => {
        const { name, type, files } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
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

    const onSubmit = async (e) => {
        e.preventDefault();
        // if (!e.target.checkValidity()) {
        //     e.target.reportValidity();
        //     setAlertInfo({ show: true, message: `${e.target.key} should be in correct format`, severity: 'error' });
        //     return;
        // }
        // const validationMessage = validateForm();
        // if (validationMessage) {
        //     setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
        //     return;
        // }
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
            if (response.data.message == true)
                setAlertInfo({ show: true, message: "Information Added successfully", severity: 'success' });
            console.log("Data sent to the backend:", formDataObj);
            setTimeout(() => {
                onUpdate()
            }, 2000);

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
        onUpdate()
    }
    return (

        <div>
            <form className='Customer-master-form'>
                <Helmet>
                    <title>Added Data by Workshop - Claimpro</title>
                    <meta name="description" content="Added Data By Workshop BVC ClaimPro Assist" />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/AddedDataByWorkshop`} />
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

            <form className='Customer-master-form'>
                <div class='header-container'>
                    <h2 className='bigtitle'>Document Upload - Workshop</h2>
                </div>
                <br />

                <div className='form-row'>

                    {existingData?.agreementCPA ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Agreement to CPA:</p>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.agreementCPA} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label className="form-field">
                            Agreement to CPA:
                            <input
                                type="file"
                                name="agreementCPA"
                                onChange={handleChange}
                                className='form-control'
                                accept=".pdf,image/*"
                                ref={agreementCPA}
                            />
                        </label>
                    )}

                    {existingData?.vehicleHandover ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Vehicle Handover:</p>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.vehicleHandover} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label className="form-field">
                            Vehicle Handover:
                            <input
                                type="file"
                                className='form-control'
                                name="vehicleHandover"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={vehicleHandover}
                            />
                        </label>
                    )}


                    {existingData?.estimateGiven ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Estimate Given:</p>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.estimateGiven} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label className="form-field">
                            Estimate Given:
                            <input
                                type="file"
                                className='form-control'
                                name="estimateGiven"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={estimateGiven}
                            />
                        </label>
                    )}

                </div>

                <div className='form-row'>

                    {existingData?.deadlineSheet ? (
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <p style={{ margin: '0', padding: '5px' }}>Deadline Sheet:</p>
                            <div style={{ marginTop: "20px" }}>
                                <a href={existingData.deadlineSheet} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                            </div>
                        </div>
                    ) : (
                        <label className="form-field">
                            Deadline Sheet:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="deadlineSheet"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={deadlineSheet}
                            />
                        </label>
                    )}


                    {existingData?.supplementryEstimate ? (
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <p style={{ margin: '0', padding: '5px' }}>Supplementary Estimate:</p>
                            <div style={{ marginTop: "20px" }}>
                                <a href={existingData.supplementryEstimate} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                            </div>
                        </div>
                    ) : (
                        <label className="form-field">
                            Supplementary Estimate:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="supplementryEstimate"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={supplementryEstimate}
                            />
                        </label>
                    )}

                    {existingData?.preApproval ? (
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <p style={{ margin: '0', padding: '5px' }}>Pre Approval:</p>
                            <div style={{ marginTop: "20px" }}>
                                <a href={existingData.preApproval} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                            </div>
                        </div>
                    ) : (
                        <label className="form-field">
                            Pre Approval:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="preApproval"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={preApproval}
                            />
                        </label>
                    )}
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        1st Advanced payment (50% of Estimate):
                        <input
                            type="text"
                            name="firstAdvancedPayment"
                            className='inputField form-control'
                            value={formData.firstAdvancedPayment}
                            onChange={handleChange}
                            readOnly={!!existingData?.firstAdvancedPayment}
                        />
                    </label>

                    <label className="form-field">
                        Parts order Status:
                        <input
                            type="text"
                            name="partsOrderStatus"
                            className='inputField form-control'
                            value={formData.partsOrderStatus}
                            onChange={handleChange}
                            readOnly={!!existingData?.partsOrderStatus}
                        />
                    </label>

                    <label className="form-field">
                        Driver Arrangement:
                        <input
                            type="text"
                            name="contactofDriver"
                            className='inputField form-control'
                            value={formData.contactofDriver}
                            onChange={handleChange}
                            readOnly={!!existingData?.contactofDriver}
                        />
                    </label>

                </div>

                <div className='form-row'>



                    <label className="form-field">
                        Inspection And Trial:
                        <input
                            type="text"
                            name="driverFeedback"
                            className='inputField form-control'
                            value={formData.driverFeedback}
                            onChange={handleChange}
                            readOnly={!!existingData?.driverFeedback}
                        />
                    </label>

                    <label className="form-field">
                        2nd Advanced payment (50% of Estimate):
                        <input
                            type="text"
                            name="secondAdvancedPayment"
                            className='inputField form-control'
                            value={formData.secondAdvancedPayment}
                            onChange={handleChange}
                            readOnly={!!existingData?.secondAdvancedPayment}
                        />
                    </label>

                    <label className="form-field">
                        Payment:
                        <input
                            type="text"
                            name="payment"
                            className='inputField form-control'
                            value={formData.payment}
                            onChange={handleChange}
                            readOnly={!!existingData?.payment}
                        />
                    </label>

                </div>

                <div className='form-row'>



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


                    {existingData?.allBillCopy ? (
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <p style={{ margin: '0', padding: '5px' }}>All Bill Copy:</p>
                            <div style={{ marginTop: "20px" }}>
                                <a href={existingData.allBillCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                            </div>
                        </div>
                    ) : (
                        <label className="form-field">
                            All Bill Copy:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="allBillCopy"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={allBillCopy}
                            />
                        </label>
                    )}

                    <label className="form-field"></label>



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
            </form >
        </div>

    );
}

export default AddedDataByWorkshop;
