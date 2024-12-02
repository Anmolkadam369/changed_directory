import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt, faClipboardList, faCar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './UserProfileDetials.css';
import axios from 'axios';
import backendUrl from '../../../environment';
const UserProfileDetails = () => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    console.log('comingdata', comingData)

    useEffect(() => {
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,
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
                choosenPlan:comingData.choosenPlan
            }));
        }
    }, [comingData]);

    const [formData, setFormData] = useState({
        CustomerName: "",
        email: '',
        CustomerPhone: '',
        plan: '',
        vehicles: '',
        CustomerType: '',
        choosenPlan: ""
    });

    useEffect(() => {
        getDataById();
    }, [userId, token])

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getCustomer/${userId}`);
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
        for(const key in formData){
            formDataObj.append(key, formData[key]);
        }
        try {
            const response = await axios({
              method: 'PUT',
              url: `${backendUrl}/api/customerUpdate/${userId}/${userId}`,
              data: formDataObj,
              headers: {
                'Authorization': token
              }
            });
            console.log("response", response.data);
            // setIsLoading(false);
            // setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
            // setTimeout(() => {
            // navigate("../Admin");
            //   onUpdate();
            // }, 2000);
          }
          catch (error) {
            console.error("Error during form submission:", error);
            // setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
            //   setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
              setTimeout(() => {
                window.location.href = '/';
              }, 2000);
            } else {
            //   setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
          }
    };

    return (
        <div className="user-form-container">
            <p style={{textAlign:"center", marginTop:"30px", fontSize:"20px", fontWeight:"bold", color:"green"}}>Profile Details</p>
            <form className="user-form" onSubmit={handleSubmit}>
                <div className="user-form-group">
                    <i class="fa fa-user user-icon" aria-hidden="true"></i>
                    <input
                        className='input-profile'
                        type="text"
                        name="CustomerName"
                        placeholder="Enter your name"
                        value={formData.CustomerName}
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
                        value={formData.CustomerType? formData.CustomerType.charAt(0).toUpperCase()+formData.CustomerType.slice(1):""}
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
                        placeholder="Enter your current plan"
                        value={formData.choosenPlan? formData.choosenPlan.charAt(0).toUpperCase()+formData.choosenPlan.slice(1):""}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                
                <button type="submit" className="user-submit-button">
                    <i className='fa fa-paper-plane user-icon'></i> Update Information
                </button>
            </form>
        </div>
    );
};

export default UserProfileDetails;