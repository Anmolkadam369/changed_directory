import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Marker Icon
const locationIcon = new L.Icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const MapForVendorDistancee = () => {
    const [position, setPosition] = useState([28.6139, 77.2090]); // Default: New Delhi

    useEffect(() => {
        const updateLocation = (lat, lon) => {
            setPosition([lat, lon]);
            console.log("Updated Position:", lat, lon);
        };

        // Simulated WebSocket Message Handler
        const simulateWebSocket = () => {
            const newLat = position[0] + (Math.random() - 0.5) * 0.002; // Simulated data
            const newLon = position[1] + (Math.random() - 0.5) * 0.002;
            updateLocation(newLat, newLon);
        };

        const interval = setInterval(simulateWebSocket, 3000); // Simulate WebSocket updates every 3 sec

        return () => clearInterval(interval);
    }, [position]);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={locationIcon}>
                    <Popup>Live Location!</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapForVendorDistancee;
