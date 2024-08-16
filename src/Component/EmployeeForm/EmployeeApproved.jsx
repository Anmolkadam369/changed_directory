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


const formatDate =(isoDateString)=>{
  const date = new Date(isoDateString);
const day = String(date.getUTCDate()).padStart(2, '0');
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getUTCFullYear();
return (`${day}-${month}-${year}`);
}



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

  const [showEmployeeMasterEdit, setShowEmployeeMasterEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
 const [sortDate, setSortDate]=useState("asc");



  const sortDateFunc = ()=>{
    setSortDate(sortDate == "asc" ? "desc":"asc");
    const sortedItems = [...data].sort((a,b)=>{
      const dateA = new Date(a.DOJ).getTime();
      const dateB = new Date(b.DOJ).getTime();
      return sortDate == "asc" ? dateA - dateB : dateB - dateA; 
    });
    setData(sortedItems)
  }

  const deactive = async (id, isActivate) => {
    const response = await axios({
      method: 'PUT',
      url: `${backendUrl}/api/changeActivationEmployee/${userId}/${id}/${isActivate}`,
      headers: {
        'Authorization': token
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
      const response = await axios.get(`${backendUrl}/api/customerDBToExcel/${userId}`);
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
    // navigate("../EmployeeFormEdit", { state: { id } });
  }
  const handleUpdate = () => {
    setShowEmployeeMasterEdit(false); // Hide VendorMasterEdit
  };
  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getEmployee`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };


  const deleteEmployee = async (id) => {
    const response = await axios({
      method: 'DELETE',
      url: `${backendUrl}/api/deleteEmployee/${userId}/${id}`,
      headers: {
        'Authorization': token
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };
  const handleSetItemPerPage = (e) => {
    setItemsPerPage(e.target.value);
  };
  const filteredData = data.filter(item =>
    item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setMarginLeft('0px');
        setPaddingLeft('20px');
        setWidth('95%');
      } else {
        setMarginLeft('30px');
        setPaddingLeft("40px");
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


  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>

    {!showEmployeeMasterEdit && (<div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
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
            Search by Employee Name
            <input
              type="text"
              placeholder="Search by Employee Name"
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
          </label>
          <label className='label-class'>
            Number Of Items On Page
            <input
              type="number"
              placeholder="Items Show on Page"
              value={itemsPerPage}
              onChange={handleSetItemPerPage}
              required
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
         <p
          style={{
            display:'flex',
            justifyContent:"right",
            marginRight:"5px",
            cursor: "pointer"
          }}
          onClick={sortDateFunc}
        >
{sortDate == "asc" ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
        </p>
      <div className='responsive-table' style={{ width }}>
        <table style={{ width: '100%', marginLeft: "10px", borderCollapse: 'collapse', marginBottom: "90px" }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th> Date Of Joining </th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Added By</th>
              <th>View</th>
              <th>Active/Deactive</th>
              <th>Delete Employee</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", fontWeight: "bold" }}>No data is there...</td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{formatDate(item.DOJ)}</td>
                  <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                  <td>
                      <a href={`mailto: ${item.employeeEmailId}`} style={{ color: "blue", textDecoration: "none" }}>
                        {item.employeeEmailId}
                      </a>
                    </td>
                  <td style={{ color: "green" }}>{item.department? item.department.charAt(0).toUpperCase() + item.department.slice(1):"_"}</td>
                    <td>{item.addedBy != null ? item.addedBy.charAt(0).toUpperCase() + item.addedBy.slice(1) : ""}</td>

                  <td>
                    <button onClick={() => view(item.companyEmpId)} className='view-button'>View</button>
                  </td>
                  <td>
                      <button
                        onClick={() => openModal(item)}
                        style={{background:'rgb(190 98 98)', color:"white"}}
                        className="deactivate-button"
                      >
                        {item.isActive === "true" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  <td style={{cursor:'pointer'}} onClick={() => openDeleteModal(item)}><DeleteOutlineIcon /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
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
      </div>

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

    {showEmployeeMasterEdit && (
      <EmployeeFormEdit id={selectedId} onUpdate={handleUpdate}/>
    )}
    </div>
  );

};

export default EmployeeApproved;
