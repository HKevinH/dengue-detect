/* eslint-disable react/prop-types */
import { GeoJSON } from "react-leaflet";
import { capitalize } from "../../utils/Util";

const GeoJSONLayer = ({ dataGeo }) => {
  const onEachFeature = (feature, layer) => {
    const popupContent = feature.properties
      ? Object.keys(feature.properties)
          .map((key) => `<b>${capitalize(key)}</b>: ${feature.properties[key]}`)
          .join("<br>")
      : "No data available";

    layer.bindPopup(popupContent);
  };

  const style = {
    color: "#6a97c2",
    weight: 2,
    opacity: 0.6,
  };

  return <GeoJSON data={dataGeo} style={style} onEachFeature={onEachFeature} />;
};

export default GeoJSONLayer;
