import React, { useState, useEffect } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import Modal from '../Location1/Modal'; // Import the modal component
import { Helmet } from 'react-helmet-async';

function Registration({ onVehicleData }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [regNo, setRegNo] = useState('');
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [comingVehicleInfo, setComingVehicleInfo] = useState([]);
    const [comingVehicle, setComingVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [getData, setGetData] = useState({});
    const [showPopup, setShowPopup] = useState(true);


    console.log("comingData", comingVehicle)

    useEffect(() => {
        if (vehicleInfo.length !== 0) {
            setComingVehicleInfo([vehicleInfo[0].data]);
        }
    }, [vehicleInfo]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        findUserById(userId)
    }, [token, userId, navigate]);


    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${backendUrl}/api/findByIdCustomer/${id}`);
        console.log("daa", response.data)
        console.log("reginstration data", response.data.data[0]);
        setGetData(response.data.data[0])
    }

    async function getVehicleData() {
        try {
            const getData = await axios.get(`${backendUrl}/api/vehicle/${regNo}/${userId}`);
            if (getData.data.message === 'Vehicle found') {
                setVehicleInfo([getData.data]);
                setComingVehicle(getData.data);
                setIsModalOpen(true); // Open the modal when data is found
            } else {
                setAlertInfo({ show: true, message: getData.data.message, severity: 'success' });
            }
        } catch (error) {
            setAlertInfo({ show: true, message: error.response?.data?.message || 'An error occurred', severity: 'error' });
        }
    }

    const handleChange = (event) => {
        setRegNo(event.target.value);
    };

    const handleNext = () => {
        onVehicleData(comingVehicle);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="Registrationdetails-elem-16">
                <Helmet>
                    <title>Customer Service Vehicle Number - Claimpro</title>
                    <meta name="description" content="Customer Service Vehicle for BVC ClaimPro Assist to register the vehicle and get data about vehicle." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/Register`}/>
                </Helmet>
                <div style={{ position: 'relative' }}>
                    {getData.isActive === "false" && showPopup && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'lightgrey',
                            width: 'fit-content',
                            padding: '10px',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                            <button
                                onClick={() => setShowPopup(false)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                            <h3 style={{ margin: '0 20px 0 0' }}>You Are Not Currently Active To Take The Appoinments</h3>
                        </div>
                    )}
                </div>
                <div className="Registrationdetails-elem-15">
                    <div className="Registrationdetails-elem-14">
                        <span className="cd-paragraph-clean Registrationdetails-elem-7">
                            <p><em>Vehicle Details</em></p>
                        </span>
                        <div className="Registrationdetails-elem-13">
                            <div className="Registrationdetails-elem-11">
                                <div className="Registrationdetails-elem-10">
                                    <span className="cd-paragraph-clean Registrationdetails-elem-8">
                                        <p>Vehicle No OR Chassis No</p>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="Registrationdetails-elem-9"
                                        value={regNo}
                                        onChange={handleChange}
                                        disabled={getData.isActive === "false"}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="cd-paragraph-clean Registrationdetails-elem-12">
                        <p><br /></p>
                    </span>
                </div>
                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}
                <button
                    className="Registrationdetails-elem-6"
                    id="submitBtn"
                    type="submit"
                    value={regNo}
                    style={{ marginTop: '20px' }}
                    onClick={getVehicleData}
                >
                    <p>Submit</p>
                </button>

                <Modal className="custom-modal-content" isOpen={isModalOpen} onClose={closeModal}>
                        {comingVehicleInfo && (
                            <div>
                                <div className="responsive-table">
                                    {comingVehicleInfo.length === 0 ? (
                                        <div style={{ textAlign: 'center', fontWeight: "bold" }}>No Data Found Related This No...</div>
                                    ) : (
                                        comingVehicleInfo.map((item, index) => (
                                            <div key={index} className="vertical-table">
                                                <div className="table-row">
                                                    <div className="table-cell"><strong>Vehicle Number:</strong></div>
                                                    <div className="table-cell">{item.vehicleNo || '---'}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-cell"><strong>Chassis Number:</strong></div>
                                                    <div className="table-cell">{item.chassisNo || '---'}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-cell"><strong>Make:</strong></div>
                                                    <div className="table-cell">{item.make || '---'}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-cell"><strong>Model:</strong></div>
                                                    <div className="table-cell">{item.model || '---'}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-cell"><strong>Engine Number:</strong></div>
                                                    <div className="table-cell">{item.engineNo || '---'}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-cell"><strong>Insurance Name:</strong></div>
                                                    <div className="table-cell">{item.InsuranceName || '---'}</div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        type="submit"
                                        style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'rgb(173 223 227)', color: 'white' }}
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>

            </div >
        </div >
    );
}

export default Registration;
