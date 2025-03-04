import React, { useState, useEffect } from 'react';
import BottomNavigationVendor from "../BottomNavigationVendor/BottomNavigationVendor"
import crossUser from '../../../Assets/crossUser.png'
import emergencycall from '../../../Assets/emergencycall.png'
import nearbyRestaurant from '../../../Assets/nearbyRestaurant.png'
import nearbyhospital from '../../../Assets/nearbyhospital.png'
import nearbyPetrolPump from '../../../Assets/nearbyPetrolPump.png'
import nearbyParking from '../../../Assets/nearbyParking.png'
import nearbytoll from '../../../Assets/nearbytoll.png'
import axios from 'axios';
// '../../../environment';
import { useNavigate } from "react-router-dom"
import VendorMoving from '../../Vendors/VendorMoving';
import CaseFirstCard from '../../CaseFirstCard/CaseFirstCard';
import CraneAcceptedOrders from './CraneAcceptedOrders';
import CraneRejectedOrder from './CraneRejectedOrder';
import CraneCompletedOrders from './CraneCompletedOrders';
import { useWebSocket } from '../../ContexAPIS/WebSocketContext';

const CraneOrders = () => {

    const navigate = useNavigate()
    const { messages } = useWebSocket()
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [approvedCaseByYou, setApprovedCaseByYou] = useState([])
    const [rejectedByYou, setRejectedByYou] = useState([])
    const [rejectedByAdmin, setRejectedByAdmin] = useState([])
    const [rejectedByCustomer, setRejectedByCustomer] = useState([])
    const [completedVehicle, setCompletedVehicle] = useState([])
    console.log("compltedVehicler", completedVehicle)


    const [gotResponse, setGotResponse] = useState([]);
    const [distance, setDistances] = useState([])

    const [caseDetails, setCaseDetails] = useState(false);

    const [avg, setAvg] = useState([])
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (token === '' || userId === '') {
            navigate('/');
        }
        fetchAssignedCases();
    }, [token, userId, navigate]);

    const choosenCase = (item) => {
        setApprovedCaseByYou([])
        setApprovedCaseByYou([item])
        setCaseDetails(true)
    }

    useEffect(() => {
        messages.forEach((message) => {
            console.log("form crane USER-all cases")
            if (message.forPage == "crane-user-all-cases") {
                fetchAssignedCases()
            }
        })
    }, [messages])





    const fetchAssignedCases = async () => {
        try {
            let apiDetail = userId.startsWith('VC-') ? 'assignedTasksCraneForVendor' : 'assignedTasksUnfiltered';
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${apiDetail}/${userId}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log("Total assignedTasksMechanic", response.data.data);
            setTotalAssignedCases(response.data.data);

            // Temporary arrays for each category
            const tempApprovedCaseByYou = [];
            const tempRejectedByYou = [];
            // const tempRejectedByAdmin = [];
            const tempRejectedByCustomer = [];
            const tempCompletedVehicle = [];
            console.log('response.data.data', response.data.data)
            response.data.data.forEach((item) => {
                if (item.details.length > 0) {
                    console.log('kjhkjhj', item.details[0])
                    // console.log("kjhkjhjlkj", item.details[0]?.completeOrder, item.details[0]?.firstResponseOn, item.details[0]?.vendorDecision,
                        // item.details[0]?.cancelOrder, item.detaisls[0]?.cancelPreAssignOrder, item.details[0]?.closeWorker)
                    if (item?.details[0]?.completeOrder == false && item.details[0]?.firstResponseOn != null && item.details[0]?.vendorDecision == 'accept' &&
                        item.details[0]?.cancelOrder == false && item.details[0]?.cancelPreAssignOrder == false && item.details[0]?.closeWorker == false) {
                        tempApprovedCaseByYou.push(item);
                    }
                    if (item.details[0]?.vendorDecision == 'reject') {
                        tempRejectedByYou.push(item);
                    }
                    // if (item.details[0]?.vendorDecision == 'accept' && item.details[0]?.acceptedByAdmin == 'reject') {
                    //     tempRejectedByAdmin.push(item);
                    // }
                    if (
                        item.details[0].completeOrder == false && item.details[0]?.firstResponseOn != null && item.details[0]?.vendorDecision == 'accept' &&
                        (item.details[0]?.cancelPreAssignOrder || item.details[0]?.cancelOrder)
                    ) {
                        tempRejectedByCustomer.push(item);
                    }

                    if (item.details[0]?.approvedReaching == true && item.details[0].completeOrder == true) {
                        tempCompletedVehicle.push(item);
                    }
                }
            }); 

            console.log("tempApprovedCaseByYou", tempApprovedCaseByYou)
            console.log("tempRejectedByYou", tempRejectedByYou)
            // console.log("tempRejectedByAdmin",tempRejectedByAdmin)
            console.log("tempRejectedByCustomer", tempRejectedByCustomer)
            console.log("tempCompletedVehicl1e", tempCompletedVehicle)

            // Update state with collected results
            setApprovedCaseByYou(tempApprovedCaseByYou);
            setRejectedByYou(tempRejectedByYou);
            // setRejectedByAdmin(tempRejectedByAdmin);
            setRejectedByCustomer(tempRejectedByCustomer);
            setCompletedVehicle(tempCompletedVehicle);

        } catch (error) {
            console.error("Failed to fetch assigned cases:", error);
        }
    };





    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedRejectedIndex, setSelectedRejectedIndex] = useState(0);

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };
    const handleSelectRejectedIndex = (index) => {
        setSelectedRejectedIndex(index)
    }
    return (
        <div>
            <div className="start-container" style={{ height: "40px", zIndex: "10", margin: "0px 0px 0px 0px", position: "sticky", top: "0.1px" }}>
                <div className="imageContainer" style={{ marginTop: "5px", height: "0px" }}>
                    {["Working cases", "Rejected cases", "Completed cases"].map((text, index) => (
                        <div
                            key={index}
                            style={{ cursor: 'pointer' }}
                            className={`imageWrapper ${selectedIndex === index ? "selected" : ""}`}
                            onClick={() => handleSelect(index)}
                        >
                            <div className="top-scrolling">
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedIndex == 1 && (
                <div className="imageContainer" style={{ height: "0px" }}>
                    {["By You", 'By Customer'].map((text, index) => (
                        <div
                            key={index}
                            style={{ cursor: 'pointer', marginTop: "10px" }}
                            className={`imageWrapper ${selectedRejectedIndex === index ? "selected" : ""}`}
                            onClick={() => handleSelectRejectedIndex(index)}
                        >
                            <div className="top-scrolling">
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedIndex == 0 && (
                <CraneAcceptedOrders data={approvedCaseByYou} />
            )}

            {selectedIndex == 2 && (
                <CraneCompletedOrders data={completedVehicle} />
            )}

            {selectedIndex == 1 && selectedRejectedIndex == 0 && (
                <CraneRejectedOrder data={rejectedByYou} />
            )}
            {selectedIndex == 1 && selectedRejectedIndex == 1 && (
                <CraneRejectedOrder data={rejectedByCustomer} />
            )}
            {/* {selectedIndex == 1 && selectedRejectedIndex == 1 && (
                <CraneRejectedOrder data={rejectedByAdmin} />
            )} */}

            <div
            // style={{
            //     position: "absolute",
            //     top: 0,
            //     left: 0,
            //     width: "100%",
            //     height: "100%",
            //     background: "linear-gradient(45deg, #ffffff69, transparent)",
            //     clipPath: "polygon(0px 20%, 10% 90%, 200% 100%, 0px 100%)",
            // }}
            >
                <div style={{ zIndex: "10px" }}>
                    <BottomNavigationVendor />
                </div>
            </div>
        </div>



    )
}


export default CraneOrders