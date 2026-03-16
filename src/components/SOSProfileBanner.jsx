import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "./LanguageContext";

const TEXTS = {
  es: { msg: "⚠ Perfil SOS incompleto — sin contactos, el SOS no puede alertar a nadie.", btn: "Completar ahora →" },
  en: { msg: "⚠ Incomplete SOS Profile — without contacts, SOS cannot alert anyone.", btn: "Complete now →" },
  fr: { msg: "⚠ Profil SOS incomplet — sans contacts, le SOS ne peut alerter personne.", btn: "Compléter maintenant →" },
  pt: { msg: "⚠ Perfil SOS incompleto — sem contatos, o SOS não pode alertar ninguém.", btn: "Completar agora →" },
  it: { msg: "⚠ Profilo SOS incompleto — senza contatti, il SOS non può avvisare nessuno.", btn: "Completa ora →" },
  ar: { msg: "⚠ ملف SOS غير مكتمل — بدون جهات اتصال، لا يمكن لـ SOS تنبيه أي شخص.", btn: "أكمل الآن →" },
  zh: { msg: "⚠ SOS档案不完整 — 没有联系人，SOS无法提醒任何人。", btn: "立即完善 →" },
};

export default function SOSProfileBanner() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Verificar si tiene al menos 2 contactos de emergencia
    try {
      const contacts = JSON.parse(localStorage.getItem("sg_emergency_contacts") || "[]");
      if (contacts.length < 2) setShow(true);
      else setShow(false);
    } catch { setShow(true); }
  }, []);

  if (!show || dismissed) return null;

  const t = TEXTS[lang] || TEXTS.en;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-red-900 border-b-2 border-red-600 px-4 py-2 flex items-center justify-between gap-3 shadow-lg">
      <p className="text-xs text-red-200 leading-snug flex-1">{t.msg}</p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => navigate("/EmergencyProfile")}
          className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap"
        >
          {t.btn}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-red-400 hover:text-white text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
