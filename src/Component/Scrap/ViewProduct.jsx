import React, { useState, useEffect } from 'react';
import "../CustomerApporoved/CustomerApproved.css";
import '../AccidentVehicle/AccidentVehicle.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { useNavigate } from 'react-router-dom';
// '../../environment';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ClipLoader } from 'react-spinners';
import { Alert } from '@mui/material';
import ActivationModel from '../Visitors/ActivationModel';
import { Helmet } from 'react-helmet-async';
import VendorMasterEdit from '../VenderMaster/VendorMasterEdit';
import VendorPerformance from '../AAAAAAAAAAAAAAAAAA/VendorPerformnce';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DataTable from "react-data-table-component";
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EditScrapProduct from './EditScrapProduct';
import { Co2Sharp } from '@mui/icons-material';
import ProductRegister from './ProductRegsiter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductDetailsSeller from './ProductDetailsSeller';

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

// const ViewProduct = () => {
//     const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info', timestamp: null });
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [modalData, setModalData] = useState(null);
//     const [deleteData, setDeleteData] = useState(null);
//     const getDepartment = localStorage.getItem("department");
//     console.log("getDepartment", getDepartment)

//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [isGenerated, setIsGenerated] = useState(false);
//     const [generatedExcel, setGeneratedExcel] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [marginLeft, setMarginLeft] = useState('30px');
//     const [paddingLeft, setPaddingLeft] = useState('30px');

//     const [showVendorMasterEdit, setShowVendorMasterEdit] = useState(false);
//     const [showPerformance, setShowPerformance] = useState(false);
//     const [showVendorTable, setShowVendorTable] = useState(true);
//     const [showMap, setShowMap] = useState(false);


//     const [selectedId, setSelectedId] = useState(null);
//     const [selectedVendorCode, setSelectedVendorCode] = useState(null);
//     const [selectedVendorType, setSelectedVendorType] = useState(null);

//     const [sortDate, setSortDate] = useState("asc");
//     const [selectedRows, setSelectedRows] = useState([]);

//     const handleRowsSelected = (state) => {
//         setSelectedRows(state.selectedRows);
//     }

//     const conditionalRowStyles = [
//         {
//             when: (row) => selectedRows.some(selected => selected.id === row.id),
//             style: {
//                 backgroundColor: '#bdb6b6',
//             },
//         }
//     ];


//     console.log("selectedID", selectedId)
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     const [searchQuery, setSearchQuery] = useState('');

//     const tableCustomStyles = {
//         headRow: {
//             style: {
//                 color: '#ffff',
//                 backgroundColor: 'rgb(169 187 169)',
//                 fontWeight: "bold",
//                 fontSize: '13px'
//             },
//         },
//         pagination: {
//             style: {
//                 button: {
//                     background: 'none',
//                     boxShadow: "none"
//                 },
//             },
//         },
//         striped: {
//             style: {
//                 default: 'red'
//             }
//         },
//         rows: {
//             style: {
//                 backgroundColor: '#f2f2f2',
//             }
//         }
//     }

//     useEffect(() => {
//         if (!showVendorMasterEdit) getData();
//         if (token === "" || userId === "") {
//             console.log("NO USER ID AND NO TOKEN")
//         }
//     }, [token, userId, navigate, showVendorMasterEdit]);

//     useEffect(() => {
//         if (alertInfo.show) {
//             const timer = setTimeout(() => {
//                 setAlertInfo({ ...alertInfo, show: false });
//             }, 2000);
//             return () => clearTimeout(timer);
//         }
//     }, [alertInfo]);

//     const generateFile = async () => {
//         try {
//             setIsLoading(true);
//             const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vendorDBToExcel/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
//             setGeneratedExcel(response.data.data);
//             console.log("resoponse", response.data.data)
//             setIsLoading(false);
//             setIsGenerated(true);
//         } catch (error) {
//             setIsLoading(false);
//             console.error(error.message);
//         }
//     };

//     //   const handleConfirm = async (vendorCode, isActive) => {
//     //     await deactive(vendorCode, isActive);
//     //     setModalOpen(false);
//     //   };

//     const handleConfirmDelete = async (vendorCode) => {
//         await deleteVendor(vendorCode);
//         setModalOpen(false);
//     }

//     const handleCancel = () => {
//         setModalOpen(false);
//     };

//     const openModal = (item) => {
//         setModalData(item);
//         setModalOpen(true);
//     };

//     const openDeleteModal = (item) => {
//         setDeleteData(item);
//         setModalOpen(true);
//     }

//     //   const deactive = async (id, isActivate) => {
//     //     const response = await axios({
//     //       method: 'PUT',
//     //       url: `${process.env.REACT_APP_BACKEND_URL}/api/changeActivation/${userId}/${id}/${isActivate}`,
//     //       headers: {
//     //         'Authorization': `Bearer ${token}`
//     //       }
//     //     });
//     //     getData();
//     //     setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
//     //   };

