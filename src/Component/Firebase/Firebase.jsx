// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDVoCPjnHeVwhXGS6e2TecybfRA5kO47BM",
  authDomain: "firstfirebaseproject-c676f.firebaseapp.com",
  projectId: "firstfirebaseproject-c676f",
  storageBucket: "firstfirebaseproject-c676f.appspot.com",
  messagingSenderId: "490386883552",
  appId: "1:490386883552:web:629d36e63e41982abce185",
  measurementId: "G-R45S0BBB9B"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
