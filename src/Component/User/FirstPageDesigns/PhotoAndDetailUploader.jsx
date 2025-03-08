import React, { useState } from "react";
import PhotoUploader from "./PhotoUploader";

function PhotoAndDetailUploader({ onClose }) {
    const [fuelQuantity, setFuelQuantity] = useState("");
    const [toolingInfo, setToolingInfo] = useState("");
    const [photos1, setPhotos1] = useState([]);
    const [photos2, setPhotos2] = useState([]);

    const handleSubmit = () => {
        const photoAndDetails = {
            photos1,
            photos2,
            fuelQuantity,
            toolingInfo,
        };

        console.log("PhotoAndDetails: ", photoAndDetails);
    };

    return (
        <div className="row d-flex justify-content-center align-items-center" style={{ width: "450px" }}>
            <div className="row">
                <div className="col">
                    <PhotoUploader title={"Vehicle Images"} onPhotosChange={setPhotos1} />
                </div>
                <div className="col">
                    <PhotoUploader title={"Tyres Images"} onPhotosChange={setPhotos2} />
                </div>
            </div>

            <div className="row mt-2">
                <input
                    type="text"
                    placeholder="Fuel Quantity"
                    value={fuelQuantity}
                    onChange={(e) => setFuelQuantity(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
            </div>

            <div className="row my-3">
                <textarea
                    placeholder="Tools Summary"
                    value={toolingInfo}
                    onChange={(e) => setToolingInfo(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "140px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        resize: "none",
                    }}
                />
            </div>

            <div className="row mb-3 d-flex justify-content-between">
                <button className="btn btn-primary" style={{ width: "100px" }} onClick={handleSubmit}>
                    Submit
                </button>
                <button className="btn btn-danger" style={{ width: "100px" }} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default PhotoAndDetailUploader;
