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

    const [mechanicData, setMechanicData] = useState([]);
    const [craneData, setcraneData] = useState([]);
    const [advocateData, setAdvocateData] = useState([]);
    const [workshopData, setWorkshopData] = useState([]);

    console.log("Advocatedata", advocateData)


    console.log("machaicDaa", mechanicData)
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
        <div style={{ padding: '0px', margin: '10px' }}>
            <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>BACK</Button>
            <h3 className="bigtitle">Vendor Response</h3>

            <div>
                {data.map((vehicle, vehicleIndex) => (
                    <div key={vehicle.AccidentVehicleCode}>
                        <h2 className="title1">Mechanic Data</h2>
                        <div className="responsive-table">
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "30px" }}>
                                <thead>
                                    <tr>
                                        <th>Vehicle Ins.</th>
                                        <th>Labour Est.</th>
                                        <th>Parts Arrangement</th>
                                        <th>Trial</th>
                                        <th>Payment</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.mechanicData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>No Response from this vendor...</td>
                                        </tr>
                                    ) : (
                                        vehicle.mechanicData.map((item, index) => (
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

                        <h2 className="title1">Crane Data</h2>
                        <div className="responsive-table">
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "30px" }}>
                                <thead>
                                    <tr>
                                        <th>Vehicle Ins.</th>
                                        <th>Recovery van </th>
                                        <th>Vehicle Handover</th>
                                        <th>Advanced Payment</th>
                                        <th>Balance Payment</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.craneData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>No Response from this vendor...</td>
                                        </tr>
                                    ) : (
                                        vehicle.craneData.map((item, index) => (
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

                        <h2 className="title1">Advocate Data</h2>
                        <div className="responsive-table">
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "30px" }}>
                                <thead>
                                    <tr>
                                        <th>POA</th>
                                        <th>Police Report</th>
                                        <th>Indemnity Bond Copy</th>
                                        <th>Bailer Details</th>
                                        <th>Release Order</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.advocateData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>All Vehicles are assigned To Vendors...</td>
                                        </tr>
                                    ) : (
                                        vehicle.advocateData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.POA ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.policeReportCopy ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.indemnityBondCopy ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.bailerDetails ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.releaseOrderCopy ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>
                                                    <button onClick={() => viewAdvocate(item)} className='view-button'>View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="title1">Workshop Data</h2>
                        <div className="responsive-table">
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                <thead>
                                    <tr>
                                        <th>Payment</th>
                                        <th>Est. Given</th>
                                        <th>Deadline Sheet</th>
                                        <th>Supplementary Estimate</th>
                                        <th>Pre Appr.</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicle.workshopData.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>All Vehicles are assigned To Vendors...</td>
                                        </tr>
                                    ) : (
                                        vehicle.workshopData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.payment ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.estimateGiven ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.deadlineSheet ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                <td>{item.supplementryEstimate ? <span style={{ fontWeight: 'bold' }}>uploaded</span>: '---'}</td>
                                                <td>{item.preApproval ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
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
