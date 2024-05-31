import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet';


const VendorResponse = () => {
  const [data, setdata] = useState([]);
  console.log("setData",data)

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

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/vendorResponse`);
    setdata(response.data.data)
  };

  const view = (vehicle)=>{
    console.log("vehicle");
    console.log("vehicle", vehicle);
    navigate("../ActualVendorResponse", {state:{vehicle}})
  }
  
  return (
    <div style={{ padding: '20px', margin: '20px' }}>
      <Helmet>
        <title>Vendor Response Overview - Claimpro</title>
        <meta name="description" content="View and manage vendor responses for vehicle accidents. Keep track of customer names, vehicle numbers, and actions taken." />
        <meta name="keywords" content="Vehicle Accidents, Customer Service, Claimpro, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
      </Helmet>

          <h3 class="bigtitle">Vendor Response Overview</h3>

        <div>
            <div style={{marginTop:"50px"}}>
               <div className='vendor-response-responsive-table'>
               <table style={{ width: '90%', borderCollapse: 'collapse' ,marginBottom:"90px"}}>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Vehicle Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Response from this vendor...</td>
                    </tr>
                  ) : (
                    data.map((vehicle, index) => (
                      <tr key={vehicle.AccidentVehicleCode} >
                        <td>{vehicle.CustomerName || '---'}</td>
                        <td>{vehicle.vehicleNumber || '---'}</td>
                        <td>
                          <div>
                      <button onClick={() => view(vehicle)} className='view-button' >View</button>
                      </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              </div>  
            </div>
        </div>
      </div>
  );

};

export default VendorResponse;
