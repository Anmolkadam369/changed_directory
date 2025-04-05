import React, { useState, useEffect, useRef } from 'react';
import './Registration.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Modal from '../../../Component/CompanyAdmin/Location1/Modal';
import { Helmet } from 'react-helmet-async';
import { ClipLoader } from 'react-spinners';

import checksuccess from '../../../Assets/checksuccess.png'
import SuccessIcon from '../../../Component/Vendors/FirstAppearComponent/CaseFirstCard/SuccessIcon';
import BottomNavigationBar from '../../../Component/Customers/BottomNavigationBar';
import LocationSearchPanel from '../../../Component/CompanyAdmin/Location1/LocationSearchPanel';
import VehiclePanel from './VehiclePanel';
import ConfirmedRide from './ConfirmedRide';
import LookingForAccptance from './LookingForAcceptance';
import WaitForVehicleCome from './WaitForVehicleCome';
import MapForVendorDistance from '../Map/MapForVendorDistance';
import Loading from '../../../Component/Customers/Cards/Loading';
import AddNewData from '../../../Component/Customers/Cards/AddNewData';
import VehicleImagePanel from './VehicleImagePanel';



import img1 from '../../../Assets/add/img1.png'
import icon2 from '../../../Assets/add/icon2.svg'
import icon1 from '../../../Assets/add/icon1.svg'
import icon4 from '../../../Assets/add/icon4.svg'
import icon5 from '../../../Assets/add/icon5.svg'
import search from '../../../Assets/add/search.svg'

import icon3 from '../../../Assets/add/icon3.svg'
import rightarrow from '../../../Assets/navbar/right-arrow.svg'
import img2 from '../../../Assets/add/img2.png'
import img3 from '../../../Assets/add/img3.png'
import img4 from '../../../Assets/add/img4.png'
import img5 from '../../../Assets/add/img5.png'
import img6 from '../../../Assets/add/img6.png'
import img7 from '../../../Assets/add/img7.png'



const steps = [
    { id: "01", title: "Accident Detail" },
    { id: "02", title: "Choose Vehicle" },
    { id: "03", title: "Upload Image" },
    { id: "04", title: "Confirm Info" },
];

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};


