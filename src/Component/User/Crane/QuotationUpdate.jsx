
import React, { useEffect, useState } from 'react';
import '../FirstPage.css'
import axios from 'axios';
import backendUrl from '../../../environment';
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import casefiled from '../../../Assets/casefiled.png'
import telephonecall from '../../../Assets/telephonecall.png'
import checksuccess from '../../../Assets/checksuccess.png'
import crossUser from '../../../Assets/crossUser.png'


import Registration from '../../Registration/Registration';

const QuotationUpdate = ({ number }) => {
    const [currentStage, setCurrentStage] = useState([]); // Example stage
    console.log("currentStage123", currentStage)
    const [currentStage1, setCurrentStage1] = useState(2); // Example stage
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    const [caseDetails, setCaseDetails] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    console.log("currentItme", currentItem)


    const [data, setData] = useState([]);
    console.log("DATA HERE", data)
    const [currentItems, setCurrentItems] = useState(data);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("numberHere", number)

    useEffect(() => {
        if (number && data.length > 0) {
            console.log("NUMBER", number)
            console.log("data", data)
            const gotItem = data.filter((item) => {
                console.log(item.vehicleNo, number)
                return item.vehicleNo == number;
            })
            console.log("gotItem", gotItem[0])
            setCurrentItem(gotItem[0]);
            getVendorRating(gotItem[0].crane)
            getVendorLocation(gotItem[0].crane, gotItem[0].accidentLatitude, gotItem[0].accidentLongitude)
            setIsImageContainerVisible(true)
        }
    }, [number, data])

    const navigate = useNavigate()


    // Array of stages
    // const stages = ["assigned", "accepted & moved","reached"];
    const stages = [
        { label: "Filed", img: casefiled },
        { label: "Connecting Vendor", img: telephonecall },
        { label: "Assigned", img: checksuccess },
    ];

    useEffect(() => {
        getData();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`);
        if (response.data.message == "No accident vehicle data found.") setData([])
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);

            let filteredData = response.data.data.filter((info) =>
                info.selectedOptions === 'crane' && info.filedCaseFully == true && !info.customerAcceptedVendor
            );

           let filteredImportant = filteredData.filter((info)=>
                info.connectedVendorFully == true
            )

            let filteredLessImportant = filteredData.filter((info)=>
                info.connectedVendorFully == false
            )
            filteredData = [...filteredImportant, ...filteredLessImportant]
            setData(filteredData)
            console.log("seTDATIOATN", filteredData);

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
                vehicleNo: item.vehicleNo
            }
        })
    }
    const getStage = (connectedVendorFully) => {
        return connectedVendorFully ? 2 : 1;
    }
    useEffect(() => {
        if (data.length > 0 && data.length != currentStage.length) {
            const setUpdatedData = data.map((item) => {
                let gotStage = getStage(item.connectedVendorFully)
                currentStage.push(gotStage)
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

    // const getPaymentLinkPage = ()=>{
    //     const vehicleNo = currentItem.vehicleNo;
    //     const AccidentVehicleCode = currentItem.AccidentVehicleCode;
    //     const vendorCode = currentItem.crane;
    //     const customerCode = userId;
    //     const vendorType = 'crane';
    //     const newWindow  = window.open(comingLink, '_blank')

    //     console.log(vehicleNo, AccidentVehicleCode,vendorCode,customerCode, vendorType)

    //     newWindow.onload = ()=>{
    //         newWindow.postmessage({vehicleNo, AccidentVehicleCode,vendorCode,customerCode, vendorType}, "*")
    //     }
    // }

    const getPaymentLinkPage = () => {
        navigate(`${comingLink}`, {
            state: {
                vehicleNo: currentItem.vehicleNo,
                accidentVehicleCode: currentItem.AccidentVehicleCode,
                vendorCode: currentItem.crane,
                customerCode: userId,
                vendorType :'crane',
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
            const response = await axios.get(`${backendUrl}/api/getVendorCurrentLocation/${crane}`);
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




    return (
        <div>
            <div className="container h-100" style={{
                filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
            }}>
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar" style={{ border: '1px solid', minWidth: "300px" }}>
                        <input className="search_input" type="text" placeholder="Search..." />
                        {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                        </a> */}
                        <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

                    </div>
                </div>
            </div>

            {data.length > 0 && (
                data.map((item, dataIndex) => (
                    <div style={{
                        filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                        opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                        pointerEvents: isImageContainerVisible ? "none" : "auto",
                        border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "5px", padding: "10px"
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


                        {item.connectedVendorFully == true && (
                            <div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>


                                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>

                                    <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>{average}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>File No : </p>
                                    <span style={{ marginLeft: "5px", fontSize: "10px", color: 'darkblue', fontWeight: "bold" }}>{item.accidentFileNo.toUpperCase()}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}> Vendor Fare: </p>
                                    <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>₹ {item.charges}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "3px 10px 5px 10px", fontSize: "12px", borderRadius: "10px", color: 'green', border: "1px solid green", background: 'white' }}>{item.connectedVendorFully ? "Assigned" : "Connecting..."}</span>
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
                                        minWidth: "150px",
                                    }} onClick={(e) => assignedCaseViewVendor(item)} >
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
                                        minWidth: "150px",
                                        margin: '5px 5px 5px 5px',
                                        height: "30px"
                                    }}>
                                        Cancel Process
                                        <img src={crossUser} style={{
                                            position: "absolute",
                                            right: '10px', width: '20px', height: '20px'
                                        }} />
                                    </p>

                                </div>
                            </div>
                        )}

                        {item.filedCaseFully && item.connectedVendorFully == false && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>

                                    {/* <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>4.5</div> */}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>File No : </p>
                                    <span style={{ marginLeft: "5px", fontSize: "10px", color: 'darkblue', fontWeight: "bold" }}>{item.accidentFileNo.toUpperCase()}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "3px 10px 5px 10px", fontSize: "12px", borderRadius: "10px", color: 'blue', border: "1px solid green", background: 'white' }}>{item.connectedVendorFully ? "Assigned" : "Connecting..."}</span>
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
                                        minWidth: "150px",
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
                                        minWidth: "150px",
                                        margin: '5px 5px 5px 5px',
                                        height: "30px"
                                    }}>
                                        Cancel Process
                                        <img src={crossUser} style={{
                                            position: "absolute",
                                            right: '10px', width: '20px', height: '20px'
                                        }} />
                                    </p>

                                </div>
                            </div>)}
                    </div>
                ))
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
                                <p style={{ textAlign: "center", marginLeft: "120px", marginTop: "10px", fontSize: "14px" }}>Vendor Fare</p>
                                <div style={{
                                    marginTop: "5px",
                                    width: "30px",
                                    background: '#ccb300',
                                    border: "1px solid red",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    color: 'black'
                                }}>{average}</div> {/*${backendUrl}/api/customersRating/${userId}*/}
                            </div>
                            <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>₹ {currentItem.charges}</h1>

                            <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                <p style={{
                                    textAlign: "center",
                                    marginTop: "7px",
                                    fontSize: '14px',
                                    paddingRight: '10px',
                                    fontWeight: 'bold'
                                }}>Vendor Distance :</p>
                                <p style={{ color: 'Green', marginTop: "6px", fontSize: "12px" }}>{distance.toFixed(2)} km</p> {/* take vendor current location by api and use harvesine formula */}
                            </div>

                            <div className="text-overlay text-overlay2">
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
                                    maxWidth: "400px",
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
                                }}>
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



        </div>
    )
}




export default QuotationUpdate;