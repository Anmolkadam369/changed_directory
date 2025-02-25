import React , {useState} from "react";
import { Alert, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PushPinIcon from '@mui/icons-material/PushPin';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PersonIcon from '@mui/icons-material/Person';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScaleIcon from '@mui/icons-material/Scale';
import CallIcon from '@mui/icons-material/Call';

const ConfirmedRide = (props) => {
    console.log("props", props.accidentData)
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        // props.setConfirmVehicle(false);
        props.setVehicleFound(true);
    };
    return (
        <div style={{
            background: "linear-gradient(217deg, #f2f2f2, transparent)",
            padding: "20px 10px 0px 10px",
            borderRadius: "20px"
        }}>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmVehicle(false)
                props.setVehicleImagesPanel(true)
            }}>  <ExpandMoreIcon /></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Information</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div>
                    {props.vehicleType == 'crane,recoveryVan' && (
                        <div className="flex flex-row">
                            <img className='h-[65px] w-[74px] mt-[15px] p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-VK9DCPXVGAmbx27ErrmIbqaJBMfJcAYw&s" alt="crane" />
                            <p className="m-1 mt-4 mt-[30px]"><AddIcon /></p>
                            <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                        </div>
                    )}
                    {props.vehicleType == 'crane' && (
                        <div>
                            <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                        </div>
                    )}
                     {props.vehicleType == 'recoveryVan' && (
                        <div className="flex flex-row">
                            <img className='h-20 w-20 p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-VK9DCPXVGAmbx27ErrmIbqaJBMfJcAYw&s" alt="crane" />
                        </div>
                    )}
                </div>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <LocalShippingIcon />
                        <div>
                            <h3 className='text-sm font-base'>Your Vehicle Number</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.regNo}</p>
                        </div>
                    </div>


                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <PersonIcon />
                        <div>
                            <h3 className='text-sm font-base'>On Spot Person</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.onSpotName}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <CallIcon />
                        <div>
                            <h3 className='text-sm font-base'>Person Number</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.onSpotContact}</p>
                        </div>
                    </div>
                    {props.accidentData.quantity != "" && (
                        <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                            <ScaleIcon />
                            <div>
                                <h3 className='text-sm font-base'>Quantity</h3>
                                <p className='text-sm mt-1 text-gray-600'>{props.accidentData.quantity}</p>
                            </div>
                        </div>)}
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <CheckBoxOutlineBlankIcon />
                        <div>
                            <h3 className='text-sm font-base'>Selected Option</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.selectedOptions}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <PushPinIcon />
                        <div>
                            <h3 className='text-sm font-base'>From</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.pickupLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <FmdGoodIcon />
                        <div>
                            <h3 className='text-sm font-base'>Drop </h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.dropLocation}</p>
                        </div>
                    </div>

                </div>
                <button
                    onClick={handleClick}
                    className={`w-full mt-3 bg-green-600 text-white font-semibold p-3 rounded-lg flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    disabled={loading}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    ) : null}
                    {loading ? "Processing..." : "Confirm Details"}
                </button>
            </div>
        </div>
    )
}
export default ConfirmedRide;


