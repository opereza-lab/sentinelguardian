import React, { useState, useEffect } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { db, auth } from "@/api/base44Client";
import { Backpack, ExternalLink, CheckCircle, Circle, AlertTriangle } from "lucide-react";

const content = {
  es: {
    title: "MOCHILA SOS",
    subtitle: "Tienes 5 minutos para salir. ¿Qué llevas? Esto es lo que separa a los que sobreviven de los que no.",
    warning: "La mochila SOS debe estar empacada y lista en todo momento. No en el sótano. No desmontada. Lista junto a la puerta.",
    categories: [
      { name: "AGUA Y PURIFICACIÓN", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L de agua por persona", search: "botella+agua+2l+camelback" }, { id: "lifestraw", label: "Filtro LifeStraw o Sawyer", search: "filtro+lifestraw+agua" }, { id: "tablets", label: "Pastillas potabilizadoras (20 unidades)", search: "pastillas+potabilizadoras+cloro" }] },
      { name: "ALIMENTACIÓN", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Barritas energéticas (3.600kcal mínimo)", search: "barritas+energeticas+supervivencia" }, { id: "freeze_food", label: "Comida liofilizada (3 días)", search: "comida+liofilizada+emergencia" }, { id: "spork", label: "Cubiertos de titanio / spork", search: "cubiertos+titanio+camping" }] },
      { name: "PRIMEROS AUXILIOS", color: "text-red-400", items: [{ id: "tourniquet", label: "Torniquete (CAT)", search: "torniquete+cat+primeros+auxilios" }, { id: "hemostatic", label: "Apósito hemostático QuikClot", search: "quikclot+apósito+hemostático" }, { id: "first_aid_kit", label: "Kit básico primeros auxilios", search: "kit+primeros+auxilios+completo" }, { id: "medications", label: "Medicación básica (ibuprofeno, antibiótico, antihistamínico)", search: "botiquín+medicamentos+supervivencia" }] },
      { name: "COMUNICACIÓN E INFORMACIÓN", color: "text-green-400", items: [{ id: "radio", label: "Radio de emergencia (FM/AM + manivela)", search: "radio+emergencia+manivela+solar" }, { id: "whistle", label: "Silbato de emergencia", search: "silbato+emergencia+supervivencia" }, { id: "documents", label: "Copias documentos (plastificadas)", search: "funda+documentos+impermeable" }, { id: "cash", label: "Efectivo (billetes pequeños)", search: "cartera+rfid+supervivencia" }] },
      { name: "HERRAMIENTAS", color: "text-orange-400", items: [{ id: "multitool", label: "Multiherramienta (Leatherman o similar)", search: "multiherramienta+leatherman+supervivencia" }, { id: "flashlight", label: "Linterna táctica + pilas extra", search: "linterna+táctica+supervivencia" }, { id: "headlamp", label: "Linterna de cabeza", search: "linterna+cabeza+led+camping" }, { id: "knife", label: "Cuchillo fijo (hoja 10-15cm)", search: "cuchillo+supervivencia+fijo" }, { id: "firestarter", label: "Mechero + piedra de pedernal", search: "encendedor+piedra+pedernal+supervivencia" }, { id: "paracord", label: "Cordón paracord 30m", search: "paracord+30m+supervivencia" }, { id: "tarp", label: "Lona impermeable 3x3m", search: "lona+impermeable+refugio+supervivencia" }, { id: "gloves", label: "Guantes tácticos resistentes", search: "guantes+tácticos+resistentes" }] },
      { name: "ROPA Y PROTECCIÓN", color: "text-purple-400", items: [{ id: "poncho", label: "Poncho impermeable / capa de lluvia", search: "poncho+impermeable+militar" }, { id: "thermal", label: "Manta térmica de emergencia (3 unidades)", search: "manta+termica+emergencia+foil" }, { id: "boots", label: "Botas de montaña resistentes", search: "botas+montaña+trekking+supervivencia" }, { id: "change_clothes", label: "Ropa interior + calcetines (3 días)", search: "calcetines+trekking+antihumedad" }] },
      { name: "ENERGÍA", color: "text-primary", items: [{ id: "power_bank", label: "Power bank solar 20.000mAh", search: "power+bank+solar+20000mah" }, { id: "batteries", label: "Pilas AA y AAA (pack 20)", search: "pilas+aa+aaa+pack" }, { id: "headlamp_backup", label: "Cargador de manivela para móvil", search: "cargador+manivela+emergencia+teléfono" }] },
    ],
  },
  en: {
    title: "GO-BAG / BUG-OUT BAG",
    subtitle: "You have 5 minutes to get out. What do you take? This is what separates survivors from those who don't make it.",
    warning: "The go-bag must be packed and ready at all times. Not in the basement. Not disassembled. Ready by the door.",
    categories: [
      { name: "WATER & PURIFICATION", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L water per person", search: "2l+water+bottle+camelback" }, { id: "lifestraw", label: "LifeStraw or Sawyer filter", search: "lifestraw+water+filter+survival" }, { id: "tablets", label: "Water purification tablets (20 units)", search: "water+purification+tablets+emergency" }] },
      { name: "FOOD", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Energy bars (3,600 kcal minimum)", search: "emergency+food+bars+3600+calories" }, { id: "freeze_food", label: "Freeze-dried food (3 days)", search: "freeze+dried+food+emergency+72+hours" }, { id: "spork", label: "Titanium utensils / spork", search: "titanium+spork+camping+survival" }] },
      { name: "FIRST AID", color: "text-red-400", items: [{ id: "tourniquet", label: "Tourniquet (CAT)", search: "cat+tourniquet+first+aid" }, { id: "hemostatic", label: "QuikClot hemostatic dressing", search: "quikclot+hemostatic+gauze" }, { id: "first_aid_kit", label: "Basic first aid kit", search: "trauma+first+aid+kit+complete" }, { id: "medications", label: "Basic medications (ibuprofen, antibiotic, antihistamine)", search: "survival+medications+emergency" }] },
      { name: "COMMUNICATION & INFORMATION", color: "text-green-400", items: [{ id: "radio", label: "Emergency radio (FM/AM + hand crank)", search: "emergency+radio+hand+crank+solar" }, { id: "whistle", label: "Emergency whistle", search: "emergency+whistle+survival" }, { id: "documents", label: "Document copies (laminated)", search: "waterproof+document+pouch" }, { id: "cash", label: "Cash (small bills)", search: "rfid+wallet+survival" }] },
      { name: "TOOLS", color: "text-orange-400", items: [{ id: "multitool", label: "Multi-tool (Leatherman or similar)", search: "leatherman+multi+tool+survival" }, { id: "flashlight", label: "Tactical flashlight + extra batteries", search: "tactical+flashlight+survival" }, { id: "headlamp", label: "Headlamp", search: "headlamp+led+camping+survival" }, { id: "knife", label: "Fixed blade knife (4-6 inch blade)", search: "fixed+blade+survival+knife" }, { id: "firestarter", label: "Lighter + flint striker", search: "fire+starter+survival+flint" }, { id: "paracord", label: "100ft paracord", search: "paracord+100ft+survival" }, { id: "tarp", label: "Waterproof tarp 10x10ft", search: "waterproof+tarp+survival+shelter" }, { id: "gloves", label: "Tactical resistant gloves", search: "tactical+gloves+survival" }] },
      { name: "CLOTHING & PROTECTION", color: "text-purple-400", items: [{ id: "poncho", label: "Waterproof poncho / rain gear", search: "military+waterproof+poncho+survival" }, { id: "thermal", label: "Emergency thermal blanket (3 units)", search: "emergency+thermal+blanket+mylar" }, { id: "boots", label: "Sturdy hiking boots", search: "hiking+boots+survival+waterproof" }, { id: "change_clothes", label: "Underwear + socks (3 days)", search: "merino+wool+socks+hiking" }] },
      { name: "POWER", color: "text-primary", items: [{ id: "power_bank", label: "20,000mAh solar power bank", search: "solar+power+bank+20000mah+survival" }, { id: "batteries", label: "AA and AAA batteries (pack of 20)", search: "aa+aaa+batteries+emergency+pack" }, { id: "headlamp_backup", label: "Hand crank phone charger", search: "hand+crank+emergency+phone+charger" }] },
    ],
  },
};

export default function GoBackpack() {
  const { lang, t } = useLang();
  const c = getLangContent(content, lang);
  const [checked, setChecked] = useState({});
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    auth.me().then(u => {
      setUser(u);
      db.UserProfile.filter({ created_by: u.email }).then(profiles => {
        if (profiles.length > 0) {
          setProfile(profiles[0]);
          setChecked(profiles[0].checklist_progress || {});
        }
      });
    }).catch(() => {});
  }, []);

  const toggle = async (itemId) => {
    const newChecked = { ...checked, [itemId]: !checked[itemId] };
    setChecked(newChecked);
    if (user) {
      if (profile) {
        await db.UserProfile.update(profile.id, { checklist_progress: newChecked });
      } else {
        const created = await db.UserProfile.create({ checklist_progress: newChecked });
        setProfile(created);
      }
    }
  };

  const allItems = c.categories.flatMap(cat => cat.items);
  const checkedCount = allItems.filter(item => checked[item.id]).length;
  const totalCount = allItems.length;
  const pct = Math.round((checkedCount / totalCount) * 100);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Backpack className="w-4 h-4 text-primary" />
        <span className="text-primary text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO DE EVACUACIÓN" : "EVACUATION PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{c.subtitle}</p>

      <div className="flex items-start gap-2 mb-6 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>

      {/* Progress */}
      <div className="p-4 bg-card border border-border rounded mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-military text-xs text-muted-foreground tracking-widest uppercase">
            {lang === "es" ? "NIVEL DE PREPARACIÓN" : "READINESS LEVEL"}
          </span>
          <span className={`font-military text-sm ${pct >= 80 ? "text-green-400" : pct >= 40 ? "text-yellow-400" : "text-red-400"}`}>
            {checkedCount}/{totalCount} — {pct}%
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${pct >= 80 ? "bg-green-400" : pct >= 40 ? "bg-yellow-400" : "bg-red-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-[10px] text-muted-foreground mt-2">
          {pct < 40 && (lang === "es" ? "⚠ PELIGROSO: Tu familia no está protegida." : "⚠ DANGEROUS: Your family is not protected.")}
          {pct >= 40 && pct < 80 && (lang === "es" ? "⚡ PARCIAL: Continúa completando tu mochila." : "⚡ PARTIAL: Keep completing your bag.")}
          {pct >= 80 && (lang === "es" ? "✓ PREPARADO: Tu familia tiene una oportunidad real." : "✓ READY: Your family has a real chance.")}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {c.categories.map((cat, ci) => (
          <div key={ci}>
            <h2 className={`font-military text-xs tracking-widest mb-3 ${cat.color}`}>{cat.name}</h2>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <div key={item.id} className={`flex items-center justify-between p-3 border rounded transition-all ${checked[item.id] ? "border-green-500/30 bg-green-500/5 opacity-70" : "border-border bg-card"}`}>
                  <div className="flex items-center gap-3 flex-1">
                    <button onClick={() => toggle(item.id)} className="shrink-0">
                      {checked[item.id]
                        ? <CheckCircle className="w-5 h-5 text-green-400" />
                        : <Circle className="w-5 h-5 text-muted-foreground" />
                      }
                    </button>
                    <span className={`text-sm ${checked[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.label}
                    </span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
