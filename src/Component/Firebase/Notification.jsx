import React, { useEffect, useRef, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './Firebase';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import backendUrl from '../../environment';

// function NotificationComponent() {
//     const tokenRef = useRef(null);

//     useEffect(() => {
//         const initializeNotifications = async () => {
//             console.log("Initializing notifications...");
//             // await registerServiceWorker();
//             console.log("Initializing requestPermission...");
//             await requestPermission();
//         };

//         initializeNotifications();

//         onMessage(messaging, (payload) => {
//             console.log('Message received. ', payload);
//             // Customize how you want to handle the message here
//         });
//     }, []);

//     const requestPermission = async () => {
//         try {
//             console.log("Requesting notification permission...");
//             const permission = await window.Notification.requestPermission();
//             console.log("Notification permission:", permission);
//             if (permission === 'granted') {
//                 if (!tokenRef.current) {
//                     tokenRef.current = await getToken(messaging, { vapidKey: 'BCSLSM0MqLiL4BjJrDEhYf6z8MlsxHkbGDRZjmtrdsbt352tsRknucbpSYRDQF2jGrd2zvQNnpqsBLcoVY7XyKg' });
//                     console.log("Generated token:", tokenRef.current);
//                     // Send token to backend for verification or saving
//                 }
//                 await sendNotification(tokenRef.current);
//             } else {
//                 alert('Notification permission denied.');
//             }
//         } catch (error) {
//             console.error("Error requesting notification permission:", error);
//         }
//     };

//     // const registerServiceWorker = async () => {
//     //     try {   
//     //         if ('serviceWorker' in navigator) {
//     //             console.log("Registering service worker...");
//     //             const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//     //             console.log('Service Worker registered with scope:', registration.scope);
//     //         } else {
//     //             console.error('Service Worker not supported in this browser.');
//     //         }
//     //     } catch (error) {
//     //         console.error('Service Worker registration failed:', error);
//     //     }
//     // };



//     const sendNotification = async (token) => {
//         const currentTime = new Date().toLocaleTimeString();

//         const payload = {
//             token,
//             notification: {
//                 title: 'Page Refreshed',
//                 body: `Notification on the time of ${currentTime} from app`,
//             },
//             data: {
//                 messageId: `${new Date().getTime()}`, // Generate a unique message ID
//             },
//         };

//         console.log('Sending notification with payload:', payload);

//         try {
//             const response = await axios.post(`${backendUrl}/api/sendNotification`, payload, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log('Notification sent:', response.data);
//         } catch (error) {
//             console.error('Error sending notification:', error);
//             console.log('Error details:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div className="App">
//             <Helmet>
//                 <title>Notification - Claimpro</title>
//                 <meta name="description" content="Notification for BVC Claimpro Assist" />
//                 <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
//             </Helmet>
//             <h1>Hello World</h1>
//         </div>
//     );
// }

// export default NotificationComponent;


const publicVapidKey = 'BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0';

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
};

const NotificationComponent = () => {
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    try {
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service worker registered:', registration);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });
      console.log('Push Manager subscription:', subscription);

      await axios.post(`${backendUrl}/api/subscription`, subscription);
      await axios.post(`${backendUrl}/api/notification`, { message });

      alert('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification');
    }
  };

  return (
    <div>
      <h1>Send Notification</h1>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default NotificationComponent;