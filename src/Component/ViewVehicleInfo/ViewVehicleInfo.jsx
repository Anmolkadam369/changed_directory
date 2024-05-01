import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../environment';

const ViewVehicleInfo = () => {
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
    navigate("../VehicleClaimEdit", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/vehicleClaim`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };
  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      <h3 className='bigtitle'>Register View / Edit</h3>
      <div className='responsive-table'>
        <table style={{ width: '100%', marginLeft: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Reason</th>
              <th>intimated Date</th>
              <th>Accident No</th>
              <th>District</th>
              <th>Insured By</th>
              <th>View</th>

            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.reason || "---"}</td>
                <td>{item.intimatedDate || "---"}</td>
                <td>{item.accidentFileNo || "---"}</td>
                <td>{item.district || "---"}</td>
                <td>{item.insuredBy || "---"}</td>
                <td>
                  <button onClick={() => view(item.AccidentDataCode)} className="view-button">View</button>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default ViewVehicleInfo;
