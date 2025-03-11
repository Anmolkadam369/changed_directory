import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const MapForVendorDistance = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

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


    const simulateMovement = ([lat, lon]) => {
        const offset = 0.0004;
        const newLat = lat + (Math.random() * offset - offset / 2);
        const newLon = lon + (Math.random() * offset - offset / 2);
        return [newLat, newLon];
    };

    const fetchLocation = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/get-accident-customer-vendor-current-location/AV-14e3a066-9052-41ad-bf81-78fee46eb174/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Fetched Location:", result);

                if (result.status && result.data.length > 0) {
                    let { latitude, longitude } = result.data[0];

                    if (latitude && longitude) {
                        let newPosition = [parseFloat(latitude), parseFloat(longitude)];

                        // if (currentLocation &&
                        //     currentLocation[0] === newPosition[0] &&
                        //     currentLocation[1] === newPosition[1]) {
                        //     console.log('simulated position calling:');
                        // }
                        
                        newPosition = simulateMovement(newPosition); 
                        setCurrentLocation(newPosition);
                        console.log("Updated Position:", newPosition);
                    }
                } else {
                    console.error("Invalid response structure or empty data array");
                }
            } else {
                console.error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    useEffect(() => {
        fetchLocation(); // Initial fetch
        const interval = setInterval(fetchLocation, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div style={{ height: "100vh" }}>
                {currentLocation && (
                    <MapContainer
                        center={currentLocation}
                        zoom={100}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                        />
                        <Marker position={currentLocation} icon={accidentIcon}>
                            <Popup>Current Location</Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </div>
    );
};

export default MapForVendorDistance;
