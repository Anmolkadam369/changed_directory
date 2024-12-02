import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import backendUrl from '../../environment';
import axios from 'axios';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};


const VendorByMap = ({ onUpdate }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [vendorLocationData, setVendorLocationData] = useState([]);
    const [foundVendors, setFoundVendors] = useState([]);
    const [vendorsName, setVendorName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    console.log("STATES_Info", state)
    console.log("CITYS_Info", city)

    const [vendorId, setVendorId] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error('Error loading states:', error);
                setIsLoadingStates(false);
            });
    }

    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Error loading cities:', error);
                setIsLoadingCities(false);
            });
    };

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
    }, [vendorLocationData, vendorsName, vendorId, state, city]);

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
        console.log("foundHere", found)

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

        if (state) {
            found = found.filter((vendor) =>
                vendor.state.includes(state)
            );
        }

        if (city) {
            found = found.filter((vendor) =>
                vendor.district.includes(city)
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
        if (e.target.name === "state") {
            const tempState = e.target.value;
            loadCities(tempState);
            setState(tempState)
        }
        if (e.target.name === "city") {
            const tempCity = e.target.value;
            setCity(tempCity)
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
                    <div style={{ marginLeft: "10px", padding: "15px" }} className='form-row'>

                        <label className="form-field" style={{ marginLeft: "5px", marginBottom: "0px", flex: "1 1 15%" }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Vendor Id:</p>
                            <input
                                type="text"
                                name="vendorId"
                                className='inputField1'
                                value={vendorId}
                                onChange={handleChanges}
                            />
                        </label>
                        <label className="form-field" style={{ marginLeft: "5px", marginBottom: "0px" }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Vendor Name:</p>
                            <input
                                type="text"
                                name="vendorName"
                                className='inputField1'
                                value={vendorsName}
                                onChange={handleChanges}
                            />
                        </label>
                        <div className="dropdown green-dropdown form-field" style={{ marginBottom: "0px" }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "5px" }}>Select Vendor Type :</p>

                            <button
                                className="form-field input-group mb-3"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={toggleDropdown}
                                style={{ marginLeft: '10px', width: "100%", padding: "5px", borderRadius: "10px", marginTop: "0px", marginBottom: "0px", background: 'lightgrey', border: "1px solid black" }}
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

                        <div style={{ display: "flex", gap: '2px' }}>
                            <label className="form-field input-group mb-1" style={{ borderRadius: "30px" }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "5px" }}>Select State:</p>
                                <select
                                    name="state"
                                    onChange={handleChanges}
                                    disabled={isLoadingStates}
                                    style={{ marginBottom: "1px" }}
                                    value={state}>
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state.iso2} value={state.iso2}>{state.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-field input-group mb-3" style={{ borderRadius: "30px" }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "5px" }}>Select City:</p>
                                <select
                                    name="city"
                                    value={city} // This should match city.iso2
                                    onChange={handleChanges}
                                    disabled={isLoadingCities || !state}
                                >
                                    <option value="">Select City</option>
                                    {!cities.error && cities.map(city => {
                                        return (
                                            <option key={city.iso2} value={city.iso2}>
                                                {city.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>

                    </div>

                    <div style={{ display: "flex", alignItems: 'center', margin: "30px 0px 10ox 30px" }}>
                        <h6 style={{ fontSize: "16px", fontWeight: "bold", textDecoration: "underline" }}>Filtered Vendors  </h6>
                        <span style={{ marginBottom: "10px", fontSize: "10px", background: "green", color: "white", borderRadius: "50px", width: "40px", height: "15px", display: 'inline-block', lineHeight: "15px", textAlign: "center", marginLeft: "10px", fontWeight: "bold" }}>{foundVendors.length}</span>
                    </div>
                    <div
                        style={{
                            overflowX: 'hidden',
                            height: "110px",
                            marginBottom: "100px",
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '20px',
                            padding: '10px',
                        }}
                    >
                        {foundVendors.map((vendor, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "1px solid black",
                                    background: "linear-gradient(1000deg, #80000036, transparent)",
                                    borderRadius: "5px",
                                    padding: "15px",
                                    boxSizing: 'border-box',
                                }}
                            >
                                <strong style={{ color: "rgb(0 155 137)", fontSize: "12px", marginRight: "10px" }}>
                                    Vendor Name: {vendor.vendorName}
                                </strong>
                                <br />
                                <strong style={{ color: "rgb(38 4 247)", fontSize: "12px", marginRight: "10px" }}>
                                    Type: {vendor.vendorType.charAt(0).toUpperCase() + vendor.vendorType.slice(1).toLowerCase()}
                                </strong>
                                <br />
                                <strong style={{ color: "#1976d2", fontStyle: "italic", fontSize: "12px", marginRight: "10px" }}>
                                    Address: {vendor.address}
                                </strong>
                                <br />
                            </div>
                        ))}
                    </div>

                    <div className="map-container" style={{ border: '4px solid lightgreen', height: '400px', width: '100%', borderRadius: '10px', margin: '10px' }}>
                        <MapContainer center={[28.7041, 77.1025]} zoom={4} whenCreated={setMap} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                            />

                            {foundVendors.map((vendor, index) => {
                                console.log("Vendor coordinates:", vendor.latitude, vendor.longitude);
                                // Slightly larger offset to avoid marker overlap for vendors at the same location
                                const offsetLat = (Math.random() * 0.0014) - 0.0002; // adjust the offset range
                                const offsetLng = (Math.random() * 0.0014) - 0.0002; // adjust the offset range
                                const position = [
                                    parseFloat(vendor.latitude) + offsetLat,
                                    parseFloat(vendor.longitude) + offsetLng
                                ];
                                console.log("postition", position)

                                return (
                                    <Marker key={index} position={position} icon={markerIcon}>
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
                                        </Popup>


                                    </Marker>
                                );
                            })}

                        </MapContainer>
                    </div>

                </div>
                <div className='form-fields-container'>

                </div>
            </div>
        </div >
    )



}

export default VendorByMap;