//     const deleteVendor = async (id) => {
//         const response = await axios({
//             method: 'DELETE',
//             url: `${process.env.REACT_APP_BACKEND_URL}/api/deleteVendor/${userId}/${id}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         getData();
//         setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
//     };



//     const getData = async () => {
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/scrapProductById/${userId}`);
//         const fetchedData = response.data.data;
//         console.log("fetchedData", fetchedData)

//         const formattedData = fetchedData.map(item => ({
//             ...item,
//             systemDate: formatDate(item.systemDate),
//         }));
//         setData(formattedData);
//         setCurrentItems(formattedData);
//     };



//     const view = (id) => {
//         setSelectedId(id);
//         setShowVendorMasterEdit(true)
//         setShowPerformance(false)
//         setShowVendorTable(false)
//         setShowMap(false);

//     }
//     const handleMap = () => {
//         setShowVendorMasterEdit(false)
//         setShowPerformance(false)
//         setShowVendorTable(false);
//         setShowMap(true);
//     }

//     const viewPerformance = (id, type) => {
//         setSelectedVendorCode(id);
//         setSelectedVendorType(type);

//         console.log("DSFSDFFSDF")
//         setShowPerformance(true)
//         setShowVendorMasterEdit(false)
//         setShowVendorTable(false)
//         setShowMap(false);

//     }


//     const handleUpdate = () => {
//         setShowVendorMasterEdit(false);
//         setShowPerformance(false)
//         setShowVendorTable(true)
//         setShowMap(false);

//     };




//     // useEffect(() => {
//     //   const handleResize = () => {
//     //     if (window.innerWidth <= 630) {
//     //       setMarginLeft('0px');
//     //       setPaddingLeft('20px')
//     //     } else {
//     //       setMarginLeft('30px');
//     //       setPaddingLeft("40px")
//     //     }
//     //   };
//     //   window.addEventListener('resize', handleResize);

//     //   // Initial check
//     //   handleResize();

//     //   // Cleanup event listener on component unmount
//     //   return () => {
//     //     window.removeEventListener('resize', handleResize);
//     //   };
//     // }, []);

//     const [currentItems, setCurrentItems] = useState(data);

//     const columns = [
//         {
//             name: "SR.No",
//             selector: row => row.id, // Raw data for sorting
//             cell: row => <span>{String(row.id).padStart(4, '0')}</span>, // Display formatted value
//             sortable: true,
//             sortFunction: (rowA, rowB) => rowA.id - rowB.id, // Custom sort function
//             style: { width: "200px" }
//         },

//         {
//             name: "Date",
//             selector: (row) => row.systemDate,
//             sortable: true,
//             sortFunction: (rowA, rowB) => {
//                 const dateA = parseDate(rowA.systemDate);
//                 const dateB = parseDate(rowB.systemDate);
//                 return dateA - dateB;
//             },
//         },
//         {
//             name: "Name", selector: (row) => row.titleName, sortable: true, width: "150px",
//             cell: (row) => (
//                 <span style={{ color: 'brown' }}>{row.titleName.charAt(0).toUpperCase() + row.titleName.slice(1)}</span>
//             )
//         },
//         {
//             name: "Material", selector: (row) => row.material, sortable: true,
//             cell: (row) => (
//                 <span style={{ color: 'black' }}>
//                     {row.material ? row.material.charAt(0).toUpperCase() + row.material.slice(1).toLowerCase() : ""}
//                 </span>
//             ),
//         },
//         {
//             name: "Description", selector: (row) => row.description, sortable: true,
//             cell: (row) => (
//                 <span style={{ color: 'black' }}>
//                     {row.description ? row.description.charAt(0).toUpperCase() + row.description.slice(1).toLowerCase() : ""}
//                 </span>
//             ),
//         },

//         {
//             name: "Modified By",
//             selector: (row) => row.editedBy || '',
//             sortable: true,
//             cell: (row) => {
//                 const editedBy = row.editedBy ? String(row.editedBy) : "";
//                 return (
//                     <span style={{ color: "green" }}>
//                         {editedBy.charAt(0).toUpperCase() + editedBy.slice(1).toLowerCase()}
//                     </span>
//                 );
//             },
//         },

//         { name: "Added Date", selector: (row) => row.addedDate, sortable: true },
//         {
//             name: "Actions",
//             cell: (row) => (
//                 <button
//                     onClick={() => view(row.vendorCode)}
//                     className='view-button'
//                 >
//                     View
//                 </button>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//         },
//         {
//             name: "Delete",
//             cell: (row) => (
//                 <span
//                     onClick={() => openDeleteModal(row)}
//                     style={{ cursor: 'pointer' }}
//                 >
//                     <DeleteOutlineIcon />
//                 </span>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//         }

//     ];


//     const [searchValue, setSearchValue] = useState('');

//     const handleSearch = (e) => {
//         const value = e.target.value.toLowerCase();
//         setSearchValue(value);

//         const newRows = data.filter((row) => {
//             const formattedId = String(row.id).padStart(4, '0').toLowerCase(); // Make sure the formatted ID is lowercase
//             const searchLower = value; // Use the updated search value directly

//             const idValue = formattedId.includes(searchLower);
//             const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchLower);
//             const vendorNameValue = (row.vendorName ?? '').toLowerCase().includes(searchLower);
//             const emailValue = (row.email ?? '').toLowerCase().includes(searchLower);
//             const vendorPhoneValue = (row.vendorPhone ?? '').toLowerCase().includes(searchLower);
//             const vendorTypeValue = (row.vendorType ?? '').toLowerCase().includes(searchLower);
//             const editedByValue = (row.EditedBy ?? '').toLowerCase().includes(searchLower);
//             const districtValue = (row.district ?? '').toLowerCase().includes(searchLower);

//             return idValue || vendorPhoneValue || dateValue || vendorNameValue || emailValue || vendorTypeValue || editedByValue || districtValue;
//         });

//         setCurrentItems(newRows);
//     };


//     return (
//         <div>
//             <div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
//                 <Helmet>
//                     <title>Vendor Information - Claimpro</title>
//                     <meta name="description" content="Vendor Information Claimpro." />
//                     <meta name="keywords" content="Vehicle Accidents, accident trucks, vendor service, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist, Accidental repair, Motor Insurance claim, Advocate services, Crane service, On site repair, Accident Management" />
//                     <link rel='canonical' href={`https://claimpro.in/VendorApporoved`} />
//                 </Helmet>

