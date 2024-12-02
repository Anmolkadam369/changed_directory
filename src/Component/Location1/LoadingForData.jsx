import React from 'react';
import './Modal.css';

const LoadingForData = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{height:"300px"}}>
                hey
                {/* <button className="modal-close" style={{color:'red'}} onClick={onClose}>
                    &times;
                </button>
                {children} */}
            </div>
        </div>
    );
};

export default LoadingForData;
