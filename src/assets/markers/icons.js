import L from 'leaflet';
import blueMarker from './marker-blue.png';
import redMarker from './marker-red.png';
import greenMarker from './marker-green.png';
import purpleMarker from './marker-purple.png';
import expoMarker from './marker-expo.png';
import goldMarker from './marker-gold.png';
import markerShadow from './marker-shadow.png';

/* icons to show train locations */

const iconShared = {
  iconAnchor: [12, 41],
  tooltipAnchor: [15, -28],
  shadowUrl: markerShadow
};

const createIcon = marker => new L.Icon({
  iconUrl: marker,
  ...iconShared
});

export const blueIcon = createIcon(blueMarker);
export const redIcon = createIcon(redMarker);
export const greenIcon = createIcon(greenMarker);
export const purpleIcon = createIcon(purpleMarker);
export const expoIcon = createIcon(expoMarker);
export const goldIcon = createIcon(goldMarker);