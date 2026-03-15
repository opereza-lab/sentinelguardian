import { db } from "@/api/db";

// i18n translations for SOS module
export const sosI18n = {
  es: {
    testBanner: "⚠️ MODO TEST ACTIVO — NO SE ENVIARÁN ALERTAS REALES",
    sosActive: "SOS ACTIVO",
    holdToActivate: "Mantén 3s para activar",
    holdToDeactivate: "Mantén 3s para desactivar",
    profile: "Perfil de Emergencia",
    name: "Nombre",
    age: "Edad",
    medicalCondition: "Condición médica",
    peopleWithYou: "Personas conmigo",
    trapped: "Atrapado",
    save: "Guardar",
    cancel: "Cancelar",
    yes: "Sí",
    no: "No",
    sending: "Enviando...",
    sent: "Enviado",
    failed: "Error",
    retry: "Reintentando...",
    offline: "Sin conexión - guardado localmente",
    emergencyContacts: "Contactos de emergencia",
    addContact: "Agregar contacto",
    contactName: "Nombre del contacto",
    contactPhone: "Teléfono",
    testMode: "Modo Test",
    realMode: "Modo Real",
  },
  en: {
    testBanner: "⚠️ TEST MODE ACTIVE — NO REAL ALERTS WILL BE SENT",
    sosActive: "SOS ACTIVE",
    holdToActivate: "Hold 3s to activate",
    holdToDeactivate: "Hold 3s to deactivate",
    profile: "Emergency Profile",
    name: "Name",
    age: "Age",
    medicalCondition: "Medical condition",
    peopleWithYou: "People with me",
    trapped: "Trapped",
    save: "Save",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    sending: "Sending...",
    sent: "Sent",
    failed: "Error",
    retry: "Retrying...",
    offline: "Offline - saved locally",
    emergencyContacts: "Emergency contacts",
    addContact: "Add contact",
    contactName: "Contact name",
    contactPhone: "Phone",
    testMode: "Test Mode",
    realMode: "Real Mode",
  },
  pt: {
    testBanner: "⚠️ MODO TESTE ATIVO — NENHUM ALERTA REAL SERÁ ENVIADO",
    sosActive: "SOS ATIVO",
    holdToActivate: "Segure 3s para ativar",
    holdToDeactivate: "Segure 3s para desativar",
    profile: "Perfil de Emergência",
    name: "Nome",
    age: "Idade",
    medicalCondition: "Condição médica",
    peopleWithYou: "Pessoas comigo",
    trapped: "Preso",
    save: "Salvar",
    cancel: "Cancelar",
    yes: "Sim",
    no: "Não",
    sending: "Enviando...",
    sent: "Enviado",
    failed: "Erro",
    retry: "Tentando novamente...",
    offline: "Sem conexão - salvo localmente",
    emergencyContacts: "Contatos de emergência",
    addContact: "Adicionar contato",
    contactName: "Nome do contato",
    contactPhone: "Telefone",
    testMode: "Modo Teste",
    realMode: "Modo Real",
  },
  it: {
    testBanner: "⚠️ MODALITÀ TEST ATTIVA — NESSUN AVVISO REALE VERRÀ INVIATO",
    sosActive: "SOS ATTIVO",
    holdToActivate: "Tieni 3s per attivare",
    holdToDeactivate: "Tieni 3s per disattivare",
    profile: "Profilo di Emergenza",
    name: "Nome",
    age: "Età",
    medicalCondition: "Condizione medica",
    peopleWithYou: "Persone con me",
    trapped: "Intrappolato",
    save: "Salva",
    cancel: "Annulla",
    yes: "Sì",
    no: "No",
    sending: "Invio...",
    sent: "Inviato",
    failed: "Errore",
    retry: "Nuovo tentativo...",
    offline: "Offline - salvato localmente",
    emergencyContacts: "Contatti di emergenza",
    addContact: "Aggiungi contatto",
    contactName: "Nome contatto",
    contactPhone: "Telefono",
    testMode: "Modalità Test",
    realMode: "Modalità Reale",
  },
  fr: {
    testBanner: "⚠️ MODE TEST ACTIF — AUCUNE ALERTE RÉELLE NE SERA ENVOYÉE",
    sosActive: "SOS ACTIF",
    holdToActivate: "Maintenez 3s pour activer",
    holdToDeactivate: "Maintenez 3s pour désactiver",
    profile: "Profil d'urgence",
    name: "Nom",
    age: "Âge",
    medicalCondition: "État médical",
    peopleWithYou: "Personnes avec moi",
    trapped: "Bloqué",
    save: "Sauvegarder",
    cancel: "Annuler",
    yes: "Oui",
    no: "Non",
    sending: "Envoi...",
    sent: "Envoyé",
    failed: "Erreur",
    retry: "Nouvelle tentative...",
    offline: "Hors ligne - sauvegardé localement",
    emergencyContacts: "Contacts d'urgence",
    addContact: "Ajouter un contact",
    contactName: "Nom du contact",
    contactPhone: "Téléphone",
    testMode: "Mode Test",
    realMode: "Mode Réel",
  },
  ar: {
    testBanner: "⚠️ وضع الاختبار نشط — لن يتم إرسال تنبيهات حقيقية",
    sosActive: "SOS نشط",
    holdToActivate: "اضغط مطولاً 3 ثوانٍ للتفعيل",
    holdToDeactivate: "اضغط مطولاً 3 ثوانٍ للإلغاء",
    profile: "ملف الطوارئ",
    name: "الاسم",
    age: "العمر",
    medicalCondition: "الحالة الطبية",
    peopleWithYou: "أشخاص معي",
    trapped: "محاصر",
    save: "حفظ",
    cancel: "إلغاء",
    yes: "نعم",
    no: "لا",
    sending: "إرسال...",
    sent: "تم الإرسال",
    failed: "خطأ",
    retry: "إعادة المحاولة...",
    offline: "غير متصل - تم الحفظ محلياً",
    emergencyContacts: "جهات اتصال الطوارئ",
    addContact: "إضافة جهة اتصال",
    contactName: "اسم جهة الاتصال",
    contactPhone: "الهاتف",
    testMode: "وضع الاختبار",
    realMode: "الوضع الحقيقي",
  },
  zh: {
    testBanner: "⚠️ 测试模式已激活 — 不会发送真实警报",
    sosActive: "SOS 已激活",
    holdToActivate: "按住3秒激活",
    holdToDeactivate: "按住3秒停用",
    profile: "紧急档案",
    name: "姓名",
    age: "年龄",
    medicalCondition: "医疗状况",
    peopleWithYou: "随行人数",
    trapped: "被困",
    save: "保存",
    cancel: "取消",
    yes: "是",
    no: "否",
    sending: "发送中...",
    sent: "已发送",
    failed: "错误",
    retry: "重试...",
    offline: "离线 - 已本地保存",
    emergencyContacts: "紧急联系人",
    addContact: "添加联系人",
    contactName: "联系人姓名",
    contactPhone: "电话",
    testMode: "测试模式",
    realMode: "实际模式",
  },
};

