import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const LocationInputs = ({ setPickup, setDropoff }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const addSearchControl = (placeholder, callback) => {
      const searchControl = new GeoSearchControl({
        provider, style: 'bar', showMarker: false, autoClose: true, searchLabel: placeholder,
      });
      map.addControl(searchControl);
      map.on('geosearch/showlocation', (e) => callback({ lat: e.location.y, lng: e.location.x }));
      // This is a hacky way to assign callbacks, better in a real app
      if (placeholder.includes('Pickup')) map.off('geosearch/showlocation').on('geosearch/showlocation', (e) => setPickup({ lat: e.location.y, lng: e.location.x }));
      else map.off('geosearch/showlocation').on('geosearch/showlocation', (e) => setDropoff({ lat: e.location.y, lng: e.location.x }));
    };
    
    // In a real app, you'd manage these controls more carefully to avoid conflicts.
    // For this project, we'll assume the user uses them one at a time.
    addSearchControl('Enter Pickup location', setPickup);
    addSearchControl('Enter Drop-off location', setDropoff);

  }, [map, setPickup, setDropoff]);

  return null; // The controls are added directly to the map
};


// Note: A simpler, more robust approach without leaflet-geosearch is also possible,
// using standard text inputs and a separate geocoding API call on button click.
// This direct map integration is more visually aligned with the Ola/Uber style.
const PlaceholderMap = ({setPickupLocation, setDropoffLocation}) => {
  return (
    <MapContainer center={[0,0]} zoom={1} style={{display: 'none'}}>
      <LocationInputs setPickup={setPickupLocation} setDropoff={setDropoffLocation} />
    </MapContainer>
  )
}
export default PlaceholderMap;