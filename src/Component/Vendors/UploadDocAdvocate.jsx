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
import { ClipLoader } from 'react-spinners';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function UploadDocAdvocate({ id, item, onUpdate }) {
    const location = useLocation();
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    let adminResponse = "not requested yet";
    if (item.details.length != 0) {
        adminResponse = item.details[0].acceptedByAdmin
    }

    const [isChassisModalOpen, setIsChassisModalOpen] = useState(false);
    const [isClusterModalOpen, setIsClusterModalOpen] = useState(false);
    const [isFrontLHModalOpen, setIsFrontLHModalOpen] = useState(false);
    const [isFrontRHModalOpen, setIsFrontRHModalOpen] = useState(false);

    const [isFrontViewModalOpen, setIsFrontViewModalOpen] = useState(false);
    const [isRearRHModalOpen, setIsRearRHModalOpen] = useState(false);
    const [isRearLHModalOpen, setIsRearLHModalOpen] = useState(false);
    const [isMajorDamage1ModalOpen, setIsMajorDamage1ModalOpen] = useState(false);

    const [isMajorDamage2ModalOpen, setIsMajorDamage2ModalOpen] = useState(false);
    const [isMajorDamage3ModalOpen, setIsMajorDamage3ModalOpen] = useState(false);
    const [isMajorDamage4ModalOpen, setIsMajorDamage4ModalOpen] = useState(false);
    const [isMajorDamage5ModalOpen, setIsMajorDamage5ModalOpen] = useState(false);

    const openChassisModal = () => setIsChassisModalOpen(true);
    const closeChassisModal = () => setIsChassisModalOpen(false);

    const openClusterModal = () => setIsClusterModalOpen(true);
    const closeClusterModal = () => setIsClusterModalOpen(false);

    const openFrontLHModal = () => setIsFrontLHModalOpen(true);
    const closeFrontLHModal = () => setIsFrontLHModalOpen(false);

    const openFrontRHModal = () => setIsFrontRHModalOpen(true);
    const closeFrontRHModal = () => setIsFrontRHModalOpen(false);

    const openFrontViewModal = () => setIsFrontViewModalOpen(true);
    const closeFrontViewModal = () => setIsFrontViewModalOpen(false);

    const openRearRHModal = () => setIsRearRHModalOpen(true);
    const closeRearRHModal = () => setIsRearRHModalOpen(false);

    const openRearLHModal = () => setIsRearLHModalOpen(true);
    const closeRearLHModal = () => setIsRearLHModalOpen(false);

    const openMajorDamage1Modal = () => setIsMajorDamage1ModalOpen(true);
    const closeMajorDamage1Modal = () => setIsMajorDamage1ModalOpen(false);

    const openMajorDamage2Modal = () => setIsMajorDamage2ModalOpen(true);
    const closeMajorDamage2Modal = () => setIsMajorDamage2ModalOpen(false);

    const openMajorDamage3Modal = () => setIsMajorDamage3ModalOpen(true);
    const closeMajorDamage3Modal = () => setIsMajorDamage3ModalOpen(false);

    const openMajorDamage4Modal = () => setIsMajorDamage4ModalOpen(true);
    const closeMajorDamage4Modal = () => setIsMajorDamage4ModalOpen(false);

    const openMajorDamage5Modal = () => setIsMajorDamage5ModalOpen(true);
    const closeMajorDamage5Modal = () => setIsMajorDamage5ModalOpen(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    const [existingData, setExistingData] = useState([]);
    const [showPopup, setShowPopup] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirCopyModalOpen, setIsFirCopyModalOpen] = useState(false);

    const generateOfficePreviewLink = (fileUrl) => {
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
    };

    const generateGooglePreviewLink = (fileUrl) => {
        return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    };

    const handlePreviewClick = (e, fileUrl) => {
        e.stopPropagation();
        const fileExtension = fileUrl.split('.').pop().toLowerCase();
        let previewLink;
        if (fileExtension === 'pdf') {
            previewLink = generateGooglePreviewLink(fileUrl);
        } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
            previewLink = generateOfficePreviewLink(fileUrl);
        } else {
            alert('Preview not available for this file type.');
            return;
        }
        window.open(previewLink, '_blank');
    };


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

    const [isChequeModalOpen, setIsChequeModalOpen] = useState(false);
    const [isOnlinePaymentModalOpen, setIsOnlinePaymentModalOpen] = useState(false);


    const openChequeModal = () => {
        setIsChequeModalOpen(true);
    };

    const closeChequeModal = () => {
        setIsChequeModalOpen(false);
    };

    const openOnlinePaymentModal = () => {
        setIsOnlinePaymentModalOpen(true);
    };

    const closeOnlinePaymentModal = () => {
        setIsOnlinePaymentModalOpen(false);
    };


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
        releaseUpload: "",
        feedbackRating: "",
        transactionId: "",
        onlinePaymentImg: "",
        cheque: "",
        paidByCash: false
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
                feedbackRating: existingData.feedbackRating || "",
                transactionId: existingData.transactionId || "",
                onlinePaymentImg: existingData.onlinePaymentImg || "",
                cheque: existingData.cheque || "",
                paidByCash: existingData.paidByCash === "true",

            });
        }
    }, [existingData]);
    console.log("EXISTIONDAT", existingData)

    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
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
    const onlinePaymentRef = useRef(null);
    const chequeRef = useRef(null);


    const handleChange = (e) => {
        const { name, type, files, value, checked } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    firCopy: firCopy,
                    POA: POA,
                    petitionCopy: petitionCopy,
                    policeReportCopy: policeReportCopy,
                    bailerDetails: bailerDetails,
                    releaseUpload: releaseUpload,
                    indemnityBondCopy: indemnityBondCopy,
                    onlinePaymentImg: onlinePaymentRef,
                    cheque: chequeRef,
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
        } else if (type === "checkbox") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
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
                url: `${backendUrl}/api/vendorOnAssignedVehicle/${id}/${userId}/${item.assignedBy}`,
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
    const [feedbackRating, setfeedbackRating] = useState(null);
    const [isfeedbackRatingModalOpen, setIsfeedbackRatingModalOpen] = useState(false);
    const [isCommissionModelOpen, setIsCommissionModelOpen] = useState(false);
    let [paymentThrough, setPaymentThrough] = useState("");

    const openfeedbackRatingModal = (e) => {
        e.preventDefault()
        setIsfeedbackRatingModalOpen(true);
        setIsCommissionModelOpen(false);
    };
    const openCommissionModel = (e) => {
        e.preventDefault();
        setIsCommissionModelOpen(true);
        setIsfeedbackRatingModalOpen(false);
    }

    const closefeedbackRatingModal = (e) => {
        e.preventDefault()
        setIsfeedbackRatingModalOpen(false);
    };

    const closeCommisionModel = (e) => {
        e.preventDefault()
        setIsCommissionModelOpen(false);
    };

    const onfeedbackRatingChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setfeedbackRating(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [alreadyRating, setAlreadyRating] = useState(false);
    console.log("alteaddiaydadfadf", alreadyRating)
    useEffect(() => {
        if (formData.feedbackRating != null && formData.feedbackRating != "" && formData.feedbackRating != undefined && feedbackRating == null) {
            setAlreadyRating(true)
        }
    }, [formData.feedbackRating])

    const paymentBy = (value) => {
        setPaymentThrough(value);
    }

    const [isReadOnlyPayment, setIsReadOnlyPayment] = useState(true)
    console.log("SISFSDFDFSDFSFD", isReadOnlyPayment)

    const [notRequestedLink, setNotRequestedLink] = useState(true);
    const [comingLink, setComingLink] = useState("");

    const handlePayment = async () => {  // added
        const id = userId;// added
        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/createLinkForPayment/${id}`);
            console.log("handlepayment", response.data)
            if (response.data.message === "successfully created") {
                setNotRequestedLink(false)
                setIsLoading(false);
                setComingLink(response.data.data);
            } else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Error response:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        }
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openChassisModal}
                                />
                                <Modal isOpen={isChassisModalOpen} onRequestClose={closeChassisModal} contentLabel="Chassis Card Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.ChassisNoView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeChassisModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.ChassisNoView} alt="Chassis Card" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openClusterModal}
                                />
                                <Modal isOpen={isClusterModalOpen} onRequestClose={closeClusterModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.ClusterView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeClusterModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.ClusterView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openFrontLHModal}
                                />
                                <Modal isOpen={isFrontLHModalOpen} onRequestClose={closeFrontLHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.frontLH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontLHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.frontLH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openFrontRHModal}
                                />
                                <Modal isOpen={isFrontRHModalOpen} onRequestClose={closeFrontRHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.frontRH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontRHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.frontRH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openFrontViewModal}
                                />
                                <Modal isOpen={isFrontViewModalOpen} onRequestClose={closeFrontViewModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.frontView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontViewModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.frontView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openRearLHModal}
                                />
                                <Modal isOpen={isRearLHModalOpen} onRequestClose={closeRearLHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.rearLH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeRearLHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.rearLH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openRearRHModal}
                                />
                                <Modal isOpen={isRearRHModalOpen} onRequestClose={closeRearRHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.rearRH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeRearRHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.rearRH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openMajorDamage1Modal}
                                />
                                <Modal isOpen={isMajorDamage1ModalOpen} onRequestClose={closeMajorDamage1Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.MajorDamages1} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage1Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.MajorDamages1} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openMajorDamage2Modal}
                                />
                                <Modal isOpen={isMajorDamage2ModalOpen} onRequestClose={closeMajorDamage2Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.MajorDamages2} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage2Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.MajorDamages2} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openMajorDamage3Modal}
                                />
                                <Modal isOpen={isMajorDamage3ModalOpen} onRequestClose={closeMajorDamage3Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.MajorDamages3} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage3Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.MajorDamages3} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openMajorDamage4Modal}
                                />
                                <Modal isOpen={isMajorDamage4ModalOpen} onRequestClose={closeMajorDamage4Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.MajorDamages4} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage4Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.MajorDamages4} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={openMajorDamage5Modal}
                                />
                                <Modal isOpen={isMajorDamage5ModalOpen} onRequestClose={closeMajorDamage5Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={comingData.MajorDamages5} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage5Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={comingData.MajorDamages5} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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

                    <label className='form-field'>
                        FIR Copy:
                        {
                            existingData?.firCopy ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div>
                                        <a
                                            href={formData.firCopy}
                                            style={{

                                                cursor: 'pointer',
                                                marginTop: '20px',
                                                color: 'green'
                                            }}
                                            download
                                        >
                                            <DownloadingOutlinedIcon /> Download
                                        </a>
                                        <button
                                            type="button"
                                            onClick={(e) => handlePreviewClick(e, formData.firCopy)}
                                            style={{

                                                cursor: 'pointer',
                                                marginTop: '20px',
                                                border: 'none',
                                                background: "white",
                                                color: "#560303",
                                                fontSize: "13px",
                                                boxShadow: "none"
                                            }}
                                        >
                                            <RemoveRedEyeOutlinedIcon /> Preview
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="form-field">
                                    <input
                                        type="file"
                                        name="firCopy"
                                        onChange={handleChange}
                                        className='form-control'
                                        accept=".pdf/*"
                                        ref={firCopy}
                                    />
                                </label>
                            )}

                    </label>

                    <label className="form-field">
                        POA (Power Of Attorney):
                        {existingData?.POA ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.POA}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.POA)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">
                                <input
                                    type="file"
                                    className='form-control'
                                    name="POA"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={POA}
                                />
                            </label>
                        )}
                    </label>

                    <label className="form-field">
                        Petition Copy:
                        {existingData?.petitionCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.petitionCopy}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.petitionCopy)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">

                                <input
                                    type="file"
                                    className='inputField form-control'
                                    name="petitionCopy"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={petitionCopy}
                                />
                            </label>
                        )}
                    </label>

                    <label className="form-field">
                        Police Report Copy:
                        {existingData?.policeReportCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.policeReportCopy}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.policeReportCopy)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">
                                <input
                                    type="file"
                                    className='inputField form-control'
                                    name="policeReportCopy"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={policeReportCopy}
                                />
                            </label>
                        )}
                    </label>

                </div>

                <div className='form-row'>
                    <label className='form-field'>
                        Bailer Details:
                        {existingData?.bailerDetails ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.bailerDetails}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.bailerDetails)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">
                                <input
                                    type="file"
                                    className='inputField form-control'
                                    name="bailerDetails"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={bailerDetails}
                                />
                            </label>
                        )}
                    </label>

                    <label className='form-field'>
                        Release Order Copy:
                        {existingData?.releaseOrderCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.releaseOrderCopy}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.releaseOrderCopy)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">
                                <input
                                    type="file"
                                    className='inputField form-control'
                                    name="releaseOrderCopy"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={releaseOrderCopy}
                                />
                            </label>
                        )}
                    </label>

                    <label className='form-field'>
                        Release Upload:
                        {existingData?.releaseUpload ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.releaseUpload}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.releaseUpload)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">
                                <input
                                    type="file"
                                    className='inputField form-control'
                                    name="releaseUpload"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={releaseUpload}
                                />
                            </label>
                        )}
                    </label>

                    <label className='form-field'>
                        Indemnity Bond Copy:
                        {existingData?.indemnityBondCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div >
                                    <a
                                        href={formData.indemnityBondCopy}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            color: 'green'
                                        }}
                                        download
                                    >
                                        <DownloadingOutlinedIcon /> Download
                                    </a>
                                    <button
                                        type="button"
                                        onClick={(e) => handlePreviewClick(e, formData.indemnityBondCopy)}
                                        style={{

                                            cursor: 'pointer',
                                            marginTop: '20px',
                                            border: 'none',
                                            background: "white",
                                            color: "#560303",
                                            fontSize: "13px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon /> Preview
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="form-field">
                                <input
                                    type="file"
                                    className='inputField form-control'
                                    name="indemnityBondCopy"
                                    onChange={handleChange}
                                    accept=".pdf/*"
                                    ref={indemnityBondCopy}
                                />
                            </label>
                        )}
                    </label>

                </div>

                <div className='form-row'>
                    <label className="form-field">
                        {(adminResponse === "not requested yet" || adminResponse === null || adminResponse === undefined) && (
                            <>
                                <label className="form-field">
                                    <button style={{ fontSize: "14px", fontWeight: "bold", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} disabled>
                                        Give Feedback
                                    </button>
                                </label>
                                <label className="form-field">
                                    <button style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} disabled>
                                        Commission
                                    </button>
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
                            <div className='form-row'>
                                <button onClick={openfeedbackRatingModal} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                    Give Feedback
                                </button>
                                <button onClick={openCommissionModel} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                    Commission
                                </button>
                                <label className="form-field"></label>
                                <label className="form-field"></label>
                            </div>
                        )}
                    </label>

                </div>
                {isfeedbackRatingModalOpen && (
                    <form className='Customer-master-form' style={{
                        margin: "0px", padding: "10px", background: "#cbcbe5", borderRadius: "10px",
                        boxShadow: "inset -20px -20px 20px 20px rgba(38, 21, 21, 0.1)"
                    }}>
                        <IconButton onClick={closefeedbackRatingModal} style={{ background: "white", float: 'right' }}>
                            <CloseIcon />
                        </IconButton>
                        <p style={{ fontWeight: "bold" }}>How satisfied are you?</p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.feedbackRating || 0}
                            onChange={onfeedbackRatingChange}
                            className="slider"
                            name="feedbackRating"
                            disabled={alreadyRating}
                            style={{ display: 'block', marginTop: '10px' }}
                        />
                        <div style={{ marginBottom: "30px" }}>Satisfied By Customer Response: {formData.feedbackRating}</div>

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
                    </form>
                )}

                {isCommissionModelOpen && (
                    <div className='Customer-master-form' style={{
                        margin: "0px", padding: "10px", background: "#e6efe0", borderRadius: "10px",
                        boxShadow: "inset -20px -20px 20px 20px rgba(38, 21, 21, 0.1)"
                    }}>
                        <IconButton onClick={closeCommisionModel} style={{ background: "white", float: 'right' }}>
                            <CloseIcon />
                        </IconButton>

                        <div style={{ display: "flex" }}>
                            <button onClick={(e) => { e.preventDefault(); paymentBy("cheque"); }} style={{ marginTop: "10px", marginLeft: "10px", padding: '17px 100px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'linear-gradient(to right, lightblue, white)', color: 'blue' }}>
                                Cheque
                            </button>
                            <button onClick={(e) => { e.preventDefault(); paymentBy("onlinePayment"); }} style={{ marginTop: "10px", marginLeft: "10px", padding: '17px 100px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'linear-gradient(to right, lightblue, white)', color: 'blue' }}>
                                Online Payment
                            </button>
                            <button onClick={(e) => { e.preventDefault(); paymentBy("cash"); }} style={{ marginTop: "10px", marginLeft: "10px", padding: '17px 100px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'linear-gradient(to right, lightblue, white)', color: 'blue' }}>
                                Cash
                            </button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            {paymentThrough === "cheque" && (
                                <div>
                                    <p>Your Cheque Image :</p>
                                    {isReadOnlyPayment && typeof formData.cheque === 'string' && formData.cheque.startsWith("https") ? (
                                        <>
                                            <img
                                                src={formData.cheque}
                                                alt="cheque"
                                                style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                                onClick={openChequeModal}
                                            />
                                            <div style={{ display: 'flex' }}>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsReadOnlyPayment(false);
                                                    }}
                                                    style={{ marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}
                                                >
                                                    Change
                                                </button>
                                            </div>

                                            <Modal isOpen={isChequeModalOpen} onRequestClose={closeChequeModal} contentLabel="Open Cheque Modal">
                                                <div className="modal-header">
                                                    <IconButton href={formData.cheque} download color="primary">
                                                        <DownloadIcon />
                                                    </IconButton>
                                                    <IconButton onClick={closeChequeModal} color="secondary">
                                                        <CloseIcon />
                                                    </IconButton>
                                                </div>
                                                <div className="modal-image-container">
                                                    <img src={formData.cheque} alt="Cheque Image" className="modal-image" />
                                                </div>
                                            </Modal>
                                        </>
                                    ) : (
                                        <input
                                            type="file"
                                            name="cheque"
                                            onChange={handleChange}
                                            accept=".pdf/*"
                                            required
                                            className="form-control"
                                            style={{ marginTop: "30px" }}
                                        />
                                    )}
                                </div>
                            )}

                            {paymentThrough === "onlinePayment" && (
                                <div>
                                    <p>Online Payment: (image Of Payment)</p>
                                    {notRequestedLink && (
                                        <div
                                            className="form-control generate-button"
                                            onClick={handlePayment}
                                            style={{
                                                fontSize: "12px",
                                                padding: '10px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                background: 'linear-gradient(to right, lightblue, white)',
                                                color: 'blue'
                                            }}
                                        >
                                            {isLoading ? (
                                                <ClipLoader color="#ffffff" loading={isLoading} />
                                            ) : (
                                                'Payment Request'
                                            )}
                                        </div>
                                    )}
                                    {comingLink && (
                                        <a
                                            href={comingLink}
                                            className="form-control download-link"
                                            style={{
                                                fontSize: "12px",
                                                padding: '10px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                background: 'linear-gradient(to right, lightyellow, white)',
                                                color: 'Green'
                                            }}
                                        >
                                            Pay Now
                                        </a>
                                    )}
                                    {isReadOnlyPayment && typeof formData.onlinePaymentImg === 'string' && formData.onlinePaymentImg.startsWith("https") ? (
                                        <>
                                            <label className="form-field" style={{ marginTop: "30px" }}>
                                                Transaction ID:
                                                <input
                                                    type='text'
                                                    name="transactionId"
                                                    placeholder='Transaction ID'
                                                    value={formData.transactionId}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                    readOnly
                                                />
                                            </label>
                                            <img
                                                src={formData.onlinePaymentImg}
                                                alt="online payment"
                                                style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                                onClick={openOnlinePaymentModal}
                                            />
                                            <div style={{ display: 'flex' }}>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsReadOnlyPayment(false);
                                                    }}
                                                    style={{
                                                        marginTop: "10px",
                                                        marginLeft: "10px",
                                                        border: '1px solid red',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'white',
                                                        color: 'black'
                                                    }}
                                                >
                                                    Change
                                                </button>
                                            </div>
                                            <Modal isOpen={isOnlinePaymentModalOpen} onRequestClose={closeOnlinePaymentModal} contentLabel="Open Online Payment Modal">
                                                <div className="modal-header">
                                                    <IconButton href={formData.onlinePaymentImg} download color="primary">
                                                        <DownloadIcon />
                                                    </IconButton>
                                                    <IconButton onClick={closeOnlinePaymentModal} color="secondary">
                                                        <CloseIcon />
                                                    </IconButton>
                                                </div>
                                                <div className="modal-image-container">
                                                    <img src={formData.onlinePaymentImg} alt="Online Payment Image" className="modal-image" />
                                                </div>
                                            </Modal>
                                        </>
                                    ) : (
                                        <div>
                                            <label className="form-field" style={{ marginTop: "30px" }}>
                                                Transaction ID:
                                                <input
                                                    type='text'
                                                    name="transactionId"
                                                    placeholder='Transaction ID'
                                                    value={formData.transactionId}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </label>
                                            <input
                                                type="file"
                                                name="onlinePaymentImg"
                                                onChange={handleChange}
                                                accept=".pdf/*"
                                                required
                                                className="form-control"
                                                style={{ marginTop: "30px" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {paymentThrough === "cash" && (
                                <div>
                                    <p>Paid By Cash:</p>
                                    {isReadOnlyPayment && formData.paidByCash == true ? (
                                        <>
                                            <label style={{ display: "flex", alignItems: "center" }}>
                                                <input
                                                    type="checkbox"
                                                    name="paidByCash"
                                                    checked={formData.paidByCash}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ marginRight: "10px" }}
                                                />
                                                Paid By Cash
                                            </label>
                                            <div style={{ display: 'flex' }}>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsReadOnlyPayment(false);
                                                    }}
                                                    style={{
                                                        marginTop: "10px",
                                                        marginLeft: "10px",
                                                        border: '1px solid red',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'white',
                                                        color: 'black'
                                                    }}
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <label style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type="checkbox"
                                                name="paidByCash"
                                                checked={formData.paidByCash}
                                                onChange={handleChange}
                                                required
                                                style={{ marginRight: "10px" }}
                                            />
                                            Paid By Cash
                                        </label>
                                    )}
                                </div>
                            )}

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <button onClick={closeCommisionModel} style={{ marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                Save it!!!
                            </button>
                        </div>
                    </div>
                )}

                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}

                <div>
                    <button type="submit"
                        style={{
                            fontSize: "14px",
                            padding: "5px 20px",
                            border: "3px solid lightblue",
                            borderRadius: "4px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            color: "green",
                        }}
                        disabled={isLoading} // Disable button while loading
                        onClick={onSubmit}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    {isLoading && (
                        <div style={{ marginTop: '10px' }}>
                            <ClipLoader color="#4CAF50" loading={isLoading} />
                            <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default UploadDocAdvocate;
