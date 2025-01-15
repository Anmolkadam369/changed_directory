import React from "react";
import { Alert, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PushPinIcon from '@mui/icons-material/PushPin';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScaleIcon from '@mui/icons-material/Scale';
import { useNavigate } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';


const LookingForAccptance = (props) => {
    const navigate = useNavigate()
    console.log("props.accidentData", props.fromPage)
    console.log("props.accidentData", props)

    return (
        <div style={{
            background: "linear-gradient(217deg, rgb(236 236 236), transparent)",
            padding: "20px 20px 0px 20px",
            borderRadius: "20px"
        }}>
            {/* <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}>  <ExpandMoreIcon /></h5> */}
            {props.fromPage !=='quotationUpdate' && (<h3 className='text-2xl font-semibold mb-5'>Looking For Vehicle</h3>)}

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div>
                    {props.vehicleType == 'craneandrecoveryvan' && (
                        <div className="flex flex-row">
                            <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                            <p className="m-1 mt-4"><AddIcon /></p>
                            <img className='h-20 w-20 p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-VK9DCPXVGAmbx27ErrmIbqaJBMfJcAYw&s" alt="crane" />
                        </div>
                    )}
                    {props.vehicleType == 'crane' && (
                        <div>
                            <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                        </div>
                    )}
                </div>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <LocalShippingIcon />
                        <div>
                            <h3 className='text-sm font-base'>Your Vehicle Number</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.regNo || props.accidentData.reg}</p>
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
                    {props.accidentData.quantity != '' && (
                        <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                            <ScaleIcon />
                            <div>
                                <h3 className='text-sm font-base'>Quantity</h3>
                                <p className='text-sm mt-1 text-gray-600'>{props.accidentData.quantity}</p>
                            </div>
                        </div>)}
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
                    {props.fromPage!=='quotationUpdate' && ( <button onClick={() => {
                        navigate('/all-accident-vehicles')  
                    }} className='w-full mt-3 bg-green-900 text-white font-semibold p-3 rounded-lg'>Look For Vehicle</button>)}


                </div>

            </div>
        </div>
    )
}
export default LookingForAccptance;