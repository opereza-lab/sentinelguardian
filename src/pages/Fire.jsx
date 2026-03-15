import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { Flame, AlertTriangle, ChevronDown, ChevronUp, CheckCircle, XCircle, Wind, Droplets, ImageIcon, X } from "lucide-react";

const METHOD_IMAGES = {
  flint: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/PEDERNAL-ESLABON.png",
  friction: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/FRICCION-ARCO.png",
};

const content = {
  es: {
    tagline: "PROTOCOLO DE FUEGO",
    title: "FUEGO DE SUPERVIVENCIA",
    subtitle: "El fuego salva vidas: calienta, purifica agua, cocina, señaliza rescate y protege de animales. Domínalo antes de necesitarlo.",
    warning: "Un fuego mal controlado puede costarte la vida. Aplica siempre las reglas de seguridad.",
    methodsTitle: "MÉTODOS DE ENCENDIDO",
    structuresTitle: "ESTRUCTURAS DE FUEGO",
    safetyTitle: "REGLAS DE SEGURIDAD",
    extinguishTitle: "CÓMO APAGAR CORRECTAMENTE",
    dosLabel: "DEBES HACER",
    dontsLabel: "NUNCA HAGAS",
    timeLabel: "Tiempo:",
    difficultyLabel: "Dificultad:",
    windNote: "Regla del viento: Nunca enciendas fuego con viento superior a 30 km/h. Comprueba siempre la dirección: el fuego debe alejarse de tu campamento.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Mechero / Encendedor", time: "5 seg", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Busca refugio del viento antes de encender.", "Prepara el yesquero ANTES de sacar el mechero.", "Enciende en la base del yesquero.", "Protege la llama con tu cuerpo.", "Añade material gradualmente: primero fino, luego grueso."], tip: "Siempre lleva 2 mecheros en bolsas herméticas separadas. El frío y la humedad los inutilizan." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Cerillas Impermeables", time: "10 seg", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Seca las cerillas si han cogido humedad.", "Raspa alejando de ti. Protege la llama.", "Inclina la cerilla 45° hacia abajo.", "Ten el yesquero listo antes de encender.", "Cierra la caja con la otra mano."], tip: "Impermeabiliza cerillas normales con cera de vela." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Pedernal y Eslabón", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Prepara el nido de yesca: musgo, corteza deshecha, hierba seca.", "Coloca el pedernal sobre la yesca.", "Golpea el eslabón contra el pedernal con fuerza.", "Dirige las chispas hacia el nido.", "Cuando el nido humee, sopla DESPACIO.", "Transfiere la brasa al fuego sin sacudir."], tip: "Practica en casa. Bajo presión y frío los dedos no responden igual." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Fricción por Arco", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["Necesitas: tablilla seca y porosa, barrena, arco con cuerda, taco.", "Haz una muesca en V en la tablilla.", "Coloca una hoja seca debajo para recoger el polvo.", "Tensa la cuerda del arco alrededor de la barrena.", "Mueve el arco horizontalmente con movimientos largos.", "El polvo oscuro acumulado es la brasa.", "Transfiere al nido y sopla hasta llama."], tip: "Usa madera de SAUCE o ÁLAMO. La madera verde no funciona NUNCA." },
    ],
    structures: [
      { name: "Fuego Tipi", emoji: "🏕", desc: "Coloca yesquero en el centro, rodéalo de palitos en cono.", use: "Encendido rápido" },
      { name: "Fuego de Troncos", emoji: "🪵", desc: "2 troncos paralelos, leña transversal encima. Dura más.", use: "Cocinar, calor prolongado" },
      { name: "Fuego Estrella", emoji: "⭐", desc: "5-6 troncos en estrella. Empuja hacia el centro.", use: "Toda la noche" },
      { name: "Fuego Reflector", emoji: "🪨", desc: "Troncos o piedras detrás reflejan el calor hacia ti.", use: "Calor máximo en frío extremo" },
    ],
    dos: ["Despeja 1m alrededor del fuego", "Construye un círculo de piedras", "Ten agua o tierra lista para apagar", "Vigila el fuego en todo momento", "Apaga completamente antes de dormir", "Comprueba la dirección del viento", "Mantén el fuego pequeño"],
    donts: ["Nunca enciendas bajo ramas bajas", "No uses acelerantes salvo emergencia extrema", "No dejes niños solos cerca del fuego", "No enciendas en refugios cerrados (CO₂)", "No uses piedras porosas o húmedas", "No encender con viento fuerte", "No abandones fuego sin apagar"],
    extinguishSteps: ["Deja que la madera se consuma al máximo.", "Separa los troncos y dispersa las brasas.", "Vierte agua lentamente sobre TODAS las brasas.", "Remueve con un palo. Vuelve a mojar. Repite.", "Comprueba con la palma que no emite calor a 30cm.", "Sin agua: cubre con tierra, remueve, cubre de nuevo.", "Nunca abandones un fuego sin esta comprobación."],
  },
  en: {
    tagline: "FIRE PROTOCOL",
    title: "SURVIVAL FIRE",
    subtitle: "Fire saves lives: warms, purifies water, cooks, signals rescue and protects from animals. Master it before you need it.",
    warning: "A poorly controlled fire can cost you your life. Always apply safety rules.",
    methodsTitle: "IGNITION METHODS",
    structuresTitle: "FIRE STRUCTURES",
    safetyTitle: "SAFETY RULES",
    extinguishTitle: "HOW TO PROPERLY EXTINGUISH",
    dosLabel: "DO",
    dontsLabel: "NEVER DO",
    timeLabel: "Time:",
    difficultyLabel: "Difficulty:",
    windNote: "Wind rule: Never light a fire with winds above 20 mph. Always check direction: fire should point away from your camp.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Lighter", time: "5 sec", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Find shelter from wind before lighting.", "Prepare tinder BEFORE taking out the lighter.", "Light at the base of the tinder.", "Shield the flame with your body.", "Add material gradually: fine first, then thick."], tip: "Always carry 2 lighters in separate airtight bags. Cold and moisture disable them." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Waterproof Matches", time: "10 sec", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Dry matches if damp.", "Strike away from you. Shield the flame.", "Tilt match 45° downward.", "Have tinder ready before striking.", "Close the box with your other hand."], tip: "Waterproof regular matches with candle wax." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Flint & Steel", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Prepare tinder nest: moss, shredded bark, dry grass.", "Place flint on tinder.", "Strike steel against flint edge with force.", "Direct sparks toward the nest.", "When nest smokes, blow SLOWLY.", "Transfer ember without shaking."], tip: "Practice at home. Under pressure and cold, fingers don't respond the same." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Bow Drill", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["You need: dry porous fireboard, spindle, bow with cord, cap.", "Cut a V-notch in the fireboard.", "Place a dry leaf underneath to catch powder.", "Wrap bow cord around spindle.", "Move bow horizontally with long steady strokes.", "Dark accumulated powder is the ember.", "Transfer to tinder nest and blow until flame."], tip: "Use WILLOW or POPLAR wood. Green or wet wood NEVER works." },
    ],
    structures: [
      { name: "Tipi Fire", emoji: "🏕", desc: "Place tinder in center, surround with sticks in cone shape.", use: "Quick start" },
      { name: "Log Cabin Fire", emoji: "🪵", desc: "2 parallel logs, stack wood crosswise on top. Lasts longer.", use: "Cooking, prolonged heat" },
      { name: "Star Fire", emoji: "⭐", desc: "5-6 thick logs in star shape. Push toward center as they burn.", use: "All night" },
      { name: "Reflector Fire", emoji: "🪨", desc: "Large logs or rocks behind fire reflect heat toward you.", use: "Maximum heat in extreme cold" },
    ],
    dos: ["Clear 3ft around fire of dry material", "Build a stone ring if possible", "Have water or dirt ready to extinguish", "Watch the fire at all times", "Fully extinguish before sleeping", "Check wind direction before lighting", "Keep fire small"],
    donts: ["Never light under low branches", "Don't use accelerants except extreme emergency", "Don't leave children alone near fire", "Don't light inside closed shelters (CO₂)", "Don't use porous or wet rocks", "Don't light in strong wind", "Never leave fire without extinguishing"],
    extinguishSteps: ["Let wood burn down as much as possible.", "Separate logs and spread embers.", "Pour water slowly over ALL embers.", "Stir with a stick. Wet again. Repeat.", "Check with palm that no heat is emitted at 12 inches.", "No water: cover with dirt, stir, cover again.", "Never abandon a fire without this check."],
  },
  fr: {
    tagline: "PROTOCOLE DE FEU",
    title: "FEU DE SURVIE",
    subtitle: "Le feu sauve des vies: réchauffe, purifie l'eau, cuisine, signale les secours et protège des animaux. Maîtrisez-le avant d'en avoir besoin.",
    warning: "Un feu mal contrôlé peut vous coûter la vie. Appliquez toujours les règles de sécurité.",
    methodsTitle: "MÉTHODES D'ALLUMAGE",
    structuresTitle: "STRUCTURES DE FEU",
    safetyTitle: "RÈGLES DE SÉCURITÉ",
    extinguishTitle: "COMMENT ÉTEINDRE CORRECTEMENT",
    dosLabel: "À FAIRE",
    dontsLabel: "NE JAMAIS FAIRE",
    timeLabel: "Temps:",
    difficultyLabel: "Difficulté:",
    windNote: "Règle du vent: N'allumez jamais de feu avec des vents supérieurs à 30 km/h. Vérifiez toujours la direction: le feu doit s'éloigner de votre camp.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Briquet", time: "5 sec", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Trouvez un abri du vent avant d'allumer.", "Préparez l'amadou AVANT de sortir le briquet.", "Allumez à la base de l'amadou.", "Protégez la flamme avec votre corps.", "Ajoutez du matériel progressivement: d'abord fin, puis épais."], tip: "Portez toujours 2 briquets dans des sacs hermétiques séparés." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Allumettes imperméables", time: "10 sec", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Séchez les allumettes si elles ont pris l'humidité.", "Grattez en vous éloignant. Protégez la flamme.", "Inclinez l'allumette à 45° vers le bas.", "Ayez l'amadou prêt avant d'allumer.", "Fermez la boîte avec l'autre main."], tip: "Imperméabilisez les allumettes normales avec de la cire de bougie." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Silex et briquet à percussion", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Préparez le nid d'amadou: mousse, écorce effilochée, herbe sèche.", "Placez le silex sur l'amadou.", "Frappez l'acier contre le tranchant du silex avec force.", "Dirigez les étincelles vers le nid.", "Quand le nid fume, soufflez LENTEMENT.", "Transférez la braise sans secouer."], tip: "Entraînez-vous chez vous. Sous pression et par le froid, les doigts ne répondent pas pareil." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Arc à feu (friction)", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["Il vous faut: planchette sèche et poreuse, fuseau, arc avec corde, chapeau.", "Faites une encoche en V dans la planchette.", "Placez une feuille sèche dessous pour recueillir la poudre.", "Enroulez la corde de l'arc autour du fuseau.", "Déplacez l'arc horizontalement avec des mouvements longs et réguliers.", "La poudre sombre accumulée est la braise.", "Transférez dans le nid d'amadou et soufflez jusqu'à la flamme."], tip: "Utilisez du bois de SAULE ou PEUPLIER. Le bois vert ne fonctionne JAMAIS." },
    ],
    structures: [
      { name: "Feu tipi", emoji: "🏕", desc: "Placez l'amadou au centre, entourez de bâtons en cône.", use: "Allumage rapide" },
      { name: "Feu en carré", emoji: "🪵", desc: "2 bûches parallèles, empiler le bois en travers au-dessus.", use: "Cuisiner, chaleur prolongée" },
      { name: "Feu en étoile", emoji: "⭐", desc: "5-6 bûches épaisses en étoile. Poussez vers le centre.", use: "Toute la nuit" },
      { name: "Feu réflecteur", emoji: "🪨", desc: "Grosses bûches ou pierres derrière reflètent la chaleur.", use: "Chaleur maximale par grand froid" },
    ],
    dos: ["Dégagez 1m autour du feu", "Construisez un cercle de pierres", "Ayez de l'eau ou de la terre prête", "Surveillez le feu en permanence", "Éteignez complètement avant de dormir", "Vérifiez la direction du vent", "Gardez le feu petit"],
    donts: ["Ne jamais allumer sous des branches basses", "N'utilisez pas d'accélérateurs sauf urgence extrême", "Ne laissez pas d'enfants seuls près du feu", "N'allumez pas dans des abris fermés (CO₂)", "N'utilisez pas de pierres poreuses ou humides", "Ne pas allumer par grand vent", "N'abandonnez jamais un feu sans l'éteindre"],
    extinguishSteps: ["Laissez le bois se consumer au maximum.", "Séparez les bûches et dispersez les braises.", "Versez de l'eau lentement sur TOUTES les braises.", "Remuez avec un bâton. Remouilllez. Répétez.", "Vérifiez avec la paume qu'il n'y a plus de chaleur à 30cm.", "Sans eau: couvrez de terre, remuez, recouvrez.", "N'abandonnez jamais un feu sans cette vérification."],
  },
  pt: {
    tagline: "PROTOCOLO DE FOGO",
    title: "FOGO DE SOBREVIVÊNCIA",
    subtitle: "O fogo salva vidas: aquece, purifica água, cozinha, sinaliza resgate e protege de animais. Domine-o antes de precisar.",
    warning: "Um fogo mal controlado pode custar sua vida. Aplique sempre as regras de segurança.",
    methodsTitle: "MÉTODOS DE IGNIÇÃO",
    structuresTitle: "ESTRUTURAS DE FOGO",
    safetyTitle: "REGRAS DE SEGURANÇA",
    extinguishTitle: "COMO APAGAR CORRETAMENTE",
    dosLabel: "DEVE FAZER",
    dontsLabel: "NUNCA FAÇA",
    timeLabel: "Tempo:",
    difficultyLabel: "Dificuldade:",
    windNote: "Regra do vento: Nunca acenda fogo com ventos acima de 30 km/h. Verifique sempre a direção: o fogo deve se afastar do seu acampamento.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Isqueiro", time: "5 seg", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Encontre abrigo do vento antes de acender.", "Prepare o material de ignição ANTES de pegar o isqueiro.", "Acenda na base do material de ignição.", "Proteja a chama com seu corpo.", "Adicione material gradualmente: fino primeiro, depois grosso."], tip: "Sempre carregue 2 isqueiros em bolsas herméticas separadas." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Fósforos impermeáveis", time: "10 seg", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Seque os fósforos se ficaram úmidos.", "Risque se afastando de você. Proteja a chama.", "Incline o fósforo 45° para baixo.", "Tenha o material de ignição pronto antes.", "Feche a caixa com a outra mão."], tip: "Impermeabilize fósforos comuns com cera de vela." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Pederneira e fuzil", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Prepare o ninho de isca: musgo, casca desmanchada, grama seca.", "Coloque a pederneira sobre a isca.", "Bata o fuzil contra o fio da pederneira com força.", "Direcione as faíscas para o ninho.", "Quando o ninho fumegar, sopre DEVAGAR.", "Transfira a brasa sem sacudir."], tip: "Pratique em casa. Sob pressão e frio os dedos não respondem igual." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Arco de fogo (fricção)", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["Você precisa: tábua seca e porosa, fuso, arco com corda, tampa.", "Faça uma entalhe em V na tábua.", "Coloque uma folha seca embaixo para recolher o pó.", "Envolva a corda do arco ao redor do fuso.", "Mova o arco horizontalmente com movimentos longos.", "O pó escuro acumulado é a brasa.", "Transfira para o ninho e sopre até a chama."], tip: "Use madeira de SALGUEIRO ou ÁLAMO. Madeira verde NUNCA funciona." },
    ],
    structures: [
      { name: "Fogo tipi", emoji: "🏕", desc: "Coloque isca no centro, envolva com gravetos em cone.", use: "Ignição rápida" },
      { name: "Fogo de troncos", emoji: "🪵", desc: "2 troncos paralelos, lenha transversal em cima.", use: "Cozinhar, calor prolongado" },
      { name: "Fogo estrela", emoji: "⭐", desc: "5-6 troncos em estrela. Empurre para o centro.", use: "A noite toda" },
      { name: "Fogo refletor", emoji: "🪨", desc: "Troncos ou pedras atrás refletem o calor para você.", use: "Calor máximo no frio extremo" },
    ],
    dos: ["Limpe 1m ao redor do fogo", "Construa um círculo de pedras", "Tenha água ou terra pronta para apagar", "Vigie o fogo em todo momento", "Apague completamente antes de dormir", "Verifique a direção do vento", "Mantenha o fogo pequeno"],
    donts: ["Nunca acenda sob galhos baixos", "Não use acelerantes exceto emergência extrema", "Não deixe crianças sozinhas perto do fogo", "Não acenda em abrigos fechados (CO₂)", "Não use pedras porosas ou úmidas", "Não acender com vento forte", "Nunca abandone fogo sem apagar"],
    extinguishSteps: ["Deixe a madeira se consumir ao máximo.", "Separe os troncos e disperse as brasas.", "Despeje água lentamente sobre TODAS as brasas.", "Mexa com um galho. Molhe novamente. Repita.", "Verifique com a palma que não há calor a 30cm.", "Sem água: cubra com terra, mexa, cubra novamente.", "Nunca abandone um fogo sem esta verificação."],
  },
  it: {
    tagline: "PROTOCOLLO FUOCO",
    title: "FUOCO DI SOPRAVVIVENZA",
    subtitle: "Il fuoco salva vite: scalda, purifica l'acqua, cucina, segnala il soccorso e protegge dagli animali. Padroneggialo prima di averne bisogno.",
    warning: "Un fuoco mal controllato può costarti la vita. Applica sempre le regole di sicurezza.",
    methodsTitle: "METODI DI ACCENSIONE",
    structuresTitle: "STRUTTURE DI FUOCO",
    safetyTitle: "REGOLE DI SICUREZZA",
    extinguishTitle: "COME SPEGNERE CORRETTAMENTE",
    dosLabel: "DEVI FARE",
    dontsLabel: "NON FARE MAI",
    timeLabel: "Tempo:",
    difficultyLabel: "Difficoltà:",
    windNote: "Regola del vento: Non accendere mai fuoco con venti superiori a 30 km/h. Controlla sempre la direzione: il fuoco deve allontanarsi dal tuo campo.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "Accendino", time: "5 sec", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["Trova riparo dal vento prima di accendere.", "Prepara l'esca PRIMA di tirare fuori l'accendino.", "Accendi alla base dell'esca.", "Proteggi la fiamma con il corpo.", "Aggiungi materiale gradualmente: prima fine, poi grosso."], tip: "Porta sempre 2 accendini in sacchetti ermetici separati." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "Fiammiferi impermeabili", time: "10 sec", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["Asciuga i fiammiferi se si sono bagnati.", "Striscia allontanando da te. Proteggi la fiamma.", "Inclina il fiammifero a 45° verso il basso.", "Tieni l'esca pronta prima di accendere.", "Chiudi la scatola con l'altra mano."], tip: "Impermeabilizza i fiammiferi normali con cera di candela." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "Acciarino e selce", time: "1-3 min", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["Prepara il nido di esca: muschio, corteccia sfilacciata, erba secca.", "Posiziona la selce sull'esca.", "Colpisci l'acciaio contro il bordo della selce con forza.", "Dirigi le scintille verso il nido.", "Quando il nido fuma, soffia LENTAMENTE.", "Trasferisci la brace senza scuotere."], tip: "Esercitati a casa. Sotto pressione e freddo, le dita non rispondono allo stesso modo." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "Arco da fuoco (attrito)", time: "15-30 min", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["Ti servono: tavoletta secca e porosa, fuso, arco con corda, cappello.", "Fai una tacca a V nella tavoletta.", "Metti una foglia secca sotto per raccogliere la polvere.", "Avvolgi la corda dell'arco attorno al fuso.", "Muovi l'arco orizzontalmente con movimenti lunghi e costanti.", "La polvere scura accumulata è la brace.", "Trasferisci nel nido e soffia fino alla fiamma."], tip: "Usa legno di SALICE o PIOPPO. Il legno verde non funziona MAI." },
    ],
    structures: [
      { name: "Fuoco a tipi", emoji: "🏕", desc: "Metti l'esca al centro, circondala di bastoncini a cono.", use: "Accensione rapida" },
      { name: "Fuoco a capanna", emoji: "🪵", desc: "2 tronchi paralleli, legna trasversale sopra.", use: "Cucinare, calore prolungato" },
      { name: "Fuoco a stella", emoji: "⭐", desc: "5-6 tronchi grossi a stella. Spingili verso il centro.", use: "Tutta la notte" },
      { name: "Fuoco riflettore", emoji: "🪨", desc: "Grossi tronchi o pietre dietro riflettono il calore.", use: "Calore massimo nel freddo estremo" },
    ],
    dos: ["Sgombera 1m attorno al fuoco", "Costruisci un cerchio di pietre", "Tieni acqua o terra pronta", "Sorveglia il fuoco in ogni momento", "Spegni completamente prima di dormire", "Controlla la direzione del vento", "Tieni il fuoco piccolo"],
    donts: ["Non accendere mai sotto rami bassi", "Non usare acceleranti tranne emergenza estrema", "Non lasciare bambini soli vicino al fuoco", "Non accendere in rifugi chiusi (CO₂)", "Non usare pietre porose o umide", "Non accendere con vento forte", "Non abbandonare mai un fuoco senza spegnerlo"],
    extinguishSteps: ["Lascia che il legno si consumi il più possibile.", "Separa i tronchi e dispersi le braci.", "Versa acqua lentamente su TUTTE le braci.", "Mescola con un bastone. Bagna di nuovo. Ripeti.", "Controlla con il palmo che non emetta calore a 30cm.", "Senza acqua: copri con terra, mescola, copri di nuovo.", "Non abbandonare mai un fuoco senza questa verifica."],
  },
  ar: {
    tagline: "بروتوكول النار",
    title: "نار البقاء",
    subtitle: "النار تنقذ الأرواح: تدفئ، تنقي الماء، تطهو الطعام، تشير إلى الإنقاذ وتحمي من الحيوانات. أتقنها قبل أن تحتاجها.",
    warning: "النار غير المسيطر عليها قد تكلفك حياتك. طبّق دائماً قواعد السلامة.",
    methodsTitle: "طرق الإشعال",
    structuresTitle: "هياكل النار",
    safetyTitle: "قواعد السلامة",
    extinguishTitle: "كيفية الإطفاء الصحيح",
    dosLabel: "يجب فعله",
    dontsLabel: "لا تفعل أبداً",
    timeLabel: "الوقت:",
    difficultyLabel: "الصعوبة:",
    windNote: "قاعدة الريح: لا تشعل النار أبداً عندما تتجاوز سرعة الرياح 30 كم/ساعة. تحقق دائماً من الاتجاه: يجب أن تبتعد النار عن مخيمك.",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "قداحة / ولاعة", time: "5 ثواني", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["ابحث عن مأوى من الريح قبل الإشعال.", "جهّز مادة الإشعال قبل إخراج الولاعة.", "أشعل في قاعدة مادة الإشعال.", "احمِ اللهب بجسمك.", "أضف المواد تدريجياً: أولاً الرقيقة ثم الغليظة."], tip: "احمل دائماً ولاعتين في أكياس محكمة الإغلاق منفصلة." },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "أعواد ثقاب مقاومة للماء", time: "10 ثواني", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["جفف أعواد الثقاب إذا تبللت.", "اشعلها بعيداً عنك. احمِ اللهب فوراً.", "أمل عود الثقاب 45° نحو الأسفل.", "جهّز مادة الإشعال قبل الإشعال.", "أغلق العلبة بيدك الأخرى."], tip: "اجعل أعواد الثقاب العادية مقاومة للماء بشمع الشموع." },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "حجر الصوان والصلب", time: "1-3 دقائق", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["جهّز عش الإشعال: طحلب، لحاء مفتت، عشب جاف.", "ضع حجر الصوان على مادة الإشعال.", "اضرب الصلب بقوة على حافة الحجر.", "وجّه الشرار نحو العش.", "عندما يدخن العش، انفخ ببطء.", "انقل الجمرة إلى النار دون اهتزاز."], tip: "تدرب في المنزل. تحت الضغط والبرد، الأصابع لا تستجيب بنفس الطريقة." },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "قوس النار (الاحتكاك)", time: "15-30 دقيقة", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["تحتاج: لوح خشب جاف ومسامي، مغزل، قوس بحبل، غطاء.", "اصنع شقاً على شكل V في اللوح.", "ضع ورقة جافة تحت الشق لجمع المسحوق.", "لفّ حبل القوس حول المغزل.", "حرّك القوس أفقياً بحركات طويلة ومنتظمة.", "المسحوق الداكن المتراكم هو الجمرة.", "انقل إلى عش الإشعال وانفخ حتى اللهب."], tip: "استخدم خشب الصفصاف أو الحور. الخشب الأخضر لا يعمل أبداً." },
    ],
    structures: [
      { name: "نار التيبي", emoji: "🏕", desc: "ضع مادة الإشعال في المركز، أحط بعصي على شكل مخروط.", use: "إشعال سريع" },
      { name: "نار الكابينة", emoji: "🪵", desc: "تذخيرتان متوازيتان، حطب عرضي فوقهما.", use: "الطهي، حرارة مستدامة" },
      { name: "نار النجمة", emoji: "⭐", desc: "5-6 جذوع على شكل نجمة. ادفعها نحو المركز.", use: "طوال الليل" },
      { name: "نار العاكس", emoji: "🪨", desc: "جذوع أو حجارة كبيرة خلف النار تعكس الحرارة.", use: "أقصى حرارة في البرد الشديد" },
    ],
    dos: ["أخلِ مساحة 1 متر حول النار", "ابنِ دائرة من الحجارة", "احتفظ بماء أو تراب للإطفاء", "راقب النار في كل الأوقات", "أطفئ تماماً قبل النوم", "تحقق من اتجاه الريح", "حافظ على النار صغيرة"],
    donts: ["لا تشعل أبداً تحت أغصان منخفضة", "لا تستخدم مسرعات إلا في الطوارئ القصوى", "لا تترك الأطفال وحدهم قرب النار", "لا تشعل في ملاجئ مغلقة (CO₂)", "لا تستخدم حجارة مسامية أو رطبة", "لا تشعل في رياح قوية", "لا تترك النار دون إطفاء"],
    extinguishSteps: ["دع الخشب يحترق قدر الإمكان.", "افصل الجذوع ووزّع الجمر.", "صب الماء ببطء على جميع الجمر.", "حرّك بعصا. بلّل مجدداً. كرر.", "تحقق بكف يدك من عدم خروج حرارة على بُعد 30سم.", "بدون ماء: غطّ بتراب، حرّك، غطّ مجدداً.", "لا تترك النار أبداً دون هذا الفحص."],
  },
  zh: {
    tagline: "生火规程",
    title: "求生火",
    subtitle: "火能救命：取暖、净化水源、烹饪、发出求救信号、驱赶野生动物。在需要之前掌握它。",
    warning: "火控制不当可能要你的命。始终遵守安全规则。",
    methodsTitle: "点火方法",
    structuresTitle: "火堆结构",
    safetyTitle: "安全规则",
    extinguishTitle: "如何正确熄火",
    dosLabel: "应该做",
    dontsLabel: "绝不能做",
    timeLabel: "时间：",
    difficultyLabel: "难度：",
    windNote: "风力规则：风速超过30公里/小时时绝不点火。始终检查风向：火焰应远离你的营地。",
    methods: [
      { id: "lighter", emoji: "🔥", difficulty: 1, title: "打火机", time: "5秒", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", steps: ["点火前找避风处。", "取出打火机之前先准备引火物。", "在引火物底部点火。", "用身体遮挡火焰。", "逐渐添加材料：先细后粗。"], tip: "始终在独立密封袋中携带2个打火机。寒冷和潮湿会使其失效。" },
      { id: "matches", emoji: "🧨", difficulty: 1, title: "防水火柴", time: "10秒", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", steps: ["如果火柴受潮，先晾干。", "向远离自己的方向划火柴，立即遮挡火焰。", "将火柴向下倾斜45°。", "划火前先准备好引火物。", "用另一只手关上火柴盒。"], tip: "用蜡烛蜡处理普通火柴可使其防水。" },
      { id: "flint", emoji: "⚡", difficulty: 2, title: "燧石和钢铁", time: "1-3分钟", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5", steps: ["准备火绒巢：苔藓、碎树皮、干草。", "将燧石放在火绒上。", "用力将钢铁敲击燧石边缘。", "将火花引向火绒巢。", "当火绒冒烟时，缓慢吹气。", "不晃动地将火炭转移到火堆。"], tip: "在家练习。在压力和寒冷下，手指的反应会不同。" },
      { id: "friction", emoji: "🌿", difficulty: 5, title: "弓钻取火（摩擦）", time: "15-30分钟", color: "text-red-400", border: "border-red-400/40", bg: "bg-red-400/5", steps: ["需要：干燥多孔的木板、钻杆、带绳弓、手握块。", "在木板上切一个V形缺口。", "在缺口下放一片干叶收集木粉。", "将弓绳绕钻杆一圈。", "用手握块向下施压，水平移动弓。", "积累的深色粉末就是火炭。", "转移到火绒巢，轻轻吹气直到出现火焰。"], tip: "使用柳木或白杨木。湿木或绿木绝对不管用。" },
    ],
    structures: [
      { name: "锥形火堆", emoji: "🏕", desc: "将引火物放在中心，周围围成锥形。", use: "快速点火" },
      { name: "木屋式火堆", emoji: "🪵", desc: "2根平行原木，上面横放柴火。燃烧更持久。", use: "烹饪、持续供暖" },
      { name: "星形火堆", emoji: "⭐", desc: "5-6根粗木呈星形排列，随燃烧向中心推进。", use: "整夜燃烧" },
      { name: "反射式火堆", emoji: "🪨", desc: "火堆后方放大原木或石块反射热量。", use: "极寒中最大取暖效果" },
    ],
    dos: ["清除火堆周围1米内的干燥材料", "可能的话搭建石圈", "备好水或泥土随时灭火", "始终监视火堆", "睡觉前完全熄灭", "点火前检查风向", "保持火堆小"],
    donts: ["绝不在低矮树枝下点火", "极端紧急情况外不使用助燃剂", "不要让孩子独自在火堆旁", "不在封闭庇护所内点火（CO₂）", "不使用多孔或湿润的岩石", "大风天不点火", "绝不留下未熄灭的火"],
    extinguishSteps: ["让木材尽量燃尽。", "分离原木，分散余烬。", "慢慢将水浇在所有余烬上。", "用棍子搅动。再次浇水。重复。", "用手掌检查30厘米处是否还有热量。", "没有水：覆盖泥土，搅动，再覆盖。", "绝不在没有进行此检查的情况下离开火堆。"],
  },
};

function DifficultyBar({ level }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`w-3 h-2 rounded-sm ${i < level ? level <= 2 ? "bg-green-400" : level <= 3 ? "bg-yellow-400" : "bg-red-500" : "bg-secondary"}`} />
      ))}
    </div>
  );
}

