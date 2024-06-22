
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import './vendorResponse.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import ActivationModel from '../Visitors/ActivationModel';
import { ClipLoader } from 'react-spinners'; //added


function WorkshopResponse({ data, onUpdate }) {
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

    const initialData = data || {
        agreementCPA: "",
        allBillCopy: "",
        contactofDriver: "",
        deadlineSheet: "",

        driverFeedback: "",
        estimateGiven: "",
        feedback: "",
        firstAdvancedPayment: "",

        partsOrderStatus: "",
        payment: "",
        preApproval: "",
        secondAdvancedPayment: "",

        supplementryEstimate: "",
        vehicleHandover: "",
        reasonOfReject: ""

    };
    const [formData, setFormData] = useState(initialData);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    // Redirect if no valid token or userId
    useEffect(() => {
        if (!token || !userId) {
            navigate("/");
        }
        if (
            formData.agreementCPA !== '' && formData.agreementCPA !== null &&
            formData.allBillCopy !== '' && formData.allBillCopy !== null &&
            formData.contactofDriver !== '' && formData.contactofDriver !== null &&
            formData.deadlineSheet !== '' && formData.deadlineSheet !== null &&
            formData.driverFeedback !== '' && formData.driverFeedback !== null &&
            formData.estimateGiven !== '' && formData.estimateGiven !== null &&
            formData.feedback !== '' && formData.feedback !== null &&
            formData.firstAdvancedPayment !== '' && formData.firstAdvancedPayment !== null &&
            formData.partsOrderStatus !== '' && formData.partsOrderStatus !== null &&
            formData.payment !== '' && formData.payment !== null &&
            formData.preApproval !== '' && formData.preApproval !== null &&
            formData.secondAdvancedPayment !== '' && formData.secondAdvancedPayment !== null &&
            formData.supplementryEstimate !== '' && formData.supplementryEstimate !== null &&
            formData.vehicleHandover !== '' && formData.vehicleHandover !== null
        )
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
        console.log("workshop", data.workshop) //added
        const id = data.workshop;// added
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
                <title>Workshop Response For Service - Claimpro</title>
                <meta name="description" content="Workshop Response For Service Bvc ClaimPro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/WorkshopResponse`} />
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
                    <h3 class="bigtitle">Data Uploaded by Workshop</h3>
                    <h5 style={{
                                color: 'green',
                                // fontStyle: 'italic',
                                fontSize: '15px',
                                marginLeft:'20px',
                                marginTop:"10px",
                                textAlign: 'center'
                                
                            }}>Last Updated On : {formData.updateResponseOn ? formData.updateResponseOn : formData.firstResponseOn}</h5>
                </div>
                <div className='form-row'>
                    <label className="form-field">
                        agreement CPA:
                        {
                            formData.agreementCPA ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.agreementCPA} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No CPA Agreement uploaded</p>
                            )

                        }
                    </label>
                    <label className="form-field">
                        All Bill Copy:
                        {
                            formData.allBillCopy ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.allBillCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No Bill Copy uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Deadline Sheet:
                        {
                            formData.deadlineSheet ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.deadlineSheet} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No Deadline Sheet uploaded</p>
                            )
                        }
                    </label>

                </div>

                <div className='form-row'>
                    <label className="form-field">
                        First Advanced Payment:
                        <input type="text" className='inputField' name="driverFeedback" value={formData.firstAdvancedPayment} readOnly />
                    </label>
                    <label className="form-field">
                        driverFeedback:
                        <input type="text" className='inputField' name="driverFeedback" value={formData.driverFeedback} readOnly />
                    </label>
                    <label className="form-field">
                        Estimate Given:
                        {
                            formData.estimateGiven ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.estimateGiven} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No Estimate uploaded</p>
                            )
                        }

                    </label>

                </div>

                <div className='form-row'>
                    <label className="form-field">
                        feedback:
                        <input type="text" className='inputField' name="feedback" value={formData.feedback} readOnly />
                    </label>
                    <label className="form-field">
                        contactofDriver:
                        <textarea name="contactofDriver" className='inputField' value={formData.contactofDriver} readOnly />
                    </label>
                    <label className="form-field">
                        partsOrderStatus:
                        <input type="text" className='inputField' name="partsOrderStatus" value={formData.partsOrderStatus} readOnly />
                    </label>

                </div>

                <div className='form-row'>
                    <label className="form-field">
                        payment:
                        <input type="text" className='inputField' name="payment" value={formData.payment} readOnly />
                    </label>
                    <label className="form-field">
                        Pre Approval:
                        {
                            formData.preApproval ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.preApproval} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No Pre Approval uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        secondAdvancedPayment:
                        <textarea name="secondAdvancedPayment" className='inputField' value={formData.secondAdvancedPayment} readOnly />
                    </label>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Supplementry Estimate:
                        {
                            formData.supplementryEstimate ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.supplementryEstimate} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No Supplementry Estimate uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        vehicle Handover:
                        {
                            formData.vehicleHandover ? (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <a href={formData.vehicleHandover} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                            Download
                                        </a>
                                    </div>
                                </div>) : (
                                <p className='notUploaded' style={{ marginTop: "20px" }}>No Vehicle Handover Document Uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
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
                                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginTop: "20px" }}>
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

export default WorkshopResponse;