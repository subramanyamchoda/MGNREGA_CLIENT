import React, { useRef, useMemo } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GenderChart({ latest }) {
  const chartRef = useRef(null);

  // Extract values safely
  const women = latest?.Women_Persondays || 0;
  const total =
    latest?.Persondays_of_Central_Liability_so_far ||
    latest?.Total_Individuals_Worked ||
    0;
  const men = Math.max(0, total - women);

  // ✅ Prepare data dynamically with gradient fill
  const data = useMemo(() => {
    const chart = chartRef.current;
    const ctx = chart?.ctx;

    let gradientMen = "rgba(59,130,246,0.8)";
    let gradientWomen = "rgba(236,72,153,0.8)";

    if (ctx) {
      gradientMen = ctx.createLinearGradient(0, 0, 0, 400);
      gradientMen.addColorStop(0, "rgba(59,130,246,0.9)");
      gradientMen.addColorStop(1, "rgba(59,130,246,0.2)");

      gradientWomen = ctx.createLinearGradient(0, 0, 0, 400);
      gradientWomen.addColorStop(0, "rgba(236,72,153,0.9)");
      gradientWomen.addColorStop(1, "rgba(236,72,153,0.2)");
    }

    return {
      labels: ["Men 👨‍🌾", "Women 👩‍🌾"],
      datasets: [
        {
          label: "Person-days",
          data: [men, women],
          backgroundColor: [gradientMen, gradientWomen],
          borderRadius: 14,
          borderSkipped: false,
          barThickness: "flex",
        },
      ],
    };
  }, [men, women]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17,24,39,0.85)",
        titleColor: "#fff",
        bodyColor: "#f3f4f6",
        cornerRadius: 8,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.formattedValue} person-days`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
          font: { size: 13, weight: 600 },
          maxRotation: 0,
        },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#6b7280", font: { size: 12 } },
        grid: { color: "rgba(209,213,219,0.3)", drawBorder: false },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-7 hover:shadow-xl transition-all duration-300 w-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
          👩‍🌾 Gender Participation
        </h3>
        <span className="text-xs sm:text-sm text-gray-500 italic">
          {latest?.district_name
            ? `District: ${latest.district_name}`
            : "Data not available"}
        </span>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72 md:h-80 w-full">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      {/* Legend Summary */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-gray-700">
        <div className="flex items-center justify-center sm:justify-start gap-2 bg-blue-50 rounded-lg py-2 px-3">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span>
            <strong>Men:</strong> {men.toLocaleString()} person-days
          </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-2 bg-pink-50 rounded-lg py-2 px-3">
          <span className="w-3 h-3 rounded-full bg-pink-500"></span>
          <span>
            <strong>Women:</strong> {women.toLocaleString()} person-days
          </span>
        </div>
      </div>
    </motion.div>
  );
}
