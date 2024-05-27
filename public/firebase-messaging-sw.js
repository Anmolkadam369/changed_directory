// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDVoCPjnHeVwhXGS6e2TecybfRA5kO47BM",
  authDomain: "firstfirebaseproject-c676f.firebaseapp.com",
  projectId: "firstfirebaseproject-c676f",
  storageBucket: "firstfirebaseproject-c676f.appspot.com",
  messagingSenderId: "490386883552",
  appId: "1:490386883552:web:629d36e63e41982abce185",
  measurementId: "G-R45S0BBB9B"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
