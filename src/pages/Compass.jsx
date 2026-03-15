import React, { useState, useEffect, useRef } from "react";
import { useLang } from "../components/LanguageContext";
import { Navigation, MapPin, Sun, Sunrise, Sunset, AlertTriangle, Info } from "lucide-react";

// ── Sun position math ──────────────────────────────────────────────────────────
function getSunPosition(lat, lng) {
  const now = new Date();
  const rad = Math.PI / 180;
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const declination = -23.45 * Math.cos(rad * (360 / 365) * (dayOfYear + 10));
  const B = (360 / 365) * (dayOfYear - 81) * rad;
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const tzOffset = -now.getTimezoneOffset() / 60;
  const solarNoon = 12 - (lng / 15 - tzOffset) - eot / 60;
  const currentHour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const hourAngle = 15 * (currentHour - solarNoon);
  const sinAlt = Math.sin(rad * lat) * Math.sin(rad * declination) + Math.cos(rad * lat) * Math.cos(rad * declination) * Math.cos(rad * hourAngle);
  const altitude = Math.asin(Math.max(-1, Math.min(1, sinAlt))) / rad;
  const cosAz = (Math.sin(rad * declination) - Math.sin(rad * lat) * sinAlt) / (Math.cos(rad * lat) * Math.sqrt(1 - sinAlt * sinAlt));
  let azimuth = (Math.acos(Math.max(-1, Math.min(1, cosAz))) / rad);
  if (hourAngle > 0) azimuth = 360 - azimuth;
  const cosRiseAz = Math.sin(rad * declination) / Math.cos(rad * lat);
  const riseAz = Math.acos(Math.max(-1, Math.min(1, cosRiseAz))) / rad;
  const setAz = 360 - riseAz;
  return { azimuth, altitude, riseAz, setAz, isUp: altitude > 0, solarNoon };
}

