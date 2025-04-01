import React, { useState, useEffect, useRef } from 'react';
import "../Admin/Admin.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { FaUserCircle } from 'react-icons/fa';
import ConfirmationModal from '../../../Components/ConfirmModel';
import Registration from '../Registration/Registration';
import Location1 from '../Location1/Location1';
import { Alert } from '@mui/material';
import AccidentVehicleUser from '../AccidentVehicle/AccidentVehicleUser';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from 'react-helmet-async';
import UserDashboard from '../Dashboard/UserDashboard';
import userImg from "../../Assets/userImg.jpg";
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import Login from '../Login/LoginPage';


const User = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});
    console.log("GETDATA123456", getData)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userImage, setUserImage] = useState(true);
    const dropdownRef = useRef(null);

    const user = {
        name: "John Doe",
        id: "12345"
    };

    let navigate = useNavigate();

    const [showAddVehicleOptions, setShowAddVehicleOptions] = useState(false);
    const [vehicleData, setVehicleData] = useState(null);
    console.log("vehicleDATA", vehicleData)

    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    console.log("shoaddvehic", showAddVehicle)
    const [myAccidentVehicle, setMyAccidentVehicle] = useState(false);
    const [sendLocation, setSendLocation] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [startingPage, setStartingPage] = useState(true);

    const vendorData = [10, 4];
    const vendorLabels = ['repaired', 'pending'];

    const customerData = [40, 10];
    const customerLabels = ['total Days', 'Days by Each Vehicle'];

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [refreshToken, setRefreshToken] = useRecoilState(tokenState);
    const [refreshUserId, setRefreshUserId] = useRecoilState(userIdState);

    const handleSignOutClick = () => { setModalOpen(true) };

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

                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscription/${userId}`, subscription,{ headers: { Authorization: `Bearer ${token}` }});
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notification`, { message: 'You have logged in right now' });

                    // alert('Login notification sent successfully');
                } catch (error) {
                    console.error('Error sending login notification:', error);
                }
            };

            sendLoginNotification();
            effectRan.current = true;
        }
    }, []);

    const handleConfirmSignOut = () => {
        setRefreshToken('');
        setRefreshUserId('');
        setModalOpen(false);
    };

    const handleCancelSignOut = () => { setModalOpen(false) };
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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/findByIdCustomer/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        console.log("daa", response.data)
        console.log("data1234567890", response.data.data[0]);
        setGetData(response.data.data[0])
    }

    const handleVehicleData = (data) => {
        console.log("Received data from Registration:", data);
        if (data.message != "Vehicle found") {
            setAlertInfo({ show: true, message: "Vehicle Not Found!!!", severity: 'error' });
        }
        else setVehicleData(data.data);

    };

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };


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

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div>
        {getData === undefined ?(
            <div>
                <Login/>
            </div>
        ):(<div className="admin-page">
            <Helmet>
                <title>User Page - Claimpro</title>
                <meta name="description" content="User Page" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/UserDashboard`} />
            </Helmet>
            {isSidebarOpen ? (
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                    {window.innerWidth < 768 && (
                        <div className="close-btn" onClick={toggleSidebar}>×</div>
                    )}
                    <ul>
                        <img src={claimproassist} alt="Dashboard Icon" className="company-img" />

                        <li onClick={() => {
                            setShowCustomerOptions(!showCustomerOptions)
                            setShowAddVehicle(false);
                            setStartingPage(true);
                            setMyAccidentVehicle(false)
                            setSendLocation(false)
                        }}>Dashboard</li>
                        <ul>
                            <li onClick={(e) => {
                                setShowAddVehicleOptions(!showAddVehicleOptions)
                                setShowAddVehicle(true);
                                setStartingPage(false);
                                setMyAccidentVehicle(false)
                                setSendLocation(false)
                                e.stopPropagation();

                            }}>Adding Vehicle
                                {showAddVehicleOptions && (
                                    <ul className='submenu'>
                                        <li onClick={(e) => {
                                            setShowAddVehicle(true);
                                            setStartingPage(false);
                                            setMyAccidentVehicle(false)
                                            setSendLocation(false)
                                            e.stopPropagation();
                                        }}>
                                            Search Vehicle
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>


                        <ul>
                            <li onClick={(e) => {
                                setShowReportsOptions(!showReportsOptions)
                                setShowAddVehicle(false);
                                setStartingPage(false);
                                setMyAccidentVehicle(true)
                                setSendLocation(false)
                                e.stopPropagation();
                            }}>Reports
                                {showReportsOptions && (
                                    <ul className='submenu'>
                                        <li onClick={(e) => {
                                            setShowAddVehicle(false);
                                            setStartingPage(false);
                                            setMyAccidentVehicle(true)
                                            setSendLocation(false)
                                            e.stopPropagation();
                                        }}>
                                            My Vehicle
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
            <main className="content" style={{ marginLeft: '0px' }}>
            <div className='first-container'>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {getData.CustomerName}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <label className="form-field search-field" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginRight: '30px', marginBottom: '0px' }}>
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                                style={{ paddingRight: '30px', marginBottom: '0px' }} // Add padding to the right to make space for the icon
                                required
                            />
                            <SearchOutlinedIcon
                                className="icon2"
                                onClick={handleSearchClick}
                                style={{ cursor: 'pointer', position: 'absolute', right: '10px', marginTop: '5px' }} // Position the icon inside the input
                            />
                        </label> 

                         <DarkModeOutlinedIcon className="icon2" style={{ cursor: 'pointer', marginRight: '30px', marginBottom: '0px' }} /> */}
                        <CenterFocusWeakIcon className="icon" onClick={handleFullScreenToggle} style={{ cursor: 'pointer', marginRight: '20px', marginLeft: '20px',marginBottom: '0px' }} />
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
                                    User Name: {getData.CustomerName} <br />
                                    User Id: {getData.CustomerType}
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
                                <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirmSignOut} onCancel={handleCancelSignOut} />
                            </div>
                        )}
                    </div>
                </div>
                <hr />
                {
                    startingPage &&
                    <UserDashboard/>
                }
                {
                    showAddVehicle ? (
                        <>
                            {!vehicleData && <Registration onVehicleData={handleVehicleData} />}
                            {alertInfo.show && (
                                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                    {alertInfo.message}
                                </Alert>
                            )}
                            {/* {vehicleData && getData && <Location vehicleData={vehicleData} />} */}
                            {vehicleData && getData && vehicleData.choosenPlan && <Location1 vehicleData={vehicleData} />}

                        </>
                    ) : null
                }


                {
                    myAccidentVehicle &&
                    <AccidentVehicleUser />
                }



            </main>

        </div>)}
        </div>
    );
};

export default User;
