import React, { useState, useEffect, useRef } from 'react';
import '../VenderMaster/VendorMasterForm.css'
import "../CustomerApporoved/CustomerApproved.css"
import '../AccidentVehicle/AccidentVehicle.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
// '../../environment';
import { ClipLoader } from 'react-spinners';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
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

const Visitors = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [isClicked, setIsClicked] = useState(false)
    const [isOutClicked, setIsOutClicked] = useState(false)
    const [addVisitor, setAddVisitor] = useState(false)
    const [editVisitor, setEditVisitor] = useState(false)
    const [showTable, setShowTable] = useState(true)
    const [width, setWidth] = useState('100%');
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [comingData, setComingData] = useState([]);
    const [currentTiming, setCurrentTiming] = useState("")


    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowsSelected = (state) => {
        setSelectedRows(state.selectedRows);
    }

    const conditionalRowStyles = [
        {
            when: (row) => selectedRows.some(selected => selected.visitorId === row.visitorId),
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
                fontWeight: "bold",
                fontSize: '13px'
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
            style: {
                default: 'red'
            }
        },
        rows: {
            style: {
                backgroundColor: '#f2f2f2',
            }
        }
    }

    const [currentItems, setCurrentItems] = useState(data);
    console.log("HOMEDATA", currentItems)
    const columns = [
        {
            name: "Date",
            selector: (row) => row.systemDate,
            sortable: true,
            sortFunction: (rowA, rowB) => {
                const dateA = parseDate(rowA.systemDate);
                const dateB = parseDate(rowB.systemDate);
                return dateA - dateB;
            },
        },
        {
            name: "First Name", selector: (row) => row.VisitorFirstName, sortable: true, width: "150px",
            cell: (row) => (
                <span style={{ color: 'brown' }}>{row.VisitorFirstName.charAt(0).toUpperCase() + row.VisitorFirstName.slice(1)}</span>
            )
        },
        {
            name: "Last Name", selector: (row) => row.VisitorLastName, sortable: true, width: "150px",
            cell: (row) => (
                <span style={{ color: 'green' }}>{row.VisitorLastName.charAt(0).toUpperCase() + row.VisitorLastName.slice(1)}</span>
            )
        },
        {
            name: "Visitors Entry", selector: (row) => row.VisitorsEntry, sortable: true, width: "150px",
            cell: (row) => (
                <span style={{ color: '#fff', backgroundColor: '#ffc107', padding: '5px', borderRadius: '4px' }}>{row.VisitorsEntry.charAt(0).toUpperCase() + row.VisitorsEntry.slice(1)}</span>
            )
        },
        {
            name: "Visitors Out", selector: (row) => row.VisitorOut, sortable: true, width: "150px",
            cell: (row) => (
                <span style={{ color: '#fff', backgroundColor: '#ffc107', padding: '5px', borderRadius: '4px' }}>{row.VisitorOut ? row.VisitorOut.charAt(0).toUpperCase() + row.VisitorOut.slice(1):""}</span>
            )
        },
        {
            name: "Email", selector: (row) => row.email, sortable: true, width: "200px",
            cell: (row) => (
                <a href={`mailto:${row.email}`} style={{ color: "blue", textDecoration: "none" }}>
                    {row.email}
                </a>
            ),
        },
        {
            name: "Phone Number", selector: (row) => row.phoneNo, sortable: true,
            cell: (row) => (
                <span>
                    {row.phoneNo ? row.phoneNo.charAt(0).toUpperCase() + row.phoneNo.slice(1).toLowerCase() : ""}
                </span>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    onClick={() => view(row.visitorId)}
                    className='view-button'
                >
                    Edit Visitor's
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();

        const newRows = data.filter((row) => {
            const dateValue = (formatDate(row.systemDate) ?? '').toLowerCase().includes(searchValue);
            const VisitorFirstNameValue = (row.VisitorFirstName ?? '').toLowerCase().includes(searchValue);
            const emailValue = (row.email ?? '').toLowerCase().includes(searchValue);
            const phoneNoValue = (row.phoneNo ?? '').toLowerCase().includes(searchValue);
            const VisitorLastNameValue = (row.VisitorLastName ?? '').toLowerCase().includes(searchValue);

            return dateValue || VisitorFirstNameValue || emailValue || phoneNoValue || VisitorLastNameValue;
        });

        setCurrentItems(newRows);
    };



    const [editedFormData, setEditedFormData] = useState({
        systemDate: today,
        VisitorsEntry: '',
        VisitorFirstName: '',
        VisitorLastName: '',
        VisitorAddress: '',
        phoneNo: '',
        email: '',
        Reason: '',
        VisitorOut: '',
        visitorId: ""
    });



    console.log("today", today)

    const currentTimeNow = () => {
        const now = new Date();

        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        const strHours = String(hours).padStart(2, '0');
        const strMinutes = String(minutes).padStart(2, '0');
        const strSeconds = String(seconds).padStart(2, '0');
        return `${strHours}:${strMinutes}:${strSeconds} ${ampm}`
    }



    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            //   navigate("/");
        }
        getVisitor();
    }, [token, userId, navigate]);
    console.log("userIIIIIID", userId);

    useEffect(() => {
        if (comingData) {
            setEditedFormData({
                systemDate: comingData.systemDate || today,
                VisitorsEntry: comingData.VisitorsEntry || '',
                VisitorFirstName: comingData.VisitorFirstName || '',
                VisitorLastName: comingData.VisitorLastName || '',
                VisitorAddress: comingData.VisitorAddress || '',
                phoneNo: comingData.phoneNo || '',
                email: comingData.email || '',
                Reason: comingData.Reason || '',
                VisitorOut: comingData.VisitorOut || '',
                visitorId: comingData.visitorId || ''
            });
        }
    }, [comingData]);




    const [formData, setFormData] = useState({
        systemDate: today,
        VisitorsEntry: '',
        VisitorFirstName: '',
        VisitorLastName: '',
        VisitorAddress: '',
        phoneNo: '',
        email: '',
        Reason: '',
        VisitorOut: '',
    });

    console.log("formdata", formData)
    console.log("editedFormdata", editedFormData)


    const getVisitor = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            const fetchedData = response.data.data;

            const formattedData = fetchedData.map(item => ({
                ...item,
                systemDate: formatDate(item.systemDate),
            }));
            setData(formattedData);
            setCurrentItems(formattedData);
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = 'An error occurred';
        }
    }

    const [sortDate, setSortDate] = useState("asc");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditedFormData({ ...editedFormData, [name]: value });
    };


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNo = (phoneNo) => {
        const re = /^\d{10}$/;
        return re.test(String(phoneNo));
    };


    const handleSubmit = async (e) => {
        console.log("some")
        e.preventDefault();

        if (
            formData.VisitorsEntry === "" ||
            formData.VisitorFirstName === "" ||
            formData.VisitorLastName === "" ||
            formData.VisitorAddress === "" ||
            formData.email === "" ||
            formData.phoneNo === "" ||
            formData.Reason === ""
        ) {
            setAlertInfo({ show: true, message: 'Please fill all the details', severity: 'error' });
            return;
        }

        if (!validateEmail(formData.email)) {
            setAlertInfo({ show: true, message: 'Invalid email address', severity: 'error' });
            return;
        }

        if (!validatePhoneNo(formData.phoneNo)) {
            setAlertInfo({ show: true, message: 'Invalid phone number. It should be 10 digits.', severity: 'error' });
            return;
        }

        console.log('Form data submitted:', formData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/${userId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response", response.data);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

        } catch (error) {
            console.error("Error during form submission:", error);
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

    const editFormSubmit = async (e) => {
        console.log("some")
        e.preventDefault();

        if (
            editedFormData.VisitorsEntry === "" ||
            editedFormData.VisitorFirstName === "" ||
            editedFormData.VisitorLastName === "" ||
            editedFormData.VisitorAddress === "" ||
            editedFormData.email === "" ||
            editedFormData.phoneNo === "" ||
            editedFormData.Reason === "" ||
            editedFormData.VisitorOut == ""
        ) {
            setAlertInfo({ show: true, message: 'Please fill all the details', severity: 'error' });
            return;
        }

        if (!validateEmail(editedFormData.email)) {
            setAlertInfo({ show: true, message: 'Invalid email address', severity: 'error' });
            return;
        }

        if (!validatePhoneNo(editedFormData.phoneNo)) {
            setAlertInfo({ show: true, message: 'Invalid phone number. It should be 10 digits.', severity: 'error' });
            return;
        }

        console.log('Form data submitted:', editedFormData);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/${userId}/${editedFormData.visitorId}`, editedFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response", response.data);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

        } catch (error) {
            console.error("Error during form submission:", error);
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

    const entryTime = () => {
        const getTIme = currentTimeNow();
        const time = getTIme;
        setCurrentTiming(time);
        setFormData({ ...formData, VisitorsEntry: time });
        setIsClicked(!isClicked)
    }

    const outTime = () => {
        const getTIme = currentTimeNow();
        const time = getTIme;
        setCurrentTiming(time);
        setFormData({ ...formData, VisitorOut: time });
        setIsOutClicked(!isOutClicked)
    }

    const entryTimeEdit = () => {
        const getTIme = currentTimeNow();
        const time = getTIme;
        setEditedFormData({ ...editedFormData, VisitorsEntry: time });
        setIsClicked(!isClicked)
    }

    const outTimeEdit = () => {
        const getTIme = currentTimeNow();
        const time = getTIme;
        setEditedFormData({ ...editedFormData, VisitorOut: time });
        setIsOutClicked(!isOutClicked)
    }

    const view = async (id) => {
        console.log("id", id);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/${id}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
        console.log("daa", response.data.data)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
        setAddVisitor(false)
        setEditVisitor(true)
        setShowTable(false)
    }

    const add = () => {
        const getTIme = currentTimeNow();
        setAddVisitor(true)
        setEditVisitor(false)
        setShowTable(false)
        setFormData({
            systemDate: today,
            VisitorsEntry: getTIme,
            VisitorFirstName: '',
            VisitorLastName: '',
            VisitorAddress: '',
            phoneNo: '',
            email: '',
            Reason: '',
            VisitorOut: '',
        });
    }

    const closeAddVisitor = () => {
        setAddVisitor(false)
        setEditVisitor(false)
        setShowTable(true)
        getVisitor()
    }

    const closeEditVisitor = () => {
        setAddVisitor(false)
        setEditVisitor(false)
        setShowTable(true)
        getVisitor()
    }
    const [marginLeft, setMarginLeft] = useState('20px');
    const [paddingLeft, setPaddingLeft] = useState('20px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 630) {
                setMarginLeft('0px');
                setPaddingLeft('10px')
            }
            else {
                setMarginLeft('20px');
                setPaddingLeft('20px')
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
            <Admin/>
            <Helmet>
                <title>Visitors Information - Claimpro</title>
                <meta name="description" content="Visitors Information For BVC Claimpro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services, Hydra Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/Visitors`} />
            </Helmet>
            {addVisitor && (
                <div>
                    <form onSubmit={handleSubmit} className="Customer-master-form" >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "25px", fontWeight: "bold" }}>Add Visitor</h3>
                            <button onClick={closeAddVisitor} style={{ padding: '0px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'black', background: "white" }}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="form-row">
                            <label className="form-field">
                                System Date:
                                <input
                                    type="date"
                                    name="systemDate"
                                    value={formData.systemDate}
                                    onChange={handleChange}
                                    readOnly
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field">
                                Entry Time:
                                <input
                                    type="text"
                                    name="VisitorsEntry"
                                    value={formData.VisitorsEntry}
                                    className="form-control"
                                    readOnly
                                />
                            </label>


                            <label className="form-field">
                                Visitors First Name:
                                <input
                                    type="text"
                                    name="VisitorFirstName"
                                    placeholder=' Name'
                                    value={formData.VisitorFirstName}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </label>

                            <label className="form-field">
                                Visitors Last Name:
                                <input
                                    type="text"
                                    name="VisitorLastName"
                                    placeholder=' Name'
                                    value={formData.VisitorLastName}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </label>

                            <label className="form-field">
                                Address  :
                                <textarea
                                    name="VisitorAddress"
                                    value={formData.VisitorAddress}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    placeholder='Address' />
                            </label>

                            <label className="form-field">
                                Phone Number:
                                <input
                                    type='tel'
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    placeholder=' Phone No'
                                    required
                                    pattern="\d{10}"
                                    title="Phone number must be exactly 10 digits"
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field">
                                E-Mail:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='E-Mail'
                                    required
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="Please enter a valid email address."
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field">
                                Reason  :
                                <textarea
                                    name="Reason"
                                    value={formData.Reason}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    placeholder='Reason' />
                            </label>

                        </div>

                        {alertInfo.show && (
                            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                {alertInfo.message}
                            </Alert>
                        )}

                        <div style={{ textAlign: 'center' }}>
                            <button type="submit"
                                style={{                     fontSize: "14px",
                    padding: "5px 20px",
                    border: "3px solid lightblue",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "green",}}
                                disabled={isLoading} // Disable button while loading
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

                    </form>
                </div>
            )}

            {showTable && (
                <div className="Customer-master-form" style={{ marginLeft: '10px', paddingLeft: '0px', marginRight: '10px', paddingRight: '0px' }}>
                    <div className="visitor-container">
                        <h3 className="bigtitle">Visitor's Data</h3>
                        <button onClick={add} className="add-button">
                            Add New Visitor
                        </button>
                    </div>
                    <div className="form-search" style={{ marginTop: "20px" }}>
                        <label className='label-class'>
                            Search by
                            <input
                                type="text"
                                placeholder="Search by "
                                onChange={handleSearch}
                                required
                            />
                        </label>

                        <label className='label-class'></label>
                    </div>

                    <div>
                        <div style={{ marginTop: "50px" }}>
                            <div className="container d-flex justify-content-center " style={{ marginTop: "10px" }}>
                                <div className="container my-5">
                                    <DataTable
                                        columns={columns}
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

                        </div>
                    </div>
                </div>)}

            {editVisitor && (

                <div>
                    <form className="Customer-master-form">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "25px", fontWeight: "bold" }}>Visitors Edit Form</h3>
                            <button onClick={closeAddVisitor} style={{ padding: '0px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'black', background: "white" }}>
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="form-row">
                            <label className="form-field">
                                System Date:
                                <input
                                    type="date"
                                    name="systemDate"
                                    value={editedFormData.systemDate}
                                    onChange={handleChangeEdit}
                                    readOnly
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field">
                                Entry Time:
                                <input
                                    type="text"
                                    name="VisitorsEntry"
                                    value={editedFormData.VisitorsEntry}
                                    className="form-control"
                                    readOnly
                                />
                            </label>

                            <label className="form-field">
                                Visitors First Name:
                                <input
                                    type="text"
                                    name="VisitorFirstName"
                                    placeholder=' Name'
                                    value={editedFormData.VisitorFirstName}
                                    onChange={handleChangeEdit}
                                    className="form-control"
                                    required
                                />
                            </label>

                            <label className="form-field">
                                Visitors Last Name:
                                <input
                                    type="text"
                                    name="VisitorLastName"
                                    placeholder=' Name'
                                    value={editedFormData.VisitorLastName}
                                    onChange={handleChangeEdit}
                                    className="form-control"
                                    required
                                />
                            </label>
                        </div>

                        <div className="form-row">
                            <label className="form-field">
                                Address  :
                                <textarea
                                    name="VisitorAddress"
                                    value={editedFormData.VisitorAddress}
                                    onChange={handleChangeEdit}
                                    required
                                    className="form-control"
                                    placeholder='Address' />
                            </label>

                            <label className="form-field">
                                Phone Number:
                                <input
                                    type='tel'
                                    name="phoneNo"
                                    value={editedFormData.phoneNo}
                                    onChange={handleChangeEdit}
                                    placeholder=' Phone No'
                                    required
                                    pattern="\d{10}"
                                    title="Phone number must be exactly 10 digits"
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field">
                                E-Mail:
                                <input
                                    type="email"
                                    name="email"
                                    value={editedFormData.email}
                                    onChange={handleChangeEdit}
                                    placeholder='E-Mail'
                                    required
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="Please enter a valid email address."
                                    className="form-control"
                                />
                            </label>

                            <label className="form-field">
                                Reason  :
                                <textarea
                                    name="Reason"
                                    value={editedFormData.Reason}
                                    onChange={handleChangeEdit}
                                    required
                                    className="form-control"
                                    placeholder='Reason' />
                            </label>
                        </div>

                        <div className="form-row">
                            <label className='form-field'>
                                Out Time :
                                <input
                                    type="text"
                                    name="VisitorOut"
                                    onClick={outTimeEdit}
                                    value={editedFormData.VisitorOut}
                                    className="form-control"
                                    readOnly
                                />
                            </label>
                            <label className='form-field'></label>
                            <label className='form-field'></label>
                            <label className='form-field'></label>
                        </div>

                        {/* <label className="form-field">
                                Out Time :
                                {!isOutClicked && (
                                    <div
                                        className="form-control generate-button"
                                        onClick={outTimeEdit}
                                        name="VisitorOut"
                                        value={editedFormData.VisitorOut}
                                        onChange={handleChangeEdit}

                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#b3b3b3" loading={isLoading} />
                                        ) : (
                                            'Out Time'
                                        )}
                                    </div>
                                )}
                                {isOutClicked && (
                                    <div className="form-control download-link">
                                        {editedFormData.VisitorOut}
                                    </div>
                                )}
                            </label> */}


                        {alertInfo.show && (
                            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                {alertInfo.message}
                            </Alert>
                        )}

                        <div style={{ textAlign: 'center' }}>
                            <button type="submit" onClick={editFormSubmit}
                                style={{                     fontSize: "14px",
                    padding: "5px 20px",
                    border: "3px solid lightblue",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "green",}}
                                disabled={isLoading} // Disable button while loading
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

                    </form>
                </div>
            )}


        </div>



    )
}
export default Visitors;



