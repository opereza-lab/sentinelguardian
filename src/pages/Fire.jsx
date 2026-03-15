import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { Flame, AlertTriangle, ChevronDown, ChevronUp, CheckCircle, XCircle, Wind, Droplets } from "lucide-react";

const content = {
  es: {
    title: "FUEGO DE SUPERVIVENCIA",
    subtitle: "El fuego salva vidas: calienta, purifica agua, cocina, señaliza rescate y protege de animales. Domínalo antes de necesitarlo.",
    warning: "Un fuego mal controlado puede costarte la vida. Aplica siempre las reglas de seguridad, incluso en emergencia.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Mechero / Encendedor", time: "5 seg", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Busca refugio del viento antes de encender.", "Prepara el yesquero (material seco y fino) ANTES de sacar el mechero.", "Enciende en la base del yesquero, no en la parte superior.", "Protege la llama con tu cuerpo mientras prende.", "Añade material gradualmente: primero fino, luego grueso."], tip: "Siempre lleva 2 mecheros y guárdalos en bolsas herméticas separadas. El frío y la humedad los inutilizan." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Cerillas Impermeables", time: "10 seg", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Seca las cerillas antes de usarlas si han cogido humedad.", "Raspa alejando de ti. Protege la llama inmediatamente.", "Inclina la cerilla 45° hacia abajo para que la llama suba al palo.", "Ten el yesquero listo antes de encender.", "Cierra la caja con la mano que no usa la cerilla."], tip: "Impermeabiliza cerillas normales con cera de vela. Duran años y encienden incluso húmedas." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Pedernal y Eslabón", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Prepara el nido de yesca: musgo, corteza deshecha, hierba seca en forma de bol.", "Coloca el pedernal sobre la yesca o muy cerca.", "Golpea el eslabón metálico contra el filo del pedernal con fuerza y ángulo.", "Dirige las chispas hacia la parte más densa del nido.", "Cuando el nido humee, ciérralo suavemente con las manos y sopla DESPACIO.", "Transfiere la brasa al fuego sin sacudir."], tip: "Practica en casa. La técnica requiere entrenamiento. Bajo presión y frío, los dedos no responden igual." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Fricción por Arco (Sin herramientas)", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["Necesitas: tablilla de madera SECA y porosa, barrena, arco con cuerda, taco superior.", "Haz una muesca en V en la tablilla con un pequeño hueco circular.", "Coloca una hoja seca debajo de la muesca para recoger el polvo.", "Tensa la cuerda del arco alrededor de la barrena UNA vuelta.", "Aplica presión hacia abajo con el taco superior (usa guante o tela).", "Mueve el arco horizontalmente con movimientos largos y constantes.", "El polvo oscuro acumulado es la brasa: recógelo con cuidado.", "Transfiere al nido de yesca y sopla con suavidad hasta llama."], tip: "Usa madera de SAUCE, ÁLAMO o CEDRO para tablilla y barrena. La madera verde o húmeda no funciona NUNCA." },
    ],
    fireStructures: {
      title: "ESTRUCTURAS DE FUEGO",
      items: [
        { name: "Fuego Tipi", emoji: "🏕", desc: "Ideal para encender rápido. Coloca el yesquero en el centro, rodéalo de palitos en forma de cono.", use: "Encendido rápido, señalización" },
        { name: "Fuego de Troncos", emoji: "🪵", desc: "Coloca 2 troncos paralelos, pon leña transversal encima. Dura más y necesita menos atención.", use: "Cocinar, calor prolongado" },
        { name: "Fuego Estrella", emoji: "⭐", desc: "5-6 troncos gruesos en estrella. Empuja hacia el centro según se consume. Muy eficiente.", use: "Toda la noche, pocos recursos" },
        { name: "Fuego Reflector", emoji: "🪨", desc: "Troncos o piedras grandes detrás del fuego reflejan el calor hacia ti.", use: "Calor máximo en frío extremo" },
      ],
    },
    safety: {
      title: "REGLAS DE SEGURIDAD",
      dos: ["Despeja 1m alrededor del fuego de material seco", "Construye un círculo de piedras si puedes", "Ten agua o tierra lista para apagar", "Vigila el fuego en todo momento", "Apaga completamente antes de dormir o moverte", "Comprueba la dirección del viento antes de encender", "Mantén el fuego pequeño: más manejable y eficiente"],
      donts: ["Nunca enciendas fuego bajo ramas bajas", "No uses acelerantes (gasolina, alcohol) salvo emergencia extrema", "No dejes a niños solos cerca del fuego", "No enciendas en el interior de refugios cerrados (CO₂)", "No uses piedras porosas o húmedas (pueden explotar)", "No encender en días de viento fuerte", "No dejes fuego sin apagar aunque parezca extinguido"],
    },
    extinguish: {
      title: "CÓMO APAGAR CORRECTAMENTE",
      steps: ["Deja que la madera se consuma al máximo antes de apagar.", "Separa los troncos y dispersa las brasas.", "Vierte agua lentamente sobre TODAS las brasas.", "Remueve con un palo. Vuelve a mojar. Repite.", "Comprueba con la MANO (no los dedos) que no emite calor a 30cm.", "Si no hay agua: cubre con tierra, remueve, cubre de nuevo.", "Nunca abandones un fuego sin esta comprobación."],
    },
  },
  en: {
    title: "SURVIVAL FIRE",
    subtitle: "Fire saves lives: warms, purifies water, cooks, signals rescue, and protects from animals. Master it before you need it.",
    warning: "A poorly controlled fire can cost you your life. Always apply safety rules, even in an emergency.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Lighter", time: "5 sec", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Find shelter from the wind before lighting.", "Prepare tinder (dry, fine material) BEFORE taking out the lighter.", "Light at the base of the tinder, not the top.", "Shield the flame with your body while it catches.", "Add material gradually: fine first, then thick."], tip: "Always carry 2 lighters and store them in separate airtight bags. Cold and moisture disable them." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Waterproof Matches", time: "10 sec", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Dry matches before using if they've gotten damp.", "Strike away from you. Shield the flame immediately.", "Tilt match 45° downward so flame travels up the stick.", "Have tinder ready before striking.", "Close the box with the hand not holding the match."], tip: "Waterproof regular matches with candle wax. They last years and light even when damp." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Flint & Steel", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Prepare tinder nest: moss, shredded bark, dry grass shaped like a bowl.", "Place flint on tinder or very close.", "Strike the steel against the sharp flint edge with force and angle.", "Direct sparks toward the densest part of the nest.", "When the nest smokes, gently close with hands and blow SLOWLY.", "Transfer ember to fire without shaking."], tip: "Practice at home. The technique requires training. Under pressure and cold, fingers don't respond the same." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Bow Drill (No tools)", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["You need: DRY porous fireboard, spindle, bow with cord, top cap.", "Cut a V-notch in the fireboard with a small circular depression.", "Place a dry leaf under the notch to catch powder.", "Wrap bow cord around spindle ONE turn.", "Apply downward pressure with top cap (use glove or cloth).", "Move bow horizontally with long, steady strokes.", "Dark accumulated powder is the ember: collect carefully.", "Transfer to tinder nest and blow gently until flame."], tip: "Use WILLOW, POPLAR or CEDAR for fireboard and spindle. Green or wet wood NEVER works." },
    ],
    fireStructures: {
      title: "FIRE STRUCTURES",
      items: [
        { name: "Tipi Fire", emoji: "🏕", desc: "Ideal for quick ignition. Place tinder in center, surround with sticks in cone shape.", use: "Quick start, signaling" },
        { name: "Log Cabin Fire", emoji: "🪵", desc: "Place 2 logs parallel, stack wood crosswise on top. Lasts longer and needs less attention.", use: "Cooking, prolonged heat" },
        { name: "Star Fire", emoji: "⭐", desc: "5-6 thick logs in star shape. Push toward center as they burn. Very efficient.", use: "All night, few resources" },
        { name: "Reflector Fire", emoji: "🪨", desc: "Large logs or rocks behind fire reflect heat toward you.", use: "Maximum heat in extreme cold" },
      ],
    },
    safety: {
      title: "SAFETY RULES",
      dos: ["Clear 3ft around fire of dry material", "Build a stone ring if possible", "Have water or dirt ready to extinguish", "Watch the fire at all times", "Fully extinguish before sleeping or moving", "Check wind direction before lighting", "Keep fire small: more manageable and efficient"],
      donts: ["Never light fire under low branches", "Don't use accelerants (gasoline, alcohol) except extreme emergency", "Don't leave children alone near fire", "Don't light inside closed shelters (CO₂ buildup)", "Don't use porous or wet rocks (can explode)", "Don't light in strong wind conditions", "Don't leave fire without extinguishing even if it looks out"],
    },
    extinguish: {
      title: "HOW TO PROPERLY EXTINGUISH",
      steps: ["Let wood burn down as much as possible before extinguishing.", "Separate logs and spread embers apart.", "Pour water slowly over ALL embers.", "Stir with a stick. Wet again. Repeat.", "Check with PALM (not fingers) that no heat is emitted at 12 inches.", "No water: cover with dirt, stir, cover again.", "Never abandon a fire without this check."],
    },
  },
};

