
import React, { useEffect, useState } from 'react';
import './vendorResponse.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import ActivationModel from '../Visitors/ActivationModel';
import { ClipLoader } from 'react-spinners'; //added


function CraineResponse({ data, onUpdate }) {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [action, setAction] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [fullInfomation, setFullInfomation] = useState(false); //added
    const [comingLink, setComingLink] = useState("");  //added
    const [isLoading, setIsLoading] = useState(false);   //added
    const [marginLeft, setMarginLeft] = useState('30px');
    const [padding, setPaddingLeft] = useState('30px');
    const [width, setWidth] = useState('100%');

    const openModal = (item) => {
        setModalData(item);
        setModalOpen(true);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleConfirm = async () => {
        setModalOpen(false);
        await onSubmit(modalData.action);
    };

    // Initially set formData from location state if available
    const initialData = data || {
        advancedPayment: "",
        balancePayment: "",
        recoveryVanEstimate: "",
        vehicleHandover: "",
        vehicleInspection: "",
        feedback: "",
        vehicleTakeOver: "",
        workEstimate: "",
        reasonOfReject: ""
    };
    const [formData, setFormData] = useState(initialData);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    // Redirect if no valid token or userId
    useEffect(() => {
        if (!token || !userId) {
            navigate("/");
        }
        if (formData.advancedPayment !== '' && formData.balancePayment !== '' && formData.recoveryVanEstimate !== '' &&
            formData.vehicleHandover !== '' && formData.vehicleInspection !== '' && formData.feedback !== '' &&
            formData.vehicleTakeOver !== '' && formData.workEstimate !== '')
            setFullInfomation(true);
    }, [token, userId, navigate]);

    // Effect for debugging and watching formData
    useEffect(() => {
        console.log('formData updated:', formData);
    }, [formData]);


    const onSubmit = async (event) => {
        try {
            console.log(`Action is: ${action}`);
            console.log('Submitting with action:', action, formData.AccidentVehicleCode, formData.VendorCode);
            const response = await axios.put(`${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}`);
            if (response.data.message === "Updated successfully") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
                    onUpdate()
                }, 2000);
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

    const handlePayment = async () => {  // added
        console.log("crain", data.crain) //added
        const id = data.crain;// added
        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/createLinkForPayment/${userId}/${id}`);
            console.log("handlepayment", response.data)
            if (response.data.message === "successfully created") {
                setFullInfomation(false)
                setIsLoading(false);
                setComingLink(response.data.data);
            } else {
                const errorMessage = 'An error occurred';
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        } catch (error) {
            console.error('Error response:', error);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    }

    const handleBack = () => {
        // navigate("../Admin")
        onUpdate()
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 630) {
                setMarginLeft('10px');
                setPaddingLeft('15px');
                setWidth('100%');
            } else {
                setMarginLeft('10px');
                setPaddingLeft('30px');
                setWidth('100%');
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


    return (
        <form className="customer-response-form" style={{ marginBottom: "50px" }}>
            <Helmet>
                <title>Crane Responses For Accident Vehicles - Claimpro</title>
                <meta name="description" content="Crane Responses For Accident Vehicles for Bvc ClaimPro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/CraineResponse`} />
            </Helmet>


            <form className="customer-response-form" style={{ background: "white", marginLeft, padding, width }}>
            <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                <h2 className='bigtitle'>Accident Images</h2>
            </div>
            <div className="form-row">
                    <label className="form-field">
                        Chassis Number:
                        {formData.ChassisNoView ? (
                            <>
                                <img
                                    src={formData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Cluster Number:
                        {formData.ClusterView ? (
                            <>
                                <img
                                    src={formData.ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />
                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        FrontLH Number:
                        {formData.frontLH ? (
                            <>
                                <img
                                    src={formData.frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No FrontLH Photo uploaded</p>
                        )}
                    </label>

                </div>

                <div className="form-row">
                    <label className="form-field">
                        frontRH:
                        {formData.frontRH ? (
                            <>
                                <img
                                    src={formData.frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />
                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No frontRH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        front View:
                        {formData.frontView ? (
                            <>
                                <img
                                    src={formData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No front View Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear LH:
                        {formData.rearLH ? (
                            <>
                                <img
                                    src={formData.rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        rear RH:
                        {formData.rearRH ? (
                            <>
                                <img
                                    src={formData.rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo:
                        {formData.MajorDamages1 ? (
                            <>
                                <img
                                    src={formData.MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 2:
                        {formData.MajorDamages2 ? (
                            <>
                                <img
                                    src={formData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Major Damage Photo 3:
                        {formData.MajorDamages3 ? (
                            <>
                                <img
                                    src={formData.MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 4:
                        {formData.MajorDamages4 ? (
                            <>
                                <img
                                    src={formData.MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 5:
                        {formData.MajorDamages5 ? (
                            <>
                                <img
                                    src={formData.MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                />

                            </>
                        ) : (
                            <p style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontSize: '14px',
                                margin: '10px 0',
                                textAlign: 'center'
                            }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                </div>
            <div class="header-container">
                <h3 class="bigtitle">Data Uploaded by Craine Manager</h3>
            </div>
            <div className='form-row'>
                {/* Ensure correct name attribute values are used */}
                <label className="form-field">
                    Vehicle Inspection Remarks:
                    <textarea className='inputField' name="advancedPayment" value={formData.advancedPayment} readOnly />
                </label>
                <label className="form-field">
                    Labour Estimate:
                    <input type="text" className='inputField' name="balancePayment" value={formData.balancePayment} readOnly />
                </label>
                <label className="form-field">
                    Parts Arrangement:
                    <textarea name="partsArrangement" className='inputField' value={formData.recoveryVanEstimate} readOnly />
                </label>
            </div>
            <div className='form-row'>
            <label className="form-field">
                    workEstimate:
                    <input type="text" className='inputField' name="workEstimate" value={formData.workEstimate} readOnly />
                </label>
                <label className="form-field">
                    vehicleHandover:
                    <input type="text" className='inputField' name="vehicleHandover" value={formData.vehicleHandover} readOnly />
                </label>
                <label className="form-field">
                    vehicleInspection:
                    <input type="text" className='inputField' name="vehicleInspection" value={formData.vehicleInspection} readOnly />
                </label>
            </div>

            <div className='form-row'>
            <label className="form-field">
                    vehicleTakeOver:
                    <input type="text" className='inputField' name="vehicleTakeOver" value={formData.vehicleTakeOver} readOnly />
                </label>
                <label className="form-field">
                    Feedback:
                    <textarea name="feedback" className='inputField' value={formData.feedback} readOnly />
                </label>
            </div>

            {action === "reject" && (
                <div className="form-field" style={{ display: 'flex', gap: '20px' }}>
                    Reason to Reject:
                    <label>
                        <textarea name="reasonOfReject" className='inputField' value={formData.reasonOfReject}
                            onChange={e => setFormData({ ...formData, reasonOfReject: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => openModal({ action: 'reject' })}
                            style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginLeft: "50px", marginTop: "20px" }}>
                            Submit
                        </button>
                    </label>

                </div>
            )}
            {alertInfo.show && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                    {alertInfo.message}
                </Alert>
            )}
                <div style={{ padding: '20px 0' }}>
                    <button
                        type="button"
                        onClick={() => {
                            setAction('accept');
                            openModal({ action: 'accept' });
                        }}
                        style={{
                            display: 'inline-block',
                            padding: '10px 30px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            marginRight: '20px'
                        }}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setAction('reject')}
                        style={{
                            display: 'inline-block',
                            padding: '10px 30px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            marginRight: '20px'
                        }}
                    >
                        Reject
                    </button>
                    {fullInfomation && (
                        <div
                            className="form-control generate-button"
                            onClick={handlePayment}
                            style={{
                                display: 'inline-block',
                                padding: '10px 30px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                marginRight: '20px'
                            }}
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" loading={isLoading} />
                            ) : (
                                'Payment Request'
                            )}
                        </div>
                    )}
                    {comingLink && (
                        <a
                            href={comingLink}
                            className="form-control download-link"
                            style={{
                                display: 'inline-block',
                                padding: '10px 30px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                textDecoration: 'none',
                                marginRight: '20px'
                            }}
                        >
                            Pay Now
                        </a>
                    )}
                </div>
            {modalData && (
                <ActivationModel
                    isOpen={isModalOpen}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </form>
    </form>
    );
}

export default CraineResponse;