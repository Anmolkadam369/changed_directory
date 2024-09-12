import React, { useState } from 'react';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from '@mui/icons-material/Badge';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HailIcon from '@mui/icons-material/Hail';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CenterFocusWeakIcon from '@mui/icons-material/OpenWith';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VendorApproved from '../VendorApproved/VendorApporoved';

const SidebarWithSubmenus = () => {
    const [starting, setStarting] = useState(true);
    const [showViewVendor, setShowViewVendor] = useState(false);
    const handleView = () => {
        setStarting(false);
        setShowViewVendor(true)
    }


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <SpaceDashboardIcon className="icon" />
                            <span className="fs-5 d-none d-sm-inline">Dashboard</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                            <li>
                                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2"></i> <StoreIcon fontSize='small' className="icon" /> <span className="ms-1 d-none d-sm-inline">Vendor</span>
                                </a>
                                <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <AddBusinessIcon fontSize="small" className="icon2" /> <span className="d-none d-sm-inline">Add Vendor</span>   </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="nav-link px-0"
                                            onClick={() => handleView()} // Correctly set the onClick handler
                                        >
                                            <StoreIcon fontSize="small" className="icon2" />
                                            <span className="d-none d-sm-inline">View Vendor</span>
                                        </a>

                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-bootstrap"></i> <PersonOutlineIcon fontSize='small' className="icon" /> <span className="ms-1 d-none d-sm-inline">Customer</span>
                                </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0">  <PersonAddAltIcon fontSize="small" className="icon2" /> <span style={{ fontSize: "13px" }} className="d-none d-sm-inline">Add Customer</span> </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <PersonOutlineIcon fontSize="small" className="icon2" /> <span className="d-none d-sm-inline">View Customer</span> </a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span>
                                </a>
                            </li>
                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span>
                                </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#submenu4" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                </a>
                                <ul className="collapse show nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1 </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2 </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span>
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                            <a
                                href="#"
                                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                id="dropdownUser1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                            </a>
                        </div>
                    </div>
                </div>
                {starting && (<div className="col py-3">
                    <h3>Left Sidebar with Submenus</h3>
                    <p className="lead">
                        An example 2-level sidebar with collapsible menu items. The menu functions like an "accordion" where only a single
                        menu is open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller
                        screens.
                    </p>
                    <ul className="list-unstyled">
                        <li>
                            <h5>Responsive</h5> shrinks in width, hides text labels and collapses to icons only on mobile
                        </li>
                    </ul>
                </div>)}
                {
                    showViewVendor &&
                    <VendorApproved />
                }
            </div>
        </div>
    );
};

export default SidebarWithSubmenus;
