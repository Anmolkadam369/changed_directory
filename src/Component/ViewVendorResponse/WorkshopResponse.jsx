
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';


function WorkshopResponse() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);

    // Initially set formData from location state if available
    const initialData = location.state?.data || {
        agreementCPA: "",
        allBillCopy: "",
        contactofDriver: "",
        deadlineSheet: "",

        driverFeedback: "",
        estimateGiven: "",
        feedback:"",
        firstAdvancedPayment:"",

        partsOrderStatus:"",
        payment:"",
        preApproval:"",
        secondAdvancedPayment:"",

        supplementryEstimate:"",
        vehicleHandover:""
    };
    const [formData, setFormData] = useState(initialData);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    // Redirect if no valid token or userId
    useEffect(() => {
        if (!token || !userId) {
            navigate("/");
        }
    }, [token, userId, navigate]);

    // Effect for debugging and watching formData
    useEffect(() => {
        console.log('formData updated:', formData);
    }, [formData]);


    const onSubmit = async (action) => {
        try {
            console.log(`Action is: ${action}`);
            console.log('Submitting with action:', action, formData.AccidentVehicleCode,formData.VendorCode);
            const response = await axios.put(`${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}`);
            if (response.data.message === "Updated successfully") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
            } else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    };

    return (
        <div className='container'>
            <div style={{
                textAlign: 'center',
                backgroundColor: 'lightblue',
                color: 'brown',
                padding: '20px 0',
                marginBottom: '30px',
            }}>
                <h1>DATA UPLOADED BY WORKSHOP</h1>
                <hr style={{
                    border: '0',
                    height: '2px',
                    backgroundColor: '#fff',
                    maxWidth: '50%',
                    margin: '0 auto',
                }} />
            </div>
            <div className='form-row'>
                {/* Ensure correct name attribute values are used */}
                <label className="form-field">
                agreementCPA:
                    <textarea className='inputField' name="agreementCPA" value={formData.agreementCPA} readOnly />
                </label>
                <label className="form-field">
                allBillCopy:
                    <input type="text" className='inputField' name="allBillCopy" value={formData.allBillCopy} readOnly />
                </label>
                <label className="form-field">
                deadlineSheet:
                    <textarea name="partsArrangement" className='inputField' value={formData.deadlineSheet} readOnly />
                </label>
                <label className="form-field">
                firstAdvancedPayment:
                    <input type="text" className='inputField' name="firstAdvancedPayment" value={formData.firstAdvancedPayment} readOnly />
                </label>

            </div>

            <div className='form-row'>
                <label className="form-field">
                    driverFeedback:
                    <input type="text" className='inputField' name="driverFeedback" value={formData.driverFeedback} readOnly />
                </label>
                <label className="form-field">
                estimateGiven:
                    <input type="text" className='inputField' name="estimateGiven" value={formData.estimateGiven} readOnly />
                </label>
                <label className="form-field">
                feedback:
                    <input type="text" className='inputField' name="feedback" value={formData.feedback} readOnly />
                </label>
                <label className="form-field">
                    contactofDriver:
                    <textarea name="contactofDriver" className='inputField' value={formData.contactofDriver} readOnly />
                </label>
            </div>

            <div className='form-row'>
                <label className="form-field">
                    partsOrderStatus:
                    <input type="text" className='inputField' name="partsOrderStatus" value={formData.partsOrderStatus} readOnly />
                </label>
                <label className="form-field">
                payment:
                    <input type="text" className='inputField' name="payment" value={formData.payment} readOnly />
                </label>
                <label className="form-field">
                preApproval:
                    <input type="text" className='inputField' name="preApproval" value={formData.preApproval} readOnly />
                </label>
                <label className="form-field">
                    secondAdvancedPayment:
                    <textarea name="secondAdvancedPayment" className='inputField' value={formData.secondAdvancedPayment} readOnly />
                </label>
            </div>

            <div className='form-row'>
                <label className="form-field">
                    supplementryEstimate:
                    <input type="text" className='inputField' name="supplementryEstimate" value={formData.supplementryEstimate} readOnly />
                </label>
                <label className="form-field">
                vehicleHandover:
                    <input type="text" className='inputField' name="vehicleHandover" value={formData.vehicleHandover} readOnly />
                </label>
                <label className="form-field">
                </label>
                <label className="form-field">
                </label>
            </div>
            {alertInfo.show && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                    {alertInfo.message}
                </Alert>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
                <button
                    type="submit"
                    onClick={() => onSubmit('accept')}
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => onSubmit('reject')}
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Reject
                </button>
            </div>

        </div>
    );
}

export default WorkshopResponse;