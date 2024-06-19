import React, { useState, useEffect } from 'react';
import './CustomerApproved.css';
import '../AccidentVehicle/AccidentVehicle.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import ActivationModel from '../Visitors/ActivationModel';

import { Helmet } from 'react-helmet-async';
import CustomerMasterEdit from "../CustomerMaster/CustomerMasterEdit"

const CustomerApproved = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info',timestamp: null });
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

  const [showCustomerMasterEdit, setShowCustomerMasterEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null);

  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');

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

  const generateFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/customerDBToExcel/${userId}`);
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

  const handleCancel = () => {
    setModalOpen(false);
  };

  const openModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const deactive = async (id, isActivate) => {
    const response = await axios({
      method: 'POST',
      url: `${backendUrl}/api/changeActivationForCustomer/${userId}/${id}/${isActivate}`,
      headers: {
        'Authorization': token
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
  };

  const view = (id) => {
    setSelectedId(id);
    setShowCustomerMasterEdit(true)
    // navigate("../CustomerMasterEdit", { state: { id } });
  };
  const handleUpdate = () => {
    setShowCustomerMasterEdit(false); // Hide VendorMasterEdit
  };

  const getData = async () => {
    const response = await axios.get(`${backendUrl}/api/getCustomer`);
    setData(response.data.data);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setMarginLeft('0px');
        setPaddingLeft('20px')
      } else {
        setMarginLeft('30px');
        setPaddingLeft("40px")
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
      {!showCustomerMasterEdit && (<div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
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
              Search by Vendor Name
              <input
                type="text"
                placeholder="Search by Vendor Name"
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
        <div className='responsive-table'>
          <table style={{ width: '100%', marginLeft: "10px", borderCollapse: 'collapse', marginBottom: "90px" }}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Customer Type</th>
                <th>Edited By</th>
                <th>View</th>
                <th>Active/Deactive</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", fontWeight: "bold" }}>No data is there...</td>
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
                    <td>
                      <button
                        onClick={() => openModal(item)}
                        className="deactivate-button"
                      >
                        {item.isActive === "true" ? "Deactivate" : "Activate"}
                      </button>
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
        {modalData && (
          <ActivationModel
            isOpen={isModalOpen}
            onConfirm={() => handleConfirm(modalData.CustomerCode, modalData.isActive === "true" ? "false" : "true")}
            onCancel={handleCancel}
          />
        )}
      </div>)}
      {showCustomerMasterEdit && (
        <CustomerMasterEdit id={selectedId} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default CustomerApproved;