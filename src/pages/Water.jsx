import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { Droplets, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const content = {
  es: {
    title: "AGUA POTABLE",
    subtitle: "Sin agua mueres en 72 horas. Con agua contaminada, en días. Aprende a obtenerla cuando el grifo falle.",
    warning: "En un conflicto real, las plantas potabilizadoras son objetivo prioritario. El agua de grifo puede dejar de ser segura sin previo aviso.",
    methods: [
      { title: "Hervir el Agua", time: "10 min", difficulty: "Fácil", color: "text-blue-400", steps: ["Filtra el agua con una tela o café para eliminar partículas visibles.", "Lleva el agua a ebullición plena (burbujas grandes y constantes).", "Mantenla hirviendo 1 minuto (3 minutos si estás a más de 2.000m altitud).", "Deja enfriar en recipiente limpio y tapado.", "Almacena en botellas selladas. Consume en 24 horas."], note: "Elimina bacterias, virus y protozoos. NO elimina químicos ni metales pesados." },
      { title: "Pastillas Potabilizadoras", time: "30 min", difficulty: "Muy Fácil", color: "text-green-400", steps: ["Filtra el agua visiblemente sucia antes de tratar.", "Añade 1 pastilla de cloro o yodo por cada litro de agua.", "Agita y espera 30 minutos (1 hora si el agua está fría o turbia).", "Usa agua turbia: doble dosis y esperar el doble.", "El sabor a cloro es normal. Desaparece aireando el recipiente."], note: "Llevar siempre en la mochila SOS. Son pequeñas, baratas y salvan vidas." },
      { title: "Filtro de Agua Portátil (LifeStraw / Sawyer)", time: "Inmediato", difficulty: "Fácil", color: "text-primary", steps: ["Conecta el filtro a una botella o bolsa de agua.", "Aspira directamente del recipiente o fuente de agua.", "Los filtros de membrana eliminan el 99.99% de bacterias y protozoos.", "Limpiar el filtro soplando al revés para prolongar vida útil.", "Capacidad típica: 1.000-4.000 litros por filtro."], note: "Inversión esencial para la mochila SOS. Un LifeStraw puede salvar a toda tu familia." },
      { title: "Destilación Solar (sin materiales)", time: "4-8h", difficulty: "Moderada", color: "text-yellow-400", steps: ["Pon agua contaminada en un recipiente grande.", "Coloca un recipiente pequeño limpio en el centro.", "Cubre con plástico transparente y sella los bordes.", "Pon un peso en el centro del plástico sobre el recipiente pequeño.", "El sol evapora el agua, condensa en el plástico y cae limpia.", "Recolecta el agua destilada del recipiente central."], note: "Purifica CUALQUIER agua incluida la salada y la contaminada químicamente. Proceso lento pero efectivo." },
    ],
    sources: {
      title: "FUENTES DE AGUA EN EMERGENCIA",
      items: [
        { label: "Calentadores de agua domésticos", detail: "40-80 litros de agua relativamente limpia. Abrirlos por la llave de vaciado inferior." },
        { label: "Inodoros (cisterna, NO la taza)", detail: "El depósito trasero contiene agua potable limpia no tratada." },
        { label: "Agua de lluvia", detail: "Recoger con lonas o recipientes limpios. Filtrar y tratar antes de consumir." },
        { label: "Ríos y arroyos", detail: "Siempre filtrar y tratar. Preferir aguas arriba de zonas habitadas." },
        { label: "Nieve y hielo", detail: "Derretir y hervir. No comer nieve directamente (baja temperatura corporal)." },
      ],
    },
  },
  en: {
    title: "SAFE WATER",
    subtitle: "Without water you die in 72 hours. With contaminated water, in days. Learn to get it when the tap fails.",
    warning: "In a real conflict, water treatment plants are a priority target. Tap water can become unsafe without warning.",
    methods: [
      { title: "Boiling Water", time: "10 min", difficulty: "Easy", color: "text-blue-400", steps: ["Filter water through cloth or coffee filter to remove visible particles.", "Bring water to a full rolling boil (large, constant bubbles).", "Keep boiling for 1 minute (3 minutes above 6,500ft altitude).", "Let cool in a clean, covered container.", "Store in sealed bottles. Consume within 24 hours."], note: "Kills bacteria, viruses and protozoa. Does NOT remove chemicals or heavy metals." },
      { title: "Water Purification Tablets", time: "30 min", difficulty: "Very Easy", color: "text-green-400", steps: ["Filter visibly dirty water before treating.", "Add 1 chlorine or iodine tablet per liter of water.", "Shake and wait 30 minutes (1 hour if water is cold or cloudy).", "For cloudy water: double dose, double wait time.", "Chlorine taste is normal. It disappears by aerating the container."], note: "Always carry in your go-bag. They're small, cheap and life-saving." },
      { title: "Portable Water Filter (LifeStraw / Sawyer)", time: "Immediate", difficulty: "Easy", color: "text-primary", steps: ["Connect filter to a bottle or water bag.", "Drink directly from the container or water source.", "Membrane filters remove 99.99% of bacteria and protozoa.", "Clean filter by back-blowing to extend lifespan.", "Typical capacity: 1,000-4,000 liters per filter."], note: "Essential investment for your go-bag. One LifeStraw can save your whole family." },
      { title: "Solar Distillation (no materials needed)", time: "4-8h", difficulty: "Moderate", color: "text-yellow-400", steps: ["Put contaminated water in a large container.", "Place a small clean container in the center.", "Cover with transparent plastic and seal the edges.", "Put a weight in the center of the plastic over the small container.", "Sun evaporates water, condenses on plastic and falls clean.", "Collect distilled water from the central container."], note: "Purifies ANY water including salt water and chemically contaminated. Slow but effective process." },
    ],
    sources: {
      title: "EMERGENCY WATER SOURCES",
      items: [
        { label: "Domestic water heaters", detail: "40-80 liters of relatively clean water. Open by the bottom drain valve." },
        { label: "Toilets (tank, NOT the bowl)", detail: "The rear tank contains clean untreated drinking water." },
        { label: "Rainwater", detail: "Collect with tarps or clean containers. Filter and treat before consuming." },
        { label: "Rivers and streams", detail: "Always filter and treat. Prefer upstream of populated areas." },
        { label: "Snow and ice", detail: "Melt and boil. Do not eat snow directly (lowers body temperature)." },
      ],
    },
  },
};

export default function Water() {
  const { lang, t } = useLang();
  const c = content[lang] || content["en"];
  const [openIdx, setOpenIdx] = useState(0);

  const shopQuery = lang === "es" ? "pastillas+potabilizadoras+agua+emergencia" : "water+purification+tablets+emergency";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Droplets className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO DE HIDRATACIÓN" : "HYDRATION PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{c.subtitle}</p>

      <div className="flex items-start gap-2 mb-8 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>

      <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">
        {lang === "es" ? "MÉTODOS DE PURIFICACIÓN" : "PURIFICATION METHODS"}
      </h2>

      <div className="space-y-3 mb-10">
        {c.methods.map((m, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border border-border rounded overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary transition-all"
              >
                <div className="flex items-center gap-4">
                  <Droplets className={`w-5 h-5 ${m.color}`} />
                  <div className="text-left">
                    <div className="font-military text-sm text-foreground tracking-wide">{m.title}</div>
                    <div className="flex gap-3 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{lang === "es" ? "Tiempo:" : "Time:"} <span className="text-primary">{m.time}</span></span>
                      <span className="text-[10px] text-muted-foreground">{lang === "es" ? "Dificultad:" : "Difficulty:"} <span className={m.color}>{m.difficulty}</span></span>
                    </div>
                  </div>
                </div>
                {isOpen ? <CheckCircle className="w-4 h-4 text-green-400" /> : <span className="text-muted-foreground text-xs">+</span>}
              </button>

              {isOpen && (
                <div className="p-5 border-t border-border bg-background/50 space-y-4">
                  <ol className="space-y-2">
                    {m.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="p-3 bg-secondary rounded text-xs text-muted-foreground italic border border-border">
                    ⚠ {m.note}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-card border border-border rounded mb-6">
        <h2 className="font-military text-sm text-foreground tracking-widest mb-4 uppercase">{c.sources.title}</h2>
        <ul className="space-y-3">
          {c.sources.items.map((s, i) => (
            <li key={i} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="text-sm font-bold text-primary mb-0.5">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.detail}</div>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`${t.shopUrl}${shopQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded hover:bg-primary/90 transition-all"
      >
        <ExternalLink className="w-4 h-4" />
        {t.shopLabel} — {lang === "es" ? "Pastillas y Filtros" : "Tablets & Filters"}
      </a>
    </div>
  );
}
