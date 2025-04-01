import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import PinDropIcon from '@mui/icons-material/PinDrop';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import telephonecall from '../../Assets/telephonecall.png'
import PersonIcon from '@mui/icons-material/Person';

const MovingVehicles = () => {
    return (
        <div className='h-screen'>
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
            <div className='bg-gray-700 '>
                <div className='px-1 py-1 '>
                    
                    <div className='flex justify-between pr-3'>
                        <div className='flex items-center space-x-4 top-0'>
                            <SocialDistanceIcon className='text-white h-4 m-2 mt-0' />
                            <p className='text-white text-sm font-semibold'>Vehicle from your location</p>
                        </div>
                            <div className='bg-white text-xs font-semibold px-3 py-1 m-3 rounded-xl'>
                                1.4 Km
                            </div>

                    </div>
                </div>
                <div className='bg-white  h-full p-2'>
                    <div className='bg-[#f9f9f9] rounded-xl flex justify-between m-3' style={{ border: '1px solid black' }}>
                        <div className='px-4 py-3 flex-col'>
                            <div className='flex'>
                                <PersonIcon className='mt-1 mr-1 mb-1 h-[40px] w-[40px]' />
                                <h4 className='text-xl font-semibold mt-0.3'>DL05DS3234 </h4>
                            </div>
                            <div className='flex'>
                                <p className='text-xs font-semibold mt-2'>crane.</p>
                                <div className='bg-yellow-500 rounded-xl p-1 mt-1'>
                                    <p className='font-xs font-semibold px-2'>4.5</p>
                                </div>
                            </div>
                        </div>
                        <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" />
                    </div>
                    <div className='bg-white flex justify-between m-3' style={{ borderTop: '1px solid gray' }}>
                        <div className='px-2 py-1 flex-col'>
                            <div class='flex'>
                                <MyLocationIcon className='m-1 mt-2' />
                                <div className='px-2 py-2 flex-col'>
                                    <h4 className='text-xs font-base'>start location </h4>
                                    <p className='text-xs font-semibold'>Your Drop Location</p>
                                </div>
                            </div>
                            <div class='flex'>
                                <PinDropIcon className='m-1 mt-2' />
                                <div className='px-1 py-1 flex-col'>
                                    <p className='text-xs font-base'>drop location</p>
                                    <h4 className='text-xs font-semibold'>Your Current Location </h4>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 py-4'>
                            <h2 className='font-semibold text-xl'>₹ 20,000</h2>
                        </div>
                        {/* <img className='h-20 w-20 p-2' src="https://toppng.com/uploads/preview/crane-png-indo-power-crane-11563243373unjn5iufbu.png" alt="crane" /> */}
                    </div>
                    <div>
                        <div className='bg-white flex justify-between m-3'  style={{ borderTop: '1px solid gray' }}>
                            <div className='flex flex-col'>

                                <div className=' bg-green-700 m-1 px-6 py-2 h-30 w-30 m-2 rounded-xl'>
                                    <p className='text-white font-semibold text-xs'> Accept Case</p>
                                </div>
                                <div className=' bg-red-700 m-1 px-6 py-2 h-30 w-30 m-2 mt-0 rounded-xl'>
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
export default MovingVehicles;