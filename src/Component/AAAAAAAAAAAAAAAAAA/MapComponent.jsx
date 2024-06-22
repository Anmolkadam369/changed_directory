import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import backendUrl from '../../environment';
import axios from 'axios';
import iarkerIcon from '../../Assets/markerIcon1.png'

// Function to calculate the distance between two coordinates


const MapComponent = ({accidentLocation1, additionalInfo}) => {
  console.log("accidentLocation1 ",accidentLocation1,additionalInfo)
  console.log("accienent latitude ", accidentLocation1.latitude)
  console.log('accienent longitude', accidentLocation1.longitude)
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
    iconSize: [20, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
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
  
  const accidentLocation = { lat: accidentLocation1.latitude || 19.6967, lon: accidentLocation1.longitude || 72.7699 };
  
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

  const vendorsData = async(vendorType)=>{
    const response = await axios.get(`${backendUrl}/api/vendorByType/${vendorType}`);
    console.log("response", response.data);
    setVendorLocationData(response.data.data)
  }

  return (
    <div className="map-container" style={{ height: '450px', marginRight: "40px", width: '100%', borderRadius: '10px' }}>
    <MapContainer center={[accidentLocation.lat, accidentLocation.lon]} zoom={13} whenCreated={setMap} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[accidentLocation.lat, accidentLocation.lon]} icon={accidentIcon}>
        <Popup>
          Accident Location
        </Popup>
      </Marker>
      {nearestVendors.map((vendor, index) => (
        <Marker key={index} position={[vendor.latitude, vendor.longitude]} icon={markerIcon}>
          <Popup>
            {vendor.vendorName}<br />{vendor.vendorType}<br />{vendor.address}<br />Distance: {vendor.distance.toFixed(2)} km
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapComponent;
