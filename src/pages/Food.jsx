import React from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { Package, ExternalLink, AlertTriangle, Clock } from "lucide-react";

const content = {
  es: {
    title: "PROVISIONES DE EMERGENCIA",
    subtitle: "Las tiendas se vacían en 4 horas tras una alerta. Necesitas tener tus reservas ANTES.",
    warning: "En conflicto armado, la cadena de suministro alimentario colapsa en días. Sin reservas, dependes de lo que otros quieran darte.",
    phases: [
      { label: "Fase 1: 72 Horas", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "Fase 2: 2 Semanas", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "Fase 3: 3 Meses", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "Agua embotellada", cal: 0, shelf: "2 años", qty: "4L/persona/día", priority: 1, search: "agua+embotellada+pack+6" },
      { name: "Arroz blanco", cal: 364, shelf: "25-30 años", qty: "1kg/persona/semana", priority: 1, search: "arroz+blanco+5kg" },
      { name: "Lentejas y alubias", cal: 340, shelf: "10-30 años", qty: "500g/persona/semana", priority: 1, search: "legumbres+supervivencia+saco" },
      { name: "Atún en lata", cal: 132, shelf: "4-5 años", qty: "2 latas/persona/semana", priority: 1, search: "atun+en+lata+pack" },
      { name: "Leche en polvo", cal: 490, shelf: "2-25 años", qty: "250g/persona/semana", priority: 2, search: "leche+en+polvo+supervivencia" },
      { name: "Avena", cal: 389, shelf: "2-30 años", qty: "500g/persona/semana", priority: 2, search: "avena+granel+kilos" },
      { name: "Galletas integrales", cal: 450, shelf: "1-2 años", qty: "1 pack/persona/semana", priority: 2, search: "galletas+integrales+supervivencia" },
      { name: "Aceite de oliva", cal: 884, shelf: "2 años", qty: "1L/familia/mes", priority: 2, search: "aceite+oliva+litro" },
      { name: "Sal, azúcar, miel", cal: 300, shelf: "Indefinido", qty: "Stock 3 meses", priority: 2, search: "miel+natural+frasco" },
      { name: "Vitaminas multivitamínicas", cal: 0, shelf: "3-5 años", qty: "1 bote/persona/mes", priority: 3, search: "multivitaminico+supervivencia" },
      { name: "Comida liofilizada de emergencia", cal: 400, shelf: "25 años", qty: "7 raciones/persona", priority: 3, search: "comida+liofilizada+emergencia" },
      { name: "Chocolate negro", cal: 546, shelf: "2 años", qty: "500g/persona", priority: 3, search: "chocolate+negro+85%+pack" },
    ],
    tips: [
      "Calcula: 2.000 kcal/adulto/día. 1.500 kcal/niño/día.",
      "Rota el stock: consume lo más antiguo y repón.",
      "Almacena en lugar fresco, seco y oscuro.",
      "Nunca cuentes con electricidad para cocinar. Prepara cocinilla de gas.",
      "Documenta lo que tienes y las fechas de caducidad.",
    ],
    priorityLabel: ["CRÍTICO", "IMPORTANTE", "ÓPTIMO"],
  },
  en: {
    title: "EMERGENCY PROVISIONS",
    subtitle: "Stores empty in 4 hours after an alert. You need your reserves BEFORE.",
    warning: "In armed conflict, the food supply chain collapses in days. Without reserves, you depend on what others want to give you.",
    phases: [
      { label: "Phase 1: 72 Hours", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "Phase 2: 2 Weeks", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "Phase 3: 3 Months", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "Bottled water", cal: 0, shelf: "2 years", qty: "1 gal/person/day", priority: 1, search: "bottled+water+emergency+case" },
      { name: "White rice", cal: 364, shelf: "25-30 years", qty: "2lb/person/week", priority: 1, search: "white+rice+25lb+emergency" },
      { name: "Lentils and beans", cal: 340, shelf: "10-30 years", qty: "1lb/person/week", priority: 1, search: "emergency+beans+lentils+bag" },
      { name: "Canned tuna", cal: 132, shelf: "4-5 years", qty: "2 cans/person/week", priority: 1, search: "canned+tuna+pack+emergency" },
      { name: "Powdered milk", cal: 490, shelf: "2-25 years", qty: "0.5lb/person/week", priority: 2, search: "powdered+milk+emergency+bucket" },
      { name: "Oats", cal: 389, shelf: "2-30 years", qty: "1lb/person/week", priority: 2, search: "rolled+oats+bulk+emergency" },
      { name: "Crackers/hardtack", cal: 450, shelf: "1-2 years", qty: "1 pack/person/week", priority: 2, search: "emergency+crackers+survival" },
      { name: "Olive oil", cal: 884, shelf: "2 years", qty: "1qt/family/month", priority: 2, search: "olive+oil+gallon" },
      { name: "Salt, sugar, honey", cal: 300, shelf: "Indefinite", qty: "3-month stock", priority: 2, search: "raw+honey+emergency" },
      { name: "Multivitamins", cal: 0, shelf: "3-5 years", qty: "1 bottle/person/month", priority: 3, search: "emergency+multivitamins+survival" },
      { name: "Freeze-dried food", cal: 400, shelf: "25 years", qty: "7 servings/person", priority: 3, search: "freeze+dried+food+emergency+bucket" },
      { name: "Dark chocolate", cal: 546, shelf: "2 years", qty: "1lb/person", priority: 3, search: "dark+chocolate+85%+bulk" },
    ],
    tips: [
      "Calculate: 2,000 kcal/adult/day. 1,500 kcal/child/day.",
      "Rotate stock: consume oldest first and replenish.",
      "Store in a cool, dry, dark place.",
      "Never count on electricity for cooking. Prepare a camp stove.",
      "Document what you have and expiration dates.",
    ],
    priorityLabel: ["CRITICAL", "IMPORTANT", "OPTIMAL"],
  },
};

