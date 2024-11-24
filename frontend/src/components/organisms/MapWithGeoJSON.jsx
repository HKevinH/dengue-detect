/* eslint-disable react/prop-types */
import MapComponent from "./MapComponent";
import MapLogic from "./MapLogic";
import { useGeoJSONData } from "../../hooks/useGeoJSONData";
import { cityCoordinates } from "../../const/const";
import "leaflet/dist/leaflet.css";

const MapWithGeoJSON = ({ selectedRisk }) => {
  const { dataGeo, error } = useGeoJSONData("/data/mc_comunas.geojson");

  return (
    <MapComponent>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <MapLogic
        dataGeo={dataGeo}
        cityCoordinates={cityCoordinates}
        selectedRisk={selectedRisk}
      />
    </MapComponent>
  );
};

export default MapWithGeoJSON;
