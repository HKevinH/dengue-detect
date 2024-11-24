import { Circle, Popup } from "react-leaflet";

const CityMarkers = ({ cities }) => {
  return (
    <>
      {cities.map(([city, { lat, lng, cases }]) => (
        <Circle
          key={city}
          center={[lat, lng]}
          color="#ff0000"
          fillColor="#f03"
          fillOpacity={0.6}
          radius={Math.log(cases + 1) * 1000}
        >
          <Popup>
            <b>{city}</b>
            <br />
            Casos: {cases}
            <br />
            Riesgo: {cases > 10000 ? "Alto" : "Bajo"}
          </Popup>
        </Circle>
      ))}
    </>
  );
};

export default CityMarkers;
