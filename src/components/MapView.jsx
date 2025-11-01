import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";

// ✅ Fix default marker icon issues in React-Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  useEffect(() => {
    const existingMap = L.DomUtil.get("map");
    if (existingMap != null) existingMap._leaflet_id = null;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <FaMapMarkedAlt className="text-green-600 text-2xl" />
        <h3 className="text-lg font-semibold text-gray-800">
          Geographic Overview
        </h3>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] rounded-b-2xl overflow-hidden">
        <MapContainer
          id="map"
          center={[20.5937, 78.9629]} // India
          zoom={5}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[20.5937, 78.9629]}>
            <Popup>🇮🇳 India Center</Popup>
          </Marker>
        </MapContainer>

        {/* Floating Overlay Info (like a mini app panel) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-gray-100 text-sm text-gray-700"
        >
          <span className="font-medium text-green-700">Tip:</span> Zoom in or
          click a marker for more info.
        </motion.div>
      </div>
    </motion.div>
  );
}
