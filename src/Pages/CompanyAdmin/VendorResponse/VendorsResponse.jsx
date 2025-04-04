import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import '../CustomersDetails/CustomerMaster/CustomerMaster.css';
import  '../../../Component/CompanyAdmin/Location2/Location2.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ActualVendorResponse from './ActualVendorResponse';
import DataTable from "react-data-table-component";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import Admin from '../AdminHome/SideBar/Admin';

const formatDate = (isoDateString) => {
  if (!isoDateString) return "___"; // Handle null or undefined input
  const date = new Date(isoDateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return ""; // Return empty string for invalid date

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
};

const VendorResponse = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState('100%');

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [showActualVendorResponse, setShowActualVendorResponse] = useState(false)
  const [selectedId, setSelectedId] = useState({});
  console.log("selectedId", selectedId)



  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
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

  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#ffff',
        backgroundColor: 'rgb(169 187 169)',
        fontWeight: "bold",
        fontSize: '13px'
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
      style: {
        default: 'red'
      }
    },
    rows: {
      style: {
        backgroundColor: '#f2f2f2',
      }
    }
  }


  useEffect(() => {
    if (!showActualVendorResponse) getData();
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showActualVendorResponse]);

  const getData = async () => {
    try {
      const response = await axios ({
        method : "GET",
        url : `${process.env.REACT_APP_BACKEND_URL}/api/vendorResponse/${userId}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("console dataMydata", response.data)
      const fetchedData = response.data.data;
      // const formattedData = fetchedData.map(item => ({
      //   ...item,
      //   systemDate: item.systemDate ? formatDate(item.systemDate) : "___",
      // }));
      setData(fetchedData);
      setCurrentItems(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const view = (vehicle) => {
    console.log("VEHICLE HERE ME", vehicle)
    setSelectedId(vehicle);
    setShowActualVendorResponse(true)
  };
  const handleUpdate = () => {
    getData();
    setShowActualVendorResponse(false);
  };


  const isAnyPending = (vehicle) => {
    let arr = [];
    if (vehicle.mechanicData.length !== 0 ) {
      for(let i=0; i< vehicle.mechanicData.length; i++){
        if(vehicle.mechanicData[i].connectedVendorFully != true)
        arr.push(vehicle.mechanicData[0].connectedVendorFully === false ? "pending" : vehicle.mechanicData[0].connectedVendorFully)
      }
    }
    if (vehicle.recoveryVanData.length !== 0 ) {
      for(let i=0; i< vehicle.recoveryVanData.length; i++){
        if(vehicle.recoveryVanData[i].connectedVendorFully != true)
        arr.push(vehicle.recoveryVanData[0].connectedVendorFully === false ? "pending" : vehicle.recoveryVanData[0].connectedVendorFully)
      }
    }
    if (vehicle.craneData.length !== 0 ) {
      for(let i=0; i< vehicle.craneData.length; i++){
        if(vehicle.craneData[i].connectedVendorFully != true)
        arr.push(vehicle.craneData[0].connectedVendorFully === false ? "pending" : vehicle.craneData[0].connectedVendorFully)
      }
    }
    if (vehicle.advocateData.length !== 0 ) {
      for(let i=0; i< vehicle.advocateData.length; i++){
        if(vehicle.advocateData[i].connectedVendorFully != true)
        arr.push(vehicle.advocateData[0].connectedVendorFully === false ? "pending" : vehicle.advocateData[0].connectedVendorFully)
      }
    }
    if (vehicle.workshopData.length !== 0 ) {
      for(let i=0; i< vehicle.workshopData.length; i++){
        if(vehicle.workshopData[i].connectedVendorFully != true)
        arr.push(vehicle.workshopData[0].connectedVendorFully === false ? "pending" : vehicle.workshopData[0].connectedVendorFully)
      }
    }

    console.log("arrary", arr)
    let count = 0;
    console.log("count123", count)

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "pending") count++;
    }
    return count;
  }

  const [currentItems, setCurrentItems] = useState(data);

  const filteredItems = currentItems.filter(vehicle =>
    (vehicle.mechanicData && vehicle.mechanicData.length !== 0) ||
    (vehicle.craneData && vehicle.craneData.length !== 0) ||
    (vehicle.advocate && vehicle.advocate.length !== 0) ||
    (vehicle.workshop && vehicle.workshop.length !== 0) ||
    (vehicle.recoveryVan && vehicle.recoveryVan.length !== 0)

  );

  const columns = [

    {
      name: "Assigned On",
      selector: (row) => row.systemDate,
      sortable: true, width: "150px",
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.systemDate);
        const dateB = parseDate(rowB.systemDate);
        return dateA - dateB; // Ascending order
      },
      cell: (row) => row.systemDate ? formatDate(row.systemDate) : "___",
    },
    {
      name: "Selected Services", selector: (row) => row.selectedOptions, sortable: true,width:"200px",
      cell: (row) => (
        <span style={{ color: 'blue', padding: '5px 20px 5px 20px' }}>
          {row.selectedOptions
            ? row.selectedOptions
              .split(',')
              .map((option, index) => (
                <React.Fragment key={index}>
                  {index + 1}. {option.trim().charAt(0).toUpperCase() + option.trim().slice(1).toLowerCase()}
                  <br />
                </React.Fragment>
              ))
            : ""}
        </span>
      ),
    },
    {
      name: "Customer Name",
      selector: (row) => row.CustomerName,
      sortable: true, width: "200px",
      cell: (row) => row.CustomerName.charAt(0).toUpperCase() + row.CustomerName.slice(1),
    },

    {
      name: "Vehicle No",
      selector: (row) => row.vehicleNumber, 
      sortable: true, width:"150px",
      cell: (row) => (
        <span style={{ color: 'green' }}>
          {row.vehicleNumber || '---'}
        </span>
      ),
    },
    {
      name: "Choosen Plan",
      selector: (row) => row.choosenPlan,
      sortable: true, width: "150px",
      cell: (row) => (
        <span className='badge' style={{ fontSize: "13px", color: "#8e27f1", background: "yellow" }}>
          {row.choosenPlan.charAt(0).toUpperCase() + row.choosenPlan.slice(1) || '---'}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => view(row)}
          className='view-button'
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Pending", 
      width: "100px",
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const noOfCountsA = isAnyPending(rowA);
        const noOfCountsB = isAnyPending(rowB);
    
        if (noOfCountsA > 0 && noOfCountsB === 0) {
          return -1;
        } else if (noOfCountsA === 0 && noOfCountsB > 0) {
          return 1;
        } else {
          return 0;
        }
      },
      cell: (row) => {
        const noOfCounts = isAnyPending(row);
        return noOfCounts > 0 ? (
          <span className='popUp'>
            <PendingActionsIcon style={{ fontSize: '1.0rem', color: "red" }} />
            <p style={{ fontSize: '0.4rem', color: "red" }}> pending</p>
          </span>
        ) : (
          <span>
            <TaskIcon style={{ fontSize: '1.4rem', color: "blue" }} />
            <p style={{ fontSize: '0.6rem', color: "blue" }}> response</p>
          </span>
        );
      },
    },
  ];


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = data.filter((row) => {
      const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchValue);
      const customerNameValue = (row.CustomerName ?? '').toLowerCase().includes(searchValue);
      const vehicleNumberValue = (row.vehicleNumber ?? '').toLowerCase().includes(searchValue);
      const selectedOptionsValue = (row.selectedOptions ?? '').toLowerCase().includes(searchValue);
      const choosenPlanValue = (row.choosenPlan ?? '').toLowerCase().includes(searchValue);
      return dateValue || customerNameValue || vehicleNumberValue || selectedOptionsValue || choosenPlanValue;
    });
    setCurrentItems(newRows);
  };

  return (
    <div>
      <Admin/>
      {!showActualVendorResponse && (
        <div className="Customer-master-form" style={{  marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
          <Helmet>
            <title>Vendor Response Overview - Claimpro</title>
            <meta name="description" content="View and manage vendor responses for vehicle accidents. Keep track of customer names, vehicle numbers, and actions taken." />
            <meta name="keywords" content="Vehicle Accidents, Customer Service, Claimpro, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            <link rel='canonical' href={`https://claimpro.in/vendorResponse`} />
          </Helmet>

          <div style={{ marginTop: "50px" }}>
            <h3 className="bigtitle">Vendor Response Overview</h3>
            <div className="form-search">
              <label className='label-class'>
                Search by
                <input
                  type="text"
                  placeholder="Search by"
                  onChange={handleSearch}
                  required
                />
              </label>

              <label className='label-class'></label>
            </div>

            <div className="container d-flex justify-content-center " style={{ marginTop: "10px" }}>
              <div className="container-for-tables my-5">
                <DataTable
                  columns={columns}
                  data={filteredItems} // Use the filtered data
                  fixedHeader
                  pagination
                  selectableRows
                  onSelectedRowsChange={handleRowsSelected}
                  customStyles={tableCustomStyles}
                  conditionalRowStyles={conditionalRowStyles}
                />
              </div>
            </div>
          </div>
        </div>)}
      {showActualVendorResponse && selectedId != {} && (
        <ActualVendorResponse vehicle={selectedId} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default VendorResponse;
