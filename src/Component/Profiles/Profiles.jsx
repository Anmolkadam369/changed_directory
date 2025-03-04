import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; // Make sure to install this package
import './Profiles.css'
// '../../environment';
import axios from 'axios';
import { Alert } from '@mui/material';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};
const Profiles = ({ id, onUpdate }) => {
    const [getData, setGetData] = useState({});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    const [edittingProfile, setEdittingProfile] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    useEffect(() => {
        loadStates();
    }, [])

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error('Error loading states:', error);
                setIsLoadingStates(false);
            });
    }

    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Error loading cities:', error);
                setIsLoadingCities(false);
            });
    };

    useEffect(() => {
        if (getData) {
            setEditProfile(prevEditProfile => ({
                ...prevEditProfile,
                vendorName: getData.vendorName || "",
                vendorType: getData.vendorType || "",
                state: getData.state || "",
                district: getData.district || "",
                email: getData.email || "",
                addedBy: getData.addedBy || "",
                contactPerson: getData.contactPerson || "",
                contactPersonNum: getData.contactPersonNum || "",
                rate: getData.rate || ""
            }))
        }
    }, [getData])

    const [editProfile, setEditProfile] = useState({
        vendorName: "",
        vendorType: "",
        state: "",
        district: "",
        email: "",
        addedBy: "",
        contactPerson: "",
        contactPersonNum: "",
        rate: ""
    });


    useEffect(() => {
        findUserById(id)
    }, [id])

    const findUserById = async (id) => {
        console.log("HEY", id)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}}/api/findByIdForVendor/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        console.log("daa", response.data)
        console.log("data12345", response.data.data[0]);
        setGetData(response.data.data[0]);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'state') {
            loadCities(value);
            setEditProfile(prevState => ({
                ...prevState,
                [name]: value,
                district: "",
            }));
        }
        if (name === "contactPersonNum") {
            console.log("phonenois", value)
            let updatedValue = value.replace(/\D/g, ''); // Remove non-digit characters
            if (updatedValue && updatedValue[0].match(/[6-9]/)) {
                updatedValue = updatedValue.slice(0, 10); // Only keep up to 10 digits if it starts with 6-9
            } else {
                updatedValue = ''; // Return an empty string if the first digit isn't between 6-9
            }
            setEditProfile(prevState => ({
                ...prevState,
                [name]: updatedValue
            }))
        }

        if (name === "rate") {
            let updatedValue = value.replace(/\D/g, ''); // Remove non-digit characters
            if (updatedValue) {
                updatedValue = updatedValue.slice(0, 10); // Only keep up to 10 digits if it starts with 6-9
            } else {
                updatedValue = ''; // Return an empty string if the first digit isn't between 6-9
            }
            setEditProfile(prevState => ({
                ...prevState,
                [name]: updatedValue
            }))
        }

        else if (name === 'email') {
            if (!emailPattern.test(value)) {
                setEmailError('Invalid email address');
            } else {
                setEmailError('');
            }
            setEditProfile(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        else {
            setEditProfile(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    console.log("editProfile.vendorName", editProfile.vendorName)
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(editProfile.email)) {
            setAlertInfo({ show: true, message: 'Please Enter Valid Email', severity: 'error' });
            return;
        }
        setIsLoading(true);


        console.log('Form data submitted:', editProfile);
        const editProfileObj = new FormData();
        for (const key in editProfile) {
          if (editProfile[key] !== undefined && editProfile[key] !== null && editProfile[key] !== "") {
            if (editProfile[key] instanceof File) {
              editProfileObj.append(key, editProfile[key], editProfile[key].name);
            } else {
              if (key === 'rate' && editProfile[key] === "") {
                editProfileObj.append(key, "0");
              } else {
                editProfileObj.append(key, editProfile[key]);
              }
            }
          }
        }
        let response;

        for (let pair of editProfileObj.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }
    
        try {
          response = await axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BACKEND_URL}/api/venderUpdate/${id}/${userId}`,
            data: editProfileObj,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("response", response.data);
          setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

          setIsLoading(false);
          setTimeout(() => {
            onUpdate();
          }, 2000);
        } catch (error) {
          console.error("Error during form submission:", error);
          setIsLoading(false);
          const errorMessage = error.response?.data?.message || 'An error occurred';
          if (errorMessage === "jwt expired") {
            setAlertInfo({show:true, message : "Your session has expired. Redirecting to login...", severity : 'error'});
            
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          } else {
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
          }
        }
      };

      const handleBack = () => {
        onUpdate()
    }

    return (
        <div className="container bootstrap snippets bootdey">
            <div className="row">
                <div className="profile-nav col-md-3">
                    <div className="panel" style={{ width: "200px" }}>
                        <div className="user-heading round">
                            <a href="#">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                            </a>
                            <p style={{ margin: "10px 0px 10px 0px" }}>{getData.vendorName}</p>
                            <h3 style={{ color: 'orange' }}>{getData.vendorType}</h3>

                        </div>

                        <ul className='profile-view-edit'>
                            <li className="active">
                                <a href="#" onClick={() => setEdittingProfile(false)}><i style={{ marginLeft: "5px" }} className="fa fa-user"></i> Profile</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => setEdittingProfile(true)}><i className="fa fa-edit"></i> Edit profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="profile-info col-md-9">
                    <div className="panel">
                    </div>
                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <h2 className='bigtitle'>Vendor Personal Information</h2>
                </div>

                    <div className="panel">
                        {!edittingProfile && (<div className="panel-body bio-graph-info p-4 mt-4" style={{ border: "3px solid #134504", borderRadius: "50px 10px 10px 10px" }}>
                            <div className="row">
                                <div className="bio-row">
                                    <p><span>Vendor Name </span>:  {getData.vendorName} </p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>Vendor Type </span>: {getData.vendorType}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>State: </span>: {getData.state}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>district : </span>: {getData.district}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>Created By </span>: {getData.addedBy}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>Email </span>: {getData.email}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>Contact Person </span>: {getData.contactPerson}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>Mobile </span>: {getData.contactPersonNum}</p>
                                    <hr />
                                </div>
                                <div className="bio-row">
                                    <p><span>Rate </span>: {getData.rate}</p>
                                    <hr />
                                </div>
                            </div>
                        </div>)}
                        {edittingProfile && editProfile != {} && (
                            <div className="panel-body bio-graph-info p-4 mt-4" style={{ border: "3px solid #134504", borderRadius: "50px 10px 10px 10px" }}>
                                <h1 style={{ textDecoration: "underline" }}>EDITING MODE</h1>
                                <div className="row">
                                    <div className="bio-row">
                                        <p style={{ display: 'flex', gap: "20px", alignItems: 'center' }}>
                                            <span>Vendor Name </span>:
                                            <input
                                                type="text"
                                                name="vendorName"
                                                value={editProfile.vendorName} // Use state value here
                                                onChange={handleInputChange}   // Handle the change
                                                style={{ backgroundColor: "#ffffff00", width: '200px' }}
                                            />
                                        </p>
                                        <hr />
                                    </div>

                                    <div className="bio-row" >
                                        <p style={{ display: 'flex', gap: "20px", alignItems: 'center' }}>
                                            <span>Vendor Type </span>:
                                            <input
                                                type="text"
                                                name="vendorType"
                                                value={editProfile.vendorType} // Use state value here
                                                onChange={handleInputChange}   // Handle the change
                                                style={{ backgroundColor: "#ffffff00" }}
                                            />
                                        </p>
                                        <hr />
                                    </div>
                                    <div className="bio-row">
                                        <p><span>State: </span>:
                                            <select
                                                style={{ backgroundColor: "#ffffff00" }}
                                                name="state"
                                                onChange={handleInputChange}
                                                disabled={isLoadingStates}
                                                value={editProfile.state}>

                                                <option value="">Select State</option>
                                                {states.map(state => (
                                                    <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                                ))}
                                            </select></p>
                                        <hr />
                                    </div>
                                    <div className="bio-row">
                                        <p><span>district : </span>:
                                            <select
                                                style={{ backgroundColor: "#ffffff00" }}
                                                name="district"
                                                value={editProfile.district} // This should match city.iso2
                                                onChange={handleInputChange}
                                                disabled={isLoadingCities || !editProfile.state}
                                            >
                                                <option value="">Select City</option>
                                                {!cities.error && cities.map(city => {
                                                    console.log('Rendering city:', city.iso2, city.name); // Debug: Check city values
                                                    return (
                                                        <option key={city.iso2} value={city.iso2}>
                                                            {city.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </p>
                                        <hr />
                                    </div>

                                    <div className="bio-row">
                                        <p style={{ display: 'flex', gap: '20px', alignItems: 'center' }}><span>Email: </span>:
                                            <input
                                                type="text"
                                                name="email"
                                                value={editProfile.email}
                                                onChange={handleInputChange}
                                                style={{ backgroundColor: "#ffffff00" }}
                                            />
                                        </p>
                                        <hr />
                                    </div>
                                    {emailError && <div style={{ color: 'red', marginTop: '5px' }}>{emailError}</div>}

                                    <div className="bio-row">
                                        <p style={{ display: 'flex', gap: '20px', alignItems: 'center' }}><span>Contact Person: </span>:
                                            <input
                                                type="text"
                                                name="contactPerson"
                                                value={editProfile.contactPerson}
                                                onChange={handleInputChange}
                                                style={{ backgroundColor: "#ffffff00" }}
                                            />
                                        </p>
                                        <hr />
                                    </div>
                                    <div className="bio-row">
                                        <p style={{ display: 'flex', gap: '20px', alignItems: 'center' }}><span>Mobile: </span>:
                                            <input
                                                type="tel"
                                                name="contactPersonNum"
                                                value={editProfile.contactPersonNum}
                                                onChange={handleInputChange}
                                                style={{ backgroundColor: "#ffffff00" }}
                                                maxLength="10"
                                            />
                                        </p>
                                        <hr />
                                    </div>
                                    <div className="bio-row">
                                        <p style={{ display: 'flex', gap: '20px', alignItems: 'center' }}><span>Rate: </span>:
                                            <input
                                                type="text"
                                                name="rate"
                                                value={editProfile.rate}
                                                onChange={handleInputChange}
                                                style={{ backgroundColor: "#ffffff00" }}
                                            />
                                        </p>
                                        <hr />
                                    </div>
                                    {alertInfo.show && (
                                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                            {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                                        </Alert>
                                    )}
                                    <button type="button" style={{ marginRight: '10px' }} className="btn btn-dark btn-lg" data-mdb-ripple-color="dark" onClick={handleSubmit} >
                                        Update
                                    </button>
                                </div>
                            </div>)}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;
