// import React, { useEffect, useState } from 'react';
// import '../EditAccidentVehicle/EditAccidentVehicle.css'
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { tokenState, userIdState } from '../Auth/Atoms';
// import { Alert } from '@mui/material';


// function MachanicResponse() {
//   const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
//     const location = useLocation();
//     let { data } = location.state || {};
//     let setData = {};
//     console.log("Received datassss:", data);
//     console.log("datas",data.vehicleInspection)
//     const navigate = useNavigate();
//     const token = useRecoilValue(tokenState);
//     const userId = useRecoilValue(userIdState);
//      [data, setData] = useState({});
//     const [IsReadOnly, setIsReadOnly] = useState(true);


//     useEffect(() => {
//         console.log("token", token, userId);
//         if (token === "" || userId === "") {
//             navigate("/");
//         }
//     }, [token, userId, navigate]);

//     const initialData = location.state?.data || {
//         vehicleInspection: "",
//         labourEstimate: "",
//         partsArrangement: "",
//         trial: "",
//         payment: "",
//         feedback: ""
//     };

//     const [formData, setFormData] = useState(initialData);

//     useEffect(() => {
//         if (data) {
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 vehicleInspection :data.vehicleInspection|| "",
//                 labourEstimate: data.labourEstimate ||"",
//                 partsArrangment: data.partsArrangment ||"",
//                 trial: data.trial ||"",
//                 payment: data.payment ||"",
//                 feedback: data.feedback || ""
//             }));
//         }

//     }, [data])


//     const onSubmit = async (event) => {
//         event.preventDefault();
//         console.log('formData', formData);
//         // try {
//         //     const response = await axios.post(`http://localhost:3001/api/vendorOnAssignedVehicle/${id}/${userId}`, formData);
//         //     console.log("response", response.data);
//         //     console.log("response", response.data.status);

//         //     if (response.data.message === "data inserted successfully") {
//         //         setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
//         //     } else {
//         //         const errorMessage = 'An error occurred';
//         //         setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
//         //     }
//         // } catch (error) {
//         //     console.error('Error response:', error.response);
//         //     const errorMessage = error.response?.data || 'An error occurred';
//         //     setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
//         //   }
//     };


//     return (
//         <div className='container'>

//             <div style={{
//                 textAlign: 'center',
//                 backgroundColor: 'lightblue', // Choose your color
//                 color: 'brown', // Choose text color
//                 padding: '20px 0', // Vertical padding and no horizontal padding
//                 marginBottom: '30px', // Space below the header
//             }}>
//                 <h1>DATA UPLOADED BY MACHANIC</h1>
//                 <hr style={{
//                     border: '0',
//                     height: '2px', // Thickness of the hr
//                     backgroundColor: '#fff', // Same as the text color for consistency
//                     maxWidth: '50%', // Width of the hr
//                     margin: '0 auto', // Center the hr
//                 }} />
//             </div>


//             <div className='form-row'>
//                 <label className="form-field">
//                     Vehicle Inspection Remarks:
//                     <textarea
//                         className='inputField'
//                         name="vehicleInspection"
//                         value={formData.vehicleInspection}
//                         readOnly={true}
//                     />
//                 </label>
//                 <label className="form-field">
//                     Labour Estimate:
//                     <input
//                         type="text"
//                         className='inputField'
//                         name="labourEstimate"
//                         value={formData.labourEstimate}
//                         readOnly={true}
//                     />
//                 </label>
//                 <label className="form-field">
//                     Parts Arrangment:
//                     <textarea
//                         name="partsArrangment"
//                         className='inputField'
//                         value={formData.partsArrangment}
//                         readOnly={true}
//                     />
//                 </label>
//                 <label className="form-field">
//                     Trial:
//                     <input
//                         type="text"
//                         className='inputField'
//                         name="labourEstimate"
//                         value={formData.trial}
//                         readOnly={true}
//                     />
//                 </label>
//                 <label className="form-field">
//                     Payment:
//                     <input
//                         type="text"
//                         className='inputField'
//                         name="labourEstimate"
//                         value={formData.payment}
//                         readOnly={true}
//                     />
//                 </label>
//                 <label className="form-field">
//                     Feedback:
//                     <input
//                         type="text"
//                         className='inputField'
//                         name="labourEstimate"
//                         value={formData.feedback}
//                         readOnly={true}
//                     />
//                 </label>

