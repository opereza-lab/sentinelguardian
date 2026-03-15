import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { MapPin, Home, Building, Landmark, Trees, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const content = {
  es: {
    title: "REFUGIOS SEGUROS",
    subtitle: "Cuando los misiles caen, los minutos importan. Debes saber AHORA dónde llevar a tu familia.",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Sótano de Edificio Sólido", desc: "El refugio ideal. Máxima protección contra onda expansiva, metralla y radiación inicial.", good: ["Máxima protección contra explosiones", "Protección contra radiación inicial", "Temperatura estable", "Estructuralmente resistente"], bad: ["Riesgo de derrumbe si edificio es impactado", "Sin salida si hay escombros"], tips: ["Ubica sótanos en tu barrio HOY, antes de necesitarlos", "Memoriza al menos 2 rutas de acceso", "Almacena suministros básicos si tienes acceso"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Refugio Antiaéreo Público", desc: "Instalaciones gubernamentales diseñadas específicamente para protección civil.", good: ["Diseño específico para ataques", "Ventilación filtrada", "Suministros básicos almacenados", "Señalización oficial"], bad: ["Puede estar lleno durante ataque masivo", "Necesitas conocer su ubicación previa"], tips: ["Busca en tu ayuntamiento el mapa de refugios", "En España: en muchas ciudades existen desde la Guerra Civil", "Regístrate en aplicaciones de protección civil local"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Habitación Interior de Tu Casa", desc: "Si no puedes llegar a un refugio, el cuarto más interior de tu casa es tu siguiente opción.", good: ["Siempre accesible", "Familiar con el espacio", "Puedes tenerlo equipado"], bad: ["Protección limitada ante explosión cercana", "Sin filtro de aire"], tips: ["Elige la habitación sin ventanas o con menos ventanas", "Ten allí agua y radio de emergencia", "Sella puertas y ventanas con cinta si hay amenaza química"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Terreno Natural / Depresiones del Suelo", desc: "Último recurso en campo abierto. Cualquier depresión reduce la exposición a la onda expansiva.", good: ["Siempre disponible en exterior", "Reduce exposición a metralla"], bad: ["Protección mínima", "Sin protección radiológica ni química"], tips: ["Busca zanjas, cunetas, barrancos", "Ponte boca abajo, cabeza alejada de la explosión", "Cubre nuca y cabeza con brazos"] },
    ],
    evalTitle: "CÓMO EVALUAR UN REFUGIO EN 60 SEGUNDOS",
    evalItems: ["¿Está bajo tierra o en un piso bajo? +2 puntos", "¿Tiene paredes de hormigón o ladrillo grueso? +2 puntos", "¿Tiene más de una salida? +1 punto", "¿Está lejos de ventanas y cristales? +1 punto", "¿Tiene suministros de agua? +1 punto", "5+ puntos = Úsalo | 3-4 = Aceptable | <3 = Busca otro"],
  },
  en: {
    title: "SAFE SHELTERS",
    subtitle: "When missiles fall, minutes matter. You must know NOW where to take your family.",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Solid Building Basement", desc: "The ideal shelter. Maximum protection against blast wave, shrapnel and initial radiation.", good: ["Maximum blast protection", "Initial radiation protection", "Stable temperature", "Structurally resistant"], bad: ["Collapse risk if building is hit", "No exit if rubble blocks doors"], tips: ["Locate basements in your neighborhood TODAY, before you need them", "Memorize at least 2 access routes", "Store basic supplies if you have access"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Public Air Raid Shelter", desc: "Government facilities specifically designed for civil protection.", good: ["Attack-specific design", "Filtered ventilation", "Stored basic supplies", "Official signage"], bad: ["May be full during mass attack", "You need to know its location beforehand"], tips: ["Check your city hall for shelter maps", "Register with local civil protection apps", "Note the nearest one from work and home"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Interior Room of Your Home", desc: "If you can't reach a shelter, the most interior room of your home is your next option.", good: ["Always accessible", "Familiar with the space", "Can keep it equipped"], bad: ["Limited protection from nearby explosion", "No air filter"], tips: ["Choose the room with no windows or fewest windows", "Keep water and emergency radio there", "Seal doors and windows with tape if chemical threat"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Natural Terrain / Ground Depressions", desc: "Last resort in open field. Any depression reduces exposure to the blast wave.", good: ["Always available outdoors", "Reduces shrapnel exposure"], bad: ["Minimal protection", "No radiological or chemical protection"], tips: ["Look for ditches, gutters, ravines", "Lie face down, head away from explosion", "Cover neck and head with arms"] },
    ],
    evalTitle: "HOW TO EVALUATE A SHELTER IN 60 SECONDS",
    evalItems: ["Is it underground or on a low floor? +2 points", "Does it have concrete or thick brick walls? +2 points", "Does it have more than one exit? +1 point", "Is it away from windows and glass? +1 point", "Does it have water supplies? +1 point", "5+ points = Use it | 3-4 = Acceptable | <3 = Find another"],
  },
};

export default function Shelters() {
  const { lang } = useLang();
  const c = getLangContent(content, lang);
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-orange-400" />
        <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO DE REFUGIO" : "SHELTER PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{c.subtitle}</p>

      <div className="space-y-3 mb-10">
        {c.types.map((type, idx) => {
          const Icon = type.icon;
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`border rounded overflow-hidden ${type.border}`}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex items-center justify-between p-5 ${type.bg} transition-all`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-6 h-6 ${type.color}`} />
                  <div className="text-left">
                    <div className="flex gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < type.rating ? "bg-primary" : "bg-border"}`} />
                      ))}
                    </div>
                    <div className="font-military text-sm text-foreground tracking-wide">{type.title}</div>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="p-5 bg-card border-t border-border space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">{lang === "es" ? "VENTAJAS" : "ADVANTAGES"}</span>
                      </div>
                      <ul className="space-y-1">
                        {type.good.map((g, i) => <li key={i} className="text-xs text-foreground flex items-start gap-2"><span className="text-green-400 shrink-0">+</span>{g}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">{lang === "es" ? "LIMITACIONES" : "LIMITATIONS"}</span>
                      </div>
                      <ul className="space-y-1">
                        {type.bad.map((b, i) => <li key={i} className="text-xs text-foreground flex items-start gap-2"><span className="text-red-400 shrink-0">–</span>{b}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{lang === "es" ? "CONSEJOS TÁCTICOS" : "TACTICAL TIPS"}</span>
                    </div>
                    <ul className="space-y-1">
                      {type.tips.map((tip, i) => <li key={i} className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-primary shrink-0">›</span>{tip}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-card border border-border rounded">
        <h2 className="font-military text-sm text-foreground tracking-widest mb-4 uppercase">{c.evalTitle}</h2>
        <ul className="space-y-2">
          {c.evalItems.map((item, i) => (
            <li key={i} className={`text-sm flex items-start gap-2 ${i === c.evalItems.length - 1 ? "text-primary font-bold pt-2 border-t border-border mt-3" : "text-muted-foreground"}`}>
              <span className="text-primary shrink-0">{i + 1 < c.evalItems.length ? `${i + 1}.` : "→"}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
