import React, { useEffect, useState } from 'react';
import './CaseFirstCard.css'; // CSS file for styles
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Co2Sharp, FirstPage } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { ClipLoader } from 'react-spinners';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import successboardimage from '../../Assets/successboardimage.png'
import SuccessIcon from './SuccessIcon';
import { useNavigate } from 'react-router-dom';
import { use } from 'echarts';
import axios from 'axios';
import backendUrl from '../../environment';

function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = angle => (Math.PI / 180) * angle;
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a = Math.sin(dlat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const radiusOfEarthKm = 6371;
    const distance = radiusOfEarthKm * c;

    return distance;
}



const CaseFirstCard = ({ data , getBackPage}) => {
    const [isRejected, setIsRejected] = useState(false)
    const [FirstPage, setFirstPage] = useState(true)
    const [isAccepted, setIsAccepted] = useState(false)
    const [accidentLocationDistance, setAccidentLocationDistance] = useState(null)
    const [getVendorData, setGetVendorData] = useState([])
    const [accidentDataById, setAccidentDataById] = useState([])
    const [rate, setRate] = useState(null)



    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    console.log("DATA HE SIERE", data)
    console.log("DATcoming from er", data[0])
    console.log("getVendor data", getVendorData)
    console.log("accidentDataById data", accidentDataById)



    useEffect(() => {
        if (data && data[0]?.AccidentVehicleCode) {
            getVendorById(userId);
            getAccidentDataById(data[0].AccidentVehicleCode);
        }
    }, [userId, data]);




    const getVendorById = async (userId) => {
        try {
            const response = await axios.get(`${backendUrl}/api/getVendor/${userId}`);
            console.log("caseFirstCardhser", response.data.data)
            setGetVendorData(response.data.data);     
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };
    
    const getAccidentDataById = async (AccidentVehicleCode) => {
        try {
            const response = await axios.get(`${backendUrl}/api/getVehicleAccidentById/${AccidentVehicleCode}`);
            console.log("getAccidentDataById", response.data.data)
            
            setAccidentDataById(response.data.data);            
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    useEffect(()=>{
        if(getVendorData.length != 0)
        setRate(getVendorData[0].rate)
    },[getVendorData])

    useEffect(() => {
        if (accidentDataById.length && getVendorData.length) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLat = position.coords.latitude;
                    const currentLon = position.coords.longitude;
                    const accidentLocation = {
                        lat: accidentDataById[0].latitude,
                        lon: accidentDataById[0].longitude
                    };
                    const distance = haversineDistance(currentLat, currentLon, accidentLocation.lat, accidentLocation.lon);
                    setAccidentLocationDistance(distance.toFixed(2));
                },
                (error) => console.error("Error fetching location", error),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }
    }, [accidentDataById, getVendorData]);
    


    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [completeSuccessfully, setCompleteSuccessfully] = useState(false);
    const [vendorDecision, setVendorDecision] = useState("");


    const reasons = [
        "Vehicle Break Down",
        "Personal Issue",
        "Long Distance",
        "Heavy Rain",
        "Strike",
    ];

    const handleSelectReason = (reason) => {
        if (selectedReasons.includes(reason)) {
            // Remove from selected if already in array
            setSelectedReasons(selectedReasons.filter((item) => item !== reason));
        } else {
            // Add to selected array
            setSelectedReasons([...selectedReasons, reason]);
        }
    };
    console.log("reason", selectedReasons)

    const rejectOrder = () => {
        setFirstPage(false)
        setIsAccepted(false)
        setIsRejected(true)
        setVendorDecision('reject')
    }
    const acceptOrder = () => {
          // Corrected from setIsAccpeted
        setVendorDecision('accept');
    };
    
    // useEffect to call handleSubmit when both isAccepted and vendorDecision are updated
    useEffect(() => {
        if ( vendorDecision === 'accept') {  // Corrected from isAccpeted
            console.log("Calling handleSubmit...");
            handleSubmit();
        }
    }, [isAccepted, vendorDecision]); 

    const closeRejected = () => {
        setIsRejected(false)
        setIsAccepted(false)
        setFirstPage(true)

    }



    console.log("isAccepteod", isAccepted)
    const handleSubmit = async () => {
        try {
            // Validate inputs for rejection case
            if (vendorDecision === 'reject' && selectedReasons.length === 0 && otherReason.trim() === "") {
                setErrorMessage("Please select at least one reason or provide another reason.");
                return;
            }
    
            setErrorMessage("");
            setIsLoading(true);
    
            // Prepare selected reasons based on vendorDecision
            const updatedReasons = vendorDecision === 'reject'
                ? [...selectedReasons, otherReason]
                : selectedReasons;
    
            const formData = {
                vendorDecision: vendorDecision,
                selectedReasons: updatedReasons
            };
    
            // Create FormData object
            const formDataObj = new FormData();
            for (const key in formData) {
                if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
                    if (formData[key] instanceof File) {
                        formDataObj.append(key, formData[key], formData[key].name);
                    } else {
                        formDataObj.append(key, formData[key]);
                    }
                }
            }
    
            // Log form data for debugging
            for (let pair of formDataObj.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
    
            // Submit data via axios
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/vendorOnAssignedVehicle/${data[0].AccidentVehicleCode}/${userId}/${accidentDataById[0].assignedBy}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });
    
            if (response.status === 200) {
                // Success handling
                setIsRejected(false);
                setFirstPage(false);
                setIsAccepted(true);
    
                // Navigate back
                    setTimeout(() => {
                        getBackPage();
                    }, 1000);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
        }
    };
    


    return (
        <div>
            {FirstPage &&accidentLocationDistance && accidentDataById.length !==0 && getVendorData.length != 0 && (
                <div className='parent-container'>
                    <div className="image-container">
                        {/* Background Image */}
                        <div className="background-image"></div>

                        {/* Text Overlay with green background */}
                        <div className="text-overlay">
                            <p style={{ fontSize: '14px', padding: "5px", border: '3px solid blue', borderImage: 'linear-gradient(to top, white 10% , black 90%) 1', textAlign: 'center', borderRadius: '30px', fontWeight: "bold" }}>
                                Case Assigned!
                            </p>

                            <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>Estimated earnings </p>
                            <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>₹ {(rate * accidentLocationDistance).toFixed(2)}</h1>



                            <div style={{ display: 'flex' }}>
                                <p style={{ fontSize: '11px', paddingRight: '10px', marginTop: '2px' }}>Accident Location : {accidentLocationDistance} km</p> 
                            </div>

                            <div className="text-overlay text-overlay2">
                                <p style={{ fontSize: "12px", marginTop: "10px", fontWeight: "bold" }}>{getVendorData[0].vendorName}</p>
                                <h4 style={{ marginBottom: '5px', fontSize: "11px", marginTop: "10px" }}>Location:</h4>
                                <p style={{ fontSize: '11px', gap: "10px" }}>205 D/15, Indl Estate, L B S Marg, Opp I O L, Near Amrutnagar, Near Ayodhya Chowk, Rohini, K Marg, Lower Parel Mumbai Maharashtra 4000067</p>
                                <p style={{
                                    fontSize: '11px',
                                    marginTop: "5px",
                                    background: "green",
                                    padding: "10px",
                                    border: '1px solid blue',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: "white",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    position: "relative",
                                    cursor: "pointer"
                                }} onClick={acceptOrder}>
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                    Accept Case
                                </p>

                                <p style={{
                                    fontSize: '11px',
                                    marginTop: "5px",
                                    background: "#8f4325",
                                    padding: "10px",
                                    border: '1px solid blue',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: "white",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    position: "relative",
                                    cursor: "pointer"
                                }} onClick={rejectOrder}>
                                    Reject Case<KeyboardDoubleArrowLeftIcon style={{
                                        position: 'absolute',
                                        right: "10px"
                                    }} />
                                </p>
                            </div>

                        </div>
                    </div>
                </div>)}
            {isRejected && (
                <div>
                    {!completeSuccessfully && (<div className='parent-container'>
                        <div className="image-container" style={{ background: "#959595" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px", border: "4px solid black", borderImage: 'linear-gradient(to bottom, white 10%, black 90%) 1', borderRadius: "20px", margin: "20px 50px 0px 30px", padding: "5px", flex: 1 }}>Reason For Decline</h1>
                                <div onClick={closeRejected}>
                                    <CloseIcon style={{ marginRight: '20px', cursor: 'pointer' }} />
                                </div>
                            </div>
                            <hr />

                            <div style={{ margin: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                {reasons.map((reason) => (
                                    <button
                                        key={reason}
                                        onClick={() => handleSelectReason(reason)}
                                        style={{
                                            fontSize: '14px',
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "10px",
                                            borderRadius: "20px",
                                            backgroundColor: selectedReasons.includes(reason) ? "yellow" : "white",
                                            border: "1px solid black",
                                            cursor: "pointer",
                                            boxShadow: selectedReasons.includes(reason) ? "0 4px 8px rgba(0,0,0,1.2)" : "0 3px 6px rgba(0, 0, 0, 0.5)"
                                        }}
                                    >
                                        {reason}
                                    </button>
                                ))}
                            </div>


                            <label className="form-field" style={{ color: 'white', marginTop: '20px', fontSize: "17px" }}>
                                Other Reason  :
                                <textarea
                                    style={{ margin: "10px 10px 20px 0px", width: "280px" }} className="form-control" name="otherReason" value={otherReason} onChange={(e) => setOtherReason(e.target.value)} />
                            </label>

                            {errorMessage && <div style={{ color: "red", margin: "10px 10px 20px 10px", marginBottom: "10px" }}>{errorMessage}</div>}


                            <div>
                                {isLoading && (
                                    <div style={{ marginTop: '10px', display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                        <ClipLoader color="black" loading={isLoading} />
                                        <div style={{ marginTop: '10px', color: 'black' }}> Please Wait...</div>
                                    </div>
                                )}
                                <p type="submit"
                                    style={{
                                        fontSize: '11px',
                                        marginTop: "5px",
                                        background: "#8f4325",
                                        padding: "10px",
                                        border: '1px solid blue',
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        fontWeight: "bold",
                                        color: "white",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        position: "relative",
                                    }}
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                >
                                    < NotInterestedIcon style={{
                                        position: 'absolute',
                                        left: "90px"
                                    }} />Reject Case
                                </p>
                            </div>
                        </div>
                    </div>)}
                    {completeSuccessfully && (
                        <div className='parent-container'>
                            <div className="image-container" style={{ background: "radial-gradient(yellow, transparent)" }}>
                                <div style={{ marginTop: "40%" }}>
                                </div>
                                <SuccessIcon />
                                <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", color: "green", margin: "0px 50px 20px 30px", padding: "5px", flex: 1 }}>Submitted Reason !!!</h1>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {isAccepted && (
                <div className='parent-container'>
                    <div className="image-container" style={{ background: "radial-gradient(yellow, transparent)" }}>
                        <div style={{ marginTop: "40%" }}>
                        </div>
                        <SuccessIcon />
                        <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "17px", color: "green", margin: "0px 50px 20px 30px", padding: "5px", flex: 1 }}>Thank You !!!</h1>
                        

                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseFirstCard;
