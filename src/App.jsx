import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Hero from "./pages/Hero";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <Navbar />

        {/* Animated page transitions */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compare" element={<Compare />} />
            
            <Route path="/about" element={<About />} />
            
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
