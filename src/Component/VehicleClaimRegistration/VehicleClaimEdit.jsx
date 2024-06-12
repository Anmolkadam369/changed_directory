import React, { useState, useEffect, useRef } from 'react';
import styles from './VehicleClaimRegistration.css';
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import axios from 'axios';
import { loadStates, loadCities } from '../StateAPI';
import { Alert } from '@mui/material';
import backendUrl from '../../environment';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';


const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const VehicleClaimEdit = ({ id, onUpdate }) => {
    const location = useLocation();
    // const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const [comingData, setComingData] = useState([]);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [IsReadOnly, setIsReadOnly] = useState(true);

    const [totalDaysFromAccident, setTotalDaysFromAccident] = useState('');
    const [totalDaysInWorkshop, setTotalDaysInWorkshop] = useState('');
    const [calculatedDeadlineTAT, setCalculatedDeadlineTAT] = useState('');

    const [isIntimationModalOpen, setIsIntimationModalOpen] = useState(false);
    const [isFIRModalOpen, setIsFIRModalOpen] = useState(false);
    const [isPOAModalOpen, setIsPOAModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isAdharModalOpen, setIsAdharModalOpen] = useState(false);


    const openIntimationModal = () => setIsIntimationModalOpen(true);
    const closeIntimationModal = () => setIsIntimationModalOpen(false);
    const openFIRModal = () => setIsFIRModalOpen(true);
    const closeFIRModal = () => setIsFIRModalOpen(false);
    const openPOAModal = () => setIsPOAModalOpen(true);
    const closePOAModal = () => setIsPOAModalOpen(false);
    const openReportModal = () => setIsReportModalOpen(true);
    const closeReportModal = () => setIsReportModalOpen(false);
    const openAdharModal = () => setIsAdharModalOpen(true);
    const closeAdharModal = () => setIsAdharModalOpen(false);



    useEffect(() => {
        loadStates();
        getDataById(id);
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; // Return an empty string if the date is not provided
        const [year, month, day] = dateString.split('-');
        return `${year}-${month}-${day}`; // Return the date in YYYY-MM-DD format
    };

    const todayDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (comingData) {
            setAccidentData(prevFormData => ({
                ...prevFormData,
                accidentFileNo: comingData.accidentFileNo || "",
                dateTime: formatDateForInput(comingData.dateTime),
                // systemGenerated: formatDateForInput(comingData.systemGener   ated),
                railwayTime: formatDateForInput(comingData.railwayTime),
                state: comingData.state || "",
                district: comingData.district || "",
                accidentDate: formatDateForInput(comingData.accidentDate),
                reason: comingData.reason || "",
                insuredBy: comingData.insuredBy || "",
                intimatedDate: formatDateForInput(comingData.intimatedDate),
                intimationUpload: comingData.intimationUpload || "",
                policyNo: comingData.policyNo || "",
                driverName: comingData.driverName || "",
                DLNo: comingData.DLNo || "",
                DLNoValidity: formatDateForInput(comingData.DLNoValidity),
                DOB: formatDateForInput(comingData.DOB),
                policeStation: comingData.policeStation || "",
                FIRNo: comingData.FIRNo || "",
                firDate: formatDateForInput(comingData.firDate),
                firUpload: comingData.firUpload || "",
                advocateName: comingData.advocateName || "",
                advocateNo: comingData.advocateNo || "",
                courtName: comingData.courtName || "",
                POA: comingData.POA || "",
                companyRepresentativeAdhar: comingData.companyRepresentativeAdhar || "",

                surveyorName: comingData.surveyorName || "",
                surveyorNo: comingData.surveyorNo || "",
                dateOfSurvey: formatDateForInput(comingData.dateOfSurvey),
                remarksSurveyor: comingData.remarksSurveyor || "",
                materialSurveyorName: comingData.materialSurveyorName || "",
                materialSurveyorNo: comingData.materialSurveyorNo || "",
                dateOfMaterialSurvey: formatDateForInput(comingData.dateOfMaterialSurvey),
                remarksMaterialSurvey: comingData.remarksMaterialSurvey || "",
                finalSurveyorName: comingData.finalSurveyorName || "",
                FinalSurveyorNo: comingData.FinalSurveyorNo || "",
                dateOfFinalSurvey: formatDateForInput(comingData.dateOfFinalSurvey),
                remarksFinalSurvey: comingData.remarksFinalSurvey || "",
                investigatorName: comingData.investigatorName || "",
                investigatorNo: comingData.investigatorNo || "",
                investigationDate: formatDateForInput(comingData.investigationDate),
                investigatorRemarks: comingData.investigatorRemarks || "",
                representativeName: comingData.representativeName || "",
                representativeNo: comingData.representativeNo || "",
                reportUpload: comingData.reportUpload || "",
                dateRepairedOnSpot: comingData.dateRepairedOnSpot,
                transshippedVehicleNo: comingData.transshippedVehicleNo || "",
                transshippedDate: formatDateForInput(comingData.transshippedDate),
                reportedFinalDestination: comingData.reportedFinalDestination || "",
                reportedFinalDestinationDate: formatDateForInput(comingData.reportedFinalDestinationDate),
                deadLineDate: formatDateForInput(comingData.deadLineDate),
                readyDate: formatDateForInput(comingData.readyDate),
                reInspectionDate: formatDateForInput(comingData.reInspectionDate),
                finallyReleasedDate: formatDateForInput(comingData.finallyReleasedDate),
                totalDaysFromAccident: comingData.totalDaysFromAccident || "",
                daysInWorkShop: comingData.daysInWorkShop || "",
                deadlineTAT: comingData.deadlineTAT || "",
                docketName: comingData.docketName || "",
                docketDate: formatDateForInput(comingData.docketDate),
                origin: comingData.origin || "",
                destination: comingData.destination || "",
                consignor: comingData.consignor || "",
                consignee: comingData.consignee || "",
                invoiceNo: comingData.invoiceNo || "",
                invoiceDate: formatDateForInput(comingData.invoiceDate),
                material: comingData.material || "",
                package: comingData.package || "",
                weight: comingData.weight || "",

                RC: comingData.RC || "",
                RCdoc: comingData.RCdoc || '',
                RCDate: comingData.RCDate || "",
                RCassignedTo: comingData.RCassignedTo || "",
                RCremark: comingData.RCremark || "",

                insurance: comingData.insurance || "",
                insurancedoc: comingData.insurancedoc || '',
                insuranceDate: comingData.insuranceDate || "",
                insuranceassignedTo: comingData.insuranceassignedTo || "",
                insuranceremark: comingData.insuranceremark || "",

                fitness: comingData.fitness || "",
                fitnessdoc: comingData.fitnessdoc || '',
                fitnessDate: comingData.fitnessDate || "",
                fitnessassignedTo: comingData.fitnessassignedTo || "",
                fitnessremark: comingData.fitnessremark || "",

                nationalPermit1Year: comingData.nationalPermit1Year || "",
                nationalPermit1Yeardoc: comingData.nationalPermit1Yeardoc || "",
                nationalPermit1YearDate: comingData.nationalPermit1YearDate || "",
                nationalPermit1YearassignedTo: comingData.nationalPermit1YearassignedTo || "",
                nationalPermit1Yearremark: comingData.nationalPermit1Yearremark || "",

                nationalPermit5Year: comingData.nationalPermit5Year || "",
                nationalPermit5Yeardoc: comingData.nationalPermit5Yeardoc || "",
                nationalPermit5YearDate: comingData.nationalPermit5YearDate || "",
                nationalPermit5YearassignedTo: comingData.nationalPermit5YearassignedTo || "",
                nationalPermit5Yearremark: comingData.nationalPermit5Yearremark || "",

                taxToken: comingData.taxToken || "",
                taxTokendoc: comingData.taxTokendoc || "",
                taxTokenDate: comingData.taxTokenDate || "",
                taxTokenassignedTo: comingData.taxTokenassignedTo || "",
                taxTokenremark: comingData.taxTokenremark || "",

                DLicence: comingData.DLicence || "",
                DLicencedoc: comingData.DLicencedoc || "",
                DLicenceDate: comingData.DLicenceDate || "",
                DLicenceassignedTo: comingData.DLicenceassignedTo || "",
                DLicenceremark: comingData.DLicenceremark || "",


                DLVer: comingData.DLVer || "",
                DLVerdoc: comingData.DLVerdoc || "",
                DLVerDate: comingData.DLVerDate || "",
                DLVerassignedTo: comingData.DLVerassignedTo || "",
                DLVerremark: comingData.DLVerremark || "",

                LR: comingData.LR || "",
                LRdoc: comingData.LRdoc || "",
                LRDate: comingData.LRDate || "",
                LRassignedTo: comingData.LRassignedTo || "",
                LRremark: comingData.LRremark || "",

                PUC: comingData.PUC || "",
                PUCdoc: comingData.PUCdoc || "",
                PUCDate: comingData.PUCDate || "",
                PUCassignedTo: comingData.PUCassignedTo || "",
                PUCremark: comingData.PUCremark || "",

                policeReport: comingData.policeReport || "",
                policeReportdoc: comingData.policeReportdoc || "",
                policeReportDate: comingData.policeReportDate || "",
                policeReportassignedTo: comingData.policeReportassignedTo || "",
                policeReportremark: comingData.policeReportremark || "",

                intimation: comingData.intimation || "",
                intimationdoc: comingData.intimationdoc || "",
                intimationDate: comingData.intimationDate || "",
                intimationassignedTo: comingData.intimationassignedTo || "",
                intimationremark: comingData.intimationremark || "",


                spotSurvey: comingData.spotSurvey || "",
                spotSurveydoc: comingData.spotSurveydoc || "",
                spotSurveyDate: comingData.spotSurveyDate || "",
                spotSurveyassignedTo: comingData.spotSurveyassignedTo || "",
                spotSurveyremark: comingData.spotSurveyremark || "",

                spotReport: comingData.spotReport || "",
                spotReportdoc: comingData.spotReportdoc || "",
                spotReportDate: comingData.spotReportDate || "",
                spotReportassignedTo: comingData.spotReportassignedTo || "",
                spotReportremark: comingData.spotReportremark || "",

                estimateGiven: comingData.estimateGiven || "",
                estimateGivendoc: comingData.estimateGivendoc || "",
                estimateGivenDate: comingData.estimateGivenDate || "",
                estimateGivenassignedTo: comingData.estimateGivenassignedTo || "",
                estimateGivenremark: comingData.estimateGivenremark || "",

                advancePayment: comingData.advancePayment || "",
                advancePaymentdoc: comingData.advancePaymentdoc || "",
                advancePaymentDate: comingData.advancePaymentDate || "",
                advancePaymentassignedTo: comingData.advancePaymentassignedTo || "",
                advancePaymentremark: comingData.advancePaymentremark || "",

                finalsurveyInitial: comingData.finalsurveyInitial || "",
                finalsurveyInitialdoc: comingData.finalsurveyInitialdoc || "",
                finalsurveyInitialDate: comingData.finalsurveyInitialDate || "",
                finalsurveyInitialassignedTo: comingData.finalsurveyInitialassignedTo || "",
                finalsurveyInitialremark: comingData.finalsurveyInitialremark || "",

                finalSurvey2nd: comingData.finalSurvey2nd || "",
                finalSurvey2nddoc: comingData.finalSurvey2nddoc || "",
                finalSurvey2ndDate: comingData.finalSurvey2ndDate || "",
                finalSurvey2ndassignedTo: comingData.finalSurvey2ndassignedTo || "",
                finalSurvey2ndremark: comingData.finalSurvey2ndremark || "",

                workApproval: comingData.workApproval || "",
                workApprovaldoc: comingData.workApprovaldoc || "",
                workApprovalDate: comingData.workApprovalDate || "",
                workApprovalassignedTo: comingData.workApprovalassignedTo || "",
                workApprovalremark: comingData.workApprovalremark || "",

                reinspection: comingData.reinspection || "",
                reinspectiondoc: comingData.reinspectiondoc || "",
                reinspectionDate: comingData.reinspectionDate || "",
                reinspectionassignedTo: comingData.reinspectionassignedTo || "",
                reinspectionremark: comingData.reinspectionremark || "",

                finalBill: comingData.finalBill || "",
                finalBilldoc: comingData.finalBilldoc || "",
                finalBillDate: comingData.finalBillDate || "",
                finalBillassignedTo: comingData.finalBillassignedTo || "",
                finalBillremark: comingData.finalBillremark || "",

                paymentBalance: comingData.paymentBalance || "",
                paymentBalancedoc: comingData.paymentBalancedoc || "",
                paymentBalanceDate: comingData.paymentBalanceDate || "",
                paymentBalanceassignedTo: comingData.paymentBalanceassignedTo || "",
                paymentBalanceremark: comingData.paymentBalanceremark || "",

                settelMent: comingData.settelMent || "",
                settelMentdoc: comingData.settelMentdoc || "",
                settelMentDate: formatDateForInput(comingData.settelMentDate) || "",
                settelMentassignedTo: comingData.settelMentassignedTo || "",
                settelMentremark: comingData.settelMentremark || "",


                claimForm: comingData.claimForm || "",
                claimFormdoc: comingData.claimFormdoc || '',
                claimFormDate: comingData.claimFormDate || "",
                claimFormassignedTo: comingData.claimFormassignedTo || "",
                claimFormremark: comingData.claimFormremark || "",
            }));
        }
    }, [comingData]);


    const [accidentData, setAccidentData] = useState({
        dateTime: '',
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
        companyRepresentativeAdhar: "",

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
        material: "",
        package: "",
        weight: "",
        invoiceDate: "",//date

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

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getVehicle/${id}`);
        console.log("getDataById", response.data.data)
        setComingData(response.data.data[0])
    }

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            console.log("myfile")
            if (files[0] && files[0].size > 2097152) {
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
    console.log('submitted:', accidentData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', accidentData);
        setIsLoading(true)
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
                method: 'PUT',
                url: `${backendUrl}/api/updateVehicleClaim/${id}/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });
            if (response) {
                console.log("response", response.data);
                setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
                setIsLoading(false);
                setTimeout(() => {
                    onUpdate()
                })
            }
        }

        catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            setIsLoading(false);
        }
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


    const calculateTotalDaysFromAccident = () => {
        const { reInspectionDate, reportedFinalDestinationDate } = accidentData;
        if (reInspectionDate && reportedFinalDestinationDate) {
            const date1 = new Date(reInspectionDate);
            const date2 = new Date(reportedFinalDestinationDate);
            const timeDiff = Math.abs(date1 - date2);
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setTotalDaysFromAccident(daysDiff);
        } else {
            setTotalDaysFromAccident('');
        }
    };

    const calculateDaysInWorkshop = () => {
        const { accidentDate, finallyReleasedDate } = accidentData;
        if (accidentDate && finallyReleasedDate) {
            const date1 = new Date(accidentDate);
            const date2 = new Date(finallyReleasedDate);
            const timeDiff = Math.abs(date1 - date2);
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setTotalDaysInWorkshop(daysDiff);
        } else {
            setTotalDaysInWorkshop('');
        }
    };

    const calculateDeadlineTAT = () => {
        const { deadLineDate, dateOfFinalSurvey } = accidentData;
        if (deadLineDate && dateOfFinalSurvey) {
            const date1 = new Date(deadLineDate);
            const date2 = new Date(dateOfFinalSurvey);
            const timeDiff = Math.abs(date1 - date2);
            console.log("TIMEDIF", timeDiff)
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setCalculatedDeadlineTAT(daysDiff);
        } else {
            setCalculatedDeadlineTAT('');
        }
    };

    useEffect(() => {
        calculateTotalDaysFromAccident();
        calculateDaysInWorkshop();
        calculateDeadlineTAT();
    }, [accidentData.accidentDate, accidentData.finallyReleasedDate, accidentData.dateOfFinalSurvey, accidentData.deadLineDate, accidentData.reInspectionDate, accidentData.reportedFinalDestinationDate]);




    const editable = () => {
        setIsReadOnly(!IsReadOnly)
    }
    const handleBack = () => {
        onUpdate()
    }

    return (
        <div className='container'>
            <Helmet>
                <title>Accident Vehicle Info Edit - Claimpro</title>
                <meta name="description" content="Edit the Accident Vehicle Information." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/VehicleClaimEdit`} />
            </Helmet>

            {/* <form>
                <div className="form-row">
                    <label className="form-field">
                        Date & Time:
                        <input
                            className='inputField form-control'
                            type="text"
                            name="dateTime"
                            value={accidentData.dateTime}
                            onChange={handleChange}
                            readOnly={true}
                        />
                    </label>
                    <label className="form-field">
                        System Generated - Vehicle No.:
                        <input
                            className='inputField form-control'
                            type="text"
                            name="systemGenerated"
                            value={accidentData.systemGenerated}
                            onChange={handleChange}
                            readOnly={true}
                        />
                    </label>
                    <label className="form-field">
                        Time (Railway):
                        <input
                            className='inputField form-control'
                            type="text"
                            name="railwayTime"
                            value={accidentData.railwayTime}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Accident Place - State:
                        <select
                            className='inputField form-control'
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
                            className='inputField form-control'
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
                            className='inputField form-control'
                            type="text"
                            name="accidentDate"
                            value={accidentData.accidentDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Reason of Accident:
                        <textarea
                            className='inputField form-control'
                            name="reason"
                            value={accidentData.reason}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Insurance Details</h2>

                <div className="form-row">
                    <label className="form-field">
                        Insured By:
                        <input
                            className='inputField form-control'
                            name="insuredBy"
                            value={accidentData.insuredBy}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Intimated Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="intimatedDate"
                            value={accidentData.intimatedDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Intimation Upload:
                        <input
                            type='file'
                            className='inputField form-control'
                            name="intimationUpload"
                            value={accidentData.intimationUpload}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Policy Number:
                        <input
                            className='inputField form-control'
                            name="policyNo"
                            value={accidentData.policyNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Driver Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Driver Name:
                        <input
                            className='inputField form-control'
                            name="driverName"
                            value={accidentData.driverName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        D/L No:
                        <input
                            className='inputField form-control'
                            name="DLNo"
                            value={accidentData.DLNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        D/L Number Validity:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="DLNoValidity"
                            value={accidentData.DLNoValidity}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Date Of Birth:
                        <input
                            className='inputField form-control'
                            name="DOB"
                            value={accidentData.DOB}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Police Reports</h2>
                <div className="form-row">
                    <label className="form-field">
                        Police Station:
                        <input
                            className='inputField form-control'
                            name="policeStation"
                            value={accidentData.policeStation}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        FIR No:
                        <input
                            className='inputField form-control'
                            name="FIRNo"
                            value={accidentData.FIRNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        FIR Date:
                        <input
                            type="date"
                            className='inputField form-control'
                            name="firDate"
                            value={accidentData.firDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        FIR Upload:
                        <input
                            type='file'
                            className='inputField form-control'
                            name="firUpload"
                            value={accidentData.firUpload}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Advocate Name:
                        <input
                            className='inputField form-control'
                            name="advocateName"
                            value={accidentData.advocateName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Advocate Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="advocateNo"
                            value={accidentData.advocateNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Court Name:
                        <input
                            className='inputField form-control'
                            name="courtName"
                            value={accidentData.courtName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Release Order Upload:
                        <input
                            type='file'
                            className='inputField form-control'
                            name="releaseUpload"
                            value={accidentData.releaseUpload}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Surveyor Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Spot Surveyor Name:
                        <input
                            className='inputField form-control'
                            name="surveyorName"
                            value={accidentData.surveyorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="surveyorNo"
                            value={accidentData.surveyorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateOfSurvey"
                            value={accidentData.dateOfSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="remarksSurveyor"
                            value={accidentData.remarksSurveyor}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material Surveyor Name:
                        <input
                            className='inputField form-control'
                            name="materialSurveyorName"
                            value={accidentData.materialSurveyorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="materialSurveyorNo"
                            value={accidentData.materialSurveyorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateOfMaterialSurvey"
                            value={accidentData.dateOfMaterialSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="remarksMaterialSurvey"
                            value={accidentData.remarksMaterialSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Final Surveyor Name:
                        <input
                            className='inputField form-control'
                            name="finalSurveyorName"
                            value={accidentData.finalSurveyorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="FinalSurveyorNo"
                            value={accidentData.FinalSurveyorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateOfFinalSurvey"
                            value={accidentData.dateOfFinalSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="remarksFinalSurvey"
                            value={accidentData.remarksFinalSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Investigator Name:
                        <input
                            className='inputField form-control'
                            name="investigatorName"
                            value={accidentData.investigatorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Investigator Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="investigatorNo"
                            value={accidentData.investigatorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="investigationDate"
                            value={accidentData.investigationDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="investigatorRemarks"
                            value={accidentData.investigatorRemarks}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Action Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Company Representative Name:
                        <input
                            className='inputField form-control'
                            name="representativeName"
                            value={accidentData.representativeName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />  
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="representativeNo"
                            value={accidentData.representativeNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Representative Report Upload:
                        <input
                            type='file'
                            className='inputField form-control'
                            name="reportUpload"
                            value={accidentData.reportUpload}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Repaired On Spot Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateRepairedOnSpot"
                            value={accidentData.dateRepairedOnSpot}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material Transshiped in Vehicle No:
                        <input
                            className='inputField form-control'
                            name="transshippedVehicleNo"
                            value={accidentData.transshippedVehicleNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Transshiped Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="transshippedDate"
                            value={accidentData.transshippedDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            className='inputField form-control'
                            name="reportedFinalDestination"
                            value={accidentData.reportedFinalDestination}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="reportedFinalDestinationDate"
                            value={accidentData.reportedFinalDestinationDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>
                <h2 className='heading-box'>Operational Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Deadline Date:
                        <input
                            type="date"
                            className='inputField form-control'
                            name="deadLineDate"
                            value={accidentData.deadLineDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Actual Ready Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="readyDate"
                            value={accidentData.readyDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Re-Inspection Date:
                        <input
                            type="date"
                            className='inputField form-control'
                            name="reInspectionDate"
                            value={accidentData.reInspectionDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Finally Released:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="finallyReleasedDate"
                            value={accidentData.finallyReleasedDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                </div>

                <h2 className='heading-box'>Analyses</h2>

                <div className="form-row">
                    <label className="form-field">
                        Total Days From Accident:
                        <input
                            className='inputField form-control'
                            name="totalDaysFromAccident"
                            value={accidentData.totalDaysFromAccident}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Total Days In WorkShop:
                        <input
                            className='inputField form-control'
                            name="daysInWorkShop"
                            value={accidentData.daysInWorkShop}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Deadline TAT:
                        <input
                            className='inputField form-control'
                            name="deadlineTAT"
                            value={accidentData.deadlineTAT}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>


                </div>

                <h2 className='heading-box'>Docket Information</h2>
                <div className="form-row">
                    <label className="form-field">
                        Docket Name:
                        <input
                            className='inputField form-control'
                            name="docketName"
                            value={accidentData.docketName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Docket Date:
                        <input
                            className='inputField form-control'
                            name="docketDate"
                            value={accidentData.docketDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Origin:
                        <input
                            className='inputField form-control'
                            name="origin"
                            value={accidentData.origin}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Destination:
                        <input
                            className='inputField form-control'
                            name="destination"
                            value={accidentData.destination}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />

                    </label>


                </div>

                <div className="form-row">
                    <label className="form-field">
                        Consignor Name:
                        <input
                            className='inputField form-control'
                            name="consignor"
                            value={accidentData.consignor}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Consignee Name:
                        <input
                            className='inputField form-control'
                            name="consignee"
                            value={accidentData.consignee}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            
                        />
                    </label>

                    <label className="form-field">
                        Invoice Number:
                        <input
                            className='inputField form-control'
                            name="invoiceNo"
                            value={accidentData.invoiceNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />

                    </label>


                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material:
                        <input
                            className='inputField form-control'
                            name="material"
                            value={accidentData.material}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Package:
                        <input
                            className='inputField form-control'
                            name="package"
                            value={accidentData.package}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Weight:
                        <input
                            className='inputField form-control'
                            name="weight"
                            value={accidentData.weight}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />

                    </label>


                </div>

                <h2 className='heading-box'>Task Details</h2>
                <div className='form-row'>

            
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
                                    className='inputField form-control'
                                    name="RCdoc"
                                    value={accidentData.RCdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.RC === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="RCDate"
                                        value={accidentData.RCDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="RCassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.RCassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="RCremark"
                                        placeholder="Remark"
                                        value={accidentData.RCremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="insurancedoc"
                                    value={accidentData.insurancedoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.insurance === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="insuranceDate"
                                        value={accidentData.insurancenoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="insuranceassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.insuranceassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="insuranceremark"
                                        placeholder="Remark"
                                        value={accidentData.insuranceremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="fitnessdoc"
                                    value={accidentData.fitnessdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.fitness === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="fitnessDate"
                                        value={accidentData.fitnessnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="fitnessassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.fitnessassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="fitnessremark"
                                        placeholder="Remark"
                                        value={accidentData.fitnessremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>Permit 1 Year:</label>
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
                                    className='inputField form-control'
                                    name="nationalPermit1Yeardoc"
                                    value={accidentData.nationalPermit1Yeardoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.nationalPermit1Year === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="nationalPermit1YearDate"
                                        value={accidentData.nationalPermit1YearnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="nationalPermit1YearassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.nationalPermit1YearassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="nationalPermit1Yearremark"
                                        placeholder="Remark"
                                        value={accidentData.nationalPermit1Yearremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>Permit 5 Year:</label>
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
                                    className='inputField form-control'
                                    name="nationalPermit5Yeardoc"
                                    value={accidentData.nationalPermit5Yeardoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.nationalPermit5Year === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="nationalPermit5YearDate"
                                        value={accidentData.nationalPermit5YearnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="nationalPermit5YearassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.nationalPermit5YearassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="nationalPermit5Yearremark"
                                        placeholder="Remark"
                                        value={accidentData.nationalPermit5Yearremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="taxTokendoc"
                                    value={accidentData.taxTokendoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.taxToken === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="taxTokenDate"
                                        value={accidentData.taxTokennoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="taxTokenassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.taxTokenassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="taxTokenremark"
                                        placeholder="Remark"
                                        value={accidentData.taxTokenremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>Driving Licence:</label>
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
                                    className='inputField form-control'
                                    name="DLicencedoc"
                                    value={accidentData.DLicencedoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.DLicence === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="DLicenceDate"
                                        value={accidentData.DLicencenoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="DLicenceassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.DLicenceassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="DLicenceremark"
                                        placeholder="Remark"
                                        value={accidentData.DLicenceremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>DL Verification:</label>
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
                                    className='inputField form-control'
                                    name="DLVerdoc"
                                    value={accidentData.DLVerdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.DLVer === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="DLVerDate"
                                        value={accidentData.DLVernoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="DLVerassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.DLVerassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="DLVerremark"
                                        placeholder="Remark"
                                        value={accidentData.DLVerremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="LRdoc"
                                    value={accidentData.LRdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.LR === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="LRDate"
                                        value={accidentData.LRnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="LRassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.LRassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="LRremark"
                                        placeholder="Remark"
                                        value={accidentData.LRremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="PUCdoc"
                                    value={accidentData.PUCdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.PUC === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="PUCDate"
                                        value={accidentData.PUCnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="PUCassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.PUCassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="PUCremark"
                                        placeholder="Remark"
                                        value={accidentData.PUCremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>police Report:</label>
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
                                    className='inputField form-control'
                                    name="policeReportdoc"
                                    value={accidentData.policeReportdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.policeReport === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="policeReportDate"
                                        value={accidentData.policeReportnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="policeReportassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.policeReportassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="policeReportremark"
                                        placeholder="Remark"
                                        value={accidentData.policeReportremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="intimationdoc"
                                    value={accidentData.intimationdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.intimation === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="intimationDate"
                                        value={accidentData.intimationnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="intimationassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.intimationassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="intimationremark"
                                        placeholder="Remark"
                                        value={accidentData.intimationremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="spotSurveydoc"
                                    value={accidentData.spotSurveydoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.spotSurvey === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="spotSurveyDate"
                                        value={accidentData.spotSurveynoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="spotSurveyassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.spotSurveyassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="spotSurveyremark"
                                        placeholder="Remark"
                                        value={accidentData.spotSurveyremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="spotReportdoc"
                                    value={accidentData.spotReportdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.spotReport === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="spotReportDate"
                                        value={accidentData.spotReportnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="spotReportassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.spotReportassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="spotReportremark"
                                        placeholder="Remark"
                                        value={accidentData.spotReportremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>estimateGiven:</label>
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
                                    className='inputField form-control'
                                    name="estimateGivendoc"
                                    value={accidentData.estimateGivendoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.estimateGiven === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="estimateGivenDate"
                                        value={accidentData.estimateGivennoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="estimateGivenassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.estimateGivenassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="estimateGivenremark"
                                        placeholder="Remark"
                                        value={accidentData.estimateGivenremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>advancePayment:</label>
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
                                    className='inputField form-control'
                                    name="advancePaymentdoc"
                                    value={accidentData.advancePaymentdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.advancePayment === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="advancePaymentDate"
                                        value={accidentData.advancePaymentnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="advancePaymentassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.advancePaymentassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="advancePaymentremark"
                                        placeholder="Remark"
                                        value={accidentData.advancePaymentremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>


                    <div>
                        <div className="form-row radio-group inputField">
                            <label>finalsurveyInitial:</label>
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
                                    className='inputField form-control'
                                    name="finalsurveyInitialdoc"
                                    value={accidentData.finalsurveyInitialdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.finalsurveyInitial === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="finalsurveyInitialDate"
                                        value={accidentData.finalsurveyInitialnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="finalsurveyInitialassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.finalsurveyInitialassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="finalsurveyInitialremark"
                                        placeholder="Remark"
                                        value={accidentData.finalsurveyInitialremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>


                    <div>
                        <div className="form-row radio-group inputField">
                            <label>finalSurvey2nd:</label>
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
                                    className='inputField form-control'
                                    name="finalSurvey2nddoc"
                                    value={accidentData.finalSurvey2nddoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.finalSurvey2nd === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="finalSurvey2ndDate"
                                        value={accidentData.finalSurvey2ndnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="finalSurvey2ndassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.finalSurvey2ndassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="finalSurvey2ndremark"
                                        placeholder="Remark"
                                        value={accidentData.finalSurvey2ndremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>workApproval:</label>
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
                                    className='inputField form-control'
                                    name="workApprovaldoc"
                                    value={accidentData.workApprovaldoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.workApproval === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="workApprovalDate"
                                        value={accidentData.workApprovalnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="workApprovalassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.workApprovalassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="workApprovalremark"
                                        placeholder="Remark"
                                        value={accidentData.workApprovalremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>reinspection:</label>
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
                                    className='inputField form-control'
                                    name="reinspectiondoc"
                                    value={accidentData.reinspectiondoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.reinspection === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="reinspectionDate"
                                        value={accidentData.reinspectionnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="reinspectionassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.reinspectionassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="reinspectionremark"
                                        placeholder="Remark"
                                        value={accidentData.reinspectionremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="finalBilldoc"
                                    value={accidentData.finalBilldoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.finalBill === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="finalBillDate"
                                        value={accidentData.finalBillnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="finalBillassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.finalBillassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="finalBillremark"
                                        placeholder="Remark"
                                        value={accidentData.finalBillremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="form-row radio-group inputField">
                            <label>paymentBalance:</label>
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
                                    className='inputField form-control'
                                    name="paymentBalancedoc"
                                    value={accidentData.paymentBalancedoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.paymentBalance === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="paymentBalanceDate"
                                        value={accidentData.paymentBalancenoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="paymentBalanceassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.paymentBalanceassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="paymentBalanceremark"
                                        placeholder="Remark"
                                        value={accidentData.paymentBalanceremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                    className='inputField form-control'
                                    name="settelMentdoc"
                                    value={accidentData.settelMentdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.settelMent === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="settelMentDate"
                                        value={accidentData.settelMentnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="settelMentassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.settelMentassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="settelMentremark"
                                        placeholder="Remark"
                                        value={accidentData.settelMentremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>


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
                                    className='inputField form-control'
                                    name="claimFormdoc"
                                    value={accidentData.claimFormdoc}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {accidentData.claimForm === 'no' && (
                            <>
                                <div className="form-field">
                                    <input
                                        type="date"
                                        className='inputField form-control'
                                        name="claimFormDate"
                                        value={accidentData.claimFormnoDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="claimFormassignedTo"
                                        placeholder="Assigned to whom"
                                        value={accidentData.claimFormassignedTo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField form-control'
                                        name="claimFormremark"
                                        placeholder="Remark"
                                        value={accidentData.claimFormremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
            {alertInfo.message}
          </Alert>
        )}


                </div>

                {!IsReadOnly && (
                <div style={{textAlign:'center'}}>
                <button 
                    type="submit" 
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                </div>
            )}

{IsReadOnly && (
    <div style={{textAlign:'center'}}>
                <button 
                    type="submit" 
                    style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                    onClick={editable}
                >
                    EDIT
                </button>
                </div>
            )}

            </form> */}

            <form style={{ backgroundColor: 'white', padding: '30px' }}>
                <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                    <Button startIcon={<ArrowBackIcon />}  style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    <div class='header-container'>
                        <h2 className='bigtitle'>Accident Details</h2>
                        <span class="mandatory-note">All fields are mandatory</span>
                    </div>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Accident File No:
                        <input
                            className='inputField form-control'
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
                            className='inputField form-control'
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
                            className='inputField form-control'
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
                            className='inputField form-control'
                            type="text"
                            name="railwayTime"
                            value={accidentData.railwayTime}
                            onChange={handleChange}
                            placeholder='Time'
                            readOnly={IsReadOnly}

                        />
                    </label>


                </div>
                <div className="form-row">
                    <label className="form-field">
                        Accident Place - State:
                        <select
                            className="inputField"
                            name="state"
                            onChange={handleChange}
                            disabled={IsReadOnly || isLoadingStates}
                            value={accidentData.state}
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field">
                        Accident Place - City:
                        <select
                            className='inputField form-control'
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
                            className='inputField form-control'
                            type="date"
                            name="accidentDate"
                            value={accidentData.accidentDate ? accidentData.accidentDate.split('T')[0] : ''}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Reason of Accident:
                        <textarea
                            className='inputField form-control'
                            name="reason"
                            value={accidentData.reason}
                            onChange={handleChange}
                            placeholder='Reason of Accident'
                            readOnly={IsReadOnly}
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
                            className='inputField form-control'
                            name="insuredBy"
                            value={accidentData.insuredBy}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Intimated Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="intimatedDate"
                            value={accidentData.intimatedDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Intimation Upload:
                        {IsReadOnly ? (
                            accidentData.intimationUpload ? (
                                <>
                                    <img
                                        src={accidentData.intimationUpload}
                                        alt="Intimation"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openIntimationModal}
                                    />
                                    <Modal isOpen={isIntimationModalOpen} onRequestClose={closeIntimationModal} contentLabel="Intimation Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={accidentData.intimationUpload} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeIntimationModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={accidentData.intimationUpload} alt="Intimation" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p className="notUploaded">No Intimation Card uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="intimationUpload"
                                className="inputField form-control"
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={intimationUpload}
                                required
                            />
                        )}
                    </label>

                    <label className="form-field">
                        Policy Number:
                        <input
                            className='inputField form-control'
                            name="policyNo"
                            value={accidentData.policyNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
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
                            className='inputField form-control'
                            name="driverName"
                            value={accidentData.driverName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        D/L No:
                        <input
                            className='inputField form-control'
                            name="DLNo"
                            value={accidentData.DLNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        D/L Number Validity:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="DLNoValidity"
                            value={accidentData.DLNoValidity}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Date Of Birth:
                        <input
                            className='inputField form-control'
                            name="DOB"
                            value={accidentData.DOB}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
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
                            className='inputField form-control'
                            name="policeStation"
                            value={accidentData.policeStation}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        FIR No:
                        <input
                            className='inputField form-control'
                            name="FIRNo"
                            value={accidentData.FIRNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        FIR Date:
                        <input
                            type="date"
                            className='inputField form-control'
                            name="firDate"
                            value={accidentData.firDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            max={todayDate}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        FIR Upload:
                        {IsReadOnly ? (
                            accidentData.firUpload ? (
                                <>
                                    <img
                                        src={accidentData.firUpload}
                                        alt="FIR"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openFIRModal}
                                    />
                                    <Modal isOpen={isFIRModalOpen} onRequestClose={closeFIRModal} contentLabel="FIR Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={accidentData.firUpload} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeFIRModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={accidentData.firUpload} alt="FIR" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No FIR uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="firUpload"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={firUpload}
                                required
                            />
                        )}
                    </label>

                </div>
                <div className="form-row">
                    <label className="form-field">
                        Advocate's Name :
                        <input
                            className='inputField form-control'
                            name="advocateName"
                            value={accidentData.advocateName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Advocate Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="advocateNo"
                            value={accidentData.advocateNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field">
                        Court Name:
                        <input
                            className='inputField form-control'
                            name="courtName"
                            value={accidentData.courtName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Release Order Upload:
                        <input
                            type='text'
                            className='inputField form-control'
                            name="releaseUpload"
                            value={accidentData.releaseUpload}
                            onChange={handleChange}
                            placeholder='filed by advocate'
                            readOnly={true}
                        />
                    </label>
                    <label className="form-field">
                        Power Of Attorney:
                        {IsReadOnly ? (
                            accidentData.POA ? (
                                <>
                                    <img
                                        src={accidentData.POA}
                                        alt="POA"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openPOAModal}
                                    />
                                    <Modal isOpen={isPOAModalOpen} onRequestClose={closePOAModal} contentLabel="POA Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={accidentData.POA} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closePOAModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={accidentData.POA} alt="POA" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'> No POA uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="POA"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={POA}
                                required
                            />
                        )}
                    </label>
                    <label className="form-field"></label>
                    <label className="form-field"></label>
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
                            className='inputField form-control'
                            name="surveyorName"
                            value={accidentData.surveyorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="surveyorNo"
                            value={accidentData.surveyorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>
                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateOfSurvey"
                            value={accidentData.dateOfSurvey}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            max={todayDate}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="remarksSurveyor"
                            value={accidentData.remarksSurveyor}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field"></label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Material Surveyor Name:
                        <input
                            className='inputField form-control'
                            name="materialSurveyorName"
                            value={accidentData.materialSurveyorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="materialSurveyorNo"
                            value={accidentData.materialSurveyorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateOfMaterialSurvey"
                            value={accidentData.dateOfMaterialSurvey}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            max={todayDate}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="remarksMaterialSurvey"
                            value={accidentData.remarksMaterialSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field"></label>

                </div>
                <div className="form-row">
                    <label className="form-field">
                        Final Surveyor Name:
                        <input
                            className='inputField form-control'
                            name="finalSurveyorName"
                            value={accidentData.finalSurveyorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="FinalSurveyorNo"
                            value={accidentData.FinalSurveyorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateOfFinalSurvey"
                            value={accidentData.dateOfFinalSurvey}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                            max={todayDate}


                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="remarksFinalSurvey"
                            value={accidentData.remarksFinalSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field"></label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Investigator Name:
                        <input
                            className='inputField form-control'
                            name="investigatorName"
                            value={accidentData.investigatorName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Investigator Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="investigatorNo"
                            value={accidentData.investigatorNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="investigationDate"
                            value={accidentData.investigationDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                            max={todayDate}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField form-control'
                            name="investigatorRemarks"
                            value={accidentData.investigatorRemarks}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

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
                            className='inputField form-control'
                            name="representativeName"
                            value={accidentData.representativeName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField form-control'
                            name="representativeNo"
                            value={accidentData.representativeNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Representative Report Upload:
                        {IsReadOnly ? (
                            accidentData.reportUpload ? (
                                <>
                                    <img
                                        src={accidentData.reportUpload}
                                        alt="Representative Report"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openReportModal}
                                    />
                                    <Modal isOpen={isReportModalOpen} onRequestClose={closeReportModal} contentLabel="Representative Report Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={accidentData.reportUpload} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeReportModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={accidentData.reportUpload} alt="Representative Report" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Representative Report uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="reportUpload"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={reportUpload}
                                required
                            />
                        )}
                    </label>

                    <label className="form-field">
                        Vehicle Repaired On Spot Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="dateRepairedOnSpot"
                            value={accidentData.dateRepairedOnSpot}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                            max={todayDate}


                        />
                    </label>

                    <label className="form-field">
                        Material Transshiped in Vehicle No:
                        <input
                            className='inputField form-control'
                            name="transshippedVehicleNo"
                            value={accidentData.transshippedVehicleNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Vehicle Transshiped Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="transshippedDate"
                            value={accidentData.transshippedDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            pattern="\d{10}"
                            readOnly={IsReadOnly}
                            max={todayDate}

                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            className='inputField form-control'
                            name="reportedFinalDestination"
                            value={accidentData.reportedFinalDestination}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="reportedFinalDestinationDate"
                            value={accidentData.reportedFinalDestinationDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                            max={todayDate}

                        />
                    </label>

                    <label className="form-field">
                        Adhar Card of Company Representative:
                        {IsReadOnly ? (
                            accidentData.companyRepresentativeAdhar ? (
                                <>
                                    <img
                                        src={accidentData.companyRepresentativeAdhar}
                                        alt="Adhar Card"
                                        style={{ maxWidth: '100px', display: 'block', cursor: 'pointer' }}
                                        onClick={openAdharModal}
                                    />
                                    <Modal isOpen={isAdharModalOpen} onRequestClose={closeAdharModal} contentLabel="Adhar Card Modal">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <IconButton href={accidentData.companyRepresentativeAdhar} download color="primary">
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={closeAdharModal} color="secondary">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <img src={accidentData.companyRepresentativeAdhar} alt="Adhar Card" style={{ width: '100%' }} />
                                    </Modal>
                                </>
                            ) : (
                                <p className='notUploaded'>No Adhar Card uploaded</p>
                            )
                        ) : (
                            <input
                                type="file"
                                name="companyRepresentativeAdhar"
                                className='inputField form-control'
                                onChange={handleChange}
                                accept=".pdf,image/*"
                                ref={companyRepresentativeAdhar}
                                required
                            />
                        )}
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
                            className='inputField form-control'
                            name="deadLineDate"
                            value={accidentData.deadLineDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                        // max={todayDate}
                        />
                    </label>

                    <label className="form-field">
                        Actual Ready Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="readyDate"
                            value={accidentData.readyDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            pattern="\d{10}"
                            readOnly={IsReadOnly}
                            max={todayDate}

                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Re-Inspection Date:
                        <input
                            type="date"
                            className='inputField form-control'
                            name="reInspectionDate"
                            value={accidentData.reInspectionDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                            max={todayDate}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Finally Released:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="finallyReleasedDate"
                            value={accidentData.finallyReleasedDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || todayDate}
                            readOnly={IsReadOnly}
                            max={todayDate}
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
                            className='inputField form-control'
                            name="totalDaysFromAccident"
                            value={totalDaysFromAccident}
                            readOnly={true}
                        />
                    </label>

                    <label className="form-field">
                        Total Days In WorkShop:
                        <input
                            className='inputField form-control'
                            name="daysInWorkShop"
                            value={totalDaysInWorkshop}
                            readOnly={true}
                        />
                    </label>

                    <label className="form-field">
                        Deadline TAT:
                        <input
                            className='inputField form-control'
                            name="deadlineTAT"
                            value={calculatedDeadlineTAT}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

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
                            className='inputField form-control'
                            name="docketName"
                            value={accidentData.docketName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Docket Date:
                        <input
                            className='inputField form-control'
                            name="docketDate"
                            value={accidentData.docketDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Origin:
                        <input
                            className='inputField form-control'
                            name="origin"
                            value={accidentData.origin}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field">
                        Destination:
                        <input
                            className='inputField form-control'
                            name="destination"
                            value={accidentData.destination}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />

                    </label>
                    <label className="form-field"></label>

                </div>

                <div className="form-row">
                    <label className="form-field">
                        Consignor Name:
                        <input
                            className='inputField form-control'
                            name="consignor"
                            value={accidentData.consignor}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Consignee Name:
                        <input
                            className='inputField form-control'
                            name="consignee"
                            value={accidentData.consignee}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Invoice Number:
                        <input
                            className='inputField form-control'
                            name="invoiceNo"
                            value={accidentData.invoiceNo}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            readOnly={IsReadOnly}

                        />

                    </label>

                    <label className="form-field"></label>

                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material:
                        <input
                            className='inputField form-control'
                            name="material"
                            value={accidentData.material}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>

                    <label className="form-field">
                        Package:
                        <input
                            className='inputField form-control'
                            name="package"
                            value={accidentData.package}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Weight:
                        <input
                            className='inputField form-control'
                            name="weight"
                            value={accidentData.weight}
                            onChange={handleChange}
                            readOnly={IsReadOnly}

                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField form-control'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}
                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                            readOnly={IsReadOnly}

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
                                    {IsReadOnly ? (
                                        accidentData.RCdoc ? (
                                            <img src={accidentData.RCdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No RC uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="RCdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={RCdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.RC === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="RCDate"
                                            value={accidentData.RCDate}
                                            readOnly={IsReadOnly}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="RCassignedTo"
                                            placeholder="Assigned to whom"
                                            value={accidentData.RCassignedTo}
                                            readOnly={IsReadOnly}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="RCremark"
                                            placeholder="Remark"
                                            value={accidentData.RCremark}
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.insurancedoc ? (
                                            <img src={accidentData.insurancedoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No Insurance uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="insurancedoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={insurancedoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.insurance === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="insuranceDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.insuranceDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="insuranceassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.insuranceassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="insuranceremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.fitnessdoc ? (
                                            <img src={accidentData.fitnessdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No fitnessdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            className='inputField form-control'
                                            type="file"
                                            name="fitnessdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={fitnessdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.fitness === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="fitnessDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.fitnessDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="fitnessassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.fitnessassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="fitnessremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.nationalPermit1Yeardoc ? (
                                            <img src={accidentData.nationalPermit1Yeardoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No nationalPermit1Yeardoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="nationalPermit1Yeardoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={nationalPermit1Yeardoc}
                                            required
                                        />
                                    )}

                                </div>
                            )}

                            {accidentData.nationalPermit1Year === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="nationalPermit1YearDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.nationalPermit1YearDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="nationalPermit1YearassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.nationalPermit1YearassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="nationalPermit1Yearremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.nationalPermit1Yearremark}
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
                                    {IsReadOnly ? (
                                        accidentData.nationalPermit5Yeardoc ? (
                                            <img src={accidentData.nationalPermit5Yeardoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No nationalPermit5Yeardoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="nationalPermit5Yeardoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={nationalPermit5Yeardoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.nationalPermit5Year === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="nationalPermit5YearDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.nationalPermit5YearDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="nationalPermit5YearassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.nationalPermit5YearassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="nationalPermit5Yearremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.nationalPermit5Yearremark}
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
                                    {IsReadOnly ? (
                                        accidentData.taxTokendoc ? (
                                            <img src={accidentData.taxTokendoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No taxTokendoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="taxTokendoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={taxTokendoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.taxToken === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="taxTokenDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.taxTokenDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="taxTokenassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.taxTokenassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="taxTokenremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.DLicencedoc ? (
                                            <img src={accidentData.DLicencedoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No DLicencedoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="DLicencedoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={DLicencedoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.DLicence === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="DLicenceDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.DLicenceDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="DLicenceassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.DLicenceassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="DLicenceremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.DLVerdoc ? (
                                            <img src={accidentData.DLVerdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No DLVerdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="DLVerdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={DLVerdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.DLVer === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="DLVerDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.DLVerDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="DLVerassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.DLVerassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="DLVerremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.DLVerremark}
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
                                    {IsReadOnly ? (
                                        accidentData.LRdoc ? (
                                            <img src={accidentData.LRdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No LRdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="LRdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={LRdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.LR === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="LRDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.LRDate}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="LRassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.LRassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="LRremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.PUCdoc ? (
                                            <img src={accidentData.PUCdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No PUCdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="PUCdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={PUCdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.PUC === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="PUCDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.PUCDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="PUCassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.PUCassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="PUCremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.PUCremark}
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
                                    {IsReadOnly ? (
                                        accidentData.policeReportdoc ? (
                                            <img src={accidentData.policeReportdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No policeReportdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="policeReportdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={policeReportdoc}
                                            required
                                        />
                                    )}

                                </div>
                            )}

                            {accidentData.policeReport === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="policeReportDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.policeReportDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="policeReportassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.policeReportassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="policeReportremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.intimationdoc ? (
                                            <img src={accidentData.intimationdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No intimationdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="intimationdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={intimationdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.intimation === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="intimationDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.intimationDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="intimationassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.intimationassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="intimationremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.intimationremark}
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
                                    {IsReadOnly ? (
                                        accidentData.spotSurveydoc ? (
                                            <img src={accidentData.spotSurveydoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No spotSurveydoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="spotSurveydoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={spotSurveydoc}
                                            required
                                        />
                                    )}

                                </div>
                            )}

                            {accidentData.spotSurvey === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="spotSurveyDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.spotSurveyDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="spotSurveyassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.spotSurveyassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="spotSurveyremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.spotReportdoc ? (
                                            <img src={accidentData.spotReportdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No spotReportdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="spotReportdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={spotReportdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.spotReport === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="spotReportDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.spotReportDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="spotReportassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.spotReportassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="spotReportremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.estimateGivendoc ? (
                                            <img src={accidentData.estimateGivendoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No estimateGivendoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="estimateGivendoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={estimateGivendoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.estimateGiven === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="estimateGivenDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.estimateGivenDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="estimateGivenassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.estimateGivenassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="estimateGivenremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.estimateGivenremark}
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
                                    {IsReadOnly ? (
                                        accidentData.advancePaymentdoc ? (
                                            <img src={accidentData.advancePaymentdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No advancePaymentdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="advancePaymentdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={advancePaymentdoc}
                                            required
                                        />
                                    )}

                                </div>
                            )}

                            {accidentData.advancePayment === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="advancePaymentDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.advancePaymentDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="advancePaymentassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.advancePaymentassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="advancePaymentremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
                                            value={accidentData.advancePaymentremark}
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
                                    {IsReadOnly ? (
                                        accidentData.finalsurveyInitialdoc ? (
                                            <img src={accidentData.finalsurveyInitialdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No finalsurveyInitialdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="finalsurveyInitialdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={finalsurveyInitialdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.finalsurveyInitial === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="finalsurveyInitialDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.finalsurveyInitialDate}
                                            onChange={handleChange}
                                        />
                                        min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="finalsurveyInitialassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.finalsurveyInitialassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="finalsurveyInitialremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.finalSurvey2nddoc ? (
                                            <img src={accidentData.finalSurvey2nddoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No finalSurvey2nddoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="finalSurvey2nddoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={finalSurvey2nddoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.finalSurvey2nd === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="finalSurvey2ndDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.finalSurvey2ndDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="finalSurvey2ndassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.finalSurvey2ndassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="finalSurvey2ndremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.workApprovaldoc ? (
                                            <img src={accidentData.workApprovaldoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No workApprovaldoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="workApprovaldoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={workApprovaldoc}
                                            required
                                        />
                                    )}

                                </div>
                            )}

                            {accidentData.workApproval === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="workApprovalDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.workApprovalDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="workApprovalassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.workApprovalassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="workApprovalremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.reinspectiondoc ? (
                                            <img src={accidentData.reinspectiondoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No reinspectiondoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="reinspectiondoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={reinspectiondoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.reinspection === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="reinspectionDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.reinspectionDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="reinspectionassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.reinspectionassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="reinspectionremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.finalBilldoc ? (
                                            <img src={accidentData.finalBilldoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No finalBilldoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="finalBilldoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={finalBilldoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.finalBill === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="finalBillDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.finalBillDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="finalBillassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.finalBillassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="finalBillremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.paymentBalancedoc ? (
                                            <img src={accidentData.paymentBalancedoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No paymentBalancedoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="paymentBalancedoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={paymentBalancedoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.paymentBalance === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="paymentBalanceDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.paymentBalanceDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="paymentBalanceassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.paymentBalanceassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="paymentBalanceremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.settelMentdoc ? (
                                            <img src={accidentData.settelMentdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No settelMentdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="settelMentdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={settelMentdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.settelMent === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="settelMentDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.settelMentDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="settelMentassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.settelMentassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="settelMentremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                                    {IsReadOnly ? (
                                        accidentData.claimFormdoc ? (
                                            <img src={accidentData.claimFormdoc} alt="PAN Card" style={{ maxWidth: '100px', display: 'block' }} />
                                        ) : (
                                            <p className='notUploaded'>No claimFormdoc uploaded</p>
                                        )
                                    ) : (
                                        <input
                                            type="file"
                                            className='inputField form-control'
                                            name="claimFormdoc"
                                            onChange={handleChange}
                                            accept=".pdf,image/*"
                                            ref={claimFormdoc}
                                            required
                                        />
                                    )}
                                </div>
                            )}

                            {accidentData.claimForm === 'no' && (
                                <>
                                    <div className="form-field">
                                        <input
                                            type="date"
                                            className='inputField form-control'
                                            name="claimFormDate"
                                            readOnly={IsReadOnly}
                                            value={accidentData.claimFormDate}
                                            onChange={handleChange}
                                            min={accidentData.accidentDate || new Date().toISOString().split('T')[0]}

                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="claimFormassignedTo"
                                            placeholder="Assigned to whom"
                                            readOnly={IsReadOnly}
                                            value={accidentData.claimFormassignedTo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            className='inputField form-control'
                                            name="claimFormremark"
                                            placeholder="Remark"
                                            readOnly={IsReadOnly}
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
                    {!IsReadOnly && (
                        <div>
                            <button type="submit"
                                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
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
                        <div style={{ textAlign: 'center' }}>
                            <button
                                type="submit"
                                style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                                onClick={editable}
                            >
                                EDIT
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default VehicleClaimEdit;
