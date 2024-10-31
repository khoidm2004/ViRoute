// src/components/SimpleMap.jsx
import React, { useState } from "react";
import "./map.css"; // Ensure your styles are here
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

// Component to handle map events
const MapEventsHandler = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]); // Update position on click
    },
  });

  return null; // This component does not render anything
};

const Map = () => {
  const [position, setPosition] = useState([21.0285, 105.8542]); // Default position

  return (
    <MapContainer center={position} zoom={50} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEventsHandler setPosition={setPosition} /> {/* Handle events here */}
      <Marker position={position}>
        <Popup>
          Latitude: {position[0]} <br /> Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
