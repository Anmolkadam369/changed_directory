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


const SeeUpdatedPics = ({ id, onUpdate }) => {
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received ID:", id);
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    console.log("comingData", comingData)
    const [selectedDate, setSelectedDate] = useState(today)



    const [isClusterViewModalOpen, setIsClusterViewModalOpen] = useState(false);
    const [isFrontLHModalOpen, setIsFrontLHModalOpen] = useState(false);
    const [isFrontRHModalOpen, setIsFrontRHModalOpen] = useState(false);

    const [isFrontViewModalOpen, setIsFrontViewModalOpen] = useState(false);
    const [isRearViewModalOpen, setIsRearViewModalOpen] = useState(false);
    const [isChassisNoViewModalOpen, setIsChassisNoViewModalOpen] = useState(false);


    const [isRearRHModalOpen, setIsRearRHModalOpen] = useState(false);
    const [isRearLHModalOpen, setIsRearLHModalOpen] = useState(false);
    const [isMajorDamages1ModalOpen, setIsMajorDamages1ModalOpen] = useState(false);

    const [isMajorDamages2ModalOpen, setIsMajorDamages2ModalOpen] = useState(false);
    const [isMajorDamages3ModalOpen, setIsMajorDamages3ModalOpen] = useState(false);
    const [isMajorDamages4ModalOpen, setIsMajorDamages4ModalOpen] = useState(false);
    const [isMajorDamages5ModalOpen, setIsMajorDamages5ModalOpen] = useState(false);


    const [isAdditionalPhoto1ModalOpen, setIsAdditionalPhoto1ModalOpen] = useState(false);
    const [isAdditionalPhoto2ModalOpen, setIsAdditionalPhoto2ModalOpen] = useState(false);


    const openClusterViewModal = () => setIsClusterViewModalOpen(true);
    const closeClusterViewModal = () => setIsClusterViewModalOpen(false);

    const openFrontLHModal = () => setIsFrontLHModalOpen(true);
    const closeFrontLHModal = () => setIsFrontLHModalOpen(false);

    const openFrontRHModal = () => setIsFrontRHModalOpen(true);
    const closeFrontRHModal = () => setIsFrontRHModalOpen(false);

    const openFrontViewModal = () => setIsFrontViewModalOpen(true);
    const closeFrontViewModal = () => setIsFrontViewModalOpen(false);

    const openRearViewModal = () => setIsRearViewModalOpen(true);
    const closeRearViewModal = () => setIsRearViewModalOpen(false);

    const openChassisNoViewModal = () => setIsChassisNoViewModalOpen(true);
    const closeChassisNoViewModal = () => setIsChassisNoViewModalOpen(false);

    const openRearRHModal = () => setIsRearRHModalOpen(true);
    const closeRearRHModal = () => setIsRearRHModalOpen(false);

    const openRearLHModal = () => setIsRearLHModalOpen(true);
    const closeRearLHModal = () => setIsRearLHModalOpen(false);

    const openMajorDamages1Modal = () => setIsMajorDamages1ModalOpen(true);
    const closeMajorDamages1Modal = () => setIsMajorDamages1ModalOpen(false);

    const openMajorDamages2Modal = () => setIsMajorDamages2ModalOpen(true);
    const closeMajorDamages2Modal = () => setIsMajorDamages2ModalOpen(false);

    const openMajorDamages3Modal = () => setIsMajorDamages3ModalOpen(true);
    const closeMajorDamages3Modal = () => setIsMajorDamages3ModalOpen(false);

    const openMajorDamages4Modal = () => setIsMajorDamages4ModalOpen(true);
    const closeMajorDamages4Modal = () => setIsMajorDamages4ModalOpen(false);

    const openMajorDamages5Modal = () => setIsMajorDamages5ModalOpen(true);
    const closeMajorDamages5Modal = () => setIsMajorDamages5ModalOpen(false);

    const openAdditionalPhoto1Modal = () => {
        setIsAdditionalPhoto1ModalOpen(true);
    };
    const closeAdditionalPhoto1Modal = () => {
        setIsAdditionalPhoto1ModalOpen(false);
    };

    const openAdditionalPhoto2Modal = () => {
        setIsAdditionalPhoto2ModalOpen(true);
    };
    const closeAdditionalPhoto2Modal = () => {
        setIsAdditionalPhoto2ModalOpen(false);
    };



    useEffect(() => {
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
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
                RearView: comingData.RearView || "",
                ChassisNoView: comingData.ChassisNoView || "",
                MajorDamages1: comingData.MajorDamages1 || "",
                MajorDamages2: comingData.MajorDamages2 || "",
                MajorDamages3: comingData.MajorDamages3 || "",
                MajorDamages4: comingData.MajorDamages4 || "",
                MajorDamages5: comingData.MajorDamages5 || "",
                ClusterView: comingData.ClusterView || "",
                FrontView: comingData.FrontView || "",
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
        FrontView: "",
        RearView: "",
        ClusterView:"",
        ChassisNoView: "",
        MajorDamages1: "",
        MajorDamages2: "",
        MajorDamages3: "",
        MajorDamages4: "",
        MajorDamages5: "",
        AdditionalPhoto1: "",
        AdditionalPhoto2: ""
    });

    console.log("FORMDA", formData)


    const getDataByDate = async (date) => {
        setComingData([]);
        console.log("ID", id)
        console.log("Fetching data for date:", date);
        const response = await axios.get(`${backendUrl}/api/getDataByDate/${id}/${date}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
        console.log("daa", response.data.data)
        console.log("length", response.data.data.length)
        if (response.data.data.length === 0) {
            console.log("NO DATA")
            setFormData({
                FrontLH: "No_Photo_Uploaded",
                FrontRH: "No_Photo_Uploaded",
                RearLH: "No_Photo_Uploaded",
                RearRH: "No_Photo_Uploaded",
                FrontView: "No_Photo_Uploaded",
                RearView: "No_Photo_Uploaded",
                ClusterView:"No_Photo_Uploaded",
                ChassisNoView: "No_Photo_Uploaded",
                MajorDamages1: "No_Photo_Uploaded",
                MajorDamages2: "No_Photo_Uploaded",
                MajorDamages3: "No_Photo_Uploaded",
                MajorDamages4: "No_Photo_Uploaded",
                MajorDamages5: "No_Photo_Uploaded",
                AdditionalPhoto1: "No_Photo_Uploaded",
                AdditionalPhoto2: "No_Photo_Uploaded"
            });

        }
        else {
            console.log("responseComingData", response.data.data[0]);
        }
        setComingData(response.data.data[0])
    }
    const handleBack = () => {
        onUpdate()
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
            <form className="Customer-master-form" style={{ marginBottom: "50px", marginLeft: "0px", padding: "20px" }}>
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
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openFrontLHModal}
                                    />
                                    <Modal isOpen={isFrontLHModalOpen} onRequestClose={closeFrontLHModal} contentLabel="PAN Card Modal">
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
                            formData.FrontRH != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.FrontRH}
                                        alt="Front RH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openFrontRHModal}
                                    />
                                    <Modal isOpen={isFrontRHModalOpen} onRequestClose={closeFrontRHModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.FrontRH} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeFrontRHModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.FrontRH} alt="PAN Card" style={{ width: '100%' }} />
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
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openRearRHModal}
                                    />
                                    <Modal isOpen={isRearRHModalOpen} onRequestClose={closeRearRHModal} contentLabel="PAN Card Modal">
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
                    <label className="form-field">
                        REAR LH :
                        {
                            formData.RearLH != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.RearLH}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openRearLHModal}
                                    />
                                    <Modal isOpen={isRearLHModalOpen} onRequestClose={closeRearLHModal} contentLabel="PAN Card Modal">
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
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Front View:
                        {
                            formData.FrontView != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.FrontView}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openFrontViewModal}
                                    />
                                    <Modal isOpen={isFrontViewModalOpen} onRequestClose={closeFrontViewModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.FrontView} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeFrontViewModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.FrontView} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Front View uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Rear View:
                        {
                            formData.RearView != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.RearView}
                                        alt="Front RH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openRearViewModal}
                                    />
                                    <Modal isOpen={isRearViewModalOpen} onRequestClose={closeRearViewModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.RearView} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeRearViewModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.RearView} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Rear View uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Chassis No View:
                        {
                            formData.ChassisNoView != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.ChassisNoView}
                                        alt="Rear RH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openChassisNoViewModal}
                                    />
                                    <Modal isOpen={isChassisNoViewModalOpen} onRequestClose={closeChassisNoViewModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.ChassisNoView} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeChassisNoViewModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.ChassisNoView} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Chassis No uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Cluster View :
                        {
                            formData.ClusterView != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.ClusterView}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openClusterViewModal}
                                    />
                                    <Modal isOpen={isClusterViewModalOpen} onRequestClose={closeClusterViewModal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.ClusterView} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeClusterViewModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.ClusterView} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Cluster View uploaded</p>
                            )
                        }
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Major Damages 1:
                        {
                            formData.MajorDamages1 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.MajorDamages1}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openMajorDamages1Modal}
                                    />
                                    <Modal isOpen={isMajorDamages1ModalOpen} onRequestClose={closeMajorDamages1Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.MajorDamages1} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeMajorDamages1Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.MajorDamages1} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Major Damages 1 uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Major Damages 2:
                        {
                            formData.MajorDamages2 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.MajorDamages2}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openMajorDamages2Modal}
                                    />
                                    <Modal isOpen={isMajorDamages2ModalOpen} onRequestClose={closeMajorDamages2Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.MajorDamages2} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeMajorDamages2Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.MajorDamages2} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Major Damages 3 uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Major Damages 3:
                        {
                            formData.MajorDamages3 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.MajorDamages3}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openMajorDamages3Modal}
                                    />
                                    <Modal isOpen={isMajorDamages3ModalOpen} onRequestClose={closeMajorDamages3Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.MajorDamages3} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeMajorDamages3Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.MajorDamages3} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Major Damages 3 uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Major Damages 4:
                        {
                            formData.MajorDamages4 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.MajorDamages4}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openMajorDamages4Modal}
                                    />
                                    <Modal isOpen={isMajorDamages4ModalOpen} onRequestClose={closeMajorDamages4Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.MajorDamages4} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeMajorDamages4Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.MajorDamages4} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Major Damages 4 uploaded</p>
                            )
                        }
                    </label>

                </div>
                <div className="form-row">
                    <label className="form-field">
                        Major Damages 5:
                        {
                            formData.MajorDamages5 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.MajorDamages5}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openMajorDamages5Modal}
                                    />
                                    <Modal isOpen={isMajorDamages5ModalOpen} onRequestClose={closeMajorDamages5Modal} contentLabel="PAN Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={formData.MajorDamages5} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeMajorDamages5Modal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={formData.MajorDamages5} alt="PAN Card" style={{ width: '100%' }} />
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
                                    No Major Damages 5 uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Additional Photo 1 :
                        {
                            formData.AdditionalPhoto1 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.AdditionalPhoto1}
                                        alt="AdditionalPhoto1"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openAdditionalPhoto1Modal}
                                    />
                                    <Modal isOpen={isAdditionalPhoto1ModalOpen} onRequestClose={closeAdditionalPhoto1Modal} contentLabel="PAN Card Modal">
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
                                    No Additional Photo 1 uploaded</p>
                            )
                        }
                    </label>
                    <label className="form-field">
                        Additional Photo 2 :
                        {
                            formData.AdditionalPhoto2 != "No_Photo_Uploaded" ? (
                                <>
                                    <img
                                        src={formData.AdditionalPhoto2}
                                        alt="Front LH"
                                        style={{ maxWidth: '100px', display: 'block', marginTop: "20px", border: "3px solid grey", borderRadius: "10px", cursor: "pointer" }}
                                        onClick={openAdditionalPhoto2Modal}
                                    />
                                    <Modal isOpen={isAdditionalPhoto2ModalOpen} onRequestClose={closeAdditionalPhoto2Modal} contentLabel="PAN Card Modal">
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
                                    No Additional Photo 2 uploaded</p>
                            )
                        }
                    </label>
                    <label className='form-field'></label>
                </div>
            </form>
        </div>
    )
}

export default SeeUpdatedPics;