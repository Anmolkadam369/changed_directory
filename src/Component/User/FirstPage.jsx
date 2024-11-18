


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './FirstPage.css'
import trucksImage2 from '../../Assets/trucksImage3.jpg';
import trucksImage4 from '../../Assets/trucksImage6.png';
import searchinterfacesymbol from '../../Assets/search-interface-symbol.png'
import repairingOnStand from '../../Assets/repairingonstand.jpg'
import advocateprotest from '../../Assets/advocateprotest.png'
import mechanicuser from '../../Assets/mechanicuser.png'
import garageuser from '../../Assets/garageuser.png'
import cranetruckuser from '../../Assets/cranetruckuser.png'
import UserFooter from './UserSideBar.jsx'
import UserSideBar from './UserSideBar.jsx';
import AssignedVehicleCrane from '../Vendors/AssignedVehiclesCrane.jsx';
import Location1 from '../Location1/Location1.jsx';
import Registration from '../Registration/Registration.jsx';
import { useNavigate } from 'react-router-dom';
import CaseFirstCard from '../CaseFirstCard/CaseFirstCard.jsx';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import crossUser from '../../Assets/crossUser.png'
import { useLocation } from 'react-router-dom';
import SplashScreen from './SplashScreen.jsx';




const FirstPage = () => {
    const [filterForVehicleCrane, setFilterForVehicleCrane] = useState("all")
    const [firstPage, setFirstPage] = useState(true)
    const [locationPage, setLocationPage] = useState(false)
    const [data, setData] = useState([]);
    const [currentItems, setCurrentItems] = useState(data);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()
    const location = useLocation();
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    const [caseDetails, setCaseDetails] = useState(false);
    const [caseDetailsHere, setCaseDetailsHere] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);



    const toggleImageContainer = () => {
        setIsImageContainerVisible(!isImageContainerVisible);
    };

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

            const filteredData = response.data.data.filter((info) =>
                info.selectedOptions === 'crane' && info.filedCaseFully == false
            );

            setData(filteredData)
            console.log("seTDATIOATN", filteredData);

            setCurrentItems(response.data.data);
        }
    };

    const getCrane = () => {
        navigate('/Crane-dashboard')
    }

    const getLocation = () => {
        navigate('/VehicleDetails')
    }

    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
    }


    const { state } = useLocation();
    useEffect(() => {
        console.log("state Data", state);
        
        const savedIndex = localStorage.getItem("selectedContainer");
        if (data && savedIndex) {
            const currentItem = data[savedIndex];
    
            // Check if the item already has latitude and longitude or if it needs updating
            if (currentItem && state?.center && !currentItem.accidentLatitude && !currentItem.accidentLongitude) {
                setSelectedItem({
                    ...currentItem,
                    accidentLatitude: state.center[0],
                    accidentLongitude: state.center[1]
                });
                setCaseDetailsHere(true);
            } else {
                // Simply set the item without changing latitude or longitude
                setSelectedItem(currentItem);
            }
        }
    
    }, [state, data]);

    const changeCaseDetails = (item, index) => {
        if (item.filedCaseFully == false) {
            setCaseDetailsHere(true)
            localStorage.setItem("selectedContainer", index)
            setSelectedItem(item)
        }
        else{
            navigate('/Crane-dashboard', { state: { indexFor: 1, vehicleNo: 'MH 14 FE 6020' } })
        }

    }

    

    const handleUpdate = () => {
        setCaseDetailsHere(false)
      };

      const [showSplash, setShowSplash] = useState(true);
      const endAnimation = ()=>{
        setShowSplash(false)

      }


    return (



        <div>   
           {showSplash && (
             <div>
                <SplashScreen onAnimationEnd={endAnimation}/>
            </div>)}
       {!showSplash && ( <div style={{
        background:'linear-gradient(rgb(181 235 178), rgb(255 255 255), rgb(255, 255, 255))'
       }}>
            <div className="container h-100" style={{
                // marginTop:"30px",
                maxWidth:"500px",
                filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                pointerEvents: isImageContainerVisible ? "none" : "auto", // Disable clicking
                
                
            }}>
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                        <input className="search_input" type="text" placeholder="Search..." />
                        {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                        </a> */}
                        <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

                    </div>
                </div>
            </div>

            <div className="start-container" style={{
                filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
            }}>
                <div className="imageContainer">
                    <div className="imageWrapper" onClick={(e) => { getCrane() }}>
                        <img src={cranetruckuser} className="image" alt="truckimag2" />
                        <div className="description">
                            <p>Crane Services - Heavy Vehicles</p>
                        </div>
                    </div>
                    <div className="imageWrapper">
                        <img src={advocateprotest} style={{ background: "radial-gradient(#000000, #00000024)" }} className="image" alt="truckimag2" />
                        <div className="description">
                            <p>Advocate services-legal issues</p>
                        </div>
                    </div>
                    <div className="imageWrapper">
                        <img src={mechanicuser} style={{ background: "radial-gradient(#6cd961, #00000024)" }} className="image" alt="truckimage" />
                        <div className="description">
                            <p>On-spot-repair - mechanic</p>
                        </div>
                    </div>

                    <div className="imageWrapper">
                        <img src={garageuser} style={{ background: "radial-gradient(rgb(254 0 0), rgba(0, 0, 0, 0.14))" }} className="image rounded" alt="truckimage" />
                        <div className="description">
                            <p>Workshop Services - All at one palce</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
            }}>
                <button
                    onClick={() => (window.location.href = 'tel:9867756819')}
                    type="button"
                    style={{ width: "100%", margin: "10px", maxWidth: "300px" }}
                    className="btn btn-primary"
                >
                    Emergency
                </button>
            </div>

            {isImageContainerVisible && (
                <div className="image-container">
                    <div className="background-image"></div>

                    <div className="text-overlay">
                        <p style={{ fontSize: '14px', padding: "5px", border: '3px solid blue', borderImage: 'linear-gradient(to top, white 10% , black 90%) 1', textAlign: 'center', borderRadius: '30px', fontWeight: "bold" }}>
                            Case Assigned!
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: "center", marginLeft: "100px", marginTop: "10px", fontSize: "14px" }}>Vendor Fare </p>
                            <div style={{ marginTop: "5px", width: "30px", background: '#ccb300', border: "1px solid red", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>4.5</div>
                        </div>
                        <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>₹ 10,000</h1>



                        {/* <hr /> */}
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                            <p style={{ textAlign: "center", marginTop: "7px", fontSize: '14px', paddingRight: '10px', fontWeight: 'bold' }}>Vendor Distance :  </p>
                            <p style={{ color: 'Green', marginTop: "5px", fontSize: "19px" }}>5 km</p>
                        </div>

                        <div className="text-overlay text-overlay2">
                            <h4 style={{ marginBottom: '5px', fontSize: "11px", marginTop: "10px" }}>Location:</h4>
                            <p style={{ fontSize: '11px', gap: "10px" }}>205 D/15, Indl Estate, L B S Marg, Opp I O L, Near Amrutnagar, Near Ayodhya Chowk, Rohini, K Marg, Lower Parel Mumbai Maharashtra 4000067</p>
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
                                Vendor Current Location
                                <KeyboardDoubleArrowRightIcon style={{
                                    position: "absolute",
                                    left: '10px'
                                }} />
                            </p>
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
                            }} >
                                <KeyboardDoubleArrowRightIcon style={{
                                    position: "absolute",
                                    left: '10px'
                                }} />
                                Accept Vendor's Deal
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
                            }} >
                                Reject Deal<KeyboardDoubleArrowLeftIcon style={{
                                    position: 'absolute',
                                    right: "10px"
                                }} />
                            </p>
                        </div>

                    </div>
                </div>
            )}
            {data.map((item, index) => (
                <div key={index} style={{
                    filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                    opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                    pointerEvents: isImageContainerVisible ? "none" : "auto",
                    border: "1px solid teal",
                    minWidth: "280px",
                    margin: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
                    borderRadius: "5px",
                    padding: "10px"
                }}>

                    <div>
                        <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                            <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}> Time for process:</p>
                        <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>40 Minutes</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Current Status:</p>
                        <span style={{
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
                        }}>Processing...</span>
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
                        }} onClick={()=> {changeCaseDetails(item, index)}}>
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
            ))}

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
                            maxHeight: "80%", // limit the height for scrollability
                            overflowY: "auto", // enables vertical scrolling
                            padding: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <img
                            src={crossUser}
                            onClick={() =>{ setCaseDetailsHere(false)}}
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

                        <Registration item = {selectedItem} onUpdated={handleUpdate}/>
                    </div>
                </div>
            )}

            <div
            style={{
                position:'sticky',
                height:'50px',
                bottom:'0px',
                border:"1px solid",
                background:'white'
            }}>
                hello

            </div>
        </div>)}
        </div>
    )
}


export default FirstPage;