//                 <div>
//                     <h3 className="bigtitle">Vendor View / Edit</h3>
//                     <div className="form-search">
//                         <label className='label-class'>
//                             Search by
//                             <input
//                                 type="search"
//                                 className="form-control-sm border ps-3"
//                                 placeholder="Search"
//                                 value={searchValue}
//                                 onChange={handleSearch}
//                             />
//                         </label>

//                         <label className="label-class" style={{ marginTop: "20px" }}>
//                             {!isGenerated && (
//                                 <div
//                                     className="form-control generate-button"
//                                     onClick={generateFile}
//                                 >
//                                     {isLoading ? (
//                                         <ClipLoader color="#4CAF50" loading={isLoading} />
//                                     ) : (
//                                         'Generate Excel File'
//                                     )}
//                                 </div>
//                             )}
//                             {isGenerated && (
//                                 <a
//                                     href={generatedExcel}
//                                     className="form-control download-link"
//                                 >
//                                     Download Excel File
//                                 </a>
//                             )}
//                             <div className='form-control generate-button' style={{ padding: "4px", border: "3px solid lightgreen", marginLeft: "10px" }} onClick={handleMap}>Vendor By Map</div>
//                         </label>


//                         <label className="label-class">
//                         </label>

//                     </div>
//                 </div>


//                 {alertInfo.show && (
//                     <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
//                         {alertInfo.message}
//                     </Alert>
//                 )}
//                 {/* <p
//           style={{
//             display: 'flex',
//             marginRight: "5px",
//             cursor: "pointer"
//           }}
//           onClick={sortDateFunc}
//         >
//           {sortDate == "asc" ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
//         </p> */}
//                 <div className="container d-flex justify-content-center " style={{ marginTop: "10px" }}>
//                     <div className="container my-5">
//                         <DataTable
//                             columns={columns}
//                             data={currentItems}
//                             fixedHeader
//                             pagination
//                             selectableRows
//                             onSelectedRowsChange={handleRowsSelected}
//                             conditionalRowStyles={conditionalRowStyles}
//                             customStyles={tableCustomStyles}
//                         />
//                     </div>
//                 </div>


//                 {/* {modalData && (
//             <ActivationModel
//               isOpen={isModalOpen}
//               onConfirm={() => handleConfirm(modalData.vendorCode, modalData.isActive === "true" ? "false" : "true")}
//               onCancel={handleCancel}
//             />
//           )} */}

//                 {deleteData && (
//                     <ActivationModel
//                         isOpen={isModalOpen}
//                         onConfirm={() => handleConfirmDelete(deleteData.vendorCode)}
//                         onCancel={handleCancel}
//                     />
//                 )}

//             </div>
//         </div>
//     );
// };

// export default ViewProduct;