function DifficultyBar({ level }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`w-3 h-2 rounded-sm ${i < level ? level <= 2 ? "bg-green-400" : level <= 3 ? "bg-yellow-400" : "bg-red-500" : "bg-secondary"}`} />
      ))}
    </div>
  );
}

function FireVisual() {
  return (
    <div className="flex justify-center my-6">
      <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-lg">
        <ellipse cx="60" cy="128" rx="50" ry="8" fill="#5c3d1e" />
        <rect x="15" y="118" width="90" height="12" rx="5" fill="#7c4f28" />
        <rect x="10" y="120" width="45" height="10" rx="4" fill="#6b3f1a" transform="rotate(-15 35 125)" />
        <rect x="65" y="120" width="45" height="10" rx="4" fill="#6b3f1a" transform="rotate(15 87 125)" />
        <ellipse cx="60" cy="120" rx="30" ry="6" fill="#ff6b00" opacity="0.6" />
        <path d="M30,115 Q20,85 40,65 Q35,85 50,75 Q45,55 60,35 Q75,55 70,75 Q85,65 80,85 Q100,85 90,115 Z" fill="#ff6b00" opacity="0.9">
          <animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M30,115 Q20,85 40,65 Q35,85 50,75 Q45,55 60,35 Q75,55 70,75 Q85,65 80,85 Q100,85 90,115 Z;M32,115 Q18,80 38,60 Q33,82 52,72 Q47,52 60,32 Q73,52 68,72 Q87,62 82,82 Q102,80 88,115 Z;M30,115 Q20,85 40,65 Q35,85 50,75 Q45,55 60,35 Q75,55 70,75 Q85,65 80,85 Q100,85 90,115 Z" />
        </path>
        <path d="M38,115 Q30,95 45,78 Q42,92 55,84 Q52,68 62,50 Q72,68 68,84 Q80,92 77,115 Z" fill="#ff9500" opacity="0.85">
          <animate attributeName="d" dur="0.9s" repeatCount="indefinite" values="M38,115 Q30,95 45,78 Q42,92 55,84 Q52,68 62,50 Q72,68 68,84 Q80,92 77,115 Z;M40,115 Q28,90 43,73 Q40,88 57,80 Q54,64 62,46 Q70,64 66,80 Q82,88 79,115 Z;M38,115 Q30,95 45,78 Q42,92 55,84 Q52,68 62,50 Q72,68 68,84 Q80,92 77,115 Z" />
        </path>
        <path d="M46,115 Q40,100 50,88 Q49,98 58,92 Q56,80 62,65 Q68,80 64,92 Q73,98 72,115 Z" fill="#ffdd00" opacity="0.9">
          <animate attributeName="d" dur="0.7s" repeatCount="indefinite" values="M46,115 Q40,100 50,88 Q49,98 58,92 Q56,80 62,65 Q68,80 64,92 Q73,98 72,115 Z;M48,115 Q38,98 48,85 Q47,96 60,88 Q58,76 62,62 Q66,76 62,88 Q75,96 74,115 Z;M46,115 Q40,100 50,88 Q49,98 58,92 Q56,80 62,65 Q68,80 64,92 Q73,98 72,115 Z" />
        </path>
        <circle cx="45" cy="55" r="2" fill="#ffd700" opacity="0.7"><animate attributeName="cy" dur="1.5s" repeatCount="indefinite" values="115;40;115" /><animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.8;0;0.8" /></circle>
        <circle cx="72" cy="70" r="1.5" fill="#ffd700" opacity="0.6"><animate attributeName="cy" dur="1.1s" repeatCount="indefinite" values="115;45;115" /><animate attributeName="opacity" dur="1.1s" repeatCount="indefinite" values="0.7;0;0.7" /></circle>
        <circle cx="55" cy="48" r="1" fill="#fff" opacity="0.9"><animate attributeName="cy" dur="0.9s" repeatCount="indefinite" values="110;30;110" /><animate attributeName="opacity" dur="0.9s" repeatCount="indefinite" values="1;0;1" /></circle>
      </svg>
    </div>
  );
}

