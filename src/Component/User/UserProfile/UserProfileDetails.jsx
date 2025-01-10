import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt, faClipboardList, faCar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './UserProfileDetials.css';
import axios from 'axios';
import backendUrl from '../../../environment';
const UserProfileDetails = () => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState(null);
    const [comingData, setComingData] = useState([]);
    console.log('comingdata', comingData)

    useEffect(() => {
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                driverName: comingData.driverName || "",
                driverNumber: comingData.driverNumber || "",
                driverEmail: comingData.driverEmail || "",
                customerDriverCode: comingData.customerDriverCode || "",
                vendorDriverCode: comingData.vendorDriverCode || "",
                CustomerCode: comingData.CustomerCode || "",
                CustomerName: comingData.CustomerName || "",
                CustomerType: comingData.CustomerType || "",
                address: comingData.address || "",
                district: comingData.district || "",
                pincode: comingData.pincode || "",
                CustomerPhone: comingData.CustomerPhone || "",
                email: comingData.email || "",
                contactPerson: comingData.contactPerson || "",
                contactPersonNum: comingData.contactPersonNum || "",
                contactPersonNum2: comingData.contactPersonNum2 || "",
                state: comingData.state || "",
                panNo: comingData.panNo || "",
                panCard: comingData.panCard || "",
                adharNo: comingData.adharNo || "",
                adharCard: comingData.adharCard || "",
                agreement: comingData.agreement || "",
                fleetSize: comingData.fleetSize || "",
                plan: comingData.plan || "",
                vehicleNo: comingData.vehicleNo || "",
                chassisNo: comingData.chassisNo || "",
                engineNo: comingData.engineNo || "",
                make: comingData.make || "",
                model: comingData.model || "",
                year: comingData.year || "",
                type: comingData.type || "",
                application: comingData.application || "",
                GVW: comingData.GVW || "",
                ULW: comingData.ULW || "",
                InsuranceName: comingData.InsuranceName || "",
                GSTNo: comingData.GSTNo || "",
                GST: comingData.GST || "",
                longitude: comingData.longitude !== null ? comingData.longitude : "",
                latitude: comingData.latitude !== null ? comingData.latitude : "",
                id: comingData.id,
                choosenPlan: comingData.choosenPlan,
                contactPersonNum: comingData.contactPersonNum || "",
                vendorType: comingData.vendorType || ""
            }));
        }
    }, [comingData]);

    const [formData, setFormData] = useState({
        driverName: "",
        driverNumber: "",
        driverEmail: "",
        customerDriverCode: "",
        vendorDriverCode: "",
        CustomerName: "",
        contactPerson: "",
        contactPersonNum: "",
        email: '',
        CustomerPhone: '',
        plan: '',
        vehicles: '',
        CustomerType: '',
        choosenPlan: "",
        vendorType: ''
    });
    console.log('formdata', formData)
    useEffect(() => {
        getDataById();
    }, [userId, token])

    const getDataById = async (id) => {
        let response;
        if (userId.startsWith("CUD-")) response = await axios.get(`${backendUrl}/api/getDriverInfo/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (userId.startsWith("CC-")) response = await axios.get(`${backendUrl}/api/getCustomerById/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (userId.startsWith("VC-")) response = await axios.get(`${backendUrl}/api/getVendor/${userId}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (userId.startsWith("VED-")) response = await axios.get(`${backendUrl}/api/getVendorDriverInfo/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });


        console.log("daa", response.data.data)
        console.log("response123", response.data.data[0]);
        setComingData(response.data.data[0])
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }
        let urlPart = ''
        if (userId.startsWith("CC-")) urlPart = 'customerUpdate';
        if (userId.startsWith("CUD-")) urlPart = 'updateCustomerDriver';
        if (userId.startsWith("VC-")) urlPart = 'venderUpdate';
        if (userId.startsWith("VED-")) urlPart = 'updateDriverInfoVendor';


        console.log("formDataObj", formDataObj)
        try {
            const response = await axios({
                method: 'PUT',
                url: `${backendUrl}/api/${urlPart}/${userId}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("response", response.data);

            if (response.data.status === true) {
                setAlertInfo({
                    type: 'success',
                    message: 'Information updated successfully!'
                });
            } else if (response.data.status === 400) {
                setAlertInfo({
                    type: 'error',
                    message: 'Already assigned Number!'
                });
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                // Server responded with a status other than 2xx
                if (error.response.status === 404) {
                    setAlertInfo({
                        type: 'error',
                        message: 'Resource not found!'
                    });
                } else if (error.response.status === 400) {
                    setAlertInfo({
                        type: 'error',
                        message: 'Already assigned Number!'
                    });
                } else {
                    setAlertInfo({
                        type: 'error',
                        message: `Unexpected error: ${error.response.status}`
                    });
                }
            } else if (error.request) {
                // No response was received
                setAlertInfo({
                    type: 'error',
                    message: 'No response from the server. Please try again.'
                });
            } else {
                // Something else happened
                setAlertInfo({
                    type: 'error',
                    message: 'An error occurred while making the request.'
                });
            }
        }

    };

    return (
        <div className="user-form-container">
            <p style={{ textAlign: "center", marginTop: "30px", fontSize: "20px", fontWeight: "bold", color: "green" }}>Profile Details</p>
            {userId.startsWith("CC-") && (
                <form className="user-form" onSubmit={handleSubmit}>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="contactPerson"
                            placeholder="Enter your name"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i class="fa fa-address-book-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="CustomerType"
                            placeholder="Enter your name"
                            value={formData.CustomerType ? formData.CustomerType.charAt(0).toUpperCase() + formData.CustomerType.slice(1) : ""}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="tel"
                            name="CustomerPhone"
                            placeholder="Enter your mobile number"
                            value={formData.CustomerPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-list user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="choosenPlan"
                            placeholder="Your current plan"
                            value={formData.choosenPlan ? formData.choosenPlan.charAt(0).toUpperCase() + formData.choosenPlan.slice(1) : ""}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <button type="submit" className="user-submit-button  bg-[#515355]">
                        <i className='fa fa-paper-plane user-icon text-white' ></i> Update Information
                    </button>
                </form>)}

            {userId.startsWith("CUD-") && (
                <form className="user-form" onSubmit={handleSubmit}>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="driverName"
                            placeholder="Enter your name"
                            value={formData.driverName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="email"
                            name="driverEmail"
                            placeholder="Enter your email"
                            value={formData.driverEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="tel"
                            name="driverNumber"
                            placeholder="Enter your mobile number"
                            value={formData.driverNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <button type="submit" className="user-submit-button  bg-[#515355]">
                        <i className='fa fa-paper-plane user-icon text-white' ></i> Update Information
                    </button>
                </form>
            )}

            {userId.startsWith("VC-") && (
                <form className="user-form" onSubmit={handleSubmit}>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="contactPerson"
                            placeholder="Enter your name"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="tel"
                            name="contactPersonNum"
                            placeholder="Enter your mobile number"
                            value={formData.contactPersonNum}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <button type="submit" className="user-submit-button  bg-[#515355]">
                        <i className='fa fa-paper-plane user-icon text-white' ></i> Update Information
                    </button>
                </form>
            )}

            {userId.startsWith("VED-") && (
                <form className="user-form" onSubmit={handleSubmit}>
                    <div className="user-form-group">
                        <i class="fa fa-user user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="text"
                            name="driverName"
                            placeholder="Enter your name"
                            value={formData.driverName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="user-form-group">
                        <i className="fa fa-envelope-o user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="email"
                            name="driverEmail"
                            placeholder="Enter your email"
                            value={formData.driverEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="user-form-group">
                        <i className="fa fa-mobile user-icon" aria-hidden="true"></i>
                        <input
                            className='input-profile'
                            type="tel"
                            name="driverNumber"
                            placeholder="Enter your mobile number"
                            value={formData.driverNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {alertInfo && (
                        <div className={`alert alert-${alertInfo.type}`}>
                            {alertInfo.message}
                        </div>
                    )}

                    <button type="submit" className="user-submit-button  bg-[#515355]">
                        <i className='fa fa-paper-plane user-icon text-white' ></i> Update Information
                    </button>
                </form>
            )}

        </div>
    );
};

export default UserProfileDetails;