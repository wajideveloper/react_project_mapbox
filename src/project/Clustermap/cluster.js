
import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Source, Layer, Marker } from 'react-map-gl';

// import ControlPanel from './control-panel';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './clusterLayer1';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA'; // Set your mapbox token here

export default function Clustermap({ isClusture, setIsCluster }) {
     console.log("isCl",isClusture)
    const mapRef = useRef(null);

    const showingCluster = event => {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = mapRef.current.getMap().getSource('earthquakes');

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            mapRef.current.getMap().easeTo({
                center: feature.geometry.coordinates,
                zoom,
                duration: 500
            });
        });
    };
    useEffect(() => {
        if (isClusture) {
            showingCluster();

            setIsCluster(false);
        }

    }, [

    ])

    return (
        <>
            {/* <Map
        width="100%"
        height={400}
        latitude={40.67}
        longitude={-103.59}
        zoom={3}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      > */}
            <Source
                id="earthquakes"
                type="geojson"
                data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
            </Source>
            <Marker latitude={37.7749} longitude={-122.4194}>
                <div>Marker</div>
            </Marker>
            {/* </Map>
      <ControlPanel /> */}
        </>
    );
}

export function renderToDom(container) {
    createRoot(container).render(<Clustermap />);
}