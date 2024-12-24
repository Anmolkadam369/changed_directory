import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet/hooks';
import { useNavigate, useLocation } from 'react-router-dom'; // To navigate back to the previous page
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
import './FirstPage.css'
import axios from 'axios';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


// Default location coordinates (Delhi)
const DEFAULT_POSITION = [28.7041, 77.1025];

const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41], // Adjust size as needed
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function LocationMarker({ onLocationSelect }) {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng); // Call onLocationSelect with the position
        },
    });

    return position ? <Marker position={position} icon={markerIcon} /> : null;
}

function SearchControl() {
    const map = useMap();
    const searchControlRef = useRef(null); // Use a ref to track the search control instance

    useEffect(() => {
        if (!searchControlRef.current) {
            const provider = new OpenStreetMapProvider();

            const searchControl = new GeoSearchControl({
                provider,
                style: 'bar', // Bar style for the search box
                showMarker: true, // Show marker at the searched location
                retainZoomLevel: true, // Keep the same zoom level
                animateZoom: true, // Smooth zoom animation
                autoClose: true, // Close the results after selecting a location
                keepResult: true, // Keep the search result visible
                searchLabel: 'Search for a place...', // Placeholder for the search bar
                position: 'topright', // Position the search bar in the top-right corner
                maxSuggestions: 5, // Maximum number of suggestions to display
                autoComplete: true, // Enable autocomplete for the search input
                autoCompleteDelay: 100, // Delay (ms) for autocomplete suggestions
                marker: {
                    // Customize marker appearance
                    icon: markerIcon, // Custom icon
                    draggable: true, // Allow the marker to be draggable
                },
            });


            searchControlRef.current = searchControl;
            map.addControl(searchControl);
        }

        return () => {
            if (searchControlRef.current) {
                map.removeControl(searchControlRef.current);
                searchControlRef.current = null;
            }
        };
    }, [map]);

    return null;
}


export default function SelectLocationMap({ onLocationChange }) {
    const { state } = useLocation();
    let [center, setCenter] = useState(state?.center || DEFAULT_POSITION);
    let [placeName, setPlaceName] = useState("")
    let [fromPage, setFromPage] = useState(state?.fromPage);
    console.log("fromPage", fromPage)

    console.log("CENTER", center)
    const navigate = useNavigate(); // Get the navigate function from React Router

    // Request geolocation when component is mounted
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // If geolocation is successful, update the center with the user's location
                    const { latitude, longitude } = position.coords;
                    setCenter([latitude, longitude]);
                },
                (error) => {
                    // If the user denies geolocation or there's an error, use default position (Delhi)
                    setCenter(DEFAULT_POSITION);
                    console.error("Geolocation error: ", error.message);
                }
            );
        } else {
            // Fallback if geolocation is not available
            console.warn("Geolocation is not supported by this browser.");
            setCenter(DEFAULT_POSITION);
        }
    }, []); // Empty dependency array means this runs once when the component mounts


    const handleLocationSelect = async (location) => {
        console.log('Selected Location:', location);
        setCenter([location.lat, location.lng]);

        // Call reverse geocoding API
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                params: {
                    lat: location.lat,
                    lon: location.lng,
                    format: 'json',
                },
            });

            const placeDetail = response.data.display_name; // Get the human-readable address
            console.log('Place Name:', placeDetail);
            setPlaceName(placeDetail)

            // Call the onLocationChange function passed as a prop from the parent component
            if (onLocationChange) {
                onLocationChange({ center: location, placeName });
            }

            // You can also store the placeName in state if needed
        } catch (error) {
            console.error('Error during reverse geocoding:', error);
        }
    };

    const handleSelectButtonClick = () => {
        // Navigate back to the previous page
        // center = {center}
        console.log('handleSelectButtonClick:', center);

        console.log("navigating to admin", fromPage)

        if (fromPage == "Admin") {
            console.log("navigating to admin1", fromPage)

            setTimeout(() => {
                navigate('/Admin', { state: { center } }); // Use navigate(-1) to go back
            }, 2000);
        }

        if (fromPage == "allVehicles" && placeName != "") {
            setTimeout(() => {
                navigate("/register-new-accidentvehicle", { state: { center, placeName } })
            })
        }

        if (fromPage == "firstPage") {

            setTimeout(() => {
                navigate('/user-landing-page', { state: { center } }); // Use navigate(-1) to go back
            }, 2000);
        }
        else if (fromPage == "Crane-dashboard") {
            navigate("/Crane-dashboard", { state: { indexFor: 2, center: center } });
        }
        else {
            navigate('/VehicleDetails', { state: { center } }); // Use navigate(-1) to go back
        }

    };

    return (
        <div style={{ height: '800px' }}>
            <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100vh' }}>
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
                />
                <SearchControl />
                <LocationMarker onLocationSelect={handleLocationSelect} />
            </MapContainer>

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
                    minWidth: "300px",
                    zIndex: 1000, // Make sure it's above the map
                }}
                onClick={handleSelectButtonClick}
            >
                <KeyboardDoubleArrowRightIcon style={{
                    position: "absolute",
                    right: '10px'
                }} />
                Confirm Location
            </button>


        </div>
    );
}
