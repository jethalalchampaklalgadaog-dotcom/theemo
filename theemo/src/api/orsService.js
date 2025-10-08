import axios from 'axios';
const ORS_API_KEY = process.env.REACT_APP_ORS_API_KEY;

export const getRouteDetails = async (start, end) => {
  try {
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      { coordinates: [[start.lng, start.lat], [end.lng, end.lat]] },
      { headers: { 'Authorization': ORS_API_KEY } }
    );
    const data = response.data;
    const route = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    const distance = Math.round(data.features[0].properties.summary.distance / 1000);
    return { route, distance };
  } catch (error) {
    console.error("Error fetching route from OpenRouteService:", error);
    throw new Error('Could not calculate route.');
  }
};