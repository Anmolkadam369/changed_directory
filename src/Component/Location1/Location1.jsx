import React, { useState, useEffect, useRef } from 'react';
import './Location1.css';
import "../ImageUpload/ImageUpload.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { constSelector, useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import Snackbar from '@mui/material/Snackbar';
import { Helmet } from 'react-helmet';



function Location1({ vehicleData }) {
    console.log("vehicle", vehicleData)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [location, setLocation] = useState(null);
    const [getData, setGetData] = useState({});
    const [showServices, setShowServices] = useState(true);
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

    const [formData, setFormData] = useState({
        manualLocation: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoPreviews, setPhotoPreviews] = useState({});
    const [fileName, setFileName] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [options, setOptions] = useState([]);
    const choosenPlan = getData.choosenPlan;
    console.log("choosenpa", choosenPlan)
    const allOptions = ['advocate', 'workshop', 'onsite temperory repair', 'crain'];
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const getOptionsToShow = () => {
        switch (choosenPlan) {
            case 'advanced':
                return allOptions;  // Show all options
            case 'plus':
                return allOptions.filter(option => option !== 'advocate');  // Remove 'advocate'
            case 'pro':
                return allOptions.filter(option => option !== 'advocate' && option !== 'onsite temperory repair' && option !== 'crain');  // Remove 'advocate', 'onsite repair', 'crain'
            default:
                return [];
        }
    };

    const optionstoshow = getOptionsToShow();

    console.log("potion", selectedOptions)

    const handleCheckboxChange = (option) => {
        setSelectedOptions(prev => {
            if (prev.includes(option)) {
                return prev.filter(item => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    useEffect(() => {
        if (token === "" || userId === "") {
            navigate("/");
        }
        findUserById(userId);
        setShowPhotos(true);
    }, [token, userId, navigate]);

    const findUserById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/findByIdCustomer/${id}`);
        setGetData(response.data.data[0]);
        console.log(getData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setLocation("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`Latitude: ${lat}, Longitude: ${lon}`);
        setLatitude(lat);
        setLongitude(lon);
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setLocation("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setLocation("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setLocation("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setLocation("An unknown error occurred.");
                break;
        }
    };

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file && file.size > 2097152) {
            console.log("File size should be less than 2 MB!");
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

    const validateForm = () => {
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'frontLH' || key === 'frontRH' || key === 'rearLH' || key === 'rearRH' || key === 'rearView' || key === 'ChassisNoView' || key === 'ClusterView' || key === 'MajorDamages1' || key === 'MajorDamages2' || key === 'MajorDamages3' || key === 'MajorDamages4' || key === 'MajorDamages5') {
                if (value === null || value === undefined || value.size === 0)
                    return `Field '${key}' is required.`;
            }
            if (key === 'manualLocation' || latitude != null && longitude != null)
                return '';

            if (value === '') {
                return `Field '${key}' is required.`;
            }
        }
        return '';
    }

    const handleRemovePhoto = (type) => {
        setPhotos(prev => ({ ...prev, [type]: null }));
        setFileName(prev => ({ ...prev, [type]: null }));
    };

    const accidentDataObject = { ...photos, ...vehicleData, latitude, longitude, ...getData, ...formData, selectedOptions };
console.log("accidentData", accidentDataObject)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("some")
        const validationMessage = validateForm();
        if (validationMessage) {
            setSnackbarMessage(validationMessage);
            setOpenSnackbar(true);
            return;
        }

        const accidentDataObject = { ...photos, ...vehicleData, latitude, longitude, ...getData, ...formData, selectedOptions };
        console.log('Form data submitted:', accidentDataObject);
        console.log("AccidentData", accidentDataObject)
        const formDataObj = new FormData();
        for (const key in accidentDataObject) {
            if (accidentDataObject[key]) {  // Check if the data is not undefined or null
                if (accidentDataObject[key] instanceof File) {
                    console.log("FILES")
                    console.log("file", accidentDataObject[key])
                    formDataObj.append(key, accidentDataObject[key], accidentDataObject[key].name);
                } else {
                    formDataObj.append(key, accidentDataObject[key]);
                }
            }
        }

        try {
            try {
                console.log("FOMRDATA")
                for (let pair of formDataObj.entries()) {
                    console.log(`${pair[0]}:`, pair[1]);
                }
                const response = await axios({
                    method: 'POST',
                    url: `${backendUrl}/addVehicleInfo`,
                    data: formDataObj,
                    headers: {
                        'Authorization': token
                    }
                });
                console.log("response", response.data);
                setSnackbarMessage("Form submitted successfully!");
                setOpenSnackbar(true);

            } catch (error) {
                console.error("Error during form submission:", error);
                setSnackbarMessage("Failed to submit the form.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Failed to submit photos:', error);
            setLocation('Error: Failed to submit photos.');
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        setShowServices(!showServices);  // Hide the services div and show the message
    };


    return (
        <div className="photo-upload-container">
                        <Helmet>
                <title>Get Location of Accident Veehicle - Claimpro</title>
                <meta name="description" content="Get Location of Accident Veehicle and photos of vehicle." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            </Helmet>
            <Stack spacing={2}>
                <Button variant="contained" onClick={getLocation}>Send Location</Button>
                <p style={{ textAlign: 'center' }}>OR</p>
                {!location && (
                    <label className="form-field input-group mb-3">
                        <p style={{ marginBottom: "20px" }}> Manual Location :</p>
                        <textarea
                            name="manualLocation"
                            value={FormData.manualLocation}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                )}
                {location && (location.startsWith("Error:") ? <Alert severity="error">{location}</Alert> : <Alert severity="success">{location}</Alert>)}
                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}
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


                <div style={{
                    padding: '20px',
                    backgroundColor: 'rgb(233 223 223)',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>


                        {showServices ? (
                            choosenPlan ? (
                                <div style={{ position: 'relative', color: '#333', marginBottom: '15px' }}>
                                <h3>Select Your Services</h3>
                                {optionstoshow.map((option, index) => (
                                    <label key={index} style={{
                                        display: 'block',
                                        marginBottom: '10px',
                                        marginTop:"20px",
                                        fontSize: '16px',
                                        color: '#666'
                                    }}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                        <input
                                            type="checkbox"
                                            style={{ marginRight: '10px', marginLeft: "10px" }}
                                            checked={selectedOptions.includes(option)}
                                            onChange={() => handleCheckboxChange(option)}
                                        />
                                    </label>
                                ))}
                                <button onClick={handleSkip} style={{ 
                                    position: 'absolute', 
                                    top: '0', 
                                    right: '0', 
                                    padding: '5px 10px', 
                                    border: 'none', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer', 
                                    backgroundColor: ' rgb(62 55 0 / 17%)', 
                                    color: 'white' 
                                }}>
                                    Skip
                                </button>
                            </div>
                            
                            ) : (
                                <p>We will provide the best services, don't worry!</p>
                            )
                        ) : (
                            <div>
                            <h4 style={{color:"blue"}}>We will provide the best services, don't worry!</h4>
                            <button onClick={handleSkip} style={{ padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: ' rgb(62 55 0 / 17%)', color: 'white', marginTop:"10px" }}>i want to select</button>
                            </div>
                        )}

                </div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>


                <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
                    Submit Photos
                </Button>
            </Stack>

        </div>
    );
}

export default Location1;