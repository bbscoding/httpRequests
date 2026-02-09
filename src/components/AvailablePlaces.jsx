import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(true)
  const [availableplaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3000/places')
        const resData = await response.json()
        setAvailablePlaces(resData.places)
        if (!response.ok) {
          throw new Error('Could not fetch places');
        }
      } catch (error) {
        setError({ message: error.message || "No data " })
      }
      setIsLoading(false)
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
