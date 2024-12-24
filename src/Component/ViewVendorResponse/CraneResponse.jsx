
import React, { useEffect, useState , useRef, useId} from 'react';
import './vendorResponse.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import ActivationModel from '../Visitors/ActivationModel';
import { ClipLoader } from 'react-spinners'; //added
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
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import exploration from '../../Assets/exploration.png'
const modalTitleFontSize = window.innerWidth < 576 ? '1rem' : window.innerWidth < 768 ? '0.9rem' : '1.0rem';
const modalBodyFontSize = window.innerWidth < 576 ? '0.9rem' : window.innerWidth < 768 ? '0.6rem' : '0.9rem';




function CraneResponse({ data, onUpdate }) {
    console.log("DATA IS HERE BUDDY", data)
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [action, setAction] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [fullInfomation, setFullInfomation] = useState(false); //added
    const [comingLink, setComingLink] = useState("");  //added
    const [isLoading, setIsLoading] = useState(false);   //added
    const [marginLeft, setMarginLeft] = useState('30px');
    const [padding, setPaddingLeft] = useState('30px');
    const [width, setWidth] = useState('100%');

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


    const openModal = (item) => {
        setModalData(item);
        setModalOpen(true);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleConfirm = async () => {
        setModalOpen(false);
        await onSubmit(modalData.action);
    };




    const [isReadOnlyPayment, setIsReadOnlyPayment] = useState(true)
    const [feedbackRating, setfeedbackRating] = useState(null);
    const [isfeedbackRatingModalOpen, setIsfeedbackRatingModalOpen] = useState(false);
    const [isCommissionModelOpen, setIsCommissionModelOpen] = useState(false);
    let [paymentThrough, setPaymentThrough] = useState("");
    console.log("paymentThrgesh", paymentThrough)
    const [isChequeModalOpen, setIsChequeModalOpen] = useState(false);
    const [isOnlinePaymentModalOpen, setIsOnlinePaymentModalOpen] = useState(false);

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




    const [alreadyRating, setAlreadyRating] = useState(false);
    const paymentBy = (value) => {
        setPaymentThrough(value);
    }
    // Initially set formData from location state if available
    console.log("mydata is her", data)
    const[firstlyCameData, setFirstlyCameData]= useState([data[0]])
    const initialData = data || {
        advancedPayment: data[0].advancedPayment || "",
        balancePayment: data[0].balancePayment || "",
        recoveryVanEstimate: data[0].recoveryVanEstimate || "",
        vehicleHandover: data[0].vehicleHandover || "",
        vehicleInspection: data[0].vehicleInspection || "",
        feedback: data[0].feedback || "",
        vehicleTakeOver: data[0].vehicleTakeOver || "",
        workEstimate: data[0].workEstimate || "",
        reasonOfReject: data[0].reasonOfReject || "",
        feedbackRating: data[0].feedbackRating || "",
        commisionAmount: data[0].commisionAmount || "",
        charges : data[0].charges || ""
    };
    const [formData, setFormData] = useState(initialData[0]);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    // Redirect if no valid token or userId
    useEffect(() => {
        if (!token || !userId) {
            navigate("/");
        }
        if (formData.advancedPayment !== '' && formData.balancePayment !== '' && formData.recoveryVanEstimate !== '' &&
            formData.vehicleHandover !== '' && formData.vehicleInspection !== '' && formData.feedback !== '' &&
            formData.vehicleTakeOver !== '' && formData.workEstimate !== '')
            setFullInfomation(true);
    }, [token, userId, navigate]);

    // Effect for debugging and watching formData
    useEffect(() => {
        console.log('formData updated:', formData[0]);
    }, [formData]);

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
        try {
            console.log(`Action is: ${action}`);
            console.log('Submitting with action:', action, formData.AccidentVehicleCode, formData.VendorCode);
            const response = await axios.put(`${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}/${formData.commisionAmount}/crane`);
            if (response.data.message === "send successfully !!!.") {
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


    const changesSubmit = async(event)=>{
        event.preventDefault();
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
            console.log("299")
            console.log("firstlyCame Data", firstlyCameData[0].AccidentVehicleCode)
            console.log( `${backendUrl}/api/vendorOnAssignedVehicle/admin`)
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/adminOnAssignedVehicle/${firstlyCameData[0].AccidentVehicleCode}/${userId}/${firstlyCameData[0].VendorCode}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("response", response.data);
            if (response.data.status === true) {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

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
    }
    const handlePayment = async () => {  // added
        console.log("crane1231432", data[0].crane) //added
        const id = data[0].crane;// added
        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/createLinkForPayment/${userId}/${id}`);
            console.log("handlepayment", response.data)
            if (response.data.message === "successfully created") {
                setFullInfomation(false)
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

    const handleBack = () => {
        // navigate("../Admin")
        onUpdate()
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 630) {
                setMarginLeft('10px');
                setPaddingLeft('15px');
                setWidth('100%');
            } else {
                setMarginLeft('10px');
                setPaddingLeft('30px');
                setWidth('100%');
            }
        };
        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showSideImage, setShowSideImage] = useState(false)
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

    const agoda = parseInt(formData.advancedPayment)
    console.log("advantedfadsfasdfasdfasfd", typeof (agoda))

    const [comingLinkHere, setComingLinkHere] = useState("");
    const getPaymentLink = async (item) => {
        try {
            console.log(`${backendUrl}/api/sendPaymentLinkToVendor/${userId}/${formData.AccidentVehicleCode}/${formData.VendorCode}`)
            const response = await axios.get(`${backendUrl}/api/sendPaymentLinkToVendor/${userId}/${formData.AccidentVehicleCode}/${formData.VendorCode}`);
            if (response.data.status == true) {
                let link = response.data.data;
                console.log("link coming", link)
                setComingLinkHere(link)
            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }
    const getPaymentLinkPage = () => {
        console.log("comingLink", comingLinkHere)
        navigate(`${comingLinkHere}`, {
            state: {
                accidentVehicleCode: formData.AccidentVehicleCode,
                vendorCode: formData.VendorCode,
                vendorType: 'crane',
            }
        })
    }



    return (
        <form className="customer-response-form" style={{ marginBottom: "50px" }}>
            <Helmet>
                <title>Crane Responses For Accident Vehicles - Claimpro</title>
                <meta name="description" content="Crane Responses For Accident Vehicles for Bvc ClaimPro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/CraneResponse`} />
            </Helmet>


            <form className="customer-response-form" style={{ background: "white",border:"1px solid blue",borderRadius:"10px", marginLeft, padding, width }}>
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <h2 className='bigtitle'>Accident Images</h2>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Chassis Number:
                        {formData.ChassisNoView ? (
                            <>
                                <img
                                    src={formData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openChassisModal}
                                />
                                <Modal isOpen={isChassisModalOpen} onRequestClose={closeChassisModal} contentLabel="Chassis Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.ChassisNoView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeChassisModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.ChassisNoView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                        {formData.ClusterView ? (
                            <>
                                <img
                                    src={formData.ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openClusterModal}
                                />
                                <Modal isOpen={isClusterModalOpen} onRequestClose={closeClusterModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.ClusterView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeClusterModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.ClusterView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                        {formData.frontLH ? (
                            <>
                                <img
                                    src={formData.frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openFrontLHModal}
                                />
                                <Modal isOpen={isFrontLHModalOpen} onRequestClose={closeFrontLHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.frontLH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontLHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.frontLH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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

                </div>

                <div className="form-row">
                    <label className="form-field">
                        frontRH:
                        {formData.frontRH ? (
                            <>
                                <img
                                    src={formData.frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openFrontRHModal}
                                />
                                <Modal isOpen={isFrontRHModalOpen} onRequestClose={closeFrontRHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.frontRH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontRHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.frontRH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                        {formData.frontView ? (
                            <>
                                <img
                                    src={formData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openFrontViewModal}
                                />
                                <Modal isOpen={isFrontViewModalOpen} onRequestClose={closeFrontViewModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.frontView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontViewModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.frontView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                        {formData.rearLH ? (
                            <>
                                <img
                                    src={formData.rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openRearLHModal}
                                />
                                <Modal isOpen={isRearLHModalOpen} onRequestClose={closeRearLHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.rearLH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeRearLHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.rearLH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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

                <div className="form-row">
                    <label className="form-field">
                        rear RH:
                        {formData.rearRH ? (
                            <>
                                <img
                                    src={formData.rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openRearRHModal}
                                />
                                <Modal isOpen={isRearRHModalOpen} onRequestClose={closeRearRHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.rearRH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeRearRHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.rearRH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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
                        {formData.MajorDamages1 ? (
                            <>
                                <img
                                    src={formData.MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openMajorDamage1Modal}
                                />
                                <Modal isOpen={isMajorDamage1ModalOpen} onRequestClose={closeMajorDamage1Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.MajorDamages1} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage1Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.MajorDamages1} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
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
                        {formData.MajorDamages2 ? (
                            <>
                                <img
                                    src={formData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openMajorDamage2Modal}
                                />
                                <Modal isOpen={isMajorDamage2ModalOpen} onRequestClose={closeMajorDamage2Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.MajorDamages2} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage2Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.MajorDamages2} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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

                <div className='form-row'>
                    <label className="form-field">
                        Major Damage Photo 3:
                        {formData.MajorDamages3 ? (
                            <>
                                <img
                                    src={formData.MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openMajorDamage3Modal}
                                />
                                <Modal isOpen={isMajorDamage3ModalOpen} onRequestClose={closeMajorDamage3Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.MajorDamages3} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage3Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.MajorDamages3} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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
                        {formData.MajorDamages4 ? (
                            <>
                                <img
                                    src={formData.MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openMajorDamage4Modal}
                                />
                                <Modal isOpen={isMajorDamage4ModalOpen} onRequestClose={closeMajorDamage4Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.MajorDamages4} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage4Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.MajorDamages4} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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
                        {formData.MajorDamages5 ? (
                            <>
                                <img
                                    src={formData.MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', cursor: 'pointer', border: 'solid black 2px', padding: "3px", marginTop: "6px", borderRadius: "10px" }}
                                    onClick={openMajorDamage5Modal}
                                />
                                <Modal isOpen={isMajorDamage5ModalOpen} onRequestClose={closeMajorDamage5Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData.MajorDamages5} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage5Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData.MajorDamages5} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>

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



              
                <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <form style={{ maxWidth: "600px", flexGrow: 1, }} className='Customer-master-form'>

                        <div class='header-container'>
                            <h2 className='bigtitle'>Document Upload - Crane</h2>
                        </div>

                        <div className='form-row' style={{ flexDirection: "column" }}>
                        {formData.confirmDoneWorking==true && (
                        <p style={{fontSize:"16px", fontWeight:"bold", color:"blue"}}>Vendor completed working confirmed by customer  </p>
                    )}
                        <label className="form-field">
                                Vendor Charges:
                                <input
                                    type="text"
                                    className='inputField form-control'
                                    name="charges"
                                    value={formData.charges}
                                    onChange={handleChange}
                                    // readOnly={true}
                                />
                            </label>
                            <label className="form-field">
                                Vehicle Inspection Remarks:
                                <textarea
                                    className='inputField form-control'
                                    name="vehicleInspection"
                                    value={formData.vehicleInspection}
                                    onChange={handleChange}
                                    // readOnly={true}
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

                                    // readOnly={true}
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

                                    // readOnly={true}
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

                                    // readOnly={true}
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
                                    // readOnly={true}
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
                                    // readOnly={true}
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
                                    // readOnly={true}
                                />
                            </label>
                        </div>




                        <div className='form-row'>
                            <button className='btn btn-light' onClick={openfeedbackRatingModal} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 8px rgba(0,0,0,0.5)", borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                <img src={feedbackByVendor} style={{ height: "20px", width: "20px" }} alt="feedback" /> <p> Given Feedback </p>
                            </button>
                            <button className='btn btn-light' onClick={openCommissionModel} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 8px rgba(0,0,0,0.5)", borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                <img src={commissionbyvendor} style={{ height: "20px", width: "20px" }} alt="feedback" /> <p> Commission </p>

                            </button>
                        </div>

                        {formData.advancedPayment && formData.balancePayment && formData.paidOn == null && (
                            <div style={{ color: 'green' }}>

                                <p>
                                    * Calculated Commission For The Vendor is = ₹
                                    <input
                                        type="number"
                                        value={
                                            formData.commisionAmount ??
                                            (parseFloat(formData.advancedPayment) + parseFloat(formData.balancePayment)) * 2 / 100
                                        }
                                        onChange={(e) =>
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,    
                                                commisionAmount: parseFloat(e.target.value),
                                            }))
                                        }
                                        style={{ width: "100px", marginLeft: "5px", color: "green", background: "#ffffff08", border: "none" }}
                                    />
                                </p>
                            </div>
                        )}
                        {comingLinkHere == "" && !formData.vendorComissionPaid && (<p style={{
                                    fontSize: '11px',
                                    marginTop: "5px",
                                    background: "green",
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
                                    cursor: "pointer"
                                }} onClick={(e) => { getPaymentLink(formData) }}>
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                    Pay Comission   {/* payment.jsx */}
                                </p>)}
                                {comingLinkHere != "" && (
                                    <p className='shine-payment-button' style={{
                                        fontSize: '11px',
                                        marginTop: "5px",
                                        padding: "10px",
                                        border: '1px solid blue',
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        fontWeight: "bold",
                                        color: "#8d01ff",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        position: "relative",
                                        cursor: "pointer",
                                        // color:"green"

                                    }} onClick={getPaymentLinkPage}>
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                        Proceed to payment   {/* payment.jsx */}
                                    </p>)}
                        {formData.vendorComissionPaidOn && (
                            <div style={{ color: 'green' }}>Commission Paid On : {formData.vendorComissionPaidOn}</div>
                        )}


                        {isfeedbackRatingModalOpen && (

                            <div className="modal fade show" style={{ display: 'block', minWidth: "350px", maxWidth: "1000px", background: "#ffecec00", boxShadow: "none" }} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" >
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content" style={{ backgroundSize: 'cover', backgroundPosition: "top" }}>
                                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h5 className="modal-title" id="exampleModalLongTitle" style={{ paddingLeft: "10px", borderRadius: "10px", color: 'black', fontWeight: 'bold', fontSize: modalTitleFontSize, animation: 'blinking 1.5s infinite' }}>
                                                Rate Customer Behaviour
                                            </h5>

                                        </div>

                                        <div className="modal-body" style={{ textAlign: 'center', color: "black", fontSize: modalBodyFontSize, padding: '20px', fontWeight: "bold" }}>
                                            <div style={{ display: "flex" }}>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={formData.feedbackRating || 0}
                                                    // onChange={onfeedbackRatingChange}
                                                    className="slider"
                                                    name="feedbackRating"
                                                    disabled={alreadyRating}
                                                    style={{ display: 'block', marginTop: '10px' }}
                                                />
                                                <div style={{
                                                    color: formData.feedbackRating < 30 ? 'red' :
                                                        formData.feedbackRating < 70 ? 'blue' : 'green'

                                                }}>
                                                    {formData.feedbackRating < 30 ? `${formData.feedbackRating}% 😒` : formData.feedbackRating < 70 ? `${formData.feedbackRating}% 😊` : `${formData.feedbackRating}% 😃`}
                                                </div>


                                            </div>

                                            <label className="form-field">
                                                Feedback:
                                                <textarea
                                                    name="feedback"
                                                    className="inputField form-control"
                                                    value={formData.feedback}

                                                    readOnly={true}
                                                />
                                            </label>

                                        </div>
                                        <button type="button" onClick={closefeedbackRatingModal} className="btn btn-primary" style={{ color: "white", background: "#ca8787", padding: '3px 10px', fontSize: modalBodyFontSize }}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isCommissionModelOpen && (
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
                                                                aria-controls="pillsz`-login"
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
                                                            {isReadOnlyPayment && typeof formData.cheque === 'string' && formData.cheque.startsWith("https") && (
                                                                <div>
                                                                    <img
                                                                        src={formData.cheque}
                                                                        alt="cheque"
                                                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                                                        onClick={openChequeModal}
                                                                    />


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
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='tab-content'>
                                                    {paymentThrough === "onlinePayment" && (
                                                        <div>
                                                            <p>Payment Request</p>

                                                            {isReadOnlyPayment && typeof formData.onlinePaymentImg === 'string' && formData.onlinePaymentImg.startsWith("https") ? (
                                                                <>
                                                                    <label className="form-field" style={{ marginTop: "30px" }}>
                                                                        Transaction ID:
                                                                        <input
                                                                            type='text'
                                                                            name="transactionId"
                                                                            placeholder='Transaction ID'
                                                                            value={formData.transactionId}

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

                                                                            className="form-control"
                                                                            required
                                                                        />
                                                                    </label>

                                                                    <input
                                                                        type="file"
                                                                        name="onlinePaymentImg"
                                                                        readOnly={true}
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
                                                            {isReadOnlyPayment && formData.paidByCash == true && (
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
                                                                            readOnly={true}
                                                                            style={{ marginRight: "10px" }}
                                                                        />
                                                                        <p style={{ marginTop: "10px" }}>Paid By Cash</p>
                                                                    </label>

                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>

                                                <button type="button" onClick={closeCommisionModel} className="btn btn-primary" style={{ color: "white", background: "#ca8787", padding: '3px 10px', fontSize: modalBodyFontSize }}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        )}



                        {action === "reject" && (
                            <div className="form-field" style={{ display: 'flex', gap: '20px' }}>
                                Reason to Reject:
                                <label>
                                    <textarea name="reasonOfReject" className='inputField' value={formData.reasonOfReject}
                                        onChange={e => setFormData({ ...formData, reasonOfReject: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => openModal({ action: 'reject' })}
                                        style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginLeft: "50px", marginTop: "20px" }}>
                                        Submit
                                    </button>
                                </label>

                            </div>
                        )}

                        {alertInfo.show && (
                            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                {alertInfo.message}
                            </Alert>
                        )}
                         <button
                                type="button"
                                onClick={
                                    changesSubmit
                                }
                                style={{
                                    display: 'inline-block',
                                    padding: '10px 30px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    marginRight: '20px'
                                }}
                            >
                                Submit Edited Details
                            </button>
                        <div style={{ padding: '20px 0' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setAction('accept');
                                    openModal({ action: 'accept' });
                                }}
                                style={{
                                    display: 'inline-block',
                                    padding: '10px 30px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    marginRight: '20px'
                                }}
                            >
                                Accept Vendor
                            </button>
                            <button
                                type="button"
                                onClick={() => setAction('reject')}
                                style={{
                                    display: 'inline-block',
                                    padding: '10px 30px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    marginRight: '20px'
                                }}
                            >
                                Reject Vendor
                            </button>
                        </div>
                    </form>
                    {showSideImage && (
                        <img style={{ height: "auto", width: "30%", borderRadius: '8px', boxShadow: "0 4px 15px rgba(0,0,0,0.3)", filter: "blur(1px)" }} src={exploration} />
                    )}
                </div>

                {modalData && (
                    <ActivationModel
                        isOpen={isModalOpen}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}
            </form>
        </form>
    );
}

export default CraneResponse;