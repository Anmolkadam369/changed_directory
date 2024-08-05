import React, { useEffect, useState } from "react";
import "./Table.css";
import "../VenderMaster/VendorMasterForm.css"
import axios from 'axios';
import backendUrl from '../../environment';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';


const VendorRating = () => {
  const [newResponseData, setData] = useState([]);
  console.log("NEWRESPONSDARA", newResponseData)
  const [expandTable, setExpandTable] = useState(false);
  const [selectedType, setSelectedType] = useState('mechanic');
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    getData()
  }, [selectedType])

  const getData = async (e) => {
    try {
        const response = await axios.get(`${backendUrl}/api/getVendorRating`);
        console.log("responsevendorRating", response);
        if (response && response.data) {
            const filteredData = response.data.data.
            filter(item => item.vendorType == selectedType).
            sort((a,b)=> average(b.ratings) - average(a.ratings));
          setData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };

  const toggleExpandTable = () => {
    setExpandTable(!expandTable)
  }
  const handleTypeChange = (e, type) => {
    e.preventDefault();
    setSelectedType(type);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const average = (rating)=>{
      let total = 0;
      for(let i=0; i<rating.length; i++){
          total += rating[i];
        }
    return (total/rating.length)
  }

  return (
    <div className="some-table-container" >
      <p style={{ fontSize: "13px", color: "purple", marginTop:"20px" }}>Vendors Rating Given By the Customers</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px' }}>
  <div className="dropdown" style={{ margin: '10px' }}>
    <button
      className="btn btn-light dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded={showDropdown}
      onClick={toggleDropdown}
      style={{ background: 'lightblue', padding: '4px', borderRadius: '10px', width: '100px', fontSize: '12px' }}
    >
      {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
    </button>
    <ul className={`dropdown-menu${showDropdown ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
      <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, 'advocate')}>Advocate</a></li>
      <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, 'crane')}>Crane</a></li>
      <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, 'mechanic')}>Mechanic</a></li>
      <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, 'workshop')}>Workshop</a></li>
    </ul>
  </div>
  <p style={{ fontSize: '10px', padding: '5px', color: 'blue', cursor: 'pointer' }} onClick={toggleExpandTable}>
    {expandTable ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
  </p>
</div>

      <table className="some-table" style={{marginTop:"0px"}}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Vendor Type</th>
            <th>Vendor Name</th>
            <th>Rating</th>
            <th>Number Of Customer Responded</th>
          </tr>
        </thead>
        <tbody>
          {(expandTable ? newResponseData : newResponseData.slice(0, 5)).map((item, index) => (
            <tr key={index}>
              <td style={{ fontSize: '10px', padding: '5px' }}>{index + 1}</td>
              <td style={{ fontSize: '10px', padding: '5px' }}>{item.vendorType}</td>
              <td style={{ fontSize: '10px', padding: '5px' }}><span className="badge">{item.vendorName}</span></td>
              <td style={{ fontSize: '10px', padding: '5px',color:'blue' }}>{average(item.ratings)}%</td>
              <td style={{ fontSize: '10px', padding: '5px' }}>{item.numberOfCustomersRated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRating;
