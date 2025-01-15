import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useNavigate, useLocation } from 'react-router-dom';

const MapForVendorDistance = () => {
    const [map, setMap] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();

    const [accidentLatitude, setAccidentLatitude] = useState(state?.accidentLatitude);
    const [accidentLongitude, setAccidentLongitude] = useState(state?.accidentLongitude);
    const [vendorLatitude, setVendorLatitude] = useState(state?.vendorLatitude);
    const [vendorLongitude, setVendorLongitude] = useState(state?.vendorLongitude);
    const [vehicleNo, setVehicleNo] = useState(state?.vehicleNo);

    const [distance, setDistance] = useState(0.0);
    const [currentLocation, setCurrentLocation] = useState(null);

    const accidentIcon = new L.Icon({
        iconUrl: require('../../Assets/markerIcon1.png'),
        iconRetinaUrl: require('../../Assets/markerIcon1.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [30, 30],
        iconAnchor: [15, 45],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const markerIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [10, 20],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [20, 30],
    });

    useEffect(() => {
        if (!state || !accidentLatitude || !accidentLongitude || !vendorLatitude || !vendorLongitude) {
            // Fetch current location if state data is incomplete or missing
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error fetching current location:", error);
                }
            );
        }
    }, [state, accidentLatitude, accidentLongitude, vendorLatitude, vendorLongitude]);

    function haversine(lat1, lon1, lat2, lon2) {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371;

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
        if (accidentLatitude && accidentLongitude && vendorLatitude && vendorLongitude) {
            setDistance(haversine(accidentLatitude, accidentLongitude, vendorLatitude, vendorLongitude));
        }
    }, [accidentLatitude, accidentLongitude, vendorLatitude, vendorLongitude]);

    useEffect(() => {
        if (map && currentLocation) {
            const routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(currentLocation.latitude, currentLocation.longitude),
                    L.latLng(accidentLatitude || currentLocation.latitude, accidentLongitude || currentLocation.longitude),
                ],
                routeWhileDragging: true,
                createMarker: () => null,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 4 }],
                },
            }).addTo(map);

            return () => {
                map.removeControl(routeControl);
            };
        }
    }, [map, currentLocation, accidentLatitude, accidentLongitude]);

    return (
        <div style={{ height: "30vh" }}>
            {currentLocation && (

                <MapContainer
                    center={[
                        accidentLatitude || currentLocation.latitude,
                        accidentLongitude || currentLocation.longitude,
                    ]}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                    />
                    <Marker
                        position={[
                            accidentLatitude || currentLocation.latitude,
                            accidentLongitude || currentLocation.longitude,
                        ]}
                        icon={accidentIcon}
                    >
                        <Popup>Current Location</Popup>
                    </Marker>
                    {vendorLatitude && vendorLongitude && (
                        <Marker position={[vendorLatitude, vendorLongitude]} icon={markerIcon}>
                            <Popup>Vendor Location</Popup>
                        </Marker>
                    )}
                </MapContainer>

            )}
        </div>
    );
};

export default MapForVendorDistance;
