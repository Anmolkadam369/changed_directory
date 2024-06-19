import React, { useState, useEffect } from 'react';
import "../CustomerApporoved/CustomerApproved.css";
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import AddedDataByMachanic from './AddedDataByMachanic';

const AssignedVehicleMachanic = () => {

  const [data, setData] = useState([]);
  console.log("DATAforAdvocate", data)
  const [GetDataOfUser, setGetDataOfUser] = useState([]);
  const [vendorPersonal, setVendorPersonal] = useState([]);
  console.log("vendorPersonal", vendorPersonal)
  const [showPopup, setShowPopup] = useState(true);
  const [width, setWidth] = useState('100%');
  const [marginLeft, setMarginLeft] = useState('10px');
  const [paddingLeft, setPaddingLeft] = useState('30px');

  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [showAddedDataByVendor, setShowAddedDataByVendor] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    findUserById(userId)

  }, [token, userId, navigate]);


  useEffect(() => {
    if (GetDataOfUser.length !== 0 && GetDataOfUser.vendorCode) {
      fetchAssignedCases(GetDataOfUser.vendorCode);
      fetchVendor(GetDataOfUser.vendorCode)
    }
  }, [GetDataOfUser]); // Only re-run the effect if GetDataOfUser changes

  const fetchAssignedCases = async (vendorCode) => {
    try {
      const response = await axios.get(`${backendUrl}/api/assignedTasksMachanic/${vendorCode}`);
      console.log("assignedTasksMachanic", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };
  
  const fetchVendor = async (vendorCode) => {
    try {
      const response = await axios.get(`${backendUrl}/api/getVendor/${vendorCode}`);
      console.log("response", response.data.data);
      setVendorPersonal(response.data.data);
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };


  const findUserById = async (id) => {
    console.log("HEY", id)
    const response = await axios.get(`${backendUrl}/api/findByIdForVendor/${id}`);
    console.log("daa", response.data)
    console.log("data", response.data.data[0]);
    setGetDataOfUser(response.data.data[0])
  }
  console.log("GETUSER", GetDataOfUser)

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

  function view(id, item) {
    console.log("myId", id)
    setSelectedId(id)
    setSelectedItem(item)
    setShowAddedDataByVendor(true)
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setWidth('50%');
        setMarginLeft('0px');
        setPaddingLeft('20px')
      } else {
        setWidth('100%');
        setMarginLeft('0px');
        setPaddingLeft("40px")
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleUpdate = () => {
    fetchAssignedCases(GetDataOfUser.vendorCode);
    setShowAddedDataByVendor(false); // Hide VendorMasterEdit
  };

  return (

    <div>
      {!showAddedDataByVendor &&
        (
          <div>
            <Helmet>
              <title>Assigned Vehicles to Mechanic - Claimpro</title>
              <meta name="description" content="View and manage vehicles assigned to mechanics for repair and service. Track accident file numbers, vehicle codes, and more." />
              <meta name="keywords" content="Assigned Vehicles, Mechanic, Vehicle Repair, Accident File, Vehicle Management, Claimpro" />
              <link rel='canonical' href={`https://claimpro.in/AssignedVehicleMachanic`} />
            </Helmet>

            <div style={{ position: 'relative' }}>
              {GetDataOfUser.isActive === "false" && showPopup && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'lightgrey',
                  width: 'fit-content',
                  padding: '10px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                }}>
                  <button
                    onClick={() => setShowPopup(false)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    &times;
                  </button>
                  <h3 style={{ margin: '0 20px 0 0' }}>You Are Not Currently Active To Take The Appoinments</h3>
                </div>
              )}
            </div>

            <form className='Customer-master-form' style={{ width, marginLeft, paddingLeft }} >
              <div className="header-container">
                <h3 className="bigtitle">Assigned Vehicles To Mechanic</h3>
              </div>
              <div className="form-row">

                <label className="form-field input-group mb-3">
                  Vehicle No:
                  <input
                    type="text"
                    name="VehicleNo"
                    placeholder='Vehicle No'
                    // class="form-label"
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
                    // class="form-label"
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
                    // class="form-label"
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
                    // class="form-label"
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
                    className="form-field input-group mb-3"
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

                <label className="form-field input-group mb-3"></label>
              </div>

            </form>

            <div className="responsive-table" >
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Acc. File No</th>
                    <th>Accident Vehicle Code</th>
                    <th>assigned By</th>
                    {/* <th>Rejection Reason</th> */}
                    <th>Accept By Admin</th>
                    <th>View Doc</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", fontWeight: "bold" }}>No data is there...</td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.accidentFileNo}</td>
                        <td>{item.AccidentVehicleCode}</td>
                        <td>{item.assignedBy}</td>

                        {/* <td style={{ textAlign: 'center' }}>
                          {item.details.length > 0
                            ? (item.details[0].reasonforRejection !== undefined && item.details[0].reasonforRejection !== null && item.details[0].reasonforRejection !== ''
                              ? item.details[0].reasonforRejection
                              : "Accepted")
                            : "Pending"}
                        </td> */}

                        {item.details == 0 ? (
                          <td style={{ textAlign: 'center', color: 'red' }}>Not Requested</td>
                        ) : (
                          <td style={{ textAlign: 'center', color: (item.details.length > 0 && item.details[0].acceptedByAdmin) ? 'darkblue' : 'darkorange' }}>
                            {item.details.length > 0 && item.details[0].acceptedByAdmin ? item.details[0].acceptedByAdmin : "Pending"}
                          </td>
                        )}

                        <td>
                          {item.details.length > 0 ? (
                            <button
                              onClick={() => view(item.AccidentVehicleCode, item)}
                              className="view-button"
                              disabled={item.details[0].acceptedByAdmin === "reject"}
                              style={{
                                backgroundColor: item.details[0].acceptedByAdmin === "reject" ? '#d3d3d3' : undefined, // Grey when disabled
                                color: 'white',
                                padding: '10px 30px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: item.details[0].acceptedByAdmin === "reject" ? 'not-allowed' : 'pointer' // Change cursor based on state
                              }}>
                              Upload Data
                            </button>
                          ) : <button
                            onClick={() => view(item.AccidentVehicleCode, item)}
                            className="view-button" style={{ padding: '10px 30px' }}
                          >
                            Upload Data
                          </button>}

                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      {showAddedDataByVendor &&
        (
          <AddedDataByMachanic id={selectedId} item={selectedItem} onUpdate={handleUpdate} />
        )}

    </div>
  );

};

export default AssignedVehicleMachanic;
