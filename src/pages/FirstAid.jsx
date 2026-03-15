import React, { useState } from "react";
import { useLang } from "../components/LanguageContext";
import { getLangContent } from "../utils/langFallback";
import { Heart, AlertTriangle, ChevronDown, ChevronUp, ExternalLink, ImageIcon, X } from "lucide-react";

const CASE_IMAGES = {
  gunshot: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/herida-bala-cortopunzante.png",
  fracture: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/fractura-osea.png",
  burn: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/quemaduras.png",
  unconscious: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/perdida-conocimiento.png",
  contusion: "https://pub-9f02b5de762944eb925bac76d42efae6.r2.dev/contusion-traumatismo.png",
};

const content = {
  es: {
    title: "PRIMEROS AUXILIOS DE COMBATE",
    subtitle: "En zona de conflicto no habrá ambulancia. Tú eres el médico. Cada técnica que aprendas hoy puede salvar una vida mañana.",
    warning: "Esta información es de supervivencia extrema. En situación normal, llama siempre al 112. En conflicto activo, aplica estos protocolos cuando no haya asistencia médica disponible.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "VIDA O MUERTE", title: "Herida de Bala / Herida Corto Punzante", steps: ["CONTROL DE HEMORRAGIA PRIMERO: aplica presión directa con lo que tengas.", "Extremidades: aplica torniquete 5-7cm por encima de la herida. Anota la hora.", "Tórax/abdomen: NO uses torniquete. Presión directa. Apósito oclusivo si hay.", "NO intentes extraer la bala.", "Tórax: sella 3 lados con plástico.", "Mantén a la víctima caliente y tumbada.", "Vigila vías respiratorias.", "Habla constantemente con el herido."], note: "El torniquete mal usado puede causar pérdida de extremidad. Sin él, la hemorragia masiva mata en 3-5 minutos." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENTE", title: "Fractura Ósea", steps: ["NO muevas a la víctima si sospechas fractura de columna.", "Inmoviliza TAL COMO ESTÁ.", "Entablilla con tablas, ramas o cartón.", "La entablilla debe inmovilizar articulación por encima Y por debajo.", "Ata sin cortar la circulación.", "Fractura abierta: cubre con gasa estéril.", "Eleva el miembro fracturado.", "Controla signos de shock."], note: "Una fractura de fémur puede causar pérdida de 1-2L de sangre internamente." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "GRAVE", title: "Quemaduras", steps: ["Apaga el fuego. Detente, tírate, rueda.", "Enfría con agua tibia 20 minutos.", "NO uses hielo ni mantequilla.", "NO revientes las ampollas.", "Cubre con gasa húmeda estéril.", "Quemaduras >10%: hidrata constantemente.", "Cara, manos, pulmones: urgencia extrema.", "Quemadura química: retira la ropa, lava 30 min."], note: "Regla del 9: cabeza=9%, brazo=9%, pierna=18%, tronco=36%. Más del 20% es crítico." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRÍTICO", title: "Pérdida de Conocimiento", steps: ["Verifica seguridad del entorno.", "Llama en voz alta, estimula el esternón.", "Sin respuesta: verifica respiración (10 seg).", "Respira inconsciente: posición lateral.", "No respira: inicia RCP.", "RCP: 30 compresiones + 2 respiraciones.", "Continúa hasta que respire o llegue ayuda.", "AED si disponible: úsalo sin dudar."], note: "Cada minuto sin RCP reduce supervivencia un 10%." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODERADO", title: "Contusiones y Traumatismos", steps: ["Método RICE: Reposo, Hielo, Compresión, Elevación.", "Frío 20 min cada 2 horas.", "Comprime con venda sin cortar circulación.", "Eleva por encima del corazón.", "Sospecha fractura si hay deformidad.", "Hematoma en cabeza: vigila 24h.", "Dolor torácico: posible fractura de costillas.", "Reposo relativo."], note: "Un hematoma cerebral puede tardar horas en manifestarse." },
    ],
    kitTitle: "KIT MÍNIMO DE PRIMEROS AUXILIOS",
    kitItems: ["Torniquete (CAT o similar)", "Apósitos hemostáticos (QuikClot)", "Vendas israelíes", "Gasas estériles", "Venda elástica", "Guantes de látex (4 pares)", "Tijeras de trauma", "Termómetro", "Antiséptico", "Ibuprofeno y paracetamol", "Manual impreso"],
  },
  en: {
    title: "COMBAT FIRST AID",
    subtitle: "In a conflict zone there will be no ambulance. You are the doctor. Every technique you learn today can save a life tomorrow.",
    warning: "This is extreme survival information. In normal situations, always call 911. In active conflict, apply these protocols when no medical assistance is available.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "LIFE OR DEATH", title: "Gunshot Wound / Stab Wound", steps: ["BLEEDING CONTROL FIRST: apply direct pressure.", "Extremities: tourniquet 2-3 inches above wound. Note the time.", "Chest/abdomen: NO tourniquet. Direct pressure.", "Do NOT try to extract the bullet.", "Chest wound: seal 3 sides with plastic.", "Keep victim warm and lying down.", "Monitor airway.", "Talk constantly to the wounded."], note: "Improperly used tourniquet can cause limb loss. Without it, massive hemorrhage kills in 3-5 minutes." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENT", title: "Bone Fracture", steps: ["Do NOT move victim if spine fracture suspected.", "Splint AS IS.", "Improvise splint with boards, branches.", "Splint must immobilize joint above AND below.", "Tie without cutting circulation.", "Open fracture: cover with sterile gauze.", "Elevate fractured limb.", "Monitor shock signs."], note: "A femur fracture can cause 1-2 liters of internal blood loss." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "SERIOUS", title: "Burns", steps: ["Extinguish fire. Stop, drop, roll.", "Cool with lukewarm water 20 minutes.", "Do NOT use ice or butter.", "Do NOT burst blisters.", "Cover with moist sterile gauze.", "Burns >10%: constantly hydrate.", "Face, hands, lungs: extreme urgency.", "Chemical burn: remove clothing, wash 30 min."], note: "Rule of 9s: head=9%, arm=9%, leg=18%, trunk=36%. More than 20% is critical." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRITICAL", title: "Loss of Consciousness", steps: ["Check environment safety.", "Call loudly, stimulate sternum.", "No response: check breathing (10 sec).", "Breathing unconscious: recovery position.", "Not breathing: start CPR.", "CPR: 30 compressions + 2 breaths.", "Continue until breathing or help arrives.", "AED if available: use without hesitation."], note: "Every minute without CPR reduces survival by 10%." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODERATE", title: "Bruises & Trauma", steps: ["RICE method: Rest, Ice, Compression, Elevation.", "Cold 20 min every 2 hours.", "Compress without cutting circulation.", "Elevate above heart level.", "Suspect fracture if deformity.", "Head hematoma: monitor 24h.", "Chest pain: possible rib fracture.", "Relative rest."], note: "A brain hematoma can take hours to manifest." },
    ],
    kitTitle: "MINIMUM FIRST AID KIT",
    kitItems: ["Tourniquet (CAT)", "Hemostatic dressings (QuikClot)", "Israeli bandages", "Sterile gauze", "Elastic bandage", "Latex gloves (4 pairs)", "Trauma scissors", "Thermometer", "Antiseptic", "Ibuprofen and acetaminophen", "Printed manual"],
  },
  fr: {
    title: "PREMIERS SECOURS DE COMBAT",
    subtitle: "En zone de conflit il n'y aura pas d'ambulance. Vous êtes le médecin. Chaque technique apprise aujourd'hui peut sauver une vie demain.",
    warning: "Cette information est de survie extrême. En situation normale, appelez toujours le 15/18. En conflit actif, appliquez ces protocoles quand aucune assistance médicale n'est disponible.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "VIE OU MORT", title: "Blessure par balle / Blessure par arme blanche", steps: ["CONTRÔLE DES SAIGNEMENTS D'ABORD: appliquez une pression directe.", "Membres: garrot 5-7cm au-dessus de la blessure. Notez l'heure.", "Thorax/abdomen: PAS de garrot. Pression directe.", "Ne tentez PAS d'extraire la balle.", "Blessure thoracique: scellez 3 côtés avec du plastique.", "Gardez la victime au chaud et allongée.", "Surveillez les voies respiratoires.", "Parlez constamment au blessé."], note: "Un garrot mal utilisé peut causer la perte d'un membre. Sans lui, une hémorragie massive tue en 3-5 minutes." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENT", title: "Fracture osseuse", steps: ["Ne déplacez PAS la victime si fracture vertébrale suspectée.", "Immobilisez TEL QUEL.", "Attelle avec planches, branches ou carton.", "L'attelle doit immobiliser l'articulation au-dessus ET en dessous.", "Attachez sans couper la circulation.", "Fracture ouverte: couvrez avec gaze stérile.", "Élevez le membre fracturé.", "Surveillez les signes de choc."], note: "Une fracture du fémur peut causer une perte de 1-2L de sang en interne." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "GRAVE", title: "Brûlures", steps: ["Éteignez le feu. Stop, roulez au sol.", "Refroidissez avec eau tiède 20 minutes.", "N'utilisez PAS de glace ni beurre.", "Ne percez PAS les cloques.", "Couvrez avec gaze humide stérile.", "Brûlures >10%: hydratez constamment.", "Visage, mains, poumons: urgence extrême.", "Brûlure chimique: retirez les vêtements, rincez 30 min."], note: "Règle des 9: tête=9%, bras=9%, jambe=18%, tronc=36%. Plus de 20% est critique." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRITIQUE", title: "Perte de connaissance", steps: ["Vérifiez la sécurité de l'environnement.", "Appelez fort, stimulez le sternum.", "Sans réponse: vérifiez la respiration (10 sec).", "Respire inconscient: position latérale de sécurité.", "Ne respire pas: commencez le RCP.", "RCP: 30 compressions + 2 respirations.", "Continuez jusqu'à reprise ou arrivée des secours.", "DEA si disponible: utilisez sans hésiter."], note: "Chaque minute sans RCP réduit la survie de 10%." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODÉRÉ", title: "Contusions et traumatismes", steps: ["Méthode GREC: Glace, Repos, Élévation, Compression.", "Froid 20 min toutes les 2 heures.", "Comprimez sans couper la circulation.", "Élevez au-dessus du cœur.", "Suspectez fracture si déformation.", "Hématome à la tête: surveillance 24h.", "Douleur thoracique: possible fracture côte.", "Repos relatif."], note: "Un hématome cérébral peut prendre des heures à se manifester." },
    ],
    kitTitle: "KIT MINIMUM DE PREMIERS SECOURS",
    kitItems: ["Garrot (CAT)", "Pansements hémostatiques (QuikClot)", "Bandages israéliens", "Compresses stériles", "Bandage élastique", "Gants latex (4 paires)", "Ciseaux de trauma", "Thermomètre", "Antiseptique", "Ibuprofène et paracétamol", "Manuel imprimé"],
  },
  pt: {
    title: "PRIMEIROS SOCORROS DE COMBATE",
    subtitle: "Em zona de conflito não haverá ambulância. Você é o médico. Cada técnica aprendida hoje pode salvar uma vida amanhã.",
    warning: "Esta informação é de sobrevivência extrema. Em situação normal, ligue sempre para o 192. Em conflito ativo, aplique estes protocolos quando não houver assistência médica disponível.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "VIDA OU MORTE", title: "Ferimento por bala / Ferimento por arma branca", steps: ["CONTROLE DE HEMORRAGIA PRIMEIRO: aplique pressão direta.", "Membros: torniquete 5-7cm acima do ferimento. Anote a hora.", "Tórax/abdômen: SEM torniquete. Pressão direta.", "NÃO tente extrair a bala.", "Ferimento no tórax: sele 3 lados com plástico.", "Mantenha a vítima aquecida e deitada.", "Monitore vias aéreas.", "Fale constantemente com o ferido."], note: "Torniquete mal usado pode causar perda do membro. Sem ele, hemorragia maciça mata em 3-5 minutos." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENTE", title: "Fratura óssea", steps: ["NÃO mova a vítima se suspeitar de fratura vertebral.", "Imobilize COMO ESTÁ.", "Tala com tábuas, galhos ou papelão.", "A tala deve imobilizar articulação acima E abaixo.", "Amarre sem cortar a circulação.", "Fratura aberta: cubra com gaze estéril.", "Eleve o membro fraturado.", "Monitore sinais de choque."], note: "Uma fratura de fêmur pode causar perda de 1-2L de sangue internamente." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "GRAVE", title: "Queimaduras", steps: ["Apague o fogo. Pare, caia, role.", "Resfrie com água morna 20 minutos.", "NÃO use gelo ou manteiga.", "NÃO fure as bolhas.", "Cubra com gaze úmida estéril.", "Queimaduras >10%: hidrate constantemente.", "Rosto, mãos, pulmões: urgência extrema.", "Queimadura química: retire a roupa, lave 30 min."], note: "Regra dos 9: cabeça=9%, braço=9%, perna=18%, tronco=36%. Mais de 20% é crítico." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRÍTICO", title: "Perda de consciência", steps: ["Verifique a segurança do ambiente.", "Chame em voz alta, estimule o esterno.", "Sem resposta: verifique respiração (10 seg).", "Respira inconsciente: posição lateral de segurança.", "Não respira: inicie RCP.", "RCP: 30 compressões + 2 respirações.", "Continue até respirar ou chegar ajuda.", "DEA se disponível: use sem hesitar."], note: "Cada minuto sem RCP reduz a sobrevivência em 10%." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODERADO", title: "Contusões e traumatismos", steps: ["Método PRICE: Proteção, Repouso, Gelo, Compressão, Elevação.", "Frio 20 min a cada 2 horas.", "Comprima sem cortar circulação.", "Eleve acima do coração.", "Suspeite fratura se houver deformidade.", "Hematoma na cabeça: monitore 24h.", "Dor no peito: possível fratura de costela.", "Repouso relativo."], note: "Um hematoma cerebral pode demorar horas para se manifestar." },
    ],
    kitTitle: "KIT MÍNIMO DE PRIMEIROS SOCORROS",
    kitItems: ["Torniquete (CAT)", "Curativos hemostáticos (QuikClot)", "Bandagens israelenses", "Gaze estéril", "Atadura elástica", "Luvas de látex (4 pares)", "Tesoura de trauma", "Termômetro", "Antisséptico", "Ibuprofeno e paracetamol", "Manual impresso"],
  },
  it: {
    title: "PRONTO SOCCORSO DA COMBATTIMENTO",
    subtitle: "In zona di conflitto non ci sarà ambulanza. Sei tu il medico. Ogni tecnica imparata oggi può salvare una vita domani.",
    warning: "Queste informazioni riguardano la sopravvivenza estrema. In situazione normale, chiama sempre il 118. In conflitto attivo, applica questi protocolli quando non è disponibile assistenza medica.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "VITA O MORTE", title: "Ferita da arma da fuoco / Ferita da arma bianca", steps: ["CONTROLLO EMORRAGIA PRIMA: applica pressione diretta.", "Arti: laccio emostatico 5-7cm sopra la ferita. Nota l'ora.", "Torace/addome: NESSUN laccio. Pressione diretta.", "NON tentare di estrarre il proiettile.", "Ferita toracica: sigilla 3 lati con plastica.", "Mantieni la vittima al caldo e distesa.", "Monitora le vie aeree.", "Parla costantemente al ferito."], note: "Un laccio emostatico mal usato può causare la perdita di un arto. Senza di esso, l'emorragia massiva uccide in 3-5 minuti." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "URGENTE", title: "Frattura ossea", steps: ["NON muovere la vittima se si sospetta frattura vertebrale.", "Immobilizza COM'È.", "Stecca con assi, rami o cartone.", "La stecca deve immobilizzare l'articolazione sopra E sotto.", "Lega senza tagliare la circolazione.", "Frattura aperta: copri con garza sterile.", "Eleva l'arto fratturato.", "Monitora i segni di shock."], note: "Una frattura del femore può causare perdita di 1-2L di sangue internamente." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "GRAVE", title: "Ustioni", steps: ["Spegni il fuoco. Fermati, buttati a terra, rotola.", "Raffredda con acqua tiepida per 20 minuti.", "NON usare ghiaccio o burro.", "NON forare le vesciche.", "Copri con garza umida sterile.", "Ustioni >10%: idrata costantemente.", "Viso, mani, polmoni: urgenza estrema.", "Ustione chimica: rimuovi i vestiti, lava 30 min."], note: "Regola del 9: testa=9%, braccio=9%, gamba=18%, tronco=36%. Più del 20% è critico." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "CRITICO", title: "Perdita di coscienza", steps: ["Verifica la sicurezza dell'ambiente.", "Chiama ad alta voce, stimola lo sterno.", "Nessuna risposta: verifica respirazione (10 sec).", "Respira inconscio: posizione laterale di sicurezza.", "Non respira: inizia RCP.", "RCP: 30 compressioni + 2 respirazioni.", "Continua fino a quando respira o arrivano i soccorsi.", "DAE se disponibile: usalo senza esitare."], note: "Ogni minuto senza RCP riduce la sopravvivenza del 10%." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "MODERATO", title: "Contusioni e traumatismi", steps: ["Metodo PRICE: Protezione, Riposo, ghiaccio (Ice), Compressione, Elevazione.", "Freddo 20 min ogni 2 ore.", "Comprimi senza tagliare la circolazione.", "Eleva sopra il livello del cuore.", "Sospetta frattura se c'è deformità.", "Ematoma alla testa: monitora 24h.", "Dolore toracico: possibile frattura costale.", "Riposo relativo."], note: "Un ematoma cerebrale può richiedere ore per manifestarsi." },
    ],
    kitTitle: "KIT MINIMO DI PRONTO SOCCORSO",
    kitItems: ["Laccio emostatico (CAT)", "Medicazioni emostatiche (QuikClot)", "Bende israeliane", "Garze sterili", "Benda elastica", "Guanti in lattice (4 paia)", "Forbici da trauma", "Termometro", "Antisettico", "Ibuprofene e paracetamolo", "Manuale stampato"],
  },
  ar: {
    title: "إسعافات أولية ميدانية",
    subtitle: "في منطقة النزاع لن تكون هناك سيارة إسعاف. أنت الطبيب. كل تقنية تتعلمها اليوم قد تنقذ حياة غداً.",
    warning: "هذه معلومات للبقاء في الظروف القصوى. في الأوضاع العادية، اتصل دائماً بالإسعاف. في النزاع النشط، طبّق هذه البروتوكولات عند غياب المساعدة الطبية.",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "حياة أو موت", title: "جرح طلق ناري / جرح بأداة حادة", steps: ["السيطرة على النزيف أولاً: اضغط مباشرة.", "الأطراف: رباط إرقاء 5-7 سم فوق الجرح. سجّل الوقت.", "الصدر/البطن: لا رباط إرقاء. ضغط مباشر.", "لا تحاول استخراج الرصاصة.", "جرح الصدر: أغلق 3 جهات بالبلاستيك.", "ابق الضحية دافئة ومستلقية.", "راقب مجرى الهواء.", "تحدث باستمرار مع الجريح."], note: "الرباط المستخدم بشكل خاطئ قد يسبب بتر الطرف. بدونه، النزيف الحاد يقتل في 3-5 دقائق." },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "عاجل", title: "كسر عظمي", steps: ["لا تحرّك الضحية إذا اشتبهت بكسر في العمود الفقري.", "ثبّت كما هو.", "جبيرة بألواح أو أغصان أو كرتون.", "الجبيرة تثبت المفصل فوق وتحت الكسر.", "اربط دون قطع الدورة الدموية.", "كسر مفتوح: غطّه بشاش معقم.", "ارفع الطرف المكسور.", "راقب علامات الصدمة."], note: "كسر عظمة الفخذ قد يسبب فقدان 1-2 لتر من الدم داخلياً." },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "خطير", title: "حروق", steps: ["أطفئ النار. توقف، تمدد، تدحرج.", "بردّ بالماء الفاتر 20 دقيقة.", "لا تستخدم الجليد أو الزبدة.", "لا تفقأ الفقاعات.", "غطّ بشاش رطب معقم.", "حروق >10%: رطّب باستمرار.", "الوجه والأيدي والرئتان: طوارئ قصوى.", "حرق كيميائي: أزل الملابس، اغسل 30 دقيقة."], note: "قاعدة التسعة: الرأس=9%، الذراع=9%، الساق=18%، الجذع=36%. أكثر من 20% حالة حرجة." },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "حرج", title: "فقدان الوعي", steps: ["تحقق من أمان المحيط.", "نادِ بصوت عالٍ، حفّز القص.", "لا استجابة: تحقق من التنفس (10 ثوانٍ).", "يتنفس فاقد الوعي: وضع الإفاقة الجانبي.", "لا يتنفس: ابدأ الإنعاش القلبي الرئوي.", "الإنعاش: 30 ضغطة + نفسين.", "استمر حتى التنفس أو وصول المساعدة.", "استخدم جهاز AED إن وُجد."], note: "كل دقيقة دون إنعاش تقلل فرص البقاء بنسبة 10%." },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "متوسط", title: "الكدمات والرضوض", steps: ["طريقة RICE: راحة، ثلج، ضغط، رفع.", "برودة 20 دقيقة كل ساعتين.", "اضغط دون قطع الدورة الدموية.", "ارفع فوق مستوى القلب.", "اشتبه بالكسر عند وجود تشوه.", "كدمة بالرأس: مراقبة 24 ساعة.", "ألم صدري: محتمل كسر ضلوع.", "راحة نسبية."], note: "ورم دموي دماغي قد يستغرق ساعات لإظهار الأعراض." },
    ],
    kitTitle: "طقم إسعافات أولية أساسي",
    kitItems: ["رباط إرقاء (CAT)", "ضمادات مرقئة (QuikClot)", "ضمادات إسرائيلية", "شاش معقم", "ضمادة مرنة", "قفازات لاتكس (4 أزواج)", "مقص صدمات", "ميزان حرارة", "مطهر", "إيبوبروفين وباراسيتامول", "دليل مطبوع"],
  },
  zh: {
    title: "战地急救",
    subtitle: "在冲突地区不会有救护车。你就是医生。今天学到的每项技术明天都可能拯救一条生命。",
    warning: "这是极端生存信息。正常情况下请拨打120。在活跃冲突中，当没有医疗援助时使用这些方案。",
    cases: [
      { id: "gunshot", color: "text-red-500", border: "border-red-500/40", bg: "bg-red-500/10", urgency: "生死攸关", title: "枪伤 / 刺伤", steps: ["先控制出血：用手边任何物品直接加压。", "四肢：在伤口上方5-7厘米处施加止血带。记录时间。", "胸/腹：不用止血带。直接加压。", "不要试图取出子弹。", "胸部伤口：用塑料封住三侧。", "让伤者保持温暖并躺下。", "监测呼吸道。", "不停和伤者说话保持清醒。"], note: "止血带使用不当可能导致截肢。没有它，大出血3-5分钟内致命。" },
      { id: "fracture", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10", urgency: "紧急", title: "骨折", steps: ["若怀疑脊椎骨折，不要移动伤者。", "按原样固定。", "用木板、树枝或硬纸板做夹板。", "夹板必须固定骨折处上下两个关节。", "绑扎时不要阻断血液循环。", "开放性骨折：用无菌纱布覆盖。", "抬高骨折肢体。", "监测休克征兆。"], note: "股骨骨折可导致体内失血1-2升。" },
      { id: "burn", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10", urgency: "严重", title: "烧伤", steps: ["灭火。停下、倒地、翻滚。", "用温水（非冷水）冲洗20分钟。", "不要用冰或黄油。", "不要弄破水泡。", "用湿无菌纱布覆盖。", "烧伤>10%：持续补水。", "面部、双手、肺部：极度紧急。", "化学烧伤：脱去衣物，冲洗30分钟。"], note: "九分法：头部=9%，每臂=9%，每腿=18%，躯干=36%。超过20%为危急。" },
      { id: "unconscious", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", urgency: "危急", title: "意识丧失", steps: ["检查环境安全。", "大声呼唤，刺激胸骨。", "无反应：检查呼吸（10秒）。", "有呼吸但无意识：侧卧恢复体位。", "无呼吸：立即开始心肺复苏。", "心肺复苏：30次按压+2次人工呼吸。", "持续到恢复呼吸或救援到达。", "有AED立即使用。"], note: "每延误1分钟不做心肺复苏，存活率降低10%。" },
      { id: "contusion", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10", urgency: "中等", title: "挫伤与创伤", steps: ["RICE法：休息、冰敷、加压、抬高。", "每2小时冷敷20分钟。", "加压包扎不要阻断血流。", "抬高至心脏水平以上。", "若有变形则怀疑骨折。", "头部血肿：观察24小时。", "胸部疼痛：可能肋骨骨折。", "相对休息。"], note: "脑血肿可能需要数小时才显现症状。" },
    ],
    kitTitle: "急救基本装备",
    kitItems: ["止血带（CAT型）", "止血敷料（QuikClot）", "以色列绷带", "无菌纱布", "弹性绷带", "乳胶手套（4副）", "创伤剪刀", "体温计", "消毒剂", "布洛芬和对乙酰氨基酚", "印刷版急救手册"],
  },
};

export default function FirstAid() {
  const { lang, t } = useLang();
  const c = getLangContent(content, lang);
  const [openId, setOpenId] = useState("gunshot");
  const [imageModal, setImageModal] = useState(null);

  const viewImageLabel = lang === "es" ? "Ver imagen" : lang === "fr" ? "Voir image" : lang === "pt" ? "Ver imagem" : lang === "it" ? "Vedi immagine" : lang === "ar" ? "عرض الصورة" : lang === "zh" ? "查看图片" : "View image";

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
        <Heart className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs font-bold tracking-widest uppercase">
          {lang === "es" ? "PROTOCOLO MÉDICO" : lang === "fr" ? "PROTOCOLE MÉDICAL" : lang === "pt" ? "PROTOCOLO MÉDICO" : lang === "it" ? "PROTOCOLLO MEDICO" : lang === "ar" ? "بروتوكول طبي" : lang === "zh" ? "医疗规程" : "MEDICAL PROTOCOL"}
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
              <div className="flex items-center">
                <button
                  onClick={() => setOpenId(isOpen ? null : cas.id)}
                  className={`flex-1 flex items-center justify-between p-5 ${cas.bg} transition-all`}
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
                {CASE_IMAGES[cas.id] && (
                  <button
                    className="flex items-center gap-1.5 px-4 py-5 text-xs font-medium text-primary hover:text-primary/80 hover:bg-secondary/40 transition-colors border-l border-border flex-shrink-0"
                    onClick={() => setImageModal({ title: cas.title, url: CASE_IMAGES[cas.id] })}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{viewImageLabel}</span>
                  </button>
                )}
              </div>

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
        href={`${t.shopUrl}${lang === "es" ? "kit+primeros+auxilios+combate" : lang === "fr" ? "kit+premiers+secours+combat" : lang === "pt" ? "kit+primeiros+socorros+combate" : lang === "it" ? "kit+pronto+soccorso+combattimento" : "combat+first+aid+kit"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded hover:bg-primary/90 transition-all"
      >
        <ExternalLink className="w-4 h-4" />
        {t.shopLabel}
      </a>
    </div>
  );
}
