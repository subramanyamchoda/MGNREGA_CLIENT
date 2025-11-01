import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBalanceScale,
  FaChartBar,
  FaMapMarkerAlt,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaGlobeAsia,
} from "react-icons/fa";

export default function CompareSection({ districts = [], api }) {
  const [selected, setSelected] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function runCompare() {
    if (!selected.length) return;
    setLoading(true);
    try {
      const qs = selected.join(",");
      const r = await axios.get(`${api}/compare?districts=${qs}`);
      setCompareData(r.data);
    } catch (err) {
      console.error("Compare failed", err);
      alert("⚠️ Failed to fetch comparison data.");
    } finally {
      setLoading(false);
    }
  }

  function toggleDistrict(code) {
    setCompareData([]); // Reset results when changing selection
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code]
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100"
    >
      {/* 🌿 Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-full">
            <FaBalanceScale className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Compare Districts
          </h2>
        </div>

        {compareData.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCompareData([]);
              setSelected([]);
            }}
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg font-medium shadow-sm transition-all"
          >
            <FaTimes /> Reset
          </motion.button>
        )}
      </div>

      {/* 🗺️ District Selection Grid */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto border border-gray-200 rounded-2xl p-4 bg-white/70 backdrop-blur-sm shadow-inner"
      >
        {districts.map((d) => {
          const code = Number(d.district_code);
          const isSelected = selected.includes(code);

          return (
            <motion.label
              key={code}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => toggleDistrict(code)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-green-100 to-green-200 border-green-500 shadow-md"
                  : "hover:bg-green-50 border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleDistrict(code)}
                className="hidden"
              />
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                  isSelected
                    ? "bg-green-500 border-green-500"
                    : "border-gray-400"
                }`}
              >
                {isSelected && (
                  <FaCheckCircle className="text-white text-xs" />
                )}
              </span>
              <div className="text-sm sm:text-base text-gray-700 font-medium truncate">
                {d.district_name}{" "}
                <span className="text-gray-500 text-xs">
                  ({d.state_name})
                </span>
              </div>
            </motion.label>
          );
        })}
      </motion.div>

      {/* 🔘 Action Button */}
      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start"
      >
        <motion.button
          whileHover={{ scale: selected.length ? 1.07 : 1 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading || !selected.length}
          onClick={runCompare}
          className={`px-6 py-2.5 rounded-full font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
            selected.length
              ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Comparing...
            </>
          ) : (
            <>
              <FaChartBar /> Compare Selected
            </>
          )}
        </motion.button>
      </motion.div>

      {/* 🧭 Comparison Results */}
      <AnimatePresence>
        {compareData.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {compareData.map((cd, idx) => (
              <motion.div
                key={cd.district_code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                }}
                className="relative overflow-hidden bg-white rounded-2xl p-5 shadow-lg border-t-4 border-blue-500"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-blue-100/30 opacity-50 -z-10" />

                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg text-gray-800 truncate">
                    {cd.district_name}
                  </h4>
                  <FaMapMarkerAlt className="text-green-600 text-xl" />
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">👷 Workers:</span>{" "}
                  <span className="font-semibold text-green-700">
                    {Math.round(cd.Total_Individuals_Worked || 0).toLocaleString()}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">💰 Wages:</span>{" "}
                  <span className="font-semibold text-blue-700">
                    ₹{Math.round((cd.Wages || 0) * 100) / 100}
                  </span>
                </p>

                <motion.div
                  className="mt-4 flex items-center gap-2 text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FaGlobeAsia className="text-green-500" /> Updated in real time
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
