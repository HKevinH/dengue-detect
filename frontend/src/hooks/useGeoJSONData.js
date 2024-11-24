// hooks/useGeoJSONData.js
import { useEffect, useState } from "react";

export const useGeoJSONData = (url) => {
  const [dataGeo, setDataGeo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al cargar el archivo GeoJSON");

        const data = await response.json();
        setDataGeo(data);
      } catch (err) {
        console.error("Error al cargar el GeoJSON:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return { dataGeo, error };
};
