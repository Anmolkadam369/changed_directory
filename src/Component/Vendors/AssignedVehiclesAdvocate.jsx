import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';




const AssignedVehicleAdvocate = () => {

  const [data, setData] = useState([]);
  console.log("DATAforAdvocate",data)
  const [GetDataOfUser, setGetDataOfUser] = useState([]);

  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    findUserById(userId)
    
  }, [token, userId, navigate]);


useEffect(() => {
  if (GetDataOfUser && GetDataOfUser.vendorCode) {
    const fetchAssignedCases = async () => {
      console.log("vendorCode", GetDataOfUser.vendorCode);
      try {
        const response = await axios.get(`http://localhost:3001/api/assignedCasesAdvocate/${GetDataOfUser.vendorCode}`);
        console.log("response", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch assigned cases:", error);
      }
    };

    fetchAssignedCases();
  }
}, [GetDataOfUser]);

  const findUserById = async (id) => {
    console.log("HEY", id)
    const response = await axios.get(`http://localhost:3001/api/findByIdForVendor/${id}`);
    console.log("daa", response.data)
    console.log("data", response.data.data[0]);
    setGetDataOfUser(response.data.data[0])
}
console.log("GETUSER",GetDataOfUser)

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
    navigate("../UploadDocAdvocate", { state: { id } });
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



  



  return (
    <div>
      <h3 style={{ textAlign: 'center', backgroundColor: 'lightGreen', padding: '20px' }}>Assigned Vehicles To Advocate</h3>
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
            <th>AccidentVehicleCode</th>
            <th>assignedBy</th>
            <th>View/Upload Document</th>
            <th>Accepted By Admin</th>

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
                <td>{item.AccidentVehicleCode}</td>
                <td>{item.assignedBy}</td>
                <td>
                  {item.details.length > 0 ? (
                    <button
                      onClick={() => view(item.AccidentVehicleCode)}
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
                  ) :  <button
                  onClick={() => view(item.AccidentVehicleCode)}
                  className="view-button" style={{padding:'10px 30px'}}
                  >
                  Upload Data
                </button>}

                </td>
                {item.details !== 0 ? (
                  <td style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {item.details.length > 0 && item.details[0].acceptedByAdmin ? item.details[0].acceptedByAdmin : "Pending"}
                  </td>
                ) : (
                  <td style={{ fontWeight: 'bold', textAlign: 'center' }}>Pending</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

};

export default AssignedVehicleAdvocate;
