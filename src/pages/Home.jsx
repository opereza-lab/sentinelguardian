import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { Shield, AlertTriangle, MapPin, Droplets, Package, Heart, Backpack, Map, Phone, ChevronRight, Zap, Clock, Navigation, Flame, Anchor, User } from "lucide-react";

const content = {
  es: {
    hero: {
      title: "EL MUNDO ESTÁ CAMBIANDO.",
      subtitle: "¿Tu familia sobrevivirá?",
      desc: "Misiles balísticos, ataques de infantería, colapso de infraestructuras. Ya no son escenarios de ficción. Son titulares de hoy. Cada día que pasa sin preparación es un día que le robas a la seguridad de los tuyos.",
      cta: "COMIENZA TU PROTOCOLO AHORA",
    },
    urgency: {
      title: "LA VENTANA DE PREPARACIÓN SE CIERRA",
      stats: [
        { val: "72h", label: "Tiempo crítico tras un ataque antes de que los suministros colapsen" },
        { val: "3.2B", label: "Personas viven actualmente en zonas de conflicto activo o latente" },
        { val: "89%", label: "De las familias NO están preparadas para una emergencia de 72 horas" },
      ],
    },
    modules: [
      { icon: AlertTriangle, title: "Amenazas Activas", desc: "Misiles, infantería, EMP. Conoce cómo actuar en los primeros segundos.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Refugios Seguros", desc: "Identifica dónde proteger a tu familia antes de que sea tarde.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Agua Potable", desc: "Sin agua potable morirás en 3 días. Aprende a conseguirla.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provisiones", desc: "Qué alimentos almacenar y cuánto tiempo te durarán.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "Primeros Auxilios", desc: "Balas, fracturas, quemaduras. Tú serás el médico de tu familia.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Nudos de Supervivencia", desc: "Los nudos esenciales que pueden salvarte la vida en situaciones extremas.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Mochila SOS", desc: "72 elementos esenciales para salir corriendo en 5 minutos.", page: "GoBackpack", color: "text-primary" },
      { icon: Map, title: "Mapas Offline", desc: "Cuando el GPS de internet caiga, tú seguirás navegando.", page: "OfflineMaps", color: "text-green-400" },
      { icon: Navigation, title: "Brújula Táctica", desc: "Navega sin internet usando el sol y las estrellas.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Fuego de Supervivencia", desc: "Cómo encender y mantener fuego en cualquier condición.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Números de Emergencia", desc: "Contactos críticos guardados cuando no haya tiempo de buscarlos.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "Perfil SOS", desc: "Tu información de emergencia lista para ser encontrado y rescatado.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
    quote: "\"No hay segundas oportunidades cuando el cielo se ilumina. Solo hay familias preparadas... y las que no lo estaban.\"",
  },
  en: {
    hero: {
      title: "THE WORLD IS CHANGING.",
      subtitle: "Will your family survive?",
      desc: "Ballistic missiles, infantry attacks, infrastructure collapse. These are no longer fiction. They are today's headlines. Every unprepared day is a day stolen from your family's safety.",
      cta: "START YOUR PROTOCOL NOW",
    },
    urgency: {
      title: "THE PREPARATION WINDOW IS CLOSING",
      stats: [
        { val: "72h", label: "Critical time after an attack before supplies collapse" },
        { val: "3.2B", label: "People currently live in zones of active or latent conflict" },
        { val: "89%", label: "Of families are NOT prepared for a 72-hour emergency" },
      ],
    },
    modules: [
      { icon: AlertTriangle, title: "Active Threats", desc: "Missiles, infantry, EMP. Know how to act in the first seconds.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Safe Shelters", desc: "Identify where to protect your family before it's too late.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Safe Water", desc: "Without clean water you'll die in 3 days. Learn how to get it.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provisions", desc: "What to stockpile and how long it will last.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "First Aid", desc: "Gunshots, fractures, burns. You will be your family's doctor.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Survival Knots", desc: "Essential knots that can save your life in extreme situations.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Go-Bag", desc: "72 essentials to grab and run in 5 minutes.", page: "GoBackpack", color: "text-primary" },
      { icon: Map, title: "Offline Maps", desc: "When internet GPS fails, you keep navigating.", page: "OfflineMaps", color: "text-green-400" },
      { icon: Navigation, title: "Tactical Compass", desc: "Navigate without internet using sun and stars.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Survival Fire", desc: "How to start and maintain fire in any condition.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Emergency Numbers", desc: "Critical contacts saved when there's no time to search.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "SOS Profile", desc: "Your emergency info ready to be found and rescued.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
    quote: "\"There are no second chances when the sky lights up. Only families that were prepared... and those that weren't.\"",
  },
};

export default function Home() {
  const { lang } = useLang();
  const c = getLangContent(content, lang);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 lg:py-24 bg-gradient-to-b from-card to-background">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full alert-pulse" />
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              {lang === "es" ? "NIVEL DE AMENAZA: CRÍTICO" : "THREAT LEVEL: CRITICAL"}
            </span>
          </div>
          <h1 className="font-military text-4xl lg:text-7xl text-foreground tracking-widest mb-2">
            {c.hero.title}
          </h1>
          <h2 className="font-military text-2xl lg:text-4xl text-primary tracking-wide mb-6">
            {c.hero.subtitle}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">
            {c.hero.desc}
          </p>
          <Link
            to={createPageUrl("Threats")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-military tracking-widest px-8 py-4 rounded text-sm hover:bg-primary/90 transition-all"
          >
            <Zap className="w-4 h-4" />
            {c.hero.cta}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Urgency Stats */}
      <section className="px-6 py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="w-4 h-4 text-accent" />
            <h2 className="font-military text-sm text-accent tracking-widest uppercase">{c.urgency.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.urgency.stats.map((s, i) => (
              <div key={i} className="text-center p-6 border border-border rounded bg-background/50">
                <div className="font-military text-4xl text-primary mb-2">{s.val}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-military text-xl text-foreground tracking-widest mb-8 uppercase">
            {lang === "es" ? "MÓDULOS DE SUPERVIVENCIA" : "SURVIVAL MODULES"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {c.modules.map(({ icon: Icon, title, desc, page, color }, i) => (
              <Link
                key={i}
                to={createPageUrl(page)}
                className="group flex items-start gap-4 p-5 bg-card border border-border rounded hover:border-primary/50 hover:bg-secondary transition-all"
              >
                <div className={`mt-0.5 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-military text-sm tracking-wide text-foreground mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 py-10 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-8 h-8 text-primary mx-auto mb-4 opacity-60" />
          <p className="text-muted-foreground text-sm italic leading-relaxed">{c.quote}</p>
        </div>
      </section>
    </div>
  );
}
