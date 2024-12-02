

import React, { useState } from 'react';
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




const CraneFirstPage = () => {
    const { state } = useLocation();
    console.log("Statehere", state?.indexFor)
    console.log("Statehere", state?.vehicleNo)

    const [selectedIndex, setSelectedIndex] = useState(state?.indexFor || 0);
    const [vehicleNo, setVehicleNo] = useState(state?.vehicleNo || 0);
    const [center, setCenter] = useState(state?.center || 0);
    const [openServiceModal, setOpenServiceModal] = useState(false)


    console.log("selectedIndex", selectedIndex)

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };





    // status tracking



    // Array of stages
    // const stages = ["assigned", "accepted & moved","reached"];


    return (
        <div>
            <div className="start-container" style={{ background: "#166937", height: "40px", zIndex: "10", margin: "0px 0px 0px 0px", position: "sticky", top: "0.1px" }}>
                <div className="imageContainer" style={{ marginTop: "10px", height: "0px" }}>
                    {["Status tracking", "Quotation & Updates", 'History & Receipts', "Summary & Reviews",].map((text, index) => (
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

            <div style={{ position: "sticky", top: '50px', zIndex: "1000", margin: "20px 20px 0px 20px" }}>
                <img src={changeServicesUser} style={{ height: '20px', width: "20px" }} onClick={() => setOpenServiceModal(!openServiceModal)} />
            </div>

                    <div style={{fontWeight:"bold", fontSize:"20px", textAlign:"center"}}>  Crane Services</div>

            {/* </div> */}


            <Modal isOpen={openServiceModal} onClose={() => setOpenServiceModal(!openServiceModal)}>
                {openServiceModal && (
                    <div style={{ textAlign: "center", marginTop: "30px", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }}>Advocate</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }}>Crane</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }}>Mechanic</p>
                        <p style={{ color: "green", fontWeight: "bold", marginBottom: "20px", fontSize: "15px", border: "1px solid red", background: "#ffffffa6", minWidth: "200px", borderRadius: "20px", padding: "10px" }}>Workshop</p>
                    </div>
                )}
            </Modal>


            {selectedIndex == 0 && (
                <StatusTracking />
            )}

            {selectedIndex == 1 && (
                <QuotationUpdate number={vehicleNo} />
            )}
            {/* {selectedIndex == 2 && (
                <Registration vehicleNo={vehicleNo} centerHere={center} />
            )} */}
            {selectedIndex == 2 && (
                <HistoryReceipts />
            )}

            <div >
                <BottomNavigationBar />
            </div>
        </div>
    )
}

export default CraneFirstPage;