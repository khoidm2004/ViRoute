// src/components/map/map.jsx
import React from 'react';
import './map.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import useMapStore from '../../stores/mapStore';

const MapEventsHandler = () => {
  const setPosition = useMapStore((state) => state.setPosition);
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]); 
    },
  });
  return null; // This component does not render anything
};

const Map = ({ className }) => {
  const position = useMapStore((state) => state.position); // Get position from Zustand
  return (
    <MapContainer center={position} zoom={13} className={`${className}`}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEventsHandler /> {/* Handle events here */}
      <Marker position={position}>
        <Popup>
          Latitude: {position[0]} <br /> Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
