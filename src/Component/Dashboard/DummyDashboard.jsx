import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Ensure you create this CSS file for styling
import '../AAAAAAAAAAAAAAAAAA/Table.css'
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
import ComplaintsCharts from '../Charts/ComplaintsCharts';
import IncomingComplaints from '../Charts/IncomingComplaints';
import RemainingAssigned from '../Charts/RemainingAssigned';
import NotAssignedVendorsHere from '../Charts/NotAssignedVendors';
import FullyAssignedVendorsHere from '../Charts/FullyAssignedVendors';
import EmployeeChart from '../Charts/EmployeeChart';
import Table from '../AAAAAAAAAAAAAAAAAA/Table';
import AccidentVehicleRegUpdate from '../AccidentVehicle/AccidentVehicleRegUpdate';
import VendorResponseTable from '../AAAAAAAAAAAAAAAAAA/VendorResponseTable';
import AssignedVendorsTable from '../AAAAAAAAAAAAAAAAAA/AssignedVendorsTable';
import AssignVendorsDoughnut from '../AAAAAAAAAAAAAAAAAA/AssignVendorsDoughut';
import VendorAccpetedDoughnut from '../AAAAAAAAAAAAAAAAAA/VendorAcceptedDoughnut';
import VendorIndPerf from '../AAAAAAAAAAAAAAAAAA/VendorIndPerf';
import VendorRating from '../AAAAAAAAAAAAAAAAAA/VendorRating';
import CustomerRatings from '../AAAAAAAAAAAAAAAAAA/CustomerRatings';
import MostNumberOfVehicle from '../AAAAAAAAAAAAAAAAAA/MostNumberOfVehicle';




// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const DummyDashboard = () => {
    const [vendorData, setVendorData] = useState([]);
    console.log("vendorData", vendorData)
    const [data, setData] = useState([]);

    const [customerData, setCustomerData] = useState([]);
    const [accidentVehicleData, setAccidentVehicleData] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [registeredAccidentVehicleData, setRegisteredAccidentVehicleData] = useState([]);
    const [remainingAssignedVendors, setRemainingAssignedVendors] = useState([]);
    const [getFullyAssignedVendors, setGetFullyAssignedVendors] = useState([]);
    const [getNotAssigedVehiclesVendor, setGetNotAssigedVehiclesVendor] = useState([]);
    console.log("getNotAssigedVehiclesVendor", getNotAssigedVehiclesVendor)

    const [getEmployees, setGetEmployees] = useState([]);
    console.log("employee", getEmployees)



    const [vendorResponse, setVendorResponse] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [generatedExcel, setGeneratedExcel] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [dashboardOnly, setDashboardOnly] = useState(true)
    const [vendorOnly, setVendorOnly] = useState(false)
    const [showViewCustomer, setShowViewCustomer] = useState(false)
    const [newCase, setNewCase] = useState(false)
    const [accidentVehicle, setAccidentVehicle] = useState(false)
    const [showVehicleClaimView, setShowVehicleClaimView] = useState(false)
    const [vendorResponsing, setVendorResponsing] = useState(false)
    const [visitorForm, setVisitorForm] = useState(false)
    const [allDashboard, setAllDashboard] = useState(true)
    const [vendorDashboard, setVendorDashboard] = useState(false)
    const [customerDashboard, setCustomerDashboard] = useState(false)
    const [personalVehicleInfo, setPersonalVehicleInfo] = useState([])
    const [personalAccidentVehicle, setPersonalAccidentVehicle] = useState([])






    const [getData, setGetData] = useState({});
    console.log("getdata123456789", getData)

    const resetStates = () => {
        setDashboardOnly(false);
        setVendorOnly(false);
        setShowViewCustomer(false);
        setAccidentVehicle(false) //vendors
        setShowVehicleClaimView(false);//view register
        setVendorResponsing(false); //responses
        setVisitorForm(false);
        setNewCase(false);
        setAllDashboard(false)
        setVendorDashboard(false)
        setCustomerDashboard(false)

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
        FullyAssignedVendors();
        getNotAssigedVehicles();
        allEmployees();
        findUserById(userId)
        tableData();
        getPersonalVehicleInfo()
        getPersonalAccidentVehicle()

        if (token === '' || userId === '') {
            navigate('/');
        }
    }, [token, userId, navigate]);


    const vendorsByMonth = Array(12).fill(0);
    const vendorsByType = { crane: 0, advocate: 0, workshop: 0, mechanic: 0 };

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
        try {
            let response = await axios.get(`${backendUrl}/api/findById/${id}`);
            console.log("daa", response.data)
            if (response.data.message == "No user found") {
                response = await axios.get(`${backendUrl}/api/findByIdEmployee/${id}`);
            }
            console.log("daa2", response.data)

            console.log("data", response.data.data[0]);
            setGetData(response.data.data[0])
        }
        catch (error) {
            console.log("error", error.message)
        }
    }

    const getVendorData = async () => {
        const response = await axios.get(`${backendUrl}/api/getVendor`);
        setVendorData(response.data.data);
        console.log("vendor", response.data.data)
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
        console.log("Remaikindasdfa", response.data.data)
    };

    const FullyAssignedVendors = async (e) => {
        const response = await axios.get(`${backendUrl}/api/getFullyAssigedVehicles`);
        setGetFullyAssignedVendors(response.data.data)
        console.log("Remaikindasdfa", response.data.data)
    };

    const getNotAssigedVehicles = async (e) => {
        const response = await axios.get(`${backendUrl}/api/getNotAssigedVehicles`);
        setGetNotAssigedVehiclesVendor(response.data.data)
        console.log("setGetNotAssigedVehiclesVendor", response.data.data)
    };

    const allVendorResponse = async (e) => {
        const response = await axios.get(`${backendUrl}/api/vendorResponse`);
        setVendorResponse(response.data.data)
    };

    const allVisitors = async (e) => {
        const response = await axios.get(`${backendUrl}/api/visitors`);
        setVisitors(response.data.data)
    };

    const allEmployees = async (e) => {
        const response = await axios.get(`${backendUrl}/api/getEmployee`);
        setGetEmployees(response.data.data)
    };
    const getPersonalAccidentVehicle = async () => {
        try {
            console.log("TRUEMEN")
            const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfo`);
            console.log("mesagesamay", response.data.status)
            console.log("mesage123", response.message)
            if (response.data.message == "No accident vehicle data found.") setPersonalAccidentVehicle([])
            else setPersonalAccidentVehicle(response.data.data);
        } catch (error) {
            console.error("Error fetching accident data", error);
        }
    };

    const getPersonalVehicleInfo = async () => {
        try {
            console.log("getPersonalVehicleInfo")
            const response = await axios.get(`${backendUrl}/api/getPersonalVehicle`);
            console.log("RESONPSDFSDFSDF")
            setPersonalVehicleInfo(response.data.data);
        } catch (error) {
            console.error("Error fetching vendor data", error);
        }
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

    const [selectedStat, setSelectedStat] = useState("customer");

    const handleStatClick = (stat) => {
        setSelectedStat(stat);
    };



    const tableData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/vendorResponse`);
            console.log("console data", response.data)
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const newCasesFunc = () => {
        resetStates()
        setNewCase(true)
    }

    const AllDashboardFunc = () => {
        resetStates()
        setDashboardOnly(true)
        setAllDashboard(true)
    }
    const vendorDashboardFunc = () => {
        resetStates()
        setDashboardOnly(true)
        setVendorDashboard(true)
    }
    const customerDashboardFunc = () => {
        resetStates()
        setDashboardOnly(true)
        setCustomerDashboard(true)
    }

    const [flexDirection, setFlexDirection] = useState('row');
    const [chartSize, setChartSize] = useState('100%');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setFlexDirection('column');
                setChartSize('50%');
            } else {
                setFlexDirection('row');
                setChartSize('13%');
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [selected, setSelected] = useState(null);
      const handleClick = (func, index) => {
    setSelected(index);
    func();  
  };

    return (

        <div>

            {dashboardOnly && (
                <div className="dashboard">
                    <main className="main-content">
                        <div style={{display:'flex'}}>
                            <p
                                className={`topdivs ${selected === 1 ? 'selected' : ''}`}
                                onClick={() => handleClick(AllDashboardFunc, 1)}
                            >
                                Dashboard
                            </p>
                            <p
                                className={`topdivs ${selected === 2 ? 'selected' : ''}`}
                                onClick={() => handleClick(vendorDashboardFunc, 2)}
                            >
                                Vendors Dashboard
                            </p>
                            <p
                                className={`topdivs ${selected === 3 ? 'selected' : ''}`}
                                onClick={() => handleClick(customerDashboardFunc, 3)}
                            >
                                Customers Dashboard
                            </p>
                        </div>
                        {allDashboard && (
                            <div className='other-content'>
                                <div style={{ display: "relative" }}>
                                    <div className="stat-container">
                                        <div className="stat-item" onClick={() => handleStatClick('vendor')}>
                                            <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                            <h3>Vendor</h3>
                                            <p>{vendorData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={vendorInfo} className="see-list">see vendor list</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('customer')}>
                                            <img src={customerImage} className="small-image" alt="Vendor Types" />
                                            <h3>Customer</h3>
                                            <p>{customerData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={customerInfo} className="see-list">see customer list</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick("Employees")}>
                                            <img src={remainingComplaints} className="small-image" alt="Vendor Types" />
                                            <h3>Employees</h3>
                                            <p>{getEmployees.length}</p>
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('incomingComplaints')}>
                                            <img src={registerComplaints} className="small-image" alt="Vendor Types" />
                                            <h3>Incoming Complaints</h3>
                                            <p>{registeredAccidentVehicleData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={claimInfo} className="see-list">See Claim List</h6>
                                            )}
                                        </div>
                                    </div>

                                    <div className="stat-container">
                                        <div className="stat-item" onClick={() => handleStatClick('complaints')}>
                                            <img src={complaints} className="small-image" alt="Vendor Types" />
                                            <h3>Registered Complaints</h3>
                                            <p>{allAccidentVehicleData.length}</p>
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('fullyAssignedVendors')}>
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Fully Assigned Vehicles</h3>
                                            <p>{getFullyAssignedVendors.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('RemainingAssignedVendors')}>
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Remaining Vehicles To Assign</h3>
                                            <p>{remainingAssignedVendors.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('NotAssignedVehiclesToVendors')}>
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Not Vehicles To Assign</h3>
                                            <p>{getNotAssigedVehiclesVendor.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                            )}
                                        </div>

                                        {/* <div className="stat-item">
                                <img src={vendorResponseImg} className="small-image" alt="Vendor Types" />
                                <h3>Vendor Response</h3>
                                <p>{vendorResponse.length}</p>
                                {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                    <h6 onClick={vendorResponseInfo} className="see-list">see response list</h6>
                                )}
                            </div>

                            <div className="stat-item">
                                <img src={visitorsImage} className="small-image" alt="Vendor Types" />
                                <h3>Visitors</h3>
                                <p>{visitors.length}</p>
                                {(getData.randomId || getData.department === "Management" || getData.department === "IT" || getData.department === "Administration") && (
                                    <h6 onClick={visitorsInfo} className="see-list">see visitors list</h6>
                                )}
                            </div> */}
                                    </div>

                                    {selectedStat === 'vendor' && (
                                        <div className="statistics">
                                            <Chart />
                                        </div>
                                    )}
                                    {selectedStat === 'customer' && (
                                        <div className="statistics" style={{ marginRight: "0px" }}>
                                            <CustomerChart />
                                        </div>
                                    )}
                                    {selectedStat === 'Employees' && (
                                        <div className="statistics">
                                            <EmployeeChart />
                                        </div>
                                    )}
                                    {selectedStat === 'incomingComplaints' && (
                                        <div className="statistics">
                                            <IncomingComplaints />
                                        </div>
                                    )}
                                    {selectedStat === 'complaints' && (
                                        <div className="statistics">
                                            <ComplaintsCharts />
                                        </div>
                                    )}
                                    {selectedStat === 'RemainingAssignedVendors' && (
                                        <div className="statistics">
                                            <RemainingAssigned />
                                        </div>
                                    )}
                                    {selectedStat === 'fullyAssignedVendors' && (
                                        <div className="statistics">
                                            <FullyAssignedVendorsHere />
                                        </div>
                                    )}
                                    {selectedStat === 'NotAssignedVehiclesToVendors' && (
                                        <div className="statistics">
                                            <NotAssignedVendorsHere />
                                        </div>
                                    )}



                                    <div style={{ display: 'flex', flexDirection, gap: '10px', marginTop: '30px' }}>
                                        <div style={{ flex: chartSize }}>
                                            <p style={{ margin: "10px", fontSize: "15px", color: "purple" }}>Vendor's Infomation</p>
                                            <VendorIndPerf />
                                            <div className="seehere-container">
                                                <a onClick={newCasesFunc} className="right-align">See Here</a>
                                            </div>
                                        </div>

                                        <div className="chart-item" style={{ background: "white", marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px" }}>
                                            <h3 className="chart-title">Vendor Type Distribution</h3>
                                            <Doughnut data={doughnutData} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection, gap: '10px' }}>
                                        <AssignedVendorsTable />
                                        <MostNumberOfVehicle />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection, gap: '10px', marginTop: '30px' }}>
                                        <div className="chart-item" style={{ background: "white", marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px" }}>
                                            <h3 className="chart-title">Customer Type Distribution</h3>
                                            <Doughnut data={doughnutData2} />
                                        </div>

                                        <VendorResponseTable />
                                    </div>



                                    <div className="responsive-div">
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                {/* <p style={{ margin: "10px", fontSize: "15px", color: "purple" }}>Customer Information</p> */}
                                                {/* <Table /> */}
                                                <div className="seehere-container">
                                                    <a onClick={newCasesFunc} className="right-align">See Here</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>)}
                        {vendorDashboard && (
                            <div className='other-content'>
                                <div style={{ display: "relative" }}>
                                    <div className="stat-container">
                                        <div className="stat-item" onClick={() => handleStatClick('vendor')}>
                                            <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                            <h3>Vendor</h3>
                                            <p>{vendorData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={vendorInfo} className="see-list">see vendor list</h6>
                                            )}
                                        </div>

                                        <div className="stat-item">
                                            <img src={vendorResponseImg} className="small-image" alt="Vendor Types" />
                                            <h3>Customer Assigned To Vendors</h3>
                                            <p>{vendorResponse.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={vendorResponseInfo} className="see-list">see response list</h6>
                                            )}
                                        </div>
                                        <div className="stat-item" onClick={() => handleStatClick('incomingComplaints')}>
                                            <img src={registerComplaints} className="small-image" alt="Vendor Types" />
                                            <h3>Incoming Complaints</h3>
                                            <p>{registeredAccidentVehicleData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={claimInfo} className="see-list">See Claim List</h6>
                                            )}
                                        </div>
                                        <div className="stat-item" onClick={() => handleStatClick('complaints')}>
                                            <img src={complaints} className="small-image" alt="Vendor Types" />
                                            <h3>Registered Complaints</h3>
                                            <p>{allAccidentVehicleData.length}</p>
                                        </div>
                                    </div>

                                    <div className="stat-container">
                                        <div className="stat-item" onClick={() => handleStatClick('fullyAssignedVendors')}>
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Fully Assigned Vehicles</h3>
                                            <p>{getFullyAssignedVendors.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('RemainingAssignedVendors')}>
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Remaining Vehicles To Assign</h3>
                                            <p>{remainingAssignedVendors.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('NotAssignedVehiclesToVendors')}>
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Not Vehicles To Assign</h3>
                                            <p>{getNotAssigedVehiclesVendor.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={accidentInfo} className="see-list">see remaining vehicle</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" style={{ background: 'transparent', boxShadow: 'none' }}></div>
                                    </div>

                                    {selectedStat === 'vendor' && (
                                        <div className="statistics">
                                            <Chart />
                                        </div>
                                    )}
                                    {selectedStat === 'customer' && (
                                        <div className="statistics" style={{ marginRight: "0px" }}>
                                            <CustomerChart />
                                        </div>
                                    )}
                                    {selectedStat === 'Employees' && (
                                        <div className="statistics">
                                            <EmployeeChart />
                                        </div>
                                    )}
                                    {selectedStat === 'incomingComplaints' && (
                                        <div className="statistics">
                                            <IncomingComplaints />
                                        </div>
                                    )}
                                    {selectedStat === 'complaints' && (
                                        <div className="statistics">
                                            <ComplaintsCharts />
                                        </div>
                                    )}
                                    {selectedStat === 'RemainingAssignedVendors' && (
                                        <div className="statistics">
                                            <RemainingAssigned />
                                        </div>
                                    )}
                                    {selectedStat === 'fullyAssignedVendors' && (
                                        <div className="statistics">
                                            <FullyAssignedVendorsHere />
                                        </div>
                                    )}
                                    {selectedStat === 'NotAssignedVehiclesToVendors' && (
                                        <div className="statistics">
                                            <NotAssignedVendorsHere />
                                        </div>
                                    )}

                                    <VendorResponseTable />
                                    <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                        <a onClick={vendorResponseInfo} style={{ fontSize: '11px' }} className="right-align">See Vendor Responses</a>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection, gap: '10px', marginTop: '30px' }}>
                                        <div style={{ flex: chartSize }}>
                                            <p style={{ fontSize: "13px", color: "purple" }}>Full Vendor Information</p>
                                            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                <a onClick={vendorInfo} style={{ fontSize: '11px' }} className="right-align">See Vendor Perfomanance</a>
                                            </div>
                                            <VendorIndPerf />
                                        </div>
                                        <div style={{ flex: chartSize, maxWidth: "300px" }}>
                                            <p style={{ fontSize: "13px", color: "purple", marginBottom: "15px" }}>Full Report Accepted/Rejected </p>
                                            <VendorAccpetedDoughnut />
                                        </div>

                                        <div className="chart-item" style={{ marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px" }}>
                                            <h3 className="chart-title">Vendor Type Distribution</h3>
                                            <Doughnut data={doughnutData} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection, gap: '10px' }}>
                                        <AssignedVendorsTable />
                                        <VendorRating />
                                    </div>

                                </div>
                            </div>
                        )}
                        {customerDashboard && (
                            <div className='other-content'>
                                <div style={{ display: "relative" }}>
                                    <div className="stat-container">

                                        <div className="stat-item" onClick={() => handleStatClick('customer')}>
                                            <img src={customerImage} className="small-image" alt="Vendor Types" />
                                            <h3>Customer</h3>
                                            <p>{customerData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={customerInfo} className="see-list">see customer list</h6>
                                            )}
                                        </div>

                                        <div className="stat-item" onClick={() => handleStatClick('incomingComplaints')}>
                                            <img src={registerComplaints} className="small-image" alt="Vendor Types" />
                                            <h3>Incoming Complaints</h3>
                                            <p>{registeredAccidentVehicleData.length}</p>
                                            {(getData.randomId || getData.department === "Management" || getData.department === "IT") && (
                                                <h6 onClick={claimInfo} className="see-list">See Claim List</h6>
                                            )}
                                        </div>
                                        <div className="stat-item" onClick={() => handleStatClick('complaints')}>
                                            <img src={complaints} className="small-image" alt="Vendor Types" />
                                            <h3>Registered Complaints</h3>
                                            <p>{allAccidentVehicleData.length}</p>
                                        </div>

                                        <div className="stat-item">
                                            <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                            <h3>Number Of Vehicles</h3>
                                            <p>{personalVehicleInfo.length}</p>
                                        </div>

                                    </div>

                                    <div className="stat-container">
                                        <div className="stat-item">
                                            <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                            <h3>Accident Vehicles</h3>
                                            <p>{personalAccidentVehicle.length}</p>
                                        </div>

                                        <div className="stat-item">
                                            <img src={customerImage} className="small-image" alt="Vendor Types" />
                                            <h3>Number of Resolved Vehicles</h3>
                                            <p>{0}</p>
                                        </div>

                                        <div className="stat-item">
                                            <img src={complaints} className="small-image" alt="Vendor Types" />
                                            <h3>Number of Pending Vehicles</h3>
                                            <p>{personalAccidentVehicle.length}</p>
                                        </div>

                                        <div className="stat-item" style={{ background: 'transparent', boxShadow: 'none' }}></div>

                                    </div>

                                    {selectedStat === 'vendor' && (
                                        <div className="statistics">
                                            <Chart />
                                        </div>
                                    )}
                                    {selectedStat === 'customer' && (
                                        <div className="statistics" style={{ marginRight: "0px" }}>
                                            <CustomerChart />
                                        </div>
                                    )}
                                    {selectedStat === 'Employees' && (
                                        <div className="statistics">
                                            <EmployeeChart />
                                        </div>
                                    )}
                                    {selectedStat === 'incomingComplaints' && (
                                        <div className="statistics">
                                            <IncomingComplaints />
                                        </div>
                                    )}
                                    {selectedStat === 'complaints' && (
                                        <div className="statistics">
                                            <ComplaintsCharts />
                                        </div>
                                    )}
                                    {selectedStat === 'RemainingAssignedVendors' && (
                                        <div className="statistics">
                                            <RemainingAssigned />
                                        </div>
                                    )}
                                    {selectedStat === 'fullyAssignedVendors' && (
                                        <div className="statistics">
                                            <FullyAssignedVendorsHere />
                                        </div>
                                    )}

                                    {selectedStat === 'NotAssignedVehiclesToVendors' && (
                                        <div className="statistics">
                                            <NotAssignedVendorsHere />
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection, gap: '10px', marginTop: '30px' }}>
                                        <div style={{ flex: chartSize }}>
                                            <p style={{ margin: "10px", fontSize: "15px", color: "purple" }}>New Accident Case Register</p>
                                            <VendorResponseTable />
                                        </div>
                                        <div className="chart-item" style={{ marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px" }}>
                                            <h3 className="chart-title">Customer Type Distribution</h3>
                                            <Doughnut data={doughnutData2} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection, gap: '10px' }}>
                                        <CustomerRatings />
                                        <MostNumberOfVehicle />
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}
            {newCase && (
                <AccidentVehicleRegUpdate />

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

export default DummyDashboard;
