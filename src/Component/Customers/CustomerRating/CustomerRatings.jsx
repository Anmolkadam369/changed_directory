import React, { useEffect, useState } from "react";
import axios from 'axios';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

const CustomerRatings = () => {
  const [newAccidentData, setData] = useState([]);
  const [expandTable, setExpandTable] = useState(false);
  
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    getData()
  }, [])

  const getData = async (e) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/customerRating/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
    console.log("response", response);
    if (response && response.message !== "No accident vehicle data found.") setData(response.data.data)
  };

  const toggleExpandTable = () => {
    setExpandTable(!expandTable);
  };


  return (
    <div className="some-table-container" style={{marginTop:"40px"}}>
      <div style={{display:'flex', justifyContent:"flexend"}}>
      <div style={{fontSize:"14px"}}>
        <p>Customer Rating By Respected Vendors</p>
      </div>
      <p
        style={{
          fontSize: "10px",
          padding: '5px',
          color: "blue",
          marginTop: '6px',
          marginLeft: "auto",
          cursor: "pointer"
        }}
        onClick={toggleExpandTable}
      >
        {expandTable ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
      </p>
      </div>

      <table className="some-table" style={{ marginTop: "0px" }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Customer Name</th>
            <th>Vehicle No</th>
            <th style={{ color: 'rgba(255, 99, 132, 1)' }}>mechanic Feedback</th>
            <th style={{ color: 'rgb(95 ,54 ,235)' }}>Advocate Feedback</th>
            <th style={{ color: 'rgb(235 ,156 ,54 / 73%)' }}>Workshop Feedback</th>
            <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Crane Feedback</th>
          </tr>
        </thead>
        <tbody>
          {(expandTable ? newAccidentData : newAccidentData.slice(0, 5)).map((item, index) => (
            <tr key={index}>
              <td style={{ fontSize: "10px", padding: '5px' }}>{index + 1}</td>
              <td style={{ fontSize: "10px", padding: '5px' }}>{item.CustomerName}</td>
              <td data-label="ChoosenPlan" style={{ fontSize: "10px", padding: '5px' }}>
                <span className="badge">{item.VehicleNumber}</span>
              </td>
              <td style={{ fontSize: "10px", padding: '5px' }}>{item.mechanicfeedback ? item.mechanicfeedback : "___"}</td>
              <td style={{ fontSize: "10px", padding: '5px' }}>{item.advocatefeedback ? item.advocatefeedback : "___"}</td>
              <td style={{ fontSize: "10px", padding: '5px' }}>{item.workshopfeedback ? item.workshopfeedback : "___"}</td>
              <td style={{ fontSize: "10px", padding: '5px' }}>{item.cranefeedback ? item.cranefeedback : "___"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerRatings;
