import { useEffect, useState } from "react"
import axios from 'axios';
import { Alert } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FactoryIcon from '@mui/icons-material/Factory';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BuildIcon from '@mui/icons-material/Build';
import AdjustIcon from '@mui/icons-material/Adjust';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BottomNavigationBar from "../User/BottomNavigationBar";
import backendUrl from "../../environment";
import EmailIcon from '@mui/icons-material/Email';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from "react-router-dom";
import BottomNavigationVendor from "../Crane-user/BottomNavigationVendor/BottomNavigationVendor";



const validDriverNumber = (value) => {
    const regex = /^[6-9]\d{9}$/;
    if (!regex.test(value)) {
        return 'Mobile no should be right';
    }
    return '';
};

const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        return 'Invalid email address.';
    }
    return '';
};


export default function AddNewVehicle() {
    const [detailsApi, setDetailsApi] = useState(false)
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate()

    const [apiData, setApiData] = useState({

    })



    const [formData, setFormData] = useState({
        vehicleNo: '',
        driverName: "",
        driverNumber: "",
        driverEmail: "",
        chassisNo: "CH109245ED6789",
        engineNo: "EN09876VH5432",
        make: "Tata",
        model: "LPT 1613",
        year: 2023,
        type: "Truck",
        application: "Logistics",
        GVW: 16200,
        ULW: 6000,
        InsuranceName: "ICICI Lombard",
    });

    const [errors, setErrors] = useState({
        vehicleNo: '',
        driverName: '',
        driverNumber: '',
        driverEmail: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'vehicleNo':
                if (!value) return 'Vehicle number is required.';
                return '';
            case 'driverName':
                return value ? '' : 'Driver name is required.';
            case 'driverNumber':
                if (!value) return 'Driver number is required.';
                return '';
            case 'driverEmail':
                if (!value) return 'Driver email is required.';
                return '';
            default:
                return '';
        }
    };


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'driverNumber') {
            const error = validDriverNumber(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                driverNumber: error,
            }));
        }
        if (name === 'driverEmail') {
            const error = validateEmail(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                driverEmail: error,
            }));
        }

    };

    useEffect(() => {
        if (formData.vehicleNo != "" &&
            formData.driverName != "" &&
            formData.driverNumber != "" &&
            formData.driverEmail != "") {
            setDetailsApi(true)
        }
    }, [formData.vehicleNo,
    formData.driverName,
    formData.driverNumber,
    formData.driverEmail])

    useEffect(() => {
        //api calling for vehicle details 
    }, [detailsApi])


    console.log("formdadata", formData)
    // Handle form submission


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            newErrors[field] = validateField(field, formData[field]);
        });
        setErrors(newErrors);
        if (Object.values(newErrors).some((error) => error)) {
            console.log('Validation errors:', newErrors);
            return;
        }

        // Prepare headers with token
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        let path=userId.startsWith('VC-')? 'addNewVehicleVendor':'addNewVehicle';
        try {
            const response = await axios.post(
                `${backendUrl}/api/${path}/${userId}`, // Replace with your backend URL
                formData,
                { headers }
            );
            console.log('Response:', response.data);
            if (response.data.message == "New Vehicle Added") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
               if( userId.startsWith('VC-')){
                    setTimeout(()=>{
                        navigate('/crane-all-vehicles')
                    },4000)
                }
                setTimeout(()=>{
                    navigate('/register-new-accidentvehicle')
                },4000)
            }
            if (response.data.message == "Vehicle Already Registered As Yours")
                setAlertInfo({ show: true, message: response.data.message, severity: 'error' });
            if (response.data.message == "Already Registered")
                setAlertInfo({ show: true, message: response.data.message, severity: 'error' });
        } catch (error) {
            console.error('Error submitting data:', error);
            setAlertInfo({ show: true, message: 'something went wrong', severity: 'error' });
        }
    };


    return (
        <div style={{marginBottom:"100px"}} className="mb-10 mt-5">
            <div className="relative m-2 mt-3 p-2 flex justify-between bg-[#ff7777] rounded-xl">
                <div className="p-2 mt-1 absolute inset-0 flex flex-col justify-start text-white md:static md:items-start md:justify-start">
                    <div className="flex">
                        <AddBoxIcon className="h-[30px] w-[22px] m-2 mt-2" />
                        <h1 className="font-semibold pb-1 text-xl mt-2">Add New One</h1>
                    </div>
                    <p className="opacity-50 pb-1">make your life easy with us</p>
                </div>
                <img
                    className="h-[180px] w-[180px] mt-[-70px] ml-auto"
                    src="https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-red-tractor-and-trailer-or-semi-truck-3d-illustration-or-3d-png-image_11505465.png"
                    alt="Truck"
                />
            </div>


            <div>
                <div className=" p-2 mt-1">
                    <div class="flex  bg-gray-100">
                        <div className="mt-2">
                            <LocalShippingIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                        </div>
                        <input
                            type="text"
                            name="vehicleNo"
                            placeholder="Vehicle Number"
                            value={formData.vehicleNo}
                            onChange={handleChange}
                            className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.vehicleNo
                                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }`}
                        />
                    </div>
                    {errors.vehicleNo && (
                        <p className="text-sm pl-10 text-red-500 mt-1">{errors.vehicleNo}</p>
                    )}
                </div>
                <div className=" p-2 ">
                    <div class="flex  bg-gray-100">
                        <div className="mt-2">
                            <ContactPageIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700 " />
                        </div>
                        <input
                            type="text"
                            name="driverName"
                            placeholder="Driver Name"
                            value={formData.driverName}
                            onChange={handleChange}
                            className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.driverName
                                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }`}
                        />
                    </div>
                    {errors.driverName && (
                        <p className="text-sm pl-10 text-red-500 mt-1">{errors.driverName}</p>
                    )}
                </div>
                <div className=" p-2 ">
                    <div class="flex  bg-gray-100">
                        <div className="mt-2">
                            <ContactsIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                        </div>
                        <input
                            type="number"
                            name="driverNumber"
                            placeholder="Driver Number"
                            value={formData.driverNumber}
                            onChange={handleChange}
                            className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.driverNumber
                                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }`}
                        />
                    </div>
                    {errors.driverNumber && (
                        <p className="text-sm pl-10 text-red-500 mt-1">{errors.driverNumber}</p>
                    )}
                </div>
                <div className=" p-2 ">
                    <div class="flex  bg-gray-100">
                        <div className="mt-2">
                            <EmailIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                        </div>
                        <input
                            type="text"
                            name="driverEmail"
                            placeholder="Driver Email"
                            value={formData.driverEmail}
                            onChange={handleChange}
                            className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.driverEmail
                                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }`}
                        />
                    </div>
                    {errors.driverEmail && (
                        <p className="text-sm pl-10 text-red-500 mt-1">{errors.driverEmail}</p>
                    )}
                </div>

            </div>





            <div>
                <hr className="text-black-700" />
                <div className="flex ml-3">
                    {/* <LocalShippingOutlinedIcon className="h-[30px] w-[22px] text-red-700  mt-1" /> */}
                    <h1 className="p-2 text-xl font-semibold">Vehicle Details</h1>
                </div >
            </div>
            <div className="bg-[#e5e0e0] rounded-xl p-2 m-2 h-[300px] overflow-y-auto shadow-lg">

                <div className="flex justify-between">

                    <div>
                        <div className="  mt-5">
                            <p className="text-sm pl-5 opacity-50">Chassis Number</p>
                            <div class="flex">
                                <div>
                                    <CreditCardIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                </div>
                                <h5 className="font-semibold mt-2">{formData.chassisNo}</h5>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm pl-5 opacity-50">Engine Number</p>
                            <div class="flex">
                                <div>
                                    <EngineeringIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                </div>
                                <h5 className="font-semibold mt-2">{formData.engineNo}</h5>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm pl-5 opacity-50">Make</p>
                            <div class="flex">
                                <div>
                                    <FactoryIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                </div>
                                <h5 className="font-semibold mt-2">{formData.make}</h5>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">Model</p>
                                <div class="flex  min-w-[145px]">
                                    <div>
                                        <DriveEtaIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.model}</h5>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">Year</p>
                                <div class="flex">
                                    <div>
                                        <CalendarMonthIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.year}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">Engine Number</p>
                                <div class="flex  min-w-[145px]">
                                    <div>
                                        <EngineeringIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.year}</h5>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">Type</p>
                                <div class="flex">
                                    <div>
                                        <DriveEtaIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.type}</h5>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between">
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">Application</p>
                                <div class="flex  min-w-[145px]">
                                    <div>
                                        <BuildIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.application}</h5>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">GVW</p>
                                <div class="flex">
                                    <div>
                                        <LocalShippingIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.GVW}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">ULW</p>
                                <div class="flex  min-w-[145px]">
                                    <div>
                                        <LocalShippingOutlinedIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.ULW}</h5>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm pl-5 opacity-50">Insurance</p>
                                <div class="flex">
                                    <div>
                                        <AdjustIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
                                    </div>
                                    <h5 className="font-semibold mt-2">{formData.InsuranceName}</h5>
                                </div>
                            </div>
                        </div>


                    </div>
                    <img
                        className="mt-5 ml-5 h-[140px] w-[180px] "
                        src="https://www.pngarts.com/files/3/Container-Truck-PNG-Transparent-Image.png"
                        alt="Car"
                    />
                </div>
            </div>
            {alertInfo.show && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                    {alertInfo.message}
                </Alert>
            )}
            <div className="flex items-center justify-center ">
                <button onClick={handleSubmit} class="  w-[200px] rounded-xl bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 mb-10 border-b-4 border-blue-700 hover:border-blue-500">
                    Submit
                </button>
            </div>

           {(userId.startsWith('CC-') || (userId.startsWith('CUD-'))? <BottomNavigationBar /> :<BottomNavigationVendor/>)}
        </div>
    )
}   