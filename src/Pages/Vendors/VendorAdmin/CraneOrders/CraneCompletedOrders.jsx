import { useEffect, useState } from "react";
// import VendorMoving from "../../Vendors/VendorMoving";
import VendorMoving from "../../../CompanyAdmin/VendorResponse/VendorMoving";
// import BottomNavigationVendor from "../BottomNavigationVendor/BottomNavigationVendor";
import BottomNavigationVendor from "../../../../Component/Vendors/BottomNavigationVendor/BottomNavigationVendor";
import assignedTask from '../../../../Assets/assignedTask.png'
import comingCrane from '../../../../Assets/comingCrane.png'
import checksuccess from '../../../../Assets/checksuccess.png'
// import NoDataFound from '../../User/Cards/NoDataFound';
import NoDataFound from "../../../../Component/Customers/Cards/NoDataFound";
import axios from "axios";
import crossUser from '../../../../Assets/crossUser.png'
import searchinterfacesymbol from '../../../../Assets/search-interface-symbol.png'
import filterUser from '../../../../Assets/filterUser.png'
// import Modal from "../../Location1/Modal";
import Modal from "../../../../Component/CompanyAdmin/Location1/Modal";
import historyUser from '../../../../Assets/historyUser.png'
import workDoneUser from '../../../../Assets/workDoneUser.png'
import reachedUser from '../../../../Assets/reachedUser.png'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

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

