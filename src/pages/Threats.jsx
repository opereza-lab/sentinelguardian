import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { AlertTriangle, Zap, Users, Bomb, Radio, ChevronDown, ChevronUp, Shield, Crosshair, Waves, Mountain, Flame, Wind } from "lucide-react";

const makeContent = (lang) => ({
  es: {
    title: "AMENAZAS ACTIVAS", subtitle: "Identifica la amenaza. Actúa en los primeros 30 segundos.",
    levelLabel: "NIVEL", protocolLabel: "PROTOCOLO DE ACCIÓN", noteLabel: "DATO TÁCTICO",
  },
  en: {
    title: "ACTIVE THREATS", subtitle: "Identify the threat. Act in the first 30 seconds.",
    levelLabel: "LEVEL", protocolLabel: "ACTION PROTOCOL", noteLabel: "TACTICAL NOTE",
  },
  fr: {
    title: "MENACES ACTIVES", subtitle: "Identifiez la menace. Agissez dans les 30 premières secondes.",
    levelLabel: "NIVEAU", protocolLabel: "PROTOCOLE D'ACTION", noteLabel: "NOTE TACTIQUE",
  },
  pt: {
    title: "AMEAÇAS ATIVAS", subtitle: "Identifique a ameaça. Aja nos primeiros 30 segundos.",
    levelLabel: "NÍVEL", protocolLabel: "PROTOCOLO DE AÇÃO", noteLabel: "NOTA TÁTICA",
  },
  it: {
    title: "MINACCE ATTIVE", subtitle: "Identifica la minaccia. Agisci nei primi 30 secondi.",
    levelLabel: "LIVELLO", protocolLabel: "PROTOCOLLO D'AZIONE", noteLabel: "NOTA TATTICA",
  },
  ar: {
    title: "التهديدات النشطة", subtitle: "حدد التهديد. تصرف في أول 30 ثانية.",
    levelLabel: "المستوى", protocolLabel: "بروتوكول العمل", noteLabel: "ملاحظة تكتيكية",
  },
  zh: {
    title: "活跃威胁", subtitle: "识别威胁。在前30秒内采取行动。",
    levelLabel: "级别", protocolLabel: "行动规程", noteLabel: "战术提示",
  },
}[lang] || {
  title: "ACTIVE THREATS", subtitle: "Identify the threat. Act in the first 30 seconds.",
  levelLabel: "LEVEL", protocolLabel: "ACTION PROTOCOL", noteLabel: "TACTICAL NOTE",
});

