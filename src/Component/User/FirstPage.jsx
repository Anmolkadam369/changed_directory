


// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import backendUrl from '../../environment';
// import { Container, Row, Col, Image } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './FirstPage.css'
// import trucksImage2 from '../../Assets/trucksImage3.jpg';
// import trucksImage4 from '../../Assets/trucksImage6.png';
// import searchinterfacesymbol from '../../Assets/search-interface-symbol.png'
// import repairingOnStand from '../../Assets/repairingonstand.jpg'
// import advocateprotest from '../../Assets/advocateprotest.png'
// import mechanicuser from '../../Assets/mechanicuser.png'
// import garageuser from '../../Assets/garageuser.png'
// import cranetruckuser from '../../Assets/cranetruckuser.png'
// import UserFooter from './UserSideBar.jsx'
// import UserSideBar from './UserSideBar.jsx';
// import AssignedVehicleCrane from '../Vendors/AssignedVehiclesCrane.jsx';
// import Location1 from '../Location1/Location1.jsx';
// import Registration from '../Registration/Registration.jsx';
// import { useNavigate } from 'react-router-dom';
// import CaseFirstCard from '../CaseFirstCard/CaseFirstCard.jsx';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import crossUser from '../../Assets/crossUser.png'
// import emergencycall from '../../Assets/emergencycall.png'
// import nearbyRestaurant from '../../Assets/nearbyRestaurant.png'
// import nearbyhospital from '../../Assets/nearbyhospital.png'
// import nearbyPetrolPump from '../../Assets/nearbyPetrolPump.png'
// import nearbyParking from '../../Assets/nearbyParking.png'
// import truckrepairingUser from '../../Assets/truckrepairingUser.png'
// import repairUser from '../../Assets/repairUser.png'
// import speechbubble from '../../Assets/speechbubble.png'
// import { useMediaQuery } from '@mui/material';
// import { useWebSocket } from '../ContexAPIS/WebSocketContext.jsx';
// import craneworkdoing from "../../Assets/crane-work-doing.jpeg"
// import advocatecurrentservice from "../../Assets/advocatecurrentservice.jpg"
// import mechaniccurrentservice from "../../Assets/mechaniccurrentservice.jpg"
// import workshopcurrentservice from "../../Assets/workshopcurrentservice.jpg"



// import nearbytoll from '../../Assets/nearbytoll.png'


// import { useLocation } from 'react-router-dom';
// import SplashScreen from './SplashScreen.jsx';
// import BottomNavigationBar from './BottomNavigationBar.jsx';
// import { ClipLoader } from 'react-spinners';
// import NotInterestedIcon from '@mui/icons-material/NotInterested';
// import FirstPageDesigns from './FirstPageDesigns/FIrstPageDesigns.jsx';




// const FirstPage = () => {
//     const [filterForVehicleCrane, setFilterForVehicleCrane] = useState("all")
//     const [firstPage, setFirstPage] = useState(true)
//     const [locationPage, setLocationPage] = useState(false)
//     const [data, setData] = useState([]);
//     const [currentItems, setCurrentItems] = useState(data);
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     const navigate = useNavigate()
//     const location = useLocation();
//     const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
//     const [caseDetails, setCaseDetails] = useState(false);
//     const [caseDetailsHere, setCaseDetailsHere] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(false);
//     const isWideScreen = useMediaQuery('(min-width:475px)');
//     const [isCancelContainerVisible, setIsCancelContainerVisible] = useState(false);
//     const [reasonsForDrop, setReasonsForDrop] = useState(false);
//     const [selectedReasons, setSelectedReasons] = useState([]);
//     const [otherReason, setOtherReason] = useState("");
//     const [currentItem, setCurrentItem] = useState({});


//     const [isLoading, setIsLoading] = useState(false);
//     const [alreadyCancelled, setAlreadyCancelled] = useState(false);

//     const [errorMessage, setErrorMessage] = useState("");

//     //-------------------------------------------------------------------
//     const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';
//     const effectRan = useRef(false);
//     const urlBase64ToUint8Array = base64String => {
//         const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//         const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
//         const rawData = window.atob(base64);
//         return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
//     };

//     useEffect(() => {
//         if (effectRan.current === false) {
//             const sendLoginNotification = async () => {
//                 try {
//                     console.log('Registering service worker...');
//                     const registration = await navigator.serviceWorker.register('/service-worker.js');
//                     console.log('Service worker registered:', registration);

//                     const subscription = await registration.pushManager.subscribe({
//                         userVisibleOnly: true,
//                         applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//                     });
//                     console.log('Push Manager subscription:', subscription);

//                     await axios.post(`${backendUrl}/api/subscription/${userId}`, subscription, { headers: { Authorization: `Bearer ${token}` } });

//                 } catch (error) {
//                     console.error('Error sending login notification:', error);
//                 }
//             };

//             sendLoginNotification();
//             effectRan.current = true;
//         }
//     }, []);



//     //-------------------------------------------------------------------

//     const reasons = [
//         "Too much time taking",
//         "Got other services",
//         "Not needed now", "Changed my mind"
//     ];