const CraneCompletedOrders = ({ data }) => {
    const [totalCompletedCases, setTotalCompletedCase] = useState([]);
    const [spareUseData, setSpareUseData] = useState([]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log('totalCompletedCases', totalCompletedCases[0])

    const [openDetails, setOpenDetails] = useState(false);
    const [choosenCase, setChoosenCase] = useState([])

    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")
    const [distance, setDistances] = useState([])

    const [filter, setFilter] = useState('')
    const [openFilterModal, setOpenFilterModal] = useState(false)

    const [currentStage, setCurrentStage] = useState([]); // Example stage
    const [avg, setAvg] = useState([])

    const stages = [
        { label: "Processing", img: comingCrane },
        { label: "Customer Accepted", img: assignedTask },
        { label: "Complete Order", img: checksuccess },
    ];


    useEffect(() => {
        setTotalCompletedCase(data)
        setSpareUseData(data)
        if (choosenCase.length > 0) {
            const updatedCase = data.find(item => item.details[0].accidentFileNo === choosenCase[0].accidentFileNo);
            if (updatedCase) {
                setChoosenCase([updatedCase]);
            } else {
                setChoosenCase([]);
                setOpenDetails(false)
            }
        }
    }, [data])

    const handleChoosenCase = (item) => {
        setChoosenCase([])
        setChoosenCase([item])
        setOpenDetails(true)
    }

    const getStage = (customerAcceptedVendor, acceptedByAdmin) => {
        return customerAcceptedVendor ? 2 : acceptedByAdmin === 'accept' ? 1 : 0;
    }

    useEffect(() => {

        if (totalCompletedCases.length > 0) {
            const newAvg = Array(data.length).fill(0);
            const newCurrentStage = totalCompletedCases.map((item) => {
                let gotStage = getStage(item.details[0]?.customerAcceptedVendor, item.details[0]?.acceptedByAdmin)
                return gotStage;
            })
            setAvg(newAvg);
            setCurrentStage(newCurrentStage);

            totalCompletedCases.forEach((item, index) => {
                // getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude, index);
                // getCustomerRating(item.CustomerCode)
            });
        }
    }, [totalCompletedCases]);


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
        const weekBeforeDate = formatDate(weekBefore);
        const monthBeforeDate = formatDate(monthBefore);

        console.log("todayDate", todayDate);
        console.log("yesterdayDate", yesterdayDate);

        for (let i = 0; i < spareUseData.length; i++) {
            let getTime = spareUseData[i].details[0].filedCaseFullyTime.split('|');
            let assignedDate = getTime[0];
            let assignedTime = getTime[1];
            let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

            if (filter === 'daily') {
                console.log("here I am daily");
                if (assignedDate === todayDate || assignedDate === yesterdayDate) {
                    const timeDifference = now - assignedDateTime;
                    if (timeDifference <= oneDay) {
                        console.log("Match found within last 24 hours:", spareUseData[i]);
                        filteredData.push(spareUseData[i]);
                    }
                }
            } else if (filter === 'weekly') {
                console.log("here I am weekly");
                if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
                    console.log("Match found within last 7 days:", spareUseData[i]);
                    filteredData.push(spareUseData[i]);
                }
            } else if (filter === 'monthly') {
                if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
                    console.log("Match found within last 30 days:", spareUseData[i]);
                    filteredData.push(spareUseData[i]);
                }
            }
            else if (filter === 'year') {
                const yearBefore = new Date(now.getTime() - (oneDay * 365)); // Calculate date one year ago
                if (assignedDateTime >= yearBefore && assignedDateTime <= now) {
                    console.log("Match found within last year:", spareUseData[i]);
                    filteredData.push(spareUseData[i]);
                }
            }
        }

        if (filter === 'newest') {
            console.log("Sorting by newest to oldest");
            spareUseData.sort((a, b) => {
                const dateA = new Date(a.details[0].filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b.details[0].filedCaseFullyTime.split('|').join(' '));
                return dateB - dateA; // Descending order
            });
            setTotalCompletedCase([...spareUseData]);
        } else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            spareUseData.sort((a, b) => {
                const dateA = new Date(a.details[0].filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b.details[0].filedCaseFullyTime.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setTotalCompletedCase([...spareUseData]);
        } else {
            setTotalCompletedCase(filteredData);
        }
    };


    const settingFilter = (filter) => {
        console.log("filter", filter)
        setFilter(filter)
        getFilteredData(filter)
        setOpenFilterModal(false)
    }

    const getVendorLocation = async (crane, accidentLatitude, accidentLongitude, index) => {
        try {
            console.log("disntaceadfafdaf", distance)
            console.log("craninging", crane, accidentLatitude, accidentLongitude, index)

            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendorCurrentLocation/${crane}`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.status === true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)
                const calculatedDistance = haversine(accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude).toFixed(2);
                distance.push(calculatedDistance)
            }
            else if (response.data.message === "User Not found take Location") {
                console.log("User Not found take Location")
            }
        } catch (error) {
            console.log("error in get Vendor Location", error.message)
        }
    }

    const getCustomerRating = async (customerCode) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vendorRatingToCustomer/${customerCode}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log("coming Customer Rating", response.data)
            if (response.data.status === 404) {
                console.log("Not Found")
                avg.push(0)
            }
            else if (response.data.status === true) {
                avg.push(response.data.data);
            }
        } catch (error) {
            console.log("Error from get Vendor Rating", error.message)
        }
    }

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const newRows = spareUseData.filter((row) => {
            const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
            const searchLower = value; // Use the updated search value directly
            const idValue = formattedId.includes(searchLower);
            const vehicleNoValue = (row.reg ?? '').toLowerCase().includes(searchLower);
            return vehicleNoValue;
        });

        setTotalCompletedCase(newRows);
    };

    const [historyStage, setHistoryStages] = useState([]);
    const [currentHistoryStage, setCurrentHistoryStage] = useState([]);
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const getHistoryStage = (connectedVendorFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime) => {
        return [connectedVendorFullyTime, customerAcceptedVendorTime, vendorMovedTime, vendorReachedTime, doneWorkingTime]
    }
    const getStageAndHistory = (item, index) => {
        setCurrentItemIndex(index)
        console.log("item", item.details[0].connectedVendorFullyTime)
        let gotStage = getHistoryStage(item?.details[0]?.connectedVendorFullyTime, item?.details[0]?.customerAcceptedVendorTime, item?.details[0]?.vendorMovedTime, item?.details[0]?.vendorReachedTime, item?.details[0]?.doneWorkingTime)
        currentHistoryStage.unshift(gotStage)
        setIsHistoryPage(true)
    }

    useEffect(() => {
        if (currentHistoryStage[0]) {
            console.log("currenthistory", currentHistoryStage[0])
            setHistoryStages([
                { label: "Connected", img: assignedTask, date: currentHistoryStage[0][0] },
                { label: "Customer Accepted", img: checksuccess, date: currentHistoryStage[0][1] },
                { label: "Accepted & Moved", img: comingCrane, date: currentHistoryStage[0][2] },
                { label: "Reached", img: reachedUser, date: currentHistoryStage[0][3] },
                { label: "Work Done", img: workDoneUser, date: currentHistoryStage[0][4] },
            ]);
        }
    }, [currentHistoryStage[0]]);


    return (
        <div>
            <div style={{
                marginBottom: "100px"
            }}>
                <div className="container" style={{
                    // paddingTop:"30px",
                    maxWidth: "500px",
                    height: "30px",
                    marginBottom: "30px",
                    paddingTop: "0px"
                    // filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                    // opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                    // pointerEvents: isImageContainerVisible ? "none" : "auto", // Disable clicking


                }}>
                    <div className="d-flex justify-content-center h-100"  >
                        <div className="searchbar" style={{ border: '1px solid', minWidth: "250px" }}>
                            <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px" }} onChange={handleSearch} />
                            {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                        </a> */}
                            <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
                        </div>
                        <div style={{ margin: "23px 20px 0px" }}>
                            <img src={filterUser} style={{ height: '20px', width: "20px" }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                        </div>
                    </div>
                </div>
                {totalCompletedCases.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",

                        }}>
                        {totalCompletedCases.map((item, dataIndex) => (
                            <div style={{
                                border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "20px", padding: "10px",
                                backgroundImage: "url('https://m.clw-specialtruck.com/uploads/201919986/20t-wrecker-tow-truck25419630566.jpg')", // ✅ Corrected syntax
                                backgroundSize: "cover", // ✅ Ensures the image covers the container
                                backgroundPosition: "center", // ✅ Centers the image
                                backgroundRepeat: "no-repeat", // ✅ Prevents tiling  
                            }}>

                                <div className="bg-gray-400 p-1" style={{borderRadius:'10px', opacity:'0.9'}}>

                                    <div style={{ display: "flex", alignItems: "center", margin: "20px 0px 0px 0px" }}>
                                        {stages.map((stage, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    position: "relative",
                                                    flex: 1,
                                                }}
                                            >
                                                {/* Icon/Image for each stage */}
                                                <div
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        backgroundColor: index === currentStage[dataIndex] ? index === 2 ? "rgb(11 219 255)" : "#4CAF50" : "#ccc",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        border: index === currentStage[dataIndex] ? "2px solid #4CAF50" : "none",
                                                        transition: "background-color 0.3s ease",
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <img
                                                        src={stage.img}
                                                        alt={stage.label}
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            opacity: index <= currentStage[dataIndex] ? 1 : 0.5,
                                                        }}
                                                    />
                                                </div>

                                                {/* Stage Label */}
                                                <p
                                                    style={{
                                                        marginTop: "5px",
                                                        color: index <= currentStage[dataIndex] ? "black" : "#aaa",
                                                        fontWeight: index === currentStage[dataIndex] ? "bold" : "normal",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {stage.label}
                                                </p>

                                                {/* Connecting Line */}
                                                {index < stages.length - 1 && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "15px", // Aligns with the center of the icon
                                                            left: "50%",
                                                            right: "-50%",
                                                            width: "100%",
                                                            height: "2px",
                                                            backgroundColor: index < currentStage[dataIndex] ? "#4CAF50" : "#ccc",
                                                            zIndex: 0,
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: "20px" }}>

                                        {/* <hr className="color-black m-0" /> */}
                                        <div className='px-2 py-1 ' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <LocalShippingOutlinedIcon className='h-[30px] w-[30px]' />
                                                <span className='text-md font-semibold' style={{ marginLeft: "5px" }}>{item.details[0].reg}</span>
                                            </div>
                                            <div
                                                className="right-10  flex items-center mt-1"
                                                style={{ margin: '0px 5px 0 5px' }}
                                            >
                                                <ArticleIcon className="h-[30px] w-[30px] text-red-500" />
                                                <span className="text-xs font-medium ml-2">
                                                    {item.details[0].systemDate?.split("|")[0]}
                                                </span>
                                            </div>
                                        </div>



                                        <div style={{ borderTop: '1px solid gray', borderRadius: "10px 0px 0px 10px", borderBottom: "1px solid", padding: '4px 5px 9px 5px', display: 'inline-block', background: "linear-gradient(42deg, #e7fae8, transparent)", margin: '10px' }}>
                                            <div style={{ display: "flex", alignItems: "center", margin: '10px 5px 0px 15px' }}>
                                                <LibraryAddCheckIcon className='h-[30px] w-[30px] text-red-500' />
                                                <span className="text-sm font-semibold" style={{ marginLeft: "5px" }}>Task Completed</span>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 15px' }}>
                                                <DateRangeOutlinedIcon className='h-[30px] w-[30px]  text-red-500' />
                                                <p className="text-sm ml-2 text-green-700">Date</p>
                                                <span className="text-sm" style={{ marginLeft: "5px" }}>{item.details[0].confirmDoneWorkingTime?.split("|")[0]}</span>

                                                <AccessTimeOutlinedIcon className='h-[30px] w-[30px] text-red-500 ml-5' />
                                                <span className="text-sm" style={{ marginLeft: "5px" }}>{item.details[0].confirmDoneWorkingTime?.split("|")[1]}</span>
                                            </div>
                                        </div>


                                    </div>
                                    
                                    {/* <div style={{
                            fontSize: '11px',
                            marginTop: "2px",
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
                            minWidth: "280px",
                            margin: '5px 0px 0px 5px',
                            height: "30px"
                        }}
                            onClick={() => handleChoosenCase(item)}>View Case</div> */}
                                </div>
                                
                                <div className="mt-2 ml-auto flex justify-end">
                                            <p
                                                className="text-sm mt-1 font-semibold bg-red-600 text-white   text-center rounded-full  flex items-center justify-center relative cursor-pointer max-w-[200px] min-w-[150px] h-[30px]"
                                                style={{ border: '1px solid', paddingLeft: "10px", fontSize: "13px" }}
                                                onClick={(e) => getStageAndHistory(item, dataIndex)}
                                            >
                                                See History
                                                <img
                                                    src={historyUser}
                                                    className="absolute left-1 h-[20px] w-[20px]"
                                                    alt="history icon"
                                                />
                                            </p>
                                        </div>


                            </div>
                        ))}
                    </div>
                )}

                {openDetails && (
                    <div style={{
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
                                onClick={() => setOpenDetails(false)}
                                style={{
                                    position: "fixed",
                                    // top: "-10px",
                                    left: "calc(100% - 80px)",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                    bottom: "360px"
                                }}
                            />
                            <VendorMoving item={choosenCase[0]} />
                        </div>
                    </div>
                )}
                {totalCompletedCases.length === 0 && (
                    <NoDataFound />
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

            </div>

            <div
            >

                <div>
                    <BottomNavigationVendor />
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
                                    {historyStage.map((stage, index) => (
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

                                            {index < historyStage.length - 1 && (
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

            </div>
        </div>
    )
}

export default CraneCompletedOrders;