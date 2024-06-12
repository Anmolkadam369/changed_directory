import React, { useState, useEffect, useRef } from 'react';
import '../VenderMaster/VendorMasterForm.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import backendUrl from '../../environment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';


const SeeUpdatedPics = () => {
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received ID:", id);
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
    const [comingData, setComingData] = useState([]);
    console.log("comingData", comingData)
    const [selectedDate, setSelectedDate] = useState(today)


    const [isFrontLHModelOpen, setIsFrontLHModelOpen] = useState(false);
    const [isFrontRHModelOpen, setIsFrontRHModelOpen] = useState(false);
    const [isRearLHModelOpen, setIsRearLHModelOpen] = useState(false);
    const [isRearRHModelOpen, setIsRearRHModelOpen] = useState(false);
    const [isAdditionalPhoto1ModelOpen, setIsAdditionalPhoto1ModelOpen] = useState(false);
    const [isAdditionalPhoto2ModelOpen, setIsAdditionalPhoto2ModelOpen] = useState(false);


    const openFrontLHModal = () => {
        setIsFrontLHModelOpen(true);
    };
    const closeFrontLHModal = () => {
        setIsFrontLHModelOpen(false);
    };
    const openFrontRHModal = () => {
        setIsFrontRHModelOpen(true);
    };
    const closeFrontRHModal = () => {
        setIsFrontRHModelOpen(false);
    };

    const openRearRHModal = () => {
        setIsRearRHModelOpen(true);
    };
    const closeRearRHModal = () => {
        setIsRearRHModelOpen(false);
    };

    const openRearLHModal = () => {
        setIsRearLHModelOpen(true);
    };
    const closeRearLHModal = () => {
        setIsRearLHModelOpen(false);
    };

    const openAdditionalPhoto1Modal = () => {
        isAdditionalPhoto1ModelOpen(true);
    };
    const closeAdditionalPhoto1Modal = () => {
        isAdditionalPhoto1ModelOpen(false);
    };

    const openAdditionalPhoto2Modal = () => {
        isAdditionalPhoto2ModelOpen(true);
    };
    const closeAdditionalPhoto2Modal = () => {
        isAdditionalPhoto2ModelOpen(false);
    };



    useEffect(() => {
        if (token === "" || userId === "") {
            navigate("/");
        }
        console.log("todya", today)
        getDataByDate(today);
    }, [token, userId, navigate, id]); // Removed comingData from dependencies

    useEffect(() => {
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                FrontLH: comingData.FrontLH || "",
                FrontRH: comingData.FrontRH || "",
                RearLH: comingData.RearLH || "",
                RearRH: comingData.RearRH || "",
                AdditionalPhoto1: comingData.AdditionalPhoto1 || "",
                AdditionalPhoto2: comingData.AdditionalPhoto2 || "",
            }));
        }
    }, [comingData]);

    const [formData, setFormData] = useState({
        FrontLH: "",
        FrontRH: "",
        RearLH: "",
        RearRH: "",
        AdditionalPhoto1: "",
        AdditionalPhoto2: ""
    });

    console.log("FORMDA", formData)


    const getDataByDate = async (date) => {
        setComingData([]);
        console.log("ID", id)
        console.log("Fetching data for date:", date);
        const response = await axios.get(`${backendUrl}/api/getDataByDate/${id}/${date}`);
        console.log("daa", response.data.data)
        console.log("length", response.data.data.length)
        if (response.data.data.length === 0) {
            console.log("NO DATA")
            setFormData({
                FrontLH: "No_Photo_Uploaded",
                FrontRH: "No_Photo_Uploaded",
                RearLH: "No_Photo_Uploaded",
                RearRH: "No_Photo_Uploaded",
                AdditionalPhoto1: "No_Photo_Uploaded",
                AdditionalPhoto2: "No_Photo_Uploaded"
            });

        }
        else {
            console.log("response", response.data.data[0]);
        }
        setComingData(response.data.data[0])
    }
    const handleBack = () => {
        navigate("../userDashboard")
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedDate(value);
        console.log("selectedate", value);
        getDataByDate(value);
    }

    return (
        <div>
            <Helmet>
                <title>See Images - Claimpro</title>
                <meta name="description" content="BVC ClaimPro Assist and for vehicle accidents and see the Uploaded Images" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/SeeUpdatedPics`} />
            </Helmet>
            <form className="Customer-master-form" style={{ marginBottom: "50px" }}>
                <Button startIcon={<ArrowBackIcon />} onClick={handleBack} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className='bigtitle'>See Updated Pics</h3>
                    <label className="form-field input-group mb-3"></label>
                    <label className="form-field input-group mb-3"></label>
                    <label className="form-field input-group mb-3"></label>
                    <label className="form-field input-group mb-3"></label>
                    <label className="form-field input-group mb-3" style={{ width: '200px', textAlign: 'right' }}>
                        Choose Date
                        <input
                            type="date"
                            name="systemDate"
                            value={selectedDate}
                            onChange={handleChange}
                            className="form-control"
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </label>
                </div>

                <div className="form-row">


                    <label className="form-field">
                        FrontLH:
                        {
                            formData.FrontLH != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.FrontLH}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openFrontLHModal}
                                    />
                                    <Modal isOpen={isFrontLHModelOpen} onRequestClose={closeFrontLHModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.FrontLH} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeFrontLHModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.FrontLH} alt="PAN Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p style={{
                                    color: 'red',
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    margin: '10px 0',
                                    textAlign: 'center'
                                }}>
                                    No Front LH uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        FrontRH:
                        {
                            formData.FrontLH != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.FrontLH}
                                        alt="Front RH"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openFrontRHModal}
                                    />
                                    <Modal isOpen={isFrontRHModelOpen} onRequestClose={closeFrontRHModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.FrontLH} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeFrontRHModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.FrontLH} alt="PAN Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p style={{
                                    color: 'red',
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    margin: '10px 0',
                                    textAlign: 'center'
                                }}>
                                    No Front RH uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        REAR RH:
                        {
                            formData.RearRH != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.RearRH}
                                        alt="Rear RH"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openRearRHModal}
                                    />
                                    <Modal isOpen={isRearRHModelOpen} onRequestClose={closeRearRHModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.RearRH} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeRearRHModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.RearRH} alt="PAN Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p style={{
                                    color: 'red',
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    margin: '10px 0',
                                    textAlign: 'center'
                                }}>
                                    No Rear RH uploaded</p>
                            )
                        }
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        RearLH :
                        {
                            formData.RearLH != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.RearLH}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openRearLHModal}
                                    />
                                    <Modal isOpen={isRearLHModelOpen} onRequestClose={closeRearLHModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.RearLH} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeRearLHModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.RearLH} alt="PAN Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p style={{
                                    color: 'red',
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    margin: '10px 0',
                                    textAlign: 'center'
                                }}>
                                    No Rear LH uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        AdditionalPhoto1 :
                        {
                            formData.AdditionalPhoto1 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.AdditionalPhoto1}
                                        alt="AdditionalPhoto1"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openAdditionalPhoto1Modal}
                                    />
                                    <Modal isOpen={isAdditionalPhoto1ModelOpen} onRequestClose={closeAdditionalPhoto1Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.AdditionalPhoto1} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeAdditionalPhoto1Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.AdditionalPhoto1} alt="PAN Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p style={{
                                    color: 'red',
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    margin: '10px 0',
                                    textAlign: 'center'
                                }}>
                                    No Additional Photo1 uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        AdditionalPhoto2 :
                        {
                            formData.AdditionalPhoto2 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.AdditionalPhoto2}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openAdditionalPhoto2Modal}
                                    />
                                    <Modal isOpen={isAdditionalPhoto2ModelOpen} onRequestClose={closeAdditionalPhoto2Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.AdditionalPhoto2} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeAdditionalPhoto2Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.AdditionalPhoto2} alt="PAN Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p style={{
                                    color: 'red',
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    margin: '10px 0',
                                    textAlign: 'center'
                                }}>
                                    No Additional Photo2 uploaded</p>
                            )
                        }
                    </label>
                </div>
            </form>
        </div>
    )
}

export default SeeUpdatedPics;