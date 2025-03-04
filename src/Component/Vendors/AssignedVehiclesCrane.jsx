// import React, { useState, useEffect } from 'react';
// import '../CustomerApporoved/CustomerApproved.css';
// import '../AccidentVehicle/AccidentVehicle.css'
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { tokenState, userIdState } from '../Auth/Atoms';
// // '../../environment';
// import { Helmet } from 'react-helmet-async';
// import AddedDataByCrane from './AddedDataByCrane';
// import DataTable from "react-data-table-component";




// const AssignedVehicleCrane = () => {

//   const [data, setData] = useState([]);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [GetDataOfUser, setGetDataOfUser] = useState([]);
//   const [showPopup, setShowPopup] = useState(true);
//   const [width, setWidth] = useState('100%');
//   const [marginLeft, setMarginLeft] = useState('10px');
//   const [paddingLeft, setPaddingLeft] = useState('30px');

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const [showAddedDataByVendor, setShowAddedDataByVendor] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const [selectedRows, setSelectedRows] = useState([]);

//   const handleRowsSelected = (state) => {
//     setSelectedRows(state.selectedRows);
//   }

//   const conditionalRowStyles = [
//     {
//       when: (row) => selectedRows.some(selected => selected.id === row.id),
//       style: {
//         backgroundColor: '#bdb6b6',
//       },
//     }
//   ];

//   const tableCustomStyles = {
//     headRow: {
//       style: {
//         color: '#ffff',
//         backgroundColor: 'rgb(169 187 169)',
//         fontWeight: "bold",
//         fontSize: '13px'
//       },
//     },
//     pagination: {
//       style: {
//         button: {
//           background: 'none',
//           boxShadow: "none"
//         },
//       },
//     },
//     striped: {
//       style: {
//         default: 'red'
//       }
//     },
//     rows: {
//       style: {
//         backgroundColor: '#f2f2f2',
//       }
//     }
//   }




//   const columns = [
//     {
//       name: "Sr. No.",
//       selector: (row, index) => index + 1,// Calculate the row index
//       sortable: true,
//       width: "100px"
//     },
//     {
//       name: "Assigned On",
//       selector: (row) => row.craneAssignedOn,
//       sortable: true,
//       width: "180px"
//     },
//     {
//       name: "First Response",
//       selector: (row) => row.details.length > 0 && row.details[0].firstResponseOn
//         ? row.details[0].firstResponseOn : "",
//       sortable: true,
//       width: "180px"
//     },
//     {
//       name: "Accident File No",
//       selector: (row) => row.accidentFileNo,
//       sortable: true,
//       width: "200px"
//     },
//     // {
//     //   name: "Accident Vehicle Code",
//     //   selector: (row) => row.AccidentVehicleCode,
//     //   sortable: true,
//     //   width: "180px"
//     // },

//     {
//       name: "Assigned By",
//       selector: (row) => row.assignedBy,
//       sortable: true,
//       width: "130px"
//     },
//     {
//       name: "Accept By Admin",
//       selector: (row) => row.details.length > 0 && row.details[0].acceptedByAdmin
//         ? row.details[0].acceptedByAdmin ? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase() : ""
//         : "Pending",
//       cell: (row) => (
//         <span style={{
//           color: row.details.length > 0 && row.details[0].acceptedByAdmin
//             ? (row.details[0].acceptedByAdmin === "reject" ? 'red' : 'darkblue')
//             : 'darkorange'
//         }}>
//           {row.details.length > 0 && row.details[0].firstResponseOn != null
//             ? row.details[0].acceptedByAdmin ? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase() : "pending"
//             : "Not requested yet"}
//         </span>
//       ),
//       width: "150px"
//     },
//     {
//       name: "View Doc",
//       selector: (row) => row.AccidentVehicleCode,
//       cell: (row) => (
//         <button
//           onClick={() => view(row.AccidentVehicleCode, row)}
//           className="view-button"
//           disabled={row.details.length > 0 && row.details[0].acceptedByAdmin === "reject"}
//           style={{
//             backgroundColor: row.details.length > 0 && row.details[0].acceptedByAdmin === "reject" ? '#d3d3d3' : '#007bff',
//             color: 'white',
//             padding: '10px 30px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: row.details.length > 0 && row.details[0].acceptedByAdmin === "reject" ? 'not-allowed' : 'pointer'
//           }}
//         >
//           Upload Data
//         </button>
//       ),
//       width: "200px"
//     }
//   ];

