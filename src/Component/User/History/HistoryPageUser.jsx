
import React, { useEffect, useState } from 'react';
import '../FirstPage.css'
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

import assignedTask from '../../../Assets/assignedTask.png'
import comingCrane from '../../../Assets/comingCrane.png'
import checksuccess from '../../../Assets/checksuccess.png'
import Registration from '../../Registration/Registration';
import QuotationUpdate from '../Crane/QuotationUpdate';
import crossUser from '../../../Assets/crossUser.png'
import historyUser from '../../../Assets/historyUser.png'
import ReceiptsUser from '../Crane/ReceiptsUser';

import axios from 'axios';
// '../../../environment';
import { ClipLoader } from 'react-spinners';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import casefiled from '../../../Assets/casefiled.png'
import telephonecall from '../../../Assets/telephonecall.png'
import workDoneUser from '../../../Assets/workDoneUser.png'
import reachedUser from '../../../Assets/reachedUser.png'



import NoDataFound from '../Cards/NoDataFound';
import BottomNavigationBar from '../BottomNavigationBar';





const HistoryPageUser = () => {

    const navigate = useNavigate()
    const { state } = useLocation();

    const [currentStage, setCurrentStage] = useState([]); // Example stage
    console.log("currentStage112", currentStage)
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [viewReceipts, setViewReceipts] = useState(false);
    const [avg, setAvg] = useState([])
    const [data, setData] = useState([]);
    const [filtering, setFiltering] = useState([]);

    console.log("DATA HERE", data)
    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [dataIndex, setDataIndex] = useState(0);
    

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log('isImageContainer', isHistoryPage)




    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
    }

    useEffect(() => {
        getData();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const getStage = (filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime) => {
        return [filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime]
    }

    useEffect(() => {
        if (data.length > 0 && data.length != currentStage.length) {
            data.map((item) => {
                avg.push(0)
            })

        }

    }, [data])

    const getStageAndHistory = (item, index) => {
        setCurrentItemIndex(index)
        // setCurrentStage([])
        let gotStage = getStage(item.filedCaseFullyTime, item.customerAcceptedVendorTime, item.vendorMovedTime, item.vendorReachedTime, item.doneWorkingTime)
        currentStage.unshift(gotStage)
        setIsHistoryPage(true)
    }

    const [stages, setStages] = useState([]); // Use useState for stages
    console.log("stages123456789", stages)

    useEffect(() => {
        console.log("hello", currentStage);
        if (currentStage[0]) {
            console.log("helasdfasdflo");
            console.log("currentStage[0][0] ", currentStage[0])
            setStages([
                { label: "Filed", img: assignedTask, date: currentStage[0][0] },
                { label: "Vendor Assigned", img: checksuccess, date: currentStage[0][1] },
                { label: "Accepted & Moved", img: comingCrane, date: currentStage[0][2] },
                { label: "Reached", img: reachedUser, date: currentStage[0][3] },
                { label: "Work Done", img: workDoneUser, date: currentStage[0][4] },
            ]);
        }
    }, [currentStage[0]]); // Dependency array

    useEffect(() => {
        console.log("stages updated:", stages);
    }, [stages]);

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
        if (response.data.message == "No accident vehicle data found.") setData([])
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);

            let filteredData = response.data.data.filter((info) =>
                info.selectedOptions === 'crane' && info.approvedReaching
            );
            setData(filteredData)
            setFiltering(filteredData)
            console.log("seTDATIOATN", filteredData);

        }
    };

    const getVendorRating = async (crane) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/customersRating/${crane}`);
            console.log("coming Customer Rating", response.data)
            if (response.data.status == 404) {
                console.log("Not Found")
                avg.push(0)
            }
            else if (response.data.status == true) {
                let customerRating = response.data.data;
                console.log("coming Customer Rating", customerRating)
                if (customerRating.length !== 0) {
                    let average = customerRating.reduce((acc, item) => acc + parseInt(item.feedbackRatingCrane), 0);

                    avg.push(average / customerRating.length);
                }
            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        console.log("serachvaue", e.target.value)
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const newRows = filtering.filter((row) => {
            const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
            const searchLower = value; // Use the updated search value directly

            const idValue = formattedId.includes(searchLower);
            const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(searchLower);
            const chassisNoValue = (row.chassisNo ?? '').toLowerCase().includes(searchLower);

            return  vehicleNoValue || chassisNoValue ;
        });

        setData(newRows);
    };



    return (
        <div style={{
            marginBottom: "100px", background: 'linear-gradient(rgb(29 97 25 / 75%), rgb(255, 255, 255), rgb(249 241 241))',
        }}>
            <div>
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar" style={{ border: '1px solid', minWidth: "250px" }}>
                        <input className="search_input" type="text" placeholder="Search..." style={{margin:"3px", paddingTop :"5px"}}  onChange={handleSearch}/>
                        {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                        </a> */}
                        <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: "flex-end" }}>

                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown" // Updated to Bootstrap 5 syntax
                        aria-expanded="false"
                        style={{ fontSize: "12px", margin: "20px 5px", background: "white", border: "1px solid black", fontWeight: 'bold', color: "darkgreen" }}
                    >
                        Service
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a className="dropdown-item">
                                Advocate
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item">
                                Hydra Crane
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item">
                                Mechanic
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item">
                                Workshop
                            </a>
                        </li>


                    </ul>
                </div>

            </div>

            {data.length > 0 && (
                data.map((item, dataIndex) => (
                    <div style={{
                        // filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                        // opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                        // pointerEvents: isImageContainerVisible ? "none" : "auto",
                        border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "5px", padding: "10px"
                    }}>


                        {item.customerAcceptedVendor && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item.vehicleNo}</span>
                                    </div>


                                    <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>{avg[dataIndex]}</div>
                                </div>




                                <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vendor  : </p>
                                    <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>Crane Work</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: '3px 5px 0px 10px' }}>
                                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5px", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'green', border: "1px solid green", background: 'white' }}>Completed</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

                                    <p style={{
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
                                        minWidth: "220px",
                                        margin: '5px 5px 5px 5px',
                                        height: "30px"
                                    }} onClick={(e) => getStageAndHistory(item, dataIndex)}>
                                        See History
                                        <img src={historyUser} style={{
                                            position: "absolute",
                                            left: '5px', height: "20px", width: "20px"
                                        }} />
                                    </p>

                                </div>



                            </div>
                        )}



                    </div>
                ))
            )}

            {isHistoryPage && (
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
                        <img
                            src={crossUser}
                            onClick={() => setIsHistoryPage(false)}
                            style={{
                                position: "fixed",
                                // top: "-10px",
                                right: "30px",
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                                zIndex: 1001,
                                filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                            }}
                        />


                        <div style={{ display: "flex", flexDirection: "row", gap: '30px', alignItems: "center", justifyContent: 'center', margin: "20px 0px" }}>
                            <div>
                                {stages.map((stage, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column", // Stack vertically
                                            alignItems: "center",
                                            position: "relative", // Needed for absolute positioning of the line
                                            marginBottom: "20px", // Space between stages
                                            flex: 1,
                                        }}
                                    >
                                        {/* Icon/Image for each stage */}
                                        <div
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%",
                                                backgroundColor: "rgb(255 225 6)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: "2px solid #4CAF50",
                                                transition: "background-color 0.3s ease",
                                                zIndex: 1, // **Changed: Make sure image is above the line**
                                            }}
                                        >
                                            <img
                                                src={stage.img}
                                                alt={stage.label}
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    opacity: 1,
                                                }}
                                            />
                                        </div>

                                        {/* Date next to the image */}
                                        <div
                                            style={{
                                                marginTop: "5px", // Space between icon and date
                                                color: "black",
                                                fontSize: "12px",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            {stage.date}
                                        </div>

                                        {/* Stage Label */}
                                        <div
                                            style={{
                                                marginTop: "5px", // Space between date and label
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {stage.label}
                                        </div>

                                        {/* Connecting Line (Vertical) */}
                                        {index < stages.length - 1 && (
                                            <div
                                                style={{
                                                    marginTop: '5px',
                                                    position: "absolute",
                                                    top: "100%", // **Changed: Position the line below the image and date**
                                                    left: "50%",
                                                    width: "2px",
                                                    height: "20px", // **Changed: Adjust this value as needed for spacing**
                                                    backgroundColor: "#4CAF50",
                                                    transform: "translateX(-50%)", // **Changed: Center the line between images**
                                                    zIndex: 0, // **Changed: Make sure the line is behind the content**
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* 
            {viewReceipts && (
                <ReceiptsUser/>
            )} */}


            {data.length == 0 && (
                <NoDataFound />
            )}

            <div>
                <BottomNavigationBar />
            </div>
            </div>
        </div>
    )
}

export default HistoryPageUser;