export const Pakdatalayer1 = (mapColor) => {
    return {
      id: 'Pak-Admin1',
      type: 'fill',
      source: 'mapbox',
      paint: {
        'fill-color': mapColor,
        'fill-opacity': 0.5,
      },
    };
  };
  
  export const pakdataLayer = {
      id: 'outline',
       type: 'line',
      source: 'Pak-Admin',
       layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3
       }
    };
  
  export const centeriodLayer = {
    id: 'center-pk-layer',
    type: 'circle',
    paint: {
      'circle-color': 'blue',
      'circle-radius': 6,
      'circle-opacity': 0.8,
    },
  };
  
    // // const islamabadCoords = {
  // //   longitude: 73.0479,
  // //   latitude: 33.6844
  // // };

        //   {/* Marker for Islamabad */}
        // {/* <Marker longitude={islamabadCoords.longitude} latitude={islamabadCoords.latitude}>
        //   <div style={{ color: 'red' }}>📍</div>
        // </Marker> */}