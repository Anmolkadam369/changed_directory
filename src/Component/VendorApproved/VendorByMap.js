import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import backendUrl from '../../environment';
import axios from 'axios';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VendorByMap = ({ onUpdate }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [vendorLocationData, setVendorLocationData] = useState([]);
    const [foundVendors, setFoundVendors] = useState([]);
    const [vendorsName, setVendorName] = useState('');
    const [vendorId, setVendorId] = useState('');

    const [selectedVendorType, setSelectedVendorType] = useState("");
    const [map, setMap] = useState(null);

    const markerIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [10, 20],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [20, 30]
    });
    const handleSelect = (event, value) => {
        event.preventDefault();
        setShowDropdown(false);
        setSelectedVendorType(value);
        setVendorName('');
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    useEffect(() => {
        if (map) {
            map.setView([28.7041, 77.1025], 13);
        }
        vendorsData(selectedVendorType || "all");
    }, [selectedVendorType]);

    useEffect(() => {
        findNearestVendors();
    }, [vendorLocationData, vendorsName, vendorId]);    

    const vendorsData = async (vendorType) => {
        try {
            const response = await axios.get(`${backendUrl}/api/vendorByType/${vendorType}`);
            console.log("response1234567890", response.data);
            setVendorLocationData(response.data.data);
        } catch (error) {
            console.error("Error fetching vendor data:", error);
        }
    }

    const findNearestVendors = () => {
        console.log("Filtering vendors for:", vendorsName, selectedVendorType, vendorId);
        console.log("vendorLocationData12345", vendorLocationData)

        let found = vendorLocationData.filter((vendor) =>
            vendor.latitude != null && vendor.longitude != null
        );

        if (vendorsName) {
            found = found.filter((vendor) =>
                vendor.vendorName.toLowerCase().includes(vendorsName.toLowerCase())
            );
        }

        if (vendorId) {
            found = found.filter((vendor) =>
                String(vendor.id).includes(vendorId)
            );
        }

        if (selectedVendorType) {
            found = found.filter((vendor) =>
                vendor.vendorType.includes(selectedVendorType)
            );
        }

        console.log("Found vendors:", found);
        setFoundVendors(found);
    };


    const handleChanges = (e) => {
        if (e.target.name == "vendorName") {
            const tempName = e.target.value;
            setVendorName(tempName);
        }
        if (e.target.name == "vendorId") {
            const tempId = e.target.value;
            setVendorId(tempId);
        }
    };

    const handleBack = () => {
        onUpdate();
    }


    return (


        <div className="Customer-master-form" style={{
            paddingBottom: "50px", marginBottom: "50px", marginLeft: "0px",
            marginRight: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            background: "none",
            boxShadow: "none",
        }}>
            <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                <div style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    padding: '20px'

                }}>
                    <h1 style={{
                        background: 'linear-gradient(to left, rgba(173, 216, 230, 1), rgba(255, 255, 255, 0))',
                        color: '#333',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        display: 'inline-block',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontStyle: "italic"
                    }}>
                        Vendors by their Locations (Latitude & Longitude On Map)
                    </h1>
                </div>
            </div>

            <div >


                <div>
                    <div className='form-row'>
                        <label className="form-field" style={{marginLeft:"5px", marginBottom:"0px"}}>
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Vendor Name:</p>
                            <input
                                type="text"
                                name="vendorName"
                                className='inputField1'
                                value={vendorsName}
                                onChange={handleChanges}
                            />
                        </label>
                        <label className="form-field" style={{marginLeft:"5px", marginBottom:"0px"}}>
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Vendor Id:</p>
                            <input
                                type="text"
                                name="vendorId"
                                className='inputField1'
                                value={vendorId}
                                onChange={handleChanges}
                            />
                        </label>
                        <div className="dropdown green-dropdown form-field" style={{ marginBottom: "0px" }}>
                        <p style={{ fontSize: "13px", fontWeight: "bold" , marginBottom:"5px"}}>Select Vendor Type :</p>

                            <button
                                className="form-field input-group mb-3"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={toggleDropdown}
                                style={{ marginLeft: '10px', width: "100%", padding: "10px", borderRadius: "20px", marginTop: "0px", marginBottom:"0px" }}
                            >
                                {selectedVendorType || "Select Vendor Type"}
                            </button>
                            <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "advocate")}>Advocate</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "crane")}>Crane</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "mechanic")}>Mechanic</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => handleSelect(e, "workshop")}>Workshop</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="map-container" style={{ border: '4px solid lightgreen', height: '400px', width: '100%', borderRadius: '10px', margin: '10px' }}>
                        <MapContainer center={[28.7041, 77.1025]} zoom={4} whenCreated={setMap} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            {foundVendors.map((vendor, index) => (
                                <Marker key={index} position={[vendor.latitude, vendor.longitude]} icon={markerIcon}>
                                    <Popup>
                                        {vendor.vendorName}<br />{vendor.vendorType}<br />{vendor.address}<br />
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                </div>
                <div className='form-fields-container'>

                </div>
            </div>
        </div>
    )



}

export default VendorByMap;
