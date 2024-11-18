import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';
import MechanicResponse from "../ViewVendorResponse/MechanicResponse"
import CraneResponse from "../ViewVendorResponse/CraneResponse"
import AdvocateResponse from "../ViewVendorResponse/AdvocateResponse"
import WorkshopResponse from "../ViewVendorResponse/WorkshopResponse"
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import DataTable from "react-data-table-component";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
};



const ActualVendorResponse = ({ vehicle, onUpdate }) => {
    console.log("HELLO")
    const [mechanicData, setMechanicData] = useState([]);
    const [craneData, setcraneData] = useState([]);
    const [advocateData, setAdvocateData] = useState([]);
    const [workshopData, setWorkshopData] = useState([]);
    const [width, setWidth] = useState('100%');
    const [mainContent, setMainContent] = useState(true)
    const [viewMechanicData, setViewMechanicData] = useState(false);
    const [viewCraneData, setViewCraneData] = useState(false);
    const [viewAdvocateData, setViewAdvocateData] = useState(false);
    const [viewWorkshopData, setViewWorkshopData] = useState(false);
    const [selectedId, setSelectedId] = useState({});
    const [comingVendorData, setComingVendorData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false)
    console.log("VEHICLEsCoimg", vehicle)
    console.log("DATAFETCHED", dataFetched)
    console.log("setComingVendorData", comingVendorData)

    console.log("Advocatedata", advocateData)
    console.log("machaicDaa", mechanicData)
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setdata] = useState([vehicle]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
    }, [token, userId, navigate]);

    const [formData, setFormData] = useState({
        vehicleNo: ""
    });

    const [cransData, setCransData] = useState([]);
    console.log("cransData", cransData)
    const [mechanicsData, setMechanicsData] = useState([]);
    const [workshopsData, setWorkshopsData] = useState([]);
    const [advocatesData, setAdvocatesData] = useState([]);

    const [DataRejected, setDataRejected] = useState([]);
    console.log("DATAREJECTED first", DataRejected)
    console.log("DATAREJECTEDhere", DataRejected[0])


    useEffect(() => {

        if (vehicle.craneData.length !== 0) {
            console.log("vanva", vehicle.craneData)
            const result = someFunct(vehicle.craneData);
            const result2 = someFunct2(vehicle.craneData);
            console.log("REUSLTS2 here",result2)
            setCransData(result);
            for(let i =0; i<result2.length; i++){
                setDataRejected(prevState => [
                    ...prevState,
                    result2[i]
                ]);
            }
        }
        if (vehicle.mechanicData.length !== 0) {
            const result = someFunct(vehicle.mechanicData);
            const result2 = someFunct2(vehicle.mechanicData);
            setMechanicsData(result);
            setDataRejected(prevState => [
                ...prevState,
                result2[0]
            ]);
        }
        if (vehicle.advocateData.length !== 0) {
            const result = someFunct(vehicle.advocateData);
            const result2 = someFunct2(vehicle.advocateData);
            setWorkshopsData(result);
            setDataRejected(prevState => [
                ...prevState,
                result2[0]
            ]);
        }
        if (vehicle.workshopData.length !== 0) {
            const result = someFunct(vehicle.workshopData);
            const result2 = someFunct2(vehicle.workshopData);
            setAdvocatesData(result);
            setDataRejected(prevState => [
                ...prevState,
                result2[0]
            ]);
        }
    }, [vehicle]);

    const someFunct = (data) => {
        return data.filter(item => item.acceptedByAdmin !== 'reject');
    };
    const someFunct2 = (data) => {
        console.log('data in someFunction1', data)
       return data.filter((item)=>{
        console.log("accepted", item.acceptedByAdmin);
        console.log("vendorDecision", item.vendorDecision);
        console.log(item.acceptedByAdmin === 'reject' || item.vendorDecision === 'reject')
        return (item.acceptedByAdmin === 'reject' || item.vendorDecision === 'reject')
       })
    };

    useEffect(() => {
        const fetchVendorData = async () => {
            if (vehicle) {
                let vendors = [];
                console.log("VEHICLER 145", vehicle)
                if (vehicle.advocate) vendors.push(vehicle.advocate);
                if (vehicle.mechanic) vendors.push(vehicle.mechanic);
                if (vehicle.crane) vendors.push(vehicle.crane);
                if (vehicle.workshop) vendors.push(vehicle.workshop);

                if(vehicle.craneData.length > 0){
                    vehicle.craneData.map((individualCraneData)=>{
                        vendors.push(individualCraneData.VendorCode)
                    })
                }
                console.log("VEDORDSSSDD", vendors)
                for (const ven of vendors) {
                    try {
                        const response = await axios.get(`${backendUrl}/api/findByIdForVendor/${ven}`);
                        setComingVendorData(prevData => [...prevData, response.data.data[0]]);
                    } catch (error) {
                        console.error("Error fetching vendor data:", error);
                    }
                }
                setDataFetched(true);
            }
        };

        if (!dataFetched) {
            fetchVendorData();
        }
    }, [vehicle, dataFetched]);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const handleSetItemPerPage = (e) => {
        setItemsPerPage(e.target.value);
    };
    const filteredData = data.filter(item =>
        item.CustomerName && item.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    let finalData;
    const viewMechanic = (data) => {
        console.log("viewMechanic", data)
        setSelectedId(data[0])
        setMainContent(false);
        setViewMechanicData(true);
        setViewCraneData(false);
        setViewAdvocateData(false);
        setViewWorkshopData(false);
    }

    const viewCrane = (data) => {
        console.log("DATACRANESHERE", data);
        setSelectedId(data)
        setMainContent(false);
        setViewMechanicData(false);
        setViewCraneData(true);
        setViewAdvocateData(false);
        setViewWorkshopData(false);
    }
    const viewAdvocate = (data) => {
        console.log("DATA", data);
        setSelectedId(data)
        setMainContent(false);
        setViewMechanicData(false);
        setViewCraneData(false);
        setViewAdvocateData(true);
        setViewWorkshopData(false);
    }
    const viewWorkshop = (data) => {
        console.log("DATA", data);
        setSelectedId(data)
        setMainContent(false);
        setViewMechanicData(false);
        setViewCraneData(false);
        setViewAdvocateData(false);
        setViewWorkshopData(true);
    }
    const handleBack = () => {
        onUpdate();
    }

    const handleUpdate = () => {
        setMainContent(true);
        setViewMechanicData(false);
        setViewCraneData(false);
        setViewAdvocateData(false);
        setViewWorkshopData(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 630) {
                setWidth('75%');
            } else {
                setWidth('100%');
            }
        };
        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

    }, [comingVendorData])

    console.log("comigDatahere", comingVendorData)
    const uniqueVendors = comingVendorData.filter((vendor, index, self) =>
        index === self.findIndex((v) => v.vendorCode === vendor.vendorCode));

    console.log("uniqueVendorsstaff",uniqueVendors)
    console.log("datarejectedsatff",DataRejected)


    const [DataRejectedVendors, setDataRejectedVendors] = useState([]);
    const [craneDataRejected, setCraneDataRejected] = useState([]);
    console.log("cranedatarejected", craneDataRejected)
    const [advocateDataRejected, setAdvocateDataRejected] = useState([]);
    const [mechanicDataRejected, setMechanicDataRejected] = useState([]);
    const [workshopDataRejected, setWorkshopDataRejected] = useState([]);


    console.log("DATAREJECTEDVEDOERESS", DataRejectedVendors)
    useEffect(() => {
        const uniquehere = (uniqueVendors) => {
            if (Array.isArray(DataRejected) && Array.isArray(uniqueVendors)) {
                const matchedVendors = DataRejected
                    .filter(item => item?.VendorCode) // Ensure VendorCode exists
                    .map(item => {
                        const matchedVendor = uniqueVendors.find(vendor => vendor.vendorCode === item.VendorCode);
                        return matchedVendor ? { ...matchedVendor, ...item } : null;
                    })
                    .filter(item => item !== null); // Filter out null values
                    console.log("matchedVendors123", matchedVendors)
                // Remove duplicates based on VendorCode
                const uniqueMatchedVendors = matchedVendors.reduce((acc, current) => {
                    const x = acc.find(item => item.vendorCode === current.vendorCode);
                    return x ? acc : acc.concat([current]);
                }, []);
                console.log("uniqueMatchedVendors123", uniqueMatchedVendors)
                console.log("DataRejectedVendors", DataRejectedVendors)


    
                // Only update states if uniqueMatchedVendors has changed
                // if (JSON.stringify(uniqueMatchedVendors) !== JSON.stringify(DataRejectedVendors)) {
                    setDataRejectedVendors(uniqueMatchedVendors);
                    
                    const newCraneDataRejected = [];
                    const newAdvocateDataRejected = [];
                    const newMechanicDataRejected = [];
                    const newWorkshopDataRejected = [];
    
                    // Populate arrays for each vendor type
                    uniqueMatchedVendors.forEach(vendor => {
                        switch (vendor.vendorType) {
                            case 'crane':
                                newCraneDataRejected.push(vendor);
                                break;
                            case 'advocate':
                                newAdvocateDataRejected.push(vendor);
                                break;
                            case 'mechanic':
                                newMechanicDataRejected.push(vendor);
                                break;
                            case 'workshop':
                                newWorkshopDataRejected.push(vendor);
                                break;
                            default:
                                break;
                        }
                    });
    
                    setCraneDataRejected(newCraneDataRejected);
                    setAdvocateDataRejected(newAdvocateDataRejected);
                    setMechanicDataRejected(newMechanicDataRejected);
                    setWorkshopDataRejected(newWorkshopDataRejected);
                // }
            }
        };
    
        if (uniqueVendors.length !== 0 && DataRejected.length !== 0) {
            uniquehere(uniqueVendors);
        }
    }, [DataRejected, uniqueVendors, DataRejectedVendors]);
    

    const [selected, setSelected] = useState("accepted")

    console.log("cut kela phone", cransData.length, vehicle.craneData.length)
    return (
        <div>
            {mainContent && (
                <div className="Customer-master-form" style={{ paddingLeft: '10px', paddingRight: "10px", paddingTop: "40px", paddingBottom: "40px", marginLeft: "5px" }}>
                    <Helmet>
                        <title>Actual Vendor Response - Claimpro</title>
                        <meta name="description" content="Actual Vendor Response" />
                        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                        <link rel='canonical' href={`https://claimpro.in/ActualVendorResponse`} />
                    </Helmet>
                    {/* <div style={{ marginBottom: "50px" }}>
                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                        <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack}></Button>
                        <h3 className="bigtitle">Vendor Response</h3>
                    </div>
                    <div>
                        {data.map((vehicle, vehicleIndex) => (
                            <div key={vehicle.AccidentVehicleCode}>
                                <h2 className="title1">Mechanic Data</h2>
                                <div className="responsive-table" style={{ width }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "30px" }}>
                                        <thead>
                                            <tr>
                                                <th>Vehicle Ins.</th>
                                                <th>Labour Est.</th>
                                                <th>Parts Arrangement</th>
                                                <th>Trial</th>
                                                <th>Payment</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicle.mechanicData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>No Response from this vendor...</td>
                                                </tr>
                                            ) : (
                                                vehicle.mechanicData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.vehicleInspection || '---'}</td>
                                                        <td>{item.labourEstimate || '---'}</td>
                                                        <td>{item.partsArrangment || '---'}</td>
                                                        <td>{item.trial || '---'}</td>
                                                        <td>{item.payment || '---'}</td>
                                                        <td>
                                                            <button onClick={() => viewMechanic(item)} className='view-button'>View</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <h2 className="title1">Crane Data</h2>
                                <div className="responsive-table">
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "30px" }}>
                                        <thead>
                                            <tr>
                                                <th>Vehicle Ins.</th>
                                                <th>Recovery van </th>
                                                <th>Vehicle Handover</th>
                                                <th>Advanced Payment</th>
                                                <th>Balance Payment</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicle.craneData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>No Response from this vendor...</td>
                                                </tr>
                                            ) : (
                                                vehicle.craneData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.vehicleInspection || '---'}</td>
                                                        <td>{item.recoveryVanEstimate || '---'}</td>
                                                        <td>{item.vehicleHandover || '---'}</td>
                                                        <td>{item.advancedPayment || '---'}</td>
                                                        <td>{item.balancePayment || '---'}</td>
                                                        <td>
                                                            <button onClick={() => viewCrane(item)} className='view-button'>View</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <h2 className="title1">Advocate Data</h2>
                                <div className="responsive-table">
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "30px" }}>
                                        <thead>
                                            <tr>
                                                <th>POA</th>
                                                <th>Police Report</th>
                                                <th>Indemnity Bond Copy</th>
                                                <th>Bailer Details</th>
                                                <th>Release Order</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicle.advocateData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>All Vehicles are assigned To Vendors...</td>
                                                </tr>
                                            ) : (
                                                vehicle.advocateData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.POA ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.policeReportCopy ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.indemnityBondCopy ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.bailerDetails ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.releaseOrderCopy ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>
                                                            <button onClick={() => viewAdvocate(item)} className='view-button'>View</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <h2 className="title1">Workshop Data</h2>
                                <div className="responsive-table">
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                        <thead>
                                            <tr>
                                                <th>Payment</th>
                                                <th>Est. Given</th>
                                                <th>Deadline Sheet</th>
                                                <th>Supplementary Estimate</th>
                                                <th>Pre Appr.</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicle.workshopData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center', fontWeight: "bold" }}>All Vehicles are assigned To Vendors...</td>
                                                </tr>
                                            ) : (
                                                vehicle.workshopData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.payment ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.estimateGiven ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.deadlineSheet ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.supplementryEstimate ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>{item.preApproval ? <span style={{ fontWeight: 'bold' }}>uploaded</span> : '---'}</td>
                                                        <td>
                                                            <button onClick={() => viewWorkshop(item)} className='view-button'>View</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                    <div style={{ marginTop: "50px" }}>
                        <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                            <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack}></Button>
                            <h3 className="bigtitle">Vendor Response Overview (Assigned Only)</h3>
                        </div>
                        {selected == "accepted" && (
                            <div>
                                <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                                <button style={{backgroundColor:"teal", color:'white'}} onClick={(() => { setSelected("rejected") })}>
                                    See Rejected Vendors
                                </button>
                                </div>
                                <div className="responsive-table" style={{ width: '100%' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                        <thead>
                                            <tr>
                                                <th>Sr. No</th>
                                                <th>Vendor Name</th>
                                                <th>Type Of Vendor</th>
                                                <th>Vendor Email</th>
                                                <th>Vendor</th>
                                                <th>Admin</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {uniqueVendors.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Response from the assigned vendors...</td>
                                                </tr>
                                            ) : (
                                                uniqueVendors.map((vendor, index) => (
                                                    <tr key={vendor.vendorCode}>
                                                        <td>{index + 1}</td>
                                                        <td>{vendor.vendorName.charAt(0).toUpperCase() + vendor.vendorName.slice(1) || '---'}</td>
                                                        <td style={{ color: "green" }}>{vendor.vendorType.charAt(0).toUpperCase() + vendor.vendorType.slice(1) || '---'}</td>
                                                        <td style={{ color: "blue" }}><a href={`mailto:${vendor.email}`} style={{ color: "blue", textDecoration: "none" }}>
                                                            {vendor.email}
                                                        </a></td>
                                                        <td>
                                                            <div>
                                                                {vendor.vendorType === "crane" && (
                                                                     cransData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{cransData[0].vendorDecision == null ? "pending" : cransData[0].vendorDecision.charAt(0).toUpperCase() + cransData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "mechanic" && (
                                                                    vehicle.mechanicData.length !== 0 && mechanicsData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{mechanicsData[0].vendorDecision == null ? "pending" : mechanicsData[0].vendorDecision.charAt(0).toUpperCase() + mechanicsData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "advocate" && (
                                                                    vehicle.advocateData.length !== 0 && advocatesData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{advocatesData[0].vendorDecision == null ? "pending" : advocatesData[0].vendorDecision.charAt(0).toUpperCase() + advocatesData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "workshop" && (
                                                                    vehicle.workshopData.length !== 0 && workshopsData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{workshopsData[0].vendorDecision == null ? "pending" : workshopsData[0].vendorDecision.charAt(0).toUpperCase() + workshopsData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {vendor.vendorType === "crane" && (
                                                                    vehicle.craneData.length !== 0 && cransData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{cransData[0].acceptedByAdmin == null ? "pending" : cransData[0].acceptedByAdmin.charAt(0).toUpperCase() + cransData[0].acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "mechanic" && (
                                                                    vehicle.mechanicData.length !== 0 && mechanicsData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{mechanicsData[0].acceptedByAdmin == null ? "pending" : mechanicsData[0].acceptedByAdmin.charAt(0).toUpperCase() + mechanicsData[0].acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "advocate" && (
                                                                    vehicle.advocateData.length !== 0 && advocatesData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{advocatesData[0].acceptedByAdmin == null ? "pending" : advocatesData[0].acceptedByAdmin.charAt(0).toUpperCase() + advocatesData[0].acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "workshop" && (
                                                                    vehicle.workshopData.length !== 0 && workshopsData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{workshopsData[0].acceptedByAdmin == null ? "pending" : workshopsData[0].acceptedByAdmin.charAt(0).toUpperCase() + workshopsData[0].acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {vendor.vendorType === "crane" && (
                                                                    cransData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewCrane(cransData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "mechanic" && (
                                                                    mechanicsData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewMechanic(mechanicsData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "advocate" && (
                                                                    advocatesData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewAdvocate(advocatesData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "workshop" && (
                                                                    workshopsData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewWorkshop(workshopsData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {selected == "rejected" && (
                            <div>
                                <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                                <button style={{backgroundColor:"teal", color:"white"}} onClick={(() => { setSelected("accepted") })}>
                                   See Processed Vendors
                                </button>
                                </div>
                                <div className="responsive-table" style={{ width: '100%' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                        <thead>
                                            <tr>
                                                <th>Sr. No</th>
                                                <th>Vendor Name</th>
                                                <th>Type Of Vendor</th>
                                                <th>Vendor Email</th>
                                                <th>Vendor</th>
                                                <th>Accepted</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DataRejectedVendors.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Rejected Vendors Yet</td>
                                                </tr>
                                            ) : (
                                                DataRejectedVendors.map((vendor, index) => (
                                                    <tr key={vendor.vendorCode}>
                                                        <td>{index + 1}</td>
                                                        <td>{vendor.vendorName.charAt(0).toUpperCase() + vendor.vendorName.slice(1) || '---'}</td>
                                                        <td style={{ color: "green" }}>{vendor.vendorType.charAt(0).toUpperCase() + vendor.vendorType.slice(1) || '---'}</td>
                                                        <td style={{ color: "blue" }}><a href={`mailto:${vendor.email}`} style={{ color: "blue", textDecoration: "none" }}>
                                                            {vendor.email}
                                                        </a></td>
                                                        <td>
                                                            <div>
                                                                {vendor.vendorType === "crane" && (
                                                                     cransData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{cransData[0].vendorDecision == null ? "pending" : cransData[0].vendorDecision.charAt(0).toUpperCase() + cransData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "mechanic" && (
                                                                    vehicle.mechanicData.length !== 0 && mechanicsData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{mechanicsData[0].vendorDecision == null ? "pending" : mechanicsData[0].vendorDecision.charAt(0).toUpperCase() + mechanicsData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "advocate" && (
                                                                    vehicle.advocateData.length !== 0 && advocatesData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{advocatesData[0].vendorDecision == null ? "pending" : advocatesData[0].vendorDecision.charAt(0).toUpperCase() + advocatesData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "workshop" && (
                                                                    vehicle.workshopData.length !== 0 && workshopsData.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{workshopsData[0].vendorDecision == null ? "pending" : workshopsData[0].vendorDecision.charAt(0).toUpperCase() + workshopsData[0].vendorDecision.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {vendor.vendorType === "crane" && (
                                                                    craneDataRejected.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{craneDataRejected.acceptedByAdmin == null ? "pending" : craneDataRejected.acceptedByAdmin.charAt(0).toUpperCase() + craneDataRejected.acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "mechanic" && (
                                                                    mechanicDataRejected.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{mechanicDataRejected.acceptedByAdmin == null ? "pending" : mechanicDataRejected.acceptedByAdmin.charAt(0).toUpperCase() + mechanicsData.acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "advocate" && (
                                                                    advocateDataRejected.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{advocateDataRejected.acceptedByAdmin == null ? "pending" : advocateDataRejected.acceptedByAdmin.charAt(0).toUpperCase() + advocateDataRejected.acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "workshop" && (
                                                                    workshopDataRejected.length !== 0 ? (
                                                                        <p style={{ color: "brown", fontSize: "14px" }}>{workshopDataRejected.acceptedByAdmin == null ? "pending" : workshopDataRejected.acceptedByAdmin.charAt(0).toUpperCase() + workshopDataRejected.acceptedByAdmin.slice(1)}</p>
                                                                    ) : (
                                                                        <p style={{ color: "red", fontSize: "14px" }}>no response</p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {vendor.vendorType === "crane" && (
                                                                    craneDataRejected.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewCrane([craneDataRejected])} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "mechanic" && (
                                                                    mechanicsData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewMechanic(mechanicsData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "advocate" && (
                                                                    advocatesData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewAdvocate(advocatesData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                                {vendor.vendorType === "workshop" && (
                                                                    workshopsData.length === 0 ? (
                                                                        <button className='view-button' style={{ color: "red" }}>__</button>
                                                                    ) : (
                                                                        <button onClick={() => viewWorkshop(workshopsData)} className='view-button'>View</button>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        <div className="pagination">
                            <ButtonGroup style={{ boxShadow: 'none' }} variant="contained" color="primary" aria-label="pagination buttons">
                                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                    <ArrowBack />
                                </Button>
                                {pageNumbers.map((pageNumber) => (
                                    <Button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={currentPage === pageNumber ? 'active' : ''}
                                    >
                                        {pageNumber}
                                    </Button>
                                ))}
                                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    <ArrowForward />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>

                </div>
            )}

            {viewMechanicData && selectedId != {} && (
                <MechanicResponse data={selectedId} onUpdate={handleUpdate} />
            )}

            {viewCraneData && selectedId != {} && (
                <CraneResponse data={selectedId} onUpdate={handleUpdate} />
            )}

            {viewAdvocateData && selectedId != {} && (
                <AdvocateResponse data={selectedId} onUpdate={handleUpdate} />
            )}

            {viewWorkshopData && selectedId != {} && (
                <WorkshopResponse data={selectedId} onUpdate={handleUpdate} />
            )}

        </div>
    );

};

export default ActualVendorResponse;
