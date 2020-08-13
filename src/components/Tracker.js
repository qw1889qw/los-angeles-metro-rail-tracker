/* imports */

import React, { useState, useEffect } from 'react';
import {
  Map,
  TileLayer,
  GeoJSON,
  LayersControl,
  Marker,
  Tooltip
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { generate } from 'shortid';
import { fetchVehicleLocations } from '../helpers';
import blueLine from '../assets/geojson/blue.geojson';
import redLine from '../assets/geojson/red.geojson';
import greenLine from '../assets/geojson/green.geojson';
import purpleLine from '../assets/geojson/purple.geojson';
import expoLine from '../assets/geojson/expo.geojson';
import goldLine from '../assets/geojson/gold.geojson';
import {
  blueStyle,
  redStyle,
  greenStyle,
  purpleStyle,
  expoStyle,
  goldStyle
} from '../assets/geojson/geojson-styling.js';
import { blueIcon, redIcon, greenIcon, purpleIcon, expoIcon, goldIcon } from '../assets/markers/icons';
const { Overlay } = LayersControl;

/* main part of app */

const viewport = {
  center: [34.0522, -118.2437],
  zoom: 11.5
};

const Tracker = () => {
  const [locations, setLocations] = useState([]);

  // fetch once when app starts up
  // route numbers: A = 801, B = 802, C = 803, L = 804, D = 805, E = 806
  useEffect(() => {
    fetchVehicleLocations(setLocations);
  }, []);

  // fetch updated locations every 10 seconds
  useEffect(() => {
    const interval = setInterval(
      () => fetchVehicleLocations(setLocations),
      10000
    );
    return () => clearInterval(interval);
  });

  return (
    <Map viewport={viewport} zoomSnap={0.5} zoomDelta={0.5}>
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution="map data from OSM; imagery from Mapbox"
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
        accessToken="pk.eyJ1IjoicXcxODg5cXciLCJhIjoiY2p2bG91MmVlMHk3ajN5cGJqNW9hajA5MSJ9.hOR02QLP2CyfV6enYO23WA"
      />
      <LayersControl position="topright">
        <Overlay checked name="A (Blue) Line">
          <GeoJSON data={blueLine} style={blueStyle} />
        </Overlay>
        <Overlay checked name="B (Red) Line">
          <GeoJSON data={redLine} style={redStyle} />
        </Overlay>
        <Overlay checked name="C (Green) Line">
          <GeoJSON data={greenLine} style={greenStyle} />
        </Overlay>
        <Overlay checked name="D (Purple) Line">
          <GeoJSON data={purpleLine} style={purpleStyle} />
        </Overlay>
        <Overlay checked name="E (Expo) Line">
          <GeoJSON data={expoLine} style={expoStyle} />
        </Overlay>
        <Overlay checked name="L (Gold) Line">
          <GeoJSON data={goldLine} style={goldStyle} />
        </Overlay>
      </LayersControl>
      {locations.map(({ route, lat, lon }) => {
        let line;
        let icon;
        switch (route) {
          case '801':
            line = 'A (Blue Line)';
            icon = blueIcon;
            break;
          case '802':
            line = 'B (Red) Line';
            icon = redIcon;
            break;
          case '803':
            line = 'C (Green) Line';
            icon = greenIcon;
            break;
          case '804':
            line = 'L (Gold) Line';
            icon = goldIcon;
            break;
          case '805':
            line = 'D (Purple) Line';
            icon = purpleIcon;
            break;
          case '806':
            line = 'E (Expo) Line';
            icon = expoIcon;
            break;
          default:
            line = 'unknown line';
            icon = null;
            break;
        }
        return (
          <Marker position={[lat, lon]} key={generate()} icon={icon}>
            <Tooltip>{line}; latitude: {lat}; longitude: {lon}</Tooltip>
          </Marker>
        );
      })}
    </Map>
  );
};

export default Tracker;
