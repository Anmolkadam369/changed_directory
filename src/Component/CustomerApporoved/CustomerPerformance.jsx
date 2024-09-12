import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import backendUrl from '../../environment';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import craneadvocatemechanic from '../../Assets/camw.webp'; // Correct import path
import customerImage from '../../Assets/customer.webp'; // Correct import path
import complaints from '../../Assets/complaints.webp'; // Correct import path
import vehicleIcon from '../../Assets/vehicleIcon.webp'; // Correct import path
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Chart from '../Charts/Chart';
import Featured from '../Charts/Featured';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataTable from "react-data-table-component";

const CustomerPerformance = ({ customerId, onUpdate }) => {
    const [vendorData, setVendorData] = useState([]);
    const [accidentVehData, setAccidentVehData] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    console.log("answer", accidentVehData)

    const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';
    const effectRan = useRef(false);
    const urlBase64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };


    const [doughnutData, setDoughnutData] = useState({
        labels: ['Total Vehicles', 'Accident Vehicles', 'Resolved Vehicles', 'Pending Vehicles'],
        datasets: [
            {
                label: 'Vehicles',
                data: Array(4).fill(0),
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (token === '' || userId === '') {
            navigate('/');
        }
        getVendorData();
        getAllAccidentVehicleData();
        getAccidentData();
    }, [token, userId, navigate]);

    useEffect(() => {
        const totalVehicles = vendorData.length;
        const accidentVehicles = accidentVehData.length;
        const resolvedVehicles = 0; // Update this with the actual resolved vehicles count
        const pendingVehicles = allAccidentVehicleData.length;

        setDoughnutData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: [totalVehicles, accidentVehicles, resolvedVehicles, pendingVehicles],
                },
            ],
        }));
    }, [vendorData, accidentVehData, allAccidentVehicleData]);

    const getAccidentData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${customerId}`);
            if (response.data.message == "No accident vehicle data found.") setAccidentVehData([])
            else setAccidentVehData(response.data.data);
        } catch (error) {
            console.error("Error fetching accident data", error);
        }
    };

    const getVendorData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getPersonalVehicleInfoById/${customerId}`);
            setVendorData(response.data.data);
        } catch (error) {
            console.error("Error fetching vendor data", error);
        }
    };

    const getAllAccidentVehicleData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${customerId}`);
            console.log("responssesesesee", response)
            if (response.data.message == "No accident vehicle data found.") setAccidentVehData([])
            else {
        setAllAccidentVehicleData(response.data.data);
        setCurrentItems(response.data.data)
    }

        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    const markerIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const handleBack = () => {
        onUpdate();
    }

    const [currentItems, setCurrentItems] = useState(allAccidentVehicleData);
    const [selectedRows, setSelectedRows] = useState([]);
  
    const handleRowsSelected = (state) => {
      setSelectedRows(state.selectedRows);
    }
    const conditionalRowStyles = [
      {
        when: (row) => selectedRows.some(selected => selected.AccidentVehicleCode === row.AccidentVehicleCode),
        style: {
          backgroundColor: '#bdb6b6',
        },
      }
    ];
    const columns = [
      {
        name: "Sr. No.",
        selector: (row, index) => index + 1,
        sortable: true,
        width: "80px",
      },
      {
        name: "Accident File No",
        selector: (row) => row.accidentFileNo,
        sortable: true,
      },
      {
        name: "Model",
        selector: (row) => row.model,
        sortable: true,
      },
      {
        name: "Chassis Number",
        selector: (row) => row.chassisNo,
        sortable: true,
      }
    ];
  
    const tableCustomStyles = {
      rows: {
        style: {
          minHeight: '72px', // override the row height
        },
      },
      headCells: {
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
      cells: {
        style: {
          fontSize: '13px',
        },
      },
    };

    return (
        <div className="dashboard">
            <Helmet>
                <title>Accident Dashboard - Claimpro</title>
                <meta name="description" content="Dashboard for BVC ClaimPro Assist and for vehicle accidents. Keep track of Vendors, Customers actions taken." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/UserDashboard`} />
            </Helmet>

            <main className="main-content">
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                </div>
                <div className='other-content'>
                    <div style={{ display: "relative" }}>
                        <p style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "10px" }}>{allAccidentVehicleData[0]?.CustomerName ? allAccidentVehicleData[0]?.CustomerName : ""}</p>

                        <div className="stat-container">
                            <div className="stat-item">
                                <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                <h3>Number Of Vehicles</h3>
                                <p>{vendorData.length}</p>
                            </div>

                            <div className="stat-item">
                                <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                <h3>Accident Vehicles</h3>
                                <p>{accidentVehData.length}</p>
                            </div>

                            <div className="stat-item">
                                <img src={customerImage} className="small-image" alt="Vendor Types" />
                                <h3>Number of Resolved Vehicles</h3>
                                <p>{0}</p>
                            </div>

                            <div className="stat-item">
                                <img src={complaints} className="small-image" alt="Vendor Types" />
                                <h3>Number of Pending Vehicles</h3>
                                <p>{allAccidentVehicleData.length}</p>
                            </div>
                        </div>

                        <div className="statistics">
                            <div className="charts">
                                <Featured />

                                <div className="chart-item">
                                    <h3 className="chart-title"> Distribution</h3>
                                    <Doughnut data={doughnutData} />
                                </div>

                                {/* <Chart /> */}

                            </div>
                        </div>
                    </div>
                </div>


                <div className="container d-flex justify-content-center" style={{ marginTop: "10px" }}>
      <div className="container my-5">
        <DataTable
          columns={columns}
          data={currentItems}
          fixedHeader
          pagination
          selectableRows
          onSelectedRowsChange={handleRowsSelected}
          conditionalRowStyles={conditionalRowStyles}
          customStyles={tableCustomStyles}
        />
      </div>
    </div>

            </main>
        </div>
    );

};

export default CustomerPerformance;