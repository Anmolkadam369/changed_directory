import { createContext, useContext, useEffect } from "react";
import { useWebSocket } from "./WebSocketContext";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const { sendMessage } = useWebSocket();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId || !sendMessage) {
            console.warn("🚨 Location: No userId or WebSocket connection. Skipping updates.");
            return;
        }

        sendMessage({ type: "join", userId, userType: "crane" });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const locationData = {
                        type: "update-location-vendor",
                        userId: userId,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    };
                    sendMessage(locationData);
                });
            }
        };

        updateLocation();
        const interval = setInterval(updateLocation, 5000);

        return () => clearInterval(interval);
    }, [sendMessage, userId]);

    return <LocationContext.Provider value={{}}>{children}</LocationContext.Provider>;
};
