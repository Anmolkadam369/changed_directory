import React, { useState, useEffect } from 'react';
// import './User.css';
import "../Admin/Admin.css";
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
import { Alert } from '@mui/material';
import AccidentVehicleUser from '../AccidentVehicle/AccidentVehicleUser';
import backendUrl from '../../environment';
import claimproassist from '../../Assets/claimproassist.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from 'react-helmet';



const User = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});
    console.log("GETDATA", getData)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [refreshToken, setRefreshToken] = useRecoilState(tokenState);
    const [refreshUserId, setRefreshUserId] = useRecoilState(userIdState);

    const handleSignOutClick = () => { setModalOpen(true) };

    const handleConfirmSignOut = () => {
        setRefreshToken('');
        setRefreshUserId('');
        setModalOpen(false);
    };

    const handleCancelSignOut = () => { setModalOpen(false) };
    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        console.log("USERID", userId);
        if (userId !== '') findUserById(userId);
    }, [token, userId, navigate]);

    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${backendUrl}/api/findByIdCustomer/${id}`);
        console.log("daa", response.data)
        console.log("data", response.data.data[0]);
        setGetData(response.data.data[0])
    }

    const handleVehicleData = (data) => {
        console.log("Received data from Registration:", data);
        if (data.message != "Vehicle found") {
            setAlertInfo({ show: true, message: "Vehicle Not Found!!!", severity: 'error' });
        }
        else setVehicleData(data.data);

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
        <div className="admin-page">
            <Helmet>
                <title>User Page - Claimpro</title>
                <meta name="description" content="User Page" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            </Helmet>
            {isSidebarOpen ? (
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ paddingLeft: "0px" }}>
                    {window.innerWidth < 768 && (
                        <div className="close-btn" onClick={toggleSidebar}>×</div>
                    )}
                    <ul>
                        <img src={claimproassist} alt="Dashboard Icon" style={{ height: '45px', width: '80px', marginRight: '8px', marginLeft: "10px" }} />

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
                    <div>
                        <div style={{
                            textAlign: 'center',
                            backgroundColor: '#4CAF50', // Choose your color
                            color: 'white', // Choose text color
                            padding: '20px 0', // Vertical padding and no horizontal padding
                            marginBottom: '30px', // Space below the header
                        }}>
                            <h1 style={{ fontSize: "170%" }}>User - {getData.CustomerName} </h1>
                            <hr style={{
                                border: '0',
                                height: '2px', // Thickness of the hr
                                backgroundColor: '#fff', // Same as the text color for consistency
                                maxWidth: '50%', // Width of the hr
                                margin: '0 auto', // Center the hr
                            }} />
                        </div>

                        <h2 className='heading-box'>
                            Vehicles Details
                        </h2>

                        <section className="dashboard-summary">
                            <div className="summary-item">
                                <h2>4</h2>
                                <p>Repairing Pending</p>
                            </div>
                            <div className="summary-item">
                                <h2>10</h2>
                                <p>Repaired Vehicles</p>
                            </div>
                            <div className="summary-item">
                                <h2>100</h2>
                                <p>Registered Vehicles</p>
                            </div>

                        </section>

                        <section className="charts-section">
                            <div className="chart-container">
                                <h2>Vendor Details</h2>
                                <PieChartComponent chartData={vendorData} chartLabels={vendorLabels} />
                            </div>
                            <div className="chart-container">
                                <h2>Customer Details</h2>
                                <PieChartComponent chartData={customerData} chartLabels={customerLabels} />
                            </div>
                        </section>
                    </div>
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

                {/* {
                        sendLocation ? (
                            <>
                                {vehicleData.choosenPlan && <Location1 vehicleData={vehicleData} />}
                            </>
                        ) : null} */}

                {
                    myAccidentVehicle &&
                    <AccidentVehicleUser />
                }



            </main>

        </div>
    );
};

export default User;
