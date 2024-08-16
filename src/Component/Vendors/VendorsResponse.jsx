import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import ActualVendorResponse from './ActualVendorResponse';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

const formatDate =(isoDateString)=>{
  const date = new Date(isoDateString);
const day = String(date.getUTCDate()).padStart(2, '0');
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getUTCFullYear();
return (`${day}-${month}-${year}`);
}

const VendorResponse = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState('100%');

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [showActualVendorResponse, setShowActualVendorResponse] = useState(false)
  const [selectedId, setSelectedId] = useState({});
  console.log("selectedId", selectedId)



  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [sortDate, setSortDate]=useState("asc");

  const sortDateFunc = ()=>{
    setSortDate(sortDate == "asc" ? "desc":"asc");
    const sortedItems = [...data].sort((a,b)=>{
      const dateA = new Date(a.systemDate).getTime();
      const dateB = new Date(b.systemDate).getTime();
      return sortDate == "asc" ? dateA - dateB : dateB - dateA; 
    });
    console.log("sortedItems", sortedItems)
    setData(sortedItems)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleSetItemPerPage = (e) => {
    setItemsPerPage(e.target.value);
  };
  const filteredData = data.filter(item => (item.mechanicData.length != 0) || (item.craneData.length != 0) || (item.advocateData.length != 0) || (item.workshopData.length != 0) &&
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
    if (!showActualVendorResponse) getData();
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showActualVendorResponse]);

  const getData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/vendorResponse`);
      console.log("console data", response.data)
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const view = (vehicle) => {
    console.log("VEHICLE HERE ME", vehicle)
    setSelectedId(vehicle);
    setShowActualVendorResponse(true)
  };
  const handleUpdate = () => {
    setShowActualVendorResponse(false); // Hide VendorMasterEdit
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 380) {
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

  const isAnyPending = (vehicle) => {
    let arr = [];
    if (vehicle.mechanicData.length !== 0) arr.push(vehicle.mechanicData[0].acceptedByAdmin == null ? "pending" : vehicle.mechanicData[0].acceptedByAdmin);
    if (vehicle.craneData.length !== 0) arr.push(vehicle.craneData[0].acceptedByAdmin == null ? "pending" : vehicle.craneData[0].acceptedByAdmin)
    if (vehicle.advocateData.length !== 0) arr.push(vehicle.advocateData[0].acceptedByAdmin == null ? "pending" : vehicle.advocateData[0].acceptedByAdmin)
    if (vehicle.workshopData.length !== 0) arr.push(vehicle.workshopData[0].acceptedByAdmin == null ? "pending" : vehicle.workshopData[0].acceptedByAdmin)

      console.log("arrary", arr)
    let count = 0;
    console.log("count123", count)

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "pending") count++;
    }
    return count;
  }

  return (
    <div>
      {!showActualVendorResponse && (
        <div className="Customer-master-form" style={{ paddingLeft: '10px', paddingRight: "10px", paddingTop: "40px", paddingBottom: "40px" }}>
          <Helmet>
            <title>Vendor Response Overview - Claimpro</title>
            <meta name="description" content="View and manage vendor responses for vehicle accidents. Keep track of customer names, vehicle numbers, and actions taken." />
            <meta name="keywords" content="Vehicle Accidents, Customer Service, Claimpro, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            <link rel='canonical' href={`https://claimpro.in/vendorResponse`} />
          </Helmet>

          <div style={{ marginTop: "50px" }}>
            <h3 className="bigtitle">Vendor Response Overview</h3>
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
            <p
          style={{
            display: 'flex',
            justifyContent: "right",
            marginRight: "5px",
            cursor: "pointer"
          }}
          onClick={sortDateFunc}
        >
          {sortDate == "asc" ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
        </p>
            <div className="responsive-table" style={{ width }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Assigned On</th>
                    <th>Customer Name</th>
                    <th>Selected Services</th>
                    <th>Vehicle Number</th>
                    <th>Choosen Plan</th>
                    {/* <th>Last Response</th> */}
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", fontWeight: "bold" }}>No Response from this vendor...</td>
                    </tr>
                  ) : (
                    currentItems.filter(vehicle => (vehicle.mechanicData.length != 0) || (vehicle.craneData.length != 0) || (vehicle.advocate.length != 0) || (vehicle.workshop.length != 0)).map((vehicle, index) => (
                      <tr key={vehicle.AccidentVehicleCode}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{vehicle.systemDate ? formatDate(vehicle.systemDate) : "___"}</td>
                        <td>{vehicle.CustomerName.charAt(0).toUpperCase() + vehicle.CustomerName.slice(1)}</td>
                        <td style={{ color: 'blue' }}>{vehicle.selectedOptions}</td>
                        <td  style={{ color: 'Green' }}>{vehicle.vehicleNumber || '---'}</td>
                        <td className='badge' style={{ color: "#8e27f1", background: "yellow" }}>{vehicle.choosenPlan}</td>
                        {/* <td>{vehicle.lastDate != null ? vehicle.lastDate : ""}</td> */}
                        <td>
                          <div>
                            <button onClick={() => view(vehicle)} className='view-button'>View</button>
                          </div>
                        </td>
                        <td>
                          {
                            <div>
                              <p style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
                                {(()=>{
                                  const noOfCounts = isAnyPending(vehicle);
                                  return noOfCounts > 0 ? (
                                    <span className='popUp'>Pending</span>
                                  ):("")
                                })()}
                              </p>
                            </div>
                          }
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <ButtonGroup style={{ boxShadow: 'none' }} variant="contained" color="primary" aria-label="pagination buttons">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  <ArrowBack />
                </Button>
                {pageNumbers.map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  <ArrowForward />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>)}
      {showActualVendorResponse && selectedId != {} && (
        <ActualVendorResponse vehicle={selectedId} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default VendorResponse;
