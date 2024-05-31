import React, { useEffect, useState, useRef } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Alert } from '@mui/material';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet';

function UploadDocAdvocate() {
    const location = useLocation();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [existingData, setExistingData] = useState([]);

    const [IsReadOnly, setIsReadOnly] = useState(true);
    console.log("LID", id, "some", userId);


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
                accidentFileNo: comingData.accidentFileNo || '',
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
                petitionCopy: "", policeReportCopy: "", indimnityBondCopy: "", bailerDetails: "", releaseUpload: "", feedbackByAdvocate: ""
            }));
            console.log("RANDOMID", comingData.randomId)
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
        accidentFileNo: "",
        chassisNo: '',
        engineNo: '',
        entry_date: '',
        make: '',
        model: '',
        latitude: '',
        longitude: '',
        accidentFileNo: '',
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
        firCopy: "",
        companyRepresentative: "",
        POA: "",
        petitionCopy: "",
        policeReportCopy: "",
        indemnityBondCopy: "",
        bailerDetails: "",
        releaseOrderCopy: "",
        feedback: "",
        releaseUpload: ""
    });


    const firCopy = useRef(null);
    const POA = useRef(null);
    const petitionCopy = useRef(null);
    const policeReportCopy = useRef(null);
    const bailerDetails = useRef(null);
    const releaseOrderCopy = useRef(null);
    const releaseUpload = useRef(null);
    const indemnityBondCopy = useRef(null);

    const handleChange = (e) => {
        const { name, type, files } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 500000) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    firCopy: firCopy,
                    POA: POA,
                    petitionCopy: petitionCopy,
                    policeReportCopy: policeReportCopy,
                    bailerDetails: bailerDetails,
                    releaseUpload: releaseUpload,
                    indemnityBondCopy: indemnityBondCopy
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
    console.log("formdata", formData)
    const handleBack = () => {
        navigate("../advocateDashboard")
    }

    return (
        <div className='container'>
            <Helmet>
                <title>Upload Documents - Advocate - Claimpro</title>
                <meta name="description" content="Upload and manage important documents for advocate services related to accident cases." />
                <meta name="keywords" content="Upload Documents, Advocate, Accident Cases, FIR Copy, POA, Petition Copy, Police Report, Claimpro" />
            </Helmet>
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
                <h2 className='bigtitle'>Document Upload - Advocate</h2>
            </div>
            <br />


            <div className='form-row'>
                <div>
                    <p className="form-field">FIR Copy:</p>
                    {existingData?.firCopy ? (
                        <p className='notUploaded1'>FIR Copy is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                name="firCopy"
                                onChange={handleChange}
                                className='inputField form-control'
                                accept=".pdf,image/*"
                                ref={firCopy}
                            />
                        </label>
                    )}
                </div>
                <div>
                    <p className="form-field">POA (Power Of Attorney):</p>
                    {existingData?.POA ? (
                        <p className='notUploaded1'>POA is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="POA"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={POA}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Petition Copy:</p>
                    {existingData?.petitionCopy ? (
                        <p className='notUploaded1'>Petition Copy is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="petitionCopy"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={petitionCopy}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Police Report Copy:</p>
                    {existingData?.policeReportCopy ? (
                        <p className='notUploaded1'>Police Report is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                className='inputField form-control'
                                name="policeReportCopy"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={policeReportCopy}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Bailer Details:</p>
                    {existingData?.bailerDetails ? (
                        <p className='notUploaded1'>Bailer Details is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                name="bailerDetails"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={bailerDetails}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Release Order Details:</p>
                    {existingData?.releaseOrderCopy ? (
                        <p className='notUploaded1'>Release Order Copy is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                name="releaseOrderCopy"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={releaseOrderCopy}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Release Order Upload:</p>
                    {existingData?.releaseUpload ? (
                        <p className='notUploaded1'>Release Upload is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                name="releaseUpload"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={releaseUpload}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Feedback:</p>
                    {existingData?.feedback ? (
                        <p className='notUploaded1'>Feedback is already existed</p>
                    ) : (
                        <label className="form-field">
                            <textarea
                                name="feedback"
                                className='inputField form-control'
                                value={formData.feedback}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                </div>

                <div>
                    <p className="form-field">Indemnity Bond Copy:</p>
                    {existingData?.indemnityBondCopy ? (
                        <p className='notUploaded1'>Indemnity Bond Copy is already existed</p>
                    ) : (
                        <label className="form-field">
                            <input
                                type="file"
                                name="indemnityBondCopy"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={indemnityBondCopy}
                            />
                        </label>
                    )}
                </div>

            </div>

            {alertInfo.show && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                    {alertInfo.message}
                </Alert>
            )}

            <div style={{ textAlign: 'center' }}>
                <button
                    type="submit"
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default UploadDocAdvocate;
