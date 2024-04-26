import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';




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
    console.log("userid",userId);
    const response = await axios.get(`http://localhost:3001/api/getPersonalAccidentVehicleInfoById/${userId}`);
    if(response.data.message == "No accident vehicle data found.") setData([])
    else{
    console.log("response", response.data.data);
    setData(response.data.data)}
  };
  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      <h3 className='titles'>My Vehicles Cases</h3>
      <div class='form-container'>
        <div class='form-row'>
          <div class="form-field">
            <label>Vehicle No:
              <input
                type='text'
                name="VehicleNo"
                value={formData.VehicleNo}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div class="form-field">
            <label>Accident File No:
              <input
                type='text'
                name="accidentFileNo"
                value={formData.accidentFileNo}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div class="form-field">
            <label>Loss Type:
              <input
                type='text'
                name="lossType"
                value={formData.lossType}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div class="form-field">
            <label>Service Type:
              <input
                type='text'
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required />
            </label>
          </div>
          <div class="form-field">
            <label>Vendor Type:
              <select
                name="vendorType"
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

          <div class="form-field">
            <label>From Date:
              <input
                type='date'
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required />
            </label>
            To Date:
            <input
              type='date'
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required />
          </div>
        </div>

      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Accident File No</th>
            <th>Chassis Number</th>
            <th>Model</th>
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
                <td>{item.chassisNo}</td>
                <td>{item.model}</td>
                <td>
                  <button onClick={() => view(item.id)} className="view-button">Updated Pics</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

};

export default AccidentVehicleUser;