//             </div>
//             {alertInfo.show && (
//                 <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
//                     {alertInfo.message}
//                 </Alert>
//             )}

//             <div style={{ textAlign: 'center' }}>
//                 <button type="submit" onClick={onSubmit} style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}>
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default MachanicResponse;


import React, { useEffect, useState } from 'react';
import '../VenderMaster/VendorMasterForm.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert, Button } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import ActivationModel from '../Visitors/ActivationModel';
import { ClipLoader } from 'react-spinners'; //added

function MachanicResponse({ data, onUpdate }) {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [action, setAction] = useState('');
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
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
        vehicleInspection: "",
        labourEstimate: "",
        partsArrangement: "",
        trial: "",
        payment: "",
        feedback: "",
        reasonOfReject: ""
    };

    const [formData, setFormData] = useState(initialData);



    console.log("formdata123213213", formData)
    useEffect(() => {
        if (token === "" || userId === "") {
            navigate("/");
        }
        // added
        if (formData.vehicleInspection !== '' && formData.labourEstimate !== '' && formData.partsArrangement !== '' &&
            formData.trial !== '' && formData.payment !== '' && formData.feedback !== '')
            setFullInfomation(true);
    }, [token, userId, navigate]);

    useEffect(() => {
        console.log('formData updated:', formData);
    }, [formData]);

    const onSubmit = async (event) => {
        // event.preventDefault();
        try {
            console.log(`Action is: ${action}`);
            console.log('Submitting with action:', `${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}`);
            const response = await axios.put(`${backendUrl}/api/vendorAcceptedOrRejected/${action}/${formData.AccidentVehicleCode}/${formData.VendorCode}/${userId}/${formData.reasonOfReject}`);
            console.log("some data", response);
            if (response.data.message === "Updated successfully") {
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
                    onUpdate();
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
        console.log("mechanic", data.machanic) //added
        const id = data.machanic;// added
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
        onUpdate();
    };

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
        <form className="customer-response-form" onSubmit={onSubmit} >
            <Helmet>
                <title>Mechanic Response - Claimpro</title>
                <meta name="description" content="Mechanic Response for BVC claimPro Assist." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/MachanicResponse`} />
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

                <div className="header-container">
                    <h3 className="bigtitle">Data Uploaded by Mechanic</h3>
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
                        Vehicle Inspection Remarks:
                        <textarea
                            className='form-control'
                            name="vehicleInspection"
                            value={formData.vehicleInspection}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Labour Estimate:
                        <textarea className='form-control' name="labourEstimate" value={formData.labourEstimate} style={{marginTop:'10px'}} readOnly />
                    </label>
                    <label className="form-field">
                        Trial:
                        <textarea className='form-control' name="trial" value={formData.trial} readOnly />
                    </label>
                </div>
                <div className='form-row'>
                    <label className="form-field">
                        Parts arrangement:
                        <textarea className='form-control' name="partsArrangement" value={formData.partsArrangement} readOnly />
                    </label>
                    <label className="form-field">
                        Payment:
                        <textarea className='form-control' name="payment" value={formData.payment} readOnly />
                    </label>
                    <label className="form-field">
                        Feedback:
                        <textarea name="feedback" className='form-control' value={formData.feedback} readOnly />
                    </label>
                </div>

                {action === "reject" && (
                    <div className="form-field" style={{ display: 'flex', gap: '20px' }}>
                        <label>
                            Reason to Reject:
                            <textarea name="reasonOfReject" className='inputField' value={formData.reasonOfReject}
                                onChange={e => setFormData({ ...formData, reasonOfReject: e.target.value })}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => openModal({ action: 'reject' })}
                            style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginTop: "20px" }}
                        >
                            Submit
                        </button>
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

export default MachanicResponse;