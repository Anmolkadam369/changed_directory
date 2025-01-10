import React, { useState, useEffect } from 'react';
import BottomNavigationVendor from "./BottomNavigationVendor/BottomNavigationVendor"
import crossUser from '../../Assets/crossUser.png'
import { Doughnut } from 'react-chartjs-2';
import emergencycall from '../../Assets/emergencycall.png'
import nearbyRestaurant from '../../Assets/nearbyRestaurant.png'
import nearbyhospital from '../../Assets/nearbyhospital.png'
import nearbyPetrolPump from '../../Assets/nearbyPetrolPump.png'
import nearbyParking from '../../Assets/nearbyParking.png'
import nearbytoll from '../../Assets/nearbytoll.png'
import axios from 'axios';
import backendUrl from "../../environment"
import { useNavigate } from "react-router-dom"
import VendorMoving from '../Vendors/VendorMoving';
import CaseFirstCard from '../CaseFirstCard/CaseFirstCard';

import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import vehicleIcon from '../../Assets/vehicleIcon.webp';
import craneadvocatemechanic from '../../Assets/camw.webp';

import Featured from '../Charts/Featured';
import VendorViewRating from '../VendorViewRating/VendorViewRating';
import { useWebSocket } from '../ContexAPIS/WebSocketContext';


