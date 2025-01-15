import { useState, useEffect } from "react";
import Loading from "../Cards/Loading";
import NoDataFound from "../Cards/NoDataFound";
import axios from 'axios';
import backendUrl from '../../../environment';
import reachedUser from '../../../Assets/reachedUser.png'
import filterUser from '../../../Assets/filterUser.png'
import Modal from '../../Location1/Modal.jsx';
import workDoneUser from '../../../Assets/workDoneUser.png'
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import historyUser from '../../../Assets/historyUser.png'
import crossUser from '../../../Assets/crossUser.png'
import assignedTask from '../../../Assets/assignedTask.png'
import comingCrane from '../../../Assets/comingCrane.png'
import checksuccess from '../../../Assets/checksuccess.png'
import ratingStar from '../../../Assets/ratingStar.png'
import dropReason from '../../../Assets/dropReason.png'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SignalWifiStatusbarNullIcon from '@mui/icons-material/SignalWifiStatusbarNull';

const AllCancelledOrders = ({ vehicleNumber }) => {
    const [preCancelledOrders, setPreCancelledOrders] = useState([]);
    const [postCancelledOrdrs, setPostCancelledOrders] = useState([]);
    const [data, setData] = useState([]);
    const [filtering, setFiltering] = useState([]);

    const [doneFetching, setDoneFetching] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [avg, setAvg] = useState([])

    const [currentStage, setCurrentStage] = useState([]); // Example stage
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [reasonPage, setReasonPage] = useState(false);
    const [currentItem, setCurrentItem] = useState([])

    const [stages, setStages] = useState([]);

    const currentService = localStorage.getItem("currentService")

    useEffect(() => {
        setDoneFetching(false)
        getData()
    }, [userId, token, currentService])

    const getData = async (e) => {
        console.log("userid", userId);
        const response = await axios.get(`${backendUrl}/api/getCancelledOrdersByCustomers/${userId}/${currentService}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
        if (response.data.message == "No accident vehicle data found.") {
            setPreCancelledOrders([])
            setPostCancelledOrders([])
            doneFetching(true)
        }
        else {
            console.log("response123421", response.data.data);
            console.log("data2", response.data.data2);
            setFiltering(response.data.data)
            setData(response.data.data)
            setPreCancelledOrders(response.data.data)
            setPostCancelledOrders(response.data.data2);
            setDoneFetching(true)
        }
    };

    useEffect(() => {
        if (data.length > 0 && data.length != currentStage.length) {
            data.map(() => {
                avg.push(0)
            })
        }
    }, [data])

    const getFilteredData = (filter) => {
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

            let getTime = filtering[i]?.cancelledAt.split('|');
            let cancelledDate = getTime[0];
            let cancelledTime = getTime[1];
            let cancelledDateTime = new Date(`${cancelledDate} ${cancelledTime}`);

            if (filter === 'daily') {
                console.log("here i am daily")
                if (cancelledDate === todayDate || cancelledDate === yesterdayDate) {
                    const timeDifference = now - cancelledDateTime;
                    if (timeDifference <= oneDay) {
                        console.log("Match found within last 24 hours:", data[i]);
                        filteredData.push(filtering[i]);
                    }
                }
            }
            else if (filter === 'weekly') {
                console.log("here i am weekly")
                if (cancelledDateTime >= weekBefore && cancelledDateTime <= now) {
                    console.log("Match found within last 7 days:", data[i]);
                    filteredData.push(filtering[i]);
                }
            }
            else if (filter === 'monthly') {
                if (cancelledDateTime >= monthBefore && cancelledDateTime <= now) {
                    console.log("Match found within last 30 days:", data[i]);
                    filteredData.push(filtering[i]);
                }
            }
            else if (filter === 'year') {
                const yearBefore = new Date(now.getTime() - (oneDay * 365)); // Calculate date one year ago
                if (cancelledDateTime >= yearBefore && cancelledDateTime <= now) {
                    console.log("Match found within last year:", filtering[i]);
                    filteredData.push(filtering[i]);
                }
            }

        }
        if (filter === 'newest') {
            console.log("Sorting by newest to oldest");
            console.log("filtering", filtering[0])
            filtering.sort((a, b) => {
                console.log("a?.cancelledAt", a?.cancelledAt)
                const dateA = new Date(a?.cancelledAt.split('|').join(' '));
                const dateB = new Date(b?.cancelledAt.split('|').join(' '));
                return dateB - dateA; // Descending order
            });
            setData([...filtering]);
        }
        else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            filtering.sort((a, b) => {
                const dateA = new Date(a?.cancelledAt.split('|').join(' '));
                const dateB = new Date(b?.cancelledAt.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setData([...filtering]);
        }
        else {
            setData(filteredData)
        }
    };


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
                { label: "Cancelled", img: crossUser, date: currentStage[0][5] },

            ]);
        }
    }, [currentStage[0]]);
    const getStage = (filedCaseFullyTime, connectedVendorFully, vendorMovedTime, vendorReachedTime, doneWorkingTime, cancelledAt) => {
        const stages = [filedCaseFullyTime, connectedVendorFully, vendorMovedTime, vendorReachedTime, doneWorkingTime, cancelledAt]
        console.log("stage", stages)
        // return stages.filter((item) => item != "")
        return stages;
    }

    const getStageAndHistory = (item, index) => {
        console.log("tem?.cancelledAt", item?.cancelledAt)
        console.log("filedCaseFullyTime, vendorMovedTime, vendorReachedTime, doneWorkingTime, cancelledAt", item?.filedCaseFullyTime, item?.connectedVendorFully ? item?.connectedVendorFullyTime : "hey", item?.customerAcceptedVendor ? item?.customerAcceptedVendorTime : "hey", item?.vendorMoved ? item.vendorMovedTime : "hey", item.vendorReached ? item?.vendorReachedTime : "hey", item.doneWorking ? item?.doneWorkingTime : "hey", item?.cancelledAt)
        let gotStage = getStage(item?.filedCaseFullyTime, item?.connectedVendorFully ? item?.connectedVendorFullyTime : "", item?.vendorMoved ? item.vendorMovedTime : "", item.vendorReached ? item?.vendorReachedTime : "", item.doneWorking ? item?.doneWorkingTime : "", item?.cancelledAt)
        console.log("GOTSTEAG", gotStage)
        setCurrentStage((prevStages) => [gotStage, ...prevStages]);
        setIsHistoryPage(true)
    }

    const getReason = (item, index) => {
        setCurrentItem(item)
        setReasonPage(true)
    }
    // const getStage = (filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime) => {
    //     console.log("filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime ||||||||||||", filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime)
    //     return [filedCaseFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime]
    // }
    // const getStageAndHistory = (item, index) => {
    //     let gotStage = getStage(item?.filedCaseFullyTime, item?.customerAcceptedVendorTime, item?.vendorMovedTime, item?.vendorReachedTime, item?.doneWorkingTime)
    //     currentStage.unshift(gotStage)
    //     setIsHistoryPage(true)
    // }


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
        const newRows = filtering.filter((row) => {
            const formattedId = String(row.id).padStart(4, '0').toLowerCase();
            const idValue = formattedId.includes(value);
            const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(value);
            const chassisNoValue = (row.chassisNo ?? '').toLowerCase().includes(value);
            return idValue || vehicleNoValue || chassisNoValue;
        });
        setData(newRows);
    };

    const handleSelect = (index) => {
        setSelectedIndex(index);
        console.log("SELECTEDINDOEX", index)
        console.log("filtering", filtering)

        if (index === 0) {
            setFiltering([...preCancelledOrders]);
            setData([...preCancelledOrders]);
        } else {
            setFiltering([...postCancelledOrdrs]);
            setData([...postCancelledOrdrs]);
        }
    };

    const settingFilter = (filter) => {
        console.log("filter", filter)
        getFilteredData(filter)
        setOpenFilterModal(false)
    }

    return (
        <div style={{ marginBottom: "60px", background: 'linear-gradient(rgba(223, 255, 222, 0), rgb(255, 255, 255), rgb(182 179 179 / 3%))' }}>
            {doneFetching == false && (
                <Loading />
            )}

            {doneFetching && (
                <div>
                    <div style={{ position: "sticky", top: "50px", zIndex: "999", margin: "20px 20px", marginLeft: "40px" }}>
                        <div className="imageContainer" style={{ height: "0px" }}>
                            {["Pre Cancelled", "Post Cancelled"].map((text, index) => (
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

                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div className="container h-100">
                            <div className="d-flex justify-content-center h-100" style={{ marginTop: '-113px', position: 'sticky', top: "25px" }}>
                                <div className="searchbar" style={{ border: '1px solid', minWidth: "130px", maxWidth:'250px' }}>
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
                                gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                                
                            }}
                        >
                            {data.map((item, dataIndex) => (
                                <div
                                    style={{
                                        display: "grid", // Enables grid layout
                                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", // Adjusts number of columns dynamically
                                        gap: "20px", // Adds space between grid items
                                        background: "white",
                                        border: "1px solid teal",
                                        margin: "10px",
                                        boxShadow: "rgba(0, 0, 0, 0.2) 3px 4px 12px 8px",
                                        padding: "10px",
                                        maxWidth: "400px",
                                        borderRadius:'20px'
                                    }}
                                    key={dataIndex} // Ensure `dataIndex` is unique or use a unique property from `item`
                                >
                                    <div style={{ background: "20px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 2px' }}>
                                                <LocalShippingOutlinedIcon className='h-[30px] w-[30px]' />
                                                <span className='text-s font-semibold' style={{ marginLeft: "5px" }}>{item.reg}</span>
                                            </div>
                                            <div style={{ marginTop: "5px", marginRight: "10px", width: "45px", background: '#0e4823', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'yellow' , height:'30px'}}>{avg[dataIndex]} <img src={ratingStar} style={{ height: "10px", width: "10px", marginLeft: '3px' }} /></div>
                                        </div>

                                        <hr className="m-1 mb-3"/>

                                        <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 10px 5px' }}>
                                            <p className="text-xs text-green-700 mr-1">Registered</p>
                                            <AppRegistrationIcon className='h-[30px] w-[30px]' />
                                            <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.filedCaseFullyTime.split("|")[0]}</span>
                                            <AccessTimeIcon className='h-[30px] w-[30px] mr-[0px] ml-[15px]' />
                                            <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.filedCaseFullyTime.split("|")[1]}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 10px 5px' }}>
                                        <p className="text-xs text-red-700 mr-1">Cancelled</p>
                                            <CancelPresentationIcon className='h-[30px] w-[30px]' />
                                            <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.cancelledAt.split("|")[0]}</span>
                                            <AccessTimeFilledIcon className='h-[30px] w-[30px] mr-[0px] ml-[15px]' />
                                            <span style={{ color: "green", marginLeft: "5px", fontSize: "12px" }}>{item?.cancelledAt.split("|")[1]}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", alignItems: "center", margin: "0px 5px 10px 10px" }}>
                                                <SignalWifiStatusbarNullIcon className='h-[30px] w-[30px]' />
                                                {selectedIndex === 0 && (
                                                    <span
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            padding: "5px",
                                                            fontSize: "14px",
                                                            borderRadius: "10px",
                                                            color: "#ff0000",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Pre Cancelled
                                                    </span>
                                                )}
                                                {selectedIndex === 1 && (
                                                    <span
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            padding: "5px",
                                                            fontSize: "14px",
                                                            borderRadius: "10px",
                                                            color: "#ff0000",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Post Cancelled
                                                    </span>
                                                )}
                                            </div>

                                        </div>
                                        <div style={{
                                            display: "flex", justifyContent: "space-around",
                                            alignItems: "center",
                                            border: "1px solid",
                                            padding: "7px 0px",
                                            borderRadius: "0px 10px 30px 0px",
                                            background: "lavender",
                                            marginTop: "20px",
                                        }}>
                                            <p
                                                style={{
                                                    fontSize: "11px",
                                                    marginTop: "5px",
                                                    background: "white",
                                                    border: "2px solid #000000",
                                                    textAlign: "center",
                                                    borderRadius: "5px",
                                                    fontWeight: "bold",
                                                    color: "blue",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    position: "relative",
                                                    cursor: "pointer",
                                                    maxWidth: "400px",
                                                    minWidth: "150px",
                                                    margin: "5px 5px 5px 5px",
                                                    height: "30px",
                                                }}
                                                onClick={(e) => getStageAndHistory(item, dataIndex)}
                                            >
                                                Order Status
                                                <img
                                                    src={historyUser}
                                                    style={{
                                                        position: "absolute",
                                                        left: "5px",
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                />
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "11px",
                                                    marginTop: "5px",
                                                    background: "#0082cf7a",
                                                    border: "2px solid #000000",
                                                    textAlign: "center",
                                                    borderRadius: "5px 20px 120px 40px",
                                                    fontWeight: "bold",
                                                    color: "black",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    position: "relative",
                                                    cursor: "pointer",
                                                    maxWidth: "400px",
                                                    minWidth: "120px",
                                                    margin: "5px 5px 5px 5px",
                                                    height: "30px",
                                                }}
                                                onClick={(e) => getReason(item, dataIndex)}
                                            >
                                                Reason
                                                <img
                                                    src={dropReason}
                                                    style={{
                                                        position: "absolute",
                                                        left: "5px",
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                />
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>


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
                                                            opacity: stage.date ? 1 : 0.5,
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
                                                        opacity: stage.date ? 1 : 0.5
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

                    {reasonPage && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#00000052", // semi-transparent background
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
                                    onClick={() => setReasonPage(false)}
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


                                <div style={{ margin: "20px 0px" }}>
                                    <div>
                                        <p style={{ marginLeft: "20px", marginTop: "50px" }}>Reasons to cancel order : </p>
                                        <textarea
                                            className="Registrationdetails-elem-9"
                                            style={{ textAlign: 'left', margin: "10px 5px 50px 10px", width: '95%', background: "lightgray" }}
                                            value={selectedIndex == 0 ? currentItem.cancelPreAssignOrderReason : currentItem.cancelOrderReason}
                                            readOnly
                                        />
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
                </div>
            )
            }
        </div >
    )

}

export default AllCancelledOrders;