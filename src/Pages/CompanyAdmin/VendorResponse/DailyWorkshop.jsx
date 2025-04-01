import React, { useEffect, useState, useRef } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import { ClipLoader } from 'react-spinners';

function DailyWorkshop() {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const location = useLocation();
    const { id, accidendFileNo } = location.state || {};
    console.log("Received IDssss:", id, accidendFileNo);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [isLoading, setIsLoading] = useState(false);
    const [comingData, setComingData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [existingData, setExistingData] = useState([]);
    const [getData, setGetData] = useState({});
    const [showServices, setShowServices] = useState(true);
    const [photoPreviews, setPhotoPreviews] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [photos, setPhotos] = useState({
        frontLH: null,
        frontRH: null,
        rearLH: null,
        rearRH: null,
        frontView: null,
        rearView: null,
        ChassisNoView: null,
        ClusterView: null,
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null
    });

    console.log("PHOTOS", photos)

    const photoRefs = {
        frontLH: useRef(null),
        frontRH: useRef(null),
        rearLH: useRef(null),
        rearRH: useRef(null),
        frontView: useRef(null),
        rearView: useRef(null),
        ChassisNoView: useRef(null),
        ClusterView: useRef(null),
        MajorDamages1: useRef(null),
        MajorDamages2: useRef(null),
        MajorDamages3: useRef(null),
        MajorDamages4: useRef(null),
        MajorDamages5: useRef(null)
    };


    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        getDataById(id);
        console.log("comingData.accidentFileNo", comingData.accidentFileNo)

        if (comingData.accidentFileNo) getPreviousImages(comingData.accidentFileNo)
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
                advocate: "", workshop: '', mechanic: "", crane: "",
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

    const [formData, setFormData] = useState({
        ...photos,
        todayDate: Date.now().toString(),
        accidentFileNo: comingData.accidentFileNo,
        customerName: comingData.CustomerName,
        vehicleNo: comingData.vehicleNo,
        chassisNo: comingData.chassisNo
    })

    console.log("formDara", formData);

    const getPreviousImages = async (accidentFileNo) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getImagesByAccidentFile/${accidentFileNo}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            console.log("getImagesByAccidentFile", response)
            // setComingData(response.data.data[0])

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const getDataById = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAccidentVehicleInfo/${id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            console.log("getAccidentVehicleInfo", response)
            console.log("getAccidentVehicleInfo", response.data.data[0]);
            setComingData(response.data.data[0])
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file && file.size > 2097152) {
            console.log("File size should be less than 100 KB");
            setAlertInfo({ show: true, message: "File size should be less than 100 KB", severity: 'error' });
            if (photoRefs[type].current) {
                photoRefs[type].current.value = "";
            }
        } else if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotos(prev => ({ ...prev, [type]: file }));
                setPhotoPreviews(prev => ({ ...prev, [type]: reader.result }));
            };
            console.log("PHOTO", photos)
            reader.readAsDataURL(file);
        }
    };
    console.log("157 photo", photos)

    const validateForm = (formDataToValidate) => {
        for (const [key, value] of Object.entries(formDataToValidate)) {
            if (value === null || value === undefined || value === '') {
                return `Field '${key}' is required.`;
            }
            if (value instanceof File && value.size === 0) {
                return `Field '${key}' has an invalid file.`;
            }
        }
        return '';
    }
    const formatDate = (date) => {
        const d = new Date(date);
        const day = ('0' + d.getDate()).slice(-2);  // Adds leading zero if needed and takes the last two digits
        const month = ('0' + (d.getMonth() + 1)).slice(-2);  // Adds leading zero if needed and takes the last two digits
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const todayDate = formatDate(Date.now());

    const onSubmit = async (e) => {
        console.log("SOME")
        e.preventDefault();
        setIsSubmitting(true);
        console.log("ONSUBMIT PHOTOS", photos)
        const complete = {
            ...photos,
            todayDate: todayDate,
            accidentFileNo: comingData.accidentFileNo,
            customerName: comingData.CustomerName,
            vehicleNo: comingData.vehicleNo,
            chassisNo: comingData.chassisNo,
            vendor: comingData.workshop,
        }
        console.log("complete", complete)


        const validationMessage = validateForm(complete);
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsSubmitting(false);
            return;
        }

        const formDataObj = new FormData();
        for (const key in complete) {
            if (complete[key]) {
                if (complete[key] instanceof File) {
                    formDataObj.append(key, complete[key], complete[key].name);
                } else {
                    formDataObj.append(key, complete[key]);
                }
            }
        }
        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }
        console.log(`${process.env.REACT_APP_BACKEND_URL}/api/DialyAccidentVehicleImage/${userId}/${accidendFileNo}`)


        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/DialyAccidentVehicleImage/${userId}/${accidendFileNo}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("RESPONSE", response)
            if (response.status === 200)
                if (response.status === 200) {
                    setAlertInfo({ show: true, message: "Photos uploaded successfully!", severity: 'success' });
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
        }

        console.log('Complete FormData for Submission:', complete);

        setIsSubmitting(false);  // Reset the submitting state after operations are complete
    };
    const handleBack = () => {
        navigate("../WorkshopDashboard")
    }
    return (
        <div className='Customer-master-form'>
            <Helmet>
                <title>Daily Workshop Images - ClaimProAssist</title>
                <meta name="description" content="Daily Workshop Images BVC Claimoro Asist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/DailyWorkshop`} />
            </Helmet>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack} />
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
                        readOnly={IsReadOnly}
                    />
                </label>

                <label className="form-field">
                    Longitude:
                    <input
                        type="text"
                        className='inputField form-control'
                        name="longitude"
                        value={formData.longitude || 0.0}
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
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field"></label>
                <label className="form-field"></label>
            </div>

            <div class='header-container'>
                <h2 className='bigtitle'>Daily Image Upload - Workshop</h2>
            </div>
            <br />
            <div className='form-row'>

                <label className="form-field input-group mb-3">
                    Today's Date:
                    <input
                        type="date"
                        name="systemDate"
                        value={new Date().toISOString().split('T')[0]}
                        className="form-control"
                        readOnly
                    />
                </label>

                <label className="form-field input-group mb-3"></label>
            </div>

            {Object.keys(photos).map((type, index) => (
                <div key={type} className="photo-input-section">
                    <label>
                        {type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                        <input
                            type="file"
                            ref={photoRefs[type]}
                            accept="image/*"
                            capture="camera"
                            className="form-control"
                            onChange={(e) => handleFileChange(e, type)}
                            style={{ marginBottom: "20px" }}
                        />
                    </label>
                    {photoPreviews[type] && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px' }}>
                            <img src={photoPreviews[type]} alt={`Upload preview ${type}`} style={{ width: 100, height: 100 }} />
                            <Button variant="contained" onClick={() => {
                                setPhotos(prev => ({ ...prev, [type]: null }));
                                setPhotoPreviews(prev => ({ ...prev, [type]: null }));
                                if (photoRefs[type].current) {
                                    photoRefs[type].current.value = ""; // Reset the file input
                                }
                            }}>Remove</Button>
                        </div>
                    )}

                </div>
            ))}



            {
                alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )
            }

            <div style={{ textAlign: 'center' }}>
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
            </div>
        </div >

    );
}

export default DailyWorkshop;
