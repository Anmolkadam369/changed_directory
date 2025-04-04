import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css'; 
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import craneadvocatemechanic from '../../../../Assets/camw.webp'; 
import customerImage from '../../../../Assets/customer.webp'; 
import complaints from '../../../../Assets/complaints.webp'; 
import vehicleIcon from '../../../../Assets/vehicleIcon.webp'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Chart from '../../../../Component/CompanyAdmin/Charts/Chart';

const UserDashboard = () => {
    const [vendorData, setVendorData] = useState([]);
    const [accidentVehData, setAccidentVehData] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    console.log("answer", accidentVehData)

    const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';
    const effectRan = useRef(false);
    const urlBase64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };

    useEffect(() => {
        if (effectRan.current === false) {
            const sendLoginNotification = async () => {
                try {
                    console.log('Registering service worker...');
                    const registration = await navigator.serviceWorker.register('/service-worker.js');
                    console.log('Service worker registered:', registration);

                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                    });
                    console.log('Push Manager subscription:', subscription);

                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscription/${userId}`, subscription,{ headers: { Authorization: `Bearer ${token}` }});

                } catch (error) {
                    console.error('Error sending login notification:', error);
                }
            };

            sendLoginNotification();
            effectRan.current = true;
        }
    }, []);

    

    const [doughnutData, setDoughnutData] = useState({
        labels: ['Total Vehicles', 'Accident Vehicles', 'Resolved Vehicles', 'Pending Vehicles'],
        datasets: [
            {
                label: 'Vehicles',
                data: Array(4).fill(0),
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (token === '' || userId === '') {
            navigate('/');
        }
        getVendorData();
        getAllAccidentVehicleData();
        getAccidentData();
    }, [token, userId, navigate]);

    useEffect(() => {
        const totalVehicles = vendorData.length;
        const accidentVehicles = accidentVehData.length;
        const resolvedVehicles = 0; // Update this with the actual resolved vehicles count
        const pendingVehicles = allAccidentVehicleData.length;

        setDoughnutData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: [totalVehicles, accidentVehicles, resolvedVehicles, pendingVehicles],
                },
            ],
        }));
    }, [vendorData, accidentVehData, allAccidentVehicleData]);

    const getAccidentData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
            console.log("mesage123" ,response.message)
            console.log("mesage" ,response.data.message)
            if(response.data.message === "No accident vehicle data found.") setAccidentVehData([])
            else setAccidentVehData(response.data.data);
        } catch (error) {
            console.error("Error fetching accident data", error);
        }
    };

    const getVendorData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalVehicleInfoById/${userId}`);
            setVendorData(response.data.data);
        } catch (error) {
            console.error("Error fetching vendor data", error);
        }
    };

    const getAllAccidentVehicleData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
            console.log("responssesesesee", response)
            if(response.data.message === "No accident vehicle data found.") setAccidentVehData([]) 
            else setAllAccidentVehicleData(response.data.data);
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    const markerIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // const generateFile = async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getWeeklyReports/${userId}`);
    //         setGeneratedExcel(response.data.data);
    //         setIsLoading(false);
    //         setIsGenerated(true);
    //     } catch (error) {
    //         setIsLoading(false);
    //         console.error(error.message);
    //     }
    // };

    return (
        <div className="dashboard">
            <Helmet>
                <title>Accident Dashboard - Claimpro</title>
                <meta name="description" content="Dashboard for BVC ClaimPro Assist and for vehicle accidents. Keep track of Vendors, Customers actions taken." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/UserDashboard`} />
            </Helmet>

            <main className="main-content">
                <div className='other-content'>
                    <div style={{ display: "relative" }}>

                        <div className="stat-container">
                            <div className="stat-item">
                                <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                <h3>Number Vehicles</h3>
                                <p>{vendorData.length}</p>
                            </div>

                            <div className="stat-item">
                                <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                <h3>Accident Vehicles</h3>
                                <p>{accidentVehData.length}</p>
                            </div>

                            <div className="stat-item">
                                <img src={customerImage} className="small-image" alt="Vendor Types" />
                                <h3>Number of Resolved Vehicles</h3>
                                <p>{0}</p>
                            </div>

                            <div className="stat-item">
                                <img src={complaints} className="small-image" alt="Vendor Types" />
                                <h3>Number of Pending Vehicles</h3>
                                <p>{allAccidentVehicleData.length}</p>
                            </div>
                        </div>

                        <div className="statistics" style={{display:"flex",width:'300px'}}>
                            <div className="charts" >
                                {/* <Featured /> */}

                                <div className="chart-item">
                                    <h3 className="chart-title"> Distribution</h3>
                                    <Doughnut data={doughnutData} />
                                </div>

                                <Chart />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="map-container" style={{ height: '400px', marginRight: "40px", width: '100%', borderRadius: '10px' }}>
                    <MapContainer center={[19.0760, 72.8777]} zoom={10} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[19.0760, 72.8777]} icon={markerIcon}>
                            <Popup>
                                Mumbai
                            </Popup>
                        </Marker>
                        <Marker position={[28.6139, 77.2090]} icon={markerIcon}>
                            <Popup>
                                Delhi
                            </Popup>
                        </Marker>
                        <Marker position={[12.9716, 77.5946]} icon={markerIcon}>
                            <Popup>
                                Karnataka
                            </Popup>
                        </Marker>
                        <Marker position={[20.9517, 85.0985]} icon={markerIcon}>
                            <Popup>
                                Orissa
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </main>
        </div>
    );

};

export default UserDashboard;