// ── Compass needle SVG ─────────────────────────────────────────────────────────
function CompassDial({ heading, sunAzimuth, sunAltitude, riseAz, setAz }) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = 120;
  const toXY = (angle, radius) => ({ x: cx + radius * Math.sin((angle * Math.PI) / 180), y: cy - radius * Math.cos((angle * Math.PI) / 180) });
  const cardinals = [{ label: "N", angle: 0, color: "#ef4444" }, { label: "E", angle: 90, color: "#94a3b8" }, { label: "S", angle: 180, color: "#94a3b8" }, { label: "O", angle: 270, color: "#94a3b8" }];
  const dialRotation = -heading;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto drop-shadow-xl">
      <circle cx={cx} cy={cy} r={r + 14} fill="hsl(20,14%,7%)" stroke="hsl(20,14%,16%)" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={r} fill="hsl(20,14%,4%)" stroke="hsl(22,100%,50%)" strokeWidth={1.5} />
      {Array.from({ length: 36 }).map((_, i) => { const a = i * 10; const inner = i % 9 === 0 ? r - 16 : i % 3 === 0 ? r - 10 : r - 6; const p1 = toXY(a, r); const p2 = toXY(a, inner); return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="hsl(20,14%,28%)" strokeWidth={i % 9 === 0 ? 2 : 1} />; })}
      {[{ az: riseAz, label: "☀ sale", color: "#fbbf24" }, { az: setAz, label: "☀ baja", color: "#f97316" }].map(({ az, label, color }, i) => { const p = toXY(az, r - 22); return (<g key={i}><circle cx={p.x} cy={p.y} r={5} fill={color} opacity={0.85} /><text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fill={color} fontFamily="var(--font-sans)">{label}</text></g>); })}
      {sunAltitude > -6 && (() => { const p = toXY(sunAzimuth, r - 38); const opacity = sunAltitude > 0 ? 1 : 0.4; return (<g><circle cx={p.x} cy={p.y} r={9} fill={sunAltitude > 0 ? "#fde047" : "#475569"} opacity={opacity} /><text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fill="#000">{sunAltitude > 0 ? "☀" : "☽"}</text></g>); })()}
      <g transform={`rotate(${dialRotation}, ${cx}, ${cy})`}>
        {cardinals.map(({ label, angle, color }) => { const p = toXY(angle, r - 26); return (<text key={label} x={p.x} y={p.y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={color} fontFamily="var(--font-military)">{label}</text>); })}
        <polygon points={`${cx},${cy - r + 32} ${cx - 8},${cy + 10} ${cx},${cy - 8} ${cx + 8},${cy + 10}`} fill="#ef4444" />
        <polygon points={`${cx},${cy + r - 32} ${cx - 8},${cy - 10} ${cx},${cy + 8} ${cx + 8},${cy - 10}`} fill="hsl(60,9%,60%)" />
      </g>
      <circle cx={cx} cy={cy} r={6} fill="hsl(20,14%,16%)" stroke="hsl(22,100%,50%)" strokeWidth={2} />
      <text x={cx} y={cy + 46} textAnchor="middle" fontSize="13" fill="hsl(22,100%,50%)" fontFamily="var(--font-military)" letterSpacing="2">{Math.round(heading)}°</text>
    </svg>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
const content = {
  es: {
    title: "BRÚJULA TÁCTICA",
    subtitle: "Orientación en campo real. Usa el sol, las estrellas y el terreno para nunca perderte.",
    permissionMsg: "Se necesita permiso de orientación del dispositivo para la brújula en vivo.",
    geoPermission: "Se necesita tu ubicación para calcular la posición del sol.",
    enable: "ACTIVAR BRÚJULA",
    enableGeo: "ACTIVAR UBICACIÓN",
    noOrientation: "Tu dispositivo no soporta el sensor de orientación. Usa las referencias visuales.",
    cardinalRef: [
      { dir: "NORTE", icon: "⭐", ref: "La Estrella Polar (noche) · El sol a mediodía está al SUR (hemisferio norte)" },
      { dir: "ESTE", icon: "🌅", ref: "El sol SALE por el este (±23° según estación)" },
      { dir: "SUR", icon: "☀", ref: "El sol al mediodía (hemisferio norte) · Al mediodía en hemisferio sur apunta al norte" },
      { dir: "OESTE", icon: "🌇", ref: "El sol SE PONE por el oeste (±23° según estación)" },
    ],
    methods: [
      { title: "Método del reloj analógico", steps: ["Apunta la manecilla de las horas hacia el sol.", "El punto medio entre la hora actual y las 12 apunta al SUR (hemisferio norte)."] },
      { title: "Método sombra + palo", steps: ["Clava un palo en el suelo. Marca el extremo de su sombra (punto A).", "Espera 15-20 minutos. Marca el nuevo extremo (punto B).", "La línea A→B apunta aproximadamente al ESTE.", "El norte queda a tu izquierda si miras de A a B."] },
      { title: "Estrella Polar (de noche)", steps: ["Localiza la Osa Mayor (7 estrellas en cucharón).", "Las 2 estrellas del borde del cucharón apuntan a la Estrella Polar.", "La Estrella Polar está a menos de 1° del norte verdadero."] },
    ],
    sunInfo: "POSICIÓN DEL SOL",
    altitude: "Elevación",
    azimuth: "Azimut",
    riseDir: "Sale por",
    setDir: "Se pone por",
    aboveHorizon: "Sobre el horizonte",
    belowHorizon: "Bajo el horizonte",
  },
  en: {
    title: "TACTICAL COMPASS",
    subtitle: "Real field orientation. Use the sun, stars and terrain to never get lost.",
    permissionMsg: "Device orientation permission needed for live compass.",
    geoPermission: "Your location is needed to calculate sun position.",
    enable: "ENABLE COMPASS",
    enableGeo: "ENABLE LOCATION",
    noOrientation: "Your device doesn't support orientation sensor. Use the visual references.",
    cardinalRef: [
      { dir: "NORTH", icon: "⭐", ref: "The North Star (night) · Sun at noon is to the SOUTH (northern hemisphere)" },
      { dir: "EAST", icon: "🌅", ref: "The sun RISES in the east (±23° depending on season)" },
      { dir: "SOUTH", icon: "☀", ref: "Sun at noon (northern hemisphere) · At noon in southern hemisphere points north" },
      { dir: "WEST", icon: "🌇", ref: "The sun SETS in the west (±23° depending on season)" },
    ],
    methods: [
      { title: "Analog watch method", steps: ["Point the hour hand at the sun.", "The midpoint between the current hour and 12 points SOUTH (northern hemisphere)."] },
      { title: "Shadow stick method", steps: ["Stick a stick in the ground. Mark the tip of its shadow (point A).", "Wait 15-20 minutes. Mark the new tip (point B).", "The line A→B points approximately EAST.", "North is to your left if you look from A to B."] },
      { title: "North Star (at night)", steps: ["Find the Big Dipper (7 stars in ladle shape).", "The 2 stars on the edge of the ladle point to the North Star.", "The North Star is within 1° of true north."] },
    ],
    sunInfo: "SUN POSITION",
    altitude: "Elevation",
    azimuth: "Azimuth",
    riseDir: "Rises at",
    setDir: "Sets at",
    aboveHorizon: "Above horizon",
    belowHorizon: "Below horizon",
  },
};

export default function Compass() {
  const { lang } = useLang();
  const c = content[lang] || content["es"];
  const [heading, setHeading] = useState(0);
  const [hasOrientation, setHasOrientation] = useState(null);
  const [orientationEnabled, setOrientationEnabled] = useState(false);
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(false);
  const [geoEnabled, setGeoEnabled] = useState(false);
  const [sunPos, setSunPos] = useState(null);
  const [showMethods, setShowMethods] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (coords) {
      const update = () => setSunPos(getSunPosition(coords.lat, coords.lng));
      update();
      intervalRef.current = setInterval(update, 30000);
    }
    return () => clearInterval(intervalRef.current);
  }, [coords]);

  const enableGeo = () => {
    if (!navigator.geolocation) { setGeoError(true); return; }
    navigator.geolocation.getCurrentPosition(
      pos => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setGeoEnabled(true); },
      () => setGeoError(true)
    );
  };

  const enableCompass = async () => {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      try { const perm = await DeviceOrientationEvent.requestPermission(); if (perm !== "granted") return; } catch { return; }
    }
    if (!window.DeviceOrientationEvent) { setHasOrientation(false); return; }
    const handler = (e) => {
      if (e.webkitCompassHeading !== undefined) { setHeading(e.webkitCompassHeading); setHasOrientation(true); }
      else if (e.absolute && e.alpha !== null) { setHeading((360 - e.alpha) % 360); setHasOrientation(true); }
      else if (e.alpha !== null) { setHeading((360 - e.alpha) % 360); setHasOrientation(true); }
    };
    window.addEventListener("deviceorientationabsolute", handler, true);
    window.addEventListener("deviceorientation", handler, true);
    setOrientationEnabled(true);
  };

  const headingLabel = () => {
    const dirs = lang === "es" ? ["N", "NE", "E", "SE", "S", "SO", "O", "NO"] : ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(heading / 45) % 8];
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Navigation className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-xs font-bold tracking-widest uppercase">{lang === "es" ? "NAVEGACIÓN TÁCTICA" : "TACTICAL NAVIGATION"}</span>
      </div>
      <h1 className="font-military text-3xl lg:text-4xl text-foreground tracking-widest mb-2">{c.title}</h1>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{c.subtitle}</p>

      <div className="bg-card border border-border rounded p-6 mb-6 text-center">
        {orientationEnabled && hasOrientation !== false ? (
          <>
            <CompassDial heading={heading} sunAzimuth={sunPos?.azimuth ?? 0} sunAltitude={sunPos?.altitude ?? -90} riseAz={sunPos?.riseAz ?? 90} setAz={sunPos?.setAz ?? 270} />
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="font-military text-2xl text-primary">{headingLabel()}</span>
              <span className="text-xs text-muted-foreground">{Math.round(heading)}°</span>
            </div>
          </>
        ) : (
          <div className="py-8 space-y-4">
            {hasOrientation === false && (<div className="flex items-center gap-2 justify-center text-yellow-400 text-sm mb-4"><AlertTriangle className="w-4 h-4" />{c.noOrientation}</div>)}
            {!orientationEnabled && (<>
              <Navigation className="w-16 h-16 text-muted-foreground mx-auto mb-2 opacity-40" />
              <p className="text-xs text-muted-foreground mb-4">{c.permissionMsg}</p>
              <button onClick={enableCompass} className="bg-primary text-primary-foreground font-military tracking-widest text-sm px-8 py-3 rounded hover:bg-primary/90 transition-all">{c.enable}</button>
            </>)}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sun className="w-4 h-4 text-yellow-400" />
          <span className="font-military text-xs text-yellow-400 tracking-widest uppercase">{c.sunInfo}</span>
        </div>
        {!geoEnabled ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">{c.geoPermission}</p>
            {geoError && <p className="text-xs text-red-400 mb-2">⚠ {lang === "es" ? "No se pudo obtener ubicación." : "Could not get location."}</p>}
            <button onClick={enableGeo} className="flex items-center gap-2 bg-secondary border border-border text-sm text-foreground px-5 py-2.5 rounded hover:border-primary/50 transition-all">
              <MapPin className="w-4 h-4 text-primary" />{c.enableGeo}
            </button>
          </div>
        ) : sunPos ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-background rounded border border-border"><div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{c.azimuth}</div><div className="font-military text-primary text-lg">{Math.round(sunPos.azimuth)}°</div></div>
            <div className="p-3 bg-background rounded border border-border"><div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{c.altitude}</div><div className={`font-military text-lg ${sunPos.altitude > 0 ? "text-yellow-400" : "text-blue-400"}`}>{Math.round(sunPos.altitude)}°</div><div className="text-[10px] text-muted-foreground mt-0.5">{sunPos.isUp ? c.aboveHorizon : c.belowHorizon}</div></div>
            <div className="p-3 bg-background rounded border border-border flex items-center gap-2"><Sunrise className="w-4 h-4 text-yellow-300" /><div><div className="text-[10px] text-muted-foreground uppercase tracking-widest">{c.riseDir}</div><div className="font-military text-yellow-300">{Math.round(sunPos.riseAz)}°</div></div></div>
            <div className="p-3 bg-background rounded border border-border flex items-center gap-2"><Sunset className="w-4 h-4 text-orange-400" /><div><div className="text-[10px] text-muted-foreground uppercase tracking-widest">{c.setDir}</div><div className="font-military text-orange-400">{Math.round(sunPos.setAz)}°</div></div></div>
          </div>
        ) : null}
      </div>

      <div className="bg-card border border-border rounded p-5 mb-6">
        <h2 className="font-military text-xs text-foreground tracking-widest uppercase mb-4">{lang === "es" ? "REFERENCIAS NATURALES POR PUNTO CARDINAL" : "NATURAL CARDINAL REFERENCES"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {c.cardinalRef.map((ref, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-background rounded border border-border">
              <span className="text-xl">{ref.icon}</span>
              <div><div className="font-military text-xs text-primary tracking-widest mb-1">{ref.dir}</div><div className="text-xs text-muted-foreground leading-relaxed">{ref.ref}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <button onClick={() => setShowMethods(!showMethods)} className="w-full flex items-center justify-between p-5 hover:bg-secondary transition-all">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="font-military text-xs text-foreground tracking-widest uppercase">{lang === "es" ? "MÉTODOS SIN DISPOSITIVOS" : "METHODS WITHOUT DEVICES"}</span>
          </div>
          <span className="text-muted-foreground">{showMethods ? "▲" : "▼"}</span>
        </button>
        {showMethods && (
          <div className="p-5 pt-0 space-y-5 border-t border-border">
            {c.methods.map((m, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-primary mb-2">{m.title}</h3>
                <ol className="space-y-1.5">
                  {m.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold shrink-0">{j + 1}.</span>{step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
