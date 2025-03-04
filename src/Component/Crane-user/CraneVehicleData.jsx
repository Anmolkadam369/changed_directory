import React, { useEffect, useState, useRef } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert, Checkbox } from '@mui/material';
// '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import { ClipLoader } from 'react-spinners';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import feedbackByVendor from '../../Assets/feedbackByVendor.png'
import commissionbyvendor from '../../Assets/commissionbyvendor.png'
import paymentcheck from '../../Assets/payment-check.png'
import onlinepayment from '../../Assets/onlinepayment.png'
import cash from '../../Assets/cash.png'
import list from '../../Assets/list.png'
import imageshowing from '../../Assets/imageshowing.png'
import exploration from '../../Assets/exploration.png'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { Rating } from "react-simple-star-rating";
import checksuccess from '../../Assets/checksuccess.png'

import { CancelOutlined } from '@mui/icons-material';
const modalTitleFontSize = window.innerWidth < 576 ? '1rem' : window.innerWidth < 768 ? '0.9rem' : '1.0rem';
const modalBodyFontSize = window.innerWidth < 576 ? '0.9rem' : window.innerWidth < 768 ? '0.6rem' : '0.9rem';



function CraneVehicleData() {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();

    const handleRating = (rate) => {
        setFormData(prev =>({
            ...prev,
            feedbackRating:rate
        }))
    };
    const { id, item } = location.state || {};
    useEffect(() => {
        console.log("Received ID:", id);
        console.log("Received Item:", item);
    }, [id, item]);

    console.log("Received IDssss:", id);
    let adminResponse = "not requested yet";
    if (item?.details && item?.details?.length > 0) {
        console.log("item.details[0]", item.details[0]);
        console.log("item.details[0].admin", item.details[0].acceptedByAdmin);
        console.log("item.details.length dadf", item.details.length);

        adminResponse = item.details[0].acceptedByAdmin;
    } else {
        console.log("item.details is either undefined or empty");
    }
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    const [parseComingData, setParseComingData] = useState([]);

    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [existingData, setExistingData] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [isChequeModalOpen, setIsChequeModalOpen] = useState(false);
    const [isOnlinePaymentModalOpen, setIsOnlinePaymentModalOpen] = useState(false);

    const [isWorkDone, setIsWorkDone] = useState(false);
    console.log("Isworkdioen", isWorkDone)


    const openChequeModal = (e) => {
        e.preventDefault();
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


    const [showOnlyDocumentUpload, setShowOnlyDocumentUpload] = useState(true)
    const [showUserDetails, setShowUserDetails] = useState(false)
    const [showImages, setShowImages] = useState(false)
    const [isSelected, setIsSelected] = useState("")
    const addBoxes = (addBoxName) => {
        setIsSelected(addBoxName);
        if (addBoxName == 'userDetails') {
            setShowUserDetails(!showUserDetails)
        }
        if (addBoxName == 'Images') {
            setShowImages(!showImages)
        }
    }

    const [formData, setFormData] = useState({
        vehicleInspection: "",
        workEstimate: "",
        recoveryVanEstimate: "",
        vehicleHandover: "",
        advancedPayment: "",
        vehicleTakeOver: "",
        balancePayment: "",
        feedback: "",
        feedbackRating: "",
        commisionAmount: ""
    });
    useEffect(() => {
        setIsWorkDone(Object.values(formData).every((value) => value != ""));
    }, [formData])
    console.log("formData",formData)






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
            setParseComingData(prevFormData => ({
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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAccidentVehicleInfo/${id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
        console.log("getAccidentVehicleInfo", response)
        console.log("getAccidentVehicleInfo", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const getExistingData = async (id, userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendorOnAssignedVehicle/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
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

    useEffect(() => {
        if (existingData) {
            console.log("existing_d---ata", existingData)
            setFormData({
                vehicleInspection: existingData.vehicleInspection || "",
                workEstimate: existingData.workEstimate || "",
                recoveryVanEstimate: existingData.recoveryVanEstimate || "",
                vehicleHandover: existingData.vehicleHandover || "",
                advancedPayment: existingData.advancedPayment || "",
                vehicleTakeOver: existingData.vehicleTakeOver || "",
                balancePayment: existingData.balancePayment || "",
                feedback: existingData.feedback || "",
                feedbackRating: existingData.feedbackRating || "",
                commisionAmount: existingData.commisionAmount || ""
            });
        }
    }, [existingData]);
    console.log("FORM_DD_DA", formData)
    console.log("exis__________tingData", existingData)


    const onlinePaymentRef = useRef(null);
    const chequeRef = useRef(null);

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    onlinePaymentImg: onlinePaymentRef,
                    cheque: chequeRef,
                };

                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }

                setFormData(prevState => ({
                    ...prevState,
                    [name]: null
                }));
                return;
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else if (type === "checkbox") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('formData', formData, id, userId);
        try {
            const formDataObj = new FormData();
            for (const key in formData) {
                if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
                    if (formData[key] instanceof File) {
                        formDataObj.append(key, formData[key], formData[key].name);
                    } else {
                        formDataObj.append(key, formData[key]);
                    }
                }
            }

            for (let pair of formDataObj.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/vendorOnAssignedVehicle/${id}/${userId}/${item.assignedBy}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("response", response.data);
            if (response.data.status === true) {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
                    navigate("/crane-user-all-cases")
                }, (2000));

            } else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Error response:', error.response);
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
    };



    const [feedbackRating, setfeedbackRating] = useState(null);
    const [isfeedbackRatingModalOpen, setIsfeedbackRatingModalOpen] = useState(false);
    const [isCommissionModelOpen, setIsCommissionModelOpen] = useState(false);
    let [paymentThrough, setPaymentThrough] = useState("");
    console.log("paymentThrgesh", paymentThrough)

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

    const savefeedbackRatingModal = (e) => {
        e.preventDefault()
        setIsfeedbackRatingModalOpen(false);
    };

    const closefeedbackRatingModal = (e) => {
        e.preventDefault()
        setFormData((prevFormData) => ({
            ...prevFormData,
            feedbackRating: "",
            feedback: ""
        }))
        setIsfeedbackRatingModalOpen(false);
    };


    const saveCommisionModel = (e) => {
        e.preventDefault()
        setIsCommissionModelOpen(false);
    };
    const closeCommisionModel = (e) => {
        e.preventDefault()
        setFormData((prevFormData) => ({
            ...prevFormData,
            paidByCash: "",
            cheque: "",
            onlinePaymentImg: "",
            transactionId: ""
        }))
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
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/createLinkForPayment/${id}`);
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
    const [showSideImage, setShowSideImage] = useState(false)
    const [workDoneResponse, setWorkDoneResponse] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 986) {
                setShowSideImage(false)
            } else {
                setShowSideImage(true)

            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const workDone = async () => {
        try {
            let response = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/VendorWorkDone/${userId}/${item.AccidentVehicleCode}`, {
                method: 'PUT',
                headers: {
                    Authorization:  `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                console.log("updated successfully")
                setWorkDoneResponse(true)
                setTimeout(() => {
                    navigate("/crane-user-all-cases")
                }, (60000));
            }
            else console.log("there is some issue")

        }
        catch (error) {
            console.log("the error occured", error.message)
        }
    }


    return (
        <div >

            <div style={{ display: "flex", justifyContent: "right" }}>
                <div class="btn btn-primary" style={{ backgroundColor: isSelected == "userDetails" ? '#00000074' : 'rgb(33 0 255)', border: "1px solid black", color: "white", padding: "10px 20px", margin: "30px 20px 50px 30px" }}>
                    <p style={{ color: 'white', fontSize: "14px" }}
                        onClick={() => { addBoxes('userDetails') }}
                    >
                        User Details <img style={{ height: "15px", width: "15px" }} src={list} />
                    </p>
                </div>
                <div class="btn btn-primary" style={{ backgroundColor: isSelected == "Images" ? '#00000074' : 'rgb(33 0 255)', border: "1px solid black", color: "white", padding: "10px 20px", margin: "30px 20px 50px 0px" }}>
                    <p style={{ color: 'white', fontSize: "14px" }}
                        onClick={() => { addBoxes('Images') }}
                    >
                        View Images <img style={{ height: "15px", width: "15px" }} src={imageshowing} />
                    </p>
                </div>

            </div>

            {showUserDetails && (<form style={{ boxShadow: "0px 0px 10px 0px black", margin: "10px", marginBottom: "50px", padding: "15px" }} className='Customer-master-form'>

                <Helmet>
                    <title>Accident Data Added By Crane - Claimpro</title>
                    <meta name="description" content="Accident Data By Crane." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/AddedDataByCrane`} />
                </Helmet>
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <h2 className='bigtitle'>User Details <img style={{ height: "20px", width: "20px" }} src={list} /> </h2>
                </div>

                <div className='form-row'>

                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        Users Name:
                        <input
                            type="text"
                            name="CustomerName"
                            className='inputField form-control'
                            value={parseComingData.CustomerName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        Choosen Plan:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="choosenPlan"
                            value={parseComingData.choosenPlan}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        Chasis No:
                        <input
                            type="text"
                            name="chassisNo"
                            className='inputField form-control'
                            value={parseComingData.chassisNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        Engine No:
                        <input
                            type="text"
                            name="engineNo"
                            className='inputField form-control'
                            value={parseComingData.engineNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        Make:
                        <input
                            type="text"
                            name="make"
                            className='inputField form-control'
                            value={parseComingData.make}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className='form-row' >


                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        latitude:
                        <input
                            type="text"
                            name="latitude"
                            className='inputField form-control'
                            value={parseComingData.latitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        Longitude:
                        <input
                            type="text"
                            className='inputField form-control'
                            name="longitude"
                            value={parseComingData.longitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        accidentFileNo:
                        <input
                            type="text"
                            name="accidentFileNo"
                            className='inputField form-control'
                            value={parseComingData.accidentFileNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field" style={{ flex: "1 1 11%" }}>
                        model:
                        <input
                            type="text"
                            name="model"
                            className='inputField form-control'
                            value={parseComingData.model}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ flex: "1 1 11%" }}></label>
                </div>


            </form>)}

            {showImages && (
                <form style={{ boxShadow: "0px 0px 10px 0px black", margin: "10px", marginBottom: "50px", padding: "15px" }} className='Customer-master-form'>
                    <div class='header-container'>
                        <h2 className='bigtitle'>Accident Images</h2><img style={{ height: "20px", width: "20px", margin: "20px" }} src={imageshowing} />
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
                </form>)}

            {showOnlyDocumentUpload && (

                <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <form style={{ maxWidth: "600px", flexGrow: 1, boxShadow: "0px 0px 10px 0px black", margin: "10px", marginBottom: "100px", padding: "15px" }} className='Customer-master-form'>

                        <div class='header-container'>
                            <h2 className='bigtitle' style={{ marginBottom: "0px", marginLeft: "0px" }}>Document Upload - Crane</h2>
                        </div>

                        <div className='form-row' style={{ flexDirection: "column" }}>
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

                        <div className='form-row' style={{ flexDirection: "column" }}>

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
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <label className="form-field" style={{ flex: 1, marginRight: "10px" }}>
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
                                {formData.advancedPayment != "" && formData.balancePayment != "" && (
                                    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <button onClick={openfeedbackRatingModal} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "10px 20px",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            backgroundColor: "white",
                                            color: "black",
                                            border: "1px solid black",
                                        }}>
                                            <img src={feedbackByVendor} style={{ height: "20px", width: "20px", marginRight: "8px" }} alt="feedback" /> <p> Give Feedback </p>
                                        </button>
                                    </div>
                                )}
                            </div>
                           
                                <p style={{
                                    fontSize: '11px',
                                    marginTop: "2px",
                                    background: "#ff0000",
                                    padding: "10px",
                                    border: '1px solid blue',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: "white",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    position: "relative",
                                    cursor: "pointer",
                                    margin: '5px 5px 5px 5px',
                                    maxWidth: "400px",
                                    minWidth: "140px",
                                }} onClick={workDone} >
                                   {workDoneResponse && ( <img src={checksuccess} style={{
                                        height:"23px", width:"23px",
                                        position: "absolute",
                                        right: '10px'
                                    }} />)}
                                    Work Done
                                </p>
                        </div>

                        {/* {formData.advancedPayment && formData.balancePayment && formData.paidOn == null && (
                            <div style={{ color: 'green' }}>
                                <p>
                                    * Calculated Commission For The Vendor is = ₹ {(parseFloat(formData.advancedPayment) + parseFloat(formData.balancePayment)) * 2 / 100}
                                </p>
                            </div>
                        )} */}
                        {formData.paidOn && (
                            <div style={{ color: 'green' }}>Commission Paid On : {formData.paidOn}</div>
                        )}




                        {isfeedbackRatingModalOpen && (
                            // <form className='Customer-master-form' style={{
                            //     margin: "0px", padding: "10px", background: "rgb(229 229 231)", borderRadius: "10px",
                            //     boxShadow: "inset -20px -20px 20px 20px rgba(38, 21, 21, 0.1)"
                            // }}>
                            //     <IconButton onClick={closefeedbackRatingModal} style={{ background: "white", float: 'right' }}>
                            //         <CloseIcon />
                            //     </IconButton>
                            //     <p style={{ fontWeight: "bold" }}>How satisfied are you?</p>
                            //     <input
                            //         type="range"
                            //         min="0"
                            //         max="100"
                            //         value={formData.feedbackRating || 0}
                            //         onChange={onfeedbackRatingChange}
                            //         className="slider"
                            //         name="feedbackRating"
                            //         disabled={alreadyRating}
                            //         style={{ display: 'block', marginTop: '10px' }}
                            //     />
                            //     <div style={{ marginBottom: "30px" }}>Satisfied By Customer Response: {formData.feedbackRating}</div>

                            //     <label className="form-field">
                            //         Feedback:
                            //         <textarea
                            //             name="feedback"
                            //             className="inputField form-control"
                            //             value={formData.feedback}
                            //             onChange={handleChange}
                            //             readOnly={!!existingData?.feedback}
                            //         />
                            //     </label>
                            // </form>

                            <div className="modal fade show" style={{ display: 'block', minWidth: "350px", maxWidth: "1000px", background: "#ffecec00", boxShadow: "none" }} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" >
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content" style={{ backgroundSize: 'cover', backgroundPosition: "top", background: "white" }}>
                                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px' }}>
                                            <h5 className="modal-title" id="exampleModalLongTitle" style={{ borderRadius: "10px", color: 'black', fontWeight: 'bold', fontSize: modalTitleFontSize, animation: 'blinking 1.5s infinite', padding: "0px", marginBottom:"20px" }}>
                                                Rate Customer Behaviour
                                            </h5>

                                        </div>

                                        <div className="modal-body" style={{ textAlign: 'center', color: "black", fontSize: modalBodyFontSize, padding: '1px', fontWeight: "bold" }}>
                                            <div style={{display:'flex', justifyContent:"space-between"}}>
                                            <Rating
                                                onClick={handleRating}
                                                ratingValue={formData.feedbackRating} // Convert to scale of 0-100
                                                size={25}
                                                allowHalfIcon
                                                fillColor="orange"
                                                emptyColor="gray"
                                                readonly={existingData.feedbackRating !== null}
                                            />
                                                <div style={{
                                                    marginTop:"7px",
                                                    color: formData.feedbackRating < 1.00 ? 'red' :
                                                        formData.feedbackRating < 3.00 ? 'blue' : 'green'
                                                }}>
                                                    {formData.feedbackRating == 0.00 ?  ` 0 😒 `: formData.feedbackRating < 1.00 ? `${formData.feedbackRating} 😒` : formData.feedbackRating < 3.00 ? `${formData.feedbackRating} 😊` : `${formData.feedbackRating} 😃`}
                                                </div>
                                                </div>

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

                                        </div>
                                        <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
                                            <button type="button" onClick={savefeedbackRatingModal} className="btn btn-secondary" style={{ color: "white", background: "teal", padding: '3px 10px', fontSize: modalBodyFontSize }}>
                                                Save
                                            </button>
                                            <button type="button" onClick={closefeedbackRatingModal} className="btn btn-primary" style={{ color: "white", background: "#ca8787", padding: '3px 10px', fontSize: modalBodyFontSize }}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isCommissionModelOpen && (
                            // <div className='Customer-master-form' style={{
                            //     margin: "0px", padding: "10px", background: "#e6efe0", borderRadius: "10px",
                            //     boxShadow: "inset -20px -20px 20px 20px rgba(38, 21, 21, 0.1)"
                            // }}>
                            //     <IconButton onClick={closeCommisionModel} style={{ background: "white", float: 'right' }}>
                            //         <CloseIcon />
                            //     </IconButton>


                            //     <div style={{ display: "flex", gap: '5px', marginTop: "50px" }}>
                            //         <button onClick={(e) => { e.preventDefault(); paymentBy("cheque"); }} style={{
                            //             fontSize: "12px",
                            //             padding: '10px 10px',
                            //             borderRadius: '4px',
                            //             cursor: 'pointer',
                            //             background: 'linear-gradient(to right, lightblue, white)',
                            //             color: 'blue'
                            //         }}>
                            //             Cheque
                            //         </button>
                            //         <button onClick={(e) => { e.preventDefault(); paymentBy("onlinePayment"); }} style={{
                            //             fontSize: "12px",
                            //             padding: '10px 10px',
                            //             borderRadius: '4px',
                            //             cursor: 'pointer',
                            //             background: 'linear-gradient(to right, lightblue, white)',
                            //             color: 'blue'
                            //         }}>
                            //             Online Payment
                            //         </button>
                            //         <button onClick={(e) => { e.preventDefault(); paymentBy("cash"); }} style={{
                            //             fontSize: "12px",
                            //             padding: '10px 10px',
                            //             borderRadius: '4px',
                            //             cursor: 'pointer',
                            //             background: 'linear-gradient(to right, lightblue, white)',
                            //             color: 'blue'
                            //         }}>
                            //             Cash
                            //         </button>
                            //     </div>
                            //     <div style={{ marginTop: "20px" }}>
                            //         {paymentThrough === "cheque" && (
                            //             <div>
                            //                 <p>Your Cheque Image :</p>
                            //                 {isReadOnlyPayment && typeof formData.cheque === 'string' && formData.cheque.startsWith("https") ? (
                            //                     <>
                            //                         <img
                            //                             src={formData.cheque}
                            //                             alt="cheque"
                            //                             style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                            //                             onClick={openChequeModal}
                            //                         />
                            //                         <div style={{ display: 'flex' }}>
                            //                             <button
                            //                                 onClick={(e) => {
                            //                                     e.preventDefault();
                            //                                     setIsReadOnlyPayment(false);
                            //                                 }}
                            //                                 style={{ marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}
                            //                             >
                            //                                 Change
                            //                             </button>
                            //                         </div>

                            //                         <Modal isOpen={isChequeModalOpen} onRequestClose={closeChequeModal} contentLabel="Open Cheque Modal">
                            //                             <div className="modal-header">
                            //                                 <IconButton href={formData.cheque} download color="primary">
                            //                                     <DownloadIcon />
                            //                                 </IconButton>
                            //                                 <IconButton onClick={closeChequeModal} color="secondary">
                            //                                     <CloseIcon />
                            //                                 </IconButton>
                            //                             </div>
                            //                             <div className="modal-image-container">
                            //                                 <img src={formData.cheque} alt="Cheque Image" className="modal-image" />
                            //                             </div>
                            //                         </Modal>
                            //                     </>
                            //                 ) : (
                            //                     <input
                            //                         type="file"
                            //                         name="cheque"
                            //                         onChange={handleChange}
                            //                         accept=".pdf,image/*"
                            //                         required
                            //                         className="form-control"
                            //                         style={{ marginTop: "30px" }}
                            //                     />
                            //                 )}
                            //             </div>
                            //         )}

                            //         {paymentThrough === "onlinePayment" && (
                            //             <div>
                            //                 <p>Online Payment: (Image)</p>

                            //                 {notRequestedLink && (
                            //                     <div
                            //                         className="form-control generate-button"
                            //                         onClick={handlePayment}
                            //                         style={{
                            //                             fontSize: "12px",
                            //                             padding: '10px 10px',
                            //                             borderRadius: '4px',
                            //                             cursor: 'pointer',
                            //                             background: 'linear-gradient(to right, lightblue, white)',
                            //                             color: 'blue'
                            //                         }}
                            //                     >
                            //                         {isLoading ? (
                            //                             <ClipLoader color="#ffffff" loading={isLoading} />
                            //                         ) : (
                            //                             'Payment Request'
                            //                         )}
                            //                     </div>
                            //                 )}
                            //                 {comingLink && (
                            //                     <a
                            //                         href={comingLink}
                            //                         className="form-control download-link"
                            //                         style={{
                            //                             fontSize: "12px",
                            //                             padding: '10px 10px',
                            //                             borderRadius: '4px',
                            //                             cursor: 'pointer',
                            //                             background: 'linear-gradient(to right, lightyellow, white)',
                            //                             color: 'Green'
                            //                         }}
                            //                     >
                            //                         Pay Now
                            //                     </a>
                            //                 )}
                            //                 {isReadOnlyPayment && typeof formData.onlinePaymentImg === 'string' && formData.onlinePaymentImg.startsWith("https") ? (
                            //                     <>
                            //                         <label className="form-field" style={{ marginTop: "30px" }}>
                            //                             Transaction ID:
                            //                             <input
                            //                                 type='text'
                            //                                 name="transactionId"
                            //                                 placeholder='Transaction ID'
                            //                                 value={formData.transactionId}
                            //                                 onChange={handleChange}
                            //                                 className="form-control"
                            //                                 required
                            //                                 readOnly
                            //                             />
                            //                         </label>
                            //                         <img
                            //                             src={formData.onlinePaymentImg}
                            //                             alt="online payment"
                            //                             style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                            //                             onClick={openOnlinePaymentModal}
                            //                         />
                            //                         <div style={{ display: 'flex' }}>
                            //                             <button
                            //                                 onClick={(e) => {
                            //                                     e.preventDefault();
                            //                                     setIsReadOnlyPayment(false);
                            //                                 }}
                            //                                 style={{
                            //                                     marginTop: "10px",
                            //                                     marginLeft: "10px",
                            //                                     border: '1px solid red',
                            //                                     borderRadius: '4px',
                            //                                     cursor: 'pointer',
                            //                                     backgroundColor: 'white',
                            //                                     color: 'black'
                            //                                 }}
                            //                             >
                            //                                 Change
                            //                             </button>
                            //                         </div>
                            //                         <Modal isOpen={isOnlinePaymentModalOpen} onRequestClose={closeOnlinePaymentModal} contentLabel="Open Online Payment Modal">
                            //                             <div className="modal-header">
                            //                                 <IconButton href={formData.onlinePaymentImg} download color="primary">
                            //                                     <DownloadIcon />
                            //                                 </IconButton>
                            //                                 <IconButton onClick={closeOnlinePaymentModal} color="secondary">
                            //                                     <CloseIcon />
                            //                                 </IconButton>
                            //                             </div>
                            //                             <div className="modal-image-container">
                            //                                 <img src={formData.onlinePaymentImg} alt="Online Payment Image" className="modal-image" />
                            //                             </div>
                            //                         </Modal>
                            //                     </>
                            //                 ) : (
                            //                     <div>
                            //                         <label className="form-field" style={{ marginTop: "30px" }}>
                            //                             Transaction ID:
                            //                             <input
                            //                                 type='text'
                            //                                 name="transactionId"
                            //                                 placeholder='Transaction ID'
                            //                                 value={formData.transactionId}
                            //                                 onChange={handleChange}
                            //                                 className="form-control"
                            //                                 required
                            //                             />
                            //                         </label>
                            //                         <input
                            //                             type="file"
                            //                             name="onlinePaymentImg"
                            //                             onChange={handleChange}
                            //                             accept=".pdf,image/*"
                            //                             required
                            //                             className="form-control"
                            //                             style={{ marginTop: "30px" }}
                            //                         />
                            //                     </div>
                            //                 )}
                            //             </div>
                            //         )}

                            //         {paymentThrough === "cash" && (
                            //             <div>
                            //                 <p>Paid By Cash:</p>
                            //                 {isReadOnlyPayment && formData.paidByCash == true ? (
                            //                     <>
                            //                         <label style={{ display: "flex", alignItems: "center" }}>
                            //                             <input
                            //                                 type="checkbox"
                            //                                 name="paidByCash"
                            //                                 checked={formData.paidByCash}
                            //                                 onChange={handleChange}
                            //                                 required
                            //                                 style={{ marginRight: "10px" }}
                            //                             />
                            //                             Paid By Cash
                            //                         </label>
                            //                         <div style={{ display: 'flex' }}>
                            //                             <button
                            //                                 onClick={(e) => {
                            //                                     e.preventDefault();
                            //                                     setIsReadOnlyPayment(false);
                            //                                 }}
                            //                                 style={{
                            //                                     marginTop: "10px",
                            //                                     marginLeft: "10px",
                            //                                     border: '1px solid red',
                            //                                     borderRadius: '4px',
                            //                                     cursor: 'pointer',
                            //                                     backgroundColor: 'white',
                            //                                     color: 'black'
                            //                                 }}
                            //                             >
                            //                                 Change
                            //                             </button>
                            //                         </div>
                            //                     </>
                            //                 ) : (
                            //                     <label style={{ display: "flex", alignItems: "center" }}>
                            //                         <input
                            //                             type="checkbox"
                            //                             name="paidByCash"
                            //                             checked={formData.paidByCash}
                            //                             onChange={handleChange}
                            //                             required
                            //                             style={{ marginRight: "10px" }}
                            //                         />
                            //                         Paid By Cash
                            //                     </label>
                            //                 )}
                            //             </div>
                            //         )}

                            //     </div>

                            //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            //         <button onClick={closeCommisionModel} style={{ marginTop: "10px", marginLeft: "10px", border: '3px solid lightgreen', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black', fontSize: '11px', fontWeight: "bold" }}>
                            //             Save
                            //         </button>
                            //     </div>
                            // </div>

                            <div>
                                <div className="modal fade show" style={{ display: 'block', minWidth: "350px", maxWidth: "1000px", background: "#ffecec00", boxShadow: "none" }} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" >
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content" style={{ backgroundSize: 'cover', backgroundPosition: "top" }}>
                                            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h5 className="modal-title" id="exampleModalLongTitle" style={{ paddingLeft: "10px", borderRadius: "10px", color: 'black', fontWeight: 'bold', fontSize: modalTitleFontSize, animation: 'blinking 1.5s infinite' }}>
                                                    Commission
                                                    <ul style={{ gap: "10px" }} className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                // className={`nav-link ${paymentThrough === "cheque" ? "active" : ""}`}
                                                                // id="tab-login"
                                                                // href="#pills-login"
                                                                role="tab"
                                                                aria-controls="pills-login"
                                                                aria-selected={paymentThrough === "cheque"}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    paymentBy("cheque")
                                                                }}>
                                                                <img src={paymentcheck} style={{ height: "20px", width: "20px" }} alt="paymentcheck" /> <p style={{ fontSize: "9px" }}>By Cheque</p>
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button
                                                                // className={`nav-link ${paymentThrough === "onlinePayment" ? "active" : ""}`}
                                                                // id="tab-register"
                                                                // href="#pills-register"
                                                                role="tab"
                                                                aria-controls="pills-register"
                                                                aria-selected={paymentThrough === "onlinePayment"}
                                                                onClick={() => paymentBy("onlinePayment")}
                                                            >
                                                                <img src={onlinepayment} style={{ height: "20px", width: "20px" }} alt="paymentcheck" /> <p style={{ fontSize: "9px" }}>Online</p>

                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <div style={{ padding: "10px 20px", borderRadius: "4px", background: '#cccccc', transition: "background-color 0.3s", marginTop: "15px", cursor: "pointer" }}
                                                                // className={`nav-link ${paymentThrough === "cash" ? "active" : ""}`}
                                                                // id="tab-register"
                                                                // href="#pills-register"
                                                                role="tab"
                                                                aria-controls="pills-register"
                                                                aria-selected={paymentThrough === "cash"}
                                                                onClick={() => paymentBy("cash")}
                                                            >

                                                                <img src={cash} style={{ height: "20px", width: "20px" }} alt="cash" /> <p style={{ fontSize: "9px" }}>By Cash</p>

                                                            </div>
                                                        </li>
                                                    </ul>
                                                </h5>

                                            </div>

                                            <div className="modal-body" style={{ textAlign: 'center', color: "black", fontSize: modalBodyFontSize, padding: '20px', fontWeight: "bold" }}>
                                                <div className="tab-content">
                                                    {paymentThrough === "cheque" && (
                                                        <div>
                                                            <p>Your Cheque Image :</p>
                                                            {isReadOnlyPayment && typeof formData.cheque === 'string' && formData.cheque.startsWith("https") ? (
                                                                <div>
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
                                                                </div>
                                                            ) : (
                                                                <input
                                                                    type="file"
                                                                    name="cheque"
                                                                    onChange={handleChange}
                                                                    accept=".pdf,image/*"
                                                                    required
                                                                    className="form-control"
                                                                    style={{ marginTop: "30px" }}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='tab-content'>
                                                    {paymentThrough === "onlinePayment" && (
                                                        <div>
                                                            <p>Payment Request</p>

                                                            {notRequestedLink && (
                                                                <div
                                                                    className="form-control generate-button"
                                                                    onClick={handlePayment}
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        padding: '10px 10px',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer',
                                                                        background: 'lightgreen',
                                                                        color: 'blue'
                                                                    }}
                                                                >
                                                                    {isLoading ? (
                                                                        <ClipLoader color="#ffffff" loading={isLoading} />
                                                                    ) : (
                                                                        <>
                                                                            Payment Request <img src={paymentcheck} style={{ height: "20px", width: "20px" }} alt="paymentcheck" />
                                                                        </>
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
                                                                        accept=".pdf,image/*"
                                                                        required
                                                                        className="form-control"
                                                                        style={{ marginTop: "30px" }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                </div>
                                                <div className='tab-content'>
                                                    {paymentThrough === "cash" && (
                                                        <div>
                                                            <p>Paid By Cash:</p>
                                                            {isReadOnlyPayment && formData.paidByCash == true ? (
                                                                <>
                                                                    <label s style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        backgroundColor: "#f9f9f9",
                                                                        padding: "10px 15px",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #ccc",
                                                                        cursor: "pointer",
                                                                        fontWeight: "500",
                                                                        color: "#333",
                                                                        transition: "background-color 0.3s ease",
                                                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                                                    }}>

                                                                        <input
                                                                            type="checkbox"
                                                                            name="paidByCash"
                                                                            checked={formData.paidByCash}
                                                                            onChange={handleChange}
                                                                            required
                                                                            style={{ marginRight: "10px" }}
                                                                        />
                                                                        <p style={{ marginTop: "10px" }}>Paid By Cash</p>
                                                                    </label>

                                                                </>
                                                            ) : (
                                                                <label
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        backgroundColor: "#f9f9f9",
                                                                        padding: "10px 15px",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #ccc",
                                                                        cursor: "pointer",
                                                                        fontWeight: "500",
                                                                        color: "#333",
                                                                        transition: "background-color 0.3s ease",
                                                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                                                    }}
                                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eaeaea")}
                                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        name="paidByCash"
                                                                        checked={formData.paidByCash}
                                                                        onChange={handleChange}
                                                                        required
                                                                        style={{
                                                                            marginRight: "10px",
                                                                            width: "20px",
                                                                            height: "20px",
                                                                            accentColor: "#4CAF50"
                                                                        }}
                                                                    />
                                                                    <p style={{ marginTop: "10px" }}>Paid By Cash</p>
                                                                </label>

                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
                                                <button type="button" onClick={saveCommisionModel} className="btn btn-secondary" style={{ color: "white", background: "teal", padding: '3px 10px', fontSize: modalBodyFontSize }}>
                                                    Save
                                                </button>
                                                <button type="button" onClick={closeCommisionModel} className="btn btn-primary" style={{ color: "white", background: "#ca8787", padding: '3px 10px', fontSize: modalBodyFontSize }}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
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
                                    fontSize: '11px',
                                    marginTop: "2px",
                                    background: "lightgreen",
                                    padding: "10px 150px",
                                    border: '1px solid blue',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: "white",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    position: "relative",
                                    cursor: "pointer",
                                    margin: '5px 5px 5px 5px',
                                    maxWidth: "400px",
                                    minWidth: "140px",
                                }}

                                disabled={isLoading} // Disable button while loading
                                onClick={onSubmit}
                            >
                                <KeyboardDoubleArrowLeftIcon style={{
                                    position: "absolute",
                                    right: '10px',
                                    color: "black"
                                }} />
                                <p style={{ color: "bkack" }}>{isLoading ? 'Submitting...' : 'Submit'}</p>
                            </button>
                            {isLoading && (
                                <div style={{ marginTop: '10px' }}>
                                    <ClipLoader color="#4CAF50" loading={isLoading} />
                                    <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                                </div>
                            )}
                        </div>
                    </form>
                    {showSideImage && (
                        <img style={{ height: "auto", width: "30%", borderRadius: '8px', boxShadow: "0 4px 15px rgba(0,0,0,0.3)", filter: "blur(1px)" }} src={exploration} />
                    )}
                </div>
            )}

        </div>
    );
}

export default CraneVehicleData;
