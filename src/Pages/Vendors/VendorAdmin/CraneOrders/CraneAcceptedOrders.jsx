import { useEffect, useState } from "react";
import VendorMoving from "../../../CompanyAdmin/VendorResponse/VendorMoving";
import assignedTask from '../../../../Assets/assignedTask.png'
import comingCrane from '../../../../Assets/comingCrane.png'
import checksuccess from '../../../../Assets/checksuccess.png'
import ratingStar from '../../../../Assets/ratingStar.png'
import NoDataFound from "../../../../Component/Customers/Cards/NoDataFound";
import axios from "axios";
import crossUser from '../../../../Assets/crossUser.png'
import searchinterfacesymbol from '../../../../Assets/search-interface-symbol.png'
import filterUser from '../../../../Assets/filterUser.png'
import viewcase from '../../../../Assets/viewcase.png'
import Modal from "../../../../Component/CompanyAdmin/Location1/Modal";
import { useWebSocket } from "../../../../ContexAPI/WebSocketContext";
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

const Notification = ({ message, onClose }) => {
    return (
        <div className="notification">
            <button className="close-btn" onClick={onClose}>✖</button>
            <p>{message}</p>
        </div>
    );
};

const CraneAcceptedOrders = ({ data, recentlyCancelled }) => {
    const [totalAcceptedCases, setTotalAcceptedCase] = useState([]);
    console.log("data from crane order delete", recentlyCancelled)
    const [recentlyCancelledData, setRecentlyCancelledData] = useState(false)
    const [gotCancelled, setGotCancelled] = useState(false)

    const [spareUseData, setSpareUseData] = useState([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log('totalAcceptedCases', totalAcceptedCases)
    const { messages } = useWebSocket()
    console.log('spareUseData', spareUseData)


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
        { label: "Admin Accepted", img: assignedTask },
        { label: "Customer Accepted", img: checksuccess },
    ];


    useEffect(() => {
        setTotalAcceptedCase(data)
        setSpareUseData(data)
        // setCurrentStage([])
        if (choosenCase.length > 0) {
            const updatedCase = data.find(item => (
                console.log('data for choosen case', item.accidentFileNo, choosenCase[0].accidentFileNo),
                item.accidentFileNo === choosenCase[0].accidentFileNo
            ));
            console.log('updatedcase', updatedCase)
            if (updatedCase) {
                setChoosenCase([updatedCase]);
            } else {
                setChoosenCase([]);
                setOpenDetails(false)
            }
        }
        setRecentlyCancelledData(recentlyCancelled)
       if (recentlyCancelled !== "" )setGotCancelled(true)


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

        if (totalAcceptedCases.length) {
            const avg = new Array(totalAcceptedCases.length).fill(0);
            const currentStage = totalAcceptedCases.map((item) => {
                console.log("tem.details[0]?.customerAcceptedVendor", item.details[0]?.customerAcceptedVendor)
                return getStage(item.details[0]?.customerAcceptedVendor, item.details[0]?.acceptedByAdmin)
            })
            totalAcceptedCases.forEach((item, index) => {
                // getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude, index);
                // getCustomerRating(item.CustomerCode)
            });
        }
    }, [totalAcceptedCases]);



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
            setTotalAcceptedCase([...spareUseData]);
        } else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            spareUseData.sort((a, b) => {
                const dateA = new Date(a.details[0].filedCaseFullyTime.split('|').join(' '));
                const dateB = new Date(b.details[0].filedCaseFullyTime.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setTotalAcceptedCase([...spareUseData]);
        } else {
            setTotalAcceptedCase(filteredData);
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

        setTotalAcceptedCase(newRows);
    };

    return (
        <div style={{
            // height:'100vh',
            // background:'radial-gradient(#1e4b1b00,transparent, transparent,transparent, #276c50)',
        }}>
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
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div className="container fixed " style={{ zIndex: '1001' }}>
                            <div className="d-flex justify-content-center h-100" style={{ position: 'sticky', top: "25px" }}>
                                <div className="searchbar" style={{ border: '1px solid', minWidth: "130px" }}>
                                    <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px" }} value={searchValue} onChange={(e) => { handleSearch(e.target.value) }} />
                                    <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
                                </div>
                                <div style={{ margin: "23px 20px 0px" }}>
                                    <img src={filterUser} style={{ height: '20px', width: "20px", background: 'linear-gradient(45deg, white, transparent)', borderRadius: "10px", }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                    {gotCancelled && (
                        <div>   
                        <Notification
                            message={recentlyCancelledData}
                            onClose={() => setGotCancelled(false)}
                        />
                        </div>
                    )}
                </div>
                {totalAcceptedCases.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",

                        }}>
                        {totalAcceptedCases.map((item, dataIndex) => (
                            <div style={{
                                border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "20px", padding: "10px", marginTop: "30px",
                                backgroundImage: "url('https://media.istockphoto.com/id/1465157700/photo/brightly-red-colored-semi-truck-speeding-on-a-two-lane-highway-with-cars-in-background-under.jpg?s=612x612&w=0&k=20&c=cfbbPy2ylvFGRULNLGO_Ucm-C5DsOJMFHiZBdKGsq3c=')", // ✅ Corrected syntax
                                backgroundSize: "cover", // ✅ Ensures the image covers the container
                                backgroundPosition: "center", // ✅ Centers the image
                                backgroundRepeat: "no-repeat", // ✅ Prevents tiling  
                            }}>
                                <div className="bg-white p-1" style={{ borderRadius: '10px', opacity: '0.9' }}>
                                    <div className="flex justify-between">
                                        <img
                                            className="h-[105px] w-[105px] mt-[-50px] "
                                            src="https://png.pngtree.com/png-clipart/20240308/original/pngtree-3d-free-cargo-delivery-truck-png-image_14540258.png"
                                            alt="Truck"
                                        />
                                        <div style={{ marginTop: "10px", marginRight: "10px", width: "45px", background: '#0e4823', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'yellow', maxHeight: '30px' }}>{avg[dataIndex]} <img src={ratingStar} style={{ height: "10px", maxHeight: "10px", width: "10px", marginLeft: '3px' }} /></div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
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
                                        <hr className="text-black" />
                                        {/* <hr className="color-black m-0" /> */}

                                        <div className='px-2 py-1 ' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <LocalShippingOutlinedIcon className='h-[30px] w-[30px]' />
                                                <span className='text-md font-semibold' style={{ marginLeft: "5px" }}>{item.reg}</span>
                                            </div>
                                            <div
                                                className="right-10  flex items-center mt-1"
                                                style={{ margin: '0px 5px 0 5px' }}
                                            >
                                                <ArticleIcon className="h-[30px] w-[30px] text-red-500" />
                                                <span className="text-xs font-medium ml-2">
                                                    {item.details[0].connectedVendorFullyTime?.split("T")[0]}
                                                </span>
                                            </div>

                                        </div>

                                        <div style={{ borderTop: '1px solid gray', borderRadius: "10px 0px 0px 10px", borderBottom: "1px solid", padding: '4px 5px 9px 5px', display: 'inline-block', background: "linear-gradient(42deg, #e7fae8, transparent)", margin: '10px' }}>
                                            <div style={{ display: "flex", alignItems: "center", margin: '10px 5px 0px 15px' }}>
                                                <LibraryAddCheckIcon className='h-[30px] w-[30px] text-red-500' />
                                                <span className="text-sm font-semibold" style={{ marginLeft: "5px" }}> {item.details[0].vendorType} Accepted</span>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 15px' }}>
                                                <DateRangeOutlinedIcon className='h-[30px] w-[30px]  text-red-500' />
                                                <p className="text-sm ml-2 text-green-700">Date</p>
                                                <span className="text-sm" style={{ marginLeft: "5px" }}> {item.details[0].systemDate?.split("T")[0]}</span>

                                                <AccessTimeOutlinedIcon className='h-[30px] w-[30px] text-red-500 ml-5' />
                                                <span className="text-sm" style={{ marginLeft: "5px" }}>{item.details[0].systemDate?.split("T")[1]}</span>
                                            </div>
                                        </div>




                                    </div>

                                </div>
                                <div style={{ minWidth: '400px' }}>
                                    <div className="mt-2 mr-auto ml-auto flex justify-center">
                                        <p
                                            className="text-sm mt-1 font-semibold bg-red-600 text-white rounded-full   text-center   flex items-center justify-center relative cursor-pointer max-w-[200px] min-w-[150px] h-[30px]"
                                            style={{ border: '1px solid', paddingLeft: "10px", fontSize: "13px" }}
                                            onClick={() => handleChoosenCase(item)}
                                        >
                                            View Case
                                            <img
                                                src={viewcase}
                                                className="absolute left-2 h-[20px] w-[20px]"
                                                alt="history icon"
                                            />
                                        </p>
                                    </div>
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
                        backgroundColor: "transparent", // semi-transparent background
                        zIndex: 1001,
                        display: "flex",
                        // alignItems: "flex-end", // positions the container at the bottom
                        justifyContent: "center",
                        animation: "slideUp 0.5s ease-out",
                    }}>
                        <div style={{ right: 0 }}>

                            <img
                                src={crossUser}
                                onClick={() => setOpenDetails(false)}
                                style={{
                                    position: "static",
                                    // top: "-10px",
                                    left: "calc(100% - 80px)",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                    zIndex: 1001,
                                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                    bottom: "360px",
                                    margin: '20px 0px 0px 50px'
                                }}
                            />
                        </div>

                        <div className="image-container" style={{ position: "static", boxShadow: "none", borderRadius: "10px 10px 0px 0px" }}>
                            <VendorMoving item={choosenCase[0]} />
                        </div>
                    </div>
                )}
                {totalAcceptedCases.length === 0 && (
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

                {/* <div>
                    <BottomNavigationVendor />
                </div> */}

            </div>
        </div>
    )
}

export default CraneAcceptedOrders;










// import { useEffect, useState } from "react";
// import VendorMoving from "../../Vendors/VendorMoving";
// import BottomNavigationVendor from "../BottomNavigationVendor/BottomNavigationVendor";
// import assignedTask from '../../../../Assets/assignedTask.png'
// import comingCrane from '../../../../Assets/comingCrane.png'
// import checksuccess from '../../../../Assets/checksuccess.png'
// import ratingStar from '../../../../Assets/ratingStar.png'
// import NoDataFound from '../../User/Cards/NoDataFound';
// import axios from "axios";
// // "../../../environment";
// import crossUser from '../../../../Assets/crossUser.png'
// import searchinterfacesymbol from '../../../../Assets/search-interface-symbol.png'
// import filterUser from '../../../../Assets/filterUser.png'
// import viewcase from '../../../../Assets/viewcase.png'

// import Modal from "../../Location1/Modal";
// import { useWebSocket } from "../../ContexAPIS/WebSocketContext";
// import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
// import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
// import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
// import ArticleIcon from '@mui/icons-material/Article';
// import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';


// function haversine(lat1, lon1, lat2, lon2) {
//     console.log("accident latitude", lat1)
//     console.log("accident longtitude", lon1)
//     console.log("vehicle latitiude", lat2)
//     console.log("vehicle longtitude", lon2)

//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371; // Earth radius in km

//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance;
// }

// const Notification = ({ message, onClose }) => {
//     return (
//         <div className="notification">
//             <button className="close-btn" onClick={onClose}>✖</button>
//             <p>{message}</p>
//         </div>
//     );
// };

// const CraneAcceptedOrders = ({ data,updatedObject, recentlyCancelled }) => {
//     const [totalAcceptedCases, setTotalAcceptedCase] = useState([]);
//     console.log("data from crane order delete", recentlyCancelled)
//     console.log("updatedObject123213", updatedObject)

//     const [recentlyCancelledData, setRecentlyCancelledData] = useState(false)
//     const [gotCancelled, setGotCancelled] = useState(false)

//     const [spareUseData, setSpareUseData] = useState([]);
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     console.log('totalAcceptedCases', totalAcceptedCases)
//     const { messages } = useWebSocket()
//     console.log('spareUseData', spareUseData)


//     const [openDetails, setOpenDetails] = useState(false);
//     const [choosenCase, setChoosenCase] = useState([])

//     const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
//     const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")
//     const [distance, setDistances] = useState([])

//     const [filter, setFilter] = useState('')
//     const [openFilterModal, setOpenFilterModal] = useState(false)




//     const [currentStage, setCurrentStage] = useState([]); // Example stage
//     const [avg, setAvg] = useState([])

//     const stages = [
//         { label: "Processing", img: comingCrane },
//         { label: "Admin Accepted", img: assignedTask },
//         { label: "Customer Accepted", img: checksuccess },
//     ];
    

//     useEffect(()=>{
//         if(updatedObject.length > 0){
//             console.log('updatedObject')
//             console.log('updatedObject4564564656', updatedObject)
//         setCurrentStage([])
//             if (choosenCase.length > 0) {
//                 const updatedCase = updatedObject.find(item => (
//                     console.log('data for choosen case', item.accidentFileNo,  choosenCase[0].accidentFileNo),
//                     item.accidentFileNo === choosenCase[0].accidentFileNo
//                 ));
//                 console.log('updatedcase', updatedCase)
//                 if (updatedCase) {
//                     setChoosenCase([updatedCase]);
//                 setOpenDetails(true)
//                 } else {
//                     setChoosenCase([]);
//                     setOpenDetails(false)
//                 }
//             }
//         }

//     },[updatedObject])


//     useEffect(() => {
//         setTotalAcceptedCase(data)
//         setSpareUseData(data)
//         console.log('data changees')
//         setCurrentStage([])
//         if (choosenCase.length > 0) {
//             const updatedCase = data.find(item => (
//                 console.log('data for choosen case', item.accidentFileNo, choosenCase[0].accidentFileNo),
//                 item.accidentFileNo === choosenCase[0].accidentFileNo
//             ));
//             console.log('updatedcase', updatedCase)
//             if (updatedCase) {
//                 setChoosenCase([updatedCase]);
//                 setOpenDetails(true)
//             } else {
//                 setChoosenCase([]);
//                 setOpenDetails(false)
//             }
//         }
//         setRecentlyCancelledData(recentlyCancelled)
//        if (recentlyCancelled !== "" )setGotCancelled(true)


//     }, [data])

//     const handleChoosenCase = (item) => {
//         setChoosenCase([])
//         setChoosenCase([item])
//         setOpenDetails(true)
//     }

//     const getStage = (customerAcceptedVendor, acceptedByAdmin) => {
//         return customerAcceptedVendor ? 2 : acceptedByAdmin === 'accept' ? 1 : 0;
//     }
//     useEffect(() => {

//         if (totalAcceptedCases.length) {
//             const avg = new Array(totalAcceptedCases.length).fill(0);
//             const currentStage = totalAcceptedCases.map((item) => {
//                 console.log("tem.details[0]?.customerAcceptedVendor", item.details[0]?.customerAcceptedVendor)
//                 return getStage(item.details[0]?.customerAcceptedVendor, item.details[0]?.acceptedByAdmin)
//             })
//             totalAcceptedCases.forEach((item, index) => {
//                 getVendorLocation(item.crane, item.accidentLatitude, item.accidentLongitude, index);
//                 getCustomerRating(item.CustomerCode)
//             });
//         }
//     }, [totalAcceptedCases]);



//     const getFilteredData = (filter) => {
//         console.log("data is here");
//         const filteredData = [];

//         const now = new Date();  // Current date and time
//         const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
//         const yesterday = new Date(now.getTime() - oneDay); // Yesterday's date and time
//         const weekBefore = new Date(now.getTime() - (oneDay * 7));
//         const monthBefore = new Date(now.getTime() - (oneDay * 30));

//         const formatDate = (date) => {
//             const year = date.getFullYear();
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const day = String(date.getDate()).padStart(2, '0');
//             return `${year}-${month}-${day}`;
//         };

//         const todayDate = formatDate(now);
//         const yesterdayDate = formatDate(yesterday);
//         const weekBeforeDate = formatDate(weekBefore);
//         const monthBeforeDate = formatDate(monthBefore);

//         console.log("todayDate", todayDate);
//         console.log("yesterdayDate", yesterdayDate);

//         for (let i = 0; i < spareUseData.length; i++) {
//             let getTime = spareUseData[i].details[0].filedCaseFullyTime.split('|');
//             let assignedDate = getTime[0];
//             let assignedTime = getTime[1];
//             let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

//             if (filter === 'daily') {
//                 console.log("here I am daily");
//                 if (assignedDate === todayDate || assignedDate === yesterdayDate) {
//                     const timeDifference = now - assignedDateTime;
//                     if (timeDifference <= oneDay) {
//                         console.log("Match found within last 24 hours:", spareUseData[i]);
//                         filteredData.push(spareUseData[i]);
//                     }
//                 }
//             } else if (filter === 'weekly') {
//                 console.log("here I am weekly");
//                 if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
//                     console.log("Match found within last 7 days:", spareUseData[i]);
//                     filteredData.push(spareUseData[i]);
//                 }
//             } else if (filter === 'monthly') {
//                 if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
//                     console.log("Match found within last 30 days:", spareUseData[i]);
//                     filteredData.push(spareUseData[i]);
//                 }
//             }
//             else if (filter === 'year') {
//                 const yearBefore = new Date(now.getTime() - (oneDay * 365)); // Calculate date one year ago
//                 if (assignedDateTime >= yearBefore && assignedDateTime <= now) {
//                     console.log("Match found within last year:", spareUseData[i]);
//                     filteredData.push(spareUseData[i]);
//                 }
//             }
//         }

//         if (filter === 'newest') {
//             console.log("Sorting by newest to oldest");
//             spareUseData.sort((a, b) => {
//                 const dateA = new Date(a.details[0].filedCaseFullyTime.split('|').join(' '));
//                 const dateB = new Date(b.details[0].filedCaseFullyTime.split('|').join(' '));
//                 return dateB - dateA; // Descending order
//             });
//             setTotalAcceptedCase([...spareUseData]);
//         } else if (filter === 'oldest') {
//             console.log("Sorting by oldest to newest");
//             spareUseData.sort((a, b) => {
//                 const dateA = new Date(a.details[0].filedCaseFullyTime.split('|').join(' '));
//                 const dateB = new Date(b.details[0].filedCaseFullyTime.split('|').join(' '));
//                 return dateA - dateB; // Ascending order
//             });
//             setTotalAcceptedCase([...spareUseData]);
//         } else {
//             setTotalAcceptedCase(filteredData);
//         }
//     };


//     const settingFilter = (filter) => {
//         console.log("filter", filter)
//         setFilter(filter)
//         getFilteredData(filter)
//         setOpenFilterModal(false)
//     }

//     const getVendorLocation = async (crane, accidentLatitude, accidentLongitude, index) => {
//         try {
//             console.log("disntaceadfafdaf", distance)
//             console.log("craninging", crane, accidentLatitude, accidentLongitude, index)

//             const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendorCurrentLocation/${crane}`, { headers: { Authorization: `Bearer ${token}` } });
//             if (response.data.status === true) {
//                 let vendorCurrentLatitude = response.data.data[0].latitude;
//                 let vendorCurrentLongitude = response.data.data[0].longitude;
//                 setVendorCurrentLatitude(vendorCurrentLatitude)
//                 setVendorCurrentLongitude(vendorCurrentLongitude)
//                 const calculatedDistance = haversine(accidentLatitude, accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude).toFixed(2);
//                 distance.push(calculatedDistance)
//             }
//             else if (response.data.message === "User Not found take Location") {
//                 console.log("User Not found take Location")
//             }
//         } catch (error) {
//             console.log("error in get Vendor Location", error.message)
//         }
//     }

//     const getCustomerRating = async (customerCode) => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vendorRatingToCustomer/${customerCode}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
//             console.log("coming Customer Rating", response.data)
//             if (response.data.status === 404) {
//                 console.log("Not Found")
//                 avg.push(0)
//             }
//             else if (response.data.status === true) {
//                 avg.push(response.data.data);
//             }
//         } catch (error) {
//             console.log("Error from get Vendor Rating", error.message)
//         }
//     }

//     const [searchValue, setSearchValue] = useState('');

//     const handleSearch = (e) => {
//         const value = e.target.value.toLowerCase();
//         setSearchValue(value);
//         const newRows = spareUseData.filter((row) => {
//             const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
//             const searchLower = value; // Use the updated search value directly
//             const idValue = formattedId.includes(searchLower);
//             const vehicleNoValue = (row.reg ?? '').toLowerCase().includes(searchLower);
//             return vehicleNoValue;
//         });

//         setTotalAcceptedCase(newRows);
//     };

//     return (
//         <div style={{
//             // height:'100vh',
//             // background:'radial-gradient(#1e4b1b00,transparent, transparent,transparent, #276c50)',
//         }}>
//             <div style={{
//                 marginBottom: "100px"
//             }}>
//                 <div className="container" style={{
//                     // paddingTop:"30px",
//                     maxWidth: "500px",
//                     height: "30px",
//                     marginBottom: "30px",
//                     paddingTop: "0px"
//                     // filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
//                     // opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
//                     // pointerEvents: isImageContainerVisible ? "none" : "auto", // Disable clicking


//                 }}>
//                     <div style={{ display: 'flex', justifyContent: "space-between" }}>
//                         <div className="container fixed " style={{ zIndex: '1001' }}>
//                             <div className="d-flex justify-content-center h-100" style={{ position: 'sticky', top: "25px" }}>
//                                 <div className="searchbar" style={{ border: '1px solid', minWidth: "130px" }}>
//                                     <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px" }} value={searchValue} onChange={(e) => { handleSearch(e.target.value) }} />
//                                     <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
//                                 </div>
//                                 <div style={{ margin: "23px 20px 0px" }}>
//                                     <img src={filterUser} style={{ height: '20px', width: "20px", background: 'linear-gradient(45deg, white, transparent)', borderRadius: "10px", }} onClick={() => setOpenFilterModal(!openFilterModal)} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>

//                     {gotCancelled && (
//                         <div>   
//                         <Notification
//                             message={recentlyCancelledData}
//                             onClose={() => setGotCancelled(false)}
//                         />
//                         </div>
//                     )}
//                 </div>
//                 {totalAcceptedCases.length > 0 && (
//                     <div
//                         style={{
//                             display: "grid",
//                             gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",

//                         }}>
//                         {totalAcceptedCases.map((item, dataIndex) => (
//                             <div style={{
//                                 border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "20px", padding: "10px", marginTop: "30px",
//                                 backgroundImage: "url('https://media.istockphoto.com/id/1465157700/photo/brightly-red-colored-semi-truck-speeding-on-a-two-lane-highway-with-cars-in-background-under.jpg?s=612x612&w=0&k=20&c=cfbbPy2ylvFGRULNLGO_Ucm-C5DsOJMFHiZBdKGsq3c=')", // ✅ Corrected syntax
//                                 backgroundSize: "cover", // ✅ Ensures the image covers the container
//                                 backgroundPosition: "center", // ✅ Centers the image
//                                 backgroundRepeat: "no-repeat", // ✅ Prevents tiling  
//                             }}>
//                                 <div className="bg-white p-1" style={{ borderRadius: '10px', opacity: '0.9' }}>
//                                     <div className="flex justify-between">
//                                         <img
//                                             className="h-[105px] w-[105px] mt-[-50px] "
//                                             src="https://png.pngtree.com/png-clipart/20240308/original/pngtree-3d-free-cargo-delivery-truck-png-image_14540258.png"
//                                             alt="Truck"
//                                         />
//                                         <div style={{ marginTop: "10px", marginRight: "10px", width: "45px", background: '#0e4823', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'yellow', maxHeight: '30px' }}>{avg[dataIndex]} <img src={ratingStar} style={{ height: "10px", maxHeight: "10px", width: "10px", marginLeft: '3px' }} /></div>
//                                     </div>
//                                     <div style={{ display: "flex", alignItems: "center" }}>
//                                         {stages.map((stage, index) => (
//                                             <div
//                                                 key={index}
//                                                 style={{
//                                                     display: "flex",
//                                                     flexDirection: "column",
//                                                     alignItems: "center",
//                                                     textAlign: "center",
//                                                     position: "relative",
//                                                     flex: 1,
//                                                 }}
//                                             >
//                                                 {/* Icon/Image for each stage */}
//                                                 <div
//                                                     style={{
//                                                         width: "30px",
//                                                         height: "30px",
//                                                         borderRadius: "50%",
//                                                         backgroundColor: index === currentStage[dataIndex] ? index === 2 ? "rgb(11 219 255)" : "#4CAF50" : "#ccc",
//                                                         display: "flex",
//                                                         alignItems: "center",
//                                                         justifyContent: "center",
//                                                         border: index === currentStage[dataIndex] ? "2px solid #4CAF50" : "none",
//                                                         transition: "background-color 0.3s ease",
//                                                         zIndex: 1,
//                                                     }}
//                                                 >
//                                                     <img
//                                                         src={stage.img}
//                                                         alt={stage.label}
//                                                         style={{
//                                                             width: "20px",
//                                                             height: "20px",
//                                                             opacity: index <= currentStage[dataIndex] ? 1 : 0.5,
//                                                         }}
//                                                     />
//                                                 </div>

//                                                 {/* Stage Label */}
//                                                 <p
//                                                     style={{
//                                                         marginTop: "5px",
//                                                         color: index <= currentStage[dataIndex] ? "black" : "#aaa",
//                                                         fontWeight: index === currentStage[dataIndex] ? "bold" : "normal",
//                                                         fontSize: "12px",
//                                                     }}
//                                                 >
//                                                     {stage.label}
//                                                 </p>

//                                                 {/* Connecting Line */}
//                                                 {index < stages.length - 1 && (
//                                                     <div
//                                                         style={{
//                                                             position: "absolute",
//                                                             top: "15px", // Aligns with the center of the icon
//                                                             left: "50%",
//                                                             right: "-50%",
//                                                             width: "100%",
//                                                             height: "2px",
//                                                             backgroundColor: index < currentStage[dataIndex] ? "#4CAF50" : "#ccc",
//                                                             zIndex: 0,
//                                                         }}
//                                                     ></div>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <div style={{ marginTop: "20px" }}>
//                                         <hr className="text-black" />
//                                         {/* <hr className="color-black m-0" /> */}

//                                         <div className='px-2 py-1 ' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
//                                             <div style={{ display: "flex", alignItems: "center" }}>
//                                                 <LocalShippingOutlinedIcon className='h-[30px] w-[30px]' />
//                                                 <span className='text-md font-semibold' style={{ marginLeft: "5px" }}>{item.reg}</span>
//                                             </div>
//                                             <div
//                                                 className="right-10  flex items-center mt-1"
//                                                 style={{ margin: '0px 5px 0 5px' }}
//                                             >
//                                                 <ArticleIcon className="h-[30px] w-[30px] text-red-500" />
//                                                 <span className="text-xs font-medium ml-2">
//                                                     {item.details[0].connectedVendorFullyTime?.split("T")[0]}
//                                                 </span>
//                                             </div>

//                                         </div>

//                                         <div style={{ borderTop: '1px solid gray', borderRadius: "10px 0px 0px 10px", borderBottom: "1px solid", padding: '4px 5px 9px 5px', display: 'inline-block', background: "linear-gradient(42deg, #e7fae8, transparent)", margin: '10px' }}>
//                                             <div style={{ display: "flex", alignItems: "center", margin: '10px 5px 0px 15px' }}>
//                                                 <LibraryAddCheckIcon className='h-[30px] w-[30px] text-red-500' />
//                                                 <span className="text-sm font-semibold" style={{ marginLeft: "5px" }}> {item.details[0].vendorType} Accepted</span>
//                                             </div>

//                                             <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 15px' }}>
//                                                 <DateRangeOutlinedIcon className='h-[30px] w-[30px]  text-red-500' />
//                                                 <p className="text-sm ml-2 text-green-700">Date</p>
//                                                 <span className="text-sm" style={{ marginLeft: "5px" }}> {item.details[0].systemDate?.split("T")[0]}</span>

//                                                 <AccessTimeOutlinedIcon className='h-[30px] w-[30px] text-red-500 ml-5' />
//                                                 <span className="text-sm" style={{ marginLeft: "5px" }}>{item.details[0].systemDate?.split("T")[1]}</span>
//                                             </div>
//                                         </div>




//                                     </div>

//                                 </div>
//                                 <div style={{ minWidth: '400px' }}>
//                                     <div className="mt-2 mr-auto ml-auto flex justify-center">
//                                         <p
//                                             className="text-sm mt-1 font-semibold bg-red-600 text-white rounded-full   text-center   flex items-center justify-center relative cursor-pointer max-w-[200px] min-w-[150px] h-[30px]"
//                                             style={{ border: '1px solid', paddingLeft: "10px", fontSize: "13px" }}
//                                             onClick={() => handleChoosenCase(item)}
//                                         >
//                                             View Case
//                                             <img
//                                                 src={viewcase}
//                                                 className="absolute left-2 h-[20px] w-[20px]"
//                                                 alt="history icon"
//                                             />
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {openDetails && (
//                     <div style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         backgroundColor: "transparent", // semi-transparent background
//                         zIndex: 1001,
//                         display: "flex",
//                         // alignItems: "flex-end", // positions the container at the bottom
//                         justifyContent: "center",
//                         animation: "slideUp 0.5s ease-out",
//                     }}>
//                         <div style={{ right: 0 }}>

//                             <img
//                                 src={crossUser}
//                                 onClick={() => setOpenDetails(false)}
//                                 style={{
//                                     position: "static",
//                                     // top: "-10px",
//                                     left: "calc(100% - 80px)",
//                                     width: "25px",
//                                     height: "25px",
//                                     cursor: "pointer",
//                                     zIndex: 1001,
//                                     filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
//                                     bottom: "360px",
//                                     margin: '20px 0px 0px 50px'
//                                 }}
//                             />
//                         </div>

//                         <div className="image-container" style={{ position: "static", boxShadow: "none", borderRadius: "10px 10px 0px 0px" }}>
//                             <VendorMoving item={choosenCase[0]} />
//                         </div>
//                     </div>
//                 )}
//                 {totalAcceptedCases.length === 0 && (
//                     <NoDataFound />
//                 )}

//                 <Modal isOpen={openFilterModal} onClose={() => setOpenFilterModal(!openFilterModal)}>
//                     {openFilterModal && (
//                         <div style={{ textAlign: "center", marginTop: "30px", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
//                             <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('newest') }}>newest to oldest</p>
//                             <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('oldest') }}>oldest to newest</p>
//                             <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('daily') }}>Yesterday</p>
//                             <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('weekly') }}>Last 7 days</p>
//                             <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('monthly') }}>Last 30 days</p>
//                             <p style={{ color: "#000000", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "rgb(0 243 122 / 65%)", minWidth: "200px", borderRadius: "20px", padding: "7px" }} onClick={() => { settingFilter('year') }}>Year</p>
//                         </div>
//                     )}
//                 </Modal>
//             </div>
//             <div
//             >

//                 {/* <div>
//                     <BottomNavigationVendor />
//                 </div> */}

//             </div>
//         </div>
//     )
// }

// export default CraneAcceptedOrders;