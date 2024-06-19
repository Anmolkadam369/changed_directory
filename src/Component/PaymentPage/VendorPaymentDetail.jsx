import React, { useState } from 'react';
import axios from 'axios';
import backendUrl from '../../environment';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';


const VendorPaymentDetail = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [recipientName, setRecipientName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        bankAccount: '',
        ifscCode: '',
        branchName: ''
    });
    const [upiDetails, setUpiDetails] = useState({
        mobileNumber: '',
        upiId: ''
    });
    const [errors, setErrors] = useState({
        recipientName: '',
        paymentMethod: '',
        bankDetails: '',
        upiDetails: ''
    });

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        setBankDetails({ ...bankDetails, [name]: value });
    };

    const handleUpiDetailsChange = (e) => {
        const { name, value } = e.target;
        setUpiDetails({ ...upiDetails, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!recipientName) {
            formErrors.recipientName = 'Please enter recipient name';
            isValid = false;
        }

        if (paymentMethod === 'bank') {
            if (!bankDetails.bankName || !bankDetails.bankAccount || !bankDetails.ifscCode || !bankDetails.branchName) {
                formErrors.bankDetails = 'Please fill all bank details';
                isValid = false;
            }
            if (bankDetails.bankAccount && !/^\d{9,18}$/.test(bankDetails.bankAccount)) {
                formErrors.bankAccount = 'Please enter a valid bank account number';
                isValid = false;
            }
            if (bankDetails.ifscCode && !/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/.test(bankDetails.ifscCode)) {
                formErrors.ifscCode = 'Please enter a valid IFSC code';
                isValid = false;
            }
        } else if (paymentMethod === 'upi') {
            if (!upiDetails.mobileNumber || !upiDetails.upiId) {
                formErrors.upiDetails = 'Please fill both mobile number and UPI ID';
                isValid = false;
            }
            if (upiDetails.mobileNumber && !/^\d{10}$/.test(upiDetails.mobileNumber)) {
                formErrors.mobileNumber = 'Please enter a valid mobile number';
                isValid = false;
            }
            if (upiDetails.upiId && !/^[\w.-]+@[\w.-]+$/.test(upiDetails.upiId)) {
                formErrors.upiId = 'Please enter a valid UPI ID';
                isValid = false;
            }
        } else {
            formErrors.paymentMethod = 'Please select a payment method';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let sendData = {};
        if (validateForm()) {
            console.log('Form submitted');
            console.log('Recipient Name:', recipientName);
            if (paymentMethod === 'bank') {
                sendData = {
                    recipientName,
                    ...bankDetails
                }
                console.log('Bank Details:', sendData);

            } else if (paymentMethod === 'upi') {
                sendData = {
                    recipientName,
                    ...upiDetails
                }
                console.log('UPI Details:', sendData);
            }

            try {
                const response = await axios.post(`${backendUrl}/api/VendorPaymentDetails`, sendData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                console.log("response", response.data.vendorPaymentDetailsId);

                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

            } catch (error) {
                console.error("Error during form submission:", error);
                const errorMessage = error.response?.data || 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        }
    };

    return (
        <div>a
            <Helmet>
                <title>Vendor Payment Detail - Claimpro</title>
                <meta name="description" content="all Details regarding payment of vendor." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/VendorPaymentDetail`} />
            </Helmet>
            <form className="Customer-master-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Recipient's Name:
                        <input
                            type="text"
                            name="recipientName"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="form-control"
                        />
                        {errors.recipientName && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.recipientName}</p>}
                    </label>
                </div>

                <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        disabled={!recipientName}
                        style={{ flex: 1 }}
                    >
                        Bank Transfer
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        disabled={!recipientName}
                        style={{ flex: 1 }}
                    >
                        UPI
                    </button>
                </div>
                {errors.paymentMethod && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.paymentMethod}</p>}

                {paymentMethod === 'bank' && (
                    <div className="Customer-master-form" style={{ background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", paddingLeft: '15px', paddingRight: "15px" }}>
                        <label className="form-field input-group mb-3">
                            Bank Name:
                            <input
                                type="text"
                                name="bankName"
                                value={bankDetails.bankName}
                                onChange={handleBankDetailsChange}
                                className="form-control"
                            />
                        </label>
                        <label className="form-field input-group mb-3">
                            Bank Account:
                            <input
                                type="text"
                                name="bankAccount"
                                value={bankDetails.bankAccount}
                                onChange={handleBankDetailsChange}
                                className="form-control"
                            />
                            {errors.bankAccount && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.bankAccount}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            IFSC Code:
                            <input
                                type="text"
                                name="ifscCode"
                                value={bankDetails.ifscCode}
                                onChange={handleBankDetailsChange}
                                className="form-control"
                            />
                            {errors.ifscCode && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.ifscCode}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            Branch Name:
                            <input
                                type="text"
                                name="branchName"
                                value={bankDetails.branchName}
                                onChange={handleBankDetailsChange}
                                className="form-control"
                            />
                        </label>
                        {errors.bankDetails && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.bankDetails}</p>}
                    </div>
                )}

                {paymentMethod === 'upi' && (
                    <div className="Customer-master-form" style={{ background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", paddingLeft: '15px', paddingRight: "15px" }}>
                        <label className="form-field input-group mb-3">
                            Registered Mobile Number:
                            <input
                                type="text"
                                name="mobileNumber"
                                value={upiDetails.mobileNumber}
                                onChange={handleUpiDetailsChange}
                                className="form-control"
                            />
                            {errors.mobileNumber && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.mobileNumber}</p>}
                        </label>
                        <label className="form-field input-group mb-3">
                            UPI ID:
                            <input
                                type="text"
                                name="upiId"
                                value={upiDetails.upiId}
                                onChange={handleUpiDetailsChange}
                                className="form-control"
                            />
                            {errors.upiId && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.upiId}</p>}
                        </label>
                        {errors.upiDetails && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.upiDetails}</p>}
                    </div>
                )}

                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}>
                        Submit
                    </button>
                    {errors.form && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errors.form}</p>}
                </div>
            </form>
        </div>
    );
};

export default VendorPaymentDetail;