//     const handleSelectReason = (reason) => {
//         if (selectedReasons.includes(reason)) {
//             // Remove from selected if already in array
//             setSelectedReasons(selectedReasons.filter((item) => item !== reason));
//         } else {
//             // Add to selected array
//             setSelectedReasons([...selectedReasons, reason]);
//         }
//     };

//     const toggleImageContainer = () => {
//         setIsImageContainerVisible(!isImageContainerVisible);
//     };

//     useEffect(() => {
//         getData();
//         console.log("token", token, userId);
//         if (token === "" || userId === "") {
//             navigate("/");
//         }
//     }, [token, userId, navigate]);


//     const getData = async (e) => {
//         // console.log("userid", userId);
//         // const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
//         //   'Authorization': `Bearer ${token}`
//         // }});
//         // if (response.data.message == "No accident vehicle data found.") setData([])
//         // else {
//         //     console.log("response123421", response.data.data);
//         //     console.log("data2", response.data.data2);

//         //     const filteredData = response.data.data.filter((info) =>
//         //         info.selectedOptions === 'crane' && info.filedCaseFully == false
//         //     );

//         //     setData(filteredData)
//         //     console.log("seTDATIOATN", filteredData);

//         //     setCurrentItems(response.data.data);
//         // }
//     };



//     const getCrane = () => {
//         navigate('/Crane-dashboard')
//     }

//     const getLocation = () => {
//         navigate('/VehicleDetails')
//     }

//     const goToMap = () => {
//         navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
//     }


//     const { state } = useLocation();
//     useEffect(() => {
//         console.log("state Data", state);

//         const savedIndex = localStorage.getItem("selectedContainer");
//         if (data && savedIndex) {
//             const currentItem = data[savedIndex];

//             // Check if the item already has latitude and longitude or if it needs updating
//             if (currentItem && state?.center && !currentItem.accidentLatitude && !currentItem.accidentLongitude) {
//                 setSelectedItem({
//                     ...currentItem,
//                     accidentLatitude: state.center[0],
//                     accidentLongitude: state.center[1]
//                 });
//                 setCaseDetailsHere(true);
//             } else {
//                 // Simply set the item without changing latitude or longitude
//                 setSelectedItem(currentItem);
//             }
//         }

//     }, [state, data]);

