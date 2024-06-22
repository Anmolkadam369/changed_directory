
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './vendorResponse.css';
import { Helmet } from 'react-helmet-async';
import ActivationModel from '../Visitors/ActivationModel';
import { ClipLoader } from 'react-spinners';


function AdvocateResponse({ data, onUpdate }) {
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

    // Initially set formData from location state if available
    const initialData = data || {
        bailerDetails: "",
        companyRepresentative: "",
        feedback: "",
        firCopy: "",
        indemnityBondCopy: "",
        petitionCopy: "",
        policeReportCopy: "",
        releaseOrderCopy: "",
        reasonOfReject: ""
    };
    const [formData, setFormData] = useState(initialData);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

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

    // Redirect if no valid token or userId
    useEffect(() => {
        if (!token || !userId) {
            navigate("/");
        }
        if (formData.bailerDetails !== '' && formData.bailerDetails !== null &&
            formData.companyRepresentative !== '' && formData.companyRepresentative !== null &&
            formData.feedback !== '' && formData.feedback !== null &&
            formData.firCopy !== '' && formData.firCopy !== null &&
            formData.indemnityBondCopy !== '' && formData.indemnityBondCopy !== null &&
            formData.petitionCopy !== '' && formData.petitionCopy !== null &&
            formData.policeReportCopy !== '' && formData.policeReportCopy !== null &&
            formData.releaseOrderCopy !== '' && formData.releaseOrderCopy !== null) 
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
            console.log("url", `${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}`)
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
        console.log("advocate", data.advocate)
        const id = data.advocate;
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


    const handleDownload = (url, filename) => {
        fetch(url, { mode: 'no-cors' })  // Added no-cors mode
            .then(response => response.blob())
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            })
            .catch(e => console.error('Error downloading the file: ', e));
    };

    const handleBack = () => {
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
        <form className="customer-response-form"  onSubmit={onSubmit} style={{ marginBottom: "50px" }}>
            <Helmet>
                <title>Advocate Response - Claimpro</title>
                <meta name="description" content="Advocate Response Bvc Claimpro Assist." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/AdvocateResponse`} />
            </Helmet>


            <form className="customer-response-form" style={{background:"white",marginLeft,padding, width}}>
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
                <h3 class="bigtitle">Data Uploaded by Advocate</h3>
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
                    Company Representative:
                    <input type="text" style={{ marginTop: '10px' }} className='inputField' readOnly value={formData.companyRepresentative} />
                </label>
                <label className="form-field">
                    Bailer Details:
                    {
                        formData.bailerDetails ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.bailerDetails} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Bailer Details uploaded</p>
                        )
                    }

                </label>

                <label className="form-field">
                    FIR Copy:
                    {
                        formData.firCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.firCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No FIR Copy uploaded</p>
                        )
                    }
                </label>


            </div>
            <div className='form-row'>
            <label className="form-field">
                    Release Order Copy:
                    {
                        formData.releaseOrderCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.releaseOrderCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Release Order uploaded</p>
                        )
                    }
                </label>
                <label className="form-field">
                    Indemnity Bond Copy:
                    {
                        formData.indemnityBondCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.indemnityBondCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Indemnity Bond uploaded</p>
                        )
                    }
                </label>
                <label className="form-field">
                    Petition Copy:
                    {
                        formData.petitionCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.petitionCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Petition Copy uploaded</p>
                        )
                    }
                </label>

            </div>

            <div className='form-row'>
            <label className="form-field">
                    Police Report Copy:
                    {
                        formData.policeReportCopy ? (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <div style={{ marginTop: "20px" }}>
                                    <a href={formData.policeReportCopy} style={{ marginTop: "10px", marginLeft: "10px", padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightblue', color: 'white' }}>
                                        Download
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Police Report uploaded</p>
                        )
                    }
                </label>
                <label className="form-field">
                    Feedback:
                    <textarea name="feedback" className='inputField' value={formData.feedback} readOnly />
                </label>
                <label className='form-field'></label>
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

export default AdvocateResponse;