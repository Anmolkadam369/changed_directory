
import React, { useEffect, useState } from 'react';
import '../FirstPage.css'
import axios, { isCancel } from 'axios';
import backendUrl from '../../../environment';
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

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



const QuotationUpdate = ({ vehicleNumber }) => {
    const [currentStage, setCurrentStage] = useState([]); // Example stage
    const currentService = localStorage.getItem("currentService")
    const {messages} = useWebSocket();

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

    // console.log("numberHere", number)

    // useEffect(() => {
    //     if (number && data.length > 0) {
    //         console.log("data", data)
    //         const gotItem = data.filter((item) => {
    //             console.log(item.vehicleNo, number)
    //             return item.vehicleNo == number;
    //         })
    //         console.log("gotItem", gotItem[0])
    //         setCurrentItem(gotItem[0]);
    //         getVendorRating(gotItem[0].crane)
    //         getVendorLocation(gotItem[0].crane, gotItem[0].accidentLatitude, gotItem[0].accidentLongitude)
    //         setIsImageContainerVisible(true)
    //     }
    // }, [number, data])

    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState("");

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
            let getTime = dummyData[i]?.[`${currentService}Details`]?.filedCaseFullyTime.split('|');
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
                const dateA = new Date(a?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                return dateB - dateA; // Descending order
            });
            setData([...dummyData]);
        } else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            dummyData.sort((a, b) => {
                const dateA = new Date(a?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setData([...dummyData]);
        }
        else{
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
            const response = await axios({
                method: "PUT",
                url: `${backendUrl}/api/cancellingOrderSecondaryStage/${currentItem.AccidentVehicleCode}/${currentService}/${userId}/${currentItem.crane}`,
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
        { label: "Connecting Vendor", img: telephonecall },
        { label: "Assigned", img: checksuccess },
    ];

    useEffect(() => {
        setDoneFetching(false)
        getData();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate, currentService]);

    useEffect(()=>{
        messages.forEach((message)=>{
            console.log("messages123", message)
            if(message.forPage == 'quotation-updates-crane'){
                getData();
            }
    })
    },[messages])

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`);
        if (response.data.message == "No accident vehicle data found.") {
            setDoneFetching(true)
            setData([])}
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);

            let filteredData = response.data.data.filter((info) =>
                info?.[`${currentService}Details`]?.filedCaseFully && !info?.[`${currentService}Details`]?.customerAcceptedVendor && !info?.[`${currentService}Details`]?.closeCraneOrder
            );

            let filteredImportant = filteredData.filter((info) =>
                info?.[`${currentService}Details`]?.connectedVendorFully == true
            )

            let filteredLessImportant = filteredData.filter((info) =>
                info?.[`${currentService}Details`]?.connectedVendorFully == false
            )
            filteredData = [...filteredImportant, ...filteredLessImportant]
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

        if (data.length > 0 && data.length != currentStage.length ) {
            console.log("I GOT TRIGGERED2 ", currentService)
            const setUpdatedData = data.map((item) => {
                let gotStage = getStage(item?.[`${currentService}Details`]?.connectedVendorFully)
                console.log(gotStage)
                currentStage.push(gotStage)
                getData()
            })
        }
    }, [data])


    const connectCaseDetailsOnly = (item) => {
        setCurrentItem(item)
        setCaseDetails(true)
    }


    // this can be taken to othe page
    const [comingLink, setComingLink] = useState("");


    const getPaymentLink = async (item) => {
        try {
            const response = await axios.get(`${backendUrl}/api/sendPaymentLinkToCustomer/${userId}/${item.AccidentVehicleCode}/${item.crane}/${item.vehicleNo}`);
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
            const response = await axios({
                method: "PUT",
                url: `${backendUrl}/api/cancellingOrderPrimaryStage/${currentItem.AccidentVehicleCode}/${currentService}/${userId}`,
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
        navigate(`${comingLink}`, {
            state: {
                vehicleNo: currentItem.vehicleNo,
                accidentVehicleCode: currentItem.AccidentVehicleCode,
                vendorCode: currentItem.crane,
                customerCode: userId,
                vendorType: 'crane',
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
        getVendorRating(item.crane)
        getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude)
    }
    const cancleCaseProcedureFunc = (item) => {
        setCurrentItem(item)
        setIsCancelContainerVisible(true)
        setReasonsForDrop(false)
        getVendorRating(item.crane)
        getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude)
    }
    const cancleCaseSecondaryProcedureFunc = (item) => {
        setCurrentItem(item)
        setIsCancelSecondaryContainerVisible(true)
        setReasonsForDrop(false)
        getVendorRating(item.crane)
        getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude)
    }
    const [average, setAverage] = useState(0)
    const [distance, setDistance] = useState(0)
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")




    const getVendorRating = async (crane) => {
        try {
            const response = await axios.get(`${backendUrl}/api/customersRating/${crane}`);
            if (response.data.status == true) {
                let customerRating = response.data.data;
                console.log("coming Customer Rating", customerRating)
                if (customerRating.length !== 0) {
                    let average = customerRating.reduce((acc, item) => acc + parseInt(item.feedbackRatingCrane), 0);
                    setAverage(average / customerRating.length);
                }
            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }

    const getVendorLocation = async (crane, accidentLatitude, accidentLongitude) => {
        try {
            const response = await axios.get(`${backendUrl}/api/getVendorCurrentLocation/${crane}`,{ headers: { Authorization: `Bearer ${token}` }});
            if (response.data.status == true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)

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
            const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
            const searchLower = value; // Use the updated search value directly

            const idValue = formattedId.includes(searchLower);
            const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(searchLower);
            const chassisNoValue = (row.chassisNo ?? '').toLowerCase().includes(searchLower);

            return vehicleNoValue || chassisNoValue;
        });

        setData(newRows);
    };



    return (
        <div style={{ marginBottom: "60px", background: 'linear-gradient(rgba(223, 255, 222, 0), rgb(255, 255, 255), rgb(182 179 179 / 3%))' }}>

      {doneFetching && (  <div>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>

                <div className="container " style={{
                    height: "100%", overflow: "visible", margin: "10px 10px 0px 20px",
                    filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                    opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                    pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
                }}>
                    <div className="d-flex justify-content-center h-100" style={{marginTop:'-113px',marginLeft:"34px", position:'sticky', top:"25px"}} >
                        <div className="searchbar" style={{ border: '1px solid', minWidth: "250px" }}>
                            <input className="search_input" type="text" placeholder="Search..." style={{margin:"3px", paddingTop :"5px"}}  value={searchValue} onChange={(e) => { handleSearch(e.target.value) }} />
                            {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                        </a> */}
                            <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
                        </div>
                        <div style={{ margin: "23px 20px 0px",zIndex: "1000",width:"70px", background: 'linear-gradient(45deg, white, transparent)', borderRadius: "10px",paddingTop: "4px",paddingLeft: "3px",paddingRight: "3px",}}>
                            <img src={filterUser} style={{  height:"20px", width:'20px' }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                        </div>
                    </div>
                </div>
            </div>

            {data.length > 0 && (
                 <div
                 style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                    
                 }}
             >
               { data.map((item, dataIndex) => (
                    <div style={{
                        filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                        opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                        pointerEvents: isImageContainerVisible ? "none" : "auto",
                        border: "1px solid teal",
                        minWidth: "280px", 
                        margin: '-20px 10px 10px 10px',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', 
                        borderRadius: "5px", 
                        padding: "10px", 
                        maxWidth: "410px",
                        background: "white",
                        zIndex:'1'
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
                                                top: "15px", // Aligns with the center of the icon
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

                        {item?.[`${currentService}Details`]?.connectedVendorFully == true && (
                            <div style={{ background: "#e8e8e8", marginTop: "30px", borderRadius: "20px 20px 0px 0px", boxShadow: "#808080 1px -4px 0px 0px", padding: "2px 2px" }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>


                                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>

                                    <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>{average}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 5px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: "0px 0px 0px 5px" }}>Registered Date:</p>
                                    <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.[`${currentService}Details`]?.filedCaseFullyTime.split("|")[0]}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>File No : </p>
                                    <span style={{ marginLeft: "5px", fontSize: "10px", color: 'darkblue', fontWeight: "bold" }}>{item?.[`${currentService}Details`]?.accidentFileNo.toUpperCase()}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}> Vendor Fare: </p>
                                    <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>₹ {item?.[`${currentService}Details`]?.[`${currentService}WorkerOnVehicle`]?.charges}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "3px 10px 5px 10px", fontSize: "12px", borderRadius: "10px", color: 'green', border: "1px solid green", background: 'white' }}>{item?.[`${currentService}Details`]?.connectedVendorFully ? "Assigned" : "Connecting..."}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                    <p style={{
                                        fontSize: '11px',
                                        marginTop: "5px",
                                        background: "#909090",
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
                                        margin: '5px 5px 5px 5px',
                                        maxWidth: "400px",
                                        minWidth: "280px",
                                    }} onClick={(e) => assignedCaseViewVendor(item)} >
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                        View Vendor's Deal
                                    </p>


                                </div>
                            </div>
                        )}

                        {item?.[`${currentService}Details`]?.filedCaseFully && item?.[`${currentService}Details`]?.connectedVendorFully == false && (
                            <div style={{ background: "#e8e8e8", marginTop: "30px", borderRadius: "20px 20px 0px 0px", boxShadow: "#808080 1px -4px 0px 0px" }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>

                                    {/* <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>4.5</div> */}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 5px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: "0px 0px 0px 5px" }}>Registered Date:</p>
                                    <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.[`${currentService}Details`]?.filedCaseFullyTime.split("|")[0]}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>File No : </p>
                                    <span style={{ marginLeft: "5px", fontSize: "10px", color: 'darkblue', fontWeight: "bold" }}>{item.accidentFileNo.toUpperCase()}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "3px 10px 5px 10px", fontSize: "12px", borderRadius: "10px", color: 'blue', border: "1px solid green", background: 'white' }}>{item?.[`${currentService}Details`]?.connectedVendorFully ? "Assigned" : "Connecting..."}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
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
                                        cursor: "pointer",
                                        margin: '5px 5px 5px 5px',
                                        maxWidth: "400px",
                                        minWidth: "130px",
                                    }} onClick={(e) => connectCaseDetailsOnly(item)}>
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                        View More
                                    </p>
                                    <p style={{
                                        fontSize: '11px',
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
                                        minWidth: "140px",
                                        margin: '5px 5px 5px 5px',
                                        height: "30px"
                                    }} onClick={() => { cancleCaseProcedureFunc(item) }}>
                                        Cancel
                                        <img src={crossUser} style={{
                                            position: "absolute",
                                            right: '10px', width: '20px', height: '20px'
                                        }} />
                                    </p>

                                </div>
                            </div>)}
                    </div>
                ))}
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

                    <div style={{ position: "absolute", width: "90%", maxWidth: "600px", marginBottom: "430px" }}>
                        {/* Cross Icon */}
                        <img src={crossUser} onClick={(e) => setIsImageContainerVisible(false)}
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
                        width: "97%"
                    }}>

                        <div className="background-image"></div>

                        <div className="text-overlay">
                            <p style={{
                                fontSize: '14px',
                                padding: "5px",
                                border: '3px solid blue',
                                borderImage: 'linear-gradient(to top, white 10% , black 90%) 1',
                                textAlign: 'center',
                                borderRadius: '30px',
                                fontWeight: "bold"
                            }}>
                                Case Assigned!
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ textAlign: "center", marginLeft: "30px", marginTop: "10px", fontSize: "13px", fontWeight: "bold" }}>Vendor Fare : ₹{currentItem?.[`${currentService}Details`]?.[`${currentService}WorkerOnVehicle`].charges}</p>
                                    <p style={{ textAlign: "center", marginLeft: "30px", marginTop: "5px", fontSize: "13px", fontWeight: "bold" }}>Platform Fees : ₹{currentItem?.[`${currentService}Details`]?.budget - currentItem?.[`${currentService}Details`]?.[`${currentService}WorkerOnVehicle`]?.charges}</p>
                                </div>
                                <div style={{
                                    marginTop: "5px",
                                    width: "30px",
                                    background: '#ccb300',
                                    border: "1px solid red",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    color: 'black',
                                    height: "20px"
                                }}>{average}</div> {/*${backendUrl}/api/customersRating/${userId}*/}
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                <h1 style={{ marginLeft: "10px", fontSize: "14px", fontWeight: "bold" }}>Total Amount : ₹{currentItem?.[`${currentService}Details`]?.budget}</h1>

                                <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                    <p style={{
                                        textAlign: "center",
                                        fontSize: '12px',
                                        paddingRight: '10px',
                                        fontWeight: 'bold'
                                    }}> Vendor Distance :</p>
                                    <p style={{ color: 'Green', fontSize: "12px" }}>{distance.toFixed(2)} km</p> {/* take vendor current location by api and use harvesine formula */}
                                </div>
                            </div>

                            <div className="text-overlay text-overlay2" style={{ height: "55%" }}>
                                {/* <h4 style={{ marginBottom: '5px', fontSize: "11px", marginTop: "10px" }}>Location:</h4>
                                <p style={{ fontSize: '11px', gap: "10px" }}>205 D/15, Indl Estate, L B S Marg, Opp I O L, Near Amrutnagar, Near Ayodhya Chowk, Rohini, K Marg, Lower Parel Mumbai Maharashtra 4000067</p> */}

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
                                    // maxWidth: "400px",
                                    minWidth: "150px"
                                }} onClick={(e) => goToMap(currentItem)}>  {/* same harvesine formula and with a line from vendor to accident location */}
                                    Vendor Current Location
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                </p>

                                {comingLink == "" && (<p style={{
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
                                }} onClick={(e) => { getPaymentLink(currentItem) }}>
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                    Accept Vendor's Deal    {/* payment.jsx */}
                                </p>)}
                                {comingLink != "" && (
                                    <p className='shine-payment-button' style={{
                                        fontSize: '11px',
                                        marginTop: "5px",
                                        padding: "10px",
                                        border: '1px solid blue',
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        fontWeight: "bold",
                                        color: "#8d01ff",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        position: "relative",
                                        cursor: "pointer",
                                        // color:"green"

                                    }} onClick={getPaymentLinkPage}>
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                        Proceed to payment   {/* payment.jsx */}
                                    </p>)}

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
                                }} onClick={(e) => cancleCaseSecondaryProcedureFunc(currentItem)}>
                                    Reject Deal
                                    <KeyboardDoubleArrowLeftIcon style={{
                                        position: 'absolute',
                                        right: "10px"
                                    }} />
                                </p>
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
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                                zIndex: 1001,
                                filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                            }}
                        />

                        {/* Scrollable Registration Content */}
                        <Registration item={currentItem} fromPageHere={'quotationUpdate'} />
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
                data.length == 0  && (
                    <NoDataFound />
                )
            }
            </div>)}

            {doneFetching == false && (
                <Loading />
            )}

            <Modal isOpen={openFilterModal} onClose={() => setOpenFilterModal(!openFilterModal)}>
                {openFilterModal && (
                    <div style={{ textAlign: "center", marginTop: "30px", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('newest') }}>newest to oldest</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('oldest') }}>oldest to newest</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('daily') }}>Yesterday</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('weekly') }}>Last 7 days</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('monthly') }}>Last 30 days</p>
                        <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('year') }}>Year</p>
                    </div>
                )}
            </Modal>
        </div >
    )
}




export default QuotationUpdate;