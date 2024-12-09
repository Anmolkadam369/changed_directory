import React, { useState, useEffect } from 'react';
import '../Dashboard/Dashboard.css'; // Ensure you create this CSS file for styling
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import backendUrl from '../../environment';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import craneadvocatemechanic from '../../Assets/camw.webp'; // Correct import path
import customerImage from '../../Assets/customer.webp'; // Correct import path
import complaints from '../../Assets/complaints.webp'; // Correct import path
import vehicleIcon from '../../Assets/vehicleIcon.webp'; // Correct import path
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Chart from '../Charts/Chart';
import Featured from '../Charts/Featured';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import AssignedVehicleCrane from './AssignedVehiclesCrane';
import CaseFirstCard from '../CaseFirstCard/CaseFirstCard';
import TargetVsReality from '../AAAAAAAAAAAAAAAAAA/TargetVsReality/TargetVsReality.tsx';
import VendorViewRating from '../VendorViewRating/VendorViewRating.jsx';
import VendorMoving from './VendorMoving.jsx';
import crossUser from '../../Assets/crossUser.png'

const CraneDashboard = ({ getData }) => {
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [vendorData, setVendorData] = useState([])
    const [gotResponse, setGotResponse] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [adminAccepted, setAdminAccepted] = useState(0)
    const [adminRejected, setAdminRejected] = useState(0)
    const [adminPending, setAdminPending] = useState(0)
    const [rejectedByVendor, setRejectedByVendor] = useState(0)

    const [workingCases, setWorkingCases] = useState(0)
    const [fullyClosedCases, setFullyClosedCases] = useState(0)
    const [approvedCase, setApprovedCase] = useState([])
    const [caseDetails, setCaseDetails] = useState(false);

    console.log("approvedCase", approvedCase[0])

    useEffect(() => {
        if (approvedCase.length > 0) {
            setCaseDetails(true)
        }
    }, [approvedCase])

    const choosenCase=(item)=>{
        setApprovedCase([])
        setApprovedCase([item])
        setCaseDetails(true)
    }


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
            const response = await axios.get(`${backendUrl}/api/assignedTasksCrane/${userId}`);
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
        console.log("INSIDE TOTALASSIGNED CASES", totalAssignedCases)
        if (totalAssignedCases.length !== 0) {
            let acceptedCount = 0;
            let rejectedCount = 0;
            let pendingCount = 0;
            let rejectedByVendor = 0;


            for (let i = 0; i < totalAssignedCases.length; i++) {
                console.log("totalAssignedCases[i].details[0].vendorDecision", i, totalAssignedCases[i].details[0].vendorDecision)
                if (totalAssignedCases[i].details[0].vendorDecision != 'reject' && (totalAssignedCases[i].details.length === 0 || totalAssignedCases[i].details[0].acceptedByAdmin === null)) {
                    pendingCount++;
                } else if (totalAssignedCases[i].details[0].acceptedByAdmin === "accept") {
                    acceptedCount++;
                } else if (totalAssignedCases[i].details[0].acceptedByAdmin === "reject") {
                    rejectedCount++;
                }
                else if (totalAssignedCases[i].details[0].vendorDecision === "reject") {
                    console.log("insidehere ima m", i, totalAssignedCases[i].details[0].vendorDecision)
                    rejectedByVendor++
                }
            }
            setAdminAccepted(acceptedCount);
            setAdminRejected(rejectedCount);
            setAdminPending(pendingCount);
            setRejectedByVendor(rejectedByVendor);

        }
    }, [totalAssignedCases]);


    const getAllAccidentVehicleData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`);
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
    console.log("setNewCasesItems bonenza", newCasesItems)
    console.log("(totalAssignedCases.length - gotResponse.length)", (totalAssignedCases.length - gotResponse.length))

    useEffect(() => {
        console.log("totalAssignedCases:", totalAssignedCases);
        console.log("gotResponse:", gotResponse);
        console.log("Difference:", totalAssignedCases.length - gotResponse.length);

        if ((totalAssignedCases.length - gotResponse.length) > 0) {
            const filteredItems = totalAssignedCases.filter((caseItem) => caseItem?.details[0]?.firstResponseOn == null);
            setNewCasesItems(filteredItems);
            setNewCase(true);
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
                {!isNewCase && (
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
                                        {/* <img src={SwipeRightAltOutlinedIcon}  className="small-image" alt="accpeted By Admin" /> */}
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


                                    <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Working Vehicles')}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected == "Working Vehicles" ? '#00000074' : 'white', // Change background color on selection
                                        }}>
                                        <PendingActionsOutlinedIcon className="small-image" />
                                        <h3 style={{ fontSize: "0.6rem" }} >Rejected By You</h3>
                                        <p>{rejectedByVendor}</p>
                                    </div>





                                    <div className="stat-item" style={{ background: "#f0f0f000", border: 'none', boxShadow: "none" }}>
                                    </div>

                                </div>

                                {totalAssignedCases.length > 0 && (
                                    totalAssignedCases.map((item)=>(
                                        <div>
                                            <div style={{border:"1px solid red", padding:"10px"}} onClick={()=>choosenCase(item)}>View Case</div>
                                        </div>
                                    ))
                                )}


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

                                        {/* <TargetVsReality /> */}
                                        <VendorViewRating />


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
                    </div>
                )}
                {isNewCase && (
                    <CaseFirstCard data={newCasesItems} getBackPage={handleBack} />
                )}

                {caseDetails && (



                    <div  style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                        zIndex: 1001,
                        display: "flex",
                        alignItems: "flex-end", // positions the container at the bottom
                        justifyContent: "center",
                        animation: "slideUp 0.5s ease-out",
                    }}>

                        <div className="image-container" >
                            <div className="background-image"></div>
                            <img
                                src={crossUser}
                                onClick={() => setCaseDetails(false)}
                                style={{
                                    position: "fixed",
                                    // top: "-10px",
                                    left: "calc(100% - 80px)",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                    bottom:"360px"
                                }}
                            />
                            <VendorMoving item={approvedCase[0]} />
                        </div>
                    </div>



                )}

            </main>
        </div>
    );

}

export default CraneDashboard;