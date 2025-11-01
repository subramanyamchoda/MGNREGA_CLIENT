import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaMapMarkedAlt, FaLeaf, FaChartLine, FaHeart } from "react-icons/fa";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:px-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4"
        >
          About <span className="text-green-600">MGNREGA Dashboard</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed"
        >
          Empowering transparency and insights into rural employment under the{" "}
          <span className="font-semibold text-blue-600">
            Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)
          </span>
          . Explore district-level data, worker participation, and progress in
          real-time.
        </motion.p>

        {/* Decorative Gradient Orb */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 sm:px-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          What Makes This Dashboard Special
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaUsers className="text-green-500 text-4xl" />,
              title: "Inclusive Representation",
              desc: "Visualize gender and social group participation across districts for a more inclusive development story.",
            },
            {
              icon: <FaMapMarkedAlt className="text-blue-500 text-4xl" />,
              title: "District-Level Insights",
              desc: "Dive deep into each district’s performance metrics, employment generation, and expenditure trends.",
            },
            {
              icon: <FaChartLine className="text-purple-500 text-4xl" />,
              title: "Interactive Analytics",
              desc: "Experience smooth charts and real-time comparisons powered by Chart.js and Framer Motion animations.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-transparent hover:border-green-500"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {item.icon}
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Our Mission
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed mb-8 text-blue-50"
          >
            To bridge the gap between data and decision-making by presenting
            MGNREGA statistics in a transparent, accessible, and engaging way.
            Every visualization aims to promote accountability and empower
            citizens with knowledge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:bg-green-50 transition-all"
          >
            <FaLeaf className="text-green-600 text-xl" />
            Building Sustainable Rural Futures
          </motion.div>
        </div>

        {/* Background blur accents */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="flex justify-center mb-3">
            <FaHeart className="text-red-500 animate-pulse text-xl" />
          </div>
          Built with ❤️ using{" "}
          <span className="text-green-600 font-semibold">React</span>,{" "}
          <span className="text-blue-600 font-semibold">TailwindCSS</span>, and{" "}
          <span className="text-purple-600 font-semibold">Framer Motion</span>.
        </motion.div>
      </footer>
    </main>
  );
}
