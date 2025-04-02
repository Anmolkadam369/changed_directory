import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import ConfirmationModal from '../../../../Component/CompanyAdmin/CompanyAdminHome/ConfirmModel';
import claimproassist from '../../../../Assets/claimproassistwithoutName.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from 'react-helmet-async';
import StoreIcon from "@mui/icons-material/Store";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from '@mui/icons-material/Badge';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HailIcon from '@mui/icons-material/Hail';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import userImg from "../../../../Assets/userImg.jpg";


const Admin = () => {

    const [showUserId, setShowUserId] = useState(false);
    const [userImage, setUserImage] = useState(true);

    const [getData, setGetData] = useState({});
    // console.log("getData12309", getData)
    const [highlightData, setHighlightData] = useState(false);

    let navigate = useNavigate();


    // const [showVendorOptions, setShowVendorOptions] = useState(false);
    // const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    // const [showVehicleInfo, setShowVehicleInfo] = useState(false);
    // const [showReportsOptions, setShowReportsOptions] = useState(false);
    // const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);

    // const [showAssignedVehicleReport, setShowAssignedVehicleReport] = useState(false);

    // const [showAddVendor, setShowAddVendor] = useState(false);
    // const [addSurveyor, setAddSurveyor] = useState(false);
    // const [viewSurveyor, setViewSurveyor] = useState(false);
    // const [startingPage, setStartingPage] = useState(true);
    // const [showViewVendor, setShowViewVendor] = useState(false);
    // const [showAddCustomer, setShowAddCustomer] = useState(false);
    // const [showViewCustomer, setShowViewCustomer] = useState(false);
    // console.log("showViewCustomer", showViewCustomer)
    // const [showVehicleClaim, setShowVehicleClaim] = useState(false);
    // const [showAddEmployee, setShowAddEmployee] = useState(false);
    // const [showVehicleClaimView, setShowVehicleClaimView] = useState(false);
    // const [addImages, setaddImages] = useState(false);
    // const [accidendVehicle, setaccidendVehicle] = useState(false);
    // const [vendorResponsing, setVendorResponsing] = useState(false);
    // const [showEmployeeView, setShowEmployeeView] = useState(false);
    // const [visitorForm, setVisitorForm] = useState(false);
    // const [customerEnquiryForm, setCustomerEnquiryForm] = useState(false);
    // const [showPotentialVendor, setShowPotentialVendor] = useState(false);
    // const [showInitialReg, setShowInitialReg] = useState(false);


    // const [showVisitorForm, setShowVisitorForm] = useState(false);
    const dropdownRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const resetStates = () => {
        // setShowAddVendor(false);
        // setShowViewVendor(false);
        // setAddSurveyor(false);
        // setViewSurveyor(false);
        // setShowViewCustomer(false);
        // setShowAddCustomer(false);
        // setStartingPage(false);
        // setShowVehicleClaim(false);
        // setShowVehicleClaimView(false);
        // setaddImages(false);
        // setaccidendVehicle(false);
        // setVendorResponsing(false);
        // setShowAddEmployee(false);
        // setShowEmployeeView(false);
        // setVisitorForm(false);
        // setCustomerEnquiryForm(false);
        // setShowPotentialVendor(false);
        // setShowInitialReg(false);
    
        // // Preserve any state passed as an exception
        // Object.entries(exceptionState).forEach(([key, value]) => {
        //     if (typeof value === "boolean") {
        //         eval(`set${key.charAt(0).toUpperCase() + key.slice(1)}(${value})`);
        //     }
        // });
    };
    

// useEffect(() => {
//     console.log('Navigating...', { showAddVendor, startingPage });

//     if (showAddVendor) {
//         navigate('/vendor-form');
//         return;
//     }
//     if (showViewVendor) {
//         navigate('/vendor-view-form');
//         return;
//     }
//     if (showPotentialVendor) {
//         navigate('/signup-form-submissions');
//         return;
//     }
//     if (showAddCustomer) {
//         navigate('/customer-form');
//         return;
//     }
//     if (showViewCustomer) {
//         navigate('/customer-view-form');
//         return;
//     }
//     if (showAddEmployee) {
//         navigate('/employee-form');
//         return;
//     }
//     if (showEmployeeView) {
//         navigate('/view-employee');
//         return;
//     }
//     if (showInitialReg) {
//         navigate('/signup-form-view');
//         return;
//     }
//     if (showVehicleClaim) {
//         navigate('/accident-vehicle-register-update');
//         return;
//     }
//     if (showVehicleClaimView) {
//         navigate('/view-accident-vehicle-register-details');
//         return;
//     }
//     if (accidendVehicle) {
//         navigate('/accident-vehicle');
//         return;
//     }
//     if (vendorResponsing) {
//         navigate('/vendor-response');
//         return;
//     }
//     if (addSurveyor) {
//         navigate('/add-surveyor');
//         return;
//     }
//     if (viewSurveyor) {
//         navigate('/add-surveyor');
//         return;
//     }
//     if (addImages) {
//         navigate('/daily-image-upload');
//         return;
//     }
    

//     if (startingPage) {
//         navigate('/admin-dashboard-vendor-customer');
//     }
// }, [
//     startingPage, showAddVendor, showViewVendor, showPotentialVendor,
//     showAddCustomer, showViewCustomer, showAddEmployee, showEmployeeView,
//     showInitialReg, showVehicleClaim, showVehicleClaimView, accidendVehicle,
//     vendorResponsing, addSurveyor, viewSurveyor, addImages, customerEnquiryForm, visitorForm
// ]);


    const vendorData = [10, 5, 15, 20];
    const vendorLabels = ['Advocate', 'Crane', 'Mechanic', 'Workshops'];

    const customerData = [30, 70];
    const customerLabels = ['Bulk Customers', 'Single Customers'];

    // const token = useRecoilValue(tokenState);
    // const userId = useRecoilValue(userIdState);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const loginId = localStorage.getItem("loginId")
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("token"));
    const [refreshUserId, setRefreshUserId] = useState(localStorage.getItem("userId"));
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);
    const [notificationSent, setNotificationSent] = useState(false);



    const handleSignOutClick = () => { setModalOpen(true) };

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault(); // Prevent the default behavior
    //         event.returnValue = ''; // Display confirmation dialog
    //     };

    //     const handlePopState = (event) => {
    //         // Call sign-out logic for back navigation
    //         const confirmSignOut = window.confirm('Do you want to sign out?');
    //         if (confirmSignOut) {
    //             handleSignOutClick(); // Call your sign-out logic
    //         } else {
    //             // Optionally, push the state back to prevent navigating away
    //             window.history.pushState(null, null, window.location.pathname);
    //         }
    //     };

    //     // Push a new state to ensure popstate event is triggered on back navigation
    //     window.history.pushState(null, null, window.location.pathname);

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     window.addEventListener('popstate', handlePopState);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         window.removeEventListener('popstate', handlePopState);
    //     };
    // }, []);

    const handleConfirmSignOut = async () => {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/logout/${userId}`, { loginId }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 200) {
            localStorage.setItem("token", "");
            localStorage.setItem("userId", "");
            localStorage.setItem("loginId", "");
            localStorage.setItem("department", "");
            setRefreshToken("");
            setRefreshUserId("");
            setModalOpen(false);
            navigate('/loginPage')
        }
        else {
            setModalOpen(true);
        }
    };

    const handleCancelSignOut = () => { setModalOpen(false) };



    // useEffect(() => {
    //     const handleResize = () => {
    //         console.log("size", window.innerWidth)
    //         if (window.innerWidth > 768) setIsSidebarOpen(true);
    //         else setIsSidebarOpen(false);
    //     };
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    const tokenRef = useRef(null);
    const [lastMessageId, setLastMessageId] = useState(null);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    };


    const handleSearchClick = () => {
        // setHighlightData(true);
        setTimeout(() => setHighlightData(false), 2000); // Highlight for 2 seconds
    };

    // const requestPermission = async () => {
    //     try {
    //         const permission = await Notification.requestPermission();
    //         if (permission === 'granted') {
    //             if (!tokenRef.current) {
    //                 tokenRef.current = await getToken(messaging, { vapidKey: 'BCSLSM0MqLiL4BjJrDEhYf6z8MlsxHkbGDRZjmtrdsbt352tsRknucbpSYRDQF2jGrd2zvQNnpqsBLcoVY7XyKg' });
    //                 console.log("Generated token:", tokenRef.current);
    //             }
    //             await sendNotification(tokenRef.current);
    //         } else {
    //             alert('Notification permission denied.');
    //         }
    //     } catch (error) {
    //         console.error("Error requesting notification permission:", error);
    //     }
    // };

    // useEffect(() => {
    //     requestPermission();
    // }, []);

    // const sendNotification = async (token) => {
    //     const currentTime = getCurrentTime();

    //     const payload = {
    //         token,
    //         notification: {
    //             title: 'Page Refreshed',
    //             body: `Notification on the time of ${currentTime} from app`,
    //         },
    //         data: {
    //             messageId: `${new Date().getTime()}`, // Generate a unique message ID
    //         },
    //     };

    //     console.log("Sending notification with payload:", payload);

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sendNotification`, payload, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         console.log("Notification sent:", response.data);
    //     } catch (error) {
    //         console.error("Error sending notification:", error);
    //         console.log("Error details:", error.response ? error.response.data : error.message);
    //     }
    // };
    // 
    // useEffect(() => {
    //     onMessage(messaging, (payload) => {
    //         console.log('Message received.', payload);

    //         const receivedMessageId = payload.data?.messageId;
    //         if (receivedMessageId && receivedMessageId !== lastMessageId) {
    //             setLastMessageId(receivedMessageId);

    //             const notificationTitle = payload.notification.title;
    //             const notificationOptions = {
    //                 body: payload.notification.body,
    //                 // icon: '/firebase-logo.png'
    //             };

    //             new Notification(notificationTitle, notificationOptions);
    //         }
    //     });
    // }, [lastMessageId]); 

    const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';
    const effectRan = useRef(false);
    const urlBase64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };

    const [isFirstCallComplete, setIsFirstCallComplete] = useState(false);
    const [notFoundPage, setNotFoundPage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/rightPerson/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("responseing", response.data);

                if (response.data.message === "right Person!!!") {
                    setIsFirstCallComplete(true);
                }
                else {
                    setNotFoundPage(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (userId != "") fetchData();
    }, [userId, token])

    console.log("isfirscalling", isFirstCallComplete)


    useEffect(() => {
        if (isFirstCallComplete && effectRan.current === false) {
            const sendLoginNotification = async () => {
                try {
                    console.log('Registering service worker...');
                    const registration = await navigator.serviceWorker.register('/service-worker.js');
                    console.log('Service worker registered:', registration);

                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                    });
                    console.log('Push Manager subscription:', subscription);

                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscription/${userId}`, subscription, { headers: { Authorization: `Bearer ${token}` } });
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notification`, { message: 'You have logged in right now' });

                } catch (error) {
                    console.error('Error sending login notification:', error);
                }
            };

            sendLoginNotification();
            effectRan.current = true;
        }
    }, [isFirstCallComplete]);
    
    function showOfflineAlert() {
        const alertBox = document.createElement("div");
        alertBox.id = "offlineAlert";
        alertBox.innerText = "No internet connection. Please turn on WiFi.";
        alertBox.style.position = "fixed";
        alertBox.style.top = "10px";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translateX(-50%)";
        alertBox.style.background = "red";
        alertBox.style.color = "white";
        alertBox.style.padding = "10px 20px";
        alertBox.style.borderRadius = "5px";
        alertBox.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        alertBox.style.zIndex = "1000";
        document.body.appendChild(alertBox);
    }
    
    function removeOfflineAlert() {
        const alertBox = document.getElementById("offlineAlert");
        if (alertBox) {
            alertBox.remove();
        }
    }
    
    window.addEventListener("offline", showOfflineAlert);
    window.addEventListener("online", removeOfflineAlert);
    


    useEffect(() => {
        if (isFirstCallComplete) {
            const findUserById = async (userId) => {
                try {
                    let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/findById/${userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    console.log("daa", response.data)
                    if (response.data.message === "No user found") {
                        response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getEmployee/${userId}/${userId}`);
                    }
                    console.log("daa2", response.data)

                    console.log("findbyId", response.data.data[0]);
                    setGetData(response.data.data[0])
                }
                catch (error) {
                    console.log("error", error.message)
                }
            }
            if (userId != "") {
                findUserById(userId)

            }
        }
    }, [isFirstCallComplete, userId]);

    

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const getStyle = (startingPage) => {
        if (startingPage) {
            return { paddingLeft: "0px", marginLeft: '0px', backgroundColor: '#1a0c0c' };
        } else {
            return { paddingLeft: "0px", marginLeft: '0px' };
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowUserId(false);
        }
        if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (showUserId || isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserId, isSidebarOpen]);

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const showDashboard = () => {
        resetStates()
        // startingPage(true);
    }

    console.log("getData.randomId", getData)

    return (
        <div>

            {/* {getData.randomId || (getData.department === "IT" || getData.department === "Management" || getData.department === "Administration") ? ( */}
            <div className="admin-page" style={{ height: '70px' }} >
                <Helmet>
                    <title>Admin Page - Claimpro</title>
                    <meta name="description" content="Admin Page." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/Admin`} /> 
                </Helmet>
                {isSidebarOpen ? (
                    <aside ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                        <ul>
                            <img src={claimproassist}
                                onClick={() => {
                                    navigate('/admin-dashboard-vendor-customer');
                                }}
                                alt="Dashboard Icon" className='company-img' style={{ cursor: 'pointer' }} />

                            <li className='li-class' onClick={() => {
                               navigate('/admin-dashboard-vendor-customer');
                            }}>
                                <SpaceDashboardIcon className="icon" />
                                Dashboard</li>
                            <ul>
                                <li classname="li-class" onClick={(e) => {
                                    //  navigate('/vendor-form');
                                }}>
                                    <StoreIcon className="icon" />
                                    Vendor
                                    {/* {showVendorOptions && ( */}
                                        <ul className='submenu'>
                                            <li classname="li-class" onClick={(e) => {
                                                 navigate('/vendor-form');
                                            }}>
                                                <AddBusinessIcon className="icon" />
                                                Add Vendor</li>
                                            <li classname="li-class" onClick={(e) => {
                                                navigate('/vendor-view-form');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowViewVendor(true);
                                            }}>
                                                <StoreIcon className="icon" />
                                                View Vendor</li>
                                            <li classname="li-class" onClick={(e) => {
                                                navigate('/signup-form-submissions');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowPotentialVendor(true);
                                            }}>
                                                <StoreIcon className="icon" />
                                                Sign-up</li>
                                        </ul>
                                    {/* )} */}
                                </li>
                            </ul>
                            <ul>
                                <li classname="li-class" onClick={(e) => {
                                    // e.stopPropagation();
                                    // setShowCustomerOptions(!showCustomerOptions);
                                    // resetStates();
                                    // setShowAddCustomer(true);
                                }}>
                                    <PersonOutlineIcon className="icon" />
                                    Customer
                                    {/* {showCustomerOptions && ( */}
                                        <ul className='submenu'>
                                            <li classname="li-class" onClick={(e) => {
                                                navigate('/customer-form');
                                                // resetStates();
                                                // e.stopPropagation();
                                                // setShowAddCustomer(true);
                                            }}>
                                                <PersonAddAltIcon className="icon" />
                                                Add </li>
                                            <li classname="li-class" onClick={(e) => {
                                                 navigate('/customer-view-form');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowViewCustomer(true);
                                            }}>
                                                <PersonOutlineIcon className="icon" />
                                                View </li>
                                        </ul>
                                    {/* )} */}
                                </li>
                            </ul>
                            <ul>
                                <li classname="li-class" onClick={(e) => {
                                    // e.stopPropagation();
                                    // setShowEmployeeOptions(!showEmployeeOptions);
                                    // resetStates();
                                    // setShowAddEmployee(true);
                                }}>
                                    <BadgeIcon className="icon" />
                                    Employee
                                    {/* {showEmployeeOptions && ( */}
                                        <ul className='submenu'>
                                            <li classname="li-class" onClick={(e) => {
                                                navigate('/employee-form');
                                                // resetStates();
                                                // e.stopPropagation();
                                                // setShowAddEmployee(true);
                                            }}>
                                                <PersonAddAltIcon className="icon" />
                                                Add </li>
                                            <li classname="li-class" onClick={(e) => {
                                            navigate('/view-employee');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowEmployeeView(true);
                                            }}>
                                                <BadgeIcon className="icon" />
                                                View </li>
                                        </ul>
                                    {/* )} */}
                                </li>
                            </ul>
                            <ul>
                                <li classname="li-class" onClick={(e) => {
                                    // e.stopPropagation();
                                    // setShowVehicleInfo(!showVehicleInfo);
                                    // resetStates();
                                    // setShowVehicleClaim(true);
                                }}>

                                    <ReportIcon className="icon" />
                                    Vehicle Reported
                                    {/* {showVehicleInfo && ( */}
                                        <ul className='submenu'>
                                            <li classname="li-class" onClick={(e) => {
                                                 navigate('/signup-form-view');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowInitialReg(true);
                                            }}>
                                                <AppRegistrationIcon className="icon" />
                                                Initial Reg</li>
                                            <li classname="li-class" onClick={(e) => {
                                                navigate('/accident-vehicle-register-update');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowVehicleClaim(true);
                                            }}>
                                                <AppRegistrationIcon className="icon" />
                                                Register</li>
                                            <li classname="li-class" onClick={(e) => {
                                                navigate('/view-accident-vehicle-register-details');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setShowVehicleClaimView(true);
                                            }}>
                                                <ReportIcon className="icon" />
                                                View Register</li>
                                        </ul>
                                    {/* )} */}
                                </li>
                            </ul>




                            <ul>
                                <li onClick={(e) => {
                                    // e.stopPropagation();
                                    // setShowAssignedVehicleReport(!showAssignedVehicleReport);
                                    // resetStates();
                                    // setaccidendVehicle(true);
                                }}>
                                    <LocalShippingIcon className="icon" />
                                    Assigned Vehicle
                                    {/* {showAssignedVehicleReport && ( */}
                                        <div className='submenu'>
                                            <li onClick={(e) => {
                                                 navigate('/accident-vehicle');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setaccidendVehicle(true);
                                            }}>
                                                <AddBusinessIcon className="icon" />
                                                Vendors</li>
                                            <li onClick={(e) => {
                                                 navigate('/vendor-response');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setVendorResponsing(true);
                                            }}>
                                                <SensorOccupiedIcon className="icon" />
                                                Response</li>
                                        </div>
                                    {/* )} */}
                                </li>
                            </ul>


                            <ul>
                                <li onClick={(e) => {
                                    // e.stopPropagation();
                                    // setShowVisitorForm(!showVisitorForm);
                                    // resetStates();
                                    // setVisitorForm(true);
                                }}>
                                    <HailIcon className="icon" />
                                    Other Form
                                    {/* {showVisitorForm && ( */}
                                        <div className='submenu' style={{ width: '200px' }}>
                                            <li onClick={(e) => {
                                                 navigate('/Visitors-form');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setVisitorForm(true);
                                            }}>
                                                <HailIcon className="icon" />
                                                Visitor Form</li>
                                            <li onClick={(e) => {
                                             navigate('/customer-enquiry-form');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setCustomerEnquiryForm(true);
                                            }}>
                                                <HailIcon className="icon" />
                                                Customer Enquiry</li>
                                        </div>
                                    {/* )} */}
                                </li>
                            </ul>

                            <ul>
                                <li onClick={(e) => {
                                    // e.stopPropagation();
                                    // setShowVisitorForm(!showVisitorForm);
                                    // resetStates();
                                    // setVisitorForm(true);
                                }}>
                                    <HailIcon className="icon" />
                                    Surveryor
                                    {/* {showVisitorForm && ( */}
                                        <div className='submenu' style={{ width: '200px' }}>
                                            <li onClick={(e) => {
                                                 navigate('/add-surveyor');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setAddSurveyor(true);
                                            }}>
                                                <HailIcon className="icon" />
                                                Add Surveyor</li>
                                            <li onClick={(e) => {
                                                 navigate('/view-surveyor');
                                                // e.stopPropagation();
                                                // resetStates();
                                                // setViewSurveyor(true);
                                            }}>
                                                <HailIcon className="icon" />
                                                View Surveyor</li>
                                        </div>
                                    {/* )} */}
                                </li>
                            </ul>

                        </ul>  
                    </aside>
                ) : (
                    <div>
                        {window.innerWidth < 768 && (
                            <div className="menu-btn show" onClick={toggleSidebar}><MenuIcon /></div>
                        )}
                    </div>
                )}

                <main className="content" style={{ paddingLeft: "0px", marginLeft: '0px' , background:'#f4f4f4'}}>
                    <div className='first-container'>
                        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>

                        </div>
                        <div style={{ position:'fixed',display: 'flex', alignItems: 'center', marginTop:'-40px' , zIndex:'1000' ,top:'50px',  right:'20px' }}>
                            <CenterFocusWeakIcon className="icon" onClick={handleFullScreenToggle} style={{ cursor: 'pointer', marginRight: '20px', marginLeft: '20px', marginBottom: '0px' }} />
                            <div onClick={() => setShowUserId(!showUserId)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                {userImage ? (
                                    <img
                                        src={userImg}
                                        alt="User"
                                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                    />
                                ) : (
                                    <FaUserCircle size={30} />
                                )}
                            </div>

                            {showUserId && (
                                <div ref={dropdownRef} className={`dropdown-container ${showUserId ? 'show' : ''}`}>
                                    <div style={{
                                        marginBottom: '10px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginTop: "15px"
                                    }}>
                                        User Information
                                    </div>
                                    <span style={{
                                        fontSize: '14px',
                                        color: '#555',
                                        marginBottom: '10px'
                                    }}>
                                        User Name: {getData.username || getData.name} <br />
                                        User Id: {getData.randomId || getData.id}
                                    </span>
                                    <button
                                        onClick={handleSignOutClick}
                                        style={{
                                            padding: '10px 20px',
                                            fontSize: '14px',
                                            color: '#fff',
                                            backgroundColor: '#007bff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            width: '100%',
                                            textAlign: 'center',
                                            marginTop: "15px",
                                        }}>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirmSignOut} onCancel={handleCancelSignOut} />

                    {/* 
                        {
                            startingPage &&
                            <DummyDashboard />
                        }

                        {
                            showAddVendor &&
                            <VendorMasterForm />
                        }
                        {
                            showViewVendor &&
                            <VendorApproved />
                        }
                        {
                            showAddCustomer &&
                            <CustomerMaster />
                        }

                        {
                            visitorForm &&
                            <Visitors />
                        }

                        {
                            customerEnquiryForm &&
                            <CustomerEnquiry />
                        }

                        {
                            showPotentialVendor &&
                            <VendorSignUp />
                        }

                        {
                            showInitialReg &&
                            <InitialRegistration/>
                        }

                        {
                            showAddEmployee &&
                            <EmployeeForm />
                        }
                        {
                            showViewCustomer &&
                            <CustomerApproved />
                        }
                        {
                            showVehicleClaim &&
                            <AccidentVehicleRegUpdate />
                        }
                        {
                            showVehicleClaimView &&
                            <ViewVehicleInfo />
                        }
                        {
                            showEmployeeView &&
                            <EmployeeApproved />
                        }
                        {
                            accidendVehicle &&
                            <AccidentVehicle />
                        }

                        {
                            addImages &&
                            <ImageUpload />
                        }

                        {
                            vendorResponsing &&
                            <VendorResponse />
                        }

                        {
                            addSurveyor &&
                            <SurveyorMaster />
                        }
                        {
                            viewSurveyor &&
                            <SurveyorApproved />
                        } */}


                </main>
            </div>
            {/* ) : (
                <div>
                    <Login />
                </div>
            )} */}
        </div>
    );
};

export default Admin;
