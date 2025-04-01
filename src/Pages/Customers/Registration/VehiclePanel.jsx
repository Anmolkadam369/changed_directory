import React from "react";
import {  IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';


const VehiclePanel = (props) => {
    console.log('props.selectedVehicleData',props.selectedVehicleData)
    return (
        <div>
            <div className='text-center top-0 mb-1'>
                <IconButton
                    onClick={() => {
                        props.setVehiclePanel(false)
                        props.setPanelOpen(true)
                    }}
                    className="absolute mb-1 pb-1"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <h3 className='font-mediumn text-base font-bold mb-2'>Choose Vehicle Type</h3>

            {(props.selectedVehicleData.length ==0 || props.selectedVehicleData.includes('crane')) && (<div onClick={()=>{
                props.setVehicleImagesPanel(true)
                props.setVehiclePanel(false)
                props.setVehicleType('crane')
            }} className='flex bg-[#f5f5f5] rounded-xl active:border-green p-3 w-full items-center justify-between ' style={{ border: "3px solid black" }}>
                <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                <div className=' p-2 w-1/2'>
                    <h4 className='font-medium text-base font-semibold'>Hydra Crane</h4>
                    <h5 className='font-medium text-xs'>Get the quick service</h5>
                    <p className='font-medium text-xs text-grey-400'>get best service </p>
                </div>
                {/* <h2 className='text-xl font-semibold p-1'>₹ 20,000</h2> */}
            </div>)}

            {(props.selectedVehicleData.length === 0 || props.selectedVehicleData.includes('recoveryVan')) && (<div onClick={()=>{
                props.setVehicleImagesPanel(true)
                props.setVehiclePanel(false)
                props.setVehicleType('recoveryVan')
            }} className='mt-3 flex bg-[#f5f5f5] rounded-xl active:border-green p-3 w-full items-center justify-between ' style={{ border: "3px solid black" }}>
                <img className='h-[4rem] w-[4rem] p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-VK9DCPXVGAmbx27ErrmIbqaJBMfJcAYw&s" alt="crane" />
                <div className=' p-2 w-1/2'>
                    <h4 className='font-medium text-base font-semibold'>Mobile Crane</h4>
                    <h5 className='font-medium text-xs'>catch up quickly</h5>
                    <p className='font-medium text-xs text-grey-400'>get best service with crane </p>
                </div>
                {/* <h2 className='text-xl font-semibold p-1'>₹ 20,000</h2> */}
            </div>)}


           {(props.selectedVehicleData.length ==0 || props.selectedVehicleData.includes('crane') && props.selectedVehicleData.includes('recoveryVan') )&&( <div onClick={()=>{
                props.setVehicleImagesPanel(true)
                props.setVehiclePanel(false)
                props.setVehicleType('crane,recoveryVan')
            }} className='mt-3 flex bg-[#f5f5f5] rounded-xl active:border-green p-3 w-full items-center justify-between ' style={{ border: "3px solid black" }}>
                <img className='h-[65px] w-[74px] mb-[-15px] p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-VK9DCPXVGAmbx27ErrmIbqaJBMfJcAYw&s" alt="crane" />
                <p className="m-1 mt-4 mt-[30px]"><AddIcon /></p>
                <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                
                <div className=' p-2 w-1/2'>
                    <h4 className='font-medium text-sm font-semibold'>Mobile Crane + Hydra Crane</h4>
                    <h5 className='font-medium text-xs'>catch up quickly  </h5>
                    <p className='font-medium text-xs text-grey-400'>get cran and Mobile Crane</p>
                </div>
                {/* <h2 className='text-xl font-semibold p-1'>₹ 20,000</h2> */}
            </div>)}
            {/* https://img.freepik.com/free-vector/sticker-design-with-side-view-tow-truck-isolated_1308-60032.jpg?ga=GA1.1.1467170626.1728457834&semt=ais_hybrid */}
        </div>
    )
}
export default VehiclePanel;