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

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};


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
            setAlertInfo({ show: true, message: "Data Successfully Added", severity: 'success' });
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

    const [fullAddress, setFullAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [states, setStates] = useState([]); // Correctly define states to hold the list of states
    const [selectedState, setSelectedState] = useState(""); // State to track the selected state
    const [cities, setCities] = useState([]); // State to hold the list of cities
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [isLoadingStates, setIsLoadingStates] = useState(true);



    useEffect(() => {
        loadStates();
    }, []); // Assuming 'token' and 'userId' are not needed here or should be replaced

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error("Error loading states:", error);
                setIsLoadingStates(false);
            });
    };

    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error("Error loading cities:", error);
                setIsLoadingCities(false);
            });
    };
    console.log("fullAddresss11222", fullAddress)

    useEffect(() => {
        const getLonLat = async () => {
            try {
                if (fullAddress && fullAddress.trim() !== "") {  // Ensure fullAddress is not null or empty
                    const fullAddress1 = `${fullAddress}, ${district}, ${selectedState}`;
                    console.log("Full address:", fullAddress1);
                    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress1)}`;

                    const response = await axios.get(url);
                    console.log("Response latitude:", response);

                    const location = response.data[0];
                    if (location) {
                        setAccidentLatitude(location.lat);
                        setAccidentLongitude(location.lon);
                        console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
                        setLocation(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
                    } else {
                        console.log("No location found");
                    }
                } else {
                    console.log("Full address is null or empty, not making API call.");
                }
            } catch (error) {
                console.error("An error occurred while fetching the coordinates:", error);
            }
        };

        getLonLat();
    }, [fullAddress, district, selectedState]); // Add district and selectedState to dependency array



    return (
        <div className="photo-upload-container">
            <Helmet>
                <title>Get Location of Accident Veehicle - Claimpro</title>
                <meta name="description" content="Get Location of Accident Veehicle and photos of vehicle." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/Location1`} />
            </Helmet>
            <Stack spacing={2}>
                <p style={{ marginTop: '20px' }}>Send Location (Real Time Location):</p>

                <Button variant="contained" onClick={getLocation}>Send Location</Button>


                <p style={{ marginTop: '30px' }}>Send Location Of Address (If You Are Not On The Spot):</p>
                <div className='form-row'>
                    <label className="form-field input-group mb-3">
                        Accident Place - State:
                        <select className="form-field input-group mb-3"
                            name="state"
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedState(value);
                                loadCities(value);
                            }}
                            disabled={isLoadingStates}
                            value={selectedState}
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field input-group mb-3">
                        Accident Place - City:
                        <select className="form-field input-group mb-3"
                            name="district"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            disabled={isLoadingCities || !selectedState}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field">
                        Address :
                        <textarea
                            name="fullAddress"
                            value={fullAddress} // Use fullAddress state
                            onChange={(e) => setFullAddress(e.target.value)} // Update state directly
                            required
                            className="form-control"
                            placeholder="Full Address"
                        />
                    </label>
                    <label className='form-field'></label>
                </div>

                <div className='form-row'>
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
                    <label className='form-field'></label>
                    <label className='form-field'></label>
                </div>
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