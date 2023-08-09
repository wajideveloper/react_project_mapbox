import React, { useState } from 'react';

const Legend = ({setLegendColor, setTitle}) => {
  // const [selectedLayer, setSelectedLayer] = useState(null);

  const handleLayerClick = (layerId) => {
    // setSelectedLayer(layerId);
    // Perform your specific action here based on the selected layer (layerId)
    // For example, you can update the map's layer visibility, style, etc.
    setTitle(layerId)
  };

  const handleColorClick = (color) => {
    setLegendColor(color)
  }

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'white', padding: 10, display: 'flex', flexDirection: 'column' }}>

      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>Legend</div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ width: 20, height: 20, backgroundColor: '#4E3FC8', marginRight: 5 }}
         onClick={() => handleColorClick('#4E3FC8')} />
        <div onClick={() => handleLayerClick(' this is Pak Geojson 1')}>Pakistan GeoJSON 1</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ width: 20, height: 20, backgroundColor: '#FF5733', marginRight: 5 }}
         onClick={() => handleColorClick('#FF5733')} />
        <div onClick={() => handleLayerClick('its is blue their')}>Pakistan GeoJSON 2</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ width: 20, height: 20, backgroundColor: '#33FF57', marginRight: 5 }}
         onClick={() => handleColorClick('#33FF57')} />
        <div onClick={() => handleLayerClick('therir is a green color')}>Pakistan GeoJSON 3</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 20, height: 20, backgroundColor: 'purple', marginRight: 5 }}
         onClick={() => handleColorClick('purple')} />
        <div onClick={() => handleLayerClick}>Pakistan GeoJSON 4</div>
      </div>
    </div>
  );
};

export default Legend;