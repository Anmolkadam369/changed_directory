import React, { useState, useRef, useEffect } from 'react';


import VendorMasterForm from '../../Components/VenderMaster/VendorMasterForm';
import VendorApproved from '../../Components/VendorApproved/VendorApporoved';
import CustomerMaster from '../CustomerMaster/CustomerMaster';
import CustomerApproved from '../CustomerApporoved/CustomerApproved';
import ViewVehicleInfo from '../../Components/ViewVehicleInfo/ViewVehicleInfo';
import { FaUserCircle } from 'react-icons/fa';
import ConfirmationModal from '../../Components/ConfirmModel';
import ImageUpload from '../../Component/CompanyAdmin/ImageUpload/ImageUpload';
import AccidentVehicle from '../AccidentVehicle/AccidentVehicle';
import AccidentVehicleRegUpdate from '../AccidentVehicle/AccidentVehicleRegUpdate';
import VendorResponse from '../../Components/Vendors/VendorsResponse';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg'
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import EmployeeApproved from '../EmployeeForm/EmployeeApproved';
import Visitors from '../../Components/Visitors/Visitors';
import StoreIcon from "@mui/icons-material/Store";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from '@mui/icons-material/Badge';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HailIcon from '@mui/icons-material/Hail';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import userImg from "../../Assets/userImg.jpg";
import CustomerEnquiry from '../CustomerEnquiry/CustomerEnquiry';
import DummyDashboard from '../Dashboard/DummyDashboard';

