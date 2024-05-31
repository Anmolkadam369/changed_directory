import React, { useState, useEffect } from 'react';
import "../CustomerApporoved/CustomerApproved.css"
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import ConfirmationModal from '../ConfirmModel';
import { Helmet } from 'react-helmet';


const VendorApproved = () => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let [itemsPerPage, setItemsPerPage] = useState(10)
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // let itemsPerPage = 10;
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [searchQuery, setSearchQuery] = useState('');

  const handleConfirm = (vendorCode, isActive) => {
    console.log("HANDOLEOCJDFSJFDSD")
    deactive(vendorCode, isActive);
    setModalOpen(false);
  };

  const handleCancel = () => { setModalOpen(false) };

  useEffect(() => {
    getData();
    // generateToken();   
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);
  console.log("token", token, userId);

  const generateFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/vendorDBToExcel/${userId}`);
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

  async function generateToken() {
    try {
      const authUrl = 'https://staging.eko.in:25004/ekoapi/v1/pan/verify';
      const authHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "developer_key": "becbbce45f79c6f5109f848acd540567",
        "secret-key": "MC6dKW278tBef+AuqL/5rW2K3WgOegF0ZHLW/FriZQw=",
        "secret-key-timestamp": "1516705204593"
      };
      const authData = {
        "pan_number": "JTQPK6202L",
        "purpose": 1,
        "purpose_desc": "to know customer",
        "initiator_id": "9971771929",
        "developer_key": "becbbce45f79c6f5109f848acd540567",
        "secret-key": "MC6dKW278tBef+AuqL/5rW2K3WgOegF0ZHLW/FriZQw=",
        "secret-key-timestamp": "1516705204593"
      };
      console.log(authData);
      const authResponse = await axios.post(authUrl, authData, {
        headers: authHeaders,
      });
      console.log("some")
      console.log(authResponse.data);
      const token = authResponse.data.access_token;
      console.log('Access token', token);

      return token;
    } catch (error) {
      throw error.message;
    }
  }

  function view(id) {
    console.log("myId", id)
    navigate("../VendorMasterEdit", { state: { id } });
  }

  const deactive = async (id, isActivate) => {
    console.log("myId", id, isActivate)
    console.log("isActivate", isActivate)
    const response = await axios({
      method: 'POST',
      url: `${backendUrl}/api/changeActivation/${userId}/${id}/${isActivate}`,
      headers: {
        'Authorization': token
      }
    });
    getData();
    setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/getVendor`);
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
    item.vendorName && item.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
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
        <title>Vendor Information - Claimpro</title>
        <meta name="description" content="Vendor Information Claimpro." />
        <meta name="keywords" content="Vehicle Accidents, accident trucks, vendor service, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
      </Helmet>
      <div className="header-container-search">
        <h3 className='bigtitle' style={{ marginLeft: "5px" }}>Vendor View / Edit</h3>

        <label className="form-field search-field">
          Search by Vendor Name
          <input
            type='text'
            placeholder="Search by Vendor Name"
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
      {alertInfo.show && (
        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
          {alertInfo.message}
        </Alert>
      )}
      <div className='responsive-table'>
        <table style={{ width: '90%', marginLeft: "10px", borderCollapse: 'collapse', marginBottom: "90px" }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Vendors Name</th>
              <th>Vendor Email</th>
              <th>Vendor Type</th>
              <th>Edited By</th>
              <th>View</th>
              <th>Active/Deactive</th>
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
                  <td>{item.vendorName}</td>
                  <td>{item.email}</td>
                  <td>{item.vendorType}</td>
                  <td>{item.EditedBy}</td>
                  <td>
                    <button onClick={() => view(item.id)} className='view-button'>View</button>
                  </td>
                  <td>
                    <td>
                      <button
                        onClick={() =>
                          handleConfirm(item.vendorCode, item.isActive === "true" ? "false" : "true")
                        }
                        className="deactivate-button"
                      >
                        <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={handleCancel} />
                        {item.isActive === "true" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
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

export default VendorApproved;