//     const cancelingOrder = async (currentItem) => {
//         try {
//             const response = await axios({
//                 method: "PUT",
//                 url: `${backendUrl}/api/cancellingOrderPrimaryStage/${currentItem.AccidentVehicleCode}/crane/${userId}`,
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 data: {
//                     cancleOrderReason: [...selectedReasons, otherReason]
//                 }
//             });

//             if (response.data.status === true) {
//                 setIsCancelContainerVisible(false);
//                 setReasonsForDrop(false);
//                 getData()
//             } else {
//                 setAlreadyCancelled(true);
//             }
//         } catch (error) {
//             console.error("Error canceling order:", error);
//         }
//     };


//     const changeCaseDetails = (item, index) => {
//         if (item.filedCaseFully == false) {
//             setCaseDetailsHere(true)
//             localStorage.setItem("selectedContainer", index)
//             setSelectedItem(item)
//         }
//         else {
//             navigate('/Crane-dashboard', { state: { indexFor: 1, vehicleNo: 'MH 14 FE 6020' } })
//         }
//     }
//     const cancleCaseProcedureFunc = (item) => {
//         setCurrentItem(item)
//         setIsCancelContainerVisible(true)
//         setReasonsForDrop(false)
//     }

//     const handleUpdate = () => {
//         setCaseDetailsHere(false)
//     };

//     const [showSplash, setShowSplash] = useState(true);
//     const endAnimation = () => {
//         setShowSplash(false)

//     }

//     const newAccidentVehicle = () => {
//         navigate('/add-new-vehicle-driver')
//     }

//     const [locations, setLocation] = useState('')
//     const [pickupLocation, setPickupLocation] = useState('')

//      useEffect(() => {
//             const getLocation = () => {
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(showPosition, showError);
//                 } else {
//                     setLocation('Geolocation is not supported by this browser.');
//                 }
//             };
//             getLocation()
//         }, [])
    
    
//         const showPosition = async (position) => {
//             const { latitude, longitude } = position.coords;

    
//             try {
//                 const response = await fetch(
//                     `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//                 );
//                 const data = await response.json();
//                 if (data && data.address) {
//                     const { road, city, state, country } = data.address;
//                     setPickupLocation(`${road || ''}, ${city || ''}, ${state || ''}, ${country || ''}`);
//                 } else {
//                     setPickupLocation('Location details not found.');
//                 }
//             } catch (error) {
//                 setLocation('Error fetching location details.');
//             }
//         };
    
//         const showError = (error) => {
//             switch (error.code) {
//                 case error.PERMISSION_DENIED:
//                     setLocation('User denied the request for Geolocation.');
//                     break;
//                 case error.POSITION_UNAVAILABLE:
//                     setLocation('Location information is unavailable.');
//                     break;
//                 case error.TIMEOUT:
//                     setLocation('The request to get user location timed out.');
//                     break;
//                 case error.UNKNOWN_ERROR:
//                     setLocation('An unknown error occurred.');
//                     break;
//                 default:
//                     setLocation('An error occurred while fetching location.');
//             }
//         };
    

//     return (



//         <div>
//             {showSplash && (
//                 <div>
//                     <SplashScreen onAnimationEnd={endAnimation} />
//                 </div>)}
//             {!showSplash && (
//                 <div style={{
//                     // background: 'linear-gradient(rgb(29 97 25 / 75%), rgb(255, 255, 255), rgb(249 241 241))'
//                 }}>
//                     <div>
//                         <div    >
//                             <div style={{ background: "transperant", padding: '8px', marginBottom: "8px", borderRadius: "5px" }}>
//                                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                                     <i class="fa fa-location-arrow" style={{ fontSize: "20px", color: "rgb(0 0 0)", marginRight: "10px" }}></i>
//                                     <p style={{ color: 'red', fontSize: "13px", margin: "5px 5px", color: "#555" }}>
//                                         {pickupLocation}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="container" style={{
//                                 // paddingTop: "10px",
//                                 maxWidth: "500px",
//                                 // height: "30px",
//                                 // marginBottom: "30px",
//                                 filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
//                                 opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
//                                 pointerEvents: isImageContainerVisible ? "none" : "auto", // Disable clicking


//                             }}>
//                                 {/* <div className="d-flex justify-content-center h-100">
//                                     <div className="searchbar">
//                                         <input className="search_input" type="text" placeholder="Search..." />

//                                         <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

//                                     </div>
//                                 </div> */}
//                             </div>

//                             <div className="start-container" style={{
//                                 filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
//                                 opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
//                                 pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
//                             }}>
//                                 <div className="imageContainer">
//                                     <div className="imageWrapper" onClick={(e) => { getCrane() }}>
//                                         <img src={cranetruckuser} className="image" alt="truckimag2" />
//                                         <div className="description">
//                                             <p>Crane Services - Heavy Vehicles</p>
//                                         </div>
//                                     </div>
//                                     <div className="imageWrapper">
//                                         <img src={advocateprotest} style={{ background: "radial-gradient(#000000, #00000024)" }} className="image" alt="truckimag2" />
//                                         <div className="description">
//                                             <p>Advocate services-legal issues</p>
//                                         </div>
//                                     </div>
//                                     <div className="imageWrapper">
//                                         <img src={mechanicuser} style={{ background: "radial-gradient(#6cd961, #00000024)" }} className="image" alt="truckimage" />
//                                         <div className="description">
//                                             <p>On-spot-repair - mechanic</p>
//                                         </div>
//                                     </div>

//                                     <div className="imageWrapper">
//                                         <img src={garageuser} style={{ background: "radial-gradient(rgb(254 0 0), rgba(0, 0, 0, 0.14))" }} className="image" alt="truckimage" />
//                                         <div className="description">
//                                             <p>Workshop Services - All at one palce</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div style={{
//                                 margin: "0px 10px 10px 10px", marginBottom: '35px'
//                             }}>
//                                 <div style={{ overflowX: 'auto',overflowY:'hidden', alignItems: 'center' ,scrollbarWith:'none', msOverflowStyle:"none"}}>
//                                     <div className='imageContainer' style={{
//                                         display: 'flex',
//                                         gap: "25px",
//                                         alignItems: 'center'
//                                     }}>
//                                         <div>
//                                             <img src={nearbyhospital} style={{ height: "35px", width: "35px", textAlign: 'center' }} />
//                                             <p style={{ fontSize: "10px", textAlign: 'center' }}>Near By Hospital</p>
//                                         </div>
//                                         <div>
//                                             <img src={nearbytoll} style={{ height: "35px", width: "40px", textAlign: 'center' }} />
//                                             <p style={{ fontSize: "10px", marginTop: "5px", textAlign: 'center' }}>Near By Toll</p>
//                                         </div>
//                                         <div>
//                                             <img src={nearbyRestaurant} style={{ height: "25px", width: "30px", textAlign: 'center' }} />
//                                             <p style={{ fontSize: "10px", marginTop: "5px", textAlign: 'center' }}>Near By Restaurant</p>
//                                         </div>
//                                         <div>
//                                             <img src={nearbyPetrolPump} style={{ height: "25px", width: "40px", textAlign: 'center' }} />
//                                             <p style={{ fontSize: "10px", marginTop: "5px", textAlign: 'center' }}>Near By Pump</p>
//                                         </div>
//                                         <div>
//                                             <img src={nearbyParking} style={{ height: "40px", width: "40px", textAlign: 'center', marginLeft: "5px", marginBottom: "8px" }} />
//                                             <p style={{ fontSize: "10px", textAlign: 'center' }}>Near By Parking</p>
//                                         </div>
//                                         <div>
//                                             <i className="fa fa-shopping-cart" style={{ fontSize: "25px", width: "40px", textAlign: "center", marginBottom: "8px" }}></i>
//                                             <p style={{ fontSize: "10px", textAlign: "center" }}>Near By Mall</p>
//                                         </div>
//                                         <div>
//                                             <i className="fa fa-train" style={{ fontSize: "25px", width: "40px", textAlign: "center", marginBottom: "8px" }}></i>
//                                             <p style={{ fontSize: "10px", textAlign: "center" }}>Near By Train Station</p>
//                                         </div>
//                                         <div>
//                                             <i className="fa fa-university" style={{ fontSize: "25px", width: "40px", textAlign: "center", marginBottom: "8px" }}></i>
//                                             <p style={{ fontSize: "10px", textAlign: "center" }}>Near By School</p>
//                                         </div>
//                                         <div>
//                                             <i className="fa fa-bed" style={{ fontSize: "25px", width: "40px", textAlign: "center", marginBottom: "8px" }}></i>
//                                             <p style={{ fontSize: "10px", textAlign: "center" }}>Near By Hotel</p>
//                                         </div>
//                                         <div>
//                                             <i className="fa fa-bus" style={{ fontSize: "25px", width: "40px", textAlign: "center", marginBottom: "8px" }}></i>
//                                             <p style={{ fontSize: "10px", textAlign: "center" }}>Near By Bus Stop</p>
//                                         </div>
//                                         <div>
//                                             <i class="fa fa-map-marker" style={{ fontSize: "25px", width: "40px", textAlign: 'center', marginLeft: "5px", marginBottom: "8px" }}></i>
//                                             <p style={{ fontSize: "10px", textAlign: 'center' }}>Other Services</p>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>


//                             <div style={{ position: "relative", height: "300px" }}>
//                                 <div
//                                     style={{
//                                         position: "absolute",
//                                         top: "-30px",
//                                         width: "100%",
//                                         background: "rgb(255 255 255 / 48%)",
//                                         padding: "8px",
//                                         borderRadius: "5px",
//                                         zIndex: 10,
//                                     }}
//                                 >
//                                     <div style={{ display: "flex", alignItems: "center" }}>
//                                         <i
//                                             className="fa fa-truck"
//                                             style={{ fontSize: "20px", color: "rgb(0 0 0)", marginRight: "10px" }}
//                                         ></i>
//                                         <h4
//                                             style={{
//                                                 fontSize: "15px",
//                                                 margin: "0",
//                                                 fontWeight: "bold",
//                                                 color: "#333",
//                                             }}
//                                         >
//                                             All Accident Services
//                                         </h4>
//                                     </div>
//                                     <p
//                                         style={{
//                                             fontSize: "12px",
//                                             margin: "5px 0 0 34px",
//                                             color: "red",
//                                         }}
//                                     >
//                                         From on-spot to workshop, everything will be handled.
//                                     </p>
//                                 </div>


//                                 {/* Carousel Section */}
//                                 <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: "10px" }}>
//                                     <div className="carousel-inner">
//                                         <div className="carousel-item active">
//                                             <img
//                                                 src={craneworkdoing}
//                                                 style={{
//                                                     maxHeight: "500px",
//                                                     width: "100%",
//                                                     objectFit: "scale-down",
//                                                     borderRadius: "10px"
//                                                 }}
//                                                 className="d-block w-100"
//                                                 alt="Slide 1"
//                                             />
//                                         </div>
//                                         <div className="carousel-item">
//                                             <img
//                                                 src={craneworkdoing}
//                                                 style={{
//                                                     maxHeight: "500px",
//                                                     width: "100%",
//                                                     objectFit: "cover",
//                                                     borderRadius: "10px"
//                                                 }}
//                                                 className="d-block w-100"
//                                                 alt="Slide 2"
//                                             />
//                                         </div>
//                                         <div className="carousel-item">
//                                             <img
//                                                 src={craneworkdoing}
//                                                 style={{ maxHeight:"500px", width:"100%", objectFit:"cover", borderRadius:"10px"}}
//                                                 className="d-block w-100"
//                                                 alt="Slide 3"
//                                             />
//                                         </div>
//                                         <div className="carousel-item">
//                                             <img
//                                                 src={craneworkdoing}
//                                                 style={{ maxHeight:"500px", width:"100%", objectFit:"cover", borderRadius:"10px"}}
//                                                 className="d-block w-100"
//                                                 alt="Slide 3"
//                                             />
//                                         </div>
//                                     </div>
//                                     <button
//                                         className="carousel-control-prev"
//                                         type="button"
//                                         data-bs-target="#imageCarousel"
//                                         data-bs-slide="prev"
//                                     >
//                                         <span
//                                             className="carousel-control-prev-icon"
//                                             aria-hidden="true"
//                                         ></span>
//                                         <span className="visually-hidden">Previous</span>
//                                     </button>
//                                     <button
//                                         className="carousel-control-next"
//                                         type="button"
//                                         data-bs-target="#imageCarousel"
//                                         data-bs-slide="next"
//                                     >
//                                         <span
//                                             className="carousel-control-next-icon"
//                                             aria-hidden="true"
//                                         ></span>
//                                         <span className="visually-hidden">Next</span>
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* <div className="start-container" style={{
//                                 filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
//                                 opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
//                                 pointerEvents: isImageContainerVisible ? "none" : "auto" // Disable clicking
//                             }}>
//                                 <div className="imageContainer">
//                                     <div className="imageWrapper" onClick={(e) => { getCrane() }}>
//                                         <img src={cranetruckuser} className="image" alt="truckimag2" />
//                                         <div className="description">
//                                             <p>Crane Services - Heavy Vehicles</p>
//                                         </div>
//                                     </div>
//                                     <div className="imageWrapper">
//                                         <img src={advocateprotest} style={{ background: "radial-gradient(#000000, #00000024)" }} className="image" alt="truckimag2" />
//                                         <div className="description">
//                                             <p>Advocate services-legal issues</p>
//                                         </div>
//                                     </div>
//                                     <div className="imageWrapper">
//                                         <img src={mechanicuser} style={{ background: "radial-gradient(#6cd961, #00000024)" }} className="image" alt="truckimage" />
//                                         <div className="description">
//                                             <p>On-spot-repair - mechanic</p>
//                                         </div>
//                                     </div>

//                                     <div className="imageWrapper">
//                                         <img src={garageuser} style={{ background: "radial-gradient(rgb(254 0 0), rgba(0, 0, 0, 0.14))" }} className="image" alt="truckimage" />
//                                         <div className="description">
//                                             <p>Workshop Services - All at one palce</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div> */}
//                             <div>
//                                 <FirstPageDesigns/> 
//                             </div>

//                             {isImageContainerVisible && (
//                                 <div className="image-container">
//                                     <div className="background-image"></div>

//                                     <div className="text-overlay">
//                                         <p style={{ fontSize: '14px', padding: "5px", border: '3px solid blue', borderImage: 'linear-gradient(to top, white 10% , black 90%) 1', textAlign: 'center', borderRadius: '30px', fontWeight: "bold" }}>
//                                             Case Assigned!
//                                         </p>

//                                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                             <p style={{ textAlign: "center", marginLeft: "100px", marginTop: "10px", fontSize: "14px" }}>Vendor Fare </p>
//                                             <div style={{ marginTop: "5px", width: "30px", background: '#ccb300', border: "1px solid red", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>4.5</div>
//                                         </div>
//                                         <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>₹ 10,000</h1>



//                                         {/* <hr /> */}
//                                         <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
//                                             <p style={{ textAlign: "center", marginTop: "7px", fontSize: '14px', paddingRight: '10px', fontWeight: 'bold' }}>Vendor Distance :  </p>
//                                             <p style={{ color: 'Green', marginTop: "5px", fontSize: "19px" }}>5 km</p>
//                                         </div>

//                                         <div className="text-overlay text-overlay2">
//                                             <h4 style={{ marginBottom: '5px', fontSize: "11px", marginTop: "10px" }}>Location:</h4>
//                                             <p style={{ fontSize: '11px', gap: "10px" }}>205 D/15, Indl Estate, L B S Marg, Opp I O L, Near Amrutnagar, Near Ayodhya Chowk, Rohini, K Marg, Lower Parel Mumbai Maharashtra 4000067</p>
//                                             <p style={{
//                                                 fontSize: '12px',
//                                                 marginTop: "5px",
//                                                 background: "white",
//                                                 padding: "10px",
//                                                 border: '2px solid #000000',
//                                                 textAlign: 'center',
//                                                 borderRadius: '30px',
//                                                 fontWeight: "bold",
//                                                 color: "blue",
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: "center",
//                                                 position: "relative",
//                                                 cursor: "pointer",
//                                                 maxWidth: "400px",
//                                                 minWidth: "150px"
//                                             }} onClick={goToMap}>
//                                                 Vendor Current Location
//                                                 <KeyboardDoubleArrowRightIcon style={{
//                                                     position: "absolute",
//                                                     left: '10px'
//                                                 }} />
//                                             </p>
//                                             <p style={{
//                                                 fontSize: '11px',
//                                                 marginTop: "5px",
//                                                 background: "green",
//                                                 padding: "10px",
//                                                 border: '1px solid blue',
//                                                 textAlign: 'center',
//                                                 borderRadius: '30px',
//                                                 fontWeight: "bold",
//                                                 color: "white",
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: "center",
//                                                 position: "relative",
//                                                 cursor: "pointer"
//                                             }} >
//                                                 <KeyboardDoubleArrowRightIcon style={{
//                                                     position: "absolute",
//                                                     left: '10px'
//                                                 }} />
//                                                 Accept Vendor's Deal
//                                             </p>

//                                             <p style={{
//                                                 fontSize: '11px',
//                                                 marginTop: "5px",
//                                                 background: "#8f4325",
//                                                 padding: "10px",
//                                                 border: '1px solid blue',
//                                                 textAlign: 'center',
//                                                 borderRadius: '30px',
//                                                 fontWeight: "bold",
//                                                 color: "white",
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: "center",
//                                                 position: "relative",
//                                                 cursor: "pointer"
//                                             }} >
//                                                 Reject Deal<KeyboardDoubleArrowLeftIcon style={{
//                                                     position: 'absolute',
//                                                     right: "10px"
//                                                 }} />
//                                             </p>
//                                         </div>

//                                     </div>
//                                 </div>
//                             )}
//                             {data.map((item, index) => (
//                                 <div>
//                                     <p style={{ fontWeight: "bold" }}>New Case</p>
//                                     <div key={index} style={{
//                                         filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
//                                         opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
//                                         pointerEvents: isImageContainerVisible ? "none" : "auto",
//                                         border: "1px solid teal",
//                                         minWidth: "280px",
//                                         margin: '10px',
//                                         boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
//                                         borderRadius: "5px",
//                                         padding: "10px",
//                                         maxWidth: "410px"
//                                     }}>

//                                         <div>
//                                             <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
//                                                 <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
//                                                 <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
//                                             </div>
//                                         </div>

//                                         <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
//                                             <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}> Time for process:</p>
//                                             <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>40 Minutes</span>
//                                         </div>

//                                         <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
//                                             <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Current Status:</p>
//                                             <span style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                                 marginLeft: "5px",
//                                                 padding: "3px 10px",
//                                                 fontSize: "12px",
//                                                 borderRadius: "10px",
//                                                 color: 'blue',
//                                                 border: "1px solid green",
//                                                 background: 'white'
//                                             }}>Processing...</span>
//                                         </div>

//                                         <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
//                                             <p style={{
//                                                 fontSize: '11px',
//                                                 marginTop: "5px",
//                                                 background: "green",
//                                                 padding: "10px",
//                                                 border: '1px solid blue',
//                                                 textAlign: 'center',
//                                                 borderRadius: '30px',
//                                                 fontWeight: "bold",
//                                                 color: "white",
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: "center",
//                                                 position: "relative",
//                                                 cursor: "pointer",
//                                                 margin: '5px 5px 5px 5px',
//                                                 maxWidth: "400px",
//                                                 minWidth: "150px",
//                                             }} onClick={() => { changeCaseDetails(item, index) }}>
//                                                 <KeyboardDoubleArrowRightIcon style={{
//                                                     position: "absolute",
//                                                     left: '10px'
//                                                 }} />
//                                                 View More
//                                             </p>
//                                             <p style={{
//                                                 fontSize: '11px',
//                                                 marginTop: "5px",
//                                                 background: "white",
//                                                 padding: "10px",
//                                                 border: '2px solid #000000',
//                                                 textAlign: 'center',
//                                                 borderRadius: '30px',
//                                                 fontWeight: "bold",
//                                                 color: "blue",
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: "center",
//                                                 position: "relative",
//                                                 cursor: "pointer",
//                                                 maxWidth: "400px",
//                                                 minWidth: "150px",
//                                                 margin: '5px 5px 5px 5px',
//                                                 height: "30px"
//                                             }} onClick={(e) => { cancleCaseProcedureFunc(item) }}>
//                                                 Cancel Process
//                                                 <img src={crossUser} style={{
//                                                     position: "absolute",
//                                                     right: '10px', width: '20px', height: '20px'
//                                                 }} />
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             {isCancelContainerVisible && (

//                                 <div style={{
//                                     position: "fixed",
//                                     top: 0,
//                                     left: 0,
//                                     width: "100%",
//                                     height: "100%",
//                                     backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
//                                     zIndex: 1000, // ensure it appears above other content
//                                     display: "flex",
//                                     alignItems: "flex-end", // positions the container at the bottom
//                                     justifyContent: "center",
//                                     animation: "slideUp 0.5s ease-out" // apply the animation
//                                 }}>

//                                     <div style={{ position: "absolute", width: "90%", maxWidth: "600px", marginBottom: "430px" }}>
//                                         {/* Cross Icon */}
//                                         <img src={crossUser} onClick={(e) => {
//                                             setIsCancelContainerVisible(false)
//                                             setReasonsForDrop(false)
//                                             setSelectedReasons([])
//                                             setOtherReason('')
//                                         }}
//                                             style={{

//                                                 position: "absolute",
//                                                 top: "-20px", // Position slightly above the container
//                                                 left: "50%",
//                                                 width: '25px',
//                                                 height: '25px',
//                                                 cursor: "pointer",
//                                                 zIndex: 1001, // Ensure it’s above other elements
//                                                 filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
//                                             }}
//                                         // Add a close function if needed
//                                         />
//                                     </div>


//                                     <div className="image-container" style={{
//                                         backgroundColor: "#ffffff",
//                                         padding: "20px",
//                                         borderRadius: "15px 15px 0px 0px",
//                                         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//                                         maxWidth: "600px",
//                                         width: "97%",
//                                         marginBottom: "20px"
//                                     }}>

//                                         <div className="background-image"></div>

//                                         <div className="text-overlay">
//                                             <p style={{
//                                                 fontSize: '14px',
//                                                 padding: "5px",
//                                                 border: '3px solid red',
//                                                 borderImage: 'linear-gradient(to top, white 10% , lightblue 90%) 1',
//                                                 textAlign: 'center',
//                                                 borderRadius: '30px',
//                                                 fontWeight: "bold",
//                                                 color: 'red'
//                                             }}>
//                                                 Drop Case Procedure!
//                                             </p>
//                                             {reasonsForDrop == false && (
//                                                 <div>
//                                                     <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "black" }}>We are almost there to get you perfect crane service!!! </p>
//                                                     <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", textAlign: "center", color: "red" }}>Still want to opt-out for ❓ 🤔 </p>
//                                                     <div className="text-overlay text-overlay2" style={{ height: "40%" }}>
//                                                         <p style={{
//                                                             fontSize: '11px',
//                                                             marginTop: "5px",
//                                                             background: "green",
//                                                             padding: "10px",
//                                                             border: '1px solid blue',
//                                                             textAlign: 'center',
//                                                             borderRadius: '30px',
//                                                             fontWeight: "bold",
//                                                             color: "white",
//                                                             display: 'flex',
//                                                             alignItems: 'center',
//                                                             justifyContent: "center",
//                                                             position: "relative",
//                                                             cursor: "pointer"
//                                                         }} onClick={(e) => {
//                                                             setReasonsForDrop(false)
//                                                             setIsCancelContainerVisible(false)
//                                                             setSelectedReasons([])
//                                                             setOtherReason('')
//                                                         }}>
//                                                             Don't Drop
//                                                             <KeyboardDoubleArrowLeftIcon style={{
//                                                                 position: 'absolute',
//                                                                 right: "10px"
//                                                             }} />
//                                                             <KeyboardDoubleArrowRightIcon style={{
//                                                                 position: 'absolute',
//                                                                 left: "10px"
//                                                             }} />
//                                                         </p>
//                                                         <p style={{
//                                                             fontSize: '11px',
//                                                             marginTop: "5px",
//                                                             background: "#8f4325",
//                                                             padding: "10px",
//                                                             border: '1px solid blue',
//                                                             textAlign: 'center',
//                                                             borderRadius: '30px',
//                                                             fontWeight: "bold",
//                                                             color: "white",
//                                                             display: 'flex',
//                                                             alignItems: 'center',
//                                                             justifyContent: "center",
//                                                             position: "relative",
//                                                             cursor: "pointer"
//                                                         }} onClick={() => setReasonsForDrop(true)}>
//                                                             Drop Case
//                                                             <KeyboardDoubleArrowLeftIcon style={{
//                                                                 position: 'absolute',
//                                                                 right: "10px"
//                                                             }} />
//                                                             <KeyboardDoubleArrowRightIcon style={{
//                                                                 position: 'absolute',
//                                                                 left: "10px"
//                                                             }} />
//                                                         </p>
//                                                     </div>
//                                                 </div>)}

//                                             {reasonsForDrop == true && (
//                                                 <div>
//                                                     <div>
//                                                         <div style={{ background: "rgb(209 209 209 / 29%)" }}>

//                                                             <div style={{ margin: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
//                                                                 {reasons.map((reason) => (
//                                                                     <button
//                                                                         key={reason}
//                                                                         onClick={() => handleSelectReason(reason)}
//                                                                         style={{
//                                                                             fontSize: '14px',
//                                                                             display: "flex",
//                                                                             justifyContent: "center",
//                                                                             alignItems: "center",
//                                                                             padding: "10px",
//                                                                             borderRadius: "20px",
//                                                                             backgroundColor: selectedReasons.includes(reason) ? "yellow" : "white",
//                                                                             border: "1px solid black",
//                                                                             cursor: "pointer",
//                                                                             boxShadow: selectedReasons.includes(reason) ? "0 4px 8px rgba(0,0,0,1.2)" : "0 3px 6px rgba(0, 0, 0, 0.5)"
//                                                                         }}
//                                                                     >
//                                                                         {reason}
//                                                                     </button>
//                                                                 ))}
//                                                             </div>


//                                                             <label className="form-field" style={{ color: '#3f3c00', marginTop: '20px', fontSize: "14px" }}>
//                                                                 <p style={{ textAlign: "left" }}> Other Reason  : </p>
//                                                                 <textarea
//                                                                     style={{ margin: "10px 10px 5px 0px", width: "280px" }} className="form-control" name="otherReason" value={otherReason} onChange={(e) => setOtherReason(e.target.value)} />
//                                                             </label>

//                                                             {errorMessage && <div style={{ color: "red", margin: "10px 10px 20px 10px", marginBottom: "10px" }}>{errorMessage}</div>}


//                                                             <div>
//                                                                 {isLoading && (
//                                                                     <div style={{ marginTop: '10px', display: "flex", justifyContent: "center", alignItems: 'center' }}>
//                                                                         <ClipLoader color="black" loading={isLoading} />
//                                                                         <div style={{ marginTop: '10px', color: 'black' }}> Please Wait...</div>
//                                                                     </div>
//                                                                 )}
//                                                                 {alreadyCancelled && (<div class="alert alert-danger" role="alert">
//                                                                     You have already Cancelled Case !!!
//                                                                 </div>)}
//                                                                 <p type="submit"
//                                                                     style={{
//                                                                         fontSize: '11px',
//                                                                         marginTop: "5px",
//                                                                         background: "#8f4325",
//                                                                         padding: "10px",
//                                                                         border: '1px solid blue',
//                                                                         textAlign: 'center',
//                                                                         borderRadius: '30px',
//                                                                         fontWeight: "bold",
//                                                                         color: "white",
//                                                                         display: 'flex',
//                                                                         alignItems: 'center',
//                                                                         justifyContent: "center",
//                                                                         position: "relative",
//                                                                     }}
//                                                                     disabled={isLoading}
//                                                                     onClick={(e) => { cancelingOrder(selectedItem) }}
//                                                                 >
//                                                                     < NotInterestedIcon style={{
//                                                                         position: 'absolute',
//                                                                         left: "70px"
//                                                                     }} />Confirm Drop Case
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {caseDetailsHere && (
//                                 <div
//                                     style={{
//                                         position: "fixed",
//                                         top: 0,
//                                         left: 0,
//                                         width: "100%",
//                                         height: "100%",
//                                         backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
//                                         zIndex: 1000,
//                                         display: "flex",
//                                         alignItems: "flex-end", // positions the container at the bottom
//                                         justifyContent: "center",
//                                         animation: "slideUp 0.5s ease-out",
//                                     }}
//                                 >
//                                     <div
//                                         style={{
//                                             position: "relative",
//                                             width: "97%",
//                                             maxWidth: "600px",
//                                             backgroundColor: "#fff", // white background for the content
//                                             borderRadius: "15px 15px 0px 0px",
//                                             // marginBottom: "30px",
//                                             maxHeight: "80%", // limit the height for scrollability
//                                             overflowY: "auto", // enables vertical scrolling
//                                             padding: "20px",
//                                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
//                                         }}
//                                     >
//                                         <img
//                                             src={crossUser}
//                                             onClick={() => {
//                                                 setCaseDetailsHere(false)
//                                                 getData()
//                                             }}
//                                             style={{
//                                                 position: "fixed",
//                                                 left: "calc(100% - 35px)",
//                                                 width: "25px",
//                                                 height: "25px",
//                                                 cursor: "pointer",
//                                                 zIndex: 1001,
//                                                 filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
//                                             }}
//                                         />

//                                         <Registration item={selectedItem} onUpdated={handleUpdate} />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                     </div>
//                     <div>
//                         <BottomNavigationBar />
//                     </div>
//                 </div>)}
//         </div>
//     )
// }



// export default FirstPage;



import React from 'react';
import { MapPin, Star, Clock, Truck, ChevronRight } from 'lucide-react';

function FirstPage() {
    return (
        <div className="w-full max-w-screen-md mx-auto min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="bg-white shadow rounded-xl p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
            </div>

            {/* Service Details */}
            <div className="bg-white shadow rounded-xl p-4 mb-4">
                <div className="flex space-x-4 items-center">
                    <img
                        src="https://images.unsplash.com/photo-1562523331-be7851533dc6?auto=format&fit=crop&q=80"
                        alt="Crane Service"
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">Crane Service</h3>
                        <p className="text-sm text-gray-600">Heavy-duty crane operations with expert operators.</p>
                        <div className="flex items-center space-x-2 text-sm mt-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-gray-800 font-semibold">4.9</span>
                            <span className="text-gray-500">(500+ ratings)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pickup and Drop Location */}
            <div className="bg-white shadow rounded-xl p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Location Details</h3>
                <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-red-500 mr-3" />
                    <div>
                        <p className="text-gray-800 font-medium">Pickup Location</p>
                        <p className="text-gray-600 text-sm">123 Street, Location A</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                        <p className="text-gray-800 font-medium">Drop Location</p>
                        <p className="text-gray-600 text-sm">456 Avenue, Location B</p>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow rounded-xl p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Base Fare</p>
                    <p className="text-gray-800 font-medium">$50</p>
                </div>
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Distance Charges</p>
                    <p className="text-gray-800 font-medium">$20</p>
                </div>
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Taxes</p>
                    <p className="text-gray-800 font-medium">$5</p>
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between">
                    <p className="text-gray-800 font-bold">Total Amount</p>
                    <p className="text-gray-800 font-bold">$75</p>
                </div>
            </div>

            {/* ETA and Confirmation */}
            <div className="bg-white shadow rounded-xl p-4 mb-4">
                <div className="flex items-center mb-4">
                    <Clock className="w-5 h-5 text-gray-500 mr-3" />
                    <p className="text-gray-800">Estimated Time of Arrival: <span className="font-bold">20 min</span></p>
                </div>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Confirm Service
                </button>
            </div>

            {/* Additional Details */}
            <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Service Details</h3>
                <p className="text-gray-600 text-sm">
                    Our crane services are equipped with state-of-the-art machinery to handle heavy-duty recovery operations. 
                    Operated by trained professionals, we ensure safety and efficiency in every task.
                </p>
            </div>
        </div>
    );
}

export default FirstPage;
