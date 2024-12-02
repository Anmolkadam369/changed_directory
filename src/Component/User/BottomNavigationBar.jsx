import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FolderIcon from '@mui/icons-material/Folder';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function BottomNavigationBar() {
    const [value, setValue] = useState('recents');
    const navigate = useNavigate()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Use `useMediaQuery` to adjust size or layout based on screen width
    const isSmallScreen = useMediaQuery('(max-width:600px)');

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
                onClick={()=>{navigate("/user-landing-page")}}
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
                label="Vehicles"
                value="all vehicles"
                onClick={()=>{navigate("/all-vehicles-registered")}}
                icon={<FireTruckIcon />}
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
                onClick={()=>{navigate('/all-accident-vehicles')}}
                icon={<LocalShippingIcon />}
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
                onClick={()=>{navigate('/all-accident-vehicles-history')}}
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
                onClick={()=>{navigate('/user-profile')}}
                
                icon={<AccountCircleIcon />}
            />
        </BottomNavigation>
    );
}
