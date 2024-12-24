import { createContext, useContext, useEffect, useState } from "react";

const webSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001");

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
            if (userId) {
                ws.send(JSON.stringify({ userId }));
                console.log(`User ID ${userId} sent to server`);
            }
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received WebSocket data:', data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };        

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setSocket(ws);

        return () => {
            if (ws) ws.close();
        };
    }, []); 

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
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
