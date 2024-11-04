import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapWithGeoJSON = () => {
  const [dataGeo, setDataGeo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/map.geojson");
        if (!response.ok) throw new Error("Error al cargar el archivo GeoJSON");

        const data = await response.json();
        setDataGeo(data);
      } catch (err) {
        console.error("Error al cargar el GeoJSON:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const MapWithGeoJSONLayer = () => {
    const map = useMap();
    useEffect(() => {
      if (dataGeo) {
        L.geoJSON(dataGeo, {
          style: {
            color: "blue",
            weight: 2,
            opacity: 0.6,
          },
        }).addTo(map);

        map.fitBounds(L.geoJSON(dataGeo).getBounds());
      }
    }, [dataGeo, map]);

    return null;
  };

  return (
    <MapContainer
      center={[3.4516, -76.5319]}
      zoom={12}
      style={{ height: window.innerHeight * 0.75, width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <MapWithGeoJSONLayer />
    </MapContainer>
  );
};

export default MapWithGeoJSON;
