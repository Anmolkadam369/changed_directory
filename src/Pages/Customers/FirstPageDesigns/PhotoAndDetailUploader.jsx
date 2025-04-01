import React, { useEffect, useState } from "react";
import PhotoUploader from "./PhotoUploader";
import axios from "axios";

function PhotoAndDetailUploader({ accidentVehicleCode, vendorType,currentService, onClose }) {
    const [fuelQuantity, setFuelQuantity] = useState("");
    const [toolingInfo, setToolingInfo] = useState("");
    const [readOnlyValue, setReadOnlyValue] = useState(false);

    const [photos1, setPhotos1] = useState([]);
    const [photos2, setPhotos2] = useState([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("accidentVehicleCode123", accidentVehicleCode, vendorType, currentService)
    console.log("fuelQuantity", fuelQuantity, toolingInfo, photos1, photos2)


    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/toolInfomation/${accidentVehicleCode}`
            );
            console.log("getData", response.data.data);

            if (response.data.data.length > 0) {
                console.log('response.data[0].fuelQuantity)', response.data.data[0].fuelQuantity)
                setFuelQuantity(response.data.data[0].fuelQuantity);
                setToolingInfo(response.data.data[0].toolingInfo);
                setPhotos1(response.data.data[0].vehicleImage);
                setPhotos2(response.data.data[0].tyresImage);
                setReadOnlyValue(true)
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        if ((userId.startsWith("CC-") || userId.startsWith("CUD-")) && !readOnlyValue) {
            fetchData();
        }
    }, [userId, readOnlyValue]); // Corrected dependency

    const handleSubmit = async (e) => {
        e.preventDefault();
        const photoAndDetails = {
            photos1,
            photos2,
            fuelQuantity,
            toolingInfo,
        };
        console.log("PhotoAndDetails: ", photoAndDetails);
        const photoAndDetailsObj = new FormData();
        photos1.forEach((file, index) => {
            if (file instanceof File) {
                console.log('index', index)
                photoAndDetailsObj.append(`photos1.${index}`, file);
            }
        });
        console.log('photos2', photos2)
        photos2.forEach((file, index) => {
            if (file instanceof File) photoAndDetailsObj.append(`photos2.${index}`, file)
        });
        // Append other fields
        photoAndDetailsObj.append("fuelQuantity", fuelQuantity);
        photoAndDetailsObj.append("toolingInfo", toolingInfo);
        console.log('photoAndDetailsObj123', photoAndDetailsObj)
        for (let pair of photoAndDetailsObj.entries()) {
            console.log(`${pair[0]}`, pair[1])
        }
        let response;
        try {
            response = await axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/vendor-on-accidentvehicle-tools/${userId}/${accidentVehicleCode}/${vendorType}`,
                data: photoAndDetailsObj,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error during form submission:", error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
        }


    };

    const confirmationOnTools = async (action) => {
        try {
            let response = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/customerConfirmationOnTools/${userId}/${accidentVehicleCode}/${action}/${userId}/${currentService}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.data.status) {
                console.log("updated successfully")
            }
        }
        catch (error) {
            console.log("the error occured", error.message)
        }
    }



    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center" style={{ maxWidth: '450px', minWidth: '320px' }}>
                <div className="row">
                    <div className="col">
                        <PhotoUploader title={"Vehicle Images"} onPhotosChange={setPhotos1} existingPhotos={photos1} userId={userId} />
                    </div>
                    <div className="col">
                        <PhotoUploader title={"Tyres Images"} onPhotosChange={setPhotos2} existingPhotos={photos2} userId={userId} />
                    </div>
                </div>

                <div className="flex gap-4 mt-2 ">
                    <input
                        type="number"
                        placeholder="Fuel Quantity"
                        value={fuelQuantity}
                        onChange={(e) => setFuelQuantity(e.target.value)}
                        readOnly={readOnlyValue}
                        style={{
                            width: "50%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                    <p className="text-semibold text-l mt-3">/ in Liters.</p>
                </div>

                <div className="row my-3">
                    <textarea
                        placeholder="Tools Summary"
                        value={toolingInfo}
                        onChange={(e) => setToolingInfo(e.target.value)}
                        readOnly={readOnlyValue}
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
                    {(userId.startsWith('VC-') || userId.startsWith('VED-')) && (
                        <div className="w-full gap-2 flex justify-between">
                            <button className="btn btn-primary" style={{ width: "100px" }} onClick={handleSubmit}>
                                Submit
                            </button>
                            <button className="btn btn-danger" style={{ width: "100px" }} onClick={onClose}>
                                Close
                            </button>
                        </div>
                    )}
                    {(userId.startsWith('CC-') || userId.startsWith('CUD')) && (
                        <div className="w-full">
                            <div className="w-full gap-2 flex justify-between">
                                <button className="btn btn-primary w-1/2"  onClick={()=>confirmationOnTools(true)}>
                                    Accept
                                </button>
                                <button className="btn btn-danger w-1/2"  onClick={()=>confirmationOnTools(false)}>
                                    Decline
                                </button>
                            </div>
                            <button className="btn btn-danger mt-3 w-1/2"  onClick={onClose}>
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PhotoAndDetailUploader;
