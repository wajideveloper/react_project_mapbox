import React, { useState, useEffect } from 'react';
import Map, { GeolocateControl, NavigationControl, Source, Layer } from 'react-map-gl';
import axios from 'axios';
// import pakdata from './data/pak_Geojson';
import 'mapbox-gl/dist/mapbox-gl.css';

const Direction = () => {
  const [viewport, setViewport] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    zoom: 5,
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    // Call the routing API here
    const getRoute = async () => {
      const mapboxAccessToken = 'pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA';
      const origin = [73.0479, 33.6844]; // Islamabad coordinates
      const destination = [74.3587, 31.5204]; // Lahore coordinates

      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxAccessToken}`
        );

        if (response.data.routes && response.data.routes.length > 0) {
          // Extract the coordinates of the route from the API response
          const route = response.data.routes[0].geometry.coordinates;
          setRouteCoordinates(route);
        }
      } catch (error) {
        console.error('Error fetching route:', error.toString());
      }
    };

    getRoute();
  }, []);

  return (
    <Map
      {...viewport}
      width="100vw"
      height="50vh"
      mapboxApiAccessToken="pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserLocation={true}
      />
      <NavigationControl />

      {/* Show the route if coordinates are available */}
      {routeCoordinates.length > 0 && (
        <Source
          id="route"
          type="geojson"
          data={{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates,
            },
          }}
        >
          <Layer
            id="route"
            type="line"
            source="route"
            paint={{
              'line-color': 'blue',
              'line-width': 5,
            }}
          />
        </Source>
      )}
    </Map>
  );
};

export default Direction;
