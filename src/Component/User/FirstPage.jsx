


import React, { useEffect, useState } from 'react';
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




const FirstPage = () => {
    const [filterForVehicleCrane, setFilterForVehicleCrane] = useState("all")
    const [firstPage, setFirstPage] = useState(true)
    const [locationPage, setLocationPage] = useState(false)
    const navigate = useNavigate()
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);

    const toggleImageContainer = () => {
        setIsImageContainerVisible(!isImageContainerVisible);
    };

    const getLocation = () => {
        // setLocationPage(true)
        // setFirstPage(false)
        navigate('/VehicleDetails')

    }

    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
    }

    return (
        <div>
            <div >
                <UserSideBar />
                <div className="container h-100" style={{
                    filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                    opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                    pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
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

                {/* <div style={{display:'flex', overflowY:'auto'}}>
                <div style={{border:'2px solid red', height:'200px', width:"200px"}}>
                        <p>div1</p>
                </div>
                <div style={{border:'2px solid red', height:'200px', width:"200px"}}>
                        <p>div2</p>
                </div>
                <div style={{border:'2px solid red', height:'200px', width:"200px"}}>
                        <p>div3</p>
                </div>
                <div style={{border:'2px solid red', height:'200px', width:"200px"}}>
                        <p>div4</p>
                </div>
            </div> */}

                <div className="start-container" style={{
                    filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                    opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                    pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
                }}>
                    <div className="imageContainer">
                        <div className="imageWrapper">
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
                    <button type="button" style={{ width: "100%", margin: "10px", maxWidth: "300px" }} className="btn btn-primary" onClick={(e) => { getLocation() }}>
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


                            <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>Vendor Fare </p>
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
                <div style={{ marginBottom: "30px" }}>
                    <AssignedVehicleCrane getFilterInfo={filterForVehicleCrane} />
                </div>
                {/* <UserFooter/> */}

            </div>

            {/* {locationPage && (
            <Registration/>
        )} */}

        </div>
    )
}

export default FirstPage;