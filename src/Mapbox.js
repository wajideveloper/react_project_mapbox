// import { useEffect, useState } from "react"


import React from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
  const TOKEN = 'pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA'; 
  // Replace with your Mapbox API access token

  // Set initial viewport for the map
  const initialViewport = {
    width: '100%',
    height: '100%',
    latitude: 37.7749, // Default latitude for San Francisco
    longitude: -122.4194, // Default longitude for San Francisco
    zoom: 10,
  };

  return (
    <ReactMapGL
      {...initialViewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => console.log(viewport)}
    />
  );
};

export default Map;
