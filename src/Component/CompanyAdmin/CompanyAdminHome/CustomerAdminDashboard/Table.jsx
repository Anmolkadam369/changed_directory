import React, { useEffect, useState } from "react";
import "./Table.css";
import axios from 'axios';

const Table = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [newAccidentData, setData] = useState([]);
  console.log("NEWSD,", newAccidentData)
  const [newCases, setNewCases] = useState(false)



  const data = [
    {
      CustomerName: "Maria Gerhold",
      email: "maria81@example.com",
      choosenPlan: "Sales",
      accidentFileNo: "3241244324",
      contactNo: "987653211"
    },
    {
      CustomerName: "Maria Gerhold",
      email: "maria81@example.com",
      choosenPlan: "Sales",
      accidentFileNo: "3241244324",
      contactNo: "987653211",
    },    
    {
      CustomerName: "Maria Gerhold",
      email: "maria81@example.com",
      choosenPlan: "Sales",
      accidentFileNo: "3241244324",
      contactNo: "987653211"
    },
    {
      CustomerName: "Maria Gerhold",
      email: "maria81@example.com",
      choosenPlan: "Sales",
      accidentFileNo: "3241244324",
      contactNo: "987653211"
    },
  ];

  useEffect(() => {
    getData()
  }, [])

  const getData = async (e) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAccidentVehicleInfo/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
    console.log("response", response);
    if (response && response.message !== "No accident vehicle data found.") setData(response.data.data)
  };



  return (
    <div className="some-table-container">
      <table className="some-table" style={{ marginTop: "0px" }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Choosen Plan</th>
            <th>File No</th>
            <th>contact no</th>
            <th>Customer</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 4).map((item, index) => (
            <tr key={index}>
              <td style={{ fontSize: "10px", padding: '5px' }}>{index + 1}</td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px' }}>{item.CustomerName}</td>
              <td data-label="Email" style={{ fontSize: "10px", padding: '5px' }}>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </td >
              <td data-label="ChoosenPlan" style={{ fontSize: "10px", padding: '5px' }}>
                <span className="badge">{item.choosenPlan}</span>
              </td>
              <td data-label="Department" style={{ fontSize: "10px", padding: '5px' }}>
                <span>{item.accidentFileNo}</span>
              </td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px' }}>{item.contactNo}</td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px' }}>{item.CustomerName}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
