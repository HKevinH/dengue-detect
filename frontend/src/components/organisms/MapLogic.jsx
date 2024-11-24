/* eslint-disable react/prop-types */
// components/MapLogic.js
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import GeoJSONLayer from "./GeoJSONLayer";
import CityMarkers from "./CityMarkers";

const MapLogic = ({ dataGeo, cityCoordinates, selectedRisk }) => {
  const map = useMap();

  useEffect(() => {
    if (dataGeo) {
      const geoJsonLayer = L.geoJSON(dataGeo);
      map.fitBounds(geoJsonLayer.getBounds());
    }
  }, [dataGeo, map]);

  const filteredCities = Object.entries(cityCoordinates).filter(
    ([, { risk }]) => !selectedRisk || risk === parseInt(selectedRisk)
  );

  useEffect(() => {
    if (filteredCities.length > 0) {
      const bounds = filteredCities.map(([, { lat, lng }]) => [lat, lng]);
      map.fitBounds(bounds);
    }
  }, [filteredCities, map]);

  return (
    <>
      {dataGeo && <GeoJSONLayer dataGeo={dataGeo} />}
      <CityMarkers cities={filteredCities} />
    </>
  );
};

export default MapLogic;
