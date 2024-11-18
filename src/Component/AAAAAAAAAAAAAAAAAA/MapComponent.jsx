import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import backendUrl from '../../environment';
import axios from 'axios';
import iarkerIcon from '../../Assets/markerIcon1.png'

const MapComponent = ({ accidentLocation1, additionalInfo }) => {
  console.log("accidentLocation1 ", accidentLocation1, additionalInfo)
  console.log("accienent latitude ", accidentLocation1.accidentLatitude)
  console.log('accienent longitude', accidentLocation1.accidentLongitude)
  const [map, setMap] = useState(null);
  const [vendorLocationData, setVendorLocationData] = useState([]);
  console.log("vendorlocatin", vendorLocationData)


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
    console.log("accident latitude", lat1)
    console.log("accident longtitude", lon1)
    console.log("vehicle latitiude", lat2)
    console.log("vehicle longtitude", lon2)

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

  const accidentLocation = { lat: accidentLocation1.accidentLatitude || 19.6967, lon: accidentLocation1.accidentLongitude || 72.7699 };

  const findNearestVendors = (accidentLocation, vendors, maxDistance) => {
    if (!Array.isArray(vendors)) return [];
    return vendors
      .map((vendor) => ({
        ...vendor,
        distance: haversine(accidentLocation.lat, accidentLocation.lon, vendor.latitude, vendor.longitude),
      }))
      .filter((vendor) => vendor.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  };

  const maxDistance = additionalInfo.distance;
  console.log("maxdistnace", maxDistance)
  const nearestVendors = findNearestVendors(accidentLocation, vendorLocationData, maxDistance);


  useEffect(() => {
    if (map) {
      map.setView([accidentLocation.lat, accidentLocation.lon], 13);
    }
    vendorsData(additionalInfo.vendorType || "all");
  }, [map, additionalInfo.vendorType]);

  const vendorsData = async (vendorType) => {
    const response = await axios.get(`${backendUrl}/api/vendorByType/${vendorType}`);
    console.log("response", response.data);
    setVendorLocationData(response.data.data)
  }

  return (
    <div className="map-container" style={{ height: '450px', marginRight: "40px", width: '100%', borderRadius: '10px' }}>
      <MapContainer center={[accidentLocation.lat, accidentLocation.lon]} zoom={4} whenCreated={setMap} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
        />
        <Marker position={[accidentLocation.lat, accidentLocation.lon]} icon={accidentIcon}>
          <Popup>
            Accident Location
          </Popup>
        </Marker>
        {nearestVendors.map((vendor, index) => (
          <Marker key={index} position={[vendor.latitude, vendor.longitude]} icon={markerIcon}>
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
              Vendor Name : <strong style={{ color: "rgb(0 155 137)", fontSize: "10px" }}>{vendor.vendorName}</strong><br />
              Type : <strong style={{ color: "rgb(38 4 247)", fontStyle: "italic", fontSize: "10px" }}>{vendor.vendorType.charAt(0).toUpperCase() + vendor.vendorType.slice(1).toLowerCase()}</strong><br />
              Address : <strong style={{ color: "#1976d2", fontStyle: "italic", fontSize: "10px" }}>{vendor.address}</strong><br />
              Distance:<strong style={{ color: "#008080", fontStyle: "italic", fontSize: "10px" }}>{vendor.distance.toFixed(2)} KM</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
