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
    readinessLabel: "NIVEL DE PREPARACIÓN",
    protocolLabel: "PROTOCOLO DE EVACUACIÓN",
    shopLabel: "Comprar",
    danger: "⚠ PELIGROSO: Tu familia no está protegida.",
    partial: "⚡ PARCIAL: Continúa completando tu mochila.",
    ready: "✓ PREPARADO: Tu familia tiene una oportunidad real.",
    categories: [
      { name: "AGUA Y PURIFICACIÓN", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L de agua por persona", search: "botella+agua+2l" }, { id: "lifestraw", label: "Filtro LifeStraw o Sawyer", search: "filtro+lifestraw+agua" }, { id: "tablets", label: "Pastillas potabilizadoras (20 unidades)", search: "pastillas+potabilizadoras" }] },
      { name: "ALIMENTACIÓN", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Barritas energéticas (3.600kcal mínimo)", search: "barritas+energeticas+supervivencia" }, { id: "freeze_food", label: "Comida liofilizada (3 días)", search: "comida+liofilizada+emergencia" }, { id: "spork", label: "Cubiertos de titanio / spork", search: "cubiertos+titanio+camping" }] },
      { name: "PRIMEROS AUXILIOS", color: "text-red-400", items: [{ id: "tourniquet", label: "Torniquete (CAT)", search: "torniquete+cat" }, { id: "hemostatic", label: "Apósito hemostático QuikClot", search: "quikclot+aposito" }, { id: "first_aid_kit", label: "Kit básico primeros auxilios", search: "kit+primeros+auxilios" }, { id: "medications", label: "Medicación básica (ibuprofeno, antihistamínico)", search: "botiquin+medicamentos" }] },
      { name: "COMUNICACIÓN E INFORMACIÓN", color: "text-green-400", items: [{ id: "radio", label: "Radio de emergencia (FM/AM + manivela)", search: "radio+emergencia+manivela" }, { id: "whistle", label: "Silbato de emergencia", search: "silbato+emergencia" }, { id: "documents", label: "Copias documentos (plastificadas)", search: "funda+documentos+impermeable" }, { id: "cash", label: "Efectivo (billetes pequeños)", search: "cartera+rfid" }] },
      { name: "HERRAMIENTAS", color: "text-orange-400", items: [{ id: "multitool", label: "Multiherramienta (Leatherman o similar)", search: "multiherramienta+leatherman" }, { id: "flashlight", label: "Linterna táctica + pilas extra", search: "linterna+tactica" }, { id: "knife", label: "Cuchillo fijo (hoja 10-15cm)", search: "cuchillo+supervivencia+fijo" }, { id: "firestarter", label: "Mechero + piedra de pedernal", search: "encendedor+pedernal" }, { id: "paracord", label: "Cordón paracord 30m", search: "paracord+30m" }, { id: "tarp", label: "Lona impermeable 3x3m", search: "lona+impermeable+refugio" }] },
      { name: "ROPA Y PROTECCIÓN", color: "text-purple-400", items: [{ id: "poncho", label: "Poncho impermeable / capa de lluvia", search: "poncho+impermeable+militar" }, { id: "thermal", label: "Manta térmica de emergencia (3 unidades)", search: "manta+termica+emergencia" }, { id: "boots", label: "Botas de montaña resistentes", search: "botas+montana+trekking" }] },
      { name: "ENERGÍA", color: "text-primary", items: [{ id: "power_bank", label: "Power bank solar 20.000mAh", search: "power+bank+solar+20000mah" }, { id: "batteries", label: "Pilas AA y AAA (pack 20)", search: "pilas+aa+aaa+pack" }] },
    ],
  },
  en: {
    title: "GO-BAG / BUG-OUT BAG",
    subtitle: "You have 5 minutes to get out. What do you take? This is what separates survivors from those who don't make it.",
    warning: "The go-bag must be packed and ready at all times. Not in the basement. Not disassembled. Ready by the door.",
    readinessLabel: "READINESS LEVEL",
    protocolLabel: "EVACUATION PROTOCOL",
    shopLabel: "Buy",
    danger: "⚠ DANGEROUS: Your family is not protected.",
    partial: "⚡ PARTIAL: Keep completing your bag.",
    ready: "✓ READY: Your family has a real chance.",
    categories: [
      { name: "WATER & PURIFICATION", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L water per person", search: "2l+water+bottle" }, { id: "lifestraw", label: "LifeStraw or Sawyer filter", search: "lifestraw+water+filter" }, { id: "tablets", label: "Water purification tablets (20 units)", search: "water+purification+tablets" }] },
      { name: "FOOD", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Energy bars (3,600 kcal minimum)", search: "energy+bars+survival" }, { id: "freeze_food", label: "Freeze-dried food (3 days)", search: "freeze+dried+food+emergency" }, { id: "spork", label: "Titanium utensils / spork", search: "titanium+spork+camping" }] },
      { name: "FIRST AID", color: "text-red-400", items: [{ id: "tourniquet", label: "Tourniquet (CAT)", search: "cat+tourniquet" }, { id: "hemostatic", label: "QuikClot hemostatic dressing", search: "quikclot+hemostatic" }, { id: "first_aid_kit", label: "Basic first aid kit", search: "trauma+first+aid+kit" }, { id: "medications", label: "Basic medications (ibuprofen, antihistamine)", search: "survival+medications" }] },
      { name: "COMMUNICATION & INFORMATION", color: "text-green-400", items: [{ id: "radio", label: "Emergency radio (FM/AM + hand crank)", search: "emergency+radio+hand+crank" }, { id: "whistle", label: "Emergency whistle", search: "emergency+whistle" }, { id: "documents", label: "Document copies (laminated)", search: "waterproof+document+pouch" }, { id: "cash", label: "Cash (small bills)", search: "rfid+wallet" }] },
      { name: "TOOLS", color: "text-orange-400", items: [{ id: "multitool", label: "Multi-tool (Leatherman or similar)", search: "leatherman+multi+tool" }, { id: "flashlight", label: "Tactical flashlight + extra batteries", search: "tactical+flashlight" }, { id: "knife", label: "Fixed blade knife (4-6 inch blade)", search: "fixed+blade+survival+knife" }, { id: "firestarter", label: "Lighter + flint striker", search: "fire+starter+flint" }, { id: "paracord", label: "100ft paracord", search: "paracord+100ft" }, { id: "tarp", label: "Waterproof tarp 10x10ft", search: "waterproof+tarp+survival" }] },
      { name: "CLOTHING & PROTECTION", color: "text-purple-400", items: [{ id: "poncho", label: "Waterproof poncho / rain gear", search: "military+waterproof+poncho" }, { id: "thermal", label: "Emergency thermal blanket (3 units)", search: "emergency+thermal+blanket" }, { id: "boots", label: "Sturdy hiking boots", search: "hiking+boots+waterproof" }] },
      { name: "POWER", color: "text-primary", items: [{ id: "power_bank", label: "20,000mAh solar power bank", search: "solar+power+bank+20000mah" }, { id: "batteries", label: "AA and AAA batteries (pack of 20)", search: "aa+aaa+batteries+pack" }] },
    ],
  },
  fr: {
    title: "SAC D'URGENCE / SAC DE FUITE",
    subtitle: "Vous avez 5 minutes pour partir. Qu'emportez-vous? C'est ce qui sépare les survivants des autres.",
    warning: "Le sac d'urgence doit être préparé et prêt en permanence. Pas à la cave. Pas démonté. Prêt près de la porte.",
    readinessLabel: "NIVEAU DE PRÉPARATION",
    protocolLabel: "PROTOCOLE D'ÉVACUATION",
    shopLabel: "Acheter",
    danger: "⚠ DANGEREUX: Votre famille n'est pas protégée.",
    partial: "⚡ PARTIEL: Continuez à compléter votre sac.",
    ready: "✓ PRÊT: Votre famille a une vraie chance.",
    categories: [
      { name: "EAU ET PURIFICATION", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L d'eau par personne", search: "bouteille+eau+2l" }, { id: "lifestraw", label: "Filtre LifeStraw ou Sawyer", search: "lifestraw+filtre+eau" }, { id: "tablets", label: "Pastilles purificatrices (20 unités)", search: "pastilles+purification+eau" }] },
      { name: "ALIMENTATION", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Barres énergétiques (3 600 kcal minimum)", search: "barres+energetiques+survie" }, { id: "freeze_food", label: "Nourriture lyophilisée (3 jours)", search: "nourriture+lyophilisee+urgence" }, { id: "spork", label: "Couverts en titane / spork", search: "couverts+titane+camping" }] },
      { name: "PREMIERS SECOURS", color: "text-red-400", items: [{ id: "tourniquet", label: "Garrot (CAT)", search: "garrot+cat+premiers+secours" }, { id: "hemostatic", label: "Pansement hémostatique QuikClot", search: "quikclot+pansement" }, { id: "first_aid_kit", label: "Kit de premiers secours de base", search: "kit+premiers+secours" }, { id: "medications", label: "Médicaments de base (ibuprofène, antihistaminique)", search: "medicaments+survie" }] },
      { name: "COMMUNICATION ET INFORMATION", color: "text-green-400", items: [{ id: "radio", label: "Radio d'urgence (FM/AM + manivelle)", search: "radio+urgence+manivelle" }, { id: "whistle", label: "Sifflet d'urgence", search: "sifflet+urgence" }, { id: "documents", label: "Copies de documents (plastifiées)", search: "pochette+documents+etanche" }, { id: "cash", label: "Espèces (petites coupures)", search: "portefeuille+rfid" }] },
      { name: "OUTILS", color: "text-orange-400", items: [{ id: "multitool", label: "Outil multifonction (Leatherman ou similaire)", search: "leatherman+multifonction" }, { id: "flashlight", label: "Lampe tactique + piles supplémentaires", search: "lampe+tactique" }, { id: "knife", label: "Couteau à lame fixe (10-15cm)", search: "couteau+survie+lame+fixe" }, { id: "firestarter", label: "Briquet + pierres à feu", search: "briquet+pierre+feu" }, { id: "paracord", label: "Paracorde 30m", search: "paracorde+30m" }, { id: "tarp", label: "Bâche imperméable 3x3m", search: "bache+impermeable+survie" }] },
      { name: "VÊTEMENTS ET PROTECTION", color: "text-purple-400", items: [{ id: "poncho", label: "Poncho imperméable / imperméable", search: "poncho+impermeable+militaire" }, { id: "thermal", label: "Couverture thermique d'urgence (3 unités)", search: "couverture+thermique+urgence" }, { id: "boots", label: "Chaussures de randonnée robustes", search: "chaussures+randonnee+impermeable" }] },
      { name: "ÉNERGIE", color: "text-primary", items: [{ id: "power_bank", label: "Batterie solaire 20 000mAh", search: "batterie+solaire+20000mah" }, { id: "batteries", label: "Piles AA et AAA (pack 20)", search: "piles+aa+aaa+pack" }] },
    ],
  },
  pt: {
    title: "MOCHILA SOS / MOCHILA DE FUGA",
    subtitle: "Você tem 5 minutos para sair. O que leva? Isso é o que separa os sobreviventes dos que não sobrevivem.",
    warning: "A mochila SOS deve estar embalada e pronta o tempo todo. Não no porão. Não desmontada. Pronta perto da porta.",
    readinessLabel: "NÍVEL DE PRONTIDÃO",
    protocolLabel: "PROTOCOLO DE EVACUAÇÃO",
    shopLabel: "Comprar",
    danger: "⚠ PERIGOSO: Sua família não está protegida.",
    partial: "⚡ PARCIAL: Continue completando sua mochila.",
    ready: "✓ PRONTO: Sua família tem uma chance real.",
    categories: [
      { name: "ÁGUA E PURIFICAÇÃO", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L de água por pessoa", search: "garrafa+agua+2l" }, { id: "lifestraw", label: "Filtro LifeStraw ou Sawyer", search: "lifestraw+filtro+agua" }, { id: "tablets", label: "Pastilhas purificadoras (20 unidades)", search: "pastilhas+purificacao+agua" }] },
      { name: "ALIMENTAÇÃO", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Barras energéticas (3.600kcal mínimo)", search: "barras+energeticas+sobrevivencia" }, { id: "freeze_food", label: "Comida liofilizada (3 dias)", search: "comida+liofilizada+emergencia" }, { id: "spork", label: "Talheres de titânio / spork", search: "talheres+titanio+camping" }] },
      { name: "PRIMEIROS SOCORROS", color: "text-red-400", items: [{ id: "tourniquet", label: "Torniquete (CAT)", search: "torniquete+cat" }, { id: "hemostatic", label: "Curativo hemostático QuikClot", search: "quikclot+curativo" }, { id: "first_aid_kit", label: "Kit básico de primeiros socorros", search: "kit+primeiros+socorros" }, { id: "medications", label: "Medicamentos básicos (ibuprofeno, anti-histamínico)", search: "medicamentos+sobrevivencia" }] },
      { name: "COMUNICAÇÃO E INFORMAÇÃO", color: "text-green-400", items: [{ id: "radio", label: "Rádio de emergência (FM/AM + manivela)", search: "radio+emergencia+manivela" }, { id: "whistle", label: "Apito de emergência", search: "apito+emergencia" }, { id: "documents", label: "Cópias de documentos (plastificadas)", search: "capa+documentos+impermeavel" }, { id: "cash", label: "Dinheiro vivo (notas pequenas)", search: "carteira+rfid" }] },
      { name: "FERRAMENTAS", color: "text-orange-400", items: [{ id: "multitool", label: "Multiferramenta (Leatherman ou similar)", search: "leatherman+multiferramenta" }, { id: "flashlight", label: "Lanterna tática + pilhas extras", search: "lanterna+tatica" }, { id: "knife", label: "Faca de lâmina fixa (10-15cm)", search: "faca+sobrevivencia+lamina+fixa" }, { id: "firestarter", label: "Isqueiro + pedra de fogo", search: "isqueiro+pederneira" }, { id: "paracord", label: "Cordão paracord 30m", search: "paracord+30m" }, { id: "tarp", label: "Lona impermeável 3x3m", search: "lona+impermeavel+abrigo" }] },
      { name: "ROUPA E PROTEÇÃO", color: "text-purple-400", items: [{ id: "poncho", label: "Poncho impermeável / capa de chuva", search: "poncho+impermeavel+militar" }, { id: "thermal", label: "Cobertor térmico de emergência (3 unidades)", search: "cobertor+termico+emergencia" }, { id: "boots", label: "Botas de trilha resistentes", search: "botas+trilha+impermeavel" }] },
      { name: "ENERGIA", color: "text-primary", items: [{ id: "power_bank", label: "Power bank solar 20.000mAh", search: "power+bank+solar+20000mah" }, { id: "batteries", label: "Pilhas AA e AAA (pack 20)", search: "pilhas+aa+aaa+pack" }] },
    ],
  },
  it: {
    title: "ZAINO SOS / ZAINO DI FUGA",
    subtitle: "Hai 5 minuti per uscire. Cosa porti? Questo è ciò che separa i sopravvissuti dagli altri.",
    warning: "Lo zaino SOS deve essere preparato e pronto in ogni momento. Non in cantina. Non smontato. Pronto vicino alla porta.",
    readinessLabel: "LIVELLO DI PREPARAZIONE",
    protocolLabel: "PROTOCOLLO DI EVACUAZIONE",
    shopLabel: "Acquista",
    danger: "⚠ PERICOLOSO: La tua famiglia non è protetta.",
    partial: "⚡ PARZIALE: Continua a completare il tuo zaino.",
    ready: "✓ PRONTO: La tua famiglia ha una vera possibilità.",
    categories: [
      { name: "ACQUA E PURIFICAZIONE", color: "text-blue-400", items: [{ id: "water_bottles", label: "2L di acqua a persona", search: "bottiglia+acqua+2l" }, { id: "lifestraw", label: "Filtro LifeStraw o Sawyer", search: "lifestraw+filtro+acqua" }, { id: "tablets", label: "Pastiglie purificanti (20 unità)", search: "pastiglie+purificazione+acqua" }] },
      { name: "ALIMENTAZIONE", color: "text-yellow-400", items: [{ id: "energy_bars", label: "Barrette energetiche (3.600kcal minimo)", search: "barrette+energetiche+sopravvivenza" }, { id: "freeze_food", label: "Cibo liofilizzato (3 giorni)", search: "cibo+liofilizzato+emergenza" }, { id: "spork", label: "Posate in titanio / spork", search: "posate+titanio+campeggio" }] },
      { name: "PRONTO SOCCORSO", color: "text-red-400", items: [{ id: "tourniquet", label: "Laccio emostatico (CAT)", search: "laccio+emostatico+cat" }, { id: "hemostatic", label: "Medicazione emostatica QuikClot", search: "quikclot+medicazione" }, { id: "first_aid_kit", label: "Kit di pronto soccorso di base", search: "kit+pronto+soccorso" }, { id: "medications", label: "Farmaci di base (ibuprofene, antistaminico)", search: "farmaci+sopravvivenza" }] },
      { name: "COMUNICAZIONE E INFORMAZIONE", color: "text-green-400", items: [{ id: "radio", label: "Radio di emergenza (FM/AM + manovella)", search: "radio+emergenza+manovella" }, { id: "whistle", label: "Fischietto di emergenza", search: "fischietto+emergenza" }, { id: "documents", label: "Copie documenti (plastificate)", search: "custodia+documenti+impermeabile" }, { id: "cash", label: "Contanti (banconote piccole)", search: "portafoglio+rfid" }] },
      { name: "STRUMENTI", color: "text-orange-400", items: [{ id: "multitool", label: "Multiutensile (Leatherman o simile)", search: "leatherman+multiutensile" }, { id: "flashlight", label: "Torcia tattica + pile extra", search: "torcia+tattica" }, { id: "knife", label: "Coltello a lama fissa (10-15cm)", search: "coltello+sopravvivenza+lama+fissa" }, { id: "firestarter", label: "Accendino + pietra focaia", search: "accendino+pietra+focaia" }, { id: "paracord", label: "Paracord 30m", search: "paracord+30m" }, { id: "tarp", label: "Telo impermeabile 3x3m", search: "telo+impermeabile+rifugio" }] },
      { name: "ABBIGLIAMENTO E PROTEZIONE", color: "text-purple-400", items: [{ id: "poncho", label: "Poncho impermeabile / mantella antipioggia", search: "poncho+impermeabile+militare" }, { id: "thermal", label: "Coperta termica di emergenza (3 unità)", search: "coperta+termica+emergenza" }, { id: "boots", label: "Stivali da trekking resistenti", search: "stivali+trekking+impermeabile" }] },
      { name: "ENERGIA", color: "text-primary", items: [{ id: "power_bank", label: "Power bank solare 20.000mAh", search: "power+bank+solare+20000mah" }, { id: "batteries", label: "Batterie AA e AAA (pack 20)", search: "batterie+aa+aaa+pack" }] },
    ],
  },
  ar: {
    title: "حقيبة الطوارئ / حقيبة الإخلاء",
    subtitle: "لديك 5 دقائق للخروج. ماذا تأخذ؟ هذا ما يفرق بين الناجين وغيرهم.",
    warning: "يجب أن تكون حقيبة الطوارئ مجهزة وجاهزة في جميع الأوقات. ليس في القبو. ليست مفككة. جاهزة بجانب الباب.",
    readinessLabel: "مستوى الاستعداد",
    protocolLabel: "بروتوكول الإخلاء",
    shopLabel: "شراء",
    danger: "⚠ خطير: عائلتك ليست محمية.",
    partial: "⚡ جزئي: استمر في إكمال حقيبتك.",
    ready: "✓ جاهز: عائلتك لديها فرصة حقيقية.",
    categories: [
      { name: "المياه والتنقية", color: "text-blue-400", items: [{ id: "water_bottles", label: "2 لتر ماء للشخص", search: "زجاجة+ماء+2l" }, { id: "lifestraw", label: "فلتر LifeStraw أو Sawyer", search: "lifestraw+فلتر+ماء" }, { id: "tablets", label: "أقراص تنقية المياه (20 قرص)", search: "أقراص+تنقية+مياه" }] },
      { name: "الغذاء", color: "text-yellow-400", items: [{ id: "energy_bars", label: "ألواح الطاقة (3600 سعرة حرارية كحد أدنى)", search: "ألواح+طاقة+بقاء" }, { id: "freeze_food", label: "طعام مجفف بالتجميد (3 أيام)", search: "طعام+مجفف+طوارئ" }, { id: "spork", label: "أدوات مائدة تيتانيوم", search: "أدوات+مائدة+تيتانيوم" }] },
      { name: "الإسعافات الأولية", color: "text-red-400", items: [{ id: "tourniquet", label: "رباط إرقاء (CAT)", search: "رباط+إرقاء+cat" }, { id: "hemostatic", label: "ضمادة مرقئة QuikClot", search: "quikclot+ضمادة" }, { id: "first_aid_kit", label: "طقم إسعافات أولية أساسي", search: "طقم+إسعافات+أولية" }, { id: "medications", label: "أدوية أساسية (إيبوبروفين، مضاد للهيستامين)", search: "أدوية+بقاء" }] },
      { name: "الاتصالات والمعلومات", color: "text-green-400", items: [{ id: "radio", label: "راديو طوارئ (FM/AM + مقبض يدوي)", search: "راديو+طوارئ+يدوي" }, { id: "whistle", label: "صافرة طوارئ", search: "صافرة+طوارئ" }, { id: "documents", label: "نسخ من الوثائق (مغلفة)", search: "حافظة+وثائق+مقاومة+للماء" }, { id: "cash", label: "نقود ورقية (أوراق صغيرة)", search: "محفظة+نقود" }] },
      { name: "الأدوات", color: "text-orange-400", items: [{ id: "multitool", label: "أداة متعددة الوظائف (Leatherman أو مماثل)", search: "leatherman+أداة+متعددة" }, { id: "flashlight", label: "مصباح تكتيكي + بطاريات إضافية", search: "مصباح+تكتيكي" }, { id: "knife", label: "سكين ذات نصل ثابت (10-15 سم)", search: "سكين+بقاء+نصل+ثابت" }, { id: "firestarter", label: "ولاعة + حجر الصوان", search: "ولاعة+حجر+صوان" }, { id: "paracord", label: "حبل باراكورد 30 متر", search: "paracord+30m" }, { id: "tarp", label: "مشمع مقاوم للماء 3×3 متر", search: "مشمع+مقاوم+للماء" }] },
      { name: "الملابس والحماية", color: "text-purple-400", items: [{ id: "poncho", label: "معطف مقاوم للمطر", search: "معطف+مقاوم+مطر+عسكري" }, { id: "thermal", label: "بطانية حرارية طوارئ (3 قطع)", search: "بطانية+حرارية+طوارئ" }, { id: "boots", label: "أحذية جبلية متينة", search: "أحذية+جبلية+مقاومة+للماء" }] },
      { name: "الطاقة", color: "text-primary", items: [{ id: "power_bank", label: "بنك طاقة شمسية 20,000 مللي أمبير", search: "بنك+طاقة+شمسي+20000" }, { id: "batteries", label: "بطاريات AA و AAA (حزمة 20)", search: "بطاريات+aa+aaa+حزمة" }] },
    ],
  },
  zh: {
    title: "应急包 / 逃生包",
    subtitle: "你有5分钟离开。带什么？这就是幸存者与否的区别。",
    warning: "应急包必须随时打包备用。不是在地下室。不是拆散的。就放在门边随时可取。",
    readinessLabel: "准备就绪程度",
    protocolLabel: "疏散规程",
    shopLabel: "购买",
    danger: "⚠ 危险：你的家人没有受到保护。",
    partial: "⚡ 部分完成：继续完善你的包。",
    ready: "✓ 已准备：你的家人有真正的机会。",
    categories: [
      { name: "水和净化", color: "text-blue-400", items: [{ id: "water_bottles", label: "每人2升水", search: "water+bottle+2l" }, { id: "lifestraw", label: "LifeStraw或Sawyer滤水器", search: "lifestraw+water+filter" }, { id: "tablets", label: "净水片（20片）", search: "water+purification+tablets" }] },
      { name: "食物", color: "text-yellow-400", items: [{ id: "energy_bars", label: "能量棒（最少3600千卡）", search: "energy+bars+survival" }, { id: "freeze_food", label: "冻干食品（3天）", search: "freeze+dried+food+emergency" }, { id: "spork", label: "钛合金餐具/叉勺", search: "titanium+spork+camping" }] },
      { name: "急救", color: "text-red-400", items: [{ id: "tourniquet", label: "止血带（CAT型）", search: "cat+tourniquet" }, { id: "hemostatic", label: "QuikClot止血敷料", search: "quikclot+hemostatic" }, { id: "first_aid_kit", label: "基本急救包", search: "trauma+first+aid+kit" }, { id: "medications", label: "基本药品（布洛芬、抗组胺药）", search: "survival+medications" }] },
      { name: "通讯和信息", color: "text-green-400", items: [{ id: "radio", label: "应急收音机（FM/AM + 手摇发电）", search: "emergency+radio+hand+crank" }, { id: "whistle", label: "应急哨子", search: "emergency+whistle" }, { id: "documents", label: "证件复印件（塑封）", search: "waterproof+document+pouch" }, { id: "cash", label: "现金（小面额）", search: "rfid+wallet" }] },
      { name: "工具", color: "text-orange-400", items: [{ id: "multitool", label: "多功能工具（Leatherman或同类）", search: "leatherman+multi+tool" }, { id: "flashlight", label: "战术手电筒 + 备用电池", search: "tactical+flashlight" }, { id: "knife", label: "固定刃刀（刀刃10-15厘米）", search: "fixed+blade+survival+knife" }, { id: "firestarter", label: "打火机 + 打火石", search: "fire+starter+flint" }, { id: "paracord", label: "伞绳30米", search: "paracord+100ft" }, { id: "tarp", label: "防水布3×3米", search: "waterproof+tarp+survival" }] },
      { name: "衣物和防护", color: "text-purple-400", items: [{ id: "poncho", label: "防水雨披/雨衣", search: "military+waterproof+poncho" }, { id: "thermal", label: "应急保温毯（3件）", search: "emergency+thermal+blanket" }, { id: "boots", label: "结实的登山靴", search: "hiking+boots+waterproof" }] },
      { name: "电力", color: "text-primary", items: [{ id: "power_bank", label: "太阳能充电宝20000毫安", search: "solar+power+bank+20000mah" }, { id: "batteries", label: "AA和AAA电池（20节装）", search: "aa+aaa+batteries+pack" }] },
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
        <span className="text-primary text-xs font-bold tracking-widest uppercase">{c.protocolLabel}</span>
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
          <span className="font-military text-xs text-muted-foreground tracking-widest uppercase">{c.readinessLabel}</span>
          <span className={`font-military text-sm ${pct >= 80 ? "text-green-400" : pct >= 40 ? "text-yellow-400" : "text-red-400"}`}>
            {checkedCount}/{totalCount} — {pct}%
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div className={`h-2 rounded-full transition-all duration-500 ${pct >= 80 ? "bg-green-400" : pct >= 40 ? "bg-yellow-400" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[10px] text-muted-foreground mt-2">
          {pct < 40 && c.danger}
          {pct >= 40 && pct < 80 && c.partial}
          {pct >= 80 && c.ready}
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
                    <span className={`text-sm ${checked[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}>{item.label}</span>
                  </div>
                  <a href={`${t.shopUrl}${item.search}`} target="_blank" rel="noopener noreferrer" className="ml-3 text-muted-foreground hover:text-primary transition-colors shrink-0" title={c.shopLabel}>
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
