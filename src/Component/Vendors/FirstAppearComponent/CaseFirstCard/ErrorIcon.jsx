import React from 'react';
import './SuccessError.css'

const ErrorIcon = () => {
  return (
    <div>
      {/* Error Icon */}
      <div className="swal2-icon swal2-error swal2-animate-error-icon" style={{ display: 'flex' }}>
        <span className="swal2-x-mark">
          <span className="swal2-x-mark-line-left"></span>
          <span className="swal2-x-mark-line-right"></span>
        </span>
      </div>
    </div>
  )
}

export default ErrorIcon;