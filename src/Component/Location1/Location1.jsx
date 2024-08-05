import React, { useState, useEffect, useRef } from 'react';
import './Location1.css';
import "../ImageUpload/ImageUpload.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import Snackbar from '@mui/material/Snackbar';
import { Helmet } from 'react-helmet-async';
import { ClipLoader } from 'react-spinners';

function Location1({ vehicleData }) {
    console.log("vehicle", vehicleData)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [accidentLatitude, setAccidentLatitude] = useState("");
    const [accidentLongitude, setAccidentLongitude] = useState("");
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
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoPreviews, setPhotoPreviews] = useState({});
    const [fileName, setFileName] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState([]);
    const choosenPlan = getData.choosenPlan;
    console.log("choosenpa", choosenPlan);
    const allOptions = ['advocate', 'workshop', 'onsite temperory repair', 'crane'];
    const [selectedOptions, setSelectedOptions] = useState([]);

    const getOptionsToShow = () => {
        switch (choosenPlan) {
            case 'advanced':
                return allOptions;  // Show all options
            case 'plus':
                return allOptions.filter(option => option !== 'advocate');  // Remove 'advocate'
            case 'pro':
                return allOptions.filter(option => option !== 'advocate' && option !== 'onsite temperory repair' && option !== 'crane');  // Remove 'advocate', 'onsite repair', 'crane'
            default:
                return [];
        }
    };

    const optionstoshow = getOptionsToShow();

    console.log("potion", selectedOptions);

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
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        findUserById(userId);
        setShowPhotos(true);
    }, [token, userId, navigate]);

    const findUserById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/findByIdCustomer/${id}`);
        setGetData(response.data.data[0]);
        console.log(getData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleaccidentLatitudeChange = (e) => {
        setAccidentLatitude(e.target.value);
    };

    const handleaccidentLongitudeChange = (e) => {
        setAccidentLongitude(e.target.value);
    };

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
        setAccidentLatitude(lat);
        setAccidentLongitude(lon);
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
            setAlertInfo({ show: true, message: "File size should be less than 2 MB", severity: 'error' });
            if (photoRefs[type].current) {
                photoRefs[type].current.value = "";
            }
        } else if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotos(prev => ({ ...prev, [type]: file }));
                setPhotoPreviews(prev => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const requiredPhotos = ['frontLH', 'frontRH', 'rearLH', 'rearRH', 'frontView', 'rearView', 'ChassisNoView', 'ClusterView', 'MajorDamages1', 'MajorDamages2', 'MajorDamages3', 'MajorDamages4', 'MajorDamages5'];
        for (const photo of requiredPhotos) {
            if (!photos[photo]) {
                return `Field '${photo}' is required.`;
            }
        }
        if (!accidentLatitude || !accidentLongitude) {
            return 'Accident location coordinates are required.';
        }
        return '';
    };

    const handleRemovePhoto = (type) => {
        setPhotos(prev => ({ ...prev, [type]: null }));
        setFileName(prev => ({ ...prev, [type]: null }));
    };

    const accidentDataObject = { ...photos, ...vehicleData, accidentLatitude, accidentLongitude, ...getData, ...formData, selectedOptions };
    console.log("accidentData", accidentDataObject);
    console.log("accidentLongitude", accidentLongitude, "accidentLatitude", accidentLatitude);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsLoading(true);
        const validationMessage = validateForm();
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsSubmitting(false);
            setIsLoading(false);
            return;
        }

        const formDataObj = new FormData();
        for (const key in accidentDataObject) {
            if (accidentDataObject[key]) {  // Check if the data is not undefined or null
                if (accidentDataObject[key] instanceof File) {
                    formDataObj.append(key, accidentDataObject[key], accidentDataObject[key].name);
                } else {
                    formDataObj.append(key, accidentDataObject[key]);
                }
            }
        }

        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/addVehicleInfo`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });
            setIsLoading(false);
            setAlertInfo({ show: true, message:"Data Successfully Added", severity: 'success' });
        } catch (error) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } finally {
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
                <link rel='canonical' href={`https://claimpro.in/Location1`} />
            </Helmet>
            <Stack spacing={2}>
            <p style={{marginTop:'20px'}}>Send Location (Real Time Location):</p>

                <Button variant="contained" onClick={getLocation}>Send Location</Button>

                <p style={{marginTop:'30px'}}>Send Location Of Address (If You Are Not On The Spot):</p>
                    <label className='form-field'>
                        Accident Latitude:
                        <input
                            type="text"
                            placeholder='Accident Latitude'
                            value={accidentLatitude}
                            onChange={handleaccidentLatitudeChange}
                            className="form-control"
                            required
                        />
                    </label>

                    <label className='form-field'>
                        Accident Longitude:
                        <input
                            type="text"
                            placeholder='Accident Longitude'
                            value={accidentLongitude}
                            onChange={handleaccidentLongitudeChange}
                            className="form-control"
                            required
                        />
                    </label>

                {location && (location.startsWith("Error:") ? <Alert severity="error">{location}</Alert> : <Alert severity="success">{location}</Alert>)}

                {Object.keys(photos).map((type, index) => (
                    <div key={type} className="photo-input-section">
                        <label>
                            {type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                            <input
                                type="file"
                                ref={photoRefs[type]}
                                accept="image/*"
                                capture="environment"
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
                                        marginTop: "20px",
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
                            <h4 style={{ color: "blue" }}>We will provide the best services, don't worry!</h4>
                            <button onClick={handleSkip} style={{ padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: ' rgb(62 55 0 / 17%)', color: 'white', marginTop: "10px" }}>i want to select</button>
                        </div>
                    )}

                </div>

                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
              disabled={isLoading} // Disable button while loading
              onClick={handleSubmit}
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

            </Stack>

        </div>
    );
}

export default Location1;