self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log("Push event data:", data);
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '../src/Assets/claimproassistwithoutName.jpg'
    });
  } else {
    console.log("Push event but no data");
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://claimpro.in')
  );
});
