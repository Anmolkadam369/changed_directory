import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import './ActualVendorResponse.css'
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


const VendorTable = ({ vendors, categoryName }) => {
    const [mainContent, setMainContent] = useState(true)
    const [viewMechanicData, setViewMechanicData] = useState(false);
    const [viewCraneData, setViewCraneData] = useState(false);
    const [viewAdvocateData, setViewAdvocateData] = useState(false);
    const [viewWorkshopData, setViewWorkshopData] = useState(false);
    const [selectedId, setSelectedId] = useState({});
    console.log("VEndors1123456789", vendors[0])

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

    const handleUpdate = () => {
        setMainContent(true);
        setViewMechanicData(false);
        setViewCraneData(false);
        setViewAdvocateData(false);
        setViewWorkshopData(false);
    };

    return (
        <div>
            {mainContent && (
                <div>
                    <h3 style={{ fontSize: "15px", margin: "30px", fontWeight: "bold" }}>{categoryName} Vendors</h3>
                    <div>
                        <table className="vendor-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Vendor Name</th>
                                    <th>Assigned</th>
                                    <th>Vendor Type</th>
                                    <th>Vendor Email</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((vendor, index) => (
                                    <tr key={vendor.VendorCode}>
                                        <td>{index + 1}</td>
                                        <td>{vendor.vendorName}</td>
                                        <td>{vendor.assignedOn}</td>
                                        <td>{vendor.vendorType}</td>
                                        <td>{vendor.email}</td>
                                        <td>
                                            {vendor.vendorDecision == "accept" && (
                                                <>
                                                    {vendor.vendorType === "crane" && vendor.vendorDecision !== "reject" && vendor.acceptedByAdmin !== "reject" && (
                                                        <button className="action-btn" onClick={() => viewCrane([vendor])}>View</button>
                                                    )}
                                                    {vendor.vendorType === "mechanic" && vendor.vendorDecision !== "reject" && vendor.acceptedByAdmin !== "reject" && (
                                                        <button className="action-btn" onClick={() => viewMechanic([vendor])}>View</button>
                                                    )}
                                                    {vendor.vendorType === "advocate" && vendor.vendorDecision !== "reject" && vendor.acceptedByAdmin !== "reject" && (
                                                        <button className="action-btn" onClick={() => viewAdvocate([vendor])}>View</button>
                                                    )}
                                                    {vendor.vendorType === "workshop" && vendor.vendorDecision !== "reject" && vendor.acceptedByAdmin !== "reject" && (
                                                        <button className="action-btn" onClick={() => viewWorkshop([vendor])}>View</button>
                                                    )}
                                                </>)}

                                            {vendor.vendorDecision == "reject" && (
                                                <>
                                                    {vendor.rejectionReason
                                                        ? vendor.rejectionReason
                                                            .split(',')
                                                            .filter(reason => reason.trim() !== '') // Remove empty entries
                                                            .map((reason, index) => (
                                                                <div key={index}>{index + 1}. {reason.trim()}</div>
                                                            ))
                                                        : null}
                                                </>)}

                                            {vendor.acceptedByAdmin == "reject" && (
                                                <>
                                                    {vendor.reasonforRejection
                                                        ? vendor.reasonforRejection
                                                            .split(',')
                                                            .filter(reason => reason.trim() !== '') // Remove empty entries
                                                            .map((reason, index) => (
                                                                <div key={index}>{index + 1}. {reason.trim()}</div>
                                                            ))
                                                        : null}
                                                </>)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>)}

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


    const [formData, setFormData] = useState({
        vehicleNo: ""
    });

    const [acceptedOrNotActionedCrane, setAcceptedOrNotActionedCrane] = useState([]);
    const [acceptedOrNotActionedMechanic, setAcceptedOrNotActionedMechanic] = useState([]);
    const [acceptedOrNotActionedWorkshop, setAcceptedOrNotActionedWorkshop] = useState([]);
    const [acceptedOrNotActionedAdvocate, setAcceptedOrNotActionedAdvocate] = useState([]);

    const [acceptedOrNotActioned, setAcceptedOrNotActioned] = useState([]);


    useEffect(() => {
        setAcceptedOrNotActioned([
            ...acceptedOrNotActionedCrane,
            ...acceptedOrNotActionedMechanic,
            ...acceptedOrNotActionedWorkshop,
            ...acceptedOrNotActionedAdvocate,
        ]);
    }, [acceptedOrNotActionedCrane, acceptedOrNotActionedMechanic, acceptedOrNotActionedWorkshop, acceptedOrNotActionedAdvocate]);

    const [craneAdminRejected, setCraneAdminRejected] = useState([]);
    const [mechanicAdminRejected, setMechanicAdminRejected] = useState([]);
    const [workshopAdminRejected, setWorkshopAdminRejected] = useState([]);
    const [advocateAdminRejected, setAdvocateAdminRejected] = useState([]);

    const [dataRejected, setDataRejected] = useState([]);

    useEffect(() => {
        setDataRejected([
            ...craneAdminRejected,
            ...mechanicAdminRejected,
            ...workshopAdminRejected,
            ...advocateAdminRejected,
        ]);
    }, [craneAdminRejected, mechanicAdminRejected, workshopAdminRejected, advocateAdminRejected]);


    const [craneVendorRejected, setCraneVendorRejected] = useState([]);
    const [mechanicVendorRejected, setMechanicVendorRejected] = useState([]);
    const [workshopVendorRejected, setWorkshopVendorRejected] = useState([]);
    const [advocateVendorRejected, setAdvocateVendorRejected] = useState([]);

    const [vendorRejected, setVendorRejected] = useState([]);


    useEffect(() => {
        setVendorRejected([
            ...craneVendorRejected,
            ...mechanicVendorRejected,
            ...workshopVendorRejected,
            ...advocateVendorRejected,
        ]);
    }, [craneVendorRejected, mechanicVendorRejected, workshopVendorRejected, advocateVendorRejected]);


    console.log("vehicle.craneData", vehicle.craneData)
    console.log("acceptedOrNotActioned", acceptedOrNotActioned)
    console.log("dataRejected", dataRejected)
    console.log("vendorRejected", vendorRejected)


    console.log("DATAREJECTED first", dataRejected)


    useEffect(() => {


        const fetchVendorData = async () => {
            if (vehicle) {
                let vendors = [];
                if (vehicle.craneData.length > 0) {
                    vehicle.craneData.map((individualCraneData) => {
                        vendors.push(individualCraneData.VendorCode)
                    })
                }
                if (vehicle.mechanicData.length > 0) {
                    vehicle.mechanicData.map((individualmechanicData) => {
                        vendors.push(individualmechanicData.VendorCode)
                    })
                } if (vehicle.advocateData.length > 0) {
                    vehicle.advocateData.map((individualadvocateData) => {
                        vendors.push(individualadvocateData.VendorCode)
                    })
                }
                if (vehicle.workshopData.length > 0) {
                    vehicle.workshopData.map((individualworkshopData) => {
                        vendors.push(individualworkshopData.VendorCode)
                    })
                }
                console.log("VENDORSDFD", vendors)
                console.log("VEDORDSSSDD", uniqueVendors)

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




        if (vehicle.craneData.length !== 0) {
            console.log("vanva", vehicle.craneData)
            const result = someFunct(vehicle.craneData);
            const result2 = someFunct2(vehicle.craneData);
            const result3 = someFunct3(vehicle.craneData);
            setAcceptedOrNotActionedCrane(result);
            setCraneAdminRejected(result2)
            setCraneVendorRejected(result3)
        }
        if (vehicle.mechanicData.length !== 0) {
            const result = someFunct(vehicle.mechanicData);
            const result2 = someFunct2(vehicle.mechanicData);
            const result3 = someFunct3(vehicle.mechanicData);
            setAcceptedOrNotActionedMechanic(result);
            setMechanicAdminRejected(result2)
            setMechanicVendorRejected(result3)
        }
        if (vehicle.advocateData.length !== 0) {
            const result = someFunct(vehicle.advocateData);
            const result2 = someFunct2(vehicle.advocateData);
            const result3 = someFunct3(vehicle.advocateData);
            setAcceptedOrNotActionedWorkshop(result);
            setWorkshopAdminRejected(result2)
            setWorkshopVendorRejected(result3)
        }
        if (vehicle.workshopData.length !== 0) {
            const result = someFunct(vehicle.workshopData);
            const result2 = someFunct2(vehicle.workshopData);
            const result3 = someFunct3(vehicle.workshopData);
            setAcceptedOrNotActionedAdvocate(result);
            setAdvocateAdminRejected(result2)
            setAdvocateVendorRejected(result3)
        }
    }, [vehicle]);

    const someFunct = (data) => {
        return data.filter(item => {
            return (item.acceptedByAdmin !== 'reject' && item.vendorDecision !== 'reject')
        });
    };
    const someFunct2 = (data) => {
        return data.filter((item) => {
            return (item.acceptedByAdmin === 'reject')
        })
    };
    const someFunct3 = (data) => {
        return data.filter((item) => {
            return (item.vendorDecision === 'reject')
        })
    };

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);


    //------------------------------------------------------------------------
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

    //------------------------------------------------------------------------


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

    console.log("comigDatahere", comingVendorData)
    const uniqueVendors = comingVendorData.filter((vendor, index, self) =>
        index === self.findIndex((v) => v.vendorCode === vendor.vendorCode));




    console.log("uniqueVendorsstaff", uniqueVendors)
    console.log("datarejectedsatff", dataRejected)


    const [DataRejectedVendors, setDataRejectedVendors] = useState([]);
    const [craneDataRejected, setCraneDataRejected] = useState([]);
    console.log("cranedatarejected", craneDataRejected)
    const [advocateDataRejected, setAdvocateDataRejected] = useState([]);
    const [mechanicDataRejected, setMechanicDataRejected] = useState([]);
    const [workshopDataRejected, setWorkshopDataRejected] = useState([]);

    // uniqueVendors.map((item)=>[
    //     item.vendortype == crane => crane array Create => map on acceptedOrNotActionedCrane vendorCode === item.vendorCode if matched then create new array nameed notActionedORAcceptedCrane put object 
    //  =>  map on craneAdminRejected vendorCode === item.vendorCode if matched then create new array named adminRejectedCrane put this object
    //  =>  map on craneVendorRejected vendorCode === item.vendorCode if matched then create new array named craneItselfRejected put this object
    // ])
    /*
    uniqueVendors[
    { vendorCode : adfasfafdsad1
     crane:[
     notActionedORAcceptedCrane:[{data}]
     adminRejectedCrane:[{data}]
     craneItselfRejected:[{data}]
     ]
      advocate:[
     notActionedORAcceptedadvocate:[{data}]
     adminRejectedadvocate:[{data}]
     advocateItselfRejected:[{data}]
     ]
      mechanic:[
     notActionedORAcceptedmechanic:[{data}]
     adminRejectedmechanic:[{data}]
     mechanicItselfRejected:[{data}]
     ]
      workshop:[
     notActionedORAcceptedworkshop:[{data}]
     adminRejectedworkshop:[{data}]
     workshopItselfRejected:[{data}]
     ]
    }]
    
    */
    const [categorizedacceptedOrNotActioned, setCategorizedacceptedOrNotActioned] = useState([])
    const [categorizeddataRejected, setCategorizeddataRejected] = useState([])
    const [categorizedvendorRejected, setCategorizedvendorRejected] = useState([])

    console.log("categorizedacceptedOrNotActioned", categorizedacceptedOrNotActioned)
    console.log("setCategorizeddataRejected", categorizeddataRejected)
    console.log("categorizedvendorRejected", categorizedvendorRejected)



    useEffect(() => {
        const transformVendorData = (uniqueVendors, acceptedOrNotActioned, dataRejected, vendorRejected) => {
            // Initialize arrays to store the categorized data
            let allAcceptedOrNotActioned = [];
            let allDataRejected = [];
            let allVendorRejected = [];

            uniqueVendors.forEach((vendor) => {
                const { vendorCode } = vendor;

                const categories = {
                    acceptedOrNotActioned: acceptedOrNotActioned
                        .filter((item) => item.VendorCode === vendorCode)
                        .map((item) => ({
                            ...item,
                            vendorName: vendor.vendorName,
                            email: vendor.email,
                            vendorType: vendor.vendorType,
                        })),
                    dataRejected: dataRejected
                        .filter((item) => item.VendorCode === vendorCode)
                        .map((item) => ({
                            ...item,
                            vendorName: vendor.vendorName,
                            email: vendor.email,
                            vendorType: vendor.vendorType,
                        })),
                    vendorRejected: vendorRejected
                        .filter((item) => item.VendorCode === vendorCode)
                        .map((item) => ({
                            ...item,
                            vendorName: vendor.vendorName,
                            email: vendor.email,
                            vendorType: vendor.vendorType,
                        })),
                };

                // Collect all categorized data
                allAcceptedOrNotActioned.push(...categories.acceptedOrNotActioned);
                allDataRejected.push(...categories.dataRejected);
                allVendorRejected.push(...categories.vendorRejected);
            });

            return {
                allAcceptedOrNotActioned,
                allDataRejected,
                allVendorRejected,
            };
        };

        if (
            uniqueVendors.length > 0 &&
            (acceptedOrNotActioned.length > 0 || dataRejected.length > 0 || vendorRejected.length > 0)
        ) {
            const { allAcceptedOrNotActioned, allDataRejected, allVendorRejected } =
                transformVendorData(uniqueVendors, acceptedOrNotActioned, dataRejected, vendorRejected);

            // Update states only if the data has changed
            if (
                JSON.stringify(allAcceptedOrNotActioned) !==
                JSON.stringify(categorizedacceptedOrNotActioned)
            ) {
                setCategorizedacceptedOrNotActioned(allAcceptedOrNotActioned);
            }

            if (JSON.stringify(allDataRejected) !== JSON.stringify(categorizeddataRejected)) {
                setCategorizeddataRejected(allDataRejected);
            }

            if (JSON.stringify(allVendorRejected) !== JSON.stringify(categorizedvendorRejected)) {
                setCategorizedvendorRejected(allVendorRejected);
            }
        }
    }, [
        uniqueVendors,
        acceptedOrNotActioned,
        dataRejected,
        vendorRejected,
        categorizedacceptedOrNotActioned,
        categorizeddataRejected,
        categorizedvendorRejected,
    ]);





    console.log("DATAREJECTEDVEDOERESS", DataRejectedVendors)
    // useEffect(() => {
    //     const uniquehere = (uniqueVendors) => {
    //         if (Array.isArray(DataRejected) && Array.isArray(uniqueVendors)) {
    //             const matchedVendors = DataRejected
    //                 .filter(item => item?.VendorCode) // Ensure VendorCode exists
    //                 .map(item => {
    //                     const matchedVendor = uniqueVendors.find(vendor => vendor.vendorCode === item.VendorCode);
    //                     return matchedVendor ? { ...matchedVendor, ...item } : null;
    //                 })
    //                 .filter(item => item !== null); // Filter out null values
    //                 console.log("matchedVendors123", matchedVendors)
    //             // Remove duplicates based on VendorCode
    //             const uniqueMatchedVendors = matchedVendors.reduce((acc, current) => {
    //                 const x = acc.find(item => item.vendorCode === current.vendorCode);
    //                 return x ? acc : acc.concat([current]);
    //             }, []);
    //             console.log("uniqueMatchedVendors123", uniqueMatchedVendors)
    //             console.log("DataRejectedVendors", DataRejectedVendors)



    //             // Only update states if uniqueMatchedVendors has changed
    //             // if (JSON.stringify(uniqueMatchedVendors) !== JSON.stringify(DataRejectedVendors)) {
    //                 setDataRejectedVendors(uniqueMatchedVendors);

    //                 const newCraneDataRejected = [];
    //                 const newAdvocateDataRejected = [];
    //                 const newMechanicDataRejected = [];
    //                 const newWorkshopDataRejected = [];

    //                 // Populate arrays for each vendor type
    //                 uniqueMatchedVendors.forEach(vendor => {
    //                     switch (vendor.vendorType) {
    //                         case 'crane':
    //                             newCraneDataRejected.push(vendor);
    //                             break;
    //                         case 'advocate':
    //                             newAdvocateDataRejected.push(vendor);
    //                             break;
    //                         case 'mechanic':
    //                             newMechanicDataRejected.push(vendor);
    //                             break;
    //                         case 'workshop':
    //                             newWorkshopDataRejected.push(vendor);
    //                             break;
    //                         default:
    //                             break;
    //                     }
    //                 });

    //                 setCraneDataRejected(newCraneDataRejected);
    //                 setAdvocateDataRejected(newAdvocateDataRejected);
    //                 setMechanicDataRejected(newMechanicDataRejected);
    //                 setWorkshopDataRejected(newWorkshopDataRejected);
    //             // }
    //         }
    //     };

    //     if (uniqueVendors.length !== 0 && DataRejected.length !== 0) {
    //         uniquehere(uniqueVendors);
    //     }
    // }, [DataRejected, uniqueVendors, DataRejectedVendors]);


    const [selected, setSelected] = useState("accepted")

    console.log("cut kela phone", acceptedOrNotActionedCrane.length, vehicle.craneData.length)
    return (
        <div>
            {mainContent && uniqueVendors.length > 0 && (
                <div className="Customer-master-form" style={{ paddingLeft: '10px', paddingRight: "10px", paddingTop: "40px", paddingBottom: "40px", marginLeft: "5px" }}>
                    <Helmet>
                        <title>Actual Vendor Response - Claimpro</title>
                        <meta name="description" content="Actual Vendor Response" />
                        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                        <link rel='canonical' href={`https://claimpro.in/ActualVendorResponse`} />
                    </Helmet>


                    <div style={{ marginTop: "50px" }}>
                        <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                            <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack}></Button>
                            <h3 className="bigtitle">Vendor Response Overview (Assigned Only)</h3>
                        </div>
                        <div>
                            {categorizedacceptedOrNotActioned.length > 0 ? (
                                <VendorTable
                                    vendors={categorizedacceptedOrNotActioned}
                                    categoryName="Accepted or Not Actioned"
                                />
                            ) : (
                                <p className="no-data-message">No data available for Accepted or Not Actioned</p>
                            )}

                            {categorizeddataRejected.length > 0 ? (
                                <VendorTable
                                    vendors={categorizeddataRejected}
                                    categoryName="Admin Rejected"
                                />
                            ) : (
                                <p className="no-data-message">No data available for Admin Rejected</p>
                            )}

                            {categorizedvendorRejected.length > 0 ? (
                                <VendorTable
                                    vendors={categorizedvendorRejected}
                                    categoryName="Vendor Rejected"
                                />
                            ) : (
                                <p className="no-data-message">No data available for Vendor Rejected</p>
                            )}
                        </div>

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
