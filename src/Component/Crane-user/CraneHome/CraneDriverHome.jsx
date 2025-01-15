import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import claimproassistNew from '../../../Assets/claimproassistNew.png'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';

import { useNavigate } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import CraneDriverDetails from './CraneDriverDetails';
import RidePopUp from './RidePopUp';
import BottomNavigationVendor from '../BottomNavigationVendor/BottomNavigationVendor';
import backendUrl from '../../../environment';
import CaseFirstCard from '../../CaseFirstCard/CaseFirstCard';
import { useWebSocket } from '../../ContexAPIS/WebSocketContext';

const CraneDriverHome = () => {
    const navigate = useNavigate()
    const { sendMessage } = useWebSocket();
    const { messages } = useWebSocket()
    const [isNewCase, setNewCase] = useState(false)
    const [newCasesItems, setNewCasesItems] = useState([])
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [approvedCase, setApprovedCase] = useState([])
    const [gotResponse, setGotResponse] = useState([]);
    const [getVendorData, setGetVendorData] = useState([]);
    console.log("getVendor", getVendorData)

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [data, setData] = useState([]);
    console.log("data", data)

    const [todayEarning, setTodayEarning] = useState(0);
    const [last7Days, setLast7Days] = useState(0);
    const [lastMonth, setLastMonth] = useState(0);
    const [lastYear, setLastYear] = useState(0); 
    const [newmessg, setnewmessge] = useState(false)

        useEffect(() => {
            messages.forEach((message) => {
                console.log( "crane-user-dashboard, 1232131231231231")
                if (message.forPage == "crane-user-dashboard") {
                    console.log("i have got the task here")
                    setnewmessge(true)
                    fetchAssignedCases();
                    getGotResponseVehicle()
                }
            })
        }, [messages])

    useEffect(() => {
        sendMessage({
            type: "join",
            userId: userId,
            userType: "crane",
        });
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    console.log("sendingLocatio", {
                        type: 'update-location-vendor',
                        userId: userId,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                    sendMessage({
                        type: 'update-location-vendor',
                        userId: userId,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 120000);
        updateLocation()

    }, [])

    useEffect(() => {
        if (token === '' || userId === '') {
            navigate('/');
        }
        console.log("hey here i am")
        fetchAssignedCases();
        getGotResponseVehicle()
        getVendorWholeDetails()
        getVendorById(userId)
    }, [token, userId]);

    useEffect(() => {
        if (data.length > 0) {
            const today = new Date();
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const startOf7DaysAgo = new Date(today);
            startOf7DaysAgo.setDate(today.getDate() - 7);
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const startOfYear = new Date(today.getFullYear(), 0, 1);

            let todayEarningSum = 0;
            let last7DaysSum = 0;
            let lastMonthSum = 0;
            let lastYearSum = 0;

            data.forEach((entry) => {
                const confirmDoneTime = new Date(entry.confirmDoneWorkingTime.replace('|', ' '));
                const charge = parseFloat(entry.charges);

                if (confirmDoneTime >= startOfToday) {
                    todayEarningSum += charge;
                }
                if (confirmDoneTime >= startOf7DaysAgo) {
                    last7DaysSum += charge;
                }
                if (confirmDoneTime >= startOfMonth) {
                    lastMonthSum += charge;
                }
                if (confirmDoneTime >= startOfYear) {
                    lastYearSum += charge;
                }
            });

            setTodayEarning(todayEarningSum);
            setLast7Days(last7DaysSum);
            setLastMonth(lastMonthSum);
            setLastYear(lastYearSum);
        }
    }, [data]);

    useEffect(() => {
        if (totalAssignedCases.length > 0) {
            console.log('totakassisdaf', totalAssignedCases)
            const filteredItems = totalAssignedCases.filter((caseItem) => caseItem?.details[0]?.firstResponseOn == null && caseItem?.details[0]?.timedOut == false);
            console.log('filteredItems', filteredItems)
            setNewCasesItems(filteredItems);
            setNewCase(filteredItems.length > 0);
        } else {
            setNewCasesItems([]);
            setNewCase(false);
        }
    }, [totalAssignedCases])

    const fetchAssignedCases = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/assignedTasksCrane/${userId}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log("Total assignedTasksMechanic", response.data.data);
            setTotalAssignedCases(response.data.data);
            //totalAssignedCases[i].details[0].vendorDecision != 'reject'

            response.data.data.map((item) => {
                if (item.details[0]?.customerAcceptedVendor && !item.details[0]?.vendorMoved) {
                    console.log("some inside fetchAssigneCases", item.details[0]?.customerAcceptedVendor, item.details[0]?.approvedReaching)
                    setApprovedCase([item]);
                }
            })

        } catch (error) {
            console.error("Failed to fetch assigned cases:", error);
        }
    };
    const getGotResponseVehicle = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getAssignedVehicleForDashboard/${userId}`);
            console.log("getAssignedVehicleForDashboard success", response.data.data);
            const filteredResponse = [];
            for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].firstResponseOn != null) {
                    console.log("response.data.data.firstResponseOn", response.data.data[i].firstResponseOn);
                    filteredResponse.push(response.data.data[i]);
                }
            }
            setGotResponse(filteredResponse);
        } catch (error) {
            console.error("Failed to fetch existing data", error.response || error);
            if (error.response) {
                console.log("Error data:", error.response.data);
                console.log("Error status:", error.response.status);
                console.log("Error headers:", error.response.headers);
            } else {
                console.log("Error message:", error.message);
            }
        }
    };
    const getVendorWholeDetails = async () => {
        const response = await axios.get(`${backendUrl}/api/getDriverWholeDetails/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data.data);
    };
    const getVendorById = async (userId) => {
        try {
            console.log("yeser")
            const response = await axios.get(`${backendUrl}/api/getVendorDriver/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            console.log("caseFirstCardhser", response.data.data)
            setGetVendorData(response.data.data);
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    const handleBack = () => {
        getGotResponseVehicle()
        fetchAssignedCases()
        setNewCase(false)
    }

    return (
        <div className='h-screen'>
            <div style={{zIndex:"1000"}} className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src={claimproassistNew} alt="" />
                <Link  className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <HomeIcon style={{zIndex:"1000"}} className="text-lg font-medium" />
                </Link>
            </div>
            <div className='h-3/5'>
                <MapContainer zoom={13} center={[19.0760, 72.8777]} style={{ width: '100%', height: '60vh' }}>
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                    />
                </MapContainer>
                {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}

            </div>
            {getVendorData.length > 0 && (<div className='h-2/5 p-6'>
                <CraneDriverDetails driverName = {getVendorData[0].driverName} dailyIncome={todayEarning} services={data.length} last7Days={last7Days} lastMonth={lastMonth} lastYear={lastYear} />
            </div>)}
            <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp />
            </div>
            {isNewCase && (
                <div style={{ marginTop: "-500px" }}>
                    <CaseFirstCard data={newCasesItems} getBackPage={handleBack} />
                </div>
            )}
            <BottomNavigationVendor />
        </div>
    );
};

export default CraneDriverHome;
