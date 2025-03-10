
import React, { useEffect, useState } from 'react';
import '../FirstPage.css'
import axios, { isCancel } from 'axios';
// '../../../environment';
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import casefiled from '../../../Assets/casefiled.png'
import telephonecall from '../../../Assets/telephonecall.png'
import checksuccess from '../../../Assets/checksuccess.png'
import crossUser from '../../../Assets/crossUser.png'


import Registration from '../../Registration/Registration';
import NoDataFound from '../Cards/NoDataFound';

import SuccessIcon from '../../CaseFirstCard/SuccessIcon';
import filterUser from '../../../Assets/filterUser.png'
import Modal from '../../Location1/Modal.jsx';
import Loading from '../Cards/Loading.jsx';
import { useWebSocket } from '../../ContexAPIS/WebSocketContext.jsx';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LookingForAccptance from '../../Registration/LookingForAcceptance.jsx';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import ScaleIcon from '@mui/icons-material/Scale';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import PersonIcon from '@mui/icons-material/Person';
import { Alert } from '@mui/material';






const QuotationUpdate = ({ vehicleNumber }) => {
    const [currentStage, setCurrentStage] = useState([]); // Example stage
    const currentService = localStorage.getItem("currentService")
    const { messages } = useWebSocket();

    console.log("currentStage123", `${currentService}Details`)
    const [currentStage1, setCurrentStage1] = useState(2); // Example stage
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    const [isCancelContainerVisible, setIsCancelContainerVisible] = useState(false);

    const [reasonsForDrop, setReasonsForDrop] = useState(false);


    const [alreadyCancelled, setAlreadyCancelled] = useState(false);
    const [cancelled, setCancelled] = useState(false);


    console.log("reasonForDrop", reasonsForDrop)


    const [caseDetails, setCaseDetails] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    console.log("currentItme", currentItem)


    const [data, setData] = useState([]);
    console.log("DATAishere", data)
    const [dummyData, setDummyData] = useState([]);
    const [filter, setFilter] = useState('')
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [doneFetching, setDoneFetching] = useState(false)
    console.log("DATA HERE", data)
    const [currentItems, setCurrentItems] = useState(data);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");


    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getFilteredData = (filter) => {
        console.log("data is here");
        const filteredData = [];

        const now = new Date();  // Current date and time
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        const yesterday = new Date(now.getTime() - oneDay); // Yesterday's date and time
        const weekBefore = new Date(now.getTime() - (oneDay * 7));
        const monthBefore = new Date(now.getTime() - (oneDay * 30));




        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const todayDate = formatDate(now);
        const yesterdayDate = formatDate(yesterday);
        const weekBeforeDate = formatDate(weekBefore)
        const monthBeforeDate = formatDate(monthBefore)

        console.log("todayDate", todayDate)
        console.log("yesterdayDate", yesterdayDate)


        for (let i = 0; i < dummyData.length; i++) {
            let getTime = dummyData[i]?.[`${currentService}Details`]?.systemDate.split('|');
            let assignedDate = getTime[0];
            let assignedTime = getTime[1];
            let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

            if (filter === 'daily') {
                console.log("here i am daily")
                if (assignedDate === todayDate || assignedDate === yesterdayDate) {
                    const timeDifference = now - assignedDateTime;
                    if (timeDifference <= oneDay) {
                        console.log("Match found within last 24 hours:", data[i]);
                        filteredData.push(dummyData[i]);
                    }
                }
            }
            else if (filter === 'weekly') {
                console.log("here i am weekly")
                if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
                    console.log("Match found within last 7 days:", data[i]);
                    filteredData.push(dummyData[i]);
                }
            }
            else if (filter === 'monthly') {
                if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
                    console.log("Match found within last 30 days:", data[i]);
                    filteredData.push(dummyData[i]);
                }
            }
            else if (filter === 'year') {
                const yearBefore = new Date(now.getTime() - (oneDay * 365)); // Calculate date one year ago
                if (assignedDateTime >= yearBefore && assignedDateTime <= now) {
                    console.log("Match found within last year:", dummyData[i]);
                    filteredData.push(dummyData[i]);
                }
            }

        }
        if (filter === 'newest') {
            console.log("Sorting by newest to oldest");
            dummyData.sort((a, b) => {
                const dateA = new Date(a?.[`${currentService}Details`]?.systemDate.split('|').join(' '));
                const dateB = new Date(b?.[`${currentService}Details`]?.systemDate.split('|').join(' '));
                return dateB - dateA; // Descending order
            });
            setData([...dummyData]);
        } else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            dummyData.sort((a, b) => {
                const dateA = new Date(a?.[`${currentService}Details`]?.systemDate.split('|').join(' '));
                const dateB = new Date(b?.[`${currentService}Details`]?.systemDate.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setData([...dummyData]);
        }
        else {
            setData(filteredData)
        }
    };

    const settingFilter = (filter) => {
        console.log("filter", filter)
        setFilter(filter)
        getFilteredData(filter)
        setOpenFilterModal(false)
    }


    const reasons = [
        "Too much time taking",
        "Got Other Services",
        "Not Needed Now", "Changed my mind"
    ];

    const handleSelectReason = (reason) => {
        if (selectedReasons.includes(reason)) {
            // Remove from selected if already in array
            setSelectedReasons(selectedReasons.filter((item) => item !== reason));
        } else {
            // Add to selected array
            setSelectedReasons([...selectedReasons, reason]);
        }
    };


    const [reasonsSecForDrop, setReasonsSecForDrop] = useState(false);
    const [isCancelSecondaryContainerVisible, setIsCancelSecondaryContainerVisible] = useState(false);
    const [selectedSecReasons, setSelectedSecReasons] = useState([]);
    const [otherSecReason, setOtherSecReason] = useState("");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    const secReasons = [
        "Too much time taking",
        "Got Other Services",
        "Not Needed Now", "Changed my mind", 'charging too much'
    ];

    const handleSelectSecReason = (reason) => {
        if (selectedSecReasons.includes(reason)) {
            // Remove from selected if already in array
            setSelectedSecReasons(selectedSecReasons.filter((item) => item !== reason));
        } else {
            // Add to selected array
            setSelectedSecReasons([...selectedSecReasons, reason]);
        }
    };

    const cancelingSecOrder = async (currentItem) => {
        try {
            const reasons = [...selectedSecReasons, otherSecReason].filter(Boolean);
            if (reasons.length === 0) {
                return setAlertInfo({ show: true, message: 'Select Respective Reason', severity: 'error' });
            }
            console.log(`${process.env.REACT_APP_BACKEND_URL}/api/cancellingOrderSecondaryStage/${currentItem?.[`${currentService}Details`].AccidentVehicleCode}/${currentService}/${userId}/${currentItem?.[`${currentService}Details`][`${currentService}`]}`)
            const response = await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/cancellingOrderSecondaryStage/${currentItem?.[`${currentService}Details`].AccidentVehicleCode}/${currentService}/${userId}/${currentItem[`${currentService}Details`][`${currentService}`]}/${currentItem?.[`${currentService}Details`].vehicleNo}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    cancleOrderReason: [...selectedSecReasons, otherSecReason]
                }
            });

            if (response.data.status === true) {
                setIsCancelSecondaryContainerVisible(false);
                setReasonsSecForDrop(false);
                setIsImageContainerVisible(false)
                setCurrentItem({})
                getData()
            } else {
                setAlreadyCancelled(true);
            }
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };

    const navigate = useNavigate()


    // Array of stages
    // const stages = ["assigned", "accepted & moved","reached"];
    const stages = [
        { label: "Filed", img: casefiled },
        { label: "Connecting", img: telephonecall },
        { label: "Assigned", img: checksuccess },
    ];

    useEffect(() => {
        console.log('hey123323')
        setDoneFetching(false)

        if (messages.length > 0) {
            messages.forEach((message) => {
                console.log("messages123", message)
                if (message.forPage == 'quotation-updates-crane') {
                    getData();
                }
            })
        }
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        getData();
    }, [token, userId, navigate, currentService, messages]);

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${userId}/${currentService}/not-completed`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.message == "No accident vehicle data found.") {
            setDoneFetching(true)
            setData([])
        }
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);

            let filteredData = response.data.data.filter((info) =>
                 !info?.[`${currentService}Details`]?.customerAcceptedVendor && !info?.[`${currentService}Details`]?.closeOrder
            );

            let filteredImportant = filteredData.filter((info) =>
                info?.[`${currentService}Details`]?.connectedVendorFully == true
            )

            let filteredLessImportant = filteredData.filter((info) =>
                info?.[`${currentService}Details`]?.connectedVendorFully == false
            )
            filteredData = [...filteredImportant, ...filteredLessImportant]
            console.log('filteredData', filteredData)
            setData(filteredData)
            setDummyData(filteredData)

            console.log("seTDATIOATN", filteredData);

            setCurrentItems(response.data.data);
            setDoneFetching(true)
        }
    };


    const goToMap = (item) => {
        console.log("itemfromgotomap", item)
        console.log("item.accidentLatitude", item.accidentLatitude, "item.accidentLongitude", item.accidentLongitude, "vendorCurrentLatitude", vendorCurrentLatitude, "vendorCurrentLongitude", vendorCurrentLongitude)
        navigate('/map-vendor-distance', {
            state: {
                accidentLatitude: item.accidentLatitude,
                accidentLongitude: item.accidentLongitude,
                vendorLatitude: vendorCurrentLatitude,
                vendorLongitude: vendorCurrentLongitude,
                vehicleNo: item.vehicleNo
            }
        })
    }
    const getStage = (connectedVendorFully) => {
        return connectedVendorFully ? 2 : 1;
    }
    useEffect(() => {
        console.log("I GOT TRIGGERED2 ", currentService)

        if (data.length > 0) {
            console.log("I GOT TRIGGERED2 ", currentService)
            const setUpdatedData = data.map((item) => {
                let gotStage = getStage(item?.[`${currentService}Details`]?.connectedVendorFully)
                return gotStage;
            })
            setCurrentStage(setUpdatedData)
        }
    }, [data])


    const connectCaseDetailsOnly = (item) => {
        console.log("DoDfasdf", item?.[`${currentService}Details`])
        console.log("DoDfasdf", item?.vehicle)

        let gotData = {
            ...item?.[`${currentService}Details`],
            accidentImage1: item?.vehicle?.accidentImage1,
            accidentImage2: item?.vehicle?.accidentImage2,
            accidentImage3: item?.vehicle?.accidentImage3,
            accidentImage4: item?.vehicle?.accidentImage4,
          };
          console.log('gotdata', gotData)
        setCurrentItem(gotData)
        setCaseDetails(true)
    }


    // this can be taken to othe page
    const [comingLink, setComingLink] = useState("");


    const getPaymentLink = async (item) => {
        try {
            console.log('getpayemdafsd', `${process.env.REACT_APP_BACKEND_URL}/api/sendPaymentLinkToCustomer/${userId}/${item[`${currentService}Details`].AccidentVehicleCode}/${item[currentService]}/${item[`${currentService}Details`].vehicleNo}`)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/sendPaymentLinkToCustomer/${userId}/${item[`${currentService}Details`].AccidentVehicleCode}/${item[currentService]}/${item[`${currentService}Details`].vehicleNo}`);
            if (response.data.status == true) {
                let link = response.data.data;
                console.log("link coming", link)
                setComingLink(link)

            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }

    const cancelingOrder = async (currentItem) => {
        try {
            console.log('insoidre', currentItem)
            const reasons = [...selectedReasons, otherReason].filter(Boolean);
            if (reasons.length === 0) {
                return setAlertInfo({ show: true, message: 'Select Respective Reason', severity: 'error' });
                console.log('insoidre1')
            }
            console.log('i am here')
            const response = await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/cancellingOrderPrimaryStage/${currentItem?.[`${currentService}Details`].AccidentVehicleCode}/${currentService}/${userId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    cancleOrderReason: [...selectedReasons, otherReason]
                }
            });

            if (response.data.status === true) {
                setIsCancelContainerVisible(false);
                setReasonsForDrop(false);
                setCancelled(true)
                getData()
            } else {
                setAlreadyCancelled(true);
            }
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };

    const getPaymentLinkPage = () => {
        console.log("curretnIte", currentItem)
        console.log("craneishererererwrwer", currentItem?.[`${currentService}Details`].vehicleNo,
            currentItem?.[`${currentService}Details`].AccidentVehicleCode,
            currentItem?.[`${currentService}Details`][`${currentService}`],
            userId,
            `${currentService}`)
        navigate(`${comingLink}`, {
            state: {
                vehicleNo: currentItem?.[`${currentService}Details`].vehicleNo,
                accidentVehicleCode:  currentItem?.[`${currentService}Details`].AccidentVehicleCode,
                vendorCode:  currentItem?.[`${currentService}Details`][`${currentService}`],
                customerCode: userId,
                vendorType: `${currentService}`,
            }
        })
    }


    // wanna take to the other page

    function haversine(lat1, lon1, lat2, lon2) {
        console.log("accident latitude", lat1)
        console.log("accident longtitude", lon1)
        console.log("vehicle latitiude", lat2)
        console.log("vehicle longtitude", lon2)

        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Earth radius in km

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    const assignedCaseViewVendor = (item) => {
        setCurrentItem(item)
        setIsImageContainerVisible(true)
        getVendorRating(item?.[`${currentService}Details`].crane)
        console.log('item', item?.[`${currentService}Details`].crane);
        console.log('item.crane',item?.[`${currentService}Details`].crane,item?.[`${currentService}Details`].accidentLatitude,item?.[`${currentService}Details`].accidentLongitude);
        getVendorLocation(item?.[`${currentService}Details`].crane,item?.[`${currentService}Details`].accidentLatitude,item?.[`${currentService}Details`].accidentLongitude)
    }
    const cancleCaseProcedureFunc = (item) => {
        setCurrentItem(item)
        setIsCancelContainerVisible(true)
        setReasonsForDrop(false)
        getVendorRating(item?.[`${currentService}Details`].crane)
        getVendorLocation(item?.[`${currentService}Details`].crane,item?.[`${currentService}Details`].accidentLatitude,item?.[`${currentService}Details`].accidentLongitude)
    }
    const cancleCaseSecondaryProcedureFunc = (item) => {
        setCurrentItem(item)
        setIsCancelSecondaryContainerVisible(true)
        setReasonsForDrop(false)
        getVendorRating(item?.[`${currentService}Details`].crane)
        getVendorLocation(item?.[`${currentService}Details`].crane,item?.[`${currentService}Details`].accidentLatitude,item?.[`${currentService}Details`].accidentLongitude)
    }
    const [average, setAverage] = useState(0)
    const [distance, setDistance] = useState(0)
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")




    const getVendorRating = async (crane) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/customersRating/${crane}`);
            if (response.data.status == true) {
                let customerRating = response.data.data;
                console.log("coming Customer Rating", customerRating);
                if (customerRating.length !== 0) {
                    // let average = customerRating.reduce((acc, item) => acc + parseInt(item.feedbackRatingCrane), 0);
                    setAverage(average / customerRating.length);
                }
            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }

    const getVendorLocation = async (crane, accidentLatitude, accidentLongitude) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendorCurrentLocation/${crane}`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.status == true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)
                console.log('accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude', accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude)
                setDistance(haversine(accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude))
            }
            else if (response.data.message == "User Not found take Location") {
                console.log("User Not found take Location")
            }
        } catch (error) {
            console.log("error in get Vendor Location", error.message)
        }
    }

    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        if (vehicleNumber && dummyData.length > 0) {
            setSearchValue(vehicleNumber);
            handleSearch(vehicleNumber);
        }
    }, [vehicleNumber, dummyData]);

    useEffect(() => {
        return () => setSearchValue('');
    }, []);
    const handleSearch = (inputValue) => {
        // console.log("serachvaue", e.target.value)
        const value = inputValue?.toLowerCase() ?? searchValue.toLowerCase()
        setSearchValue(value);
        const newRows = dummyData.filter((row) => {
            console.log('row', row)
            const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
            const searchLower = value; // Use the updated search value directly

            const idValue = formattedId.includes(searchLower);
            const vehicleNoValue = (row?.[`${currentService}Details`]?.vehicleNo ?? '').toLowerCase().includes(searchLower);
            const chassisNoValue = (row?.[`${currentService}Details`]?.chassisNo ?? '').toLowerCase().includes(searchLower);

            return vehicleNoValue || chassisNoValue;
        });

        setData(newRows);
    };



    return (
        <div style={{ marginBottom: "60px" }}>

            {doneFetching && (
            <div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className="container ">
                        <div className="d-flex justify-content-center h-100" style={{ marginTop: '-113px', position: 'sticky', top: "25px" }}>
                            <div className="searchbar" style={{ border: '1px solid', minWidth: "130px" }}>
                                <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px" }} value={searchValue} onChange={(e) => { handleSearch(e.target.value) }} />
                                <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
                            </div>
                            <div style={{ margin: "23px 20px 0px" }}>
                                <img src={filterUser} style={{ height: '20px', width: "20px", background: 'linear-gradient(45deg, white, transparent)', borderRadius: "10px", }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                            </div>
                        </div>
                    </div>
                </div>


                {data.length > 0 && (
                    <div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                                
                            }}
                        >
                            {data.map((item, dataIndex) => (
                                <div style={{
                                    filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                                    opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                                    pointerEvents: isImageContainerVisible ? "none" : "auto",
                                    border: "1px solid red",
                                    minWidth: "280px",
                                    maxWidth: "410px", minWidth: "280px", margin: '10px',
                                    boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
                                    borderRadius: "5px", padding: "10px",
                                    // background: "#ffffff",
                                    borderRadius: "20px",
                                    
                                    backgroundImage: "url('https://media.istockphoto.com/id/1465157700/photo/brightly-red-colored-semi-truck-speeding-on-a-two-lane-highway-with-cars-in-background-under.jpg?s=612x612&w=0&k=20&c=cfbbPy2ylvFGRULNLGO_Ucm-C5DsOJMFHiZBdKGsq3c=')", // ✅ Corrected syntax
                                    backgroundSize: "cover", // ✅ Ensures the image covers the container
                                    backgroundPosition: "center", // ✅ Centers the image
                                    backgroundRepeat: "no-repeat", // ✅ Prevents tiling  

                                }}>

                                    <div style={{ display: "flex", alignItems: "center", margin: "20px 0px 0px 0px" }}>
                                        {stages.map((stage, index) => (

                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    position: "relative",
                                                    flex: 1,
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        backgroundColor: currentStage[dataIndex] == index ? index == 2 ? "rgb(11 219 255)" : "#4CAF50" : "#ccc",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        border: currentStage[dataIndex] == index ? "2px solid #4CAF50" : "none",
                                                        transition: "background-color 0.3s ease",
                                                        zIndex: 1,
                                                        marginTop: "-5px"
                                                    }}
                                                >

                                                    <img
                                                        src={stage.img}
                                                        alt={stage.label}
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            opacity: currentStage[dataIndex] <= index ? 1 : 0.5,
                                                        }}
                                                    />
                                                </div>

                                                <p
                                                    style={{
                                                        marginTop: "5px",
                                                        color: currentStage[dataIndex] <= index ? "black" : "#aaa",
                                                        fontWeight: currentStage[dataIndex] == index ? "bold" : "normal",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {stage.label}
                                                </p>

                                                {index < stages.length - 1 && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "10px", // Aligns with the center of the icon
                                                            left: "50%",
                                                            right: "-50%",
                                                            width: "100%",
                                                            height: "2px",
                                                            backgroundColor: index < currentStage[dataIndex] ? "#4CAF50" : "#ccc",
                                                            zIndex: 0,
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {item?.[`${currentService}Details`] && (
                                        <div style={{ marginTop: '20px', borderTop: '1px solid grey',background: '#dededee6',
                                            borderRadius: "20px",
                                            padding: '1px' }}>
                                            <div className='px-2 py-1 ' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>

                                                <div>
                                        {/* <img src='https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'/> */}
                                                </div>
                                                <div
                                                    className="right-10  flex items-center mt-1"
                                                    style={{ margin: '5px 5px 0 5px' }}
                                                >
                                                    <ArticleIcon className="h-[30px] w-[30px] text-red-500" />
                                                    <span className="text-xs font-medium ml-2">
                                                        {item?.[`${currentService}Details`]?.systemDate.split("T")[0]}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='px-2  ' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 5px' }}>
                                                    <LocalShippingOutlinedIcon className='h-[30px] w-[30px] text-red-600' />
                                                    <span className='text-s font-semibold' style={{ marginLeft: "5px" }}>{item?.[`${currentService}Details`].reg}</span>
                                                </div>

                                                <div className="flex items-center m-1">
                                                    {item?.[`${currentService}Details`]?.connectedVendorFully ? (
                                                        < SignalWifi4BarIcon className="h-8 w-8 text-green-600" />
                                                    ) : (
                                                        <NetworkWifiIcon className="h-8 w-8 text-green-400" />
                                                    )}
                                                    <span
                                                        className="text-xs font-bold flex items-center justify-center ml-1 px-1 py-0.5 rounded-lg text-blue-600"
                                                    >
                                                        {item?.[`${currentService}Details`]?.connectedVendorFully ? "Assigned" : "Connecting..."}
                                                    </span>
                                                </div>


                                            </div>
                                            <div className='px-2  flex-col'>
                                                <div class='flex'>
                                                    <MyLocationIcon className='m-1 ' />
                                                    <div className='px-2 py-2 flex-col'>
                                                        <h4 className='text-xs font-base'>{item?.[`${currentService}Details`]?.pickupLocation} </h4>
                                                    </div>
                                                </div>
                                                <div class='flex'>
                                                    <PinDropIcon className='m-1' />
                                                    <div className='px-1 py-1 flex-col'>
                                                        <p className='text-xs font-base'>{item?.[`${currentService}Details`]?.dropLocation}</p>
                                                    </div>
                                                </div>

                                            </div>


                                            <div>
                                                <div className="flex justify-between m-3" >
                                                    {!item?.[`${currentService}Details`]?.connectedVendorFully && (
                                                        <div className="flex items-center">
                                                        <div
                                                            className="bg-green-700 m-1 px-6 py-2 rounded-xl cursor-pointer"
                                                            onClick={(e) => connectCaseDetailsOnly(item)}
                                                        >
                                                            <p className="text-white font-semibold text-xs text-center">View </p>
                                                        </div>

                                                        {userId.startsWith('CC-') && (
                                                            <div
                                                                className="bg-red-700 m-1 px-6 py-2 rounded-xl cursor-pointer"
                                                                onClick={() => cancleCaseProcedureFunc(item)}
                                                            >
                                                                <p className="text-white font-semibold text-xs text-center">Reject</p>
                                                            </div>)}
                                                    </div>
                                                )}

                                                    {item?.[`${currentService}Details`]?.connectedVendorFully == true && userId.startsWith('CC-') && (
                                                        <div
                                                            className="bg-green-700 m-1 px-6 py-2 rounded-xl cursor-pointer"
                                                            onClick={(e) => assignedCaseViewVendor(item)}
                                                        >
                                                            <p className="text-white font-semibold text-xs text-center">View Case </p>
                                                        </div>
                                                    )}
                                                    <div onClick={() => (window.location.href = 'tel: +91 7800 78 4700')} className="flex flex-col items-center justify-center px-4 py-2">
                                                        <img src={telephonecall} className="h-[30px] w-[30px]" alt="call for help" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>)}
                                </div>
                            ))}
                        </div>
                    </div>

                )}

                {isImageContainerVisible && (

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

                        <div style={{ position: "absolute", width: "98%", maxWidth: "600px", height: "90%" }}>
                            {/* Cross Icon */}
                            <img src={crossUser} onClick={(e) => setIsImageContainerVisible(false)}
                                style={{

                                    position: "absolute",
                                    top: "-10px", // Position slightly above the container
                                    left: "50%",
                                    width: '35px',
                                    height: '35px',
                                    cursor: "pointer",
                                    zIndex: 1001, // Ensure it’s above other elements
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
                                }}
                            />
                        </div>



                        <div style={{
                            position: "relative",
                            width: "97%",
                            maxWidth: "600px",
                            backgroundColor: "#fff", // white background for the content
                            borderRadius: "15px 15px 0px 0px",
                            // marginBottom: "30px",
                            maxHeight: "90%", // limit the height for scrollability
                            overflowY: "auto", // enables vertical scrolling
                            //  padding: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                            marginBottom: "30px"
                        }} >
                            <div className='h-screen'>
                                <div className='h-1/2'>
                                    <div className='h-full w-full '>
                                        <MapContainer zoom={13} center={[19.0760, 72.8777]} style={{ width: '100%', height: '50vh' }}>
                                            <TileLayer
                                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                                            />
                                        </MapContainer>


                                    </div>

                                </div>
                                <div className='bg-gray-700 '>
                                    <div className='px-1 py-1 '>

                                        <div className='flex justify-between pr-3'>
                                            <div className='flex items-center space-x-4 top-0'>
                                                <SocialDistanceIcon className='text-white h-4 m-2 mt-0' />
                                                <p className='text-white text-sm font-semibold'>Crane is on the way</p>
                                            </div>
                                            <div className='bg-white text-xs font-semibold px-3 py-1 m-3 rounded-xl'>
                                                {distance.toFixed(2)} Km
                                            </div>

                                        </div>
                                    </div>
                                    <div className='bg-white  h-full p-2'>
                                        <div className='bg-[#f9f9f9] rounded-xl flex justify-between m-3' style={{ border: '1px solid black' }}>
                                            <div className='px-4 py-3 flex-col'>
                                                <div className='flex'>
                                                    <PersonIcon className='mt-1 mr-1 mb-1 h-[40px] w-[40px]' />
                                                    <h4 className='text-xl font-semibold mt-0.3'>{currentItem?.[`${currentService}Details`].reg} </h4>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <div className='flex gap-2 bg-yellow-500 rounded-xl p-2 mt-1'>
                                                    <p className='text-sm '>crane</p>
                                                    {average != 0 && (<p className='font-xs font-semibold px-2 mt-0.5'>{average}</p>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                                        </div>
                                        <div className='bg-white flex justify-between m-3' style={{ borderTop: '1px solid gray' }}>
                                            <div className='px-2 py-1 flex-col'>
                                                <div class='flex'>
                                                    <MyLocationIcon className='m-1 mt-2' />
                                                    <div className='px-2 py-2 flex-col'>
                                                        <h4 className='text-xs font-base'>start location </h4>
                                                        <p className='text-xs font-semibold'>Your Drop Location</p>
                                                    </div>
                                                </div>
                                                <div class='flex'>
                                                    <PinDropIcon className='m-1 mt-2' />
                                                    <div className='px-1 py-1 flex-col'>
                                                        <p className='text-xs font-base'>drop location</p>
                                                        <h4 className='text-xs font-semibold'>Your Current Location </h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='px-2 py-4'>
                                                <h2 className='font-semibold text-xl'>₹{currentItem?.[`${currentService}Details`]?.[`${currentService}WorkerOnVehicle`]?.charges}</h2>
                                            </div>
                                            {/* <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" /> */}
                                        </div>
                                        <div>
                                            <div className='bg-white flex justify-between m-3' style={{ borderTop: '1px solid gray' }}>
                                                <div className='flex flex-col'>

                                                    {comingLink == "" && (
                                                        <div className=' bg-green-700 m-1 px-6 py-2 h-30 w-30 m-2 rounded-xl' onClick={(e) => { getPaymentLink(currentItem) }}>
                                                            <p className='text-white font-semibold text-xs'> Accept Case</p>
                                                        </div>)}
                                                    {comingLink !== "" && (
                                                        <div className='shine-payment-button bg-green-700 m-1 px-6 py-2 h-30 w-30 m-2 rounded-xl' onClick={getPaymentLinkPage}>
                                                            <p className='text-black font-semibold text-xs'> Proceed payment </p>
                                                        </div>)}
                                                    <div className=' bg-red-700 m-1 px-6 py-2 h-30 w-30 m-2 mt-0 rounded-xl' onClick={(e) => cancleCaseSecondaryProcedureFunc(currentItem)}>
                                                        <p className='text-white font-semibold text-xs'> Reject Case</p>
                                                    </div>
                                                </div>
                                                <div onClick={() => (window.location.href = 'tel: +91 7800 78 4700')} className='flex flex-col items-center justify-center px-4 py-3'>
                                                    <img src={telephonecall} className='h-[30px] w-[30px]' alt="call for help" />
                                                    <p className='text-black font-semibold text-xs text-center'> call for help</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isCancelContainerVisible && (

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

                        <div style={{ position: "absolute", width: "90%", maxWidth: "600px", marginBottom: "430px" }}>
                            {/* Cross Icon */}
                            <img src={crossUser} onClick={(e) => {
                                setIsCancelContainerVisible(false)
                                setReasonsForDrop(false)
                                setSelectedReasons([])
                                setOtherReason('')
                            }}
                                style={{

                                    position: "absolute",
                                    top: "-20px", // Position slightly above the container
                                    left: "50%",
                                    width: '35px',
                                    height: '35px',
                                    cursor: "pointer",
                                    zIndex: 1001, // Ensure it’s above other elements
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
                                }}
                            // Add a close function if needed
                            />
                        </div>


                        <div className="image-container" style={{
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "15px 15px 0px 0px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            maxWidth: "600px",
                            width: "97%",
                            marginBottom: "20px",
                            overflowY: 'auto'
                        }}>

                            <div className="background-image"></div>

                            <div className="text-overlay">
                                <p style={{
                                    fontSize: '14px',
                                    padding: "5px",
                                    border: '3px solid red',
                                    borderImage: 'linear-gradient(to top, white 10% , lightblue 90%) 1',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: 'red'
                                }}>
                                    Drop Case Procedure!
                                </p>
                                {reasonsForDrop == false && (
                                    <div>
                                        <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "black" }}>We are almost there to get you perfect crane service!!! </p>
                                        <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "red" }}>Still want to opt-out for ❓ 🤔 </p>
                                        <div className="text-overlay text-overlay2" style={{ height: "40%" }}>
                                            <p style={{
                                                fontSize: '11px',
                                                marginTop: "5px",
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
                                                cursor: "pointer"
                                            }} onClick={(e) => {
                                                setReasonsForDrop(false)
                                                setIsCancelContainerVisible(false)
                                                setSelectedReasons([])
                                                setOtherReason('')
                                            }}>
                                                Don't Drop
                                                <KeyboardDoubleArrowLeftIcon style={{
                                                    position: 'absolute',
                                                    right: "10px"
                                                }} />
                                                <KeyboardDoubleArrowRightIcon style={{
                                                    position: 'absolute',
                                                    left: "10px"
                                                }} />
                                            </p>
                                            <p style={{
                                                fontSize: '11px',
                                                marginTop: "5px",
                                                background: "#8f4325",
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
                                                cursor: "pointer"
                                            }} onClick={() => setReasonsForDrop(true)}>
                                                Drop Case
                                                <KeyboardDoubleArrowLeftIcon style={{
                                                    position: 'absolute',
                                                    right: "10px"
                                                }} />
                                                <KeyboardDoubleArrowRightIcon style={{
                                                    position: 'absolute',
                                                    left: "10px"
                                                }} />
                                            </p>
                                        </div>
                                    </div>)}

                                {reasonsForDrop == true && (
                                    <div>
                                        <div>
                                            <div style={{ background: "rgb(209 209 209 / 29%)" }}>

                                                <div style={{ margin: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                                    {reasons.map((reason) => (
                                                        <button
                                                            key={reason}
                                                            onClick={() => handleSelectReason(reason)}
                                                            style={{
                                                                fontSize: '14px',
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                padding: "10px",
                                                                borderRadius: "20px",
                                                                backgroundColor: selectedReasons.includes(reason) ? "yellow" : "white",
                                                                border: "1px solid black",
                                                                cursor: "pointer",
                                                                boxShadow: selectedReasons.includes(reason) ? "0 4px 8px rgba(0,0,0,1.2)" : "0 3px 6px rgba(0, 0, 0, 0.5)"
                                                            }}
                                                        >
                                                            {reason}
                                                        </button>
                                                    ))}
                                                </div>


                                                <label className="form-field" style={{ color: '#3f3c00', marginTop: '20px', fontSize: "14px" }}>
                                                    <p style={{ textAlign: "left" }}> Other Reason  : </p>
                                                    <textarea
                                                        style={{ margin: "10px 10px 5px 0px", width: "280px" }} className="form-control" name="otherReason" value={otherReason} onChange={(e) => setOtherReason(e.target.value)} />
                                                </label>

                                                {errorMessage && <div style={{ color: "red", margin: "10px 10px 20px 10px", marginBottom: "10px" }}>{errorMessage}</div>}


                                                <div className='pb-10'>
                                                    {isLoading && (
                                                        <div style={{ marginTop: '10px', display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                                            <ClipLoader color="black" loading={isLoading} />
                                                            <div style={{ marginTop: '10px', color: 'black' }}> Please Wait...</div>
                                                        </div>
                                                    )}
                                                    {alreadyCancelled && (<div class="alert alert-danger" role="alert">
                                                        You have already Cancelled Case !!!
                                                    </div>)}
                                                    {alertInfo.show && (
                                                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                                            {alertInfo.message}
                                                        </Alert>
                                                    )}
                                                    <p type="submit"
                                                        style={{
                                                            fontSize: '11px',
                                                            marginTop: "5px",
                                                            background: "#8f4325",
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
                                                        }}
                                                        disabled={isLoading}
                                                        onClick={(e) => { cancelingOrder(currentItem) }}
                                                    >
                                                        < NotInterestedIcon style={{
                                                            position: 'absolute',
                                                            left: "70px"
                                                        }} />Confirm Drop Case
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {isCancelSecondaryContainerVisible && (

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

                        <div style={{ position: "absolute", width: "90%", maxWidth: "600px", marginBottom: "430px" }}>
                            {/* Cross Icon */}
                            <img src={crossUser} onClick={(e) => {
                                setIsCancelSecondaryContainerVisible(false)
                                setReasonsSecForDrop(false)
                                setSelectedReasons([])
                                setOtherSecReason('')
                            }}
                                style={{

                                    position: "absolute",
                                    top: "-10px", // Position slightly above the container
                                    left: "50%",
                                    width: '25px',
                                    height: '25px',
                                    cursor: "pointer",
                                    zIndex: 1001, // Ensure it’s above other elements
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
                                }}
                            // Add a close function if needed
                            />
                        </div>


                        <div className="image-container" style={{
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "15px 15px 0px 0px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            maxWidth: "600px",
                            width: "97%",
                            marginBottom: "20px"
                        }}>

                            <div className="background-image"></div>

                            <div className="text-overlay">
                                <p style={{
                                    fontSize: '14px',
                                    padding: "5px",
                                    border: '3px solid red',
                                    borderImage: 'linear-gradient(to top, white 10% , lightblue 90%) 1',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: 'red'
                                }}>
                                    Drop Case Procedure!
                                </p>
                                {reasonsSecForDrop == false && (
                                    <div>
                                        <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "black" }}>We are almost there to get you perfect crane service!!! </p>
                                        <p style={{ fontSize: "13px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "red" }}>Still want to opt-out for services of {currentItem.vehicleNo}❓ 🤔 </p>
                                        <div className="text-overlay text-overlay2" style={{ height: "40%" }}>
                                            <p style={{
                                                fontSize: '11px',
                                                marginTop: "5px",
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
                                                cursor: "pointer"
                                            }} onClick={(e) => {
                                                setIsCancelSecondaryContainerVisible(false)
                                                setReasonsSecForDrop(false)
                                                setSelectedReasons([])
                                                setOtherSecReason('')
                                            }}>
                                                Don't Drop
                                                <KeyboardDoubleArrowLeftIcon style={{
                                                    position: 'absolute',
                                                    right: "10px"
                                                }} />
                                                <KeyboardDoubleArrowRightIcon style={{
                                                    position: 'absolute',
                                                    left: "10px"
                                                }} />
                                            </p>
                                            <p style={{
                                                fontSize: '11px',
                                                marginTop: "5px",
                                                background: "#8f4325",
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
                                                cursor: "pointer"
                                            }} onClick={() => setReasonsSecForDrop(true)}>
                                                Drop Case
                                                <KeyboardDoubleArrowLeftIcon style={{
                                                    position: 'absolute',
                                                    right: "10px"
                                                }} />
                                                <KeyboardDoubleArrowRightIcon style={{
                                                    position: 'absolute',
                                                    left: "10px"
                                                }} />
                                            </p>
                                        </div>
                                    </div>)}

                                {reasonsSecForDrop == true && (
                                    <div>
                                        <div>
                                            <div style={{ background: "rgb(209 209 209 / 29%)" }}>

                                                <div style={{ margin: "5px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                                    {secReasons.map((reason) => (
                                                        <button
                                                            key={reason}
                                                            onClick={() => handleSelectSecReason(reason)}
                                                            style={{
                                                                fontSize: '12px',
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                padding: "5px",
                                                                borderRadius: "20px",
                                                                backgroundColor: selectedSecReasons.includes(reason) ? "yellow" : "white",
                                                                border: "1px solid black",
                                                                cursor: "pointer",
                                                                boxShadow: selectedSecReasons.includes(reason) ? "0 4px 8px rgba(0,0,0,1.2)" : "0 3px 6px rgba(0, 0, 0, 0.5)"
                                                            }}
                                                        >
                                                            {reason}
                                                        </button>
                                                    ))}
                                                </div>


                                                <label className="form-field" style={{ color: '#3f3c00', marginTop: '20px', fontSize: "14px" }}>
                                                    <p style={{ textAlign: "left" }}> Other Reason  : </p>
                                                    <textarea
                                                        style={{ margin: "10px 10px 5px 0px", width: "280px" }} className="form-control" name="otherReason" value={otherSecReason} onChange={(e) => setOtherSecReason(e.target.value)} />
                                                </label>

                                                {errorMessage && <div style={{ color: "red", margin: "10px 10px 20px 10px", marginBottom: "10px" }}>{errorMessage}</div>}


                                                <div>
                                                    {isLoading && (
                                                        <div style={{ marginTop: '10px', display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                                            <ClipLoader color="black" loading={isLoading} />
                                                            <div style={{ marginTop: '10px', color: 'black' }}> Please Wait...</div>
                                                        </div>
                                                    )}
                                                    {alreadyCancelled && (<div class="alert alert-danger" role="alert">
                                                        You have already Cancelled Case !!!
                                                    </div>)}
                                                    <p type="submit"
                                                        style={{
                                                            fontSize: '11px',
                                                            marginTop: "5px",
                                                            background: "#8f4325",
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
                                                        }}
                                                        disabled={isLoading}
                                                        onClick={(e) => { cancelingSecOrder(currentItem) }}
                                                    >
                                                        < NotInterestedIcon style={{
                                                            position: 'absolute',
                                                            left: "70px"
                                                        }} />Confirm Drop Case
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {caseDetails && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "flex-end", // positions the container at the bottom
                            justifyContent: "center",
                            animation: "slideUp 0.5s ease-out",
                        }}
                    >
                        {/* Modal Container */}
                        <div
                            style={{
                                position: "relative",
                                width: "97%",
                                maxWidth: "600px",
                                backgroundColor: "#fff", // white background for the content
                                borderRadius: "15px 15px 0px 0px",
                                // marginBottom: "30px",
                                maxHeight: "80%", // limit the height for scrollability
                                overflowY: "auto", // enables vertical scrolling
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                marginBottom: "30px"
                            }}
                        >
                            {/* Cross Icon */}
                            <img
                                src={crossUser}
                                onClick={() => setCaseDetails(false)}
                                style={{
                                    position: "fixed",
                                    // top: "-10px",
                                    left: "calc(100% - 45px)",
                                    width: "35px",
                                    height: "35px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                }}
                            />
                            <LookingForAccptance accidentData={currentItem} fromPage="quotationUpdate" />
                        </div>
                    </div>
                )}

                {cancelled && (
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
                        <div style={{ position: "absolute", width: "90%", maxWidth: "600px", marginBottom: "430px" }}>
                            {/* Cross Icon */}
                            <img src={crossUser} onClick={(e) => setCancelled(false)}
                                style={{

                                    position: "absolute",
                                    top: "40px", // Position slightly above the container
                                    left: "50%",
                                    width: '35px',
                                    height: '35px',
                                    cursor: "pointer",
                                    zIndex: 1001, // Ensure it’s above other elements
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
                                }}
                            // Add a close function if needed
                            />
                        </div>
                        <div className="image-container" style={{
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "15px 15px 0px 0px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            maxWidth: "600px",
                            width: "97%"
                        }}>

                            <div style={{ marginTop: "30%" }}>
                            </div>
                            <SuccessIcon />
                            <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "17px", color: "green", margin: "0px 50px 20px 30px", padding: "5px", flex: 1 }}>Hope. we could help you in future !!! </h1>


                        </div>
                    </div>
                )
                }

                {
                    data.length == 0 && (
                        <NoDataFound />
                    )
                }
            </div>)}

            {doneFetching == false && (
                // <Loading />
                <div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",

                        }}
                    >
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div style={{ margin: '20px 10px 10px 10px', padding: "10px", }}
                                className={`border border-teal-500 max-w-[401px]  bg-gray-200 rounded-2xl shadow-md ${isImageContainerVisible ? "blur-sm opacity-90 pointer-events-none" : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    {Array(3)
                                        .fill("")
                                        .map((_, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center justify-center relative flex-1"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse flex items-center justify-center">
                                                    <div className="w-5 h-5 rounded-full bg-gray-100 animate-pulse"></div>
                                                </div>
                                                <p className="mt-2 text-gray-300 text-sm w-16 h-4 animate-pulse"></p>
                                                {index < 2 && (
                                                    <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300 animate-pulse"></div>
                                                )}
                                            </div>
                                        ))}
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-24 h-5  rounded-md animate-pulse"></div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-red-300 rounded-full animate-pulse"></div>
                                            <div className="ml-2 w-20 h-5 bg-gray-400 rounded-md animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mb-2">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="ml-2 w-20 h-5 bg-gray-400 rounded-md animate-pulse"></div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="ml-2 w-20 h-5 bg-gray-400 rounded-md animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="ml-2 w-40 h-5 bg-gray-400 rounded-md animate-pulse"></div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="ml-2 w-40 h-5 bg-gray-400 rounded-md animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center  p-4 rounded-xl mt-4 animate-pulse">
                                    <div className="flex space-x-2">
                                        <div className="w-16 h-8 bg-green-400 rounded-xl animate-pulse"></div>
                                        {userId.startsWith('CC-') && (<div className="w-16 h-8 bg-red-400 rounded-xl animate-pulse"></div>)}
                                    </div>
                                    <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            )}

            <Modal isOpen={openFilterModal} onClose={() => setOpenFilterModal(!openFilterModal)}>
                {openFilterModal && (
                    <div style={{ textAlign: "center", marginTop: "0px", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('newest') }}>newest to oldest</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('oldest') }}>oldest to newest</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('daily') }}>Yesterday</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('weekly') }}>Last 7 days</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('monthly') }}>Last 30 days</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "0px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('year') }}>Year</p>
                    </div>
                )}
            </Modal>
        </div >
    )
}




export default QuotationUpdate;