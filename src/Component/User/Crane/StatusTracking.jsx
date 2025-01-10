
import React, { useState, useEffect } from 'react';
import '../FirstPage.css'
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import backendUrl from '../../../environment';

import assignedTask from '../../../Assets/assignedTask.png'
import comingCrane from '../../../Assets/comingCrane.png'
import checksuccess from '../../../Assets/checksuccess.png'
import Registration from '../../Registration/Registration';
import QuotationUpdate from './QuotationUpdate';
import crossUser from '../../../Assets/crossUser.png'
import NoDataFound from '../Cards/NoDataFound';
import filterUser from '../../../Assets/filterUser.png'
import ratingStar from '../../../Assets/ratingStar.png'
import telephonecall from '../../../Assets/telephonecall.png'

import Modal from '../../Location1/Modal.jsx';
import Loading from '../Cards/Loading.jsx';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import SignalWifiStatusbarNullIcon from '@mui/icons-material/SignalWifiStatusbarNull';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropIcon from '@mui/icons-material/PinDrop';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import { useWebSocket } from '../../ContexAPIS/WebSocketContext.jsx';





const StatusTracking = ({ vehicleNumber }) => {

    const navigate = useNavigate()    
    const { messages } = useWebSocket();
    const { state } = useLocation();
    const [currentStage, setCurrentStage] = useState([]); // Example stage
    console.log("currentStage123", currentStage)
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    const [data, setData] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [currentItems, setCurrentItems] = useState(data);
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")
    const [selectedAction, setSelectedAction] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [distance, setDistances] = useState([])
    console.log("distacneeerwerw", distance)
    const [avg, setAvg] = useState([])
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [filter, setFilter] = useState('')
    const [doneFetching, setDoneFetching] = useState(false)




    console.log("avg", avg)

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const currentService = localStorage.getItem("currentService")

    const stages = [
        { label: "assigned", img: assignedTask },
        { label: "accepted & moved", img: comingCrane },
        { label: "reached", img: checksuccess },
    ];

    console.log('isImageContainer', isImageContainerVisible)

    useEffect(() => {
        if(messages.length>0){
            messages.forEach((message) => {
                console.log("messages123", message)
                if (message.forPage == 'crane-user-all-cases') {

                    getData();
                }
            })
        }
       else getData();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate,messages]);



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

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
        if (response.data.message == "No accident vehicle data found.") {
            setData([])
            setDoneFetching(true)
        }
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);

            let filteredData = response.data.data.filter((info) =>
                info?.[`${currentService}Details`]?.customerAcceptedVendor && info?.[`${currentService}Details`]?.confirmDoneWorking == false
            );

            let filteredImportant = filteredData.filter((info) =>
                info?.[`${currentService}Details`]?.vendorMoved == false
            )

            let filteredLessImportant = filteredData.filter((info) =>
                info?.[`${currentService}Details`]?.vendorMoved == true
            )
            filteredData = [...filteredImportant, ...filteredLessImportant]
            setData(filteredData)

            setDummyData(filteredData)
            console.log("seTDATIOATN", filteredData);
            setDoneFetching(true)

            setCurrentItems(response.data.data);
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
                vehicleNo: item.vehicleNo,
                fromPage: "statusTracking"
            }
        })
    }

    const getStage = (vendorMoved, approvedReaching) => {
        return approvedReaching ? 2 : vendorMoved ? 1 : 0;
    }

    useEffect(() => {
        console.log('data changes', data.length, currentStage.length)
        if (data.length > 0 ) {
            console.log("push avg")

            const newAvg = Array(data.length).fill(0);

            const newCurrentStage = data.map((item) => {
                console.log("gostrage1")
                let gotStage = getStage(item?.[`${currentService}Details`]?.vendorMoved, item?.[`${currentService}Details`]?.approvedReaching)
                console.log("gostrage", gotStage)
                return gotStage;
            })
            setAvg(newAvg);
            setCurrentStage(newCurrentStage);

            data.forEach((item, index) => {
            console.log("push currentService")

                console.log("${item.currentService", `${currentService}`)
                getVendorLocation(`${item?.[currentService]}`, item.accidentLatitude, item.accidentLongitude, index);
                getVendorRating(`${item?.[currentService]}`)
            });
        }

    }, [data,currentService])


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

    const getVendorLocation = async (currentServiceId, accidentLatitude, accidentLongitude, index) => {
        try {
            console.log("disntaceadfafdaf", distance)
            console.log("craninging", currentServiceId, accidentLatitude, accidentLongitude, index)

            const response = await axios.get(`${backendUrl}/api/getVendorCurrentLocation/${currentServiceId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.status == true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)
                console.log("accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitud", accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude)
                const calculatedDistance = haversine(accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude).toFixed(2);

                distance.push(calculatedDistance)
            }
            else if (response.data.message == "User Not found take Location") {
                console.log("User Not found take Location")
            }
        } catch (error) {
            console.log("error in get Vendor Location", error.message)
        }
    }
    const getVendorRating = async (crane) => {
        try {
            const response = await axios.get(`${backendUrl}/api/customersRating/${crane}`);
            console.log("coming Customer Rating", response.data)
            if (response.data.status == 404) {
                console.log("Not Found")
                avg.push(0)
            }
            else if (response.data.status == true) {
                let customerRating = response.data.data;
                console.log("coming Customer Rating", customerRating)
                if (customerRating.length !== 0) {
                    let average = customerRating.reduce((acc, item) => acc + parseInt(item.feedbackRatingCrane), 0);

                    avg.push(average / customerRating.length);
                }
            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }
    const vendorReached = async (item, action) => {
        try {

            let response = await axios(`${backendUrl}/api/vendorReachedConfirmation/${userId}/${item.AccidentVehicleCode}/${action}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                console.log("updated successfully")
                setSelectedAction(action)
                getData()
            }
            else console.log("there is some issue")

        }
        catch (error) {
            console.log("the error occured", error.message)
        }
    }


    const [currentItem, setCurrentltem] = useState({})
    const [formData, setFormData] = useState({
        feedbackRating: '',
        feedback: ""
    })
    const workDoneConfirmation = async (item, action) => {
        try {
            setCurrentltem(item)
            let response = await axios(`${backendUrl}/api/workDoneConfirmation/${userId}/${item.AccidentVehicleCode}/${action}/${currentService}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                setAlertMessage("Updated successfully!");
                setAlertType("success"); // Bootstrap alert type for success
                getData()
            } else {
                setAlertMessage("There is some issue.");
                setAlertType("danger"); // Bootstrap alert type for error
            }

        }
        catch (error) {
            setAlertMessage(`An error occurred: ${error.message}`);
            setAlertType("danger"); // Bootstrap alert type for error
        }
    }

    const submitNow = async (event, item) => {
        event.preventDefault();
        console.log("asdadfasdfasdf", `${backendUrl}/customersRating/${currentItem.accidentFileNo}/${userId}/${currentItem.crane}`)
        try {
            const response = await axios.put(`${backendUrl}/customersRating/${currentItem.accidentFileNo}/${userId}/${currentItem?.[`${currentService}`]}`, JSON.stringify(formData), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("response", response);
            if (response.data.status == true) {
                setAlertMessage("Updated successfully!");
                setAlertType("success");
                // setTimeout(() => {
                //     onUpdate();
                // }, 2000);
            } else {
                const errorMessage = 'An error occurred';
                setAlertMessage("An error occurred");
                setAlertType("danger");
            }
        } catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            // setAlertInfo({ show: true, message: errorMessage.toString(), severity: 'error' });
        }
    };

    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        if (vehicleNumber && dummyData.length) {
            setSearchValue(vehicleNumber)
            handleSearch(vehicleNumber)

        }
    }, [vehicleNumber, dummyData])

    useEffect(() => {
        return () => setSearchValue("")
    }, [])
    const handleSearch = (inputValue) => {
        const value = inputValue?.toLowerCase() ?? searchValue.toLowerCase();
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



    console.log("{item?.[`${currentService}Details`]?.customerAcceptedVendor", data[0]?.[`${currentService}Details`]?.customerAcceptedVendor)
    console.log("disptan", data.length, doneFetching, distance.length, avg.length)
    return (
        <div style={{ marginBottom: "60px", background: 'linear-gradient(rgba(223, 255, 222, 0), rgb(255, 255, 255), rgb(182 179 179 / 3%))' }}>

            {doneFetching == false && (
                // <Loading />

                <div>
                      <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",

                        }}
                    >
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            style={{
                                filter: "none",
                                opacity: 1,
                                pointerEvents: "none",
                                border: "1px solid teal",
                                maxWidth: "410px",
                                minWidth: "280px",
                                margin: '10px',
                                boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
                                borderRadius: "5px",
                                padding: "10px",
                                background: "#ffffff"
                            }}
                        >
                            {/* Skeleton for Customer Accepted Vendor */}
                            <div style={{
                                height: "20px", backgroundColor: "#e0e0e0", borderRadius: "5px", marginBottom: "10px"
                            }}></div>

                            {/* Skeleton for Stages */}
                            <div style={{ display: "flex", alignItems: "center", margin: "20px 0px 0px 0px" }}>
                                {[...Array(3)].map((_, index) => (
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
                                                backgroundColor: "#ccc",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                zIndex: 1,
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <div style={{
                                                width: "20px",
                                                height: "20px",
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "50%",
                                            }}></div>
                                        </div>

                                        <div
                                            style={{
                                                height: "12px",
                                                width: "60%",
                                                backgroundColor: "#e0e0e0",
                                                borderRadius: "5px",
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* Skeleton for Additional Info */}
                            <div style={{ background: "white" }}>
                                <div style={{ marginTop: '20px', borderTop: '1px solid grey' }}>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', marginTop: '10px',
                                        padding: "10px"
                                    }}>
                                        <div style={{ width: "60%", height: "20px", backgroundColor: "#e0e0e0", borderRadius: "5px" }}></div>
                                        <div style={{ display: "flex", alignItems: "center", width: "35%", height: "20px", backgroundColor: "#e0e0e0", borderRadius: "5px" }}></div>
                                    </div>

                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', padding: '10px'
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                                            <div style={{
                                                width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#e0e0e0"
                                            }}></div>
                                            <div style={{
                                                width: "60%", height: "20px", backgroundColor: "#e0e0e0", borderRadius: "5px", marginLeft: "10px"
                                            }}></div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div style={{
                                                width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#e0e0e0"
                                            }}></div>
                                            <div style={{
                                                width: "60%", height: "20px", backgroundColor: "#e0e0e0", borderRadius: "5px", marginLeft: "10px"
                                            }}></div>
                                        </div>
                                    </div>

                                    {/* Skeleton for Buttons */}
                                    <div style={{
                                        display: "flex", justifyContent: 'center', marginTop: "20px", gap: "10px"
                                    }}>
                                        <div
                                            style={{
                                                width: "120px", height: "40px", backgroundColor: "#e0e0e0", borderRadius: "20px"
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                width: "40px", height: "40px", backgroundColor: "#e0e0e0", borderRadius: "20px"
                                            }}
                                        ></div>
                                    </div>

                                  
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
            {doneFetching && (
                <div>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>

                        <div className="container ">
                            <div className="d-flex justify-content-center h-100">
                                <div className="searchbar" style={{ border: '1px solid', minWidth: "250px" }}>
                                    <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px" }} value={searchValue} onChange={(e) => { handleSearch(e.target.value) }} />
                                    {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                            </a> */}
                                    <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

                                </div>
                                <div style={{ margin: "23px 20px 0px" }}>
                                    <img src={filterUser} style={{ height: '20px', width: "20px" }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {data.length > 0 && doneFetching && distance.length > 0 && avg.length > 0 && ( */}

                    {data.length > 0 && doneFetching  && (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",

                            }}
                        >
                            {data.map((item, dataIndex) => (
                                <div style={{
                                    filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                                    opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                                    pointerEvents: isImageContainerVisible ? "none" : "auto",
                                    border: "1px solid teal",
                                     maxWidth: "410px", minWidth: "280px", margin: '10px',
                                      boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
                                       borderRadius: "5px", padding: "10px",
                                        background: "#ffffff"
                                }}>
                                    {item?.[`${currentService}Details`]?.customerAcceptedVendor == true}
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
                                                {/* Icon/Image for each stage */}
                                                <div
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        backgroundColor: index == currentStage[dataIndex] ? index == 2 ? "rgb(11 219 255)" : "#4CAF50" : "#ccc",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        border: index === currentStage[dataIndex] ? "2px solid #4CAF50" : "none",
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
                                                            opacity: index <= currentStage[dataIndex] ? 1 : 0.5,
                                                        }}
                                                    />
                                                </div>

                                                {/* Stage Label */}
                                                <p
                                                    style={{
                                                        marginTop: "5px",
                                                        color: index <= currentStage[dataIndex] ? "black" : "#aaa",
                                                        fontWeight: index === currentStage[dataIndex] ? "bold" : "normal",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {stage.label}
                                                </p>

                                                {/* Connecting Line */}
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
                                    {item?.[`${currentService}Details`]?.customerAcceptedVendor == true && (

                                        <div style={{ background: "white" }}>
                                            <div style={{ marginTop: '20px', borderTop: '1px solid grey' }}>
                                                <div className='px-2 py-1 ' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>

                                                    <div>

                                                    </div>
                                                    <div
                                                        className="right-10  flex items-center mt-1"
                                                        style={{ margin: '5px 5px 0 5px' }}
                                                    >
                                                        <ArticleIcon className="h-[30px] w-[30px] text-red-500" />
                                                        <span className="text-xs font-medium ml-2">
                                                            {item?.[`${currentService}Details`]?.filedCaseFullyTime.split("|")[0]}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='px-2  ' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 2px' }}>
                                                        <LocalShippingOutlinedIcon className='h-[30px] w-[30px]' />
                                                        <span className='text-sm font-semibold' style={{ marginLeft: "5px" }}>{item.vehicleNo}</span>
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 1px' }}>
                                                        <SignalWifiStatusbarNullIcon className='h-[30px] w-[30px] text-red' />
                                                        <span className='text-medium font-base' style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "3px 0px 5px 1px", fontSize: "12px", borderRadius: "10px", color: 'blue', fontWeight: 'bold' }}>
                                                            {!item?.[`${currentService}Details`]?.vendorMoved && (
                                                                <span >Ready to move </span>
                                                            )}
                                                            {item?.[`${currentService}Details`]?.vendorMoved == true && item?.[`${currentService}Details`]?.vendorReached == false && (
                                                                <span >On the way</span>
                                                            )}
                                                            {item?.[`${currentService}Details`]?.vendorReached == true && !item?.[`${currentService}Details`]?.approvedReaching && (
                                                                <span>Confirm</span>
                                                            )}
                                                            {item?.[`${currentService}Details`]?.vendorReached == true && item?.[`${currentService}Details`]?.approvedReaching == true && (
                                                                <span>Reached</span>
                                                            )}
                                                        </span>
                                                    </div>

                                                </div>
                                                <div className='px-2  flex-col'>
                                                    <div class='flex'>
                                                        <MyLocationIcon className='m-1 ' />
                                                        <div className='px-2 py-2 flex-col'>
                                                            <h4 className='text-sm font-base'>{item?.[`${currentService}Details`]?.pickupLocation} </h4>
                                                        </div>
                                                    </div>

                                                    <div class='flex'>
                                                        <SocialDistanceIcon className='m-1' />
                                                        <div className='px-1 py-1 flex-col'>
                                                            <p className='text-sm font-base'>{distance[dataIndex]} KM</p>
                                                        </div>
                                                    </div>

                                                </div>



                                                <div>
                                                    <div className="flex justify-between m-3">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="bg-green-700 m-1 px-6 py-2 rounded-xl cursor-pointer"
                                                                onClick={() => { goToMap(item) }}
                                                            >
                                                                <p className="text-white font-semibold text-xs text-center">Track Location </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-center justify-center px-4 py-2">
                                                            <img src={telephonecall} className="h-[30px] w-[30px]" alt="call for help" />
                                                        </div>
                                                    </div>

                                                </div>
                                                {item?.[`${currentService}Details`]?.vendorReached == true && !item?.[`${currentService}Details`]?.approvedReaching && (
                                                    <div>
                                                        <hr />
                                                        <div style={{ justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                                            {item?.[`${currentService}Details`]?.vendorReached == true && !item?.[`${currentService}Details`]?.approvedReaching && (<p style={{
                                                                fontSize: '11px',
                                                                marginTop: "2px",
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
                                                                minWidth: "140px",
                                                            }} onClick={(e) => vendorReached(item, true)} >
                                                                <KeyboardDoubleArrowRightIcon style={{
                                                                    position: "absolute",
                                                                    left: '5px'
                                                                }} />
                                                                Vendor Reached
                                                            </p>)}
                                                            {item?.[`${currentService}Details`]?.vendorReached == true && !item?.[`${currentService}Details`]?.approvedReaching && (
                                                                <p style={{
                                                                    fontSize: '11px',
                                                                    marginTop: "2px",
                                                                    background: "#ec5a5a",
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
                                                                    minWidth: "140px",
                                                                }} onClick={(e) => vendorReached(item, false)} >
                                                                    <KeyboardDoubleArrowLeftIcon style={{
                                                                        position: "absolute",
                                                                        right: '10px',
                                                                    }} />
                                                                    Not Reached
                                                                </p>)}
                                                        </div>
                                                    </div>)}
                                                {item?.[`${currentService}Details`]?.doneWorking == true && (
                                                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                                                        {item?.[`${currentService}Details`]?.doneWorking == true && item?.[`${currentService}Details`]?.confirmDoneWorking == false && (
                                                            <p style={{
                                                                fontSize: '11px',
                                                                marginTop: "2px",
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
                                                                minWidth: "140px",
                                                            }} onClick={(e) => workDoneConfirmation(item, true)} >
                                                                <KeyboardDoubleArrowRightIcon style={{
                                                                    position: "absolute",
                                                                    left: '5px'
                                                                }} />
                                                                Work Done
                                                            </p>)}
                                                        {item?.[`${currentService}Details`]?.doneWorking == true && item?.[`${currentService}Details`]?.confirmDoneWorking == false && (
                                                            <p style={{
                                                                fontSize: '11px',
                                                                marginTop: "2px",
                                                                background: "#ec5a5a",
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
                                                                minWidth: "140px",
                                                            }} onClick={(e) => workDoneConfirmation(item, false)} >
                                                                <KeyboardDoubleArrowLeftIcon style={{
                                                                    position: "absolute",
                                                                    right: '10px'
                                                                }} />
                                                                Not Done Yet
                                                            </p>)}
                                                    </div>)}
                                            </div>


                                            {selectedAction !== null && (
                                                <p style={{ marginTop: "5px", fontSize: "12px", padding: "10px", background: "lightgoldenrodyellow" }} className={`alert alert-${alertType} text-center`} role="alert">
                                                    {selectedAction ? "Vendor Reached Successfully" : "Vendor Doesn't Reached investigating..."}
                                                    <KeyboardDoubleArrowRightIcon style={{
                                                        position: "absolute",
                                                        left: '10px'
                                                    }} />
                                                </p>
                                            )}
                                            {alertMessage && (
                                                <div style={{ marginTop: "5px", fontSize: "12px", padding: "10px" }} className={`alert alert-${alertType} text-center`} role="alert">
                                                    {alertMessage}
                                                </div>
                                            )}
                                        </div>
                                    )}



                                </div>
                            ))}
                        </div>
                    )}
                    {data.length == 0 && doneFetching && (
                        <NoDataFound />
                    )}
                </div>)}


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
        </div>
    )
}

export default StatusTracking;