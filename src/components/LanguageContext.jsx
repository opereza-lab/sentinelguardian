import React, { createContext, useContext, useState, useEffect } from "react";

const LANG_KEY = "sg_lang";
const LANG_AUTO_KEY = "sg_lang_auto_done";

// Mapeo país → idioma
const COUNTRY_TO_LANG = {
  // Español
  AR: "es", BO: "es", CL: "es", CO: "es", CR: "es", CU: "es",
  DO: "es", EC: "es", SV: "es", GT: "es", HN: "es", MX: "es",
  NI: "es", PA: "es", PY: "es", PE: "es", ES: "es", UY: "es", VE: "es",
  // Portugués
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  // Francés
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", SN: "fr", CI: "fr", ML: "fr",
  // Italiano
  IT: "it",
  // Árabe
  SA: "ar", EG: "ar", AE: "ar", IQ: "ar", SY: "ar", JO: "ar",
  LB: "ar", MA: "ar", DZ: "ar", TN: "ar", LY: "ar", YE: "ar",
  // Chino
  CN: "zh", TW: "zh", HK: "zh", SG: "zh",
};

async function detectLangByLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          const countryCode = data.countryCode?.toUpperCase();
          const lang = COUNTRY_TO_LANG[countryCode] || "en";
          resolve(lang);
        } catch {
          resolve(null);
        }
      },
      () => resolve(null),
      { timeout: 5000, maximumAge: 60000 }
    );
  });
}

