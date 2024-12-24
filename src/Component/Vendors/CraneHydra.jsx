import React, { useState, useEffect, useRef, useInsertionEffect } from 'react';
import "../Admin/Admin.css"
import './Advocate.css';
import axios from 'axios';
import { useNavigate, Outlet } from 'react-router-dom';
import VendorMasterForm from '../VenderMaster/VendorMasterForm';
import PieChartComponent from '../PieChart/PieChartComponent'
import VendorApproved from '../VendorApproved/VendorApporoved';
import CustomerMaster from '../CustomerMaster/CustomerMaster';
import CustomerApproved from '../CustomerApporoved/CustomerApproved';
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import VehicleClaimRegistration from '../VehicleClaimRegistration/VehicleClaimRegistration';
import ViewVehicleInfo from '../ViewVehicleInfo/ViewVehicleInfo';
import { FaUserCircle } from 'react-icons/fa';
import ConfirmationModal from '../ConfirmModel';
import ImageUpload from '../ImageUpload/ImageUpload';
import Registration from '../Registration/Registration';
import Location from '../Location/Location';
import Location1 from '../Location1/Location1';
import AccidentVehicleUser from '../AccidentVehicle/AccidentVehicleUser';
import VehicleClaimEdit from '../VehicleClaimRegistration/VehicleClaimEdit';
import AssignedVehicleAdvocate from './AssignedVehiclesAdvocate';
import AssignedVehicleMechanic from './AssignedVehiclesMechanic';
import AssignedVehicleCrane from './AssignedVehiclesCrane';
import backendUrl from '../../environment';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from 'react-helmet-async';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import userImg from "../../Assets/userImg.jpg";
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import CraneDashboard from './CraneDashboard';
import Login from '../Login/LoginPage';
import Profiles from '../Profiles/Profiles';
import LocationAccessModal from '../Location1/LocationAccessModal';