function AddVehicles({ item, fromPageHere, centerHere, vehicleNo }) {
    const [currentStep, setCurrentStep] = useState("01");
    const [isModalOpenLooking, setIsModalOpenLooking] = useState(false);
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);



    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");


    console.log("itemshere", item)
    if (item === null) {
        console.log("iteminside", item)
    }
    const [regNo, setRegNo] = useState('');
    console.log('reg123', regNo)

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


    const [showImageDiv, setShowImageDiv] = useState(false)
    const [isMaterialLoaded, setIsMaterialLoaded] = useState(item?.isMaterialLoaded || false)
    const [quantity, setQuantity] = useState(item?.quantity || "")
    const [budget, setBudget] = useState(item?.budget || '')

    const [longitude, setLongitude] = useState(item?.longitude || '')
    const [latitude, setLatitude] = useState(item?.latitude || '')

    const [dropLatitude, setDropLatitude] = useState('')
    const [dropLongitude, setDropLongitude] = useState('')

    const [pickupLocation, setPickupLocation] = useState(null)
    const [dropLocation, setDropLocation] = useState(null)

    const [location, setLocation] = useState('')
    const [destinationLocation, setDestinationLocation] = useState('')
    const [activeField, setActiveField] = useState(null)

    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmVehicle, setConfirmVehicle] = useState(false)

    const [allVehicleNumbers, setAllVehicleNumbers] = useState([])
    const [doneFetching, setDoneFetching] = useState(false)
    console.log("allVehicleNumbers", allVehicleNumbers)
    console.log("doneFetching", doneFetching)



    const [vehicleFound, setVehicleFound] = useState(false)
    const [vehicleImagesPanel, setVehicleImagesPanel] = useState(false);

    const [vehicleType, setVehicleType] = useState(null)

    const panelRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmVehicleRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const vehicleImagesPanelRef = useRef(null)





    useEffect(() => {
        if (getData?.contactPerson) {
            setOnSpotName(getData?.contactPerson)
        }
        if (getData?.CustomerPhone) {
            setOnSpotContact(getData?.CustomerPhone)
        }
    }, [getData])

    console.log("vheichtype", vehicleType)

    useEffect(() => {
        vehicleType === 'craneandrecoveryvan' ? setIsRecoveryVan(true) : setIsRecoveryVan(false)
        quantity != "" ? setIsMaterialLoaded(true) : setIsMaterialLoaded(false)
    }, [vehicleType, quantity])


    useEffect(() => {
        if (vehicleInfo.length !== 0) {
            setComingVehicleInfo([vehicleInfo[0].data]);
        }
    }, [vehicleInfo]);

    useEffect(() => {
        if (userId.startsWith('CUD-')) getCustomerDriver(userId)
        else if (userId.startsWith('CC-')) findUserById(userId)
        getVehicleNumbers()

        if (item !== undefined && item !== null) setIsVerified(true)
        loadStates();
        const storedRegNo = localStorage.getItem('regNo');
        if (storedRegNo) {
            setRegNo(storedRegNo);
        }
        if (localStorage.getItem('isVerified') === 'true') {
            setIsVerified(true)
        }

    }, [token, userId, navigate]);

    const getCustomerDriver = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/findByIdCustomerDriver/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log("daa", response.data)
        if (response.data.message === "data found") {
            // setRegNo(response.data.data[0].vehicleNo)
            setOnSpotName(response.data.data[0].driverName)
            setOnSpotContact(response.data.data[0].driverNumber)
        }

    }

    const getVehicleNumbers = async () => {
        console.log("userid", userId);
        let notAccidentVehicles = []
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalVehicleInfoById/${userId}`);
        if (response.data.message === "No accident vehicle data found.") {
            setAllVehicleNumbers([]);
            setDoneFetching(true);
        }
        else {
            console.log("response123421", response.data.data);
            response.data.data.map((item) => {
                if (item.availableOptions.length !== 0) notAccidentVehicles.push(item)

            })
            console.log("seTDATIOATN", response.data.data);
            setAllVehicleNumbers(notAccidentVehicles);
            setDoneFetching(true);
        }
    }



    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/findByIdCustomer/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
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


    const [selectedVehicleData, setSelectedVehicleData] = useState([]);
    console.log('MH0412322', selectedVehicleData)
    const handleChange = (event, selectedVehicle) => {
        console.log('selectedVehicle123', selectedVehicle)
        setRegNo(event.target.value);
        let option = selectedVehicle.availableOptions.length ? selectedVehicle.availableOptions : [];
        console.log('optionoptionoptionoptionoption', option)
        setSelectedVehicleData(option)

        // localStorage.setItem('regNo', event.target.value);
    };

    // useEffect(() => {
    //     const storedRegNo = localStorage.getItem('regNo');
    //     if (storedRegNo) {
    //         setRegNo(storedRegNo);
    //     }
    //     if (localStorage.getItem('isVerified') === 'true') {
    //         setIsVerified(true)
    //     }
    // }, []);

    const handleNext = () => {
        // onVehicleData(comingVehicle);
        setIsVerified(true)
        // localStorage.setItem('isVerified', "true");
        closeModal()
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [images, setImages] = useState({})
    console.log('images123', images)

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




    // useEffect(() => {
    //     if (vehicleFound) handleSubmit()
    // }, [vehicleFound])

    console.log("vehiclePanel123", vehicleType)





    const [onSpotName, setOnSpotName] = useState(item?.onSpotName || getData?.contactPerson || '')
    const [onSpotContact, setOnSpotContact] = useState(item?.onSpotContact || getData?.CustomerPhone || '')



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
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])




    const { state } = useLocation();
    useEffect(() => {
        // Log the 'center' from the passed state


        if (state?.center) {
            console.log("Center in Previous Page:", state.center);
            setDropLatitude(state.center[0])
            setDropLongitude(state.center[1])
            setDropLocation(state.placeName)

            setIsVerified(true)
        }
        if (state?.fromPageHere) {
            console.log("state Data123", state.fromPageHere)
            setComingFrom(state.fromPageHere)
        }

        if (latitude && longitude && dropLatitude && dropLongitude) {
            const getNearByVendor = async () => {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/findNearbyLocation/${userId}`, {
                        pickuplatitude: latitude,
                        pickuplongitude: longitude,
                        dropLatitude: dropLatitude,
                        dropLongitude: dropLongitude,
                        selectedVendor: 'crane'
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.status === 200) {
                        setAlertInfo({ show: true, message: "get vendor!!!", severity: 'success' });


                    } else {
                        setAlertInfo({ show: true, message: "failed to get Vendor", severity: 'error' });

                    }
                }
                catch (error) {
                    console.error("Error uploading photos:", error);
                    const errorMessage = error.response?.data?.message || 'An error occurred';
                    if (errorMessage === "jwt expired") {
                        setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 2000);
                    } else {
                        setAlertInfo({ show: true, message: "An error occurred while uploading photos.", severity: 'error' });

                    }
                }
            }
            getNearByVendor()
        }



    }, [state]);

    useEffect(() => {
        // Log the 'center' from the passed state
        console.log("state Data", state)
        if (centerHere) {
            console.log("Center in Previous Page here:", centerHere);
            setDropLatitude(centerHere[0])
            setDropLongitude(centerHere[1])

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

    useEffect(() => {
        const getLocation = () => {
            setLatitude('');
            setLongitude('');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                setLocation('Geolocation is not supported by this browser.');
            }
        };
        getLocation()
    }, [])


    const showPosition = async (position) => {
        console.log("altiudaf", position.coords)
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            if (data && data.address) {
                const { road, city, state, country } = data.address;
                setPickupLocation(`${road || ''}, ${city || ''}, ${state || ''}, ${country || ''}`);
            } else {
                setPickupLocation('Location details not found.');
            }
        } catch (error) {
            setLocation('Error fetching location details.');
        }
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setLocation('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                setLocation('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                setLocation('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                setLocation('An unknown error occurred.');
                break;
            default:
                setLocation('An error occurred while fetching location.');
        }
    };

    let finalSelectedService = 'crane';
    let accidentDataObject


    accidentDataObject = { regNo, fullAddress, states, district, pincode, onSpotContact, onSpotName, isRecoveryVan, isMaterialLoaded, quantity, budget, ...images, ...photos, ...comingVehicle, ...getData, latitude, longitude, pickupLocation, dropLocation, dropLatitude, dropLongitude, selectedOptions: vehicleType };
    console.log("accidentDataObject123445", accidentDataObject)

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '100%',
                opacity: 1,
                duration: 1,
                ease: 'power-3.inOut'
            })
        }
        if (!panelOpen) {
            gsap.to(panelRef.current, {
                height: '0%',
                opacity: 0,
                // duration: 1,
                // ease: 'power-3.inOut'
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0%)',
                opacity: 1,
                duration: 1,
                ease: 'power-3.inOut',
                zIndex: '1001',
                boxShadow: 'inset -1px -6px 20px 0px #020202',
                height: '300px',
                overflowY: 'auto'
            });
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)',
                opacity: 0,
                duration: 0,
                zIndex: '1001',
            });
        }
    }, [vehiclePanel]);

    useGSAP(function () {
        if (vehicleImagesPanel) {
            gsap.to(vehicleImagesPanelRef.current, {
                transform: 'translateY(0%)',
                opacity: 1,
                duration: 1,
                ease: 'power-3.inOut',
                zIndex: '1001',
                boxShadow: 'inset -1px -6px 20px 0px #020202',
                height: '400px',
                overflowY: 'auto'

            });
        } else {
            gsap.to(vehicleImagesPanelRef.current, {
                transform: 'translateY(100%)',
                opacity: 0,
                duration: 0,
                zIndex: '1000',
                height: '0px'
            });
        }
    }, [vehicleImagesPanel]);

    useGSAP(function () {
        if (confirmVehicle) {
            gsap.to(confirmVehicleRef.current, {
                transform: 'translateY(0%)',
                opacity: 1,
                duration: 1,
                ease: 'power-3.inOut',
                zIndex: '1001', // Higher zIndex to appear above vehiclePanel
                boxShadow: 'inset -1px -6px 20px 0px #020202',
                height: '95vh',
                overflowY: 'auto'
            });
        } else {
            gsap.to(confirmVehicleRef.current, {
                transform: 'translateY(100%)',
                opacity: 0, // Adjusted to 0 to hide it properly
                duration: 1,
                ease: 'power-3.inOut',
                width: '100%',
                zIndex: '1000', // Lower zIndex when closed
            });
        }
    }, [confirmVehicle]);


    useGSAP(async function () {
        console.log('helywerewrwer', successDone)
        await handleSubmit()

        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0%)',
                opacity: 1,
                duration: 1,
                ease: 'power-3.inOut',
                width: '100%',
                height: "95vh",
                zIndex: '1001',
                overflowY: 'auto'


            })
        }
        else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)',
                opacity: 1,
                duration: 1,
                ease: 'power-3.inOut',
                padding: '0px',
                height: "0vh",
                zIndex: '1001',
                padding: '20px'

            })
        }
    }, [vehicleFound])

    const handleSubmit = async (e) => {

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
                url: `${process.env.REACT_APP_BACKEND_URL}/addAccidentDetails/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response.data.message", response.data.message)
            if (response.data.message === "Data Successfully Inserted.") {
                setSuccessDone(true)
                setConfirmVehicle(false);
                setVehicleFound(true);
                setIsVerified(false)
                setLatitude(null)
                setLongitude(null)

                localStorage.setItem("isVerified", 'false')
                localStorage.setItem('regNo', '');
                setAlertInfo({ show: true, message: "Data Successfully Added!!!", severity: 'success' });
                navigate('/user-landing-page', { replace: true, state: null })
                return;
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


    const [nowReadOnly, setNowReadOnly] = useState(true)
    useEffect(() => {
        if (fromPageHere !== "allvehicles") setNowReadOnly(false)
    }, [fromPageHere])

    const handlePickupChange = async (e) => {
        setPickupLocation(e.target.value)
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(e.target.value)}`);
            console.log("response latitude", response.data)
            const location = response.data[0];
            setLatitude(location.lat);
            setLongitude(location.lon);
            setLocation(` Latitude: ${location.lat}, Longitude: ${location.lon}`);
        } catch (error) {
        }
        try {
            setIsLoadingPlaces(true)
            console.log('latitudedsss', longitude, latitude, isLoadingPlaces)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/get-nearby-places`, {
                data: { lat: latitude, lon: longitude, radius: 1000 },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            console.log("respose.data", response.data)
            setPickupSuggestions(response.data)
            setIsLoadingPlaces(false)

        } catch {
        }
    }

    const handleDestinationChange = async (e) => {
        setDropLocation(e.target.value)
        console.log("resppnse dro ", e.target.value)
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(e.target.value)}`);
            console.log("drop response latitude", response.data)
            const location = response.data[0];
            setDropLatitude(location.lat);
            setDropLongitude(location.lon);
            setLocation(` Latitude: ${location.lat}, Longitude: ${location.lon}`);
        } catch (error) {
            // setLocation("An error occurred while fetching the coordinates.");
        }
        console.log("droplatiti", dropLatitude, dropLongitude)
        if (dropLatitude != "" && dropLongitude != '') {
            try {
                console.log('latitudedsss', longitude, latitude)
                setIsLoadingPlaces(true)
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/get-nearby-places`, {
                    data: { lat: dropLatitude, lon: dropLongitude, radius: 1000 },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log("respose.data", response.data)
                setDestinationSuggestions(response.data)
                setIsLoadingPlaces(false)
            } catch {
            }
        }
    }

    function findTrip() {
        setPanelOpen(false)
        setVehiclePanel(true)
    }
    const navigateTo = () => {
        console.log("userId123", userId)
        userId.startsWith('CUD-') ? navigate('/all-accident-vehicles') : navigate('/add-new-vehicle-driver')
    }



    return (
        <>
            <div className="bg-[#EFF9FD] pt-[50px] md:px-[80px] pb-[108px] px-[20px]">
                <div className="flex items-center flex-wrap justify-center relative pb-[33px]">
                    {steps.map((step, index) => (
                        <div className='flex items-center'>

                            <div key={index} className="flex flex-col justify-center items-center">
                                {index !== 0 && (
                                    <div
                                        className={`absolute w-full h-1 top-4 ${currentStep > index ? "bg-blue-500" : "bg-gray-300"
                                            }`}
                                        style={{ left: "-50%", zIndex: -1 }}
                                    />
                                )}

                                <div
                                    className={`w-[32px] text-[#242E39] cursor-pointer bg-[#FFFFFF] h-[32px] border-[2px] flex items-center justify-center rounded-full font-bold
                ${currentStep >= step?.id
                                            ? "border-[#21A6E9]"
                                            : "border-[#A1AEBE]"
                                        }`}
                                    onClick={() => setCurrentStep(step?.id)}
                                >
                                    {step?.id}
                                </div>
                                <p className={`mt-[10px] mb-0 text-[13px] text-center font-satoshi font-[500] ${currentStep >= step?.id
                                    ? "text-[#21A6E9]"
                                    : "text-[#A1AEBE]"
                                    }`}>{step.title}</p>
                            </div>
                            {index !== steps.length - 1 && (
                                <div className={`h-[3px] w-[80px] mx-2 mb-[32px]
                                ${currentStep > steps[index]?.id ? "bg-[#21A6E9]" : "bg-[#A1AEBE]"}
                            `}></div>
                            )}
                        </div>
                    ))}
                </div>
                {currentStep === "01" &&
                    <div>
                        <h6 className="mb-0 font-[500] font-satoshi md:text-[48px] text-[30px] leading-[68px] text-center text-[#000000] pb-[40px]">Add Accident Vehicle Details</h6>
                        <div className="flex md:flex-row flex-col justify-center gap-[30px]">
                            <div className="max-w-[694px] w-full bg-[#FFFFFF] rounded-[30px] md:py-[50px] py-[30px] md:px-[40px] px-[20px]">
                                <div className="grid grid-cols-2 gap-[24px]">
                                    <div className="col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Vehicle Number</label>
                                        <div>
                                            <select name="" id="" value={regNo}
                                                onChange={(e) => {
                                                    const selectedVehicle = allVehicleNumbers.find(vehicle => vehicle.vehicleNo === e.target.value)
                                                    handleChange(e, selectedVehicle)
                                                }}
                                                disabled={getData.isActive === "false"}
                                                className='border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] py-[16px] px-[10px] w-full'>
                                                <option value="">Select Number</option>
                                                {!cities.error && allVehicleNumbers.map(vehicle => (
                                                    <option key={vehicle.vehicleNo} value={vehicle.vehicleNo}>
                                                        {vehicle.vehicleNo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Spot Person</label>
                                        <div>
                                            <input
                                                type="text"
                                                className="border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] pl-[15px] py-[16px] px-[10px]  w-full"
                                                style={{ padding: '20px' }}
                                                value={onSpotName}  // This is fine as long as both values are being correctly updated
                                                name="spotPerson"
                                                placeholder="Enter Name"
                                                onChange={(e) => setOnSpotName(e.target.value)}  // Make sure `setOnSpotName` is correctly updating state
                                                disabled={getData?.isActive === "false"}  // Ensure `getData.isActive` is the correct type (string vs boolean)
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Spot Person Number</label>
                                        <div>
                                            <input
                                                type="text"
                                                className="border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] py-[16px] px-[10px] w-full"
                                                style={{ padding: '20px' }}
                                                value={onSpotContact}
                                                placeholder='Spot Person Number'
                                                onChange={(e) => setOnSpotContact(e.target.value)}
                                                disabled={getData.isActive === "false"}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Quantity (Tons)</label>
                                        <div>
                                            <input
                                                type="number"
                                                name="quantity"
                                                className="border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] py-[16px] px-[10px] w-full"
                                                style={{ padding: '20px' }}
                                                value={quantity}
                                                readOnly={nowReadOnly ? true : false}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    if (/^\d*$/.test(newValue)) {
                                                        setQuantity(newValue);
                                                    }
                                                }}
                                                placeholder='Quantity'
                                                disabled={getData.isActive === "false"}
                                            />
                                        </div>
                                    </div>
                                    <div className='h-[350px] mb-[200px] col-span-2 relative mt-[16px]'>
                                        {/* <img src={img1} alt="" /> */}
                                        <div className="h-full w-full rounded-xl overflow-hidden">
                                            <MapForVendorDistance className="h-full w-full rounded-xl" />
                                        </div>
                                        <div className="flex gap-[14px] flex-col w-full z-[1000] absolute px-[32px] bottom-[32px]">
                                            <div style={{ boxShadow: "0px 2px 4px 0px #00000040" }} className="flex items-center justify-between rounded-[7px] bg-[#FFFFFF] py-[10px] px-[10px]">
                                                <div className="flex gap-[20px] items-center">
                                                    <img src={icon2} className='h-[20px] w-[20px]' alt="" />
                                                    <input

                                                        type="text"
                                                        onClick={() => {
                                                            setActiveField('pickup')
                                                        }}
                                                        className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]"
                                                        value={pickupLocation}
                                                        name="pickup"
                                                        onChange={handlePickupChange}
                                                        placeholder="pickup location"

                                                    />
                                                    {/* <p className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]">Pickup location</p> */}
                                                </div>
                                                {/* <img src={search} className='h-[30px] w-[30px]' alt="" /> */}
                                            </div>

                                            <div style={{ boxShadow: "0px 2px 4px 0px #00000040" }} className="flex items-center justify-between rounded-[7px] bg-[#FFFFFF] py-[10px] px-[10px]">
                                                <div className="flex gap-[20px] items-center">
                                                    <img src={icon1} className='h-[20px] w-[20px]' alt="" />
                                                    <input
                                                        type="text"
                                                        onClick={() => {
                                                            setActiveField('destination')
                                                        }}
                                                        className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]"
                                                        value={dropLocation}
                                                        name="drop"
                                                        onChange={handleDestinationChange}
                                                        placeholder="drop location"
                                                    />
                                                    {/* <p className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]">Drop Location</p> */}
                                                </div>
                                                {/* <img src={search} className='h-[30px] w-[30px]' alt="" /> */}
                                            </div>
                                        </div>
                                        {isLoadingPlaces && (
                                            <ClipLoader color="#4CAF50" loading={isLoading} />
                                        )}
                                        {!isLoadingPlaces && (
                                            <div className=' bg-white position max-h-[400px] overflow-y-auto mt-4' style={{maxHeight:'180px'}}>
                                                <LocationSearchPanel
                                                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                                                    setPanelOpen={setPanelOpen}
                                                    setVehiclePanel={setVehiclePanel}
                                                    setPickupLocation={setPickupLocation}
                                                    setDropLocation={setDropLocation}
                                                    activeField={activeField}
                                                />
                                            </div>)}
                                    </div>
                                    <div className="flex items-center col-span-2 gap-[12px]">
                                        <p className="m-0 font-[500] text-[#000000] font-satoshi text-[16px]">Estimated Fair is This</p>
                                        <img src={icon3} className='h-[30px] w-[30px]' alt="" />
                                        <p className="m-0 font-[500] text-[#21A6E9] font-satoshi text-[16px]">Mumbai 25 Km </p>
                                    </div>
                                    <div className="flex justify-end col-span-2">
                                        <div className="bg-[#21A6E9] flex py-[5px] rounded-full pr-[6px] pl-[26px]">
                                            <button
                                            className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[36px] text-[#FFFFFF]"
                                            onClick={()=>setCurrentStep('02')}>Continue</button>
                                          
                                            <img src={rightarrow} alt="" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-full max-w-[555px]'>
                                <img src={img2} className='w-full h-[400px]' alt="" />
                            </div>
                        </div>
                    </div>}
                {currentStep === "02" &&
                    <div>
                        <h6 className="mb-0 font-[500] font-satoshi md:text-[48px] text-[30px] leading-[68px] text-center text-[#000000] pb-[40px]">Choose Vehicle Type</h6>
                        <div className="w-full bg-[#FFFFFF] rounded-[30px] md:p-[78px] p-[20px]">
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-[24px]">
                            {(selectedVehicleData.length === 0 || selectedVehicleData.includes('crane')) && ( 
                                <div className="c-card" onClick={()=>{
                                    setCurrentStep('03')
                                    setVehicleType('crane')}}>
                                    <img src={img3} className='h-[197px] w-full object-contain' alt="" />
                                    <h6 className="pt-[10px] mb-0 text-center c-title text-[#000000] text-[20px] pb-[13px]">Hydra Crane</h6>
                                    <p className="m-0">Get the quick service</p>
                                </div>
                            )}
                            {(selectedVehicleData.length === 0 || selectedVehicleData.includes('recoveryVan')) && ( 
                                <div className="c-card" onClick={()=>{
                                    setCurrentStep('03')
                                    setVehicleType('recoveryVan')}}>
                                    <img src={img4} className='h-[197px] w-full object-contain' alt="" />
                                    <h6 className="pt-[10px] mb-0 text-center c-title text-[#000000] text-[20px] pb-[13px]">Mobile Crane</h6>
                                    <p className="m-0">catch up quickly get best service with crane</p>
                                </div>)}
                                {(selectedVehicleData.length === 0 || selectedVehicleData.includes('crane') && selectedVehicleData.includes('recoveryVan')) && ( 
                                <div className="c-card" onClick={()=>{
                                    setCurrentStep('03')
                                    setVehicleType('crane,recoveryVan')}}>
                                    <img src={img5} className='h-[197px] w-full object-contain' alt="" />
                                    <h6 className="pt-[10px] mb-0 text-center c-title text-[#000000] text-[20px] pb-[13px]">Mobile Crane Hydra Crane</h6>
                                    <p className="m-0">catch up quickly get crane and Mobile crane </p>
                                </div>)}
                            </div>
                        </div>
                    </div>}
                {currentStep === "03" &&
                    <div>
                        <h6 className="mb-0 font-[500] font-satoshi md:text-[48px] text-[30px] leading-[68px] text-center text-[#000000] pb-[40px]">Add Vehicle Images</h6>
                        <div className="w-full bg-[#FFFFFF] rounded-[30px] md:p-[78px] max-w-[1148px] mx-auto p-[20px]">
                            {/* <div className="grid md:grid-cols-3 grid-cols-1 gap-[24px]">
                                <div className="h-[342px] bg-[#F9F9F9] rounded-[16px] flex items-center justify-center">
                                    <img src={icon4} className='h-[100px] w-[100px]' alt="" />
                                </div>
                                
                            </div> */}
                            <VehicleImagePanel setImages={setImages} setCurrentStep={setCurrentStep}/>
                            {/* <div className="flex justify-end items-center gap-[30px] pt-[60px]">
                                <button className='text-[#21A6E9] font-[400] font-satoshi text-[24px] leading-[33.6px]'>Skip</button>
                                <div className="bg-[#21A6E9] flex py-[5px] rounded-full pr-[6px] pl-[26px]">
                                    <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[36px] text-[#FFFFFF]">Continue</button>
                                    <img src={rightarrow} alt="" />
                                </div>
                            </div> */}
                        </div>
                    </div>}
                {currentStep === "04" &&
                    <div>
                        <h6 className="mb-0 font-[500] font-satoshi md:text-[48px] text-[30px] leading-[68px] text-center text-[#000000] pb-[40px]">Confirm Information</h6>
                        <div className="flex md:flex-row flex-col justify-center gap-[30px]">
                            <div className="max-w-[694px] w-full bg-[#FFFFFF] rounded-[30px] md:py-[50px] py-[30px] md:px-[40px] px-[20px]">
                                <div className="grid grid-cols-2 gap-[24px]">
                                    <div className="col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Vehicle Number</label>
                                        <div>
                                            <select name="" id="" value={regNo}
                                                onChange={(e) => {
                                                    const selectedVehicle = allVehicleNumbers.find(vehicle => vehicle.vehicleNo === e.target.value)
                                                    handleChange(e, selectedVehicle)
                                                }}
                                                disabled={getData.isActive === "false"}
                                                className='border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] py-[16px] px-[10px] w-full'>
                                                <option value="">Select Number</option>
                                                {!cities.error && allVehicleNumbers.map(vehicle => (
                                                    <option key={vehicle.vehicleNo} value={vehicle.vehicleNo}>
                                                        {vehicle.vehicleNo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Spot Person</label>
                                        <div>
                                            <input
                                                type="text"
                                                className="border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] pl-[15px] py-[16px] px-[10px]  w-full"
                                                style={{ padding: '20px' }}
                                                value={onSpotName}  // This is fine as long as both values are being correctly updated
                                                name="spotPerson"
                                                placeholder="Enter Name"
                                                onChange={(e) => setOnSpotName(e.target.value)}  // Make sure `setOnSpotName` is correctly updating state
                                                disabled={getData?.isActive === "false"}  // Ensure `getData.isActive` is the correct type (string vs boolean)
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Spot Person Number</label>
                                        <div>
                                            <input
                                                type="text"
                                                className="border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] py-[16px] px-[10px] w-full"
                                                style={{ padding: '20px' }}
                                                value={onSpotContact}
                                                placeholder='Spot Person Number'
                                                onChange={(e) => setOnSpotContact(e.target.value)}
                                                disabled={getData.isActive === "false"}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="" className='font-[500] font-satoshi text-[16px] text-[#000000] pb-[14px]'>Quantity (Tons)</label>
                                        <div>
                                            <input
                                                type="number"
                                                name="quantity"
                                                className="border border-[#DEDEE8] bg-[#F6F6F6] rounded-[7px] py-[16px] px-[10px] w-full"
                                                style={{ padding: '20px' }}
                                                value={quantity}
                                                readOnly={nowReadOnly ? true : false}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    if (/^\d*$/.test(newValue)) {
                                                        setQuantity(newValue);
                                                    }
                                                }}
                                                placeholder='Quantity'
                                                disabled={getData.isActive === "false"}
                                            />
                                        </div>
                                    </div>
                                    <div className='h-[350px] mb-[200px] col-span-2 relative mt-[16px]'>
                                        {/* <img src={img1} alt="" /> */}
                                        <div className="h-full w-full rounded-xl overflow-hidden">
                                            <MapForVendorDistance className="h-full w-full rounded-xl" />
                                        </div>
                                        <div className="flex gap-[14px] flex-col w-full z-[1000] absolute px-[32px] bottom-[32px]">
                                            <div style={{ boxShadow: "0px 2px 4px 0px #00000040" }} className="flex items-center justify-between rounded-[7px] bg-[#FFFFFF] py-[10px] px-[10px]">
                                                <div className="flex gap-[20px] items-center">
                                                    <img src={icon2} className='h-[20px] w-[20px]' alt="" />
                                                    <input

                                                        type="text"
                                                        onClick={() => {
                                                            setActiveField('pickup')
                                                        }}
                                                        className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]"
                                                        value={pickupLocation}
                                                        name="pickup"
                                                        onChange={handlePickupChange}
                                                        placeholder="pickup location"

                                                    />
                                                    {/* <p className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]">Pickup location</p> */}
                                                </div>
                                                {/* <img src={search} className='h-[30px] w-[30px]' alt="" /> */}
                                            </div>

                                            <div style={{ boxShadow: "0px 2px 4px 0px #00000040" }} className="flex items-center justify-between rounded-[7px] bg-[#FFFFFF] py-[10px] px-[10px]">
                                                <div className="flex gap-[20px] items-center">
                                                    <img src={icon1} className='h-[20px] w-[20px]' alt="" />
                                                    <input
                                                        type="text"
                                                        onClick={() => {
                                                            setActiveField('destination')
                                                        }}
                                                        className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]"
                                                        value={dropLocation}
                                                        name="drop"
                                                        onChange={handleDestinationChange}
                                                        placeholder="drop location"
                                                    />
                                                    {/* <p className="m-0 font-satoshi font-[400] text-[14px] text-[#19104E]">Drop Location</p> */}
                                                </div>
                                                {/* <img src={search} className='h-[30px] w-[30px]' alt="" /> */}
                                            </div>
                                        </div>
                                        {isLoadingPlaces && (
                                            <ClipLoader color="#4CAF50" loading={isLoading} />
                                        )}
                                        {!isLoadingPlaces && (
                                            <div className=' bg-white position max-h-[400px] overflow-y-auto mt-4' style={{maxHeight:'180px'}}>
                                                <LocationSearchPanel
                                                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                                                    setPanelOpen={setPanelOpen}
                                                    setVehiclePanel={setVehiclePanel}
                                                    setPickupLocation={setPickupLocation}
                                                    setDropLocation={setDropLocation}
                                                    activeField={activeField}
                                                />
                                            </div>)}
                                    </div>
                                    <div className="flex items-center col-span-2 gap-[12px]">
                                        <p className="m-0 font-[500] text-[#000000] font-satoshi text-[16px]">Estimated Fair is This</p>
                                        <img src={icon3} className='h-[30px] w-[30px]' alt="" />
                                        <p className="m-0 font-[500] text-[#21A6E9] font-satoshi text-[16px]">Mumbai 25 Km </p>
                                    </div>
                                    <div className="col-span-2 pt-[16px]">
                                        <h6 className="m-0 font-satoshi font-[500] text-[32px] text-[#000000] pb-[33px]">Vehicle Type</h6>
                                        <div className='bg-[#E6F8FE] border border-[#21A6E9] rounded-[16px] py-[10px] px-[32px] flex items-center gap-[46px]'>
                                            <img src={img3} className='h-[101px] w-[100px]' alt="" />
                                            <div>
                                                <h6 className="m-0 font-satoshi font-[500] text-[20px] leading-[28px] text-[#21A6E9]">Hydra Crane</h6>
                                                <p className="m-0 font-[400] font-satoshi text-[16px] leading-[30px] text-[#000000]">Get the quick service</p>
                                            </div>
                                        </div>
                                        <h6 className="m-0 font-satoshi font-[500] text-[32px] text-[#000000] py-[30px]">Vehicle Images</h6>
                                        <div className="grid md:grid-cols-3 grid-cols-1 gap-[15px]">
                                            <img src={img6} alt="" />
                                            <img src={img7} alt="" />
                                            <img src={img6} alt="" />
                                        </div>
                                    </div>
                                    <div className="flex md:flex-row flex-col md:gap-0 gap-[20px] justify-between items-center col-span-2 pt-[36px]">
                                        <div className="bg-[#FFFFFF] border-[1px] border-[#21A6E9] flex py-[5px] pr-[6px] pl-[26px]" style={{ border: '1px', borderRadius: '20px' }}>
                                            <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[26px] text-[#21A6E9]">Download PDF</button>
                                            <img src={icon5} className='h-[40px] w-[40px]' alt="" />
                                        </div>
                                        <div className="bg-[#21A6E9] flex py-[5px] rounded-full pr-[6px] pl-[26px] cursor-pointer" onClick={() => setIsModalOpenLooking(true)}>
                                            <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[36px] text-[#FFFFFF]">Continue</button>
                                            <img src={rightarrow} alt="" />
                                        </div>
                                    </div>
                                   

                                </div>
                            </div>
                            <div className='w-full max-w-[555px]'>
                                <img src={img2} className='w-full h-[400px]' alt="" />
                            </div>
                        </div>

                        <ModalForLookVehicle
                            isOpen={isModalOpenLooking}
                            onClose={() => setIsModalOpenLooking(false)}
                        />
                    </div>}
            </div>
        </>
    )
}

export default AddVehicles


function ModalForLookVehicle({ isOpen, onClose, }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white py-[42px] px-[50px] rounded-[30px] shadow-lg w-[90%] md:w-[536px] relative">
                <h6 className="m-0 font-[500] text-[48px] font-satoshi text-center text-[#000000]">Your Request in Progress</h6>
                <div className="grid md:grid-cols-2 grid-cols-1 pt-[40px] items-center gap-[18px]">
                    <div
                        onClick={onClose}
                        className="bg-[#EE3840] flex py-[5px] rounded-full pr-[6px] pl-[26px] w-full justify-between items-center cursor-pointer">
                        <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[36px] text-[#FFFFFF]">Cancel</button>
                        <img src={rightarrow} className='h-[40px] w-[40px]' alt="" />
                    </div>
                    <div className="bg-[#21A6E9] flex py-[5px] rounded-full pr-[6px] pl-[26px] w-full cursor-pointer justify-between items-center">
                        <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] text-[#FFFFFF]">Look For Vehicle</button>
                        <img src={rightarrow} className='h-[40px] w-[40px]' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};