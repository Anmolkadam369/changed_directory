import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import AddedDataByWorkshop from './AddedDataByWorkshop';
import DataTable from "react-data-table-component";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const AssignedVehicleWorkshop = () => {

  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState(data);

  console.log("DATAforAdvocate", data)
  const [GetDataOfUser, setGetDataOfUser] = useState([]);
  const [vendorPersonal, setVendorPersonal] = useState([]);
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
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    findUserById(userId)

  }, [token, userId, navigate]);


  useEffect(() => {
    if (GetDataOfUser && GetDataOfUser.vendorCode) {
      fetchAssignedCases(GetDataOfUser.vendorCode);
      fetchVendor(GetDataOfUser.vendorCode)
    }
  }, [GetDataOfUser]); // Only re-run the effect if GetDataOfUser changes

  const fetchAssignedCases = async (vendorCode) => {
    try {
      const response = await axios.get(`${backendUrl}/api/assignedTasksWorkshop/${vendorCode}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
      console.log("accident vehicle table", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };


  const fetchVendor = async (vendorCode) => {
    try {
      const response = await axios.get(`${backendUrl}/api/getVendor/${vendorCode}`);
      console.log("response", response.data.data);
      setVendorPersonal(response.data.data);
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };

  const findUserById = async (id) => {
    try {
      console.log("HEY", id)
      const response = await axios.get(`${backendUrl}}/api/findByIdForVendor/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
      console.log("daa", response.data)
      console.log("data", response.data.data[0]);
      setGetDataOfUser(response.data.data[0])
    }
    catch (error) {
      console.log(error.message)
    }
  }
  console.log("GETUSER", GetDataOfUser)

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
    }

    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  function view(id, item) {
    setSelectedId(id);
    setSelectedItem(item);
    setShowAddedDataByVendor(true)
    console.log("ITEMHERE", item)
  }

  function addImage(id, accidendFileNo) {
    console.log("myId", id)
    navigate("../DailyWorkshop", { state: { id, accidendFileNo } });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
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
        setPaddingLeft('20px')
      } else {
        setWidth('100%');
        setMarginLeft('0px');
        setPaddingLeft("40px")
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleUpdate = () => {
    fetchAssignedCases(GetDataOfUser.vendorCode);
    setShowAddedDataByVendor(false); // Hide VendorMasterEdit
  };

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
    },
    {
      name: "Assigned On",
      selector: (row) => row.workshopAssignedOn,
      sortable: true,
      width: "180px"
    },
    {
      name: "First Response",
      selector: (row) => row.details.length > 0 && row.details[0].firstResponseOn
        ? row.details[0].firstResponseOn : "",
      sortable: true,
      width: "180px"
    },
    {
      name: "Accident File No",
      selector: (row) => row.accidentFileNo,
      sortable: true,
      width: "150px",
    },
    {
      name: "Assigned By",
      selector: (row) => row.assignedBy,
      sortable: true,
      width: "150px",
    },
    {
      name: "Accept By Admin",
      selector: (row) => row.details.length > 0 && row.details[0].acceptedByAdmin
        ? row.details[0].acceptedByAdmin ? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase() : ""
        : "Pending",
      cell: (row) => (
        <span style={{
          color: row.details.length > 0 && row.details[0].acceptedByAdmin
            ? (row.details[0].acceptedByAdmin === "reject" ? 'red' : 'darkblue')
            : 'darkorange'
        }}>
          {row.details.length > 0 && row.details[0].acceptedByAdmin
            ? row.details[0].acceptedByAdmin ? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase() : ""
            : "Pending"}
        </span>
      ),
      width: "150px",
      sortable: true
    },
    {
      name: "View Doc",
      cell: (row) => (
        <button
          onClick={() => view(row.AccidentVehicleCode, row)}
          className="view-button"
          disabled={row.details[0]?.acceptedByAdmin === "reject"}
          style={{
            backgroundColor: row.details[0]?.acceptedByAdmin === "reject" ? "#d3d3d3" : undefined,
            color: "white",
            padding: "10px 30px",
            border: "none",
            borderRadius: "4px",
            cursor: row.details[0]?.acceptedByAdmin === "reject" ? "not-allowed" : "pointer",
          }}
        >
          Upload Data
        </button>
      ),
      width: "200px",
      center: true,
    },
    {
      name: "Upload Daily Image",
      cell: (row) => (
        <button
          onClick={() => addImage(row.AccidentVehicleCode, row.accidentFileNo)}
          className="view-button"
          disabled={row.details[0]?.acceptedByAdmin === "reject"}
          style={{
            backgroundColor: row.details[0]?.acceptedByAdmin === "reject" ? "#d3d3d3" : undefined,
            color: "white",
            padding: "10px 30px",
            border: "none",
            borderRadius: "4px",
            cursor: row.details[0]?.acceptedByAdmin === "reject" ? "not-allowed" : "pointer",
          }}
        >
          Images
        </button>
      ),
      width: "200px",
      center: true,
    }
  ];
  const [addFilter, setAddFilter] = useState(false)



  return (
    <div>
      {!showAddedDataByVendor && (
        <div>
          <Helmet>
            <title>Assigned Vehicles To Workshop - Claimpro</title>
            <meta name="description" content="We are Assigning Vehicles To Workshop." />
            <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            <link rel='canonical' href={`https://claimpro.in/AssignedVehicleWorkshop`} />
          </Helmet>
          <div style={{ position: 'relative' }}>
            {GetDataOfUser.isActive === "false" && showPopup && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'lightgrey',
                width: 'fit-content',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
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

          <div style={{ display: 'flex', justifyContent: "flex-end" }}>

            <button type="button" className="btn btn-dark" onClick={() => setAddFilter(true)}>  <FilterAltOffIcon /> filter</button>
          </div>

          {addFilter && (
            <div className="modal fade show" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style={{ display: "block", boxShadow: "none",background: "transparent"
          }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <form className='Customer-master-form' style={{ marginBottom: "40px", background: "#c4c4ff3d", marginLeft: "0px", marginRight: "0px", }}>
                      <div className="header-container" style={{display:'flex', justifyContent:'flex-end'}}>
                        <h3 className="bigtitle">Assigned Vehicles To Workshop</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setAddFilter(false)} // Close modal
                      aria-label="Close"
                      style={{ background: "transperant", border: 'none' }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                      </div>
                      <div className="form-row">
                        <label className="form-field input-group mb-3">
                          Vehicle No:
                          <input
                            type="text"
                            name="VehicleNo"
                            placeholder='Vehicle No'
                            // className="form-label"
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
                            // className="form-label"
                            value={formData.accidentFileNo}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </label>
                      </div>

                      <div className="form-row">
                        <label className="form-field input-group mb-3">
                          Loss Type:
                          <input
                            type="text"
                            name="lossType"
                            placeholder='Loss Type'
                            // className="form-label"
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
                            // className="form-label"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </label>
                      </div>

                      <div className="form-row">
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
                      </div>


                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setAddFilter(false)} // Close modal
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal backdrop for styling */}
          {addFilter && <div className="modal-backdrop fade show"></div>}


          <div className="container d-flex justify-content-center " style={{ marginTop: "10px" }}>
            <div className="container my-5">
              <DataTable
                columns={columns}
                data={data}
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

      {showAddedDataByVendor && (
        <AddedDataByWorkshop id={selectedId} item={selectedItem} onUpdate={handleUpdate} />
      )}
    </div>
  );

};

export default AssignedVehicleWorkshop;
