import React, { useState, useEffect, useRef } from 'react';
// import './VendorMasterForm.css'
import addProduct from '../../Assets/add-product.png'
import CloseIcon from '@mui/icons-material/Close';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Modal from 'react-modal';
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import backendUrl from '../../environment';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import VendorPaymentDetail from '../PaymentPage/VendorPaymentDetail';
import vendorInfo1 from '../../Assets/vendorInfo1.jpg'
import vendorInfo2 from '../../Assets/vendorInfo2.jpg'
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import customerInfo from '../../Assets/customerInfo.xlsx';
import vendorsInfo from '../../Assets/vendorsInfo.xlsx';
import fleetInfo from '../../Assets/fleetInfo.xlsx';
import { IconButton } from '@mui/material';
import Sidebar from '../Home/Sidebar';
import ViewProduct from './ViewProduct';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { dataTool } from 'echarts';
const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 15,
        height: 15,
        margin: 1.7,
    },
}));

const generateOfficePreviewLink = (fileUrl) => {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
};

const generateGooglePreviewLink = (fileUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
};

const handlePreviewClick = (e, fileUrl) => {
    e.stopPropagation();
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    let previewLink;
    if (fileExtension === 'pdf') {
        previewLink = generateGooglePreviewLink(fileUrl);
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
        previewLink = generateOfficePreviewLink(fileUrl);
    } else {
        alert('Preview not available for this file type.');
        return;
    }
    window.open(previewLink, '_blank');
};



