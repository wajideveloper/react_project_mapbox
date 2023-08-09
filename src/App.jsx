import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import Population from './data/province_pop';
import Legend from './data/Legend';
import { useState, useEffect } from 'react';
import Animation from './components/Animation';
// import Direction from './ClusterMap/Direction';
import CenteriodData from './data/centriod_data';
import marker1 from "./Asset/images/marker.png"
// import Mapbox from './Mapbox';
function App() {

  const [mapColor, setMapColor] = useState('green');
  const [title, setTitle] = useState('My Map by Wajid');
  const [selectedcoord, setSelectedCoord] = useState(null);

  const pakdatalayer = {
    id: 'Pak-Admin',
    type: 'fill',
    source: 'mapbox',

    paint: {
      'fill-color': mapColor,
      'fill-opacity': 0.5,

    }
  };

  const pakdataLayer = {
    id: 'outline',
    type: 'line',
    source: 'Pak-Admin',
    layout: {},
    paint: {
      'line-color': '#000',
      'line-width': 3
    }
  };

  const centeriodLayer = {
    id: "center-pk-layer",
    type: "circle",
    paint: {
      'circle-color': 'blue',
      'circle-radius': 6,
      'circle-opacity': 0.8,
    }
  };
  const islamabadCoords = {
    longitude: 73.0479,
    latitude: 33.6844
  };

  useEffect(() => {
    if (selectedcoord && selectedcoord.geometry) {
      console.log('selectedcoord', selectedcoord.geometry.coordinates)
      }}, [selectedcoord])

  return (
    <>
      <h1>{title}</h1>
      {
        selectedcoord &&
        <p>Selected coord: {selectedcoord.geometry.coordinates}</p>
      }
      
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA"
        initialViewState={{
          longitude: 69.3451,
          latitude: 30.3753,
          zoom: 5,

        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"

      >

        {/* <AttributionControl customAttribution="Map design by me" /> */}

        <Source id="Pak-Admin" type="geojson" data={Population}>
          <Layer {...pakdatalayer} />
          <Layer {...pakdataLayer} />

        </Source>
        <Source id="center-pk-layer" type="geojson" data={CenteriodData}>

          <Layer {...centeriodLayer} />

        </Source>

        <Legend setLegendColor={setMapColor} setTitle={setTitle} />

        {/* Marker for Islamabad */}
        <Marker longitude={islamabadCoords.longitude} latitude={islamabadCoords.latitude}>
          <div style={{ color: 'red' }}>📍</div>
        </Marker>

        {CenteriodData.features.map((centriode) => (
          <Marker
            key={centriode.properties.ID_1}
            longitude={centriode.geometry.coordinates[0]}
            latitude={centriode.geometry.coordinates[1]}>

            
              <img style={{ width: 20, height: 20 }} src={marker1} alt="marker icon" onClick={() => setSelectedCoord(centriode)} />

          </Marker>
        ))}

{selectedcoord &&  selectedcoord.geometry &&
  // <Popup
  // longitude={selectedcoord.geometry.coordinates[0]}
  // latitude={selectedcoord.geometry.coordinates[1]}
  // >
  //  Test
  // </Popup>
  <Popup 
    longitude={selectedcoord.geometry.coordinates[0]} 
    latitude={selectedcoord.geometry.coordinates[1]} 
    onClose={() => setSelectedCoord(null)}>
      <div style={{minWidth: 200}}>
        <h3>{selectedcoord?.properties['NAME_1']}</h3><br/>
        <p>{selectedcoord?.properties['pop_data']}</p>
      </div>
    
    </Popup>
}

      </Map>
      <Animation setMapColor={setMapColor} />
      {/* <Direction /> */}
    </>
  );
}

export default App;
