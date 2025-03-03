


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import trucksImage2 from '../../../Assets/trucksImage3.jpg';
import trucksImage4 from '../../../Assets/trucksImage6.png';
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import allAccidentVehicleImg from '../../../Assets/allAccidentVehicle.jpg'
import fleetvehicles from '../../../Assets/fleetvehicles.jpg'
import allvehiclestruck from '../../../Assets/allvehiclestruck.png'


import repairingOnStand from '../../../Assets/repairingonstand.jpg'
import advocateprotest from '../../../Assets/advocateprotest.png'
import mechanicuser from '../../../Assets/mechanicuser.png'
import garageuser from '../../../Assets/garageuser.png'
import cranetruckuser from '../../../Assets/cranetruckuser.png'
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import crossUser from '../../../Assets/crossUser.png'
import emergencycall from '../../../Assets/emergencycall.png'
import nearbyRestaurant from '../../../Assets/nearbyRestaurant.png'
import nearbyhospital from '../../../Assets/nearbyhospital.png'
import nearbyPetrolPump from '../../../Assets/nearbyPetrolPump.png'
import nearbyParking from '../../../Assets/nearbyParking.png'
import checksuccess from '../../../Assets/checksuccess.png'
import processImgUser from '../../../Assets/processImgUser.png'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import truckrepairingUser from '../../../Assets/truckrepairingUser.png'
import repairUser from '../../../Assets/repairUser.png'
import BottomNavigationBar from '../BottomNavigationBar.jsx';
import NoDataFound from '../Cards/NoDataFound.jsx';
import Registration from '../../Registration/Registration.jsx';
import Modal from '../../Location1/Modal.jsx';
import Loading from '../Cards/Loading.jsx';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AddNewData from '../Cards/AddNewData.jsx';
import LookingForAccptance from '../../Registration/LookingForAcceptance.jsx';




