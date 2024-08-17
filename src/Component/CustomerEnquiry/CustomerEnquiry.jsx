import React, { useState, useEffect, useRef } from 'react';
import '../VenderMaster/VendorMasterForm.css';
import "../CustomerMaster/CustomerMaster.css";
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
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';

const CustomerEnquiry = () => {

    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [addCustomerEnquiry, setAddCustomerEnquiry] = useState(false)
    const [editCustomerEnquiry, setEditCustomerEnquiry] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [showTable, setShowTable] = useState(true)
    const [data, setData] = useState([]);
    const [comingData, setComingData] = useState([]);
    const [width, setWidth] = useState('100%');
    const [customerEnquiryId, setCustomerEnquiryId]= useState(null)

    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        getCustomerEnquiry();
    }, [token, userId, navigate]);
    console.log("userIIIIIID", userId);

    useEffect(() => {
        if (alertInfo.show) {
            const timer = setTimeout(() => {
                setAlertInfo({ ...alertInfo, show: false });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alertInfo]);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const handleSetItemPerPage = (e) => {
        setItemsPerPage(e.target.value);
    };
    const filteredData = data.filter(item =>
        item.customerName && item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const [formData, setFormData] = useState({
        customerName: '',
        fleetSize: '',
        vehiclesUnderAccident: '',
        spendForCrane: '',
        pendingClaims: '',
        accidentRatio: '',
        repairLocations: '',
        majorClients: '',
        route: '',
        operationMode: '',
        numberOfDrivers: '',
        oemName: '',
        bodyType: '',
        brokerName: '',
        insuranceType: '',
        repairHead: '',
        repairHeadEmail: '',
        ho: '',
        hoContactPerson: ''
    });

    const [editedFormData, setEditedFormData] = useState({
        customerName: '',
        fleetSize: '',
        vehiclesUnderAccident: '',
        spendForCrane: '',
        pendingClaims: '',
        accidentRatio: '',
        repairLocations: '',
        majorClients: '',
        route: '',
        operationMode: '',
        numberOfDrivers: '',
        oemName: '',
        bodyType: '',
        brokerName: '',
        insuranceType: '',
        repairHead: '',
        repairHeadEmail: '',
        ho: '',
        hoContactPerson: ''
    })

    useEffect(()=>{
        if(comingData) {
            setEditedFormData({
            customerName: comingData.customerName || '',
            fleetSize: comingData.fleetSize || '',
            vehiclesUnderAccident: comingData.vehiclesUnderAccident || '',
            spendForCrane: comingData.spendForCrane || '',
            pendingClaims: comingData.pendingClaims || '',
            accidentRatio: comingData.accidentRatio || '',
            repairLocations: comingData.repairLocations || '',
            majorClients: comingData.majorClients || '',
            route: comingData.route || '',
            operationMode: comingData.operationMode || '',
            numberOfDrivers: comingData.numberOfDrivers || '',
            oemName: comingData.oemName || '',
            bodyType: comingData.bodyType || '',
            brokerName: comingData.brokerName || '',
            insuranceType: comingData.insuranceType || '',
            repairHead: comingData.repairHead || '',
            repairHeadEmail: comingData.repairHeadEmail || '',
            ho: comingData.ho || '',
            hoContactPerson: comingData.hoContactPerson || ''
        });
    }
    }, [comingData])


    const [errors, setErrors] = useState({
        customerName: '',
        fleetSize: '',
        vehiclesUnderAccident: '',
        spendForCrane: '',
        pendingClaims: '',
        accidentRatio: '',
        repairLocations: '',
        majorClients: '',
        route: '',
        operationMode: '',
        numberOfDrivers: '',
        oemName: '',
        bodyType: '',
        brokerName: '',
        insuranceType: '',
        repairHead: '',
        repairHeadEmail: '',
        ho: '',
        hoContactPerson: ''
    });

    const getCustomerEnquiry = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getCustomerEnquiry`);
            setData(response.data.data)
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = 'An error occurred';
        }
    }

    const [marginLeft, setMarginLeft] = useState('20px');
    const [paddingLeft, setPaddingLeft] = useState('20px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 630) {
                setMarginLeft('0px');
                setPaddingLeft('10px')
            }
            else{
                setMarginLeft('20px');
                setPaddingLeft('20px')
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const add = () => {
        setAddCustomerEnquiry(true)
        setEditCustomerEnquiry(false)
        setShowTable(false)
        setFormData({
            customerName: '',
            fleetSize: '',
            vehiclesUnderAccident: '',
            spendForCrane: '',
            pendingClaims: '',
            accidentRatio: '',
            repairLocations: '',
            majorClients: '',
            route: '',
            operationMode: '',
            numberOfDrivers: '',
            oemName: '',
            bodyType: '',
            brokerName: '',
            insuranceType: '',
            repairHead: '',
            repairHeadEmail: '',
            ho: '',
            hoContactPerson: ''
        });
    }

    const view = async (id) => {
        console.log("VIEW", id)
        setCustomerEnquiryId(id);
        const response = await axios.get(`${backendUrl}/api/getCustomerEnquiryById/${id}`);
        console.log("daa", response.data.data)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
        setAddCustomerEnquiry(false)
        setEditCustomerEnquiry(true)
        setShowTable(false)
        setIsEditing(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };

        if (['fleetSize', 'vehiclesUnderAccident', 'spendForCrane', 'pendingClaims', 'accidentRatio', 'numberOfDrivers'].includes(name)) {
            if (isNaN(value)) {
                newErrors[name] = 'This field must be a number';
            } else {
                newErrors[name] = '';
            }
        } else if (name === 'repairHeadEmail') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                newErrors[name] = 'Please enter a valid email address';
            } else {
                newErrors[name] = '';
            }
        } else if (name === 'hoContactPerson') {
            if (!/^\d{10}$/.test(value)) {
                newErrors[name] = 'Phone number must be exactly 10 digits';
            } else {
                newErrors[name] = '';
            }
        } else if (value.trim() === '') {
            newErrors[name] = 'This field is required in Form';
        } else {
            newErrors[name] = '';
        }

        setErrors(newErrors);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const EditHandleChange = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };

        if (['fleetSize', 'vehiclesUnderAccident', 'spendForCrane', 'pendingClaims', 'accidentRatio', 'numberOfDrivers'].includes(name)) {
            if (isNaN(value)) {
                newErrors[name] = 'This field must be a number';
            } else {
                newErrors[name] = '';
            }
        } else if (name === 'repairHeadEmail') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                newErrors[name] = 'Please enter a valid email address';
            } else {
                newErrors[name] = '';
            }
        } else if (name === 'hoContactPerson') {
            if (!/^\d{10}$/.test(value)) {
                newErrors[name] = 'Phone number must be exactly 10 digits';
            } else {
                newErrors[name] = '';
            }
        } else if (value.trim() === '') {
            newErrors[name] = 'This field is required while Editing';
        } else {
            newErrors[name] = '';
        }

        setErrors(newErrors);
        setEditedFormData({
            ...editedFormData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = { ...errors };

        Object.keys(formData).forEach((key) => {
            if (['fleetSize', 'vehiclesUnderAccident', 'spendForCrane', 'pendingClaims', 'accidentRatio', 'numberOfDrivers'].includes(key) && isNaN(formData[key])) {
                newErrors[key] = 'This field must be a number';
            }
            if (key === 'repairHeadEmail' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData[key])) {
                newErrors[key] = 'Please enter a valid email address';
            }
            if (key === 'hoContactPerson' && !/^\d{10}$/.test(formData[key])) {
                newErrors[key] = 'Phone number must be exactly 10 digits';
            }
            if (formData[key].trim() === '') {
                newErrors[key] = 'This field is required in form';
            }
        });

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const EditValidateForm = () => {
        const newErrors = { ...errors };

        Object.keys(editedFormData).forEach((key) => {
            if (['fleetSize', 'vehiclesUnderAccident', 'spendForCrane', 'pendingClaims', 'accidentRatio', 'numberOfDrivers'].includes(key) && isNaN(editedFormData[key])) {
                newErrors[key] = 'This field must be a number';
            }
            if (key === 'repairHeadEmail' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(editedFormData[key])) {
                newErrors[key] = 'Please enter a valid email address';
            }
            if (key === 'hoContactPerson' && !/^\d{10}$/.test(editedFormData[key])) {
                newErrors[key] = 'Phone number must be exactly 10 digits';
            }
            if (editedFormData[key].trim() === '') {
                newErrors[key] = 'This field is required';
            }
        });

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            setAlertInfo({ show: true, message: 'Please fix the errors in the form.', severity: 'error' });
            setIsLoading(false);
            return;
        }

        console.log('Form data submitted:', formData);
        setAlertInfo({ ...alertInfo, show: false });

        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/customerEnquiry/${userId}`,
                data: formData,
                headers: {
                    'Authorization': token
                }
            });
            console.log("response", response.data);
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
            setTimeout(() => {
                getCustomerEnquiry();
                setAddCustomerEnquiry(false)
                setEditCustomerEnquiry(false)
                setShowTable(true)
            }, 2000);
        } catch (error) {
            console.error("Error during form submission:", error);
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
    }
    console.log("edintefor", editedFormData)

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!EditValidateForm()) {
            setAlertInfo({ show: true, message: 'Please fix the errors in the form.', severity: 'error' });
            setIsLoading(false);
            return;
        }

        console.log('Form data submitted:', editedFormData);
        setAlertInfo({ ...alertInfo, show: false });

        try {
            const response = await axios({
                method: 'PUT',
                url: `${backendUrl}/api/updateCustomerEnquiry/${userId}/${customerEnquiryId}`,
                data: editedFormData,
                headers: {
                    'Authorization': token
                }
            });
            console.log("response", response.data);
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
            setTimeout(() => {
                getCustomerEnquiry();
                setAddCustomerEnquiry(false)
                setEditCustomerEnquiry(false)
                setShowTable(true)
            }, 2000);
        } catch (error) {
            console.error("Error during form submission:", error);
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
    }

    const handleBack = () => {
        getCustomerEnquiry();
        setAddCustomerEnquiry(false)
        setEditCustomerEnquiry(false)
        setShowTable(true)
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    return (

        <div>
            <Helmet>
                <title>Customer Enquiry - Claimpro</title>
                <meta name="description" content="Customer Enquiry for further collaboration with our partners." />
                <meta name="keywords" content="Customer Enquiry, Information, data, Vehicle Accidents, vendor, vendor Information, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/VendorMaster`} />
            </Helmet>
            {addCustomerEnquiry && (
                <form onSubmit={handleSubmit} className="Customer-master-form">


                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                        <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                        <div class='header-container'>
                            <h3 class="bigtitle">Customer Enquiry</h3>
                            <span class="mandatory-note">All fields are mandatory</span>
                        </div>
                    </div>
                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Customer Name:
                            <input
                                type="text"
                                name="customerName"
                                placeholder='Customer Name'
                                value={formData.customerName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Fleet size:
                            <input
                                type="text"
                                name="fleetSize"
                                placeholder='Fleet size'
                                value={formData.fleetSize}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.fleetSize && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.fleetSize}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            How many vehicles under accident & since dated:
                            <input
                                type="text"
                                name="vehiclesUnderAccident"
                                placeholder='How many vehicles are under accident & since dated'
                                value={formData.vehiclesUnderAccident}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.vehiclesUnderAccident && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.vehiclesUnderAccident}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            How much you spend in year for crane:
                            <input
                                type="text"
                                name="spendForCrane"
                                placeholder='How much you spend in year for crane'
                                value={formData.spendForCrane}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.spendForCrane && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.spendForCrane}</p>}
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            How much claims are pending in till date:
                            <input
                                type="text"
                                name="pendingClaims"
                                placeholder='How much claims are pending in till date'
                                value={formData.pendingClaims}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.pendingClaims && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.pendingClaims}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            The accident ratio:
                            <input
                                type="text"
                                name="accidentRatio"
                                placeholder='the accident ratio'
                                value={formData.accidentRatio}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.accidentRatio && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.accidentRatio}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            Base locations of repair:
                            <input
                                type="text"
                                name="repairLocations"
                                placeholder='Base locations of repair'
                                value={formData.repairLocations}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Major clients:
                            <input
                                type="text"
                                name="majorClients"
                                placeholder='Major clients'
                                value={formData.majorClients}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Route:
                            <input
                                type="text"
                                name="route"
                                placeholder='Route'
                                value={formData.route}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Mode of operation (express/normal) application:
                            <input
                                type="text"
                                name="operationMode"
                                placeholder='Mode of operation (express/normal) application'
                                value={formData.operationMode}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            No. Of drivers:
                            <input
                                type="text"
                                name="numberOfDrivers"
                                placeholder='No. Of drivers'
                                value={formData.numberOfDrivers}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.numberOfDrivers && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.numberOfDrivers}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            OEM name:
                            <input
                                type="text"
                                name="oemName"
                                placeholder='OEM name'
                                value={formData.oemName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Body type:
                            <input
                                type="text"
                                name="bodyType"
                                placeholder='Body type'
                                value={formData.bodyType}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Broker name:
                            <input
                                type="text"
                                name="brokerName"
                                placeholder='Broker name'
                                value={formData.brokerName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Insurance type:
                            <input
                                type="text"
                                name="insuranceType"
                                placeholder='Insurance type'
                                value={formData.insuranceType}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>

                        <label className="form-field input-group mb-3">
                            Accident Repair Head:
                            <input
                                type="text"
                                name="repairHead"
                                placeholder='Accident Repair Head'
                                value={formData.repairHead}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>


                    </div>

                    <div className='form-row'>

                        <label className="form-field input-group mb-3">
                            Accident Repair Head Email:
                            <input
                                type="text"
                                name="repairHeadEmail"
                                placeholder='Accident Email'
                                value={formData.repairHeadEmail}
                                onChange={handleChange}
                                className="form-control"
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                title="Please enter a valid email address."
                                required
                            />
                            {errors.repairHeadEmail && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.repairHeadEmail}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            HO:
                            <input
                                type="text"
                                name="ho"
                                placeholder='HO'
                                value={formData.ho}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            HO Contact Person:
                            <input
                                type="text"
                                name="hoContactPerson"
                                placeholder='HO Contact Person'
                                value={formData.hoContactPerson}
                                onChange={handleChange}
                                className="form-control"
                                pattern="\d{10}"
                                title="Phone number must be exactly 10 digits"
                                required
                            />
                            {errors.hoContactPerson && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.hoContactPerson}</p>}
                        </label>

                        <label className="form-field input-group mb-3"></label>
                        <label className="form-field input-group mb-3"></label>

                    </div>



                    {alertInfo.show && (
                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                            {alertInfo.message}
                        </Alert>
                    )}

                    <div style={{ textAlign: 'center' }}>
                        <button type="submit"
                            style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        {isLoading && (
                            <div style={{ marginTop: '10px' }}>
                                <ClipLoader color="#4CAF50" loading={isLoading} />
                                <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                            </div>
                        )}
                    </div>

                </form>
            )}

            {showTable && (
                <div className="Customer-master-form" style={{marginLeft, paddingLeft }}>
                    <div className="visitor-container">
                        <h3 className="bigtitle">Customer Enquiry</h3>
                        <button onClick={add} className="add-button">
                            Add New Visitor
                        </button>
                    </div>
                    <div className="form-search" style={{marginTop:"20px"}}>
                        <label className='label-class'>
                            Search by Customer Name
                            <input
                                type="text"
                                placeholder="Search by Customer Name"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                required
                            />
                        </label>
                        <label className='label-class'>
                            Number Of Items On Page
                            <input
                                type="number"
                                placeholder="Items Show on Page"
                                value={itemsPerPage}
                                onChange={handleSetItemPerPage}
                                required
                            />
                        </label>
                        <label className='label-class'></label>
                    </div>
                    <div>
                        <div style={{ marginTop: "50px" }}>
                            <div className='responsive-table' >
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                    <thead>
                                        <tr>
                                            <th>Sr. No</th>
                                            <th>Customer Name</th>
                                            <th>Fleet Size</th>
                                            <th>Repair Locations</th>
                                            <th>Major Clients</th>
                                            <th>Operation Mode</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Data...</td>
                                            </tr>
                                        ) : (
                                            currentItems.map((person, index) => (
                                                <tr key={person} >
                                                    <td>{indexOfFirstItem + index + 1}</td>
                                                    <td>{person.customerName || '---'}</td>
                                                    <td>{person.fleetSize || '---'}</td>
                                                    <td>{person.repairLocations || '---'}</td>
                                                    <td>{person.majorClients || '---'}</td>
                                                    <td>{person.operationMode || '---'}</td>

                                                    <td>
                                                        <div>
                                                            <button onClick={() => view(person.CustomerEnquiryCode)} className='view-button' >View</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination">
                                <ButtonGroup style={{boxShadow:'none'}} variant="contained" color="primary" aria-label="pagination buttons">
                                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        <ArrowBack />
                                    </Button>
                                    {pageNumbers.map((pageNumber) => (
                                        <Button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={currentPage === pageNumber ? 'active' : ''}
                                        >
                                            {pageNumber}
                                        </Button>
                                    ))}
                                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                        <ArrowForward />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>)}

            {editCustomerEnquiry && (
                <form onSubmit={handleEditSubmit} className="Customer-master-form">
                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                        <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                        <div class='header-container'>
                            <h3 class="bigtitle">Edit Customer Enquiry</h3>
                        </div>
                    </div>
                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Customer Name:
                            <input
                                type="text"
                                name="customerName"
                                placeholder='Customer Name'
                                value={editedFormData.customerName}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Fleet size:
                            <input
                                type="text"
                                name="fleetSize"
                                placeholder='Fleet size'
                                value={editedFormData.fleetSize}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.fleetSize && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.fleetSize}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            How many vehicles under accident & since dated:
                            <input
                                type="text"
                                name="vehiclesUnderAccident"
                                placeholder='How many vehicles are under accident & since dated'
                                value={editedFormData.vehiclesUnderAccident}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.vehiclesUnderAccident && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.vehiclesUnderAccident}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            How much you spend in year for crane:
                            <input
                                type="text"
                                name="spendForCrane"
                                placeholder='How much you spend in year for crane'
                                value={editedFormData.spendForCrane}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.spendForCrane && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.spendForCrane}</p>}
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            How much claims are pending in till date:
                            <input
                                type="text"
                                name="pendingClaims"
                                placeholder='How much claims are pending in till date'
                                value={editedFormData.pendingClaims}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.pendingClaims && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.pendingClaims}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            The accident ratio:
                            <input
                                type="text"
                                name="accidentRatio"
                                placeholder='the accident ratio'
                                value={editedFormData.accidentRatio}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.accidentRatio && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.accidentRatio}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            Base locations of repair:
                            <input
                                type="text"
                                name="repairLocations"
                                placeholder='Base locations of repair'
                                value={editedFormData.repairLocations}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Major clients:
                            <input
                                type="text"
                                name="majorClients"
                                placeholder='Major clients'
                                value={editedFormData.majorClients}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Route:
                            <input
                                type="text"
                                name="route"
                                placeholder='Route'
                                value={editedFormData.route}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Mode of operation (express/normal) application:
                            <input
                                type="text"
                                name="operationMode"
                                placeholder='Mode of operation (express/normal) application'
                                value={editedFormData.operationMode}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            No. Of drivers:
                            <input
                                type="text"
                                name="numberOfDrivers"
                                placeholder='No. Of drivers'
                                value={editedFormData.numberOfDrivers}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.numberOfDrivers && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.numberOfDrivers}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            OEM name:
                            <input
                                type="text"
                                name="oemName"
                                placeholder='OEM name'
                                value={editedFormData.oemName}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Body type:
                            <input
                                type="text"
                                name="bodyType"
                                placeholder='Body type'
                                value={editedFormData.bodyType}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Broker name:
                            <input
                                type="text"
                                name="brokerName"
                                placeholder='Broker name'
                                value={editedFormData.brokerName}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Insurance type:
                            <input
                                type="text"
                                name="insuranceType"
                                placeholder='Insurance type'
                                value={editedFormData.insuranceType}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>

                        <label className="form-field input-group mb-3">
                            Accident Repair Head:
                            <input
                                type="text"
                                name="repairHead"
                                placeholder='Accident Repair Head'
                                value={editedFormData.repairHead}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                    </div>

                    <div className='form-row'>
                        <label className="form-field input-group mb-3">
                            Accident Repair Head Email:
                            <input
                                type="text"
                                name="repairHeadEmail"
                                placeholder='Accident Email'
                                value={editedFormData.repairHeadEmail}
                                onChange={EditHandleChange}
                                className="form-control"
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                title="Please enter a valid email address."
                                required
                                readOnly={!isEditing}
                            />
                            {errors.repairHeadEmail && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.repairHeadEmail}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            HO:
                            <input
                                type="text"
                                name="ho"
                                placeholder='HO'
                                value={editedFormData.ho}
                                onChange={EditHandleChange}
                                className="form-control"
                                required
                                readOnly={!isEditing}
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            HO Contact Person:
                            <input
                                type="text"
                                name="hoContactPerson"
                                placeholder='HO Contact Person'
                                value={editedFormData.hoContactPerson}
                                onChange={EditHandleChange}
                                className="form-control"
                                pattern="\d{10}"
                                title="Phone number must be exactly 10 digits"
                                required
                                readOnly={!isEditing}
                            />
                            {errors.hoContactPerson && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.hoContactPerson}</p>}
                        </label>

                        <label className="form-field input-group mb-3"></label>
                        <label className="form-field input-group mb-3"></label>
                    </div>

                    {alertInfo.show && (
                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                            {alertInfo.message}
                        </Alert>
                    )}

<div style={{ textAlign: 'center' }}>
        {isEditing && (
            <div>
              <button type="submit"
                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                disabled={isLoading} // Disable button while loading
                onClick={handleEditSubmit}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
              {isLoading && (
                <div style={{ marginTop: '10px' }}>
                  <ClipLoader color="#4CAF50" loading={isLoading} />
                  <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                </div>
              )}
            </div>
          )}

          {!isEditing && (
            <button
              type="submit"
              style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
              onClick={toggleEditing}
            >
              EDIT
            </button>
          )}
        </div>
                </form>
            )}

        </div>
    );
}

export default CustomerEnquiry;