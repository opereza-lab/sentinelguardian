import React, { useState, useEffect, useRef } from "react";
import { Radio } from "lucide-react";
import { useLang } from "./LanguageContext";

const HEADLINES = {
  es: [
    { title: "Conflictos armados continúan escalando en múltiples regiones del mundo", url: "https://www.bbc.com/news/world" },
    { title: "Alerta de emergencia: autoridades piden preparación ante posibles crisis", url: "https://www.reuters.com" },
    { title: "Expertos recomiendan tener reservas de agua y alimentos para 72 horas", url: "https://www.who.int" },
    { title: "Nuevas tensiones geopolíticas aumentan riesgo de conflicto internacional", url: "https://www.reuters.com/world" },
    { title: "Sistemas de alerta temprana activados en zonas de riesgo sísmico", url: "https://www.usgs.gov" },
    { title: "Protección civil refuerza protocolos de evacuación en ciudades costeras", url: "https://www.bbc.com/news" },
    { title: "Ciberataques a infraestructura crítica aumentan preocupación global", url: "https://www.reuters.com/technology" },
    { title: "Cruz Roja llama a fortalecer preparación familiar ante emergencias", url: "https://www.icrc.org" },
    { title: "Guía oficial: cómo preparar una mochila de emergencia para tu familia", url: "https://www.ready.gov" },
    { title: "Alertas meteorológicas extremas activas en varias regiones", url: "https://www.weather.gov" },
    { title: "ONU advierte sobre aumento de desplazados por conflictos armados", url: "https://www.unhcr.org" },
  ],
  en: [
    { title: "Armed conflicts continue escalating in multiple regions worldwide", url: "https://www.bbc.com/news/world" },
    { title: "Emergency alert: authorities urge preparation for possible crises", url: "https://www.reuters.com" },
    { title: "Experts recommend maintaining 72-hour water and food reserves", url: "https://www.who.int" },
    { title: "Rising geopolitical tensions increase risk of international conflict", url: "https://www.reuters.com/world" },
    { title: "Early warning systems activated in high seismic risk zones", url: "https://www.usgs.gov" },
    { title: "Civil protection reinforces evacuation protocols in coastal cities", url: "https://www.bbc.com/news" },
    { title: "Cyberattacks on critical infrastructure raise global concerns", url: "https://www.reuters.com/technology" },
    { title: "Red Cross calls for strengthening family emergency preparedness", url: "https://www.icrc.org" },
    { title: "Official guide: how to prepare an emergency go-bag for your family", url: "https://www.ready.gov" },
    { title: "Extreme weather alerts active across multiple regions", url: "https://www.weather.gov" },
    { title: "UN warns of increasing displacement due to armed conflicts", url: "https://www.unhcr.org" },
  ],
  fr: [
    { title: "Les conflits armés continuent d'escalader dans plusieurs régions du monde", url: "https://www.bbc.com/news/world" },
    { title: "Alerte d'urgence: les autorités demandent une préparation aux crises éventuelles", url: "https://www.reuters.com" },
    { title: "Les experts recommandent des réserves d'eau et de nourriture pour 72 heures", url: "https://www.who.int" },
    { title: "Les tensions géopolitiques croissantes augmentent le risque de conflit international", url: "https://www.reuters.com/world" },
    { title: "Systèmes d'alerte précoce activés dans les zones à risque sismique", url: "https://www.usgs.gov" },
    { title: "La protection civile renforce les protocoles d'évacuation dans les villes côtières", url: "https://www.bbc.com/news" },
    { title: "Les cyberattaques contre les infrastructures critiques augmentent les inquiétudes mondiales", url: "https://www.reuters.com/technology" },
    { title: "La Croix-Rouge appelle à renforcer la préparation aux urgences familiales", url: "https://www.icrc.org" },
    { title: "Guide officiel: comment préparer un sac d'urgence pour votre famille", url: "https://www.ready.gov" },
    { title: "Alertes météorologiques extrêmes actives dans plusieurs régions", url: "https://www.weather.gov" },
    { title: "L'ONU avertit de l'augmentation des déplacements dus aux conflits armés", url: "https://www.unhcr.org" },
  ],
  pt: [
    { title: "Conflitos armados continuam escalando em múltiplas regiões do mundo", url: "https://www.bbc.com/news/world" },
    { title: "Alerta de emergência: autoridades pedem preparação para possíveis crises", url: "https://www.reuters.com" },
    { title: "Especialistas recomendam manter reservas de água e alimentos para 72 horas", url: "https://www.who.int" },
    { title: "Novas tensões geopolíticas aumentam o risco de conflito internacional", url: "https://www.reuters.com/world" },
    { title: "Sistemas de alerta precoce ativados em zonas de alto risco sísmico", url: "https://www.usgs.gov" },
    { title: "Proteção civil reforça protocolos de evacuação em cidades costeiras", url: "https://www.bbc.com/news" },
    { title: "Ciberataques à infraestrutura crítica aumentam preocupação global", url: "https://www.reuters.com/technology" },
    { title: "Cruz Vermelha pede fortalecimento da preparação familiar para emergências", url: "https://www.icrc.org" },
    { title: "Guia oficial: como preparar uma mochila de emergência para sua família", url: "https://www.ready.gov" },
    { title: "Alertas meteorológicos extremos ativos em várias regiões", url: "https://www.weather.gov" },
    { title: "ONU alerta sobre aumento de deslocados por conflitos armados", url: "https://www.unhcr.org" },
  ],
  it: [
    { title: "I conflitti armati continuano ad escalare in più regioni del mondo", url: "https://www.bbc.com/news/world" },
    { title: "Allerta di emergenza: le autorità chiedono preparazione a possibili crisi", url: "https://www.reuters.com" },
    { title: "Gli esperti raccomandano riserve di acqua e cibo per 72 ore", url: "https://www.who.int" },
    { title: "Nuove tensioni geopolitiche aumentano il rischio di conflitto internazionale", url: "https://www.reuters.com/world" },
    { title: "Sistemi di allerta precoce attivati nelle zone ad alto rischio sismico", url: "https://www.usgs.gov" },
    { title: "La protezione civile rafforza i protocolli di evacuazione nelle città costiere", url: "https://www.bbc.com/news" },
    { title: "Cyberattacchi alle infrastrutture critiche aumentano le preoccupazioni globali", url: "https://www.reuters.com/technology" },
    { title: "La Croce Rossa chiede di rafforzare la preparazione familiare alle emergenze", url: "https://www.icrc.org" },
    { title: "Guida ufficiale: come preparare uno zaino di emergenza per la famiglia", url: "https://www.ready.gov" },
    { title: "Allerte meteorologiche estreme attive in più regioni", url: "https://www.weather.gov" },
    { title: "L'ONU avverte dell'aumento degli sfollati a causa dei conflitti armati", url: "https://www.unhcr.org" },
  ],
  ar: [
    { title: "النزاعات المسلحة تتصاعد في مناطق متعددة حول العالم", url: "https://www.bbc.com/news/world" },
    { title: "تحذير طوارئ: السلطات تطالب بالاستعداد لأزمات محتملة", url: "https://www.reuters.com" },
    { title: "الخبراء يوصون بالاحتفاظ باحتياطيات مياه وغذاء لمدة 72 ساعة", url: "https://www.who.int" },
    { title: "التوترات الجيوسياسية المتصاعدة تزيد من خطر النزاع الدولي", url: "https://www.reuters.com/world" },
    { title: "تفعيل أنظمة الإنذار المبكر في مناطق الخطر الزلزالي", url: "https://www.usgs.gov" },
    { title: "الحماية المدنية تعزز بروتوكولات الإخلاء في المدن الساحلية", url: "https://www.bbc.com/news" },
    { title: "الهجمات الإلكترونية على البنية التحتية الحيوية تثير مخاوف عالمية", url: "https://www.reuters.com/technology" },
    { title: "الصليب الأحمر يدعو إلى تعزيز الاستعداد الأسري لحالات الطوارئ", url: "https://www.icrc.org" },
    { title: "دليل رسمي: كيفية إعداد حقيبة طوارئ لعائلتك", url: "https://www.ready.gov" },
    { title: "تحذيرات طقس متطرفة نشطة في مناطق متعددة", url: "https://www.weather.gov" },
    { title: "الأمم المتحدة تحذر من تزايد النازحين بسبب النزاعات المسلحة", url: "https://www.unhcr.org" },
  ],
  zh: [
    { title: "武装冲突在全球多个地区继续升级", url: "https://www.bbc.com/news/world" },
    { title: "紧急警报：当局呼吁为可能发生的危机做好准备", url: "https://www.reuters.com" },
    { title: "专家建议储备72小时的水和食物储备", url: "https://www.who.int" },
    { title: "地缘政治紧张局势加剧国际冲突风险", url: "https://www.reuters.com/world" },
    { title: "高地震风险地区早期预警系统启动", url: "https://www.usgs.gov" },
    { title: "民防加强沿海城市疏散协议", url: "https://www.bbc.com/news" },
    { title: "关键基础设施遭受网络攻击引发全球担忧", url: "https://www.reuters.com/technology" },
    { title: "红十字会呼吁加强家庭应急准备", url: "https://www.icrc.org" },
    { title: "官方指南：如何为家人准备应急包", url: "https://www.ready.gov" },
    { title: "多个地区极端天气警报生效", url: "https://www.weather.gov" },
    { title: "联合国警告武装冲突造成流离失所人数增加", url: "https://www.unhcr.org" },
  ],
};

