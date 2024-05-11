import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';



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
                      <td colSpan="6" style={{ textAlign: 'center' }}>No Response from this vendor...</td>
                    </tr>
                  ) : (
                    data.map((vehicle, index) => (
                      <tr key={vehicle.AccidentVehicleCode} >
                        <td style={{ textAlign: 'center' }}>{vehicle.CustomerName || '---'}</td>
                        <td style={{ textAlign: 'center' }}>{vehicle.vehicleNumber || '---'}</td>
                        <td>
                          <div style={{display:'flex',justifyContent:"center", alignItems:'center'}}>
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
