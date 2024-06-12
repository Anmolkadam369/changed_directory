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


const Visitors = () => {

    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
    const [isClicked, setIsClicked] = useState(false)
    const [isOutClicked, setIsOutClicked] = useState(false)
    const [addVisitor, setAddVisitor] = useState(false)
    const [editVisitor, setEditVisitor] = useState(false)
    const [showTable, setShowTable] = useState(true)
    const [width, setWidth] = useState('100%');

    const [data, setdata] = useState([]);
    const [comingData, setComingData] = useState([]);
    const [currentTiming, setCurrentTiming] = useState("")

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
            setdata(response.data.data)
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = 'An error occurred';
        }
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
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
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
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
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

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 480) {
            // document.querySelector('.visitor-container').classList.add('mobile');
          } 
          if (window.innerWidth <= 630) {
            setWidth('60%');
          }
          else {
            // document.querySelector('.visitor-container').classList.remove('mobile');
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

            <Helmet>
                <title>Visitors Information - Claimpro</title>
                <meta name="description" content="Visitors Information For BVC Claimpro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/Visitors`} />
            </Helmet>
            {addVisitor && (
                <div>
                    <form onSubmit={handleSubmit} className="Customer-master-form" style={{width}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                            <h3 style={{fontSize: "25px" , fontWeight: "bold"}}>Visitors Form</h3>
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
                                <div className="form-control download-link">
                                    {formData.VisitorsEntry}
                                </div>
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
            <div className="Customer-master-form" style={{ padding: '20px', margin: '20px' }}>
    <div className="visitor-container">
      <h3 className="bigtitle">Visitor's Data</h3>
      <button onClick={add} className="add-button">
        Add New Visitor
      </button>
    </div>


                <div>
                    <div style={{ marginTop: "50px" }}>
                        <div className='responsive-table' style={{ width }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
                                <thead>
                                    <tr>
                                        <th>Sr. No</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone No</th>
                                        <th>Email Id</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Data...</td>
                                        </tr>
                                    ) : (
                                        data.map((person, index) => (
                                            <tr key={person} >
                                                <td>{index + 1}</td>
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
                    </div>
                </div>
            </div>)}

            {editVisitor && (
            
            <div>            
            <form className="Customer-master-form">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                    <h3 style={{fontSize: "25px" , fontWeight: "bold"}}>Visitors Edit Form</h3>
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
                        {!isClicked && (
                            <div
                                className="form-control generate-button"
                                // onClick={entryTimeEdit}
                                disabled
                            >
                                {isLoading ? (
                                    <ClipLoader color="#b3b3b3" loading={isLoading} />
                                ) : (
                                    <div>{editedFormData.VisitorsEntry}</div>

                                )}
                            </div>
                        )}
                        {isClicked && (
                            <div className="form-control download-link">
                                {editedFormData.VisitorsEntry}
                            </div>
                        )}
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

                    <label className="form-field">
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
                    </label>

                </div>

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



