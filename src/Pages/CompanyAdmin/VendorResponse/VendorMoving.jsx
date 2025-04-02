import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import telephonecall from '../../../Assets/telephonecall.png'
import { MapContainer, TileLayer } from 'react-leaflet';
import ModalButton from "../../Customers/FirstPageDesigns/ModalButton";

const VendorMoving = ({ item }) => {
    const navigate = useNavigate()
    console.log("itemfromvendormoving", item)
    console.log("itemfromvendormoving", item.details[0].cancelOrder)

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [vendorCurrentLatitude, setVendorCurrentLatitude] = useState("")
    const [vendorCurrentLongitude, setVendorCurrentLongitude] = useState("")
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [distance, setDistance] = useState('')

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddedDataByVendor, setShowAddedDataByVendor] = useState(false);


    console.log("distacne", distance)

    function haversine(lat1, lon1, lat2, lon2) {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Earth radius in km

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    console.log("item in vendorMoving", item)
    const [imageContainer, setImageContainer] = useState(false)

    useEffect(() => {
        if (item.reg != undefined) {
            // getCurrentLocation()
            setImageContainer(true)
        }
    }, [item])

    const getCurrentLocation = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendorCurrentLocation/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.status === true) {
                let vendorCurrentLatitude = response.data.data[0].latitude;
                let vendorCurrentLongitude = response.data.data[0].longitude;
                setVendorCurrentLatitude(vendorCurrentLatitude)
                setVendorCurrentLongitude(vendorCurrentLongitude)
                console.log("userId", userId)
                console.log('baho', item.accidentLatitude, item.accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude)

                setDistance(haversine(item.accidentLatitude, item.accidentLongitude, vendorCurrentLatitude, vendorCurrentLongitude).toFixed(2))
            }
            else if (response.data.message === "User Not found take Location") {
                console.log("User Not found take Location")
            }
        } catch (error) {
            console.log("error in get Vendor Location", error.message)
        }
    }

    const readyToGo = async () => {
        try {
            let response = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/vendorMoved/${userId}/${item.AccidentVehicleCode}/${item.details[0].vendorType}`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                console.log('successfully updated status')
            }
            else console.log("there is some issue")

        }
        catch (error) {
            console.log("the error occured", error.message)
        }
    }

    const reachedLocation = async () => {
        try {
            let response = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/vendorReachedLocation/${userId}/${item.AccidentVehicleCode}/${userId}/${item.details[0].vendorType}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status) {
                setAlertMessage("Updated successfully!");
                setAlertType("success"); // Bootstrap alert type for success
            } else {
                setAlertMessage("There is some issue.");
                setAlertType("danger"); // Bootstrap alert type for error
            }
        } catch (error) {
            setAlertMessage(`An error occurred: ${error.message}`);
            setAlertType("danger"); // Bootstrap alert type for error
        }

        setTimeout(() => {
            setAlertMessage(null);
        }, 5000);
    };

    const workDone = async () => {
        try {
            let response = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/VendorWorkDone/${userId}/${item.AccidentVehicleCode}/${item.details[0].vendorType}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                setAlertMessage("Updated successfully!");
                setAlertType("success"); // Bootstrap alert type for success
            }
            else {
                setAlertMessage("There is some issue.");
                setAlertType("danger"); // Bootstrap alert type for error
            }
        }
        catch (error) {
            setAlertMessage(`An error occurred: ${error.message}`);
            setAlertType("danger"); // Bootstrap alert type for error
        }
    }

    const goToMap = () => {
        navigate('/map-vendor-distance', {
            state: {
                accidentLatitude: item.accidentLatitude,
                accidentLongitude: item.accidentLongitude,
                vendorLatitude: vendorCurrentLatitude,
                vendorLongitude: vendorCurrentLongitude,
                vehicleNo: item.reg,
                fromPage: "vendorMoving"
            }
        })
    }

    const viewData = (id, item) => {
        setSelectedId(id);
        setSelectedItem(item)
        setShowAddedDataByVendor(true)
    }

    const navigation = (selectedId, selectedItem) => {
        navigate('/crane-vehicle-information', { state: { id: selectedId, item: selectedItem } });
    };

    useEffect(() => {
        if (showAddedDataByVendor && selectedId != null) {
            navigation(selectedId, selectedItem); // Now navigation is defined above this
        }
    }, [showAddedDataByVendor, selectedId, selectedItem]); // Ensure navigation is called only when these values change






    return (
        <div>
            {(



                <div className="text-overlay" style={{ height: "90%", padding: '0px' }}>
                    <div className='h-full w-full '>
                        <MapContainer zoom={13} center={[19.0760, 72.8777]} style={{ width: '100%', height: '100vh' }}>
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                            />
                        </MapContainer>
                    </div>

                    <div className="text-overlay text-overlay2" style={{ padding: "10px 20px 20px 20px", zIndex: "1000" }}>
                        <div className="flex justify-between m-3">

                            <h1 style={{ textAlign: "center", fontSize: "23px", fontWeight: "bold" }}>{item.reg}</h1>
                            <p style={{ fontSize: '11px', paddingRight: '10px', marginTop: '2px' }}>Accident Location : {distance} km</p>
                        </div>

                        {/* <p style={{ fontSize: '11px', gap: "10px" }}>205 D/15, Indl Estate, L B S Marg, Opp I O L, Near Amrutnagar, Near Ayodhya Chowk, Rohini, K Marg, Lower Parel Mumbai Maharashtra 4000067</p> */}
                        {Boolean(!item.details[0]?.vendorMoved && item.details[0].customerAcceptedVendor  && !item.details[0].closeOrder) && (<p style={{
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
                        }} onClick={readyToGo}>
                            <KeyboardDoubleArrowRightIcon style={{
                                position: "absolute",
                                left: '10px'
                            }} />
                            Ready To Go
                        </p>)}

                        {Boolean(item.details[0]?.vendorMoved) && (<p style={{
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
                        }} onClick={goToMap}>
                            Go to map
                            <KeyboardDoubleArrowRightIcon style={{
                                position: "absolute",
                                left: '10px'
                            }} />
                        </p>)}

                        {item.details[0]?.vendorDecision === 'reject' && (
                            <div>
                                <textarea
                                    className="Registrationdetails-elem-9"
                                    style={{ textAlign: 'left', margin: "30px 5px 20px 10px", width: '95%', background: "lightgray" }}
                                    value={item.details[0]?.rejectionReason}
                                    readOnly
                                />
                            </div>
                        )}

                        {item.details[0]?.acceptedByAdmin === 'reject' && (
                            <div>
                                <textarea
                                    className="Registrationdetails-elem-9"
                                    style={{ textAlign: 'left', margin: "30px 5px 20px 10px", width: '95%', background: "lightgray" }}
                                    value={item.details[0]?.reasonforRejection}
                                    readOnly
                                />
                            </div>
                        )}

                        {Boolean(item.details[0]?.cancelOrder) && (
                            <div>
                                <textarea
                                    className="Registrationdetails-elem-9"
                                    style={{ textAlign: 'left', margin: "30px 5px 20px 10px", width: '95%', background: "lightgray" }}
                                    value={item.details[0]?.cancelOrderReason}
                                    readOnly
                                />
                            </div>
                        )}


                        <p style={{
                            fontSize: '11px',
                            marginTop: "5px",
                            background: "#797979",
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
                        }} onClick={() => (window.location.href = 'tel: 9867756819')}>
                            <img src={telephonecall} style={{
                                position: "absolute",
                                left: '10px', height: '20px', width: '20px', color: 'white'
                            }} />
                            Call For Help
                        </p>

                        {Boolean(item.details[0]?.vendorMoved && !item.details[0]?.approvedReaching) && (<p style={{
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
                        }} onClick={reachedLocation}>
                            Reached At Location<KeyboardDoubleArrowLeftIcon style={{
                                position: 'absolute',
                                right: "10px"
                            }} />
                        </p>)}

                        {Boolean(item.details[0]?.approvedReaching && item.details[0].detailsFilledAt === null)  && (
                            <div style={{
                                fontSize: '11px',
                                marginTop: "5px",
                                background: "lightblue",
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
                                cursor: "pointer"
                            }}>
                                <ModalButton state={{ accidentVehicleCode: item.AccidentVehicleCode , vendorType:item.details[0].vendorType,  title:'add details'}} />
                            </div>
                        )}

                        {Boolean(item.details[0]?.approvedRightlyMeasured && item.details[0].detailsFilledAt !== null) && (
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
                            }} onClick={workDone}>
                                Work Done<KeyboardDoubleArrowLeftIcon style={{
                                    position: 'absolute',
                                    right: "10px"
                                }} />
                            </p>
                        )}

                        {item.details[0]?.issue_occured !== null && (
                            <div style={{ marginTop: "5px", fontSize: "12px", padding: "10px" }} className={`alert alert-danger text-center`} role="alert">
                                {item.details[0]?.issue_occured}
                            </div>
                        )}

                        {alertMessage && (
                            <div style={{ marginTop: "5px", fontSize: "12px", padding: "10px" }} className={`alert alert-${alertType} text-center`} role="alert">
                                {alertMessage}
                            </div>
                        )}
                    </div>

                </div>

            )}

        </div>
    )
}

export default VendorMoving;