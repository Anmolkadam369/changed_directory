import React, { useState, useEffect, useRef } from 'react';
import './Registration.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Close as CloseIcon, LocationSearchingSharp } from '@mui/icons-material';
// '../../environment';
import Modal from '../Location1/Modal'; // Import the modal component
import { Helmet } from 'react-helmet-async';
import crossUser from '../../Assets/crossUser.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import checksuccess from '../../Assets/checksuccess.png'
import SuccessIcon from '../CaseFirstCard/SuccessIcon';
import BottomNavigationBar from '../User/BottomNavigationBar';
import MapComponent from '../AAAAAAAAAAAAAAAAAA/MapComponent';
import LocationSearchPanel from '../Location1/LocationSearchPanel';
import VehiclePanel from './VehiclePanel';
import ConfirmedRide from './ConfirmedRide';
import LookingForAccptance from './LookingForAcceptance';
import WaitForVehicleCome from './WaitForVehicleCome';
import MapForVendorDistance from '../User/MapForVendorDistance';
import Loading from '../User/Cards/Loading';
import AddNewData from '../User/Cards/AddNewData';
import VehicleImagePanel from './VehicleImagePanel';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

function Registration({ item, fromPageHere, centerHere, vehicleNo }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");


    console.log("itemshere", item)
    if (item == null) {
        console.log("iteminside", item)
    }
    const [regNo, setRegNo] = useState(item?.reg || '');

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
        vehicleType == 'craneandrecoveryvan' ? setIsRecoveryVan(true) : setIsRecoveryVan(false)
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
        if (localStorage.getItem('isVerified') == 'true') {
            setIsVerified(true)
        }

    }, [token, userId, navigate]);

    const getCustomerDriver = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/findByIdCustomerDriver/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log("daa", response.data)
        if (response.data.message == "data found") {
            setRegNo(response.data.data[0].vehicleNo)
            setOnSpotName(response.data.data[0].driverName)
            setOnSpotContact(response.data.data[0].driverNumber)
        }

    }

    const getVehicleNumbers = async () => {
        console.log("userid", userId);
        let notAccidentVehicles = []
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalVehicleInfoById/${userId}`);
        if (response.data.message == "No accident vehicle data found.") {
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

    // async function getVehicleData() {
    //     try {
    //         const getData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vehicle/${regNo}/${userId}/crane`, { headers: { Authorization: `Bearer ${token}` } });
    //         if (getData.data.message === 'Vehicle found') {
    //             setVehicleInfo([getData.data]);
    //             setComingVehicle(getData.data);
    //             setIsModalOpen(true); // Open the modal when data is found
    //         } else {
    //             setAlertInfo({ show: true, message: getData.data.message, severity: 'success' });
    //         }
    //     } catch (error) {
    //         setAlertInfo({ show: true, message: error.response?.data?.message || 'An error occurred', severity: 'error' });
    //     }
    // }
    const [selectedVehicleData, setSelectedVehicleData] = useState([]);
    console.log('MH0412322', selectedVehicleData)
    const handleChange = (event, selectedVehicle) => {
        console.log('selectedVehicle', selectedVehicle)
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
    //     if (localStorage.getItem('isVerified') == 'true') {
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
            if (response.data.message == "Data Successfully Inserted.") {
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
            console.log('latitudedsss', longitude, latitude)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/get-nearby-places`, {
                data: { lat: latitude, lon: longitude, radius: 1000 },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            console.log("respose.data", response.data)
            setPickupSuggestions(response.data)
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
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/get-nearby-places`, {
                    data: { lat: dropLatitude, lon: dropLongitude, radius: 1000 },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                })
                console.log("respose.data", response.data)
                setDestinationSuggestions(response.data)
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
        <div>

            {doneFetching == false && (
                <Loading />
            )}
            {doneFetching == true && allVehicleNumbers.length == 0 && (
                <div>
                    <div onClick={(navigateTo)}>
                        <AddNewData index={userId.startsWith('CUD-') ? 2 : 1} />
                    </div>
                </div>
            )}
            {doneFetching && allVehicleNumbers.length > 0 && (<div className="Registrationdetails-elem-16 bg-white h-full">
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
                    <div className="Registrationdetails-elem-14" style={{ padding: "30px 1px 0px 1px", height: "100vh" }}>
                        <span className="cd-paragraph-clean Registrationdetails-elem-7">
                        </span>
                        <div className="Registrationdetails-elem-13">
                            <div className="Registrationdetails-elem-11">
                                <div className="Registrationdetails-elem-10">
                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <p className='pl-3' style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}><em> Accident Vehicle Details</em></p>
                                        {fromPageHere == "allvehicles" && (<button style={{ padding: "5px 10px", background: nowReadOnly ? "lightblue" : 'green', color: nowReadOnly ? "black" : "white", width: "60px", fontSize: "15px", fontWeight: "bold", marginBottom: "20px", borderRadius: "10px" }} onClick={() => setNowReadOnly(!nowReadOnly)}>Edit</button>)}
                                    </div>
                                    {/* <span className="cd-paragraph-clean Registrationdetails-elem-8"> */}

                                    <p className='pl-3' style={{ fontSize: "12px", fontWeight: "bold" }}>Vehicle No OR Chassis No </p>

                                    {/* </span> */}
                                    <div style={{ display: "flex", marginBottom: "20px" }}>



                                        <select
                                            name="regNo"
                                            className={`w-full text-sm h-[30px] p-0 m-[10px] Registrationdetails-elem-9 
                border border-black rounded-md focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-blue-500 
            ${getData.isActive === "false" ? "bg-gray-500 cursor-not-allowed" : ""}`}
                                            style={{ fontSize: "13px", height: "30px", padding: '0px', margin: "10px 10px 0px 10px" }}
                                            value={regNo}
                                            onChange={(e) => {
                                                const selectedVehicle = allVehicleNumbers.find(vehicle => vehicle.vehicleNo == e.target.value)
                                                handleChange(e, selectedVehicle)
                                            }}  // Pass vehicle object with event
                                            disabled={getData.isActive === "false"}
                                        >
                                            <option className='text-sm font-semibold text-center' value="">Select Vehicle</option>
                                            {!cities.error && allVehicleNumbers.map(vehicle => (
                                                <option key={vehicle.vehicleNo} value={vehicle.vehicleNo}>
                                                    {vehicle.vehicleNo}
                                                </option>
                                            ))}
                                        </select>

                                        {/* <div style={{ border: "1px solid" }}> hey </div> */}

                                        {regNo != "" && (
                                            <div className='w-[100px]'>
                                                <img src={checksuccess} style={{ marginTop: '10px', height: "25px", width: '25px' }} />
                                            </div>
                                        )}
                                    </div>
                                    {regNo != "" && (
                                        <div>
                                            <div className='flex'>
                                                <div>
                                                    <p className='pl-3' style={{ fontSize: "12px", fontWeight: "bold" }}>Spot Person</p>

                                                    <input
                                                        type="text"
                                                        className="Registrationdetails-elem-9"
                                                        style={{ textAlign: 'left', margin: '10px', width: '80%' }}
                                                        value={onSpotName}  // This is fine as long as both values are being correctly updated
                                                        name="spotPerson"
                                                        placeholder="Spot Person Name"
                                                        onChange={(e) => setOnSpotName(e.target.value)}  // Make sure `setOnSpotName` is correctly updating state
                                                        disabled={getData?.isActive === "false"}  // Ensure `getData.isActive` is the correct type (string vs boolean)
                                                    />

                                                </div>

                                                <div>

                                                    <p className='pl-3' style={{ fontSize: "12px", fontWeight: "bold" }}>Spot Person No</p>

                                                    <input
                                                        type="text"
                                                        className="Registrationdetails-elem-9"
                                                        style={{ textAlign: 'left', margin: '10px 10px 10px 10px', width: '80%' }}
                                                        value={onSpotContact}
                                                        placeholder='Spot Person Number'
                                                        onChange={(e) => setOnSpotContact(e.target.value)}
                                                        disabled={getData.isActive === "false"}
                                                    />
                                                </div>
                                                <div>

                                                    <p className='pl-3' style={{ fontSize: "12px", fontWeight: "bold" }}>Quantity (tons)</p>

                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        className="Registrationdetails-elem-9"
                                                        style={{ textAlign: 'left', margin: '10px 10px 10px 10px', width: '80%' }}
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

                                            <div className="bg-white h-screen w-screen relative overflow-hidden">
                                                {/* Map Image */}
                                                {/* <img
                                                className={`h-auto w-full object-cover transition-opacity duration-500 ${panelOpen ? 'opacity-0' : 'opacity-100'
                                                    }`}
                                                src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                                                alt="dummy map"
                                            /> */}
                                                <div className={`h-auto w-full object-cover transition-opacity duration-500 ${panelOpen ? 'opacity-0' : 'opacity-100'
                                                    }`}>
                                                    <MapForVendorDistance />
                                                </div>

                                                {/* Input Panel */}
                                                <div
                                                    style={{
                                                        paddingTop: panelOpen ? '70px' : '20px',
                                                        transform: panelOpen ? 'translateY(0)' : 'translateY(100%)',
                                                        position: panelOpen ? 'fixed' : 'absolute',
                                                        zIndex: panelOpen ? '100' : '1000',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        transition: panelOpen ? 'transform 0.3s ease-in-out, opacity 0s' : 'none', // Apply instant opacity change when not open
                                                    }}
                                                    className={`bg-white   pl-4 pr-4 pb-4 rounded-lg bg-opacity-60  w-full transition-all duration-500 ease-in-out`}
                                                >
                                                    <h5 className="text-sm text-black font-semibold mb-3 text-left">Book Vehicle Now</h5>
                                                    <div
                                                        className={`transition-all duration-500 ease-in-out`}
                                                        style={{
                                                            transform: panelOpen ? 'translateY(-1px)' : 'translateY(0px)',
                                                        }}
                                                    >
                                                        <input

                                                            type="text"
                                                            onClick={() => {
                                                                setPanelOpen(true)
                                                                setActiveField('pickup')
                                                            }}
                                                            className="text-black p-2 m-1 w-full mb-3 rounded-lg border border-black-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                            value={pickupLocation}
                                                            name="pickup"
                                                            onChange={handlePickupChange}
                                                            placeholder="pickup location"

                                                        />
                                                        <input
                                                            type="text"
                                                            onClick={() => {
                                                                setPanelOpen(true)
                                                                setActiveField('destination')
                                                            }}
                                                            className="text-black p-2 m-1 w-full rounded-lg border border-black-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                            value={dropLocation}
                                                            name="drop"
                                                            onChange={handleDestinationChange}
                                                            placeholder="drop location"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={findTrip}
                                                        disabled={!dropLocation || !pickupLocation}
                                                        className={`px-4 py-2 rounded-lg mt-3 w-full text-sm ${!dropLocation || !pickupLocation ? 'bg-gray-500' : 'bg-black'} text-white`}>
                                                        Done
                                                    </button>
                                                </div>
                                                {/* Panel */}
                                                <div
                                                    ref={panelRef}
                                                    className="bg-white w-full transition-all duration-500 ease-in-out absolute bottom-0 left-0"
                                                    style={{
                                                        height: panelOpen ? '100%' : '0%',
                                                        opacity: panelOpen ? 1 : 1,
                                                        paddingTop: panelOpen ? '20px' : '0',

                                                    }}
                                                >
                                                    {/* Close Icon */}
                                                    <div className='text-center top-0 mb-1'>
                                                        <IconButton
                                                            onClick={() => setPanelOpen(false)}
                                                            className="absolute"
                                                        >
                                                            <ExpandMoreIcon className='fixed' />
                                                        </IconButton>
                                                    </div>

                                                    {/* Panel content */}


                                                    <div className='position max-h-[500px] overflow-y-auto'>
                                                        <LocationSearchPanel
                                                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                                                            setPanelOpen={setPanelOpen}
                                                            setVehiclePanel={setVehiclePanel}
                                                            setPickupLocation={setPickupLocation}
                                                            setDropLocation={setDropLocation}
                                                            activeField={activeField}
                                                        />
                                                    </div>
                                                </div>
                                                <div ref={vehiclePanelRef} style={{ zIndex: "1001" }} className='fixed  w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-0 mb-10'>
                                                    <VehiclePanel selectedVehicleData={selectedVehicleData} setVehicleType={setVehicleType} setVehicleImagesPanel={setVehicleImagesPanel} setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
                                                </div>
                                                <div ref={vehicleImagesPanelRef} style={{ zIndex: "1001" }} className='fixed  w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-0 mb-10'>
                                                    <VehicleImagePanel setImages={setImages} setConfirmVehicle={setConfirmVehicle} setVehicleImagesPanel={setVehicleImagesPanel} setVehiclePanel={setVehiclePanel} />
                                                </div>
                                                <div ref={confirmVehicleRef} style={{ zIndex: "1001" }} className='fixed  w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 mb-10'>
                                                    <ConfirmedRide vehicleType={vehicleType} accidentData={accidentDataObject} setConfirmVehicle={setConfirmVehicle} setVehicleImagesPanel={setVehicleImagesPanel} setVehicleFound={setVehicleFound} />
                                                </div>
                                                <div ref={vehicleFoundRef} className='fixed  w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 mb-10'>
                                                    <LookingForAccptance vehicleType={vehicleType} accidentData={accidentDataObject} setVehicleFound={setVehicleFound} />
                                                </div>
                                                <div className='fixed  w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 mb-10'>
                                                    <WaitForVehicleCome />
                                                </div>
                                            </div>
                                        </div>
                                    )}

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

            </div >)}

            <div>
                <BottomNavigationBar />
            </div>
        </div >
    );
}

export default Registration;