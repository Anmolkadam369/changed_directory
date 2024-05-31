import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet';





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
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelect = (event, value) => {
    event.preventDefault(); // Prevent default link behavior
    setFormData({
      ...formData,
      vendorType: value
    });
    setShowDropdown(false); // Close dropdown after selection
  };
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  console.log("dddddddddddddddddddd", data.data)



  return (
    <div>
      <Helmet>
        <title>Register Accident Vehicle Information - Claimpro</title>
        <meta name="description" content="Register Accident Vehicle Information for BVC ClaimPro Assist." />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
      </Helmet>
      <div class='Customer-master-form' style={{ marginLeft: "0px" }}>
        <div class="header-container">
          <h3 class="bigtitle">My Vehicles Cases</h3>
        </div>

        <div className="form-row">

          <label className="form-field input-group mb-3">
            Vehicle No:
            <input
              type="text"
              name="VehicleNo"
              placeholder='Vehicle No'
              class="form-label"
              value={formData.VehicleNo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>

          <label className="form-field input-group mb-3">
            Accident File No:
            <input
              type="text"
              name="accidentFileNo"
              placeholder='Accident File No'
              class="form-label"
              value={formData.accidentFileNo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>

          <label className="form-field input-group mb-3">
            Loss Type:
            <input
              type="text"
              name="lossType"
              placeholder='Loss Type'
              class="form-label"
              value={formData.lossType}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>

          <label className="form-field input-group mb-3">
            Service Type:
            <input
              type="text"
              name="serviceType"
              placeholder='Service Type'
              class="form-label"
              value={formData.serviceType}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>

        </div>

        <div className="form-row">
          <div className="dropdown green-dropdown form-field">
            Select Option :
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={toggleDropdown}
              style={{ color: 'black', marginTop: '5px' }}
            >
              {formData.vendorType || "Select Vendor Type"}
            </button>
            <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advocate")}>Advocate</a></li>
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crain")}>Crain</a></li>
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "machanic")}>Machanic</a></li>
              <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
            </ul>
          </div>

          <label className="form-field input-group mb-3">
            From Date:
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              readOnly
              className="form-control"
            />
          </label>

          <label className="form-field input-group mb-3">
            To Date:
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              readOnly
              className="form-control"
            />
          </label>

        </div>
      </div>


      <div className='responsive-table'>
        <table className='allvendor-response'>
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
