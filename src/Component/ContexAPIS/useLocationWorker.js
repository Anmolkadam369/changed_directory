import { useEffect } from "react";

const useLocationWorker = (sendMessage, userId) => {
    useEffect(() => {
        // Web Workers require code to be in a separate file or a Blob
        const workerCode = `
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
                                        lng: position.coords.longitude
                                    }
                                };
                                self.postMessage(locationData);
                            },
                            (error) => {
                                console.error('Geolocation Error:', error);
                            }
                        );
                    }
                };

                sendLocationUpdate();
                setInterval(sendLocationUpdate, 120000);
            };
        `;

        const blob = new Blob([workerCode], { type: "application/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));

        // Send user ID to worker
        worker.postMessage({ userId });

        // Receive location updates
        worker.onmessage = (event) => {
            sendMessage(event.data);
            console.log("Worker Location Update:", event.data);
        };

        return () => worker.terminate(); // Cleanup worker on unmount
    }, [sendMessage, userId]);
};

export default useLocationWorker;