function FireVisual() {
  return (
    <div className="flex justify-center my-6">
      <svg width="120" height="140" viewBox="0 0 120 140">
        <ellipse cx="60" cy="128" rx="50" ry="8" fill="#5c3d1e" />
        <rect x="15" y="118" width="90" height="12" rx="5" fill="#7c4f28" />
        <ellipse cx="60" cy="120" rx="30" ry="6" fill="#ff6b00" opacity="0.6" />
        <path d="M30,115 Q20,85 40,65 Q35,85 50,75 Q45,55 60,35 Q75,55 70,75 Q85,65 80,85 Q100,85 90,115 Z" fill="#ff6b00" opacity="0.9">
          <animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M30,115 Q20,85 40,65 Q35,85 50,75 Q45,55 60,35 Q75,55 70,75 Q85,65 80,85 Q100,85 90,115 Z;M32,115 Q18,80 38,60 Q33,82 52,72 Q47,52 60,32 Q73,52 68,72 Q87,62 82,82 Q102,80 88,115 Z;M30,115 Q20,85 40,65 Q35,85 50,75 Q45,55 60,35 Q75,55 70,75 Q85,65 80,85 Q100,85 90,115 Z" />
        </path>
        <path d="M38,115 Q30,95 45,78 Q42,92 55,84 Q52,68 62,50 Q72,68 68,84 Q80,92 77,115 Z" fill="#ff9500" opacity="0.85">
          <animate attributeName="d" dur="0.9s" repeatCount="indefinite" values="M38,115 Q30,95 45,78 Q42,92 55,84 Q52,68 62,50 Q72,68 68,84 Q80,92 77,115 Z;M40,115 Q28,90 43,73 Q40,88 57,80 Q54,64 62,46 Q70,64 66,80 Q82,88 79,115 Z;M38,115 Q30,95 45,78 Q42,92 55,84 Q52,68 62,50 Q72,68 68,84 Q80,92 77,115 Z" />
        </path>
        <path d="M46,115 Q40,100 50,88 Q49,98 58,92 Q56,80 62,65 Q68,80 64,92 Q73,98 72,115 Z" fill="#ffdd00" opacity="0.9">
          <animate attributeName="d" dur="0.7s" repeatCount="indefinite" values="M46,115 Q40,100 50,88 Q49,98 58,92 Q56,80 62,65 Q68,80 64,92 Q73,98 72,115 Z;M48,115 Q38,98 48,85 Q47,96 60,88 Q58,76 62,62 Q66,76 62,88 Q75,96 74,115 Z;M46,115 Q40,100 50,88 Q49,98 58,92 Q56,80 62,65 Q68,80 64,92 Q73,98 72,115 Z" />
        </path>
      </svg>
    </div>
  );
}