const threats = {
  es: [
    { id: "missile", icon: Bomb, color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/30", level: "CRÍTICO", title: "Ataque de Misil Balístico", warning: "Tendrás entre 4 y 14 minutos de aviso previo si existe sistema de alerta.", steps: ["Al escuchar la sirena: NO pierdas ni un segundo.", "Dirígete INMEDIATAMENTE al sótano o cuarto interior más bajo.", "Aléjate de ventanas y paredes exteriores.", "Cúbrete bajo una mesa resistente.", "Si estás en exterior: túmbate en el suelo, cubre tu cabeza.", "NO uses el ascensor.", "Permanece en el refugio al menos 24h.", "Escucha la radio de emergencia."], extra: "Los misiles hipersónicos viajan a Mach 5+. No habrá tiempo de pensar. Solo de reaccionar." },
    { id: "infantry", icon: Users, color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", level: "ALTO", title: "Tirador Activo / Ataque de Infantería", warning: "Puede ocurrir sin previo aviso en zonas urbanas.", steps: ["CORRE: Si hay salida segura, huye dejando todo.", "ESCÓNDETE: Busca cobertura densa.", "Cierra puertas con llave. Bloquea con muebles.", "Apaga luces. Silencia el móvil.", "Llama al 112 cuando sea seguro.", "PELEA como último recurso.", "No te muevas hasta confirmación policial.", "Levanta las manos al ser rescatado."], extra: "En conflicto armado activo, la disciplina lo es todo." },
    { id: "emp", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30", level: "ALTO", title: "Pulso Electromagnético (EMP)", warning: "Un EMP puede inutilizar toda la electrónica en cientos de kilómetros.", steps: ["Si toda la electrónica falla: asume un EMP.", "Los vehículos modernos dejarán de funcionar.", "Comunícate solo en persona o con radios analógicas.", "El agua de grifo puede fallar.", "Ten efectivo físico.", "Establece punto de reunión familiar PREVIO.", "Guarda radio analógica de pilas en tu mochila.", "No hay forma de llamar."], extra: "Una ojiva nuclear a 400km de altitud puede apagar la red eléctrica de un país." },
    { id: "chemical", icon: Radio, color: "text-green-500", bgColor: "bg-green-500/10", borderColor: "border-green-500/30", level: "SEVERO", title: "Ataque Químico / Radiológico", warning: "Invisible, inodoro en muchos casos. Devastador en minutos.", steps: ["Olor a almendras, ajo o huevo podrido: abandona corriendo.", "Cubre nariz y boca con tela húmeda.", "Busca altura: muchos agentes son más densos que el aire.", "En ataque radiológico: máxima distancia de la fuente.", "Sella ventanas y puertas con cinta.", "Ducharse elimina el 80% de contaminación.", "No toques a víctimas sin protección.", "Escucha instrucciones de evacuación."], extra: "El yodo de potasio solo protege la tiroides. Tenerlo no te hace inmune." },
    { id: "terrorist", icon: Crosshair, color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/30", level: "CRÍTICO", title: "Ataque Terrorista / Explosivo", warning: "Puede producirse sin aviso en lugares concurridos.", steps: ["Si hay explosión: cúbrete INMEDIATAMENTE.", "No mires hacia el origen: segunda explosión es táctica habitual.", "Aléjate en dirección contraria, agachado.", "No uses el ascensor.", "Si hay heridos: presión directa en hemorragias.", "Llama al 112 en zona segura.", "No difundas rumores.", "Obedece a los cuerpos de seguridad."], extra: "Ataques en dos fases son táctica documentada. Espera 5 minutos antes de acercarte a ayudar." },
    { id: "tsunami", icon: Waves, color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30", level: "CRÍTICO", title: "Tsunami", warning: "El mar que se retira repentinamente es la señal más clara.", steps: ["Si el mar retrocede o sientes terremoto costero: huye INMEDIATAMENTE.", "Dirígete a zonas elevadas.", "No esperes la alerta oficial.", "Abandona vehículos si el tráfico se detiene.", "La primera ola no es la más peligrosa.", "No regreses hasta aviso oficial.", "Si estás en barco: aléjate hacia aguas profundas.", "Escucha la radio de emergencia."], extra: "Un tsunami puede viajar a 800 km/h en aguas profundas." },
    { id: "earthquake", icon: Mountain, color: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", level: "ALTO", title: "Terremoto", warning: "Sin aviso previo. El movimiento puede durar segundos o minutos.", steps: ["AGÁCHATE, CÚBRETE bajo mesa resistente y SUJÉTATE.", "Aléjate de ventanas y paredes exteriores.", "Si en exterior: aléjate de edificios y cables.", "NO uses el ascensor.", "Tras el sismo: corta el gas si hueles fuga.", "Sal del edificio con calma.", "Busca zona abierta.", "Prepárate para réplicas."], extra: "La regla del triángulo de vida es un mito peligroso. Agáchate bajo una mesa resistente." },
    { id: "wildfire", icon: Flame, color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", level: "ALTO", title: "Incendio Forestal", warning: "Puede avanzar más rápido que un corredor olímpico.", steps: ["Evacúa ANTES de que sea obligatorio.", "Cierra puertas y ventanas al salir.", "Sigue rutas de evacuación oficiales.", "Si te sorprende en vehículo: aparca, bocina, cúbrete.", "Si a pie: busca zona ya quemada.", "Protege las vías respiratorias.", "Nunca huyas cuesta arriba.", "Avisa a bomberos de tu posición."], extra: "El humo mata antes que las llamas." },
  ],
  en: [
    { id: "missile", icon: Bomb, color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/30", level: "CRITICAL", title: "Ballistic Missile Attack", warning: "You'll have 4 to 14 minutes of warning if an alert system exists.", steps: ["When you hear the siren: don't waste a second.", "Go IMMEDIATELY to the basement or lowest interior room.", "Stay away from windows and exterior walls.", "Cover under a sturdy table.", "If outside: lie flat on the ground, cover your head.", "Do NOT use the elevator.", "Stay in shelter at least 24h after impact.", "Listen to emergency radio."], extra: "Current hypersonic missiles travel at Mach 5+. There will be no time to think. Only to react." },
    { id: "infantry", icon: Users, color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", level: "HIGH", title: "Active Shooter / Infantry Attack", warning: "Can occur without warning in urban areas.", steps: ["RUN: If there's a safe exit, flee leaving everything.", "HIDE: Find dense cover.", "Lock doors. Block with heavy furniture.", "Turn off lights. Silence your phone.", "Call 911 when safe.", "FIGHT as a last resort.", "Don't move until police confirm area is clear.", "Raise hands when rescued."], extra: "In active armed conflict, discipline is everything." },
    { id: "emp", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30", level: "HIGH", title: "Electromagnetic Pulse (EMP)", warning: "An EMP can disable all electronics within hundreds of kilometers.", steps: ["If all electronics fail: assume an EMP.", "Modern vehicles will stop working.", "Communicate only in person or via analog radios.", "Tap water may fail.", "Keep physical cash.", "Establish a PRIOR family meeting point.", "Keep analog battery radio in your go-bag.", "There's no way to call."], extra: "A single nuclear warhead at 400km altitude can shut down an entire country's power grid." },
    { id: "chemical", icon: Radio, color: "text-green-500", bgColor: "bg-green-500/10", borderColor: "border-green-500/30", level: "SEVERE", title: "Chemical / Radiological Attack", warning: "Invisible, often odorless. Devastating within minutes.", steps: ["Smell of almonds, garlic or rotten eggs: flee immediately.", "Cover nose and mouth with wet cloth.", "Seek height: many agents are denser than air.", "Radiological attack: maximize distance from source.", "Seal windows and doors with tape.", "Showering removes 80% of contamination.", "Don't touch victims without protection.", "Follow official evacuation instructions."], extra: "Potassium iodide only protects the thyroid. Having it does not make you immune." },
    { id: "terrorist", icon: Crosshair, color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/30", level: "CRITICAL", title: "Terrorist Attack / Explosive", warning: "Can occur without warning in crowded places.", steps: ["If explosion: take cover IMMEDIATELY.", "Don't look toward origin: second blast is a common tactic.", "Move away in opposite direction, crouched.", "Don't use elevators.", "If there are injured nearby: direct pressure on bleeding.", "Call 911 in safe area.", "Don't spread rumors.", "Obey security forces strictly."], extra: "Two-phase attacks are a documented tactic. Wait 5 minutes before approaching to help." },
    { id: "tsunami", icon: Waves, color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30", level: "CRITICAL", title: "Tsunami", warning: "The sea suddenly retreating is the clearest warning sign.", steps: ["If sea retreats or you feel coastal earthquake: flee IMMEDIATELY.", "Head to high ground.", "Don't wait for official alert.", "Abandon vehicles if traffic stops.", "The first wave is not the most dangerous.", "Don't return until official all-clear.", "If on a boat: move to deep water.", "Listen to emergency radio."], extra: "A tsunami can travel at 800 km/h in deep water." },
    { id: "earthquake", icon: Mountain, color: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", level: "HIGH", title: "Earthquake", warning: "No prior warning. Shaking can last seconds to minutes.", steps: ["DROP, COVER under sturdy table, and HOLD ON.", "Stay away from windows and exterior walls.", "If outdoors: move away from buildings and wires.", "Do NOT use elevator.", "After quake: shut off gas if you smell a leak.", "Exit building calmly.", "Find an open area.", "Prepare for aftershocks."], extra: "The triangle of life rule is a dangerous myth. Drop under a sturdy table." },
    { id: "wildfire", icon: Flame, color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", level: "HIGH", title: "Wildfire", warning: "Can advance faster than an Olympic sprinter.", steps: ["Evacuate BEFORE it becomes mandatory.", "Close doors and windows when leaving.", "Follow official evacuation routes.", "If caught in vehicle: park, horn blaring, cover with fire blanket.", "If on foot: seek already-burned area.", "Protect your airways.", "Never flee uphill.", "Alert firefighters of your position."], extra: "Smoke kills before flames do." },
  ],
};

// Use EN threats for FR, PT, IT, AR, ZH with translated UI labels
const getThreatsByLang = (lang) => {
  if (threats[lang]) return threats[lang];
  return threats["en"];
};

export default function Threats() {
  const { lang } = useLang();
  const ui = makeContent(lang);
  const threatList = getThreatsByLang(lang);
  const [openId, setOpenId] = useState("missile");

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full alert-pulse" />
        <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO DE AMENAZA" : lang === "fr" ? "PROTOCOLE DE MENACE" : lang === "pt" ? "PROTOCOLO DE AMEAÇA" : lang === "it" ? "PROTOCOLLO MINACCIA" : lang === "ar" ? "بروتوكول التهديد" : lang === "zh" ? "威胁规程" : "THREAT PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{ui.title}</h1>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{ui.subtitle}</p>

      <div className="space-y-3">
        {threatList.map((threat) => {
          const Icon = threat.icon;
          const isOpen = openId === threat.id;
          return (
            <div key={threat.id} className={`border rounded overflow-hidden ${threat.borderColor}`}>
              <button onClick={() => setOpenId(isOpen ? null : threat.id)} className={`w-full flex items-center justify-between p-5 ${threat.bgColor} hover:opacity-90 transition-all`}>
                <div className="flex items-center gap-4">
                  <Icon className={`w-6 h-6 ${threat.color}`} />
                  <div className="text-left">
                    <div className={`text-[10px] font-bold tracking-widest ${threat.color} mb-0.5`}>{ui.levelLabel}: {threat.level}</div>
                    <div className="font-military text-sm text-foreground tracking-wide">{threat.title}</div>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="p-5 bg-card border-t border-border">
                  <div className="flex items-start gap-2 mb-5 p-3 bg-accent/10 border border-accent/30 rounded">
                    <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-xs text-accent leading-relaxed">{threat.warning}</p>
                  </div>
                  <h3 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-3">{ui.protocolLabel}</h3>
                  <ol className="space-y-2 mb-5">
                    {threat.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary font-military text-sm font-bold shrink-0 w-5">{i + 1}.</span>
                        <span className="text-sm text-foreground leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="p-3 bg-secondary rounded border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{ui.noteLabel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">{threat.extra}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
