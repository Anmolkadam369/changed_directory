import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';



const AccidentVehicle = () => {

  const [data, setData] = useState([]);
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
    const response = await axios.get('http://localhost:3001/api/getVehicleToAssignVendor');
    console.log("response", response.data.data);
    setData(response.data.data)
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
  function view(id) {
    console.log("myId", id)
    navigate("../EditAccidentVehicle", { state: { id } });
  }
  
  return (
    <div>
      <h3 className='titles'>Assign Vendor to Accident Vehicle</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>User Name</th>
            <th>Accident File Number</th>
            <th>Choosen Plan</th>
            <th>Selected Options</th>
            {/* <th>Services</th> */}
            <th>View</th>

          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>All Vehicles are assigned To Vendors...</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.CustomerName}</td>
                <td>{item.accidentFileNo}</td>
                <td>{item.choosenPlan}</td>
                <td>{item && item.selectedOptions ? JSON.parse(item.selectedOptions).join(', ') : '---'}</td>
                <td>
                <button onClick={() => view(item.AccidentVehicleCode)} className='view-button'>View here</button>
              </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

};

export default AccidentVehicle;
