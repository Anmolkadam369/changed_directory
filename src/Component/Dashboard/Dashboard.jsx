import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Ensure you create this CSS file for styling
import { Line, Doughnut, Bar } from 'react-chartjs-2'; // For the line, doughnut, and bar charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import backendUrl from '../../environment';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import craneadvocatemechanic from '../../Assets/camw.webp'; // Correct import path
import customerImage from '../../Assets/customer.webp'; // Correct import path
import complaints from '../../Assets/complaints.webp'; // Correct import path
import registerComplaints from '../../Assets/registeredComplaints.webp'; // Correct import path
import remainingComplaints from '../../Assets/remainingComplaints.webp'; // Correct import path
import vehicleIcon from '../../Assets/vehicleIcon.webp'; // Correct import path
import vendorResponseImg from '../../Assets/vendorResponse.webp'; // Correct import path
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [vendorData, setVendorData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [registeredAccidentVehicleData, setRegisteredAccidentVehicleData] = useState([]);
    const [remainingAssignedVendors, setRemainingAssignedVendors] = useState([]);
    const [vendorResponse, setVendorResponse] = useState([]);


    const markerIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const events = [
        { date: '2024-01-01', description: 'Added New Vendor' },
        { date: '2024-02-14', description: 'Added New Customers' },
        { date: '2024-03-17', description: 'Issues Solved' },
        { date: '2024-07-04', description: 'Customer Complaints' },
    ];

    const cityData = {
        labels: ['Mumbai', 'Chennai', 'Jaipur', 'Amritsar'],
        datasets: [
            {
                label: 'City Performance',
                data: [85, 75, 70, 80], // Example data, replace with actual data
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };


    const cityOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Performance of Cities',
            },
        },
    };


    const [lineData, setLineData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Vendor Added',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [lineData2, setLineData2] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Vendor Added',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [doughnutData, setDoughnutData] = useState({
        labels: ['crain', 'advocate', 'workshop', 'machanic'],
        datasets: [
            {
                label: 'Vendors',
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

    const [doughnutData2, setDoughnutData2] = useState({
        labels: ['fleetOwner', 'retail'],
        datasets: [
            {
                label: 'Vendors',
                data: Array(2).fill(0),
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);

    useEffect(() => {
        getVendorData();
        getCustomerData();
        getAccidentVehicleData();
        getAllAccidentVehicleData();
        reportedRegistersComplaints();
        AssignedVendorsRemaining();
        allVendorResponse();

        if (token === '' || userId === '') {
            //   navigate('/');
        }
    }, [token, userId, navigate]);


    const vendorsByMonth = Array(12).fill(0);
    const vendorsByType = { crain: 0, advocate: 0, workshop: 0, machanic: 0 };

    const customerByMonth = Array(12).fill(0);
    const customerByType = { fleetOwner: 0, retail: 0 };

    useEffect(() => {
        vendorData.forEach((vendor) => {
            const date = new Date(vendor.systemDate);
            const month = date.getMonth();
            vendorsByMonth[month]++;

            if (vendorsByType[vendor.vendorType] !== undefined) {
                vendorsByType[vendor.vendorType]++;
            }
        });

        customerData.forEach((customer) => {
            const date = new Date(customer.systemDate);
            const month = date.getMonth();
            customerByMonth[month]++;

            if (customerByType[customer.CustomerType] !== undefined) {
                customerByType[customer.CustomerType]++;
            }
        });

        setLineData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: vendorsByMonth,
                },
            ],
        }));


        setLineData2((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: customerByMonth,
                },
            ],
        }));

        setDoughnutData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: Object.values(vendorsByType),
                },
            ],
        }));

        setDoughnutData2((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: Object.values(customerByType),
                },
            ],
        }));


    }, [vendorData, customerData]);

    const getVendorData = async () => {
        const response = await axios.get(`${backendUrl}/api/getVendor`);
        setVendorData(response.data.data);
    };

    const getCustomerData = async () => {
        const response = await axios.get(`${backendUrl}/api/getCustomer`);
        setCustomerData(response.data.data)
    };

    const getAccidentVehicleData = async (e) => {
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo`);
        if (response && response.message !== "No accident vehicle data found.") setAccidentVehicleData(response.data.data)
    };

    const getAllAccidentVehicleData = async (e) => {
        const response = await axios.get(`${backendUrl}/api/getAllAccidentVehicleInfo`);
        setAllAccidentVehicleData(response.data.data)
    };

    const reportedRegistersComplaints = async (e) => {
        const response = await axios.get(`${backendUrl}/api/vehicleClaim`);
        setRegisteredAccidentVehicleData(response.data.data)
    };

    const AssignedVendorsRemaining = async (e) => {
        const response = await axios.get(`${backendUrl}/api/getVehicleToAssignVendor`);
        setRemainingAssignedVendors(response.data.data)
    };

    const allVendorResponse = async (e) => {
        const response = await axios.get(`${backendUrl}/api/vendorResponse`);
        setVendorResponse(response.data.data)
    };


    return (
        <div className="dashboard">
            <h1 className="dashboardTitle">Administration</h1>

            <main className="main-content">
                <div className='other-content'>
                    <div style={{ display: "relative" }}>
                        <div className="statistics">
                            <div>
                                <div className="stat-item" style={{ marginTop: '20px' }}>
                                    <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                    <h3>Number Of Vendor</h3>
                                    <p>{vendorData.length}</p>
                                </div>

                                <div className="stat-item" style={{ marginTop: '20px' }}>
                                    <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                    <h3>Remaining Vehicles Assigned to Vendors</h3>
                                    <p>{remainingAssignedVendors.length}</p>
                                </div>
                            </div>

                            <div className="charts">
                                <div className="chart-item">
                                    <h2 className="chart-title">Vendors</h2>
                                    <Line data={lineData} />
                                    <h4 className="chart-subtitle">Vendors Added By Month</h4>
                                </div>

                                <div className="chart-item">
                                    <h3 className="chart-title">Vendor Type Distribution</h3>
                                    <Doughnut data={doughnutData} />
                                </div>
                            </div>
                        </div>

                        <div className="statistics">

                            <div>
                                <div className="stat-item" style={{ marginTop: '20px' }}>
                                    <img src={customerImage} className="small-image" alt="Vendor Types" />
                                    <h3>Number of Customer</h3>
                                    <p>{customerData.length}</p>
                                </div>

                                <div className="stat-item" style={{ marginTop: '20px' }}>
                                    <img src={complaints} className="small-image" alt="Vendor Types" />
                                    <h3>Number of Complaints on Vehicle</h3>
                                    <p>{allAccidentVehicleData.length}</p>
                                </div>
                            </div>

                            <div className="charts">
                                <div className="chart-item">
                                    <h2 className='chart-title'>Customer</h2>
                                    <Line data={lineData2} />
                                    <h4 className="chart-subtitle">Customer Added By Month</h4>
                                </div>
                                <div className="chart-item">
                                    <h3 className="chart-title">Customer Type Distribution</h3>
                                    <Doughnut data={doughnutData2} />
                                </div>
                            </div>

                        </div>

                        {/* <div className="timeline-container" style={{ width: '200px', height: '880px', marginLeft: '20px', overflowY: 'scroll' }}>
                        <h1 style={{marginTop:"40px", marginBottom:"50px", fontWeight:"bold"}}>
                            Key Data Points
                        </h1>
                        {events.map((event, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-date">{event.date}</div>
                                <div className="timeline-description">{event.description}</div>
                            </div>
                        ))}
                        </div> */}
                </div>
                </div>



    
                <div className="statistics">
                    <div className="stat-item2">
                        <img src={registerComplaints} className="small-image" alt="Vendor Types" />
                        <h3>Registered Complaints</h3>
                        <p>{registeredAccidentVehicleData.length}</p>
                    </div>
                    <div className="stat-item2">
                        <img src={remainingComplaints} className="small-image" alt="Vendor Types" />
                        <h3>Remaining Complaints</h3>
                        <p>{accidentVehicleData.length}</p>
                    </div>
                    <div className="stat-item2">
                        <img src={vendorResponseImg} className="small-image" alt="Vendor Types" />
                        <h3>Vendor Response</h3>
                        <p>{vendorResponse.length}</p>
                    </div>
                    <div className='cityCss'>
                        <Bar data={cityData} options={cityOptions} />
                    </div>
                </div>

                <div className="map-container" style={{ height: '400px', marginRight: "40px", width: '100%', borderRadius: '10px' }}>
                    <MapContainer center={[19.0760, 72.8777]} zoom={10} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[19.0760, 72.8777]} icon={markerIcon}>
                            <Popup>
                                Mumbai
                            </Popup>
                        </Marker>
                        <Marker position={[28.6139, 77.2090]} icon={markerIcon}>
                            <Popup>
                                Delhi
                            </Popup>
                        </Marker>
                        <Marker position={[12.9716, 77.5946]} icon={markerIcon}>
                            <Popup>
                                Karnataka
                            </Popup>
                        </Marker>
                        <Marker position={[20.9517, 85.0985]} icon={markerIcon}>
                            <Popup>
                                Orissa
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </main>
        </div>
    );

};

export default Dashboard;
