import React from 'react';
import ReactDOM from 'react-dom/client';
//import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App';

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);
root.render(
  <React.StrictMode>
    <h1>TWOJA STARA</h1>
    <App />
  </React.StrictMode>
);