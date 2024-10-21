import { useCallback, useEffect, useState } from "react";

export const useMapHook = () => {
  const [position, setPosition] = useState({ lat: 3.420556, lng: -76.522224 });

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (position.lat === 0 && position.lng === 0) {
      getCurrentLocation().then((pos) => {
        setPosition(pos);
      });
    }
  }, [getCurrentLocation, position.lat, position.lng]);

  return { position, getCurrentLocation };
};
