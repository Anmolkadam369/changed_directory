import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine
import backendUrl from '../../environment';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import iarkerIcon from '../../Assets/markerIcon1.png'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const MapForVendorDistance = () => {
    const [map, setMap] = useState(null);
    const navigate = useNavigate()
    const { state } = useLocation();
    let [accidentLatitude, setAccidentLatitude] = useState(state?.accidentLatitude);
    let [accidentLongitude, setAccidentLongitude] = useState(state?.accidentLongitude);
    let [vendorLatitude, setVendorLatitude] = useState(state?.vendorLatitude);
    let [vendorLongitude, setVendorLongitude] = useState(state?.vendorLongitude);
    let [vehicleNo, setVehicleNo] = useState(state?.vehicleNo);

    console.log("accidentLatitude",accidentLatitude)
    console.log("accidentLongitude",accidentLongitude)
    console.log("vendorLatitude",vendorLatitude)
    console.log("vendorLongitude",vendorLongitude)


    const [distance, setDistance] = useState(0.00)
    console.log("distance from map for vendor", accidentLatitude, accidentLongitude, vendorLatitude, vendorLongitude)

    const accidentIcon = new L.Icon({
        iconUrl: require('../../Assets/markerIcon1.png'),
        iconRetinaUrl: require('../../Assets/markerIcon1.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [30, 30],
        iconAnchor: [15, 45],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const markerIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [10, 20],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [20, 30]
    });

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

    useEffect(() => {
        setDistance(haversine(accidentLatitude, accidentLongitude, vendorLatitude, vendorLongitude));
    }, [accidentLatitude, accidentLongitude, vendorLatitude, vendorLongitude]);

    useEffect(() => {
        if (map) {
            const routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(vendorLatitude, vendorLongitude), // Vendor Location
                    L.latLng(accidentLatitude, accidentLongitude) // Accident Location
                ],
                routeWhileDragging: true, // Allow route dragging
                createMarker: () => null, // Prevent displaying markers for the route waypoints
                lineOptions: {
                    styles: [{ color: 'blue', weight: 4 }]
                }
            }).addTo(map);
            return () => {
                map.removeControl(routeControl); // Cleanup the route on component unmount or map changes
            };
        }
    }, [map, vendorLatitude, vendorLongitude, accidentLatitude, accidentLongitude]);

    const handleSelectButtonClick = () => {
        console.log("vendorMovingsdf")
        console.log("vendorMov", state?.fromPage)
        

        if(state?.fromPage == "statusTracking"){
            console.log("frompage 88", state?.fromPage)
        navigate("/Crane-dashboard");
        }
        else if(state?.fromPage == "vendorMoving") {
        navigate("/craneDashboard");
        }
        else if(state?.fromPage == 'caseFirstCard'){
            navigate('/crane-user-dashboard')
        }
        else{
            navigate("/Crane-dashboard", { state: { indexFor: 1, vehicleNo: vehicleNo } });
        }
    };

    return (
        <div>
            {distance && (
                <div>
                    <div className="map-container" style={{ height: '1200px', marginRight: "40px", width: '100%', borderRadius: '10px' }}>
                        <MapContainer center={[accidentLatitude, accidentLongitude]} zoom={10} whenCreated={setMap} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                            />
                            <Marker position={[accidentLatitude, accidentLongitude]} icon={accidentIcon}>
                                <Popup>
                                    Accident Location
                                </Popup>
                            </Marker>

                            <Marker position={[vendorLatitude, vendorLongitude]} icon={markerIcon}>
                                <Popup
                                    style={{
                                        backgroundColor: "#f0f8ff", // Light cyan background
                                        color: "#333", // Dark text color
                                        border: "2px solid #008080", // Teal border
                                        borderRadius: "12px", // Rounded corners
                                        padding: "15px", // More padding for spacing
                                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)", // Stronger shadow for depth
                                        fontFamily: "'Arial', sans-serif", // Font style
                                        fontSize: "16px", // Increase text size
                                        lineHeight: "1.6", // Adjust line height for better readability
                                        transition: "transform 0.3s ease", // Smooth transition effect
                                        marginBottom: "15px"
                                    }}
                                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} // Zoom effect on hover
                                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Reset on hover out
                                >
                                    Distance:<strong style={{ color: "#008080", fontStyle: "italic", fontSize: "10px" }}>{distance.toFixed(2)} KM</strong>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <button
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "center",
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            borderRadius: '30px',
                            maxWidth: "400px",
                            minWidth: "200px",
                            zIndex: 1000, // Make sure it's above the map
                        }}
                        onClick={handleSelectButtonClick}
                    >
                        <KeyboardDoubleArrowRightIcon style={{
                            position: "absolute",
                            right: '10px'
                        }} />
                        Go Back 
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapForVendorDistance;
