import React from "react";
import { useLang } from "../LanguageContext";
import { sosI18n } from "./sosUtils";

export default function TestModeBanner() {
  const { lang } = useLang();
  const t = sosI18n[lang] || sosI18n.es;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black text-xs font-bold text-center py-1 tracking-wide">
      {t.testBanner}
    </div>
  );
}
