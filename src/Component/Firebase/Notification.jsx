import { useEffect, useRef } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from './Firebase';
import axios from 'axios';
import { Helmet } from 'react-helmet';


function Notification() {
    const tokenRef = useRef(null);

    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                if (!tokenRef.current) {
                    tokenRef.current = await getToken(messaging, { vapidKey: 'BCSLSM0MqLiL4BjJrDEhYf6z8MlsxHkbGDRZjmtrdsbt352tsRknucbpSYRDQF2jGrd2zvQNnpqsBLcoVY7XyKg' });
                    console.log("Generated token:", tokenRef.current);
                }
                await sendNotification(tokenRef.current);
            } else if (permission === 'denied') {
                alert('Notification permission denied.');
            }
        } catch (error) {
            console.error("Error requesting notification permission:", error);
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const sendNotification = async (token) => {
        const payload = {
            token: "fn5Ezh0tI8hOZVEnlNZ-zL:APA91bGFM1JEOdjVd1DsTI0OwJgBCLzwycJQOVpLtrxXWvbbzyjiZFKWnca8gs1NoNCgdBXd8ScKcGKIX4am2uecoEFRASejCtTPW71MCTiuIyslj8VQ3Vs6IWNBgcW0My8koZIjfsZd",
            // token:token,
            notification: {
                title: 'Page Refreshed',
                body: 'This is a notification after refreshing the page',
            }
        };

        console.log("Sending notification with payload:", payload);

        try {
            const response = await axios.post('http://localhost:3001/api/sendNotification', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Notification sent:", response.data);
        } catch (error) {
            console.error("Error sending notification:", error);
            console.log("Error details:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="App">
            <Helmet>
                <title>Notification - Claimpro</title>
                <meta name="description" content="Notification for BVC Claimpro Assist" />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
            </Helmet>
            <h1>Hello World</h1>
        </div>
    );
}

export default Notification;
