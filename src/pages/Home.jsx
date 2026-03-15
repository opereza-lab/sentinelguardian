import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { Shield, AlertTriangle, MapPin, Droplets, Package, Heart, Backpack, Map, Phone, ChevronRight, Zap, Clock, Navigation, Flame, Anchor, User } from "lucide-react";

const content = {
  es: {
    hero: { title: "EL MUNDO ESTÁ CAMBIANDO.", subtitle: "¿SABES CÓMO PROTEGER A TU FAMILIA?", desc: "Misiles balísticos, ataques de infantería, colapso de infraestructuras, terremotos, tsunamis, incendios, tornados. Ya no son escenarios de ficción. Son titulares de hoy. Cada día que pasa sin preparación disminuye las oportunidades de mantener a salvo a tu familia y los tuyos.", cta: "COMIENZA POR APRENDER LO NECESARIO" },
    urgency: { title: "LA VENTANA DE PREPARACIÓN SE CIERRA", stats: [{ val: "72h", label: "Tiempo crítico tras un ataque antes de que los suministros colapsen" }, { val: "3.2B", label: "Personas viven en zonas de conflicto activo o latente" }, { val: "89%", label: "De las familias NO están preparadas para una emergencia de 72 horas" }] },
    modulesTitle: "MÓDULOS DE SUPERVIVENCIA",
    quote: "\"No hay segundas oportunidades cuando el cielo se ilumina. Solo hay familias preparadas... y las que no lo estaban.\"",
    threatLevel: "NIVEL DE AMENAZA: CRÍTICO",
    modules: [
      { icon: AlertTriangle, title: "Amenazas Activas", desc: "Misiles, infantería, EMP. Conoce cómo actuar en los primeros segundos.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Refugios Seguros", desc: "Identifica dónde proteger a tu familia antes de que sea tarde.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Agua Potable", desc: "Sin agua potable morirás en 3 días. Aprende a conseguirla.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provisiones", desc: "Qué alimentos almacenar y cuánto tiempo te durarán.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "Primeros Auxilios", desc: "Balas, fracturas, quemaduras. Tú serás el médico de tu familia.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Nudos de Supervivencia", desc: "Los nudos esenciales que pueden salvarte la vida.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Mochila SOS", desc: "72 elementos esenciales para salir corriendo en 5 minutos.", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "Brújula Táctica", desc: "Navega sin internet usando el sol y las estrellas.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Fuego de Supervivencia", desc: "Cómo encender y mantener fuego en cualquier condición.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Números de Emergencia", desc: "Contactos críticos guardados cuando no haya tiempo.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "Perfil SOS", desc: "Tu información de emergencia lista para ser encontrado.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
  en: {
    hero: { title: "THE WORLD IS CHANGING.", subtitle: "DO YOU KNOW HOW TO PROTECT YOUR FAMILY?", desc: "Ballistic missiles, infantry attacks, infrastructure collapse, earthquakes, tsunamis, wildfires, tornadoes. These are no longer fiction. They are today's headlines. Every day without preparation reduces the chances of keeping your family and loved ones safe.", cta: "START BY LEARNING WHAT YOU NEED" },
    urgency: { title: "THE PREPARATION WINDOW IS CLOSING", stats: [{ val: "72h", label: "Critical time after an attack before supplies collapse" }, { val: "3.2B", label: "People currently live in zones of active or latent conflict" }, { val: "89%", label: "Of families are NOT prepared for a 72-hour emergency" }] },
    modulesTitle: "SURVIVAL MODULES",
    quote: "\"There are no second chances when the sky lights up. Only families that were prepared... and those that weren't.\"",
    threatLevel: "THREAT LEVEL: CRITICAL",
    modules: [
      { icon: AlertTriangle, title: "Active Threats", desc: "Missiles, infantry, EMP. Know how to act in the first seconds.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Safe Shelters", desc: "Identify where to protect your family before it's too late.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Safe Water", desc: "Without clean water you'll die in 3 days.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provisions", desc: "What to stockpile and how long it will last.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "First Aid", desc: "Gunshots, fractures, burns. You will be your family's doctor.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Survival Knots", desc: "Essential knots that can save your life.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Go-Bag", desc: "72 essentials to grab and run in 5 minutes.", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "Tactical Compass", desc: "Navigate without internet using sun and stars.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Survival Fire", desc: "How to start and maintain fire in any condition.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Emergency Numbers", desc: "Critical contacts saved when there's no time to search.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "SOS Profile", desc: "Your emergency info ready to be found and rescued.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
  fr: {
    hero: { title: "LE MONDE EST EN TRAIN DE CHANGER.", subtitle: "SAVEZ-VOUS COMMENT PROTÉGER VOTRE FAMILLE?", desc: "Missiles balistiques, attaques d'infanterie, effondrement des infrastructures, tremblements de terre, tsunamis, incendies, tornades. Ce ne sont plus des scénarios de fiction. Ce sont les titres d'aujourd'hui. Chaque jour sans préparation réduit les chances de garder votre famille et vos proches en sécurité.", cta: "COMMENCEZ PAR APPRENDRE CE QUI EST NÉCESSAIRE" },
    urgency: { title: "LA FENÊTRE DE PRÉPARATION SE FERME", stats: [{ val: "72h", label: "Temps critique après une attaque avant que les approvisionnements s'effondrent" }, { val: "3.2B", label: "Personnes vivent en zones de conflit actif ou latent" }, { val: "89%", label: "Des familles NE SONT PAS préparées pour une urgence de 72 heures" }] },
    modulesTitle: "MODULES DE SURVIE",
    quote: "\"Il n'y a pas de secondes chances quand le ciel s'illumine. Il n'y a que des familles préparées... et celles qui ne l'étaient pas.\"",
    threatLevel: "NIVEAU DE MENACE: CRITIQUE",
    modules: [
      { icon: AlertTriangle, title: "Menaces actives", desc: "Missiles, infanterie, EMP. Sachez comment agir dans les premières secondes.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Abris sûrs", desc: "Identifiez où protéger votre famille avant qu'il soit trop tard.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Eau potable", desc: "Sans eau potable vous mourrez en 3 jours.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provisions", desc: "Quels aliments stocker et combien de temps ils dureront.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "Premiers secours", desc: "Balles, fractures, brûlures. Vous serez le médecin de votre famille.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Nœuds de survie", desc: "Les nœuds essentiels qui peuvent vous sauver la vie.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Sac SOS", desc: "72 éléments essentiels pour partir en 5 minutes.", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "Boussole tactique", desc: "Naviguez sans internet grâce au soleil et aux étoiles.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Feu de survie", desc: "Comment allumer et maintenir un feu dans n'importe quelle condition.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Numéros d'urgence", desc: "Contacts critiques sauvegardés quand il n'y a pas le temps.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "Profil SOS", desc: "Vos informations d'urgence prêtes pour être retrouvé.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
  pt: {
    hero: { title: "O MUNDO ESTÁ MUDANDO.", subtitle: "VOCÊ SABE COMO PROTEGER SUA FAMÍLIA?", desc: "Mísseis balísticos, ataques de infantaria, colapso de infraestruturas, terremotos, tsunamis, incêndios, tornados. Já não são cenários de ficção. São as manchetes de hoje. Cada dia sem preparação reduz as oportunidades de manter sua família e seus entes queridos em segurança.", cta: "COMECE APRENDENDO O QUE É NECESSÁRIO" },
    urgency: { title: "A JANELA DE PREPARAÇÃO ESTÁ SE FECHANDO", stats: [{ val: "72h", label: "Tempo crítico após um ataque antes dos suprimentos colapsarem" }, { val: "3.2B", label: "Pessoas vivem em zonas de conflito ativo ou latente" }, { val: "89%", label: "Das famílias NÃO estão preparadas para uma emergência de 72 horas" }] },
    modulesTitle: "MÓDULOS DE SOBREVIVÊNCIA",
    quote: "\"Não há segunda chance quando o céu se ilumina. Só há famílias preparadas... e as que não estavam.\"",
    threatLevel: "NÍVEL DE AMEAÇA: CRÍTICO",
    modules: [
      { icon: AlertTriangle, title: "Ameaças ativas", desc: "Mísseis, infantaria, EMP. Saiba como agir nos primeiros segundos.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Abrigos seguros", desc: "Identifique onde proteger sua família antes que seja tarde.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Água potável", desc: "Sem água potável você morrerá em 3 dias.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provisões", desc: "Quais alimentos estocar e quanto tempo durarão.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "Primeiros socorros", desc: "Balas, fraturas, queimaduras. Você será o médico da sua família.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Nós de sobrevivência", desc: "Os nós essenciais que podem salvar sua vida.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Mochila SOS", desc: "72 itens essenciais para sair correndo em 5 minutos.", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "Bússola tática", desc: "Navegue sem internet usando o sol e as estrelas.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Fogo de sobrevivência", desc: "Como acender e manter fogo em qualquer condição.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Números de emergência", desc: "Contatos críticos salvos quando não há tempo.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "Perfil SOS", desc: "Suas informações de emergência prontas para ser encontrado.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
  it: {
    hero: { title: "IL MONDO STA CAMBIANDO.", subtitle: "SAI COME PROTEGGERE LA TUA FAMIGLIA?", desc: "Missili balistici, attacchi di fanteria, collasso delle infrastrutture, terremoti, tsunami, incendi, tornado. Non sono più scenari di finzione. Sono i titoli di oggi. Ogni giorno senza preparazione riduce le opportunità di tenere al sicuro la tua famiglia e i tuoi cari.", cta: "INIZIA IMPARANDO CIÒ CHE È NECESSARIO" },
    urgency: { title: "LA FINESTRA DI PREPARAZIONE SI STA CHIUDENDO", stats: [{ val: "72h", label: "Tempo critico dopo un attacco prima che i rifornimenti collassino" }, { val: "3.2B", label: "Persone vivono in zone di conflitto attivo o latente" }, { val: "89%", label: "Delle famiglie NON sono preparate per un'emergenza di 72 ore" }] },
    modulesTitle: "MODULI DI SOPRAVVIVENZA",
    quote: "\"Non ci sono seconde possibilità quando il cielo si illumina. Ci sono solo famiglie preparate... e quelle che non lo erano.\"",
    threatLevel: "LIVELLO DI MINACCIA: CRITICO",
    modules: [
      { icon: AlertTriangle, title: "Minacce attive", desc: "Missili, fanteria, EMP. Sappi come agire nei primi secondi.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "Rifugi sicuri", desc: "Identifica dove proteggere la tua famiglia prima che sia troppo tardi.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "Acqua potabile", desc: "Senza acqua potabile morirai in 3 giorni.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "Provviste", desc: "Quali alimenti conservare e quanto dureranno.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "Pronto soccorso", desc: "Proiettili, fratture, ustioni. Sarai il medico della tua famiglia.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "Nodi di sopravvivenza", desc: "I nodi essenziali che possono salvarti la vita.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "Zaino SOS", desc: "72 elementi essenziali per scappare in 5 minuti.", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "Bussola tattica", desc: "Naviga senza internet usando sole e stelle.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "Fuoco di sopravvivenza", desc: "Come accendere e mantenere il fuoco in qualsiasi condizione.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "Numeri di emergenza", desc: "Contatti critici salvati quando non c'è tempo.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "Profilo SOS", desc: "Le tue informazioni di emergenza pronte per essere trovato.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
  ar: {
    hero: { title: "العالم يتغير.", subtitle: "هل تعرف كيف تحمي عائلتك؟", desc: "صواريخ باليستية، هجمات مشاة، انهيار البنية التحتية، زلازل، أمواج تسونامي، حرائق، أعاصير. لم تعد سيناريوهات خيالية. إنها عناوين اليوم. كل يوم يمر دون استعداد يقلل من فرص الحفاظ على سلامة عائلتك وأحبائك.", cta: "ابدأ بتعلم ما هو ضروري" },
    urgency: { title: "نافذة الاستعداد تضيق", stats: [{ val: "72h", label: "الوقت الحرج بعد الهجوم قبل انهيار الإمدادات" }, { val: "3.2B", label: "شخص يعيش في مناطق نزاع نشط أو كامن" }, { val: "89%", label: "من العائلات غير مستعدة لحالة طوارئ 72 ساعة" }] },
    modulesTitle: "وحدات البقاء",
    quote: "\"لا فرص ثانية عندما يضيء السماء. هناك فقط عائلات مستعدة... وتلك التي لم تكن كذلك.\"",
    threatLevel: "مستوى التهديد: حرج",
    modules: [
      { icon: AlertTriangle, title: "التهديدات النشطة", desc: "صواريخ، مشاة، EMP. اعرف كيف تتصرف في الثواني الأولى.", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "ملاجئ آمنة", desc: "حدد أين تحمي عائلتك قبل فوات الأوان.", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "مياه آمنة", desc: "بدون ماء آمن ستموت في 3 أيام.", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "المؤن", desc: "ما يجب تخزينه وكم يدوم.", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "الإسعافات الأولية", desc: "طلق ناري، كسور، حروق. أنت طبيب عائلتك.", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "عقد البقاء", desc: "العقد الأساسية التي قد تنقذ حياتك.", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "حقيبة الطوارئ", desc: "72 عنصراً أساسياً للهروب في 5 دقائق.", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "البوصلة التكتيكية", desc: "تنقل بدون إنترنت باستخدام الشمس والنجوم.", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "نار البقاء", desc: "كيفية إشعال النار والحفاظ عليها في أي ظرف.", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "أرقام الطوارئ", desc: "جهات الاتصال الحيوية محفوظة عند الحاجة.", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "ملف SOS", desc: "معلومات طوارئك جاهزة للعثور عليك وإنقاذك.", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
  zh: {
    hero: { title: "世界正在改变。", subtitle: "你知道如何保护你的家人吗？", desc: "弹道导弹、步兵袭击、基础设施崩溃、地震、海啸、火灾、龙卷风。这些已不再是虚构场景。它们是今天的新闻头条。每一天不做准备，都会减少保护家人和亲人安全的机会。", cta: "从学习必要知识开始" },
    urgency: { title: "准备窗口正在关闭", stats: [{ val: "72小时", label: "袭击后供应崩溃前的关键时间" }, { val: "32亿", label: "人生活在活跃或潜在冲突地区" }, { val: "89%", label: "的家庭没有准备好应对72小时紧急情况" }] },
    modulesTitle: "生存模块",
    quote: "\"当天空点亮的那一刻，没有第二次机会。只有准备好的家庭……和没准备好的。\"",
    threatLevel: "威胁等级：危急",
    modules: [
      { icon: AlertTriangle, title: "活跃威胁", desc: "导弹、步兵、EMP。了解如何在最初几秒内行动。", page: "Threats", color: "text-red-500" },
      { icon: MapPin, title: "安全避难所", desc: "在太晚之前找出保护家人的地方。", page: "Shelters", color: "text-orange-400" },
      { icon: Droplets, title: "安全用水", desc: "没有干净的水3天内就会死亡。", page: "Water", color: "text-blue-400" },
      { icon: Package, title: "物资储备", desc: "储备哪些食物以及能维持多久。", page: "Food", color: "text-yellow-400" },
      { icon: Heart, title: "急救", desc: "枪伤、骨折、烧伤。你就是家人的医生。", page: "FirstAid", color: "text-red-400" },
      { icon: Anchor, title: "求生绳结", desc: "可能救命的基本绳结技术。", page: "SurvivalKnots", color: "text-cyan-400" },
      { icon: Backpack, title: "应急包", desc: "72件必备物品，5分钟内拎包就跑。", page: "GoBackpack", color: "text-primary" },
      { icon: Navigation, title: "战术罗盘", desc: "利用太阳和星星在无网络情况下导航。", page: "Compass", color: "text-teal-400" },
      { icon: Flame, title: "求生火", desc: "如何在任何条件下点燃和维持火焰。", page: "Fire", color: "text-orange-500" },
      { icon: Phone, title: "紧急电话", desc: "关键联系方式，在没有时间查找时使用。", page: "Emergency", color: "text-purple-400" },
      { icon: User, title: "SOS档案", desc: "你的紧急信息已准备好，等待被找到和救援。", page: "EmergencyProfile", color: "text-pink-400" },
    ],
  },
};

export default function Home() {
  const { lang } = useLang();
  const c = getLangContent(content, lang);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 py-16 lg:py-24 bg-gradient-to-b from-card to-background">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full alert-pulse" />
            <span className="text-accent text-xs font-bold tracking-widest uppercase">{c.threatLevel}</span>
          </div>
          <h1 className="font-military text-4xl lg:text-7xl text-foreground tracking-widest mb-2">{c.hero.title}</h1>
          <h2 className="font-military text-2xl lg:text-4xl text-primary tracking-wide mb-6">{c.hero.subtitle}</h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">{c.hero.desc}</p>
          <Link to={createPageUrl("Threats")} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-military tracking-widest px-8 py-4 rounded text-sm hover:bg-primary/90 transition-all">
            <Zap className="w-4 h-4" />
            {c.hero.cta}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

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

      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-military text-xl text-foreground tracking-widest mb-8 uppercase">{c.modulesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.modules.map(({ icon: Icon, title, desc, page, color }, i) => (
              <Link key={i} to={createPageUrl(page)} className="group flex items-start gap-4 p-5 bg-card border border-border rounded hover:border-primary/50 hover:bg-secondary transition-all">
                <div className={`mt-0.5 ${color}`}><Icon className="w-6 h-6" /></div>
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

      <section className="px-6 py-10 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-8 h-8 text-primary mx-auto mb-4 opacity-60" />
          <p className="text-muted-foreground text-sm italic leading-relaxed">{c.quote}</p>
        </div>
      </section>
    </div>
  );
}
