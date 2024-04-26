import React, { useState, useEffect } from 'react';
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
import AssignedVehicleMachanic from './AssignedVehiclesMachanic';
import AssignedVehicleCrain from './AssignedVehiclesCrain';


const CrainHydra = () => {

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
    console.log("vehicle", vehicleData)


    const [showCustomerOptions, setShowCustomerOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    const [showViewVendor, setShowViewVendor] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showViewCustomer, setShowViewCustomer] = useState(false);
    const [showVehicleClaim, setShowVehicleClaim] = useState(false);
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false);
    const [addImages, setaddImages] = useState(false);
    const [myAccidentVehicle, setMyAccidentVehicle] = useState(false);


    const [isModalOpen, setModalOpen] = useState(false);




    const [startingPage, setStartingPage] = useState(true);

    const vendorData = [10, 4];
    const vendorLabels = ['resolved', 'pending'];

    const customerData = [40, 50];
    const customerLabels = ['total cases', 'Days by Each Case'];

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
        const response = await axios.get(`http://localhost:3001/api/findByIdForVendor/${id}`);
        console.log("daa", response.data)
        console.log("data", response.data.data[0]);
        setGetData(response.data.data[0])
    }

    const handleVehicleData = (data) => {
        console.log("Received data from Registration:", data);
        if (data.message != "Vehicle found") alert("No Vehicle found !!!")
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

                    {/* <li style={{ marginLeft: '10px' }} onClick={() => {
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

                    }}>Adding Vehicle Data</li>
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
                                Adding Data
                            </li>

                            {vehicleData && (
                                <li onClick={() => {
                                    setShowViewCustomer(false); // Hide ViewCustomer Form
                                    setStartingPage(false); // Hide Starting Page
                                    setShowViewVendor(false); // Hide ViewVendor Form
                                    setShowAddVehicle(false); // Hide AddVehicle Form
                                    setShowAddCustomer(true); // Show AddCustomer Form
                                    setShowVehicleClaim(false);
                                    setShowVehicleClaimView(false)
                                    setaddImages(false)
                                    setMyAccidentVehicle(false)


                                }}>
                                    Send Location Details
                                </li>
                            )}
                        </ul>
                    )} */}

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
                                Cases Assigned
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
                                        User Name : {getData.vendorName} <br /><br />
                                        User Id : {getData.id}
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
                                <h1 style={{ fontSize: "170%" }}>User - {getData.vendorName} </h1>

                            </div>

                            <h2 className='heading-box'>
                                Clients Details
                            </h2>

                            <section className="dashboard-summary">
                                <div className="summary-item">
                                    <h2>4</h2>
                                    <p> Pending Tasks</p>
                                </div>
                                <div className="summary-item">
                                    <h2>10</h2>
                                    <p>Resolved Tasks</p>
                                </div>
                                <div className="summary-item">
                                    <h2>100</h2>
                                    <p>Tasks Done With Organization</p>
                                </div>

                            </section>

                            <section className="charts-section">
                                <div className="chart-container">
                                    <h2>Cases Details</h2>
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
                               <VehicleClaimEdit/>
                            </>
                        ) : null
                    }

                    {
                        showAddCustomer ? (
                            <>
                                {vehicleData && <Location1 vehicleData={vehicleData} />}
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
                        <AssignedVehicleCrain/>
                    }



                </main>
            </div>

        </div>
    );
};

export default CrainHydra;
