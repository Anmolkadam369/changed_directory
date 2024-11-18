
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




const StatusTracking = () => {

    const navigate = useNavigate()
    const { state } = useLocation();
    const [currentStage, setCurrentStage] = useState([]); // Example stage
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    const [data, setData] = useState([]);
    const [currentItems, setCurrentItems] = useState(data);
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")
    const [selectedAction, setSelectedAction] = useState(null)

    const [distance, setDistances] = useState([])
    const [avg, setAvg] = useState([])

    console.log("avg", avg)

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const stages = [
        { label: "assigned", img: assignedTask },
        { label: "accepted & moved", img: comingCrane },
        { label: "reached", img: checksuccess },
    ];

    console.log('isImageContainer', isImageContainerVisible)

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
                info.selectedOptions === 'crane' && info.customerAcceptedVendor
            );

            let filteredImportant = filteredData.filter((info) =>
                info.connectedVendorFully == true
            )

            let filteredLessImportant = filteredData.filter((info) =>
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
                vehicleNo: item.vehicleNo,
                fromPage: "statusTracking"
            }
        })
    }

    const getStage = (vendorMoved, approvedReaching) => {
        return approvedReaching ? 2 : vendorMoved ? 1 : 0;
    }

    useEffect(() => {
        if (data.length > 0 && data.length != currentStage.length) {
            data.map((item) => {
                avg.push(0)
            })
            data.map((item) => {
                let gotStage = getStage(item.vendorMoved, item.approvedReaching)
                currentStage.push(gotStage)
            })
            data.forEach((item, index) => {
                getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude, index);
                getVendorRating(item.crane)
            });
        }

    }, [data])


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

    const getVendorLocation = async (crane, accidentLatitude, accidentLongitude, index) => {
        try {
            console.log("disntaceadfafdaf", distance)
            console.log("craninging", crane, accidentLatitude, accidentLongitude, index)

            const response = await axios.get(`${backendUrl}/api/getVendorCurrentLocation/${crane}`);
            if (response.data.status == true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)

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
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                console.log("updated successfully")
                setSelectedAction(action)
            }
            else console.log("there is some issue")

        }
        catch (error) {
            console.log("the error occured", error.message)
        }
    }





    return (
        <div>

            <div className="container h-100">
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

            {data.length > 0 && distance.length > 0 && avg.length > 0 && (
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
                                    {/* Icon/Image for each stage */}
                                    <div
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: index  == currentStage[dataIndex] ? index == 2 ? "rgb(11 219 255)" : "#4CAF50" : "#ccc",
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

                        {item.customerAcceptedVendor && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>


                                    <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>{avg[dataIndex]}</div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>vendor currently  : </p>
                                    <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }} >{distance[dataIndex]} Km away</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold", marginTop: '5px' }}>Current Status:</p>
                                    {!item.vendorMoved && (
                                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", marginTop: "6px", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'blue', border: "1px solid blue", background: '#dadada', fontWeight: "bold", boxShadow: '4px 4px 20px blue' }}>Ready to move </span>
                                    )}
                                    {!item.vendorReached && (
                                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", marginTop: "6px", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'black', border: "2px solid #8d65bd", background: '#dadada', fontWeight: "bold", boxShadow: '4px 4px 20px black' }}>On the way</span>
                                    )}
                                    {item.vendorReached == true && !item.approvedReaching && (
                                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", marginTop: "6px", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'green', border: "1px solid green", background: '#dadada', fontWeight: "bold", boxShadow: '4px 4px 20px green' }}>Confirm</span>
                                    )}
                                    {item.vendorReached == true && item.approvedReaching == true && (
                                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", marginTop: "6px", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'green', border: "1px solid green", background: '#dadada', fontWeight: "bold", boxShadow: '4px 4px 20px green' }}>Reached</span>
                                    )}
                                </div>

                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

                                    <p style={{
                                        fontSize: '11px',
                                        marginTop: "2px",
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
                                        minWidth: "280px",
                                        margin: '5px 0px 0px 5px',
                                        height: "30px"
                                    }} onClick={() => { goToMap(item) }}>
                                        Track Location
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                                    {item.vendorReached == true && item.approvedReaching == null && (<p style={{
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
                                    {item.vendorReached == true && item.approvedReaching == null && (<p style={{
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
                                            right: '10px' 
                                        }} />
                                        Not Reached
                                    </p>)}
                                </div>

                                {selectedAction !== null && (
                                    <p style={{
                                        fontSize: '11px',
                                        marginTop: "2px",
                                        background: "white",
                                        padding: "10px",
                                        border: '2px solid #000000',
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        fontWeight: "bold",
                                        color: "black",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        position: "relative",
                                        cursor: "pointer",
                                        maxWidth: "400px",
                                        minWidth: "280px",
                                        margin: '5px 0px 0px 5px',
                                        height: "30px"
                                    }}>
                                        {selectedAction ? "Vendor Reached Successfully" : "Vendor Doesn't Reached investigating..."}
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                    </p>
                                )}
                            </div>
                        )}



                    </div>
                ))
            )}


        </div>
    )
}

export default StatusTracking;