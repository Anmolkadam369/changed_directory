
import React, { useEffect, useState, useRef } from 'react';
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
import QuotationUpdate from './QuotationUpdate';
import crossUser from '../../../Assets/crossUser.png'
import historyUser from '../../../Assets/historyUser.png'
import ReceiptsUser from './ReceiptsUser';

import axios from 'axios';
// '../../../environment';
import { ClipLoader } from 'react-spinners';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import casefiled from '../../../Assets/casefiled.png'
import telephonecall from '../../../Assets/telephonecall.png'
import workDoneUser from '../../../Assets/workDoneUser.png'
import reachedUser from '../../../Assets/reachedUser.png'
import filterUser from '../../../Assets/filterUser.png'
import Modal from '../../Location1/Modal.jsx';




import NoDataFound from '../Cards/NoDataFound';
import Loading from '../Cards/Loading.jsx';





const HistoryReceipts = ({ vehicleNumber }) => {
    console.log("vehilceCode", vehicleNumber)
    const navigate = useNavigate()
    const { state } = useLocation();
    const currentService = localStorage.getItem("currentService");

    const [currentStage, setCurrentStage] = useState([]); // Example stage
    console.log("currentStage112", currentStage)
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [viewReceipts, setViewReceipts] = useState(false);
    const [avg, setAvg] = useState([])
    const [data, setData] = useState([]);
    const [filtering, setFiltering] = useState([]);
    const [notCompleted, setNotCompleted] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [doneFetching, setDoneFetching] = useState(false)

    const [filter, setFilter] = useState('')

    console.log("DATA HERE", data)
    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [dataIndex, setDataIndex] = useState(0);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log('isImageContainer', isHistoryPage)

    const getFilteredData = (filter) => {
        console.log("data is here");
        const filteredData = [];

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


        for (let i = 0; i < filtering.length; i++) {

            let getTime = filtering[i]?.[`${currentService}Details`]?.filedCaseFullyTime.split('|');
            let assignedDate = getTime[0];
            let assignedTime = getTime[1];
            let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

            if (filter === 'daily') {
                console.log("here i am daily")
                if (assignedDate === todayDate || assignedDate === yesterdayDate) {
                    const timeDifference = now - assignedDateTime;
                    if (timeDifference <= oneDay) {
                        console.log("Match found within last 24 hours:", data[i]);
                        filteredData.push(filtering[i]);
                    }
                }
            }
            else if (filter === 'weekly') {
                console.log("here i am weekly")
                if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
                    console.log("Match found within last 7 days:", data[i]);
                    filteredData.push(filtering[i]);
                }
            }
            else if (filter === 'monthly') {
                if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
                    console.log("Match found within last 30 days:", data[i]);
                    filteredData.push(filtering[i]);
                }
            }
            else if (filter === 'year') {
                const yearBefore = new Date(now.getTime() - (oneDay * 365)); // Calculate date one year ago
                if (assignedDateTime >= yearBefore && assignedDateTime <= now) {
                    console.log("Match found within last year:", filtering[i]);
                    filteredData.push(filtering[i]);
                }
            }

        }
        if (filter === 'newest') {
            console.log("Sorting by newest to oldest");
            console.log("filtering", filtering[0])
            filtering.sort((a, b) => {
                console.log("a?.[`${currentService}Details`]?.filedCaseFullyTime", a?.[`${currentService}Details`]?.filedCaseFullyTime)
                const dateA = new Date(a?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                return dateB - dateA; // Descending order
            });
            setData([...filtering]);
        } else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            filtering.sort((a, b) => {
                const dateA = new Date(a?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b?.[`${currentService}Details`]?.filedCaseFullyTime.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setData([...filtering]);
        }
        else {
            setData(filteredData)
        }
    };

    const settingFilter = (filter) => {
        console.log("filter", filter)
        setFilter(filter)
        getFilteredData(filter)
        setOpenFilterModal(false)
    }



    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
    }

    useEffect(() => {
        console.log('hey123323')
        setDoneFetching(false)
        getData();
        getVendorRating()
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate, currentService]);


    useEffect(() => {
        if (data.length > 0 && data.length != currentStage.length) {
            data.map((item) => {
                avg.push(0)
            })

        }

    }, [data])

    const getStage = (filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime) => {
        return [filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime]
    }
    const getStageAndHistory = (item, index) => {
        setCurrentItemIndex(index)
        // setCurrentStage([])
        let gotStage = getStage(item?.[`${currentService}Details`]?.systemDate, item?.[`${currentService}Details`]?.customerAcceptedVendorTime, item?.[`${currentService}Details`]?.vendorMovedTime, item?.[`${currentService}Details`]?.vendorReachedTime, item?.[`${currentService}Details`]?.doneWorkingTime)
        currentStage.unshift(gotStage)
        setIsHistoryPage(true)
    }

    const [stages, setStages] = useState([]); // Use useState for stages
    console.log("stages123456789", stages)

    useEffect(() => {
        console.log("hello currentStage", currentStage);
        if (currentStage[0]) {
            console.log("helasdfasdflo");
            console.log("currentStage[0][0] ", currentStage[0])
            setStages([
                { label: "Filed", img: assignedTask, date: currentStage[0][0] ? currentStage[0][0].split('T')[0] + ' | ' + currentStage[0][0].split('T')[1].split('.')[0] : '' },
                { label: "Vendor Assigned", img: checksuccess, date: currentStage[0][1] ? currentStage[0][1].split('T')[0] + ' | ' + currentStage[0][1].split('T')[1].split('.')[0] :""},
                { label: "Accepted & Moved", img: comingCrane, date: currentStage[0][2] ? currentStage[0][2].split('T')[0] + ' | ' + currentStage[0][2].split('T')[1].split('.')[0]:"" },
                { label: "Reached", img: reachedUser, date: currentStage[0][3] ? currentStage[0][3].split('T')[0] + ' | ' + currentStage[0][3].split('T')[1].split('.')[0] :""},
                { label: "Work Done", img: workDoneUser, date: currentStage[0][4] ? currentStage[0][4].split('T')[0] + ' | ' + currentStage[0][4].split('T')[1].split('.')[0]:"" },
            ]);
        }
    }, [currentStage[0]]); // Dependency array

    // useEffect(() => {
    //     console.log("stages updated:", stages);
    // }, [stages]);

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${userId}/${currentService}/not_defined`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.message == "No accident vehicle data found.") {
            setData([])
            console.log('hellow not data')
            setDoneFetching(true)
        }
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);

            let filteredData = response.data.data.filter((info) =>
                info?.[`${currentService}Details`]?.confirmDoneWorking == true &&
                info?.[`${currentService}Details`]?.customerAcceptedVendor == true &&
                info?.[`${currentService}Details`]?.cancelOrder == false && info?.[`${currentService}Details`]?.cancelPreAssignOrder == false &&
                info?.[`${currentService}Details`]?.completeOrder == true
            );
            let notCompleted = response.data.data.filter((info) =>
                info?.[`${currentService}Details`]?.confirmDoneWorking == false &&
                info?.[`${currentService}Details`]?.cancelOrder == false && info?.[`${currentService}Details`]?.cancelPreAssignOrder == false &&
                info?.[`${currentService}Details`]?.completeOrder == false
            )
            setFiltering(filteredData)
            setFilteredData(filteredData);
            setData(filteredData)
            setNotCompleted(notCompleted)
            console.log('hellow not data2')
            setDoneFetching(true)

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
    useEffect(() => {
        if (vehicleNumber && filtering.length > 0) {
            setSearchValue(vehicleNumber);
            handleSearch(vehicleNumber);
        }
    }, [vehicleNumber, filtering]);

    useEffect(() => {
        return () => setSearchValue('');
    }, []);
    const handleSearch = (inputValue) => {
        const value = inputValue?.toLowerCase() ?? searchValue.toLowerCase()
        setSearchValue(value);
        console.log("VALUE123", value)

        const newRows = filtering.filter((row) => {
            const formattedId = String(row.id).padStart(4, '0').toLowerCase();
            const idValue = formattedId.includes(value);
            const vehicleNoValue = (row?.[`${currentService}Details`]?.vehicleNo ?? '').toLowerCase().includes(value);
            const chassisNoValue = (row?.[`${currentService}Details`]?.chassisNo ?? '').toLowerCase().includes(value);
            return idValue || vehicleNoValue || chassisNoValue;
        });
        setData(newRows);
    };

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (index) => {
        setSelectedIndex(index);
        console.log("SELECTEDINDOEX", index)
        console.log("filtering", filtering)

        if (index === 0) {
            setFiltering([...filteredData]);
            setData([...filteredData]);
        } else {
            setData([...notCompleted]);
        }
        console.log("d", notCompleted.length)
        console.log("notCompleted", data.length)
    };

    return (
        <div style={{ marginBottom: "60px", overflowY: 'auto', background: 'linear-gradient(rgba(223, 255, 222, 0), rgb(255, 255, 255), rgb(182 179 179 / 3%))' }}>
            {doneFetching == false && (
                <Loading />
            )}
            {doneFetching == true && (
                <div>
                    <div style={{ position: "sticky", top: "14px", zIndex: "999", margin: "20px 20px" }}>
                        <div className="imageContainer" style={{ height: "0px" }}>
                            {["Complete Proecess", "Processing"].map((text, index) => (
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
                    <div style={{ overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div className="container h-100">
                                <div className="d-flex justify-content-center h-100" style={{ position: 'sticky', top: "25px" }}>
                                    <div className="searchbar" style={{ border: '1px solid', minWidth: "130px" }}>
                                        <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px" }} onChange={(e) => { handleSearch(e.target.value) }} />
                                        <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
                                    </div>
                                    <div style={{ margin: "23px 20px 0px" }}>
                                        <img src={filterUser} style={{ height: '20px', width: "20px" }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {data.length > 0 && (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",


                                }}
                            >
                                {data.map((item, dataIndex) => (
                                    <div>
                                        {(
                                            <div style={{
                                                // filter: isImageContainerVisible ? "blur(3px)" : "none", // Apply blur effect
                                                // opacity: isImageContainerVisible ? 0.9 : 1, // Reduce opacity if blurred
                                                // pointerEvents: isImageContainerVisible ? "none" : "auto",
                                                background: "linear-gradient(233deg, #8a8a8a, transparent)", border: "1px solid teal", borderRadius: '20px',
                                                maxWidth: "410px", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px',
                                                padding: "10px", marginTop: '25px'
                                            }}>
                                                <div style={{ background: "20px" }}>
                                                    <img
                                                        // src="https://plus.unsplash.com/premium_photo-1663047256645-80b5bca88566?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJ1Y2slMjB3b3Jrc2hvcHxlbnwwfHwwfHx8MA%3D%3Dhttps://media.istockphoto.com/id/512043998/photo/mid-adult-mechanic-repairing-a-truck-in-auto-repair-shop.webp?a=1&b=1&s=612x612&w=0&k=20&c=LZTkIC7ccNYaY_ta8PhBW1uUlUy8ygr-Pok4kZhy4mg="
                                                        src='https://media.istockphoto.com/id/512043998/photo/mid-adult-mechanic-repairing-a-truck-in-auto-repair-shop.webp?a=1&b=1&s=612x612&w=0&k=20&c=LZTkIC7ccNYaY_ta8PhBW1uUlUy8ygr-Pok4kZhy4mg='
                                                        alt="Premium Workshop"
                                                        style={{ borderRadius: '20px 20px 0px 0px' }}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                        <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                                                            <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                                                            <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>{item?.[`${currentService}Details`]?.vehicleNo}</span>
                                                        </div>


                                                        <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>{avg[dataIndex]}</div>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", margin: '7px 5px 0px 5px' }}>
                                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: "0px 0px 0px 5px" }}>Registered Date:</p>
                                                        <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.[`${currentService}Details`]?.systemDate.split("|")[0]}</span>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", margin: '7px 5px 0px 10px' }}>
                                                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vendor  : </p>
                                                        <span style={{ marginLeft: "5px", fontSize: "12px", color: 'darkblue', fontWeight: "bold" }}>{currentService.charAt(0).toUpperCase() + currentService.slice(1).toLowerCase()} Work</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                        <div style={{ display: "flex", alignItems: "center", margin: '0px 5px 0px 10px' }}>
                                                            <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0, fontWeight: "bold" }}>Current Status:</p>
                                                            {item?.[`${currentService}Details`]?.customerAcceptedVendor == true && item?.[`${currentService}Details`]?.cancelOrder == false && item?.[`${currentService}Details`]?.cancelPreAssignOrder == false && item?.[`${currentService}Details`]?.completeOrder == true && (<span style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'green', fontWeight: "bold" }}>Completed</span>)}
                                                            {item?.[`${currentService}Details`]?.cancelOrder == false && item?.[`${currentService}Details`]?.cancelPreAssignOrder == false && item?.[`${currentService}Details`]?.completeOrder == false && (<span style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", fontSize: "12px", borderRadius: "10px", color: 'green', fontWeight: "bold" }}>Processing</span>)}

                                                        </div>


                                                        <p style={{
                                                            fontSize: '11px',
                                                            marginTop: "5px",
                                                            background: "#ff1b1b",
                                                            // padding: "10px",
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
                                                            minWidth: "150px",
                                                            margin: '-8px 5px 5px 5px',
                                                            height: "30px"
                                                        }} onClick={(e) => getStageAndHistory(item, dataIndex)}>
                                                            See History
                                                            <img src={historyUser} style={{
                                                                position: "absolute", color: 'white',
                                                                left: '5px', height: "20px", width: "20px"
                                                            }} />
                                                        </p>

                                                    </div>



                                                </div>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

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
                                                        backgroundColor: "rgb(255 255 255 / 84%)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        border: "2px solid rgb(255 25 25)",
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

                    <Modal isOpen={openFilterModal} onClose={() => setOpenFilterModal(!openFilterModal)}>
                        {openFilterModal && (
                            <div style={{ textAlign: "center", marginTop: "30px", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('newest') }}>newest to oldest</p>
                                <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('oldest') }}>oldest to newest</p>
                                <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('daily') }}>Yesterday</p>
                                <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('weekly') }}>Last 7 days</p>
                                <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('monthly') }}>Last 30 days</p>
                                <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('year') }}>Year</p>
                            </div>
                        )}
                    </Modal>

                    {data.length == 0 && (
                        <NoDataFound />
                    )}
                </div>)}

        </div>
    )
}

export default HistoryReceipts;