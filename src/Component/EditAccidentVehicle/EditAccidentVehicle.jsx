import React, { useEffect, useState } from 'react';
import '../CustomerMaster/CustomerMaster.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
// '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import MapComponent from '../AAAAAAAAAAAAAAAAAA/MapComponent';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';


function EditAccidentVehicle({ id, onUpdate }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    console.log("comingDData", comingData)
    const [selectedOptionsArray, setSelectedOptionsArray] = useState([]);
    console.log("SELECTEDOPOPOPOP", selectedOptionsArray)
    console.log("selectedOptionsArray.includes()", selectedOptionsArray.includes("advocate"))
    useEffect(() => {
        if (comingData.selectedOptions != null) {
            const optionsArray = comingData.selectedOptions.split(',');
            setSelectedOptionsArray(optionsArray);
        }
    }, [comingData])
    const [vendorData, setVendorData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);
    console.log("accdient", accidentVehicleData)
    console.log("Comingdasdas".comingData)

    const [IsReadOnly, setIsReadOnly] = useState(true);
    console.log("vendor", vendorData)
    console.log("vendorData type:", typeof vendorData, vendorData);

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
                randomId: comingData.randomId || ""
            }));
            console.log("RANDOMID", comingData.randomId)
        }

    }, [comingData])

    const getAccidentDataById = async (id) => {
        console.log("getdatabyid", id)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVehicleAccidentById/${id}`);
        console.log("response123", response.data.data[0]);
        setAccidentVehicleData(response.data.data[0])
    }

    const getDataById = async (id) => {
        console.log("getdatabyid", id)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAccidentVehicleInfo/${id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
        console.log("getDataByID123", response)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }
    const getVendorInfo = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getActiveVendor/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        console.log("vendorInfo123", response)
        console.log("response", response.data);
        setVendorData(response.data)
    }

    const [dummyFormData, setDummyFormData] = useState({
        advocate: null,
        workshop: null,
        mechanic: null,
        crane: null
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
        crane: null

    });

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
        // const validationMessage = validateForm();
        // if (validationMessage) {
        //     setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
        //     return;
        // }
        console.log('Form data submitted:', formData);
        console.log('Form data submitted:', userId);

        setAlertInfo({ ...alertInfo, show: false });
        console.log('myformdataformData', formData);
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/editVehicleInfo/${formData.accidentFileNo}/${userId}`, JSON.stringify(formData), {
                headers: {
                    'Authorization': `Bearer ${token}`,
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

    const isDisabled = (field) => {
        return (formData[field] !== null && formData[field] !== "")
            && dummyFormData[field] == null
            && selectedOptionsArray.includes(field);
    };


    return (
        <div>
            <Helmet>
                <title>Accident Vehicle Edit Form- Claimpro</title>
                <meta name="description" content="Accident Vehicle Edit Form" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/EditAccidentVehicle`} />
            </Helmet>
            <form className="Customer-master-form" style={{ marginBottom: "50px" }}>
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

                </div>

                <div className='form-row'>

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
                    <label className="form-field">c
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
                </div>

                <div className='form-row'>
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
                    <label className="form-field"></label>
                    <label className="form-field"></label>
                </div>

            </form>

            <form className="Customer-master-form">

                <div class='header-container'>
                    <h2 className='bigtitle'>Accident Vehicle Images</h2>
                </div>

                <div className="form-row">
                    <label className="form-field" style={{marginTop: "30px"}}>
                        Chassis Number:
                        {comingData.ChassisNoView ? (
                            <>
                                <img
                                    src={comingData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        Cluster Number:
                        {comingData.ClusterView ? (
                            <>
                                <img
                                    src={comingData.ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        FrontLH Number:
                        {comingData.frontLH ? (
                            <>
                                <img
                                    src={comingData.frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        frontRH:
                        {comingData.frontRH ? (
                            <>
                                <img
                                    src={comingData.frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        front View:
                        {comingData.frontView ? (
                            <>
                                <img
                                    src={comingData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        rear LH:
                        {comingData.rearLH ? (
                            <>
                                <img
                                    src={comingData.rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        rear RH:
                        {comingData.rearRH ? (
                            <>
                                <img
                                    src={comingData.rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        Major Damage Photo:
                        {comingData.MajorDamages1 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        Major Damage Photo 2:
                        {comingData.MajorDamages2 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field" style={{marginTop: "30px"}}>
                        Major Damage Photo 3:
                        {comingData.MajorDamages3 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "10px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field"  style={{marginTop: "30px"}}>
                        Major Damage Photo 4:
                        {comingData.MajorDamages4 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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
                    <label className="form-field"  style={{marginTop: "30px"}}>
                        Major Damage Photo 5:
                        {comingData.MajorDamages5 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
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

            <form className='Customer-master-form'>
                <div className='header-container'>
                    <h2 className='bigtitle'>Assign Vendors To Customer</h2>
                </div>
                <div className='form-container1'>
                    <div className='map-container1'>
                        <MapComponent accidentLocation1={accidentVehicleData} additionalInfo={sendingData} />
                    </div>
                    <div className='form-fields-container' style={{maxWidth:"300px"}}>
                        {formData.choosenPlan === "advanced" && vendorData.length !== 0 && (
                            <div>
                                <label className="form-field1">
                                    Maximum Vendor Distance (KM):
                                    <input
                                        type="number"
                                        name="distance"
                                        className='inputField1'
                                        value={sendingData.distance}
                                        onChange={handlechanges}
                                        min="0"
                                        max="8001"
                                        step="1"
                                    />
                                </label>
                                <div className="dropdown green-dropdown form-field" style={{ marginLeft: '10px', width: "93%" }}>
                                    <button
                                        className="form-field input-group mb-3"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={toggleDropdown}
                                    >
                                        {sendingData.vendorType || "Select Vendor Type"}
                                    </button>
                                    <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advocate")}>Advocate</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crane")}>Crane</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "mechanic")}>Mechanic</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                    </ul>
                                </div>

                                {selectedOptionsArray.includes("advocate") && (
                                    <label className="form-field1">
                                        Give Advocate:
                                        <select
                                            type='text'
                                            className='inputField1'
                                            name="advocate"
                                            value={formData.advocate || ""}
                                            onChange={handleChange}
                                            disabled={(formData.advocate !== null && formData.advocate !== "") && dummyFormData.advocate == null}
                                        >
                                            <option value="">Select a Advocate</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "advocate").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}

                                {selectedOptionsArray.includes("crane") && (
                                    <label className="form-field1">
                                        Crane:
                                        <select
                                            className='inputField1'
                                            name="crane"
                                            value={formData.crane || ""}
                                            onChange={handleChange}
                                            disabled={(formData.crane !== null && formData.crane !== "") && dummyFormData.crane == null}
                                        >
                                            <option value="">Select a Crane</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "crane").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}

                                {selectedOptionsArray.includes("onsite temperory repair") && (
                                    <label className="form-field1">
                                        Mechanic:
                                        <select
                                            className='inputField1'
                                            name="mechanic"
                                            value={formData.mechanic || ""}
                                            onChange={handleChange}
                                            disabled={(formData.mechanic !== null && formData.mechanic !== "") && dummyFormData.mechanic == null}
                                        >
                                            <option value="">Select a Mechanic</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "mechanic").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}

                                {selectedOptionsArray.includes("workshop") && (
                                    <label className="form-field1">
                                        WorkShop:
                                        <select
                                            className='inputField1'
                                            name="workshop"
                                            value={formData.workshop || ""}
                                            onChange={handleChange}
                                            disabled={(formData.workshop !== null && formData.workshop !== "") && dummyFormData.workshop == null}
                                        >
                                            <option value="">Select a Workshop</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}
                            </div>
                        )}
                        {formData.choosenPlan === "plus" && vendorData.length !== 0 && (
                            <div>
                                <label className="form-field1">
                                    Maximum Vendor Distance (KM):
                                    <input
                                        type="number"
                                        name="distance"
                                        className='inputField1'
                                        value={sendingData.distance}
                                        onChange={handlechanges}
                                        min="0"
                                        max="8001"
                                        step="1"
                                    />
                                </label>
                                <div className="dropdown green-dropdown form-field" style={{ marginLeft: '10px', width: "93%" }}>
                                    <button
                                        className="form-field input-group mb-3"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={toggleDropdown}
                                    >
                                        {sendingData.vendorType || "Select Vendor Type"}
                                    </button>
                                    <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crane")}>Crane</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "mechanic")}>Mechanic</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                    </ul>
                                </div>
                                {selectedOptionsArray.includes("crane") && (
                                    <label className="form-field1">
                                        Crane:
                                        <select
                                            className='inputField1'
                                            name="crane"
                                            value={formData.crane || ""}
                                            onChange={handleChange}
                                            disabled={(formData.crane !== null && formData.crane !== "") && dummyFormData.crane == null}
                                        >
                                            <option value="">Select a Crane</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "crane").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}

                                {selectedOptionsArray.includes("onsite temperory repair") && (
                                    <label className="form-field1">
                                        Mechanic:
                                        <select
                                            className='inputField1'
                                            name="mechanic"
                                            value={formData.mechanic || ""}
                                            onChange={handleChange}
                                            disabled={(formData.mechanic !== null && formData.mechanic !== "") && dummyFormData.mechanic == null}
                                        >
                                            <option value="">Select a Mechanic</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "mechanic").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}

                                {selectedOptionsArray.includes("workshop") && (
                                    <label className="form-field1">
                                        WorkShop:
                                        <select
                                            className='inputField1'
                                            name="workshop"
                                            value={formData.workshop || ""}
                                            onChange={handleChange}
                                            disabled={(formData.workshop !== null && formData.workshop !== "") && dummyFormData.workshop == null}
                                        >
                                            <option value="">Select a Workshop</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}
                            </div>
                        )}
                        {formData.choosenPlan === "pro" && vendorData.length !== 0 && (
                            <div>
                                <label className="form-field1">
                                    Maximum Vendor Distance (KM):
                                    <input
                                        type="number"
                                        name="distance"
                                        className='inputField1'
                                        value={sendingData.distance}
                                        onChange={handlechanges}
                                        min="0"
                                        max="8001"
                                        step="1"
                                    />
                                </label>
                                <div className="dropdown green-dropdown form-field" style={{ marginLeft: '10px', width: "93%" }}>
                                    <button
                                        className="form-field input-group mb-3"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={toggleDropdown}
                                    >
                                        {sendingData.vendorType || "Select Vendor Type"}
                                    </button>
                                    <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                        <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                    </ul>
                                </div>
                                {selectedOptionsArray.includes("workshop") && (
                                    <label className="form-field1">
                                        WorkShop:
                                        <select
                                            className='inputField1'
                                            name="workshop"
                                            value={formData.workshop || ""}
                                            onChange={handleChange}
                                            disabled={(formData.workshop !== null && formData.workshop !== "") && dummyFormData.workshop == null}
                                        >
                                            <option value="">Select a Workshop</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>)}
                            </div>
                        )}
                    </div>
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

export default EditAccidentVehicle;
