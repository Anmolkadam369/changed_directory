import React from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddIcon from '@mui/icons-material/Add';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScaleIcon from '@mui/icons-material/Scale';

const WaitForVehicleCome = (props) => {
    return (
        <div style={{
            background: "linear-gradient(217deg, rgb(236 236 236), transparent)",
            padding: "20px 20px 0px 20px",
            borderRadius: "20px"
        }}>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setPanelOpen(true)
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Vehicle Coming Soon ...</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className="flex flex-row">
                    <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                    <p className="m-1 mt-4"><AddIcon /></p>
                    <img className='h-20 w-20 p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-VK9DCPXVGAmbx27ErrmIbqaJBMfJcAYw&s" alt="crane" />
                </div>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <LocalShippingIcon />
                        <div>
                            <h3 className='text-sm font-base'>Your Vehicle Number</h3>
                            <p className='text-sm -mt-1 text-gray-600'>RJ03TW3244</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <ScaleIcon />
                        <div>
                            <h3 className='text-sm font-base'>Quantity</h3>
                            <p className='text-sm -mt-1 text-gray-600'>10 Tons</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <PushPinIcon />
                        <div>
                            <h3 className='text-sm font-base'>Akbar camp road Azadnagar thane maharashtra</h3>
                            <p className='text-sm -mt-1 text-gray-600'>From Thane</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <FmdGoodIcon />
                        <div>
                            <h3 className='text-sm font-base'>Sai Residency, Powai Lake Road, Powai, Mumbai, Maharashtra</h3>
                            <p className='text-sm -mt-1 text-gray-600'>To Mumbai</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2' >
                        <HourglassBottomIcon />
                        <div>
                            <h3 className='text-sm font-base'>Getting Vehicle For You </h3>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}
export default WaitForVehicleCome;