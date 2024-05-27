import React, { useEffect, useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from './Firebase';
import backendUrl from "../../environment";
import axios from 'axios';

const NotificationComponent = () => {
  const [notificationSent, setNotificationSent] = useState(false);

  async function requestPermission() {
    if (notificationSent) return; // Prevent duplicate calls
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        const token = await getToken(messaging, { vapidKey: 'BCSLSM0MqLiL4BjJrDEhYf6z8MlsxHkbGDRZjmtrdsbt352tsRknucbpSYRDQF2jGrd2zvQNnpqsBLcoVY7XyKg' });
        console.log("Generated token:", token);
        console.log("notici")
        if(!notificationSent) await sendNotification(token);
        setNotificationSent(true);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    } else if (permission === 'denied') {
      alert('Notification permission denied.');
    }
  }

  useEffect(() => {
    requestPermission();
  }, []); // Empty dependency array ensures this runs only once

  const sendNotification = async (token) => {
    const payload = {
      token: token,
    };

    try {
      const response = await axios.post(`${backendUrl}/api/sendNotification`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return <div>Notification Componentssss</div>;
};

export default NotificationComponent;
