import { createContext, useContext, useEffect, useRef, useState } from "react";

const webSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => { 
    const [messages, setMessages] = useState([]);
    const isSocketOpenRef = useRef(false); // Ref to track the connection state
    const socketRef = useRef(null); // Ref to store the WebSocket instance
    const reconnectTimeoutRef = useRef(null);

    const connectWebSocket = () => {
        console.log("process.env.REACT_APP_WEBSOCKET",process.env.REACT_APP_WEBSOCKET)
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);

        socketRef.current = ws; 

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            isSocketOpenRef.current = true;
            const userId = localStorage.getItem("userId");
            if (userId) {
                ws.send(JSON.stringify({ userId }));
            }
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received WebSocket data:', data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed. Reconnecting...");
            isSocketOpenRef.current = false;

            // Attempt to reconnect after 5 seconds
            reconnectTimeoutRef.current = setTimeout(() => {
                connectWebSocket();
            }, 5000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            ws.close(); // Ensure it closes before reconnecting
        };
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (socketRef.current) socketRef.current.close();
            clearTimeout(reconnectTimeoutRef.current);
        };
    }, []);

    const sendMessage = (message) => {
        console.log("isReadysoc2", isSocketOpenRef.current);
        console.log("socketRef.current:", socketRef.current?.readyState, WebSocket.OPEN);

        // Use the WebSocket instance from the ref
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log("Sending message:", JSON.stringify(message));
            socketRef.current.send(JSON.stringify(message)); // Send the message
        } else {
            console.log("WebSocket is not open yet, unable to send message.");
        }
    };

    return (
        <webSocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </webSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(webSocketContext);
};
