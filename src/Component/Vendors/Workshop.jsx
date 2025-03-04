import React, { useState, useEffect, useRef } from 'react';
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
import Location1 from '../Location1/Location1';
import AccidentVehicleUser from '../AccidentVehicle/AccidentVehicleUser';
import VehicleClaimEdit from '../VehicleClaimRegistration/VehicleClaimEdit';
import AssignedVehicleAdvocate from './AssignedVehiclesAdvocate';
import AssignedVehicleWorkshop from './AssignedVehiclesWorkshop';
// '../../environment';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from 'react-helmet-async';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import userImg from "../../Assets/userImg.jpg";
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import WorkshopDashboard from './WorkshopDashboard';
import Login from '../Login/LoginPage';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ProductRegister from '../Scrap/ProductRegsiter';
import ViewProduct from '../Scrap/ViewProduct';
import ScrapDashboard from '../Scrap/ScrapDashboard';



const Workshop = () => {

    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});

    const user = {
        name: "John Doe",
        id: "12345"
    };

    let navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState(null);
    console.log("vehicle", vehicleData)
    const dropdownRef = useRef(null);
    const [userImage, setUserImage] = useState(true);
    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [startingPage, setStartingPage] = useState(true);
    const [myAccidentVehicle, setMyAccidentVehicle] = useState(false);
    const [viewProduct, setViewProduct] = useState(false);
    const [viewProudct, setViewProudct] = useState(false);
    const [seeOrders, setSeeOrders] = useState(false);



    const [scrapDealAdd, setscrapDealAdd] = useState(true);
    const [scrapDealView, setscrapDealView] = useState(true);
    const [ScrapDealOrder, setScrapDealOrder] = useState(true);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showScrapDealsOptions, setShowScrapDealsOptions] = useState(false);

    const resetState = () => {
        setStartingPage(false);
        setMyAccidentVehicle(false);
        setViewProduct(false);
        setViewProudct(false);
        setSeeOrders(false)
        setShowReportsOptions(false);
        setShowScrapDealsOptions(false);
    };

    const toggleSubMenu = (menu) => {
        if (menu === 'reports') {
            setShowReportsOptions(!showReportsOptions);
            setShowScrapDealsOptions(false); // Close the other menu
        } else if (menu === 'scrapDeals') {
            setShowScrapDealsOptions(!showScrapDealsOptions);
            setShowReportsOptions(false); // Close the other menu
        }
    };


    const vendorData = [10, 4];
    const vendorLabels = ['resolved', 'pending'];

    const customerData = [40, 50];
    const customerLabels = ['total cases', 'Days by Each Case'];

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [refreshToken, setRefreshToken] = useRecoilState(tokenState);
    const [refreshUserId, setRefreshUserId] = useRecoilState(userIdState);

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
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        console.log("USERID", userId);
        if (userId !== '') findUserById(userId);
    }, [token, userId, navigate]);

    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}}/api/findByIdForVendor/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        console.log("daa", response.data)
        console.log("data", response.data.data[0]);
        setGetData(response.data.data[0])
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

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (

        <div>

            {getData?.vendorType !== "workshop" ? (
                <div>
                    <Login />
                </div>
            )
                : (<div className="admin-page">
                    <Helmet>
                        <title>Workshop Information - Claimpro</title>
                        <meta name="description" content="Workshop Inteface." />
                        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                        <link rel='canonical' href={`https://claimpro.in/WorkshopDashboard`} />
                    </Helmet>
                    {isSidebarOpen ? (
                        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                            {window.innerWidth < 768 && (
                                <div className="close-btn" onClick={toggleSidebar}>×</div>
                            )}
                            <ul>
                                <img src={claimproassist} alt="Dashboard Icon" className="company-img" />

                                <li
                                    onClick={() => {
                                        resetState();
                                        setStartingPage(true);
                                    }}
                                >
                                    <SpaceDashboardIcon className="icon" />
                                    Dashboard
                                </li>

                                <li
                                    onClick={(e) => {
                                        toggleSubMenu('reports');
                                        e.stopPropagation(); // Prevent event bubbling
                                    }}
                                >
                                    <SummarizeOutlinedIcon className="icon" />
                                    Reports
                                    {showReportsOptions && (
                                        <ul className="submenu">
                                            <li
                                                onClick={() => {
                                                    resetState();
                                                    setMyAccidentVehicle(true);
                                                }}
                                            >
                                                Cases Assigned
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                <li
                                    onClick={(e) => {
                                        toggleSubMenu('scrapDeals');
                                        e.stopPropagation(); // Prevent event bubbling
                                    }}
                                >
                                    <Inventory2OutlinedIcon className="icon" />
                                    Scrap Deals
                                    {showScrapDealsOptions && (
                                        <ul className="submenu">
                                            <li
                                                onClick={() => {
                                                    resetState()
                                                    setViewProduct(true);
                                                }}
                                            >
                                                <Inventory2OutlinedIcon className="icon" />
                                                View Products
                                            </li>
   
                                        </ul>
                                    )}
                                </li>
                            </ul>

                        </aside>) : (
                        <div>
                            {window.innerWidth < 768 && (
                                <div className="menu-btn show" onClick={toggleSidebar}><MenuIcon /></div>
                            )}
                        </div>
                    )}
                    <div className="admin-page">
                        <main className="content" style={{ marginLeft: '0px' }}>
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
                                                User Name: {getData.vendorName} <br />
                                                User Id: {getData.id}
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
                            <hr />
                            <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirmSignOut} onCancel={handleCancelSignOut} />

                            {
                                startingPage &&
                                <WorkshopDashboard />
                            }

                            {
                                myAccidentVehicle &&
                                <AssignedVehicleWorkshop />
                            }

                            {
                                viewProduct &&
                                <ScrapDashboard/>
                            }

                        </main>
                    </div>

                </div>)}
        </div>
    );
};

export default Workshop;
