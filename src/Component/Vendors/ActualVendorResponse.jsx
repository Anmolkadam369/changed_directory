import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const ActualVendorResponse = () => {

    const [machanicData, setMachanicData] = useState([]);
    const [craineData, setcraineData] = useState([]);
    const [advocateData, setAdvocateData] = useState([]);
    const [workshopData, setWorkshopData] = useState([]);

    console.log("Advocatedata", advocateData)


    console.log("machaicDaa", machanicData)
    const navigate = useNavigate();
    const location = useLocation();
    const { vehicle } = location.state || {};
    console.log("VEHICLE", vehicle)
    const [data, setdata] = useState([vehicle]);
    console.log("datassssssssssssssssssssssssssss", data)

    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const [formData, setFormData] = useState({
        vehicleNo: ""
    });


    const viewMachanic = (data) => {
        console.log("DATA", data)
        navigate("../MachanicResponse", { state: { data } });
    }

    const viewCraine = (data) => {
        console.log("DATA", data);
        navigate("../CraineResponse", { state: { data } });
    }
    const viewAdvocate = (data) => {
        console.log("DATA", data);
        navigate("../AdvocateResponse", { state: { data } });
    }
    const viewWorkshop = (data) => {
        console.log("DATA", data);
        navigate("../WorkshopResponse", { state: { data } });
    }
    const handleBack = () => {
        navigate("../Admin")
    }


    return (
        <div style={{ padding: '20px', margin: '20px' }}>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>BACK</Button>
            <h3 class="bigtitle">Vendor Response Overview</h3>

            <div>
                {data.map((vehicle, vehicleIndex) => (

                    <div key={vehicle.AccidentVehicleCode}>
                        <div className='responsive-table'>
                            <table style={{ width: '90%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                <thead>
                                    <tr>
                                        <th>Vehicle Inspection</th>
                                        <th>Labour Estimation</th>
                                        <th>Parts Arrangement</th>
                                        <th>Trial</th>
                                        <th>Payment</th>
                                        <th>view</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.machanicData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center' }}>No Response from this vendor...</td>
                                        </tr>
                                    ) : (
                                        vehicle.machanicData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.vehicleInspection || '---'}</td>
                                                <td>{item.labourEstimate || '---'}</td>
                                                <td>{item.partsArrangment || '---'}</td>
                                                <td>{item.trial || '---'}</td>
                                                <td>{item.payment || '---'}</td>
                                                <td>
                                                    <button onClick={() => viewMachanic(item)} className='view-button'>View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>


                        <div className='responsive-table'>
                            <table style={{ width: '90%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                <thead>
                                    <tr>
                                        <th>Vehicle Inspection</th>
                                        <th>Recovery Van Estimate</th>
                                        <th>Vehicle Handover</th>
                                        <th>Advanced Payment</th>
                                        <th>Balance Payment</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.craineData.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: 'center' }}>No Response from this vendor...</td>
                                        </tr>
                                    ) : (
                                        vehicle.craineData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.vehicleInspection || '---'}</td>
                                                <td>{item.recoveryVanEstimate || '---'}</td>
                                                <td>{item.vehicleHandover || '---'}</td>
                                                <td>{item.advancedPayment || '---'}</td>
                                                <td>{item.balancePayment || '---'}</td>
                                                <td>
                                                    <button onClick={() => viewCraine(item)} className='view-button'>View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className='responsive-table'>
                            <table style={{ width: '90%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                <thead>
                                    <tr>
                                        <th>Power Of Attorney</th>
                                        <th>Police Report Copy</th>
                                        <th>Indemnity Bond Copy</th>
                                        <th>Bailer Details</th>
                                        <th>Release Order Copy</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.advocateData.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: 'center' }}>All Vehicles are assigned To Vendors...</td>
                                        </tr>
                                    ) : (
                                        vehicle.advocateData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.POA ? "uploaded" : '---'}</td>
                                                <td>{item.policeReportCopy ? "uploaded" : '---'}</td>
                                                <td>{item.indemnityBondCopy ? "uploaded" : '---'}</td>
                                                <td>{item.bailerDetails ? "uploaded" : '---'}</td>
                                                <td>{item.releaseOrderCopy ? "uploaded" : '---'}</td>
                                                <td>
                                                    <button onClick={() => viewAdvocate(item)} className='view-button'>View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className='responsive-table'>
                            <table style={{ width: '90%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                <thead>
                                    <tr>
                                        <th>Payment</th>
                                        <th>Enstimate Given</th>
                                        <th>Deadline Sheet</th>
                                        <th>Supplementry Estimate</th>
                                        <th>Pre Approval</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.workshopData.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: 'center' }}>All Vehicles are assigned To Vendors...</td>
                                        </tr>
                                    ) : (
                                        vehicle.workshopData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.payment ? "uploaded" : '---'}</td>
                                                <td>{item.estimateGiven ? "uploaded" : '---'}</td>
                                                <td>{item.deadlineSheet ? "uploaded" : '---'}</td>
                                                <td>{item.supplementryEstimate ? "uploaded" : '---'}</td>
                                                <td>{item.preApproval ? "uploaded" : '---'}</td>
                                                <td>
                                                    <button onClick={() => viewWorkshop(item)} className='view-button'>View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ActualVendorResponse;
