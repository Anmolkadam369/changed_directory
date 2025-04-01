import { useState, useEffect } from "react";

const PermissionCheck = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [notificationGranted, setNotificationGranted] = useState(Notification.permission === "granted");
  const [locationGranted, setLocationGranted] = useState(false);
  const [message, setMessage] = useState("Checking permissions...");

  useEffect(() => {
    const checkPermissions = () => {
      setNotificationGranted(Notification.permission === "granted");

      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setLocationGranted(result.state === "granted");
          updatePopupState(Notification.permission === "granted", result.state === "granted");

          result.onchange = () => {
            setLocationGranted(result.state === "granted");
            updatePopupState(Notification.permission === "granted", result.state === "granted");
          };
        })
        .catch(() => updatePopupState(Notification.permission === "granted", false)); // Assume denied if check fails
    };

    const updatePopupState = (notifGranted, locGranted) => {
      if (notifGranted && locGranted) {
        setShowPopup(false); // Close popup when both permissions are granted
      } else {
        setShowPopup(true);
        if (!notifGranted && !locGranted) {
          setMessage("Please enable Notifications & Location for a better experience.");
        } else if (!notifGranted) {
          setMessage("Please enable Notifications to receive important updates.");
        } else if (!locGranted) {
          setMessage("Please enable Location to access location-based features.");
        }
      }
    };

    const interval = setInterval(checkPermissions, 1000); // Check every second
    checkPermissions(); // Initial check

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const requestPermissions = () => {
    // Request Notification Permission
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") setNotificationGranted(true);
      });
    }

    // Request Location Permission
    navigator.geolocation.getCurrentPosition(
      () => setLocationGranted(true),
      () => setLocationGranted(false)
    );
  };

  return (
    <>
      {showPopup && (
        <div style={popupStyles}>
          <p style={textStyle}>{message}</p>
          <button style={buttonStyle} onClick={requestPermissions}>
            OK
          </button>
        </div>
      )}
    </>
  );
};

// 🔹 Popup Styles
const popupStyles = {
  top: "20px",
  right: "20px",
  background: "#333",
  color: "#fff",
  padding: "15px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  zIndex: 1000,
};

const textStyle = {
  margin: 0,
  fontSize: "14px",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "5px 10px",
  border: "none",
  background: "#ff9800",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "5px",
};

export default PermissionCheck;
