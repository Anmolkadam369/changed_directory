import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ show, onClose, onSatisfactionChange, satisfaction }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Satisfaction Survey</h2>
        <p>How satisfied are you?</p>
        <input
          type="range"
          min="0"
          max="100"
          value={satisfaction}
          onChange={onSatisfactionChange}
          className="slider"
        />
        <div>Satisfaction Level: {satisfaction}</div>
        <button onClick={onClose} className="modal-close-button">Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

const FeedBackModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [satisfaction, setSatisfaction] = useState(50);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSatisfactionChange = (event) => {
    setSatisfaction(event.target.value);
  };

  return (
    <div className="App">
      <button onClick={handleOpenModal} className="open-modal-button">Give Feedback</button>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onSatisfactionChange={handleSatisfactionChange}
        satisfaction={satisfaction}
      />
    </div>
  );
};

export default FeedBackModal;
