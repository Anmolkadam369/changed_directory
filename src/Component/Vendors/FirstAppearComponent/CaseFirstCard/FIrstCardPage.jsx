import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import PinDropIcon from '@mui/icons-material/PinDrop';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import telephonecall from '../../../../Assets/telephonecall.png'
import PersonIcon from '@mui/icons-material/Person';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FirstCardPage = (props) => {
    console.log('proisadasfdafdasfd', props)
    const [type, setType] = useState(props.accidentData.vendorType.replace(/([a-z])([A-Z])/g, '$1 $2'))
    console.log('setType', type)
    const [isOpenDistance, setIsOpenDistance] = useState(false)
    const [isOpenDuration, setIsOpenDuration] = useState(false)


    return (
        <div>
            <div className='h-1/2'>
                <div className='h-full w-full '>
                    <MapContainer zoom={13} center={[19.0760, 72.8777]} style={{ width: '100%', height: '50vh' }}>
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                        />
                    </MapContainer>
                </div>

            </div>
            <div className='bg-gray-700 rounded-xl'>
                <div className='px-1 py-1 '>

                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center pr-3 cursor-pointer' onClick={() => setIsOpenDistance(!isOpenDistance)}>
                            <div className='flex items-center space-x-4 top-0'>
                                <AssistantDirectionIcon className='text-green-500 h-4 m-2 mt-0' />
                                <p className='text-white text-sm font-semibold'>Total Distance</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='text-xs text-white font-semibold px-3 py-1 m-3 rounded-xl'>
                                    {props.accidentData.totalDistance} Km
                                </div>
                                {isOpenDistance ? <ChevronUp className='text-white h-4' /> : <ChevronDown className='text-white h-4' />}
                            </div>
                        </div>
                        {isOpenDistance && (
                            <div>
                                <div className='absolute bg-gray-600 py-2 z-11 shadow-lg rounded-xl'>
                                    <div className=' flex items-center text-white text-sm rounded-lg mr-4 mt-2 mb-2'>
                                        <div className='flex items-center space-x-4 top-0'>
                                            <AssistantDirectionIcon className='text-blue-400 h-4 ml-3 mt-0 scale-x-[-1]' />
                                            <p className='text-white text-sm font-semibold'>Your's to Pickup Distance</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='text-xs text-white font-semibold px-3 py-1  rounded-xl'>
                                                {props.accidentData.fromVendorLocationToPickDistance} Km
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' flex items-center text-white text-sm rounded-lg mr-4'>
                                        <div className='flex items-center space-x-4 top-0'>
                                            <AssistantDirectionIcon className='text-white h-4 ml-3 mt-0' />
                                            <p className='text-white text-sm font-semibold'>Pickup to Drop Distance</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='text-xs text-white font-semibold px-3 py-1  rounded-xl'>
                                                {props.accidentData.fromPickToDropDistance} Km
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='text-white mt-1' />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center pr-3 cursor-pointer' onClick={() => setIsOpenDuration(!isOpenDuration)}>
                            <div className='flex items-center space-x-4 top-0'>
                                <SocialDistanceIcon className='text-green-500 h-4 m-2 mt-0' />
                                <p className='text-white text-sm font-semibold'>Total Duration</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='text-xs text-white font-semibold px-3 py-1 m-3 rounded-xl'>
                                    {props.accidentData.totalDuration}
                                </div>
                                {isOpenDuration ? <ChevronUp className='text-white h-4' /> : <ChevronDown className='text-white h-4' />}
                            </div>
                        </div>
                        {isOpenDuration && (
                            <div>
                                <div className='absolute bg-gray-600 py-2 z-10 shadow-lg rounded-xl'>
                                    <div className=' flex items-center text-white text-sm rounded-lg mr-4 mt-2 mb-2'>
                                        <div className='flex items-center space-x-4 top-0'>
                                            <SocialDistanceIcon className='text-blue-400 h-4 ml-3 mt-0 scale-x-[-1]' />
                                            <p className='text-white text-sm font-semibold'>Your's to Pickup Duration</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='text-xs text-white font-semibold px-3 py-1  rounded-xl'>
                                                {props.accidentData.fromVendorLocationToPickDuration}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' flex items-center text-white text-sm rounded-lg mr-4'>
                                        <div className='flex items-center space-x-4 top-0'>
                                            <SocialDistanceIcon className='text-white h-4 ml-3 mt-0' />
                                            <p className='text-white text-sm font-semibold'>Pickup to Drop Duration</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='text-xs text-white font-semibold px-3 py-1  rounded-xl'>
                                                {props.accidentData.fromPickToDropDuration}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='text-white mt-1' />
                                </div>
                            </div>
                        )}
                    </div>




                    {/* <div className='flex justify-between pr-3'>
                        <div className='flex items-center space-x-4 top-0'>
                            <SocialDistanceIcon className='text-white h-4 m-2 mt-0' />
                            <p className='text-white text-sm font-semibold'>Accident Location from you</p>
                        </div>
                            <div className='text-xs text-white font-semibold px-3 py-1 m-3 rounded-xl'>
                                {props.accidentData.fromVendorLocationToPickDistance} Km
                            </div>
                    </div>
                    <div className='flex justify-between pr-3'>
                        <div className='flex items-center space-x-4 top-0'>
                            <SocialDistanceIcon className='text-white h-4 m-2 mt-0' />
                            <p className='text-white text-sm font-semibold'>Approx time will take you</p>
                        </div>
                            <div className='text-xs text-white font-semibold px-3 py-1 m-3 rounded-xl'>
                                {props.accidentData.fromVendorLocationToPickDuration}
                            </div>
                    </div> */}
                </div>
                <div className='bg-white rounded-xl h-full p-2'>
                    <div className='bg-[#f9f9f9] rounded-xl flex justify-between m-3' style={{ border: '1px solid black' }}>
                        <div className='px-4 py-3 flex-col'>
                            <div className='flex'>
                                <PersonIcon className='mt-1 mr-1 mb-1 h-[40px] w-[40px]' />
                                <h4 className='text-xl font-semibold mt-0.3'>{props.accidentData.reg} </h4>
                            </div>
                            <div className='flex'>
                                <p className='text-xs font-semibold mt-2'>{type} service required</p>
                                {/* <div className='bg-yellow-500 rounded-xl p-1 mt-1'>
                                    <p className='font-xs font-semibold px-2'>4.5</p>
                                </div> */}
                            </div>
                        </div>
                        <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                    </div>
                    <div className='bg-white flex justify-between m-3' style={{ borderTop: '1px solid gray' }}>
                        <div className='px-2 py-1 flex-col'>
                            <div class='flex'>
                                <MyLocationIcon className='m-1 mt-2' />
                                <div className='px-2 py-2 flex-col'>
                                    <h4 className='text-xs font-base'>{props.accidentData.pickupLocation} </h4>
                                    <p className='text-xs font-semibold'>Accident Location</p>
                                </div>
                            </div>
                            <div class='flex'>
                                <PinDropIcon className='m-1 mt-2' />
                                <div className='px-1 py-1 flex-col'>
                                    <p className='text-xs font-base'>{props.accidentData.dropLocation}</p>
                                    <h4 className='text-xs font-semibold'>Drop Location </h4>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 py-4'>
                            <h2 className='font-semibold text-xl'>₹ {props.accidentData.charges}</h2>
                        </div>
                        {/* <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" /> */}
                    </div>
                    <div>
                        <div className='bg-white flex justify-between m-3' style={{ borderTop: '1px solid gray' }}>
                            <div className='flex flex-col'>

                                <div className=' bg-green-700 m-1 px-6 py-2 h-30 w-30 m-2 rounded-xl'
                                    onClick={() => {
                                        props.setFirstPage(false)
                                        props.setIsViewImage(false)
                                        props.setIsRejected(false)
                                        // props.setIsAccepted(true)
                                        props.setVendorDecision('accept');
                                    }}>

                                    <p className='text-white font-semibold text-xs'> Accept Case</p>
                                </div>
                                <div className=' bg-red-700 m-1 px-6 py-2 h-30 w-30 m-2 mt-0 rounded-xl'
                                    onClick={() => {
                                        props.setFirstPage(false)
                                        props.setIsAccepted(false)
                                        props.setIsViewImage(false)
                                        props.setIsRejected(true)
                                        props.setVendorDecision('reject')
                                    }}>
                                    <p className='text-white font-semibold text-xs'> Reject Case</p>
                                </div>
                            </div>
                            <div onClick={() => (window.location.href = 'tel: +91 7800 78 4700')} className='flex flex-col items-center justify-center px-4 py-2'>
                                <img src={telephonecall} className='h-[30px] w-[30px]' alt="call for help" />
                                <p className='text-black font-semibold text-xs text-center'> call for help</p>

                            </div>
                        </div>
                    </div>

                </div>




            </div>


        </div>
    )
}
export default FirstCardPage;