


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import trucksImage2 from '../../../Assets/trucksImage3.jpg';
import trucksImage4 from '../../../Assets/trucksImage6.png';
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import repairingOnStand from '../../../Assets/repairingonstand.jpg'
import advocateprotest from '../../../Assets/advocateprotest.png'
import mechanicuser from '../../../Assets/mechanicuser.png'
import garageuser from '../../../Assets/garageuser.png'
import cranetruckuser from '../../../Assets/cranetruckuser.png'
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import crossUser from '../../../Assets/crossUser.png'
import emergencycall from '../../../Assets/emergencycall.png'
import nearbyRestaurant from '../../../Assets/nearbyRestaurant.png'
import nearbyhospital from '../../../Assets/nearbyhospital.png'
import nearbyPetrolPump from '../../../Assets/nearbyPetrolPump.png'
import nearbyParking from '../../../Assets/nearbyParking.png'
import truckrepairingUser from '../../../Assets/truckrepairingUser.png'
import repairUser from '../../../Assets/repairUser.png'
import BottomNavigationBar from '../BottomNavigationBar.jsx';
import NoDataFound from '../Cards/NoDataFound.jsx';
import Registration from '../../Registration/Registration.jsx';





export default function AllVehicles() {
    const [data, setData] = useState([]);
    const [accidentData, setAccidentData] = useState([]);
    const [filtering, setFiltering] = useState([]);

    const [notAccidentVehicleData, setNotAccidentVehicleData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);


    const [currentItem, setCurrentItem] = useState([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [caseDetailsHere, setCaseDetailsHere] = useState(false);


    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()


    useEffect(() => {
        getData();
        getAccidentData()
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const goToNewCase = () => {
        navigate("/register-new-accidentvehicle", { state: { fromPageHere: "allVehicles" } })
    }

    const getData = async (e) => {
        console.log("userid", userId);
        let accidentVehicles = [], notAccidentVehicles = []
        const response = await axios.get(`${backendUrl}/api/getPersonalVehicleInfoById/${userId}`);
        if (response.data.message == "No accident vehicle data found.") setData([])
        else {
            console.log("response123421", response.data.data);
            response.data.data.map((item) => {
                if (item.alreadyAccidentVehicle == true) accidentVehicles.push(item)
                if (item.alreadyAccidentVehicle == false) notAccidentVehicles.push(item)

            })
            console.log("seTDATIOATN", response.data.data);
            setFiltering(accidentVehicles)
            setData(accidentVehicles)
            setNotAccidentVehicleData(notAccidentVehicles)
            setAccidentVehicleData(accidentVehicles)
        }
    };

    const getAccidentData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`);
        if (response.data.message == "No accident vehicle data found.") setAccidentData([])
        else {
            setAccidentData(response.data.data)
        }
    };

    const setDetails = (item) => {
        setViewDetails(true)
        setCurrentItem(item)
    }

    const setUpdateAccidentData = (item)=>{
        setCaseDetailsHere(true)
       const gotItem =  accidentData.find((accidentItem)=>{
           return (accidentItem.reg == item.vehicleNo)
        })
        setCurrentItem(gotItem)
    }

    const handleUpdate = () => {
        setCaseDetailsHere(false)
    };
    
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const newRows = filtering.filter((row) => {
            const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
            const searchLower = value; // Use the updated search value directly

            const idValue = formattedId.includes(searchLower);
            const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(searchLower);
            const chassisNoValue = (row.chassisNo ?? '').toLowerCase().includes(searchLower);

            return vehicleNoValue || chassisNoValue;
        });

        setData(newRows);
    };
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (index) => {
        setSelectedIndex(index);
        index == 0 ? setFiltering(accidentVehicleData) : setFiltering(notAccidentVehicleData)
        index == 0 ? setData(accidentVehicleData) : setData(notAccidentVehicleData)
    };
    return (
        <div>
            <div style={{ position: "sticky", top: "14px", zIndex: "1000" }}>
                <div className="imageContainer" style={{ height: "0px" }}>
                    {["Accident Vehicles", "Other Vehicles"].map((text, index) => (
                        <div
                            key={index}
                            style={{ cursor: 'pointer' }}
                            className={`imageWrapper ${selectedIndex === index ? "selected" : ""}`}
                            onClick={() => handleSelect(index)}
                        >
                            <div className="top-scrolling">
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                marginBottom: "100px", background: 'linear-gradient(rgb(181 235 178), rgb(255 255 255), rgb(255, 255, 255))',
            }}>
                <div className="container" style={{
                    // paddingTop:"30px",
                    maxWidth: "500px",
                    height: "30px",
                    marginBottom: "30px",
                    paddingTop: "30px"
                    // filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                    // opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                    // pointerEvents: isImageContainerVisible ? "none" : "auto", // Disable clicking


                }}>
                    <div className="d-flex justify-content-center h-100">
                        <div className="searchbar">
                            <input className="search_input" type="text" placeholder="Search..." onChange={handleSearch} />

                            <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

                        </div>
                    </div>
                </div>
                <p style={{ fontWeight: "bold", margin: "70px 20px 20px 30px" }}><em> All Registered Vehicles</em></p>


                <div style={{ marginBottom: "30px" }}>
                    {data.length > 0 && (
                        data.map((item, index) => (
                            <div key={index} style={{
                                // filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                                // opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                                // pointerEvents: isImageContainerVisible ? "none" : "auto",
                                border: "1px solid teal",
                                minWidth: "280px",
                                margin: '10px',
                                boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
                                borderRadius: "20px 20px 0 0",
                                padding: "10px",
                                maxWidth: "410px",
                                background: "white"
                            }}>

                                <div>
                                    <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Chassis No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.chassisNo}</span>
                                    </div>
                                </div>



                                <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                                    {/* <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Current Status:</p> */}
                                    {/* <span style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: "5px",
                                    padding: "3px 10px",
                                    fontSize: "12px",
                                    borderRadius: "10px",
                                    color: 'blue',
                                    border: "1px solid green",
                                    background: 'white'
                                }}>In Repair</span> */}
                                </div>

                                {selectedIndex == 1 && (<div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                    <p style={{
                                        fontSize: '11px',
                                        marginTop: "5px",
                                        background: "#62ff00a6",
                                        padding: "10px",
                                        border: '1px solid blue',
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        fontWeight: "bold",
                                        color: "black",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        position: "relative",
                                        cursor: "pointer",
                                        margin: '5px 5px 5px 5px',
                                        maxWidth: "400px",
                                        minWidth: "280px",
                                    }} onClick={() => setDetails(item)}>
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                        View More Details
                                    </p>
                                </div>)}
                                {selectedIndex == 0 && (<div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                    <p style={{
                                        fontSize: '11px',
                                        marginTop: "5px",
                                        background: "#62ff00a6",
                                        padding: "10px",
                                        border: '1px solid blue',
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        fontWeight: "bold",
                                        color: "black",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        position: "relative",
                                        cursor: "pointer",
                                        margin: '5px 5px 5px 5px',
                                        maxWidth: "400px",
                                        minWidth: "280px",
                                    }} onClick={() => setUpdateAccidentData(item)}>
                                        <KeyboardDoubleArrowRightIcon style={{
                                            position: "absolute",
                                            left: '10px'
                                        }} />
                                        Accident Details
                                    </p>
                                </div>)}
                            </div>
                        ))
                    )}
                    {data.length == 0 && (
                        <NoDataFound />
                    )}
                </div>
                {viewDetails && (
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
                        <div
                            style={{
                                position: "relative",
                                width: "97%",
                                maxWidth: "600px",
                                backgroundColor: "#fff", // white background for the content
                                borderRadius: "15px 15px 0px 0px",
                                maxHeight: "80%", // limit the height for scrollability
                                overflowY: "auto", // enables vertical scrolling
                                padding: "20px 5px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <img
                                src={crossUser}
                                onClick={() => setViewDetails(false)}
                                style={{
                                    position: "fixed",
                                    left: "calc(100% - 35px)",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                }}
                            />
                            <div style={{
                                backgroundColor: "rgb(255 255 255)",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                margin: "30px 5px 30px 5px",
                                boxShadow: "rgba(0, 0, 0, 0.1) -20px -18px 10px 0px",
                                borderRadius: "10px"
                            }}>

                                {[
                                    { label: "Vehicle No", value: currentItem.vehicleNo, icon: "fa-car", color: "green" },
                                    { label: "Chassis No", value: currentItem.chassisNo, icon: "fa-id-card", color: "blue" },
                                    { label: "Engine No", value: currentItem.engineNo, icon: "fa-cogs", color: "orange" },
                                    { label: "Make Of Vehicle", value: currentItem.make, icon: "fa-industry", color: "purple" },
                                    { label: "Model Of Vehicle", value: currentItem.model, icon: "fa-tasks", color: "red" },
                                    { label: "Year Of Vehicle", value: currentItem.year, icon: "fa-calendar-alt", color: "brown" },
                                    { label: "Type Of Vehicle", value: currentItem.type, icon: "fa-truck", color: "teal" },
                                    { label: "Application Of Vehicle", value: currentItem.application, icon: "fa-wrench", color: "darkblue" },
                                    { label: "Insurance Of Vehicle", value: currentItem.InsuranceName, icon: "fa-shield-alt", color: "gold" },
                                ].map((item, index) => (
                                    <div>
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                margin: "10px 0",
                                                padding: "10px 10px 0px 15px",
                                                // backgroundColor: "#f9f9f9",
                                                borderRadius: "8px",
                                                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <i
                                                className={`fas ${item.icon}`}
                                                style={{
                                                    fontSize: "20px",
                                                    color: item.color,
                                                    marginRight: "10px",
                                                }}
                                            ></i>
                                            <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>{item.label}:</p>
                                            <span style={{ color: item.color, marginLeft: "8px", fontSize: "14px" }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginBottom: "50px", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                <p style={{
                                    fontSize: '13px',
                                    marginTop: "10px",
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
                                    minWidth: "70%",
                                    cursor: "pointer"
                                }} onClick={goToNewCase} >
                                    Register as accident vehicle
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
                        </div>


                    </div>
                )}

                {caseDetailsHere && (
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
                        <div
                            style={{
                                position: "relative",
                                width: "97%",
                                maxWidth: "600px",
                                backgroundColor: "#fff", // white background for the content
                                borderRadius: "15px 15px 0px 0px",
                                // marginBottom: "30px",
                                maxHeight: "90%", // limit the height for scrollability
                                overflowY: "auto", // enables vertical scrolling
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <img
                                src={crossUser}
                                onClick={() => {
                                    setCaseDetailsHere(false)
                                }}
                                style={{
                                    position: "fixed",
                                    left: "calc(100% - 35px)",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                }}
                            />

                            <Registration item={currentItem} fromPageHere={"allvehicles"} onUpdated={handleUpdate} />
                        </div>
                    </div>
                )}
            </div>

            <div>
                <BottomNavigationBar />
            </div>
        </div>
    )
}