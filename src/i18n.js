import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          Compare: "Compare",
          Workers: "Workers",
          Wages: "Wages",
          Works: "Works",
          Agriculture: "Agriculture",
        },
      },
      hi: {
        translation: {
          Compare: "तुलना करें",
          Workers: "मज़दूर",
          Wages: "मज़दूरी",
          Works: "कार्य",
          Agriculture: "कृषि",
        },
      },
      te: {
        translation: {
          Compare: "తులన చేయండి",
          Workers: "కూలీలు",
          Wages: "వేతనాలు",
          Works: "పనులు",
          Agriculture: "వ్యవసాయం",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
