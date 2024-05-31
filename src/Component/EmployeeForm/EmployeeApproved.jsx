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
import { Helmet } from 'react-helmet';


const EmployeeApproved = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [currentPage, setCurrentPage] = useState(1);
  let [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

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
    navigate("../EmployeeFormEdit", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getEmployee`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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



  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      <Helmet>
        <title>Employee Information - Claimpro</title>
        <meta name="description" content="Employee Information For BVC Claimpro Assist" />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
      </Helmet>
      <div className="header-container-search">
        <h3 className='bigtitle' style={{ marginLeft: "5px" }}>Employee View / Edit</h3>

        <label className="form-field search-field">
          Search by Employee Name
          <input
            type='text'
            placeholder="Search by Customer Name"
            className="form-control"
            value={searchQuery}
            onChange={handleSearchChange}
            required />
        </label>
        <label className="form-field search-field">
          Number Of Items On Page
          <input
            type='text'
            placeholder="Items Show on Page"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSetItemPerPage}
            required />
        </label>
        <label className="form-field search-field">
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
      <div className='responsive-table'>
        <table style={{ width: '90%', marginLeft: "10px", borderCollapse: 'collapse', marginBottom: "90px" }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Added By</th>
              <th>View</th>

            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No data is there...</td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.employeeEmailId}</td>
                  <td>{item.gender}</td>
                  <td>{item.addedBy}</td>
                  <td>
                    <button onClick={() => view(item.companyEmpId)} className='view-button'>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <ButtonGroup variant="contained" color="primary" aria-label="pagination buttons">
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
    </div>
  );

};

export default EmployeeApproved;
