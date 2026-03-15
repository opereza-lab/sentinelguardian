import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { ChevronDown, ChevronUp, Anchor, ImageIcon, X } from "lucide-react";

const knots = [
  {
    id: "clove_hitch",
    name: "Clove Hitch",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/081426e68_CloveHitch.png",
    mainUse: { es: "Fijar rápidamente una cuerda a un poste, rama o palo de refugio.", en: "Quickly secure a rope to a post, branch, or shelter pole." },
    typicalUses: { es: ["Iniciar amarres (lashing)", "Sujetar lona", "Fijar cuerdas temporales"], en: ["Starting lashings", "Securing tarps", "Temporary rope fixing"] },
    pros: { es: ["Muy rápido de hacer", "Fácil de ajustar", "Fácil de desatar"], en: ["Very quick to tie", "Easy to adjust", "Easy to untie"] },
    cons: { es: ["Puede aflojarse si la carga cambia"], en: ["Can loosen if load shifts"] },
    tip: { es: "Se suele usar con medio nudo de seguridad.", en: "Usually used with a half hitch for security." },
  },
  {
    id: "sheet_bend",
    name: "Sheet Bend",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/69576401f_SheetBend.png",
    mainUse: { es: "Unir dos cuerdas, especialmente de distinto diámetro o material.", en: "Join two ropes, especially of different diameters or materials." },
    typicalUses: { es: ["Extender cuerda", "Reparar cuerda rota", "Unir paracord con cuerda gruesa"], en: ["Extending rope", "Repairing broken rope", "Joining paracord with thick rope"] },
    pros: { es: ["Muy seguro", "No se resbala con cuerdas distintas", "Fácil de desatar después de carga"], en: ["Very secure", "Doesn't slip with different ropes", "Easy to untie after load"] },
    cons: { es: ["Si la carga es muy fuerte se usa Double Sheet Bend"], en: ["For heavy loads use Double Sheet Bend"] },
    tip: null,
  },
  {
    id: "constrictor",
    name: "Constrictor Knot",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/fe8d5eb72_Constrictor.png",
    mainUse: { es: "Atar algo muy firmemente. Es como un super nudo de amarre.", en: "Bind something extremely tightly. Like a super binding knot." },
    typicalUses: { es: ["Cerrar bolsas", "Fijar vendajes", "Asegurar cargas", "Amarrar ramas"], en: ["Closing bags", "Securing bandages", "Fastening loads", "Binding branches"] },
    pros: { es: ["Extremadamente firme", "No se desliza", "Ocupa poco espacio"], en: ["Extremely firm", "Doesn't slip", "Takes up little space"] },
    cons: { es: ["Difícil de desatar", "A veces hay que cortarlo"], en: ["Difficult to untie", "Sometimes must be cut off"] },
    tip: null,
  },
  {
    id: "square_lashing",
    name: "Square Lashing",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/554549bf2_LazoCuadrado.png",
    mainUse: { es: "Unir dos palos en ángulo recto. Es un amarre estructural.", en: "Join two poles at right angles. A structural lashing." },
    typicalUses: { es: ["Refugios", "Trípodes", "Camillas improvisadas", "Estructuras de campamento"], en: ["Shelters", "Tripods", "Improvised stretchers", "Camp structures"] },
    pros: { es: ["Muy resistente", "Distribuye bien la carga", "Permite construir estructuras"], en: ["Very strong", "Distributes load well", "Allows building structures"] },
    cons: { es: ["Requiere varios giros", "Necesita un buen nudo inicial (normalmente Clove Hitch)"], en: ["Requires several wraps", "Needs a good starting knot (usually Clove Hitch)"] },
    tip: null,
  },
  {
    id: "truckers_hitch",
    name: "Trucker's Hitch",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/c20e1bf20_TruckersHitch.png",
    mainUse: { es: "Tensar cuerdas con fuerza. Funciona como polea improvisada.", en: "Tension ropes with force. Works as an improvised pulley." },
    typicalUses: { es: ["Asegurar carga", "Tensar refugios", "Fijar equipo en vehículo", "Tensar líneas largas"], en: ["Securing loads", "Tensioning shelters", "Securing gear to vehicles", "Tensioning long lines"] },
    pros: { es: ["Genera mucha tensión", "Ajustable", "Muy fuerte"], en: ["Generates high tension", "Adjustable", "Very strong"] },
    cons: { es: ["Requiere varios pasos", "Hay que asegurar con medio nudo al final"], en: ["Requires several steps", "Must be finished with a half hitch"] },
    tip: null,
  },
  {
    id: "bowline",
    name: "Bowline (As de guía)",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/e49ddc684_BOWLINE.png",
    mainUse: { es: "Crear un lazo fijo que no se aprieta bajo carga.", en: "Create a fixed loop that does not tighten under load." },
    typicalUses: { es: ["Rescate", "Bajar objetos", "Amarrar a árbol", "Hacer arnés improvisado"], en: ["Rescue", "Lowering objects", "Tying to a tree", "Making improvised harness"] },
    pros: { es: ["Extremadamente confiable", "No se aprieta con carga", "Fácil de desatar después"], en: ["Extremely reliable", "Doesn't tighten under load", "Easy to untie after"] },
    cons: { es: ["Si la cuerda está floja puede aflojarse"], en: ["Can loosen if rope goes slack"] },
    tip: null,
  },
  {
    id: "taut_line",
    name: "Taut-Line Hitch",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/a7c7c0ea3_Taut-LineHitch.png",
    mainUse: { es: "Nudo ajustable para tensión. Desliza sin carga, se bloquea con carga.", en: "Adjustable tension knot. Slides without load, locks under load." },
    typicalUses: { es: ["Tensar refugios", "Tensar carpas", "Ajustar líneas de tarp", "Cuerdas de tienda"], en: ["Tensioning shelters", "Tensioning tarps", "Adjusting tarp lines", "Tent guy lines"] },
    pros: { es: ["Desliza cuando no hay carga", "Se bloquea cuando se tensiona", "Fácil de reajustar"], en: ["Slides when unloaded", "Locks when tensioned", "Easy to readjust"] },
    cons: { es: ["No funciona bien en cuerdas muy lisas"], en: ["Doesn't work well on very slippery ropes"] },
    tip: null,
  },
];

