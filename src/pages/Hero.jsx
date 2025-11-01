import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMapMarkedAlt,
  FaChartLine,
  FaLeaf,
  FaDatabase,
  FaHeart,
  FaGlobeAsia,
  FaHandsHelping,
} from "react-icons/fa";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden relative flex flex-col items-center justify-center px-6 sm:px-12 text-center">
      {/* 🌿 Floating Gradient Backgrounds */}
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse -z-10" />

      {/* 🌾 Tagline (Full Form) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="uppercase tracking-widest text-sm sm:text-base font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-full shadow-sm mb-5"
      >
        Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)
      </motion.div>

      {/* 🌾 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-800 leading-tight mb-6"
      >
        Empowering <span className="text-green-600">Rural India</span>
      </motion.h1>

      {/* 🪴 Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="max-w-3xl text-gray-600 text-lg sm:text-xl md:text-2xl leading-relaxed mb-10"
      >
        Driving inclusive growth, transparency, and empowerment through the{" "}
        <span className="font-semibold text-blue-600">
          MGNREGA Analytics Dashboard
        </span>
        — where <span className="text-green-600 font-semibold">data</span> meets{" "}
        <span className="text-green-600 font-semibold">development</span>.
      </motion.p>

      {/* 💡 CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.a
          href="/dashboard"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl font-semibold text-lg transition-all"
        >
          <FaChartLine /> Explore Dashboard
        </motion.a>
        <motion.a
          href="/about"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 border-2 border-green-500 text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-50 transition-all"
        >
          <FaHandsHelping /> Learn More
        </motion.a>
      </motion.div>

      {/* 🌍 Floating Decorative Icons */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-[15%] text-green-500 text-5xl opacity-20"
      >
        <FaDatabase />
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-[10%] text-blue-500 text-6xl opacity-20"
      >
        <FaMapMarkedAlt />
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[20%] text-yellow-500 text-4xl opacity-25"
      >
        <FaLeaf />
      </motion.div>

      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-12 right-[20%] text-pink-500 text-4xl opacity-25"
      >
        <FaGlobeAsia />
      </motion.div>

      {/* 🌱 Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-gray-500 text-sm flex items-center gap-1"
      >
        Made with <FaHeart className="text-red-500 animate-pulse" /> for Rural
        Development
      </motion.footer>
    </main>
  );
}
