import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import Admin from '../../AdminHome/SideBar/Admin';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 15,
        height: 15,
        margin: 1.7,
    },
}));

const VendorByMap = () => {
    const [singleVendor, setSingleVendor] = useState(true)
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [vendorLocationData, setVendorLocationData] = useState([]);
    const [foundVendors, setFoundVendors] = useState([]);
    const [vendorsName, setVendorName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    console.log("STATES_Info", state)
    console.log("CITYS_Info", city)
    const [toInputBox, setToInputBox] = useState(false)
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const mapRef = useRef(null);

    const [vendorId, setVendorId] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const handleSwitchInputBox = (event) => {
        setToInputBox(!toInputBox)
    };

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/vendorByType/${vendorType}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
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
            let tempCity = e.target.value;
            tempCity = tempCity.charAt(0).toUpperCase() + tempCity.slice(1).toLowerCase()
            setCity(tempCity)
        }
    };

    const handleBack = () => {
        navigate(-1)
    }


    return (
        <div>
            <Admin />
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


                                {!toInputBox && (<label className="form-field input-group mb-3">
                                    <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                                        <span style={{ marginRight: '10px' }}>Vendor Place - City:</span>
                                        <div className="switch-container">
                                            <FormControlLabel
                                                control={<Android12Switch defaultChecked />}
                                                checked={singleVendor}
                                                onChange={handleSwitchInputBox}
                                                label="" // You can add a label here if needed
                                            />
                                        </div>
                                    </div>


                                    <select
                                        name="city"
                                        value={city} // This should match city.iso2
                                        onChange={handleChanges}
                                        disabled={isLoadingCities || !state}
                                    >
                                        <option value="">Select City</option>
                                        {!cities.error && cities.map(city => {
                                            console.log('Rendering city:', city.iso2, city.name); // Debug: Check city values
                                            return (
                                                <option key={city.iso2} value={city.iso2}>
                                                    {city.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </label>)}

                                {toInputBox && (
                                    <label className="form-field input-group mb-3">

                                        <div className='switchparent-container' style={{ display: 'flex', alignItems: 'center', height: "18px" }}>
                                            <span style={{ marginRight: '10px' }}>Vendor Place - City:</span>
                                            <div className="switch-container">
                                                <FormControlLabel
                                                    control={<Android12Switch defaultChecked />}
                                                    checked={singleVendor}
                                                    onChange={handleSwitchInputBox}
                                                    label="" // You can add a label here if needed
                                                />
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder='city'
                                            value={city}
                                            onChange={handleChanges}
                                            className="form-control"
                                            readOnly={state === ""}
                                            required
                                        />
                                    </label>
                                )}
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

                        <div className={`relative ${isFullScreen ? "fixed inset-0 z-50" : ""} bg-white shadow-lg rounded-lg overflow-hidden`}>
                           
                        <div className="absolute top-4 right-4 flex justify-end w-full px-4">
                             <Button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                                onClick={() => setIsFullScreen(!isFullScreen)}
                            >
                                {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                            </Button>
                        </div>

                            <div className="map-container border-4 border-lightgreen rounded-lg m-2" style={{ height: isFullScreen ? "100vh" : "400px", width: "100%" }}>
                                <MapContainer center={[28.7041, 77.1025]} zoom={4} whenCreated={setMap} style={{ height: "100%", width: "100%" }} ref={mapRef}>
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                                    />
                                    {foundVendors.map((vendor, index) => {
                                        const offsetLat = (Math.random() * 0.0014) - 0.0002;
                                        const offsetLng = (Math.random() * 0.0014) - 0.0002;
                                        const position = [
                                            parseFloat(vendor.latitude) + offsetLat,
                                            parseFloat(vendor.longitude) + offsetLng
                                        ];

                                        return (
                                            <Marker key={index} position={position} icon={markerIcon}>
                                                <Popup className="p-4 bg-lightcyan border-teal-500 rounded-lg shadow-lg">
                                                    <div className="text-gray-800 text-sm">
                                                        <p><strong className="text-teal-700 text-xs">Vendor Name:</strong> {vendor.vendorName}</p>
                                                        <p><strong className="text-blue-700 italic text-xs">Type:</strong> {vendor.vendorType.charAt(0).toUpperCase() + vendor.vendorType.slice(1).toLowerCase()}</p>
                                                        <p><strong className="text-blue-500 italic text-xs">Address:</strong> {vendor.address}</p>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        );
                                    })}
                                </MapContainer>
                            </div>
                        </div>

                    </div>
                    <div className='form-fields-container'>

                    </div>
                </div>
            </div >
        </div>
    )



}

export default VendorByMap;
