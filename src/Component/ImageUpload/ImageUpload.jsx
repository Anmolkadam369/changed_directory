import React, { useState } from 'react';
import axios from 'axios';
import "./ImageUpload.css"
import {useNavigate} from 'react-router-dom';

function ImageUpload() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addedFiles, setAddedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        console.log("files",files[0])
        console.log("FILES",files[0].name)
        
        if (files.length + photos.length > 12) {
            alert('You can only upload up to 12 photos.');
            return;
        }
        
        addedFiles.push(files[0].name)
        console.log("ADDEDFILES",addedFiles)
        
        const newPhotos = Array.from(files).map(file => 
            URL.createObjectURL(file)
        );

        setPhotos(prev => [...prev, ...newPhotos]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('date', new Date().toISOString().split('T')[0]);
        formData.append('person', 'Username'); // Make sure to use actual data or authentication tokens
        
        if (addedFiles.length < 4) {
            alert('You should atleast upload 4 photos.');
            return;
        }

        addedFiles.forEach((addedFile) => {
            formData.append('photos', addedFile); // Use 'photos' for all files, matching the server expectation
        });
    
        try {
            const response = await axios.post('http://localhost:3001/api/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);
            alert('Photos uploaded! Our Backend team will shortly contact You !!!');
            formData.append('date',"")
            formData.append('person',"")
            formData.append('photos',"")
            setAddedFiles([]);
            navigate('../')


        } catch (error) {
            console.error('Error uploading photos:', error);
            alert('Failed to upload photos.');
        }
    };

    const handleRemovePhoto = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
        URL.revokeObjectURL(photos[index]); // Clean up memory when removing a photo
    };
    

    return (
        <div className="photo-upload-container">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            <div className="photo-grid">
                {photos.map((photo, index) => (
                    <div key={index} className="photo-wrapper">
                        <img src={photo} alt={`Upload preview ${index + 1}`} />
                        <button onClick={() => handleRemovePhoto(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} disabled={isSubmitting} className='view-button' >
                Submit Photos
            </button>
        </div>
    );
}

export default ImageUpload;
