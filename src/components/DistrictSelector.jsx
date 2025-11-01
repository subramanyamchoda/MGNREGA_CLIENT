import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function DistrictSelector({ districts = [], onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto"
    >
      {/* Label */}
      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 flex items-center gap-2">
        <FaMapMarkerAlt className="text-green-600 text-lg sm:text-xl" />
        <span className="truncate">Select District</span>
      </label>

      {/* Dropdown */}
      <motion.select
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.01 }}
        onChange={(e) => onSelect(e.target.value)}
        className="
          w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-300 
          bg-white shadow-sm text-gray-700 text-sm sm:text-base font-medium
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400
          transition-all duration-300 cursor-pointer
          hover:border-green-400 hover:shadow-md
          appearance-none
        "
      >
        <option value="">🌍 Choose your district</option>
        {districts.map((d) => (
          <option
            key={d.district_code}
            value={d.district_code}
            className="text-gray-700"
          >
            {d.district_name} — {d.state_name}
          </option>
        ))}
      </motion.select>

      {/* Animated gradient border accent */}
      <motion.div
        layoutId="selectorBorder"
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Mobile friendly dropdown icon */}
      <div className="absolute right-3 top-[42px] sm:top-[46px] pointer-events-none text-gray-400">
        ▼
      </div>
    </motion.div>
  );
}
