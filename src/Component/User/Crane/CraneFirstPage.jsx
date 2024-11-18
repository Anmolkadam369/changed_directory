

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
import StatusTracking from './StatusTracking';
import HistoryReceipts from './HistoryReceipts';




const CraneFirstPage = () => {
    const { state } = useLocation();
    console.log("Statehere", state?.indexFor)
    console.log("Statehere", state?.vehicleNo)

    const [selectedIndex, setSelectedIndex] = useState(state?.indexFor || 0);
    const [vehicleNo, setVehicleNo] = useState(state?.vehicleNo || 0);

    console.log("selectedIndex", selectedIndex)

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };



    // status tracking



    // Array of stages
    // const stages = ["assigned", "accepted & moved","reached"];


    return (
        <div>
            <div className="start-container" style={{ height: "30px", margin: "20px 10px 0px 20px" }}>
                <div className="imageContainer">
                    {["status tracking", "quotation & updates", "add new case", 'history & receipts', "summary & reviews",].map((text, index) => (
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




            {selectedIndex == 0 && (
                <StatusTracking />
            )}

            {selectedIndex == 1 && (
                <QuotationUpdate number={vehicleNo}/>
            )}
            {selectedIndex == 2 && (
                <Registration />
            )}
            {selectedIndex == 3 && (
                <HistoryReceipts/>
            )}

        </div>
    )
}

export default CraneFirstPage;