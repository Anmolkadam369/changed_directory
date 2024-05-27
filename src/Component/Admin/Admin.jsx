import React, { useState, useEffect } from 'react';
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
import claimproassist from '../../Assets/claimproassist.jpg'
import backendUrl from "../../environment";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Dashboard from '../Dashboard/Dashboard';
import { getToken } from 'firebase/messaging';
import { messaging } from '../Firebase/Firebase';

const Admin = () => {

    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});

    let navigate = useNavigate();


    const [showVendorOptions, setShowVendorOptions] = useState(false);
    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showVehicleInfo, setShowVehicleInfo] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showAssignedVehicleReport, setShowAssignedVehicleReport] = useState(false);

    const [showAddVendor, setShowAddVendor] = useState(false);
    const [startingPage, setStartingPage] = useState(true);
    const [showViewVendor, setShowViewVendor] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showViewCustomer, setShowViewCustomer] = useState(false);
    const [showVehicleClaim, setShowVehicleClaim] = useState(false);
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false);
    const [addImages, setaddImages] = useState(false);
    const [accidendVehicle, setaccidendVehicle] = useState(false);
    const [vendorResponsing, setVendorResponsing] = useState(false);

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
    };

    const vendorData = [10, 5, 15, 20];
    const vendorLabels = ['Advocate', 'Crane', 'Mechanic', 'Workshops'];

    const customerData = [30, 70];
    const customerLabels = ['Bulk Customers', 'Single Customers'];

    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [refreshToken, setRefreshToken] = useRecoilState(tokenState);
    const [refreshUserId, setRefreshUserId] = useRecoilState(userIdState);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notificationSent, setNotificationSent] = useState(false);

    const handleSignOutClick = () => { setModalOpen(true) };

    const handleConfirmSignOut = () => {
        setRefreshToken('');
        setRefreshUserId('');
        setModalOpen(false);
    };

    const handleCancelSignOut = () => { setModalOpen(false) };

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if(permission === 'granted'){
         const token = await getToken(messaging, {vapidKey :'BCSLSM0MqLiL4BjJrDEhYf6z8MlsxHkbGDRZjmtrdsbt352tsRknucbpSYRDQF2jGrd2zvQNnpqsBLcoVY7XyKg'} );
         console.log("generated token=", token);
         sendNotification(token);
         setNotificationSent(true);
        }
        else if (permission === 'denied') alert('Notification permission denied.');
     }   

     useEffect(()=>{
      requestPermission(); 
    },[]);

    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        console.log("USERID", userId);
        if (userId !== '') findUserById(userId);
    }, [token, userId, navigate]);

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

    const sendNotification = async (token) => {
        const payload = {
            token: token,
        };
    
        try {
            const response = await axios.post(`${backendUrl}/api/sendNotification`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("sendNOTIFICATION", response.data);
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };
    
 
    const findUserById = async (id) => {
        console.log("HEY", `${backendUrl}/api/findById/${id}`)
        const response = await axios.get(`${backendUrl}/api/findById/${id}`);
        console.log("daa", response.data)
        console.log("data", response.data.data[0]);
        setGetData(response.data.data[0])
    }

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
      


    return (
        <div className="admin-page">
            {isSidebarOpen ? (
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                    {window.innerWidth < 768 && (
                        <div className="close-btn" onClick={toggleSidebar}>×</div>
                    )}
                    <ul>
                        <img src={claimproassist} alt="Dashboard Icon" style={{ height: '50px', width: '80px', marginRight: '8px' }} />

                        <li onClick={() => {
                            setShowCustomerOptions(!showCustomerOptions);
                            resetStates();
                            setStartingPage(true);
                        }}>
                            Dashboard</li>
                        <ul>
                            <li onClick={(e) => {
                                setShowVendorOptions(!showVendorOptions);
                                resetStates();
                                setShowAddVendor(true);
                                e.stopPropagation();
                            }}>Vendor
                                {showVendorOptions && (
                                    <ul className='submenu'>
                                        <li onClick={(e) => {
                                            resetStates();
                                            setShowAddVendor(true);
                                            e.stopPropagation();
                                        }}>Add Vendor</li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                        <ul>
                            <li onClick={(e) => {
                                e.stopPropagation();
                                setShowCustomerOptions(!showCustomerOptions);
                                resetStates();
                                setShowAddCustomer(true);
                            }}>Customer
                                {showCustomerOptions && (
                                    <ul className='submenu'>
                                        <li onClick={(e) => {
                                            resetStates();
                                            e.stopPropagation();
                                            setShowAddCustomer(true);
                                        }}>Add Customer</li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                        <ul>
                            <li onClick={(e) => {
                                e.stopPropagation();
                                setShowVehicleInfo(!showVehicleInfo);
                                resetStates();
                                setShowVehicleClaim(true);
                            }}>Vehicle Reported
                                {showVehicleInfo && (
                                    <ul className='submenu'>
                                        <li onClick={(e) => {
                                            e.stopPropagation();
                                            resetStates();
                                            setShowVehicleClaim(true);
                                        }}>Register Update</li>

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
                            }}>Assigned Vehicle
                                {showAssignedVehicleReport && (
                                    <div className='submenu'>
                                        <li onClick={(e) => {
                                            e.stopPropagation();
                                            resetStates();
                                            setaccidendVehicle(true);
                                        }}>Assign Vendors</li>
                                        <li onClick={(e) => {
                                            e.stopPropagation();
                                            resetStates();
                                            setVendorResponsing(true);
                                        }}>Vendor Response</li>
                                    </div>
                                )}
                            </li>
                        </ul>


                        <ul>
                            <li onClick={(e) => {
                                e.stopPropagation();
                                setShowReportsOptions(!showReportsOptions);
                                resetStates();
                                setShowViewVendor(true);
                            }}>
                                Reports
                                {showReportsOptions && (
                                    <ul className="submenu">
                                        <li onClick={(e) => {
                                            e.stopPropagation();
                                            resetStates();
                                            setShowViewVendor(true);
                                        }}>View Vendor</li>
                                        <li onClick={(e) => {
                                            e.stopPropagation();
                                            resetStates();
                                            setShowViewCustomer(true);
                                        }}>View Customer</li>
                                        <li onClick={(e) => {
                                            e.stopPropagation();
                                            resetStates();
                                            setShowVehicleClaimView(true);
                                        }}>View Register</li>
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

            <main className="content"  style={{ paddingLeft: "0px", marginLeft: '0px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px', marginRight: '30px', marginTop: '50px', position: 'relative' }}>
                    <div>
                        <FaUserCircle size={30} style={{ cursor: 'pointer', marginRight: '10px', marginLeft: '10px' }}
                            onClick={() => setShowUserId(!showUserId)} />
                        {showUserId && (
                            <div style={{
                                position: 'absolute', // Makes the div float
                                top: '50px', // Adjust this value to position it properly below the trigger element
                                right: '0',
                                width: '200px', // Set a fixed width for better control
                                padding: '15px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Slightly larger shadow for better separation
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                zIndex: 1000
                            }}>
                                <div style={{
                                    marginBottom: '10px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>
                                    User Information
                                </div>
                                <span style={{
                                    fontSize: '14px',
                                    color: '#555',
                                    marginBottom: '10px'
                                }}>
                                    User Name: {getData.username} <br />
                                    User Id: {getData.randomId}
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
                                        textAlign: 'center'
                                    }}>
                                    Sign Out
                                </button>
                                <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirmSignOut} onCancel={handleCancelSignOut} />
                            </div>
                        )}
                    </div>
                </div>


                {
                    startingPage &&
                    <Dashboard />
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

    );
};

export default Admin;