export default function SurvivalKnots() {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(null);
  const [imageModal, setImageModal] = useState(null);

  const title = lang === "es" ? "Nudos de Supervivencia" : "Survival Knots";
  const subtitle = lang === "es" ? "Dominar estos nudos puede salvar tu vida en situaciones extremas." : "Mastering these knots can save your life in extreme situations.";
  const mainUseLabel = lang === "es" ? "Uso principal" : "Main use";
  const typicalUsesLabel = lang === "es" ? "Usos típicos" : "Typical uses";
  const prosLabel = lang === "es" ? "Ventajas" : "Advantages";
  const consLabel = lang === "es" ? "Limitaciones" : "Limitations";
  const tipLabel = lang === "es" ? "Consejo táctico" : "Tactical tip";
  const viewImageLabel = lang === "es" ? "Ver imagen" : "View image";
  const noImageLabel = lang === "es" ? "Imagen no disponible aún" : "Image not available yet";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Image Modal */}
      {imageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setImageModal(null)}>
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-4 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setImageModal(null)}>
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-military text-lg text-primary tracking-wide mb-3">{imageModal.name}</h3>
            {imageModal.image ? (
              <div className="rounded-lg overflow-hidden bg-white">
                <img src={imageModal.image} alt={imageModal.name} className="w-full object-contain max-h-80" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                <ImageIcon className="w-10 h-10 opacity-40" />
                <span className="text-sm">{noImageLabel}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded bg-primary/10 border border-primary/30">
            <Anchor className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-military text-2xl md:text-3xl text-primary tracking-widest uppercase">{title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="h-px bg-border mt-4" />
      </div>

      {/* Knots list */}
      <div className="max-w-3xl mx-auto space-y-3">
        {knots.map((knot) => {
          const isOpen = expanded === knot.id;
          return (
            <div key={knot.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="flex items-center">
                <button
                  className="flex-1 flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : knot.id)}
                >
                  <div className="flex items-center gap-3">
                    <Anchor className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-military text-base text-foreground tracking-wide">{knot.name}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                </button>
                <button
                  className="flex items-center gap-1.5 px-4 py-4 text-xs font-medium text-primary hover:text-primary/80 hover:bg-secondary/40 transition-colors border-l border-border flex-shrink-0"
                  onClick={() => setImageModal(knot)}
                  title={viewImageLabel}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{viewImageLabel}</span>
                </button>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-border">
                  <div className="pt-4">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{mainUseLabel}</div>
                    <p className="text-sm text-foreground">{knot.mainUse[lang] || knot.mainUse.es}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{typicalUsesLabel}</div>
                    <ul className="space-y-1">
                      {(knot.typicalUses[lang] || knot.typicalUses.es).map((u, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-primary mt-0.5">▸</span>{u}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">{prosLabel}</div>
                      <ul className="space-y-1">
                        {(knot.pros[lang] || knot.pros.es).map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-green-400 mt-0.5">✔</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">{consLabel}</div>
                      <ul className="space-y-1">
                        {(knot.cons[lang] || knot.cons.es).map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-yellow-400 mt-0.5">⚠</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {knot.tip && (
                    <div className="bg-primary/10 border border-primary/30 rounded p-3">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{tipLabel}</div>
                      <p className="text-sm text-foreground">{knot.tip[lang] || knot.tip.es}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
