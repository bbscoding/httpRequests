import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(true)
  const [availableplaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true)
      try {
        const places = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          )
          setAvailablePlaces(sortedPlaces)
          setIsLoading(false)
        });
      } catch (error) {
        setError({ message: error.message || "No data " })
        setIsLoading(false)
      }
    }
    fetchPlaces();
  }, [])

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }



  return (
    <Places
      title="Available Places"
      places={availableplaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
