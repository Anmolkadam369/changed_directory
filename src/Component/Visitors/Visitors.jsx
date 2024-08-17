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
import backendUrl from '../../environment';
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

    const [data, setdata] = useState([]);
    const [comingData, setComingData] = useState([]);
    const [currentTiming, setCurrentTiming] = useState("")


    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();
        return (`${day}-${month}-${year}`);
    }


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const handleSetItemPerPage = (e) => {
        setItemsPerPage(e.target.value);
    };
    const filteredData = data.filter(item =>
        item.VisitorFirstName && item.VisitorFirstName.toLowerCase().includes(searchQuery.toLowerCase())
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
            const response = await axios.get(`${backendUrl}/api/visitors`);
            console.log("modi",response.data.data)
            setdata(response.data.data)
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = 'An error occurred';
        }
    }

    const [sortDate, setSortDate] = useState("asc");

    const sortDateFunc = () => {
        setSortDate(sortDate == "asc" ? "desc" : "asc");
        const sortedItems = [...data].sort((a, b) => {
            const dateA = new Date(a.systemDate).getTime();
            const dateB = new Date(b.systemDate).getTime();
            return sortDate == "asc" ? dateA - dateB : dateB - dateA;
        });
        console.log("sodI", sortedItems);
        setdata(sortedItems)
    }

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
            const response = await axios.post(`${backendUrl}/api/visitors/${userId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
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
            const response = await axios.put(`${backendUrl}/api/visitors/${userId}/${editedFormData.visitorId}`, editedFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
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
        console.log(`${backendUrl}/api/visitors/${id}`)
        const response = await axios.get(`${backendUrl}/api/visitors/${id}`);
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
            else{
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

            <Helmet>
                <title>Visitors Information - Claimpro</title>
                <meta name="description" content="Visitors Information For BVC Claimpro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
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
                                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
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
                <div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
                    <div className="visitor-container">
                        <h3 className="bigtitle">Visitor's Data</h3>
                        <button onClick={add} className="add-button">
                            Add New Visitor
                        </button>
                    </div>
                    <div className="form-search" style={{ marginTop: "20px" }}>
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



                    <div>
                        <div style={{ marginTop: "50px" }}>
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
                            <div className='responsive-table'>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                    <thead>
                                        <tr>
                                            <th>Sr. No</th>
                                            <th>Date</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Phone No</th>
                                            <th>Email Id</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Data...</td>
                                            </tr>
                                        ) : (
                                            currentItems.map((person, index) => (
                                                <tr key={person} >
                                                    <td>{indexOfFirstItem + index + 1}</td>
                                                    <td>{formatDate(person.systemDate)}</td>
                                                    <td>{person.VisitorFirstName || '---'}</td>
                                                    <td>{person.VisitorLastName || '---'}</td>
                                                    <td>{person.phoneNo || '---'}</td>
                                                    <td>{person.email || '---'}</td>
                                                    <td>
                                                        <div>
                                                            <button onClick={() => view(person.visitorId)} className='view-button' >View</button>
                                                        </div>
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
                                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
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



