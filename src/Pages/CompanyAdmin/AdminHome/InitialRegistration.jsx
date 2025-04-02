import React, { useState, useEffect, useRef } from 'react';
import  '../../Customers/Registration/Registration';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import Modal from '../../../Component/CompanyAdmin/Location1/Modal';
import { Helmet } from 'react-helmet-async';
import crossUser from '../../../Assets/crossUser.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import repairingonstand123 from '../../../Assets/repairingonstand123.avif'
import repairingonstand from '../../../Assets/repairingonstand.jpg'
import checksuccess from '../../../Assets/checksuccess.png'
import SuccessIcon from '../../../Component/Vendors/FirstAppearComponent/CaseFirstCard/SuccessIcon';
import Admin from './SideBar/Admin';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

function InitialRegistration() {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [regNo, setRegNo] = useState('');
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [comingVehicleInfo, setComingVehicleInfo] = useState([]);
    const [comingVehicle, setComingVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [getData, setGetData] = useState({});
    const [showPopup, setShowPopup] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const { isItDone } = useLocation();


    console.log("comingData", comingVehicle)

    useEffect(() => {
        if (vehicleInfo.length !== 0) {
            setComingVehicleInfo([vehicleInfo[0].data]);
        }
    }, [vehicleInfo]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {

    }, [token, userId, navigate]);

    const texts = [
        { text: 'Accident Vehicles', color: 'blue' },
        { text: 'Crane ', color: 'red' },
        { text: 'Mechanic', color: 'green' },
        { text: 'Workshop', color: 'orange' },
        { text: 'Advocate', color: 'lightblue' },

    ];
    const [currentColor, setCurrentColor] = useState(texts[0].color);
    const [displayText, setDisplayText] = useState('');



    async function getVehicleData() {
        try {
            const getData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/VehicleDetails/${regNo}/crane/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
            if (getData.data.message === 'Vehicle found') {
                setVehicleInfo([getData.data]);
                setComingVehicle(getData.data);
                setIsModalOpen(true); // Open the modal when data is found
            } else {
                setAlertInfo({ show: true, message: getData.data.message, severity: 'success' });
            }
        } catch (error) {
            setAlertInfo({ show: true, message: error.response?.data?.message || 'An error occurred', severity: 'error' });
        }
    }

    const handleChange = (event) => {
        setRegNo(event.target.value);
        localStorage.setItem('regNo', event.target.value);
    };

    useEffect(() => {
        const storedRegNo = localStorage.getItem('regNo');
        if (storedRegNo) {
            setRegNo(storedRegNo);
        }
        if (localStorage.getItem('isVerified') === 'true') {
            setIsVerified(true)
        }
    }, []);

    const handleNext = () => {
        // onVehicleData(comingVehicle);
        setIsVerified(true)
        localStorage.setItem('isVerified', "true");
        closeModal()
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [photoPreviews, setPhotoPreviews] = useState({});
    const [photos, setPhotos] = useState({
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null
    });
    const photoRefs = {

        MajorDamages1: useRef(null),
        MajorDamages2: useRef(null),
        MajorDamages3: useRef(null),
        MajorDamages4: useRef(null),
        MajorDamages5: useRef(null)
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

    const [showImageDiv, setShowImageDiv] = useState(false)
    const [isMaterialLoaded, setIsMaterialLoaded] = useState(false)
    const [quantity, setQuantity] = useState('')
    const [budget, setBudget] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState('')
    const [onSpotName, setOnSpotName] = useState('')
    const [onSpotContact, setOnSpotContact] = useState('')



    const [fullAddress, setFullAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [district, setDistrict] = useState("");
    const [states, setStates] = useState([]); // Correctly define states to hold the list of states
    const [selectedState, setSelectedState] = useState(""); // State to track the selected state
    const [pin, setPin] = useState("");
    const [cities, setCities] = useState([]); // State to hold the list of cities
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecoveryVan, setIsRecoveryVan] = useState(false);
    const [successDone, setSuccessDone] = useState(false);



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

    // console.log("FORMDATA908", formData)
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
                setLatitude(location.lat);
                setLongitude(location.lon);
                console.log(`ANMOL Latitudehere: ${location.lat}, Longitudehere: ${location.lon}`)
                setLocation(` Latitude: ${location.lat}, Longitude: ${location.lon}`);
            } catch (error) {
                // setLocation("An error occurred while fetching the coordinates.");
            }
        }
        getLonLat()
    }, [fullAddress1])

    const getLocation = () => {
        setLatitude('')
        setLongitude('')
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

    const accidentDataObject = { regNo, fullAddress, states, district, pincode, onSpotContact, onSpotName, isRecoveryVan, isMaterialLoaded, quantity, budget, ...photos, ...comingVehicle, latitude, longitude, ...getData, selectedOptions: 'crane' };
    
    const handleSubmit = async (e) => {
        console.log("budget", budget)
        // setSuccessDone(true)
        setIsVerified(false)
        console.log("accidentDataObject", accidentDataObject)

        e.preventDefault();

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
            setAlertInfo({ show: true, message: "Data Successfully Inserted.", severity: 'success' });
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
        }
    };

    const { state } = useLocation();
    useEffect(() => {
        // Log the 'center' from the passed state
        console.log("state Data", state)
        if (state?.center) {
            console.log("Center in Previous Page:", state.center);
            setLatitude(state.center[0])
            setLongitude(state.center[1])

            setIsVerified(true)
        }

    }, [state]);


    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.701, 77.1025], fromPage:'Admin' } })
    }

    const [byManualLocation, setByManualLocation] = useState(false)

    return (
        <div>
            <Admin/>
            <div className="Registrationdetails-elem-16">
                <Helmet>
                    <title>Customer Service Vehicle Number - Claimpro</title>
                    <meta name="description" content="Customer Service Vehicle for BVC ClaimPro Assist to register the vehicle and get data about vehicle." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services , Hydra Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/Register`} />
                </Helmet>

                <div style={{ display: 'flex', flexDirection: "rows" }}>



                    <div style={{ marginRight: "30px" }}>
                        <div style={{
                            ...(window.innerWidth <= 768 && {
                                display: 'none'
                            })
                        }}>

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
                                width: "90%",
                                height: "150vh",
                                // marginRight: "30px",
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
                    </div>

                    <div className="Registrationdetails-elem-15" >
                        <div className="Registrationdetails-elem-14">
                            <span className="cd-paragraph-clean Registrationdetails-elem-7">
                            </span>
                            <div className="Registrationdetails-elem-13">
                                <div className="Registrationdetails-elem-11">
                                    <div className="Registrationdetails-elem-10">
                                        <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}><em> Accident Vehicle Details</em></p>
                                        {/* <span className="cd-paragraph-clean Registrationdetails-elem-8"> */}

                                        <p style={{ fontSize: "12px", fontWeight: "bold" }}>Vehicle No OR Chassis No</p>
                                        {/* </span> */}
                                        <div style={{ display: "flex" }}>

                                            <input
                                                type="text"
                                                className="Registrationdetails-elem-9"
                                                style={{ textAlign: 'left', margin: '10px 10px 10px 0px', width: '80%' }}
                                                value={regNo}
                                                placeholder='RJ 03 ED 2343'
                                                onChange={handleChange}
                                                disabled={getData.isActive === "false"}
                                            />

                                            {/* <div style={{ border: "1px solid" }}> hey </div> */}
                                            {!isVerified && (
                                                <button type="button" onClick={getVehicleData} style={{ fontSize: "10px", height: "30px", marginTop: "10px", marginRight: "10px", fontWeight: "bold" }} class="btn btn-success">Check</button>
                                            )}
                                            {isVerified && (
                                                <img src={checksuccess} style={{ marginTop: '15px', height: "25px", width: '25px' }} />
                                            )}
                                        </div>

                                        {/* <div>
                                        <p style={{ fontSize: '13px', marginTop: "20px" }}> Spot-On Person Details </p>
                                        <div style={{
                                            marginTop: "20px",
                                            border: '1px solid',
                                            borderRadius: "20px",
                                            padding: '20px',
                                            background: "radial-gradient(#7395c0, transparent)",
                                            position: 'relative',
                                            maxWidth: "400px"
                                        }}>
                                            <div style={{ content: '', position: 'absolute', top: '-10px', left: '20%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid rgb(206 209 209)' }}></div>
                                            <p style={{ fontSize: '11px' }}> Full Name :  </p>

                                            <input
                                                type="text"
                                                className="Registrationdetails-elem-9"
                                                style={{ textAlign: 'center', width: '90%' }}
                                                value={regNo}
                                                placeholder='Full Name'
                                                onChange={handleChange}
                                                disabled={getData.isActive === "false"}
                                            />

                                            <div style={{ display: 'flex', marginTop: "20px" }}>
                                                <div>
                                                    <p style={{ fontSize: '11px', marginBottom: "0px" }}> Contact No </p>
                                                    <input
                                                        type="text"
                                                        className="Registrationdetails-elem-9"
                                                        style={{ textAlign: 'center', width: '80%' }}
                                                        value={regNo}
                                                        placeholder='Contact No'
                                                        onChange={handleChange}
                                                        disabled={getData.isActive === "false"}
                                                    />
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: '11px', marginBottom: "0px" }}> Alternate No </p>
                                                    <input
                                                        type="text"
                                                        className="Registrationdetails-elem-9"
                                                        style={{ textAlign: 'center', width: '80%' }}
                                                        value={regNo}
                                                        placeholder='Contact No'
                                                        onChange={handleChange}
                                                        disabled={getData.isActive === "false"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                        {isVerified && (

                                            <div>



                                                <div class="col-sm-6" >
                                                    <div class="card" style={{ marginBottom: "20px", maxWidth: "400px", minWidth: "300px" }}>
                                                        <div class="card-body">
                                                            <h5 class="card-title" style={{ textAlign: 'center', fontSize: "13px", fontWeight: "bold", color: 'blue' }}>Spot-On Person Details</h5>
                                                            {/* <div style={{ content: '', position: 'absolute', top: '-10px', left: '20%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid rgb(206 209 209)' }}></div> */}

                                                            <div style={{ display: 'flex', marginTop: "20px" }}>
                                                                <div>
                                                                    <p style={{ fontSize: '11px', marginBottom: "0px" }}> Full Name </p>
                                                                    <input
                                                                        type="text"
                                                                        className="Registrationdetails-elem-9"
                                                                        style={{ textAlign: 'center', width: '90%' }}
                                                                        value={onSpotName}
                                                                        placeholder='Spot Person Name'
                                                                        onChange={(e) => setOnSpotName(e.target.value)}
                                                                        disabled={getData.isActive === "false"}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p style={{ fontSize: '11px', marginBottom: "0px" }}> Contact No </p>
                                                                    <input
                                                                        type="text"
                                                                        className="Registrationdetails-elem-9"
                                                                        style={{ textAlign: 'center', width: '90%' }}
                                                                        value={onSpotContact}
                                                                        placeholder='Contact No'
                                                                        onChange={(e) => {
                                                                            const newValue = e.target.value;
                                                                            if (/^\d{0,10}$/.test(newValue)) {
                                                                                setOnSpotContact(newValue);
                                                                            }
                                                                        }}

                                                                        disabled={getData.isActive === "false"}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <br /> */}

                                                {showImageDiv && (<div style={{ padding: "10px" }}>


                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <span style={{ margin: "13px", textDecoration: 'underline' }}>Vehicle Image (Optional)</span>
                                                        <img src={crossUser} style={{ width: '20px', height: '20px', marginLeft: 'auto' }} onClick={(e) => { setShowImageDiv(false) }} />
                                                    </div>



                                                    {Object.keys(photos).map((type, index) => (
                                                        <div key={type} style={{ display: 'flex' }} className="photo-input-section">
                                                            <label>
                                                                <h6 style={{ fontSize: "11px" }}>{type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</h6>
                                                                <input
                                                                    type="file"
                                                                    style={{ fontSize: '0.7rem', marginBottom: "10px" }}
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

                                                </div>)}
                                                {!showImageDiv && (

                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span onClick={(e) => setShowImageDiv(true)} style={{ fontSize: "13px", marginRight: "20px" }}>Share Accident Images ?</span>
                                                        <div style={{
                                                            border: "1px solid blue",
                                                            padding: "3px",
                                                            textAlign: "center",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "10px",
                                                            background: "radial-gradient(#818181, transparent)",
                                                            padding: '10px',
                                                            backgroundColor: '#4a4a4a',
                                                            color: 'white'

                                                        }}>
                                                            <span
                                                                style={{ fontSize: '11px', cursor: 'pointer' }}
                                                                onClick={(e) => { setShowImageDiv(true) }}
                                                            >
                                                                Accident Images
                                                            </span>
                                                        </div>


                                                    </div>
                                                )}

                                                <div style={{ display: 'flex' }}>
                                                    <p style={{ fontSize: '13px', marginTop: "20px", marginRight: "10px" }}> Is Material Loaded ? </p>
                                                    <button style={{ fontSize: "10px", height: "30px", marginTop: "10px", marginRight: "10px" }} type="button" class="btn btn-info" onClick={(e) => setIsMaterialLoaded("true")}>Yes</button>
                                                    <button style={{ fontSize: "10px", height: "30px", marginTop: "10px", marginRight: "10px" }} type="button" class="btn btn-info" onClick={(e) => setIsMaterialLoaded("false")}>No</button>
                                                </div>

                                                {isMaterialLoaded && (
                                                    <div style={{ display: 'flex' }}>
                                                        <span style={{ fontSize: '12px', marginRight: "5px", marginTop: "15px", marginBottom: "15px" }}>Quantity In Tons:</span>
                                                        <input
                                                            type="text" // Change to "text" to handle both integer and decimal input
                                                            name="vendorPhone"
                                                            style={{ width: '50%', textAlign: 'center', marginTop: "10px", marginBottom: "15px" }}
                                                            value={quantity}
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                if (/^\d*\.?\d*$/.test(newValue)) { // Allows only digits and a single optional decimal point
                                                                    setQuantity(newValue);
                                                                }
                                                            }}
                                                            placeholder="Quantity"
                                                            className="form-control"
                                                        />

                                                    </div>
                                                )}

                                                <div style={{ display: 'flex' }}>
                                                    <p style={{ fontSize: '13px', marginTop: "20px", marginRight: "10px" }}>Mobile Crane Needed?</p>

                                                    {/* Required Button */}
                                                    <button
                                                        style={{
                                                            fontSize: "10px",
                                                            height: "30px",
                                                            marginTop: "10px",
                                                            marginRight: "10px",
                                                            backgroundColor: isRecoveryVan ? "green" : "black", // Green when selected
                                                            color: isRecoveryVan ? "white" : "lightgray",
                                                        }}
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => setIsRecoveryVan(true)}
                                                    >
                                                        Required
                                                    </button>

                                                    {/* Not Required Button */}
                                                    <button
                                                        style={{
                                                            fontSize: "10px",
                                                            height: "30px",
                                                            marginTop: "10px",
                                                            marginRight: "10px",
                                                            minWidth: '80px',
                                                            backgroundColor: !isRecoveryVan ? "#f35e5e" : "black", // Red when selected
                                                            color: !isRecoveryVan ? "white" : "lightgray",
                                                        }}
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => setIsRecoveryVan(false)}
                                                    >
                                                        Not Required
                                                    </button>
                                                </div>


                                                <div style={{ display: 'flex', marginTop: '5px' }}>
                                                    <p style={{ fontSize: "12px", marginTop: '15px', marginRight: "10px" }}>Estimated Budget : </p>
                                                    <input
                                                        type="text"
                                                        name="budget"
                                                        value={budget}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            if (/^\d*\.?\d*$/.test(newValue)) { // Allows only digits and a single optional decimal point
                                                                setBudget(newValue)
                                                            }
                                                        }}
                                                        placeholder="Budget"
                                                        style={{ width: "100px", textAlign: 'center' }}
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div style={{ display: 'flex', marginTop: "30px" }}>
                                                    <p style={{ fontSize: "13px", marginTop: "10px", marginRight: '2px', fontWeight: "bold" }}>Click if you are on the Accident Location ?</p>
                                                    <p style={{
                                                        fontSize: '11px',
                                                        marginTop: "5px",
                                                        background: "blue",
                                                        padding: "5px",
                                                        border: '1px solid blue',
                                                        textAlign: 'center',
                                                        borderRadius: '30px',
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        position: "relative",
                                                        cursor: "pointer",
                                                        maxWidth: "400px",
                                                        minWidth: "180px",
                                                        height: "35px"
                                                    }} onClick={getLocation}>
                                                        SEND LOCATION
                                                        <KeyboardDoubleArrowRightIcon style={{
                                                            position: "absolute",
                                                            right: '10px'
                                                        }} />
                                                    </p>
                                                </div>
                                                <p style={{ fontSize: "11px", marginTop: "10px", marginBottom: "10px", textAlign: 'center', color: "teal", fontWeight: 'bold' }}>__________________OR_______________</p>

                                                <div style={{ display: 'flex' }}>
                                                    <p style={{ fontSize: "13px", marginTop: "10px", marginRight: '20px', fontWeight: "bold" }}>Select locatiion on map ?</p>
                                                    <p style={{
                                                        fontSize: '12px',
                                                        marginTop: "5px",
                                                        background: "white",
                                                        padding: "10px",
                                                        border: '2px solid #000000',
                                                        textAlign: 'center',
                                                        borderRadius: '30px',
                                                        fontWeight: "bold",
                                                        color: "blue",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        position: "relative",
                                                        cursor: "pointer",
                                                        maxWidth: "400px",
                                                        minWidth: "150px"
                                                    }} onClick={goToMap}>
                                                        Go to map
                                                        <KeyboardDoubleArrowRightIcon style={{
                                                            position: "absolute",
                                                            left: '10px'
                                                        }} />
                                                    </p>
                                                </div>
                                                <p style={{ fontSize: "11px", marginTop: "10px", textAlign: 'center', color: "teal", fontWeight: 'bold' }}>__________________OR_______________</p>

                                                <div style={{ display: 'flex' }}>
                                                    <p style={{ fontSize: "13px", marginTop: "20px", marginRight: '20px', fontWeight: "bold" }}>Manual Accident Location ?</p>
                                                    <p style={{
                                                        border: "1px solid blue",
                                                        padding: "10px",
                                                        textAlign: "center",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: "10px",
                                                        background: "radial-gradient(rgb(129, 129, 129), transparent) rgb(115 26 223)",
                                                        backgroundColor: '#4a4a4a',
                                                        color: 'white',
                                                        fontSize: "11px",
                                                        minWidth: "100px",
                                                        marginTop: '10px',
                                                        marginBottom: "10px"
                                                    }} onClick={(e) => setByManualLocation(!byManualLocation)}>
                                                        Manual Location

                                                    </p>
                                                </div>

                                                {byManualLocation && (
                                                    <div class="card" style={{ background: "#e8e7e7", marginBottom: "20px", maxWidth: "400px", minWidth: "300px" }}>
                                                        <div class="card-body">
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <span style={{ margin: "13px", textDecoration: 'underline' }}></span>
                                                                <img src={crossUser} style={{ width: '20px', height: '20px', marginLeft: 'auto' }} onClick={(e) => { setByManualLocation(false) }} />
                                                            </div>
                                                            <div style={{ display: "flex", maxWidth: "400px", }}>


                                                                <textarea
                                                                    type="text"
                                                                    className="Registrationdetails-elem-9"
                                                                    style={{ width: '89%', marginRight: "10px", height: "35px", marginTop: "5px", fontSize: "13px" }}
                                                                    value={fullAddress}
                                                                    placeholder='Full Address'
                                                                    onChange={(e) => setFullAddress(e.target.value)}
                                                                    disabled={getData.isActive === "false"}
                                                                />

                                                                <select
                                                                    name="state"
                                                                    className="Registrationdetails-elem-9"
                                                                    style={{ fontSize: "13px", textAlign: 'center', width: '90%', marginRight: "10px", height: "35px", padding: "0px", marginTop: "5px" }}
                                                                    placeholder='State'

                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        // setLatitude('');
                                                                        // setLongitude('');
                                                                        setSelectedState(value);
                                                                        loadCities(value);
                                                                    }}
                                                                    disabled={isLoadingStates}
                                                                    value={selectedState}
                                                                >
                                                                    < option value=""> State</option>
                                                                    {states.map((state) => (
                                                                        <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                                                    ))}
                                                                </select>

                                                            </div>
                                                            <div style={{ display: "flex", maxWidth: "400px", marginTop: "20px", marginBottom: "30px" }}>
                                                                <select className="Registrationdetails-elem-9"
                                                                    name="district"
                                                                    style={{ fontSize: "13px", textAlign: 'center', width: '95%', marginRight: "10px", height: "35px", padding: "0px", marginTop: "5px" }}
                                                                    value={district}
                                                                    onChange={(e) => setDistrict(e.target.value)}
                                                                    disabled={isLoadingCities || !selectedState}
                                                                >
                                                                    <option value="">District</option>
                                                                    {cities.map((city) => (
                                                                        <option key={city.id} value={city.name}>{city.name}</option>
                                                                    ))}
                                                                </select>

                                                                <input
                                                                    type="text"
                                                                    className="Registrationdetails-elem-9"
                                                                    style={{ width: '83%', marginRight: "10px" }}
                                                                    value={pincode}
                                                                    placeholder="Pincode"
                                                                    onChange={(e) => {
                                                                        // Only update the value if it is numeric
                                                                        const newValue = e.target.value;
                                                                        if (/^\d{0,6}$/.test(newValue)) {
                                                                            setPincode(newValue);
                                                                        }
                                                                    }}
                                                                    disabled={getData.isActive === "false"}
                                                                />

                                                            </div>
                                                        </div></div>)}

                                                <div class="card" style={{ background: "#e8e7e7", marginBottom: "20px", maxWidth: "400px", minWidth: "300px" }}>
                                                    <div class="card-body">
                                                        <h5 class="card-title" style={{ fontSize: "13px", fontWeight: "bold", color: 'purple' }}>Location : </h5>

                                                        <div style={{ display: "flex", maxWidth: "400px" }}>

                                                            <input
                                                                type="text"
                                                                className="Registrationdetails-elem-9"
                                                                style={{ textAlign: 'center', width: '90%', marginRight: "10px" }}
                                                                value={latitude}
                                                                placeholder='Latitude'
                                                                onChange={(e) => {
                                                                    // Only update the value if it is numeric
                                                                    const newValue = e.target.value;
                                                                    if (/^\d*$/.test(newValue)) {
                                                                        setLatitude(newValue);
                                                                    }
                                                                }}
                                                                disabled={getData.isActive === "false"}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="Registrationdetails-elem-9"
                                                                style={{ textAlign: 'center', width: '90%' }}
                                                                value={longitude}
                                                                placeholder='Longitude'
                                                                onChange={(e) => {
                                                                    const newValue = e.target.value;
                                                                    if (/^\d*$/.test(newValue)) {
                                                                        setLongitude(newValue);
                                                                    }
                                                                }}
                                                                disabled={getData.isActive === "false"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <p style={{
                                                    fontSize: '11px',
                                                    marginTop: "20px",
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
                                                    cursor: "pointer",
                                                    maxWidth: "400px"
                                                }} onClick={handleSubmit}>
                                                    <KeyboardDoubleArrowRightIcon style={{
                                                        position: "absolute",
                                                        right: '10px'
                                                    }} />
                                                    Submit Details
                                                </p>

                                            </div>)}

                                        {successDone && (
                                            <div className='parent-container'>
                                                <div className="image-container" style={{ background: "radial-gradient(yellow, transparent)" }}>
                                                    <div style={{ marginTop: "40%" }}>
                                                    </div>
                                                    <SuccessIcon />
                                                    <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "17px", color: "green", margin: "0px 50px 20px 30px", padding: "5px", flex: 1 }}>Our executives will reach out to you within minutes !!! </h1>
                                                </div>

                                            </div>
                                        )}


                                        {alertInfo.show && (
                                            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                                {alertInfo.message}
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="cd-paragraph-clean Registrationdetails-elem-12">
                            <p><br /></p>
                        </span>
                    </div>
                </div>


                <Modal className="custom-modal-content" isOpen={isModalOpen} onClose={closeModal}>
                    {comingVehicleInfo && (
                        <div>
                            <div className="responsive-table">
                                {comingVehicleInfo.length === 0 ? (
                                    <div style={{ textAlign: 'center', fontWeight: "bold" }}>No Data Found Related This No...</div>
                                ) : (
                                    comingVehicleInfo.map((item, index) => (
                                        <div key={index} className="vertical-table">
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Customer Name:</strong></div>
                                                <div className="table-cell">{item.customerName || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Vehicle Number:</strong></div>
                                                <div className="table-cell">{item.vehicleNo || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Chassis Number:</strong></div>
                                                <div className="table-cell">{item.chassisNo || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Make:</strong></div>
                                                <div className="table-cell">{item.make || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Model:</strong></div>
                                                <div className="table-cell">{item.model || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Engine Number:</strong></div>
                                                <div className="table-cell">{item.engineNo || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Insurance Name:</strong></div>
                                                <div className="table-cell">{item.InsuranceName || '---'}</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button
                                    type="submit"
                                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'rgb(173 223 227)', color: 'white' }}
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>

            </div >
        </div >
    );
}

export default InitialRegistration;
