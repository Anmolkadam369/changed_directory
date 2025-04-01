import React, { useState, useEffect, useRef } from 'react';
import './Location1.css';
import "../ImageUpload/ImageUpload.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
// '../../environment';
import { Helmet } from 'react-helmet-async';
import { ClipLoader } from 'react-spinners';
import repairingonstand123 from '../../Assets/repairingonstand123.avif'
import repairingonstand from '../../Assets/repairingonstand.jpg'
import locationiconforlocation from '../../Assets/locationiconforlocation.jpeg'


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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/findByIdCustomer/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
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
                url: `${process.env.REACT_APP_BACKEND_URL}/addVehicleInfo`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
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
    const [pin, setPin] = useState("");
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

    console.log("FORMDATA908", formData)
    const fullAddress1 = `${fullAddress}, ${district},${pin}, ${selectedState}`;
    console.log("fulladdresss", fullAddress1)
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(fullAddress1)}`;
    console.log("url", url)

    useEffect(() => {
        const getLonLat = async () => {
            try {
                console.log("fulladdresskill", fullAddress1)
                const response = await axios.get(url);
                console.log("response latitude", response.data)
                const location = response.data[0];
                setAccidentLatitude(location.lat);
                setAccidentLongitude(location.lon);
                console.log(`ANMOL Latitudehere: ${location.lat}, Longitudehere: ${location.lon}`)
                setLocation(` Latitude: ${location.lat}, Longitude: ${location.lon}`);
            } catch (error) {
                // setLocation("An error occurred while fetching the coordinates.");
            }
        }
        getLonLat()
    }, [fullAddress1])

    const texts = [
        { text: 'Accident Vehicles', color: 'blue' },
        { text: 'Crane ', color: 'red' },
        { text: 'Mechanic', color: 'green' },
        { text: 'Workshop', color: 'orange' },
        { text: 'Advocate', color: 'lightblue' },

    ];
    const [currentColor, setCurrentColor] = useState(texts[0].color);
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);    
    const [showImageDiv, setShowImageDiv] = useState(true)

    useEffect(() => {
        const handleTyping = () => {
            const current = texts[index];
            const currentText = current.text;
            if (deleting) {
                setDisplayText((prev) => prev.slice(0, -1));
                if (displayText === '') {
                    setDeleting(false);
                    setIndex((prev) => (prev + 1) % texts.length);
                    setCurrentColor(texts[(index + 1) % texts.length].color);
                }
            } else {
                setDisplayText((prev) => currentText.slice(0, charIndex + 1));
                if (charIndex === currentText.length - 1) {
                    setDeleting(true);
                }
            }
            setCharIndex((prev) => (deleting ? prev - 1 : prev + 1));
        };

        const timer = setInterval(handleTyping, deleting ? 100 : 150);

        return () => clearInterval(timer);
    }, [displayText, index, charIndex, deleting]);


    return (
        <div style={{ display: 'flex' }}>
            <div style={{...(window.innerWidth <= 768 && {
                    display:'none'
                })}}>

            <div style={{
                marginTop: "50px",
                borderRadius: "30px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                padding: "20px",
                background: "radial-gradient(circle at left, #ffffff00, #8888eb) left / 200% no-repeat",
                backgroundPosition: "0 200px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "200% 100%",
                width: "100%",
                height: "200vh",
                marginRight: "30px",
                ...(window.innerWidth <= 768 && {
                    padding: "10px",
                    borderRadius: "20px",
                    gap: "15px",
                    height: "auto"
                })
            }}>
                <img
                    src={repairingonstand123}
                    alt="Repairing on Stand 1"
                    style={{
                        margin: "20px",
                        height: "300px",
                        width: "100%",
                        maxWidth: "500px",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                        ...(window.innerWidth <= 768 && {
                            height: "200px",
                            width: "100%",
                            margin: "10px"
                        })
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />

                <h1 style={{
                    fontSize: "1.5rem",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#333",
                    textAlign: "center",
                    margin: "20px 0",
                    textShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
                    animation: "fadeIn 1s ease",
                    position: "relative",
                    zIndex: 1,
                    ...(window.innerWidth <= 768 && {
                        fontSize: "1.2rem",
                        margin: "10px 0"
                    })
                }}>
                    Professional Assistance for
                    <span style={{
                        color: currentColor,
                        marginLeft: "10px",
                        transition: "color 0.5s ease",
                        fontWeight: "bold",
                        textShadow: `0px 0px 8px ${currentColor}`
                    }}>{displayText}</span>
                </h1>

                <p style={{
                    color: 'green',
                    fontSize: "15px",
                    ...(window.innerWidth <= 768 && {
                        fontSize: "13px",
                        textAlign: "center"
                    })
                }}>
                    "We’re here to support you through the tough times. From accidents to unexpected breakdowns, our team is ready to provide the assistance you need to get back on track. Trust us to be there when it matters most."
                </p>

                <img
                    src={repairingonstand}
                    alt="Repairing on Stand 2"
                    style={{
                        margin: "20px",
                        height: "300px",
                        width: "100%",
                        maxWidth: "500px",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                        ...(window.innerWidth <= 768 && {
                            height: "200px",
                            width: "100%",
                            margin: "10px"
                        })
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
            </div>
            </div>


            <div className="photo-upload-container" style={{
                margin: "20px",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                background: "repeating-linear-gradient(45deg, #ecf4ec, transparent 100px)",
                ...(window.innerWidth <= 768 && {
                    padding: "15px",
                    margin: "10px",
                    borderRadius: "15px"
                })
            }}>
                <Helmet>
                    <title>Get Location of Accident Veehicle - Claimpro</title>
                    <meta name="description" content="Get Location of Accident Veehicle and photos of vehicle." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/Location1`} />
                </Helmet>
                <Stack spacing={2}>
                    <p style={{ margin: '20px', fontSize: "14px" }}>Send Location (Real Time Location):</p>

                    <Button style={{ "background": "#fcfcfc","color":"#000000","fontWeight": "bold"}} variant="contained" onClick={getLocation}><img src={locationiconforlocation} style={{height:'30px', width:"40px"}}/>Send Location</Button>


                    <p style={{ marginTop: '30px', fontSize: "13px" }}>Send Location Of Address (If You Are Not On The Spot):</p>
                    <div className='form-row'>
                        <label className="dropdown green-dropdown form-field col-md-6" style={{ marginBottom: '10px' }}>
                            State :
                            <select className="form-field input-group mb-3"
                                name="state"
                                style={{
                                    borderRadius: "5px",
                                    background: 'white',
                                    marginTop: "0px",
                                    padding:"10px",
                                    border: '1px solid #d8d6d6',
                                    width: '100%' // Full-width to match the button style
                                }}
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
                        <label className="dropdown green-dropdown form-field col-md-6" style={{ marginBottom: '10px' }}>
                            City :
                            <select className="form-field input-group mb-3"
                                name="district"
                                style={{
                                    borderRadius: "5px",
                                    background: 'white',
                                    marginTop: "0px",
                                    border: '1px solid #d8d6d6',
                                    padding:"10px",
                                    width: '100%' // Full-width to match the button style
                                }}
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
                     

                    </div>

                    <div className='form-row'>
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
                        <label className="form-field">
                            Pin code :
                            <input
                                type='text'
                                name="pin"
                                value={pin} // Use fullAddress state
                                onChange={(e) => setPin(e.target.value)} // Update state directly
                                required
                                className="form-control"
                                placeholder="Pin Code"
                            />
                        </label>
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
                    </div>
                    {location && (location.startsWith("Error:") ? <Alert severity="error">{location}</Alert> : <Alert severity="success">{location}</Alert>)}

               {showImageDiv &&(
                 <div style={{border: "2px dotted green", background:"aliceblue", boxShadow:"rgb(197 205 194) 3px 3px 8px 15px", padding:"10px"}}>
                    <h3 style={{margin:"20px", textDecoration:'underline'}}>Vehicle Image (Optional)</h3>
                    {Object.keys(photos).map((type, index) => (
                        <div key={type} className="photo-input-section">
                            <label>
                               <h6 style={{fontSize:"11px"}}>{type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</h6> 
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
                </div>
                )}


                        {/* <br /> */}

                    <div style={{
                        padding: '20px',
                        backgroundColor: 'rgb(233 223 223)',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>


                        {showServices ? (
                            choosenPlan ? (
                                <div style={{ position: 'relative', color: '#333', marginBottom: '10px' }}>
                                    <h3>Select Your Services</h3>
                                    {optionstoshow.map((option, index) => (
                                        <label key={index} style={{
                                            display: 'block',
                                            marginBottom: '10px',
                                            marginTop: "10px",
                                            fontSize: '13px',
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
        </div>
    );
}

export default Location1;