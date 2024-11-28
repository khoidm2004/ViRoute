import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const SetViewToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);    
    }
  }, [position, map]);
  return null; 
};

const Map = ({ className }) => {
  const [position, setPosition] = useState([21.0285, 105.8542]); // Hanoi
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]); 
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          alert("Unable to retrieve location. Using default location.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      className={className}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewToLocation position={position} />
      <Marker position={position}>
        <Popup>
          Latitude: {position[0]} <br /> Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
