import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axiosInstance from './axiosInstance';

import L from 'leaflet';
import data from './data/cities.json'; 
import CityComponent from "./CityComponent";
import SaldoCmponent from "./SaldoComponent"
import markerIcon from "./data/location-pin.png"
//import './index.css'



export default function App() {
  const position = [52.15, 19.48]
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [yesCourse, setYesCourse] = useState(null);
  const [noCourse, setNoCourse] = useState(null);
  

  const customIcon = L.icon({
    iconUrl: markerIcon, // Ścieżka do zdjęcia markera
    iconSize: [38, 38], // Rozmiar ikony
    iconAnchor: [19, 38], // Punkt kotwiczenia ikony
  });

  useEffect(() => {
    setMarkers(data); // Ustaw dane markerów z pliku JSON w stanie komponentu

    if (data.length > 0) {
      setSelectedMarker(data[0]); // Ustaw pierwszy marker jako domyślnie wybrany
      console.log(data[0])
      axiosInstance.get(`/city/${data[0]['properties'].API_NAME}`)
      .then(response => {
        const { yes_course, no_course } = response.data;
        setYesCourse(yes_course);
        setNoCourse(no_course);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker); // Ustaw wybrany marker w stanie komponentu
    console.log('marker clicked', marker.properties.API_NAME);

    axiosInstance.get(`/city/${marker.properties.API_NAME}/`)
      .then(response => {
        const { yes_course, no_course } = response.data;
        setYesCourse(yes_course);
        setNoCourse(no_course);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="app-container">
    <div className="upper-bar">
        <h1>WeatherBET</h1>
        <div className="slado-component">
        <SaldoCmponent saldo={"99999"} />
      </div>
    </div>
    <div className="container">
      <div className="map-container">
        <MapContainer center={position} zoom={7}>
          {/* OPEN STREEN MAPS TILES */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Wyrenderuj markery na podstawie danych z pliku JSON */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geometry.coordinates}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
              icon={customIcon} 
            >
              <Popup>
                <div>
                  <strong>{marker.properties.NAME}</strong>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="city-component">
        {selectedMarker && (
          <CityComponent cityName={selectedMarker.properties.NAME}
          yesCourse={yesCourse}
          noCourse={noCourse}
          />
        )}
      </div>
      
    </div>
    
    </div>
  );  
}
