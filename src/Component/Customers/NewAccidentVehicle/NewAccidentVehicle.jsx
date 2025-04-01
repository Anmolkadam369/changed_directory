import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

const DEFAULT_POSITION = [28.7041, 77.1025]; // Default coordinates (Delhi)

const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Search Control Component for GeoSearch
function SearchControl({ onLocationChange, inputRef }) {
    const map = useMapEvents({});
    const searchControlRef = useRef(null);

    useEffect(() => {
        if (!searchControlRef.current) {
            const provider = new OpenStreetMapProvider();
            const searchControl = new GeoSearchControl({
                provider,
                style: 'bar',
                showMarker: false, // Disable default markers
                retainZoomLevel: true,
                animateZoom: true,
                autoClose: true,
                keepResult: true,
                searchLabel: 'Search for a place...',
                position: 'topright',
            });

            // Add event listener for search results
            map.on('geosearch/showlocation', (result) => {
                const { lat, lng } = result.location;
                const address = result.query;
                onLocationChange({ lat, lng, address });

                // Update input field with the selected address
                if (inputRef.current) {
                    inputRef.current.value = address;
                }
            });

            map.addControl(searchControl);
            searchControlRef.current = searchControl;
        }

        return () => {
            if (searchControlRef.current) {
                map.removeControl(searchControlRef.current);
                searchControlRef.current = null;
            }
        };
    }, [map, onLocationChange, inputRef]);

    return null;
}

// Location Marker Component
function LocationMarker({ position }) {
    return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function LocationSelector() {
    const [pickupLocation, setPickupLocation] = useState({ lat: null, lng: null, address: '' });
    const [dropLocation, setDropLocation] = useState({ lat: null, lng: null, address: '' });

    const [center, setCenter] = useState(DEFAULT_POSITION);

    const pickupInputRef = useRef(null);
    const dropInputRef = useRef(null);

    const handlePickupChange = (location) => {
        setPickupLocation(location);
        setCenter([location.lat, location.lng]);
    };

    const handleDropChange = (location) => {
        setDropLocation(location);
        setCenter([location.lat, location.lng]);
    };

    return (
        <div style={{ background: 'black', borderRadius: '20px', paddingTop: '10px', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white' }}>Pickup Location</label>
                <input
                    type="text"
                    ref={pickupInputRef}
                    className="Registrationdetails-elem-9"
                    style={{ textAlign: 'center', width: '90%' }}
                    defaultValue={pickupLocation.address}
                    placeholder="Search Pickup Address"
                    readOnly
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'white' }}>Drop Location</label>
                <input
                    type="text"
                    ref={dropInputRef}
                    className="Registrationdetails-elem-9"
                    style={{ textAlign: 'center', width: '90%' }}
                    defaultValue={dropLocation.address}
                    placeholder="Search Drop Address"
                    readOnly
                />
            </div>
            <div style={{ height: '600px' }}>
                <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <SearchControl onLocationChange={handlePickupChange} inputRef={pickupInputRef} />
                    <SearchControl onLocationChange={handleDropChange} inputRef={dropInputRef} />
                    <LocationMarker position={pickupLocation.lat && [pickupLocation.lat, pickupLocation.lng]} />
                    <LocationMarker position={dropLocation.lat && [dropLocation.lat, dropLocation.lng]} />
                </MapContainer>
            </div>
        </div>
    );
}
