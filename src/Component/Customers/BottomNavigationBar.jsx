import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function BottomNavigationBar() {
    const [value, setValue] = useState('recents');

    let token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("uSer123", userId)


    console.log("uSer123", userId.startsWith("CC-"))

    const navigate = useNavigate()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Use `useMediaQuery` to adjust size or layout based on screen width
    const isSmallScreen = useMediaQuery('(max-width:4000px)');

    return (
        <div>
        <BottomNavigation
            sx={{
                width: isSmallScreen ? '100%' : 500, // Full width for small screens
                // position: isSmallScreen ? 'fixed' : 'relative',
                minWidth: "60px",
                position: 'fixed',
                bottom: isSmallScreen ? -1 : 'auto',
                height: "45px",
                left: 0,
                right: 0,
                zIndex: isSmallScreen ? 1000 : 'auto',
                backgroundColor: 'white', // Optional for visibility on small screens
                boxShadow: isSmallScreen ? 'inset 20px 17px 20px 0px rgba(0, 0, 0, 0.2)' : 'none',
                // clipPath: 'path("M0,0 H200 Q250,30 300,0 H500 V50 H0 Z")',
            }}
            value={value}
            onChange={handleChange}
        >
            {userId.startsWith("CC-") && (
                <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                        marginLeft:'20px'
                    },
                }}
                label="Home"
                value="home"
                onClick={() => { navigate("/user-landing-page") }}
                icon={<HomeIcon />}
            />
            )}


          {userId.startsWith("CC-") && (  <BottomNavigationAction
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
                onClick={() => { navigate("/all-vehicles-registered") }}
                icon={<FireTruckIcon />}
            />)}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%', // Adjust as needed for your layout
                    position: "relative",
                    marginTop: "-10px",
                    marginLeft:userId.startsWith('CC-')?'0px':'50px'
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
                                boxShadow:"inset 1px 1px 20px 20px rgb(237 255 232)",
                                borderRadius:"20px",
                                color:"#443f3f"
                            },
                        }}
                        label="Add"
                        value="Add Vehicle"
                        onClick={() => { navigate('/register-new-accidentvehicle') }}
                        icon={<AddCircleIcon />}
                    />
                </div>
                {/* <BottomNavigationAction
                    sx={{
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: '0.75rem', // Adjust font size
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.1rem', // Adjust icon size
                            marginTop: "18px"
                        },
                    }}
                    label="Vehicles"
                    value="vehicles"
                    onClick={() => { navigate('/all-accident-vehicles') }}
                    icon={<LocalShippingIcon />}
                /> */}
            </div>

            <BottomNavigationAction
                    sx={{
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: '0.75rem', // Adjust font size
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.1rem', // Adjust icon size
                        },
                    }}
                    label="Details"
                    value="vehicles"
                    onClick={() => { navigate('/all-accident-vehicles') }}
                    icon={<LocalShippingIcon />}
                />
            {/* <BottomNavigationAction
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
                onClick={() => { navigate('/all-accident-vehicles-history') }}
                icon={<RestoreIcon />}
            /> */}
            <BottomNavigationAction
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem', // Adjust font size
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem', // Adjust icon size
                         marginRight:'20px'
                    },
                }}
                label="Account"
                value="accountCircle"
                onClick={() => { navigate('/user-profile') }}

                icon={<AccountCircleIcon />}
            />
        </BottomNavigation>
        </div>
    );
}
