import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaPeopleCarry, FaUserFriends } from "react-icons/fa";

export default function SocialGroupChart({ latest }) {
  const sc = latest?.SC_persondays || 0;
  const st = latest?.ST_persondays || 0;
  const total =
    latest?.Persondays_of_Central_Liability_so_far || sc + st || 1;
  const others = Math.max(0, total - sc - st);

  const groups = useMemo(
    () => [
      {
        label: "Scheduled Castes (SC)",
        value: sc,
        color: "bg-purple-500",
        icon: <FaUsers className="text-purple-500" />,
      },
      {
        label: "Scheduled Tribes (ST)",
        value: st,
        color: "bg-green-500",
        icon: <FaPeopleCarry className="text-green-500" />,
      },
      {
        label: "Other Communities",
        value: others,
        color: "bg-blue-500",
        icon: <FaUserFriends className="text-blue-500" />,
      },
    ],
    [sc, st, others]
  );

  const totalValue = sc + st + others || 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        👥 Social Group Representation
      </h3>

      {/* Progress Bars */}
      <div className="space-y-4">
        {groups.map((g, idx) => {
          const percentage = ((g.value / totalValue) * 100).toFixed(1);
          return (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2"
            >
              <div className="flex items-center gap-2 min-w-[160px]">
                {g.icon}
                <span className="text-sm font-medium text-gray-700 truncate">
                  {g.label}
                </span>
              </div>
              <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                <motion.div
                  className={`${g.color} h-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600 text-right sm:w-12">
                {percentage}%
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="mt-5 text-xs text-gray-500 text-center sm:text-right">
        Total Persondays:{" "}
        <span className="font-semibold text-gray-700">{totalValue}</span>
      </div>
    </motion.div>
  );
}
