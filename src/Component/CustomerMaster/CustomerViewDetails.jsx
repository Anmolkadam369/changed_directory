import React, { useEffect, useState } from 'react';
import '../CustomerMaster/CustomerMaster.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import MapComponent from '../AAAAAAAAAAAAAAAAAA/MapComponent';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';


function CustomerViewDetails({ id, onUpdate }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    console.log("vendorData123456", vendorData)
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);
    console.log("accdient", accidentVehicleData)
    console.log("Comingdasdas", comingData)

    const [IsReadOnly, setIsReadOnly] = useState(true);
    console.log("avengerdata", vendorData)
    console.log("vendorData type:", typeof vendorData, vendorData);


    const [selectedAdvocate, setSelectedAdvocate] = useState('');
    const [selectedAdvocateId, setSelectedAdvocateId] = useState('');
    console.log("selectedAdvocateId", selectedAdvocateId)

    const [selectedCrane, setSelectedCrane] = useState('');
    const [selectedCraneId, setSelectedCraneId] = useState('');
    console.log("selectedCraneId", selectedCraneId)


    const [selectedWorkshop, setSelectedWorkshop] = useState('');
    const [selectedWorkshopId, setSelectedWorkshopId] = useState('');
    console.log("selectedWorkshopId", selectedWorkshopId)


    const [selectedMechanic, setSelectedMechanic] = useState('');
    const [selectedMechanicId, setSelectedMechanicId] = useState('');
    console.log("selectedMechanicId", selectedMechanicId)



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


    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        getDataById(id);
        getVendorInfo();
        getAccidentDataById(id);
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
                CustomerCity: comingData.CustomerCity || '',
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
                advocate: comingData.advocate || "",
                workshop: comingData.workshop || "",
                mechanic: comingData.mechanic || "",
                crane: comingData.crane || "",
                randomId: comingData.randomId || "",
                feedbackRatingAdvocate: comingData.feedbackRatingAdvocate,
                feedbackRatingWorkshop: comingData.feedbackRatingWorkshop,
                feedbackRatingCrane: comingData.feedbackRatingCrane,
                feedbackRatingMechanic: comingData.feedbackRatingMechanic,
                feedbackCrane: comingData.feedbackCrane,
                feedbackWorkshop: comingData.feedbackWorkshop,
                feedbackMechanic: comingData.feedbackMechanic,
                feedbackAdvocate: comingData.feedbackAdvocate
            }));
            console.log("RANDOMID", comingData.randomId)
        }

    }, [comingData])

    const getAccidentDataById = async (id) => {
        console.log("getdatabyid", id)
        const response = await axios.get(`${backendUrl}/api/getVehicleAccidentById/${id}`);
        console.log("response1", response.data.data[0]);
        setAccidentVehicleData(response.data.data[0])
    }

    const getDataById = async (id) => {
        console.log("getdatabyid", id)
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo/${id}`);
        console.log("getDataByID", response)
        console.log("response2", response.data.data[0]);
        setComingData(response.data.data[0])
    }
    const getVendorInfo = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getActiveVendor`);
        console.log("vendorInfo2", response)
        console.log("response3", response.data);
        setVendorData(response.data)
    }

    const [dummyFormData, setDummyFormData] = useState({
        advocate: null,
        workshop: null,
        mechanic: null,
        crane: null,
        feedbackRatingAdvocate: null,
        feedbackRatingWorkshop: null,
        feedbackRatingCrane: null,
        feedbackRatingMechanic: null,
        feedbackCrane: null,
        feedbackWorkshop: null,
        feedbackMechanic: null,
        feedbackAdvocate: null
    })

    const [formData, setFormData] = useState({
        accidentFileNo: "",
        chassisNo: '',
        engineNo: '',
        entry_date: '',
        make: '',
        model: '',
        latitude: '',
        longitude: '',
        CustomerCity: '',
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
        advocate: null,
        workshop: null,
        mechanic: null,
        crane: null,
        feedbackRatingAdvocate: null,
        feedbackRatingWorkshop: null,
        feedbackRatingCrane: null,
        feedbackRatingMechanic: null,
        feedbackCrane: null,
        feedbackWorkshop: null,
        feedbackMechanic: null,
        feedbackAdvocate: null

    });
    console.log("FORMDARA>", formData)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value || null
        }));
        setDummyFormData(prev => ({
            ...prev,
            [name]: value || null
        }));
    };
    const validateForm = () => {
        if (formData.choosenPlan === "advanced") {
            const requiredFields = ['advocate', 'workshop', 'mechanic', 'crane'];
            for (const key of requiredFields) {
                if (formData[key] === '') {
                    return `Field '${key}' is required.`;
                }
            }
            return '';
        }
        if (formData.choosenPlan === "plus") {
            const requiredFields = ['workshop', 'mechanic', 'crane'];
            for (const key of requiredFields) {
                if (formData[key] === '') {
                    return `Field '${key}' is required.`;
                }
            }
            return '';
        }
        if (formData.choosenPlan === "pro") {
            const requiredFields = ['workshop'];
            for (const key of requiredFields) {
                if (formData[key] === '') {
                    return `Field '${key}' is required.`;
                }
            }
            return '';
        }
    };
    console.log('Form data submitted:', formData);
    console.log('Form data submitted:', userId);


    const submitNow = async (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);
        console.log('Form data submitted:', userId);
        setAlertInfo({ ...alertInfo, show: false });
        console.log('myformdataformData123456789', formData);
        console.log("asdadfasdfasdf", `${backendUrl}/customersRating/${formData.accidentFileNo}/${userId}/${selectedMechanicId != "" ? selectedMechanicId : "None"}/${selectedWorkshopId != "" ? selectedWorkshopId : "None"}/${selectedCraneId != "" ? selectedCraneId : "None"}/${selectedAdvocateId != "" ? selectedAdvocateId : "None"}`)
        try {
            const response = await axios.put(`${backendUrl}/api/customersRating/${formData.accidentFileNo}/${userId}/${selectedMechanicId != "" ? selectedMechanicId : "Not_added"}/${selectedWorkshopId != "" ? selectedWorkshopId : "Not_added"}/${selectedCraneId != "" ? selectedCraneId : "Not_added"}/${selectedAdvocateId != "" ? selectedAdvocateId : "Not_added"}`, JSON.stringify(formData), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            console.log("response", response);
            if (response.data.status == true) {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
                    onUpdate();
                }, 2000);
            } else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage.toString(), severity: 'error' });
        }
    };



    console.log("advocate", formData.advocate)
    console.log("workshop", formData.workshop)
    console.log("mechanic", formData.mechanic)
    console.log("crane", formData.crane)

    const handleBack = () => {
        // navigate("../Admin")
        onUpdate()
    }
    const [sendingData, setSendingData] = useState({
        vendorType: "",
        distance: ""
    })
    console.log("sending", sendingData)

    const [showDropdown, setShowDropdown] = useState(false);
    const handleSelect = (event, value) => {
        event.preventDefault();
        setSendingData({
            ...sendingData,
            vendorType: value
        });

        setShowDropdown(false); // Close dropdown after selection
    };
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handlechanges = (e) => {
        const { name, value } = e.target;
        if (name === "distance") {
            if (value !== "" && (Number(value) < 0 || Number(value) > 8001)) {
                return;
            }
        }
        setSendingData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }



    useEffect(() => {
        if (vendorData.length != 0) {
            if (formData.advocate) {
                const selectedVendor = vendorData?.data.find(vendor => vendor.vendorCode === formData.advocate);
                if (selectedVendor) {
                    setSelectedAdvocate(selectedVendor.vendorName);
                    setSelectedAdvocateId(selectedVendor.vendorCode)
                }
            }
            if (formData.crane) {
                const selectedVendor = vendorData?.data.find(vendor => vendor.vendorCode === formData.crane);
                if (selectedVendor) {
                    console.log("MAN PUSUN KADHLI", selectedAdvocate)
                    setSelectedCrane(selectedVendor.vendorName);
                    setSelectedCraneId(selectedVendor.vendorCode)
                }
            }
            if (formData.workshop) {
                const selectedVendor = vendorData?.data.find(vendor => vendor.vendorCode === formData.workshop);
                if (selectedVendor) {
                    setSelectedWorkshop(selectedVendor.vendorName);
                    setSelectedWorkshopId(selectedVendor.vendorCode)
                }
            }
            if (formData.mechanic) {
                const selectedVendor = vendorData?.data.find(vendor => vendor.vendorCode === formData.mechanic);
                if (selectedVendor) {
                    setSelectedMechanic(selectedVendor.vendorName);
                    setSelectedMechanicId(selectedVendor.vendorCode)
                }
            }
        }
    }, [formData.advocate, formData.crane, formData.workshop, formData.mechanic, vendorData]);



    const [currentVendorType, setCurrentVendorType] = useState(null);
    console.log("currentVendorType", currentVendorType)
    const [isfeedbackRatingModalOpen, setIsfeedbackRatingModalOpen] = useState(false);

    const openfeedbackRatingModal = (vendorType, e) => {
        console.log("E", e);
        console.log("vendortype", vendorType)
        e.preventDefault()
        setCurrentVendorType(vendorType)
        setIsfeedbackRatingModalOpen(true);
    };
    const closefeedbackRatingModal = (e) => {
        e.preventDefault()
        setIsfeedbackRatingModalOpen(false);
    };
    const onfeedbackRatingChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setDummyFormData(prev => ({
            ...prev,
            [name]: value || null
        }));
    };
    const [alreadyRatingAdvocate, setAlreadyRatingAdvocate] = useState(false);
    const [alreadyRatingCrane, setAlreadyRatingCrane] = useState(false);
    const [alreadyRatingMechanic, setAlreadyRatingMechanic] = useState(false);
    const [alreadyRatingWorkshop, setAlreadyRatingWorkshop] = useState(false);
    console.log("alreadyRatingAdvocate", alreadyRatingAdvocate, formData.feedbackRatingAdvocate)
    console.log("alreadyRatingCrane", alreadyRatingCrane, formData.feedbackRatingCrane)
    console.log("alreadyRatingMechanic", alreadyRatingMechanic, formData.feedbackRatingMechanic)
    console.log("alreadyRatingWorkshop", alreadyRatingWorkshop, formData.feedbackRatingWorkshop)

    useEffect(() => {
        if (comingData.feedbackRatingAdvocate != null && comingData.feedbackRatingAdvocate != "" && comingData.feedbackRatingAdvocate != undefined && comingData.feedbackRatingAdvocate != null) setAlreadyRatingAdvocate(true)
        if (comingData.feedbackRatingCrane != null && comingData.feedbackRatingCrane != "" && comingData.feedbackRatingCrane != undefined && comingData.feedbackRatingCrane != null) setAlreadyRatingCrane(true)
        if (comingData.feedbackRatingMechanic != null && comingData.feedbackRatingMechanic != "" && comingData.feedbackRatingMechanic != undefined && comingData.feedbackRatingMechanic != null) setAlreadyRatingMechanic(true)
        if (comingData.feedbackRatingWorkshop != null && comingData.feedbackRatingWorkshop != "" && comingData.feedbackRatingWorkshop != undefined && comingData.feedbackRatingWorkshop != null) setAlreadyRatingWorkshop(true)
    }, [comingData.feedbackRatingAdvocate, comingData.feedbackRatingCrane, comingData.feedbackRatingMechanic, comingData.feedbackRatingWorkshop])

    const [isCommissionModelOpen, setIsCommissionModelOpen] = useState(false);
    const [isReadOnlyPayment, setIsReadOnlyPayment] = useState(true)
    let [paymentThrough, setPaymentThrough] = useState("");
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

    const openCommissionModel = (e) => {
        e.preventDefault();
        setIsCommissionModelOpen(true);
    }
    const closeCommisionModel = (e) => {
        e.preventDefault()
        setIsCommissionModelOpen(false);
    };
    const paymentBy = (value) => {
        setPaymentThrough(value);
    }

    return (
        <div>
            <Helmet>
                <title>Accident Vehicle Edit Form- Claimpro</title>
                <meta name="description" content="Accident Vehicle Edit Form" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/EditAccidentVehicle`} />
            </Helmet>
            <form className="Customer-master-form" style={{ marginBottom: "50px", padding: '0px', marginLeft: "0px", boxShadow: "none", borderRadius: "0px", background: "transparent" }}>
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <h2 className='bigtitle'>Vehicle Information</h2>
                </div>

                <div className='form-row'>

                    <label className="form-field">
                        Users Name:
                        <input
                            type="text"
                            name="CustomerName"
                            className='inputField'
                            value={formData.CustomerName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Choosen Plan:
                        <input
                            className='inputField'
                            type="text"
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
                            className='inputField'
                            name="chassisNo"
                            value={formData.chassisNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Engine No:
                        <input
                            type="text"
                            className='inputField'
                            name="engineNo"
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
                            className='inputField'
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
                            className='inputField'
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
                            name="longitude"
                            className='inputField'
                            value={formData.longitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        City:
                        <input
                            type="text"
                            className='inputField'
                            name="CustomerCity"
                            value={formData.CustomerCity}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        accidentFileNo:
                        <input
                            type="text"
                            className='inputField'
                            name="accidentFileNo"
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
                            className='inputField'
                            value={formData.model}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

            </form>

            <form className="Customer-master-form" style={{ padding: '0px', marginLeft: "0px", boxShadow: "none", borderRadius: "0px", background: "transparent" }}>

                <div class='header-container'>
                    <h2 className='bigtitle'>Accident Vehicle Images</h2>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Chassis Number:
                        {comingData.ChassisNoView ? (
                            <>
                                <img
                                    src={comingData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                </div>
                <div className="form-row">
                    <label className="form-field">
                        front View:
                        {comingData.frontView ? (
                            <>
                                <img
                                    src={comingData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Major Damage Photo 2:
                        {comingData.MajorDamages2 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px", cursor: "pointer" }}
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

            <form className='Customer-master-form' style={{ padding: '0px', marginLeft: "0px", boxShadow: "none", borderRadius: "0px", background: "transparent" }}>
                <div className='header-container'>
                    <h2 className='bigtitle'>Assigned Vendors By Claim Pro Assist</h2>
                </div>
                <div className='form-container1'>
                    <div className='form-fields-container'>
                        {formData.choosenPlan === "advanced" && vendorData.length !== 0 && (
                            <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                                {selectedAdvocate != "" && (
                                    <div className="form-field">
                                        <label>Advocate:</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                name="advocate"
                                                value={selectedAdvocate}
                                                readOnly
                                                className="form-control"
                                            />
                                        </div>
                                        <button onClick={(e) => openfeedbackRatingModal("advocate", e)} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                            <ChatOutlinedIcon /> Feedback
                                        </button>
                                    </div>
                                )}

                                {selectedCrane != "" && (
                                    <div className="form-field">
                                        <label>Crane:</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                name="crane"
                                                value={selectedCrane}
                                                readOnly
                                                className="form-control"
                                            />
                                        </div>
                                        <button onClick={(e) => openfeedbackRatingModal("crane", e)} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                            <ChatOutlinedIcon /> Feedback
                                        </button>
                                    </div>
                                )}

                                {selectedMechanic != "" && (
                                    <div className="form-field">
                                        <label>Mechanic:</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                name="mechanic"
                                                value={selectedMechanic}
                                                readOnly
                                                className="form-control"
                                            />
                                        </div>
                                        <button onClick={(e) => openfeedbackRatingModal("mechanic", e)} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                            <ChatOutlinedIcon /> Feedback
                                        </button>
                                    </div>
                                )}

                                {selectedWorkshop != "" && (
                                    <div className="form-field">
                                        <label>Workshop:</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                name="workshop"
                                                value={selectedWorkshop}
                                                readOnly
                                                className="form-control"
                                            />
                                        </div>
                                        <button onClick={(e) => openfeedbackRatingModal("workshop", e)} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                            <ChatOutlinedIcon /> Feedback
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {formData.choosenPlan === "plus" && vendorData.length !== 0 && (
                            <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                                <div className="form-field">
                                    <label>Crane:</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="text"
                                            name="crane"
                                            value={selectedCrane}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                    <button onClick={openfeedbackRatingModal} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                        <ChatOutlinedIcon /> Feedback
                                    </button>
                                </div>
                                <div className="form-field">
                                    <label>Mechanic:</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="text"
                                            name="mechanic"
                                            value={selectedMechanic}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                    <button onClick={openfeedbackRatingModal} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                        <ChatOutlinedIcon /> Feedback
                                    </button>
                                </div>
                                <div className="form-field">
                                    <label>Workshop:</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="text"
                                            name="workshop"
                                            value={selectedWorkshop}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                    <button onClick={openfeedbackRatingModal} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                        <ChatOutlinedIcon /> Feedback
                                    </button>
                                </div>
                            </div>
                        )}
                        {formData.choosenPlan === "pro" && vendorData.length !== 0 && (
                            <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                                <div className="form-field">
                                    <label>Workshop:</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="text"
                                            name="workshop"
                                            value={selectedWorkshop}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <button onClick={openfeedbackRatingModal} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }} >
                                    <ChatOutlinedIcon /> Feedback
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isfeedbackRatingModalOpen && (
                    <form className='Customer-master-form' style={{ width: "100%", marginTop: "10px" }}>
                        <IconButton onClick={closefeedbackRatingModal} style={{ background: "white", float: 'right' }}>
                            <CloseIcon />
                        </IconButton>
                        <p>How satisfied are you with {currentVendorType}?</p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={currentVendorType === "advocate" && formData.feedbackRatingAdvocate != null ? formData.feedbackRatingAdvocate :
                                currentVendorType === "mechanic" && formData.feedbackRatingMechanic != null ? formData.feedbackRatingMechanic :
                                    currentVendorType === "workshop" && formData.feedbackRatingWorkshop != null ? formData.feedbackRatingWorkshop :
                                        currentVendorType === "crane" && formData.feedbackRatingCrane != null ? formData.feedbackRatingCrane : "0"}
                            onChange={onfeedbackRatingChange}
                            className="slider"
                            name={`feedbackRating${currentVendorType.charAt(0).toUpperCase() + currentVendorType.slice(1)}`}
                            disabled={currentVendorType === "advocate" ? alreadyRatingAdvocate :
                                currentVendorType === "mechanic" ? alreadyRatingMechanic :
                                    currentVendorType === "workshop" ? alreadyRatingWorkshop :
                                        currentVendorType === "crane" ? alreadyRatingCrane : false}
                            style={{ display: 'block', marginTop: '10px' }}
                        />
                        <div style={{ marginBottom: "30px" }}>
                            Satisfied By Vendor Response: {currentVendorType === "advocate" ? formData.feedbackRatingAdvocate :
                                currentVendorType === "mechanic" ? formData.feedbackRatingMechanic :
                                    currentVendorType === "workshop" ? formData.feedbackRatingWorkshop :
                                        currentVendorType === "crane" ? formData.feedbackRatingCrane : "0"}
                        </div>

                        <label className="form-field">
                            Feedback:
                            <textarea
                                name={`feedback${currentVendorType.charAt(0).toUpperCase() + currentVendorType.slice(1)}`}
                                className="inputField form-control"
                                value={currentVendorType === "advocate" && formData.feedbackAdvocate != null ? formData.feedbackAdvocate :
                                    currentVendorType === "mechanic" && formData.feedbackMechanic != null ? formData.feedbackMechanic :
                                        currentVendorType === "workshop" && formData.feedbackWorkshop != null ? formData.feedbackWorkshop :
                                            currentVendorType === "crane" && formData.feedbackCrane != null ? formData.feedbackCrane : ""}
                                onChange={handleChange}
                                readOnly={currentVendorType === "advocate" ? alreadyRatingAdvocate :
                                    currentVendorType === "mechanic" ? alreadyRatingMechanic :
                                        currentVendorType === "workshop" ? alreadyRatingWorkshop :
                                            currentVendorType === "crane" ? alreadyRatingCrane : false}
                            />
                        </label>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <button onClick={closefeedbackRatingModal} style={{ padding: "2px 7px", marginTop: "10px", marginLeft: "10px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                Save it!!!
                            </button>
                        </div>
                    </form>
                )}

                <div className='form-row'>
                    <label className="form-field">
                        <button onClick={openCommissionModel} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px", border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                            Commission
                        </button>
                    </label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>

                    {isCommissionModelOpen && (
                        <div className='Customer-master-form' style={{ margin: "0px", padding: "10px" }}>
                            <IconButton onClick={closeCommisionModel} style={{ background: "white", float: 'right' }}>
                                <CloseIcon />
                            </IconButton>

                            <div style={{ display: "flex", marginTop: "50px" }}>
                                <button onClick={(e) => { e.preventDefault(); paymentBy("cheque"); }} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "12px", marginLeft: "5px", padding: '3px', border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                    Cheque
                                </button>
                                <button onClick={(e) => { e.preventDefault(); paymentBy("onlinePayment"); }} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "12px", marginLeft: "5px", padding: '3px', border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
                                    Online Payment
                                </button>
                                <button onClick={(e) => { e.preventDefault(); paymentBy("cash"); }} style={{ marginTop: "10px", fontWeight: "bold", fontSize: "12px", marginLeft: "5px", padding: '3px', border: '1px solid red', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}>
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
                                                accept=".pdf,image/*"
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
                </div>

                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                    </Alert>
                )}

                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginTop: "30px" }} onClick={submitNow}>
                        Submit
                    </button>
                </div>
            </form>



        </div>


    );
}

export default CustomerViewDetails;
