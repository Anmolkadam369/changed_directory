import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import '../CustomerMaster/CustomerMaster.css'
import SeeUpdatedPics from '../SeeUpdatedPics/SeeUpdatedPics'
import EditAccidentVehicle from '../EditAccidentVehicle/EditAccidentVehicle';
import CustomerViewDetails from '../CustomerMaster/CustomerViewDetails';
import DataTable from "react-data-table-component";



const AccidentVehicleUser = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [showUpdatedPics, setShowUpdatedPics] = useState(false)
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [showTable, setShowTable] = useState(true)

  const [selectedId, setSelectedId] = useState({});
  const [selectedAccidentCode, setselectedAccidentCode] = useState({});

  const [width, setWidth] = useState('100%');
  useEffect(() => {
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);


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

  function view(id) {
    console.log("myId", id)
    setSelectedId(id);
    setShowTable(false);
    setShowFullDetails(false)
    setShowUpdatedPics(true)
  }
  function viewDetails(id) {
    setselectedAccidentCode(id);
    setShowTable(false);
    setShowUpdatedPics(false)
    setShowFullDetails(true)
  }


  const handleUpdate = () => {
    setShowUpdatedPics(false);
    setShowFullDetails(false)
    setShowTable(true);
    getData();
  };

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

  const getData = async (e) => {
    console.log("userid", userId);
    const response = await axios.get(`${backendUrl}/api/getPersonalAccidentVehicleInfoById/${userId}`);
    if (response.data.message == "No accident vehicle data found.") setData([])
    else {
      console.log("response123421", response.data.data);
      console.log("data2", response.data.data2);
      setData(response.data.data)
      setCurrentItems(response.data.data);
    }
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

  console.log("dddddddddddddddddddd", data.data)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setWidth('90%');
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

  const [currentItems, setCurrentItems] = useState(data);
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
  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Accident File No",
      selector: (row) => row.accidentFileNo,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Chassis Number",
      selector: (row) => row.chassisNo,
      sortable: true,
    },
    {
      name: "View Details",
      cell: (row) => (
        <button
          onClick={() => viewDetails(row.AccidentVehicleCode)}
          className="view-button"
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "See Updated Pics",
      cell: (row) => (
        <button
          onClick={() => view(row.accidentFileNo)}
          className="view-button"
        >
          Updated Pics
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const tableCustomStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
      },
    },
  };



  return (
    <div>
      {showTable && (<div>
        <Helmet>
          <title>Register Accident Vehicle Information - Claimpro</title>
          <meta name="description" content="Register Accident Vehicle Information for BVC ClaimPro Assist." />
          <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
          <link rel='canonical' href={`https://claimpro.in/AccidentVehicleUser`} />
        </Helmet>
        <form className='Customer-master-form' style={{ width, marginLeft: "0px", padding: "20px" }}>
          <div className="header-container">
            <h3 className="bigtitle">My Vehicles Cases</h3>
          </div>
          <div className="form-row">

            <label className="form-field input-group mb-3">
              Vehicle No:
              <input
                type="text"
                name="VehicleNo"
                placeholder='Vehicle No'
                // class="form-label"
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
                // class="form-label"
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
                // class="form-label"
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
                // class="form-label"
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
        {/* <div className='responsive-table' style={{ width }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Accident File No</th>
                <th>Model</th>
                <th>Chassis Number</th>
                <th>View Details</th>
                <th>See Updated Pics</th>

              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No data is there...</td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.accidentFileNo}</td>
                    <td>{item.model}</td>
                    <td>{item.chassisNo}</td>
                    <td>
                      <button onClick={() => viewDetails(item.AccidentVehicleCode)} className="view-button">View</button>
                    </td>
                    <td>
                      <button onClick={() => view(item.accidentFileNo)} className="view-button">Updated Pics</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div> */}

<div className="container d-flex justify-content-center" style={{ marginTop: "10px" }}>
      <div className="container my-5">
        <DataTable
          columns={columns}
          data={currentItems}
          fixedHeader
          pagination
          selectableRows
          conditionalRowStyles={conditionalRowStyles}
          onSelectedRowsChange={handleRowsSelected}
          customStyles={tableCustomStyles}
        />
      </div>
    </div>

      </div>)}

      {showUpdatedPics && (
        <SeeUpdatedPics id={selectedId} onUpdate={handleUpdate} />
      )}
      {showFullDetails && (
        <CustomerViewDetails id={selectedAccidentCode} onUpdate={handleUpdate} />
      )}


    </div>
  );

};

export default AccidentVehicleUser;
