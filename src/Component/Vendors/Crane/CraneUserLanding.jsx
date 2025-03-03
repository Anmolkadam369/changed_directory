import React, { useState, useEffect } from 'react';
import '../../Dashboard/Dashboard.css'; // Ensure you create this CSS file for styling
import { Doughnut } from 'react-chartjs-2';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import axios from 'axios';
import backendUrl from '../../../environment';
import rupeesymbol from '../../../Assets/rupeesymbol.png'
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { tokenState, userIdState } from '../../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import craneadvocatemechanic from '../../../Assets/camw.webp'; // Correct import path
import customerImage from '../../../Assets/customer.webp'; // Correct import path
import complaints from '../../../Assets/complaints.webp'; // Correct import path
import vehicleIcon from '../../../Assets/vehicleIcon.webp'; // Correct import path
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Chart from '../../Charts/Chart';
import Featured from '../../Charts/Featured';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import AssignedVehicleCrane from '.././AssignedVehiclesCrane';
import CaseFirstCard from '../../CaseFirstCard/CaseFirstCard';
import TargetVsReality from '../../AAAAAAAAAAAAAAAAAA/TargetVsReality/TargetVsReality.tsx';
import VendorViewRating from '../../VendorViewRating/VendorViewRating.jsx';
import advocateprotest from '../../../Assets/advocateprotest.png'
import mechanicuser from '../../../Assets/mechanicuser.png'
import garageuser from '../../../Assets/garageuser.png'
import cranetruckuser from '../../../Assets/cranetruckuser.png'
import onRoad from '../../../Assets/onRoad.png'
import comingCrane from '../../../Assets/comingCrane.png'
import commissionpaid from '../../../Assets/commissionpaid.png'
import hourglass from '../../../Assets/hour-glass.png'
import crossUser from '../../../Assets/crossUser.png'

import totalcases from '../../../Assets/totalcases.png'
import Registration from '../../Registration/Registration.jsx';