export default function Fire() {
  const { lang } = useLang();
  const c = getLangContent(content, lang);
  const [openId, setOpenId] = useState("lighter");
  const [imageModal, setImageModal] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Modal imagen */}
      {imageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setImageModal(null)}>
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-4 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground" onClick={() => setImageModal(null)}>
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-military text-lg text-primary tracking-wide mb-3">{imageModal.title}</h3>
            <div className="rounded-lg overflow-hidden bg-white">
              <img src={imageModal.url} alt={imageModal.title} className="w-full object-contain max-h-96" />
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">{c.tagline}</span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{c.subtitle}</p>
      <div className="flex items-start gap-2 mb-2 p-4 bg-accent/10 border border-accent/30 rounded">
        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-accent leading-relaxed">{c.warning}</p>
      </div>
      <FireVisual />

      <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">{c.methodsTitle}</h2>
      <div className="space-y-3 mb-10">
        {c.methods.map((m) => {
          const isOpen = openId === m.id;
          return (
            <div key={m.id} className={`border rounded overflow-hidden ${m.border}`}>
              <div className="flex items-center">
                <button
                  onClick={() => setOpenId(isOpen ? null : m.id)}
                  className={`flex-1 flex items-center justify-between px-5 py-4 text-left ${m.bg} hover:opacity-90 transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{m.emoji}</span>
                    <div className="text-left">
                      <div className="font-military text-sm text-foreground tracking-wide mb-1">{m.title}</div>
                      <div className="flex items-center gap-3">
                        <DifficultyBar level={m.difficulty} />
                        <span className="text-[10px] text-muted-foreground">{c.timeLabel} <span className={m.color}>{m.time}</span></span>
                      </div>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
                {METHOD_IMAGES[m.id] && (
                  <button
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-medium text-primary hover:text-primary/80 hover:bg-secondary/40 transition-colors border-l border-border flex-shrink-0"
                    onClick={() => setImageModal({ title: m.title, url: METHOD_IMAGES[m.id] })}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{lang === "es" ? "Ver imagen" : lang === "fr" ? "Voir image" : lang === "pt" ? "Ver imagem" : lang === "it" ? "Vedi immagine" : lang === "ar" ? "عرض الصورة" : lang === "zh" ? "查看图片" : "View image"}</span>
                  </button>
                )}
              </div>
              {isOpen && (
                <div className="p-5 bg-card border-t border-border space-y-4">
                  <ol className="space-y-2">
                    {m.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                        <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>{step}
                      </li>
                    ))}
                  </ol>
                  <div className="p-3 bg-secondary rounded border border-border">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">💡 {m.tip}</p>
                  </div>
                </div>
              )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">{c.structuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {c.structures.map((s, i) => (
            <div key={i} className="p-4 bg-card border border-border rounded hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="font-military text-sm text-foreground">{s.name}</div>
                  <div className="text-[10px] text-primary tracking-wide">{s.use}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-military text-sm text-muted-foreground tracking-widest uppercase mb-4">{c.safetyTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">{c.dosLabel}</span>
            </div>
            <ul className="space-y-2">
              {c.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground"><span className="text-green-400 shrink-0 mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">{c.dontsLabel}</span>
            </div>
            <ul className="space-y-2">
              {c.donts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground"><span className="text-red-400 shrink-0 mt-0.5">✕</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-5 bg-card border border-primary/20 rounded mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-4 h-4 text-blue-400" />
          <h2 className="font-military text-sm text-foreground tracking-widest uppercase">{c.extinguishTitle}</h2>
        </div>
        <ol className="space-y-2">
          {c.extinguishSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
              <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>{step}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-4 bg-secondary border border-border rounded flex items-start gap-3">
        <Wind className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">{c.windNote}</p>
      </div>
    </div>
  );
}
