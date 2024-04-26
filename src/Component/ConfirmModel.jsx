import React from 'react';

function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            zIndex: 1050, // Ensure it is on top of other content
            animation: 'fadeIn 0.3s' // Smooth fade-in effect
        }}>
            <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '10px', // More pronounced rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow for 3D effect
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '400px', // Ensures modal isn't too wide on large screens
                width: '90%', // Responsive width
                textAlign: 'center', // Center the text
                border: '1px solid #ccc' // Subtle border for depth
            }}>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Do you want to sign out?</p>
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <button onClick={onConfirm} style={{
                        padding: '10px 20px',
                        fontSize: '16px', // Larger font for better readability
                        color: 'white',
                        backgroundColor: '#007bff', // Primary blue
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Subtle shadow on button for 3D effect
                    }}>OK</button>
                    <button onClick={onCancel} style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: 'white',
                        backgroundColor: '#6c757d', // Bootstrap secondary color
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Consistent styling with the OK button
                    }}>Cancel</button>
                </div>
            </div>
        </div>
        
    );
}

export default ConfirmationModal;
