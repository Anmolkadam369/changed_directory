import React, { useEffect, useState } from 'react';
import './EditAccidentVehicle.css'
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


function EditAccidentVehicle({ id, onUpdate }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);
    console.log("accdient", accidentVehicleData)

    const [IsReadOnly, setIsReadOnly] = useState(true);
    console.log("vendor", vendorData)
    console.log("vendorData type:", typeof vendorData, vendorData);



    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
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
                machanic: comingData.machanic || "",
                crain: comingData.crain || "",
                randomId: comingData.randomId || ""
            }));
            console.log("RANDOMID", comingData.randomId)
        }

    }, [comingData])

    const getAccidentDataById = async (id) => {
        console.log("getdatabyid", id)
        const response = await axios.get(`${backendUrl}/api/getVehicleAccidentById/${id}`);
        console.log("response", response.data.data[0]);
        setAccidentVehicleData(response.data.data[0])
    }

    const getDataById = async (id) => {
        console.log("getdatabyid", id)
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo/${id}`);
        console.log("getDataByID", response)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }
    const getVendorInfo = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getActiveVendor`);
        console.log("vendorInfo", response)
        console.log("response", response.data);
        setVendorData(response.data)
    }

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
        machanic: null,
        crain: null

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value || null
        }));
    };
    const validateForm = () => {
        if (formData.choosenPlan === "advanced") {
            const requiredFields = ['advocate', 'workshop', 'machanic', 'crain'];
            for (const key of requiredFields) {
                if (formData[key] === '') {
                    return `Field '${key}' is required.`;
                }
            }
            return '';
        }
        if (formData.choosenPlan === "plus") {
            const requiredFields = ['workshop', 'machanic', 'crain'];
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
            const response = await axios.put(`${backendUrl}/editVehicleInfo/${formData.accidentFileNo}/${userId}`, JSON.stringify(formData), {
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
    console.log("machanic", formData.machanic)
    console.log("crain", formData.crain)

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

    const handlechanges = (e)=>{
    const { name, value } = e.target;
    setSendingData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

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
                </div>

                <div class='header-container'>
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

            <form className="Customer-master-form">

                <div class='header-container'>
                    <h2 className='bigtitle'>Accident Vehicle Images</h2>
                </div>

                <div className="form-row">
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Chassis Number:
                        {comingData.ChassisNoView ? (
                            <>
                                <img
                                    src={comingData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={() => openModal(comingData.ChassisNoView)}  // Pass the correct image URL here.
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={closeModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={currentImage}
                                                alt="Enlarged view"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Cluster Number:
                        {comingData.ClusterView ? (
                            <>
                                <img
                                    src={comingData.ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={() => openModal(comingData.ClusterView)}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={closeModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={currentImage}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        FrontLH Number:
                        {comingData.frontLH ? (
                            <>
                                <img
                                    src={comingData.frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.frontLH}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No FrontLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        frontRH:
                        {comingData.frontRH ? (
                            <>
                                <img
                                    src={comingData.frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No frontRH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        front View:
                        {comingData.frontView ? (
                            <>
                                <img
                                    src={comingData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.frontView}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No front View Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        rear LH:
                        {comingData.rearLH ? (
                            <>
                                <img
                                    src={comingData.rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.rearLH}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        rear RH:
                        {comingData.rearRH ? (
                            <>
                                <img
                                    src={comingData.rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.rearRH}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Major Damage Photo:
                        {comingData.MajorDamages1 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages1}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Major Damage Photo 2:
                        {comingData.MajorDamages2 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages2}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Major Damage Photo 3:
                        {comingData.MajorDamages3 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages3}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Major Damage Photo 4:
                        {comingData.MajorDamages4 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages4}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Major Damage Photo 5:
                        {comingData.MajorDamages5 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages5}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Accident Latitude:
                        <input
                            type="text"
                            name="latitude"
                            className='inputField'
                            value={accidentVehicleData.latitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}>
                        Accident Longitude:
                        <input
                            type="text"
                            name="longitude"
                            className='inputField'
                            value={accidentVehicleData.longitude}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field" style={{ marginTop: "30px" }}></label>
                    <label className="form-field" style={{ marginTop: "30px" }}></label>

                </div>

            </form>
            <form className='Customer-master-form'>
                <div class='header-container'>
                    <h2 className='bigtitle' style={{ marginTop: '30px', marginBottom: "30px" }}>Assign Vendors To Customer</h2>

                </div>
                <div style={{ display: 'flex', overflowX: 'auto' }}>
                    <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
                        <MapComponent accidentLocation1={accidentVehicleData} additionalInfo={sendingData} />
                    </div>
                    <>
                        <div style={{ flex: '0 1 200px', marginLeft: '20px', minWidth: '300px' }}>
                            {formData.choosenPlan === "advanced" && vendorData.length !== 0 && (
                                <div>
                                    <label className="form-field" style={{ width: "50%" }}>
                                        Maximum Vendor Distance:
                                        <input
                                            type="text"
                                            name="distance"
                                            className='inputField'
                                            value={sendingData.distance}
                                            onChange={handlechanges}
                                        />
                                    </label>
                                    <div className="dropdown green-dropdown form-field" style={{ width: "50%" }}>
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
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crain")}>Crane</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "machanic")}>Mechanic</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                        </ul>
                                    </div>

                                    <label className="form-field" style={{ width: "50%" }}>
                                        Give Advocate:
                                        <select
                                            type='text'
                                            className='inputField'
                                            name="advocate"
                                            value={formData.advocate || ""}
                                            onChange={handleChange}
                                            disabled={formData.advocate !== null && formData.advocate !== ""}
                                        >
                                            <option value="">Select a Advocate</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "advocate").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="form-field" style={{ width: "50%" }}>
                                        Crain:
                                        <select
                                            className='inputField'
                                            name="crain"
                                            value={formData.crain || ""}
                                            onChange={handleChange}
                                            disabled={formData.crain !== null && formData.crain !== ""}
                                        >
                                            <option value="">Select a Crain</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "crain").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="form-field" style={{ width: "50%" }}>
                                        Machanic:
                                        <select
                                            className='inputField'
                                            name="machanic"
                                            value={formData.machanic || ""}
                                            onChange={handleChange}
                                            disabled={formData.machanic !== null && formData.machanic !== ""}
                                        >
                                            <option value="">Select a Machanic</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "machanic").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="form-field" style={{ width: "50%" }}>
                                        WorkShop:
                                        <select
                                            className='inputField'
                                            name="workshop"
                                            value={formData.workshop || ""}
                                            onChange={handleChange}
                                            disabled={formData.workshop !== null && formData.workshop !== ""}
                                        >
                                            <option value="">Select a Workshop</option>
                                            {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        {/* </div> */}

                        {/* <div style={{ flex: '0 1 200px', marginLeft: '20px', minWidth: '300px' }}> */}
                        {formData.choosenPlan === "plus" && vendorData.length !== 0 && (
                            <div>
                                    <label className="form-field" style={{ width: "50%" }}>
                                        Maximum Vendor Distance:
                                        <input
                                            type="text"
                                            name="distance"
                                            className='inputField'
                                            value={sendingData.distance}
                                            onChange={handlechanges}
                                        />
                                    </label>
                                    <div className="dropdown green-dropdown form-field" style={{ width: "50%" }}>
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
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crain")}>Crane</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "machanic")}>Mechanic</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                        </ul>
                                    </div>
                                <label className="form-field" style={{ width: "50%" }}>
                                    Crain:
                                    <select
                                        className='inputField'
                                        name="crain"
                                        value={formData.crain || ""}
                                        onChange={handleChange}
                                        disabled={formData.crain !== null && formData.crain !== ""}
                                    >
                                        <option value="">Select a Crain</option>
                                        {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "crain").map((vendor) => (
                                            <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="form-field" style={{ width: "50%" }}>
                                    Machanic:
                                    <select
                                        className='inputField'
                                        name="machanic"
                                        value={formData.machanic || ""}
                                        onChange={handleChange}
                                        disabled={formData.machanic !== null && formData.machanic !== ""}
                                    >
                                        <option value="">Select a Workshop</option>
                                        {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "machanic").map((vendor) => (
                                            <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="form-field" style={{ width: "50%" }}>
                                    WorkShop:
                                    <select
                                        className='inputField'
                                        name="workshop"
                                        value={formData.workshop || ""}
                                        onChange={handleChange}
                                        disabled={formData.workshop !== null && formData.workshop !== ""}
                                    >
                                        <option value="">Select a Workshop</option>
                                        {vendorData && vendorData.data.filter(vendor => vendor.vendorType === "workshop").map((vendor) => (
                                            <option key={vendor.vendorCode} value={vendor.vendorCode}>{`${vendor.vendorName} - ${vendor.vendorCode}`}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        )}
{/* </div> */}

{/* <div style={{ flex: '0 1 200px', marginLeft: '20px', minWidth: '300px' }}> */}
                        {formData.choosenPlan === "pro" && vendorData.length !== 0 && (
                            <div>
                                    <label className="form-field" style={{ width: "50%" }}>
                                        Maximum Vendor Distance:
                                        <input
                                            type="text"
                                            name="distance"
                                            className='inputField'
                                            value={sendingData.distance}
                                            onChange={handlechanges}
                                        />
                                    </label>
                                    <div className="dropdown green-dropdown form-field" style={{ width: "50%" }}>
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
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crain")}>Crane</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "machanic")}>Mechanic</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                        </ul>
                                    </div>
                                <label className="form-field" style={{ width: "50%" }}>
                                    WorkShop:
                                    <select
                                        className='inputField'
                                        name="workshop"
                                        value={formData.workshop || ""}
                                        onChange={handleChange}
                                        disabled={formData.workshop !== null && formData.workshop !== ""}
                                    >
                                        <option value="">Select a Workshop</option>
                                        {vendorData?.data?.length > 0 ? (
                                            vendorData.data.filter(vendor => vendor.vendorType === "workshop").map(vendor => (
                                                <option key={vendor.vendorCode} value={vendor.vendorCode}>
                                                    {`${vendor.vendorName} - ${vendor.vendorCode}`}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>Loading workshops...</option>
                                        )}
                                    </select>
                                </label>
                            </div>
                        )}
                        </div>
                    </>

                </div>

                {alertInfo.show && (
    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
        {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
    </Alert>
)}


                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginTop:"30px" }} onClick={submitNow}>
                        Submit
                    </button>
                </div>
            </form>


        </div>


    );
}

export default EditAccidentVehicle;
