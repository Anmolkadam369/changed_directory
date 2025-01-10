import React, { useState } from 'react';
import BottomNavigationBar from '../BottomNavigationBar';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './UserProfileFirst.css'
import UserProfileDetails from './UserProfileDetails';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Location1/Modal';

const UserProfileFirst = () => {
  const navigate =  useNavigate() 
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Check out this app!',
              text: 'Hey, check out this amazing app!',
              url: ' https://play.google.com/store/apps/details?id=com.lawyered.lots', // Replace with your app URL
            });
            console.log('Content shared successfully!');
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          alert('Your browser does not support the Web Share API.');
        }
      };

      const navigateToProfile = ()=>{
       navigate('/user-profile-details')
      }

      const logoutUser=()=>{
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('loginId');
        localStorage.removeItem('userRole');
        document.cookie = 'token=; path=/; max-age=0; secure; samesite=strict';
        console.log('Logged out user.');
        window.location.href = '/loginPage';
      }

 
    return (
        <div className="gradient-background">
            <p style={{fontSize:"35px", color:"white",textAlign:'center', marginBottom:"30px" }}>
            My Account
            </p>
        <div style={{
                width: "100%",
                maxHeight: "100vh", /* Ensure full height for gradient */
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor:"#f0f0f0", /* Backup solid color if gradient fails */
                marginTop: "30px",
                borderRadius: "20px",
        }}>
          <div className="menu-container-profile">
            <div className="menu-item" onClick={navigateToProfile}>
              <div className="menu-text">Profile</div>
              <KeyboardDoubleArrowRightIcon className="icon" />
            </div>
            <div className="menu-item">
              <div className="menu-text">Address</div>
              <KeyboardDoubleArrowRightIcon className="icon" />
            </div>
            <div className="menu-item" onClick={handleShare}>
              <div className="menu-text">Share App</div>
              <KeyboardDoubleArrowRightIcon className="icon" />
            </div>
            <div className="menu-item" >
              <div className="menu-text">Upgrade Plan</div>
              <KeyboardDoubleArrowRightIcon className="icon" />
            </div>
            <div className="menu-item" onClick={()=>{setOpenLogoutModal(!openLogoutModal)}}>
              <div className="menu-text">Logout</div>
              <KeyboardDoubleArrowRightIcon className="icon" />
            </div>
          </div>



          <p style={{textAlign:"center",fontWeight:"bold", fontSize:"11px"}}>version 1.1.0</p>
          <div className="bottom-bar">
            <BottomNavigationBar />
          </div>
        </div>

        <Modal  isOpen={openLogoutModal} onClose={() => setOpenLogoutModal(!openLogoutModal)}>
                {openLogoutModal && (
                    <div style={{ textAlign: "center", marginTop: "40px", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                     <p style={{textAlign:'center', color:'white', marginBottom:"20px"}}> Are you sure Logout ?</p>
                     <div className='flex gap-4' >
                        <p style={{ color: "white", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "red", minWidth: "100px", borderRadius: "20px", padding: "10px" }} onClick={logoutUser}>Logout</p>
                        <p style={{ color: "white", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "rgb(9 126 51)", minWidth: "100px", borderRadius: "20px", padding: "10px" }} onClick={() => setOpenLogoutModal(!openLogoutModal)}>Close</p>
                     </div>

                    </div>
                )}
            </Modal>
      </div>
    );
};

export default UserProfileFirst;
