import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Ensure you create this CSS file for styling
import { Line, Doughnut, Bar } from 'react-chartjs-2'; // For the line, doughnut, and bar charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import backendUrl from '../../environment';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
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
import { ClipLoader } from 'react-spinners';
import Chart from '../Charts/Chart';
import Featured from '../Charts/Featured';
import visitorsImage from '../../Assets/visitorsImage.webp'
import CustomerChart from '../Charts/CustomerChart';
import VendorApproved from '../VendorApproved/VendorApporoved';
import CustomerApproved from '../CustomerApporoved/CustomerApproved';
import AccidentVehicle from '../AccidentVehicle/AccidentVehicle';
import ViewVehicleInfo from '../ViewVehicleInfo/ViewVehicleInfo';
import VendorResponse from '../Vendors/VendorsResponse';
import Visitors from '../Visitors/Visitors';
import DummyDashboard from './DummyDashboard';



// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const Dashboard = () => {
    const [vendorData, setVendorData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [registeredAccidentVehicleData, setRegisteredAccidentVehicleData] = useState([]);
    const [remainingAssignedVendors, setRemainingAssignedVendors] = useState([]);
    const [vendorResponse, setVendorResponse] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [generatedExcel, setGeneratedExcel] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [dashboardOnly, setDashboardOnly] = useState(true)
    const [vendorOnly, setVendorOnly] = useState(false)
    const [showViewCustomer, setShowViewCustomer] = useState(false)
    const [accidentVehicle, setAccidentVehicle] = useState(false)
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false)
    const [vendorResponsing, setVendorResponsing] = useState(false)
    const [visitorForm, setVisitorForm] = useState(false)
    const [getData, setGetData] = useState({});
    const [newCase, setNewCase] = useState(false)
    console.log("getdata", getData)


    const resetStates = () => {
        setDashboardOnly(false);
        setVendorOnly(false);
        setShowViewCustomer(false);
        setAccidentVehicle(false) //vendors
        setShowVehicleClaimView(false);//view register
        setVendorResponsing(false); //responses
        setVisitorForm(false);
        setNewCase(false)
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
        labels: ['Crane', 'Advocate', 'Workshop', 'Mechanic'],
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
        labels: ['fleet-Owner', 'Retail'],
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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        getVendorData();
        getCustomerData();
        getAccidentVehicleData();
        getAllAccidentVehicleData();
        reportedRegistersComplaints();
        AssignedVendorsRemaining();
        allVendorResponse();
        allVisitors();
        findUserById(userId)

        if (token === '' || userId === '') {
              navigate('/');
        }
    }, [token, userId, navigate]);


    const vendorsByMonth = Array(12).fill(0);
    const vendorsByType = { crane: 0, advocate: 0, workshop: 0, machanic: 0 };

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

    const findUserById = async (id) => {
        try{console.log("HEY", `${backendUrl}/api/findById/${id}`)
        let response = await axios.get(`${backendUrl}/api/findById/${id}`);
        console.log("daa", response.data)
        if (response.data.message == "No user found") {
            response = await axios.get(`${backendUrl}/api/findByIdEmployee/${id}`);
        }
        console.log("daa2", response.data)

        console.log("data", response.data.data[0]);
        setGetData(response.data.data[0])}
        catch(error){
            console.log("error",error.message)
        }
    }

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
        const getFilteredData = "partiallyAssigned"
        const response = await axios.get(`${backendUrl}/api/getVehicleToAssignVendor/${getFilteredData}`);
        setRemainingAssignedVendors(response.data.data)
    };

    const allVendorResponse = async (e) => {
        const response = await axios ({
            method : "GET",
            url : `${backendUrl}/api/vendorResponse/${userId}`,
            headers: {
              'Authorization': token
            }
          });
        setVendorResponse(response.data.data)
    };

    const allVisitors = async (e) => {
        const response = await axios.get(`${backendUrl}/api/visitors`);
        setVisitors(response.data.data)
    };


    const generateFile = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendUrl}/api/getWeeklyReports/${userId}`);
            setGeneratedExcel(response.data.data);
            setIsLoading(false);
            setIsGenerated(true);
        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }
    };

    const vendorInfo = () => {
        resetStates()
        setVendorOnly(true)
    }

    const customerInfo = () => {
        resetStates()
        setShowViewCustomer(true)
    }

    const accidentInfo = () => {
        resetStates()
        setAccidentVehicle(true)
    }

    const claimInfo = () => {
        resetStates()
        setShowVehicleClaimView(true)
    }

    const vendorResponseInfo = () => {
        resetStates()
        setVendorResponsing(true)
    }

    const visitorsInfo = () => {
        resetStates();
        setVisitorForm(true);
    }
    const newCasesFunc = () => {
        resetStates()
        setNewCase(true)
    }


    return (
        <div>
            {dashboardOnly && (
                <div className="dashboard">
                <Helmet>
                    <title>Accident Dashboard - Claimpro</title>
                    <meta name="description" content="Dashboard for BVC ClaimPro Assist and for vehicle accidents. Keep track of Vendors, Customers actions taken." />
                    <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                    <link rel='canonical' href={`https://claimpro.in/Dashboard`} />
                </Helmet>
                {/* <div className="header-container-search" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 className="dashboardTitle">Administration</h1>
                <label className="form-field search-field" style={{ display: "flex", alignItems: "center" }}>
                    {!isGenerated && (
                        <div
                            className="form-control generate-button"
                            onClick={generateFile}
                            style={{ marginLeft: "auto" }} // Aligns the button to the right
                        >
                            {isLoading ? (
                                <ClipLoader color="#4CAF50" loading={isLoading} />
                            ) : (
                                'Last 7 Days Excel'
                            )}
                        </div>
                    )}
                    {isGenerated && (
                        <a
                            href={generatedExcel}
                            className="form-control download-link"
                            style={{ marginLeft: "auto" }} // Aligns the link to the right
                        >
                            Download Excel File
                        </a>
                    )}
                </label>
            </div> */}



                <main className="main-content">
                    <div className='other-content'>
                        <div style={{ display: "relative" }}>
                        <div className="seehere-container">
                                        <a onClick={newCasesFunc} className="right-align">See Here</a>
                                    </div>

                            <div className="stat-container">
                                <div className="stat-item">
                                    <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                    <h3>Number Of Vendor</h3>
                                    <p>{vendorData.length}</p>
                                    {(getData.randomId || getData.department ==="Management" || getData.department === "IT") && (
                                    <h6 onClick={vendorInfo} className="see-list">see vendor list</h6>
                                    )}
                                </div>

                                <div className="stat-item">
                                    <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                    <h3>Remaining Vehicles To Assign</h3>
                                    <p>{remainingAssignedVendors.length}</p>
                                    {(getData.randomId || getData.department ==="Management" || getData.department === "IT") && (
                                    <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                    )}
                                </div>

                                <div className="stat-item">
                                    <img src={customerImage} className="small-image" alt="Vendor Types" />
                                    <h3>Number of Customer</h3>
                                    <p>{customerData.length}</p>
                                    {(getData.randomId || getData.department ==="Management" || getData.department === "IT") && (
                                    <h6 onClick={customerInfo} className="see-list">see customer list</h6>
                                    )}
                                </div>

                                <div className="stat-item">
                                    <img src={complaints} className="small-image" alt="Vendor Types" />
                                    <h3>Number of Complaints on Vehicle</h3>
                                    <p>{allAccidentVehicleData.length}</p>
                                </div>
                            </div>

                            <div className="statistics">
                                <div className="charts">
                                    <Featured />

                                    <div className="chart-item">
                                        <h3 className="chart-title">Vendor Type Distribution</h3>
                                        <Doughnut data={doughnutData} />
                                    </div>

                                    <Chart />

                                </div>
                            </div>

                            <div className="stat-container">
                                <div className="stat-item">
                                    <img src={registerComplaints} className="small-image" alt="Vendor Types" />
                                    <h3>Registered Complaints</h3>
                                    <p>{registeredAccidentVehicleData.length}</p>
                                    {(getData.randomId || getData.department ==="Management" || getData.department === "IT") && (
                                        <h6 onClick={claimInfo} className="see-list">See Claim List</h6>
                                    )}
                                </div>
                                <div className="stat-item">
                                    <img src={remainingComplaints} className="small-image" alt="Vendor Types" />
                                    <h3>Remaining Complaints</h3>
                                    <p>{accidentVehicleData.length}</p>
                                </div>
                                <div className="stat-item">
                                    <img src={vendorResponseImg} className="small-image" alt="Vendor Types" />
                                    <h3>Vendor Response</h3>
                                    <p>{vendorResponse.length}</p>
                                    {(getData.randomId || getData.department ==="Management" || getData.department === "IT") && (
                                    <h6 onClick={vendorResponseInfo} className="see-list">see response list</h6>
                                    )}
                                </div>
                                <div className="stat-item">
                                    <img src={visitorsImage} className="small-image" alt="Vendor Types" />
                                    <h3>Number Of Visitors</h3>
                                    <p>{visitors.length}</p>
                                    {(getData.randomId || getData.department ==="Management" || getData.department === "IT" || getData.department === "Administration") && (
                                    <h6 onClick={visitorsInfo} className="see-list">see visitors list</h6>
                                    )}
                                </div>
                            </div>


                            <div className="statistics">
                                <div className="charts">
                                    <CustomerChart />
                                    <Featured />

                                    <div className="charts">
                                        <div className="chart-item">
                                            <h3 className="chart-title">Customer Type</h3>
                                            <Doughnut data={doughnutData2} />
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>




                    {/* <div className="statistics">
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
                </div> */}

                    <div className="map-container" style={{ height: '400px', marginRight: "40px", width: '100%', borderRadius: '10px' }}>
                        <MapContainer center={[19.0760, 72.8777]} zoom={10} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[19.244484, 72.9814762]} icon={markerIcon}>
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
            </div>)}

            {newCase && (
                <DummyDashboard/>

            )}
            {vendorOnly && (
                <VendorApproved />
            )}
            {showViewCustomer && (
                <CustomerApproved />
            )}
            {accidentVehicle && (
                <AccidentVehicle />
            )}
            {showVehicleClaimView && (
                <ViewVehicleInfo />
            )}
            {vendorResponsing && (
                <VendorResponse />
            )}
            {visitorForm && (
                <Visitors />
            )}
        </div>
    );

};

export default Dashboard;