//   useEffect(() => {
//     console.log("token", token, userId);
//     if (token === "" || userId === "") {
//       navigate("/");
//     }
//     findUserById(userId)

//   }, [token, userId, navigate]);


//   useEffect(() => {
//     console.log("getUSERDATA", GetDataOfUser)
//     if (GetDataOfUser && GetDataOfUser.vendorCode) {
//       fetchAssignedCases(GetDataOfUser.vendorCode);
//     }
//   }, [GetDataOfUser]);

//   const fetchAssignedCases = async (vendorCode) => {
//     console.log("randomId", GetDataOfUser.randomId);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/assignedTasksCrane/${vendorCode}`);
//       console.log("accident vehicle table", response.data.data);
//       setData(response.data.data);
//       setCurrentItems(response.data.data)
//     } catch (error) {
//       console.error("Failed to fetch assigned cases:", error);
//     }
//   };

//   const findUserById = async (id) => {
//     console.log("HEY", id)
//     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}}/api/findByIdForVendor/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
//     console.log("findByIdForVendor", response.data)
//     console.log("findByIdForVendor", response.data.data[0]);
//     setGetDataOfUser(response.data.data[0])
//   }

//   const [formData, setFormData] = useState({
//     VehicleNo: "",
//     accidentFileNo: "",
//     lossType: "",
//     serviceType: "",
//     vendorName: "",
//     dateRange: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'pincode' || name === 'vendorPhone' || name === "contactPersonNum" || name === "contactPersonNum2") {
//       const re = /^[0-9\b]+$/;
//       if (value === '' || re.test(value)) {
//         if ((name === 'pincode' && value.length <= 6) || (name === 'vendorPhone' && value.length <= 10) || (name === 'contactPersonNum' && value.length <= 10) || (name === 'contactPersonNum2' && value.length <= 10)) {
//           setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//           }));
//         }
//       }
//     }

//     else {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }
//   };

//   function view(id, item) {
//     setSelectedId(id);
//     setSelectedItem(item);
//     setShowAddedDataByVendor(true);
//   }

//   const handleUpdate = () => {
//     fetchAssignedCases(GetDataOfUser.vendorCode);
//     setShowAddedDataByVendor(false); // Hide VendorMasterEdit
//   };

//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleSelect = (event, value) => {
//     event.preventDefault(); // Prevent default link behavior
//     setFormData({
//       ...formData,
//       vendorType: value
//     });
//     setShowDropdown(false); // Close dropdown after selection
//   };
//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 630) {
//         setWidth('65%');
//         setMarginLeft('0px');
//         setPaddingLeft('20px');
//       } else {
//         setWidth('100%');
//         setMarginLeft('0px');
//         setPaddingLeft("40px");
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);


//   return (

//     <div>
//       {!showAddedDataByVendor && (
//         <div>
//           <Helmet>
//             <title>Assigned Vehicles to Crane Manager - Claimpro</title>
//             <meta name="description" content="View and manage vehicles assigned to Crane Manager for service. Track accident file numbers, vehicle codes, and more." />
//             <meta name="keywords" content="Assigned Vehicles, Crane Manager, Vehicle Service, Accident File, Vehicle Management, Claimpro" />
//             <link rel='canonical' href={`https://claimpro.in/AssignedVehicleCrane`} />
//           </Helmet>

//           <div style={{ position: 'relative' }}>
//             {GetDataOfUser.isActive === "false" && showPopup && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 background: 'lightgrey',
//                 width: 'fit-content',
//                 padding: '10px',
//                 borderRadius: '10px',
//                 boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
//               }}>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   style={{
//                     position: 'absolute',
//                     top: '5px',
//                     right: '5px',
//                     background: 'transparent',
//                     border: 'none',
//                     fontSize: '16px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   &times;
//                 </button>
//                 <h3 style={{ margin: '0 20px 0 0' }}>You Are Not Currently Active To Take The Appoinments</h3>
//               </div>
//             )}
//           </div>


