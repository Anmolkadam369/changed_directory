// import React, { useEffect, useState } from 'react';
// import '../EditAccidentVehicle/EditAccidentVehicle.css'
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { tokenState, userIdState } from '../Auth/Atoms';
// import { Alert } from '@mui/material';


// function MechanicResponse() {
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
//                 <button type="submit" onClick={onSubmit} style={{                     fontSize: "14px",
                    // padding: "5px 20px",
                    // border: "3px solid lightblue",
                    // borderRadius: "4px",
                    // cursor: "pointer",
                    // backgroundColor: "transparent",
                    // color: "green",}}>
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default MechanicResponse;


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
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';

function MechanicResponse({ data, onUpdate }) {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
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

    const [isChassisModalOpen, setIsChassisModalOpen] = useState(false);
    const [isClusterModalOpen, setIsClusterModalOpen] = useState(false);
    const [isFrontLHModalOpen, setIsFrontLHModalOpen] = useState(false);
    const [isFrontRHModalOpen, setIsFrontRHModalOpen] = useState(false);

    const [isFrontViewModalOpen, setIsFrontViewModalOpen] = useState(false);
    const [isRearRHModalOpen, setIsRearRHModalOpen] = useState(false);
    const [isRearLHModalOpen, setIsRearLHModalOpen] = useState(false);
    const [isMajorDamage1ModalOpen, setIsMajorDamage1ModalOpen] = useState(false);

    const [isMajorDamage2ModalOpen, setIsMajorDamage2ModalOpen] = useState(false);
    const [isMajorDamage3ModalOpen, setIsMajorDamage3ModalOpen] = useState(false);
    const [isMajorDamage4ModalOpen, setIsMajorDamage4ModalOpen] = useState(false);
    const [isMajorDamage5ModalOpen, setIsMajorDamage5ModalOpen] = useState(false);

    const openChassisModal = () => setIsChassisModalOpen(true);
    const closeChassisModal = () => setIsChassisModalOpen(false);

    const openClusterModal = () => setIsClusterModalOpen(true);
    const closeClusterModal = () => setIsClusterModalOpen(false);

    const openFrontLHModal = () => setIsFrontLHModalOpen(true);
    const closeFrontLHModal = () => setIsFrontLHModalOpen(false);

    const openFrontRHModal = () => setIsFrontRHModalOpen(true);
    const closeFrontRHModal = () => setIsFrontRHModalOpen(false);

    const openFrontViewModal = () => setIsFrontViewModalOpen(true);
    const closeFrontViewModal = () => setIsFrontViewModalOpen(false);

    const openRearRHModal = () => setIsRearRHModalOpen(true);
    const closeRearRHModal = () => setIsRearRHModalOpen(false);

    const openRearLHModal = () => setIsRearLHModalOpen(true);
    const closeRearLHModal = () => setIsRearLHModalOpen(false);

    const openMajorDamage1Modal = () => setIsMajorDamage1ModalOpen(true);
    const closeMajorDamage1Modal = () => setIsMajorDamage1ModalOpen(false);

    const openMajorDamage2Modal = () => setIsMajorDamage2ModalOpen(true);
    const closeMajorDamage2Modal = () => setIsMajorDamage2ModalOpen(false);

    const openMajorDamage3Modal = () => setIsMajorDamage3ModalOpen(true);
    const closeMajorDamage3Modal = () => setIsMajorDamage3ModalOpen(false);

    const openMajorDamage4Modal = () => setIsMajorDamage4ModalOpen(true);
    const closeMajorDamage4Modal = () => setIsMajorDamage4ModalOpen(false);

    const openMajorDamage5Modal = () => setIsMajorDamage5ModalOpen(true);
    const closeMajorDamage5Modal = () => setIsMajorDamage5ModalOpen(false);



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
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
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
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        }
    };

    const handlePayment = async () => {  // added
        console.log("mechanic", data.mechanic) //added
        const id = data.mechanic;// added
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
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
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
                <link rel='canonical' href={`https://claimpro.in/MechanicResponse`} />
            </Helmet>

            <form className="customer-response-form" style={{ background: "white", marginLeft, padding, width }}>
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <h2 className='bigtitle'>Accident Images</h2>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Chassis Number:
                        {formData .ChassisNoView ? (
                            <>
                                <img
                                    src={formData .ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openChassisModal}
                                />
                                <Modal isOpen={isChassisModalOpen} onRequestClose={closeChassisModal} contentLabel="Chassis Card Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .ChassisNoView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeChassisModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .ChassisNoView} alt="Chassis Card" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Cluster Number:
                        {formData .ClusterView ? (
                            <>
                                <img
                                    src={formData .ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openClusterModal}
                                />
                                <Modal isOpen={isClusterModalOpen} onRequestClose={closeClusterModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .ClusterView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeClusterModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .ClusterView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        FrontLH Number:
                        {formData .frontLH ? (
                            <>
                                <img
                                    src={formData .frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openFrontLHModal}
                                />
                                <Modal isOpen={isFrontLHModalOpen} onRequestClose={closeFrontLHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .frontLH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontLHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .frontLH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No FrontLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        frontRH:
                        {formData .frontRH ? (
                            <>
                                <img
                                    src={formData .frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openFrontRHModal}
                                />
                                <Modal isOpen={isFrontRHModalOpen} onRequestClose={closeFrontRHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .frontRH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontRHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .frontRH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No frontRH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        front View:
                        {formData .frontView ? (
                            <>
                                <img
                                    src={formData .frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openFrontViewModal}
                                />
                                <Modal isOpen={isFrontViewModalOpen} onRequestClose={closeFrontViewModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .frontView} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeFrontViewModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .frontView} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No front View Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear LH:
                        {formData .rearLH ? (
                            <>
                                <img
                                    src={formData .rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openRearLHModal}
                                />
                                <Modal isOpen={isRearLHModalOpen} onRequestClose={closeRearLHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .rearLH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeRearLHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .rearLH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear RH:
                        {formData .rearRH ? (
                            <>
                                <img
                                    src={formData .rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openRearRHModal}
                                />
                                <Modal isOpen={isRearRHModalOpen} onRequestClose={closeRearRHModal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .rearRH} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeRearRHModal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .rearRH} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo:
                        {formData .MajorDamages1 ? (
                            <>
                                <img
                                    src={formData .MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openMajorDamage1Modal}
                                />
                                <Modal isOpen={isMajorDamage1ModalOpen} onRequestClose={closeMajorDamage1Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .MajorDamages1} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage1Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .MajorDamages1} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 2:
                        {formData .MajorDamages2 ? (
                            <>
                                <img
                                    src={formData .MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openMajorDamage2Modal}
                                />
                                <Modal isOpen={isMajorDamage2ModalOpen} onRequestClose={closeMajorDamage2Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .MajorDamages2} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage2Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .MajorDamages2} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 3:
                        {formData .MajorDamages3 ? (
                            <>
                                <img
                                    src={formData .MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openMajorDamage3Modal}
                                />
                                <Modal isOpen={isMajorDamage3ModalOpen} onRequestClose={closeMajorDamage3Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .MajorDamages3} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage3Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .MajorDamages3} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 4:
                        {formData .MajorDamages4 ? (
                            <>
                                <img
                                    src={formData .MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openMajorDamage4Modal}
                                />
                                <Modal isOpen={isMajorDamage4ModalOpen} onRequestClose={closeMajorDamage4Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .MajorDamages4} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage4Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .MajorDamages4} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 5:
                        {formData .MajorDamages5 ? (
                            <>
                                <img
                                    src={formData .MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px",border:"3px solid grey",borderRadius:"10px", cursor:"pointer" }}
                                    onClick={openMajorDamage5Modal}
                                />
                                <Modal isOpen={isMajorDamage5ModalOpen} onRequestClose={closeMajorDamage5Modal} contentLabel="Cluster Number Modal">
                                    <div className="modal-header">
                                        <IconButton href={formData .MajorDamages5} download color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={closeMajorDamage5Modal} color="secondary">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className="modal-image-container">
                                        <img src={formData .MajorDamages5} alt="Cluster Number" className="modal-image" />
                                    </div>
                                </Modal>
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
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
                        <textarea className='form-control' name="partsArrangement" value={formData.partsArrangment} readOnly />
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

export default MechanicResponse;