import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
// '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import VehicleClaimEdit from '../VehicleClaimRegistration/VehicleClaimEdit';
import ImageUpload from "../ImageUpload/ImageUpload"
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DataTable from "react-data-table-component";
import Admin from '../Admin/Admin';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; 
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
};


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
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowsSelected = (state) => {
    setSelectedRows(state.selectedRows);
  }

  const conditionalRowStyles = [
    {
      when: (row) => selectedRows.some(selected => selected.accidentFileNo === row.accidentFileNo),
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/registerDBToExcel/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
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
    setSelectedId(id);
    setShowEditVehicleInfo(true)
    setShowMainContent(false)
    setShowUploadImage(false)
    navigate("/vehicle-claim-edit", { state: { id } });
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
    navigate("/daily-image-upload", { state: { id } });
  }

  const getData = async (e) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vehicleClaim`);
    const fetchedData = response.data.data;
    const formattedData = fetchedData.map(item => ({
      ...item,
      accidentDate: item.accidentDate? formatDate(item.accidentDate) : "",
    }));
    setData(formattedData);
    setCurrentItems(formattedData);
  };

  const [currentItems, setCurrentItems] = useState(data);
  const columns = [
    {
      name: "Date",
      selector: (row) => row.accidentDate,
      sortable: true,
    
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.accidentDate);
        const dateB = parseDate(rowB.accidentDate);
        return dateA - dateB; // Ascending order
      },
    },
    { name: "Customer Name", selector: (row) => row.customerName, sortable: true ,
      cell: (row) => (
        <span style={{color:'brown'}}>{row.customerName ? row.customerName.charAt(0).toUpperCase() + row.customerName.slice(1):""}</span>
      )
    },
    { name: "Reason Of Accident", selector: (row) => row.reason, sortable: true ,width:'200px',
      cell: (row) => (
      <span style={{color:'green'}}>
        {row.reason}
      </span>
    ),},  
    { name: "Vehicle No", selector: (row) => row.vehicleNo, sortable: true,width:"120px",
      cell: (row) => (
        <span style={{color: '#fff', backgroundColor: '#ffc107', padding: '5px 10px 5px 10px', borderRadius: '4px'}}>
            {row.vehicleNo ? row.vehicleNo.toUpperCase() : ""}
        </span>
      ),
    },
    { name: "Accident File No", selector: (row) => row.accidentFileNo, sortable: true,width:'200px',
      cell: (row) => (
        <span style={{color: 'black', border:"1px solid red",width:"150px", padding: '5px', borderRadius: '4px', margin:"5px"}}>
            {row.accidentFileNo ? row.accidentFileNo.toUpperCase() : ""}
        </span>
      ),
    },
    { name: "Insurance Company", selector: (row) => row.insuredBy, sortable: true },
    { name: "District", selector: (row) => row.district, sortable: true,
      cell: (row) => (
        <span style={{color:'blue'}}>{row.district ? row.district.charAt(0).toUpperCase() + row.district.slice(1):""}</span>
      )
     },
    { name: "Actions",
      cell: (row) => (
        <button
          onClick={() => view(row.AccidentDataCode)}
          className='view-button'
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: "Upload Images",
      cell: (row) => (
        <button
          onClick={() => upload(row.accidentFileNo)}
          className='view-button'
          style={{ background: 'rgb(190 98 98)', color: "white" }}
        >
         Upload
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
  
    const newRows = data.filter((row) => {
      const dateValue = (formatDate(row.accidentDate) ?? '').toLowerCase().includes(searchValue);
      const customerNameValue = (row.customerName ?? '').toLowerCase().includes(searchValue);
      const reasonValue = (row.reason ?? '').toLowerCase().includes(searchValue);
      const vehicleNoValue = (row.vehicleNo ?? '').toLowerCase().includes(searchValue);
      const districtValue = (row.district ?? '').toLowerCase().includes(searchValue);
      const insuredByValue = (row.insuredBy ?? '').toLowerCase().includes(searchValue);

      return dateValue || customerNameValue || reasonValue || vehicleNoValue || districtValue || insuredByValue;

    });
  
    setCurrentItems(newRows);
  };

  return (
    <div>
      <Admin/>
      {showMainContent && (<div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px'}}>
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
              Search by 
              <input
                type="text"
                placeholder="Search by "
                onChange={handleSearch}
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

            <label className='label-class'></label>
          </div>
        </div>

        <div className="container d-flex justify-content-center " style={{marginTop:"10px"}}>
            <div className="container-for-tables my-5">
              <DataTable
                  columns={columns}g
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

      </div>)}
      {/* {showEditVehicleInfo && (
        <VehicleClaimEdit id={selectedId} onUpdate={handleUpdate} />
      )} */}
      {/* {showUploadImage && (
        <ImageUpload id={selectedUploadId} onUpdate={handleUpdate} />
      )} */}
    </div>
  );

};

export default ViewVehicleInfo;
