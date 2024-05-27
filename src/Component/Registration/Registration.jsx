import React, { useState, useEffect } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import Modal from '../Location1/Modal'; // Import the modal component

function Registration({ onVehicleData }) {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [regNo, setRegNo] = useState('');
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [comingVehicleInfo, setComingVehicleInfo] = useState([]);
    const [comingVehicle, setComingVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    console.log("comingData", comingVehicle)

    useEffect(() => {
        if (vehicleInfo.length !== 0) {
            setComingVehicleInfo([vehicleInfo[0].data]);
        }
    }, [vehicleInfo]);

    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);

    useEffect(() => {
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

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

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {comingVehicleInfo && (
                        <div>
                            <div className="responsive-table">
                                {comingVehicleInfo.length === 0 ? (
                                    <div style={{ textAlign: 'center', fontWeight: "bold" }}>No Response from this vendor...</div>
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
