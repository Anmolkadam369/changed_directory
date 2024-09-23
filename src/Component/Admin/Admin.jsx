import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';
import axios from 'axios';
import { useNavigate, Outlet } from 'react-router-dom';
import VendorMasterForm from '../VenderMaster/VendorMasterForm';
import PieChartComponent from '../PieChart/PieChartComponent'
import VendorApproved from '../VendorApproved/VendorApporoved';
import CustomerMaster from '../CustomerMaster/CustomerMaster';
import CustomerApproved from '../CustomerApporoved/CustomerApproved';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import VehicleClaimRegistration from '../VehicleClaimRegistration/VehicleClaimRegistration';
import ViewVehicleInfo from '../ViewVehicleInfo/ViewVehicleInfo';
import { FaUserCircle } from 'react-icons/fa';
import ConfirmationModal from '../ConfirmModel';
import ImageUpload from '../ImageUpload/ImageUpload';
import AccidentVehicle from '../AccidentVehicle/AccidentVehicle';
import AccidentVehicleRegUpdate from '../AccidentVehicle/AccidentVehicleRegUpdate';
import VendorResponse from '../Vendors/VendorsResponse';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg'
import backendUrl from "../../environment";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Dashboard from '../Dashboard/Dashboard';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../Firebase/Firebase';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import EmployeeApproved from '../EmployeeForm/EmployeeApproved';
import Visitors from '../Visitors/Visitors';
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
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import userImg from "../../Assets/userImg.jpg";
import CustomerEnquiry from '../CustomerEnquiry/CustomerEnquiry';
import DummyDashboard from '../Dashboard/DummyDashboard';
import NotFoundPage from '../NotFound';
import Login from '../Login/LoginPage';


