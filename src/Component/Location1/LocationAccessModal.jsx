import React, { useEffect, useState } from 'react';
import locationiconforlocation from '../../Assets/locationiconforlocation.png'
import mapimage from '../../Assets/mapimage.jpg'
import backendUrl from '../../environment';

const LocationAccessModal = ({ triggerModel, onSuccess }) => {
    const [isVisible, setIsVisible] = useState(triggerModel);

    useEffect(() => {
        setIsVisible(triggerModel);
    }, [triggerModel]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const modalTitleFontSize = window.innerWidth < 576 ? '1rem' : window.innerWidth < 768 ? '1.2rem' : '1.5rem';
    const modalBodyFontSize = window.innerWidth < 576 ? '0.9rem' : window.innerWidth < 768 ? '1rem' : '1.1rem';
    console.log("Setting up location update");

    const updateLocation = async () => {
        try {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log("Updating location...");
                    console.log("Latitude:", lat, "Longitude:", lon);
                    let type = 'vendor';

                    // Send location to server
                    const response = await fetch(`${backendUrl}/api/update-location/${type}/${userId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ lat, lon })
                    });

                    const result = await response.json();

                    if (response.status === 200 && result.status) {
                        console.log('Location updated successfully');
                        onSuccess(); // Notify success if needed
                    } else {
                        console.error('Location update failed');
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    useEffect(() => {
        // Only start the interval if triggerModel is true
        if (triggerModel) {
            updateLocation(); // Initial update

            const interval = setInterval(() => {
                console.log("Attempting to update location...");
                updateLocation();
            }, 1 * 60 * 1000);

            return () => clearInterval(interval); // Clean up interval on unmount
        }
    }, [triggerModel]);

    return (
        <div>
            {/* Modal */}
            {isVisible && (
                <div className="modal fade show" style={{ display: 'block', minWidth:"300px",maxWidth:"1000px", background: "#ffecec00", boxShadow: "none" }} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{ backgroundImage: `url(${mapimage})`, backgroundSize: 'cover', backgroundPosition: "top" }}>
                            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5 className="modal-title" id="exampleModalLongTitle" style={{ background: "#4a4a4aa1", paddingLeft: "10px", borderRadius: "10px", color: 'rgb(1 253 226)', fontWeight: 'bold', fontSize: modalTitleFontSize, animation: 'blinking 1.5s infinite' }}>
                                    Location Access!!
                                </h5>
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center', color: "black", fontSize: modalBodyFontSize, padding: '20px', fontWeight:"bold"}}>
                                Allow Location Access For Tracking Live Location
                            </div>
                            <div className="modal-footer" style={{ justifyContent: 'center' }}>
                                <button type="button" className="btn btn-primary" onClick={updateLocation} style={{ padding: '10px 10px',  fontSize: modalBodyFontSize }}>
                                    Allow Access
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationAccessModal;
