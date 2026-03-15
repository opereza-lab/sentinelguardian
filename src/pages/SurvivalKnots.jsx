import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { ChevronDown, ChevronUp, Anchor, ImageIcon, X, Play } from "lucide-react";

const VIDEO_URL = "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/The%2010%20BEST%20Knots%20in%20Life%20%5BFor%20VISUAL%20Learners%5D(1).mp4";
const YOUTUBE_URL = "https://www.youtube.com/watch?v=5lLPAHK_k6I";
const CHANNEL_URL = "https://www.youtube.com/@TheBearEssentials";
const CHANNEL_NAME = "@TheBearEssentials";

const uiText = {
  es: {
    title: "Nudos de Supervivencia",
    subtitle: "Dominar estos nudos puede salvar tu vida en situaciones extremas.",
    mainUseLabel: "Uso principal",
    typicalUsesLabel: "Usos típicos",
    prosLabel: "Ventajas",
    consLabel: "Limitaciones",
    tipLabel: "Consejo táctico",
    viewImageLabel: "Ver imagen",
    noImageLabel: "Imagen no disponible aún",
    tagline: "PROTOCOLO DE SUPERVIVENCIA",
    videoBtn: "▶  VIDEO TUTORIAL DE NUDOS",
    videoTitle: "Video Tutorial de Nudos",
    videoCredit: "Video con autorización de",
    videoNote: "Visita el canal para más contenido de supervivencia",
    offlineNote: "Disponible sin conexión a internet",
  },
  en: {
    title: "Survival Knots",
    subtitle: "Mastering these knots can save your life in extreme situations.",
    mainUseLabel: "Main use",
    typicalUsesLabel: "Typical uses",
    prosLabel: "Advantages",
    consLabel: "Limitations",
    tipLabel: "Tactical tip",
    viewImageLabel: "View image",
    noImageLabel: "Image not available yet",
    tagline: "SURVIVAL PROTOCOL",
    videoBtn: "▶  KNOTS VIDEO TUTORIAL",
    videoTitle: "Knots Video Tutorial",
    videoCredit: "Video used with permission from",
    videoNote: "Visit the channel for more survival content",
    offlineNote: "Available offline",
  },
  fr: {
    title: "Nœuds de Survie",
    subtitle: "Maîtriser ces nœuds peut vous sauver la vie dans des situations extrêmes.",
    mainUseLabel: "Utilisation principale",
    typicalUsesLabel: "Utilisations typiques",
    prosLabel: "Avantages",
    consLabel: "Limitations",
    tipLabel: "Conseil tactique",
    viewImageLabel: "Voir image",
    noImageLabel: "Image non disponible",
    tagline: "PROTOCOLE DE SURVIE",
    videoBtn: "▶  TUTORIEL VIDÉO DES NŒUDS",
    videoTitle: "Tutoriel Vidéo des Nœuds",
    videoCredit: "Vidéo utilisée avec la permission de",
    videoNote: "Visitez la chaîne pour plus de contenu de survie",
    offlineNote: "Disponible hors ligne",
  },
  pt: {
    title: "Nós de Sobrevivência",
    subtitle: "Dominar estes nós pode salvar sua vida em situações extremas.",
    mainUseLabel: "Uso principal",
    typicalUsesLabel: "Usos típicos",
    prosLabel: "Vantagens",
    consLabel: "Limitações",
    tipLabel: "Dica tática",
    viewImageLabel: "Ver imagem",
    noImageLabel: "Imagem não disponível",
    tagline: "PROTOCOLO DE SOBREVIVÊNCIA",
    videoBtn: "▶  TUTORIAL EM VÍDEO DE NÓS",
    videoTitle: "Tutorial em Vídeo de Nós",
    videoCredit: "Vídeo usado com permissão de",
    videoNote: "Visite o canal para mais conteúdo de sobrevivência",
    offlineNote: "Disponível offline",
  },
  it: {
    title: "Nodi di Sopravvivenza",
    subtitle: "Padroneggiare questi nodi può salvarti la vita in situazioni estreme.",
    mainUseLabel: "Uso principale",
    typicalUsesLabel: "Usi tipici",
    prosLabel: "Vantaggi",
    consLabel: "Limitazioni",
    tipLabel: "Consiglio tattico",
    viewImageLabel: "Vedi immagine",
    noImageLabel: "Immagine non disponibile",
    tagline: "PROTOCOLLO DI SOPRAVVIVENZA",
    videoBtn: "▶  VIDEO TUTORIAL DEI NODI",
    videoTitle: "Video Tutorial dei Nodi",
    videoCredit: "Video usato con il permesso di",
    videoNote: "Visita il canale per altri contenuti di sopravvivenza",
    offlineNote: "Disponibile offline",
  },
  ar: {
    title: "عقد البقاء",
    subtitle: "إتقان هذه العقد قد ينقذ حياتك في المواقف القصوى.",
    mainUseLabel: "الاستخدام الرئيسي",
    typicalUsesLabel: "الاستخدامات النموذجية",
    prosLabel: "المزايا",
    consLabel: "القيود",
    tipLabel: "نصيحة تكتيكية",
    viewImageLabel: "عرض الصورة",
    noImageLabel: "الصورة غير متوفرة",
    tagline: "بروتوكول البقاء",
    videoBtn: "▶  فيديو تعليمي للعقد",
    videoTitle: "فيديو تعليمي للعقد",
    videoCredit: "فيديو بإذن من",
    videoNote: "زر القناة لمزيد من محتوى البقاء",
    offlineNote: "متاح بدون إنترنت",
  },
  zh: {
    title: "求生绳结",
    subtitle: "掌握这些绳结可能在极端情况下救你的命。",
    mainUseLabel: "主要用途",
    typicalUsesLabel: "典型用途",
    prosLabel: "优点",
    consLabel: "局限性",
    tipLabel: "战术提示",
    viewImageLabel: "查看图片",
    noImageLabel: "图片暂不可用",
    tagline: "生存规程",
    videoBtn: "▶  绳结视频教程",
    videoTitle: "绳结视频教程",
    videoCredit: "视频已获授权，来自",
    videoNote: "访问频道获取更多生存内容",
    offlineNote: "可离线使用",
  },
};

