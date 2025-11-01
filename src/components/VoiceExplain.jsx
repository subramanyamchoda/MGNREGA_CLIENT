import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";

export default function VoiceExplain({ latest }) {
  const { t, i18n } = useTranslation();

  const speak = () => {
    if (!latest) return;

    const text = `${latest.district_name}: ${
      latest.Total_Individuals_Worked || 0
    } people worked this month and average wage was ${Math.round(
      latest.Average_Wage_rate_per_day_per_person || 0
    )} rupees per day.`;

    const utter = new SpeechSynthesisUtterance(text);

    // ✅ Select language voice dynamically
    utter.lang =
      i18n.language === "hi"
        ? "hi-IN"
        : i18n.language === "te"
        ? "te-IN"
        : "en-IN";

    // Stop any previous speech and play new
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  return (
    <motion.button
      onClick={speak}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-2 px-4 py-2.5 
                 bg-gradient-to-r from-blue-500 to-indigo-600 
                 text-white font-semibold rounded-xl shadow-md 
                 hover:from-blue-600 hover:to-indigo-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 
                 active:scale-95 transition-all duration-300
                 w-full sm:w-auto"
    >
      <FaVolumeUp className="text-lg sm:text-xl" />
      <span className="text-sm sm:text-base">
        {t("Explain (Audio)") || "Explain (Audio)"}
      </span>
    </motion.button>
  );
}
