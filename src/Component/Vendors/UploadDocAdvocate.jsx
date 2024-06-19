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
import { Helmet } from 'react-helmet-async';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

function UploadDocAdvocate({ id, item, onUpdate }) {
    const location = useLocation();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
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
    const [existingData, setExistingData] = useState([]);
    const [showPopup, setShowPopup] = useState(true);


    const [isFirCopyModalOpen, setIsFirCopyModalOpen] = useState(false);
    const openFirCopyModal = () => {
        setIsFirCopyModalOpen(true);
    };
    const closeFirCopyModal = () => {
        setIsFirCopyModalOpen(false);
    };

    const [isPOAModalOpen, setIsPOAModalOpen] = useState(false);
    const openPOAModal = () => setIsPOAModalOpen(true);
    const closePOAModal = () => setIsPOAModalOpen(false);

    const [isPetitionCopyModalOpen, setIsPetitionCopyModalOpen] = useState(false);
    const openPetitionCopyModal = () => setIsPetitionCopyModalOpen(true);
    const closePetitionCopyModal = () => setIsPetitionCopyModalOpen(false);

    const [isPoliceReportCopyModalOpen, setIsPoliceReportCopyModalOpen] = useState(false);
    const openPoliceReportCopyModal = () => setIsPoliceReportCopyModalOpen(true);
    const closePoliceReportCopyModal = () => setIsPoliceReportCopyModalOpen(false);

    const [isBailerDetailsModalOpen, setIsBailerDetailsModalOpen] = useState(false);
    const openBailerDetailsModal = () => setIsBailerDetailsModalOpen(true);
    const closeBailerDetailsModal = () => setIsBailerDetailsModalOpen(false);

    const [isReleaseOrderCopyModalOpen, setIsReleaseOrderCopyModalOpen] = useState(false);
    const openReleaseOrderCopyModal = () => setIsReleaseOrderCopyModalOpen(true);
    const closeReleaseOrderCopyModal = () => setIsReleaseOrderCopyModalOpen(false);

    const [isReleaseUploadModalOpen, setIsReleaseUploadModalOpen] = useState(false);
    const openReleaseUploadModal = () => setIsReleaseUploadModalOpen(true);
    const closeReleaseUploadModal = () => setIsReleaseUploadModalOpen(false);

    const [isIndemnityBondCopyModalOpen, setIsIndemnityBondCopyModalOpen] = useState(false);
    const openIndemnityBondCopyModal = () => setIsIndemnityBondCopyModalOpen(true);
    const closeIndemnityBondCopyModal = () => setIsIndemnityBondCopyModalOpen(false);

    const [IsReadOnly, setIsReadOnly] = useState(true);


    const [formData, setFormData] = useState({
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

    console.log("formdaaatttaaa", formData)


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

            if (response.data.status === true) {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                console.log("Data sent to the backend:", formDataObj);
                setTimeout(() => {
                    onUpdate()
                }, 2000);
            }
            else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }

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
                    <title>Upload Documents - Advocate - Claimpro</title>
                    <meta name="description" content="Upload and manage important documents for advocate services related to accident cases." />
                    <meta name="keywords" content="Upload Documents, Advocate, Accident Cases, FIR Copy, POA, Petition Copy, Police Report, Claimpro" />
                    <link rel='canonical' href={`https://claimpro.in/UploadDocAdvocate`} />
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
                    <h2 className='bigtitle'>Document Upload - Advocate</h2>
                </div>
                <br />

                <div className='form-row'>

                    {existingData?.firCopy ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>FIR Copy:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.firCopy} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                        </>

                    ) : (
                        <label className="form-field">
                            FIR Copy:
                            <input
                                type="file"
                                name="firCopy"
                                onChange={handleChange}
                                className='form-control'
                                accept=".pdf,image/*"
                                ref={firCopy}
                            />
                        </label>
                    )}



                    {existingData?.POA ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}> POA (Power Of Attorney):</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.POA} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isPOAModalOpen} onRequestClose={closePOAModal} contentLabel="POA Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.POA} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closePOAModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.POA} alt="POA" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            POA (Power Of Attorney):
                            <input
                                type="file"
                                className='form-control'
                                name="POA"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={POA}
                            />
                        </label>
                    )}


                    {existingData?.petitionCopy ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Petition Copy:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.petitionCopy} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isPetitionCopyModalOpen} onRequestClose={closePetitionCopyModal} contentLabel="Petition Copy Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.petitionCopy} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closePetitionCopyModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.petitionCopy} alt="Petition Copy" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            Petition Copy:
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

                <div className='form-row'>


                    {existingData?.policeReportCopy ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Police Report Copy:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.policeReportCopy} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isPoliceReportCopyModalOpen} onRequestClose={closePoliceReportCopyModal} contentLabel="Police Report Copy Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.policeReportCopy} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closePoliceReportCopyModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.policeReportCopy} alt="Police Report Copy" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            Police Report Copy:
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


                    {existingData?.bailerDetails ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Bailer Details:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.bailerDetails} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isBailerDetailsModalOpen} onRequestClose={closeBailerDetailsModal} contentLabel="Bailer Details Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.bailerDetails} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closeBailerDetailsModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.bailerDetails} alt="Bailer Details" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            Bailer Details:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="bailerDetails"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={bailerDetails}
                            />
                        </label>
                    )}



                    {existingData?.releaseOrderCopy ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Release Order Copy:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.releaseOrderCopy} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isReleaseOrderCopyModalOpen} onRequestClose={closeReleaseOrderCopyModal} contentLabel="Release Order Copy Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.releaseOrderCopy} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closeReleaseOrderCopyModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.releaseOrderCopy} alt="Release Order Copy" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            Release Order Copy:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="releaseOrderCopy"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={releaseOrderCopy}
                            />
                        </label>
                    )}
                </div>

                <div className='form-row'>

                    {existingData?.releaseUpload ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Release Upload:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.releaseUpload} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isReleaseUploadModalOpen} onRequestClose={closeReleaseUploadModal} contentLabel="Release Upload Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.releaseUpload} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closeReleaseUploadModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.releaseUpload} alt="Release Upload" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            Release Upload:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="releaseUpload"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={releaseUpload}
                            />
                        </label>
                    )}



                    {existingData?.indemnityBondCopy ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', padding: '5px' }}>Indemnity Bond Copy:</p>
                                <div style={{marginTop:"20px"}}>
                                <a href={formData.indemnityBondCopy} style={{marginTop:"10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                    Download
                                </a>
                                </div>
                            </div>
                            {/* <Modal isOpen={isIndemnityBondCopyModalOpen} onRequestClose={closeIndemnityBondCopyModal} contentLabel="Indemnity Bond Copy Modal">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <IconButton href={formData.indemnityBondCopy} download color="primary">
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={closeIndemnityBondCopyModal} color="secondary">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <img src={formData.indemnityBondCopy} alt="Indemnity Bond Copy" style={{ width: '100%' }} />
                            </Modal> */}
                        </>
                    ) : (
                        <label className="form-field">
                            Indemnity Bond Copy:
                            <input
                                type="file"
                                className='inputField form-control'
                                name="indemnityBondCopy"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={indemnityBondCopy}
                            />
                        </label>
                    )}


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
                    <button
                        type="submit"
                        style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UploadDocAdvocate;
