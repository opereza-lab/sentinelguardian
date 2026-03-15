import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { MapPin, Home, Building, Landmark, Trees, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const content = {
  es: {
    title: "REFUGIOS SEGUROS",
    subtitle: "Cuando los misiles caen, los minutos importan. Debes saber AHORA dónde llevar a tu familia.",
    evalTitle: "CÓMO EVALUAR UN REFUGIO EN 60 SEGUNDOS",
    evalItems: ["¿Está bajo tierra o en un piso bajo? +2 puntos", "¿Tiene paredes de hormigón o ladrillo grueso? +2 puntos", "¿Tiene más de una salida? +1 punto", "¿Está lejos de ventanas y cristales? +1 punto", "¿Tiene suministros de agua? +1 punto", "5+ puntos = Úsalo | 3-4 = Aceptable | <3 = Busca otro"],
    advantagesLabel: "VENTAJAS", limitationsLabel: "LIMITACIONES", tipsLabel: "CONSEJOS TÁCTICOS",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Sótano de Edificio Sólido", desc: "El refugio ideal. Máxima protección contra onda expansiva, metralla y radiación inicial.", good: ["Máxima protección contra explosiones", "Protección contra radiación inicial", "Temperatura estable"], bad: ["Riesgo de derrumbe si edificio es impactado", "Sin salida si hay escombros"], tips: ["Ubica sótanos en tu barrio HOY", "Memoriza al menos 2 rutas de acceso", "Almacena suministros básicos"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Refugio Antiaéreo Público", desc: "Instalaciones gubernamentales diseñadas para protección civil.", good: ["Diseño específico para ataques", "Ventilación filtrada", "Suministros básicos almacenados"], bad: ["Puede estar lleno", "Necesitas conocer su ubicación previa"], tips: ["Busca en tu ayuntamiento el mapa de refugios", "Regístrate en apps de protección civil"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Habitación Interior de Tu Casa", desc: "Si no puedes llegar a un refugio, el cuarto más interior es tu siguiente opción.", good: ["Siempre accesible", "Familiar con el espacio"], bad: ["Protección limitada", "Sin filtro de aire"], tips: ["Elige la habitación sin ventanas", "Ten allí agua y radio de emergencia", "Sella puertas con cinta si hay amenaza química"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Terreno Natural / Depresiones del Suelo", desc: "Último recurso en campo abierto.", good: ["Siempre disponible en exterior", "Reduce exposición a metralla"], bad: ["Protección mínima", "Sin protección radiológica"], tips: ["Busca zanjas, cunetas, barrancos", "Ponte boca abajo, cabeza alejada de la explosión", "Cubre nuca con brazos"] },
    ],
  },
  en: {
    title: "SAFE SHELTERS",
    subtitle: "When missiles fall, minutes matter. You must know NOW where to take your family.",
    evalTitle: "HOW TO EVALUATE A SHELTER IN 60 SECONDS",
    evalItems: ["Is it underground or on a low floor? +2 points", "Does it have concrete or thick brick walls? +2 points", "Does it have more than one exit? +1 point", "Is it away from windows and glass? +1 point", "Does it have water supplies? +1 point", "5+ points = Use it | 3-4 = Acceptable | <3 = Find another"],
    advantagesLabel: "ADVANTAGES", limitationsLabel: "LIMITATIONS", tipsLabel: "TACTICAL TIPS",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Solid Building Basement", desc: "The ideal shelter. Maximum protection against blast wave, shrapnel and initial radiation.", good: ["Maximum blast protection", "Initial radiation protection", "Stable temperature"], bad: ["Collapse risk if building is hit", "No exit if rubble blocks doors"], tips: ["Locate basements in your neighborhood TODAY", "Memorize at least 2 access routes", "Store basic supplies if you have access"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Public Air Raid Shelter", desc: "Government facilities specifically designed for civil protection.", good: ["Attack-specific design", "Filtered ventilation", "Stored basic supplies"], bad: ["May be full during mass attack", "You need to know its location beforehand"], tips: ["Check your city hall for shelter maps", "Register with local civil protection apps"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Interior Room of Your Home", desc: "If you can't reach a shelter, the most interior room is your next option.", good: ["Always accessible", "Familiar with the space"], bad: ["Limited protection", "No air filter"], tips: ["Choose the room with no windows", "Keep water and emergency radio there", "Seal doors with tape if chemical threat"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Natural Terrain / Ground Depressions", desc: "Last resort in open field.", good: ["Always available outdoors", "Reduces shrapnel exposure"], bad: ["Minimal protection", "No radiological protection"], tips: ["Look for ditches, gutters, ravines", "Lie face down, head away from explosion", "Cover neck and head with arms"] },
    ],
  },
  fr: {
    title: "ABRIS SÛRS",
    subtitle: "Quand les missiles tombent, les minutes comptent. Vous devez savoir MAINTENANT où emmener votre famille.",
    evalTitle: "COMMENT ÉVALUER UN ABRI EN 60 SECONDES",
    evalItems: ["Est-il souterrain ou en bas étage? +2 points", "A-t-il des murs en béton ou brique épaisse? +2 points", "A-t-il plus d'une sortie? +1 point", "Est-il loin des fenêtres? +1 point", "A-t-il des réserves d'eau? +1 point", "5+ points = Utilisez-le | 3-4 = Acceptable | <3 = Cherchez un autre"],
    advantagesLabel: "AVANTAGES", limitationsLabel: "LIMITATIONS", tipsLabel: "CONSEILS TACTIQUES",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Sous-sol de bâtiment solide", desc: "L'abri idéal. Protection maximale contre l'onde de choc, les éclats et les rayonnements.", good: ["Protection maximale contre les explosions", "Protection contre les rayonnements", "Température stable"], bad: ["Risque d'effondrement si le bâtiment est touché", "Sans issue si des décombres bloquent"], tips: ["Repérez les sous-sols de votre quartier MAINTENANT", "Mémorisez au moins 2 voies d'accès", "Stockez des provisions de base"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Abri anti-aérien public", desc: "Installations gouvernementales conçues pour la protection civile.", good: ["Conception spécifique aux attaques", "Ventilation filtrée", "Provisions de base stockées"], bad: ["Peut être plein lors d'une attaque massive", "Il faut connaître son emplacement à l'avance"], tips: ["Consultez votre mairie pour les cartes d'abris", "Inscrivez-vous aux applications de protection civile"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Pièce intérieure de votre maison", desc: "Si vous ne pouvez pas atteindre un abri, la pièce la plus intérieure est votre prochaine option.", good: ["Toujours accessible", "Familier avec l'espace"], bad: ["Protection limitée", "Pas de filtre à air"], tips: ["Choisissez la pièce sans fenêtres", "Gardez-y de l'eau et une radio d'urgence", "Scellez les portes avec du ruban adhésif si menace chimique"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Terrain naturel / dépressions du sol", desc: "Dernier recours en terrain découvert.", good: ["Toujours disponible à l'extérieur", "Réduit l'exposition aux éclats"], bad: ["Protection minimale", "Aucune protection radiologique"], tips: ["Cherchez des fossés, caniveaux, ravins", "Allongez-vous face contre terre, tête à l'opposé de l'explosion", "Couvrez la nuque avec les bras"] },
    ],
  },
  pt: {
    title: "ABRIGOS SEGUROS",
    subtitle: "Quando os mísseis caem, os minutos importam. Você deve saber AGORA onde levar sua família.",
    evalTitle: "COMO AVALIAR UM ABRIGO EM 60 SEGUNDOS",
    evalItems: ["É subterrâneo ou em andar baixo? +2 pontos", "Tem paredes de concreto ou tijolo grosso? +2 pontos", "Tem mais de uma saída? +1 ponto", "Fica longe de janelas? +1 ponto", "Tem reservas de água? +1 ponto", "5+ pontos = Use | 3-4 = Aceitável | <3 = Procure outro"],
    advantagesLabel: "VANTAGENS", limitationsLabel: "LIMITAÇÕES", tipsLabel: "DICAS TÁTICAS",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Porão de edifício sólido", desc: "O abrigo ideal. Proteção máxima contra onda de choque, estilhaços e radiação inicial.", good: ["Proteção máxima contra explosões", "Proteção contra radiação inicial", "Temperatura estável"], bad: ["Risco de colapso se o edifício for atingido", "Sem saída se há escombros"], tips: ["Localize porões no seu bairro HOJE", "Memorize pelo menos 2 rotas de acesso", "Armazene suprimentos básicos"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Abrigo antiaéreo público", desc: "Instalações governamentais projetadas para proteção civil.", good: ["Design específico para ataques", "Ventilação filtrada", "Suprimentos básicos armazenados"], bad: ["Pode estar lotado", "Precisa conhecer a localização com antecedência"], tips: ["Verifique na prefeitura o mapa de abrigos", "Registre-se em aplicativos de proteção civil"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Cômodo interior da sua casa", desc: "Se não puder chegar a um abrigo, o cômodo mais interior é sua próxima opção.", good: ["Sempre acessível", "Familiar com o espaço"], bad: ["Proteção limitada", "Sem filtro de ar"], tips: ["Escolha o cômodo sem janelas", "Tenha água e rádio de emergência lá", "Sele portas com fita se houver ameaça química"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Terreno natural / depressões do solo", desc: "Último recurso em campo aberto.", good: ["Sempre disponível ao ar livre", "Reduz exposição a estilhaços"], bad: ["Proteção mínima", "Sem proteção radiológica"], tips: ["Procure valas, sarjetas, ravinas", "Deite de bruços, cabeça oposta à explosão", "Cubra a nuca com os braços"] },
    ],
  },
  it: {
    title: "RIFUGI SICURI",
    subtitle: "Quando cadono i missili, i minuti contano. Devi sapere ORA dove portare la tua famiglia.",
    evalTitle: "COME VALUTARE UN RIFUGIO IN 60 SECONDI",
    evalItems: ["È sotterraneo o a un piano basso? +2 punti", "Ha muri in cemento o mattoni spessi? +2 punti", "Ha più di un'uscita? +1 punto", "È lontano da finestre e vetri? +1 punto", "Ha riserve d'acqua? +1 punto", "5+ punti = Usalo | 3-4 = Accettabile | <3 = Cercane un altro"],
    advantagesLabel: "VANTAGGI", limitationsLabel: "LIMITAZIONI", tipsLabel: "CONSIGLI TATTICI",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "Scantinato di edificio solido", desc: "Il rifugio ideale. Massima protezione contro l'onda d'urto, schegge e radiazioni iniziali.", good: ["Massima protezione dalle esplosioni", "Protezione dalle radiazioni iniziali", "Temperatura stabile"], bad: ["Rischio di crollo se l'edificio viene colpito", "Senza uscita se i detriti bloccano"], tips: ["Individua scantinati nel tuo quartiere OGGI", "Memorizza almeno 2 percorsi di accesso", "Conserva rifornimenti di base"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "Rifugio antiaereo pubblico", desc: "Strutture governative progettate per la protezione civile.", good: ["Progettazione specifica per gli attacchi", "Ventilazione filtrata", "Rifornimenti di base immagazzinati"], bad: ["Potrebbe essere pieno", "Devi conoscerne la posizione in anticipo"], tips: ["Controlla presso il comune la mappa dei rifugi", "Registrati sulle app di protezione civile locale"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "Stanza interna della tua casa", desc: "Se non riesci a raggiungere un rifugio, la stanza più interna è la tua prossima opzione.", good: ["Sempre accessibile", "Familiare con lo spazio"], bad: ["Protezione limitata", "Nessun filtro dell'aria"], tips: ["Scegli la stanza senza finestre", "Tienivi acqua e radio di emergenza", "Sigilla porte e finestre con nastro adesivo in caso di minaccia chimica"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "Terreno naturale / avvallamenti del suolo", desc: "Ultima risorsa in campo aperto.", good: ["Sempre disponibile all'esterno", "Riduce l'esposizione alle schegge"], bad: ["Protezione minima", "Nessuna protezione radiologica"], tips: ["Cerca fossati, cunette, burroni", "Stenditi a faccia in giù, testa lontana dall'esplosione", "Copri la nuca con le braccia"] },
    ],
  },
  ar: {
    title: "ملاجئ آمنة",
    subtitle: "عندما تسقط الصواريخ، الدقائق تهم. يجب أن تعرف الآن أين تأخذ عائلتك.",
    evalTitle: "كيفية تقييم ملجأ في 60 ثانية",
    evalItems: ["هل هو تحت الأرض أو في طابق سفلي؟ +2 نقاط", "هل له جدران خرسانية أو طوب سميك؟ +2 نقاط", "هل له أكثر من مخرج واحد؟ +1 نقطة", "هل هو بعيد عن النوافذ؟ +1 نقطة", "هل له احتياطيات مياه؟ +1 نقطة", "5+ نقاط = استخدمه | 3-4 = مقبول | أقل من 3 = ابحث عن آخر"],
    advantagesLabel: "المزايا", limitationsLabel: "القيود", tipsLabel: "نصائح تكتيكية",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "قبو مبنى متين", desc: "الملجأ المثالي. أقصى حماية من موجة الانفجار والشظايا والإشعاع الأولي.", good: ["أقصى حماية من الانفجارات", "حماية من الإشعاع الأولي", "درجة حرارة مستقرة"], bad: ["خطر الانهيار إذا أُصيب المبنى", "لا مخرج إذا انسدّ بالحطام"], tips: ["حدّد أقبية في حيّك اليوم", "احفظ مسارَين على الأقل للوصول", "خزّن مؤناً أساسية إذا أمكن"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "ملجأ مضاد للغارات الجوية العام", desc: "منشآت حكومية مصممة للحماية المدنية.", good: ["تصميم خاص للهجمات", "تهوية مفلترة", "مؤن أساسية مخزنة"], bad: ["قد يكون ممتلئاً", "تحتاج لمعرفة موقعه مسبقاً"], tips: ["تحقق من خريطة الملاجئ في بلديتك", "سجّل في تطبيقات الحماية المدنية المحلية"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "غرفة داخلية في منزلك", desc: "إذا لم تتمكن من الوصول إلى ملجأ، فالغرفة الأكثر داخلية هي الخيار التالي.", good: ["دائماً متاحة", "تعرف المكان جيداً"], bad: ["حماية محدودة", "لا فلتر للهواء"], tips: ["اختر الغرفة بدون نوافذ", "اجعل المياه والراديو فيها", "أغلق الأبواب والنوافذ بشريط لاصق عند تهديد كيميائي"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "التضاريس الطبيعية / المنخفضات", desc: "الملاذ الأخير في الفضاء المفتوح.", good: ["دائماً متاح في الخارج", "يقلل التعرض للشظايا"], bad: ["حماية ضئيلة", "لا حماية إشعاعية"], tips: ["ابحث عن خنادق وحفر ومنخفضات", "استلق وجهاً للأرض، رأسك بعيد عن الانفجار", "غطّ رقبتك بذراعيك"] },
    ],
  },
  zh: {
    title: "安全避难所",
    subtitle: "当导弹落下时，分秒必争。你现在就必须知道把家人带到哪里。",
    evalTitle: "如何在60秒内评估避难所",
    evalItems: ["是地下或低层建筑？+2分", "有混凝土或厚砖墙？+2分", "有多个出口？+1分", "远离窗户和玻璃？+1分", "有水源储备？+1分", "5分以上=使用 | 3-4分=可接受 | 3分以下=找其他地方"],
    advantagesLabel: "优点", limitationsLabel: "局限性", tipsLabel: "战术建议",
    types: [
      { icon: Building, color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", rating: 5, title: "坚固建筑的地下室", desc: "理想避难所。对爆炸冲击波、弹片和初始辐射有最大防护。", good: ["对爆炸的最大防护", "初始辐射防护", "温度稳定"], bad: ["若建筑被击中有坍塌风险", "若被碎石封堵则无法出逃"], tips: ["今天就找出你所在社区的地下室", "记住至少2条进入路线", "如有机会储备基本物资"] },
      { icon: Landmark, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", rating: 4, title: "公共防空洞", desc: "专为民防设计的政府设施。", good: ["专门针对袭击设计", "过滤通风", "存有基本物资"], bad: ["大规模袭击时可能已满员", "需要提前知道位置"], tips: ["向当地政府查询避难所地图", "注册当地民防应用程序"] },
      { icon: Home, color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", rating: 3, title: "家中的内部房间", desc: "如果无法到达避难所，家中最内侧的房间是下一个选择。", good: ["随时可进入", "熟悉空间"], bad: ["防护有限", "无空气过滤"], tips: ["选择没有窗户的房间", "在那里备好水和应急收音机", "化学威胁时用胶带密封门窗"] },
      { icon: Trees, color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", rating: 2, title: "自然地形/地面凹陷处", desc: "在开阔地带的最后手段。", good: ["户外随时可用", "减少弹片暴露"], bad: ["防护极少", "无放射性防护"], tips: ["寻找沟渠、排水沟、峡谷", "俯卧，头部远离爆炸方向", "用双臂保护颈部和头部"] },
    ],
  },
};

export default function Shelters() {
  const { lang } = useLang();
  const c = getLangContent(content, lang);
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-orange-400" />
        <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO DE REFUGIO" : lang === "fr" ? "PROTOCOLE D'ABRI" : lang === "pt" ? "PROTOCOLO DE ABRIGO" : lang === "it" ? "PROTOCOLLO RIFUGIO" : lang === "ar" ? "بروتوكول الملجأ" : lang === "zh" ? "避难规程" : "SHELTER PROTOCOL"}
        </span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{c.subtitle}</p>

      <div className="space-y-3 mb-10">
        {c.types.map((type, idx) => {
          const Icon = type.icon;
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`border rounded overflow-hidden ${type.border}`}>
              <button onClick={() => setOpenIdx(isOpen ? null : idx)} className={`w-full flex items-center justify-between p-5 ${type.bg} transition-all`}>
                <div className="flex items-center gap-4">
                  <Icon className={`w-6 h-6 ${type.color}`} />
                  <div className="text-left">
                    <div className="flex gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < type.rating ? "bg-primary" : "bg-border"}`} />
                      ))}
                    </div>
                    <div className="font-military text-sm text-foreground tracking-wide">{type.title}</div>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="p-5 bg-card border-t border-border space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">{c.advantagesLabel}</span>
                      </div>
                      <ul className="space-y-1">
                        {type.good.map((g, i) => <li key={i} className="text-xs text-foreground flex items-start gap-2"><span className="text-green-400 shrink-0">+</span>{g}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">{c.limitationsLabel}</span>
                      </div>
                      <ul className="space-y-1">
                        {type.bad.map((b, i) => <li key={i} className="text-xs text-foreground flex items-start gap-2"><span className="text-red-400 shrink-0">–</span>{b}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{c.tipsLabel}</span>
                    </div>
                    <ul className="space-y-1">
                      {type.tips.map((tip, i) => <li key={i} className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-primary shrink-0">›</span>{tip}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-card border border-border rounded">
        <h2 className="font-military text-sm text-foreground tracking-widest mb-4 uppercase">{c.evalTitle}</h2>
        <ul className="space-y-2">
          {c.evalItems.map((item, i) => (
            <li key={i} className={`text-sm flex items-start gap-2 ${i === c.evalItems.length - 1 ? "text-primary font-bold pt-2 border-t border-border mt-3" : "text-muted-foreground"}`}>
              <span className="text-primary shrink-0">{i + 1 < c.evalItems.length ? `${i + 1}.` : "→"}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
