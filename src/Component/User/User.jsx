import React, { useState, useEffect } from 'react';
import './User.css';
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


const User = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});
    console.log("GETDATA", getData)

    const user = {
        name: "John Doe",
        id: "12345"
    };

    let navigate = useNavigate();

    const [view, setView] = useState('');
    const [showAddVehicleOptions, setShowAddVehicleOptions] = useState(false);
    const [showVehicleInfo, setShowVehicleInfo] = useState(false);
    const [vehicleData, setVehicleData] = useState(null);
    console.log("vehicleDATA", vehicleData)


    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    console.log("shoaddvehic", showAddVehicle)
    const [showViewVendor, setShowViewVendor] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showViewCustomer, setShowViewCustomer] = useState(false);
    const [showVehicleClaim, setShowVehicleClaim] = useState(false);
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false);
    const [addImages, setaddImages] = useState(false);
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

    return (
        <div className="admin-page">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => {
                        setShowCustomerOptions(!showCustomerOptions)
                        setShowAddVehicle(false); // Show AddVendor Form
                        setShowViewVendor(false);
                        setShowViewCustomer(false); // Show ViewVendor Form
                        setShowAddCustomer(false); // Hide AddVendor Form
                        setStartingPage(true); // Hide Starting Page
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setMyAccidentVehicle(false)

                    }}>Dashboard</li>

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowAddVehicleOptions(!showAddVehicleOptions);
                        setShowAddVehicle(true); // Show AddVendor Form
                        setStartingPage(false); // Hide Starting Page
                        setShowViewVendor(false); // Hide ViewVendor Form
                        setShowAddCustomer(false); // Show AddVendor Form
                        setShowViewCustomer(false); // Hide ViewVendor Form
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setMyAccidentVehicle(false)

                    }}>Adding Vehicle</li>
                    {showAddVehicleOptions && (
                        <ul>
                            <li onClick={() => {
                                setShowAddVehicle(true);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddCustomer(false);
                                setShowViewCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false)
                                setaddImages(false)
                                setMyAccidentVehicle(false)

                            }}>
                                Search Vehicle
                            </li>

                        </ul>
                    )}

                    {vehicleData && (<li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowAddVehicleOptions(!showAddVehicleOptions);
                        setShowAddVehicle(false); // Show AddVendor Form
                        setStartingPage(false); // Hide Starting Page
                        setShowViewVendor(false); // Hide ViewVendor Form
                        setShowAddCustomer(false); // Show AddVendor Form
                        setShowViewCustomer(false); // Hide ViewVendor Form
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setMyAccidentVehicle(false)
                        setSendLocation(true)

                    }}>Locate Vehicle</li>)}
                {showAddVehicleOptions && (
                        <ul>
                            <li onClick={() => {
                                setShowAddVehicle(false);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddCustomer(false);
                                setShowViewCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false)
                                setaddImages(false)
                                setMyAccidentVehicle(false)
                                setSendLocation(true)

                            }}>
                                Send Location
                            </li>

                        </ul>
                    )}

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowReportsOptions(!showReportsOptions)
                        setShowAddVehicle(false);
                        setShowViewVendor(false);
                        setShowViewCustomer(false);
                        setShowAddCustomer(false);
                        setStartingPage(false);
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setMyAccidentVehicle(true)
                        setaddImages(false)
                    }}>Reports</li>
                    {showReportsOptions && (
                        <div style={{ marginLeft: "30px" }}>
                            {/* <li onClick={() => {
                                setShowViewVendor(true);
                                setShowAddVehicle(false);
                                setStartingPage(false);
                                setShowAddCustomer(false);
                                setShowViewCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setMyAccidentVehicle(false)

                            }}>
                                View Vendor
                            </li>
                            <li onClick={() => {
                                setStartingPage(false);
                                setShowAddCustomer(false);
                                setShowViewVendor(false);
                                setShowAddVehicle(false);
                                setShowViewCustomer(true);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setMyAccidentVehicle(false)

                            }}>
                                View Customer
                            </li>
                            <li onClick={() => {
                                setShowViewCustomer(false);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddVehicle(false);
                                setShowAddCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(true);
                                setaddImages(false)
                                setMyAccidentVehicle(false)

                            }}>
                                View Register
                            </li> */}
                            <li onClick={() => {
                                setShowViewCustomer(false);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddVehicle(false);
                                setShowAddCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setMyAccidentVehicle(true)

                            }}>
                                My accident Vehicle
                            </li>
                        </div>
                    )}

                </ul>
            </aside>
            <div className="admin-page" style={{ maxWidth: '80%' }}>
                <main className="content">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
                        <div>
                            <FaUserCircle size={30} style={{ cursor: 'pointer', marginRight: '10px', marginLeft: '10px' }}
                                onClick={() => setShowUserId(!showUserId)} />
                            {showUserId && (
                                <div style={{
                                    marginLeft: '10px',
                                    padding: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column', // Change to column for vertical stacking
                                    alignItems: 'flex-start', // Align items to the start of the flex-direction
                                    gap: '10px' // Adds space between the elements inside the flex container
                                }}>
                                    <span style={{
                                        fontSize: '14px', // Slightly larger font size for better readability
                                        color: 'grey'
                                    }}>
                                        User Name : {getData.CustomerName} <br /><br />
                                        Type : {getData.CustomerType}
                                    </span>
                                    <button
                                        onClick={handleSignOutClick}
                                        style={{
                                            padding: '8px 15px',
                                            fontSize: '14px',
                                            color: 'white',
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
                                <Registration onVehicleData={handleVehicleData} />
                                {alertInfo.show && (
                                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                        {alertInfo.message}
                                    </Alert>
                                )}
                                {vehicleData && getData && <Location vehicleData={vehicleData} />}
                            </>
                        ) : null
                    }

                    {
                        sendLocation ? (
                            <>
                                {vehicleData.choosenPlan && <Location1 vehicleData={vehicleData} />}
                            </>
                        ) : null}



                    {
                        showViewVendor &&
                        <VendorApproved />
                    }

                    {
                        showViewCustomer &&
                        <CustomerApproved />
                    }
                    {
                        showVehicleClaim &&
                        <VehicleClaimRegistration />
                    }
                    {
                        showVehicleClaimView &&
                        <ViewVehicleInfo />
                    }

                    {
                        addImages &&
                        <ImageUpload />
                    }
                    {
                        myAccidentVehicle &&
                        <AccidentVehicleUser />
                    }



                </main>
            </div>

        </div>
    );
};

export default User;