const LIVE_LABEL = {
  es: "EN VIVO",
  en: "LIVE",
  fr: "EN DIRECT",
  pt: "AO VIVO",
  it: "IN DIRETTA",
  ar: "مباشر",
  zh: "直播",
};

export default function NewsTicker() {
  const { lang } = useLang();
  const headlines = HEADLINES[lang] || HEADLINES["en"];
  const liveLabel = LIVE_LABEL[lang] || LIVE_LABEL["en"];
  const items = [...headlines, ...headlines];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-8 flex items-center overflow-hidden ticker-red-pulse" style={{background: "hsl(0 72% 20%)", borderTop: "2px solid hsl(0 72% 45%)"}}>
      {/* Label */}
      <div className="flex items-center gap-1.5 px-3 h-full flex-shrink-0" style={{background: "hsl(0 72% 45%)"}}>
        <Radio className="w-3 h-3 text-white animate-pulse" />
        <span className="text-white font-military text-xs tracking-widest uppercase">{liveLabel}</span>
      </div>

      {/* Scrolling area */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div
          className="flex items-center gap-0 whitespace-nowrap"
          style={{
            animation: `tickerScroll ${headlines.length * 8}s linear infinite`,
          }}
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs text-white hover:text-red-300 transition-colors cursor-pointer px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-red-400 font-bold">▸</span>
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes redPulse {
          0%, 100% { box-shadow: 0 0 8px 2px hsl(0 72% 45% / 0.6); }
          50% { box-shadow: 0 0 18px 6px hsl(0 72% 45% / 0.9); }
        }
        .ticker-red-pulse {
          animation: redPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
