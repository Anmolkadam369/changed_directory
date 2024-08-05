import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import EditAccidentVehicle from "../EditAccidentVehicle/EditAccidentVehicle"
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';

const AccidentVehicle = () => {
  const [data, setData] = useState([]);
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
  const [width, setWidth] = useState('100%');
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [showEditAccidentVehicle, setShowEditAccidentVehicle] = useState(false)
  const [selectedId, setSelectedId] = useState(null);



  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleSetItemPerPage = (e) => {
    setItemsPerPage(e.target.value);
  };
  const filteredData = data.filter(item =>
    item.CustomerName && item.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (!showEditAccidentVehicle) getData("partiallyAssigned");
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showEditAccidentVehicle]);

  const getData = async (getFilteredData) => {
    const response = await axios.get(`${backendUrl}/api/getVehicleToAssignVendor/${getFilteredData}`);
    setData(response.data.data);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const view = (id) => {
    setSelectedId(id);
    setShowEditAccidentVehicle(true)
    // navigate("../EditAccidentVehicle", { state: { id } });
  };

  const handleUpdate = () => {
    setShowEditAccidentVehicle(false); // Hide VendorMasterEdit
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setMarginLeft('10px');
        setPaddingLeft('10px');
        setWidth('80%');
      } else if (window.innerWidth <= 380) {
        setMarginLeft('10px');
        setPaddingLeft('5px');
        setWidth('75%');
      } else {
        setMarginLeft('30px');
        setPaddingLeft('30px');
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

  return (
    <div>
      {!showEditAccidentVehicle && (<div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
        <Helmet>
          <title>Accident Vehicle Service - Claimpro</title>
          <meta name="description" content="Accident Vehicle Service." />
          <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist, Accidental repair, Motor Insurance claim, Advocate services, Crane service, On site repair, Accident Management" />
          <link rel='canonical' href={`https://claimpro.in/AccidentVehicle`} />
        </Helmet>
        <h3 className="bigtitle">Assign Vendor to Accident Vehicle</h3>
        <div className="form-search">
          <label className='label-class'>
            Search by Customer Name
            <input
              type="text"
              placeholder="Search by Customer Name"
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
          <label className='label-class'></label>
        </div>
        <div style={{ display: "flex", margin: "10px" }}>
          <p className='topdivs' onClick={() => getData("fullyAssigned")}>Fully Assigned </p>
          <p className='topdivs' onClick={() => getData("partiallyAssigned")}>Partially Assigned </p>
          <p className='topdivs' onClick={() => getData("NotAssigned")}>Not Assigned </p>
        </div>
        <div className="responsive-table" style={{ width }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>User Name</th>
                <th>Accident File Number</th>
                <th>Selected Options</th>
                <th>Choosen Plan</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>All Vehicles are assigned To Vendors...</td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{item.CustomerName}</td>
                    <td>{item.accidentFileNo}</td>
                    <td>{item.selectedOptions}</td>
                    <td>{item.choosenPlan}</td>
                    <td>
                      <button onClick={() => view(item.AccidentVehicleCode)} className='view-button'>View here</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <ButtonGroup style={{boxShadow:'none'}} variant="contained" color="primary" aria-label="pagination buttons">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ boxShadow: 'none' }}>
              <ArrowBack />
            </Button>
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
                style={{ boxShadow: 'none' }} // Ensure inline style is also set to none
              >
                {pageNumber}
              </Button>
            ))}
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ boxShadow: 'none' }}>
              <ArrowForward />
            </Button>
          </ButtonGroup>
        </div>
      </div>)}
      {showEditAccidentVehicle && (
        <EditAccidentVehicle id={selectedId} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default AccidentVehicle;
