import React, { useState,useEffect } from 'react';
import axios from 'axios';
import backendUrl from '../../../environment';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FolderIcon from '@mui/icons-material/Folder';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import PaymentIcon from '@mui/icons-material/Payment';
import RestoreIcon from '@mui/icons-material/Restore';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function BottomNavigationVendor() {
    const [value, setValue] = useState('recents');
    const navigate = useNavigate()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    // Use `useMediaQuery` to adjust size or layout based on screen width
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");



    return (
        <BottomNavigation
            sx={{
                width: isSmallScreen ? '100%' : 500, // Full width for small screens
                position: isSmallScreen ? 'fixed' : 'relative', // Fixed at the bottom for small screens
                bottom: isSmallScreen ? 0 : 'auto',
                height:"45px",
                left: 0,
                right: 0,
                zIndex: isSmallScreen ? 1000 : 'auto',
                backgroundColor: 'white', // Optional for visibility on small screens
                boxShadow: isSmallScreen ? '0 -2px 5px rgba(0,0,0,0.2)' : 'none',
            }}
            value={value}
            onChange={handleChange}
        >
             <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                    },
                }}
                label="Home"
                value="home"
                onClick={()=>{navigate("/crane-user-dashboard")}}
                icon={<HomeIcon />}
            />
          

            <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                    },
                }}
                label="All Cases"
                value="all cases"
                onClick={()=>{navigate('/crane-user-all-cases')}}
                icon={<NoteIcon/>}
            />

              <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                    },
                }}
                label="Current"
                value="case"
                // onClick={()=>{navigate('/all-accident-vehicles')}}
                icon={<PaymentIcon/>}
            />
           
            <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                    },
                }}  
                label="History"
                value="restore"
                // onClick={()=>{navigate('/all-accident-vehicles-history')}}
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                    },
                }}
                label="Account"
                value="accountCircle"
                // onClick={()=>{navigate('/user-profile')}}
                
                icon={<AccountCircleIcon />}
            />
        </BottomNavigation>
    );
}
