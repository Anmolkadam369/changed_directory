import React, { useState, useEffect } from 'react';
import './CustomerApproved.css'
import '../AccidentVehicle/AccidentVehicle.css'

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
const CustomerApproved = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  function view(id) {
    console.log("myId", id)
    navigate("../CustomerMasterEdit", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getCustomer`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };
  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      <h3 className='bigtitle'>Customer View / Edit</h3>
      <div className='responsive-table'>
      <table style={{ width: '90%', marginLeft:"20px", borderCollapse: 'collapse' ,marginBottom:"90px"}}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Customer Type</th>
            <th>Edited By</th>
            <th>View</th>

          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No data is there...</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.CustomerName}</td>
                <td>{item.email}</td>
                <td>{item.CustomerType}</td>
                <td>{item.EditedBy}</td>
                <td>
                <button onClick={() => view(item.CustomerCode)} className='view-button'>View</button>
              </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );

};

export default CustomerApproved;
