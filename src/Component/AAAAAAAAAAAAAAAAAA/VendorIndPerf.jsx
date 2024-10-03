import React, { useState, useEffect } from 'react';
import './Table.css'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../environment';
import DataTable from 'react-data-table-component';
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
        setCurrentItems(response.data.data)
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


  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#ffff',
        backgroundColor: 'rgb(169 187 169)',
        fontWeight : "bold",
        fontSize : '9px'
      },
    },
    pagination: {
      style: {
        button: {
          background: 'none',
          boxShadow: "none"
        },
      },
    },
    striped: {
      style:{
        default: 'red'
      }
    },
    rows : {
      style:{
        backgroundColor: '#f2f2f2',
      }
    }
  }
  const [currentItems, setCurrentItems] = useState(data);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      width:"60px",
      sortable: true,
      style: { fontSize: '10px', padding: '5px' },
    },    
    {
      name: "Added",
      selector: (row) =>formatDate(row.systemDate),
      style: { fontSize: '10px', padding: '5px' },
      width:"80px",
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const dateA = new Date(rowA.systemDate);
        const dateB = new Date(rowB.systemDate);
        return dateA - dateB; // Ascending order
      },
    },
    {
      name: "Name",
      selector: (row) => row.vendorName,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <span style={{ color: 'brown',fontSize: '10px', padding: '5px' }}>{row.vendorName.charAt(0).toUpperCase() + row.vendorName.slice(1)}</span>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <a href={`mailto:${row.email}`} style={{ color: "blue", textDecoration: "none", fontSize: '10px', padding: '5px' }}>
          {row.email}
        </a>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.vendorType,
      sortable: true,
      width:"100px",
      cell: (row) => (
        <span style={{ color: '#fff', backgroundColor: '#ffc107', padding: '5px', borderRadius: '4px' ,fontSize: '10px'}}>
          {row.vendorType ? row.vendorType.charAt(0).toUpperCase() + row.vendorType.slice(1).toLowerCase() : ""}
        </span>
      ),
    },
    { name: "Contact",width:"90px",style: { fontSize: '10px', padding: '5px'}, selector: (row) => row.vendorPhone, sortable: true },
    { name: "State",width:"70px",style: { fontSize: '10px', padding: '5px'}, selector: (row) => row.state, sortable: true },
    { name: "District",width:"80px",style: { fontSize: '10px', padding: '5px'}, selector: (row) => row.district, sortable: true },
  ]

    return (
        <div style={{  display: 'flex', justifyContent: 'flex-start', width: '100%' }}>

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
                    <th>Vendor State</th>
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
                  <td style={{ fontSize: '10px', padding: '5px' }}>{item.state}</td>
                </tr>
              ))
            )}
            </tbody>
        </table>
    </div>

    // <div  >
    //     <DataTable
    //     columns={columns}
    //     data={currentItems}
    //     pagination
    //     responsive
    //     striped
    //     highlightOnHover
    //     defaultSortFieldId="id"
    //     customStyles={tableCustomStyles}
    //   />
    // </div>
)}

        </div>

    );
}

export default VendorIndPerf;