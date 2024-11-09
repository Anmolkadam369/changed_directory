import React, { useState, useEffect } from 'react';
import "../CustomerApporoved/CustomerApproved.css";
import '../AccidentVehicle/AccidentVehicle.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import ActivationModel from '../Visitors/ActivationModel';
import { Helmet } from 'react-helmet-async';
import VendorMasterEdit from '../VenderMaster/VendorMasterEdit';
import VendorPerformance from '../AAAAAAAAAAAAAAAAAA/VendorPerformnce';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DataTable from "react-data-table-component";
import SurveyorMasterEdit from './SurveyorMasterEdit.jsx'
import VendorByMap from '../VendorApproved/VendorByMap.js'
import SurveyorByMap from './SurveyorByMap.jsx';

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



const SurveyorApproved = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info', timestamp: null });
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const getDepartment = localStorage.getItem("department");
  console.log("getDepartment", getDepartment)

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');

  const [showVendorMasterEdit, setShowVendorMasterEdit] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showVendorTable, setShowVendorTable] = useState(true);
  const [showMap, setShowMap] = useState(false);


  const [selectedId, setSelectedId] = useState(null);
  const [selectedVendorCode, setSelectedVendorCode] = useState(null);
  const [selectedVendorType, setSelectedVendorType] = useState(null);

  const [sortDate, setSortDate] = useState("asc");
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


  console.log("selectedID", selectedId)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState('');

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
    if (!showVendorMasterEdit) getData();
    if (token === "" || userId === "") {
      console.log("NO USER ID AND NO TOKEN")
    }
  }, [token, userId, navigate, showVendorMasterEdit]);

  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const generateFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/vendorDBToExcel/${userId}`);
      setGeneratedExcel(response.data.data);
      console.log("resoponse", response.data.data)
      setIsLoading(false);
      setIsGenerated(true);
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  const handleConfirm = async (vendorCode, isActive) => {
    await deactive(vendorCode, isActive);
    setModalOpen(false);
  };

  const handleConfirmDelete = async (vendorCode) => {
    await deleteVendor(vendorCode);
    setModalOpen(false);
  }

  const handleCancel = () => {
    setModalOpen(false);
  };

  const openModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setDeleteData(item);
    setModalOpen(true);
  }

  const deactive = async (id, isActivate) => {
    const response = await axios({
      method: 'PUT',
      url: `${backendUrl}/api/changeActivation/${userId}/${id}/${isActivate}`,
      headers: {
        'Authorization': token
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
  };

  const deleteVendor = async (id) => {
    const response = await axios({
      method: 'DELETE',
      url: `${backendUrl}/api/deleteVendor/${userId}/${id}`,
      headers: {
        'Authorization': token
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
  };



  const getData = async () => {
    const response = await axios.get(`${backendUrl}/api/getSurveyor`);
    const fetchedData = response.data.data;

    const formattedData = fetchedData.map(item => ({
      ...item,
      systemDate: formatDate(item.systemDate),
    }));
    setData(formattedData);
    setCurrentItems(formattedData);
  };



  const view = (id) => {
    setSelectedId(id);
    setShowVendorMasterEdit(true)
    setShowPerformance(false)
    setShowVendorTable(false)
    setShowMap(false);

  }
  const handleMap = () => {
    setShowVendorMasterEdit(false)
    setShowPerformance(false)
    setShowVendorTable(false);
    setShowMap(true);
  }

  const viewPerformance = (id, type) => {
    setSelectedVendorCode(id);
    setSelectedVendorType(type);

    console.log("DSFSDFFSDF")
    setShowPerformance(true)
    setShowVendorMasterEdit(false)
    setShowVendorTable(false)
    setShowMap(false);

  }


  const handleUpdate = () => {
    setShowVendorMasterEdit(false);
    setShowPerformance(false)
    setShowVendorTable(true)
    setShowMap(false);

  };




  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 630) {
  //       setMarginLeft('0px');
  //       setPaddingLeft('20px')
  //     } else {
  //       setMarginLeft('30px');
  //       setPaddingLeft("40px")
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);

  //   // Initial check
  //   handleResize();

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const [currentItems, setCurrentItems] = useState(data);

  const columns = [
    {
      name: "ID",
      selector: row => row.id, // Raw data for sorting
      cell: row => <span>{String(row.id).padStart(4, '0')}</span>, // Display formatted value
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.id - rowB.id, // Custom sort function
      style: { width: "200px" }
    },


    {
      name: "Date",
      selector: (row) => row.systemDate,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.systemDate);
        const dateB = parseDate(rowB.systemDate);
        return dateA - dateB;
      },
    },
    {
      name: "Full Name", selector: (row) => row.fullName, sortable: true, width: "150px",
      cell: (row) => (
        <span style={{ color: 'brown' }}>{row.fullName.charAt(0).toUpperCase() + row.fullName.slice(1)}</span>
      )
    },
    {
      name: "RO Code", selector: (row) => row.ROCode, sortable: true, width: "120px",
      cell: (row) => (
        <a href={`mailto:${row.ROCode}`} style={{ color: "blue", textDecoration: "none" }}>
          {row.ROCode}
        </a>
      ),
    },
    {
      name: "IIISLAHip No", selector: (row) => row.IIISLAHipNo, sortable: true, width: "150px",
      cell: (row) => (
        <span style={{ color: 'black', padding: '5px', borderRadius: '4px', border: "2px solid grey" }}>
          {row.IIISLAHipNo ? row.IIISLAHipNo : ""}
        </span>
      ),
    },
    {
      name: "Email", selector: (row) => row.email, sortable: true, width: "200px",
      cell: (row) => (
        <a href={`mailto:${row.email}`} style={{ color: "blue", textDecoration: "none" }}>
          {row.email}
        </a>
      ),
    },
    {
      name: "Phone No", selector: (row) => row.phone, sortable: true,
      cell: (row) => (
        <span style={{ color: '#7d0a1b', padding: '5px', borderRadius: '4px' }}>
          {row.phone ? row.phone.charAt(0).toUpperCase() + row.phone.slice(1).toLowerCase() : ""}
        </span>
      ),
    },
    {
      name: "Licence Expiry", selector: (row) => row.licenceExpiry, sortable: true, width: "150px",
      cell: (row) => (
        <span style={{ color: '#63636e', padding: '5px', borderRadius: '4px' }}>
          {row.licenceExpiry ? row.licenceExpiry.charAt(0).toUpperCase() + row.licenceExpiry.slice(1).toLowerCase() : ""}
        </span>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.location || '',
      sortable: true,
      cell: (row) => {
        const location = row.location ? String(row.location) : "";
        return (
          <span style={{ color: "green" }}>
            {location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()}
          </span>
        );
      },
    },

    { name: "INLIASCode", selector: (row) => row.INLIASCode, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => view(row.surveyorCode)}
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
      name: "Performance",
      cell: (row) => (
        <button
          onClick={() => viewPerformance(row.vendorCode, row.IIISLAHipNo)}
          className='view-button'
          style={{ background: '#e6e679' }}
        >
          Performance
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Activate / Deactivate",
      cell: (row) => (
        <button
          onClick={() => openModal(row)}
          className='view-button'
          style={{ background: 'rgb(190 98 98)', color: "white" }}
        >
          {row.isActive === "true" ? "Deactivate" : "Activate"}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  if (getDepartment !== "Administration") {
    columns.push({
      name: "Delete",
      cell: (row) => (
        <span
          onClick={() => openDeleteModal(row)}
          style={{ cursor: 'pointer' }}
        >
          <DeleteOutlineIcon />
        </span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }


  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const newRows = data.filter((row) => {
      const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
      const searchLower = value; // Use the updated search value directly

      const idValue = formattedId.includes(searchLower);
      const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchLower);
      const fullNameValue = (row.fullName ?? '').toLowerCase().includes(searchLower);
      const ROCodeValue = (row.ROCode ?? '').toLowerCase().includes(searchLower);
      const phoneValue = (row.phone ?? '').toLowerCase().includes(searchLower);
      const IIISLAHipNoValue = (row.IIISLAHipNo ?? '').toLowerCase().includes(searchLower);
      const emailValue = (row.email ?? '').toLowerCase().includes(searchLower);

      const locationValue = (row.location ?? '').toLowerCase().includes(searchLower);
      const INLIASCodeValue = (row.INLIASCode ?? '').toLowerCase().includes(searchLower);
      const licenceExpiryValue = (row.licenceExpiry ?? '').toLowerCase().includes(searchLower);

      // const vendorIdValue = (row.vendorIdentity ?? '').toLowerCase().includes(searchLower);
      const vendorIdValue = (row.vendorIdentity ? `${row.vendorIdentity.substring(0, 2)}${String(row.vendorIdentity.substring(2)).padStart(4, '0')}` : "" ?? '').toLowerCase().includes(searchLower);


      return licenceExpiryValue || vendorIdValue || idValue || phoneValue || dateValue || fullNameValue || ROCodeValue || IIISLAHipNoValue || locationValue || INLIASCodeValue || emailValue;
    });

    setCurrentItems(newRows);
  };


  return (
    <div>
      {showVendorTable && (
        <div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
          <Helmet>
            <title>Vendor Information - Claimpro</title>
            <meta name="description" content="Vendor Information Claimpro." />
            <meta name="keywords" content="Vehicle Accidents, accident trucks, vendor service, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist, Accidental repair, Motor Insurance claim, Advocate services, Crane service, On site repair, Accident Management" />
            <link rel='canonical' href={`https://claimpro.in/VendorApporoved`} />
          </Helmet>

          <div>
            <h3 className="bigtitle">Surveyor View / Edit</h3>
            <div className="form-search">
              <label className='label-class'>
                Search by
                <input
                  type="search"
                  className="form-control-sm border ps-3"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearch}
                />
              </label>

              <label className="label-class">
                <div className='form-control generate-button' style={{ padding: "4px", border: "3px solid lightgreen", marginLeft: "10px", marginTop: "20px" }} onClick={handleMap}>Surveyor By Map</div>
              </label>
              <label className="label-class">
              </label>
              <label className="label-class">
              </label>
            </div>
          </div>


          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {alertInfo.message}
            </Alert>
          )}
          {/* <p
            style={{
              display: 'flex',
              marginRight: "5px",
              cursor: "pointer"
            }}
            onClick={sortDateFunc}
          >
            {sortDate == "asc" ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </p> */}
          <div className="container d-flex justify-content-center " style={{ marginTop: "10px" }}>
            <div className="container my-5">
              <DataTable
                columns={columns}
                data={currentItems}
                fixedHeader
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]} // Options for rows per page
                selectableRows
                onSelectedRowsChange={handleRowsSelected}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={tableCustomStyles}
              />
            </div>
          </div>


          {modalData && (
            <ActivationModel
              isOpen={isModalOpen}
              onConfirm={() => handleConfirm(modalData.vendorCode, modalData.isActive === "true" ? "false" : "true")}
              onCancel={handleCancel}
            />
          )}

          {deleteData && (
            <ActivationModel
              isOpen={isModalOpen}
              onConfirm={() => handleConfirmDelete(deleteData.vendorCode)}
              onCancel={handleCancel}
            />
          )}

        </div>)}
      {showVendorMasterEdit && (
        <SurveyorMasterEdit id={selectedId} onUpdate={handleUpdate} />
      )}
      {/* {showPerformance && (
          <VendorPerformance id={selectedVendorCode} type={selectedVendorType} onUpdate={handleUpdate} />
        )} */}
      {showMap && (
        <SurveyorByMap onUpdate={handleUpdate} />
      )}

    </div>
  );
}
export default SurveyorApproved;