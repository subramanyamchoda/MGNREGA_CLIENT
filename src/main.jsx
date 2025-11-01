import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'leaflet/dist/leaflet.css';
import "./i18n"; 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
}
