import React, { useState, useEffect, useRef } from 'react';
import '../CustomerMaster/CustomerMaster.css'
import { Alert } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import backendUrl from '../../environment';
import { ClipLoader } from 'react-spinners'
import { Helmet } from 'react-helmet-async';
import Admin from '../Admin/Admin';


const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};;

const EmployeeForm = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);

    const [marginLeft, setMarginLeft] = useState('30px');
    const [paddingLeft, setPaddingLeft] = useState('30px');


    useEffect(() => {
        loadStates();
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
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


    const [formData, setFormData] = useState({
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
        department:"",
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
    console.log("formData123", formData)

    const profilePictureRef = useRef(null);
    const adharFrontRef = useRef(null);
    const adharBackRef = useRef(null);
    const PanFrontRef = useRef(null);
    const matricPassingCertRef = useRef(null);
    const tenandtwoPassingCertRef = useRef(null);
    const uGPassingCertRef = useRef(null);
    const pGPassingCertRef = useRef(null);
    const cancelledChequeRef = useRef(null);

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
        }else if (name === "employeeEmailId" || name == "city") {
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
        if (formData.employeeEmailId === "" || formData.employeeEmailId == undefined || formData.employeeEmailId == null || !emailRegex.test(formData.employeeEmailId)) {
            setAlertInfo({ show: true, message: "Employee Email is mandatory", severity: 'error' });
            return 'Please enter a valid email address.';
        }

        console.log("myfromdataBranch" )
        if (formData.department === "" || formData.department == undefined || formData.department == null) {
            console.log("STATESSSSSSSSSSSSSSSS")
            setAlertInfo({ show: true, message: "department is mandatory", severity: 'error' });
            return 'department is mandatory.';
        }

        return '';
    };
    console.log("userid", userId)
    console.log("link", `${backendUrl}/api/createNewEmployee/${userId}`)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            console.log(validationMessage);
            return;
        }
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
                method: 'POST',
                url: `${backendUrl}/api/createNewEmployee/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response", response.data);
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' })
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
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

    const handleSelect = (event, value) => {
        event.preventDefault(); // Prevent default link behavior
        setFormData({
            ...formData,
            gender: value
        });
        setShowDropdown(false); // Close dropdown after selection
    };

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

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const toggleStatusDropdown = () => setShowStatusDropdown(!showStatusDropdown);
    const toggleDepartmentDropdown = () => setShowDepartmentDropdown(!showDepartmentDropdown);
    

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
                <title>Employee Information - Claimpro</title>
                <meta name="description" content="Employee Information - BVC Claimpro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/EmployeeForm`} />
            </Helmet>
            <form onSubmit={handleSubmit} className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
                <div class="header-container">
                    <h1 class="bigtitle" style={{ textAlign: 'center' }}>Employee Form</h1>
                </div>

                <div className="form-row">
                    <label className="form-field input-group mb-3">
                        Company Employee Id:
                        <input
                            type="text"
                            name="companyEmpId"
                            value={formData.companyEmpId}
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
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Contact No:
                        <input
                            type="tel"
                            name="contactNo"
                            placeholder='Contact No'
                            value={formData.contactNo}
                            onChange={handleChange}
                            pattern="\d{10}"
                            className="form-control"
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field">
                        Alternative No:
                        <input
                            type="tel"
                            name="alternativeNo"
                            placeholder='Alternative Contact No'
                            value={formData.alternativeNo}
                            onChange={handleChange}
                            pattern="\d{10}"
                            className="form-control"
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
                        />
                    </label>
                    <label className="form-field input-group mb-3">
                        Date Of Joining:
                        <input
                            type="date"
                            name="DOJ"
                            value={formData.DOJ}
                            onChange={handleChange}
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
                            placeholder='corresponding Address'
                        />
                    </label>
                </div>

                <div className='form-row'>
                    <label className="form-field">
                        Permanent Address:
                        <textarea
                            name="permanentAddress"
                            value={formData.permanentAddress}
                            onChange={handleChange}
                            className="form-control"
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
                            className="form-control"
                        />
                    </label>

                    <label className="form-field">
                        State:
                        <select
                            className='form-control'
                            name="state"
                            onChange={handleChange}
                            disabled={isLoadingStates}
                            value={formData.state}>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field">
                        City:
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
                        <input
                            type="file"
                            name="profilePicture"
                            //   value={formData.profilePicture}
                            accept=".pdf,image/*"
                            ref={profilePictureRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        Adhar Front:
                        <input
                            type="file"
                            name="adharFront"
                            //   value={formData.adharFront}
                            accept=".pdf,image/*"
                            ref={adharFrontRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        Adhar Back:
                        <input
                            type="file"
                            name="adharBack"
                            //   value={formData.adharBack}
                            accept=".pdf,image/*"
                            ref={adharBackRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>

                </div>

                <div className="form-row">
                    <label className="form-field">
                        PAN Front:
                        <input
                            type="file"
                            name="PanFront"
                            //   value={formData.PanFront}
                            accept=".pdf,image/*"
                            ref={PanFrontRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        Matric Passing Certificate:
                        <input
                            type="file"
                            name="matricPassingCert"
                            //   value={formData.matricPassingCert}
                            accept=".pdf,image/*"
                            ref={matricPassingCertRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        10 + 2 Passing Certificate:
                        <input
                            type="file"
                            name="tenandtwoPassingCert"
                            //   value={formData.tenandtwoPassingCert}
                            accept=".pdf,image/*"
                            ref={tenandtwoPassingCertRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Under Graduate Passing Certificate:
                        <input
                            type="file"
                            name="uGPassingCert"
                            //   value={formData.uGPassingCert}
                            accept=".pdf,image/*"
                            ref={uGPassingCertRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <label className="form-field">
                        Post Graduate Passing Certificate:
                        <input
                            type="file"
                            name="pGPassingCert"
                            //   value={formData.pGPassingCert}
                            accept=".pdf,image/*"
                            ref={pGPassingCertRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>

                    <label className="form-field">
                        Cancelled Cheque:
                        <input
                            type="file"
                            name="cancelledCheque"
                            //   value={formData.cancelledCheque}
                            accept=".pdf,image/*"
                            ref={cancelledChequeRef}
                            capture="environment"
                            onChange={handleChange}
                            className="form-control"
                        />
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
                            className="form-control"
                        />
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

    );
};

export default EmployeeForm;
