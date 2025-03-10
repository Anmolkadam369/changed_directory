import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, customStyle }) => {
    if (!isOpen) return null;
console.log('customstyle', customStyle)
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={customStyle ? { ...customStyle } : { height: "280px" }}>
                <button className="modal-close" style={{color:'red'}} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
