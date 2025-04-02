import React, { useState, useEffect } from 'react';
import '../AdminHome/Dashboard/Dashboard.css'; 
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import craneadvocatemechanic from '../../../Assets/camw.webp'; 
import vehicleIcon from '../../../Assets/vehicleIcon.webp'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Featured from '../../../Component/CompanyAdmin/Charts/Featured';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

const AdvocateDashboard = ({ getData }) => {
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [vendorData, setVendorData] = useState([])
    const [gotResponse, setGotResponse] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [adminAccepted, setAdminAccepted] = useState(0)
    const [adminRejected, setAdminRejected] = useState(0)
    const [adminPending, setAdminPending] = useState(0)
    const [workingCases, setWorkingCases] = useState(0)
    const [fullyClosedCases, setFullyClosedCases] = useState(0)


    const [doughnutData, setDoughnutData] = useState({
        labels: ['Total Vehicles', 'Fully Closed Inc Rejected', 'Working Vehicles', 'Non Working Vehicles'],
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

    const [doughnutData2, setDoughnutData2] = useState({
        labels: ['Total Cases', 'Accepted Cases', 'Rejected Cases', 'Real Pending Cases', "Response Not Sent By Vendor"],
        datasets: [
            {
                label: 'Vehicles',
                data: Array(4).fill(0),
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
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
        fetchAssignedCases();
        getAllAccidentVehicleData();
        getGotResponseVehicle();
    }, [token, userId, navigate]);

    useEffect(() => {

        const totalCases = totalAssignedCases.length;
        const fullyClosedCasesVendor = fullyClosedCases+adminRejected;
        const workingCasesVendor = workingCases-adminRejected;
        const NonworkingCasesVehicle = totalAssignedCases.length - gotResponse.length; // Update this with the actual resolved vehicles count

        setDoughnutData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: [totalCases, fullyClosedCasesVendor, workingCasesVendor, NonworkingCasesVehicle],
                },
            ],
        }));
    }, [totalAssignedCases, gotResponse, fullyClosedCases, workingCases]);

    useEffect(() => {
        const totalCases = totalAssignedCases.length;
        const acceptedCases = adminAccepted;
        const realPendingCases = adminPending - (totalAssignedCases.length - gotResponse.length);
        const rejectedCases = adminRejected; // Update this with the actual resolved vehicles count
        const responseNotSentToAdmin = adminPending - realPendingCases
        setDoughnutData2((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: [totalCases, acceptedCases, rejectedCases, realPendingCases, responseNotSentToAdmin],
                },
            ],
        }));
    }, [totalAssignedCases, adminAccepted, adminPending, adminRejected]);


    const getGotResponseVehicle = async () => {
        try {
            console.log("userId,userId",userId)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAssignedVehicleForDashboard/${userId}`);
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

    const fetchAssignedCases = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/assignedCasesAdvocate/${userId}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            console.log("Total assignedCasesAdvocate", response.data.data);
            setTotalAssignedCases(response.data.data);
        } catch (error) {
            console.error("Failed to fetch assigned cases:", error);
        }
    };


    useEffect(() => {
        if (gotResponse.length != 0) {
            let fullyClosedCount = 0;
            let workingCount = 0;

            for (let i = 0; i < gotResponse.length; i++) {
                let caseIsFullyClosed = true;
                const caseFields = gotResponse[i];
                console.log("keyincasefield", gotResponse[i].cheque)
                for (let key in caseFields) {
                    if (key === "cheque" || key === "onlinePaymentImg" || key === "paidByCash") continue;
                        if (caseFields[key] === null || caseFields[key] === "") {
                            caseIsFullyClosed = false;
                            break;  
                    }
                }
                if (caseIsFullyClosed && (gotResponse[i].cheque != null || gotResponse[i].onlinePaymentImg != null || gotResponse[i].paidByCash != null)) {
                    fullyClosedCount++;
                } else {
                    workingCount++;
                }
            }
            setFullyClosedCases(fullyClosedCount);
            setWorkingCases(workingCount);
        }
    }, [gotResponse])

    useEffect(() => {
        console.log("INSIDE TOTALASSIGNED CASES")
        if (totalAssignedCases.length !== 0) {
            let acceptedCount = 0;
            let rejectedCount = 0;
            let pendingCount = 0;

            for (let i = 0; i < totalAssignedCases.length; i++) {
                if (totalAssignedCases[i].details.length === 0 || totalAssignedCases[i].details[0].acceptedByAdmin === null) {
                    pendingCount++;
                } else if (totalAssignedCases[i].details[0].acceptedByAdmin === "accept") {
                    acceptedCount++;
                } else if (totalAssignedCases[i].details[0].acceptedByAdmin === "reject") {
                    rejectedCount++;
                }
            }
            setAdminAccepted(acceptedCount);
            setAdminRejected(rejectedCount);
            setAdminPending(pendingCount);
        }
    }, [totalAssignedCases]);


    const getAllAccidentVehicleData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
            console.log("responssesesesee", response)
            // if (response.data.message === "No accident vehicle data found.") setAccidentVehData([])
            // else setAllAccidentVehicleData(response.data.data);
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
                <title>Advocate Dashboard - Claimpro</title>
                <meta name="description" content="Manage assigned vehicles, view tasks, and analyze case details on the Claimpro Mechanic Dashboard." />
                <meta name="keywords" content="Mechanic Dashboard, Claimpro, Vehicle Management, Task Management, Case Details" />
                <link rel='canonical' href={`https://claimpro.in/MechanicDashboard`} />
            </Helmet>

            <main className="main-content">
                <div className='other-content'>
                    <div style={{ display: "relative" }}>

                        <div className="stat-container">
                            <div className="stat-item">
                                <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                <h3>Total Cases Assigned</h3>
                                <p>{totalAssignedCases.length}</p>
                            </div>

                            <div className="stat-item">
                                <ThumbUpAltOutlinedIcon className="small-image" />
                                {/* <img src={SwipeRightAltOutlinedIcon} className="small-image" alt="accpeted By Admin" /> */}
                                <h3>Accepted By Admin</h3>
                                <p>{adminAccepted}</p>
                            </div>

                            <div className="stat-item">
                                <ThumbDownOutlinedIcon className="small-image" />
                                <h3>Rejected By Admin</h3>
                                <p>{adminRejected}</p>
                            </div>

                            <div className="stat-item">
                                <PendingActionsOutlinedIcon className="small-image" />
                                <h3>Pending (Admin and Not Requested)</h3>
                                <p>{adminPending}</p>
                            </div>

                        </div>
                        <div className="stat-container">
                            <div className="stat-item">
                                <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                <h3>Response Given</h3>
                                <p>{gotResponse.length}</p>
                            </div>

                            <div className="stat-item">
                                <AssignmentTurnedInOutlinedIcon className="small-image" />
                                <h3>Fully Closed Inc Rejected Cases</h3>
                                <p>{fullyClosedCases+adminRejected}</p>
                            </div>
                            <div className="stat-item">
                            <PendingActionsOutlinedIcon className="small-image" />
                                <h3>Working Cases</h3>
                                <p>{workingCases-adminRejected}</p>
                            </div>
                            <div className="stat-item">
                            <PendingOutlinedIcon className="small-image" />
                                <h3>Non Started Cases</h3>
                                <p>{totalAssignedCases.length - gotResponse.length}</p>
                            </div>
                        </div>

                        <div className="statistics">
                            <div className="charts">

                                <div className="chart-item">
                                    <h3 className="chart-title"> Vehicle Working Status</h3>
                                    <Doughnut data={doughnutData} />
                                </div>

                                <div className="chart-item">
                                    <h3 className="chart-title"> Admin Cases Status</h3>
                                    <Doughnut data={doughnutData2} />
                                </div>
                                <Featured />


                                {/* <Chart /> */}

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

}

export default AdvocateDashboard;