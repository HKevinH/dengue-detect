/* eslint-disable react/prop-types */
import { MapContainer, TileLayer } from "react-leaflet";

const MapComponent = ({ children }) => (
  <MapContainer
    center={[3.4516, -76.5319]}
    zoom={6}
    style={{ height: window.innerHeight * 0.85, width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    {children}
  </MapContainer>
);

export default MapComponent;
