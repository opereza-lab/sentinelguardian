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
      { name: "Agua embotellada", cal: 0, shelf: "2 años", qty: "4L/persona/día", priority: 1, search: "agua+embotellada+pack" },
      { name: "Arroz blanco", cal: 364, shelf: "25-30 años", qty: "1kg/persona/semana", priority: 1, search: "arroz+blanco+5kg" },
      { name: "Lentejas y alubias", cal: 340, shelf: "10-30 años", qty: "500g/persona/semana", priority: 1, search: "legumbres+supervivencia" },
      { name: "Atún en lata", cal: 132, shelf: "4-5 años", qty: "2 latas/persona/semana", priority: 1, search: "atun+en+lata+pack" },
      { name: "Leche en polvo", cal: 490, shelf: "2-25 años", qty: "250g/persona/semana", priority: 2, search: "leche+en+polvo+supervivencia" },
      { name: "Avena", cal: 389, shelf: "2-30 años", qty: "500g/persona/semana", priority: 2, search: "avena+granel" },
      { name: "Aceite de oliva", cal: 884, shelf: "2 años", qty: "1L/familia/mes", priority: 2, search: "aceite+oliva+litro" },
      { name: "Sal, azúcar, miel", cal: 300, shelf: "Indefinido", qty: "Stock 3 meses", priority: 2, search: "miel+natural+frasco" },
      { name: "Comida liofilizada", cal: 400, shelf: "25 años", qty: "7 raciones/persona", priority: 3, search: "comida+liofilizada+emergencia" },
      { name: "Chocolate negro", cal: 546, shelf: "2 años", qty: "500g/persona", priority: 3, search: "chocolate+negro+85%+pack" },
    ],
    tips: [
      "Calcula: 2.000 kcal/adulto/día. 1.500 kcal/niño/día.",
      "Rota el stock: consume lo más antiguo y repón.",
      "Almacena en lugar fresco, seco y oscuro.",
      "Nunca cuentes con electricidad para cocinar.",
      "Documenta lo que tienes y las fechas de caducidad.",
    ],
    priorityLabel: ["CRÍTICO", "IMPORTANTE", "ÓPTIMO"],
    tipsTitle: "REGLAS DE ALMACENAMIENTO",
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
      { name: "Bottled water", cal: 0, shelf: "2 years", qty: "1 gal/person/day", priority: 1, search: "bottled+water+emergency" },
      { name: "White rice", cal: 364, shelf: "25-30 years", qty: "2lb/person/week", priority: 1, search: "white+rice+25lb+emergency" },
      { name: "Lentils and beans", cal: 340, shelf: "10-30 years", qty: "1lb/person/week", priority: 1, search: "emergency+beans+lentils" },
      { name: "Canned tuna", cal: 132, shelf: "4-5 years", qty: "2 cans/person/week", priority: 1, search: "canned+tuna+pack" },
      { name: "Powdered milk", cal: 490, shelf: "2-25 years", qty: "0.5lb/person/week", priority: 2, search: "powdered+milk+emergency" },
      { name: "Oats", cal: 389, shelf: "2-30 years", qty: "1lb/person/week", priority: 2, search: "rolled+oats+bulk" },
      { name: "Olive oil", cal: 884, shelf: "2 years", qty: "1qt/family/month", priority: 2, search: "olive+oil+gallon" },
      { name: "Salt, sugar, honey", cal: 300, shelf: "Indefinite", qty: "3-month stock", priority: 2, search: "raw+honey+emergency" },
      { name: "Freeze-dried food", cal: 400, shelf: "25 years", qty: "7 servings/person", priority: 3, search: "freeze+dried+food+emergency" },
      { name: "Dark chocolate", cal: 546, shelf: "2 years", qty: "1lb/person", priority: 3, search: "dark+chocolate+85%+bulk" },
    ],
    tips: [
      "Calculate: 2,000 kcal/adult/day. 1,500 kcal/child/day.",
      "Rotate stock: consume oldest first and replenish.",
      "Store in a cool, dry, dark place.",
      "Never count on electricity for cooking.",
      "Document what you have and expiration dates.",
    ],
    priorityLabel: ["CRITICAL", "IMPORTANT", "OPTIMAL"],
    tipsTitle: "STORAGE RULES",
  },
  fr: {
    title: "PROVISIONS D'URGENCE",
    subtitle: "Les magasins se vident en 4 heures après une alerte. Vous devez avoir vos réserves AVANT.",
    warning: "En conflit armé, la chaîne d'approvisionnement alimentaire s'effondre en jours. Sans réserves, vous dépendez de ce que les autres veulent vous donner.",
    phases: [
      { label: "Phase 1: 72 Heures", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "Phase 2: 2 Semaines", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "Phase 3: 3 Mois", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "Eau en bouteille", cal: 0, shelf: "2 ans", qty: "4L/personne/jour", priority: 1, search: "eau+bouteille+pack" },
      { name: "Riz blanc", cal: 364, shelf: "25-30 ans", qty: "1kg/personne/semaine", priority: 1, search: "riz+blanc+5kg" },
      { name: "Lentilles et haricots", cal: 340, shelf: "10-30 ans", qty: "500g/personne/semaine", priority: 1, search: "lentilles+haricots+urgence" },
      { name: "Thon en boîte", cal: 132, shelf: "4-5 ans", qty: "2 boîtes/personne/semaine", priority: 1, search: "thon+boite+pack" },
      { name: "Lait en poudre", cal: 490, shelf: "2-25 ans", qty: "250g/personne/semaine", priority: 2, search: "lait+poudre+survie" },
      { name: "Avoine", cal: 389, shelf: "2-30 ans", qty: "500g/personne/semaine", priority: 2, search: "flocons+avoine+vrac" },
      { name: "Huile d'olive", cal: 884, shelf: "2 ans", qty: "1L/famille/mois", priority: 2, search: "huile+olive+litre" },
      { name: "Sel, sucre, miel", cal: 300, shelf: "Indéfini", qty: "Stock 3 mois", priority: 2, search: "miel+naturel+pot" },
      { name: "Aliments lyophilisés", cal: 400, shelf: "25 ans", qty: "7 rations/personne", priority: 3, search: "aliments+lyophilises+urgence" },
      { name: "Chocolat noir", cal: 546, shelf: "2 ans", qty: "500g/personne", priority: 3, search: "chocolat+noir+85%+pack" },
    ],
    tips: [
      "Calculez: 2 000 kcal/adulte/jour. 1 500 kcal/enfant/jour.",
      "Tournez le stock: consommez le plus ancien en premier.",
      "Stockez dans un endroit frais, sec et sombre.",
      "Ne comptez jamais sur l'électricité pour cuisiner.",
      "Documentez ce que vous avez et les dates de péremption.",
    ],
    priorityLabel: ["CRITIQUE", "IMPORTANT", "OPTIMAL"],
    tipsTitle: "RÈGLES DE STOCKAGE",
  },
  pt: {
    title: "PROVISÕES DE EMERGÊNCIA",
    subtitle: "As lojas ficam vazias em 4 horas após um alerta. Você precisa ter suas reservas ANTES.",
    warning: "Em conflito armado, a cadeia de abastecimento alimentar colapsa em dias. Sem reservas, você depende do que os outros quiserem lhe dar.",
    phases: [
      { label: "Fase 1: 72 Horas", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "Fase 2: 2 Semanas", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "Fase 3: 3 Meses", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "Água engarrafada", cal: 0, shelf: "2 anos", qty: "4L/pessoa/dia", priority: 1, search: "agua+garrafa+pack" },
      { name: "Arroz branco", cal: 364, shelf: "25-30 anos", qty: "1kg/pessoa/semana", priority: 1, search: "arroz+branco+5kg" },
      { name: "Lentilhas e feijão", cal: 340, shelf: "10-30 anos", qty: "500g/pessoa/semana", priority: 1, search: "lentilhas+feijao+emergencia" },
      { name: "Atum em lata", cal: 132, shelf: "4-5 anos", qty: "2 latas/pessoa/semana", priority: 1, search: "atum+lata+pack" },
      { name: "Leite em pó", cal: 490, shelf: "2-25 anos", qty: "250g/pessoa/semana", priority: 2, search: "leite+po+sobrevivencia" },
      { name: "Aveia", cal: 389, shelf: "2-30 anos", qty: "500g/pessoa/semana", priority: 2, search: "aveia+granel" },
      { name: "Azeite de oliva", cal: 884, shelf: "2 anos", qty: "1L/família/mês", priority: 2, search: "azeite+oliva+litro" },
      { name: "Sal, açúcar, mel", cal: 300, shelf: "Indefinido", qty: "Estoque 3 meses", priority: 2, search: "mel+natural+pote" },
      { name: "Comida liofilizada", cal: 400, shelf: "25 anos", qty: "7 porções/pessoa", priority: 3, search: "comida+liofilizada+emergencia" },
      { name: "Chocolate amargo", cal: 546, shelf: "2 anos", qty: "500g/pessoa", priority: 3, search: "chocolate+amargo+85%+pack" },
    ],
    tips: [
      "Calcule: 2.000 kcal/adulto/dia. 1.500 kcal/criança/dia.",
      "Gire o estoque: consuma os mais antigos primeiro.",
      "Armazene em local fresco, seco e escuro.",
      "Nunca conte com eletricidade para cozinhar.",
      "Documente o que tem e as datas de validade.",
    ],
    priorityLabel: ["CRÍTICO", "IMPORTANTE", "ÓTIMO"],
    tipsTitle: "REGRAS DE ARMAZENAMENTO",
  },
  it: {
    title: "PROVVISTE DI EMERGENZA",
    subtitle: "I negozi si svuotano in 4 ore dopo un'allerta. Devi avere le tue riserve PRIMA.",
    warning: "In un conflitto armato, la catena di approvvigionamento alimentare crolla in giorni. Senza riserve, dipendi da ciò che gli altri vogliono darti.",
    phases: [
      { label: "Fase 1: 72 Ore", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "Fase 2: 2 Settimane", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "Fase 3: 3 Mesi", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "Acqua in bottiglia", cal: 0, shelf: "2 anni", qty: "4L/persona/giorno", priority: 1, search: "acqua+bottiglia+pack" },
      { name: "Riso bianco", cal: 364, shelf: "25-30 anni", qty: "1kg/persona/settimana", priority: 1, search: "riso+bianco+5kg" },
      { name: "Lenticchie e fagioli", cal: 340, shelf: "10-30 anni", qty: "500g/persona/settimana", priority: 1, search: "lenticchie+fagioli+emergenza" },
      { name: "Tonno in scatola", cal: 132, shelf: "4-5 anni", qty: "2 lattine/persona/settimana", priority: 1, search: "tonno+scatola+pack" },
      { name: "Latte in polvere", cal: 490, shelf: "2-25 anni", qty: "250g/persona/settimana", priority: 2, search: "latte+polvere+sopravvivenza" },
      { name: "Avena", cal: 389, shelf: "2-30 anni", qty: "500g/persona/settimana", priority: 2, search: "fiocchi+avena+sfuso" },
      { name: "Olio d'oliva", cal: 884, shelf: "2 anni", qty: "1L/famiglia/mese", priority: 2, search: "olio+oliva+litro" },
      { name: "Sale, zucchero, miele", cal: 300, shelf: "Indefinito", qty: "Stock 3 mesi", priority: 2, search: "miele+naturale+barattolo" },
      { name: "Cibo liofilizzato", cal: 400, shelf: "25 anni", qty: "7 razioni/persona", priority: 3, search: "cibo+liofilizzato+emergenza" },
      { name: "Cioccolato fondente", cal: 546, shelf: "2 anni", qty: "500g/persona", priority: 3, search: "cioccolato+fondente+85%+pack" },
    ],
    tips: [
      "Calcola: 2.000 kcal/adulto/giorno. 1.500 kcal/bambino/giorno.",
      "Ruota le scorte: consuma prima le più vecchie.",
      "Conserva in luogo fresco, asciutto e buio.",
      "Non fare mai affidamento sull'elettricità per cucinare.",
      "Documenta cosa hai e le date di scadenza.",
    ],
    priorityLabel: ["CRITICO", "IMPORTANTE", "OTTIMALE"],
    tipsTitle: "REGOLE DI CONSERVAZIONE",
  },
  ar: {
    title: "مؤن الطوارئ",
    subtitle: "تفرغ المتاجر في 4 ساعات بعد التنبيه. تحتاج إلى احتياطياتك قبل ذلك.",
    warning: "في النزاع المسلح، سلسلة إمداد الغذاء تنهار في أيام. بدون احتياطيات، تعتمد على ما يريد الآخرون إعطاءك.",
    phases: [
      { label: "المرحلة 1: 72 ساعة", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "المرحلة 2: أسبوعان", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "المرحلة 3: 3 أشهر", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "مياه معبأة", cal: 0, shelf: "سنتان", qty: "4 لتر/شخص/يوم", priority: 1, search: "مياه+معبأة+كرتون" },
      { name: "أرز أبيض", cal: 364, shelf: "25-30 سنة", qty: "1كغ/شخص/أسبوع", priority: 1, search: "أرز+أبيض+5كغ" },
      { name: "عدس وفاصوليا", cal: 340, shelf: "10-30 سنة", qty: "500غ/شخص/أسبوع", priority: 1, search: "عدس+فاصوليا+طوارئ" },
      { name: "تونة معلبة", cal: 132, shelf: "4-5 سنوات", qty: "2 علب/شخص/أسبوع", priority: 1, search: "تونة+معلبة+كرتون" },
      { name: "حليب مجفف", cal: 490, shelf: "2-25 سنة", qty: "250غ/شخص/أسبوع", priority: 2, search: "حليب+مجفف+بقاء" },
      { name: "شوفان", cal: 389, shelf: "2-30 سنة", qty: "500غ/شخص/أسبوع", priority: 2, search: "شوفان+بكميات+كبيرة" },
      { name: "زيت زيتون", cal: 884, shelf: "سنتان", qty: "1 لتر/عائلة/شهر", priority: 2, search: "زيت+زيتون+لتر" },
      { name: "ملح، سكر، عسل", cal: 300, shelf: "غير محدود", qty: "مخزون 3 أشهر", priority: 2, search: "عسل+طبيعي" },
      { name: "طعام مجفف بالتجميد", cal: 400, shelf: "25 سنة", qty: "7 حصص/شخص", priority: 3, search: "طعام+مجفف+طوارئ" },
      { name: "شوكولاتة داكنة", cal: 546, shelf: "سنتان", qty: "500غ/شخص", priority: 3, search: "شوكولاتة+داكنة+85%" },
    ],
    tips: [
      "احسب: 2000 سعرة/بالغ/يوم. 1500 سعرة/طفل/يوم.",
      "دوّر المخزون: استهلك الأقدم أولاً.",
      "احفظ في مكان بارد وجاف ومظلم.",
      "لا تعتمد أبداً على الكهرباء للطهي.",
      "وثّق ما لديك وتواريخ انتهاء الصلاحية.",
    ],
    priorityLabel: ["حرج", "مهم", "مثالي"],
    tipsTitle: "قواعد التخزين",
  },
  zh: {
    title: "应急物资储备",
    subtitle: "警报发出后4小时内商店就会被抢空。你需要提前备好储备。",
    warning: "在武装冲突中，食品供应链在数天内崩溃。没有储备，你只能依赖别人愿意给你的东西。",
    phases: [
      { label: "阶段1：72小时", days: 3, color: "text-yellow-400", bg: "bg-yellow-400/10" },
      { label: "阶段2：2周", days: 14, color: "text-orange-400", bg: "bg-orange-400/10" },
      { label: "阶段3：3个月", days: 90, color: "text-red-400", bg: "bg-red-400/10" },
    ],
    items: [
      { name: "瓶装水", cal: 0, shelf: "2年", qty: "4升/人/天", priority: 1, search: "bottled+water+emergency" },
      { name: "白米", cal: 364, shelf: "25-30年", qty: "1公斤/人/周", priority: 1, search: "white+rice+emergency" },
      { name: "扁豆和豆类", cal: 340, shelf: "10-30年", qty: "500克/人/周", priority: 1, search: "emergency+beans+lentils" },
      { name: "罐装金枪鱼", cal: 132, shelf: "4-5年", qty: "2罐/人/周", priority: 1, search: "canned+tuna+pack" },
      { name: "奶粉", cal: 490, shelf: "2-25年", qty: "250克/人/周", priority: 2, search: "powdered+milk+emergency" },
      { name: "燕麦", cal: 389, shelf: "2-30年", qty: "500克/人/周", priority: 2, search: "rolled+oats+bulk" },
      { name: "橄榄油", cal: 884, shelf: "2年", qty: "1升/家庭/月", priority: 2, search: "olive+oil+gallon" },
      { name: "盐、糖、蜂蜜", cal: 300, shelf: "无限期", qty: "3个月存量", priority: 2, search: "raw+honey+emergency" },
      { name: "冻干食品", cal: 400, shelf: "25年", qty: "7份/人", priority: 3, search: "freeze+dried+food+emergency" },
      { name: "黑巧克力", cal: 546, shelf: "2年", qty: "500克/人", priority: 3, search: "dark+chocolate+85%" },
    ],
    tips: [
      "计算：2000千卡/成人/天。1500千卡/儿童/天。",
      "轮换库存：先消耗最旧的并补充。",
      "存放在阴凉、干燥、黑暗的地方。",
      "永远不要依赖电力烹饪。",
      "记录库存内容和到期日期。",
    ],
    priorityLabel: ["关键", "重要", "理想"],
    tipsTitle: "储存规则",
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
          {lang === "es" ? "PROTOCOLO ALIMENTARIO" : lang === "fr" ? "PROTOCOLE ALIMENTAIRE" : lang === "pt" ? "PROTOCOLO ALIMENTAR" : lang === "it" ? "PROTOCOLLO ALIMENTARE" : lang === "ar" ? "بروتوكول غذائي" : lang === "zh" ? "食品规程" : "FOOD PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{c.subtitle}</p>

      <div className="flex items-start gap-2 mb-8 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {c.phases.map((p, i) => (
          <div key={i} className={`p-3 border border-border rounded ${p.bg} text-center`}>
            <Clock className={`w-4 h-4 mx-auto mb-1 ${p.color}`} />
            <div className={`font-military text-xs tracking-wide ${p.color}`}>{p.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-8">
        {c.items.map((item, i) => (
          <div key={i} className={`flex items-center justify-between p-3 border rounded ${priorityColors[item.priority - 1]}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground">{c.priorityLabel[item.priority - 1]}</span>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex gap-3 mt-0.5">
                {item.cal > 0 && <span className="text-[10px] text-muted-foreground">{item.cal} kcal/100g</span>}
                <span className="text-[10px] text-muted-foreground">{item.shelf}</span>
                <span className="text-[10px] text-primary">{item.qty}</span>
              </div>
            </div>
            <a href={`${t.shopUrl}${item.search}`} target="_blank" rel="noopener noreferrer" className="ml-3 text-muted-foreground hover:text-primary transition-colors shrink-0">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      <div className="p-5 bg-card border border-border rounded">
        <h2 className="font-military text-sm text-foreground tracking-widest mb-3 uppercase">{c.tipsTitle}</h2>
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