import './Sidebar.css'

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showUserId, setShowUserId] = useState(false);
    const [userImage, setUserImage] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("token"));
    const [refreshUserId, setRefreshUserId] = useState(localStorage.getItem("userId"));

    const handleConfirmSignOut = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("department", "");
        setRefreshToken("");
        setRefreshUserId("");
        setModalOpen(false);
    };

    const handleCancelSignOut = () => { setModalOpen(false) };

    const handleSignOutClick = () => { setModalOpen(true) };

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault(); // Prevent the default behavior
    //         event.returnValue = ''; // Display confirmation dialog
    //     };

    //     const handlePopState = (event) => {
    //         // Call sign-out logic for back navigation
    //         const confirmSignOut = window.confirm('Do you want to sign out?');
    //         if (confirmSignOut) {
    //             handleSignOutClick(); // Call your sign-out logic
    //         } else {
    //             window.history.pushState(null, null, window.location.pathname);
    //         }
    //     };

    //     // Push a new state to ensure popstate event is triggered on back navigation
    //     window.history.pushState(null, null, window.location.pathname);

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     window.addEventListener('popstate', handlePopState);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         window.removeEventListener('popstate', handlePopState);
    //     };
    // }, []);

    const [getData, setGetData] = useState({});
    console.log("getData12309", getData)
    const [highlightData, setHighlightData] = useState(false);

    const toggleSidebar = () => setIsExpanded(!isExpanded);

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
    const sidebarRef = useRef(null);
    const dropdownRef = useRef(null);


    const [activeMenu, setActiveMenu] = useState(null);

    // Toggle Menu
    const toggleMenu = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu(null); // Close if it's already open
        } else {
            resetStates(); // Close all menus
            setActiveMenu(menu); // Open clicked menu
        }
    };

    // Reset states function that resets specific form states
    const resetState1 = () => {
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
        setShowAddEmployee(false);
        setShowEmployeeView(false);
        setVisitorForm(false);
        setCustomerEnquiryForm(false);
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

    // Function to reset all section expansion states
    const resetStates = () => {
        setActiveMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsExpanded(false); // Close sidebar if clicked outside
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Clean up event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarRef]);



    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div
                    className={`${isExpanded ? 'bg-white' : ''}`}
                    style={{
                        position: 'absolute',   // Ensures it overlays on top of other content
                        top: 0,
                        left: 0,
                        width: isExpanded ? '250px' : '40px',  // Full width when expanded, small width when collapsed
                        height: '100vh',  // Make the sidebar span the full viewport height
                        transition: "width 0.3s",
                        zIndex: 1000,   // Ensures the sidebar is on top of other content
                        fontSize: "14px",
                        overflow: "hidden"
                    }}>
                    <div className="d-flex flex-column align-items-start align-items-sm-start  pt-2 text-white min-vh-100" style={{ padding: "0px" }} ref={sidebarRef}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                {/* <span className="fs-5 d-none d-sm-inline">Menu</span> */}
                            </a>
                            <button onClick={toggleSidebar} className="btn text-dark">
                                {isExpanded ? '...' : '☰'} {/* Change to three dots when collapsed */}
                            </button>
                        </div>
                        {isExpanded && (

                            <ul
                                style={{ color: "darkgreen" }}
                                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu"
                            >
                                <img src={claimproassist}

                                    onClick={() => {
                                        setStartingPage(true);
                                    }}
                                    alt="Dashboard Icon" className='company-img' style={{ cursor: 'pointer' }} />
                                <p style={{ fontSize: "12px", marginBottom: "10px" }}>BVC ClaimPro Assist</p>
                                <hr style={{ borderTop: "1px solid #000", width: "100%", margin: "10px 0" }} />

                                <li className="nav-item" style={{ marginBottom: "15px", cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetState1();
                                        setStartingPage(true);
                                    }}
                                >
                                    <SpaceDashboardIcon className="icon" />
                                    Dashboard
                                </li>

                                {/* Vendor Section */}
                                <li className="nav-item" style={{ marginBottom: "10px" }} >
                                    <a href="#" className="nav-link align-middle px-0" onClick={() => toggleMenu("vendor")}>

                                        <span className="ms-1">  <StoreIcon className="icon" />Vendor</span>
                                    </a>
                                    {activeMenu === "vendor" && (
                                        <ul className="nav flex-column ms-4">
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowAddVendor(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <AddBusinessIcon className="icon" /> Add Vendor
                                            </li>
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowViewVendor(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <StoreIcon className="icon" /> View Vendor
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                {/* Customer Section */}
                                <li className="nav-item" style={{ marginBottom: "10px" }} >
                                    <a href="#" className="nav-link align-middle px-0" onClick={() => toggleMenu("customer")}>

                                        <span className="ms-1"> <PersonOutlineIcon className="icon" />Customer</span>
                                    </a>
                                    {activeMenu === "customer" && (
                                        <ul className="nav flex-column ms-4">
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowAddCustomer(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <PersonAddAltIcon className="icon" /> Add Customer
                                            </li>
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowViewCustomer(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <PersonOutlineIcon className="icon" /> View Customer
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                {/* Employee Section */}
                                <li className="nav-item" style={{ marginBottom: "10px" }} >
                                    <a href="#" className="nav-link align-middle px-0" onClick={() => toggleMenu("employee")}>

                                        <span className="ms-1">  <BadgeIcon className="icon" />Employee</span>
                                    </a>
                                    {activeMenu === "employee" && (
                                        <ul className="nav flex-column ms-4">
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowAddEmployee(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <PersonAddAltIcon className="icon" /> Add Employee
                                            </li>
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowEmployeeView(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <BadgeIcon className="icon" /> View Employee
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                <li className="nav-item" style={{ marginBottom: "10px" }} >
                                    <a href="#" className="nav-link align-middle px-0" onClick={() => toggleMenu("report")}>

                                        <span className="ms-1">  <LocalShippingIcon className="icon" />Vehicle Reported</span>
                                    </a>

                                    {activeMenu === "report" && (
                                        <ul className="nav flex-column ms-4">
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowVehicleClaim(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <AddBusinessIcon className="icon" /> Register
                                            </li>
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setShowVehicleClaimView(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <SensorOccupiedIcon className="icon" />View Register
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                <li className="nav-item" style={{ marginBottom: "10px" }} >
                                    <a href="#" className="nav-link align-middle px-0" onClick={() => toggleMenu("otherForm")}>

                                        <span className="ms-1"> <HailIcon className="icon" />Other Form</span>
                                    </a>

                                    {activeMenu === "otherForm" && (
                                        <ul className="nav flex-column ms-4">
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setVisitorForm(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <HailIcon className="icon" /> Visitor's Form
                                            </li>
                                            <li
                                                className="nav-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    resetState1();
                                                    setCustomerEnquiryForm(true);
                                                }}
                                                style={{ margin: '5px', cursor: 'pointer' }}
                                            >
                                                <HailIcon className="icon" /> Customer Enquiry
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                {/* Similar pattern for other sections */}
                                {/* Continue with Vehicle Reported, Assigned Vehicle, and Other Form Sections */}
                            </ul>


                        )}
                    </div>
                </div>
                <div className="col py-3" style={{ marginBottom: "50px" }}>

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

                </div>
            </div>
        </div>
    );
};

export default Sidebar;
