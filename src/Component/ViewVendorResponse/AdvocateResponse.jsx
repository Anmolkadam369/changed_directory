
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

function AdvocateResponse() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [action, setAction] = useState('');

    // Initially set formData from location state if available
    const initialData = location.state?.data || {
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
            console.log('Submitting with action:', action, formData.AccidentVehicleCode, formData.VendorCode);
            console.log("url", `${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}`)
            const response = await axios.put(`${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}`);
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
        navigate("../Admin")
    }

    return (
        <form className="vendor-response-form" style={{marginBottom:"50px"}}>

      <Button startIcon={<ArrowBackIcon />} onClick={handleBack}/>

                    <h2 className='bigtitle'>Accident Images</h2>

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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No FrontLH Photo uploaded</p>
                        )}
                    </label>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No frontRH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No front View Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>

                </div>
            <div class="header-container">
                <h3 class="bigtitle">Data Uploaded by Advocate</h3>
            </div>
            <div className='form-row'>
                <label className="form-field">
                    Company Representative:
                    <input type="text" style={{ marginTop: '10px' }} className='inputField' readOnly value={formData.companyRepresentative} />
                </label>
                <label className="form-field">
                    Bailer Details:
                    {
                        formData.bailerDetails ? 
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Bailer Details Available
                            </button> :
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Bailer Details Not Available
                            </button>
                    }

                </label>

                <label className="form-field">
                    FIR Copy:
                    {
                        formData.firCopy ? 
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                FIR Copy Available
                            </button> :
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                FIR Copy Not Available
                            </button>
                    }
                </label>
                <label className="form-field">
                    Release Order Copy:
                    {
                        formData.releaseOrderCopy ? 
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Copy Available
                            </button> :
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Copy Not Available
                            </button>
                    }
                </label>

            </div>
            <div className='form-row'>
                <label className="form-field">
                    indemnity Bond Copy:
                    {
                        formData.indemnityBondCopy ? 
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Copy Available
                            </button> :
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Copy Not Available
                            </button>
                    }
                </label>
                <label className="form-field">
                    petitionCopy:
                    {
                        formData.petitionCopy ? 
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Copy Available
                            </button> :
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Copy Not Available
                            </button>
                    }
                </label>
                <label className="form-field">
                    policeReportCopy:
                    {
                        formData.policeReportCopy ? 
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Available
                            </button> :
                            <button style={{ marginTop: '10px', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'lightgreen', color: 'white' }}>
                                Release Order Not Available
                            </button>
                    }
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
                            onClick={() => { onSubmit('reject'); }}
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
                <button
                    type="submit"
                    onClick={() => onSubmit('accept')}
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Accept
                </button>
                <button
                    type="button"
                    onClick={() => { setAction('reject'); }}
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Reject

                </button>

            </div>

        </form>
    );
}

export default AdvocateResponse;