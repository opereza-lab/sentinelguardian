import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { Heart, AlertTriangle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const content = {
  es: {
    title: "PRIMEROS AUXILIOS DE COMBATE",
    subtitle: "En zona de conflicto no habrá ambulancia. Tú eres el médico. Cada técnica que aprendas hoy puede salvar una vida mañana.",
    warning: "Esta información es de supervivencia extrema. En situación normal, llama siempre al 112. En conflicto activo, aplica estos protocolos cuando no haya asistencia médica disponible.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "VIDA O MUERTE", title: "Herida de Bala", steps: ["CONTROL DE HEMORRAGIA PRIMERO: aplica presión directa con lo que tengas.", "Extremidades: aplica torniquete 5-7cm por encima de la herida. Anota la hora.", "Tórax/abdomen: NO uses torniquete. Presión directa. Apósito oclusivo si hay.", "NO intentes extraer la bala. No es necesario ni aconsejable.", "Si hay herida en el pecho: sella 3 lados con plástico (permite exhalar).", "Mantén a la víctima caliente y tumbada. El shock mata.", "Vigila vías respiratorias. Si inconsciente: posición lateral de seguridad.", "Habla constantemente con el herido para mantenerlo consciente."], note: "El torniquete mal usado puede causar pérdida de extremidad. Pero sin él, la hemorragia masiva mata en 3-5 minutos." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENTE", title: "Fractura Ósea", steps: ["NO muevas a la víctima si sospechas fractura de columna o cuello.", "Inmoviliza la fractura TAL COMO ESTÁ. No intentes realinear.", "Entablilla con lo que tengas: tablas, ramas, cartón rígido.", "La entablilla debe inmovilizar la articulación por encima Y por debajo.", "Ata sin cortar la circulación: comprueba el color de los dedos.", "Fractura abierta (hueso visible): cubre con gasa estéril o tela limpia.", "Eleva el miembro fracturado para reducir inflamación.", "Controla signos de shock: palidez, frío, confusión."], note: "Una fractura de fémur puede causar pérdida de 1-2 litros de sangre internamente. El shock hipovolémico es la amenaza real." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "GRAVE", title: "Quemaduras", steps: ["Apaga el fuego primero. Detente, tírate al suelo, rueda.", "Enfría con agua tibia (no fría) corriente durante 20 minutos mínimo.", "NO uses hielo, mantequilla, pasta de dientes ni remedios caseros.", "NO revientes las ampollas. Son barrera protectora natural.", "Cubre con gasa estéril húmeda o tela limpia no adherente.", "Quemaduras >10% del cuerpo: riesgo de shock. Hidrata constantemente.", "Quemaduras en cara, manos, genitales o pulmones: urgencia extrema.", "En quemadura química: retira la ropa, lava con abundante agua 30 min."], note: "Regla del 9: cabeza=9%, cada brazo=9%, cada pierna=18%, tronco=36%. Más del 20% es crítico." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRÍTICO", title: "Pérdida de Conocimiento", steps: ["Verifica seguridad del entorno. No seas la segunda víctima.", "Llama en voz alta y estimula esternón con nudillo.", "Sin respuesta: verifica respiración (10 segundos máximo).", "Respira pero inconsciente: posición lateral de seguridad.", "No respira: inicia RCP inmediatamente.", "RCP: 30 compresiones (100-120/min, 5cm profundidad) + 2 respiraciones.", "Continúa hasta que respire, llegue ayuda o no puedas más.", "AED/DEA si disponible: úsalo sin dudar. La máquina te guía."], note: "Cada minuto sin RCP reduce supervivencia un 10%. A los 10 minutos sin intervención, la probabilidad es mínima." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODERADO", title: "Contusiones y Traumatismos", steps: ["Método RICE: Reposo, Hielo, Compresión, Elevación.", "Aplica frío (bolsa de hielo o tela mojada fría) 20 min cada 2 horas.", "Comprime con venda elástica sin cortar la circulación.", "Eleva el miembro afectado por encima del nivel del corazón.", "Sospecha fractura si hay deformidad, crujido o dolor intenso al presionar.", "Hematoma en la cabeza tras golpe: vigila 24h. Si hay vómito o confusión: urgencia.", "Dolor torácico tras contusión: puede ser fractura de costillas. Respira con cuidado.", "Reposo relativo. No inmovilización total salvo fractura confirmada."], note: "Un hematoma cerebral puede tardar horas en manifestarse. Vigila cambios de comportamiento." },
    ],
    kitTitle: "KIT MÍNIMO DE PRIMEROS AUXILIOS",
    kitItems: ["Torniquete (CAT o similar)", "Apósitos hemostáticos (QuikClot o similar)", "Vendas israelíes (Emergency Bandage)", "Gasas estériles (múltiples tamaños)", "Venda elástica", "Guantes de látex (mínimo 4 pares)", "Tijeras de trauma", "Termómetro", "Antiséptico (povidona yodada)", "Ibuprofeno y paracetamol", "Manual de primeros auxilios impreso"],
  },
  en: {
    title: "COMBAT FIRST AID",
    subtitle: "In a conflict zone there will be no ambulance. You are the doctor. Every technique you learn today can save a life tomorrow.",
    warning: "This is extreme survival information. In normal situations, always call 911. In active conflict, apply these protocols when no medical assistance is available.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "LIFE OR DEATH", title: "Gunshot Wound", steps: ["BLEEDING CONTROL FIRST: apply direct pressure with whatever you have.", "Extremities: apply tourniquet 2-3 inches above the wound. Note the time.", "Chest/abdomen: NO tourniquet. Direct pressure. Occlusive dressing if available.", "Do NOT try to extract the bullet. Not necessary or advisable.", "Chest wound: seal 3 sides with plastic (allows exhalation).", "Keep victim warm and lying down. Shock kills.", "Monitor airway. If unconscious: recovery position.", "Talk constantly to the wounded to keep them conscious."], note: "Improperly used tourniquet can cause limb loss. But without it, massive hemorrhage kills in 3-5 minutes." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENT", title: "Bone Fracture", steps: ["Do NOT move victim if you suspect spine or neck fracture.", "Splint the fracture AS IS. Do not try to realign.", "Improvise splint with boards, branches, rigid cardboard.", "Splint must immobilize the joint above AND below.", "Tie without cutting circulation: check finger color.", "Open fracture (visible bone): cover with sterile gauze or clean cloth.", "Elevate fractured limb to reduce swelling.", "Monitor shock signs: pallor, cold, confusion."], note: "A femur fracture can cause 1-2 liters of internal blood loss. Hypovolemic shock is the real threat." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "SERIOUS", title: "Burns", steps: ["Extinguish fire first. Stop, drop and roll.", "Cool with lukewarm (not cold) running water for minimum 20 minutes.", "Do NOT use ice, butter, toothpaste or home remedies.", "Do NOT burst blisters. They are a natural protective barrier.", "Cover with moist sterile gauze or clean non-adherent cloth.", "Burns >10% of body: shock risk. Constantly hydrate.", "Burns on face, hands, genitals or lungs: extreme urgency.", "Chemical burn: remove clothing, wash with plenty of water 30 min."], note: "Rule of 9s: head=9%, each arm=9%, each leg=18%, trunk=36%. More than 20% is critical." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRITICAL", title: "Loss of Consciousness", steps: ["Check environment safety. Don't become the second victim.", "Call loudly and stimulate sternum with knuckle.", "No response: check breathing (maximum 10 seconds).", "Breathing but unconscious: recovery position.", "Not breathing: start CPR immediately.", "CPR: 30 compressions (100-120/min, 2 inch depth) + 2 breaths.", "Continue until breathing, help arrives or you can't go on.", "AED if available: use it without hesitation. The machine guides you."], note: "Every minute without CPR reduces survival by 10%. At 10 minutes without intervention, probability is minimal." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODERATE", title: "Bruises & Trauma", steps: ["RICE method: Rest, Ice, Compression, Elevation.", "Apply cold (ice pack or cold wet cloth) 20 min every 2 hours.", "Compress with elastic bandage without cutting circulation.", "Elevate affected limb above heart level.", "Suspect fracture if deformity, cracking or intense pain on pressure.", "Head hematoma after blow: monitor 24h. Vomiting or confusion: emergency.", "Chest pain after contusion: possible rib fracture. Breathe carefully.", "Relative rest. No total immobilization unless confirmed fracture."], note: "A brain hematoma can take hours to manifest. Monitor behavioral changes." },
    ],
    kitTitle: "MINIMUM FIRST AID KIT",
    kitItems: ["Tourniquet (CAT or similar)", "Hemostatic dressings (QuikClot or similar)", "Israeli bandages (Emergency Bandage)", "Sterile gauze (multiple sizes)", "Elastic bandage", "Latex gloves (minimum 4 pairs)", "Trauma scissors", "Thermometer", "Antiseptic (povidone-iodine)", "Ibuprofen and acetaminophen", "Printed first aid manual"],
  },
};

