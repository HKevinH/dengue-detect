import { useCallback, useEffect, useState } from "react";

export const useMapHook = () => {
  const [position, setPosition] = useState({ lat: 3.420556, lng: -76.522224 });

  const getGeoData = useCallback(async () => {
    const response = await fetch(
      "/apiV2/f94cbfe0-dee8-4a9b-870c-358bca259d89/resource/ec49483e-c5ca-4f67-a916-865ff1de1d2f/download/arboles_notables.json",
      {
        method: "GET",
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "es-ES,es;q=0.7",
          "cache-control": "max-age=0",
          cookie:
            "ckan=877528c441774e57c217c221a8294f7b13e34f12gAJ9cQAoWAcAAABfZG9tYWlucQFOWAUAAABfcGF0aHECWAEAAAAvcQNYAwAAAF9pZHEEWCAAAAA0OTFlZmZiNDIxZDM0ODc0YTRmNWNiMTY4MzhlZmQ4M3EFWAYAAABfZnJlc2hxBolYCwAAAF9jc3JmX3Rva2VucQdYKAAAAGY3MTM3MWIxMWMwZTdjMjJiOTE3Y2JkMDJkY2ZiNzNiNzQyZGE0MzVxCFgOAAAAX2NyZWF0aW9uX3RpbWVxCUdB2cWzSr1M91gOAAAAX2FjY2Vzc2VkX3RpbWVxCkdB2cW0OjfqJ1gIAAAAX2V4cGlyZXNxC2NkYXRldGltZQpkYXRldGltZQpxDGNfY29kZWNzCmVuY29kZQpxDVgLAAAAB8O2ARIWDgcAAABxDlgGAAAAbGF0aW4xcQ+GcRBScRGFcRJScTN1Lg==",
          "if-modified-since": "Thu, 13 Jun 2019 16:13:01 GMT",
          "if-none-match": '"1560442381.0-117496-1257772605"',
          priority: "u=0, i",
          "sec-ch-ua":
            '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        },
      }
    );

    const data = await response.json();
    return data;
  }, []);

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

  return { position, getCurrentLocation, getGeoData };
};