const Admin = () => {

    const [showUserId, setShowUserId] = useState(false);
    const [userImage, setUserImage] = useState(true);

    const [getData, setGetData] = useState({});
    console.log("getData12309", getData)
    const [highlightData, setHighlightData] = useState(false);

    let navigate = useNavigate();


    const [showVendorOptions, setShowVendorOptions] = useState(false);
    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showVehicleInfo, setShowVehicleInfo] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);

    const [showAssignedVehicleReport, setShowAssignedVehicleReport] = useState(false);

    const [showAddVendor, setShowAddVendor] = useState(false);
    const [startingPage, setStartingPage] = useState(true);
    const [showViewVendor, setShowViewVendor] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showViewCustomer, setShowViewCustomer] = useState(false);
    const [showVehicleClaim, setShowVehicleClaim] = useState(false);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false);
    const [addImages, setaddImages] = useState(false);
    const [accidendVehicle, setaccidendVehicle] = useState(false);
    const [vendorResponsing, setVendorResponsing] = useState(false);
    const [showEmployeeView, setShowEmployeeView] = useState(false);
    const [visitorForm, setVisitorForm] = useState(false);
    const [customerEnquiryForm, setCustomerEnquiryForm] = useState(false);
    const [showVisitorForm, setShowVisitorForm] = useState(false);
    const dropdownRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const resetStates = () => {
        setShowAddVendor(false);
        setShowViewVendor(false);
        setShowViewCustomer(false);
        setShowAddCustomer(false);
        setStartingPage(false);
        setShowVehicleClaim(false);
        setShowVehicleClaimView(false);
        setaddImages(false);
        setaccidendVehicle(false);
        setVendorResponsing(false);
        setShowAddEmployee(false)
        setShowEmployeeView(false);
        setVisitorForm(false);
        setCustomerEnquiryForm(false)
    };

    const vendorData = [10, 5, 15, 20];
    const vendorLabels = ['Advocate', 'Crane', 'Mechanic', 'Workshops'];

    const customerData = [30, 70];
    const customerLabels = ['Bulk Customers', 'Single Customers'];

    // const token = useRecoilValue(tokenState);
    // const userId = useRecoilValue(userIdState);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("token"));
    const [refreshUserId, setRefreshUserId] = useState(localStorage.getItem("userId"));
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);
    const [notificationSent, setNotificationSent] = useState(false);



    const handleSignOutClick = () => { setModalOpen(true) };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            handleSignOutClick();
            event.preventDefault();
            // event.returnValue = ''; // Necessary for some browsers to show the dialog
        };

        const handlePopState = () => {
            handleSignOutClick();
        };

        // Push a new state to ensure popstate event is triggered on back navigation
        window.history.pushState(null, null, window.location.pathname);

        // window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleConfirmSignOut = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userId", "");
        setRefreshToken("");
        setRefreshUserId("");
        setModalOpen(false);
    };

    const handleCancelSignOut = () => { setModalOpen(false) };



    useEffect(() => {
        const handleResize = () => {
            console.log("size", window.innerWidth)
            if (window.innerWidth > 768) setIsSidebarOpen(true);
            else setIsSidebarOpen(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        setHighlightData(true);
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
    //         const response = await axios.post(`${backendUrl}/api/sendNotification`, payload, {
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
                const response = await axios.get(`${backendUrl}/api/rightPerson/${userId}`, {
                    headers: { 'Authorization': token }
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

        fetchData();
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

                    await axios.post(`${backendUrl}/api/subscription/${userId}`, subscription);
                    await axios.post(`${backendUrl}/api/notification`, { message: 'You have logged in right now' });

                } catch (error) {
                    console.error('Error sending login notification:', error);
                }
            };

            sendLoginNotification();
            effectRan.current = true;
        }
    }, [isFirstCallComplete]);


    useEffect(() => {
        if (isFirstCallComplete) {
            const findUserById = async (userId) => {
                try {
                    let response = await axios.get(`${backendUrl}/api/findById/${userId}`);
                    console.log("daa", response.data)
                    if (response.data.message == "No user found") {
                        response = await axios.get(`${backendUrl}/api/findByIdEmployee/${userId}`);
                    }
                    console.log("daa2", response.data)

                    console.log("findbyId", response.data.data[0]);
                    setGetData(response.data.data[0])
                }
                catch (error) {
                    console.log("error", error.message)
                }
            }
            findUserById(userId)
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
        startingPage(true);
    }



    return (
        <div>
            {getData.randomId || (getData.department === "IT" || getData.department === "Management") ? (
                <div className="admin-page">
                    <Helmet>
                        <title>Admin Page - Claimpro</title>
                        <meta name="description" content="Admin Page." />
                        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                        <link rel='canonical' href={`https://claimpro.in/Admin`} />
                    </Helmet>
                    {isSidebarOpen ? (
                        <aside ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                            {window.innerWidth < 768 && (
                                <div></div>
                            )}
                            <ul>
                                <img src={claimproassist}
                                    onClick={() => {
                                        setShowCustomerOptions(!showCustomerOptions);
                                        resetStates();
                                        setStartingPage(true);
                                    }}
                                    alt="Dashboard Icon" className='company-img' style={{ cursor: 'pointer' }} />

                                <li className='li-class' onClick={() => {
                                    setShowCustomerOptions(!showCustomerOptions);
                                    resetStates();
                                    setStartingPage(true);
                                }}>
                                    <SpaceDashboardIcon className="icon" />
                                    Dashboard</li>
                                <ul>
                                    <li classname="li-class" onClick={(e) => {
                                        setShowVendorOptions(!showVendorOptions);
                                        resetStates();
                                        setShowAddVendor(true);
                                        e.stopPropagation();
                                    }}>
                                        <StoreIcon className="icon" />
                                        Vendor
                                        {showVendorOptions && (
                                            <ul className='submenu'>
                                                <li classname="li-class" onClick={(e) => {
                                                    resetStates();
                                                    setShowAddVendor(true);
                                                    e.stopPropagation();
                                                }}>
                                                    <AddBusinessIcon className="icon" />
                                                    Add Vendor</li>
                                                <li classname="li-class" onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setShowViewVendor(true);
                                                }}>
                                                    <StoreIcon className="icon" />
                                                    View Vendor</li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                <ul>
                                    <li classname="li-class" onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCustomerOptions(!showCustomerOptions);
                                        resetStates();
                                        setShowAddCustomer(true);
                                    }}>
                                        <PersonOutlineIcon className="icon" />
                                        Customer
                                        {showCustomerOptions && (
                                            <ul className='submenu'>
                                                <li classname="li-class" onClick={(e) => {
                                                    resetStates();
                                                    e.stopPropagation();
                                                    setShowAddCustomer(true);
                                                }}>
                                                    <PersonAddAltIcon className="icon" />
                                                    Add </li>
                                                <li classname="li-class" onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setShowViewCustomer(true);
                                                }}>
                                                    <PersonOutlineIcon className="icon" />
                                                    View </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                <ul>
                                    <li classname="li-class" onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEmployeeOptions(!showEmployeeOptions);
                                        resetStates();
                                        setShowAddEmployee(true);
                                    }}>
                                        <BadgeIcon className="icon" />
                                        Employee
                                        {showEmployeeOptions && (
                                            <ul className='submenu'>
                                                <li classname="li-class" onClick={(e) => {
                                                    resetStates();
                                                    e.stopPropagation();
                                                    setShowAddEmployee(true);
                                                }}>
                                                    <PersonAddAltIcon className="icon" />
                                                    Add </li>
                                                <li classname="li-class" onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setShowEmployeeView(true);
                                                }}>
                                                    <BadgeIcon className="icon" />
                                                    View </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                <ul>
                                    <li classname="li-class" onClick={(e) => {
                                        e.stopPropagation();
                                        setShowVehicleInfo(!showVehicleInfo);
                                        resetStates();
                                        setShowVehicleClaim(true);
                                    }}>

                                        <ReportIcon className="icon" />
                                        Vehicle Reported
                                        {showVehicleInfo && (
                                            <ul className='submenu'>
                                                <li classname="li-class" onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setShowVehicleClaim(true);
                                                }}>
                                                    <AppRegistrationIcon className="icon" />
                                                    Register</li>
                                                <li classname="li-class" onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setShowVehicleClaimView(true);
                                                }}>
                                                    <ReportIcon className="icon" />
                                                    View Register</li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>




                                <ul>
                                    <li onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAssignedVehicleReport(!showAssignedVehicleReport);
                                        resetStates();
                                        setaccidendVehicle(true);
                                    }}>
                                        <LocalShippingIcon className="icon" />
                                        Assigned Vehicle
                                        {showAssignedVehicleReport && (
                                            <div className='submenu'>
                                                <li onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setaccidendVehicle(true);
                                                }}>
                                                    <AddBusinessIcon className="icon" />
                                                    Vendors</li>
                                                <li onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setVendorResponsing(true);
                                                }}>
                                                    <SensorOccupiedIcon className="icon" />
                                                    Response</li>
                                            </div>
                                        )}
                                    </li>
                                </ul>


                                <ul>
                                    <li onClick={(e) => {
                                        e.stopPropagation();
                                        setShowVisitorForm(!showVisitorForm);
                                        resetStates();
                                        setVisitorForm(true);
                                    }}>
                                        <HailIcon className="icon" />
                                        Other Form
                                        {showVisitorForm && (
                                            <div className='submenu' style={{width:'200px'}}>
                                                <li onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setVisitorForm(true);
                                                }}>
                                                    <HailIcon className="icon" />
                                                    Visitor Form</li>
                                                <li onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetStates();
                                                    setCustomerEnquiryForm(true);
                                                }}>
                                                    <HailIcon className="icon" />
                                                    Customer Enquiry</li>
                                            </div>
                                        )}
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

                    <main className="content" style={{ paddingLeft: "0px", marginLeft: '0px' }}>
                        <div className='first-container'>
                            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>

                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
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


                    </main>
                </div>
            ) : (
                <div>
                <Login/>
            </div>
           )}
        </div>
    );
};

export default Admin;
