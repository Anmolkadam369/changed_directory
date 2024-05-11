import React, { useState, useEffect } from 'react';
import "../CustomerApporoved/CustomerApproved.css"
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../environment';

const VendorApproved = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    getData();
    // generateToken();   
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  async function generateToken() {
    try {
      const authUrl = 'https://staging.eko.in:25004/ekoapi/v1/pan/verify';
      const authHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "developer_key": "becbbce45f79c6f5109f848acd540567",
        "secret-key": "MC6dKW278tBef+AuqL/5rW2K3WgOegF0ZHLW/FriZQw=",
        "secret-key-timestamp": "1516705204593"
      };
      const authData = {
        "pan_number": "JTQPK6202L",
        "purpose": 1,
        "purpose_desc": "to know customer",
        "initiator_id": "9971771929",
        "developer_key": "becbbce45f79c6f5109f848acd540567",
        "secret-key": "MC6dKW278tBef+AuqL/5rW2K3WgOegF0ZHLW/FriZQw=",
        "secret-key-timestamp": "1516705204593"
      };
      console.log(authData);
      const authResponse = await axios.post(authUrl, authData, {
        headers: authHeaders,
      });
      console.log("some")
      console.log(authResponse.data);
      const token = authResponse.data.access_token;
      console.log('Access token', token);

      return token;
    } catch (error) {
      throw error.message;
    }
  }

  function view(id) {
    console.log("myId", id)
    navigate("../VendorMasterEdit", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getVendor`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };
  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      <h3 className='bigtitle'>Vendor View / Edit</h3>
      <div className='responsive-table'>
      <table style={{ width: '90%', marginLeft:"20px", borderCollapse: 'collapse' ,marginBottom:"90px"}}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Vendors Name</th>
            <th>Vendor Email</th>
            <th>Vendor Type</th>
            <th>Edited By</th>
            <th>View</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.vendorName}</td>
              <td>{item.email}</td>
              <td>{item.vendorType}</td>
              <td>{item.EditedBy}</td>
              <td>
                <button onClick={() => view(item.id)} className='view-button'>View</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

};

export default VendorApproved;
