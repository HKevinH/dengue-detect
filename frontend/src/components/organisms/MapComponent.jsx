import { MapContainer } from "react-leaflet";
import MapLayer from "../molecules/MapLayer";
import MapMarker from "../atoms/MapMarker";
import "leaflet/dist/leaflet.css";
import { useMapHook } from "../../hooks/useMap";
import { useEffect } from "react";

const MapComponent = () => {
  const { position, getGeoData } = useMapHook();
  useEffect(() => {
    const res = getGeoData();
    console.log(res);
  }, [getGeoData]);
  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: window.innerHeight * 0.75, width: "100%" }}
    >
      <MapLayer />
      <MapMarker position={position} />
    </MapContainer>
  );
};

export default MapComponent;
