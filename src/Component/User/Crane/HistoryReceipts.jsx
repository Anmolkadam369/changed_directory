
import React, { useState } from 'react';
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





const HistoryReceipts = () => {

    const navigate = useNavigate()
    const { state } = useLocation();
    const [currentStage, setCurrentStage] = useState(2); // Example stage
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [viewReceipts, setViewReceipts] = useState(false);

    console.log('isImageContainer', isHistoryPage)


    const stages = [
        { label: "assigned", img: assignedTask, date: "10/09/2024 | 9:00 AM" },
        { label: "accepted & moved", img: comingCrane, date: "10/09/2024 | 9:00 AM" },
        { label: "reached", img: checksuccess, date: "10/09/2024 | 10:15 PM" }
    ];

    const goToMap = () => {
        navigate('/SelectLocationOnMap', { state: { center: [28.7041, 77.1025] } })
    }

    return (
        <div>

            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar" style={{ border: '1px solid', minWidth: "300px" }}>
                        <input className="search_input" type="text" placeholder="Search..." />
                        {/* <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                        </a> */}
                        <img src={searchinterfacesymbol} className="search_icon" style={{ height: '15px', width: '15px' }} alt='search' />

                    </div>
                </div>
            </div>
            <div style={{ border: "1px solid teal", minWidth: "280px", margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 4px 12px 8px', borderRadius: "5px", padding: "10px" }}>


                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ display: "flex", alignItems: "center", margin: '20px 5px 0px 10px' }}>
                        <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>Vehicle No:</p>
                        <span style={{ color: "blue", marginLeft: "5px", fontSize: "12px" }}>MH 14 FE 6020</span>
                    </div>


                    <div style={{ marginTop: "5px", marginRight: "10px", width: "35px", background: '#ccb300', border: "1px solid red", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: 'center', color: 'black' }}>4.5</div>
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
                        cursor: "pointer",
                        margin: '5px 5px 5px 5px',
                        maxWidth: "400px",
                        minWidth: "120px",
                    }} onClick={(e) => setViewReceipts(true)}>
                        <KeyboardDoubleArrowRightIcon style={{
                            position: "absolute",
                            left: '5px',
                        }} />
                        View Receipts
                    </p>
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
                        minWidth: "120px",
                        margin: '5px 5px 5px 5px',
                        height: "30px"
                    }}onClick={(e) => setIsHistoryPage(true)}>
                        See History
                        <img src={historyUser} style={{
                            position: "absolute",
                            left: '5px', height: "20px", width: "20px"
                        }} />
                    </p>

                </div>


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


                        <div style={{ display: "flex", flexDirection: "row",gap:'30px', alignItems: "flex-start", margin: "20px 0px" }}>

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
                                                backgroundColor: index === currentStage ? "#4CAF50" : "#ccc",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: index === currentStage ? "2px solid #4CAF50" : "none",
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
                                                    opacity: index <= currentStage ? 1 : 0.5,
                                                }}
                                            />
                                        </div>

                                        {/* Date next to the image */}
                                        <div
                                            style={{
                                                marginTop: "5px", // Space between icon and date
                                                color: index <= currentStage ? "black" : "#aaa",
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
                                                color: index <= currentStage ? "black" : "#aaa",
                                                fontWeight: index === currentStage ? "bold" : "normal",
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
                                                    backgroundColor: index < currentStage ? "#4CAF50" : "#ccc",
                                                    transform: "translateX(-50%)", // **Changed: Center the line between images**
                                                    zIndex: 0, // **Changed: Make sure the line is behind the content**
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>


                            <div>
                                {/* Scrollable Registration Content */}
                                {/* <div style={{ display: "flex", alignItems: "center", margin: '5px 5px 0px 10px' }}> */}
                                <p style={{ fontSize: "13px", fontWeight: "bold", marginTop:"20px" }}>Case Registration  </p>
                                <p style={{
                                    fontSize: '11px',
                                    marginTop: "5px",
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
                                    cursor: "pointer",
                                    margin: '5px 5px 5px 2px',
                                    maxWidth: "400px",
                                    minWidth: "150px",
                                }} onClick={(e) => setIsHistoryPage(true)}>
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                    Details
                                </p>
                                {/* </div> */}

                                <p style={{ fontSize: "13px", fontWeight: "bold", marginTop:"20px" }}>Vendor </p>
                                <p style={{
                                    fontSize: '11px',
                                    marginTop: "5px",
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
                                    cursor: "pointer",
                                    margin: '5px 5px 5px 2px',
                                    maxWidth: "400px",
                                    minWidth: "150px",
                                }} onClick={(e) => setIsHistoryPage(true)}>
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                    Details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
{/* 
            {viewReceipts && (
                <ReceiptsUser/>
            )} */}
        </div>
    )
}

export default HistoryReceipts;