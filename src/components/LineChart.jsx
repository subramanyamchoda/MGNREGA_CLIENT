import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function LineChart({ monthly = [] }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Month order reference
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // ✅ Sort chronologically
  const sorted = useMemo(() => {
    return [...monthly].sort((a, b) => {
      if (a.fin_year === b.fin_year)
        return months.indexOf(a.month) - months.indexOf(b.month);
      return a.fin_year.localeCompare(b.fin_year);
    });
  }, [monthly]);

  const allLabels = sorted.map((r) => `${r.month} ${r.fin_year}`);

  // ✅ Filter data up to selected month
  const filtered = useMemo(() => {
    if (selectedMonth === "All") return sorted;
    const index = allLabels.findIndex((l) => l === selectedMonth);
    return index >= 0 ? sorted.slice(0, index + 1) : sorted;
  }, [selectedMonth, sorted, allLabels]);

  const labels = filtered.map((r) => `${r.month} ${r.fin_year}`);
  const workers = filtered.map((r) => r.Total_Individuals_Worked || 0);
  const wages = filtered.map((r) => r.Wages || 0);

  // ✅ Create smooth gradients dynamically
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    const ctx = chart.ctx;

    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 300);
    gradientGreen.addColorStop(0, "rgba(34,197,94,0.8)");
    gradientGreen.addColorStop(1, "rgba(34,197,94,0.1)");

    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, "rgba(59,130,246,0.8)");
    gradientBlue.addColorStop(1, "rgba(59,130,246,0.1)");

    setChartData({
      labels,
      datasets: [
        {
          label: "Workers 👷‍♂️",
          data: workers,
          borderColor: "#22c55e",
          backgroundColor: gradientGreen,
          pointBackgroundColor: "#16a34a",
          pointRadius: 4,
          fill: true,
          tension: 0.35,
        },
        {
          label: "Wages 💰",
          data: wages,
          borderColor: "#3b82f6",
          backgroundColor: gradientBlue,
          pointBackgroundColor: "#2563eb",
          pointRadius: 4,
          borderDash: [6, 4],
          fill: true,
          tension: 0.35,
        },
      ],
    });
  }, [filtered]); // Only re-run when filtered data changes

  // ✅ Chart options
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#374151",
            usePointStyle: true,
            font: { size: 12, family: "Inter, sans-serif" },
          },
        },
        tooltip: {
          backgroundColor: "rgba(17,24,39,0.9)",
          titleColor: "#fff",
          bodyColor: "#f3f4f6",
          cornerRadius: 8,
          padding: 12,
          displayColors: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#6b7280",
            font: { size: 11 },
            maxRotation: 45,
            minRotation: 30,
          },
          grid: { display: false },
        },
        y: {
          ticks: { color: "#6b7280", font: { size: 11 } },
          grid: { color: "rgba(209,213,219,0.3)", drawBorder: false },
        },
      },
      animation: {
        duration: 900,
        easing: "easeInOutCubic",
      },
    }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl sm:text-3xl">📈</span>
          <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
            Performance Trend
          </h3>
        </div>

        {/* Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm text-gray-700 px-3 py-1.5 
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 
                     transition-all bg-white hover:border-blue-400"
        >
          <option value="All">All Months</option>
          {allLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="h-[280px] sm:h-[340px] md:h-[400px]">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      {/* Highlight Selected Month */}
      {selectedMonth !== "All" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-gray-500"
        >
          Showing data up to{" "}
          <span className="font-medium text-green-700">{selectedMonth}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
