import React, { useState, useEffect } from 'react';
import styles from './VehicleClaimRegistration.css'; // Ensure this path is correct
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import axios from 'axios';
import { loadStates, loadCities } from '../StateAPI';
import Alert from '@mui/material/Alert';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const VehicleClaimEdit = () => {

    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const [comingData, setComingData]=useState([]); 
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

    const navigate = useNavigate();
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [IsReadOnly, setIsReadOnly]=useState(true); 

    useEffect(() => {
        loadStates();
        getDataById(id);
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
    }, [token, userId, navigate]);

    const formatDateForInput = (dateStr) => {
        console.log("date",dateStr)
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date;
        // return date.toISOString().split('T')[0];
    };
    
    useEffect(() => {
        if (comingData) {
            setAccidentData(prevFormData => ({
                ...prevFormData,
                dateTime: formatDateForInput(comingData.dateTime),
                // systemGenerated: formatDateForInput(comingData.systemGener   ated),
                railwayTime: formatDateForInput(comingData.railwayTime),
                state: comingData.state || "",
                district: comingData.district || "",
                accidentDate: formatDateForInput(comingData.accidentDate),
                reason: comingData.reason || "",
                insuredBy: comingData.insuredBy || "",
                intimatedDate: formatDateForInput(comingData.intimatedDate),
                policyNo: comingData.policyNo || "",
                driverName: comingData.driverName || "",
                DLNo: comingData.DLNo || "",
                DLNoValidity: formatDateForInput(comingData.DLNoValidity),  
                DOB: formatDateForInput(comingData.DOB),
                policeStation: comingData.policeStation || "",
                FIRNo: comingData.FIRNo || "",
                firDate: formatDateForInput(comingData.firDate),
                advocateName: comingData.advocateName || "",
                advocateNo: comingData.advocateNo || "",
                courtName: comingData.courtName || "",
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
                dateRepairedOnSpot: formatDateForInput(comingData.dateRepairedOnSpot),
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
        
                insurance: comingData.insurance ||"",
                insurancedoc: comingData.insurancedoc ||'',
                insuranceDate: comingData.insuranceDate ||"",
                insuranceassignedTo: comingData.insuranceassignedTo ||"",
                insuranceremark: comingData.insuranceremark ||"",
        
                fitness: comingData.fitness ||"",
                fitnessdoc: comingData.fitnessdoc ||'',
                fitnessDate: comingData.fitnessDate ||"",
                fitnessassignedTo:comingData.fitnessassignedTo || "",
                fitnessremark:comingData.fitnessremark || "",
        
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

    const getDataById= async (id)=>{
        const response = await axios.get(`http://localhost:3001/api/getVehicle/${id}`);
        console.log("getDataById",response.data.data)
        setComingData(response.data.data[0])
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted inside:', token,"some",userId);
        try{
            const response = await axios.put(`http://localhost:3001/api/updateVehicleClaim/${id}/${userId}`, JSON.stringify(accidentData),{
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                  }
            });
      setAlertInfo({ show: true, message: response.data.message, severity: 'success' });
        console.log("response", response.data.message);
        }
        catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data || 'An error occurred';
            setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
          }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'advocateNo') {
            const re = /^[0-9\b]+$/;
            console.log("value", value)
            if (value === '' || re.test(value)) {
                if (name === 'advocateNo' && value.length <= 10) {
                    setAccidentData({ ...accidentData, [e.target.name]: e.target.value });;
                }
            }
        }
        // setSelectedState(e.target.value);
        console.log("STATE", value)
        if (name == 'state') loadCities(value);
        setAccidentData({ ...accidentData, [e.target.name]: e.target.value });
    };

    const editable = ()=>{
        setIsReadOnly(!IsReadOnly)
      }

    return (
        <div className='container'>
       
                <h1 className='titles'>VEHICLE CLAIM REGISTRATION (UPDATING)</h1>
                

            <h2 className='heading-box'>Accident Details</h2>
            <form>

                <div className="form-row">
                    <label className="form-field">
                        Date & Time:
                        <input
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="intimationUpload"
                            value={accidentData.intimationUpload}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Policy Number:
                        <input
                            className='inputField'
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
                            className='inputField'
                            name="driverName"
                            value={accidentData.driverName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        D/L No:
                        <input
                            className='inputField'
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
                            className='inputField'
                            name="DLNoValidity"
                            value={accidentData.DLNoValidity}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Date Of Birth:
                        <input
                            className='inputField'
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
                            className='inputField'
                            name="policeStation"
                            value={accidentData.policeStation}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        FIR No:
                        <input
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="dateOfSurvey"
                            value={accidentData.dateOfSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="dateOfMaterialSurvey"
                            value={accidentData.dateOfMaterialSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="dateOfFinalSurvey"
                            value={accidentData.dateOfFinalSurvey}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="investigationDate"
                            value={accidentData.investigationDate}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="totalDaysFromAccident"
                            value={accidentData.totalDaysFromAccident}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Total Days In WorkShop:
                        <input
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="docketName"
                            value={accidentData.docketName}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Docket Date:
                        <input
                            className='inputField'
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
                            className='inputField'
                            name="origin"
                            value={accidentData.origin}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>
                    <label className="form-field">
                        Destination:
                        <input
                            className='inputField'
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
                            className='inputField'
                            name="consignor"
                            value={accidentData.consignor}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Consignee Name:
                        <input
                            className='inputField'
                            name="consignee"
                            value={accidentData.consignee}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                            
                        />
                    </label>

                    <label className="form-field">
                        Invoice Number:
                        <input
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
                            name="material"
                            value={accidentData.material}
                            onChange={handleChange}
                            readOnly={IsReadOnly}
                        />
                    </label>

                    <label className="form-field">
                        Package:
                        <input
                            className='inputField'
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
                            className='inputField'
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
                            className='inputField'
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="RCDate"
                                        value={accidentData.RCnoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="insuranceDate"
                                        value={accidentData.insurancenoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="fitnessDate"
                                        value={accidentData.fitnessnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="nationalPermit1YearDate"
                                        value={accidentData.nationalPermit1YearnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="nationalPermit5YearDate"
                                        value={accidentData.nationalPermit5YearnoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="taxTokenDate"
                                        value={accidentData.taxTokennoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="DLicenceDate"
                                        value={accidentData.DLicencenoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="DLVerDate"
                                        value={accidentData.DLVernoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="LRDate"
                                        value={accidentData.LRnoDate}
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
                                        className='inputField'
                                        name="PUCDate"
                                        value={accidentData.PUCnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="policeReportDate"
                                        value={accidentData.policeReportnoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="intimationDate"
                                        value={accidentData.intimationnoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="spotSurveyDate"
                                        value={accidentData.spotSurveynoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="spotReportDate"
                                        value={accidentData.spotReportnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="estimateGivenDate"
                                        value={accidentData.estimateGivennoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="advancePaymentDate"
                                        value={accidentData.advancePaymentnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="finalsurveyInitialDate"
                                        value={accidentData.finalsurveyInitialnoDate}
                                        onChange={handleChange}
                                    />
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="finalSurvey2ndDate"
                                        value={accidentData.finalSurvey2ndnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="workApprovalDate"
                                        value={accidentData.workApprovalnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="reinspectionDate"
                                        value={accidentData.reinspectionnoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="finalBillDate"
                                        value={accidentData.finalBillnoDate}
                                        onChange={handleChange}
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
                                    className='inputField'
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
                                        className='inputField'
                                        name="paymentBalanceDate"
                                        value={accidentData.paymentBalancenoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="settelMentDate"
                                        value={accidentData.settelMentnoDate}
                                        onChange={handleChange}
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
                                        className='inputField'
                                        name="claimFormDate"
                                        value={accidentData.claimFormnoDate}
                                        onChange={handleChange}
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

            </form>
        </div>
    );
};

export default VehicleClaimEdit;
