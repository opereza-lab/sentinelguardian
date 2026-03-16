import React, { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const ONBOARDING_KEY = "sg_onboarding_done";

const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸", native: "¿Hablas español?" },
  { code: "en", label: "English", flag: "🇬🇧", native: "Do you speak English?" },
  { code: "fr", label: "Français", flag: "🇫🇷", native: "Parlez-vous français?" },
  { code: "pt", label: "Português", flag: "🇧🇷", native: "Você fala português?" },
  { code: "it", label: "Italiano", flag: "🇮🇹", native: "Parli italiano?" },
  { code: "ar", label: "العربية", flag: "🇸🇦", native: "هل تتكلم العربية؟" },
  { code: "zh", label: "中文", flag: "🇨🇳", native: "你说中文吗？" },
];

const WELCOME = {
  es: "Elige tu idioma",
  en: "Choose your language",
  fr: "Choisissez votre langue",
  pt: "Escolha seu idioma",
  it: "Scegli la tua lingua",
  ar: "اختر لغتك",
  zh: "选择您的语言",
};

export default function LanguageOnboarding({ onDone }) {
  const { lang, setLang } = useLang();
  const [selected, setSelected] = useState(lang || "es");
  const [done, setDone] = useState(() => {
    try { return !!localStorage.getItem(ONBOARDING_KEY); } catch { return false; }
  });

  if (done) return null;

  const confirm = () => {
    setLang(selected);
    try { localStorage.setItem(ONBOARDING_KEY, "1"); } catch {}
    setDone(true);
    if (onDone) onDone();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="text-4xl mb-2">🛡️</div>
        <h1 className="font-military text-2xl text-primary tracking-widest uppercase">SentinelGuardian</h1>
        <p className="text-zinc-500 text-sm mt-1">{WELCOME[selected] || WELCOME.en}</p>
      </div>

      {/* Grid de idiomas */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setSelected(l.code)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
              selected === l.code
                ? "border-primary bg-primary/10 text-white"
                : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            <span className="text-2xl">{l.flag}</span>
            <div>
              <p className="text-sm font-bold leading-tight">{l.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Botón confirmar */}
      <button
        onClick={confirm}
        className="w-full max-w-sm bg-primary text-primary-foreground font-military text-sm tracking-widest py-4 rounded-xl hover:bg-primary/90 transition-all uppercase"
      >
        {selected === "es" ? "Confirmar →" :
         selected === "en" ? "Confirm →" :
         selected === "fr" ? "Confirmer →" :
         selected === "pt" ? "Confirmar →" :
         selected === "it" ? "Conferma →" :
         selected === "ar" ? "تأكيد →" :
         selected === "zh" ? "确认 →" : "Confirm →"}
      </button>
    </div>
  );
}
