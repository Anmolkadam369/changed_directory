import React from 'react';
import './SuccessError.css'

const SuccessIcon = () => {
  return (
    <div>
      {/* Success Icon */}
      <div className="swal2-icon swal2-success swal2-animate-success-icon" style={{ display: 'flex' }}>
        <div className="swal2-success-circular-line-left"></div>
        <span className="swal2-success-line-tip"></span>
        <span className="swal2-success-line-long"></span>
        <div className="swal2-success-ring"></div>
        <div className="swal2-success-fix"></div>
        <div className="swal2-success-circular-line-right"></div>
      </div>


    </div>
  );
};

export default SuccessIcon;