const CraneHydra = () => {

    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});
    console.log("GETDATA", getData)

    const user = {
        name: "John Doe",
        id: "12345"
    };

    let navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState(null);
    console.log("vehicle", vehicleData)


    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [startingPage, setStartingPage] = useState(true);
    const [myAccidentVehicle, setMyAccidentVehicle] = useState(false);

    const vendorData = [10, 4];
    const vendorLabels = ['resolved', 'pending'];

    const customerData = [40, 50];
    const customerLabels = ['total cases', 'Days by Each Case'];

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [refreshToken, setRefreshToken] = useRecoilState(tokenState);
    const [refreshUserId, setRefreshUserId] = useRecoilState(userIdState);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dropdownRef = useRef(null);
    const [userImage, setUserImage] = useState(true);
    const [triggeredIt, setTriggeredIt] = useState(true);
    const [comingValue, setComingValue] = useState(null);


    const handleSignOutClick = () => { setModalOpen(true) };

    const handleConfirmSignOut = () => {
        setRefreshToken('');
        setRefreshUserId('');
        setModalOpen(false);
    };

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowUserId(false);
        }
    };

    useEffect(() => {
        if (showUserId) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserId]);

    const handleCancelSignOut = () => { setModalOpen(false) };

    useEffect(() => {
        isLocationAvailable()
    }, [])

    const isLocationAvailable = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/isvendor-added/${userId}`,{ headers: { Authorization: `Bearer ${token}` }})
            if (response.data.status == true) {
                setTriggeredIt(false);
                setComingValue(true)
            }
            else if  (response.data.status == false) {
                setTriggeredIt(true);
            }
        } catch (error) {
            console.error('Error response:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
            }
        }
    }

    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        console.log("USERID", userId);
        if (userId !== '') findUserById(userId);
    }, [token, userId, navigate]);

    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${backendUrl}}/api/findByIdForVendor/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        console.log("daa", response.data)
        console.log("data12345", response.data.data[0]);
        setGetData(response.data.data[0]);
    }

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


    const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';
    const effectRan = useRef(false);
    const urlBase64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };


    useEffect(() => {
        if (effectRan.current === false) {
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

                    await axios.post(`${backendUrl}/api/subscription/${userId}`, subscription,{ headers: { Authorization: `Bearer ${token}` }});
                    await axios.post(`${backendUrl}/api/notification`, { message: 'You have logged in right now' });

                    // alert('Login notification sent successfully');
                } catch (error) {
                    console.error('Error sending login notification:', error);
                }
            };

            sendLoginNotification();
            effectRan.current = true;
        }
    }, []);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const [showProfile, setShowProfile] = useState(false)
    const [usersIdHere, setUsersIdHere] = useState(false)

    const showingProfile = (userId) => {
        setUsersIdHere(userId)
        setShowProfile(!showProfile)
        setStartingPage(false);
        setMyAccidentVehicle(false)
    }

    const handleUpdate = () => {
        setShowProfile(false); // Hide VendorMasterEdit
        setStartingPage(true);
        setMyAccidentVehicle(false)
        findUserById(userId)
    };

    const handleComingValue = (value) => {
        setComingValue(value)
    }

    return (
        <div>
            {getData?.vendorType !== "crane" ? (
                <div>
                    <Login />
                </div>
            ) : (
                <div>
                    {triggeredIt && (<LocationAccessModal triggerModel='true'
                    onSuccess={() => {
                        setTriggeredIt(false); // Hide modal after success
                        handleComingValue(true);
                    }} />)}
                    {comingValue && (

                        <div className={`admin-page ${!comingValue ? 'blur' : ''}`}>
                            <Helmet>
                                <title>Crane Hydra Dashboard - Claimpro</title>
                                <meta name="description" content="Manage assigned vehicles, view tasks, and analyze case details on the Claimpro Crane Hydra Dashboard." />
                                <meta name="keywords" content="Crane Hydra Dashboard, Claimpro, Vehicle Management, Task Management, Case Details" />
                                <link rel='canonical' href={`https://claimpro.in/CraneDashboard`} />
                            </Helmet>

                            {isSidebarOpen ? (
                                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                                    {window.innerWidth < 768 && (
                                        <div className="close-btn" onClick={toggleSidebar}>×</div>
                                    )}
                                    <ul>
                                        <img src={claimproassist} alt="Dashboard Icon" className="company-img" />
                                        <li onClick={() => {
                                            setShowCustomerOptions(!showCustomerOptions);
                                            setStartingPage(true); // Hide Starting Page
                                            setMyAccidentVehicle(false);
                                        }}>
                                            <SpaceDashboardIcon className="icon" />
                                            Dashboard
                                        </li>
                                        <ul>
                                            <li onClick={(e) => {
                                                setShowReportsOptions(!showReportsOptions);
                                                setStartingPage(false);
                                                setMyAccidentVehicle(true);
                                                e.stopPropagation();
                                            }}>
                                                <SummarizeOutlinedIcon className="icon" />
                                                Reports
                                                {showReportsOptions && (
                                                    <ul className='submenu'>
                                                        <li onClick={() => {
                                                            setStartingPage(false);
                                                            setMyAccidentVehicle(true);
                                                        }}>
                                                            Cases Assigned
                                                        </li>
                                                    </ul>
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
                            <div className="admin-page">
                                <main className="content" style={{ marginLeft: '0px', paddingBottom:"0px" }}>
                                    <div className='first-container'>
                                        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                            {getData.vendorName}
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
                                                    <div className="profile-nav " style={{ marginTop: "0px" }}>
                                                        <div className="panel" style={{ width: "200px" }}>
                                                            <div className="user-heading round">
                                                                <a href="#">
                                                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                                                                </a>
                                                                <p style={{ margin: "10px 0px 10px 0px", textAlign: "left" }}>{getData.vendorName}</p>
                                                                <h3 style={{ margin: "10px 0px 5px 0px", color: 'lightyellow', textDecoration: "underline", textAlign: "left" }}>{getData.vendorType}</h3>
                                                                <p style={{ textAlign: "left" }}>{getData.email}</p>
                                                            </div>
                                                            <ul className='profile-view-edit'>
                                                                <li className="active">
                                                                    <a href="#" onClick={() => showingProfile(userId)}><i style={{ marginLeft: "5px" }} className="fa fa-user"></i> Manage Profile</a>
                                                                </li>
                                                                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                                                                    <button
                                                                        onClick={handleSignOutClick}
                                                                        style={{
                                                                            padding: '10px 5px',
                                                                            fontSize: '14px',
                                                                            color: '#fff',
                                                                            backgroundColor: '#007bff',
                                                                            border: 'none',
                                                                            borderRadius: '5px',
                                                                            cursor: 'pointer',
                                                                            outline: 'none',
                                                                            width: '100%',
                                                                            textAlign: 'center',
                                                                            margin: "10px"
                                                                        }}>
                                                                        Sign Out
                                                                    </button>
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    {startingPage && <CraneDashboard />}
                                    {/* {myAccidentVehicle && <AssignedVehicleCrane />} */}
                                    {showProfile && <Profiles id={usersIdHere} onUpdate={handleUpdate} />}
                                </main>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CraneHydra;
