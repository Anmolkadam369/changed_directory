import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';



const VendorResponse = () => {

  const [machanicData, setMachanicData] = useState([]);
  const [craineData, setcraineData] = useState([]);
  const [advocateData, setAdvocateData] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);

  console.log("Advocatedata", advocateData)
  const [data, setdata] = useState([]);
  console.log("datassssssssssssssssssssssssssss",data)

  console.log("machaicDaa", machanicData)
  const navigate = useNavigate();
  const location = useLocation();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  const [formData, setFormData] = useState({
    vehicleNo: ""
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'pincode' || name === 'vendorPhone' || name === "contactPersonNum" || name === "contactPersonNum2") {
  //     const re = /^[0-9\b]+$/;
  //     if (value === '' || re.test(value)) {
  //       if ((name === 'pincode' && value.length <= 6) || (name === 'vendorPhone' && value.length <= 10) || (name === 'contactPersonNum' && value.length <= 10) || (name === 'contactPersonNum2' && value.length <= 10)) {
  //         setFormData(prevState => ({
  //           ...prevState,
  //           [name]: value
  //         }));
  //       }
  //     }
  //   }

  //   else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // };

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/vendorResponse`);
    console.log("response", response.data);
    console.log("machanicData", response.data.data)
    console.log("machanicData", response.data.data[0].machanicData)
    setdata(response.data.data)
    setMachanicData(response.data.data[0].machanicData);
    setcraineData(response.data.data[0].craineData);
    setAdvocateData(response.data.data[0].advocateData);
    setWorkshopData(response.data.data[0].workshopData);

  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  const viewMachanic = (data)=>{
    console.log("DATA",data)
    navigate("../MachanicResponse", { state: { data } });
  }
  
  const viewCraine = (data)=>{
    console.log("DATA",data);
    navigate("../CraineResponse", { state: { data } });
  }
  const viewAdvocate = (data)=>{
    console.log("DATA",data);
    navigate("../AdvocateResponse", { state: { data } });
  }
  const viewWorkshop = (data)=>{
    console.log("DATA",data);
    navigate("../WorkshopResponse", { state: { data } });
  }
  
  return (
    <div style={{ padding: '20px', margin: '20px' }}>
      <div class="header-container">
          <h3 class="bigtitle">Vendor Response Overview</h3>
        </div>

      <div style={{ padding: '20px', marginTop: '20px',marginBottom:"30px", boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div>
          {data.map((vehicle, vehicleIndex) => (
            <div key={vehicle.AccidentVehicleCode} style={{marginTop:"50px"}}>
              <hr />
               <h2 className='title1'>Customer Name: {vehicle.CustomerName}    |    Vehicle Number: {vehicle.vehicleNumber}</h2>
              
              <table style={{marginLeft:"30px"}}>
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

              <table style={{marginLeft:"30px"}}>
                <thead>
                  <tr>
                    <th>Vehicle Inspection</th>
                    <th>Work Estimator</th>
                    <th>Recovery Van Estimate</th>
                    <th>Vehicle Handover</th>
                    <th>Advanced Payment</th>
                    <th>Vehicle TakeOver</th>
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
                        <td>{item.workEstimate || '---'}</td>
                        <td>{item.recoveryVanEstimate || '---'}</td>
                        <td>{item.vehicleHandover || '---'}</td>
                        <td>{item.advancedPayment || '---'}</td>
                        <td>{item.vehicleTakeOver || '---'}</td>
                        <td>{item.balancePayment || '---'}</td>
                        <td>
                <button onClick={() => viewCraine(item)} className='view-button'>View</button>
              </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <table style={{ marginLeft:"30px" }}>
                <thead>
                  <tr>
                    <th>FIR Copy</th>
                    <th>Company Representative</th>
                    <th>POA</th>
                    <th>Petition Copy</th>
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
                         <td>{item.FIRCopy || '---'}</td>
                        <td>{item.companyRepresentative || '---'}</td>
                        <td>{item.POA ? "uploaded" :'---'}</td>
                        <td>{item.petitionCopy ? "uploaded" :'---'}</td>
                        <td>{item.policeReportCopy ? "uploaded" :'---'}</td>
                        <td>{item.indemnityBondCopy ? "uploaded" :'---'}</td>
                        <td>{item.bailerDetails ? "uploaded" :'---'}</td>
                        <td>{item.releaseOrderCopy ? "uploaded" :'---'}</td>
                        <td>
                <button onClick={() => viewAdvocate(item)} className='view-button'>View</button>
              </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <table style={{ marginLeft:"30px" }}>
                <thead>
                  <tr>
                    <th>Payment</th>
                    <th>Vehicle Handover</th>
                    <th>Enstimate Given</th>
                    <th>Agreement CPA</th>
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
                        <td>{item.payment  ? "uploaded" :'---'}</td>
                        <td>{item.vehicleHandover  ? "uploaded" :'---'}</td>
                        <td>{item.estimateGiven  ? "uploaded" :'---'}</td>
                        <td>{item.agreementCPA  ? "uploaded" :'---'}</td>
                        <td>{item.deadlineSheet  ? "uploaded" :'---'}</td>
                        <td>{item.supplementryEstimate  ? "uploaded" :'---'}</td>
                        <td>{item.preApproval  ? "uploaded" :'---'}</td>
                        <td>
                <button onClick={() => viewWorkshop(item)} className='view-button'>View</button>
              </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default VendorResponse;
