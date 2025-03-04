import React, { useState } from "react";
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
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import axios from "axios";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// "../../environment";

const LookingForAccptance = (props) => {
    const navigate = useNavigate()
    const [isUpdateData, setIsUpdateData] = useState(false)
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    console.log("props.accidentData", props.fromPage)
    console.log("props.accidentData", props)

    const [formData, setFormData] = useState({
        onSpotName: props.accidentData.onSpotName,
        onSpotContact: props.accidentData.onSpotContact,
        quantity: props.accidentData.quantity,
        accidentImage1: null,
        accidentImage2: null,
        accidentImage3: null,
        accidentImage4: null,
    })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: 'File size should be less than 2 MB!', severity: 'error' });
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }
    console.log('formData', formData)

    const submitUpdatedData = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }
        let response;
        // Debugging FormData contents
        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            response = await axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/updateAccidentData/${props.accidentData.AccidentVehicleCode}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response", response.data);
            if (response.data.message == 'update data') {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                props.setUpdatedData(true)
            }
            else {
                setAlertInfo({ show: true, message: 'some issue occures', severity: 'error' });
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        }
    }

    return (
        <div style={{
            background: "linear-gradient(217deg, #f2f2f2, transparent)",
            padding: "20px 20px 0px 20px",
            borderRadius: "20px"
        }}>
            {/* <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}>  <ExpandMoreIcon /></h5> */}
            {props.fromPage !== 'quotationUpdate' && props.fromPage !== 'AllVehicles' && (<h3 className='text-2xl font-semibold mb-5'>Looking For Vehicle</h3>)}
            {props.fromPage == 'AllVehicles' && (
                <div className="relative">
                    <div onClick={() => { setIsUpdateData(!isUpdateData) }} style={{ border: '1px solid', borderRadius: '10px', boxShadow: 'rgb(255 255 255) -4px 0px 4px inset', backgroundColor: isUpdateData ? "rgb(207, 207, 207)" : "white", color: isUpdateData ? "black" : "black", }} className='absolute top-2 right-2  px-4 text-sm p-2 font-semibold mb-5 '>
                        Update Details
                    </div>
                </div>
            )}

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
                    <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                        <LocalShippingIcon />
                        <div>
                            <h3 className='text-sm font-base font-semibold'>Your Vehicle Number</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.regNo || props.accidentData.reg}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                        <PersonIcon />
                        <div>
                            <h3 className='text-sm font-base font-semibold'>On Spot Person</h3>
                            {!isUpdateData && (<p className='text-sm mt-1 text-gray-600'>{props.accidentData.onSpotName}</p>)}
                            {isUpdateData && (
                                <input
                                    type='text'
                                    name="onSpotName"
                                    placeholder='On Spot Name'
                                    value={formData.onSpotName}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ border: '1px solid', borderRadius: '10px', textAlign: 'center' }}
                                    required
                                    pattern="\d{12}"
                                    title="Aadhaar number must be exactly 12 digits."
                                />)}
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                        <CallIcon />
                        <div>
                            <h3 className='text-sm font-base font-semibold'>Person Number</h3>
                            {!isUpdateData && (<p className='text-sm mt-1 text-gray-600'>{props.accidentData.onSpotContact}</p>)}
                            {isUpdateData && (
                                <input
                                    type='text'
                                    name="onSpotContact"
                                    placeholder='On Spot Contact'
                                    value={formData.onSpotContact}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ border: '1px solid', borderRadius: '10px', textAlign: 'center' }}
                                    required
                                    pattern="\d{12}"
                                    title="Aadhaar number must be exactly 12 digits."
                                />)}
                        </div>
                    </div>
                    {props.accidentData.quantity != '' && (
                        <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                            <ScaleIcon />
                            <div>
                                <h3 className='text-sm font-base font-semibold'>Quantity</h3>
                                {!isUpdateData && (<p className='text-sm mt-1 text-gray-600'>{props.accidentData.quantity}</p>)}
                                {isUpdateData && (
                                    <input
                                        type='text'
                                        name="quantity"
                                        placeholder='quantity'
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{ border: '1px solid', borderRadius: '10px', textAlign: 'center' }}
                                        required
                                        pattern="\d{12}"
                                        title="Aadhaar number must be exactly 12 digits."
                                    />)}
                            </div>
                        </div>)}
                        <div className='flex items-center gap-5 p-3 border-b-2' style={{ borderBottom: "1px solid black" }}>
                        <CheckBoxOutlineBlankIcon />
                        <div>
                            <h3 className='text-sm font-base'>Selected Option</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.selectedOptions   }</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                        <PushPinIcon />
                        <div>
                            <h3 className='text-sm font-base font-semibold'>From</h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.pickupLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                        <FmdGoodIcon />
                        <div>
                            <h3 className='text-sm font-base font-semibold'>Drop </h3>
                            <p className='text-sm mt-1 text-gray-600'>{props.accidentData.dropLocation}</p>
                        </div>
                    </div>
                    {(props.fromPage == 'quotationUpdate' || props.fromPage == 'AllVehicles') && (
                        <div className="pb-5 mb-5">
                            {(isUpdateData || props.accidentData.accidentImage1 !== null) && (
                                <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                                    <ImageOutlinedIcon />
                                    <div>
                                        <h3 className='text-sm font-base font-semibold font-semibold'>Accident Image </h3>
                                        {!isUpdateData && (<img className='text-sm mt-1 text-gray-600' src={props.accidentData.accidentImage1} alt="PAN Card" style={{ width: '100%', borderRadius: '20px' }} />)}
                                        {isUpdateData && (
                                            <input
                                                type="file"
                                                name="accidentImage1"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="form-control"
                                                required
                                            />)}
                                    </div>
                                </div>)}
                            {(isUpdateData || props.accidentData.accidentImage2 !== null) && (
                                <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                                    <ImageOutlinedIcon />
                                    <div>
                                        <h3 className='text-sm font-base font-semibold font-semibold'>Accident Image 2</h3>
                                        {!isUpdateData && (<img className='text-sm mt-1 text-gray-600' src={props.accidentData.accidentImage2} alt="PAN Card" style={{ width: '100%', borderRadius: '20px' }} />)}
                                        {isUpdateData && (
                                            <input
                                                type="file"
                                                name="accidentImage2"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="form-control"
                                                required
                                            />)}
                                    </div>
                                </div>)}
                            {(isUpdateData || props.accidentData.accidentImage3 !== null) && (
                                <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                                    <ImageOutlinedIcon />
                                    <div>
                                        <h3 className='text-sm font-base font-semibold font-semibold'>Accident Image 3 </h3>
                                        {!isUpdateData && (<img className='text-sm mt-1 text-gray-600' src={props.accidentData.accidentImage3} alt="PAN Card" style={{ width: '100%', borderRadius: '20px' }} />)}
                                        {isUpdateData && (
                                            <input
                                                type="file"
                                                name="accidentImage3"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="form-control"
                                                required
                                            />)}
                                    </div>
                                </div>)}
                            {(isUpdateData || props.accidentData.accidentImage4 !== null) && (
                                <div className='flex items-center gap-5 p-3 border-b-2 ' style={{ borderBottom: "1px solid black" }}>
                                    <ImageOutlinedIcon />
                                    <div>
                                        <h3 className='text-sm font-base font-semibold font-semibold'>Accident Image 4 </h3>
                                        {!isUpdateData && (<img className='text-sm mt-1 text-gray-600' src={props.accidentData.accidentImage4} alt="PAN Card" style={{ width: '100%', borderRadius: '20px' }} />)}
                                        {isUpdateData && (
                                            <input
                                                type="file"
                                                name="accidentImage4"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="form-control"
                                                required
                                            />)}
                                    </div>
                                </div>)}
                        </div>

                    )}
                    {alertInfo.show && (
                        <Alert className='mb-2' severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                            {alertInfo.message}
                        </Alert>
                    )}
                    {isUpdateData && (<button onClick={submitUpdatedData}
                         className="fixed w-half left-[1.5rem] mb-5 bottom-5 right-5 bg-green-900 text-white font-semibold p-3 rounded-lg shadow-lg">
                         Update Details
                     </button>

                    )}

                    {props.fromPage !== 'quotationUpdate' && props.fromPage !== 'AllVehicles' && (<button onClick={() => {
                        navigate('/all-accident-vehicles')
                    }} className='w-full mt-3 bg-green-900 text-white font-semibold p-3 rounded-lg'>Look For Vehicle</button>)}


                </div>

            </div>
        </div>
    )
}
export default LookingForAccptance;