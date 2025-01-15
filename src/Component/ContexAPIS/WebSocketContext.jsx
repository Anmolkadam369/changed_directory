import { createContext, useContext, useEffect, useRef, useState } from "react";

const webSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const isSocketOpenRef = useRef(false); // Ref to track the connection state
    const socketRef = useRef(null); // Ref to store the WebSocket instance

    useEffect(() => {
        const ws = new WebSocket("wss://claimpro.in/ws/");
        socketRef.current = ws; // Store the WebSocket instance in the ref

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            isSocketOpenRef.current = true; // Set the connection state to true
            const userId = localStorage.getItem("userId");
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
            console.log("WebSocket  Connected closed");
            isSocketOpenRef.current = false; // Set the connection state to false
        };

        return () => {
            if (socketRef.current) socketRef.current.close();
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