export default function AllVehicles() {
    const [data, setData] = useState([]);
    const [accidentData, setAccidentData] = useState([]);
    const [filtering, setFiltering] = useState([]);

    const [notAccidentVehicleData, setNotAccidentVehicleData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);


    const [currentItem, setCurrentItem] = useState([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [caseDetailsHere, setCaseDetailsHere] = useState(false);
    const [viewAllVendors, setViewAllVendors] = useState(false);

    const [doneFetching, setDoneFetching] = useState(false)
    const [doneFetching2, setDoneFetching2] = useState(false)
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [filter, setFilter] = useState('')
    const currentService = 'crane'



    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()

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


        for (let i = 0; i < accidentData.length; i++) {
            let getTime = accidentData[i]?.systemDate.split('|');
            let assignedDate = getTime[0];
            let assignedTime = getTime[1];
            let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

            if (filter === 'daily') {
                console.log("here i am daily")
                if (assignedDate === todayDate || assignedDate === yesterdayDate) {
                    const timeDifference = now - assignedDateTime;
                    if (timeDifference <= oneDay) {
                        console.log("Match found within last 24 hours:", data[i]);
                        filteredData.push(accidentData[i]);
                    }
                }
            }
            else if (filter === 'weekly') {
                console.log("here i am weekly")
                if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
                    console.log("Match found within last 7 days:", data[i]);
                    filteredData.push(accidentData[i]);
                }
            }
            else if (filter === 'monthly') {
                if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
                    console.log("Match found within last 30 days:", data[i]);
                    filteredData.push(accidentData[i]);
                }
            }
            else if (filter === 'year') {
                const yearBefore = new Date(now.getTime() - (oneDay * 365)); // Calculate date one year ago
                if (assignedDateTime >= yearBefore && assignedDateTime <= now) {
                    console.log("Match found within last year:", accidentData[i]);
                    filteredData.push(accidentData[i]);
                }
            }
        }
        if (filter === 'newest') {
            console.log("Sorting by newest to oldest");
            accidentData.sort((a, b) => {
                const dateA = new Date(a?.systemDate.split('|').join(' '));
                const dateB = new Date(b?.systemDate.split('|').join(' '));
                return dateB - dateA; // Descending order
            });
            setData([...accidentData]);
        } else if (filter === 'oldest') {
            console.log("Sorting by oldest to newest");
            accidentData.sort((a, b) => {
                const dateA = new Date(a?.systemDate.split('|').join(' '));
                const dateB = new Date(b?.systemDate.split('|').join(' '));
                return dateA - dateB; // Ascending order
            });
            setData([...accidentData]);
        }
        else {
            setData(filteredData)
        }
    };

    useEffect(() => {
        getData();
        getAccidentData()
        getSomeInfo();

        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const goToNewCase = () => {

        navigate("/register-new-accidentvehicle", { state: { fromPageHere: "allVehicles", vehicleNo: currentItem.vehicleNo } })
    }

    const getSomeInfo = async () => {
        const response = await axios.get(`${backendUrl}/api/testing-websocket`);
        console.log("responsefrom", response.data)
    }

    const getData = async (e) => {
        console.log("userid", userId);
        let accidentVehicles = [], notAccidentVehicles = []
        const response = await axios.get(`${backendUrl}/api/getFilteredPersonalVehicle/${userId}`);
        if (response.data.message == "No accident vehicle data found.") {
            setData([])
            setDoneFetching(true)
        }
        else {
            console.log("response123421", response.data.data);
            response.data.data.map((item) => {
                if (item.alreadyAccidentVehicle == true) accidentVehicles.push(item)
                if (item.alreadyAccidentVehicle == false) notAccidentVehicles.push(item)

            })
            console.log("seTDATIOATN", response.data.data);
            setFiltering(accidentVehicles)
            setData(accidentVehicles)
            setNotAccidentVehicleData(notAccidentVehicles)
            setAccidentVehicleData(accidentVehicles)
            setDoneFetching(true)
        }
    };

    const getAccidentData = async (e) => {
        try {
        console.log("userid", userId);
        const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}/not_defined/not-completed`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
        console.log('responsead', response)
        if (response.data.message == "No accident vehicle data found.") {
            setAccidentData([])
            setDoneFetching2(true)
        }
        else {
            console.log('response.data.data', response.data.data)
            response.data.data.map((item)=>{
                console.log("item.customer.confirmDoneWorking", item.customer.confirmDoneWorking)
                if(!item.customer.confirmDoneWorking){
                    setAccidentData((prev)=>[...prev, item])
                }
            })
            // setAccidentData(response.data.data)
            setDoneFetching2(true)
            console.log("ACcidenData", accidentData)
        }
    }
    catch(error){
        if (error.response && error.response.status === 404 && error.response.data.message == "No accident vehicle data found.") {
            console.log('cathc')
            setAccidentData([]);
            setDoneFetching2(true);
        } else {
            console.error("Unexpected error:", error);
        }
    }
}

    // const getAccidentData = async (e) => {
    //     console.log("userid", userId);
    //     const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`,{        headers: {
        //   'Authorization': `Bearer ${token}`
        // }});
    //     if (response.data.message == "No accident vehicle data found.") {
    //         setAccidentData([])
    //         setDoneFetching2(true)
    //     }
    //     else {
    //         let fileredAccidentData = []
    //         response.data.data.forEach((item)=>{
    //             let count = 0;
    //             const selectedOptionIndividually  = item.selectedOptions.split(',');
    //             selectedOptionIndividually.forEach((option)=>{
    //                 if (
    //                     (option === 'crane' && (item?.craneStatus === 'completed' || item?.craneStatus === 'cancelled')) ||
    //                     (option === 'advocate' && (item?.advocateStatus === 'completed' || item?.advocateStatus === 'cancelled')) ||
    //                     (option === 'mechanic' && (item?.mechanicStatus === 'completed' || item?.mechanicStatus === 'cancelled')) ||
    //                     (option === 'workshop' && (item?.workshopStatus === 'completed' || item?.workshopStatus === 'cancelled'))
    //                 ) {
    //                     count += 1;
    //                 }
    //             })
    //             if(count !== selectedOptionIndividually.length) fileredAccidentData.push(item);
    //         })
    //     setAccidentData(fileredAccidentData)
    //         setDoneFetching2(true)
    //     }
    // };
    const setDetails = (item) => {
        setViewDetails(true)
        setCurrentItem(item)
    }

    const setUpdateAccidentData = (item) => {
        setCaseDetailsHere(true)
        const gotItem = accidentData.find((accidentItem) => {
        console.log('item',item)
        console.log('accidentItem',accidentItem)
            return (accidentItem?.vehicle?.AccidentVehicleCode == item.AccidentVehicleCode)
        })
        console.log("GOTITEM", gotItem)

        let gotInfo = {
            ...gotItem?.vehicle,
            accidentImage1: gotItem?.vehicle?.accidentImage1,
            accidentImage2: gotItem?.vehicle?.accidentImage2,
            accidentImage3: gotItem?.vehicle?.accidentImage3,
            accidentImage4: gotItem?.vehicle?.accidentImage4,
          };
          console.log('gotinfo', gotInfo)
        setCurrentItem(gotInfo)
    }

    const setViewVendors = (item) => {
        setViewAllVendors(true)
        const gotItem = accidentData.find((accidentItem) => {
            return (accidentItem?.vehicle.AccidentVehicleCode == item.AccidentVehicleCode)
        })
        console.log("hey", gotItem.customer)
        console.log("gotitemd12312312", gotItem)

        setCurrentItem(gotItem.customer)
    }

    const handleUpdate = () => {
        setCaseDetailsHere(false)
    };

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const newRows = filtering.filter((row) => {
            const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
            const searchLower = value; // Use the updated search value directly

            const idValue = formattedId.includes(searchLower);
            const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(searchLower);
            const chassisNoValue = (row.chassisNo ?? '').toLowerCase().includes(searchLower);

            return vehicleNoValue || chassisNoValue;
        });

        setData(newRows);
    };
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (index) => {
        setSelectedIndex(index);
        index == 0 ? setFiltering(accidentVehicleData) : setFiltering(notAccidentVehicleData)
        index == 0 ? setData(accidentVehicleData) : setData(notAccidentVehicleData)
    };

    const getOnPage = (service) => {
        console.log("SOME", service, currentItem.customerAcceptedVendor )
        if (currentItem?.customerAcceptedVendor == true && currentItem.confirmDoneWorking == false) navigate("/Crane-dashboard", { state: { indexFor: 0, service: service, vehicleNumber: currentItem.reg } })
        else if (currentItem?.customerAcceptedVendor == false) navigate("/Crane-dashboard", { state: { indexFor: 1, service: service, vehicleNumber: currentItem.reg } })
        else if (currentItem?.customerAcceptedVendor == true && currentItem.confirmDoneWorking == true) navigate("/Crane-dashboard", { state: { indexFor: 2, service: service, vehicleNumber: currentItem.reg } })
    }

    const settingFilter = (filter) => {
        console.log("filter", filter)
        setFilter(filter)
        getFilteredData(filter)
        setOpenFilterModal(false)
    }
    const navigateToNewVehicle = () => {
        navigate("/add-new-vehicle-driver")
    }

    const navigateToPage=()=>{
        selectedIndex==1?navigate("/add-new-vehicle-driver"):navigate('/register-new-accidentvehicle')
    }
    const [updatedData,setUpdatedData]=useState(false);
    console.log('updatedata123', updatedData)
        useEffect(() => {
            if (updatedData) {
                console.log('setUpdatedDat123a', updatedData)
                getData();
                getAccidentData();
                setCaseDetailsHere(false)
                setUpdatedData(false)
            }
        }, [updatedData])

    return (
        <div style={{ marginBottom: "60px", 
        background: 'linear-gradient(rgb(223 255 222 / 0%), rgb(255, 255, 255), rgb(242, 242, 242))'

        }}>
            {doneFetching2 && doneFetching && (
                <div style={{ marginBottom: "40px" }}>
                    <div style={{ position: "sticky", top: "9px", zIndex: "1000" }}>
                        <div className="imageContainer" style={{ height: "0px" }}>
                            {["Current Accident Vehicles", "Fleet List"].map((text, index) => (
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

                    <div style={{
                        marginBottom: "100px",
                    }}>
                        <div className="container" style={{
                            // paddingTop:"30px",
                            maxWidth: "500px",
                            height: "30px",
                            marginBottom: "-30px",
                            paddingTop: "30px"
                            // filter: isImageContainerVisible ? "blur(4px)" : "none", // Apply blur effect
                            // opacity: isImageContainerVisible ? 0.5 : 1, // Reduce opacity if blurred
                            // pointerEvents: isImageContainerVisible ? "none" : "auto", // Disable clicking
                        }}>
                            <div className="d-flex justify-content-center h-100">
                                
                                    <div  onClick={navigateToNewVehicle} className='flex px-4 mr-3 text-sm' style={{ position: 'fixed',background: 'slategrey',borderRadius:"20px", bottom:10, right:0 , marginBottom:"50px" , gap:'10px', zIndex:'1000' }}>
                                        <p style={{ width: '100%', textAlign:'center',color:"white", height: 'auto', marginTop:"10px" }}>
                                            New Vehicles
                                        </p>
                                        <div className='mt-2 mb-2'>
                                            <AddBoxIcon
                                                style={{
                                                    height: '20px',
                                                    width: '20px',
                                                    color: '#ffffff',
                                                    cursor: 'pointer',
                                                }}
                                               
                                            />
                                        </div>
                                    </div>

                                

                            </div>
                        </div>
                        {selectedIndex == 0 && (
                            <div style={{ position: "relative", textAlign: "center" , marginTop:'45px'}}>
                                <img
                                    src={allAccidentVehicleImg}
                                    alt="All Accident Vehicles"
                                    style={{
                                        maxHeight: "200px",
                                        width: "100%",
                                        objectFit: "cover",
                                        // borderRadius: "10px"
                                    }}
                                />
                                <p
                                    style={{
                                        position: "absolute",
                                        bottom: "20px",
                                        left: "30px",
                                        fontWeight: "bold",
                                        color: "white",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontStyle: "italic",
                                        // marginBottom:"50px"
                                    }}
                                >
                                    All Accident Vehicles
                                </p>
                            </div>

                        )}
                        {selectedIndex == 1 && (
                            <div style={{ position: "relative", textAlign: "center" , marginTop:'45px'}}>
                                <img
                                    src={fleetvehicles}
                                    alt="All Accident Vehicles"
                                    style={{
                                        maxHeight: "200px",
                                        width: "100%",
                                        objectFit: "cover",
                                        // borderRadius: "10px"
                                    }}
                                />
                                <p
                                    style={{
                                        position: "absolute",
                                        bottom: "20px",
                                        left: "30px",
                                        fontWeight: "bold",
                                        color: "white",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontStyle: "italic"
                                    }}
                                >
                                    All Registered Vehicles
                                </p>
                            </div>
                        )}



                        <div style={{ marginBottom: "30px" }}>
                        <div className="d-flex justify-content-center h-100">
                                <div className="searchbar" style={{ border: '1px solid #ff9090', minWidth: "100px",maxWidth: "300px", zIndex: "100",top:'35px', position:'sticky' }}>
                                    <input className="search_input" type="text" placeholder="Search..." style={{ margin: "3px", paddingTop: "5px", color:'red' }} onChange={handleSearch} />
                                    <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />
                                </div>
                                {selectedIndex == 0 && (
                                    <div style={{ margin: "23px 20px 0px",  zIndex: "1", color: "black"  }}>
                                        <FilterAltIcon style={{ height: '20px', width: "20px", }} onClick={() => setOpenFilterModal(!openFilterModal)} />
                                    </div>
                                )}
                        </div>
                            {data.length > 0 && (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                                       
                                    }}
                                >
                                    {data.map((item, index) => (
                                        <div key={index}>
                                            <div style={{
                                                // background:'linear-gradient(78deg, rgb(28 91 63 / 78%), transparent)', 
                                                backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/3633995/thumb/1.jpg?ip=x480')", // ✅ Corrected syntax
                                                backgroundSize: "cover", // ✅ Ensures the image covers the container
                                                backgroundPosition: "center", // ✅ Centers the image
                                                backgroundRepeat: "no-repeat", // ✅ Prevents tiling  
                                                border:'1px solid red', borderTop:'none', borderRight:'none'}} className=' w-[90%]  border-[#4b6c6d] shadow-[rgba(75,_108,_109,_0.2)]  rounded-xl m-2'>
                                                <div className="relative ml-2 mr-2 mt-5 p-2 flex justify-between rounded-xl">
                                                    <img
                                                        className="h-[120px] w-[120px] mt-[-50px] "
                                                        src={allvehiclestruck}
                                                        alt="Truck"
                                                    />

                                                    <div className="p-2 mt-1 flex flex-col text-white  md:static md:items-end  ">
                                                        <div className="flex">
                                                            <LocalShippingOutlinedIcon className="text-black h-[30px] w-[22px] m-2 mt-2" />
                                                            <h1 className="font-semibold  text-black pb-1 text-xl mt-2 md:text-xl">{item.vehicleNo}</h1>
                                                        </div>
                                                        <p className="opacity-50 pl-5 pb-1 text-black  text-xs  md:text-sm">{item.chassisNo}</p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-2 pb-3 mt-[-10px]  rounded-xl ml-auto mr-auto relative">
                                                    {selectedIndex == 1 && (
                                                        <div>
                                                            <p
                                                                className="text-[11px] mt-[5px] bg-[#6d6d6d] p-2 border border-blue-500 text-center rounded-full font-bold text-white flex items-center justify-center relative cursor-pointer mx-[5px] min-w-[135px]"
                                                                onClick={() => setDetails(item)}
                                                            >
                                                                <KeyboardDoubleArrowRightIcon className="absolute right-[50px] left-[10px]" />
                                                                View More
                                                            </p>
                                                        </div>
                                                    )}
                                                    {selectedIndex == 0 && (
                                                        <div>
                                                            <p
                                                                className="text-[11px] mt-[5px] bg-white p-2 border border-blue-500 rounded-xl text-center font-bold text-black flex items-center justify-center relative cursor-pointer mx-[5px] max-w-[400px] min-w-[135px] mb-2"
                                                                onClick={() => setUpdateAccidentData(item)}
                                                            >
                                                                <KeyboardDoubleArrowRightIcon className="absolute left-[5px]" />
                                                                Accident Detail
                                                            </p>
                                                            <p
                                                                className="text-[11px] mt-[5px] py-2 px-3 bg-red-400 border-black border border-blue-500 rounded-xl text-center font-bold text-white flex items-center justify-center relative cursor-pointer mx-[5px] max-w-[400px] min-w-[128px]"
                                                                onClick={() => setViewVendors(item)}
                                                            >
                                                                <KeyboardDoubleArrowRightIcon className="absolute left-[5px]" />
                                                                View Vendors
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.length == 0 && (
                                // <NoDataFound />
                                <div onClick={navigateToPage}>
                                <AddNewData index={selectedIndex}/>
                                </div>
                            )}
                        </div>
                        {viewDetails && (
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
                                <div
                                    style={{
                                        position: "relative",
                                        width: "97%",
                                        maxWidth: "600px",
                                        backgroundColor: "#fff", // white background for the content
                                        borderRadius: "15px 15px 0px 0px",
                                        maxHeight: "80%", // limit the height for scrollability
                                        overflowY: "auto", // enables vertical scrolling
                                        padding: "20px 5px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                    }}
                                >
                                    <img
                                        src={crossUser}
                                        onClick={() => setViewDetails(false)}
                                        style={{
                                            position: "fixed",
                                            left: "calc(100% - 55px)",
                                            width: "35px",
                                            height: "35px",
                                            cursor: "pointer",
                                            zIndex: 1001,
                                            filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                        }}
                                    />
                                    <div style={{
                                        backgroundColor: "rgb(255 255 255)",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        margin: "30px 5px 30px 5px",
                                        boxShadow: "rgba(0, 0, 0, 0.1) -20px -18px 10px 0px",
                                        borderRadius: "10px",
                                        marginBottom: "50px"
                                    }}>

                                        {[
                                            { label: "Vehicle No", value: currentItem.vehicleNo, icon: "fa-car", color: "green" },
                                            { label: "Chassis No", value: currentItem.chassisNo, icon: "fa-id-card", color: "green" },
                                            { label: "Engine No", value: currentItem.engineNo, icon: "fa-cogs", color: "green" },
                                            { label: "Make Of Vehicle", value: currentItem.make, icon: "fa-industry", color: "green" },
                                            { label: "Model Of Vehicle", value: currentItem.model, icon: "fa-tasks", color: "green" },
                                            { label: "Year Of Vehicle", value: currentItem.year, icon: "fa-calendar-alt", color: "green" },
                                            { label: "Type Of Vehicle", value: currentItem.type, icon: "fa-truck", color: "green" },
                                            { label: "Application Of Vehicle", value: currentItem.application, icon: "fa-wrench", color: "green" },
                                            { label: "Insurance Of Vehicle", value: currentItem.InsuranceName, icon: "fa-shield-alt", color: "green" },
                                        ].map((item, index) => (
                                            <div>
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        margin: "10px 0",
                                                        padding: "10px 10px 0px 15px",
                                                        // backgroundColor: "#f9f9f9",
                                                        borderRadius: "8px",
                                                        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                    }}
                                                >
                                                    <i
                                                        className={`fas ${item.icon}`}
                                                        style={{
                                                            fontSize: "20px",
                                                            color: item.color,
                                                            marginRight: "10px",
                                                        }}
                                                    ></i>
                                                    <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>{item.label}:</p>
                                                    <span style={{ color: item.color, marginLeft: "8px", fontSize: "14px" }}>{item.value}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div style={{ marginBottom: "50px", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                        <p style={{
                                            fontSize: '13px',
                                            marginTop: "10px",
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
                                            minWidth: "70%",
                                            cursor: "pointer"
                                        }} onClick={goToNewCase} >
                                            Register as Accident
                                           
                                        </p>
                                    </div> */}
                                </div>


                            </div>
                        )}

                        {caseDetailsHere && (
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
                                <div
                                    style={{
                                        position: "relative",
                                        width: "97%",
                                        maxWidth: "600px",
                                        backgroundColor: "#fff", // white background for the content
                                        borderRadius: "15px 15px 0px 0px",
                                        // marginBottom: "30px",
                                        maxHeight: "90%", // limit the height for scrollability
                                        overflowY: "auto", // enables vertical scrolling
                                        padding: "20px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                    }}
                                >
                                    <img
                                        src={crossUser}
                                        onClick={() => {
                                            setCaseDetailsHere(false)
                                        }}
                                        style={{
                                            position: "fixed",
                                            left: "calc(100% - 55px)",
                                            width: "35px",
                                            height: "35px",
                                            cursor: "pointer",
                                            zIndex: 1001,
                                            filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                        }}
                                    />

                                     <LookingForAccptance accidentData={currentItem} setUpdatedData={setUpdatedData} fromPage="AllVehicles" />
                                </div>
                            </div>
                        )}
                        {viewAllVendors && (
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
                                <div
                                    style={{
                                        position: "relative",
                                        width: "97%",
                                        maxWidth: "600px",
                                        backgroundColor: "#fff", // white background for the content
                                        borderRadius: "15px 15px 0px 0px",
                                        // marginBottom: "30px",
                                        maxHeight: "90%", // limit the height for scrollability
                                        overflowY: "auto", // enables vertical scrolling
                                        padding: "20px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                    }}
                                >
                                    <img
                                        src={crossUser}
                                        onClick={() => {
                                            setViewAllVendors(false)
                                        }}
                                        style={{
                                            position: "fixed",
                                            left: "calc(100% - 55px)",
                                            width: "35px",
                                            height: "35px",
                                            cursor: "pointer",
                                            zIndex: 1001,
                                            filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                        }}
                                    />
                                    <div style={{ textAlign: "center", margin: "30px 0", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                        {currentItem.selectedOptions.split(",").map((item) => {
                                            return (
                                                <div>
                                               {currentItem[`${item}Status`]!= 'cancelled' && ( <div key={item} onClick={() => { getOnPage(item) }} style={{ display: 'flex', justifyContent: 'space-between', color: "darkgreen", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }}>
                                                    <p style={{ marginTop: "3px" }}> {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</p>
                                                    {currentItem?.[`${item}Details`]?.confirmDoneWorking == true ? (<img src={checksuccess} style={{ height: "20px", width: "20px" }} />) : (<img src={processImgUser} style={{ height: "20px", width: "20px" }} />)}
                                                </div>)}
                                                </div>
                                            )
                                        })}

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
                    </div>
                </div>
            )}

            {doneFetching2 == false && doneFetching && (
                // <Loading />
                <div>
                    {/* Header Section */}
                    <div className="relative text-center animate-pulse">
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <p className="absolute bottom-5 left-8 bg-gray-700 text-white w-1/2 h-6 rounded"></p>
                    </div>

                    {/* Repeated Sections */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                           
                        }}
                    >
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-gray-400 rounded-xl m-2">
                                <div className="relative flex justify-between bg-gray-400 rounded-xl ml-2 mr-2 mt-5 p-2">
                                    <div className="h-32 w-32 mt-[-40px] bg-gray-200 rounded animate-pulse"></div>

                                    <div className="p-2 mt-1 flex flex-col text-white md:static md:items-end space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="px-3 py-4 mt-[-10px] bg-gray-300 rounded-xl w-[90%] mx-auto space-y-3">
                                    <div className="flex justify-center">
                                        <div className="w-full max-w-md h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                    </div>

                                    <div className="flex justify-center space-x-4">
                                        <div className="w-[140px] h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="w-[140px] h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            )}
            <div>
                <BottomNavigationBar />
            </div>
        </div>
    )
}