const knots = [
  {
    id: "clove_hitch",
    name: "Clove Hitch",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/081426e68_CloveHitch.png",
    mainUse: { es: "Fijar rápidamente una cuerda a un poste, rama o palo de refugio.", en: "Quickly secure a rope to a post, branch, or shelter pole.", fr: "Fixer rapidement une corde à un poteau, une branche ou un piquet d'abri.", pt: "Fixar rapidamente uma corda a um poste, galho ou estaca de abrigo.", it: "Fissare rapidamente una corda a un palo, ramo o piolo di rifugio.", ar: "تثبيت حبل بسرعة على عمود أو غصن أو عصا ملجأ.", zh: "快速将绳子固定在柱子、树枝或庇护所支柱上。" },
    typicalUses: { es: ["Iniciar amarres (lashing)", "Sujetar lona", "Fijar cuerdas temporales"], en: ["Starting lashings", "Securing tarps", "Temporary rope fixing"], fr: ["Démarrer des ligatures", "Sécuriser des bâches", "Fixation temporaire de corde"], pt: ["Iniciar amarrações", "Fixar lonas", "Fixação temporária de cordas"], it: ["Iniziare le legature", "Fissare teli", "Fissaggio temporaneo di corde"], ar: ["بدء الربط", "تثبيت المشمع", "تثبيت الحبال المؤقت"], zh: ["开始绑扎", "固定防水布", "临时固定绳子"] },
    pros: { es: ["Muy rápido de hacer", "Fácil de ajustar", "Fácil de desatar"], en: ["Very quick to tie", "Easy to adjust", "Easy to untie"], fr: ["Très rapide à faire", "Facile à ajuster", "Facile à défaire"], pt: ["Muito rápido de fazer", "Fácil de ajustar", "Fácil de desfazer"], it: ["Molto veloce da fare", "Facile da regolare", "Facile da sciogliere"], ar: ["سريع جداً في العقد", "سهل التعديل", "سهل الحل"], zh: ["打结非常快", "易于调整", "容易解开"] },
    cons: { es: ["Puede aflojarse si la carga cambia"], en: ["Can loosen if load shifts"], fr: ["Peut se desserrer si la charge change"], pt: ["Pode afrouxar se a carga mudar"], it: ["Può allentarsi se il carico cambia"], ar: ["قد يرتخي إذا تغير الحمل"], zh: ["如果载荷发生变化可能会松动"] },
    tip: { es: "Se suele usar con medio nudo de seguridad.", en: "Usually used with a half hitch for security.", fr: "Généralement utilisé avec un demi-clé de sécurité.", pt: "Geralmente usado com um nó de segurança.", it: "Di solito usato con un mezzo nodo di sicurezza.", ar: "يستخدم عادةً مع عقدة نصف للأمان.", zh: "通常与半结一起使用以确保安全。" },
  },
  {
    id: "sheet_bend",
    name: "Sheet Bend",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/69576401f_SheetBend.png",
    mainUse: { es: "Unir dos cuerdas, especialmente de distinto diámetro o material.", en: "Join two ropes, especially of different diameters or materials.", fr: "Relier deux cordes, surtout de diamètres ou matériaux différents.", pt: "Unir duas cordas, especialmente de diâmetros ou materiais diferentes.", it: "Unire due corde, specialmente di diametri o materiali diversi.", ar: "ربط حبلين معاً، خاصةً من أقطار أو مواد مختلفة.", zh: "连接两根绳子，特别是不同直径或材质的绳子。" },
    typicalUses: { es: ["Extender cuerda", "Reparar cuerda rota", "Unir paracord con cuerda gruesa"], en: ["Extending rope", "Repairing broken rope", "Joining paracord with thick rope"], fr: ["Allonger une corde", "Réparer une corde cassée", "Relier paracorde avec une grosse corde"], pt: ["Estender corda", "Reparar corda quebrada", "Unir paracord com corda grossa"], it: ["Allungare la corda", "Riparare una corda rotta", "Unire paracord con corda spessa"], ar: ["تمديد الحبل", "إصلاح الحبل المكسور", "ربط حبل الباراكورد بحبل سميك"], zh: ["延长绳子", "修复断绳", "将伞绳与粗绳连接"] },
    pros: { es: ["Muy seguro", "No se resbala con cuerdas distintas", "Fácil de desatar"], en: ["Very secure", "Doesn't slip with different ropes", "Easy to untie after load"], fr: ["Très sûr", "Ne glisse pas avec des cordes différentes", "Facile à défaire"], pt: ["Muito seguro", "Não desliza com cordas diferentes", "Fácil de desfazer"], it: ["Molto sicuro", "Non scivola con corde diverse", "Facile da sciogliere"], ar: ["آمن جداً", "لا ينزلق مع الحبال المختلفة", "سهل الحل بعد التحميل"], zh: ["非常牢固", "不同绳子也不会打滑", "卸载后容易解开"] },
    cons: { es: ["Si la carga es muy fuerte se usa Double Sheet Bend"], en: ["For heavy loads use Double Sheet Bend"], fr: ["Pour les charges lourdes utiliser le Double Sheet Bend"], pt: ["Para cargas pesadas usar o Double Sheet Bend"], it: ["Per carichi pesanti usare il Double Sheet Bend"], ar: ["للأحمال الثقيلة استخدم عقدة المصراع المزدوجة"], zh: ["重载时使用双编结"] },
    tip: null,
  },
  {
    id: "constrictor",
    name: "Constrictor Knot",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/fe8d5eb72_Constrictor.png",
    mainUse: { es: "Atar algo muy firmemente.", en: "Bind something extremely tightly.", fr: "Lier quelque chose très fermement.", pt: "Atar algo muito firmemente.", it: "Legare qualcosa molto saldamente.", ar: "ربط شيء بإحكام شديد.", zh: "极紧地绑住某物。" },
    typicalUses: { es: ["Cerrar bolsas", "Fijar vendajes", "Asegurar cargas", "Amarrar ramas"], en: ["Closing bags", "Securing bandages", "Fastening loads", "Binding branches"], fr: ["Fermer des sacs", "Fixer des bandages", "Sécuriser des charges", "Lier des branches"], pt: ["Fechar sacos", "Fixar ataduras", "Segurar cargas", "Amarrar galhos"], it: ["Chiudere sacchi", "Fissare bende", "Assicurare carichi", "Legare rami"], ar: ["إغلاق الأكياس", "تثبيت الضمادات", "تأمين الأحمال", "ربط الأغصان"], zh: ["关闭袋子", "固定绷带", "紧固载荷", "捆绑树枝"] },
    pros: { es: ["Extremadamente firme", "No se desliza", "Ocupa poco espacio"], en: ["Extremely firm", "Doesn't slip", "Takes up little space"], fr: ["Extrêmement ferme", "Ne glisse pas", "Prend peu de place"], pt: ["Extremamente firme", "Não desliza", "Ocupa pouco espaço"], it: ["Estremamente fermo", "Non scivola", "Occupa poco spazio"], ar: ["صلب للغاية", "لا ينزلق", "يأخذ مساحة صغيرة"], zh: ["极其牢固", "不会打滑", "占用空间小"] },
    cons: { es: ["Difícil de desatar", "A veces hay que cortarlo"], en: ["Difficult to untie", "Sometimes must be cut off"], fr: ["Difficile à défaire", "Parfois il faut le couper"], pt: ["Difícil de desfazer", "Às vezes precisa ser cortado"], it: ["Difficile da sciogliere", "A volte bisogna tagliarlo"], ar: ["صعب الحل", "أحياناً يجب قطعه"], zh: ["难以解开", "有时必须剪断"] },
    tip: null,
  },
  {
    id: "square_lashing",
    name: "Square Lashing",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/554549bf2_LazoCuadrado.png",
    mainUse: { es: "Unir dos palos en ángulo recto.", en: "Join two poles at right angles.", fr: "Relier deux perches à angle droit.", pt: "Unir dois paus em ângulo reto.", it: "Unire due pali ad angolo retto.", ar: "ربط عمودين بزاوية قائمة.", zh: "将两根杆子以直角连接。" },
    typicalUses: { es: ["Refugios", "Trípodes", "Camillas improvisadas", "Estructuras de campamento"], en: ["Shelters", "Tripods", "Improvised stretchers", "Camp structures"], fr: ["Abris", "Trépieds", "Civières improvisées", "Structures de camp"], pt: ["Abrigos", "Tripés", "Macas improvisadas", "Estruturas de acampamento"], it: ["Rifugi", "Treppiedi", "Barelle improvvisate", "Strutture di campo"], ar: ["الملاجئ", "الحوامل الثلاثية", "النقالات المرتجلة", "هياكل المخيم"], zh: ["庇护所", "三脚架", "临时担架", "营地结构"] },
    pros: { es: ["Muy resistente", "Distribuye bien la carga", "Permite construir estructuras"], en: ["Very strong", "Distributes load well", "Allows building structures"], fr: ["Très résistant", "Distribue bien la charge", "Permet de construire des structures"], pt: ["Muito resistente", "Distribui bem a carga", "Permite construir estruturas"], it: ["Molto resistente", "Distribuisce bene il carico", "Permette di costruire strutture"], ar: ["قوي جداً", "يوزع الحمل بشكل جيد", "يسمح ببناء هياكل"], zh: ["非常坚固", "均匀分配载荷", "可以建造结构"] },
    cons: { es: ["Requiere varios giros", "Necesita un buen nudo inicial"], en: ["Requires several wraps", "Needs a good starting knot"], fr: ["Nécessite plusieurs tours", "A besoin d'un bon nœud de départ"], pt: ["Requer várias voltas", "Precisa de um bom nó inicial"], it: ["Richiede diversi giri", "Ha bisogno di un buon nodo iniziale"], ar: ["يتطلب عدة لفات", "يحتاج عقدة بداية جيدة"], zh: ["需要多次缠绕", "需要好的起始结"] },
    tip: null,
  },
  {
    id: "truckers_hitch",
    name: "Trucker's Hitch",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/c20e1bf20_TruckersHitch.png",
    mainUse: { es: "Tensar cuerdas con fuerza. Funciona como polea improvisada.", en: "Tension ropes with force. Works as an improvised pulley.", fr: "Tendre les cordes avec force. Fonctionne comme une poulie improvisée.", pt: "Tensionar cordas com força. Funciona como uma polia improvisada.", it: "Tendere le corde con forza. Funziona come una carrucola improvvisata.", ar: "شد الحبال بقوة. يعمل كبكرة مرتجلة.", zh: "用力拉紧绳子。作为临时滑轮使用。" },
    typicalUses: { es: ["Asegurar carga", "Tensar refugios", "Fijar equipo en vehículo"], en: ["Securing loads", "Tensioning shelters", "Securing gear to vehicles"], fr: ["Sécuriser des charges", "Tendre des abris", "Fixer l'équipement aux véhicules"], pt: ["Segurar cargas", "Tensionar abrigos", "Fixar equipamento em veículos"], it: ["Assicurare carichi", "Tendere rifugi", "Fissare attrezzatura ai veicoli"], ar: ["تأمين الأحمال", "شد الملاجئ", "تثبيت المعدات على المركبات"], zh: ["固定载荷", "拉紧庇护所", "将装备固定在车辆上"] },
    pros: { es: ["Genera mucha tensión", "Ajustable", "Muy fuerte"], en: ["Generates high tension", "Adjustable", "Very strong"], fr: ["Génère beaucoup de tension", "Réglable", "Très fort"], pt: ["Gera muita tensão", "Ajustável", "Muito forte"], it: ["Genera molta tensione", "Regolabile", "Molto forte"], ar: ["يولد شداً كبيراً", "قابل للتعديل", "قوي جداً"], zh: ["产生高张力", "可调节", "非常牢固"] },
    cons: { es: ["Requiere varios pasos", "Hay que asegurar con medio nudo al final"], en: ["Requires several steps", "Must be finished with a half hitch"], fr: ["Nécessite plusieurs étapes", "Doit être terminé avec un demi-clé"], pt: ["Requer vários passos", "Deve ser finalizado com um nó de segurança"], it: ["Richiede diversi passaggi", "Deve essere finito con un mezzo nodo"], ar: ["يتطلب عدة خطوات", "يجب إنهاؤه بعقدة نصف"], zh: ["需要多个步骤", "必须用半结完成"] },
    tip: null,
  },
  {
    id: "bowline",
    name: "Bowline (As de guía)",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/e49ddc684_BOWLINE.png",
    mainUse: { es: "Crear un lazo fijo que no se aprieta bajo carga.", en: "Create a fixed loop that does not tighten under load.", fr: "Créer une boucle fixe qui ne se resserre pas sous charge.", pt: "Criar uma alça fixa que não aperta sob carga.", it: "Creare un anello fisso che non si stringe sotto carico.", ar: "إنشاء حلقة ثابتة لا تشتد تحت الحمل.", zh: "创建一个在载荷下不会收紧的固定环。" },
    typicalUses: { es: ["Rescate", "Bajar objetos", "Amarrar a árbol", "Arnés improvisado"], en: ["Rescue", "Lowering objects", "Tying to a tree", "Improvised harness"], fr: ["Sauvetage", "Descendre des objets", "Attacher à un arbre", "Harnais improvisé"], pt: ["Resgate", "Descer objetos", "Amarrar em árvore", "Arnês improvisado"], it: ["Salvataggio", "Calare oggetti", "Legare a un albero", "Imbracatura improvvisata"], ar: ["الإنقاذ", "إنزال الأشياء", "الربط بشجرة", "حزام أمان مرتجل"], zh: ["救援", "降低物体", "绑在树上", "即兴安全带"] },
    pros: { es: ["Extremadamente confiable", "No se aprieta con carga", "Fácil de desatar"], en: ["Extremely reliable", "Doesn't tighten under load", "Easy to untie after"], fr: ["Extrêmement fiable", "Ne se resserre pas sous charge", "Facile à défaire ensuite"], pt: ["Extremamente confiável", "Não aperta sob carga", "Fácil de desfazer depois"], it: ["Estremamente affidabile", "Non si stringe sotto carico", "Facile da sciogliere dopo"], ar: ["موثوق للغاية", "لا يشتد تحت الحمل", "سهل الحل بعد ذلك"], zh: ["极其可靠", "载荷下不会收紧", "之后容易解开"] },
    cons: { es: ["Si la cuerda está floja puede aflojarse"], en: ["Can loosen if rope goes slack"], fr: ["Peut se desserrer si la corde se détend"], pt: ["Pode afrouxar se a corda ficar frouxa"], it: ["Può allentarsi se la corda si allenta"], ar: ["قد يرتخي إذا ارتخى الحبل"], zh: ["如果绳子松弛可能会松动"] },
    tip: null,
  },
  {
    id: "taut_line",
    name: "Taut-Line Hitch",
    image: "https://media.base44.com/images/public/69ade0b5e824964a1f802ea8/a7c7c0ea3_Taut-LineHitch.png",
    mainUse: { es: "Nudo ajustable para tensión.", en: "Adjustable tension knot.", fr: "Nœud de tension réglable.", pt: "Nó de tensão ajustável.", it: "Nodo di tensione regolabile.", ar: "عقدة شد قابلة للتعديل.", zh: "可调节张力结。" },
    typicalUses: { es: ["Tensar refugios", "Tensar carpas", "Cuerdas de tienda"], en: ["Tensioning shelters", "Tensioning tarps", "Tent guy lines"], fr: ["Tendre les abris", "Tendre les bâches", "Haubans de tente"], pt: ["Tensionar abrigos", "Tensionar lonas", "Cordas de barraca"], it: ["Tendere rifugi", "Tendere teli", "Corde da tenda"], ar: ["شد الملاجئ", "شد المشمع", "حبال الخيمة"], zh: ["拉紧庇护所", "拉紧防水布", "帐篷拉绳"] },
    pros: { es: ["Desliza cuando no hay carga", "Se bloquea cuando se tensiona", "Fácil de reajustar"], en: ["Slides when unloaded", "Locks when tensioned", "Easy to readjust"], fr: ["Glisse sans charge", "Se bloque sous tension", "Facile à réajuster"], pt: ["Desliza sem carga", "Trava sob tensão", "Fácil de reajustar"], it: ["Scivola senza carico", "Si blocca sotto tensione", "Facile da riadattare"], ar: ["ينزلق بدون حمل", "ينغلق تحت الشد", "سهل إعادة الضبط"], zh: ["无载时滑动", "受力时锁定", "容易重新调整"] },
    cons: { es: ["No funciona bien en cuerdas muy lisas"], en: ["Doesn't work well on very slippery ropes"], fr: ["Ne fonctionne pas bien sur les cordes très lisses"], pt: ["Não funciona bem em cordas muito lisas"], it: ["Non funziona bene su corde molto lisce"], ar: ["لا يعمل جيداً على الحبال الملساء جداً"], zh: ["在非常光滑的绳子上效果不佳"] },
    tip: null,
  },
];

