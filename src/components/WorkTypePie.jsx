import React, { useMemo, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { FaLeaf, FaWater, FaHammer, FaCogs } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend);

export default function WorkTypePie({ latest }) {
  const chartRef = useRef(null);

  // Extract safe values
  const agriculture = latest?.percent_of_Expenditure_on_Agriculture_Allied_Works || 0;
  const nrm = latest?.percent_of_NRM_Expenditure || 0;
  const categoryB = latest?.percent_of_Category_B_Works || 0;
  const other = Math.max(0, 100 - (agriculture + nrm + categoryB));

  const data = useMemo(() => {
    const colors = [
      "rgba(34,197,94,0.9)",   // Green
      "rgba(59,130,246,0.9)",  // Blue
      "rgba(249,115,22,0.9)",  // Orange
      "rgba(148,163,184,0.9)", // Gray
    ];
    return {
      labels: ["Agriculture", "NRM", "Category B", "Other"],
      datasets: [
        {
          data: [agriculture, nrm, categoryB, other],
          backgroundColor: colors,
          hoverBackgroundColor: colors.map((c) => c.replace("0.9", "1")),
          borderWidth: 3,
          borderColor: "#fff",
          hoverOffset: 10,
        },
      ],
    };
  }, [agriculture, nrm, categoryB, other]);

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17,24,39,0.85)",
        titleColor: "#fff",
        bodyColor: "#f3f4f6",
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed.toFixed(1)}%`,
        },
      },
    },
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1200,
      easing: "easeOutQuart",
    },
  };

  const items = [
    { icon: FaLeaf, color: "text-green-500", label: "Agriculture", val: agriculture },
    { icon: FaWater, color: "text-blue-500", label: "NRM", val: nrm },
    { icon: FaHammer, color: "text-orange-500", label: "Category B", val: categoryB },
    { icon: FaCogs, color: "text-gray-500", label: "Other", val: other },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-5 md:p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between"
    >
      <h3 className="font-semibold text-gray-700 text-lg mb-3 flex items-center gap-2">
        🔨 Work Type Breakdown
      </h3>

      {/* Chart + Legends */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
        {/* Chart Section */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 mx-auto">
          <Pie ref={chartRef} data={data} options={options} />
        </div>

        {/* Legend Section */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 w-full sm:w-1/2 mt-4 sm:mt-0">
          {items.map(({ icon: Icon, color, label, val }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 hover:bg-gray-100 transition-all"
            >
              <Icon className={`${color} w-5 h-5`} />
              <div>
                <div className="text-sm font-medium text-gray-700">{label}</div>
                <div className="text-xs text-gray-500">{val.toFixed(1)}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