export default function FirstAid() {
  const { lang, t } = useLang();
  const c = content[lang] || content["en"];
  const [openId, setOpenId] = useState("gunshot");

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO MÉDICO" : "MEDICAL PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{c.subtitle}</p>

      <div className="flex items-start gap-2 mb-8 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>

      <div className="space-y-3 mb-10">
        {c.cases.map((cas) => {
          const isOpen = openId === cas.id;
          return (
            <div key={cas.id} className={`border rounded overflow-hidden ${cas.border}`}>
              <button
                onClick={() => setOpenId(isOpen ? null : cas.id)}
                className={`w-full flex items-center justify-between p-5 ${cas.bg} transition-all`}
              >
                <div className="flex items-center gap-4">
                  <Heart className={`w-5 h-5 ${cas.color}`} />
                  <div className="text-left">
                    <div className={`text-[10px] font-bold tracking-widest ${cas.color} mb-0.5`}>{cas.urgency}</div>
                    <div className="font-military text-sm text-foreground tracking-wide">{cas.title}</div>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="p-5 bg-card border-t border-border space-y-4">
                  <ol className="space-y-2">
                    {cas.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                        <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="p-3 bg-secondary rounded border border-border">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">⚠ {cas.note}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Kit */}
      <div className="p-5 bg-card border border-border rounded mb-6">
        <h2 className="font-military text-sm text-foreground tracking-widest mb-4 uppercase">{c.kitTitle}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {c.kitItems.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-primary">✓</span>{item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`${t.shopUrl}${lang === "es" ? "kit+primeros+auxilios+combate+torniquete" : "combat+first+aid+kit+tourniquet"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded hover:bg-primary/90 transition-all"
      >
        <ExternalLink className="w-4 h-4" />
        {t.shopLabel} — {lang === "es" ? "Kit de Primeros Auxilios" : "First Aid Kit"}
      </a>
    </div>
  );
}
