

import React, { useEffect, useState } from 'react';
import '../FirstPage.css'
import searchinterfacesymbol from '../../../Assets/search-interface-symbol.png'
import changeServicesUser from '../../../Assets/changeServicesUser.png'
import filterUser from '../../../Assets/filterUser.png'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

import assignedTask from '../../../Assets/assignedTask.png'
import comingCrane from '../../../Assets/comingCrane.png'
import checksuccess from '../../../Assets/checksuccess.png'
import Registration from '../../Registration/Registration';
import QuotationUpdate from './QuotationUpdate';
import StatusTracking from './StatusTracking';
import HistoryReceipts from './HistoryReceipts';
import BottomNavigationBar from '../BottomNavigationBar.jsx';
import Modal from '../../Location1/Modal.jsx';
import AllCancelledOrders from './AllCancelledOrders.jsx';
import craneworkdoing from "../../../Assets/crane-work-doing.jpeg"
import advocatecurrentservice from "../../../Assets/advocatecurrentservice.jpg"
import mechaniccurrentservice from "../../../Assets/mechaniccurrentservice.jpg"
import workshopcurrentservice from "../../../Assets/workshopcurrentservice.jpg"
import recoveryvancurrentservice from "../../../Assets/recovery.jpg"







const CraneFirstPage = () => {
    const { state } = useLocation();
    console.log("Statehere", state?.indexFor)
    console.log("Statehere", state?.vehicleNumber)

    const [selectedIndex, setSelectedIndex] = useState(state?.indexFor || 0);
    const [vehicleNumber, setVehicleNumber] = useState(state?.vehicleNumber || 0);
    const [vehicleNo, setVehicleNo] = useState(state?.vehicleNo || 0);
    const [goToNextPage, setGoToNextPage] = useState(false)
    console.log("goToNextPage", goToNextPage)
    const [center, setCenter] = useState(state?.center || 0);
    const [openServiceModal, setOpenServiceModal] = useState(false)


    console.log("selectedIndex", selectedIndex)

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        if (selectedIndex !== state?.indexFor) {
            setVehicleNumber("");
        }
    }, [selectedIndex, state?.indexFor]);

    const [choosenService, setChoosenService] = useState(() => localStorage.getItem("currentService") || 'crane')

    useEffect(() => {
        if (state?.service) {
            console.log('stat?.service', state?.service)
            localStorage.setItem('currentService', state?.service)
            if (localStorage.getItem("currentService") == state?.service) {
                setGoToNextPage(true)
                setChoosenService(state?.service)
            }
        }
        else {
            if (localStorage.getItem("currentService") === null) localStorage.setItem('currentService', 'crane')
        }
    }, [])
    const chooseCurrentService = (service) => {
        setChoosenService(service);
        localStorage.setItem("currentService", service)
        setOpenServiceModal(!openServiceModal)
    }




    // status tracking



    // Array of stages
    // const stages = ["assigned", "accepted & moved","reached"];


    return (
        <div>
            <div className="start-container" style={{ height: "40px", zIndex: "10", margin: "0px 0px 0px 0px", position: "sticky", top: "0.1px"}}>
                <div className="imageContainer" style={{ marginTop: "10px", height: "0px" }}>
                    {["Status tracking", "Quotation & Updates", 'History & Receipts', 'Cancelled Orders', "Summary & Reviews"].map((text, index) => (
                        <div
                            key={index}
                            style={{ cursor: 'pointer' }}
                            className={`imageWrapper ${selectedIndex === index ? "selected" : ""}`}
                            onClick={() => handleSelect(index)}
                        >
                            {/* Add image element here if needed */}
                            <div className="top-scrolling">
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

            {/* <div style={{ display: 'flex', justifyContent: "space-between" }}> */}

            <div style={{
                position: "sticky", top: '50px', zIndex: "1000", margin: "-180px 20px 0px",width:"70px", background: 'linear-gradient(45deg, white, transparent)', borderRadius: "10px",
                paddingTop: "3px",
                paddingLeft: "3px",
                paddingRight: "3px",
            }}>
                <img src={changeServicesUser} style={{ height: '20px', width: "20px" }} onClick={() => setOpenServiceModal(!openServiceModal)} />
            </div>


            <div style={{ position: "relative", textAlign: "center" }}>
                <img
                    src={choosenService == "crane" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTky595ta6n5tvatvhI46BydDACDxrCoe5NDA&s' : choosenService == 'advocate' ? advocatecurrentservice : choosenService === 'mechanic' ? mechaniccurrentservice : choosenService === 'worshop' ? workshopcurrentservice:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiq6dCqQlhX-oYYHc95MTu_us5GLx21hdgO_T2RSp8rmANd678e3VtFJOP_Pj95hkv8Yo&usqp=CAU'}
                    alt="All Accident Vehicles"
                    style={{
                        maxHeight: "200px",
                        width: "100%",
                        objectFit: "cover",
                        // borderRadius: "10px",
                        marginTop:'160px'
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
                        marginBottom: "70px"
                    }}
                >
                    {choosenService.charAt(0).toUpperCase() + choosenService.slice(1)} Services
                </p>
            </div>

            {/* </div> */}


            <Modal isOpen={openServiceModal} onClose={() => setOpenServiceModal(!openServiceModal)}>
                {openServiceModal && (
                    <div style={{ textAlign: "center", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }} onClick={() => chooseCurrentService('advocate')}>Advocate</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }} onClick={() => chooseCurrentService('crane')}>Crane</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }} onClick={() => chooseCurrentService('mechanic')}>Mechanic</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }} onClick={() => chooseCurrentService('workshop')}>Workshop</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }} onClick={() => chooseCurrentService('recoveryVan')}>Recovery</p>

                    </div>
                )}
            </Modal>


            {selectedIndex == 0 && (
                state?.service ? (
                    goToNextPage && <StatusTracking vehicleNumber={vehicleNumber} />) :
                    <StatusTracking vehicleNumber={vehicleNumber} />
            )}

            {selectedIndex == 1 && (
                state?.service ? (
                    goToNextPage && <QuotationUpdate vehicleNumber={vehicleNumber} />) :
                    <QuotationUpdate vehicleNumber={vehicleNumber} />
            )}

            {selectedIndex == 2 && (
                state?.service ? (
                    goToNextPage && <HistoryReceipts vehicleNumber={vehicleNumber} />)
                    : <HistoryReceipts vehicleNumber={vehicleNumber} />
            )}


            {selectedIndex == 3 && (
                state?.service ? (
                    goToNextPage && <AllCancelledOrders vehicleNumber={vehicleNumber} />)
                    : <AllCancelledOrders vehicleNumber={vehicleNumber} />
            )}


            <div >
                <BottomNavigationBar />
            </div>
        </div>
    )
}

export default CraneFirstPage;