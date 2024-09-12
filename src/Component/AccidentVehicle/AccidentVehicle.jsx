import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import EditAccidentVehicle from "../EditAccidentVehicle/EditAccidentVehicle"
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DataTable from "react-data-table-component";


const formatDate =(isoDateString)=>{
  const date = new Date(isoDateString);
const day = String(date.getUTCDate()).padStart(2, '0');
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getUTCFullYear();
return (`${day}-${month}-${year}`);
}

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
};


const AccidentVehicle = () => {
  const [data, setData] = useState([]);
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
  const [width, setWidth] = useState('100%');
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [showEditAccidentVehicle, setShowEditAccidentVehicle] = useState(false)
  const [selectedId, setSelectedId] = useState(null);



  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowsSelected = (state) => {
    setSelectedRows(state.selectedRows);
  }

  const conditionalRowStyles = [
    {
      when: (row) => selectedRows.some(selected => selected.CustomerCode === row.CustomerCode),
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
        fontWeight : "bold",
        fontSize : '13px'
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

  useEffect(() => {
    if (!showEditAccidentVehicle) getData("partiallyAssigned");
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showEditAccidentVehicle]);

  const getData = async (getFilteredData) => {
    const response = await axios.get(`${backendUrl}/api/getVehicleToAssignVendor/${getFilteredData}`);
    const fetchedData = response.data.data;
    const formattedData = fetchedData.map(item => ({
      ...item,
      systemDate: formatDate(item.systemDate),
    }));
    setData(formattedData);
    setCurrentItems(formattedData);
  };

  const handleClick = (item) => {
    setSelectedItem(item);
    getData(item);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const view = (id) => {
    setSelectedId(id);
    setShowEditAccidentVehicle(true)
    // navigate("../EditAccidentVehicle", { state: { id } });
  };

  const handleUpdate = () => {
    setShowEditAccidentVehicle(false); // Hide VendorMasterEdit
  };

  const [currentItems, setCurrentItems] = useState(data);
  const columns = [
    {
      name: "Date",
      selector: (row) => row.systemDate,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.systemDate);
        const dateB = parseDate(rowB.systemDate);
        return dateA - dateB; // Ascending order
      },
    },
    { name: "Customer Name", selector: (row) => row.CustomerName, sortable: true ,width:"150px",
      cell: (row) => (
        <span style={{color:'blue'}}>{row.CustomerName.charAt(0).toUpperCase() + row.CustomerName.slice(1)}</span>
      )
    },
    { name: "Accident File No", selector: (row) => row.accidentFileNo, sortable: true ,width:"200px",
      cell: (row) => (
        <span style={{color:'brown'}}>{row.accidentFileNo.charAt(0).toUpperCase() + row.accidentFileNo.slice(1)}</span>
      )
    },
    { name: "Vehicle No", selector: (row) => row.vehicleNo, sortable: true ,
      cell: (row) => (
        <span style={{color: '#fff', backgroundColor: 'lightblue', padding: '5px', borderRadius: '4px'}}>
            {/* {row.vehicleNo ? row.vehicleNo.charAt(0).toUpperCase() + row.vehicleNo.slice(1).toLowerCase() : ""} */}
            {row.vehicleNo ? row.vehicleNo.toUpperCase() : ""}

        </span>
    ),},
    { name: "Selected Services", selector: (row) => row.selectedOptions, sortable: true, width : "300px",
      cell: (row) => (
<span style={{color: 'blue', padding: '5px 20px 5px 20px'}}>
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
      name: "Choosen Plan",
      selector: (row) => row.choosenPlan || '',
      sortable: true,
      cell: (row) => {
        const choosenPlan = row.choosenPlan ? String(row.choosenPlan) : "";
        return (
          <span style={{ color: "green" }}>
            {choosenPlan.charAt(0).toUpperCase() + choosenPlan.slice(1).toLowerCase()}
          </span>
        );
      },
    },
    
    { name: "Actions",
      cell: (row) => (
        <button
          onClick={() => view(row.AccidentVehicleCode)}
          className='view-button'
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
  
    const newRows = data.filter((row) => {
      const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchValue);
      const customerNameValue = (row.CustomerName ?? '').toLowerCase().includes(searchValue);
      const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(searchValue);
      const selectedOptionsValue = (row.selectedOptions ?? '').toLowerCase().includes(searchValue);
      const choosenPlanValue = (row.choosenPlan ?? '').toLowerCase().includes(searchValue);
  
      return dateValue || customerNameValue || vehicleNoValue || selectedOptionsValue || choosenPlanValue ;
    });
  
    setCurrentItems(newRows);
  };

  return (
    <div>
      {!showEditAccidentVehicle && (<div className="Customer-master-form" style={{  marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
        <Helmet>
          <title>Accident Vehicle Service - Claimpro</title>
          <meta name="description" content="Accident Vehicle Service." />
          <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist, Accidental repair, Motor Insurance claim, Advocate services, Crane service, On site repair, Accident Management" />
          <link rel='canonical' href={`https://claimpro.in/AccidentVehicle`} />
        </Helmet>
        <h3 className="bigtitle">Assign Vendor to Accident Vehicle</h3>
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
        <div style={{ display: "flex", margin: "10px" }}>
          <p  className={`topdivs ${selectedItem === "fullyAssigned" ? "selected" : ""}`}  onClick={() => handleClick("fullyAssigned")}>Fully Assigned </p>
          <p  className={`topdivs ${selectedItem === "partiallyAssigned" ? "selected" : ""}`} onClick={() => handleClick("partiallyAssigned")}  >Partially Assigned </p>
          <p  className={`topdivs ${selectedItem === "NotAssigned" ? "selected" : ""}`}  onClick={() => handleClick("NotAssigned")}>Not Assigned </p>
        
        </div>
        <div className="container d-flex justify-content-center " style={{marginTop:"10px"}}>
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

      </div>)}
      {showEditAccidentVehicle && (
        <EditAccidentVehicle id={selectedId} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default AccidentVehicle;
