import React, { useState, useEffect } from 'react';
import '../CustomerApporoved/CustomerApproved.css';
import '../AccidentVehicle/AccidentVehicle.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { selector, useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import UploadDocAdvocate from './UploadDocAdvocate';
import DataTable from "react-data-table-component";

const AssignedVehicleAdvocate = () => {
  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState(data);
  const [GetDataOfUser, setGetDataOfUser] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [width, setWidth] = useState('100%');
  const [marginLeft, setMarginLeft] = useState('10px');
  const [paddingLeft, setPaddingLeft] = useState('30px');

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [showAddedDataByVendor, setShowAddedDataByVendor] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowsSelected = (state) => {
    setSelectedRows(state.selectedRows);
  }

  const conditionalRowStyles = [
    {
      when: (row) => selectedRows.some(selected => selected.id === row.id),
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
    if (token === "" || userId === "") {
      navigate("/");
    }
    findUserById(userId);
  }, [token, userId, navigate]);

  useEffect(() => {
    if (GetDataOfUser.length !== 0 && GetDataOfUser.vendorCode) {
      fetchAssignedCases(GetDataOfUser.vendorCode);
    }
  }, [GetDataOfUser]);

  const fetchAssignedCases = async (vendorCode) => {
    try {
      const response = await axios.get(`${backendUrl}/api/assignedCasesAdvocate/${vendorCode}`);
      console.log("DATA RESPONESSSS", response.data.data)
      setData(response.data.data);
      setCurrentItems(response.data.data);
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };

  const findUserById = async (id) => {
    const response = await axios.get(`${backendUrl}/api/findByIdForVendor/${id}`);
    setGetDataOfUser(response.data.data[0]);
  };

  const [formData, setFormData] = useState({
    VehicleNo: "",
    accidentFileNo: "",
    lossType: "",
    serviceType: "",
    vendorName: "",
    dateRange: ""
  });

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
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const columns = [
    {
      name: "Sr. No.",
      selector :(row, index)=>index+1,// Calculate the row index
      sortable: true,
      width: "100px"
    },
    {
      name : "Assigned On",
      selector: (row)=>row.advocateAssignedOn,
      sortable:true,
      width:"180px"
    },
    {
      name : "First Response",
      selector:(row) => row.details.length > 0 && row.details[0].firstResponseOn
      ? row.details[0].firstResponseOn:"",
      sortable:true,
      width:"180px"
    },
    {
      name: "Accident File No",
      selector: (row) => row.accidentFileNo,
      sortable: true,
      width: "200px"
    },
    // {
    //   name: "Accident Vehicle Code",
    //   selector: (row) => row.AccidentVehicleCode,
    //   sortable: true,
    //   width: "180px"
    // },

    {
      name: "Assigned By",
      selector: (row) => row.assignedBy,
      sortable: true,
      width: "130px"
    },
    {
      name: "Accept By Admin",
      selector: (row) => row.details.length > 0 && row.details[0].acceptedByAdmin
        ? row.details[0].acceptedByAdmin? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase():""
        : "Pending",
      cell: (row) => (
        <span style={{
          color: row.details.length > 0 && row.details[0].acceptedByAdmin
            ? (row.details[0].acceptedByAdmin === "reject" ? 'red' : 'darkblue')
            : 'darkorange'
        }}>
          {row.details.length > 0 && row.details[0].acceptedByAdmin
            ? row.details[0].acceptedByAdmin? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase():""
            : "Pending"}
        </span>
      ),
      width: "150px"
    },
    {
      name: "View Doc",
      selector: (row) => row.AccidentVehicleCode,
      cell: (row) => (
        <button
          onClick={() => view(row.AccidentVehicleCode, row)}
          className="view-button"
          disabled={row.details.length > 0 && row.details[0].acceptedByAdmin === "reject"}
          style={{
            backgroundColor: row.details.length > 0 && row.details[0].acceptedByAdmin === "reject" ? '#d3d3d3' : '#007bff',
            color: 'white',
            padding: '10px 30px',
            border: 'none',
            borderRadius: '4px',
            cursor: row.details.length > 0 && row.details[0].acceptedByAdmin === "reject" ? 'not-allowed' : 'pointer'
          }}
        >
          Upload Data
        </button>
      ),
      width: "200px"
    }
  ];





  function view(id, item) {
    setSelectedId(id);
    setSelectedItem(item);
    setShowAddedDataByVendor(true);
  }

  const handleUpdate = () => {
    fetchAssignedCases(GetDataOfUser.vendorCode);
    setShowAddedDataByVendor(false); // Hide VendorMasterEdit
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelect = (event, value) => {
    event.preventDefault(); // Prevent default link behavior
    setFormData({
      ...formData,
      vendorType: value
    });
    setShowDropdown(false); // Close dropdown after selection
  };
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setWidth('50%');
        setMarginLeft('0px');
        setPaddingLeft('20px');
      } else {
        setWidth('100%');
        setMarginLeft('0px');
        setPaddingLeft("40px");
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {!showAddedDataByVendor && (
        <div>
          <Helmet>
            <title>Assigned Vehicles to Advocate - Claimpro</title>
            <meta name="description" content="View and manage vehicles assigned to advocates for repair and service. Track accident file numbers, vehicle codes, and more." />
            <meta name="keywords" content="Assigned Vehicles, Advocate, Vehicle Repair, Accident File, Vehicle Management, Claimpro" />
            <link rel='canonical' href={`https://claimpro.in/AssignedVehicleAdvocate`} />
          </Helmet>

          <div style={{ position: 'relative' }}>
            {GetDataOfUser?.isActive === "false" && showPopup && (
              <div style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                background: 'lightgrey',
                width: 'fit-content',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000 // Ensure it stays above other elements
              }}>
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  &times;
                </button>
                <h3 style={{ margin: '0 20px 0 0' }}>You Are Not Currently Active To Take The Appoinments</h3>
              </div>
            )}
          </div>

          <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }} >
            <div className="header-container">
              <h3 className="bigtitle">Assigned Vehicles To Advocate</h3>
            </div>
            <div className="form-row">
              <label className="form-field input-group mb-3">
                Vehicle No:
                <input
                  type="text"
                  name="VehicleNo"
                  placeholder='Vehicle No'
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
                  className="form-field input-group mb-3"
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
        </div>
      )}


      {showAddedDataByVendor &&
        (
          <UploadDocAdvocate id={selectedId} item={selectedItem} onUpdate={handleUpdate} />
        )}

    </div>
  );
};

export default AssignedVehicleAdvocate;
