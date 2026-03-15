import React, { useState, useEffect, useRef } from "react";
import { Radio } from "lucide-react";

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

const STATIC_HEADLINES = [
  { title: "Conflictos armados continúan escalando en múltiples regiones del mundo", url: "https://www.bbc.com/news/world" },
  { title: "Alerta de emergencia: autoridades piden preparación ante posibles crisis", url: "https://www.reuters.com" },
  { title: "Expertos recomiendan tener reservas de agua y alimentos para 72 horas", url: "https://www.who.int" },
  { title: "Nuevas tensiones geopolíticas aumentan riesgo de conflicto internacional", url: "https://www.reuters.com/world" },
  { title: "Sistemas de alerta temprana activados en zonas de riesgo sísmico", url: "https://www.usgs.gov" },
  { title: "Protección civil refuerza protocolos de evacuación en ciudades costeras", url: "https://www.bbc.com/news" },
  { title: "Ciberataques a infraestructura crítica aumentan preocupación global", url: "https://www.reuters.com/technology" },
  { title: "Cruz Roja llama a fortalecer preparación familiar ante emergencias", url: "https://www.icrc.org" },
  { title: "Tecnologías de comunicación de emergencia en zonas sin cobertura", url: "https://www.bbc.com" },
  { title: "Guía oficial: cómo preparar una mochila de emergencia para tu familia", url: "https://www.ready.gov" },
  { title: "Alertas meteorológicas extremas activas en varias regiones", url: "https://www.weather.gov" },
  { title: "ONU advierte sobre aumento de desplazados por conflictos armados", url: "https://www.unhcr.org" },
];

export default function NewsTicker() {
  const [headlines] = useState(STATIC_HEADLINES);
  const tickerRef = useRef(null);

  const items = [...headlines, ...headlines];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-8 flex items-center overflow-hidden ticker-red-pulse" style={{background: "hsl(0 72% 20%)", borderTop: "2px solid hsl(0 72% 45%)"}}>
      {/* Label */}
      <div className="flex items-center gap-1.5 px-3 h-full flex-shrink-0" style={{background: "hsl(0 72% 45%)"}}>
        <Radio className="w-3 h-3 text-white animate-pulse" />
        <span className="text-white font-military text-xs tracking-widest uppercase">EN VIVO</span>
      </div>

      {/* Scrolling area */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div
          ref={tickerRef}
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
