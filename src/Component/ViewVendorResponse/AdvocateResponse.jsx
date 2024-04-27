
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';


function AdvocateResponse() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);

    // Initially set formData from location state if available
    const initialData = location.state?.data || {
        bailerDetails: "",
        companyRepresentative: "",
        feedback: "",
        firCopy: "",
        indemnityBondCopy: "",
        petitionCopy: "",
        policeReportCopy:"",
        releaseOrderCopy:""
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
            console.log('Submitting with action:', action,formData.AccidentVehicleCode, formData.VendorCode);
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
                <h1>DATA UPLOADED BY ADVOCATE</h1>
                <hr style={{
                    border: '0',
                    height: '2px',
                    backgroundColor: '#fff',
                    maxWidth: '50%',
                    margin: '0 auto',
                }} />
            </div>
            <div className='form-row'>
                <label className="form-field">
                bailerDetails:
                    <textarea className='inputField' name="bailerDetails" value={formData.bailerDetails} readOnly />
                </label>
                <label className="form-field">
                companyRepresentative:
                    <input type="text" className='inputField' name="companyRepresentative" value={formData.companyRepresentative} readOnly />
                </label>
                <label className="form-field">
                firCopy:
                    <textarea name="partsArrangement" className='inputField' value={formData.firCopy} readOnly />
                </label>
                <label className="form-field">
                releaseOrderCopy:
                    <input type="text" className='inputField' name="releaseOrderCopy" value={formData.releaseOrderCopy} readOnly />
                </label>

            </div>
            <div className='form-row'>
                <label className="form-field">
                    indemnityBondCopy:
                    <input type="text" className='inputField' name="indemnityBondCopy" value={formData.indemnityBondCopy} readOnly />
                </label>
                <label className="form-field">
                petitionCopy:
                    <input type="text" className='inputField' name="petitionCopy" value={formData.petitionCopy} readOnly />
                </label>
                <label className="form-field">
                policeReportCopy:
                    <input type="text" className='inputField' name="policeReportCopy" value={formData.policeReportCopy} readOnly />
                </label>
                <label className="form-field">
                    Feedback:
                    <textarea name="feedback" className='inputField' value={formData.feedback} readOnly />
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

export default AdvocateResponse;