const CraneUserDashboard = () => {

    const navigate = useNavigate()
    const { sendMessage } = useWebSocket();
    const { messages } = useWebSocket()
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [approvedCase, setApprovedCase] = useState([])
    const [gotResponse, setGotResponse] = useState([]);
    const [distance, setDistances] = useState([])

    const [caseDetails, setCaseDetails] = useState(false);

    const [isNewCase, setNewCase] = useState(false)
    console.log('isNewCae', isNewCase)
    const [newCasesItems, setNewCasesItems] = useState([])
    const [avg, setAvg] = useState([])
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")

    console.log("newCasesItems", newCasesItems)

    const [adminAccepted, setAdminAccepted] = useState(0)
    const [adminRejected, setAdminRejected] = useState(0)
    const [adminPending, setAdminPending] = useState(0)
    const [rejectedByVendor, setRejectedByVendor] = useState(0)
    const [workingCases, setWorkingCases] = useState(0)
    const [fullyClosedCases, setFullyClosedCases] = useState(0)

    const [filterForVehicleCrane, setFilterForVehicleCrane] = useState("all")
    const [isSelected, setIsSelected] = useState("")

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (token === '' || userId === '') {
            navigate('/');
        }
        fetchAssignedCases();
        getGotResponseVehicle()
    }, [token, userId, navigate]);


    const [newmessg, setnewmessge] = useState(false)
    useEffect(() => {
        messages.forEach((message) => {
            if (message.forPage == "crane-user-dashboard") {
                console.log("i have got the task here")
                setnewmessge(true)
                fetchAssignedCases();
                getGotResponseVehicle()
            }
        })
    }, [messages])

    const choosenCase = (item) => {
        setApprovedCase([])
        setApprovedCase([item])
        setCaseDetails(true)
    }

    const casesFilterForVehicleCrane = (filter) => {
        setFilterForVehicleCrane(filter)
        setIsSelected(filter);
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



    useEffect(() => {

        if (totalAssignedCases.length !== 0) {
            let acceptedCount = 0;
            let rejectedCount = 0;
            let pendingCount = 0;
            let rejectedByVendor = 0;


            for (let i = 0; i < totalAssignedCases.length; i++) {
                console.log("totalAssignedCases[i].details[0].vendorDecision", i, totalAssignedCases[i].details[0])
                if (totalAssignedCases[i].details[0]?.vendorDecision != 'reject' && (totalAssignedCases[i].details?.length === 0 || totalAssignedCases[i].details[0]?.acceptedByAdmin === null)) {
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

        if (gotResponse.length !== 0) {
            let fullyClosedCount = 0;
            let workingCount = 0;

            for (let i = 0; i < gotResponse.length; i++) {
                if (gotResponse[i].confirmDoneWorking == true) {
                    fullyClosedCount++;
                } else {
                    workingCount++;
                }
            }
            setFullyClosedCases(fullyClosedCount);
            setWorkingCases(workingCount);
        }

        if (totalAssignedCases.length > 0 && gotResponse.length > 0) {
            const filteredItems = totalAssignedCases.filter((caseItem) => caseItem?.details[0]?.firstResponseOn == null && caseItem?.details[0]?.timedOut == false);
            console.log("foltredd", filteredItems)
            console.log("setisNewCase", isNewCase)

            setNewCasesItems(filteredItems);
            setNewCase(filteredItems.length > 0);
        } else {
            setNewCasesItems([]);
            setNewCase(false);
        }
        if (totalAssignedCases.length > 0 && totalAssignedCases.length) {
            totalAssignedCases.map((item) => {
                avg.push(0)
            })
            // totalAssignedCases.map((item) => {
            //     let gotStage = getStage(item.vendorMoved, item.approvedReaching)
            //     currentStage.push(gotStage)
            // })
            totalAssignedCases.forEach((item, index) => {
                getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude, index);
                // getVendorRating(item.crane)
            });
        }
    }, [totalAssignedCases, gotResponse]);


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


    function haversine(lat1, lon1, lat2, lon2) {
        console.log("accident latitude", lat1)
        console.log("accident longtitude", lon1)
        console.log("vehicle latitiude", lat2)
        console.log("vehicle longtitude", lon2)

        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Earth radius in km

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    const getVendorLocation = async (crane, accidentLatitude, accidentLongitude, index) => {
        try {
            console.log("disntaceadfafdaf", distance)
            console.log("craninging", crane, accidentLatitude, accidentLongitude, index)

            const response = await axios.get(`${backendUrl}/api/getVendorCurrentLocation/${crane}`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.status == true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)

                const calculatedDistance = haversine(accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude).toFixed(2);

                distance.push(calculatedDistance)
            }
            else if (response.data.message == "User Not found take Location") {
                console.log("User Not found take Location")
            }
        } catch (error) {
            console.log("error in get Vendor Location", error.message)
        }
    }

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


    const handleBack = () => {
        getGotResponseVehicle()
        fetchAssignedCases()
        setNewCase(false)
    }

    const [pickupLocation, setPickupLocation] = useState('')

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
            }
        };
        getLocation()
    }, [])


    const showPosition = async (position) => {
        const { latitude, longitude } = position.coords;


        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            if (data && data.address) {
                const { road, city, state, country } = data.address;
                setPickupLocation(`${road || ''}, ${city || ''}, ${state || ''}, ${country || ''}`);
            } else {
                setPickupLocation('Location details not found.');
            }
        } catch (error) {
        }
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                break;
            case error.POSITION_UNAVAILABLE:
                break;
            case error.TIMEOUT:
                break;
            case error.UNKNOWN_ERROR:
                break;
            default:
        }
    };

    return (
        <div style={{ height: "100%" }}>

            <div style={{ marginTop: '10px' }}>
                <div style={{ background: "transperant", padding: '8px', marginBottom: "8px", borderRadius: "5px" }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i class="fa fa-location-arrow" style={{ fontSize: "20px", color: "rgb(0 0 0)", marginRight: "10px" }}></i>
                        <p style={{ color: 'red', fontSize: "13px", margin: "5px 5px", color: "#555" }}>
                            {pickupLocation}
                        </p>
                    </div>
                </div>
            </div>

            <div className="stat-container">

                <div
                    className="stat-item"
                    onClick={() => casesFilterForVehicleCrane('getAll')}
                    style={{
                        margin: "20px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected === "getAll" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                        display: "flex", // Add flexbox
                        flexDirection: "column", // Ensure vertical alignment
                        alignItems: "center", // Horizontally center all children
                        justifyContent: "center", // Vertically center the image
                    }}
                >
                    <img
                        src={craneadvocatemechanic}
                        className="small-image"
                        alt="Vendor Types"
                        style={{
                            marginBottom: "10px", // Add spacing below the image if needed
                        }}
                    />
                    <h3 style={{ fontSize: "0.6rem" }}>Total Cases Assigned</h3>
                    <p>{totalAssignedCases.length}</p>
                </div>


                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Accepted Vehicles')}
                    style={{
                        margin: "20px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Accepted Vehicles" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                    }}>
                    <ThumbUpAltOutlinedIcon className="small-image" />
                    {/* <img src={SwipeRightAltOutlinedIcon}  className="small-image" alt="accpeted By Admin" /> */}
                    <h3 style={{ fontSize: "0.6rem" }}>Accepted By Admin</h3>
                    <p>{adminAccepted}</p>
                </div>

                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Rejected Vehicles')}
                    style={{
                        margin: "20px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Rejected Vehicles" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                    }}>
                    <ThumbDownOutlinedIcon className="small-image" />
                    <h3 style={{ fontSize: "0.6rem" }}>Rejected By Admin</h3>
                    <p>{adminRejected}</p>
                </div>

                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Pending Vehicles')}
                    style={{
                        margin: "20px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Pending Vehicles" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                    }}>
                    <PendingActionsOutlinedIcon className="small-image" />
                    <h3 style={{ fontSize: "0.6rem" }}>Pending (Admin and Not Requested)</h3>
                    <p>{adminPending}</p>
                </div>

            </div>

            <div className="stat-container">
                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Response given')}
                    style={{
                        margin: "10px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Response given" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                        display: "flex", // Add flexbox
                        flexDirection: "column", // Ensure vertical alignment
                        alignItems: "center", // Horizontally center all children
                        justifyContent: "center", // Vertically center the image
                    }}>
                    <img src={vehicleIcon} className="small-image" alt="Vendor Types" style={{
                        marginBottom: "10px", // Add spacing below the image if needed
                    }} />
                    <h3 style={{ fontSize: "0.6rem" }}>Response Given by admin</h3>
                    <p>{gotResponse.length}</p>
                </div>
                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Completed Cases')}
                    style={{
                        margin: "10px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Completed Cases" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                    }}>
                    <AssignmentTurnedInOutlinedIcon className="small-image" />
                    <h3 style={{ fontSize: "0.6rem" }}>Fully Closed Cases</h3>
                    <p>{fullyClosedCases + adminRejected}</p>
                </div>
                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Working Vehicles')}
                    style={{
                        margin: "10px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Working Vehicles" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                    }}>
                    <PendingActionsOutlinedIcon className="small-image" />
                    <h3 style={{ fontSize: "0.6rem" }} >Working Cases</h3>
                    <p>{workingCases > adminRejected ? workingCases - adminRejected : workingCases}</p>
                </div>


                <div className="stat-item" onClick={() => casesFilterForVehicleCrane('Working Vehicles')}
                    style={{
                        margin: "10px 5px 5px 5px",
                        boxShadow: "rgba(137, 137, 137, 0.47) 2px 3px 4px 1px",
                        borderLeft: "2px solid darkgreen",
                        borderTop: "1px solid darkgreen",
                        cursor: "pointer",
                        backgroundColor: isSelected == "Working Vehicles" ? 'rgb(239 236 186 / 75%)' : 'transparent', // Change background color on selection
                    }}>
                    <PendingActionsOutlinedIcon className="small-image" />
                    <h3 style={{ fontSize: "0.6rem" }} >Rejected By You</h3>
                    <p>{rejectedByVendor}</p>
                </div>


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
                        <VendorViewRating />

                    </div>
            </div>

            {isNewCase && (
                <div style={{ marginTop: "-500px" }}>
                    {/* <p >hello</p> */}
                    <CaseFirstCard data={newCasesItems} getBackPage={handleBack} />
                </div>
            )}



            {/* Black Bottom Section */}

            <div style={{ zIndex: 1 }}>
                <BottomNavigationVendor />
            </div>
        </div>



    )
}


export default CraneUserDashboard