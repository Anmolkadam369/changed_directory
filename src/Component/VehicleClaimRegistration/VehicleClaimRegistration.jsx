import React, { useState, useEffect, useRef } from 'react';
import styles from './VehicleClaimRegistration.css'; // Ensure this path is correct
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import { loadStates, loadCities } from '../StateAPI';
import backendUrl from '../../environment';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const VehicleClaimRegistration = () => {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [comingData, setComingData] = useState([]);
    console.log("comingData", comingData)
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const today = new Date().toISOString().split('T')[0];

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadStates();
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        console.log("id", id)
        getDataById(id);
        setAccidentData({ accidentFileNo: id });
    }, [token, userId, navigate, id]);

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleData/${id}`);
        console.log("daa", response.data)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const [accidentData, setAccidentData] = useState({
        accidentFileNo: id,
        dateTime: today,
        systemGenerated: '',
        railwayTime: '',
        state: '',
        district: '',
        accidentDate: '',  //date
        reason: '',
        insuredBy: '',
        intimatedDate: '', //date
        intimationUpload: '',
        policyNo: "",
        driverName: "",
        DLNo: "",
        DLNoValidity: "",
        DOB: "",  //date
        policeStation: "",
        FIRNo: "",
        firDate: "", //date
        firUpload: "",
        advocateName: "",
        advocateNo: "",
        courtName: "",
        releaseUpload: "",
        POA: "",
        companyRepresentativeAdhar: "",
        surveyorName: "",
        surveyorNo: "",
        dateOfSurvey: "",
        remarksSurveyor: "",
        materialSurveyorName: "",
        materialSurveyorNo: "",
        dateOfMaterialSurvey: "",
        remarksMaterialSurvey: "",
        finalSurveyorName: "",
        FinalSurveyorNo: "",
        dateOfFinalSurvey: "",
        remarksFinalSurvey: "",
        investigatorName: "",
        investigatorNo: "",
        investigationDate: "", //date
        investigatorRemarks: "",

        representativeName: "",
        representativeNo: "",
        reportUpload: "",
        dateRepairedOnSpot: "",
        transshippedVehicleNo: "",
        transshippedDate: "",//date
        reportedFinalDestination: "",
        reportedFinalDestinationDate: "",

        deadLineDate: '',//date
        readyDate: "",//date
        reInspectionDate: "",//date
        finallyReleasedDate: "",//date

        totalDaysFromAccident: "",
        daysInWorkShop: "",
        deadlineTAT: "",

        docketName: "",
        docketDate: "",//date
        origin: "",
        destination: "",
        consignor: "",
        consignee: "",
        invoiceNo: "",
        invoiceDate: "",//date
        material: "",
        package: "",
        weight: "",

        RC: "",
        RCdoc: '',
        RCDate: "",
        RCassignedTo: "",
        RCremark: "",

        insurance: "",
        insurancedoc: '',
        insuranceDate: "",
        insuranceassignedTo: "",
        insuranceremark: "",

        fitness: "",
        fitnessdoc: '',
        fitnessDate: "",
        fitnessassignedTo: "",
        fitnessremark: "",

        nationalPermit1Year: "",
        nationalPermit1Yeardoc: '',
        nationalPermit1YearDate: "",
        nationalPermit1YearassignedTo: "",
        nationalPermit1Yearremark: "",

        nationalPermit5Year: "",
        nationalPermit5Yeardoc: '',
        nationalPermit5YearDate: "",
        nationalPermit5YearassignedTo: "",
        nationalPermit5Yearremark: "",

        taxToken: "",
        taxTokendoc: '',
        taxTokenDate: "",
        taxTokenassignedTo: "",
        taxTokenremark: "",


        DLicence: "",
        DLicencedoc: '',
        DLicenceDate: "",
        DLicenceassignedTo: "",
        DLicenceremark: "",

        DLVer: "",
        DLVerdoc: '',
        DLVerDate: "",
        DLVerassignedTo: "",
        DLVerremark: "",

        LR: "",
        LRdoc: '',
        LRDate: "",
        LRassignedTo: "",
        LRremark: "",

        PUC: "",
        PUCdoc: '',
        PUCDate: "",
        PUCassignedTo: "",
        PUCremark: "",

        policeReport: "",
        policeReportdoc: '',
        policeReportDate: "",
        policeReportassignedTo: "",
        policeReportremark: "",

        intimation: "",
        intimationdoc: '',
        intimationDate: "",
        intimationassignedTo: "",
        intimationremark: "",

        spotSurvey: "",
        spotSurveydoc: '',
        spotSurveyDate: "",
        spotSurveyassignedTo: "",
        spotSurveyremark: "",

        spotReport: "",
        spotReportdoc: '',
        spotReportDate: "",
        spotReportassignedTo: "",
        spotReportremark: "",

        estimateGiven: "",
        estimateGivendoc: '',
        estimateGivenDate: "",
        estimateGivenassignedTo: "",
        estimateGivenremark: "",

        advancePayment: "",
        advancePaymentdoc: '',
        advancePaymentDate: "",
        advancePaymentassignedTo: "",
        advancePaymentremark: "",

        finalsurveyInitial: "",
        finalsurveyInitialdoc: '',
        finalsurveyInitialDate: "",
        finalsurveyInitialassignedTo: "",
        finalsurveyInitialremark: "",

        finalSurvey2nd: "",
        finalSurvey2nddoc: '',
        finalSurvey2ndDate: "",
        finalSurvey2ndassignedTo: "",
        finalSurvey2ndremark: "",

        workApproval: "",
        workApprovaldoc: '',
        workApprovalDate: "",
        workApprovalassignedTo: "",
        workApprovalremark: "",

        reinspection: "",
        reinspectiondoc: '',
        reinspectionDate: "",
        reinspectionassignedTo: "",
        reinspectionremark: "",

        finalBill: "",
        finalBilldoc: '',
        finalBillDate: "",
        finalBillassignedTo: "",
        finalBillremark: "",

        paymentBalance: "",
        paymentBalancedoc: '',
        paymentBalanceDate: "",
        paymentBalanceassignedTo: "",
        paymentBalanceremark: "",

        settelMent: "",
        settelMentdoc: '',
        settelMentDate: "",
        settelMentassignedTo: "",
        settelMentremark: "",

        claimForm: "",
        claimFormdoc: '',
        claimFormDate: "",
        claimFormassignedTo: "",
        claimFormremark: "",
    });

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
    };

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


    const intimationUpload = useRef(null);
    const firUpload = useRef(null);
    const POA = useRef(null);
    const reportUpload = useRef(null);
    const companyRepresentativeAdhar = useRef(null);
    const RCdoc = useRef(null);
    const insurancedoc = useRef(null);
    const fitnessdoc = useRef(null);
    const nationalPermit1Yeardoc = useRef(null);
    const nationalPermit5Yeardoc = useRef(null);
    const taxTokendoc = useRef(null);
    const DLicencedoc = useRef(null);
    const DLVerdoc = useRef(null);
    const LRdoc = useRef(null);
    const PUCdoc = useRef(null);
    const policeReportdoc = useRef(null);
    const intimationdoc = useRef(null);
    const spotSurveydoc = useRef(null);
    const spotReportdoc = useRef(null);
    const estimateGivendoc = useRef(null);
    const advancePaymentdoc = useRef(null);
    const finalsurveyInitialdoc = useRef(null);
    const finalSurvey2nddoc = useRef(null);
    const workApprovaldoc = useRef(null);
    const reinspectiondoc = useRef(null);
    const finalBilldoc = useRef(null);
    const paymentBalancedoc = useRef(null);
    const settelMentdoc = useRef(null);
    const claimFormdoc = useRef(null);


    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            console.log("myfile")
            if (files[0] && files[0].size > 5000000) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    intimationUpload: intimationUpload,
                    firUpload: firUpload,
                    POA: POA,
                    reportUpload: reportUpload,
                    companyRepresentativeAdhar: companyRepresentativeAdhar,
                    RCdoc: RCdoc,
                    insurancedoc: insurancedoc,
                    fitnessdoc: fitnessdoc,
                    nationalPermit1Yeardoc: nationalPermit1Yeardoc,
                    nationalPermit5Yeardoc: nationalPermit5Yeardoc,
                    taxTokendoc: taxTokendoc,
                    DLicencedoc: DLicencedoc,
                    DLVerdoc: DLVerdoc,
                    LRdoc: LRdoc,
                    PUCdoc: PUCdoc,
                    policeReportdoc: policeReportdoc,
                    intimationdoc: intimationdoc,
                    spotSurveydoc: spotSurveydoc,
                    spotReportdoc: spotReportdoc,
                    estimateGivendoc: estimateGivendoc,
                    advancePaymentdoc: advancePaymentdoc,
                    finalsurveyInitialdoc: finalsurveyInitialdoc,
                    finalSurvey2nddoc: finalSurvey2nddoc,
                    workApprovaldoc: workApprovaldoc,
                    reinspectiondoc: reinspectiondoc,
                    finalBilldoc: finalBilldoc,
                    paymentBalancedoc: paymentBalancedoc,
                    settelMentdoc: settelMentdoc,
                    claimFormdoc: claimFormdoc
                };

                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }

                setAccidentData(prevState => ({
                    ...prevState,
                    [name]: null // Reset the file state
                }));
                return;
            }
            setAccidentData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else if (name === 'advocateNo') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                if (value.length <= 10) {
                    setAccidentData(prev => ({ ...prev, [name]: value }));
                }
            }
        }
        else if (name === 'state') {
            loadCities(value);
            setAccidentData(prev => ({ ...prev, [name]: value }));
        }
        else {
            console.log("name"[name], value)
            setAccidentData(prev => ({ ...prev, [name]: value }));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', accidentData);
        const formDataObj = new FormData();
        for (const key in accidentData) {
            if (accidentData[key]) {
                if (accidentData[key] instanceof File) {
                    formDataObj.append(key, accidentData[key], accidentData[key].name);
                } else {
                    formDataObj.append(key, accidentData[key]);
                }
            }
        }

        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/addVehicleClaim/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });
            console.log("response", response.data);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
        }
        catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        }
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const openModal = (imageUrl) => {
        setCurrentImage(imageUrl);
        setModalOpen(true);
    };
    console.log("CURRENTIMAGE", currentImage)

    const closeModal = () => {
        setModalOpen(false);
        setCurrentImage(null);
    };

    return (
        <div className='container'>
            <form style={{ backgroundColor: 'white', padding: '30px' }}>
                <div class='header-container'>
                    <h2 className='bigtitle'>Accident Images</h2>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Chassis Number:
                        {comingData.ChassisNoView ? (
                            <>
                                <img
                                    src={comingData.ChassisNoView}
                                    alt="Front LH"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={() => openModal(comingData.ChassisNoView)}  // Pass the correct image URL here.
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={closeModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={currentImage}
                                                alt="Enlarged view"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Cluster Number:
                        {comingData.ClusterView ? (
                            <>
                                <img
                                    src={comingData.ClusterView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={() => openModal(comingData.ClusterView)}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={closeModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={currentImage}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No Chassis Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        FrontLH Number:
                        {comingData.frontLH ? (
                            <>
                                <img
                                    src={comingData.frontLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.frontLH}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No FrontLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        frontRH:
                        {comingData.frontRH ? (
                            <>
                                <img
                                    src={comingData.frontRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No frontRH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        front View:
                        {comingData.frontView ? (
                            <>
                                <img
                                    src={comingData.frontView}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.frontView}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No front View Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear LH:
                        {comingData.rearLH ? (
                            <>
                                <img
                                    src={comingData.rearLH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.rearLH}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        rear RH:
                        {comingData.rearRH ? (
                            <>
                                <img
                                    src={comingData.rearRH}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.rearRH}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo:
                        {comingData.MajorDamages1 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages1}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages1}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 2:
                        {comingData.MajorDamages2 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages2}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages2}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 3:
                        {comingData.MajorDamages3 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages3}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages3}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 4:
                        {comingData.MajorDamages4 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages4}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages4}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>
                    <label className="form-field">
                        Major Damage Photo 5:
                        {comingData.MajorDamages5 ? (
                            <>
                                <img
                                    src={comingData.MajorDamages5}
                                    alt="Chassis Number"
                                    style={{ maxWidth: '100px', display: 'block', marginTop: "20px" }}
                                // onClick={toggleModal}
                                />
                                {/* {isModalOpen && (
                                    <div className="modal-background" onClick={toggleModal}>
                                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                                            <img
                                                src={comingData.MajorDamages5}
                                                alt="Chassis Number"
                                                style={{ maxWidth: '500px', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <p className='notUploaded' style={{ marginTop: "20px" }}>No rearLH Photo uploaded</p>
                        )}
                    </label>

                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Accident Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Accident File No:
                        <input
                            className='inputField'
                            type="text"
                            name="accidentFileNo"
                            value={accidentData.accidentFileNo}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Date & Time:
                        <input
                            className='inputField'
                            type="text"
                            name="dateTime"
                            value={accidentData.dateTime}
                            onChange={handleChange}
                            placeholder='Date-Time'
                            readOnly

                        />
                    </label>
                    <label className="form-field">
                        System Generated - Vehicle No.:
                        <input
                            className='inputField'
                            type="text"
                            name="systemGenerated"
                            value="System Generated"
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label className="form-field">
                        Time (Railway):
                        <input
                            className='inputField'
                            type="text"
                            name="railwayTime"
                            value={accidentData.railwayTime}
                            onChange={handleChange}
                            placeholder='Time'

                        />
                    </label>
                    <label className="form-field">
                        Accident Place - State:
                        <select
                            className='inputField'
                            name="state"
                            onChange={handleChange}
                            disabled={isLoadingStates}
                            value={accidentData.state}>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Accident Place - City:
                        <select
                            className='inputField'
                            name="district"
                            value={accidentData.district}
                            onChange={handleChange}
                            disabled={isLoadingCities || !accidentData.state}
                        >
                            <option value="">Select City</option>
                            {!cities.error && cities.map(city => (
                                <option key={city.iso2} value={city.iso2}>{city.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field">
                        Accident Date:
                        <input
                            className='inputField'
                            type="date"
                            name="accidentDate"
                            value={accidentData.accidentDate}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </label>
                    <label className="form-field">
                        Reason of Accident:
                        <textarea
                            className='inputField'
                            name="reason"
                            value={accidentData.reason}
                            onChange={handleChange}
                            placeholder='Reason of Accident'
                        />
                    </label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>
                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Insurance Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Insured By:
                        <input
                            className='inputField'
                            name="insuredBy"
                            value={accidentData.insuredBy}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Intimated Date:
                        <input
                            type='date'
                            className='inputField'
                            name="intimatedDate"
                            value={accidentData.intimatedDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Intimation Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="intimationUpload"
                            ref={intimationUpload}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Policy Number:
                        <input
                            className='inputField'
                            name="policyNo"
                            value={accidentData.policyNo}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>
                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Driver Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Driver Name:
                        <input
                            className='inputField'
                            name="driverName"
                            value={accidentData.driverName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        D/L No:
                        <input
                            className='inputField'
                            name="DLNo"
                            value={accidentData.DLNo}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        D/L Number Validity:
                        <input
                            type='date'
                            className='inputField'
                            name="DLNoValidity"
                            value={accidentData.DLNoValidity}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Date Of Birth:
                        <input
                            className='inputField'
                            name="DOB"
                            value={accidentData.DOB}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>
                </div>
                <div class='header-container'>
                    <h2 className='bigtitle'>Police Reports</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Police Station:
                        <input
                            className='inputField'
                            name="policeStation"
                            value={accidentData.policeStation}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        FIR No:
                        <input
                            className='inputField'
                            name="FIRNo"
                            value={accidentData.FIRNo}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        FIR Date:
                        <input
                            type="date"
                            className='inputField'
                            name="firDate"
                            value={accidentData.firDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                        />
                    </label>
                    <label className="form-field">
                        FIR Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="firUpload"
                            ref={firUpload}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Advocate's Name :
                        <input
                            className='inputField'
                            name="advocateName"
                            value={accidentData.advocateName}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Advocate Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="advocateNo"
                            value={accidentData.advocateNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field">
                        Court Name:
                        <input
                            className='inputField'
                            name="courtName"
                            value={accidentData.courtName}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Release Order Upload:
                        <input
                            type='text'
                            className='inputField'
                            name="releaseUpload"
                            value={accidentData.releaseUpload}
                            onChange={handleChange}
                            placeholder='filed by advocate'
                            readOnly={true}

                        />
                    </label>
                    <label className="form-field">
                        Power Of Attorney:
                        <input
                            type='file'
                            className='inputField'
                            name="POA"
                            ref={POA}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>

                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Surveyor Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Spot Surveyor Name:
                        <input
                            className='inputField'
                            name="surveyorName"
                            value={accidentData.surveyorName}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="surveyorNo"
                            value={accidentData.surveyorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateOfSurvey"
                            value={accidentData.dateOfSurvey}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>
                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="remarksSurveyor"
                            value={accidentData.remarksSurveyor}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Material Surveyor Name:
                        <input
                            className='inputField'
                            name="materialSurveyorName"
                            value={accidentData.materialSurveyorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="materialSurveyorNo"
                            value={accidentData.materialSurveyorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateOfMaterialSurvey"
                            value={accidentData.dateOfMaterialSurvey}
                            onChange={handleChange}
                            min={accidentData.dateOfSurvey || accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="remarksMaterialSurvey"
                            value={accidentData.remarksMaterialSurvey}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>

                </div>
                <div className="form-row">
                    <label className="form-field">
                        Final Surveyor Name:
                        <input
                            className='inputField'
                            name="finalSurveyorName"
                            value={accidentData.finalSurveyorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="FinalSurveyorNo"
                            value={accidentData.FinalSurveyorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateOfFinalSurvey"
                            value={accidentData.dateOfFinalSurvey}
                            onChange={handleChange}
                            min={accidentData.dateOfMaterialSurvey || accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="remarksFinalSurvey"
                            value={accidentData.remarksFinalSurvey}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Investigator Name:
                        <input
                            className='inputField'
                            name="investigatorName"
                            value={accidentData.investigatorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Investigator Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="investigatorNo"
                            value={accidentData.investigatorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="investigationDate"
                            value={accidentData.investigationDate}
                            onChange={handleChange}
                            min={accidentData.dateOfMaterialSurvey || accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="investigatorRemarks"
                            value={accidentData.investigatorRemarks}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field"></label>

                </div>
                <div class='header-container'>
                    <h2 className='bigtitle'>Action Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Company Representative Name:
                        <input
                            className='inputField'
                            name="representativeName"
                            value={accidentData.representativeName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="representativeNo"
                            value={accidentData.representativeNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Representative Report Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="reportUpload"
                            ref={reportUpload}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Repaired On Spot Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateRepairedOnSpot"
                            value={accidentData.dateRepairedOnSpot}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Material Transshiped in Vehicle No:
                        <input
                            className='inputField'
                            name="transshippedVehicleNo"
                            value={accidentData.transshippedVehicleNo}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Vehicle Transshiped Date:
                        <input
                            type='date'
                            className='inputField'
                            name="transshippedDate"
                            value={accidentData.transshippedDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            className='inputField'
                            name="reportedFinalDestination"
                            value={accidentData.reportedFinalDestination}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            type='date'
                            className='inputField'
                            name="reportedFinalDestinationDate"
                            value={accidentData.reportedFinalDestinationDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Adhar Card of Company Representative:
                        <input
                            type='file'
                            className='inputField'
                            name="companyRepresentativeAdhar"
                            ref={companyRepresentativeAdhar}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field"></label>

                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Operational Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Deadline Date:
                        <input
                            type="date"
                            className='inputField'
                            name="deadLineDate"
                            value={accidentData.deadLineDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Actual Ready Date:
                        <input
                            type='date'
                            className='inputField'
                            name="readyDate"
                            value={accidentData.readyDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Re-Inspection Date:
                        <input
                            type="date"
                            className='inputField'
                            name="reInspectionDate"
                            value={accidentData.reInspectionDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Finally Released:
                        <input
                            type='date'
                            className='inputField'
                            name="finallyReleasedDate"
                            value={accidentData.finallyReleasedDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />
                    </label>
                    <label className="form-field"></label>

                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Analyses</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Total Days From Accident:
                        <input
                            className='inputField'
                            name="totalDaysFromAccident"
                            value={accidentData.totalDaysFromAccident}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Total Days In WorkShop:
                        <input
                            className='inputField'
                            name="daysInWorkShop"
                            value={accidentData.daysInWorkShop}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Deadline TAT:
                        <input
                            className='inputField'
                            name="deadlineTAT"
                            value={accidentData.deadlineTAT}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field"></label>
                    <label className="form-field"></label>
                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Docket Information</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Docket Name:
                        <input
                            className='inputField'
                            name="docketName"
                            value={accidentData.docketName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Docket Date:
                        <input
                            type="date"
                            className='inputField'
                            name="docketDate"
                            value={accidentData.docketDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Origin:
                        <input
                            className='inputField'
                            name="origin"
                            value={accidentData.origin}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Destination:
                        <input
                            className='inputField'
                            name="destination"
                            value={accidentData.destination}
                            onChange={handleChange}

                        />

                    </label>
                    <label className="form-field"></label>

                </div>

                <div className="form-row">
                    <label className="form-field">
                        Consignor Name:
                        <input
                            className='inputField'
                            name="consignor"
                            value={accidentData.consignor}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Consignee Name:
                        <input
                            className='inputField'
                            name="consignee"
                            value={accidentData.consignee}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Invoice Number:
                        <input
                            className='inputField'
                            name="invoiceNo"
                            value={accidentData.invoiceNo}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />

                    </label>

                    <label className="form-field"></label>

                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material:
                        <input
                            className='inputField'
                            name="material"
                            value={accidentData.material}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Package:
                        <input
                            className='inputField'
                            name="package"
                            value={accidentData.package}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Weight:
                        <input
                            className='inputField'
                            name="weight"
                            value={accidentData.weight}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                        />

                    </label>
                    <label className="form-field"></label>


                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>Task Details</h2>
                    <span class="mandatory-note">All fields are mandatory</span>
                </div>
                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>RC:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="RC"
                                        value="yes"
                                        checked={accidentData.RC === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="RC"
                                        value="no"
                                        checked={accidentData.RC === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.RC === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="RCdoc"
                                        ref={RCdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.RC === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="RCDate"
                                            value={accidentData.RCnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="RCassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.RCassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="RCremark"
                                            placeholder="Remark"
                                            value={accidentData.RCremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>insurance:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="insurance"
                                        value="yes"
                                        checked={accidentData.insurance === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="insurance"
                                        value="no"
                                        checked={accidentData.insurance === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.insurance === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="insurancedoc"
                                        ref={insurancedoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.insurance === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="insuranceDate"
                                            value={accidentData.insurancenoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="insuranceassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.insuranceassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="insuranceremark"
                                            placeholder="Remark"
                                            value={accidentData.insuranceremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>fitness:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="fitness"
                                        value="yes"
                                        checked={accidentData.fitness === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="fitness"
                                        value="no"
                                        checked={accidentData.fitness === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.fitness === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="fitnessdoc"
                                        ref={fitnessdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.fitness === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="fitnessDate"
                                            value={accidentData.fitnessnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="fitnessassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.fitnessassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="fitnessremark"
                                            placeholder="Remark"
                                            value={accidentData.fitnessremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>1/Y Permit:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="nationalPermit1Year"
                                        value="yes"
                                        checked={accidentData.nationalPermit1Year === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="nationalPermit1Year"
                                        value="no"
                                        checked={accidentData.nationalPermit1Year === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.nationalPermit1Year === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="nationalPermit1Yeardoc"
                                        ref={nationalPermit1Yeardoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.nationalPermit1Year === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="nationalPermit1YearDate"
                                            value={accidentData.nationalPermit1YearnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="nationalPermit1YearassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.nationalPermit1YearassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="nationalPermit1Yearremark"
                                            placeholder="Remark"
                                            value={accidentData.nationalPermit1Yearremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>5 Year:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="nationalPermit5Year"
                                        value="yes"
                                        checked={accidentData.nationalPermit5Year === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="nationalPermit5Year"
                                        value="no"
                                        checked={accidentData.nationalPermit5Year === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.nationalPermit5Year === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="nationalPermit5Yeardoc"
                                        ref={nationalPermit5Yeardoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.nationalPermit5Year === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="nationalPermit5YearDate"
                                            value={accidentData.nationalPermit5YearnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="nationalPermit5YearassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.nationalPermit5YearassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="nationalPermit5Yearremark"
                                            placeholder="Remark"
                                            value={accidentData.nationalPermit5Yearremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>tax Token:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="taxToken"
                                        value="yes"
                                        checked={accidentData.taxToken === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="taxToken"
                                        value="no"
                                        checked={accidentData.taxToken === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.taxToken === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="taxTokendoc"
                                        ref={taxTokendoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.taxToken === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="taxTokenDate"
                                            value={accidentData.taxTokennoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="taxTokenassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.taxTokenassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="taxTokenremark"
                                            placeholder="Remark"
                                            value={accidentData.taxTokenremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>DL:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="DLicence"
                                        value="yes"
                                        checked={accidentData.DLicence === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="DLicence"
                                        value="no"
                                        checked={accidentData.DLicence === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.DLicence === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="DLicencedoc"
                                        ref={DLicencedoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.DLicence === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="DLicenceDate"
                                            value={accidentData.DLicencenoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="DLicenceassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.DLicenceassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="DLicenceremark"
                                            placeholder="Remark"
                                            value={accidentData.DLicenceremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>DL Ver:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="DLVer"
                                        value="yes"
                                        checked={accidentData.DLVer === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="DLVer"
                                        value="no"
                                        checked={accidentData.DLVer === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.DLVer === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="DLVerdoc"
                                        ref={DLVerdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.DLVer === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="DLVerDate"
                                            value={accidentData.DLVernoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="DLVerassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.DLVerassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="DLVerremark"
                                            placeholder="Remark"
                                            value={accidentData.DLVerremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>LR:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="LR"
                                        value="yes"
                                        checked={accidentData.LR === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="LR"
                                        value="no"
                                        checked={accidentData.LR === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.LR === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="LRdoc"
                                        ref={LRdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.LR === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="LRDate"
                                            value={accidentData.LRnoDate}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="LRassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.LRassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="LRremark"
                                            placeholder="Remark"
                                            value={accidentData.LRremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>PUC:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="PUC"
                                        value="yes"
                                        checked={accidentData.PUC === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="PUC"
                                        value="no"
                                        checked={accidentData.PUC === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.PUC === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="PUCdoc"
                                        ref={PUCdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.PUC === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="PUCDate"
                                            value={accidentData.PUCnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="PUCassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.PUCassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="PUCremark"
                                            placeholder="Remark"
                                            value={accidentData.PUCremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>


                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Report:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="policeReport"
                                        value="yes"
                                        checked={accidentData.policeReport === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="policeReport"
                                        value="no"
                                        checked={accidentData.policeReport === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.policeReport === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="policeReportdoc"
                                        ref={policeReportdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.policeReport === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="policeReportDate"
                                            value={accidentData.policeReportnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="policeReportassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.policeReportassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="policeReportremark"
                                            placeholder="Remark"
                                            value={accidentData.policeReportremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Intimation:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="intimation"
                                        value="yes"
                                        checked={accidentData.intimation === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="intimation"
                                        value="no"
                                        checked={accidentData.intimation === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.intimation === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="intimationdoc"
                                        ref={intimationdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.intimation === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="intimationDate"
                                            value={accidentData.intimationnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="intimationassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.intimationassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="intimationremark"
                                            placeholder="Remark"
                                            value={accidentData.intimationremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>spotSurvey:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="spotSurvey"
                                        value="yes"
                                        checked={accidentData.spotSurvey === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="spotSurvey"
                                        value="no"
                                        checked={accidentData.spotSurvey === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.spotSurvey === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="spotSurveydoc"
                                        ref={spotSurveydoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.spotSurvey === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="spotSurveyDate"
                                            value={accidentData.spotSurveynoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="spotSurveyassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.spotSurveyassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="spotSurveyremark"
                                            placeholder="Remark"
                                            value={accidentData.spotSurveyremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>spotReport:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="spotReport"
                                        value="yes"
                                        checked={accidentData.spotReport === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="spotReport"
                                        value="no"
                                        checked={accidentData.spotReport === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.spotReport === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="spotReportdoc"
                                        ref={spotReportdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.spotReport === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="spotReportDate"
                                            value={accidentData.spotReportnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="spotReportassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.spotReportassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="spotReportremark"
                                            placeholder="Remark"
                                            value={accidentData.spotReportremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>estimate:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="estimateGiven"
                                        value="yes"
                                        checked={accidentData.estimateGiven === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="estimateGiven"
                                        value="no"
                                        checked={accidentData.estimateGiven === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.estimateGiven === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="estimateGivendoc"
                                        ref={estimateGivendoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.estimateGiven === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="estimateGivenDate"
                                            value={accidentData.estimateGivennoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="estimateGivenassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.estimateGivenassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="estimateGivenremark"
                                            placeholder="Remark"
                                            value={accidentData.estimateGivenremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Payment:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="advancePayment"
                                        value="yes"
                                        checked={accidentData.advancePayment === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="advancePayment"
                                        value="no"
                                        checked={accidentData.advancePayment === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.advancePayment === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="advancePaymentdoc"
                                        ref={advancePaymentdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.advancePayment === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="advancePaymentDate"
                                            value={accidentData.advancePaymentnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="advancePaymentassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.advancePaymentassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="advancePaymentremark"
                                            placeholder="Remark"
                                            value={accidentData.advancePaymentremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>F/survey:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="finalsurveyInitial"
                                        value="yes"
                                        checked={accidentData.finalsurveyInitial === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="finalsurveyInitial"
                                        value="no"
                                        checked={accidentData.finalsurveyInitial === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.finalsurveyInitial === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="finalsurveyInitialdoc"
                                        ref={finalsurveyInitialdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.finalsurveyInitial === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="finalsurveyInitialDate"
                                            value={accidentData.finalsurveyInitialnoDate}
                                            onChange={handleChange}
                                        />
                                        min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="finalsurveyInitialassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.finalsurveyInitialassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="finalsurveyInitialremark"
                                            placeholder="Remark"
                                            value={accidentData.finalsurveyInitialremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>2nd/Survey</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="finalSurvey2nd"
                                        value="yes"
                                        checked={accidentData.finalSurvey2nd === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="finalSurvey2nd"
                                        value="no"
                                        checked={accidentData.finalSurvey2nd === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.finalSurvey2nd === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="finalSurvey2nddoc"
                                        ref={finalSurvey2nddoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.finalSurvey2nd === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="finalSurvey2ndDate"
                                            value={accidentData.finalSurvey2ndnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="finalSurvey2ndassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.finalSurvey2ndassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="finalSurvey2ndremark"
                                            placeholder="Remark"
                                            value={accidentData.finalSurvey2ndremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Approval:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="workApproval"
                                        value="yes"
                                        checked={accidentData.workApproval === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="workApproval"
                                        value="no"
                                        checked={accidentData.workApproval === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.workApproval === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="workApprovaldoc"
                                        ref={workApprovaldoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.workApproval === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="workApprovalDate"
                                            value={accidentData.workApprovalnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="workApprovalassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.workApprovalassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="workApprovalremark"
                                            placeholder="Remark"
                                            value={accidentData.workApprovalremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Inspection</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="reinspection"
                                        value="yes"
                                        checked={accidentData.reinspection === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="reinspection"
                                        value="no"
                                        checked={accidentData.reinspection === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.reinspection === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="reinspectiondoc"
                                        ref={reinspectiondoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.reinspection === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="reinspectionDate"
                                            value={accidentData.reinspectionnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="reinspectionassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.reinspectionassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="reinspectionremark"
                                            placeholder="Remark"
                                            value={accidentData.reinspectionremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>finalBill:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="finalBill"
                                        value="yes"
                                        checked={accidentData.finalBill === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="finalBill"
                                        value="no"
                                        checked={accidentData.finalBill === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.finalBill === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="finalBilldoc"
                                        ref={finalBilldoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.finalBill === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="finalBillDate"
                                            value={accidentData.finalBillnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="finalBillassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.finalBillassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="finalBillremark"
                                            placeholder="Remark"
                                            value={accidentData.finalBillremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Balance:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="paymentBalance"
                                        value="yes"
                                        checked={accidentData.paymentBalance === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="paymentBalance"
                                        value="no"
                                        checked={accidentData.paymentBalance === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.paymentBalance === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="paymentBalancedoc"
                                        ref={paymentBalancedoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.paymentBalance === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="paymentBalanceDate"
                                            value={accidentData.paymentBalancenoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="paymentBalanceassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.paymentBalanceassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="paymentBalanceremark"
                                            placeholder="Remark"
                                            value={accidentData.paymentBalanceremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField inputField">
                                <label>settelMent:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="settelMent"
                                        value="yes"
                                        checked={accidentData.settelMent === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="settelMent"
                                        value="no"
                                        checked={accidentData.settelMent === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.settelMent === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="settelMentdoc"
                                        ref={settelMentdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.settelMent === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="settelMentDate"
                                            value={accidentData.settelMentnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="settelMentassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.settelMentassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="settelMentremark"
                                            placeholder="Remark"
                                            value={accidentData.settelMentremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField inputField">
                                <label>claimForm:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="claimForm"
                                        value="yes"
                                        checked={accidentData.claimForm === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="claimForm"
                                        value="no"
                                        checked={accidentData.claimForm === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {accidentData.claimForm === 'yes' && (
                                <div className="form-field">
                                    <input
                                        type="file"
                                        className='inputField'
                                        name="claimFormdoc"
                                        ref={claimFormdoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {accidentData.claimForm === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField'
                                            name="claimFormDate"
                                            value={accidentData.claimFormnoDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="claimFormassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.claimFormassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField'
                                            name="claimFormremark"
                                            placeholder="Remark"
                                            value={accidentData.claimFormremark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='form-field'></div>
                </div>

                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}



                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }} onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default VehicleClaimRegistration;
