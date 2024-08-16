import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import VehicleClaimRegistration from '../VehicleClaimRegistration/VehicleClaimRegistration';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';


const AccidentVehicleRegUpdate = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
  const [width, setWidth] = useState('100%');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAccidentReg, setShowAccidentReg] = useState(false)
  const [showAccidentTable, setShowAccidentTable] = useState(true)
  const [showChooseOptions, setShowChooseOptions] = useState(false)
  const [allOptionToShow, setAllOptionToShow] = useState([])
  const allOptions = ['advocate', 'workshop', 'onsite temperory repair', 'crane'];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

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


  // console.log("seletdid", selectedId, "acidentreg", showAccidentReg)
  useEffect(() => {
    getData();
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  const [formData, setFormData] = useState({
    vehicleNo: ""
  });



  useEffect(() => {
    if (selectedItem != null) {
      const getOptionsToShow = () => {
        switch (selectedItem.choosenPlan) {
          case 'advanced':
            return allOptions;  // Show all options
          case 'plus':
            return allOptions.filter(option => option !== 'advocate');  // Remove 'advocate'
          case 'pro':
            return allOptions.filter(option => option !== 'advocate' && option !== 'onsite temperory repair' && option !== 'crane');  // Remove 'advocate', 'onsite repair', 'crane'
          default:
            return [];
        }
      };
      const options = getOptionsToShow();

      if (JSON.stringify(options) !== JSON.stringify(allOptionToShow)) {
        setAllOptionToShow(options);
      }
    }
  }, [selectedItem, allOptions, allOptionToShow]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };



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

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getAccidentVehicleInfo`);
    console.log("response", response);
    if (response && response.message !== "No accident vehicle data found.") setData(response.data.data)
  };

  function view(id) {
    console.log("myId", id)
    setSelectedId(id);
    setShowAccidentReg(true)
    setShowChooseOptions(false)
    setShowAccidentTable(false)
  }

  function chooseOptions(item) {
    setSelectedItem(item);
    setShowAccidentReg(false)
    setShowChooseOptions(true)
    setShowAccidentTable(false)

  }
  const handleUpdate = () => {
    getData();
    setShowAccidentReg(false);
    setShowChooseOptions(false);
    setShowAccidentTable(true)
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setMarginLeft('0px');
        setPaddingLeft('20px')
        setWidth('70%');
      } else {
        setMarginLeft('30px');
        setPaddingLeft("40px")
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

  const validateForm = () => {
    if (selectedOptions.length == 0) {
      return ` Atleast One Option Need to Choose.`
    }
  }

  const sendSelectedOptions = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true);
      const validationMessage = validateForm();
      if (validationMessage) {
        setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
        setIsLoading(false);
        return;
      }
      console.log("selectedOption", selectedOptions)
      const response = await axios({
        method: 'PUT',
        url: `${backendUrl}/api/updateSelectedOptions/${selectedItem.AccidentVehicleCode}/${userId}`,
        data: selectedOptions,
        headers: {
          'Authorization': token
        }
      })
      console.log("response", response.data);
      setIsLoading(false);
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
      setTimeout(() => {
        handleUpdate()
      }, 2000);
    } catch (error) {
      console.error('Error response:', error.response);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      if (errorMessage === "jwt expired") {
        setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
      }
    }
  }



  return (

    <div>
      {showAccidentTable && (
        <div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
          <Helmet>
            <title>Accident Vehicle Information Register Update - Claimpro</title>
            <meta name="description" content="Accident Vehicle Information Register Update Claimpro Assist" />
            <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            <link rel='canonical' href={`https://claimpro.in/AccidentVehicleRegUpdate`} />
          </Helmet>
          <h3 className='bigtitle'>Create Register (New Accident Vehicle)</h3>
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
          <div className='responsive-table' style={{ width }}>
            <table style={{ width: '100%', marginLeft: "0px", borderCollapse: 'collapse', marginBottom: "90px" }}>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>User Name</th>
                  <th>Accident File Number</th>
                  <th>Choosen Plan</th>
                  <th>Selected Services</th>
                  <th>Add Services</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Case Found...</td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={item.id} style={{ textAlign: "center" }}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{item.CustomerName.charAt(0).toUpperCase() + item.CustomerName.slice(1)}</td>
                      <td style={{ color: "blue" }}>{item.accidentFileNo}</td>
                      <td className='badge' style={{ color: "#8e27f1", background: "yellow" }} >{item.choosenPlan.charAt(0).toUpperCase() + item.choosenPlan.slice(1)}</td>

                      <td>{item && (item.selectedOptions == "" || item.selectedOptions == null) ? (
                            "___"
                      ) : (
                        <div>
                          {item && item.selectedOptions}
                        </div>
                      )}
                      </td>
                      <td>
                        <div>
                          <button onClick={() => chooseOptions(item)} className='view-button'>Choose Services</button>
                        </div>
                      </td>
                      <td>
                        <button onClick={() => view(item.accidentFileNo)} className='view-button'>View here</button>
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
        </div>)}
      {showAccidentReg && (
        <VehicleClaimRegistration id={selectedId} onUpdate={handleUpdate} />
      )}
      {showChooseOptions && (
        <div className="photo-upload-container">
          <div style={{ display: "flex", marginRight: '60px', marginBottom: '10px' }}>
            <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleUpdate} />

            <div >
              <h2 className='bigtitle'>Customer Didn't Choose The Vendor<br /></h2>
              <h6 className='bigtitle' style={{ fontSize: "15px", marginLeft: "90px" }}>Please Choose On Behalf Of Customer</h6>
            </div>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: 'rgb(233 223 223)',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>

            <div style={{ position: 'relative', color: '#333', marginBottom: '15px' }}>
              <h3>Select Your Services</h3>
              {allOptionToShow.map((option, index) => (
                <label key={index} style={{
                  display: 'block',
                  marginBottom: '10px',
                  marginTop: "20px",
                  fontSize: '16px',
                  color: '#666'
                }}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px', marginLeft: "10px" }}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                </label>
              ))}
              <div style={{ textAlign: 'center', marginTop: "40px" }}>
                <button
                  style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                  disabled={isLoading} // Disable button while loading
                  onClick={sendSelectedOptions}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                {isLoading && (
                  <div style={{ marginTop: '10px' }}>
                    <ClipLoader color="#4CAF50" loading={isLoading} />
                    <div style={{ marginTop: '10px', color: '#4CAF50' }}>Submitting your form, please wait...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {alertInfo.show && (
            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
              {alertInfo.message}
            </Alert>
          )}
        </div>
      )}
    </div>
  );

};

export default AccidentVehicleRegUpdate;
