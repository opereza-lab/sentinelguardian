import React, { useState, useRef, useEffect } from "react";

const PULSE_DURATION = 2000;
const LOW_BATTERY_THRESHOLD = 20;
const LOW_BATTERY_BEEP_INTERVAL = 15000;

function beep(audioCtxRef) {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 1400;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1.5, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

function getGPS() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6), acc: Math.round(pos.coords.accuracy) }),
      () => resolve(null),
      { timeout: 10000, maximumAge: 30000, enableHighAccuracy: true }
    );
  });
}

function buildSMSLink(coords) {
  const mapsUrl = `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
  const msg = `🆘 EMERGENCIA SOS\nUbicación GPS: ${coords.lat}, ${coords.lng}\nPrecisión: ~${coords.acc}m\nVer en mapa: ${mapsUrl}\nNecesito ayuda urgente.`;
  return `sms:?body=${encodeURIComponent(msg)}`;
}

export default function SOSSwipePanel({ visible, onClose }) {
  const [sosActive, setSosActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [coords, setCoords] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(false);

  const countdownInterval = useRef(null);
  const warningTimer = useRef(null);
  const audioCtxRef = useRef(null);
  const beepInterval = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Batería
  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((b) => {
        setBatteryLevel(Math.round(b.level * 100));
        b.addEventListener("levelchange", () => setBatteryLevel(Math.round(b.level * 100)));
      });
    }
  }, []);

  // GPS — obtener al abrir el panel
  useEffect(() => {
    if (!visible) return;
    setGpsLoading(true);
    setGpsError(false);
    getGPS().then((c) => {
      setCoords(c);
      setGpsLoading(false);
      if (!c) setGpsError(true);
    });
  }, [visible]);

  // Actualizar GPS cada 30 segundos cuando SOS está activo
  useEffect(() => {
    if (!sosActive) return;
    const interval = setInterval(() => {
      getGPS().then((c) => { if (c) setCoords(c); });
    }, 30000);
    return () => clearInterval(interval);
  }, [sosActive]);

  const isLowBattery = batteryLevel <= LOW_BATTERY_THRESHOLD;

  // Pitido sincronizado con pulse
  useEffect(() => {
    clearInterval(beepInterval.current);
    if (!sosActive) return;
    if (!audioCtxRef.current) {
      try { audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
    }
    if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
    if (isLowBattery) {
      beep(audioCtxRef);
      beepInterval.current = setInterval(() => beep(audioCtxRef), LOW_BATTERY_BEEP_INTERVAL);
    } else {
      const t = setTimeout(() => {
        beep(audioCtxRef);
        beepInterval.current = setInterval(() => beep(audioCtxRef), PULSE_DURATION);
      }, PULSE_DURATION * 0.5);
      return () => { clearTimeout(t); clearInterval(beepInterval.current); };
    }
    return () => clearInterval(beepInterval.current);
  }, [sosActive, isLowBattery]);

  const clearTimers = () => {
    clearInterval(countdownInterval.current);
    clearTimeout(warningTimer.current);
  };

  const startHold = () => {
    if (countdown !== null) return;
    if (!audioCtxRef.current) {
      try { audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
    }
    if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
    setHolding(true);
    warningTimer.current = setTimeout(() => {
      if (!sosActive) setShowWarning(true);
    }, 1000);
    let count = 3;
    setCountdown(count);
    countdownInterval.current = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval.current);
        setCountdown(!sosActive ? "ACTIVO" : "DESACTIVADO");
        setTimeout(() => {
          setSosActive(prev => !prev);
          setShowWarning(false);
          setCountdown(null);
          setHolding(false);
        }, 900);
      }
    }, 1000);
  };

  const cancelHold = () => {
    clearTimers();
    setHolding(false);
    setCountdown(null);
    setShowWarning(false);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 60 && dy < 80) onClose();
    touchStartX.current = null;
  };

  const isActive = sosActive;
  const pulseColor = isActive ? "rgba(34,197,94,0.85)" : "rgba(220,38,38,0.8)";
  const btnBg = isActive ? "#16a34a" : "#dc2626";
  const btnBorder = isActive ? "#22c55e" : "#ef4444";
  const pulseDur = `${PULSE_DURATION}ms`;
  const sosSize = 186;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      )}

      <div
        className="fixed top-0 right-0 h-full w-full z-50 flex flex-col bg-zinc-950 transition-transform duration-300"
        style={{ 
          transform: visible ? "translateX(0)" : "translateX(100%)",
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* HEADER */}
        <div className="px-5 pt-5 pb-4 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-zinc-300 tracking-widest uppercase">SentinelGuardian SOS</span>
            <button onClick={onClose} className="text-zinc-400 hover:text-white text-2xl leading-none w-9 h-9 flex items-center justify-center">✕</button>
          </div>
          <div className="bg-zinc-900 rounded-xl px-4 py-3 space-y-1.5">
            <p className="text-base font-bold text-white">📋 Instrucciones</p>
            <p className="text-sm text-zinc-300">• <b className="text-white">Activar:</b> mantén el botón SOS 3 seg → <span className="text-green-400 font-bold">ACTIVO</span></p>
            <p className="text-sm text-zinc-300">• <b className="text-white">Desactivar:</b> mismo procedimiento → <span className="text-red-400 font-bold">DESACTIVADO</span></p>
            <p className="text-sm text-zinc-400">• Suelta antes de 3 seg para cancelar</p>
            {isLowBattery && (
              <p className="text-sm text-yellow-400 font-bold">⚡ Batería baja ({batteryLevel}%) — pitido reducido</p>
            )}
          </div>
        </div>

        {/* CUERPO */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 overflow-y-auto py-4">

          {/* Status */}
          <div className={`text-sm font-black uppercase tracking-widest px-5 py-2 rounded-full border-2 ${isActive ? "bg-green-900/60 text-green-300 border-green-700" : "bg-red-900/40 text-red-300 border-red-800"}`}>
            {isActive ? "● SOS ACTIVO" : "○ SOS INACTIVO"}
          </div>

          {/* GPS */}
          <div className={`w-full max-w-xs rounded-xl px-4 py-3 text-center border ${coords ? "bg-zinc-900 border-zinc-700" : "bg-zinc-900/50 border-zinc-800"}`}>
            {gpsLoading && <p className="text-sm text-zinc-400">📡 Obteniendo ubicación GPS...</p>}
            {!gpsLoading && coords && (<>
              <p className="text-xs text-zinc-500 mb-1 uppercase tracking-widest">📍 Ubicación GPS</p>
              <p className="text-base font-bold text-white font-mono">{coords.lat}, {coords.lng}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Precisión: ~{coords.acc}m</p>
            </>)}
            {!gpsLoading && gpsError && (
              <p className="text-sm text-yellow-400">⚠ GPS no disponible — activa la ubicación</p>
            )}
          </div>

          {/* Advertencia */}
          {showWarning && !isActive && (
            <div className="w-full max-w-xs bg-red-950 border-2 border-red-600 rounded-2xl px-4 py-3 text-center shadow-2xl">
              <p className="text-base font-black text-red-300 mb-1">⚠️ ADVERTENCIA</p>
              <p className="text-sm text-red-200 leading-snug">Al activar el SOS, tu ubicación GPS será enviada a los equipos de emergencia y contactos de tu <b>Perfil SOS</b>.</p>
            </div>
          )}

          {/* Botón SOS */}
          <div className="relative flex items-center justify-center">
            {(isActive || holding) && (<>
              <span className="absolute rounded-full"
                style={{ width: sosSize + 80, height: sosSize + 80, background: pulseColor, opacity: 0.12, animation: `sosPulse ${pulseDur} ease-in-out infinite` }} />
              <span className="absolute rounded-full"
                style={{ width: sosSize + 40, height: sosSize + 40, background: pulseColor, opacity: 0.20, animation: `sosPulse ${pulseDur} ease-in-out infinite`, animationDelay: `${PULSE_DURATION * 0.3}ms` }} />
            </>)}
            {!isActive && !holding && (
              <span className="absolute rounded-full"
                style={{ width: sosSize + 40, height: sosSize + 40, boxShadow: `0 0 36px 14px ${pulseColor}`, animation: `sosPulse ${pulseDur} ease-in-out infinite` }} />
            )}
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={(e) => { e.preventDefault(); startHold(); }}
              onTouchEnd={cancelHold}
              className="relative rounded-full flex items-center justify-center font-black text-white select-none"
              style={{
                width: sosSize, height: sosSize,
                background: btnBg,
                border: `6px solid ${btnBorder}`,
                boxShadow: `0 0 48px 18px ${pulseColor}`,
                fontSize: countdown !== null ? 42 : 52,
                transition: "background 0.4s, box-shadow 0.4s",
                cursor: "pointer",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                WebkitTouchCallout: "none",
                touchAction: "none",
                letterSpacing: 2,
              }}
            >
              {countdown !== null ? countdown : "SOS"}
            </button>
          </div>

          <p className="text-sm text-zinc-400 text-center">
            {holding ? "Suelta para cancelar..." : isActive ? "Mantén 3 seg para DESACTIVAR" : "Mantén 3 seg para ACTIVAR"}
          </p>

          {/* Botón SMS — visible cuando SOS activo y hay coordenadas */}
          {isActive && coords && (
            <a
              href={buildSMSLink(coords)}
              className="w-full max-w-xs flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-black text-base py-4 rounded-2xl border-2 border-green-500 shadow-lg transition-all"
              style={{ letterSpacing: 1 }}
            >
              📲 ENVIAR COORDENADAS POR SMS
            </a>
          )}
          {isActive && !coords && (
            <p className="text-sm text-yellow-400 text-center">⚠ Activa el GPS para enviar coordenadas</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 pb-5 pt-3 border-t border-zinc-800 text-center">
          <p className="text-sm text-zinc-600">← → desliza para cerrar</p>
        </div>
      </div>

      <style>{`
        @keyframes sosPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.93); }
          50% { opacity: 1; transform: scale(1.14); }
        }
        .sos-panel * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
    </>
  );
}
