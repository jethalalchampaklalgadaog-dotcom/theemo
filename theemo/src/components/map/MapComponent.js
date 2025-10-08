// src/components/map/MapComponent.js

import React, { useEffect } from 'react';
// --- NEW: Import LayersControl for the toggle button ---
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';

// Your existing custom icons (no changes needed here)
const pickupIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const dropoffIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// The MapUpdater component remains the same
const MapUpdater = ({ route }) => {
  const map = useMap();
  useEffect(() => { if (route) { map.fitBounds(route, { padding: [50, 50] }); } }, [route, map]);
  return null;
}

const MapComponent = ({ pickupLocation, dropoffLocation, route }) => {
  const indiaCenter = [20.5937, 78.9629];

  return (
    <MapContainer center={indiaCenter} zoom={5} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      
      {/* --- NEW: The LayersControl component that creates the toggle button --- */}
      <LayersControl position="topright">
        
        {/* --- Base Layer 1: The Street Map (default) --- */}
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
          />
        </LayersControl.BaseLayer>

        {/* --- Base Layer 2: The Satellite Map --- */}
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            attribution='&copy; Esri &mdash; source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </LayersControl.BaseLayer>

      </LayersControl>
      {/* --- END OF NEW SECTION --- */}

      {/* These elements are overlays and will appear on top of ANY selected map layer */}
      {pickupLocation && <Marker position={pickupLocation} icon={pickupIcon}><Popup>Pickup</Popup></Marker>}
      {dropoffLocation && <Marker position={dropoffLocation} icon={dropoffIcon}><Popup>Drop-off</Popup></Marker>}
      {route && <Polyline positions={route} color="#0052D4" weight={5} />}
      <MapUpdater route={route} />

    </MapContainer>
  );
};

export default MapComponent;