const EditScrapProduct = ({ code, onUpdate }) => {
    const today = new Date().toISOString().split('T')[0];
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [viewProducts, setViewProducts] = useState(false)
    const [addProducts, setAddProducts] = useState(true)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const scrapImage1Ref = useRef(null);
    const scrapImage2Ref = useRef(null);
    const scrapImage3Ref = useRef(null);
    const scrapImage4Ref = useRef(null);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [showBankForm, setShowBankForm] = useState(false);
    const [recipientName, setRecipientName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [singleVendor, setSingleVendor] = useState(true)
    const [isZoomed, setIsZoomed] = useState(false);
    const [isZoomed1, setIsZoomed1] = useState(false);
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [toInputBox, setToInputBox] = useState(false)
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const handleSwitchInputBox = (event) => {
        setToInputBox(!toInputBox)
    };

    const [formData, setFormData] = useState({
        systemDate: today,
        scrapCode: "SYSTEM GENERATED",
        titleName: '',
        category: "",
        condition: "",
        prices: "",
        material: "",
        availableQty: "",
        weight: "",
        description: "",
        sellerNote: "",
        scrapImage1: "",
        scrapImage2: "",
        scrapImage3: "",
        scrapImage4: "",
        state: "",
        city: "",
        latitude: "",
        longitude: "",
        shippingOption: "",
        shippingRate: '',
        shippingDestination: ""
    })

    const [IsReadOnly, setIsReadOnly] = useState(true)

    const [isscrapImage1ModalOpen, setIsscrapImage1ModalOpen] = useState(false);
    const openscrapImage1Modal = () => {
        setIsscrapImage1ModalOpen(true);
    };
    const closescrapImage1Modal = () => {
        setIsscrapImage1ModalOpen(false);
    };

    const [isscrapImage2ModalOpen, setIsscrapImage2ModalOpen] = useState(false);
    const openscrapImage2Modal = () => {
        setIsscrapImage2ModalOpen(true);
    };
    const closescrapImage2Modal = () => {
        setIsscrapImage2ModalOpen(false);
    };
    const [isscrapImage3ModalOpen, setIsscrapImage3ModalOpen] = useState(false);
    const openscrapImage3Modal = () => {
        setIsscrapImage3ModalOpen(true);
    };
    const closescrapImage3Modal = () => {
        setIsscrapImage3ModalOpen(false);
    };
    const [isscrapImage4ModalOpen, setIsscrapImag4ModalOpen] = useState(false);
    const openscrapImage4Modal = () => {
        setIsscrapImag4ModalOpen(true);
    };
    const closescrapImage4Modal = () => {
        setIsscrapImag4ModalOpen(false);
    };

    useEffect(() => {
        getDataById();
    }, [])

    useEffect(() => {
        loadStates();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    console.log("userIIIIIID", userId);

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error('Error loading states:', error);
                setIsLoadingStates(false);
            });
    }
    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Error loading cities:', error);
                setIsLoadingCities(false);
            });
    };

    console.log("FORMDATA908", formData)
    const fullAddress = ` ${formData.city}, ${formData.state}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(fullAddress)}`;

    useEffect(() => {
        const getLonLat = async () => {
            try {
                console.log("fulladdress", fullAddress)
                const response = await axios.get(url);
                console.log("response latitude", response.data)
                const location = response.data[0];
                setLatitude(location.lat);
                setLongitude(location.lon);
                setFormData(prevState => ({
                    ...prevState,
                    latitude: location.lat,
                    longitude: location.lon
                }))
                console.log(`ANMOL Latitudehere: ${location.lat}, Longitudehere: ${location.lon}`)
                setLocation(` Latitude: ${location.lat}, Longitude: ${location.lon}`);
            } catch (error) {
                // setLocation("An error occurred while fetching the coordinates.");
            }
        }
        getLonLat()
    }, [fullAddress])

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setLocation("Geolocation is not supported by this browser.");
        }
    };
    const showPosition = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`Latitude: ${lat}, Longitude: ${lon}`);
        setLatitude(lat);
        setLongitude(lon);
        setFormData({
            ...formData,

        })
    };
    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setLocation("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setLocation("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setLocation("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setLocation("An unknown error occurred.");
                break;
        }
    };


    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    scrapImage1: scrapImage1Ref,
                    scrapImage2: scrapImage2Ref,
                    scrapImage3: scrapImage3Ref,
                    scrapImage4: scrapImage4Ref
                };

                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }

                setFormData(prevState => ({
                    ...prevState,
                    [name]: null // Reset the file state
                }));
                return;
            }
            console.log("this is great ", files[0])
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else if (["prices", "availableQty"].includes(name)) {
            const validValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 9);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (name === 'state') {
            loadCities(value);
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
        else if (["vendorPhone", "contactPersonNum", "contactPersonNum2"].includes(name)) {
            let validValue = value.replace(/\D/g, ''); // Remove non-digit characters
            if (validValue && validValue[0].match(/[6-9]/)) {
                validValue = validValue.slice(0, 10); // Only keep up to 10 digits if it starts with 6-9
            } else {
                validValue = ''; // Return an empty string if the first digit isn't between 6-9
            }

            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (["pincode", "rate"].includes(name)) {
            const validValue = value.replace(/\D/g, '').slice(0, 6);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (name === "adharNo") {
            const validValue = value.replace(/\D/g, '').slice(0, 12);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (name === "email") {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        else if (name === "city" || name === "vendorType") {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
        else {
            const capitalizedValue = value
                .split(' ')
                .map(word => word.toUpperCase())
                .join(' ');

            setFormData(prevState => ({
                ...prevState,
                [name]: capitalizedValue
            }));
        }
    };
    console.log("FORMDATA123456789", formData)

    const getDataById = async () => {
        const response = await axios.get(`${backendUrl}/api/scrapProductByIdUser/${userId}/${code}`);
        const fetchedData = response.data.data;
        console.log("fetchedData", fetchedData)
        setData(fetchedData[0]);
        // setCurrentItems(formattedData);
    };



    useEffect(() => {
        if (data) {
            setFormData(prevFormData => ({
                ...prevFormData,
                titleName: data.titleName,
                category: data.category,
                condition: data.condition,
                prices: data.prices,
                material: data.material,
                availableQty: data.availableQty,
                weight: data.weight,
                description: data.description,
                sellerNote: data.sellerNote,
                scrapImage1: data.scrapImage1,
                scrapImage2: data.scrapImage2,
                scrapImage3: data.scrapImage3,
                scrapImage4: data.scrapImage4,
                state: data.state,
                city: data.city,
                latitude: data.latitude,
                longitude: data.longitude,
                shippingOption: data.shippingOption,
                shippingDestination: data.shippingDestination,
                shippingRate: data.shippingRate,
                description: data.description,
            }));
        }
        console.log("dataingdsf")
    }, [data])

    console.log("DREEFSSDFSDFSDF")
    console.log("data.titleName", data.titleName)
    console.log("formData1234567890", formData)


    const validateForm = () => {
        for (const [key, value] of Object.entries(formData)) {
            if ((key !== "scrapImage2" && key !== "scrapImage3" && key !== "scrapImage4") && value === '') {
                return `Field '${key}' is required.`;
            }
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let sendData = {};
        console.log("formdata", formData)
        const validationMessage = validateForm();
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsLoading(false);
            return;
        }
        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }
        for (const key in sendData) {
            if (sendData[key]) formDataObj.append(key, sendData[key]);
        }

        for (let pair of formDataObj.entries()) {
            console.log(pair[0] + ":" + pair[1])
        }


        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/scrapProductEdit/${userId}/${data.scrapCode}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

            setFormData({});
            sendData = {};

            setTimeout(() => {
                onUpdate();
            }, 2000);

        } catch (error) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        }

        // Handle form submission logic here
    };

    const handleBack = () => {
        onUpdate();
    }

    return (
        <div>
            <section >
                <div className="col-12" style={{ background: "" }}>
                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                        <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h3 className="bigtitle" style={{ textDecoration: "underline" }}>
                            Edit Scrap Product <img style={{ width: '50px' }} src={addProduct} alt="product" />
                        </h3>
                       

                        <form className='Customer-master-form'>

                            <div className='form-row'>
                                <label className="form-field input-group mb-3">
                                    System Date:
                                    <input
                                        type="date"
                                        name="systemDate"
                                        value={formData.systemDate}
                                        onChange={handleChange}
                                        readOnly
                                        className="form-control"
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Title Name:
                                    <input
                                        type="text"
                                        readOnly={IsReadOnly}
                                        name="titleName"
                                        placeholder='Title Name'
                                        value={formData.titleName}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Category:
                                    <input
                                        type="text"
                                        readOnly={IsReadOnly}
                                        name="category"
                                        placeholder='category'
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Condition:
                                    <input
                                        type="text"
                                        readOnly={IsReadOnly}
                                        name="condition"
                                        placeholder='condition'
                                        value={formData.condition}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                            </div>
                            <div className='form-row'>
                                <label className="form-field input-group mb-3">
                                    Price:
                                    <input
                                        type="number"
                                        readOnly={IsReadOnly}
                                        name="prices"
                                        value={formData.prices}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Material:
                                    <input
                                        type="text"
                                        readOnly={IsReadOnly}
                                        name="material"
                                        placeholder='material'
                                        value={formData.material}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Available Quantity:
                                    <input
                                        type="number"
                                        readOnly={IsReadOnly}
                                        name="availableQty"
                                        placeholder='available Quantity'
                                        value={formData.availableQty}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Weight:
                                    <input
                                        type="number"
                                        readOnly={IsReadOnly}
                                        name="weight"
                                        placeholder='weight'
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>


                            </div>
                            <div className='form-row'>

                                <label className="form-field">
                                    Place -State:
                                    <select
                                        name="state"
                                        onChange={handleChange}
                                        disabled={IsReadOnly || isLoadingStates}
                                        value={formData.state}>
                                        <option value="">Select State</option>
                                        {states.map(state => (
                                            <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                        ))}
                                    </select>
                                </label>

                                {!toInputBox && (
                                    <label className="form-field">
                                        <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                                            <span style={{ marginRight: '10px' }}> City:{formData.city}</span>
                                            <div className="switch-container">
                                                <FormControlLabel
                                                    control={<Android12Switch defaultChecked />}
                                                    checked={singleVendor}
                                                    onChange={handleSwitchInputBox}
                                                    label="" // You can add a label here if needed
                                                />
                                            </div>
                                        </div>


                                        <select
                                            name="city"
                                            value={formData.city} // This should match city.iso2
                                            onChange={handleChange}
                                            disabled={isLoadingCities || !formData.state}
                                        >
                                            <option value="">Select Location</option>
                                            {!cities.error && cities.map(city => {
                                                console.log('Rendering city:', city.iso2, city.name); // Debug: Check city values
                                                return (
                                                    <option key={city.iso2} value={city.iso2}>
                                                        {city.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </label>)}

                                {toInputBox && (
                                    <label className="form-field">
                                        {/* Vendor Place - City: */}
                                        <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                                            <span style={{ marginRight: '10px' }}>City (manual):</span>
                                            <div className="switch-container">
                                                <FormControlLabel
                                                    control={<Android12Switch defaultChecked />}
                                                    checked={singleVendor}
                                                    onChange={handleSwitchInputBox}
                                                    label="" // You can add a label here if needed
                                                />
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder='city'
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="form-control"
                                            readOnly={formData.state === "" || IsReadOnly}
                                            required
                                        />
                                    </label>
                                )}

                                <label className="form-field">
                                    Description:
                                    <textarea
                                        readOnly={IsReadOnly}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </label>
                                <label className="form-field">
                                    Seller Note:
                                    <textarea
                                        readOnly={IsReadOnly}
                                        name="sellerNote"
                                        value={formData.sellerNote}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </label>
                            </div>
                            <div className="form-row">
                                <label className="form-field">
                                    Scrap Image 1:
                                    {IsReadOnly ? (
                                        formData.scrapImage1 && formData.scrapImage1 !== "not uploaded" ? (
                                            formData.scrapImage1.endsWith(".jpg") ||
                                                formData.scrapImage1.endsWith(".jpeg") ||
                                                formData.scrapImage1.endsWith(".webp") ||
                                                formData.scrapImage1.endsWith(".jfif") ||
                                                formData.scrapImage1.endsWith(".png") ||
                                                formData.scrapImage1.endsWith(".gif") ||
                                                formData.scrapImage1.endsWith(".bmp") ||
                                                formData.scrapImage1.endsWith(".tiff") ||
                                                formData.scrapImage1.endsWith(".svg") ? (
                                                <>
                                                    <img
                                                        src={formData.scrapImage1}
                                                        alt="PAN Card"
                                                        style={{
                                                            maxWidth: '100px',
                                                            display: 'block',
                                                            cursor: 'pointer',
                                                            border: 'solid black 2px',
                                                            padding: '3px',
                                                            marginTop: '6px'
                                                        }}
                                                        onClick={openscrapImage1Modal}
                                                    />
                                                    <Modal isOpen={isscrapImage1ModalOpen} onRequestClose={closescrapImage1Modal} contentLabel="PAN Card Modal">
                                                        <div className="modal-header">
                                                            <IconButton href={formData.scrapImage1} download color="primary">
                                                                <DownloadIcon />
                                                            </IconButton>
                                                            <IconButton onClick={closescrapImage1Modal} color="secondary">
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>
                                                        <div className="modal-image-container">
                                                            <img src={formData.scrapImage1} alt="PAN Card" style={{ width: '100%' }} />
                                                        </div>
                                                    </Modal>
                                                </>
                                            ) : (
                                                <>
                                                    <p>
                                                        <a
                                                            href={formData.scrapImage1}
                                                            className="docx-link"
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: 'green'
                                                            }}
                                                            download
                                                        >
                                                            <DownloadingOutlinedIcon /> Download
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handlePreviewClick(e, formData.scrapImage1)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                border: 'none',
                                                                background: 'white',
                                                                color: '#560303',
                                                                fontSize: '13px',
                                                                boxShadow: 'none'
                                                            }}
                                                        >
                                                            <RemoveRedEyeOutlinedIcon /> Preview
                                                        </button>
                                                    </p>
                                                </>
                                            )
                                        ) : (
                                            <p className='notUploaded'>Not Uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            name="scrapImage1"
                                            onChange={handleChange}
                                            readOnly={IsReadOnly}
                                            accept="image/*"
                                            ref={scrapImage1Ref}
                                            required
                                            className="form-control"
                                        />
                                    )}
                                </label>
                                <label className="form-field">
                                    Scrap Image 2:
                                    {IsReadOnly ? (
                                        formData.scrapImage2 && formData.scrapImage2 !== "not uploaded" ? (
                                            formData.scrapImage2.endsWith(".jpg") ||
                                                formData.scrapImage2.endsWith(".jpeg") ||
                                                formData.scrapImage2.endsWith(".webp") ||
                                                formData.scrapImage2.endsWith(".jfif") ||
                                                formData.scrapImage2.endsWith(".png") ||
                                                formData.scrapImage2.endsWith(".gif") ||
                                                formData.scrapImage2.endsWith(".bmp") ||
                                                formData.scrapImage2.endsWith(".tiff") ||
                                                formData.scrapImage2.endsWith(".svg") ? (
                                                <>
                                                    <img
                                                        src={formData.scrapImage2}
                                                        alt="PAN Card"
                                                        style={{
                                                            maxWidth: '100px',
                                                            display: 'block',
                                                            cursor: 'pointer',
                                                            border: 'solid black 2px',
                                                            padding: '3px',
                                                            marginTop: '6px'
                                                        }}
                                                        onClick={openscrapImage2Modal}
                                                    />
                                                    <Modal isOpen={isscrapImage2ModalOpen} onRequestClose={closescrapImage2Modal} contentLabel="PAN Card Modal">
                                                        <div className="modal-header">
                                                            <IconButton href={formData.scrapImage2} download color="primary">
                                                                <DownloadIcon />
                                                            </IconButton>
                                                            <IconButton onClick={closescrapImage2Modal} color="secondary">
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>
                                                        <div className="modal-image-container">
                                                            <img src={formData.scrapImage2} alt="PAN Card" style={{ width: '100%' }} />
                                                        </div>
                                                    </Modal>
                                                </>
                                            ) : (
                                                <>
                                                    <p>
                                                        <a
                                                            href={formData.scrapImage2}
                                                            className="docx-link"
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: 'green'
                                                            }}
                                                            download
                                                        >
                                                            <DownloadingOutlinedIcon /> Download
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handlePreviewClick(e, formData.scrapImage2)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                border: 'none',
                                                                background: 'white',
                                                                color: '#560303',
                                                                fontSize: '13px',
                                                                boxShadow: 'none'
                                                            }}
                                                        >
                                                            <RemoveRedEyeOutlinedIcon /> Preview
                                                        </button>
                                                    </p>
                                                </>
                                            )
                                        ) : (
                                            <p className='notUploaded'>Not Uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            name="scrapImage2"
                                            onChange={handleChange}
                                            readOnly={IsReadOnly}
                                            accept="image/*"
                                            ref={scrapImage2Ref}
                                            required
                                            className="form-control"
                                        />
                                    )}
                                </label>
                                <label className="form-field">
                                    Scrap Image 3:
                                    {IsReadOnly ? (
                                        formData.scrapImage3 && formData.scrapImage3 !== "not uploaded" ? (
                                            formData.scrapImage3.endsWith(".jpg") ||
                                                formData.scrapImage3.endsWith(".jpeg") ||
                                                formData.scrapImage3.endsWith(".webp") ||
                                                formData.scrapImage3.endsWith(".jfif") ||
                                                formData.scrapImage3.endsWith(".png") ||
                                                formData.scrapImage3.endsWith(".gif") ||
                                                formData.scrapImage3.endsWith(".bmp") ||
                                                formData.scrapImage3.endsWith(".tiff") ||
                                                formData.scrapImage3.endsWith(".svg") ? (
                                                <>
                                                    <img
                                                        src={formData.scrapImage3}
                                                        alt="PAN Card"
                                                        style={{
                                                            maxWidth: '100px',
                                                            display: 'block',
                                                            cursor: 'pointer',
                                                            border: 'solid black 2px',
                                                            padding: '3px',
                                                            marginTop: '6px'
                                                        }}
                                                        onClick={openscrapImage3Modal}
                                                    />
                                                    <Modal isOpen={isscrapImage3ModalOpen} onRequestClose={closescrapImage3Modal} contentLabel="PAN Card Modal">
                                                        <div className="modal-header">
                                                            <IconButton href={formData.scrapImage3} download color="primary">
                                                                <DownloadIcon />
                                                            </IconButton>
                                                            <IconButton onClick={closescrapImage3Modal} color="secondary">
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>
                                                        <div className="modal-image-container">
                                                            <img src={formData.scrapImage3} alt="PAN Card" style={{ width: '100%' }} />
                                                        </div>
                                                    </Modal>
                                                </>
                                            ) : (
                                                <>
                                                    <p>
                                                        <a
                                                            href={formData.scrapImage3}
                                                            className="docx-link"
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: 'green'
                                                            }}
                                                            download
                                                        >
                                                            <DownloadingOutlinedIcon /> Download
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handlePreviewClick(e, formData.scrapImage3)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                border: 'none',
                                                                background: 'white',
                                                                color: '#560303',
                                                                fontSize: '13px',
                                                                boxShadow: 'none'
                                                            }}
                                                        >
                                                            <RemoveRedEyeOutlinedIcon /> Preview
                                                        </button>
                                                    </p>
                                                </>
                                            )
                                        ) : (
                                            <p className='notUploaded'>Not Uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            name="scrapImage3"
                                            onChange={handleChange}
                                            readOnly={IsReadOnly}
                                            accept="image/*"
                                            ref={scrapImage3Ref}
                                            required
                                            className="form-control"
                                        />
                                    )}
                                </label>
                                <label className="form-field">
                                    Scrap Image 4:
                                    {IsReadOnly ? (
                                        formData.scrapImage4 && formData.scrapImage4 !== "not uploaded" ? (
                                            formData.scrapImage4.endsWith(".jpg") ||
                                                formData.scrapImage4.endsWith(".jpeg") ||
                                                formData.scrapImage4.endsWith(".webp") ||
                                                formData.scrapImage4.endsWith(".jfif") ||
                                                formData.scrapImage4.endsWith(".png") ||
                                                formData.scrapImage4.endsWith(".gif") ||
                                                formData.scrapImage4.endsWith(".bmp") ||
                                                formData.scrapImage4.endsWith(".tiff") ||
                                                formData.scrapImage4.endsWith(".svg") ? (
                                                <>
                                                    <img
                                                        src={formData.scrapImage4}
                                                        alt="PAN Card"
                                                        style={{
                                                            maxWidth: '100px',
                                                            display: 'block',
                                                            cursor: 'pointer',
                                                            border: 'solid black 2px',
                                                            padding: '3px',
                                                            marginTop: '6px'
                                                        }}
                                                        onClick={openscrapImage4Modal}
                                                    />
                                                    <Modal isOpen={isscrapImage4ModalOpen} onRequestClose={closescrapImage4Modal} contentLabel="PAN Card Modal">
                                                        <div className="modal-header">
                                                            <IconButton href={formData.scrapImage4} download color="primary">
                                                                <DownloadIcon />
                                                            </IconButton>
                                                            <IconButton onClick={closescrapImage4Modal} color="secondary">
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>
                                                        <div className="modal-image-container">
                                                            <img src={formData.scrapImage4} alt="PAN Card" style={{ width: '100%' }} />
                                                        </div>
                                                    </Modal>
                                                </>
                                            ) : (
                                                <>
                                                    <p>
                                                        <a
                                                            href={formData.scrapImage4}
                                                            className="docx-link"
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: 'green'
                                                            }}
                                                            download
                                                        >
                                                            <DownloadingOutlinedIcon /> Download
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handlePreviewClick(e, formData.scrapImage4)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                border: 'none',
                                                                background: 'white',
                                                                color: '#560303',
                                                                fontSize: '13px',
                                                                boxShadow: 'none'
                                                            }}
                                                        >
                                                            <RemoveRedEyeOutlinedIcon /> Preview
                                                        </button>
                                                    </p>
                                                </>
                                            )
                                        ) : (
                                            <p className='notUploaded'>Not Uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            name="scrapImage3"
                                            onChange={handleChange}
                                            readOnly={IsReadOnly}
                                            accept="image/*"
                                            ref={scrapImage3Ref}
                                            required
                                            className="form-control"
                                        />
                                    )}
                                </label>
                            </div>

                        </form>



                        <form className='Customer-master-form'>

                        <label className='form-field'>
                                {IsReadOnly ? (
                                    formData.longitude == "" ? (
                                        <p className='notUploaded'>No Location Uploaded</p>
                                    ) : (
                                        <div>
                                            {/* <Button variant="contained">Send Location</Button> */}
                                            <>
                                                <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }}>
                                                    <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>

                                                    Send Location Of Address (this is by your address):
                                                    <div className='form-row'>
                                                        <label className='form-field'>
                                                            Latitude:
                                                            <input type="text" name="latitude" readOnly={IsReadOnly} value={formData.latitude} onChange={handleChange} />
                                                        </label>
                                                        <label className='form-field'>
                                                            Longitude:
                                                            <input type="text" name="longitude" readOnly={IsReadOnly} value={formData.longitude} onChange={handleChange} />
                                                        </label>
                                                        <label className='form-field'></label>
                                                    </div>
                                                </form>
                                            </>
                                        </div>


                                    )
                                ) : (
                                    <>
                                        <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }}>
                                            <h1 style={{ fontWeight: 'bold', fontSize: "25px", marginBottom: "20px" }}>Location</h1>
                                            <p> Send Your Current Location (if it's same for filling address):</p>
                                            <div className='form-row'>
                                                <Button variant="contained" onClick={getLocation}>Send Location</Button>
                                            </div>

                                            <p>  Send Location Of Address (this is by your address):</p>
                                            <div className='form-row'>
                                                <label className='form-field'>
                                                    Latitude:
                                                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
                                                </label>
                                                <label className='form-field'>
                                                    Longitude:
                                                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
                                                </label>
                                                <label className='form-field'></label>
                                            </div>
                                            {typeof location === 'string' && location && (
                                                location.startsWith("Error:") ?
                                                    <Alert severity="error">{location}</Alert> :
                                                    <Alert severity="success">{location}</Alert>
                                            )}
                                        </form>
                                    </>
                                )}
                            </label>
                            <div class="header-container">
                                <h3 class="bigtitle">Shipping Details</h3>
                            </div>
                            <div className='form-row'>
                                <label className="form-field input-group mb-3">
                                    Shipping Rate :
                                    <input
                                        type="number"
                                        readOnly={IsReadOnly}
                                        name="shippingRate"
                                        placeholder='Shipping Rate'
                                        value={formData.shippingRate}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Shipping Destination:
                                    <input
                                        type="text"
                                        readOnly={IsReadOnly}
                                        name="shippingDestination"
                                        placeholder='Shipping Destination'
                                        value={formData.shippingDestination}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3">
                                    Shipping Option:
                                    <input
                                        type="text"
                                        readOnly={IsReadOnly}
                                        name="shippingOption"
                                        placeholder='Shipping Option'
                                        value={formData.shippingOption}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </label>
                                <label className="form-field input-group mb-3"></label>
                            </div>
                        </form>



                        {alertInfo.show && (
                            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                            </Alert>
                        )}

                        {IsReadOnly && (<button
                            className="btn btn-dark mt-5 mx-auto d-block"
                            // type="submit"
                            onClick={() => setIsReadOnly(false)}
                        >
                            Edit Product
                        </button>)}

                        {!IsReadOnly && (<button
                            className="btn btn-dark mt-5 mx-auto d-block"
                            // type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>)}
                    </form>
                </div>
            </section>
        </div>
    )
}
export default EditScrapProduct;