//           <div className="container mt-4">

//             <div className="d-flex flex-column flex-lg-row">
//               {/* <form className='Customer-master-form flex-fill mt-4 mb-4 p-3' style={{ background: "#c4c4ff3d", minWidth: '250px', maxWidth:"300px", maxHeight:"400px", overflowY:'scroll' }}>
//                 <div className="bigtitle" style={{textDecoration:"underline"}}>Filters</div>
//                 <div className="form-row">
//                   <div className="form-group col-12 col-md-6 mb-3">
//                     <label htmlFor="vehicleNo">Vehicle No:</label>
//                     <input type="text" id="vehicleNo" name="VehicleNo" placeholder='Vehicle No' className="form-control" value={formData.VehicleNo} onChange={handleChange} required />
//                   </div>
//                   <div className="form-group col-12 col-md-6 mb-3">
//                     <label htmlFor="accidentFileNo">Accident File No:</label>
//                     <input type="text" id="accidentFileNo" name="accidentFileNo" placeholder='Accident File No' className="form-control" value={formData.accidentFileNo} onChange={handleChange} required />
//                   </div>
//                   <div className="form-group col-12 col-md-6 mb-3">
//                     <label htmlFor="lossType">Loss Type:</label>
//                     <input type="text" id="lossType" name="lossType" placeholder='Loss Type' className="form-control" value={formData.lossType} onChange={handleChange} required />
//                   </div>
//                   <div className="form-group col-12 col-md-6 mb-3">
//                     <label htmlFor="serviceType">Service Type:</label>
//                     <input type="text" id="serviceType" name="serviceType" placeholder='Service Type' className="form-control" value={formData.serviceType} onChange={handleChange} required />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group col-12 mb-3">
//                     <label>Select Option:</label>
//                     <div className="dropdown">
//                       <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleDropdown} style={{ color: 'black' }}>
//                         {formData.vendorType || "Select Vendor Type"}
//                       </button>
//                       <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
//                         <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advocate")}>Advocate</a></li>
//                         <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crane")}>Crane</a></li>
//                         <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "mechanic")}>Mechanic</a></li>
//                         <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="form-group col-12 col-md-6 mb-3">
//                     <label htmlFor="fromDate">From Date:</label>
//                     <input type="date" id="fromDate" name="fromDate" value={formData.fromDate} onChange={handleChange} readOnly className="form-control" />
//                   </div>

//                   <div className="form-group col-12 col-md-6 mb-3">
//                     <label htmlFor="toDate">To Date:</label>
//                     <input type="date" id="toDate" name="toDate" value={formData.toDate} onChange={handleChange} readOnly className="form-control" />
//                   </div>
//                 </div>
//               </form> */}

//               <div className="flex-fill mt-4 justify-content-center" style={{ maxWidth: '100%', overflowX: 'auto' }}>
//               <div className="header-container mb-3">
//                   <h3 className="bigtitle">Assigned Vehicles To Crane Manager</h3>
//                 </div>
//                 <DataTable
//                   columns={columns}
//                   data={currentItems}
//                   fixedHeader
//                   pagination
//                   selectableRows
//                   onSelectedRowsChange={handleRowsSelected}
//                   conditionalRowStyles={conditionalRowStyles}
//                   customStyles={tableCustomStyles}
//                 />
//               </div>
//             </div>
//           </div>


//         </div>
//       )}

//       {showAddedDataByVendor && (
//         <AddedDataByCrane id={selectedId} item={selectedItem} onUpdate={handleUpdate} />
//       )}
//     </div>
//   );

// };

// export default AssignedVehicleCrane;






import React, { useState, useEffect } from 'react';
import '../CustomerApporoved/CustomerApproved.css';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
// '../../environment';
import { Helmet } from 'react-helmet-async';
import AddedDataByCrane from './AddedDataByCrane';
import DataTable from "react-data-table-component";




