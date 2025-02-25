import React, { useState, useEffect, useRef } from 'react';
import '../VenderMaster/VendorMasterForm.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenState, userIdState } from '../Auth/Atoms';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import backendUrl from '../../environment';
import { ClipLoader } from 'react-spinners'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from 'react-modal';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Admin from '../Admin/Admin';


const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};;

const EmployeeFormEdit = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const state = useLocation();
    const today = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [comingData, setComingData] = useState([]);
    const location = useLocation();
    // const { id } = location.state || {};
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

    const toggleStatusDropdown = () => setShowStatusDropdown(!showStatusDropdown);
    const toggleDepartmentDropdown = () => setShowDepartmentDropdown(!showDepartmentDropdown);

    const handleStatusSelect = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            maritalStatus: value
        });
        setShowStatusDropdown(false); // Close dropdown after selection
    };
    const handleDepartmentSelect = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            department: value
        });
        setShowDepartmentDropdown(false); // Close dropdown after selection
    };

    const [marginLeft, setMarginLeft] = useState('30px');
    const [paddingLeft, setPaddingLeft] = useState('30px');


    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [IsReadOnly, setIsReadOnly] = useState(true);

    const [isProfilePictureModalOpen, setisProfilePictureModalOpen] = useState(false);
    const openProfilePictureModal = () => {
        setisProfilePictureModalOpen(true);
    };
    const closeProfilePictureModal = () => {
        setisProfilePictureModalOpen(false);
    };

    const [isadharFrontModalOpen, setisadharFrontModalOpen] = useState(false);
    const openadharFrontModal = () => {
        setisadharFrontModalOpen(true);
    };
    const closeadharFrontModal = () => {
        setisadharFrontModalOpen(false);
    };

    const [isadharBackModalOpen, setisadharBackModalOpen] = useState(false);
    const openadharBackModal = () => {
        setisadharBackModalOpen(true);
    };
    const closeadharBackModal = () => {
        setisadharBackModalOpen(false);
    };

    const [isPanFrontModalOpen, setisPanFrontModalOpen] = useState(false);
    const openPanFrontModal = () => {
        setisPanFrontModalOpen(true);
    };
    const closePanFrontModal = () => {
        setisPanFrontModalOpen(false);
    };

    const [ismatricPassingCertModalOpen, setismatricPassingCertModalOpen] = useState(false);
    const openmatricPassingCertModal = () => {
        setismatricPassingCertModalOpen(true);
    };
    const closematricPassingCertModal = () => {
        setismatricPassingCertModalOpen(false);
    };

    const [istenandtwoPassingCertModalOpen, setistenandtwoPassingCertModalOpen] = useState(false);
    const opentenandtwoPassingCertModal = () => {
        setistenandtwoPassingCertModalOpen(true);
    };
    const closetenandtwoPassingCertModal = () => {
        setistenandtwoPassingCertModalOpen(false);
    };

    const [isuGPassingCertModalOpen, setisuGPassingCertModalOpen] = useState(false);
    const openuGPassingCertModal = () => {
        setisuGPassingCertModalOpen(true);
    };
    const closeuGPassingCertModal = () => {
        setisuGPassingCertModalOpen(false);
    };

    const [ispGPassingCertModalOpen, setispGPassingCertModalOpen] = useState(false);
    const openpGPassingCertModal = () => {
        setispGPassingCertModalOpen(true);
    };
    const closepGPassingCertModal = () => {
        setispGPassingCertModalOpen(false);
    };

    const [iscancelledChequeModalOpen, setiscancelledChequeModalOpen] = useState(false);
    const opencancelledChequeModal = () => {
        setiscancelledChequeModalOpen(true);
    };
    const closecancelledChequeModal = () => {
        setiscancelledChequeModalOpen(false);
    };




    useEffect(() => {
        loadStates();
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
        getDataById(state.id)
    }, [token, userId, navigate]);


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
        if (comingData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                id : comingData.id || "",
                companyEmpId: comingData.companyEmpId || '',
                name: comingData.name || "",
                fatherFirstName: comingData.fatherFirstName || "",
                fatherLastName: comingData.fatherLastName || "",
                gender: comingData.gender || "",
                motherFirstName: comingData.motherFirstName || "",
                motherLastName: comingData.motherLastName || "",
                employeeEmailId: comingData.employeeEmailId || "",
                contactNo: comingData.contactNo || "",
                alternativeNo: comingData.alternativeNo || "",
                DOB: comingData.DOB || "",
                DOJ: comingData.DOJ || "",
                DOL: comingData.DOL || "",
                bloodGroup: comingData.bloodGroup || "",
                religion: comingData.religion || "",
                nomineeRelationship: comingData.nomineeRelationship || "",
                nomineeName: comingData.nomineeName || "",
                employeeIdentityMark: comingData.employeeIdentityMark || "",
                branch: comingData.branch || "",
                designation: comingData.designation || "",
                beneficiaryName: comingData.beneficiaryName || "",
                clientCode: comingData.clientCode || "",
                payrollCard: comingData.payrollCard || "",
                correspondingAddress: comingData.correspondingAddress || "",
                permanentAddress: comingData.permanentAddress || "",
                country: comingData.country || "",
                state: comingData.state || "",
                city: comingData.city || "",
                pinCode: comingData.pinCode || "",
                maritalStatus: comingData.maritalStatus || "",
                qualification: comingData.qualification || "",
                employmentType: comingData.employmentType || "",
                enchashmentName: comingData.enchashmentName || "",
                department : comingData.department || "",
                adharNo: comingData.adharNo || "",
                panNo: comingData.panNo || "",
                UANNo: comingData.UANNo || "",
                ESINo: comingData.ESINo || "",
                facebookProfile: comingData.facebookProfile || "",
                linkedInProfile: comingData.linkedInProfile || "",

                //matric
                schoolName: comingData.schoolName || "",
                board: comingData.board || "",
                subject: comingData.subject || "",
                passingYear: comingData.passingYear || "",

                // 10+2
                collegeName: comingData.collegeName || "",
                boardForCollege: comingData.boardForCollege || "",
                subjectInCollege: comingData.subjectInCollege || "",
                passingYearCollege: comingData.passingYearCollege || "",

                // Undergraduate
                uGCollegeName: comingData.uGCollegeName || "",
                boardForUGCollege: comingData.boardForUGCollege || "",
                subjectInUGCollege: comingData.subjectInUGCollege || "",
                passingYearUGCollege: comingData.passingYearUGCollege || "",

                // Postgraduate
                pGCollegeName: comingData.pGCollegeName || "",
                boardForPGCollege: comingData.boardForPGCollege || "",
                subjectInPGCollege: comingData.subjectInPGCollege || "",
                passingYearPGCollege: comingData.passingYearPGCollege || "",

                // Previous Employer Details
                previousEmployerName: comingData.previousEmployerName || "",
                jobTitle: comingData.jobTitle || "",
                from: comingData.from || "",
                to: comingData.to || "",

                // Finance Data
                gross: comingData.gross || "",
                basic: comingData.basic || "",
                DA: comingData.DA || "",
                HRA: comingData.HRA || "",
                specialAllowance: comingData.specialAllowance || "",
                mobileExpense: comingData.mobileExpense || "",
                conveyence: comingData.conveyence || "",
                vehicleAllowance: comingData.vehicleAllowance || "",
                CTC: comingData.CTC || "",
                mobileReimb: comingData.mobileReimb || "",
                DOLEPF: comingData.DOLEPF || "",
                LWF: comingData.LWF || "",
                remarkFinanceData: comingData.remarkFinanceData || "",
                stipend: comingData.stipend || "",
                contractAmount: comingData.contractAmount || "",

                // Document Upload
                profilePicture: comingData.profilePicture || "",
                adharFront: comingData.adharFront || "",
                adharBack: comingData.adharBack || "",
                PanFront: comingData.PanFront || "",
                matricPassingCert: comingData.matricPassingCert || "",
                tenandtwoPassingCert: comingData.tenandtwoPassingCert || "",
                uGPassingCert: comingData.uGPassingCert || "",
                pGPassingCert: comingData.pGPassingCert || "",
                cancelledCheque: comingData.cancelledCheque || "",

                // Leave Details
                CLremaining: comingData.CLremaining || "",
                ELremaining: comingData.ELremaining || "",
                SLremaining: comingData.SLremaining || "",
                compOff: comingData.compOff || "",

                // Asset Assign Details
                item: comingData.item || "",
                brand: comingData.brand || "",
                usnNo: comingData.usnNo || "",
                empCode: comingData.empCode || "",
                assetOwningEmployeeName: comingData.assetOwningEmployeeName || ""

            }))
        }
    }, [comingData])

    const [formData, setFormData] = useState({
        id:"",
        companyEmpId: '',
        name: "",
        fatherFirstName: "",
        fatherLastName: "",
        gender: "",
        motherFirstName: "",
        motherLastName: "",
        employeeEmailId: "",
        contactNo: "",
        alternativeNo: "",
        DOB: "",
        DOJ: "",
        DOL: "",
        bloodGroup: "",
        religion: "",
        nomineeRelationship: "",
        nomineeName: "",
        employeeIdentityMark: "",
        branch: "",
        designation: "",
        beneficiaryName: "",
        clientCode: "",
        payrollCard: "",
        correspondingAddress: "",
        permanentAddress: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        maritalStatus: "",
        qualification: "",
        employmentType: "",
        enchashmentName: "",
        adharNo: "",
        panNo: "",
        UANNo: "",
        ESINo: "",
        facebookProfile: "",
        linkedInProfile: "",

        //matric
        schoolName: "",
        board: "",
        subject: "",
        passingYear: "",

        //10+2
        collegeName: "",
        boardForCollege: "",
        subjectInCollege: "",
        passingYearCollege: "",

        //under Graduate
        uGCollegeName: "",
        boardForUGCollege: "",
        subjectInUGCollege: "",
        passingYearUGCollege: "",

        //postGraduate
        pGCollegeName: "",
        boardForPGCollege: "",
        subjectInPGCollege: "",
        passingYearPGCollege: "",

        //previous Employer details
        previousEmployerName: "",
        jobTitle: "",
        from: "",
        to: "",

        //finance data
        gross: "",
        basic: "",
        DA: "",
        HRA: "",
        specialAllowance: "",
        mobileExpense: "",
        conveyence: "",
        vehicleAllowance: "",
        CTC: "",
        mobileReimb: "",
        DOLEPF: "",
        LWF: "",
        remarkFinanceData: "",
        stipend: "",
        contractAmount: "",

        //document upload
        profilePicture: "",
        adharFront: "",
        adharBack: "",
        PanFront: "",
        matricPassingCert: "",
        tenandtwoPassingCert: "",
        uGPassingCert: "",
        pGPassingCert: "",
        cancelledCheque: "",


        //leave Details
        CLremaining: "",
        ELremaining: "",
        SLremaining: "",
        compOff: "",

        //Asset assign details
        item: "",
        brand: "",
        usnNo: "",
        empCode: "",
        assetOwningEmployeeName: "",
    })
    console.log("formData", formData)

    const profilePictureRef = useRef(null);
    const adharFrontRef = useRef(null);
    const adharBackRef = useRef(null);
    const PanFrontRef = useRef(null);
    const matricPassingCertRef = useRef(null);
    const tenandtwoPassingCertRef = useRef(null);
    const uGPassingCertRef = useRef(null);
    const pGPassingCertRef = useRef(null);
    const cancelledChequeRef = useRef(null);

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getEmployee/${id}/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        console.log("daaemployee", response.data.data)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    profilePicture: profilePictureRef,
                    adharFront: adharFrontRef,
                    adharBack: adharBackRef,
                    PanFront: PanFrontRef,
                    matricPassingCert: matricPassingCertRef,
                    tenandtwoPassingCert: tenandtwoPassingCertRef,
                    uGPassingCert: uGPassingCertRef,
                    pGPassingCert: pGPassingCertRef,
                    cancelledCheque: cancelledChequeRef,
                };

                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }

                setFormData(prevState => ({
                    ...prevState,
                    [name]: null // Reset the file state
                }));
                return;
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else if (name === 'state') {
            loadCities(value);
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
        else if (name === "contactNo" || name === "alternativeNo") {
            const validValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (name === 'passingYear' || name === 'passingYearCollege' || name === "passingYearUGCollege" || name === "passingYearPGCollege") {
            if (value.match(/^\d{0,4}$/)) {
                setFormData({ ...formData, [name]: value });
            }
        }
        else if (name === "gross" || name === "basic" || name === "DA" || name === "HRA" || name === "specialAllowance" ||
            name === "mobileExpense" || name === "conveyance" || name === "vehicleAllowance" || name === "CTC" || name === "mobileReimb" ||
            name === "DOLEPF" || name === "LWF" || name === "remarkFinanceData" || name === "stipend" || name === "contractAmount") {
            if (value.match(/^\d*\.?\d{0,2}$/)) {
                setFormData({ ...formData, [name]: value });
            }
        }
        else if (name === "pinCode") {
            const validValue = value.replace(/\D/g, '').slice(0, 6);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (name === "adharNo") {
            const validValue = value.replace(/\D/g, '').slice(0, 12);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else if (name === "employeeEmailId" || name == "city") {
            setFormData({
              ...formData,
              [name]: value,
            });
          }

        else {
            const capitalizedValue = value
  .split(' ')
  .map(word => word.toUpperCase())
  .join(' ');

              setFormData(prevState => ({
                ...prevState,
                [name]: capitalizedValue
              }));
        }
    }

    const validateForm = () => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address.';
        }

        return '';
    };
    // console.log("userid", userId)
    // console.log("link", `${backendUrl}/api/createNewEmployee/${userId}`)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);


        console.log('Form data submitted:', formData);
        setAlertInfo({ ...alertInfo, show: false });

        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }

        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await axios({
                method: 'PUT',
                url: `${backendUrl}/api/employeeUpdate/${state.id}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response", response.data);
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
            setTimeout(() => {
                navigate(-1)
            })
        } catch (error) {
            console.error("Error during form submission:", error);
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
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const handleSelect = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            gender: value
        });
        setShowDropdown(false); // Close dropdown after selection
    };


    const editable = () => {
        setIsReadOnly(!IsReadOnly)
    }
    const handleBack = () => {
        navigate(-1)
    }
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 630) {
                setMarginLeft('5x');
                setPaddingLeft('40px')
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
            <Admin/>
            <Helmet>
                <title>Employee Information Edit - Claimpro</title>
                <meta name="description" content="Employee Information For Edit For BVC Claimpro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/EmployeeFormEdit`} />
            </Helmet>
            <form onSubmit={handleSubmit} style={{ marginLeft, paddingLeft }} className="Customer-master-form">
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <div class="header-container">
                        <h1 class="bigtitle" style={{ textAlign: 'center' }}>Employee Form Edit</h1>
                    </div>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Employee Id:
                        <input
                            type="text"
                            name="companyEmpId"
                            value={formData.id}
                            placeholder='Company Employee Id'
                            onChange={handleChange}
                            className="form-control"
                            readOnly
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Employee Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder='Emplyee Name'
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Father's First Name:
                        <input
                            type="text"
                            name="fatherFirstName"
                            placeholder='Father First Name'
                            value={formData.fatherFirstName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Father's Last Name:
                        <input
                            type="text"
                            name="fatherLastName"
                            placeholder='Father Last Name'
                            value={formData.fatherLastName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <div className="dropdown green-dropdown form-field">
                    Select Gender:
                        <button
                            className="form-field input-group mb-3"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDropdown}
                            disabled={IsReadOnly}
                        >
                            {formData.gender || "Select Gender Type"}
                        </button>
                        <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "Male")}>Male</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "Female")}>Female</a></li>
                        </ul>
                    </div>
                    <label className="form-field input-group mb-3">
                        Mother's First Name:
                        <input
                            type="text"
                            name="motherFirstName"
                            placeholder='Mother First Name'
                            value={formData.motherFirstName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Mother's Last Name:
                        <input
                            type="text"
                            name="motherLastName"
                            placeholder='Mother Last Name'
                            value={formData.motherLastName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        Employee Email Id:
                        <input
                            type="email"
                            name="employeeEmailId"
                            placeholder='Employee Email Id'
                            value={formData.employeeEmailId}
                            onChange={handleChange}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address."
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Contact No:
                        <input
                            type="text"
                            name="contactNo"
                            placeholder='Contact No'
                            value={formData.contactNo}
                            onChange={handleChange}
                            pattern="\d{10}"
                            className="form-control"
                            readOnly={IsReadOnly}
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field">
                        Alternative No:
                        <input
                            type="text"
                            name="alternativeNo"
                            placeholder='Alternative Contact No'
                            value={formData.alternativeNo}
                            onChange={handleChange}
                            pattern="\d{10}"
                            className="form-control"
                            readOnly={IsReadOnly}
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Date Of Birth:
                        <input
                            type="date"
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Date Of Joining:
                        <input
                            type="date"
                            name="DOJ"
                            value={formData.DOJ}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Date Of Leave:
                        <input
                            type="date"
                            name="DOL"
                            value={formData.DOL}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Blood Group:
                        <input
                            type="text"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Religion:
                        <input
                            type="text"
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Nominee Relationship:
                        <input
                            type="text"
                            name="nomineeRelationship"
                            value={formData.nomineeRelationship}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>
 
                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Nominee Name:
                        <input
                            type="text"
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Employee Identity Mark:
                        <input
                            type="text"
                            name="employeeIdentityMark"
                            value={formData.employeeIdentityMark}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Branch:
                        <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Designation:
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Beneficiary Name:
                        <input
                            type="text"
                            name="beneficiaryName"
                            value={formData.beneficiaryName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Client Code:
                        <input
                            type="text"
                            name="clientCode"
                            value={formData.clientCode}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Payroll Card:
                        <input
                            type="text"
                            name="payrollCard"
                            value={formData.payrollCard}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        Corresponding Address:
                        <textarea
                            name="correspondingAddress"
                            value={formData.correspondingAddress}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            placeholder='Permanent Address'
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Permanent Address:
                        <textarea
                            name="permanentAddress"
                            value={formData.permanentAddress}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            placeholder='Permanent Address'
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        State:
                        <select
                            className='form-control'
                            name="state"
                            onChange={handleChange}
                            disabled={IsReadOnly || isLoadingStates}
                            value={formData.state}>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field">
                        City: {formData.city}
                        <select
                            className='form-control'
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={isLoadingCities || !formData.state}
                        >
                            <option value="">Select City</option>
                            {!cities.error && cities.map(city => (
                                <option key={city.iso2} value={city.iso2}>{city.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Pincode:
                        <input
                            type='tel'
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleChange}
                            placeholder='Pincode'
                            required
                            pattern="\d{6}"
                            title="Pincode must be 6 digits"
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <div className="dropdown green-dropdown form-field">
                        Marital Status:
                        <button
                            className="form-field input-group mb-3"
                            type="button"
                            id="dropdownButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleStatusDropdown}
                        >
                            {formData.maritalStatus || "Select Status"}
                        </button>
                        <ul className={`dropdown-menu${showStatusDropdown ? " show" : ""}`} aria-labelledby="dropdownButton">
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleStatusSelect(e, "Married")}>Married</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleStatusSelect(e, "Unmarried")}>Unmarried</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleStatusSelect(e, "Divorce")}>Divorce</a></li>
                        </ul>
                    </div>
                    <label className="form-field input-group mb-3">
                        Qualification:
                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Employment Type:
                        <input
                            type="text"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                <div className="dropdown green-dropdown form-field">
                        Select Department:
                        <button
                            className="form-field input-group mb-3"
                            type="button"
                            id="dropdownButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDepartmentDropdown}
                        >
                            {formData.department || "Select Department"}
                        </button>
                        <ul className={`dropdown-menu${showDepartmentDropdown ? " show" : ""}`} aria-labelledby="dropdownButton">
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleDepartmentSelect(e, "Management")}>Management</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleDepartmentSelect(e, "Administration")}>Administration</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleDepartmentSelect(e, "Sales")}>Sales</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleDepartmentSelect(e, "Billing")}>Billing</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleDepartmentSelect(e, "IT")}>IT</a></li>
                        </ul>
                    </div>
                    <label className="form-field input-group mb-3">
                        Enchashment Name:
                        <input
                            type="text"
                            name="enchashmentName"
                            value={formData.enchashmentName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Adhar No:
                        <input
                            type='text'
                            name="adharNo"
                            placeholder='Aadhaar Card Number'
                            value={formData.adharNo}
                            onChange={handleChange}
                            className="form-control"
                            required
                            pattern="\d{12}"
                            readOnly={IsReadOnly}
                            title="Aadhaar number must be exactly 12 digits."
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        PAN No:
                        <input
                            type='text'
                            name="panNo"
                            placeholder='Pan Card Number'
                            value={formData.panNo}
                            onChange={handleChange}
                            className="form-control"
                            required
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            readOnly={IsReadOnly}
                            title="Please enter a valid PAN number (e.g., ABCDE1234F)."
                        />
                    </label>
                    
                </div>

                <div className="form-row">
                <label className="form-field input-group mb-3">
                        UAN No:
                        <input
                            type="text"
                            name="UANNo"
                            value={formData.UANNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        ESI No:
                        <input
                            type="text"
                            name="ESINo"
                            value={formData.ESINo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Facebook Profile:
                        <input
                            type="text"
                            name="facebookProfile"
                            value={formData.facebookProfile}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        LinkedIn Profile:
                        <input
                            type="text"
                            name="linkedInProfile"
                            value={formData.linkedInProfile}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div> 


                <div class="header-container">
                    <h3 class="bigtitle">Matric Information</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        School Name:
                        <input
                            type="text"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Board:
                        <input
                            type="text"
                            name="board"
                            value={formData.board}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Subject:
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Passing Year:
                        <input
                            type="text"
                            name="passingYear"
                            value={formData.passingYear}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            placeholder="YYYY"
                        />
                    </label>
                </div>


                <div class="header-container">
                    <h3 class="bigtitle">10 + 2 Information</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        College Name:
                        <input
                            type="text"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Board:
                        <input
                            type="text"
                            name="boardForCollege"
                            value={formData.boardForCollege}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Subject:
                        <input
                            type="text"
                            name="subjectInCollege"
                            value={formData.subjectInCollege}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Passing Year:
                        <input
                            type="text"
                            name="passingYearCollege"
                            value={formData.passingYearCollege}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            placeholder="YYYY"
                        />
                    </label>
                </div>

                <div class="header-container">
                    <h3 class="bigtitle">Uder Graduate Information</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Under Graduate College Name:
                        <input
                            type="text"
                            name="uGCollegeName"
                            value={formData.uGCollegeName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Board:
                        <input
                            type="text"
                            name="boardForUGCollege"
                            value={formData.boardForUGCollege}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Subject:
                        <input
                            type="text"
                            name="subjectInUGCollege"
                            value={formData.subjectInUGCollege}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Passing Year:
                        <input
                            type="text"
                            name="passingYearUGCollege"
                            value={formData.passingYearUGCollege}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            placeholder="YYYY"
                        />
                    </label>
                </div>

                <div class="header-container">
                    <h3 class="bigtitle">Post Graduate Information</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Under Graduate College Name:
                        <input
                            type="text"
                            name="pGCollegeName"
                            value={formData.pGCollegeName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Board:
                        <input
                            type="text"
                            name="boardForPGCollege"
                            value={formData.boardForPGCollege}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Subject:
                        <input
                            type="text"
                            name="subjectInPGCollege"
                            value={formData.subjectInPGCollege}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Passing Year:
                        <input
                            type="text"
                            name="passingYearPGCollege"
                            value={formData.passingYearPGCollege}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={IsReadOnly}
                            placeholder='YYYY'
                        />
                    </label>
                </div>


                <div class="header-container">
                    <h3 class="bigtitle">Previous Employer Information</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Previous Employer Name:
                        <input
                            type="text"
                            name="previousEmployerName"
                            value={formData.previousEmployerName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Job Title:
                        <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        From:
                        <input
                            type="date"
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        To:
                        <input
                            type="date"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div class="header-container">
                    <h3 class="bigtitle">Finance Information</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Gross:
                        <input
                            type="text"
                            name="gross"
                            value={formData.gross}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Basic:
                        <input
                            type="text"
                            name="basic"
                            value={formData.basic}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        DA:
                        <input
                            type="text"
                            name="DA"
                            value={formData.DA}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        HRA:
                        <input
                            type="text"
                            name="HRA"
                            value={formData.HRA}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Special Allowance:
                        <input
                            type="text"
                            name="specialAllowance"
                            value={formData.specialAllowance}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Mobile Expense:
                        <input
                            type="text"
                            name="mobileExpense"
                            value={formData.mobileExpense}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Conveyence:
                        <input
                            type="text"
                            name="conveyence"
                            value={formData.conveyence}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Vehicle Allowance:
                        <input
                            type="text"
                            name="vehicleAllowance"
                            value={formData.vehicleAllowance}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        CTC:
                        <input
                            type="text"
                            name="CTC"
                            value={formData.CTC}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Mobile Reimb:
                        <input
                            type="text"
                            name="mobileReimb"
                            value={formData.mobileReimb}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        DOLEPF:
                        <input
                            type="text"
                            name="DOLEPF"
                            value={formData.DOLEPF}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        LWF:
                        <input
                            type="text"
                            name="LWF"
                            value={formData.LWF}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Remark FinanceData:
                        <input
                            type="text"
                            name="remarkFinanceData"
                            value={formData.remarkFinanceData}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Stipend:
                        <input
                            type="text"
                            name="stipend"
                            value={formData.stipend}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Contract Amount:
                        <input
                            type="text"
                            name="contractAmount"
                            value={formData.contractAmount}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                    </label>
                </div>

                <div class="header-container">
                    <h3 class="bigtitle">Document Upload</h3>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Profile Picture:
                        {IsReadOnly ? (
                            formData.profilePicture && formData.profilePicture !== 'default-profilePicture-value' ? (
                                <>
                                    <img
                                        src={formData.profilePicture}
                                        alt="Profile Picture"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openProfilePictureModal}
                                    />
                                    <Modal isOpen={isProfilePictureModalOpen} onRequestClose={closeProfilePictureModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.profilePicture} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeProfilePictureModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.profilePicture} alt="Profile Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Profile Picture uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="profilePicture"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={profilePictureRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>

                    <label className="form-field">
                        Adhar Front:
                        {IsReadOnly ? (
                            formData.adharFront && formData.adharFront !== "adharFront Value" ? (
                                <>
                                    <img
                                        src={formData.adharFront}
                                        alt="Adhar Front"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openadharFrontModal}
                                    />
                                    <Modal isOpen={isadharFrontModalOpen} onRequestClose={closeadharFrontModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.adharFront} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeadharFrontModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.adharFront} alt="Profile Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Adhar front Picture uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="adharFront"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={adharFrontRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>

                    <label className="form-field">
                        Adhar Back:
                        {IsReadOnly ? (
                            formData.adharBack && formData.adharBack !== "adharBack Value" ? (
                                <>
                                    <img
                                        src={formData.adharBack}
                                        alt="Adhar Back"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openadharBackModal}
                                    />
                                    <Modal isOpen={isadharBackModalOpen} onRequestClose={closeadharBackModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.adharBack} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeadharBackModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.adharBack} alt="adharBack Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Adhar Back Picture uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="adharBack"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={adharBackRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>
                </div>

                <div className="form-row">
                <label className="form-field">
                        PAN Front:
                        {IsReadOnly ? (
                            formData.PanFront && formData.PanFront !== "PanFront Value" ? (
                                <>
                                    <img
                                        src={formData.PanFront}
                                        alt="PAN Front"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openPanFrontModal}
                                    />
                                    <Modal isOpen={isPanFrontModalOpen} onRequestClose={closePanFrontModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.PanFront} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closePanFrontModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.PanFront} alt="PanFront Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No PAN Front uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="PanFront"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={PanFrontRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>

                    <label className="form-field">
                        Matric Passing Certificate:
                        {IsReadOnly ? (
                            formData.matricPassingCert && formData.matricPassingCert !== "default-matricPassingCert-value" ? (
                                <>
                                    <img
                                        src={formData.matricPassingCert}
                                        alt="Matric Certificate"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openmatricPassingCertModal}
                                    />
                                    <Modal isOpen={ismatricPassingCertModalOpen} onRequestClose={closematricPassingCertModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.matricPassingCert} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closematricPassingCertModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.matricPassingCert} alt="matricPassingCert Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Matric Certificate uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="matricPassingCert"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={matricPassingCertRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>

                    <label className="form-field">
                        10 + 2 Passing Certificate:
                        {IsReadOnly ? (
                            formData.tenandtwoPassingCert && formData.tenandtwoPassingCert !== "tenandtwoPassingCert Value" ? (
                                <>
                                    <img
                                        src={formData.tenandtwoPassingCert}
                                        alt="10+2 Passing Cert"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={opentenandtwoPassingCertModal}
                                    />
                                    <Modal isOpen={istenandtwoPassingCertModalOpen} onRequestClose={closetenandtwoPassingCertModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.tenandtwoPassingCert} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closetenandtwoPassingCertModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.tenandtwoPassingCert} alt="tenandtwoPassingCert Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No 10+2 Passing Cert uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="tenandtwoPassingCert"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={tenandtwoPassingCertRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>
                </div>

                <div className='form-row'>
                    
                <label className="form-field">
                        Under Graduate Passing Certificate:
                        {IsReadOnly ? (
                            formData.uGPassingCert && formData.uGPassingCert !== "uGPassingCert Value" ? (
                                <>
                                    <img
                                        src={formData.uGPassingCert}
                                        alt="UG Certificate"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openuGPassingCertModal}
                                    />
                                    <Modal isOpen={isuGPassingCertModalOpen} onRequestClose={closeuGPassingCertModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.uGPassingCert} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeuGPassingCertModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.uGPassingCert} alt="uGPassingCert Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No UG Certificate uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="uGPassingCert"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={uGPassingCertRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>
                    <label className="form-field">
                        Post Graduate Passing Certificate:
                        {IsReadOnly ? (
                            formData.pGPassingCert && formData.pGPassingCert !== "pGPassingCert Value" ? (
                                <>
                                    <img
                                        src={formData.pGPassingCert}
                                        alt="PG Certificate"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openpGPassingCertModal}
                                    />
                                    <Modal isOpen={ispGPassingCertModalOpen} onRequestClose={closepGPassingCertModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.pGPassingCert} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closepGPassingCertModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.pGPassingCert} alt="pGPassingCert Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No PG Certificate uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="pGPassingCert"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={pGPassingCertRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>
                    <label className="form-field">
                        Cancelled Cheque:
                        {IsReadOnly ? (
                            formData.cancelledCheque && formData.cancelledCheque !== "cancelledCheque Value" ? (
                                <>
                                    <img
                                        src={formData.cancelledCheque}
                                        alt="Cancelled Cheque"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={opencancelledChequeModal}
                                    />
                                    <Modal isOpen={iscancelledChequeModalOpen} onRequestClose={closecancelledChequeModal} contentLabel="Profile Picture Modal">
                                        <div className='modal-header'>
                                            <IconButton href={formData.cancelledCheque} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closecancelledChequeModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='modal-image-container'>
                                            <img src={formData.cancelledCheque} alt="cancelledCheque Picture" style={{ width: '100%' }} />
                                        </div>
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Cancelled Cheque uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="cancelledCheque"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={cancelledChequeRef}
                                required
                                className="form-control"
                            />
                        )}
                    </label>
                </div>


                <div class="header-container">
                    <h3 class="bigtitle">Leave Details</h3>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        CL (Remaining):
                        <input
                            type="text"
                            name="CLremaining"
                            value={formData.CLremaining}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        EL (Remaining):
                        <input
                            type="text"
                            name="ELremaining"
                            value={formData.ELremaining}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        SL (Remaining):
                        <input
                            type="text"
                            name="SLremaining"
                            value={formData.SLremaining}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Comp Off:
                        <input
                            type="text"
                            name="compOff"
                            value={formData.compOff}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            className="form-control"
                        />
                    </label>
                </div> 

                {
                    alertInfo.show && (
                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                            {alertInfo.message}
                        </Alert>
                    )
                }

                <div style={{ textAlign: 'center' }}>
                    {!IsReadOnly && (
                        <div>
                            <button type="submit"
                                style={{                     fontSize: "14px",
                    padding: "5px 20px",
                    border: "3px solid lightblue",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "green",}}
                                disabled={isLoading} // Disable button while loading
                                onClick={handleSubmit}
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
                    )}

                    {IsReadOnly && (
                        <button
                            type="submit"
                            style={{                     fontSize: "14px",
                    padding: "5px 20px",
                    border: "3px solid lightblue",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "green",}}
                            onClick={editable}
                        >
                            EDIT
                        </button>
                    )}
                </div>
            </form >
        </div >

    );
};

export default EmployeeFormEdit;
