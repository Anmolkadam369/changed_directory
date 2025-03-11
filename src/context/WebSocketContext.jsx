import { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId && storedUserId !== userId) {
                setUserId(storedUserId);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [userId]);

    const connectWebSocket = () => {
        if (!userId) {
            console.warn("🚨 WebSocket: Waiting for userId...");
            return;
        }

        console.log("🔗 Connecting to WebSocket:", process.env.REACT_APP_WEBSOCKET);
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);

        socketRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "join", userId }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = () => {
            console.log("❌ WebSocket Closed. Reconnecting...");
            reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
        };

        ws.onerror = (error) => {
            console.error("⚠️ WebSocket Error:", error);
            ws.close();
        };
    };

    useEffect(() => {
        if (userId) {
            connectWebSocket();
        }

        return () => {
            if (socketRef.current) socketRef.current.close();
            clearTimeout(reconnectTimeoutRef.current);
        };
    }, [userId]);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log("🚀 Sending WebSocket Message:", message);
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.log("⚠️ WebSocket Not Open. Message Not Sent.");
        }
    };

    return (
        <WebSocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
