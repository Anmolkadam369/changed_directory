import React, { useState, useEffect, useRef } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import Modal from '../Location1/Modal'; // Import the modal component
import { Helmet } from 'react-helmet-async';
import crossUser from '../../Assets/crossUser.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import checksuccess from '../../Assets/checksuccess.png'
import SuccessIcon from '../CaseFirstCard/SuccessIcon';
import BottomNavigationBar from '../User/BottomNavigationBar';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

function Registration({ item, fromPageHere, centerHere, vehicleNo }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    console.log("itemshere", item)
    if (item == null) {
        console.log("iteminside", item)
    }
    const [regNo, setRegNo] = useState(item?.reg ||'' );

    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [comingVehicleInfo, setComingVehicleInfo] = useState([]);
    const [comingVehicle, setComingVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [getData, setGetData] = useState({});
    console.log("GETDATA", getData)
    const [showPopup, setShowPopup] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    const { isItDone } = useLocation();

    fromPageHere = fromPageHere ? fromPageHere : ""
    console.log("frompageHere123", fromPageHere)
    const [comingFrom, setComingFrom] = useState('')


    console.log("comingData", comingFrom)

    useEffect(() => {
        if (vehicleInfo.length !== 0) {
            setComingVehicleInfo([vehicleInfo[0].data]);
        }
    }, [vehicleInfo]);


    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }c
        findUserById(userId)
        if (item !== undefined && item !== null) setIsVerified(true)
        // if (item !== null) setIsVerified(true)
        loadStates();
        const storedRegNo = localStorage.getItem('regNo');
        if (storedRegNo) {
            setRegNo(storedRegNo);
        }
        if (localStorage.getItem('isVerified') == 'true') {
            setIsVerified(true)
        }

    }, [token, userId, navigate]);


    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${backendUrl}/api/findByIdCustomer/${id}`);
        console.log("daa", response.data)
        response.data.data = response.data.data.filter((individualResponse) => {
            if (individualResponse.latitude !== null && individualResponse.longitude !== null) {
                individualResponse.latitude = null;
                individualResponse.longitude = null;
                return true;
            }
            return false;
        })
        console.log("reginstration data", response.data.data[0]);

        setGetData(response.data.data[0])
    }

    async function getVehicleData() {
        try {
            const getData = await axios.get(`${backendUrl}/api/vehicle/${regNo}/${userId}/crane`);
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

    // useEffect(() => {
    //     const storedRegNo = localStorage.getItem('regNo');
    //     if (storedRegNo) {
    //         setRegNo(storedRegNo);
    //     }
    //     if (localStorage.getItem('isVerified') == 'true') {
    //         setIsVerified(true)
    //     }
    // }, []);

    const handleNext = () => {
        // onVehicleData(comingVehicle);
        setIsVerified(true)
        localStorage.setItem('isVerified', "true");
        closeModal()
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [photoPreviews, setPhotoPreviews] = useState({
        MajorDamages1: item?.MajorDamages1 || null,
        MajorDamages2: item?.MajorDamages2 || null,
        MajorDamages3: item?.MajorDamages3 || null,
        MajorDamages4: item?.MajorDamages4 || null,
        MajorDamages5: item?.MajorDamages5 || null
    });

    const [photos, setPhotos] = useState({
        MajorDamages1: item?.MajorDamages1 || null,
        MajorDamages2: item?.MajorDamages2 || null,
        MajorDamages3: item?.MajorDamages3 || null,
        MajorDamages4: item?.MajorDamages4 || null,
        MajorDamages5: item?.MajorDamages5 || null
    });
    const [expandedImage, setExpandedImage] = useState(null);

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
    const [isMaterialLoaded, setIsMaterialLoaded] = useState(item?.isMaterialLoaded || false)
    const [quantity, setQuantity] = useState(item?.quantity || '')
    const [budget, setBudget] = useState(item?.budget || '')
    const [latitude, setLatitude] = useState(item?.latitude || '')
    console.log('latitude', latitude)
    const [longitude, setLongitude] = useState(item?.longitude || '')
    console.log('longitude1231231', longitude)

    const [location, setLocation] = useState('')
    const [onSpotName, setOnSpotName] = useState(item?.onSpotName || '')
    const [onSpotContact, setOnSpotContact] = useState(item?.onSpotContact || '')



    const [fullAddress, setFullAddress] = useState(item?.fullAddress || "");
    const [pincode, setPincode] = useState(item?.pincode || "");
    const [district, setDistrict] = useState(item?.district || "");
    const [states, setStates] = useState([]); // Correctly define states to hold the list of states
    const [selectedState, setSelectedState] = useState(item?.states || ""); // State to track the selected state
    const [pin, setPin] = useState("");
    const [cities, setCities] = useState([]); // State to hold the list of cities
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecoveryVan, setIsRecoveryVan] = useState(item?.isRecoveryVan || false);
    const [successDone, setSuccessDone] = useState(false);

    const { state } = useLocation();
    useEffect(() => {
        // Log the 'center' from the passed state


        if (state?.center) {
            console.log("Center in Previous Page:", state.center);
            setLatitude(state.center[0])
            setLongitude(state.center[1])

            setIsVerified(true)
        }
        if (state?.fromPageHere) {
            console.log("state Data123", state.fromPageHere)
            setComingFrom(state.fromPageHere)
        }

    }, [state]);
    useEffect(() => {
        // Log the 'center' from the passed state
        console.log("state Data", state)
        if (centerHere) {
            console.log("Center in Previous Page:", centerHere);
            setLatitude(centerHere[0])
            setLongitude(centerHere[1])

            setIsVerified(true)
        }

    }, [centerHere]);





    // useEffect(() => {
    //     loadStates();
    // }, []); // Assuming 'token' and 'userId' are not needed here or should be replaced

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

    const services = ["Crane", "Mechanic", "Advocate", "Workshop"];
    const [selectedServices, setSelectedServices] = useState(
        item?.selectedOptions ? [item.selectedOptions] : []
    );
    const[existingServices, setExistingServices] = useState(item?.selectedOptions ? [item.selectedOptions] : [])
    let [finalSelectedService, setFinalSelectedService]= useState([])
    console.log("total service", selectedServices)
    console.log("existingServices service", existingServices)
    console.log("finalSelectedService service", finalSelectedService)


    console.log("item?.selectedOptions ",item?.selectedOptions )
    const [newlySelectedServices, setNewlySelectedServices] = useState([]);
    
    const toggleSelection = (service) => {
        
        console.log("SERVICE", service)
        console.log("item?.selectedOptions?.includes(service.toLowerCase())", item?.selectedOptions?.includes(service.toLowerCase()))
        setSelectedServices((prev)=>{
            if(prev.includes(service)) return prev.filter((selectedServices)=>selectedServices != service)
            else return [...prev, service]
        })

        let finalServices = existingServices.map((existingService)=>{
            return existingService !== service ? service:null
         })
         setFinalSelectedService((prev) => {
            if (service?.toLowerCase && prev.includes(service.toLowerCase())) {
                return prev.filter((selectedService) => selectedService !== service.toLowerCase());
            }
            return [...prev, service?.toLowerCase()];
        });
    };


    let accidentDataObject
   
        console.log("elserafsdfasd")
        accidentDataObject = { regNo, fullAddress, states, district, pincode, onSpotContact, onSpotName, isRecoveryVan, isMaterialLoaded, quantity, budget, ...photos, ...comingVehicle, ...getData, latitude, longitude, selectedOptions: finalSelectedService };
    console.log("accidentDataObject123445", accidentDataObject)


    const handleSubmit = async (e) => {

        // setTimeout(() => {
        //     navigate('/User-landing-page');
        // }, 4000);


        e.preventDefault();

        const formDataObj = new FormData();
        console.log("accidentDataO123bject", accidentDataObject)
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
            console.log("response.data.message", response.data.message)
            if (response.data.message == "Data Successfully Inserted.") {
                setSuccessDone(true)
                setIsVerified(false)
                setLatitude(null)
                setLongitude(null)

                localStorage.setItem("isVerified", 'false')
                localStorage.setItem('regNo', '');
                setAlertInfo({ show: true, message: "Data Successfully Added!!!", severity: 'success' });
                navigate('/user-landing-page', { replace: true, state: null })
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Hey i am the errror", error.response?.data?.message)
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



    const goToMap = () => {
        console.log("fromPageHere", fromPageHere)
        if (item != null) {
            console.log("item", "item is ehrere")
            navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025], fromPage: "firstPage" } })
        }
        if (comingFrom == "allVehicles") {
            navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025], fromPage: "allVehicles" } })
        }
        else {
            navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025], fromPage: 'Crane-dashboard' } })
        }
    }

    const [byManualLocation, setByManualLocation] = useState(false)

    const [nowReadOnly, setNowReadOnly] = useState(true)
    console.log("nowRead", nowReadOnly)
    useEffect(()=>{
        if(fromPageHere !== "allvehicles") setNowReadOnly(false)
    },[fromPageHere])

    return (
        <div>
            <div className="Registrationdetails-elem-16">
                <Helmet>
                    <title>Customer Service Vehicle Number - Claimpro</title>
                    <meta name="description" content="Customer Service Vehicle for BVC ClaimPro Assist to register the vehicle and get data about vehicle." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/Register`} />
                </Helmet>
                <div style={{ position: 'relative' }}>
                    {getData.isActive === "false" && showPopup && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'lightgrey',
                            width: 'fit-content',
                            padding: '10px',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                            <button
                                onClick={() => setShowPopup(false)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                            <h3 style={{ margin: '0 20px 0 0' }}>You Are Not Currently Active To Take The Appoinments</h3>
                        </div>
                    )}
                </div>
                <div className="Registrationdetails-elem-15">
                    <div className="Registrationdetails-elem-14">
                        <span className="cd-paragraph-clean Registrationdetails-elem-7">
                        </span>
                        <div className="Registrationdetails-elem-13">
                            <div className="Registrationdetails-elem-11">
                                <div className="Registrationdetails-elem-10">
                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}><em> Accident Vehicle Details</em></p>
                                        {fromPageHere == "allvehicles" && (<button style={{ padding: "5px 10px", background: nowReadOnly ? "lightblue" : 'green', color: nowReadOnly ? "black" : "white", width: "60px", fontSize: "15px", fontWeight: "bold", marginBottom: "20px", borderRadius: "10px" }} onClick={() => setNowReadOnly(!nowReadOnly)}>Edit</button>)}
                                    </div>
                                    {/* <span className="cd-paragraph-clean Registrationdetails-elem-8"> */}

                                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>Vehicle No OR Chassis No</p>
                                    {/* </span> */}
                                    <div style={{ display: "flex" }}>

                                        <input
                                            type="text"
                                            className="Registrationdetails-elem-9"
                                            style={{ textAlign: 'left', margin: '10px 10px 10px 0px', width: '80%' }}
                                            value={regNo}
                                            // readOnly
                                            placeholder='RJ 03 ED 2343'
                                            onChange={!item?.reg ? handleChange : ""}
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

                                    {isVerified && (

                                        <div>

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
                                                    height: "35px",
                                                    cursor: item?.accidentLatitude ? 'not-allowed' : 'pointer',
                                                    opacity: item?.accidentLatitude ? 0.5 : 1,
                                                }} onClick={(e) => {
                                                    if (!item?.accidentLatitude) {
                                                        getLocation()
                                                    }
                                                }} >
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
                                                    minWidth: "150px",
                                                    cursor: item?.accidentLatitude ? "not-allowed" : "pointer",
                                                    opacity: item?.accidentLatitude ? 0.5 : 1,
                                                }} onClick={(e) => {
                                                    if (!item?.accidentLatitude) {
                                                        goToMap()
                                                    }
                                                }}>

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
                                                    marginBottom: "10px",
                                                    cursor: item?.accidentLatitude ? "not-allowed" : "pointer",
                                                    opacity: item?.accidentLatitude ? 0.5 : 1,
                                                }} onClick={(e) => {
                                                    if (!item?.accidentLatitude)
                                                        setByManualLocation(!byManualLocation)
                                                }
                                                } >
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
                                                    <h5 class="card-title" style={{ fontSize: "13px", fontWeight: "bold", color: 'purple' }}>Location :  </h5>

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
                                                                    readOnly={nowReadOnly ? true : false}
                                                                    onChange={(e) => setOnSpotName(e.target.value)}
                                                                // disabled={getData.isActive === "false"}
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
                                                                    // readOnly={item?.onSpotContact ? true : false}
                                                                    readOnly={nowReadOnly ? true : false}

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

                                            {showImageDiv && (
                                                <div style={{ padding: "10px" }}>


                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <span style={{ margin: "13px", textDecoration: 'underline' }}>Vehicle Image (Optional)</span>
                                                        <img src={crossUser} style={{ width: '20px', height: '20px', marginLeft: 'auto' }} onClick={(e) => { setShowImageDiv(false) }} />
                                                    </div>



                                                    {Object.keys(photos).map((type, index) => (
                                                        <div key={type} style={{ display: 'flex' }} className="photo-input-section">
                                                            <label>
                                                                <h6 style={{ fontSize: "11px" }}>
                                                                    {type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                                                                </h6>
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
                                                                    <img
                                                                        src={photoPreviews[type]}
                                                                        alt={`Upload preview ${type}`}
                                                                        style={{ width: 100, height: 100, cursor: 'pointer' }}
                                                                        onClick={() => setExpandedImage(photoPreviews[type])}
                                                                    />
                                                                    <Button
                                                                        variant="contained"
                                                                        onClick={() => {
                                                                            setPhotos(prev => ({ ...prev, [type]: null }));
                                                                            setPhotoPreviews(prev => ({ ...prev, [type]: null }));
                                                                            if (photoRefs[type].current) {
                                                                                photoRefs[type].current.value = ""; // Reset the file input
                                                                            }
                                                                        }}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}

                                                    {/* Modal for expanded image view */}
                                                    <Modal
                                                        open={!!expandedImage}
                                                        onClose={() => setExpandedImage(null)}
                                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <img
                                                            src={expandedImage}
                                                            alt="Expanded preview"
                                                            style={{ maxWidth: '90%', maxHeight: '90%' }}
                                                        />
                                                    </Modal>
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
                                                <button style={{ fontSize: "10px", height: "30px", marginTop: "10px", marginRight: "10px" }} type="button" class="btn btn-info" onClick={(e) => setIsMaterialLoaded(true)}>Yes</button>
                                                <button style={{ fontSize: "10px", height: "30px", marginTop: "10px", marginRight: "10px" }} type="button" class="btn btn-info" onClick={(e) => {setIsMaterialLoaded(false); setQuantity('')}}>No</button>
                                            </div>

                                            {(isMaterialLoaded == true || item?.isMaterialLoaded == true) && (
                                                <div style={{ display: 'flex' }}>
                                                    <span style={{ fontSize: '12px', marginRight: "5px", marginTop: "15px", marginBottom: "15px" }}>Quantity In Tons:</span>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        style={{ width: '50%', textAlign: 'center', marginTop: "10px", marginBottom: "15px" }}
                                                        value={quantity}
                                                        readOnly={nowReadOnly ? true : false}
                                                        // readOnly={item?.quantity ? true : false}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            if (/^\d*$/.test(newValue)) {
                                                                setQuantity(newValue);
                                                            }
                                                        }}
                                                        placeholder="Quantity"
                                                        className="form-control"
                                                    />

                                                </div>
                                            )}

                                            <div style={{ display: 'flex' }}>
                                                <p style={{ fontSize: '13px', marginTop: "20px", marginRight: "10px" }}>Recovery Van Needed?</p>

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
                                                    // disabled={item?.isRecoveryVan != null ? true : false}
                                                    disabled={nowReadOnly ? true : false}
                                                    onClick={() => setIsRecoveryVan(true)}
                                                >
                                                    Required
                                                </button>

                                                {/* Not Required Button */}
                                                <button
                                                    style={{
                                                        fontSize: "9px",
                                                        height: "30px",
                                                        marginTop: "10px",
                                                        marginRight: "10px",
                                                        minWidth: '80px',
                                                        backgroundColor: !isRecoveryVan ? "#f35e5e" : "black", // Red when selected
                                                        color: !isRecoveryVan ? "white" : "lightgray",
                                                    }}
                                                    type="button"
                                                    className="btn btn-dark"
                                                    disabled={nowReadOnly ? true : false}
                                                    // disabled={item?.isRecoveryVan != null ? true : false}
                                                    onClick={() => setIsRecoveryVan(false)}
                                                >
                                                    Not Required
                                                </button>
                                            </div>


                                            <div style={{ display: 'flex', marginTop: '5px' }}>
                                                <p style={{ fontSize: "12px", marginTop: '15px', marginRight: "10px" }}>Estimated Budget : </p>
                                                <input
                                                    type="number"
                                                    name="vendorPhone"
                                                    value={budget}
                                                    readOnly={nowReadOnly ? true : false}
                                                    // readOnly={item?.budget ? true : false}
                                                    onChange={(e) => setBudget(e.target.value)}
                                                    placeholder="Budget"
                                                    style={{ width: "100px", textAlign: 'center' }}
                                                    className="form-control"
                                                />
                                            </div>


                                            <div
                                                style={{
                                                    background: "#f0f0f0",
                                                    marginTop: "20px",
                                                    padding: "20px",
                                                    borderRadius: "10px 10px 0px 0px",
                                                    boxShadow: "rgba(0, 0, 0, 0.23) -6px 6px 20px 0px inset",
                                                    minWidth: "300px",
                                                    marginTop: "20px"
                                                }}
                                            >
                                                <ul style={{ listStyle: "none", padding: 0, marginTop: "20px", }}>
                                                    {/* console.log("item?.selectedOptions", item.selectedOptions) */}
                                                    {services.map((service) => {
                                                        const isPreSelected = item?.selectedOptions?.includes(service.toLowerCase());
                                                        // console.log("ISPRESELECED",isPreSelected)
                                                        // console.log("item?.selectedOptions", item.selectedOptions, service.toLowerCase())

                                                        return (
                                                            <li
                                                                key={service}
                                                                onClick={() => (nowReadOnly || isPreSelected ? null : toggleSelection(service))}
                                                                style={{
                                                                    fontSize: "15px",
                                                                    padding: "10px 50px",
                                                                    margin: "5px 0",
                                                                    borderRadius: "5px",
                                                                    background: nowReadOnly || isPreSelected ? "lightred" : selectedServices.includes(service)
                                                                        ? "rgb(249 255 86)"
                                                                        : "#f5f5f5",
                                                                    color: nowReadOnly || isPreSelected ? "red" : selectedServices.includes(service) ? "black" : "black",
                                                                    cursor: nowReadOnly || isPreSelected ? "not-allowed" : "pointer",
                                                                    textAlign: "center",
                                                                    boxShadow: selectedServices.includes(service)
                                                                        ? "rgb(0 0 0) -2px -5px 0px"
                                                                        : "2px 2px 4px #ccc",
                                                                    transition: "all 0.3s ease",
                                                                    maxWidth: "90%",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "space-between",
                                                                    opacity: nowReadOnly || isPreSelected ? 0.6 : 1,
                                                                }}
                                                            >
                                                                <span>{service}</span>
                                                                {selectedServices.includes(service) && (
                                                                    <img
                                                                        src={checksuccess}
                                                                        alt="Selected"
                                                                        style={{
                                                                            height: "20px",
                                                                            width: "20px",
                                                                            marginLeft: "auto",
                                                                        }}
                                                                    />
                                                                )}
                                                                {isPreSelected && (
                                                                    <img
                                                                        src={checksuccess}
                                                                        alt="Selected"
                                                                        style={{
                                                                            height: "20px",
                                                                            width: "20px",
                                                                            marginLeft: "auto",
                                                                        }}
                                                                    />
                                                                )}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>



                                            {fromPageHere != "quotationUpdate" && (
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
                                                </p>)}

                                        </div>)}

                                    {successDone && (
                                        <div style={{
                                            position: "fixed",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                                            zIndex: 1000, // ensure it appears above other content
                                            display: "flex",
                                            alignItems: "flex-end", // positions the container at the bottom
                                            justifyContent: "center",
                                            animation: "slideUp 0.5s ease-out" // apply the animation
                                        }}>
                                            <div className="image-container" style={{
                                                backgroundColor: "#f1ffc2",
                                                padding: "20px",
                                                borderRadius: "15px 15px 0px 0px",
                                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                                maxWidth: "600px",
                                                width: "97%",
                                                marginBottom: "20px"
                                            }}>
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







                <Modal className="custom-modal-content" isOpen={isModalOpen} onClose={closeModal}>
                    {comingVehicleInfo && (
                        <div>
                            <div className="responsive-table" style={{ marginBottom: "0px" }}>
                                {comingVehicleInfo.length === 0 ? (
                                    <div style={{ textAlign: 'center', fontWeight: "bold" }}>No Data Found Related This No...</div>
                                ) : (
                                    comingVehicleInfo.map((item, index) => (
                                        <div key={index} className="vertical-table">
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Vehicle Number:</strong></div>
                                                <div className="table-cell">{item.vehicleNo || '---'}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell"><strong>Chassis Number:</strong></div>
                                                <div className="table-cell">{item.chassisNo || '---'}</div>
                                            </div>
                                            {/* <div className="table-row">
                                                <div className="table-cell"><strong>Make:</strong></div>
                                                <div className="table-cell">{item.make || '---'}</div>
                                            </div> */}
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
                                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'rgb(255 0 0)', color: '#f9f9f9' }}
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>

            </div >
            <div>
                <BottomNavigationBar />
            </div>
        </div >
    );
}

export default Registration;
