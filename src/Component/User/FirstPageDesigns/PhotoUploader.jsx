import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";

function PhotoUploader({ title, onPhotosChange }) {
    const [photos, setPhotos] = useState(["", "", "", ""]);
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (index, event) => {
        const newPhotos = [...photos];
        newPhotos[index] = event.target.files[0];
        setPhotos(newPhotos);
    };

    const addNewPhotoInput = () => {
        setPhotos([...photos, ""]);
    };

    useEffect(() => {
        onPhotosChange(photos.filter(photo => photo));
    }, [photos, onPhotosChange]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={() => setIsOpen(true)} style={styles.uploadButton}>
                <FaUpload style={styles.uploadIcon} /> {title}
            </button>

            {isOpen && (
                <div style={styles.overlay}>
                    <div style={styles.dialog}>
                        <h2 className="mb-3 ">
                            <div className="row text-start">
                                <div className="col-1">
                                    <FaUpload style={styles.uploadIcon} />
                                </div>
                                <div className="col">
                                    {"UPLOAD " + title.toUpperCase()}
                                </div>
                            </div>
                        </h2>
                        <div style={styles.scrollableContent}>
                            {photos.map((photo, index) => (
                                <div key={index} style={{ marginBottom: "10px" }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(index, e)}
                                    />
                                    {photo && (
                                        <div>
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Uploaded ${index + 1}`}
                                                style={styles.imagePreview}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button onClick={addNewPhotoInput}>Add New</button>
                        <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    uploadButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        // backgroundColor: "#007bff",
        // color: "white",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
    },
    uploadIcon: {
        fontSize: "18px",
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    dialog: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        width: "350px",
        maxHeight: "80vh",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
    },
    scrollableContent: {
        maxHeight: "50vh",
        overflowY: "auto",
        paddingRight: "5px",
        borderBottom: "1px solid #ccc",
        marginBottom: "10px",
    },
    imagePreview: {
        width: "100px",
        height: "50px",
        marginTop: "5px",
        objectFit: "cover",
        borderRadius: "5px",
    },
    closeButton: {
        marginTop: "10px",
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default PhotoUploader;
