import React, { useContext, useState } from 'react'
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// '../../../environment';
import axios from 'axios';

const CraneDriverDetails = (props) => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const [isActive, setIsActive] = useState(true)

    const changeActivation = async () => {
        let response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/changeVendorActivation/${!isActive}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log("respo", response)
        if (response.data.message == 'changed successfully') {
            setIsActive(!isActive)
        }
    }
    return (

        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{props.driverName}</h4>
                </div>

                <div>
                    <div
                        onClick={changeActivation}
                        style={{ color: isActive ? 'green' : 'red' }}
                        className={`h-10 w-10 bg-white flex items-center justify-center rounded-full transition-colors duration-300 ${isActive ? 'bg-green' : 'bg-red'
                            }`}
                    >
                        <PowerSettingsNewIcon className="text-lg font-medium" />
                    </div>
                    <p className="mt-1 text-sm font-semibold" style={{ color: isActive ? 'green' : 'red', textAlign: 'center' }}>
                        {isActive ? 'Active' : 'Inactive'}
                    </p>
                </div>




            </div>
            <div className=' absolute flex items-center justify-center max-w-[90%]'>
                <div style={{ overflowX: 'auto' }} className='flex p-3 mt-8 bg-gray-500 rounded-xl justify-center gap-5 items-start'>
                    <div className='text-center ml-[155px] mr-2'>
                        <CurrencyRupeeIcon className=" text-white text-3xl mb-2 font-thin " />
                        <h5 className=' text-white text-lg font-medium'>{props.dailyIncome}</h5>
                        <p className=' text-xs text-blue-100 text-nowrap'>Total Services </p>
                    </div>
                    <div className='text-center ml-2 mr-2'>
                        <MiscellaneousServicesOutlinedIcon className=" text-white text-3xl mb-2 font-thin " />
                        <h5 className=' text-white text-lg font-medium'>{props.services}</h5>
                        <p className=' text-xs text-blue-100 text-nowrap'>Today Earned</p>
                    </div>
                    <div className='text-center ml-2 mr-2'>
                        <DateRangeOutlinedIcon className="text-white text-3xl mb-2 font-thin" />
                        <h5 className='text-white text-lg font-medium'>{props.last7Days}</h5>
                        <p className=' text-xs text-blue-100 text-nowrap'>Last 7 Days</p>
                    </div>
                    <div className='text-center ml-2 mr-2'>
                        <CalendarMonthOutlinedIcon className=" text-white text-3xl mb-2 font-thin" />
                        <h5 className=' text-white text-lg font-medium'>{props.lastMonth}</h5>
                        <p className=' text-xs text-blue-100 text-nowrap'>Last 30 Days</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CraneDriverDetails;