const CraneUserLanding = () => {
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [vendorData, setVendorData] = useState([])
    const [gotResponse, setGotResponse] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [adminAccepted, setAdminAccepted] = useState(0)
    const [adminRejected, setAdminRejected] = useState(0)
    const [adminPending, setAdminPending] = useState(0)
    const [workingCases, setWorkingCases] = useState(0)
    const [fullyClosedCases, setFullyClosedCases] = useState(0)
    const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    const [caseDetails, setCaseDetails] = useState(false);

    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
    }

    const [selectedCaseType, setSelectedCaseType] = useState(1);
    const handleCaseClick = (value) => {
        setSelectedCaseType((prevSelected) => (prevSelected === value ? null : value));
    };



    const [doughnutData, setDoughnutData] = useState({
        labels: ['Total Vehicles', 'Fully Closed Inc. Rejected', 'Working Vehicles', 'Non Working Vehicles'],
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
        const fullyClosedCasesVendor = fullyClosedCases + adminRejected;
        const workingCasesVendor = workingCases - adminRejected;
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


    const fetchAssignedCases = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/assignedTasks/${userId}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            console.log("Total assignedTasksMechanic", response.data.data);
            setTotalAssignedCases(response.data.data);
        } catch (error) {
            console.error("Failed to fetch assigned cases:", error);
        }
    };

    const getFilteredData = (filter) => {
        console.log("data is here");

        const now = new Date();  // Current date and time
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        const yesterday = new Date(now.getTime() - oneDay); // Yesterday's date and time
        const weekBefore = new Date(now.getTime() - (oneDay * 7));
        const monthBefore = new Date(now.getTime() - (oneDay * 30));



        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const todayDate = formatDate(now);
        const yesterdayDate = formatDate(yesterday);
        const weekBeforeDate = formatDate(weekBefore)
        const monthBeforeDate = formatDate(monthBefore)

        console.log("todayDate", todayDate)
        console.log("yesterdayDate", yesterdayDate)


        for (let i = 0; i < totalAssignedCases.length; i++) {
            let getTime = totalAssignedCases[i].craneAssignedOn.split('|');
            let assignedDate = getTime[0];
            let assignedTime = getTime[1];
            let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

            if (filter === 'daily') {
                if (assignedDate === todayDate || assignedDate === yesterdayDate) {
                    const timeDifference = now - assignedDateTime;
                    if (timeDifference <= oneDay) {
                        console.log("Match found within last 24 hours:", totalAssignedCases[i]);
                    }
                }
            }
            else if (filter === 'weekly') {
                if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
                    console.log("Match found within last 7 days:", totalAssignedCases[i]);
                }
            }
            else if (filter === 'monthly') {
                if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
                    console.log("Match found within last 30 days:", totalAssignedCases[i]);
                }
            }
        }
    };

    console.log("totalAssignedCases:", totalAssignedCases);

    useEffect(() => {
        if (gotResponse.length !== 0) {
            let fullyClosedCount = 0;
            let workingCount = 0;

            for (let i = 0; i < gotResponse.length; i++) {
                let caseIsFullyClosed = true;
                const caseFields = gotResponse[i];

                for (let key in caseFields) {
                    console.log("caseField", caseFields);

                    // Exclude specific fields from affecting the fully closed status
                    if (key === "cheque" || key === "onlinePaymentImg" || key === "paidByCash" ||
                        key === "reasonforRejection" || key === "rejectionReason" || key === "transactionId") {
                        continue;
                    }

                    // Set case as not fully closed if any relevant field is null or empty
                    if (caseFields[key] === null || caseFields[key] === "") {
                        caseIsFullyClosed = false;
                        break;
                    }
                }

                console.log("gotResponse[i].cheque", gotResponse[i].cheque);

                // Check if case is fully closed based on payment fields
                if (caseIsFullyClosed &&
                    (gotResponse[i].cheque !== null ||
                        gotResponse[i].onlinePaymentImg !== null ||
                        gotResponse[i].paidByCash !== null)) {
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
            const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
            console.log("responssesesesee", response)
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
    //         const response = await axios.get(`${backendUrl}/api/getWeeklyReports/${userId}`);
    //         setGeneratedExcel(response.data.data);
    //         setIsLoading(false);
    //         setIsGenerated(true);
    //     } catch (error) {
    //         setIsLoading(false);
    //         console.error(error.message);
    //     }
    // };

    // Check if Geolocation is supported



    const [selected, setSelected] = useState(null);
    const handleClick = (func, index) => {
        setSelected(index);
        func();
    };

    const [filterForVehicleCrane, setFilterForVehicleCrane] = useState("all")
    const [isSelected, setIsSelected] = useState("")
    const casesFilterForVehicleCrane = (filter) => {
        setFilterForVehicleCrane(filter)
        setIsSelected(filter);
    }
    let flickerClass;
    if ((totalAssignedCases.length - gotResponse.length) > 0) {
        flickerClass = isSelected !== "Non Started Cases" ? 'shine' : ""
    }

    const [isNewCase, setNewCase] = useState(false)
    console.log("ISNEW CAESE ERESRE", isNewCase)
    console.log("GotRepsonce", gotResponse)

    const [newCasesItems, setNewCasesItems] = useState([])
    console.log("setNewCasesItems bonenza", setNewCasesItems)
    console.log("(totalAssignedCases.length - gotResponse.length)", (totalAssignedCases.length - gotResponse.length))

    useEffect(() => {
        console.log("totalAssignedCases:", totalAssignedCases);
        console.log("gotResponse:", gotResponse);
        console.log("Difference:", totalAssignedCases.length - gotResponse.length);

        if ((totalAssignedCases.length - gotResponse.length) > 0) {
            const filteredItems = totalAssignedCases.filter((caseItem) => caseItem?.details[0]?.firstResponseOn == null);
            // setNewCasesItems(filteredItems);
            // setNewCase(true);
        } else {
            setNewCasesItems([]);
            setNewCase(false);
        }
    }, [totalAssignedCases, gotResponse]);

    const handleBack = () => {
        setNewCase(false)
        getGotResponseVehicle()
        fetchAssignedCases()
        getAllAccidentVehicleData()
    }


    return (
        <div className="dashboard">
            <Helmet>
                <title>Crane Dashboard - Claimpro</title>
                <meta name="description" content="Manage assigned vehicles, view tasks, and analyze case details on the Claimpro Mechanic Dashboard." />
                <meta name="keywords" content="Mechanic Dashboard, Claimpro, Vehicle Management, Task Management, Case Details" />
                <link rel='canonical' href={`https://claimpro.in/CraneDashboard`} />
            </Helmet>

            <main className="main-content">
                {/* {!isNewCase && (
                    <div>
                        <div className='other-content'>
                            <div style={{ display: "relative" }}>
                                <div style={{ display: 'flex' }}>
                                    <p
                                        className={`topdivs ${selected === 1 ? 'selected' : ''}`}
                                        onClick={() => { getFilteredData('daily') }}
                                    >
                                        Daily
                                    </p>
                                    <p
                                        className={`topdivs ${selected === 2 ? 'selected' : ''}`}
                                        onClick={() => { getFilteredData('weekly') }}
                                    >
                                        Weekly
                                    </p>
                                    <p
                                        className={`topdivs ${selected === 3 ? 'selected' : ''}`}
                                        onClick={() => { getFilteredData('monthly') }}
                                    >
                                        Monthly
                                    </p>
                                </div>
                                <div className="stat-container">
                                    <div className={`stat-item ${flickerClass}`} onClick={() => casesFilterForVehicleCrane('Non Started Cases')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Non Started Cases" ? '#00000074' : 'transperant'
                                        }}>
                                        <PendingOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }}>New Case</h3>
                                        <p>{totalAssignedCases.length - gotResponse.length}</p>
                                    </div>
                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('getAll')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "getAll" ? '#00000074' : 'transparent', // Change background color on selection
                                        }}>
                                        <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                        <h3 style={{ fontSize: "0.6rem" }}>Total Cases Assigned</h3>
                                        <p>{totalAssignedCases.length}</p>
                                    </div>

                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Accepted Vehicles')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Accepted Vehicles" ? '#00000074' : 'transparent', // Change background color on selection
                                        }}>
                                        <ThumbUpAltOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }}>Accepted By Admin</h3>
                                        <p>{adminAccepted}</p>
                                    </div>

                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Rejected Vehicles')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Rejected Vehicles" ? '#00000074' : 'transparent', // Change background color on selection
                                        }}>
                                        <ThumbDownOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }}>Rejected By Admin</h3>
                                        <p>{adminRejected}</p>
                                    </div>

                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Pending Vehicles')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Pending Vehicles" ? '#00000074' : 'transparent', // Change background color on selection
                                        }}>
                                        <PendingActionsOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }}>Pending (Admin and Not Requested)</h3>
                                        <p>{adminPending}</p>
                                    </div>

                                </div>

                                <div className="stat-container">
                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Response given')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Response given" ? '#00000074' : 'transparent', // Change background color on selection
                                        }}>
                                        <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                        <h3 style={{ fontSize: "0.6rem" }}>Response Given</h3>
                                        <p>{gotResponse.length}</p>
                                    </div>
                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Completed Cases')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Completed Cases" ? '#00000074' : 'transparent', // Change background color on selection
                                        }}>
                                        <AssignmentTurnedInOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }}>Fully Closed Cases</h3>
                                        <p>{fullyClosedCases + adminRejected}</p>
                                    </div>
                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Working Vehicles')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Working Vehicles" ? '#00000074' : 'white', // Change background color on selection
                                        }}>
                                        <PendingActionsOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }} >Working Cases</h3>
                                        <p>{workingCases - adminRejected}</p>
                                    </div>
                                    <div className="stat-item" style={{ background: "#f0f0f000", border: 'none', boxShadow: "none" }}>
                                    </div>
                                    <div className="stat-item" style={{ background: "#f0f0f000", border: 'none', boxShadow: "none" }}>
                                    </div>

                                </div>

                                <div style={{ marginBottom: "30px" }}>
                                    <AssignedVehicleCrane getFilterInfo={filterForVehicleCrane} />
                                </div>

                                <div className="statistics">
                                    <div className="charts">

                                        <div className="chart-item" style={{ background: "radial-gradient(rgb(171 221 193), rgba(245, 245, 245, 0))" }}>
                                            <h3 className="chart-title"> Vehicle Working Status</h3>
                                            <Doughnut data={doughnutData} />
                                        </div>

                                        <div className="chart-item" style={{ background: "radial-gradient(rgb(81 ,191, 213), rgba(245, 245, 245, 0))" }}>
                                            <h3 className="chart-title"> Admin Cases Status</h3>
                                            <Doughnut data={doughnutData2} />
                                        </div>
                                        <Featured />

                                        <VendorViewRating/>



                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )} */}

                <div>

                <div style={{ background: 'darkgreen', height: "30px", margin: "-10px 0" }}>
                    
                </div>

                    <div style={{ minWidth: "280px", margin: '10px', boxShadow: 'rgb(25 25 25 / 20%) 2px 11px 20px 12px', borderRadius: "5px", padding: "10px" }}>


                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '5px' }}>

                            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
                                <div style={{ display: "flex", marginRight: '10px', marginLeft: "10px", flexDirection: "column" }}>
                                    <p style={{ fontSize: "12px", marginBottom: "12px", color: 'blue', display: 'flex', alignItems: 'center' }}><img src={rupeesymbol} style={{ marginRight: "5px", height: "20px", width: '20px' }} />Earning's</p>
                                    <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>₹ 3000</p>
                                </div>
                                |

                                <div style={{ display: "flex", marginRight: "10px", marginLeft: "10px", flexDirection: "column" }}>
                                    <p style={{ fontSize: "12px", marginBottom: "12px", color: '#0eb1b3', display: 'flex', alignItems: 'center' }}><img src={comingCrane} style={{ marginRight: "5px", height: "20px", width: '20px' }} />No Of Services</p>
                                    <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>2</p>
                                </div>
                                |
                                <div style={{ display: "flex", marginRight: "10px", marginLeft: "10px", flexDirection: "column" }}>
                                    <p style={{ fontSize: "12px", marginBottom: "12px", color: '#ff8400', display: 'flex', alignItems: 'center' }}><img src={commissionpaid} style={{ marginRight: "5px", height: "20px", width: '20px' }} />Commision</p>
                                    <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>₹ 600</p>
                                </div>
                            </div>

                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ textAlign: "center", flex: 1, marginRight: '10px', borderRadius: "10px", background: '#e6e6fa30' }}>
                                <p style={{ padding: "7px", fontSize: "12px", color: '#ff8400' }}><img src={hourglass} style={{ marginRight: "5px", height: "20px", width: '20px' }} />Today's hours</p>
                                <p className="amount" style={{ fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>6.5 hours</p>
                                <p className="amount" style={{ fontSize: "10px", marginBottom: "12px", color: 'blue' }}>Active From 9.50 AM</p>
                            </div>



                            <div style={{ textAlign: "center", flex: 1, marginRight: '10px', borderRadius: "10px", background: '#e6e6fa30' }}>
                                <p style={{ fontSize: "12px", padding: "7px", color: 'blue' }}><img src={onRoad} style={{ marginRight: "5px", height: "20px", width: '20px' }} />Road around</p>
                                <p className="amount" style={{ fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>30 km</p>
                            </div>
                        </div>






                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                            <p style={{
                                fontSize: '11px',
                                marginTop: "5px",
                                background: "#a7a5a5",
                                padding: "10px",
                                border: '2px solid #000000',
                                textAlign: 'center',
                                borderRadius: '30px',
                                fontWeight: "bold",
                                color: "white",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: "center",
                                position: "relative",
                                cursor: "pointer",
                                maxWidth: "400px",
                                minWidth: "180px",
                                margin: '5px 5px 5px 5px',
                                height: "30px"
                            }} >
                                <KeyboardDoubleArrowRightIcon style={{
                                    position: "absolute",
                                    left: '5px',
                                }} />
                                View more ...
                            </p>


                        </div>


                    </div>
                    <div className="start-container" style={{
                        filter: isNewCase ? "blur(4px)" : "none", // Apply blur effect
                        opacity: isNewCase ? 0.5 : 1, // Reduce opacity if blurred
                        pointerEvents: isNewCase ? "none" : "auto" // Disable clicking
                    }}>
                        <div className="imageContainer">
                            <div className="imageWrapper">
                                <img src={cranetruckuser} className="image" alt="truckimag2" />
                                <div className="description">
                                    <p>Crane Services - Heavy Vehicles</p>
                                </div>
                            </div>
                            <div className="imageWrapper">
                                <img src={advocateprotest} style={{ background: "radial-gradient(#000000, #00000024)" }} className="image" alt="truckimag2" />
                                <div className="description">
                                    <p>Advocate services-legal issues</p>
                                </div>
                            </div>
                            <div className="imageWrapper">
                                <img src={mechanicuser} style={{ background: "radial-gradient(#6cd961, #00000024)" }} className="image" alt="truckimage" />
                                <div className="description">
                                    <p>On-spot-repair - mechanic</p>
                                </div>
                            </div>

                            <div className="imageWrapper">
                                <img src={garageuser} style={{ background: "radial-gradient(rgb(254 0 0), rgba(0, 0, 0, 0.14))" }} className="image rounded" alt="truckimage" />
                                <div className="description">
                                    <p>Workshop Services - All at one palce</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <p style={{ textAlign: "center", fontSize: "12px", fontWeight: "bold", }}>New Cases </p>
                    <div style={{ border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "5px", padding: "10px" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>MH 14 FE 6020</span>
                            </div>

                            {/* <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>4.5</div> */}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Working: </p>
                            <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>30 minutes</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "3px 10px 5px 10px", fontSize: "12px", borderRadius: "10px", color: 'blue', border: "1px solid green", background: 'white' }}>Processing...</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                            <p style={{
                                fontSize: '11px',
                                marginTop: "5px",
                                background: "green",
                                padding: "10px",
                                border: '1px solid blue',
                                textAlign: 'center',
                                borderRadius: '30px',
                                fontWeight: "bold",
                                color: "white",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: "center",
                                position: "relative",
                                cursor: "pointer",
                                margin: '5px 5px 5px 5px',
                                maxWidth: "400px",
                                minWidth: "180px",
                            }} onClick={(e) => setCaseDetails(true)}>
                                <KeyboardDoubleArrowRightIcon style={{
                                    position: "absolute",
                                    left: '10px'
                                }} />
                                View Case
                            </p>
                            {/* <p style={{
                        fontSize: '11px',
                        marginTop: "5px",
                        background: "white",
                        padding: "10px",
                        border: '2px solid #000000',
                        textAlign: 'center',
                        borderRadius: '30px',
                        fontWeight: "bold",
                        color: "blue",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "relative",
                        cursor: "pointer",
                        maxWidth: "400px",
                        minWidth: "120px",
                        margin: '5px 5px 5px 5px',
                        height: "30px"
                    }}>
                        Cancel
                        <img src={crossUser} style={{
                            position: "absolute",
                            right: '10px', width: '15px', height: '15px'
                        }} />
                    </p> */}

                        </div>
                    </div>
                </div>


                {caseDetails && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "flex-end", // positions the container at the bottom
                            justifyContent: "center",
                            animation: "slideUp 0.5s ease-out",
                        }}
                    >
                        {/* Modal Container */}
                        <div
                            style={{
                                position: "relative",
                                width: "97%",
                                maxWidth: "600px",
                                backgroundColor: "#fff", // white background for the content
                                borderRadius: "15px 15px 0px 0px",
                                // marginBottom: "30px",
                                maxHeight: "80%", // limit the height for scrollability
                                overflowY: "auto", // enables vertical scrolling
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            {/* Cross Icon */}
                            <div className="selecting-container">
                                <div
                                    className={`selecting-box vendorselected ${selected === 1 ? 'selected' : ''}`}
                                    onClick={() => handleCaseClick(1)}
                                >
                                    Vehicle
                                </div>
                                <div
                                    className={`selecting-box customerselected ${selected === 2 ? 'selected' : ''}`}
                                    onClick={() => handleCaseClick(2)}
                                >
                                    Case
                                </div>
                            </div>
                            <img
                                src={crossUser}
                                onClick={() => setCaseDetails(false)}
                                style={{
                                    position: "absolute",
                                    // top: "-10px",
                                    left: "calc(100% - 35px)",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                }}
                            />
                            {selectedCaseType == 1 && (
                                <Registration />
                            )}

                            {selectedCaseType == 2 && (
                                <div>
                                    <div style={{
                                        marginTop: "30px",

                                        animation: "slideUp 0.5s ease-out" // apply the animation
                                    }}>

                                        <div style={{ position: "absolute", width: "90%", maxWidth: "600px", marginBottom: "430px" }}>
                                            {/* Cross Icon */}
                                            <img src={crossUser} onClick={(e) => setIsImageContainerVisible(false)}

                                            // Add a close function if needed
                                            />
                                        </div>


                                        <div className="image-container" style={{
                                            backgroundColor: "#ffffff",
                                            padding: "20px 20px 0 20px",
                                            borderRadius: "15px 15px 0px 0px",
                                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                            maxWidth: "600px",
                                            width: "97%"
                                        }}>

                                            <div className="background-image"></div>

                                            <div className="text-overlay">
                                                <p style={{
                                                    fontSize: '14px',
                                                    padding: "5px",
                                                    border: '3px solid blue',
                                                    borderImage: 'linear-gradient(to top, white 10% , black 90%) 1',
                                                    textAlign: 'center',
                                                    borderRadius: '30px',
                                                    fontWeight: "bold"
                                                }}>
                                                    Case Assigned!
                                                </p>

                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p style={{ textAlign: "center", marginLeft: "100px", marginTop: "10px", fontSize: "14px" }}>Vendor Fare</p>
                                                    <div style={{
                                                        marginTop: "5px",
                                                        width: "30px",
                                                        background: '#ccb300',
                                                        border: "1px solid red",
                                                        fontSize: "14px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: 'center',
                                                        color: 'black'
                                                    }}>4.5</div>
                                                </div>
                                                <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>₹ 10,000</h1>

                                                <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                                    <p style={{
                                                        textAlign: "center",
                                                        marginTop: "7px",
                                                        fontSize: '14px',
                                                        paddingRight: '10px',
                                                        fontWeight: 'bold'
                                                    }}>Vendor Distance :</p>
                                                    <p style={{ color: 'Green', marginTop: "5px", fontSize: "19px" }}>5 km</p>
                                                </div>

                                                <div className="text-overlay text-overlay2">
                                                    <h4 style={{ marginBottom: '5px', fontSize: "11px", marginTop: "10px" }}>Location:</h4>
                                                    <p style={{ fontSize: '11px', gap: "10px" }}>205 D/15, Indl Estate, L B S Marg, Opp I O L, Near Amrutnagar, Near Ayodhya Chowk, Rohini, K Marg, Lower Parel Mumbai Maharashtra 4000067</p>

                                                    <p style={{
                                                        fontSize: '12px',
                                                        marginTop: "5px",
                                                        background: "white",
                                                        padding: "10px",
                                                        border: '2px solid #000000',
                                                        textAlign: 'center',
                                                        borderRadius: '30px',
                                                        fontWeight: "bold",
                                                        color: "blue",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        position: "relative",
                                                        cursor: "pointer",
                                                        maxWidth: "400px",
                                                        minWidth: "150px"
                                                    }} onClick={goToMap}>
                                                        Vendor Current Location
                                                        <KeyboardDoubleArrowRightIcon style={{
                                                            position: "absolute",
                                                            left: '10px'
                                                        }} />
                                                    </p>

                                                    <p style={{
                                                        fontSize: '11px',
                                                        marginTop: "5px",
                                                        background: "green",
                                                        padding: "10px",
                                                        border: '1px solid blue',
                                                        textAlign: 'center',
                                                        borderRadius: '30px',
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        position: "relative",
                                                        cursor: "pointer"
                                                    }}>
                                                        <KeyboardDoubleArrowRightIcon style={{
                                                            position: "absolute",
                                                            left: '10px'
                                                        }} />
                                                        Accept Vendor's Deal
                                                    </p>

                                                    <p style={{
                                                        fontSize: '11px',
                                                        marginTop: "5px",
                                                        background: "#8f4325",
                                                        padding: "10px",
                                                        border: '1px solid blue',
                                                        textAlign: 'center',
                                                        borderRadius: '30px',
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        position: "relative",
                                                        cursor: "pointer"
                                                    }}>
                                                        Reject Deal
                                                        <KeyboardDoubleArrowLeftIcon style={{
                                                            position: 'absolute',
                                                            right: "10px"
                                                        }} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {isNewCase && (
                    <CaseFirstCard data={newCasesItems} getBackPage={handleBack} />
                )}
            </main>
        </div>
    );

}

export default CraneUserLanding;