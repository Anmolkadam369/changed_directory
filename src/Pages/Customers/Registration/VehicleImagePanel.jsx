import React, { useState } from "react";
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const VehicleImagePanel = (props) => {
    const [photos, setPhotos] = useState([]);
    const [showEnlargedPhoto, setShowEnlargedPhoto] = useState(null);
    const [formData, setFormData] = useState(new FormData()); // To store image files
    console.log('formdata', photos)

    const handleAddImage = async (event) => {
        const file = event.target.files[0]; // Get the selected file from the input
        if (file && photos.length < 4) {
            // Create a new FormData instance if needed
            const newFormData = new FormData();
            const photoIndex = photos.length + 1; // For img1, img2, etc.

            // Append the file to FormData
            newFormData.append(`img${photoIndex}`, file);

            // Update state with FormData and photo file
            setFormData(newFormData);

            // Add the file itself to the photos array
            setPhotos((prevPhotos) => [...prevPhotos, file]);
        }
    };



    const handleRemoveImage = (index) => {
        // Remove the image from the photos array
        const updatedPhotos = photos.filter((_, i) => i !== index);
        setPhotos(updatedPhotos);

        // Remove the corresponding image from FormData (if needed)
        const updatedFormData = new FormData();
        updatedPhotos.forEach((photo, i) => updatedFormData.append(`img${i + 1}`, photo));
        setFormData(updatedFormData);
    };


    const enlargePhoto = (photo) => {
        setShowEnlargedPhoto(photo);
    };

    const closeEnlargedPhoto = () => {
        setShowEnlargedPhoto(null);
    };

    return (
        <div style={{ marginBottom: '50px' }}>
            <div className='sticky text-center top-0 mb-1'>
                <IconButton
                    onClick={() => {
                        props.setVehiclePanel(true)
                        props.setVehicleImagesPanel(false)
                    }}
                    className="absolute mb-1 pb-1"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <p className="text-sm font-semibold m-2">Add Vehicle Images</p>
            <div style={{ overflowY: 'auto' }} className=" flex flex-col items-center justify-center">
                {/* Left side for images */}
                <div className=" flex flex-wrap gap-2 top-[5.25rem] left-0 m-[2.5rem]">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(photo)} // Create an object URL from the File object
                                alt={`Photo ${index + 1}`}
                                className="w-[100%] h-24 object-cover rounded-lg shadow-md"
                                onClick={() => enlargePhoto(URL.createObjectURL(photo))}
                            />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-[-10px] bg-red-500 text-white p-1 rounded-full"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>


                {/* Center or Top-right + Button */}
                <>
                    {photos.length < 4 && (
                        <>
                            <button
                                type="button"
                                style={{ background: 'rgb(140 140 140)' }}
                                className="relative center-button text-white p-2 rounded-full shadow-lg hover:bg-black focus:outline-none "
                                onClick={() => document.getElementById("hiddenFileInput").click()} // Programmatically trigger the file input
                            >
                                <AddIcon />
                            </button>

                            <input
                                type="file"
                                accept="image/*"
                                capture="camera"
                                id="hiddenFileInput"
                                className="hidden opacity-0"
                                onChange={handleAddImage} // Add the image on selection
                            />
                        </>
                    )}
                </>

                {photos.length === 0 && (
                    <button onClick={() => {
                        props.setVehicleImagesPanel(false);
                        props.setConfirmVehicle(true);
                    }} className="absolute bottom-4 right-4 left-2 mt-3 bg-green-900 text-white font-semibold p-3 rounded-lg">Skip</button>
                )}
                {photos.length > 0 && (
                    <button onClick={() => {
                        props.setImages(photos)
                        props.setVehicleImagesPanel(false);
                        props.setConfirmVehicle(true);
                    }} className=" bottom-4 right-4 left-2 w-[90%] mt-3 bg-green-900 text-white font-semibold p-3 rounded-lg">Images Added</button>
                )}

                {showEnlargedPhoto && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                        <div className="relative h-[300px]">
                            <img
                                src={showEnlargedPhoto}
                                alt="Enlarged"
                                className="max-w-full max-h-screen rounded-lg"
                            />
                            <button
                                onClick={closeEnlargedPhoto}
                                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleImagePanel;