export default function SurvivalKnots() {
  const { lang } = useLang();
  const ui = uiText[lang] || uiText.en;
  const [expanded, setExpanded] = useState(null);
  const [imageModal, setImageModal] = useState(null);
  const [videoModal, setVideoModal] = useState(false);

  const getLang = (obj) => obj[lang] || obj.en || obj.es;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">

      {/* Modal imagen */}
      {imageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setImageModal(null)}>
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-4 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground" onClick={() => setImageModal(null)}>
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
                <span className="text-sm">{ui.noImageLabel}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal video */}
      {videoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4" onClick={() => setVideoModal(false)}>
          <div className="bg-black rounded-xl w-full max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute -top-10 right-0 text-white hover:text-orange-400 transition-colors z-10" onClick={() => setVideoModal(false)}>
              <X className="w-7 h-7" />
            </button>
            {/* Video responsive 16:9 */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <video
                className="absolute inset-0 w-full h-full rounded-xl"
                controls
                autoPlay
                playsInline
                src={VIDEO_URL}
              >
                Tu navegador no soporta video HTML5.
              </video>
            </div>
            {/* Crédito autor */}
            <div className="px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs text-gray-400">
                {ui.videoCredit}{" "}
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 font-bold underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {CHANNEL_NAME}
                </a>
                {" — "}{ui.videoNote}
              </p>
              <span className="text-[10px] text-green-400 font-bold tracking-widest shrink-0">✓ {ui.offlineNote}</span>
            </div>
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
            <div className="text-primary text-xs font-bold tracking-widest uppercase">{ui.tagline}</div>
            <h1 className="font-military text-2xl md:text-3xl text-primary tracking-widest uppercase">{ui.title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{ui.subtitle}</p>
          </div>
        </div>
        <div className="h-px bg-border mt-4" />
      </div>

      {/* Lista de nudos */}
      <div className="max-w-3xl mx-auto space-y-3 mb-8">
        {knots.map((knot) => {
          const isOpen = expanded === knot.id;
          return (
            <div key={knot.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="flex items-center">
                <button className="flex-1 flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors" onClick={() => setExpanded(isOpen ? null : knot.id)}>
                  <div className="flex items-center gap-3">
                    <Anchor className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-military text-base text-foreground tracking-wide">{knot.name}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                </button>
                <button className="flex items-center gap-1.5 px-4 py-4 text-xs font-medium text-primary hover:text-primary/80 hover:bg-secondary/40 transition-colors border-l border-border flex-shrink-0" onClick={() => setImageModal(knot)}>
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{ui.viewImageLabel}</span>
                </button>
              </div>
              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-border">
                  <div className="pt-4">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{ui.mainUseLabel}</div>
                    <p className="text-sm text-foreground">{getLang(knot.mainUse)}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{ui.typicalUsesLabel}</div>
                    <ul className="space-y-1">
                      {getLang(knot.typicalUses).map((u, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-primary mt-0.5">▸</span>{u}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">{ui.prosLabel}</div>
                      <ul className="space-y-1">
                        {getLang(knot.pros).map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-green-400 mt-0.5">✔</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">{ui.consLabel}</div>
                      <ul className="space-y-1">
                        {getLang(knot.cons).map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-yellow-400 mt-0.5">⚠</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {knot.tip && (
                    <div className="bg-primary/10 border border-primary/30 rounded p-3">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{ui.tipLabel}</div>
                      <p className="text-sm text-foreground">{getLang(knot.tip)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón video naranja */}
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setVideoModal(true)}
          className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground font-military tracking-widest text-sm px-6 py-4 rounded hover:bg-primary/90 transition-all"
        >
          <Play className="w-5 h-5" />
          {ui.videoBtn}
        </button>
      </div>
    </div>
  );
}
