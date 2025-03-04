import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// '../../environment';
import axios from 'axios';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};


const SurveyorByMap = ({ onUpdate }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [surveyorLocationData, setSurveyorLocationData] = useState([]);
    const [foundSurveyors, setFoundSurveyors] = useState([]);
    const [surveyorsName, setSurveyorName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    console.log("STATES_Info", state)
    console.log("CITYS_Info", city)

    const [surveyorId, setSurveyorId] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

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

    const [selectedSurveyorType, setSelectedSurveyorType] = useState("");
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
        setSelectedSurveyorType(value);
        setSurveyorName('');
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    useEffect(() => {
        if (map) {
            map.setView([28.7041, 77.1025], 13);
        }
        surveyorsData(selectedSurveyorType || "all");
    }, [selectedSurveyorType]);

    useEffect(() => {
        findNearestSurveyors();
    }, [surveyorLocationData, surveyorsName, surveyorId, state, city]);

    const surveyorsData = async (surveyorType) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getSurveyorMap/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
            console.log("response1234567890", response.data);
            setSurveyorLocationData(response.data.data);
        } catch (error) {
            console.error("Error fetching surveyor data:", error);
        }
    }

    const findNearestSurveyors = () => {
        console.log("Filtering surveyors for:", surveyorsName, selectedSurveyorType, surveyorId);
        console.log("surveyorLocationData12345", surveyorLocationData)

        let found = surveyorLocationData.filter((surveyor) =>
            surveyor.latitude != null && surveyor.longitude != null
        );

        if (surveyorsName) {
            found = found.filter((surveyor) =>
                surveyor.fullName.toLowerCase().includes(surveyorsName.toLowerCase())
            );
        }
        console.log("foundHere", found)

        if (surveyorId) {
            found = found.filter((surveyor) =>
                String(surveyor.id).includes(surveyorId)
            );
        }

        if (selectedSurveyorType) {
            found = found.filter((surveyor) =>
                surveyor.surveyorType.includes(selectedSurveyorType)
            );
        }

        // if (state) {
        //     found = found.filter((surveyor) =>
        //         surveyor.state.includes(state)
        //     );
        // }

        if (city) {
            found = found.filter((surveyor) =>
                surveyor.location.includes(city)
            );
        }

        console.log("Found surveyors:", found);
        setFoundSurveyors(found);
    };


    const handleChanges = (e) => {
        if (e.target.name == "surveyorName") {
            const tempName = e.target.value;
            setSurveyorName(tempName);
        }
        if (e.target.name == "surveyorId") {
            const tempId = e.target.value;
            setSurveyorId(tempId);
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
                        Surveyors by their Locations (Latitude & Longitude On Map)
                    </h1>
                </div>
            </div>

            <div >


                <div>
                    <div className='form-row'>

                        <label className="form-field" style={{ marginLeft: "5px", marginBottom: "0px" }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Surveyor Id:</p>
                            <input
                                type="text"
                                name="surveyorId"
                                className='inputField1'
                                value={surveyorId}
                                onChange={handleChanges}
                            />
                        </label>
                        <label className="form-field" style={{ marginLeft: "5px", marginBottom: "0px" }}>
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Surveyor Name:</p>
                            <input
                                type="text"
                                name="surveyorName"
                                className='inputField1'
                                value={surveyorsName}
                                onChange={handleChanges}
                            />
                        </label>


                        <div style={{ display: "flex", gap: '2px' }}>
                            <label className="form-field input-group mb-1" style={{ borderRadius: "30px" }}>
                                <p style={{ fontSize: "13px", fontWeight: "bold" }}>Select State:</p>
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
                                <p style={{ fontSize: "13px", fontWeight: "bold" }}>Select City:</p>
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

                    <div className="map-container" style={{ border: '4px solid lightgreen', height: '400px', width: '100%', borderRadius: '10px', margin: '10px' }}>
                        <MapContainer center={[28.7041, 77.1025]} zoom={4} whenCreated={setMap} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                            />
                            {foundSurveyors.map((surveyor, index) => {

                                const lat = parseFloat(surveyor.latitude);
                                const lng = parseFloat(surveyor.longitude);

                                // Check if latitude and longitude are valid numbers
                                if (!isNaN(lat) && !isNaN(lng)) {
                                    console.log("Surveyor coordinates:", surveyor.fullName, lat, lng);

                                    // Slightly larger offset to avoid marker overlap for surveyors at the same location
                                    const offsetLat = (Math.random() * 0.0014) - 0.0002; // adjust the offset range
                                    const offsetLng = (Math.random() * 0.0014) - 0.0002; // adjust the offset range
                                    const position = [lat + offsetLat, lng + offsetLng];

                                    console.log("position", position);

                                    return (
                                        <Marker key={index} position={position} icon={markerIcon}>
                                            <Popup>
                                                id: {surveyor.id}<br />Name: {surveyor.fullName}<br /> ROCode: {surveyor.ROCode}<br />Location: {surveyor.location}<br />
                                            </Popup>
                                        </Marker>
                                    );
                                } else {
                                    console.log("Invalid coordinates for surveyor:", surveyor.fullName);
                                }
                            })}



                        </MapContainer>
                    </div>

                </div>
                <div className='form-fields-container'>

                </div>
            </div>
        </div>
    )



}

export default SurveyorByMap;
