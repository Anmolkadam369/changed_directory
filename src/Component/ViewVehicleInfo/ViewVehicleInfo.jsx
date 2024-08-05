import React, { useState, useEffect } from 'react';
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
import { Helmet } from 'react-helmet-async';
import VehicleClaimEdit from '../VehicleClaimRegistration/VehicleClaimEdit';
import ImageUpload from "../ImageUpload/ImageUpload"

const ViewVehicleInfo = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let [itemsPerPage, setItemsPerPage] = useState(10)
  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState('');
  const [width, setWidth] = useState('100%');


  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedExcel, setGeneratedExcel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');

  const [showMainContent, setShowMainContent] = useState(true)
  const [showEditVehicleInfo, setShowEditVehicleInfo] = useState(false)
  const [showUploadImage, setShowUploadImage] = useState(false)

  const [selectedId, setSelectedId] = useState(null);
  const [selectedUploadId, setSelectedUploadId] = useState(null);


  useEffect(() => {
    if (showMainContent) getData();
    // generateToken();   
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showMainContent]);


  const generateFile = async () => {
    try {
      setIsLoading(true);
      console.log(userId)
      const response = await axios.get(`${backendUrl}/api/registerDBToExcel/${userId}`);
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {

        setWidth('55%');
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
    setSelectedId(id);
    setShowEditVehicleInfo(true)
    setShowMainContent(false)
    setShowUploadImage(false)
    // navigate("../VehicleClaimEdit", { state: { id } });
  }

  const handleUpdate = () => {
    setShowEditVehicleInfo(false); // Hide VendorMasterEdit
    setShowMainContent(true)
    setShowUploadImage(false)
  };

  function upload(id) {
    console.log("myId", id)
    setSelectedUploadId(id);
    setShowEditVehicleInfo(false)
    setShowMainContent(false)
    setShowUploadImage(true)
    // navigate("../ImageUpload", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${backendUrl}/api/vehicleClaim`);
    console.log("response", response.data.data);
    setData(response.data.data)
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };
  const handleSetItemPerPage = (e) => {
    setItemsPerPage(e.target.value);
  };
  const filteredData = data.filter(item =>
    item.district && item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.insuredBy && item.insuredBy.toLowerCase().includes(searchQuery.toLowerCase())

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

  console.log("dddddddddddddddddddd", data.data)
  return (
    <div>
      {showMainContent && (<div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
        <Helmet>
          <title>Accident Vehicle Infomation - Claimpro</title>
          <meta name="description" content="Accident Vehicle Infomation" />
          <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
          <link rel='canonical' href={`https://claimpro.in/ViewVehicleInfo`} />
        </Helmet>

        <div>
          <h3 className="bigtitle">Accident Vehicle View / Edit</h3>
          <div className="form-search">
            <label className='label-class'>
              Search by District Name
              <input
                type="text"
                placeholder="Search by District Name"
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
        <div className='responsive-table' style={{ width }}>
          <table style={{ width: '100%', marginLeft: '20px', borderCollapse: 'collapse', marginBottom: '90px' }}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Reason</th>
                <th>intimated Date</th>
                <th>District</th>
                <th>Insured By</th>
                <th>Accident No</th>
                <th>View</th>
                <th>Upload Photos</th>
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
                    <td>{item.reason || "---"}</td>
                    <td>{item.intimatedDate || "---"}</td>
                    <td>{item.district || "---"}</td>
                    <td>{item.insuredBy || "---"}</td>
                    <td>{item.accidentFileNo || "---"}</td>
                    <td>
                      <button onClick={() => view(item.AccidentDataCode)} className="view-button">View</button>
                    </td>
                    <td>
                      <button onClick={() => upload(item.accidentFileNo)} className="view-button">Upload</button>
                    </td>
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
      </div>)}
      {showEditVehicleInfo && (
        <VehicleClaimEdit id={selectedId} onUpdate={handleUpdate} />
      )}
      {showUploadImage && (
        <ImageUpload id={selectedUploadId} onUpdate={handleUpdate} />
      )}
    </div>
  );

};

export default ViewVehicleInfo;
