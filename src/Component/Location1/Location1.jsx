import React, { useState, useEffect } from 'react';
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


function Location1({ vehicleData }) {
    console.log("vehicle", vehicleData)
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [location, setLocation] = useState(null);
    const [getData, setGetData] = useState({});
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

    const [formData, setFormData] = useState({
        manualLocation: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        console.log("file", file)
        console.log("FILESIZE",file.size)
        const fileName = file.name;
        if(file){
        if (file && file.size < 102400) {
            console.log("some",file.size)
            const reader = new FileReader();
            reader.onload = () => {
                setPhotos(prev => ({ ...prev, [type]: reader.result }));
                setFileName(prev => ({ ...prev, [type]: fileName }));
            };
            reader.readAsDataURL(file);
        }
        else {
            console.log("some",file.size)
        setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
}
    }

    };

    const handleRemovePhoto = (type) => {
        setPhotos(prev => ({ ...prev, [type]: null }));
        setFileName(prev => ({ ...prev, [type]: null }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const accidentDataObject = { ...fileName, ...vehicleData, latitude, longitude, ...getData, ...formData, selectedOptions };
        console.log("AccidentData", accidentDataObject)
        try {
            try {
                const response = await axios.post(`${backendUrl}/addVehicleInfo`, accidentDataObject);
                if (response.data) {
                    alert(`Your Accident File Number: ${response.data.data}`);
                    console.log("response", response.data.data)
                    setLocation('Photos submitted successfully!');
                    navigate("../")
                    setShowPhotos(false)
                    setShowOptions(true)
                } else {
                    alert('Error: Accident file number was not received.');
                }
            } catch (error) {
                console.error('Failed to submit accident data:', error);
                alert('Failed to submit accident data. Please try again.');
            }

        } catch (error) {
            console.error('Failed to submit photos:', error);
            setLocation('Error: Failed to submit photos.');
            setIsSubmitting(false);
        }
    };


    return (
        <div className="photo-upload-container">
            <Stack spacing={2}>
                <Button variant="contained" onClick={getLocation}>Send Location</Button>
                <p style={{ textAlign: 'center' }}>OR</p>
                {!location && (
                <label className="form-field">
                    <p style={{ marginBottom: "20px" }}> Manual Location :</p>
                    <textarea
                        name="manualLocation"
                        value={FormData.manualLocation}
                        onChange={handleChange}
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
                            <Input
                                type="file"
                                disableUnderline
                                inputProps={{
                                    accept: 'image/*',
                                    capture: "camera"  // This prompts devices to offer taking a new picture with the camera
                                }}

                                onChange={(e) => handleFileChange(e, type)}
                            />
                        </label>
                        {photos[type] && (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <img src={photos[type]} alt={`Upload preview ${type}`} style={{ width: 100, height: 100 }} />
                                <Button variant="outlined" color="error" onClick={() => handleRemovePhoto(type)}>Remove</Button>
                            </Stack>
                        )}
                    </div>
                ))}


                <div style={{
                    margin: '20px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {choosenPlan && (
                        <div>
                            <h3 style={{ color: '#333', marginBottom: '15px' }}>Select Your Services</h3>
                            {optionstoshow.map((option, index) => (
                                <label key={index} style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontSize: '16px',
                                    color: '#666'
                                }}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}:
                                    <input
                                        type="checkbox"
                                        style={{ marginRight: '10px' }}
                                        checked={selectedOptions.includes(option)}
                                        onChange={() => handleCheckboxChange(option)}
                                    />
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
                    Submit Photos
                </Button>
            </Stack>

        </div>
    );
}

export default Location1;
