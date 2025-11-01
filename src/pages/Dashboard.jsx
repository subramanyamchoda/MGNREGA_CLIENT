import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaMapMarkerAlt,
  FaSyncAlt,
  FaLocationArrow,
} from "react-icons/fa";

import DistrictSelector from "../components/DistrictSelector";
import LineChart from "../components/LineChart";
import WorkTypePie from "../components/WorkTypePie";
import GenderChart from "../components/GenderChart";
import SocialGroupChart from "../components/SocialGroupChart";

const API = import.meta.env.VITE_API_URL || "https://mgnrega-0yrr.onrender.com/api";

export default function Dashboard() {
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);

  // 🧩 Fetch all districts
  useEffect(() => {
    axios.get(`${API}/districts`).then((r) => setDistricts(r.data));
  }, []);

  // 📊 Fetch monthly data when a district is selected
  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    axios
      .get(`${API}/districts/${selected}/months`)
      .then((r) => setMonthly(r.data))
      .finally(() => setLoading(false));
  }, [selected]);

  const latest = monthly[monthly.length - 1];

  // 🧭 Detect user’s district using Geolocation + Geocoding
  async function detectLocation(auto = false) {
    if (!("geolocation" in navigator)) {
      if (!auto) alert("❌ Geolocation not supported in this browser.");
      return;
    }

    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("📍 Coordinates:", latitude, longitude);

        try {
          let districtName = "";
          let stateName = "";

          // 🌍 Prefer Google Geocoding API if available
          if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
            const googleRes = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json`,
              {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                },
              }
            );

            const components =
              googleRes.data.results[0]?.address_components || [];
            components.forEach((c) => {
              if (c.types.includes("administrative_area_level_2"))
                districtName = c.long_name;
              if (c.types.includes("administrative_area_level_1"))
                stateName = c.long_name;
            });
          } else {
            // 🆓 Fallback to OpenStreetMap
            const osmRes = await axios.get(
              "https://nominatim.openstreetmap.org/reverse",
              {
                params: {
                  format: "json",
                  lat: latitude,
                  lon: longitude,
                  zoom: 9,
                  addressdetails: 1,
                },
              }
            );

            const address = osmRes.data.address;
            districtName =
              address.county ||
              address.district ||
              address.city ||
              address.region;
            stateName = address.state;
          }

          // 🧹 Normalize names
          districtName = (districtName || "")
            .replace(/district/gi, "")
            .trim();
          stateName = (stateName || "").trim();

          console.log("🗺️ Detected:", { districtName, stateName });

          if (!districtName || !stateName) {
            if (!auto)
              alert("⚠️ Could not detect district or state properly.");
            setDetecting(false);
            return;
          }

          // 🔍 Match district in dataset
          const matched = districts.find((d) => {
            const dName = d.district_name.toLowerCase();
            const sName = d.state_name.toLowerCase();
            return (
              dName.includes(districtName.toLowerCase()) ||
              districtName.toLowerCase().includes(dName) ||
              (sName.includes(stateName.toLowerCase()) &&
                dName.includes(districtName.toLowerCase()))
            );
          });

          if (matched) {
            setSelected(matched.district_code);
            setLocationInfo({
              name: `${matched.district_name}, ${matched.state_name}`,
              coords: { latitude, longitude },
              time: new Date().toLocaleTimeString(),
            });

            if (!auto)
              alert(
                `✅ Found District:\n${matched.district_name}, ${matched.state_name}`
              );
          } else {
            if (!auto)
              alert(
                `⚠️ Found: ${districtName}, ${stateName}\nBut no match in dataset.`
              );
          }
        } catch (err) {
          console.error(err);
          if (!auto) alert("❌ Failed to detect district.");
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        console.error(err);
        if (!auto) alert("❌ Permission denied or unable to get location.");
        setDetecting(false);
      }
    );
  }

  // 🪄 Auto-detect on first load if not selected
  useEffect(() => {
    if (!selected && districts.length > 0) {
      detectLocation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districts]);

  return (
    <motion.main
      key="dashboard"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 py-10 relative"
    >
      {/* 🏷 Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <FaMapMarkerAlt className="text-green-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">
            MGNREGA District Dashboard
          </h1>
        </motion.div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <DistrictSelector districts={districts} onSelect={setSelected} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => detectLocation(false)}
            disabled={detecting}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold shadow transition-all ${
              detecting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <FaLocationArrow />
            {detecting ? "Detecting..." : "Detect My District"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-all"
          >
            <FaSyncAlt /> Refresh
          </motion.button>
        </div>
      </div>

      {/* 🧭 Floating Detected Location Card */}
      {locationInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-20 right-6 bg-white shadow-lg rounded-xl px-4 py-3 border-l-4 border-green-600 z-50"
        >
          <h4 className="font-semibold text-green-700 text-sm">
            📍 {locationInfo.name}
          </h4>
          <p className="text-gray-600 text-xs mt-1">
            Lat: {locationInfo.coords.latitude.toFixed(3)}, Lon:{" "}
            {locationInfo.coords.longitude.toFixed(3)}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Last updated: {locationInfo.time}
          </p>
        </motion.div>
      )}

      {/* 🧭 Dashboard Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-500"
          >
            Loading data...
          </motion.div>
        ) : !latest ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-20 text-lg"
          >
            Please select or detect your district to view performance data.
          </motion.p>
        ) : (
          <>
            {/* 📈 Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-blue-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Monthly Trends
                </h2>
              </div>
              <LineChart monthly={monthly} />
            </motion.div>

            {/* 📊 Small Charts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mt-10"
            >
              <WorkTypePie latest={latest} />
              <GenderChart latest={latest} />
              <SocialGroupChart latest={latest} />
            </motion.div>

            {/* 🌍 Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-16 text-gray-500 text-sm"
            >
              🌐 Data Source: Ministry of Rural Development | Location detection
              powered by Google Maps & OpenStreetMap
            </motion.footer>
          </>
        )}
      </div>
    </motion.main>
  );
}
