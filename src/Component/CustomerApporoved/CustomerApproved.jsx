import React, { useState, useEffect } from 'react';
import './CustomerApproved.css';
import '../AccidentVehicle/AccidentVehicle.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
// '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import ActivationModel from '../Visitors/ActivationModel';

import { Helmet } from 'react-helmet-async';
import CustomerMasterEdit from "../CustomerMaster/CustomerMasterEdit";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DataTable from "react-data-table-component";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CustomerPerformance from './CustomerPerformance';
import Admin from '../Admin/Admin';

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


const CustomerApproved = () => {

  const [modalOpenHere, setModalOpenHere] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSeverity, setModalSeverity] = useState('');
  const getDepartment = localStorage.getItem("department");
  console.log("getDepartment", getDepartment)


  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info', timestamp: null });
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);


  const [showCustomerMasterEdit, setShowCustomerMasterEdit] = useState(false)
  const [showCustomerPerformance, setShowCustomerPerformance] = useState(false)
  const [showCustomerTable, setShowCustomerTable] = useState(true)


  const [selectedId, setSelectedId] = useState(null);

  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');

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

  useEffect(() => {
    if (!showCustomerMasterEdit) getData();
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showCustomerMasterEdit]);

  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

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



  const deleteCustomer = async (id) => {
    const response = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/deleteCustomer/${userId}/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
  };

  const generateFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/customerDBToExcel/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
      setGeneratedExcel(response.data.data);
      setIsLoading(false);
      setIsGenerated(true);
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  const handleConfirm = (vendorCode, isActive) => {
    deactive(vendorCode, isActive);
    setModalOpen(false);
  };

  const handleConfirmDelete = async (CustomerCode) => {
    await deleteCustomer(CustomerCode);
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

  const [sortDate, setSortDate] = useState("asc");
  const sortDateFunc = () => {
    setSortDate(sortDate == "asc" ? "desc" : "asc");
    const sortedItems = [...data].sort((a, b) => {
      const dateA = new Date(a.systemDate).getTime();
      const dateB = new Date(b.systemDate).getTime();
      return sortDate == "asc" ? dateA - dateB : dateB - dateA;
    });
    setData(sortedItems)
  }

  const deactive = async (id, isActivate) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/changeActivationForCustomer/${userId}/${id}/${isActivate}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      getData();
      setTimeout(() => {
        setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
      }, 2000)
    } catch (error) {
      console.error("Error during form submission:", error);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setModalSeverity('error');
      if (errorMessage === "jwt expired") {
        setModalMessage("Your session has expired. Redirecting to login...");
        setModalOpenHere(true);
      } else {
        setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
      }
    }

  };

  const view = (id) => {
    setSelectedId(id);
    setShowCustomerTable(false)
    setShowCustomerMasterEdit(true)
    setShowCustomerPerformance(false)
    navigate('/customer-form-edit', {state:{id:id}})
  };

  const viewPerformance = (id) => {
    setSelectedId(id);
    setShowCustomerTable(false)
    setShowCustomerMasterEdit(false);
    setShowCustomerPerformance(true);
    console.log('id`${process.env.REACT_APP_BACKEND_URL}/api/getPersonalAccidentVehicleInfoById/${state.customerId}`',id)
    navigate('/customer-form-activity', {state:{customerId:id}})

  }
  const handleUpdate = () => {
    setShowCustomerTable(true)
    setShowCustomerMasterEdit(false); // Hide VendorMasterEdit
    setShowCustomerPerformance(false);
  };

  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getCustomer/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
    const fetchedData = response.data.data;

    const formattedData = fetchedData.map(item => ({
      ...item,
      systemDate: formatDate(item.systemDate),
    }));
    setData(formattedData);
    setCurrentItems(formattedData);
  };

  const [currentItems, setCurrentItems] = useState(data);
  const columns = [
    {
      name: "CustomerID",
      selector: row => row.id, // Raw data for sorting
      cell: row => <span>{String(row.id).padStart(4, '0')}</span>, // Display formatted value
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.id - rowB.id // Custom sort function
    },
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
    {
      name: "Customer Name", selector: (row) => row.CustomerName, sortable: true, width: "150px",
      cell: (row) => (
        <span style={{ color: 'brown' }}>{row.CustomerName.charAt(0).toUpperCase() + row.CustomerName.slice(1)}</span>
      )
    },
    {
      name: "Email Of Customer", selector: (row) => row.email, sortable: true, width: "200px",
      cell: (row) => (
        <a href={`mailto:${row.email}`} style={{ color: "blue", textDecoration: "none" }}>
          {row.email}
        </a>
      ),
    },
    {
      name: "Types Of Customer", selector: (row) => row.CustomerType, sortable: true,
      cell: (row) => (
        <span style={{ color: 'black', padding: '5px', borderRadius: '4px', border:"2px solid grey" }}>
          {row.CustomerType ? row.CustomerType.charAt(0).toUpperCase() + row.CustomerType.slice(1).toLowerCase() : ""}
        </span>
      ),
    },
    {
      name: "Added By",
      selector: (row) => row.addedBy || '',
      sortable: true,
      cell: (row) => {
        const addedBy = row.addedBy ? String(row.addedBy) : "";
        return (
          <span style={{ color: "green" }}>
            {addedBy.charAt(0).toUpperCase() + addedBy.slice(1).toLowerCase()}
          </span>
        );
      },
    },
    {
      name: "Modified By",
      selector: (row) => row.EditedBy || '',
      sortable: true,
      cell: (row) => {
        const EditedBy = row.EditedBy ? String(row.EditedBy) : "";
        return (
          <span style={{ color: "green" }}>
            {EditedBy.charAt(0).toUpperCase() + EditedBy.slice(1).toLowerCase()}
          </span>
        );
      },
    },

    { name: "District", selector: (row) => row.district, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => view(row.CustomerCode)}
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
      name: "Activity",
      cell: (row) => (
        <button
          onClick={() => viewPerformance(row.CustomerCode)}
          className='view-button'
          style={{ background: '#e6e679' }}
        >
          Activity
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
    },
   
  ];

  if(getDepartment !== "Administration"){
   columns.push ({
      name: "Delete Customer",
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
      const searchLower = value;

      const idValue = formattedId.includes(searchLower);
      const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchLower)
      const customerNameValue = (row.CustomerName ?? '').toLowerCase().includes(searchLower);
      const emailValue = (row.email ?? '').toLowerCase().includes(searchLower);
      const CustomerTypeValue = (row.CustomerType ?? '').toLowerCase().includes(searchLower);
      const editedByValue = (row.EditedBy ?? '').toLowerCase().includes(searchLower);
      const districtValue = (row.district ?? '').toLowerCase().includes(searchLower);

      return idValue || dateValue || customerNameValue || emailValue || CustomerTypeValue || editedByValue || districtValue;
    });

    setCurrentItems(newRows);
  };

  const handleLoginAgain = () => {
    window.location.href = '/';
  };


  return (
    <div>
      <Admin/>
      {showCustomerTable && (<div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
        <Helmet>
          <title>Customer Table - Claimpro</title>
          <meta name="description" content="Customer Table BVC claimPro Assist." />
          <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist, Accidental repair, Motor Insurance claim, Advocate services, Crane service, On site repair, Accident Management" />
          <link rel='canonical' href={`https://claimpro.in/CustomerApproved`} />
        </Helmet>
        <div>
          <h3 className="bigtitle">Customer View / Edit</h3>
          <div className="form-search">
            <label className='label-class'>
              Search by
              <input
                type="text"
                placeholder="Search by "
                value={searchValue}
                onChange={handleSearch}
              />
            </label>

            <label className="label-class" style={{ marginTop: "20px" }}>
              {!isGenerated && (
                <div
                  className="form-control generate-button"
                  onClick={generateFile}
                >
                  {isLoading ? (
                    <ClipLoader color="#4CAF50" loading={isLoading} />
                  ) : (
                    'Generate Excel File'
                  )}
                </div>
              )}
              {isGenerated && (
                <a
                  href={generatedExcel}
                  className="form-control download-link"
                >
                  Download Excel File
                </a>
              )}
            </label>
          </div>
        </div>

        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}

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

        <Dialog
          open={modalOpenHere}
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: '15px',
              backgroundColor: modalSeverity === 'success' ? '#e0ffe0' : 'white',
            }
          }}
        >
          <DialogTitle
            sx={{
              color: modalSeverity === 'success' ? 'green' : 'red',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {modalSeverity === 'success' ? 'Success' : 'Session Expired'}
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: '#333'
            }}
          >
            <p style={{ marginBottom: '20px', textAlign: 'center' }}>{modalMessage}</p>
            <Button
              onClick={handleLoginAgain}
              variant="contained"
              sx={{
                backgroundColor: modalSeverity === 'success' ? 'green' : 'grey',
                color: 'white',
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: modalSeverity === 'success' ? 'darkgreen' : 'darkgrey' }
              }}
            >
              Login Again
            </Button>
          </DialogContent>
        </Dialog>


        {modalData && (
          <ActivationModel
            isOpen={isModalOpen}
            onConfirm={() => handleConfirm(modalData.CustomerCode, modalData.isActive === "true" ? "false" : "true")}
            onCancel={handleCancel}

          />
        )}

        {deleteData && (
          <ActivationModel
            isOpen={isModalOpen}
            onConfirm={() => handleConfirmDelete(deleteData.CustomerCode)}
            onCancel={handleCancel}
          />
        )}
      </div>)}

      {/* {showCustomerMasterEdit && (
        <CustomerMasterEdit id={selectedId} onUpdate={handleUpdate} />
      )} */}

      {/* {showCustomerPerformance && (
        <CustomerPerformance customerId={selectedId}  onUpdate={handleUpdate} />
      )} */}
    </div>
  );
};

export default CustomerApproved;