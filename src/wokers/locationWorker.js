self.onmessage = function (e) {
    const { userId } = e.data;

    const sendLocationUpdate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationData = {
                        type: 'update-location-vendor',
                        userId: userId,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    };
                    self.postMessage(locationData); // Send data back to main thread
                },
                (error) => {
                    console.error('Geolocation Error:', error);
                }
            );
        }
    };

    // Send location immediately, then repeat every 2 minutes
    sendLocationUpdate();
    setInterval(sendLocationUpdate, 600000);
};
