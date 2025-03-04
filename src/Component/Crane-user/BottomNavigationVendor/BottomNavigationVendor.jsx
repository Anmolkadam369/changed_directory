import React, { useState, useEffect } from 'react';
import axios from 'axios';
// '../../../environment';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function BottomNavigationVendor() {
    const [value, setValue] = useState('recents');
    const navigate = useNavigate()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Use `useMediaQuery` to adjust size or layout based on screen width
    const isSmallScreen = useMediaQuery('(max-width:3000px)');
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");



    return (
        <BottomNavigation
            sx={{
                width: isSmallScreen ? '100%' : 500, // Full width for small screens
                position: 'fixed',
                bottom: isSmallScreen ? 0 : 'auto',
                minWidth: "60px",
                height: "45px",
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
                onClick={() => { userId.startsWith("VC-") ?navigate("/crane-user-dashboard") :navigate("/crane-driver-home")}}
                icon={<HomeIcon />}
            />


            {userId.startsWith("VC-") && (<BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                    },
                }}
                label="vehicles"
                value="vehicles"
                onClick={() => { navigate('/crane-all-vehicles') }}
                icon={<FireTruckIcon />}
            />)}

            {userId.startsWith("VC-") && (<div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%', // Adjust as needed for your layout
                    position: "relative",
                    marginTop: "-10px",
                    marginLeft: userId.startsWith('VC-') ? '0px' : '50px'
                }}
            >
                <div
                    style={{
                        marginBottom: 'auto', // Push this to the top
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <BottomNavigationAction
                        sx={{
                            '& .MuiBottomNavigationAction-label': {
                                fontSize: '0.75rem', // Adjust font size
                                marginTop: "-27px"
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '2.4rem', // Adjust icon size,
                                boxShadow: "inset 1px 1px 20px 20px rgb(237 255 232)",
                                borderRadius: "20px",
                                color: "#443f3f"
                            },
                        }}
                        label="Add"
                        value="Add Vehicle"
                        onClick={() => { navigate('/add-new-vehicle-driver') }}
                        icon={<AddCircleIcon />}
                    />
                </div>

            </div>)}

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
                onClick={() => { navigate('/crane-user-all-cases') }}
                icon={<NoteIcon />}
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
                onClick={() => { navigate('/crane-user-profile') }}

                icon={<AccountCircleIcon />}
            />
        </BottomNavigation>
    );
}