const AssignedVehicleCrane = ({ getFilterInfo }) => {

  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  console.log("GETFILTEDDATA", getFilterInfo)
  useEffect(() => {
    if (currentItems.length != 0 && getFilterInfo !== "all") {
      if (getFilterInfo == "Pending Vehicles") {
        setCurrentItems([])
        let filteredItems = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].details.length === 0 || data[i].details[0].acceptedByAdmin === null) {
            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)

      }
      else if (getFilterInfo == "Accepted Vehicles") {
        setCurrentItems([])
        let filteredItems = []

        for (let i = 0; i < data.length; i++) {
          if (data[i].details[0].acceptedByAdmin === "accept") {

            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)

      }
      else if (getFilterInfo == "Working Vehicles") {
        setCurrentItems([])
        let filteredItems = []

        for (let i = 0; i < data.length; i++) {
          if (data[i].details[0].acceptedByAdmin === "accept") {

            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)

      }
      else if (getFilterInfo == "Rejected Vehicles") {
        let filteredItems = []
        setCurrentItems([])
        for (let i = 0; i < data.length; i++) {
          if (data[i].details[0].acceptedByAdmin === "reject") {
            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)
      }
      else if (getFilterInfo == "Response given") {
        let filteredItems = []
        setCurrentItems([])
        for (let i = 0; i < data.length; i++) {
          if (data[i].details[0].firstResponseOn !== null) {
            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)
      }
      else if (getFilterInfo == "Completed Cases") {
        let filteredItems = []
        setCurrentItems([])

        for (let i = 0; i < data.length; i++) {
          if (data[i].details[0].acceptedByAdmin === "reject")
            filteredItems.push(data[i])

          let caseIsFullyClosed = true;
          const caseFields = data[i];

          for (let key in caseFields) {
            if (key == "cheque" || key == "onlinePaymentImg" || key == "paidByCash") continue;
            if (caseFields[key] === null || caseFields[key] === "") {
              caseIsFullyClosed = false;
              break;
            }
          }
          if (caseIsFullyClosed && (data[i].cheque != null || data[i].onlinePaymentImg != null || data[i].paidByCash != null)) {
            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)
      }
      else if (getFilterInfo == "Non Started Cases") {
        let filteredItems = []
        setCurrentItems([])
        for (let i = 0; i < data.length; i++) {
          if (data[i].details[0].firstResponseOn == null) {
            filteredItems.push(data[i])
          }
        }
        setCurrentItems(filteredItems)
      }


      else if (getFilterInfo == "getAll") {
        setCurrentItems(data)
      }
    }
  }, [getFilterInfo, data])

  const [GetDataOfUser, setGetDataOfUser] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [maxWidth, setMaxWidth] = useState('100%');
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
        backgroundColor: 'rgb(98 98 98)',
        fontWeight: "bold",
        fontSize: '11px',
        borderRadius: "20px 20px 0px 0px"

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
        fontSize: "10px",

      }
    }
  }




  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,// Calculate the row index
      sortable: true,
      width: "80px"
    },
    {
      name: "Vehicle No",
      selector: (row) => row.reg ? row.reg.toUpperCase():"",
      sortable: true,
      width: "150px"
    },

    {
      name: "Assigned On",
      selector: (row) => row.craneAssignedOn.includes("|") ? (row.craneAssignedOn.split("|")[0]) : row.craneAssignedOn,
      sortable: true,
      width: "100px"
    },
    {
      name: "First Resp",
      selector: (row) => row.details.length > 0 && row.details[0].firstResponseOn
        ? row.details[0].firstResponseOn.includes("|") ? row.details[0].firstResponseOn.split("|")[0] : row.details[0].firstResponseOn : "",
      sortable: true,
      width: "100px"
    },

    {
      name: "Vendor Decision",
      selector: (row) => row.details.length > 0 && row.details[0].vendorDecision
        ? row.details[0].vendorDecision ? row.details[0].vendorDecision.charAt(0).toUpperCase() + row.details[0].vendorDecision.slice(1).toLowerCase() : ""
        : "Pending",
      cell: (row) => (
        <span style={{
          color: row.details.length > 0 && row.details[0].vendorDecision
            ? (row.details[0].vendorDecision === "reject" ? 'red' : 'darkblue')
            : 'darkorange'
        }}>
          {row.details.length > 0 && row.details[0].firstResponseOn != null
            ? row.details[0].vendorDecision ? row.details[0].vendorDecision.charAt(0).toUpperCase() + row.details[0].vendorDecision.slice(1).toLowerCase() : "pending"
            : "Not requested"}
        </span>
      ),
      width: "100px"
    },

    {
      name: "Accepted",
      selector: (row) => row.details.length > 0 && row.details[0].acceptedByAdmin
        ? row.details[0].acceptedByAdmin ? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase() : ""
        : "Pending",
      cell: (row) => (
        <span style={{
          color: row.details.length > 0 && row.details[0].acceptedByAdmin
            ? (row.details[0].acceptedByAdmin === "reject" ? 'red' : 'darkblue')
            : 'darkorange'
        }}>
          {row.details.length > 0 && row.details[0].firstResponseOn != null
            ? row.details[0].acceptedByAdmin ? row.details[0].acceptedByAdmin.charAt(0).toUpperCase() + row.details[0].acceptedByAdmin.slice(1).toLowerCase() : "pending"
            : "Not requested"}
        </span>
      ),
      width: "100px"
    },
    {
      name: "View Doc",
      selector: (row) => row.AccidentVehicleCode,
      cell: (row) => {
        const isButtonVisible =
          row.details.length > 0 &&
          row.details[0].acceptedByAdmin !== "reject" &&
          row.details[0].vendorDecision !== "reject" &&
          (row.details[0]?.approvedReaching);
  
        return isButtonVisible ? (
          <button
            onClick={() => view(row.AccidentVehicleCode, row)}
            className="view-button"
            disabled={
              row.details.length > 0 &&
              (row.details[0].acceptedByAdmin === "reject" ||
                row.details[0].vendorDecision === "reject")
            }
            style={{
              backgroundColor:
                row.details.length > 0 &&
                (row.details[0].acceptedByAdmin === "reject" ||
                  row.details[0].vendorDecision === "reject")
                  ? "rgb(45 45 45 / 61%)"
                  : "rgb(216 220 224)",
              color:
                row.details.length > 0 &&
                (row.details[0].acceptedByAdmin === "reject" ||
                  row.details[0].vendorDecision === "reject")
                  ? "white"
                  : "black",
              padding: "10px 10px",
              border: "none",
              borderRadius: "4px",
              fontSize: "9px",
              marginTop: "0px",
              cursor:
                row.details.length > 0 &&
                (row.details[0].acceptedByAdmin === "reject" ||
                  row.details[0].vendorDecision === "reject")
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Upload Data
          </button>
        ) : null; // Return null if the button should not be displayed
      },
      width: "150px",
    },
    {
      name: "Rejection Reason",
      cell: (row) =>
        row.details.length > 0 &&
        row.details[0].acceptedByAdmin === "reject" &&
        row.details[0].reasonforRejection
          ? row.details[0].reasonforRejection
          : "",
      width: "200px",
    }
    
  ];


  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
    findUserById(userId)

  }, [token, userId, navigate]);


  useEffect(() => {
    console.log("getUSERDATA", GetDataOfUser)
    if (GetDataOfUser && GetDataOfUser.vendorCode) {
      fetchAssignedCases(GetDataOfUser.vendorCode);
    }
  }, [GetDataOfUser]);

  const fetchAssignedCases = async (vendorCode) => {
    console.log("randomId", GetDataOfUser.randomId);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/assignedTasks/${vendorCode}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
      console.log("accident vehicle table", response.data.data);
      setData(response.data.data);
      setCurrentItems(response.data.data)
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };

  const findUserById = async (id) => {
    console.log("HEY", id)
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}}/api/findByIdForVendor/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
    console.log("findByIdForVendor", response.data)
    console.log("findByIdForVendor", response.data.data[0]);
    setGetDataOfUser(response.data.data[0])
  }

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
    setShowAddedDataByVendor(true);
  }
  const navigation = (selectedId, selectedItem) => {
    console.log("Hey id:", selectedId, "item:", selectedItem);
    navigate('/AddedDataByCrane', { state: { id: selectedId, item: selectedItem } });
  };
  
  useEffect(() => {
    if (showAddedDataByVendor && selectedId != null) {
      console.log("Hey1111 id:", selectedId, "item:", selectedItem);
      navigation(selectedId, selectedItem); // Now navigation is defined above this
    }
  }, [showAddedDataByVendor, selectedId, selectedItem]); // Ensure navigation is called only when these values change
  


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
      if (window.innerWidth >= 1030) {
        setMaxWidth('70%');

      } else {
        setMaxWidth('100%');

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
            <title>Assigned Vehicles to Crane Manager - Claimpro</title>
            <meta name="description" content="View and manage vehicles assigned to Crane Manager for service. Track accident file numbers, vehicle codes, and more." />
            <meta name="keywords" content="Assigned Vehicles, Crane Manager, Vehicle Service, Accident File, Vehicle Management, Claimpro" />
            <link rel='canonical' href={`https://claimpro.in/AssignedVehicleCrane`} />
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


          <div className="container mt-4" style={{ paddingLeft: "0px" }}>

            <div className="d-flex flex-column flex-lg-row">
              {/* <form className='Customer-master-form flex-fill mt-4 mb-4 p-3' style={{ background: "#c4c4ff3d", minWidth: '250px', maxWidth:"300px", maxHeight:"400px", overflowY:'scroll' }}>
                <div className="bigtitle" style={{textDecoration:"underline"}}>Filters</div>
                <div className="form-row">
                  <div className="form-group col-12 col-md-6 mb-3">
                    <label htmlFor="vehicleNo">Vehicle No:</label>
                    <input type="text" id="vehicleNo" name="VehicleNo" placeholder='Vehicle No' className="form-control" value={formData.VehicleNo} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-12 col-md-6 mb-3">
                    <label htmlFor="accidentFileNo">Accident File No:</label>
                    <input type="text" id="accidentFileNo" name="accidentFileNo" placeholder='Accident File No' className="form-control" value={formData.accidentFileNo} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-12 col-md-6 mb-3">
                    <label htmlFor="lossType">Loss Type:</label>
                    <input type="text" id="lossType" name="lossType" placeholder='Loss Type' className="form-control" value={formData.lossType} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-12 col-md-6 mb-3">
                    <label htmlFor="serviceType">Service Type:</label>
                    <input type="text" id="serviceType" name="serviceType" placeholder='Service Type' className="form-control" value={formData.serviceType} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-12 mb-3">
                    <label>Select Option:</label>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleDropdown} style={{ color: 'black' }}>
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

                  <div className="form-group col-12 col-md-6 mb-3">
                    <label htmlFor="fromDate">From Date:</label>
                    <input type="date" id="fromDate" name="fromDate" value={formData.fromDate} onChange={handleChange} readOnly className="form-control" />
                  </div>

                  <div className="form-group col-12 col-md-6 mb-3">
                    <label htmlFor="toDate">To Date:</label>
                    <input type="date" id="toDate" name="toDate" value={formData.toDate} onChange={handleChange} readOnly className="form-control" />
                  </div>
                </div>
              </form> */}

              <div className="flex-fill justify-content-center" style={{ maxWidth, overflowX: 'auto' }}>
                <div className="header-container mb-3">
                  <h3 style={{ fontSize: "12px", margin: "10px 0px 0px 20px" }} className="bigtitle">Assigned Vehicles For {getFilterInfo !== 'getAll' ? getFilterInfo.charAt(0).toUpperCase() + getFilterInfo.slice(1) : "All"} </h3>
                </div>
                <DataTable
                  columns={columns}
                  data={currentItems}
                  fixedHeader
                  pagination
                  paginationRowsPerPageOptions={[5, 10,15, 20]}
                  selectableRows
                  onSelectedRowsChange={handleRowsSelected}
                  conditionalRowStyles={conditionalRowStyles}
                  customStyles={tableCustomStyles}
                />
              </div>
            </div>
          </div>


        </div>
      )}

      {/* {showAddedDataByVendor && (
        <AddedDataByCrane id={selectedId} item={selectedItem} onUpdate={handleUpdate} />
      )} */}
    </div>
  );

};

export default AssignedVehicleCrane;
