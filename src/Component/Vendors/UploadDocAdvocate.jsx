import React, { useEffect, useState } from 'react';
import '../EditAccidentVehicle/EditAccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';

function UploadDocAdvocate() {
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    const [IsReadOnly, setIsReadOnly] = useState(true);


    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        getDataById(id);
    }, [token, userId, navigate, id]);

    useEffect(() => {
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                chassisNo: comingData.chassisNo || '',
                engineNo: comingData.engineNo || '',
                entry_date: comingData.entry_date || '',
                make: comingData.make || '',
                model: comingData.model || '',
                latitude: comingData.latitude || '',
                longitude: comingData.longitude || '',
                accidentFileNo: comingData.accidentFileNo || '',
                accidentFileNo: comingData.accidentFileNo || "",
                ChassisNoView: null,
                ClusterView: null,
                MajorDamages1: null,
                MajorDamages2: null,
                MajorDamages3: null,
                MajorDamages4: null,
                MajorDamages5: null,
                frontLH: null,
                frontRH: null,
                rearLH: null,
                rearRH: null,
                frontView: null,
                rearView: null,
                CustomerName: comingData.CustomerName || "",
                choosenPlan: comingData.choosenPlan || '',
                advocate: "", workshop: '', machanic: "", crain: "",
                randomId: comingData.randomId || "",
                petitionCopy: "", policeReportCopy: "", indimnityBondCopy: "", bailerDetails: "", releaseUpload: "", feedbackByAdvocate: ""
            }));
            console.log("RANDOMID", comingData.randomId)
        }

    }, [comingData])

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo/${id}`);
        console.log("daa", response)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const [formData, setFormData] = useState({
        accidentFileNo: "",
        chassisNo: '',
        engineNo: '',
        entry_date: '',
        make: '',
        model: '',
        latitude: '',
        longitude: '',
        accidentFileNo: '',
        ChassisNoView: null,
        ClusterView: null,
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null,
        frontLH: null,
        frontRH: null,
        rearLH: null,
        rearRH: null,
        frontView: null,
        rearView: null,
        CustomerName: "",
        choosenPlan: "",
        firCopy:"",
        companyRepresentative:"",
        POA:"",
        petitionCopy:"",
        policeReportCopy:"", 
        indemnityBondCopy:"",
        bailerDetails:"",
        releaseOrderCopy:"",
        feedback:"",
        releaseUpload:""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('formData', formData);
        try {
            const response = await axios.post(`${backendUrl}/api/vendorOnAssignedVehicle/${id}/${userId}`, JSON.stringify(formData),{
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                  }
            });
            console.log("response", response.data.status);
            if (response.data.message === "data inserted successfully") {
                window.alert("Vehicle data updated successfully!!!");  // Correct method to show an alert
            } else {
                window.alert("Failed to update vehicle data.");  // Showing a failure message if the status is not true
            }
        } catch (error) {
            console.error("Error:", error);
            window.alert("An error occurred while updating vehicle data.");  // Alerting the user to an error
        }
    };


    return (
        <div className='container'>
            <div style={{
                textAlign: 'center',
                backgroundColor: '#4CAF50', // Choose your color
                color: 'white', // Choose text color
                padding: '20px 0', // Vertical padding and no horizontal padding
                marginBottom: '30px', // Space below the header
            }}>
                <h1>    </h1>
                <hr style={{
                    border: '0',
                    height: '2px', // Thickness of the hr
                    backgroundColor: '#fff', // Same as the text color for consistency
                    maxWidth: '50%', // Width of the hr
                    margin: '0 auto', // Center the hr
                }} />
            </div>

            <div className='form-row'>

                <label className="form-field">
                    Users Name:
                    <input
                        type="text"
                        name="CustomerName"
                        className='inputField'
                        value={formData.CustomerName}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>

                <label className="form-field">
                    Choosen Plan:
                    <input
                        type="text"
                        className='inputField'
                        name="choosenPlan"
                        value={formData.choosenPlan}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>

            </div>

            <div className='form-row'>
                <label className="form-field">
                    Chasis No:
                    <input
                        type="text"
                        name="chassisNo"
                        className='inputField'
                        value={formData.chassisNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    Engine No:
                    <input
                        type="text"
                        name="engineNo"
                        className='inputField'
                        value={formData.engineNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    Make:
                    <input
                        type="text"
                        name="make"
                        className='inputField'
                        value={formData.make}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    latitude:
                    <input
                        type="text"
                        name="latitude"
                        className='inputField'
                        value={formData.latitude}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
            </div>


            <div className='form-row'>
                <label className="form-field">
                    Longitude:
                    <input
                        type="text"
                        className='inputField'
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    accidentFileNo:
                    <input
                        type="text"
                        name="accidentFileNo"
                        className='inputField'
                        value={formData.accidentFileNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    accidentFileNo:
                    <input
                        type="text"
                        name="accidentFileNo"
                        className='inputField'
                        value={formData.accidentFileNo}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
                <label className="form-field">
                    model:
                    <input
                        type="text"
                        name="model"
                        className='inputField'
                        value={formData.model}
                        onChange={handleChange}
                        readOnly={IsReadOnly}
                    />
                </label>
            </div> 

                        <div style={{
                textAlign: 'center',
                backgroundColor: 'lightblue', // Choose your color
                color: 'brown', // Choose text color
                padding: '20px 0', // Vertical padding and no horizontal padding
                marginBottom: '30px', // Space below the header
            }}>
                <h1>DOCUMENT UPLOADED BY ADVOCATE</h1>
                <hr style={{
                    border: '0',
                    height: '2px', // Thickness of the hr
                    backgroundColor: '#fff', // Same as the text color for consistency
                    maxWidth: '50%', // Width of the hr
                    margin: '0 auto', // Center the hr
                }} />
            </div>
   

            <div className='form-row'>    
            <label className="form-field">
                    FIR Copy:
                    <input
                        type="file"
                        className='inputField'
                        name="firCopy"
                        value={formData.firCopy}
                        onChange={handleChange}
                    />
                </label> 
                <label className="form-field">
                    POA (Power Of Attorney):
                    <input
                        type="file"
                        className='inputField'
                        name="POA"
                        value={formData.POA}
                        onChange={handleChange}
                    />
                </label> 
                <label className="form-field">
                    Petition Copy:
                    <input
                        type="file"
                        className='inputField'
                        name="petitionCopy"
                        value={formData.petitionCopy}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    Police Report Copy:
                    <input
                        type="file"
                        className='inputField'
                        name="policeReportCopy"
                        value={formData.policeReportCopy}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    Indimnity Bond Copy:
                    <input
                        type="file"
                        name="indemnityBondCopy"
                        className='inputField'
                        value={formData.indemnityBondCopy}
                        onChange={handleChange}
                    />
                </label>

            </div>
            <div className='form-row'>
            <label className="form-field">
                    Bailer Details:
                    <input
                        type="file"
                        name="bailerDetails"
                        className='inputField'
                        value={formData.bailerDetails}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    Release Order Details:
                    <input
                        type="file"
                        name="releaseOrderCopy"
                        className='inputField'
                        value={formData.releaseOrderCopy}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    Release Order Upload:
                    <input
                        type="file"
                        name="releaseUpload"
                        className='inputField'
                        value={formData.releaseUpload}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-field">
                    FeedBack:
                    <textarea
                        name="feedback"
                        className='inputField'
                        value={formData.feedback}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default UploadDocAdvocate;
