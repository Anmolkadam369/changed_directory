import { useEffect, useRef, useState } from "react"
import axios from 'axios';
import { Alert } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import WrapTextOutlinedIcon from '@mui/icons-material/WrapTextOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FitbitIcon from '@mui/icons-material/Fitbit';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FactoryIcon from '@mui/icons-material/Factory';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BuildIcon from '@mui/icons-material/Build';
import AdjustIcon from '@mui/icons-material/Adjust';
import BottomNavigationBar from "../User/BottomNavigationBar";
// "../../environment";
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
    const [current, setCurrent] = useState('vehicle')

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate()

    const [apiData, setApiData] = useState({

    })

    const vehicleRegistrationDocRef = useRef(null);
    const insuranceDocRef = useRef(null);
    const fitnessCertificateRef = useRef(null);
    const pollutionCertificateDocRef = useRef(null);
    const operatorLicenseCopyRef = useRef(null);



    const [formData, setFormData] = useState({
        vehicleNo: '',
        driverName: "",
        driverNumber: "",
        driverEmail: "",
        craneType: '',
        craneCapacity: '',
        insuranceNo: '',
        insuranceExp: '',
        fitnessNo: '',
        fitnessExp: '',
        pollutionNo: '',
        pollutionExp: '',
        pollutionCertificateDoc: '',
        fitnessCertificate: '',
        insuranceDoc: '',
        vehicleRegistrationDoc: '',
        operatorLicenseCopy: '',
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
        craneType: '',
        craneCapacity: '',
        insuranceNo: '',
        insuranceExp: '',
        fitnessNo: '',
        fitnessExp: '',
        pollutionNo: '',
        pollutionExp: '',
        pollutionCertificateDoc: '',
        fitnessCertificate: '',
        insuranceDoc: '',
        vehicleRegistrationDoc: '',
        operatorLicenseCopy: ''
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
            case 'craneType':
                if (!value) return 'Crane Type is required.';
                return '';
            case 'craneCapacity':
                if (!value) return 'crane capacity is required.';
                return '';
            case 'insuranceNo':
                if (!value) return 'Insurance Number is required.';
                return '';
            case 'insuranceExp':
                if (!value) return 'Insurance Expiry is required.';
                return '';
            case 'fitnessNo':
                if (!value) return 'Fitness Number is required.';
                return '';
            case 'fitnessExp':
                if (!value) return 'Fitness Expiry is required.';
                return '';
            case 'pollutionNo':
                if (!value) return 'Pollution Number is required.';
                return '';
            case 'pollutionExp':
                if (!value) return 'Pollution Expiry is required.';
                return '';
            case 'pollutionCertificateDoc':
                if (!value) return 'Document is required..';
                return '';
            case 'fitnessCertificate':
                if (!value) return 'Document is required.';
                return '';
            case 'insuranceDoc':
                if (!value) return 'Document is required.';
                return '';
            case 'vehicleRegistrationDoc':
                if (!value) return 'Registration Document is required.';
                return '';
            case 'operatorLicenseCopy':
                if (!value) return 'Document is required.';
                return '';
            default:
                return '';
        }
    };
    const validateCustomerField = (name, value) => {
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
        const { name, value, files, type } = e.target;
    
        // Handle file input separately
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
    
                const refs = {
                    vehicleRegistrationDoc: vehicleRegistrationDocRef,
                    insuranceDoc: insuranceDocRef,
                    fitnessCertificate: fitnessCertificateRef,
                    pollutionCertificateDoc: pollutionCertificateDocRef,
                    operatorLicenseCopy: operatorLicenseCopyRef
                };
    
                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }
    
                setFormData(prevState => ({
                    ...prevState,
                    [name]: null
                }));
                return;
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
            return;
        }
    
        // Validation for specific fields
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
    
        // Always update form data
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
        
        if (userId.startsWith('VC-')) {
            Object.keys(formData).forEach((field) => {
                newErrors[field] = validateField(field, formData[field]);
            });
        }
        if (userId.startsWith('CC-')) {
            Object.keys(formData).forEach((field) => {
                newErrors[field] = validateCustomerField(field, formData[field]);
            });
        }
        
        setErrors(newErrors);
        
        if (Object.values(newErrors).some((error) => error)) {
            console.log('Validation errors:', newErrors);
            return;
        }
    
        let path = userId.startsWith('VC-') ? 'addNewVehicleVendor' : 'addNewVehicle';
    
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
    
        // Debugging: Check FormData values
        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }
    
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/${path}/${userId}`, 
                formDataObj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // **DO NOT** manually set Content-Type when using FormData
                    },
                }
            );
    
            console.log('Response:', response.data);
            
            if (response.data.message === "New Vehicle Added") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
                    userId.startsWith('VC-') ? navigate('/crane-all-vehicles') : navigate('/register-new-accidentvehicle');
                }, 4000);
            } else if (response.data.message === "Vehicle Already Registered As Yours" || response.data.message === "Already Registered") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'error' });
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setAlertInfo({ show: true, message: 'Something went wrong', severity: 'error' });
        }
    };
    



    return (
        <div style={{ marginBottom: "100px" }} className="mb-10 mt-5">
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
                <div className="w-full flex justify-center">
                    <div className="inline-flex gap-2 rounded-xl items-center text-white bg-red-300  ">
                        <p className={`flex rounded-xl justify-center items-center text-white ${current === 'vehicle' ? 'bg-blue-300 shadow-lg font-semibold' : 'bg-red-300'}  px-2 py-3 `} onClick={() => { setCurrent('vehicle') }}>Vehicle Details</p>
                        <p className={`flex rounded-xl justify-center items-center text-white ${current === 'driver' ? 'bg-blue-300 shadow-lg font-semibold' : 'bg-red-300 '}  px-2 py-3 `} onClick={() => { setCurrent('driver') }}>Driver Details</p>
                    </div>
                </div>
                <div>

                    {current === 'vehicle' && (
                        <div style={{ borderBottom: '1px solid darkgreen', borderRight: '2px solid darkgreen', background: 'linear-gradient(304deg, rgb(231 228 228), transparent)' }} className=" pt-[20px] pb-[20px] pr-[2px] pl-[2px] m-2 rounded-xl">
                            <div className=" p-2 mt-1">
                                <div class="flex  ">
                                    <div className="mt-2">
                                        <LocalShippingOutlinedIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
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
                            {userId.startsWith("VC") && (
                                <div>
                                    <div className=" p-1 mt-1">
                                        <div className="flex    p-1 rounded-lg">
                                            <div className="mt-2">
                                                <WrapTextOutlinedIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                                            </div>
                                            <select
                                                name="craneType"
                                                placeholder="Type of Hydra Crane"
                                                value={formData.craneType}
                                                onChange={handleChange}
                                                className={`text-sm w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.craneType
                                                    ? 'border-red-500 focsm ring-2 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                    }`}
                                            >
                                                <option value="">Select a Hydra Crane Type</option>
                                                <option value="Crawler Cranes">Crawler Cranes</option>
                                                <option value="Carry Deck Cranes">Carry Deck Cranes</option>
                                                <option value="Hammerhead Cranes">Hammerhead Cranes</option>
                                                <option value="Overhead Cranes">Overhead Cranes</option>
                                            </select>

                                        </div>
                                        {errors.craneType && (
                                            <p className="text-sm pl-10 text-red-500 mt-1">{errors.craneType}</p>
                                        )}
                                    </div>

                                    <div className=" p-2 mt-1">
                                        <div class="flex  ">
                                            <div className="mt-2">
                                                <ScaleOutlinedIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                                            </div>
                                            <input
                                                type="number"
                                                name="craneCapacity"
                                                placeholder="Crane Capacity (in Tons)"
                                                value={formData.craneCapacity}
                                                onChange={handleChange}
                                                className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.craneCapacity
                                                    ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                    }`}
                                            />
                                        </div>
                                        {errors.craneCapacity && (
                                            <p className="text-sm pl-10 text-red-500 mt-1">{errors.craneCapacity}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-1 mt-3">
                                        <div className=" p-2 mt-1">
                                            <div className="mt-[-15px] flex">
                                                <InsertDriveFileOutlinedIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                                                <p className="mt-[18px] text-sm ml-2 opacity-[0.7]">Insurance No</p>
                                            </div>
                                            <div class="flex  bg-gray-100">
                                                <input
                                                    type="text"
                                                    name="insuranceNo"
                                                    placeholder="Insurance Policy Number"
                                                    value={formData.insuranceNo}
                                                    onChange={handleChange}
                                                    className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.insuranceNo
                                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                />
                                            </div>
                                            {errors.insuranceNo && (
                                                <p className="text-sm pl-10 text-red-500 mt-1">{errors.insuranceNo}</p>
                                            )}
                                        </div>
                                        <div className=" p-2 mt-1">
                                            <p className="text-sm opacity-[0.7]">Insurance Expiry</p>
                                            <div class="flex max-h-[49px] mt-[7px]  bg-gray-100">
                                                <input
                                                    type="date"
                                                    name="insuranceExp"
                                                    placeholder="Insurance Policy Expiry"
                                                    value={formData.insuranceExp}
                                                    onChange={handleChange}
                                                    className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.insuranceExp
                                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                />
                                            </div>
                                            {errors.insuranceExp && (
                                                <p className="text-sm pl-10 text-red-500 mt-1">{errors.insuranceExp}</p>
                                            )}
                                        </div>
                                    </div>


                                    <div className="flex gap-1">
                                        <div className=" p-2 mt-1">
                                            <div className="mt-[-15px] flex">
                                                <FitbitIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                                                <p className="mt-[18px] text-sm ml-2 opacity-[0.7]">Fitness Certificate No</p>
                                            </div>
                                            <div class="flex  bg-gray-100">

                                                <input
                                                    type="text"
                                                    name="fitnessNo"
                                                    placeholder="Fitness Certificate Number"
                                                    value={formData.fitnessNo}
                                                    onChange={handleChange}
                                                    className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.fitnessNo
                                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                />
                                            </div>
                                            {errors.fitnessNo && (
                                                <p className="text-sm pl-10 text-red-500 mt-1">{errors.fitnessNo}</p>
                                            )}
                                        </div>
                                        <div className=" p-2 mt-1">
                                            <p className="text-sm opacity-[0.7]">Fitness Expiry</p>
                                            <div class="flex max-h-[49px] mt-[7px]  bg-gray-100">
                                                <input
                                                    type="date"
                                                    name="fitnessExp"
                                                    placeholder="Fitness Policy Expiry"
                                                    value={formData.fitnessExp}
                                                    onChange={handleChange}
                                                    className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.fitnessExp
                                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                />
                                            </div>
                                            {errors.fitnessExp && (
                                                <p className="text-sm pl-10 text-red-500 mt-1">{errors.fitnessExp}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-1">
                                        <div className=" p-2 mt-1">
                                            <div className="mt-[-15px] flex">
                                                <AddModeratorOutlinedIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                                                <p className="mt-[18px] text-sm ml-2 opacity-[0.7]">Pollution No</p>
                                            </div>
                                            <div class="flex  bg-gray-100">
                                                <input
                                                    type="text"
                                                    name="pollutionNo"
                                                    placeholder="Pollution Certificate Number"
                                                    value={formData.pollutionNo}
                                                    onChange={handleChange}
                                                    className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.pollutionNo
                                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                />
                                            </div>
                                            {errors.pollutionNo && (
                                                <p className="text-sm pl-10 text-red-500 mt-1">{errors.pollutionNo}</p>
                                            )}
                                        </div>
                                        <div className=" p-2 mt-1">
                                            <p className="text-sm opacity-[0.7]">Pollution Expiry</p>
                                            <div class="flex max-h-[49px] mt-[7px]  bg-gray-100">
                                                <input
                                                    type="date"
                                                    name="pollutionExp"
                                                    placeholder="Pollution Policy Expiry"
                                                    value={formData.pollutionExp}
                                                    onChange={handleChange}
                                                    className={`w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.pollutionExp
                                                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                />
                                            </div>
                                            {errors.pollutionExp && (
                                                <p className="text-sm pl-10 text-red-500 mt-1">{errors.pollutionExp}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='p-2 mt-2 rounded-xl'>
                                        <div className="flex gap-2 mt-[10px] font-bold">
                                            <DocumentScannerOutlinedIcon className="h-[30px] w-[22px] m-2 mt-2 text-red-700" />
                                            <p className="text-red-300 mt-[10px] text-md">Related Documents *</p>
                                        </div>

                                        <div className="flex gap-2 mt-3">
                                            <div className=" mt-1">
                                                <div className=" flex">
                                                    <p className="text-sm  opacity-[0.7]">Vehicle Reg (RC)</p>
                                                </div>
                                                <div class="flex ">
                                                    <input
                                                        type="file"
                                                        name="vehicleRegistrationDoc"
                                                        onChange={handleChange}
                                                        ref={vehicleRegistrationDocRef}
                                                        className={`form-control w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.vehicleRegistrationDoc
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                            }`}
                                                    />
                                                </div>
                                                {errors.vehicleRegistrationDoc && (
                                                    <p className="text-sm pl-10 text-red-500 mt-1">{errors.vehicleRegistrationDoc}</p>
                                                )}
                                            </div>
                                            <div className="  mt-1">
                                                <div className=" flex">
                                                    <p className=" text-sm  opacity-[0.7]">Insurance Policy</p>
                                                </div>
                                                <div class="flex  bg-gray-100">
                                                    <input
                                                        type="file"
                                                        name="insuranceDoc"
                                                        onChange={handleChange}
                                                        ref={insuranceDocRef}
                                                        className={`form-control w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.insuranceDoc
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                            }`}
                                                    />
                                                </div>
                                                {errors.insuranceDoc && (
                                                    <p className="text-sm pl-10 text-red-500 mt-1">{errors.insuranceDoc}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <div className=" mt-1">
                                                <div className=" flex">
                                                    <p className=" text-sm opacity-[0.7]">Fitness Certificate </p>
                                                </div>
                                                <div class="flex  bg-gray-100">
                                                    <input
                                                        type="file"
                                                        name="fitnessCertificate"
                                                        onChange={handleChange}
                                                        ref={fitnessCertificateRef}
                                                        className={`form-control w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.fitnessCertificate
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                            }`}
                                                    />
                                                </div>
                                                {errors.fitnessCertificate && (
                                                    <p className="text-sm pl-10 text-red-500 mt-1">{errors.fitnessCertificate}</p>
                                                )}
                                            </div>
                                            <div className=" mt-1">
                                                <div className=" flex">
                                                    <p className=" text-sm opacity-[0.7]">Pollution Certificate </p>
                                                </div>
                                                <div class="flex  bg-gray-100">
                                                    <input
                                                        type="file"
                                                        name="pollutionCertificateDoc"
                                                        onChange={handleChange}
                                                        ref={pollutionCertificateDocRef}
                                                        className={`form-control w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.pollutionCertificateDoc
                                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                                            }`}
                                                    />
                                                </div>
                                                {errors.pollutionCertificateDoc && (
                                                    <p className="text-sm pl-10 text-red-500 mt-1">{errors.pollutionCertificateDoc}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}





                        </div>)}

                    {current === 'driver' && (
                        <div style={{ borderTop: '1px solid darkgreen', borderLeft: '1px solid darkgreen', background: 'linear-gradient(138deg,  rgb(226 226 226), transparent)' }} className=" pt-[20px] pb-[20px] pr-[5px] pl-[5px] m-2 rounded-xl">
                            <div className=" p-2 ">
                                <div class="flex  ">
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
                                <div class="flex  ">
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
                                <div class="flex  ">
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

                            <div className=" p-2 mt-1">
                                <p className="text-sm text-bold ml-5 opacity-[0.7]">Operator Licence Copy</p>
                                <div class="flex mt-1 gap-2">
                                    <DocumentScannerOutlinedIcon className="h-[30px] w-[22px] m-2  mt-3 text-red-700" />
                                    <input
                                        type="file"
                                        name="operatorLicenseCopy"
                                        ref={operatorLicenseCopyRef}
                                        onChange={handleChange}
                                        className={`form-control w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none ${errors.operatorLicenseCopy
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                            }`}
                                    />
                                </div>
                                {errors.operatorLicenseCopy && (
                                    <p className="text-sm pl-10 text-red-500 mt-1">{errors.operatorLicenseCopy}</p>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>




            {formData.vehicleNo !== "" && (
                <div>
                    <div>
                        <hr className="text-black-700" />
                        <div className="flex ml-3">
                            {/* <LocalShippingOutlinedIcon className="h-[30px] w-[22px] text-red-700  mt-1" /> */}
                            <h1 className="p-2 text-xl font-semibold">Vehicle Details</h1> <br />
                        </div >
                    </div>
                    <div className="bg-[#e7e7e7] rounded-xl p-2 m-2 h-[300px] overflow-y-auto shadow-lg">

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
                                                <LocalShippingOutlinedIcon className="h-[30px] w-[22px] m-2 mt-1 text-red-700 " />
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
                </div>
            )}
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

            {(userId.startsWith('CC-') || (userId.startsWith('CUD-')) ? <BottomNavigationBar /> : <BottomNavigationVendor />)}
        </div>
    )
}   