const priorityColors = ["border-red-500/50 bg-red-500/5", "border-yellow-500/50 bg-yellow-500/5", "border-green-500/50 bg-green-500/5"];

export default function Food() {
  const { lang, t } = useLang();
  const c = getLangContent(content, lang);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Package className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO ALIMENTARIO" : "FOOD PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{c.subtitle}</p>

      <div className="flex items-start gap-2 mb-8 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {c.phases.map((p, i) => (
          <div key={i} className={`p-3 border border-border rounded ${p.bg} text-center`}>
            <Clock className={`w-4 h-4 mx-auto mb-1 ${p.color}`} />
            <div className={`font-military text-xs tracking-wide ${p.color}`}>{p.label}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{lang === "es" ? "Mínimo objetivo" : "Minimum target"}</div>
          </div>
        ))}
      </div>

      {/* Items list */}
      <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">
        {lang === "es" ? "LISTA DE PROVISIONES" : "PROVISIONS LIST"}
      </h2>

      <div className="space-y-2 mb-8">
        {c.items.map((item, i) => (
          <div key={i} className={`flex items-center justify-between p-3 border rounded ${priorityColors[item.priority - 1]}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground">
                  {c.priorityLabel[item.priority - 1]}
                </span>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex gap-3 mt-0.5">
                {item.cal > 0 && <span className="text-[10px] text-muted-foreground">{item.cal} kcal/100g</span>}
                <span className="text-[10px] text-muted-foreground">{lang === "es" ? "Vida:" : "Shelf:"} {item.shelf}</span>
                <span className="text-[10px] text-primary">{item.qty}</span>
              </div>
            </div>
            <a
              href={`${t.shopUrl}${item.search}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-muted-foreground hover:text-primary transition-colors shrink-0"
              title={t.shopLabel}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="p-5 bg-card border border-border rounded">
        <h2 className="font-military text-sm text-foreground tracking-widest mb-3 uppercase">
          {lang === "es" ? "REGLAS DE ALMACENAMIENTO" : "STORAGE RULES"}
        </h2>
        <ul className="space-y-2">
          {c.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary shrink-0">›</span>{tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
