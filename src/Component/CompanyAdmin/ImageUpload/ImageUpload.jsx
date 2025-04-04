import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./ImageUpload.css";
import '../Location1/Location1.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Admin from '../../../Pages/CompanyAdmin/AdminHome/SideBar/Admin';

function ImageUpload() {
    const {state, location} = useLocation();
    
    const { id } = state.id;
    console.log("Received ID:", id);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'error' });
    const [showServices, setShowServices] = useState(true);
    const [formData, setFormData] = useState({});
    const [count, setCount] = useState(0);  // Initialize count to 0
    const [showAddButton, setShowAddButton] = useState(true);

    const [photos, setPhotos] = useState({
        frontLH: null,
        frontRH: null,
        rearLH: null,
        rearRH: null,
        ChassisNoView: null,
        ClusterView: null,
        frontView: null,
        rearView: null,
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null,
    });

    const [additionalPhotos, setAdditionalPhotos] = useState([]);  // Initialize as an array

    console.log("additionalPhotos", additionalPhotos);
    console.log("photos", photos);
    const allPhotos = [...Object.values(photos), ...additionalPhotos];
    console.log("allPhotos", allPhotos);

    const photoRefs = {
        frontLH: useRef(null),
        frontRH: useRef(null),
        rearLH: useRef(null),
        rearRH: useRef(null),
    };

    const additionalPhotoRefs = useRef([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoPreviews, setPhotoPreviews] = useState({});

    useEffect(() => {
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
    }, [token, userId, navigate]);

    useEffect(() => {
        if (count === 2) {
            setShowAddButton(false);
        }
    }, [count]);

    const handleFileChange = (event, type, index = null) => {
        const file = event.target.files[0];
        if (file && file.size > 2097152) {
            console.log("File size should be less than 2 MB!");
            setAlertInfo({ show: true, message: "File size should be less than 2 MB", severity: 'error' });
            if (index !== null) {
                additionalPhotoRefs.current[index].value = "";
            } else {
                photoRefs[type].current.value = "";
            }
        } else if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (index !== null) {
                    const newPhotos = [...additionalPhotos];
                    newPhotos[index] = file;
                    setAdditionalPhotos(newPhotos);

                    const newPreviews = { ...photoPreviews };
                    newPreviews[`additional-${index}`] = reader.result;
                    setPhotoPreviews(newPreviews);
                } else {
                    setPhotos(prev => ({ ...prev, [type]: file }));
                    setPhotoPreviews(prev => ({ ...prev, [type]: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();

        const allPhotos = [...Object.values(photos), ...additionalPhotos];

        allPhotos.forEach((photo, index) => {
            if (photo) {
                formData.append(`photo${index + 1}`, photo);
            } else {
                formData.append(`photo${index + 1}`, null); // Append null for missing photos
            }
        });

        // Log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        console.log(`${process.env.REACT_APP_BACKEND_URL}/api/DialyAccidentVehicleImage/${userId}/${id}`)

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/DialyAccidentVehicleImage/${userId}/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("response", response)

            if (response.status === 200) {
                setSnackbarMessage("Photos uploaded successfully!");
                setTimeout(() => {
                    // navigate("../Admin");
                  navigate(-1);
                }, 2000);
            } else {
                setSnackbarMessage("Failed to upload photos.");
            }
        } catch (error) {
            console.error("Error uploading photos:", error);
            setOpenSnackbar(true);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setSnackbarMessage("Your session has expired. Redirecting to login...");
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setSnackbarMessage("An error occurred while uploading photos.");
            }
        } finally {
            setOpenSnackbar(true);
            setIsSubmitting(false);
        }
    };




    const handleAddMorePhotos = () => {
        setAdditionalPhotos(prev => [...prev, null]);
        additionalPhotoRefs.current.push(React.createRef());
        setCount(count + 1);
    };

    const handleBack = () => {
        // navigate("../Admin");
      navigate(-1)
    };

    return (
        <div className="Customer-master-form">
            <Admin/>
            <Helmet>
                <title>Accident Images Upload - Claimpro</title>
                <meta name="description" content="Upload Accident Images" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/ImageUpload`} />
            </Helmet>
            <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
            <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
            <div className='header-container'>
                <h2 className='bigtitle'>Daily Image Upload</h2>
                <span className="mandatory-note">All fields are mandatory</span>
            </div>
            </div>
            {Object.keys(photos).map((type, index) => (
                <div key={type} className="photo-input-section">
                    <label>
                        {type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                        <input
                            type="file"
                            accept="image/*"
                            ref={photoRefs[type]}
                            capture="environment"
                            className="form-control"
                            onChange={(e) => handleFileChange(e, type)}
                        />
                    </label>
                    {photoPreviews[type] && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px' }}>
                            <img src={photoPreviews[type]} alt={`Upload preview ${type}`} style={{ width: 100, height: 100 }} />
                            <Button variant="contained" onClick={() => {
                                setPhotos(prev => ({ ...prev, [type]: null }));
                                setPhotoPreviews(prev => ({ ...prev, [type]: null }));
                                photoRefs[type].current.value = "";
                            }}>Remove</Button>
                        </div>
                    )}
                </div>
            ))}

            {additionalPhotos.map((photo, index) => (
                <div key={index} className="photo-input-section">
                    <label>
                        Additional Photo {index + 1}:
                        <input
                            type="file"
                            ref={additionalPhotoRefs.current[index]}
                            accept="image/*"
                            capture="environment"
                            className="form-control"
                            onChange={(e) => handleFileChange(e, 'additional', index)}
                        />
                    </label>
                    {photoPreviews[`additional-${index}`] && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px' }}>
                            <img src={photoPreviews[`additional-${index}`]} alt={`Upload preview additional-${index}`} style={{ width: 100, height: 100 }} />
                            <Button variant="contained" onClick={() => {
                                const newPhotos = [...additionalPhotos];
                                newPhotos[index] = null;
                                setAdditionalPhotos(newPhotos);

                                const newPreviews = { ...photoPreviews };
                                newPreviews[`additional-${index}`] = null;
                                setPhotoPreviews(newPreviews);

                                additionalPhotoRefs.current[index].value = "";
                            }}>Remove</Button>
                        </div>
                    )}
                </div>
            ))}

            {showAddButton && (
                <Button variant="contained" onClick={handleAddMorePhotos} style={{ margin: '20px 0' }}>
                    +
                </Button>
            )}
        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

            <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                <Button variant="contained" disabled={isSubmitting} style={{ textAlign: 'center' }} onClick={handleSubmit}>
                    Submit Photos
                </Button>
            </div>
        </div>
    );
}

export default ImageUpload;
