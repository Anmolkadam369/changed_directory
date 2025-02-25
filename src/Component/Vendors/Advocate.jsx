import React, { useState, useEffect , useRef} from 'react';
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
import backendUrl from '../../environment';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from 'react-helmet-async';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import userImg from "../../Assets/userImg.jpg";
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import AdvocateDashboard from './AdvocateDashboard';
import Login from '../Login/LoginPage';


const Advocate = () => {

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

    const handleSignOutClick = () => { setModalOpen(true) };

    const handleConfirmSignOut = () => {
        setRefreshToken('');
        setRefreshUserId('');
        setModalOpen(false);
    };

    const handleCancelSignOut = () => { setModalOpen(false) };

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

                    await axios.post(`${backendUrl}/api/subscription/${userId}`, subscription);
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

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };


    return (

        <div>
            {getData?.vendorType !== "advocate" ? (
                <div>
                    <Login/>
                </div>
            ):( 
            <div className="admin-page">
            <Helmet>
                <title>Advocate Page - Claimpro</title>
                <meta name="description" content="Advocate Page for BVC ClaimPro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/AdvocateDashboard`} />
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
                            setStartingPage(true); // Hide Starting Page
                            setMyAccidentVehicle(false)
                        }}>
                            <SpaceDashboardIcon className="icon" />
                            Dashboard</li>
                        <ul>
                            <li onClick={(e) => {
                                setShowReportsOptions(!showReportsOptions)
                                setStartingPage(false);
                                setMyAccidentVehicle(true);
                                e.stopPropagation();
                            }}>
                                <SummarizeOutlinedIcon className="icon" />
                                Reports
                                {showReportsOptions && (
                                    <ul className='submenu' >

                                        <li onClick={() => {
                                            setStartingPage(false);
                                            setMyAccidentVehicle(true)
                                        }}>
                                            Cases Assigned
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>

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
                        <AdvocateDashboard getData={getData}/>
                    }

                    {
                        myAccidentVehicle &&
                        <AssignedVehicleAdvocate />
                    }


                </main>
            </div>

        </div>)
        }
        </div>
    );
};

export default Advocate;
