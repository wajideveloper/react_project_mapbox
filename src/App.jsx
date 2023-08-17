import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import Population from './data/province_pop';
import Legend from './data/Legend';
import { useState, useEffect, useRef } from 'react';
import Animation from './components/Animation';
// import Direction from './ClusterMap/Direction';
import CenteriodData from './data/centriod_data';
import marker1 from "./Asset/images/marker.png"
import HeatMap from './project/Heatmap/heatmap';
import {Pakdatalayer1,pakdataLayer,centeriodLayer} from "./components/Layers"
import Clustermap from './project/Clustermap/cluster';
  import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './project/Clustermap/clusterLayer1';

function App() {
  const mapRef = useRef(null);
  const [viewport, setViewPort] = useState({
      longitude: 73.0479,
      latitude: 33.6844,
      zoom: 3
  });

  const [mapColor, setMapColor] = useState('green');
  const [title, setTitle] = useState('My Map by Wajid');
  const [selectedcoord, setSelectedCoord] = useState(null);
  const [basemap, setBaseMap] = useState('mapbox://styles/mapbox/streets-v9')


  const changeMapStyle = (newStyle) => {
    setBaseMap(newStyle);
  };

  useEffect(() => {
    if (selectedcoord && selectedcoord.geometry) {
      console.log('selectedcoord', selectedcoord.geometry.coordinates)
    }
  }, [selectedcoord])

  const [isClusture,setIsCluster]=useState(false);

  return (
    <>
      <h1>{title}</h1>
      {
        selectedcoord &&
        <p>Selected coord: {selectedcoord.geometry.coordinates}</p>
      }
      <div style={{ display:'flex', justifyItems:'center', paddingBottom:10}}>
      <button onClick={() => changeMapStyle('mapbox://styles/mapbox/dark-v11')}>
        Heat Map
      </button>
      <button onClick={() => changeMapStyle('mapbox://styles/mapbox/streets-v11')}>
        Custom Map
      </button>
      <button onClick={() => changeMapStyle('mapbox://styles/mapbox/light-v11')}>
        Cluster Map
      </button>
      </div>
      <Map
      // {...viewport}
    
        initialViewState={{
          longitude: 73.0479,
          latitude: 33.6844,
          zoom: 3
        }}
      
        mapboxAccessToken="pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA"
        
        style={{ width: '100vw', height: '100vh' }}
      mapStyle={basemap}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={ ()=>
      {
        setIsCluster(true)
      }}
      ref={mapRef}

      >


        <Source id="Pak-Admin" type="geojson" data={Population}>
          <Layer {...Pakdatalayer1(mapColor)} />

        </Source>

        <Source id="Pak-Admin" type="geojson" data={Population}>
          <Layer {...pakdataLayer} />
        </Source>

        <Source id="center-pk-layer" type="geojson" data={CenteriodData}>

          <Layer {...centeriodLayer} />

        </Source>

        <Legend setLegendColor={setMapColor} setTitle={setTitle} />

        {CenteriodData.features.map((centriode) => (
          <Marker
            key={centriode.properties.ID_1}
            longitude={centriode.geometry.coordinates[0]}
            latitude={centriode.geometry.coordinates[1]}>


            <img style={{ width: 20, height: 20 }}
              src={marker1} alt="marker icon"
              onClick={() => setSelectedCoord(centriode)} />

          </Marker>
        ))}

        {selectedcoord && selectedcoord.geometry &&
          <Popup
            longitude={selectedcoord.geometry.coordinates[0]}
            latitude={selectedcoord.geometry.coordinates[1]}
            onClose={() => setSelectedCoord(null)}>
            <div style={{ width:100, height:40 }}>
              <h4>{selectedcoord?.properties['NAME_1']}</h4>
              <p>{selectedcoord?.properties['pop_data']}</p>
            </div>

          </Popup>
        }

      {
        basemap === 'mapbox://styles/mapbox/dark-v11' && <HeatMap/>
      }
      {
        basemap === 'mapbox://styles/mapbox/light-v11' && <Clustermap 
        isClusture={isClusture} setIsCluster={setIsCluster}
        />
      }

      </Map>
      <Animation setMapColor={setMapColor} />

      
    </>
  );
}

export default App;
