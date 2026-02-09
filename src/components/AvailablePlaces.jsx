import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(true)
  const [availableplaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places')
      const resData = await response.json()
      setAvailablePlaces(resData.places)
      setIsLoading(false)
    }

    fetchPlaces();
  }, [])



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
