import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartLine,
  FaBalanceScale,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
    { path: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { path: "/compare", label: "Compare", icon: <FaBalanceScale /> },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex justify-between items-center">
        {/* 🌾 Logo / Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-3 font-extrabold text-transparent text-lg sm:text-2xl bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src="/logo.png"
            alt="MGNREGA Logo"
            className="w-8 h-8 object-contain"
          />
          MGNREGA Dashboard
        </Link>

        {/* 🧭 Desktop Links */}
        <div className="hidden md:flex gap-8 items-center font-semibold tracking-wide">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-base transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-700 hover:text-green-600 hover:pb-1"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700 hover:text-green-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📲 Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl rounded-b-2xl"
          >
            <div className="flex flex-col px-6 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 text-lg font-medium transition-all rounded-md ${
                    location.pathname === link.path
                      ? "text-green-600 bg-green-50 px-3 py-2 shadow-sm"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600 px-3 py-2"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