// Device ID management
export function getOrCreateDeviceId() {
  let id = localStorage.getItem("sos_device_id");
  if (!id) {
    id = "device_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
    localStorage.setItem("sos_device_id", id);
  }
  return id;
}

// Get GPS position
export function getGPSPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  });
}

// Get battery level
export async function getBatteryLevel() {
  try {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      return Math.round(battery.level * 100);
    }
  } catch (e) {}
  return null;
}

// Offline queue management
const QUEUE_KEY = "sos_offline_queue";

export function getOfflineQueue() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch { return []; }
}

export function addToOfflineQueue(payload) {
  const queue = getOfflineQueue();
  queue.push({ ...payload, _queued_at: Date.now(), _retries: 0 });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function removeFromOfflineQueue(index) {
  const queue = getOfflineQueue();
  queue.splice(index, 1);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function clearTestDataFromQueue() {
  const queue = getOfflineQueue().filter(e => e.mode !== "test");
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

// Send SOS event
export async function sendSOSEvent(payload) {
  try {
    await db.SosEvent.create({
      timestamp: payload.timestamp,
      device_id: payload.device_id,
      latitude: payload.location?.latitude,
      longitude: payload.location?.longitude,
      accuracy: payload.location?.accuracy,
      battery_level: payload.battery_level,
      name: payload.person?.name,
      age: payload.person?.age,
      medical_condition: payload.person?.medical_condition,
      people_with_you: payload.person?.people_with_you,
      trapped: payload.person?.trapped,
      status: "pending",
      mode: payload.mode,
    });
    return { success: true };
  } catch (err) {
    addToOfflineQueue(payload);
    return { success: false, error: err.message };
  }
}

// Send beacon update
export async function sendBeaconUpdate(payload) {
  try {
    await db.BeaconUpdate.create(payload);
    return { success: true };
  } catch (err) {
    addToOfflineQueue({ _type: "beacon", ...payload });
    return { success: false };
  }
}

// Simulate SMS
export function simulateSMS(contacts, person, location, timestamp, mode) {
  const msg = `🚨 ALERTA SOS\nNombre: ${person.name || "?"}\nEdad: ${person.age || "?"}\nCondición médica: ${person.medical_condition || "ninguna"}\nPersonas conmigo: ${person.people_with_you || 0}\nAtrapado: ${person.trapped ? "SÍ" : "NO"}\nUbicación: ${location.latitude},${location.longitude}\nMapa: https://maps.google.com/?q=${location.latitude},${location.longitude}\nHora: ${timestamp}`;
  if (mode === "test") {
    console.group("📱 SMS SIMULADO (MODO TEST)");
    contacts.forEach(c => {
      console.log(`➡️ Para: ${c.name} (${c.phone})`);
      console.log(msg);
    });
    console.groupEnd();
  }
}

// Process offline queue
export async function processOfflineQueue() {
  const queue = getOfflineQueue();
  const now = Date.now();
  const MAX_AGE = 24 * 60 * 60 * 1000; // 24h
  for (let i = queue.length - 1; i >= 0; i--) {
    const item = queue[i];
    if (now - item._queued_at > MAX_AGE) {
      removeFromOfflineQueue(i);
      continue;
    }
    try {
      if (item._type === "beacon") {
        const { _type, _queued_at, _retries, ...payload } = item;
        await db.BeaconUpdate.create(payload);
      } else {
        const { _queued_at, _retries, ...payload } = item;
        await db.SosEvent.create({
          timestamp: payload.timestamp,
          device_id: payload.device_id,
          latitude: payload.location?.latitude,
          longitude: payload.location?.longitude,
          accuracy: payload.location?.accuracy,
          battery_level: payload.battery_level,
          name: payload.person?.name,
          age: payload.person?.age,
          medical_condition: payload.person?.medical_condition,
          people_with_you: payload.person?.people_with_you,
          trapped: payload.person?.trapped,
          status: "pending",
          mode: payload.mode,
        });
      }
      removeFromOfflineQueue(i);
    } catch (e) {
      queue[i]._retries = (queue[i]._retries || 0) + 1;
    }
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

// System mode (test/real)
export function getSystemMode() {
  return localStorage.getItem("sos_system_mode") || "test";
}
export function setSystemMode(mode) {
  localStorage.setItem("sos_system_mode", mode);
}

// SOS active state
export function getSOSActive() {
  return localStorage.getItem("sos_active") === "true";
}
export function setSOSActive(val) {
  localStorage.setItem("sos_active", val ? "true" : "false");
}
