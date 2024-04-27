import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';




const AccidentVehicleRegUpdate = () => {

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

  const [formData, setFormData] = useState({
    vehicleNo: ""
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pincode' || name === 'vendorPhone' || name === "contactPersonNum" || name === "contactPersonNum2") {
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value)) {
        if ((name === 'pincode' && value.length <= 6) || (name === 'vendorPhone' && value.length <= 10) || (name === 'contactPersonNum' && value.length <= 10) || (name === 'contactPersonNum2' && value.length <= 10)) {
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        }
      }
    }

    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo`);
    console.log("response", response);
    if (response && response.message !== "No accident vehicle data found.") setData(response.data.data)
  };

  function view(id) {
    console.log("myId", id)
    navigate("../VehicleClaim", { state: { id } });
  }

  return (
    <div>
      <h3 className='bigtitle'>Create Register (New Accident Vehicle)</h3>
      <table style={{ width: '90%', marginLeft: "30px", marginRight: "30px" }}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>User Name</th>
            <th>Accident File Number</th>
            <th>Choosen Plan</th>
            <th>Selected Options</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No New Case To Register...</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} style={{ textAlign: "center" }}> {/* Centralized here */}
                <td>{index + 1}</td>
                <td>{item.CustomerName}</td>
                <td>{item.accidentFileNo}</td>
                <td>{item.choosenPlan}</td>
                <td>{item && item.selectedOptions ? JSON.parse(item.selectedOptions).join(', ') : '---'}</td>
                <td>
                  <button onClick={() => view(item.accidentFileNo)} className='view-button'>View here</button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );

};

export default AccidentVehicleRegUpdate;
