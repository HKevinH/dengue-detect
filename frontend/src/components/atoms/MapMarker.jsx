/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";

const MapMarker = ({ position }) => {
  return (
    <Marker position={position}>
      <Popup>
        Tu estas aqui! <br /> Lat: {position.lat}, Lng: {position.lng}
      </Popup>
    </Marker>
  );
};

export default MapMarker;