export default function Fire() {
  const { lang } = useLang();
  const c = content[lang] || content["en"];
  const [openId, setOpenId] = useState("lighter");

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">{lang === "es" ? "PROTOCOLO DE FUEGO" : "FIRE PROTOCOL"}</span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{c.subtitle}</p>
      <div className="flex items-start gap-2 mb-2 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>
      <FireVisual />
      <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">{lang === "es" ? "MÉTODOS DE ENCENDIDO" : "IGNITION METHODS"}</h2>
      <div className="space-y-3 mb-10">
        {c.methods.map((m) => {
          const isOpen = openId === m.id;
          return (
            <div key={m.id} className={`border rounded overflow-hidden ${m.border}`}>
              <button onClick={() => setOpenId(isOpen ? null : m.id)} className={`w-full flex items-center justify-between p-4 ${m.bg} hover:opacity-90 transition-all`}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="text-left">
                    <div className="font-military text-sm text-foreground tracking-wide mb-1">{m.title}</div>
                    <div className="flex items-center gap-3">
                      <DifficultyBar level={m.difficulty} />
                      <span className="text-[10px] text-muted-foreground">{lang === "es" ? "Tiempo:" : "Time:"} <span className={m.color}>{m.time}</span></span>
                    </div>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {isOpen && (
                <div className="p-5 bg-card border-t border-border space-y-4">
                  <ol className="space-y-2">
                    {m.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                        <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>{step}
                      </li>
                    ))}
                  </ol>
                  <div className="p-3 bg-secondary rounded border border-border">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">💡 {m.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mb-8">
        <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">{c.fireStructures.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {c.fireStructures.items.map((s, i) => (
            <div key={i} className="p-4 bg-card border border-border rounded hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="font-military text-sm text-foreground">{s.name}</div>
                  <div className="text-[10px] text-primary tracking-wide">{s.use}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">{c.safety.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">{lang === "es" ? "DEBES HACER" : "DO"}</span>
            </div>
            <ul className="space-y-2">
              {c.safety.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground"><span className="text-green-400 shrink-0 mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">{lang === "es" ? "NUNCA HAGAS" : "NEVER DO"}</span>
            </div>
            <ul className="space-y-2">
              {c.safety.donts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground"><span className="text-red-400 shrink-0 mt-0.5">✕</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-5 bg-card border border-primary/20 rounded">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-4 h-4 text-blue-400" />
          <h2 className="font-military text-sm text-foreground tracking-widest uppercase">{c.extinguish.title}</h2>
        </div>
        <ol className="space-y-2">
          {c.extinguish.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
              <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>{step}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-6 p-4 bg-secondary border border-border rounded flex items-start gap-3">
        <Wind className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {lang === "es" ? "Regla del viento: Nunca enciendas fuego con viento superior a 30 km/h. Comprueba siempre la dirección: el fuego debe alejarse de tu campamento, refugio y de cualquier vegetación densa." : "Wind rule: Never light a fire with winds above 20 mph. Always check direction: fire should point away from your camp, shelter and any dense vegetation."}
        </p>
      </div>
    </div>
  );
}
