import React, { useEffect, useState, useRef } from 'react';
import './CaseFirstCard.css'; // CSS file for styles
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Co2Sharp, CoPresent, FirstPage } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { ClipLoader } from 'react-spinners';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import successboardimage from '../../Assets/successboardimage.png'
import SuccessIcon from './SuccessIcon';
import { useNavigate } from 'react-router-dom';
import { use } from 'echarts';
import axios from 'axios';
import backendUrl from '../../environment';
import Button from '@mui/material/Button';
import Modal from '../Location1/Modal';
import crossUser from '../../Assets/crossUser.png'
import FirstCardPage from './FIrstCardPage';

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



const CaseFirstCard = ({ data, getBackPage }) => {
    const [isRejected, setIsRejected] = useState(false)
    const [FirstPage, setFirstPage] = useState(true)
    const [isAccepted, setIsAccepted] = useState(false)
    const [isBudget, setIsBudget] = useState(false)

    const [accidentLocationDistance, setAccidentLocationDistance] = useState(null)
    console.log("accidentLocationDistance", accidentLocationDistance)
    const [getVendorData, setGetVendorData] = useState([])
    const [accidentDataById, setAccidentDataById] = useState([])
    console.log("accidentDataByIdherse", accidentDataById)

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
            console.log("caseFirstCardhser")
            getVendorById(userId);
            getAccidentDataById(data[0].AccidentVehicleCode);
        }
    }, [userId, data]);




    const getVendorById = async (userId) => {
        try {
            const response = await axios.get(`${backendUrl}/api/getVendor/${userId}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            console.log("caseFirstCardhser", response.data.data)
            setGetVendorData(response.data.data);
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    const getAccidentDataById = async (AccidentVehicleCode) => {
        try {
            console.log(`yes  , ${backendUrl}/api/getVehicleAccidentById/${AccidentVehicleCode}/${userId}`)
            const response = await axios.get(`${backendUrl}/api/getVehicleAccidentById/${AccidentVehicleCode}/${userId}`);
            console.log("getAccidentDataById", response.data.data)

            setAccidentDataById(response.data.data);
        } catch (error) {
            console.error("Error fetching all accident vehicle data", error);
        }
    };

    useEffect(() => {
        if (getVendorData.length != 0)
            setRate(getVendorData[0].rate)
    }, [getVendorData])

    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState('')
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState('')


    useEffect(() => {
        if (accidentDataById.length && getVendorData.length) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLat = position.coords.latitude;
                    const currentLon = position.coords.longitude;
                    setVendorCurrentLatitude(currentLat)
                    setVendorCurrentLongitude(currentLon)
                    const accidentLocation = {
                        lat: accidentDataById[0].accidentLatitude,
                        lon: accidentDataById[0].accidentLongitude
                    };
                    const distance = haversineDistance(currentLat, currentLon, accidentLocation.lat, accidentLocation.lon);
                    console.log("Dsitacen", distance)
                    setAccidentLocationDistance(distance.toFixed(2));
                },
                (error) => console.error("Error fetching location", error),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }
    }, [accidentDataById, getVendorData]);



    const [selectedReasons, setSelectedReasons] = useState([]);
    const [charges, setCharges] = useState('');
    const [otherReason, setOtherReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [completeSuccessfully, setCompleteSuccessfully] = useState(false);
    const [vendorDecision, setVendorDecision] = useState("");
    const [isViewImage, setIsViewImage] = useState(false);
    const [alreadyDoneNotification, setAlreadyDoneNotification] = useState(false);
    const [incomingMessage, setIncomingMessage] = useState('');





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

    const acceptOrder = () => {
        // Corrected from setIsAccpeted
        setFirstPage(false)
        setIsViewImage(false)
        setIsRejected(false)
        setIsAccepted(false)
        setIsBudget(true)
    };
    const rejectOrder = () => {
        setFirstPage(false)
        setIsAccepted(false)
        setIsViewImage(false)
        setIsRejected(true)
        setVendorDecision('reject')
    }
    const viewImageHere = () => {
        setIsBudget(false)
        setFirstPage(false)
        setIsAccepted(false)
        setIsRejected(false)
        setIsViewImage(true)

    }
    const closeViewImages = () => {
        setIsBudget(false)
        setIsAccepted(false)
        setIsViewImage(false)
        setIsRejected(false)
        setFirstPage(true)

    }
    const closeViewBudget = () => {
        setIsAccepted(false)
        setIsViewImage(false)
        setIsRejected(false)
        setIsBudget(false)
        setFirstPage(true)

    }
    const finallyAccepted = () => {
        setIsBudget(false)
        setIsAccepted(true)
        setVendorDecision('accept');
    }



    useEffect(() => {
        if (vendorDecision === 'accept') {  // Corrected from isAccpeted
            handleSubmit();
        }
    }, [isAccepted, vendorDecision]);

    const closeRejected = () => {
        setIsRejected(false)
        setIsAccepted(false)
        setFirstPage(true)

    }


    const [photoPreviews, setPhotoPreviews] = useState({
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null,
    });

    const [photos, setPhotos] = useState({
        MajorDamages1: null,
        MajorDamages2: null,
        MajorDamages3: null,
        MajorDamages4: null,
        MajorDamages5: null,
    });

    useEffect(() => {
        if (accidentDataById && accidentDataById[0]) {
            setPhotoPreviews({
                MajorDamages1: accidentDataById[0].MajorDamages1 || null,
                MajorDamages2: accidentDataById[0].MajorDamages2 || null,
                MajorDamages3: accidentDataById[0].MajorDamages3 || null,
                MajorDamages4: accidentDataById[0].MajorDamages4 || null,
                MajorDamages5: accidentDataById[0].MajorDamages5 || null,
            });

            console.log("photoPreviews", photoPreviews.MajorDamages1)
            setPhotos({
                MajorDamages1: accidentDataById[0].MajorDamages1 || null,
                MajorDamages2: accidentDataById[0].MajorDamages2 || null,
                MajorDamages3: accidentDataById[0].MajorDamages3 || null,
                MajorDamages4: accidentDataById[0].MajorDamages4 || null,
                MajorDamages5: accidentDataById[0].MajorDamages5 || null,
            });
        }
    }, [accidentDataById]);

    const [expandedImage, setExpandedImage] = useState(null);

    const photoRefs = {

        MajorDamages1: useRef(null),
        MajorDamages2: useRef(null),
        MajorDamages3: useRef(null),
        MajorDamages4: useRef(null),
        MajorDamages5: useRef(null)
    };



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
                rejectionReason: updatedReasons,
            };
            console.log("FOrmData1234", formData)

            // Create FormData object
            const formDataObj = new FormData();
            for (const key in formData) {
                if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
                    if (formData[key] instanceof File) {
                        formDataObj.apcpend(key, formData[key], formData[key].name);
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
                url: `${backendUrl}/api/vendorOnAssignedVehicle/${data[0].AccidentVehicleCode}/${userId}/admin`,
                data: formDataObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data.message == "Another Vendor Already Accepted Case") {
                console.log("hey123")
                setAlreadyDoneNotification(true)
                setIncomingMessage(response.data.message)
                // setFirstPage(true)
            }
            if (response.data.message == "Order Gets Cancelled") {
                console.log("hey123")
                setAlreadyDoneNotification(true)
                setIncomingMessage(response.data.message)
                // setFirstPage(true)
            }
            if (response.data.message === "Your Request Added Successfully !!!.") {
                // Success handling
                setIsRejected(false);
                setFirstPage(false);
                setIsAccepted(false);

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

    const goToMap = (item) => {
        console.log("item", item)
        navigate('/map-vendor-distance', {
            state: {
                accidentLatitude: item.accidentLatitude,
                accidentLongitude: item.accidentLongitude,
                vendorLatitude: vendorCurrentLatitude,
                vendorLongitude: vendorCurrentLongitude,
                fromPage: "caseFirstCard"
            }
        })
    }

    console.log("mdo23432", FirstPage, accidentLocationDistance, accidentDataById.length, getVendorData.length)

    return (
        <div>
            {alreadyDoneNotification && (
                <div className='flex  fixed top-5 left-15 text-white bg-black  px-6 py-3 rounded-xl ml-2 mb-1' style={{zIndex:"1001"}}>
                    <p className='mt-1 mr-2'>${`Thank You But ${incomingMessage}!!!`}</p> 
                    <CloseIcon  onClick={()=>setAlreadyDoneNotification(false)}  />
                </div>
            )} 
            {FirstPage && accidentLocationDistance && accidentDataById.length !== 0 && getVendorData.length != 0 && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                    zIndex: 1001,
                    display: "flex",
                    alignItems: "flex-end", // positions the container at the bottom
                    justifyContent: "center",
                    animation: "slideUp 0.5s ease-out",
                }}>
                    {/* <div className="image-container">
                        <div className="background-image"></div>

                        <div className="text-overlay">
                            <p style={{ fontSize: '14px', padding: "5px", border: '3px solid blue', borderImage: 'linear-gradient(to top, white 10% , black 90%) 1', textAlign: 'center', borderRadius: '30px', fontWeight: "bold" }}>
                                Case Assigned!
                            </p>

                            <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>Estimated earnings </p>
                            <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>₹ {accidentDataById[0].charges}</h1>



                            <div style={{ display: 'flex' }}>
                                <p style={{ fontSize: '11px', paddingRight: '10px', marginTop: '2px' }}>Accident Location : {accidentLocationDistance} km</p>
                            </div>

                            <div className="text-overlay text-overlay2">
                                <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                    <p style={{ fontSize: "12px", marginTop: "10px", fontWeight: "bold" }}>{getVendorData[0].vendorName}</p>
                                    <h4 style={{ marginBottom: '5px', fontSize: "11px", marginTop: "5px", border: "2px solid grey", borderRadius: "10px", fontSize: "10px", padding: "5px" }} onClick={viewImageHere}>View Images</h4>
                                </div>
                                <p style={{
                                    fontSize: '12px',
                                    marginTop: "10px",
                                    background: "white",
                                    padding: "10px",
                                    border: '2px solid #000000',
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    fontWeight: "bold",
                                    color: "blue",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    position: "relative",
                                    cursor: "pointer",
                                    maxWidth: "400px",
                                    minWidth: "150px"
                                }} onClick={() => goToMap(data[0])}>
                                    Go to map
                                    <KeyboardDoubleArrowRightIcon style={{
                                        position: "absolute",
                                        left: '10px'
                                    }} />
                                </p>
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
                    </div> */}
                    <FirstCardPage accidentData={accidentDataById[0]} setFirstPage={setFirstPage} setIsViewImage={setIsViewImage} setIsRejected={setIsRejected} setIsAccepted={setIsAccepted} setVendorDecision={setVendorDecision} />
                </div>)}
            {isRejected && (
                <div>
                    {!completeSuccessfully && (
                        <div style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                            zIndex: 1001,
                            display: "flex",
                            alignItems: "flex-end", // positions the container at the bottom
                            justifyContent: "center",
                            animation: "slideUp 0.5s ease-out",
                        }}>
                            <div className="image-container" style={{ background: "rgb(245 245 245 / 78%)" }}>
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


                                <label className="form-field" style={{ color: '#3f3c00', marginTop: '20px', fontSize: "14px" }}>
                                    <p style={{ textAlign: "left" }}> Other Reason  : </p>
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
                                            margin: "5px",
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
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                    zIndex: 1001,
                    display: "flex",
                    alignItems: "flex-end", // positions the container at the bottom
                    justifyContent: "center",
                    animation: "slideUp 0.5s ease-out",
                }}>
                    <div className="image-container" style={{ background: "radial-gradient(yellow, transparent)" }}>
                        <div style={{ marginTop: "40%" }}>
                        </div>
                        <SuccessIcon />
                        <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "17px", color: "green", margin: "0px 50px 20px 30px", padding: "5px", flex: 1 }}>Thank You !!!</h1>


                    </div>
                </div>
            )}
            {isBudget && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                    zIndex: 1001,
                    display: "flex",
                    alignItems: "flex-end", // positions the container at the bottom
                    justifyContent: "center",
                    animation: "slideUp 0.5s ease-out",

                }}>
                    <div className="image-container" style={{ background: "yellow" }}>
                        <img
                            src={crossUser}
                            onClick={closeViewBudget}
                            style={{
                                position: "relative",
                                left: "calc(100% - 30px)",
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                                zIndex: 1001,
                                filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                                marginTop: "15px",
                            }}
                        />
                        <p style={{ fontSize: "12px", fontWeight: "bold", margin: "30px 60px 0px 10px" }}>Service Charge</p>

                        <input
                            type="text"
                            className="Registrationdetails-elem-9"
                            style={{ textAlign: 'left', margin: "30px 5px 20px 10px", width: '90%' }}
                            value={charges}
                            placeholder='Charges '
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (/^\d{0,10}$/.test(newValue)) {
                                    setCharges(newValue);
                                }
                            }}
                        // disabled={getData.isActive === "false"}
                        />
                        <p style={{
                            fontSize: '11px',
                            marginTop: "5px",
                            background: "rgb(115 255 115)",
                            padding: "10px",
                            border: '1px solid blue',
                            textAlign: 'center',
                            borderRadius: '30px',
                            fontWeight: "bold",
                            color: "black",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "center",
                            position: "relative",
                            cursor: "pointer",
                            maxWidth: '80%',
                            left: "25px"
                        }} onClick={finallyAccepted}>
                            <KeyboardDoubleArrowRightIcon style={{
                                position: "absolute",
                                left: '10px'
                            }} />
                            Accept Case
                        </p>


                    </div>
                </div>
            )}
            {isViewImage && (

                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "flex-end", // positions the container at the bottom
                    justifyContent: "center",
                    animation: "slideUp 0.5s ease-out",
                }}>
                    <div style={{
                        position: "relative",
                        width: "97%",
                        maxWidth: "600px",
                        backgroundColor: "#fff", // white background for the content
                        borderRadius: "15px 15px 0px 0px",
                        // marginBottom: "30px",
                        maxHeight: "80%", // limit the height for scrollability
                        overflowY: "auto", // enables vertical scrolling
                        padding: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }} >
                        <img
                            src={crossUser}
                            onClick={closeViewImages}
                            style={{
                                position: "fixed",
                                left: "calc(100% - 35px)",
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                                zIndex: 1001,
                                filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                            }}
                        />
                        {Object.keys(photos).map((type, index) => (
                            <div key={type} className="photo-input-section">
                                <label>
                                    <h6 style={{ fontSize: "11px" }}>
                                        {type.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                                    </h6>

                                </label>
                                {photoPreviews[type] && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px' }}>
                                        <img
                                            src={photoPreviews[type]}
                                            alt={`Upload preview ${type}`}
                                            style={{ width: 100, height: 100, cursor: 'pointer' }}
                                            onClick={() => setExpandedImage(photoPreviews[type])}
                                        />

                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Modal for expanded image view */}
                        <Modal
                            open={!!expandedImage}
                            onClose={() => setExpandedImage(null)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <img
                                src={expandedImage}
                                alt="Expanded preview"
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            />
                        </Modal>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseFirstCard;
