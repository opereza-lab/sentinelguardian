import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
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
  pt: {
    title: "ÁGUA POTÁVEL",
    subtitle: "Sem água você morre em 72 horas. Com água contaminada, em dias. Aprenda a obtê-la quando a torneira falhar.",
    warning: "Em conflito armado, as estações de tratamento de água são alvo prioritário. A água da torneira pode se tornar insegura sem aviso.",
    methods: [
      { title: "Ferver a Água", time: "10 min", difficulty: "Fácil", color: "text-blue-400", steps: ["Filtre a água com pano ou filtro de café.", "Leve à fervura plena.", "Mantenha fervendo por 1 minuto (3 minutos acima de 2.000m).", "Deixe esfriar em recipiente limpo e tampado.", "Armazene em garrafas seladas. Consuma em 24 horas."], note: "Elimina bactérias, vírus e protozoários. NÃO elimina produtos químicos." },
      { title: "Pastilhas Purificadoras", time: "30 min", difficulty: "Muito Fácil", color: "text-green-400", steps: ["Filtre a água visualmente suja antes.", "Adicione 1 pastilha de cloro por litro.", "Agite e espere 30 minutos.", "Água turbia: dose dupla, espere o dobro.", "O gosto de cloro é normal."], note: "Sempre leve na mochila SOS." },
      { title: "Filtro Portátil (LifeStraw)", time: "Imediato", difficulty: "Fácil", color: "text-primary", steps: ["Conecte o filtro à garrafa.", "Beba diretamente.", "Elimina 99,99% de bactérias.", "Limpe o filtro soprando ao contrário.", "Capacidade: 1.000-4.000 litros."], note: "Investimento essencial para a mochila SOS." },
      { title: "Destilação Solar", time: "4-8h", difficulty: "Moderada", color: "text-yellow-400", steps: ["Coloque água contaminada num recipiente grande.", "Coloque recipiente pequeno no centro.", "Cubra com plástico transparente.", "Coloque peso no centro do plástico.", "Recolha a água destilada."], note: "Purifica QUALQUER água. Processo lento mas eficaz." },
    ],
    sources: { title: "FONTES DE ÁGUA EM EMERGÊNCIA", items: [{ label: "Aquecedores domésticos", detail: "40-80 litros de água." }, { label: "Vaso sanitário (caixa, NÃO a tigela)", detail: "Contém água potável limpa." }, { label: "Água da chuva", detail: "Coletar e tratar antes de consumir." }, { label: "Rios e riachos", detail: "Sempre filtrar e tratar." }, { label: "Neve e gelo", detail: "Derreter e ferver." }] },
  },
  it: {
    title: "ACQUA POTABILE",
    subtitle: "Senza acqua muori in 72 ore. Con acqua contaminata, in giorni. Impara a ottenerla quando il rubinetto fallisce.",
    warning: "In un conflitto armato, gli impianti di trattamento dell'acqua sono obiettivi prioritari. L'acqua del rubinetto può diventare non sicura senza preavviso.",
    methods: [
      { title: "Bollire l'Acqua", time: "10 min", difficulty: "Facile", color: "text-blue-400", steps: ["Filtra l'acqua con un panno o filtro da caffè.", "Porta a ebollizione piena.", "Mantieni in ebollizione per 1 minuto.", "Lascia raffreddare in un contenitore pulito.", "Conserva in bottiglie sigillate."], note: "Elimina batteri, virus e protozoi." },
      { title: "Pastiglie Purificatrici", time: "30 min", difficulty: "Facilissimo", color: "text-green-400", steps: ["Filtra l'acqua visibilmente sporca.", "Aggiungi 1 pastiglia di cloro per litro.", "Agita e aspetta 30 minuti.", "Acqua torbida: dose doppia.", "Il sapore di cloro è normale."], note: "Porta sempre nello zaino SOS." },
      { title: "Filtro Portatile (LifeStraw)", time: "Immediato", difficulty: "Facile", color: "text-primary", steps: ["Collega il filtro alla bottiglia.", "Bevi direttamente.", "Elimina il 99,99% di batteri.", "Pulisci il filtro soffiando al contrario.", "Capacità: 1.000-4.000 litri."], note: "Investimento essenziale per lo zaino SOS." },
      { title: "Distillazione Solare", time: "4-8h", difficulty: "Moderata", color: "text-yellow-400", steps: ["Metti acqua contaminata in un contenitore grande.", "Metti un contenitore piccolo al centro.", "Copri con plastica trasparente.", "Metti un peso al centro.", "Raccogli l'acqua distillata."], note: "Purifica QUALSIASI acqua." },
    ],
    sources: { title: "FONTI D'ACQUA IN EMERGENZA", items: [{ label: "Scaldabagni domestici", detail: "40-80 litri di acqua." }, { label: "Cassetta del WC (NON la tazza)", detail: "Contiene acqua potabile pulita." }, { label: "Acqua piovana", detail: "Raccogliere e trattare prima del consumo." }, { label: "Fiumi e ruscelli", detail: "Sempre filtrare e trattare." }, { label: "Neve e ghiaccio", detail: "Sciogliere e bollire." }] },
  },
  fr: {
    title: "EAU POTABLE",
    subtitle: "Sans eau vous mourez en 72 heures. Avec de l'eau contaminée, en jours. Apprenez à l'obtenir quand le robinet tombe en panne.",
    warning: "En conflit armé, les stations de traitement d'eau sont des cibles prioritaires. L'eau du robinet peut devenir dangereuse sans avertissement.",
    methods: [
      { title: "Faire Bouillir l'Eau", time: "10 min", difficulty: "Facile", color: "text-blue-400", steps: ["Filtrez l'eau avec un chiffon ou filtre à café.", "Portez à ébullition complète.", "Maintenez en ébullition 1 minute.", "Laissez refroidir dans un récipient propre.", "Conservez dans des bouteilles scellées."], note: "Élimine bactéries, virus et protozoaires." },
      { title: "Pastilles Purificatrices", time: "30 min", difficulty: "Très Facile", color: "text-green-400", steps: ["Filtrez l'eau visiblement sale.", "Ajoutez 1 pastille de chlore par litre.", "Agitez et attendez 30 minutes.", "Eau trouble: double dose.", "Le goût de chlore est normal."], note: "Toujours porter dans le sac SOS." },
      { title: "Filtre Portable (LifeStraw)", time: "Immédiat", difficulty: "Facile", color: "text-primary", steps: ["Connectez le filtre à la bouteille.", "Buvez directement.", "Élimine 99,99% des bactéries.", "Nettoyez le filtre en soufflant à l'envers.", "Capacité: 1.000-4.000 litres."], note: "Investissement essentiel pour le sac SOS." },
      { title: "Distillation Solaire", time: "4-8h", difficulty: "Modérée", color: "text-yellow-400", steps: ["Mettez de l'eau contaminée dans un grand récipient.", "Placez un petit récipient au centre.", "Couvrez avec du plastique transparent.", "Mettez un poids au centre.", "Récupérez l'eau distillée."], note: "Purifie N'IMPORTE QUELLE eau." },
    ],
    sources: { title: "SOURCES D'EAU EN URGENCE", items: [{ label: "Chauffe-eau domestiques", detail: "40-80 litres d'eau." }, { label: "Réservoir des toilettes (PAS la cuvette)", detail: "Contient de l'eau potable propre." }, { label: "Eau de pluie", detail: "Collecter et traiter avant consommation." }, { label: "Rivières et ruisseaux", detail: "Toujours filtrer et traiter." }, { label: "Neige et glace", detail: "Faire fondre et bouillir." }] },
  },
  ar: {
    title: "مياه آمنة",
    subtitle: "بدون ماء ستموت في 72 ساعة. بالماء الملوث في أيام. تعلم كيفية الحصول عليه.",
    warning: "في النزاع المسلح، محطات معالجة المياه هي أهداف ذات أولوية. قد يصبح ماء الحنفية غير آمن دون سابق إنذار.",
    methods: [
      { title: "غلي الماء", time: "10 دقائق", difficulty: "سهل", color: "text-blue-400", steps: ["صفّ الماء بقماش أو فلتر قهوة.", "أوصل إلى الغليان الكامل.", "حافظ على الغليان دقيقة واحدة.", "اترك يبرد في وعاء نظيف مغطى.", "احفظ في زجاجات مغلقة."], note: "يقضي على البكتيريا والفيروسات." },
      { title: "أقراص التنقية", time: "30 دقيقة", difficulty: "سهل جداً", color: "text-green-400", steps: ["صفّ الماء أولاً.", "أضف قرصاً للتر واحد.", "اخلط وانتظر 30 دقيقة.", "ماء عكر: ضعف الجرعة.", "طعم الكلور طبيعي."], note: "احملها دائماً في حقيبة الطوارئ." },
      { title: "فلتر محمول (LifeStraw)", time: "فوري", difficulty: "سهل", color: "text-primary", steps: ["وصّل الفلتر بالزجاجة.", "اشرب مباشرة.", "يزيل 99.99% من البكتيريا.", "نظّف الفلتر بالنفخ عكسياً.", "طاقة: 1000-4000 لتر."], note: "استثمار أساسي لحقيبة الطوارئ." },
      { title: "التقطير الشمسي", time: "4-8 ساعات", difficulty: "متوسط", color: "text-yellow-400", steps: ["ضع ماء ملوثاً في وعاء كبير.", "ضع وعاءً صغيراً في المنتصف.", "غطّ بنايلون شفاف.", "ضع ثقلاً في المنتصف.", "اجمع الماء المقطر."], note: "ينقي أي ماء بما فيه الماء المالح." },
    ],
    sources: { title: "مصادر المياه في حالات الطوارئ", items: [{ label: "سخانات المياه المنزلية", detail: "40-80 لتراً من الماء." }, { label: "خزان المرحاض (ليس الوعاء)", detail: "يحتوي على ماء نظيف." }, { label: "مياه الأمطار", detail: "اجمع وعالج قبل الشرب." }, { label: "الأنهار والجداول", detail: "صفّ وعالج دائماً." }, { label: "الثلج والجليد", detail: "ذوّب واغلي." }] },
  },
  zh: {
    title: "安全用水",
    subtitle: "没有水72小时内会死亡。水源污染会在数天内致命。学会在水龙头失效时获取水源。",
    warning: "在武装冲突中，水处理厂是优先打击目标。自来水可能在毫无预警的情况下变得不安全。",
    methods: [
      { title: "烧开水", time: "10分钟", difficulty: "简单", color: "text-blue-400", steps: ["用布或咖啡滤纸过滤水。", "煮沸（大泡泡持续翻滚）。", "持续沸腾1分钟（海拔2000米以上需3分钟）。", "在干净有盖容器中冷却。", "储存在密封瓶中，24小时内饮用。"], note: "可杀死细菌、病毒和原虫。不能去除化学物质。" },
      { title: "净水片", time: "30分钟", difficulty: "非常简单", color: "text-green-400", steps: ["先过滤明显脏的水。", "每升水加1片氯片。", "摇匀等待30分钟。", "浑浊水：双倍剂量。", "氯气味是正常的。"], note: "始终放在应急包中携带。" },
      { title: "便携过滤器（LifeStraw）", time: "即时", difficulty: "简单", color: "text-primary", steps: ["将过滤器连接到瓶子。", "直接从容器饮用。", "可去除99.99%的细菌。", "反向吹气清洁过滤器。", "容量：1000-4000升。"], note: "应急包的必备投资。" },
      { title: "太阳能蒸馏", time: "4-8小时", difficulty: "中等", color: "text-yellow-400", steps: ["将污染水放入大容器。", "在中央放一个小容器。", "用透明塑料覆盖密封。", "在中央放重物。", "收集蒸馏水。"], note: "可净化任何水源，包括海水。" },
    ],
    sources: { title: "紧急水源", items: [{ label: "家用热水器", detail: "40-80升相对干净的水。" }, { label: "马桶水箱（非马桶碗）", detail: "含有干净的饮用水。" }, { label: "雨水", detail: "收集后过滤处理再饮用。" }, { label: "河流和溪流", detail: "始终过滤处理。" }, { label: "雪和冰", detail: "融化后煮沸。" }] },
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
  const c = getLangContent(content, lang);
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