const translations = {
  es: {
    appName: "FamilyShield",
    appTagline: "Tu familia depende de ti. ¿Estás preparado?",
    nav: {
      home: "Inicio", shelters: "Refugios", threats: "Amenazas", water: "Agua Potable",
      food: "Provisiones", firstaid: "Primeros Auxilios", backpack: "Mochila SOS",
      maps: "Mapas Offline", compass: "Brújula Táctica", fire: "Fuego de Supervivencia",
      emergency: "Emergencias", sosProfile: "Perfil SOS", rescueDashboard: "Dashboard Rescate", developerPanel: "Panel Dev", survivalKnots: "Nudos de Supervivencia",
    },
    alertBanner: "⚠ ALERTA GLOBAL: Los conflictos armados están escalando. El tiempo de preparación es AHORA.",
    shopLabel: "Comprar en MercadoLibre",
    shopUrl: "https://www.mercadolibre.com/buscar?q=",
  },
  en: {
    appName: "FamilyShield",
    appTagline: "Your family depends on you. Are you prepared?",
    nav: {
      home: "Home", shelters: "Shelters", threats: "Threats", water: "Safe Water",
      food: "Provisions", firstaid: "First Aid", backpack: "Go-Bag",
      maps: "Offline Maps", compass: "Tactical Compass", fire: "Survival Fire",
      emergency: "Emergency", sosProfile: "SOS Profile", rescueDashboard: "Rescue Dashboard", developerPanel: "Dev Panel", survivalKnots: "Survival Knots",
    },
    alertBanner: "⚠ GLOBAL ALERT: Armed conflicts are escalating. Your preparation window is NOW.",
    shopLabel: "Buy on Amazon",
    shopUrl: "https://www.amazon.com/s?k=",
  },
  pt: {
    appName: "FamilyShield", appTagline: "Sua família depende de você. Você está preparado?",
    nav: {
      home: "Início", shelters: "Abrigos", threats: "Ameaças", water: "Água Potável",
      food: "Provisões", firstaid: "Primeiros Socorros", backpack: "Mochila SOS",
      maps: "Mapas Offline", compass: "Bússola Tática", fire: "Fogo de Sobrevivência",
      emergency: "Emergências", sosProfile: "Perfil SOS", rescueDashboard: "Painel Resgate", developerPanel: "Painel Dev", survivalKnots: "Nós de Sobrevivência",
    },
    alertBanner: "⚠ ALERTA GLOBAL: Conflitos armados estão escalando. O tempo de preparação é AGORA.",
    shopLabel: "Comprar", shopUrl: "https://www.amazon.com/s?k=",
  },
  it: {
    appName: "FamilyShield", appTagline: "La tua famiglia dipende da te. Sei preparato?",
    nav: {
      home: "Home", shelters: "Rifugi", threats: "Minacce", water: "Acqua Potabile",
      food: "Provviste", firstaid: "Pronto Soccorso", backpack: "Zaino SOS",
      maps: "Mappe Offline", compass: "Bussola Tattica", fire: "Fuoco di Sopravvivenza",
      emergency: "Emergenze", sosProfile: "Profilo SOS", rescueDashboard: "Dashboard Soccorso", developerPanel: "Pannello Dev", survivalKnots: "Nodi di Sopravvivenza",
    },
    alertBanner: "⚠ ALLERTA GLOBALE: I conflitti armati stanno escalando. Il momento di prepararsi è ORA.",
    shopLabel: "Acquista", shopUrl: "https://www.amazon.it/s?k=",
  },
  fr: {
    appName: "FamilyShield", appTagline: "Votre famille dépend de vous. Êtes-vous prêt?",
    nav: {
      home: "Accueil", shelters: "Abris", threats: "Menaces", water: "Eau Potable",
      food: "Provisions", firstaid: "Premiers Secours", backpack: "Sac SOS",
      maps: "Cartes Offline", compass: "Boussole Tactique", fire: "Feu de Survie",
      emergency: "Urgences", sosProfile: "Profil SOS", rescueDashboard: "Tableau Secours", developerPanel: "Panneau Dev", survivalKnots: "Nœuds de Survie",
    },
    alertBanner: "⚠ ALERTE MONDIALE: Les conflits armés s'intensifient. Le moment de se préparer, c'est MAINTENANT.",
    shopLabel: "Acheter", shopUrl: "https://www.amazon.fr/s?k=",
  },
  ar: {
    appName: "FamilyShield", appTagline: "عائلتك تعتمد عليك. هل أنت مستعد؟",
    nav: {
      home: "الرئيسية", shelters: "الملاجئ", threats: "التهديدات", water: "مياه آمنة",
      food: "المؤن", firstaid: "الإسعافات الأولية", backpack: "حقيبة الطوارئ",
      maps: "خرائط أوفلاين", compass: "البوصلة", fire: "نار البقاء",
      emergency: "الطوارئ", sosProfile: "ملف SOS", rescueDashboard: "لوحة الإنقاذ", developerPanel: "لوحة المطور", survivalKnots: "عقد البقاء",
    },
    alertBanner: "⚠ تحذير عالمي: النزاعات المسلحة تتصاعد. وقت التحضير هو الآن.",
    shopLabel: "شراء", shopUrl: "https://www.amazon.com/s?k=",
  },
  zh: {
    appName: "FamilyShield", appTagline: "您的家人依赖您。您准备好了吗？",
    nav: {
      home: "首页", shelters: "避难所", threats: "威胁", water: "安全用水",
      food: "物资", firstaid: "急救", backpack: "应急包",
      maps: "离线地图", compass: "战术罗盘", fire: "求生火",
      emergency: "紧急情况", sosProfile: "SOS档案", rescueDashboard: "救援仪表板", developerPanel: "开发面板", survivalKnots: "求生绳结",
    },
    alertBanner: "⚠ 全球警报：武装冲突正在升级。准备时间就是现在。",
    shopLabel: "购买", shopUrl: "https://www.amazon.com/s?k=",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return saved && translations[saved] ? saved : null; // null = aún no determinado
    } catch {
      return "es";
    }
  });

  const [langReady, setLangReady] = useState(false);

  useEffect(() => {
    const autoDone = localStorage.getItem(LANG_AUTO_KEY);
    if (lang && autoDone) {
      // Ya tiene idioma guardado y ya se hizo auto-detección antes
      setLangReady(true);
      return;
    }
    // Primera vez o sin idioma guardado → detectar por ubicación
    detectLangByLocation().then((detected) => {
      const finalLang = detected || lang || "es";
      setLangState(finalLang);
      try {
        localStorage.setItem(LANG_KEY, finalLang);
        localStorage.setItem(LANG_AUTO_KEY, "1");
      } catch {}
      setLangReady(true);
    });
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    try { localStorage.setItem(LANG_KEY, newLang); } catch {}
  };

  const t = translations[lang] || translations["es"];

  if (!langReady) return null; // Espera breve mientras detecta

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
