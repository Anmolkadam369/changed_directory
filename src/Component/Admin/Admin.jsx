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


const Admin = () => {

    const [showUserId, setShowUserId] = useState(false);
    const [getData, setGetData] = useState({});

    const user = {
        name: "John Doe",
        id: "12345"
    };

    let navigate = useNavigate();

    const [view, setView] = useState('');
    const [showVendorOptions, setShowVendorOptions] = useState(false);
    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showAssignedVehicleReport, setShowAssignedVehicleReport] = useState(false);
    const [showAddVendor, setShowAddVendor] = useState(false);
    const [showViewVendor, setShowViewVendor] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showViewCustomer, setShowViewCustomer] = useState(false);
    const [showVehicleClaim, setShowVehicleClaim] = useState(false);
    const [showVehicleInfo, setShowVehicleInfo] = useState(false);
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false);
    const [addImages, setaddImages] = useState(false);
    const [accidendVehicle, setaccidendVehicle] = useState(false);
    const [vendorResponsing, setVendorResponsing] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const [isModalOpen, setModalOpen] = useState(false);




    const [startingPage, setStartingPage] = useState(true);

    const vendorData = [10, 5, 15, 20];
    const vendorLabels = ['Advocate', 'Crane', 'Mechanic', 'Workshops'];

    const customerData = [30, 70];
    const customerLabels = ['Bulk Customers', 'Single Customers'];

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
        const response = await axios.get(`http://localhost:3001/api/findById/${id}`);
        console.log("daa", response.data)
        console.log("data", response.data.data[0]);
        setGetData(response.data.data[0])
    }

    return (
        <div className="admin-page">
            <aside className='sidebar'>
                <ul>
                    <li onClick={() => {
                        setShowCustomerOptions(!showCustomerOptions)
                        setShowAddVendor(false); // Show AddVendor Form
                        setShowViewVendor(false);
                        setShowViewCustomer(false); // Show ViewVendor Form
                        setShowAddCustomer(false); // Hide AddVendor Form
                        setStartingPage(true); // Hide Starting Page
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setaccidendVehicle(false)
                        setVendorResponsing(false)
                    }}>Dashboard</li>

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowVendorOptions(!showVendorOptions);
                        setShowAddVendor(true); // Show AddVendor Form
                        setStartingPage(false); // Hide Starting Page
                        setShowViewVendor(false); // Hide ViewVendor Form
                        setShowAddCustomer(false); // Show AddVendor Form
                        setShowViewCustomer(false); // Hide ViewVendor Form
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setaccidendVehicle(false)
                        setVendorResponsing(false)
                    }}>Vendor</li>
                    {showVendorOptions && (
                        <ul>
                            <li onClick={() => {
                                setShowAddVendor(true); // Show AddVendor Form
                                setStartingPage(false); // Hide Starting Page
                                setShowViewVendor(false); // Hide ViewVendor Form
                                setShowAddCustomer(false); // Show AddVendor Form
                                setShowViewCustomer(false); // Hide ViewVendor Form
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false)
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>
                                Add Vendor
                            </li>
                        </ul>
                    )}

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowCustomerOptions(!showCustomerOptions)
                        setShowAddVendor(false); // Show AddVendor Form
                        setShowViewVendor(false);
                        setShowViewCustomer(false); // Show ViewVendor Form
                        setShowAddCustomer(true); // Hide AddVendor Form
                        setStartingPage(false); // Hide Starting Page
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false)
                        setaddImages(false)
                        setVendorResponsing(false)
                        setaccidendVehicle(false)
                    }}>Customer</li>
                    {showCustomerOptions && (
                        <ul>
                            <li onClick={() => {
                                setShowViewCustomer(false); // Hide ViewVendor Form
                                setStartingPage(false); // Hide Starting Page
                                setShowViewVendor(false); // Show ViewVendor Form
                                setShowAddVendor(false); // Hide AddVendor Form
                                setShowAddCustomer(true); // Show AddVendor Form
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false)
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>Add Customer</li>

                        </ul>
                        // </div>
                    )}

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowVehicleInfo(!showVehicleInfo)
                        setShowAddVendor(false); // Show AddVendor Form
                        setShowViewVendor(false);
                        setShowViewCustomer(false); // Show ViewVendor Form
                        setShowAddCustomer(false); // Hide AddVendor Form
                        setStartingPage(false); // Hide Starting Page
                        setShowVehicleClaim(true);
                        setShowVehicleClaimView(false)
                        setaddImages(false)
                        setaccidendVehicle(false)
                        setVendorResponsing(false)
                    }}>Vehicle Reported</li>
                    {showVehicleInfo && (
                        <ul>
                            <li onClick={() => {
                                setShowViewCustomer(false); // Hide ViewVendor Form
                                setStartingPage(false); // Hide Starting Page
                                setShowViewVendor(false); // Show ViewVendor Form
                                setShowAddVendor(false); // Hide AddVendor Form
                                setShowAddCustomer(false); // Show AddVendor Form
                                setShowVehicleClaim(true);
                                setShowVehicleClaimView(false)
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>Register Update</li>
                            <li onClick={() => {
                                setShowViewCustomer(false); // Hide ViewVendor Form
                                setStartingPage(false); // Hide Starting Page
                                setShowViewVendor(false); // Show ViewVendor Form
                                setShowAddVendor(false); // Hide AddVendor Form
                                setShowAddCustomer(false); // Show AddVendor Form
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false)
                                setaddImages(true)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>Current Update</li>
                        </ul>
                    )}

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowReportsOptions(!showReportsOptions)
                        setShowAddVendor(false);
                        setShowViewVendor(true);
                        setShowViewCustomer(false);
                        setShowAddCustomer(false);
                        setStartingPage(false);
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setaccidendVehicle(false)
                        setVendorResponsing(false)
                    }}>Reports</li>
                    {showReportsOptions && (
                        <div style={{ marginLeft: "30px" }}>
                            <li onClick={() => {
                                setShowViewVendor(true);
                                setShowAddVendor(false);
                                setStartingPage(false);
                                setShowAddCustomer(false);
                                setShowViewCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>
                                View Vendor
                            </li>
                            <li onClick={() => {
                                setStartingPage(false);
                                setShowAddCustomer(false);
                                setShowViewVendor(false);
                                setShowAddVendor(false);
                                setShowViewCustomer(true);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>
                                View Customer
                            </li>
                            <li onClick={() => {
                                setShowViewCustomer(false);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddVendor(false);
                                setShowAddCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(true);
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(false)
                            }}>
                                View Register
                            </li>

                        </div>
                    )}

                    <li style={{ marginLeft: '10px' }} onClick={() => {
                        setShowAssignedVehicleReport(!showAssignedVehicleReport)
                        setShowAddVendor(false);
                        setShowViewVendor(false);
                        setShowViewCustomer(false);
                        setShowAddCustomer(false);
                        setStartingPage(false);
                        setShowVehicleClaim(false);
                        setShowVehicleClaimView(false);
                        setaddImages(false)
                        setaccidendVehicle(true)
                        setVendorResponsing(false)
                    }}>Assigned Vehicles</li>
                    {showAssignedVehicleReport && (
                        <div style={{ marginLeft: "30px" }}>
                            <li onClick={() => {
                                setShowViewCustomer(false);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddVendor(false);
                                setShowAddCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setaccidendVehicle(true)
                                setVendorResponsing(false)

                            }}>
                                Assign Vendors
                            </li>
                            <li onClick={() => {
                                setShowViewCustomer(false);
                                setStartingPage(false);
                                setShowViewVendor(false);
                                setShowAddVendor(false);
                                setShowAddCustomer(false);
                                setShowVehicleClaim(false);
                                setShowVehicleClaimView(false);
                                setaddImages(false)
                                setaccidendVehicle(false)
                                setVendorResponsing(true)
                            }}>
                                Vendor Response
                            </li>
                        </div>
                    )}


                </ul>
            </aside>

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
                                    User Name : {getData.username} <br /><br />
                                    User Id : {getData.randomId}
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
                        <h1 className='titles'>Administration</h1>
                        <h2 className="heading-box">
                            Vendor Details
                        </h2>

                        <section className="dashboard-summary">
                            <div className="summary-item">
                                <h2>195</h2>
                                <p>Registered Vendors</p>
                            </div>
                            <div className="summary-item">
                                <h2>150</h2>
                                <p>Active Vendors</p>
                            </div>
                            <div className="summary-item">
                                <h2>75</h2>
                                <p>Pending Orders</p>
                            </div>
                        </section>

                        <h2 className="heading-box">
                            Customer Details
                        </h2>

                        <section className="dashboard-summary">
                            <div className="summary-item">
                                <h2>195</h2>
                                <p>Registered Customers</p>
                            </div>
                            <div className="summary-item">
                                <h2>100</h2>
                                <p>Active Customers</p>
                            </div>
                            <div className="summary-item">
                                <h2>75</h2>
                                <p>Pending Orders</p>
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
