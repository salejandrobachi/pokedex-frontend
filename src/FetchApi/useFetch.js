import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Limpiamos cualquier error previo

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); // La dependencia es la URL, para que se vuelva a ejecutar si cambia

  return { data, loading, error };
}

export const useLazyFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Añadimos un estado para el error

  const fetchApiData = async (endPoint, method) => {
    try {
      setLoading(true);
      const request = await fetch(`${process.env.REACT_APP_API_URL}/api/${endPoint}`, {
        method,
      });
      const response = await request.json();
      setData(response);
      setLoading(false);
      setError(null);
      return response;
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      setError(error);
      setLoading(false);
      return null;
    }
  };

  return { data, loading, error, fetchApiData };
};