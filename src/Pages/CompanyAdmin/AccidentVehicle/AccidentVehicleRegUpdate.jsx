
import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import '../../../Component/CompanyAdmin/Location2/Location2.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import DataTable from "react-data-table-component";
import Admin from '../AdminHome/SideBar/Admin';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();VendorResponse
  return `${day}-${month}-${year}`;
};

const AccidentVehicleRegUpdate = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
  const [width, setWidth] = useState('100%');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAccidentReg, setShowAccidentReg] = useState(false)
  const [showAccidentTable, setShowAccidentTable] = useState(true)
  const [showChooseOptions, setShowChooseOptions] = useState(false)
  const [allOptionToShow, setAllOptionToShow] = useState([])
  const allOptions = ['advocate', 'workshop', 'onsite temperory repair', 'crane'];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowsSelected = (state) => {
    setSelectedRows(state.selectedRows);
  }

  const conditionalRowStyles = [
    {
      when: (row) => selectedRows.some(selected => selected.accidentFileNo === row.accidentFileNo),
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
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  const [formData, setFormData] = useState({
    vehicleNo: ""
  });



  useEffect(() => {
    if (selectedItem != null) {
      const getOptionsToShow = () => {
        console.log('selectedItem', selectedItem)
        switch (selectedItem.choosenPlan) {
          case 'advanced':
            return allOptions;  // Show all options
          case 'plus':
            return allOptions.filter(option => option !== 'advocate');  // Remove 'advocate'
          case 'pro':
            return allOptions.filter(option => option !== 'advocate' && option !== 'onsite temperory repair' && option !== 'crane');  // Remove 'advocate', 'onsite repair', 'crane'
          default:
            return allOptions;
        }
      };
      const options = getOptionsToShow();

      if (JSON.stringify(options) !== JSON.stringify(allOptionToShow)) {
        setAllOptionToShow(options);
      }
    }
  }, [selectedItem, allOptions, allOptionToShow]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
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

  const getData = async (e) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAccidentVehicleInfo/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
    console.log("response", response);
    if (response && response.message !== "No accident vehicle data found.") setData(response.data.data)
    const fetchedData = response.data.data;

    const formattedData = fetchedData.map(item => ({
      ...item,
      systemDate: formatDate(item.systemDate),
    }));
    setData(formattedData);
    setCurrentItems(formattedData);
  };

  function view(id) {
    console.log("myId", id)
    setSelectedId(id);
    setShowAccidentReg(true)
    setShowChooseOptions(false)
    setShowAccidentTable(false)
    navigate('/vehicle-claim-registration', {state:{id}})

  }

  function chooseOptions(item) {
    setSelectedItem(item);
    setShowAccidentReg(false)
    setShowChooseOptions(true)
    setShowAccidentTable(false)
  }
  const handleUpdate = () => {
    getData();
    setShowAccidentReg(false);
    setShowChooseOptions(false);
    setShowAccidentTable(true)
  };


  const validateForm = () => {
    if (selectedOptions.length === 0) {
      return ` Atleast One Option Need to Choose.`
    }
  }

  const sendSelectedOptions = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true);
      const validationMessage = validateForm();
      if (validationMessage) {
        setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
        setIsLoading(false);
        return;
      }
      console.log("selectedOption", selectedOptions)
      const response = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/updateSelectedOptions/${selectedItem.AccidentVehicleCode}/${userId}`,
        data: selectedOptions,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("response", response.data);
      setIsLoading(false);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
      setTimeout(() => {
        handleUpdate()
      }, 2000);
    } catch (error) {
      console.error('Error response:', error.response);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      if (errorMessage === "jwt expired") {
        setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
      }
    }
  }

  const [currentItems, setCurrentItems] = useState(data);
  const columns = [
    {
      name: "Name", selector: (row) => row.CustomerName, sortable: true,
      cell: (row) => (
        <span style={{ color: 'brown' }}>{row.CustomerName.charAt(0).toUpperCase() + row.CustomerName.slice(1)}</span>
      )
    },
    {
      name: "Accident File No", selector: (row) => row.accidentFileNo, sortable: true,
      cell: (row) => (
        <span style={{
          color: 'darkblue', padding: '5px', width:"150px", borderRadius: '4px', border: "4px solid darkgrey"
        }}>
          {row.accidentFileNo ? row.accidentFileNo.toUpperCase() : ""}
        </span>
      ),
    },
    {
      name: "Choosen Plan", selector: (row) => row.choosenPlan, sortable: true,
      cell: (row) => (
        <span style={{ color: '#fff', backgroundColor: '#ffc107', padding: '5px 20px 5px 20px', borderRadius: '4px' }}>
          {row.choosenPlan ? row.choosenPlan.charAt(0).toUpperCase() + row.choosenPlan.slice(1).toLowerCase() : ""}
        </span>
      ),
    },

    {
      name: "Selected Options", selector: (row) => row.selectedOptions, sortable: true,
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
      name: "Add Services",
      cell: (row) => (
        <button
          onClick={() => chooseOptions(row)}
          className='view-button'
        >
          Edit Choosen Services
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "View",
      cell: (row) => (
        <button
          onClick={() => view(row.accidentFileNo)}
          className='view-button'
          style={{ background: 'rgb(190 98 98)', color: "white" }}
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
      const customerNameValue = (row.CustomerName ?? '').toLowerCase().includes(searchValue);
      const accidentFileNoValue = (row.accidentFileNo ?? '').toLowerCase().includes(searchValue);
      const choosenPlanValue = (row.choosenPlan ?? '').toLowerCase().includes(searchValue);
      const selectedOptionsValue = (row.selectedOptions ?? '').toLowerCase().includes(searchValue);

      return customerNameValue || accidentFileNoValue || choosenPlanValue || selectedOptionsValue;
    });

    setCurrentItems(newRows);
  };


  return (

    <div>
      <Admin/>
      {showAccidentTable && (
        <div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
          <Helmet>
            <title>Accident Vehicle Information Register Update - Claimpro</title>
            <meta name="description" content="Accident Vehicle Information Register Update Claimpro Assist" />
            <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            <link rel='canonical' href={`https://claimpro.in/AccidentVehicleRegUpdate`} />
          </Helmet>
          <h3 className='bigtitle'>Create Register (New Accident Vehicle)</h3>
          <div className="form-search">
            <label className='label-class'>
              Search by
              <input
                type="text"
                placeholder="Search by "
                onChange={handleSearch}
                required
              />
            </label>
            <label className="label-class"></label>
            <label className="label-class"></label>


          </div>
          <div className="container d-flex justify-content-center " style={{ marginTop: "10px" }}>
            <div className="container-for-tables my-5">
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
      {/* {showAccidentReg && (
        <VehicleClaimRegistration id={selectedId} onUpdate={handleUpdate} />
      )} */}
      {showChooseOptions && (
        <div className="photo-upload-container">
          <div style={{ display: "flex", marginRight: '60px', marginBottom: '10px' }}>
            <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleUpdate} />

            <div >
              <h2 className='bigtitle'>Customer Didn't Choose The Vendor<br /></h2>
              <h6 className='bigtitle' style={{ fontSize: "15px", marginLeft: "90px" }}>Please Choose On Behalf Of Customer</h6>
            </div>
          </div>
          <div style={{
            padding: '20px',
            // backgroundColor: 'rgb(233 223 223)',
            borderRadius: '8px',
            boxShadow: 'rgba(0, 0, 0, 0.1) 11px 0px 4px'
          }}>

            <div style={{ position: 'relative', color: '#333', marginBottom: '15px' }}>
              <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "green" }}>Select Your Services</h3>
              {allOptionToShow.map((option, index) => (
                <label key={index} style={{
                  display: 'block',
                  marginBottom: '10px',
                  marginTop: "20px",
                  fontSize: '16px',
                  color: '#666'
                }}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px', marginLeft: "10px", color: "lightblue" }}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                </label>
              ))}
              <div style={{ textAlign: 'center', marginTop: "40px" }}>
                <button
                  style={{
                    fontSize: "14px",
                    padding: "5px 20px",
                    border: "3px solid lightblue",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "green",
                  }}
                  disabled={isLoading} // Disable button while loading
                  onClick={sendSelectedOptions}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                {isLoading && (
                  <div style={{ marginTop: '10px' }}>
                    <ClipLoader color="#4CAF50" loading={isLoading} />
                    <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {alertInfo.message}
            </Alert>
          )}
        </div>
      )}
    </div>
  );

};

export default AccidentVehicleRegUpdate;