const ViewProduct = ({onUpdate}) => {

    const [data, setData] = useState([])
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info', timestamp: null });
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const getDepartment = localStorage.getItem("department");
    console.log("getDepartment", getDepartment)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isGenerated, setIsGenerated] = useState(false);
    const [generatedExcel, setGeneratedExcel] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [marginLeft, setMarginLeft] = useState('30px');
    const [paddingLeft, setPaddingLeft] = useState('30px');
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [scrapCode, setScrapCode] = useState("")
    const [seeProduct, setSeeProduct] = useState(true);
    const [editingProduct, setEditingProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [seeDetails, setSeeDetails] = useState(false);

    const resetState = () => {
        setSeeProduct(false)
        setEditingProduct(false)
        setDeleteProduct(false)
        setSeeDetails(false)
        setAddProduct(false)
    }



    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/scrapProductByUser/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
        const fetchedData = response.data.data;
        console.log("fetchedData", fetchedData)

        const formattedData = fetchedData.map(item => ({
            ...item,
            systemDate: formatDate(item.systemDate),
        }));
        setData(formattedData);
        // setCurrentItems(formattedData);
    };

    const editProduct = (code) => {
        setScrapCode(code);
        resetState();
        setEditingProduct(true);
    }

    const viewDetails =(code)=>{
        setScrapCode(code);
        resetState();
        setSeeDetails(true);
    }

    const addingProduct = () => {
        resetState();
        setAddProduct(true);
    }

    console.log("seEDitingproduc", editingProduct)
    const comeToPage = () => {
        resetState();
        setSeeProduct(true);
        getData();
    }

    const handleBack = () => {
        onUpdate();
    }

    console.log("data", data)
    return (

        <div>
            {seeProduct && (
                <div>
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
            </div>
                    <div className="position-relative">
                        <button
                            className="btn btn-warning position-absolute"
                            style={{ right: '20px', justifyContent: 'flex-end' }}
                            onClick={() => {
                                addingProduct()
                            }}
                        >
                            Add Products
                        </button>
                    </div>
                    <div className='container' >
                        <div className='row'>
                            {data.length > 0 && data.map((item, index) => (
                                <div key={index} className='col-md-3 d-flex justify-content-center mb-4 mt-5'>
                                <div className="card shadow-lg rounded-3" style={{ width: '18rem' }}>
                                    <img
                                        src={item.scrapImage1}
                                        className="card-img-top rounded-top"
                                        alt="Scrap Item"
                                        style={{ objectFit: 'cover', height: '180px' }}
                                    />
                                    <div className="card-body" style={{ style: "#f4fff4" }}>
                                        <h5 className="card-title text-primary font-weight-bold">
                                            <i className="bi bi-box-seam"></i> {item.titleName}
                                        </h5>
                                        <hr />
                                        <p className="card-text" style={{ fontSize: '13px', marginBottom: "5px" }}>
                                            <strong style={{ fontSize: "14px", color: "#1306ee" }}>Current Price:</strong> ₹{item.prices}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '13px', marginBottom: "5px" }}>
                                            <strong style={{ fontSize: "14px", color: "green" }}>Available Quantity:</strong> {item.availableQty}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '13px', marginBottom: "5px" }}>
                                            <strong style={{ fontSize: "14px", color: "#7d7b00" }}>Description:</strong> {item.description}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '13px', marginBottom: "5px" }}>
                                            <strong style={{ fontSize: "14px", color: "darkred" }}>Material:</strong> {item.material}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                <span style={{ fontSize: "11px", marginTop: "10px" }}> <CalendarMonthOutlinedIcon /> Added On: {item.systemDate}</span>
                                            </small>
                                        </p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <button onClick={() => { viewDetails(item.scrapCode) }} className="btn btn-outline-primary btn-sm">
                                            <span style={{ fontSize: "11px" }}><ViewKanbanOutlinedIcon /> View Details</span>
                                        </button>
                                        <button onClick={() => { editProduct(item.scrapCode) }} className="btn btn-outline-warning btn-sm">
                                            <span style={{ fontSize: "11px" }}> <ModeEditOutlinedIcon /> Edit </span>
                                        </button>
                                        <a href="#" className="btn btn-outline-danger btn-sm">
                                            <span style={{ fontSize: "11px" }}> <DeleteOutlineOutlinedIcon /> Delete </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            ))}
                            </div></div>
                        </div>)}

                        {editingProduct && (
                            <div>
                                <EditScrapProduct code={scrapCode} onUpdate={comeToPage} />
                            </div>
                        )}
                        {addProduct && (
                            <div>
                                <ProductRegister onUpdate={comeToPage} />
                            </div>
                        )}
                        {seeDetails && (
                            <div>
                                <ProductDetailsSeller code={scrapCode} onUpdate={comeToPage} />
                            </div>
                        )}
                    </div>
                    )
}
                    export default ViewProduct;