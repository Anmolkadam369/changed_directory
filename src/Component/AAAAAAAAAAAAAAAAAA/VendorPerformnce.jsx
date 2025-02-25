import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import backendUrl from '../../environment';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate, useLocation } from 'react-router-dom';
import craneadvocatemechanic from '../../Assets/camw.webp'; // Correct import path
import customerImage from '../../Assets/customer.webp'; // Correct import path
import complaints from '../../Assets/complaints.webp'; // Correct import path
import vehicleIcon from '../../Assets/vehicleIcon.webp'; // Correct import path
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Chart from '../Charts/Chart';
import Featured from '../Charts/Featured';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Admin from '../Admin/Admin';

const VendorPerformance = () => {
    const [totalAssignedCases, setTotalAssignedCases] = useState([]);
    const [responseDate, setResponseDate] = useState([]);
      const {state} = useLocation();
    
    console.log("responseDate", responseDate);
    const [vendorData, setVendorData] = useState([])
    const [gotResponse, setGotResponse] = useState([]);
    const [allAccidentVehicleData, setAllAccidentVehicleData] = useState([]);
    const [adminAccepted, setAdminAccepted] = useState(0)
    const [adminRejected, setAdminRejected] = useState(0)
    const [adminPending, setAdminPending] = useState(0)
    const [workingCases, setWorkingCases] = useState(0)
    const [fullyClosedCases, setFullyClosedCases] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [responseMap, setResponseMap] = useState(new Map());


    useEffect(() => {
        const gettingResponseDate = async () => {
            try {
                const promises = totalAssignedCases.map(async (item) => {
                    const response = await axios.get(`${backendUrl}/api/gettingResponseDate/${state.id}/${state.type}/${item.AccidentVehicleCode}`);
                    return response.data.data[0];
                });
                const results = await Promise.all(promises);
                setResponseDate(results);
            } catch (error) {
                console.error("Error fetching vendor data", error);
            }
        };
        if (totalAssignedCases.length > 0) {
            gettingResponseDate();
        }
    }, [totalAssignedCases]);

    useEffect(() => {
        const map = new Map(responseDate
            .filter((item) => item &&  item.AccidentVehicleCode) // Ensure AccidentVehicleCode exists
            .map((item) => {
                console.log("ITEMSD", item);
                return [item.AccidentVehicleCode, item];
            })
        );
        setResponseMap(map);
    }, [responseDate]);
    
    const [formData, setFormData] = useState({
        VehicleNo: "",
        accidentFileNo: "",
        lossType: "",
        serviceType: "",
        vendorName: "",
        dateRange: ""
    });
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleSelect = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            vendorType: value
        });
        setShowDropdown(false); // Close dropdown after selection
    };

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


    const [doughnutData, setDoughnutData] = useState({
        labels: ['Total Vehicles', 'Fully Closed Inc. Rejected', 'Working Vehicles', 'Non Working Vehicles'],
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

    const [doughnutData2, setDoughnutData2] = useState({
        labels: ['Total Cases', 'Accepted Cases', 'Rejected Cases', 'Real Pending Cases', "Response Not Sent By Vendor"],
        datasets: [
            {
                label: 'Vehicles',
                data: Array(4).fill(0),
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
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
        fetchAssignedCases();
        getAllAccidentVehicleData();
        getGotResponseVehicle();
    }, [token, userId, navigate]);

    useEffect(() => {

        const totalCases = totalAssignedCases.length;
        const fullyClosedCasesVendor = fullyClosedCases + adminRejected;
        const workingCasesVendor = workingCases - adminRejected;
        const NonworkingCasesVehicle = totalAssignedCases.length - gotResponse.length; // Update this with the actual resolved vehicles count

        setDoughnutData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: [totalCases, fullyClosedCasesVendor, workingCasesVendor, NonworkingCasesVehicle],
                },
            ],
        }));
    }, [totalAssignedCases, gotResponse, fullyClosedCases, workingCases]);

    useEffect(() => {
        const totalCases = totalAssignedCases.length;
        const acceptedCases = adminAccepted;
        const realPendingCases = adminPending - (totalAssignedCases.length - gotResponse.length);
        const rejectedCases = adminRejected; // Update this with the actual resolved vehicles count
        const responseNotSentToAdmin = adminPending - realPendingCases
        setDoughnutData2((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: [totalCases, acceptedCases, rejectedCases, realPendingCases, responseNotSentToAdmin],
                },
            ],
        }));
    }, [totalAssignedCases, adminAccepted, adminPending, adminRejected]);

    const getGotResponseVehicle = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getAssignedVehicleForDashboard/${state.id}`);
            console.log("getAssignedVehicleForDashboard success", response.data.data);
            setGotResponse(response.data.data);
        } catch (error) {
            console.error("Failed to fetch existing data", error.response || error);
            if (error.response) {
                console.log("Error data:", error.response.data);
                console.log("Error status:", error.response.status);
                console.log("Error headers:", error.response.headers);
            } else {
                console.log("Error message:", error.message);
            }
        }
    };

    const fetchAssignedCases = async () => {
        try {
            let response;
            if (state.type == "crane") response = await axios.get(`${backendUrl}/api/assignedTasksCrane/${state.id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            if (state.type == "mechanic") response = await axios.get(`${backendUrl}/api/assignedTasksMechanic/${state.id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            if (state.type == "advocate") response = await axios.get(`${backendUrl}/api/assignedCasesAdvocate/${state.id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            if (state.type == "workshop") response = await axios.get(`${backendUrl}/api/assignedTasksWorkshop/${state.id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});

            console.log("Total", response.data.data);
            setTotalAssignedCases(response.data.data);
        } catch (error) {
            console.error("Failed to fetch assigned cases:", error);
        }
    };

    useEffect(() => {
        if (gotResponse.length != 0) {
            let fullyClosedCount = 0;
            let workingCount = 0;

            for (let i = 0; i < gotResponse.length; i++) {
                let caseIsFullyClosed = true;
                const caseFields = gotResponse[i];
                for (let key in caseFields) {
                    if (caseFields[key] === null || caseFields[key] === "") {
                        caseIsFullyClosed = false;
                        break;
                    }
                }
                if (caseIsFullyClosed) {
                    fullyClosedCount++;
                } else {
                    workingCount++;
                }
            }
            setFullyClosedCases(fullyClosedCount);
            setWorkingCases(workingCount);
        }
    }, [gotResponse])

    useEffect(() => {
        console.log("INSIDE TOTALASSIGNED CASES")
        if (totalAssignedCases.length !== 0) {
            let acceptedCount = 0;
            let rejectedCount = 0;
            let pendingCount = 0;

            for (let i = 0; i < totalAssignedCases.length; i++) {
                if (totalAssignedCases[i].details.length === 0 || totalAssignedCases[i].details[0].acceptedByAdmin === null) {
                    pendingCount++;
                } else if (totalAssignedCases[i].details[0].acceptedByAdmin === "accept") {
                    acceptedCount++;
                } else if (totalAssignedCases[i].details[0].acceptedByAdmin === "reject") {
                    rejectedCount++;
                }
            }
            setAdminAccepted(acceptedCount);
            setAdminRejected(rejectedCount);
            setAdminPending(pendingCount);
        }
    }, [totalAssignedCases]);

    const getAllAccidentVehicleData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${state.id}`,{        headers: {
          'Authorization': `Bearer ${token}`
        }});
            console.log("responssesesesee", response)
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    const hasData = (data) => data.some((value) => value !== 0);

    const handleBack = () => {
        navigate(-1);
    }

    const getAssignedDate = (item, type) => {
        switch(type) {
          case "crane":
            return item.craneAssignedOn ? item.craneAssignedOn : "__";
          case "mechanic":
            return item.mechanicAssignedOn ? item.mechanicAssignedOn : "__";
          case "advocate":
            return item.advocateAssignedOn ? item.advocateAssignedOn : "__";
          case "workshop":
            return item.workshopAssignedOn ? item.workshopAssignedOn : "__";
          default:
            return "__";
        }
      };

      
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
    

    return (
        <div className='dashboard'>
            <Admin/>
            <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
            </div>
            <main className="main-content">
                <div className='other-content'>
                    <div style={{ display: "relative" }}>

                        <div className="stat-container">
                            <div className="stat-item">
                                <img src={craneadvocatemechanic} className="small-image" alt="Vendor Types" />
                                <h3>Total Cases</h3>
                                <p>{totalAssignedCases.length}</p>
                            </div>

                            <div className="stat-item">
                                <ThumbUpAltOutlinedIcon className="small-image" />
                                {/* <img src={SwipeRightAltOutlinedIcon} className="small-image" alt="accpeted By Admin" /> */}
                                <h3>Accepted</h3>
                                <p>{adminAccepted}</p>
                            </div>

                            <div className="stat-item">
                                <ThumbDownOutlinedIcon className="small-image" />
                                <h3>Rejected</h3>
                                <p>{adminRejected}</p>
                            </div>

                            <div className="stat-item">
                                <PendingActionsOutlinedIcon className="small-image" />
                                <h3>Pending (Admin/ Not Request)</h3>
                                <p>{adminPending}</p>
                            </div>
                        </div>

                        <div className="stat-container">
                            <div className="stat-item">
                                <img src={vehicleIcon} className="small-image" alt="Vendor Types" />
                                <h3>Response Given</h3>
                                <p>{gotResponse.length}</p>
                            </div>

                            <div className="stat-item">
                                <AssignmentTurnedInOutlinedIcon className="small-image" />
                                <h3>Fully Close</h3>
                                <p>{fullyClosedCases + adminRejected}</p>
                            </div>
                            <div className="stat-item">
                                <PendingActionsOutlinedIcon className="small-image" />
                                <h3>Working Case</h3>
                                <p>{workingCases - adminRejected}</p>
                            </div>
                            <div className="stat-item">
                                <PendingOutlinedIcon className="small-image" />
                                <h3>Non Started Cases</h3>
                                <p>{totalAssignedCases.length - gotResponse.length}</p>
                            </div>
                        </div>

                    </div>
                        <div  style={{ display: 'flex', flexDirection, gap: '10px', marginTop: '30px' }}>
                            <div className="charts">

                                <div className="chart-item" style={{ background: "white", marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px" }}>
                                    <h3 className="chart-title"> Vehicle Working Status</h3>
                                    {hasData(doughnutData.datasets[0].data) ? (
                                        <Doughnut data={doughnutData} />
                                    ) : (
                                        "No Data"
                                    )}
                                </div>

                                <div className="chart-item" style={{ background: "white", marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px" }}>
                                    <h3 className="chart-title"> Admin Cases Status</h3>
                                    {hasData(doughnutData.datasets[0].data) ? (
                                        <Doughnut data={doughnutData2} />
                                    ) : (
                                        "No Data"
                                    )}
                                </div> 
                                <div className="chart-item" style={{ background: "transparent", marginTop: flexDirection === 'column' ? '30px' : '0', flex: chartSize, maxWidth: "300px", boxShadow:"none" }}>
                                <Featured />
                                </div>
                            </div>
                        </div>


                    <form class='Customer-master-form'>
                        <div class="header-container">
                            <h3 class="bigtitle">Assigned Vehicles</h3>
                        </div>
                        <div className="form-row">
                            <label className="form-field input-group mb-3">
                                Vehicle No:
                                <input
                                    type="text"
                                    name="VehicleNo"
                                    placeholder='Vehicle No'
                                    class="form-label"
                                    value={formData.VehicleNo}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </label>

                            <label className="form-field input-group mb-3">
                                Accident File No:
                                <input
                                    type="text"
                                    name="accidentFileNo"
                                    placeholder='Accident File No'
                                    class="form-label"
                                    value={formData.accidentFileNo}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </label>

                            <label className="form-field input-group mb-3">
                                Loss Type:
                                <input
                                    type="text"
                                    name="lossType"
                                    placeholder='Loss Type'
                                    class="form-label"
                                    value={formData.lossType}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </label>

                            <label className="form-field input-group mb-3">
                                Service Type:
                                <input
                                    type="text"
                                    name="serviceType"
                                    placeholder='Service Type'
                                    class="form-label"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </label>

                        </div>

                        <div className="form-row">
                            <div className="dropdown green-dropdown form-field">
                                Select Option :
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={toggleDropdown}
                                    style={{ color: 'black', marginTop: '5px' }}
                                >
                                    {formData.vendorType || "Select Vendor Type"}
                                </button>
                                <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advocate")}>Advocate</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crane")}>Crane</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "mechanic")}>Mechanic</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                                </ul>
                            </div>

                            <label className="form-field input-group mb-3">
                                From Date:
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleChange}
                                    readOnly
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field input-group mb-3">
                                To Date:
                                <input
                                    type="date"
                                    name="toDate"
                                    value={formData.toDate}
                                    onChange={handleChange}
                                    readOnly
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field input-group mb-3"></label>

                        </div>
                    </form>

                    <div className="responsive-table">
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Acc. File No</th>
                                    <th>assigned By</th>
                                    <th>Accept By Admin</th>
                                    <th>Assigned</th>
                                    <th>Responded</th>
                                    <th>Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalAssignedCases.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No data is there...</td>
                                    </tr>
                                ) : (
                                    totalAssignedCases.map((item, index) => {
                                        const responseItem = responseMap.get(item.AccidentVehicleCode) || {};
                                        return (
                                            <tr key={item.AccidentVehicleCode}>
                                                <td>{index + 1}</td>
                                                <td>{item.accidentFileNo}</td>
                                                <td>{item.assignedBy}</td>
                                                {item.details == 0 ? (
                                                    <td style={{ textAlign: 'center', color: 'red' }}>Not Requested</td>
                                                ) : (
                                                    <td style={{ textAlign: 'center', color: (item.details.length > 0 && item.details[0].acceptedByAdmin) ? 'darkblue' : 'darkorange' }}>
                                                        {item.details.length > 0 && item.details[0].acceptedByAdmin ? item.details[0].acceptedByAdmin : "Pending"}
                                                    </td>
                                                )}
                                                <td>{getAssignedDate(item, state.type)}</td>
                                                <td>{responseItem.firstResponseOn || "__"}</td>
                                                <td>{responseItem.updateResponseOn || "__"}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </div>
    )
}
export default VendorPerformance;