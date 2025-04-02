import React, { useState, useEffect, useRef } from 'react';
// import '../Admin/Admin.css';
import '../../Pages/CompanyAdmin/AdminHome/SideBar/Admin.css';
import MenuIcon from '@mui/icons-material/Menu';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import claimproassist from '../../Assets/claimproassistwithoutName.jpg';
import './UserSideBar.css'

function SidebarComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [showCustomerOptions, setShowCustomerOptions] = useState(false);
  const [showVendorOptions, setShowVendorOptions] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 768) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);

  const resetStates = () => {
    setShowCustomerOptions(false);
    setShowVendorOptions(false);
  };

  return (
    <div>
      {/* Menu Icon - visible on smaller screens when sidebar is closed */}
      {!isSidebarOpen && window.innerWidth < 768 && (
        <div className="menu-btn" onClick={toggleSidebar}>
          <MenuIcon /> Menu
        </div>
      )}
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        style={{ paddingLeft: "0px" }}
      >
        <ul>
          <img
            src={claimproassist}
            onClick={() => {
              setShowCustomerOptions(!showCustomerOptions);
              resetStates();
            }}
            alt="Dashboard Icon"
            className="company-img"
            style={{ cursor: 'pointer' }}
          />
          <li
            className="li-class"
            onClick={() => {
              setShowCustomerOptions(!showCustomerOptions);
              resetStates();
            }}
          >
            <SpaceDashboardIcon className="icon" />
            Dashboard
          </li>
          <li
            className="li-class"
            onClick={(e) => {
              setShowVendorOptions(!showVendorOptions);
              resetStates();
              e.stopPropagation();
            }}
          >
            <StoreIcon className="icon" />
            Vendor
            {showVendorOptions && (
              <ul className="submenu">
                <li
                  className="li-class"
                  onClick={(e) => {
                    resetStates();
                    e.stopPropagation();
                  }}
                >
                  <AddBusinessIcon className="icon" />
                  Add Vendor
                </li>
                <li
                  className="li-class"
                  onClick={(e) => {
                    resetStates();
                    e.stopPropagation();
                  }}
                >
                  <StoreIcon className="icon" />
                  View Vendor
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default SidebarComponent;
