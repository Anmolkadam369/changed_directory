import React, { useState, useEffect } from 'react';
import '../CustomerMaster/CustomerMaster.css'
import '../AccidentVehicle/AccidentVehicle.css'

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import EmployeeFormEdit from './EmployeeFormEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Alert } from '@mui/material';
import ActivationModel from '../Visitors/ActivationModel';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DataTable from "react-data-table-component";
import Admin from '../Admin/Admin';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
};

const EmployeeApproved = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState(1);
  let [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
  const [width, setWidth] = useState('100%');
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info', timestamp: null });

  const getDepartment = localStorage.getItem("department");
  console.log("getDepartment", getDepartment)

  const [showEmployeeMasterEdit, setShowEmployeeMasterEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

 const [selectedRows, setSelectedRows] = useState([]);

 const handleRowsSelected = (state) => {
   setSelectedRows(state.selectedRows);
 }

 const conditionalRowStyles = [
  {
    when: (row) => selectedRows.some(selected => selected.companyEmpId === row.companyEmpId),
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


  const deactive = async (id, isActivate) => {
    const response = await axios({
      method: 'PUT',
      url: `${backendUrl}/api/changeActivationEmployee/${userId}/${id}/${isActivate}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
  };


  useEffect(() => {
    if(!showEmployeeMasterEdit) getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showEmployeeMasterEdit]);

  const generateFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/employeeDBToExcel/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
      console.log("daa", response.data.data)
      console.log("response", response.data.data);
      setGeneratedExcel(response.data.data)
      setIsLoading(false);
      setIsGenerated(true);
    } catch (error) {
      setIsLoading(false);  // Ensure loading state is reset in case of error
      console.error(error.message);
    }
  }

  function view(id) {
    console.log("myId", id)
    setSelectedId(id);
    setShowEmployeeMasterEdit(true)
    navigate("/edit-employee", { state: { id : id} });
  }
  const handleUpdate = () => {
    setShowEmployeeMasterEdit(false); // Hide VendorMasterEdit
  };
  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getEmployee/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
    const fetchedData = response.data.data;
    const formattedData = fetchedData.map(item => ({
      ...item,
      DOJ: formatDate(item.DOJ),
    }));
    setData(formattedData);
    setCurrentItems(formattedData);
  };


  const deleteEmployee = async (id) => {
    const response = await axios({
      method: 'DELETE',
      url: `${backendUrl}/api/deleteEmployee/${userId}/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
  };

  const handleConfirmDelete = async (employeeCode)=>{
    await deleteEmployee(employeeCode);
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
  const handleConfirm = (employeeCode, isActive) => {
    deactive(employeeCode, isActive);
    setModalOpen(false);
  };


  const [currentItems, setCurrentItems] = useState(data);
  const columns = [
    {
      name: "EmployeeID",
      selector: row => row.id, // Raw data for sorting
      cell: row => <span>{String(row.id).padStart(4, '0')}</span>, // Display formatted value
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.id - rowB.id // Custom sort function
    },
    {
      name: "Date",
      selector: (row) => row.systemDate? formatDate(row.systemDate) : "____",
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const dateA = new Date(rowA.systemDate);
        const dateB = new Date(rowB.systemDate);
        return dateA - dateB; // Ascending order
      },
    },
    { name: "Employee Name", selector: (row) => row.name, sortable: true ,width:"150px",
      cell: (row) => (
        <span style={{color:'brown'}}>{row.name ? row.name.charAt(0).toUpperCase() + row.name.slice(1):""}</span>
      )
    },
    { name: "Email Of Employee", selector: (row) => row.employeeEmailId, sortable: true , width:"200px",
      cell: (row) => (
      <a href={`mailto:${row.employeeEmailId}`} style={{ color: "blue", textDecoration: "none" }}>
        {row.employeeEmailId}
      </a>
    ),},
    { name: "Department", selector: (row) => row.department, sortable: true,width:"150px",
      cell: (row) => (
        <span style={{color: '#fff', backgroundColor: '#ffc107', padding: '5px', borderRadius: '4px'}}>
            {row.department ? row.department : ""}
        </span>
      ),
    },
    { name: "Gender", selector: (row) => row.gender, sortable: true },
    {
      name: "Added By",
      selector: (row) => row.addedBy || '',
      sortable: true,
      cell: (row) => {
        const addedBy = row.addedBy ? String(row.addedBy) : "";
        return (
          <span style={{ color: "green" }}>
            {row.addedBy ? addedBy.charAt(0).toUpperCase() + addedBy.slice(1).toLowerCase(): ""}
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
            {row.EditedBy ? EditedBy.charAt(0).toUpperCase() + EditedBy.slice(1).toLowerCase(): ""}
          </span>
        );
      },
    },
    
    { name: "Actions",
      cell: (row) => (
        <button
          onClick={() => view(row.companyEmpId)}
          className='view-button'
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: "Performance",
      cell: (row) => (
        <button
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
    { name: "Activate / Deactivate",
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
    columns.push({ name: "Delete Employee",
      cell: (row) => (
        <span
          onClick={() => openDeleteModal(row)}
          style={{ cursor:'pointer' }}
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
      const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchLower);
      const nameValue = (row.name ?? '').toLowerCase().includes(searchLower);
      const emailValue = (row.employeeEmailId ?? '').toLowerCase().includes(searchLower);
      const branchValue = (row.branch ?? '').toLowerCase().includes(searchLower);
      const editedByValue = (row.EditedBy ?? '').toLowerCase().includes(searchLower);
      const genderValue = (row.gender ?? '').toLowerCase().includes(searchLower);
  
      return idValue || dateValue || nameValue || emailValue || branchValue || editedByValue || genderValue;
    });
  
    setCurrentItems(newRows);
  };


  return (
    <div>
      <Admin/>
    {!showEmployeeMasterEdit && (<div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
      <Helmet>
        <title>Employee Information - Claimpro</title>
        <meta name="description" content="Employee Information For BVC Claimpro Assist" />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/EmployeeApproved`} />
      </Helmet>
      <div>
        <h3 className="bigtitle">Employee View / Edit</h3>
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
       
       <div className="container d-flex justify-content-center " style={{marginTop:"10px"}}>
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

      {/* <div className='pagination'>
        <ButtonGroup style={{boxShadow:'none'}} variant="contained" color="primary" aria-label="pagination buttons">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}><ArrowBack /></Button>
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </Button>
          ))}
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}><ArrowForward /></Button>
        </ButtonGroup>
      </div> */}

      {modalData && (
          <ActivationModel
            isOpen={isModalOpen}
            onConfirm={() => handleConfirm(modalData.companyEmpId, modalData.isActive === "true" ? "false" : "true")}
            onCancel={handleCancel}
          />
        )}

      {deleteData && (
            <ActivationModel
              isOpen={isModalOpen}
              onConfirm={() => handleConfirmDelete(deleteData.companyEmpId)}
              onCancel={handleCancel}
            />
          )}
    </div>)}

    {/* {showEmployeeMasterEdit && (
      <EmployeeFormEdit id={selectedId} onUpdate={handleUpdate}/>
    )} */}
    </div>
  );

};

export default EmployeeApproved;
