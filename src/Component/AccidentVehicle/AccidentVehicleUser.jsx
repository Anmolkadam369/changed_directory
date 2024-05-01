import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';




const AccidentVehicleUser = () => {

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
    VehicleNo: "",
    accidentFileNo: "",
    lossType: "",
    serviceType: "",
    vendorName: "",
    dateRange: ""
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

  function view(id) {
    console.log("myId", id)
    // navigate("../CustomerMasterEdit", { state: { id } });
  }

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

  const getData = async (e) => {
    console.log("userid", userId);
    const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`);
    if (response.data.message == "No accident vehicle data found.") setData([])
    else {
      console.log("response", response.data.data);
      setData(response.data.data)
    }
  };
  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <div style={{ marginBottom: '10px' }}>
        <div class="header-container">
        <h3 class="bigtitle">My Vehicles Cases</h3>
      </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Vehicle No:
              <input
                type='text'
                name="VehicleNo"
                style={{ width: '100%', padding: '8px' }}
                value={formData.VehicleNo}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Accident File No:
              <input
                type='text'
                name="accidentFileNo"
                style={{ width: '100%', padding: '8px' }}
                value={formData.accidentFileNo}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Loss Type:
              <input
                type='text'
                name="lossType"
                style={{ width: '100%', padding: '8px' }}
                value={formData.lossType}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Service Type:
              <input
                type='text'
                name="serviceType"
                style={{ width: '100%', padding: '8px' }}
                value={formData.serviceType}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Vendor Type:
              <select
                name="vendorType"
                style={{ width: '100%', padding: '8px' }}
                value={formData.vendorType}
                onChange={handleChange}
                required>
                <option value="">--select option--</option>
                <option value="crane/hydra">Crane/Hydra</option>
                <option value="advocate">Advocate</option>
                <option value="workshop">Workshop</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>From Date:
              <input
                type='date'
                name="fromDate"
                style={{ width: '100%', padding: '8px' }}
                value={formData.fromDate}
                onChange={handleChange}
                required />
            To Date:
            <input
              type='date'
              name="toDate"
              style={{ width: '100%', padding: '8px' }}
              value={formData.toDate}
              onChange={handleChange}
              required />
            </label>
          </div>
        </div>
      </div>

      <div className=''></div>

      <div className='responsive-table'>
        <table style={{ width: '100%', marginLeft:"40px", borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Accident File No</th>
              <th>Model</th>
              <th>Chassis Number</th>
              <th>See Updated Pics</th>

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
                  <td>{item.accidentFileNo}</td>
                  <td>{item.model}</td>
                  <td>{item.chassisNo}</td>
                  <td>
                    <button onClick={() => view(item.id)} className="view-button">Updated Pics</button>
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

export default AccidentVehicleUser;
