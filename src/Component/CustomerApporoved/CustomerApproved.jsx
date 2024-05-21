import React, { useState, useEffect } from 'react';
import './CustomerApproved.css'
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

const CustomerApproved = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  function view(id) {
    console.log("myId", id)
    navigate("../CustomerMasterEdit", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getCustomer`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };

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
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }



  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      <h3 className='bigtitle'>Customer View / Edit</h3>
      <div className='responsive-table'>
      <table style={{ width: '90%', marginLeft:"10px", borderCollapse: 'collapse' ,marginBottom:"90px"}}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Customer Type</th>
            <th>Edited By</th>
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
                <td>{item.CustomerName}</td>
                <td>{item.email}</td>
                <td>{item.CustomerType}</td>
                <td>{item.EditedBy}</td>
                <td>
                <button onClick={() => view(item.CustomerCode)} className='view-button'>View</button>
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

export default CustomerApproved;
