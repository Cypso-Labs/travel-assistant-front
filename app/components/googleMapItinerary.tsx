import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 6.9271, // Default center (Sri Lanka)
  lng: 79.8612,
};

const MapComponent = ({ locations }) => {
  const [directions, setDirections] = useState(null); // State to store route data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (locations.length > 0) {
      const directionsService = new google.maps.DirectionsService();

      // Create waypoints from all locations except the last one
      const waypoints = locations.slice(0, -1).map((loc) => ({
        location: { lat: loc.latitude, lng: loc.longitude },
        stopover: true,
      }));

      // Define destination as the last location
      const destination = {
        lat: locations[locations.length - 1].latitude,
        lng: locations[locations.length - 1].longitude,
      };

      // Fetch directions from defaultCenter to destination with waypoints
      directionsService.route(
        {
          origin: defaultCenter, // Start from the default center
          destination: destination,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING, // Adjust travel mode as needed
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError(`Failed to fetch directions. Status: ${status}`);
          }
        }
      );
    } else {
      setError("At least one location is required to calculate directions.");
    }
  }, [locations]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={8}
      >
        {/* Render markers for all locations */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.latitude, lng: location.longitude }}
            title={location.name || `Location ${index + 1}`}
          />
        ))}

        {/* Render the calculated directions */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Show error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </LoadScript>
  );
};

export default MapComponent;
