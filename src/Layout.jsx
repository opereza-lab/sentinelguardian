import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LanguageProvider, useLang } from "./components/LanguageContext";
import { Shield, Home, MapPin, Droplets, Package, Heart, Backpack, Map, Phone, AlertTriangle, Menu, X, Globe, Navigation, Flame, User, Radio, Terminal, Anchor } from "lucide-react";
import NewsTicker from "./components/NewsTicker";
import SOSSwipePanel from "./components/sos/SOSSwipePanel";


function NavContent({ mobile = false, onClose, userRole, isAdmin }) {
  const { lang, setLang, t } = useLang();

  const navItems = [
    { key: "home", icon: Home, page: "Home" },
    { key: "threats", icon: AlertTriangle, page: "Threats" },
    { key: "shelters", icon: MapPin, page: "Shelters" },
    { key: "water", icon: Droplets, page: "Water" },
    { key: "food", icon: Package, page: "Food" },
    { key: "firstaid", icon: Heart, page: "FirstAid" },
    { key: "survivalKnots", icon: Anchor, page: "SurvivalKnots" },
    { key: "backpack", icon: Backpack, page: "GoBackpack" },
    { key: "maps", icon: Map, page: "OfflineMaps" },
    { key: "compass", icon: Navigation, page: "Compass" },
    { key: "fire", icon: Flame, page: "Fire" },
    { key: "emergency", icon: Phone, page: "Emergency" },
    { key: "sosProfile", icon: User, page: "EmergencyProfile" },
    ...(userRole === "rescuer" || userRole === "both" ? [{ key: "rescueDashboard", icon: Radio, page: "RescueDashboard" }] : []),
    ...(isAdmin ? [{ key: "developerPanel", icon: Terminal, page: "DeveloperPanel" }] : []),
  ];

  return (
    <nav className={mobile ? "flex flex-col gap-1 p-4" : "flex flex-col gap-1"}>
      {navItems.map(({ key, icon: Icon, page }) => (
        <Link
          key={key}
          to={createPageUrl(page)}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-all group"
        >
          <Icon className="w-4 h-4 group-hover:text-primary" />
          <span>{t.nav[key]}</span>
        </Link>
      ))}
      <div className="mt-4 pt-4 border-t border-border px-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Idioma / Language</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {[
            { code: "es", label: "Español" },
            { code: "en", label: "English" },
            { code: "fr", label: "Français" },
            { code: "it", label: "Italiano" },
            { code: "pt", label: "Português" },
            { code: "ar", label: "العربية" },
            { code: "zh", label: "中文" },
          ].map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`text-xs px-2 py-1 rounded transition-colors text-left ${
                lang === code
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-primary hover:bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function LayoutInner({ children }) {
  const { t, lang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sosVisible, setSosVisible] = useState(false);
  const swipeTouchStart = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "/Home";

  const handleGlobalTouchStart = (e) => {
    swipeTouchStart.current = e.touches[0].clientX;
  };
  const handleGlobalTouchEnd = (e) => {
    if (swipeTouchStart.current === null) return;
    const dx = swipeTouchStart.current - e.changedTouches[0].clientX;
    if (dx > 80 && !sosVisible) setSosVisible(true);
    swipeTouchStart.current = null;
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      onTouchStart={handleGlobalTouchStart}
      onTouchEnd={handleGlobalTouchEnd}
    >
      {/* Alert Banner */}
      <div className="bg-accent text-accent-foreground text-center py-2 px-4 text-xs font-bold alert-pulse tracking-wide">
        {t.alertBanner}
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border sticky top-0 z-50">
        <Link to="/Home" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-military text-lg text-primary tracking-widest">FAMILYSHIELD</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-1">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 overflow-y-auto" style={{paddingTop: "56px"}}>
          <div className="flex justify-end px-4 pt-3">
            <button onClick={() => setMobileOpen(false)} className="text-foreground p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
          <NavContent mobile onClose={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Back button for non-home pages on mobile */}
      {!isHome && (
        <div className="lg:hidden px-4 pt-3 pb-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-base">←</span>
            <span>{lang === "es" ? "Volver" : "Back"}</span>
          </button>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex flex-col w-56 bg-card border-r border-border sticky top-0 h-screen overflow-y-auto">
          <Link to="/Home" className="flex items-center gap-2 px-4 py-5 border-b border-border hover:opacity-80 transition-opacity">
            <Shield className="w-7 h-7 text-primary" />
            <div>
              <div className="font-military text-sm text-primary tracking-widest">FAMILYSHIELD</div>
              <div className="text-[10px] text-muted-foreground">Survival Protocol</div>
            </div>
          </Link>
          <div className="flex-1 py-4">
            <NavContent onClose={() => {}} />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto pb-8">
          {children}
        </main>
      </div>
      <NewsTicker />
      <SOSSwipePanel visible={sosVisible} onClose={() => setSosVisible(false)} />
    </div>
  );
}

export default function Layout({ children }) {
  return <LayoutInner>{children}</LayoutInner>;
}
