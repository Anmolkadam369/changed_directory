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
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';


function MachanicResponse() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [action, setAction] = useState('');


    // Initially set formData from location state if available
    const initialData = location.state?.data || {
        vehicleInspection: "",
        labourEstimate: "",
        partsArrangment: "",
        trial: "",
        payment: "",
        feedback: "",
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
            console.log('Submitting with action:', action, formData.VendorCode);
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

    return (
        <div className='container'>
                   <div class="header-container">
          <h3 class="bigtitle">Data Uploaded by Mechanic</h3>
        </div>
            <div className='form-row'>
                {/* Ensure correct name attribute values are used */}
                <label className="form-field">
                    Vehicle Inspection Remarks:
                    <textarea className='inputField' name="vehicleInspection" value={formData.vehicleInspection} readOnly />
                </label>
                <label className="form-field">
                    Labour Estimate:
                    <input type="text" className='inputField' name="labourEstimate" value={formData.labourEstimate} readOnly />
                </label>
                <label className="form-field">
                    Parts Arrangement:
                    <textarea name="partsArrangement" className='inputField' value={formData.partsArrangment} readOnly />
                </label>

            </div>
            <div className='form-row'>
                <label className="form-field">
                    Trial:
                    <input type="text" className='inputField' name="trial" value={formData.trial} readOnly />
                </label>
                <label className="form-field">
                    Payment:
                    <input type="text" className='inputField' name="payment" value={formData.payment} readOnly />
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
                        <textarea name="reasonOfReject" className='inputField'value={formData.reasonOfReject}
                            onChange={e => setFormData({ ...formData, reasonOfReject: e.target.value })}
                        />
                    <button
                        type="button"
                        onClick={() => { onSubmit('reject'); }}
                        style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', marginLeft:"50px", marginTop:"20px"}}>
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
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => { setAction('reject'); }}
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Reject

                </button>
            </div>

        </div>
    );
}

export default MachanicResponse;