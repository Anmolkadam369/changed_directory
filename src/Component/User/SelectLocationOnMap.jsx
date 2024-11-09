import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet/hooks';
import { useNavigate , useLocation} from 'react-router-dom'; // To navigate back to the previous page
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
import './FirstPage.css'
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

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar', // You can set 'bar' or 'button' style or customize it further.
            showMarker: true, // Set to true to show a marker when a location is selected from the search box
            retainZoomLevel: true, // Retain zoom level after selecting a location
            animateZoom: true, // Whether to animate zoom on result selection
            autoClose: true, // Automatically close the search box when a result is selected
            keepResult: true, // Keep the result highlighted in the search box after selection
            searchLabel: 'Search for a place', // Placeholder text in the search box
            position: 'topright', // Position of the search box (can be topleft, topright, bottomleft, bottomright)
        });

        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, [map]);

    return null;
}

export default function SelectLocationMap({ onLocationChange }) {
    const { state } = useLocation();
    let [center, setCenter] = useState(state?.center || DEFAULT_POSITION);
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

    const handleLocationSelect = (location) => {
        console.log('Selected Location:', location);
        // Call the onLocationChange function passed as a prop from the parent component
        if (onLocationChange) {
            onLocationChange(location);
        }
    };

    const handleSelectButtonClick = () => {
        // Navigate back to the previous page
        // center = {center}
        navigate('/VehicleDetails', {state :{ center }}); // Use navigate(-1) to go back

    };

    return (
        <div style={{ height: '800px' }}>
            <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100%' }}>
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
