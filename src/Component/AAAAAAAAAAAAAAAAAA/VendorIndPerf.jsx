import React, { useState, useEffect } from 'react';
import './Table.css'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import ActivationModel from '../Visitors/ActivationModel';
import { Helmet } from 'react-helmet-async';
import VendorPerformance from '../AAAAAAAAAAAAAAAAAA/VendorPerformnce';

const VendorIndPerf = () => {
    const [data, setData] = useState([]);
    const [showPerformance, setShowPerformance] = useState(false);
    const [showVendorTable, setShowVendorTable] = useState(true);
    const [selectedVendorCode, setSelectedVendorCode] = useState(null);
    const [selectedVendorType, setSelectedVendorType] = useState(null);

    useEffect(() => {
       getData();
      }, []);

    const getData = async () => {
        const response = await axios.get(`${backendUrl}/api/getVendor`);
        setData(response.data.data);
    };

    const viewPerformance = (id, type) => {
        setSelectedVendorCode(id);
        setSelectedVendorType(type);
    
        console.log("DSFSDFFSDF")
        setShowPerformance(true)
        setShowVendorTable(false)
      }

      
  const handleUpdate = () => {
    setShowPerformance(false)
    setShowVendorTable(true)
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; 
  };


    return (
        <div >

{showVendorTable && (
    <div className="some-table-container">
        <table className="some-table" style={{ marginBottom:"50px" }}>
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Date  Added</th>
                    <th>Vendors Name</th>
                    <th>Vendor Type</th>
                    <th>Vendor Email</th>
                    <th>Contact</th>
                    <th>Vendor State</th>
                    <th>Vendor District</th>
                </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold",fontSize: '10px', padding: '5px' }}>No data is there...</td>
              </tr>
            ) : (
              data.slice(0,8).map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontSize: '10px', padding: '5px' }}>{index + 1}</td>
                  <td style={{ fontSize: '10px', padding: '5px' }}>{formatDate(item.systemDate)}</td>
                  <td style={{ fontSize: '10px', padding: '5px' }}>{item.vendorName}</td>
                  <td style={{ fontSize: '10px', padding: '5px' }}><span className="badge">{item.vendorType}</span></td>
                  <td style={{ fontSize: '10px', padding: '5px' }}>
                    <a href= {`mailto:${item.email}`} style={{textDecoration:'underline', color:'blue'}}>
                        {item.email}
                    </a>
                  </td>
                  <td style={{ fontSize: '10px', padding: '5px' }}>{item.vendorPhone}</td>
                  <td style={{ fontSize: '10px', padding: '5px' }}>{item.state}</td>
                  <td style={{ fontSize: '10px', padding: '5px' }}>{item.district}</td>
                </tr>
              ))
            )}
            </tbody>
        </table>
    </div>
)}

        </div>

    );
}

export default VendorIndPerf;