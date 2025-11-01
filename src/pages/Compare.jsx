import React, { useEffect, useState } from "react";
import axios from "axios";
import CompareModal from "../components/CompareModal";
import { motion } from "framer-motion";
import {
  FaBalanceScale,
  FaMapMarkedAlt,
  FaSyncAlt,
  FaChartBar,
  FaGlobeAsia,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "https://mgnrega-0yrr.onrender.com/api";

export default function Compare() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const r = await axios.get(`${API}/districts`);
        setDistricts(r.data);
      } catch (err) {
        console.error("Failed to fetch districts:", err);
        setError("❌ Failed to load districts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchDistricts();
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden"
    >
      {/* 🌈 Animated Gradient Blobs */}
      <motion.div
        className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-green-300/40 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-blue-400/40 rounded-full blur-3xl -z-10"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🏷️ Header Section */}
      <div className="max-w-6xl mx-auto px-6 pt-3 pb-2 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 text-4xl text-green-600">
            <FaBalanceScale className="drop-shadow-md" />
            <FaChartBar className="drop-shadow-md text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight leading-snug">
            District <span className="text-green-600">Comparison</span> Dashboard
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 max-w-2xl text-gray-600 text-lg sm:text-xl leading-relaxed"
        >
          Compare the performance of multiple districts under{" "}
          <span className="font-semibold text-blue-600">
            MGNREGA — Mahatma Gandhi National Rural Employment Guarantee Act
          </span>{" "}
          using real-time analytics and beautiful visualizations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-center gap-3"
        >
          <FaMapMarkedAlt className="text-blue-600 text-xl animate-bounce" />
          <p className="text-sm text-gray-500 italic">
            “Empowering insights for rural progress.” 🌾
          </p>
        </motion.div>
      </div>

      {/* 💡 Main Comparison Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <div className="w-14 h-14 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              Loading district data...
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-600 mt-20 font-semibold text-lg"
          >
            {error}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <CompareModal districts={districts} api={API} />
          </motion.div>
        )}
      </div>

      {/* 🌍 Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-4 w-full text-center text-sm text-gray-500 flex items-center justify-center gap-2"
      >
        <FaGlobeAsia className="text-green-600" />
        Data Source: Ministry of Rural Development | Designed with 💚 for India
      </motion.footer>
    </motion.main>
  );
}
