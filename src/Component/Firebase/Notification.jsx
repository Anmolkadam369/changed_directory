import React, { useEffect, useRef, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './Firebase';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import backendUrl from '../../environment';

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