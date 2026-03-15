import React, { useState, useRef, useEffect } from "react";

const PULSE_DURATION = 2000;
const LOW_BATTERY_THRESHOLD = 20;
const LOW_BATTERY_BEEP_INTERVAL = 15000;

// ─── Pitido usando oscilador Web Audio ────────────────────────────────────────
// No requiere permisos del usuario — Web Audio API es libre de usar
function beep(audioCtxRef) {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    // Reanudar si está suspendido (política autoplay de navegadores)
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 1400; // alta frecuencia, penetrante
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1.5, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

// ─── Linterna — compatible Android / iOS / otros ──────────────────────────────
async function requestFlashTrack() {
  const constraints = [
    { video: { facingMode: { exact: "environment" } } },
    { video: { facingMode: "environment" } },
    { video: true },
  ];
  for (const c of constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(c);
      const track = stream.getVideoTracks()[0];
      if (track) return track;
    } catch {}
  }
  return null;
}

async function setTorch(track, value) {
  // Intentar con diferentes métodos según el SO
  const methods = [
    () => track.applyConstraints({ advanced: [{ torch: value }] }),
    () => track.applyConstraints({ torch: value }),
  ];
  for (const m of methods) {
    try { await m(); return true; } catch {}
  }
  return false;
}

export default function SOSSwipePanel({ visible, onClose }) {
  const [sosActive, setSosActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [flashSupported, setFlashSupported] = useState(true);
  const [flashError, setFlashError] = useState(null);

  const countdownInterval = useRef(null);
  const warningTimer = useRef(null);
  const audioCtxRef = useRef(null);
  const beepInterval = useRef(null);
  const flashTrackRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // ── Batería ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((b) => {
        setBatteryLevel(Math.round(b.level * 100));
        b.addEventListener("levelchange", () => setBatteryLevel(Math.round(b.level * 100)));
      });
    }
  }, []);

  const isLowBattery = batteryLevel <= LOW_BATTERY_THRESHOLD;

  // ── Pitido sincronizado con pulse ─────────────────────────────────────────
  useEffect(() => {
    clearInterval(beepInterval.current);
    if (!sosActive) return;

    // Inicializar AudioContext con interacción del usuario (ya ocurrió al presionar SOS)
    if (!audioCtxRef.current) {
      try { audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
    }
    if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();

    if (isLowBattery) {
      beep(audioCtxRef);
      beepInterval.current = setInterval(() => beep(audioCtxRef), LOW_BATTERY_BEEP_INTERVAL);
    } else {
      // Sincronizar con el pico del pulse (50% del ciclo)
      const delay = PULSE_DURATION * 0.5;
      const t = setTimeout(() => {
        beep(audioCtxRef);
        beepInterval.current = setInterval(() => beep(audioCtxRef), PULSE_DURATION);
      }, delay);
      return () => { clearTimeout(t); clearInterval(beepInterval.current); };
    }
    return () => clearInterval(beepInterval.current);
  }, [sosActive, isLowBattery]);

  // ── Linterna ──────────────────────────────────────────────────────────────
  const toggleFlash = async () => {
    setFlashError(null);
    if (!flashOn) {
      if (!flashTrackRef.current) {
        const track = await requestFlashTrack();
        if (!track) {
          setFlashSupported(false);
          setFlashError("Linterna no disponible en este dispositivo");
          return;
        }
        flashTrackRef.current = track;
      }
      const ok = await setTorch(flashTrackRef.current, true);
      if (ok) { setFlashOn(true); }
      else {
        setFlashSupported(false);
        setFlashError("Este dispositivo no soporta control de linterna");
      }
    } else {
      await setTorch(flashTrackRef.current, false);
      setFlashOn(false);
    }
  };

  useEffect(() => {
    return () => {
      if (flashTrackRef.current) {
        setTorch(flashTrackRef.current, false).catch(() => {});
        flashTrackRef.current.stop();
      }
    };
  }, []);

  // ── Hold SOS ──────────────────────────────────────────────────────────────
  const clearTimers = () => {
    clearInterval(countdownInterval.current);
    clearTimeout(warningTimer.current);
  };

  const startHold = () => {
    if (countdown !== null) return;
    // Inicializar AudioContext en gesto del usuario
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
        const label = !sosActive ? "ACTIVO" : "DESACTIVADO";
        setCountdown(label);
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

  // ── Swipe cierra en ambas direcciones ─────────────────────────────────────
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

  // Tamaños — SOS 186px (+20%), linterna 96px (+20%)
  const sosSize = 186;
  const flashSize = 96;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      )}

      <div
        className="fixed top-0 right-0 h-full w-full z-50 flex flex-col bg-zinc-950 transition-transform duration-300"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── HEADER — instrucciones grandes, siempre visibles ── */}
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

        {/* ── CUERPO ── */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 relative">

          {/* Status */}
          <div className={`text-sm font-black uppercase tracking-widest px-5 py-2 rounded-full border-2 ${isActive ? "bg-green-900/60 text-green-300 border-green-700" : "bg-red-900/40 text-red-300 border-red-800"}`}>
            {isActive ? "● SOS ACTIVO" : "○ SOS INACTIVO"}
          </div>

          {/* Advertencia — grande, bien arriba del botón */}
          {showWarning && !isActive && (
            <div className="w-full max-w-xs bg-red-950 border-2 border-red-600 rounded-2xl px-4 py-3 text-center shadow-2xl">
              <p className="text-base font-black text-red-300 mb-1">⚠️ ADVERTENCIA</p>
              <p className="text-sm text-red-200 leading-snug">Al activar el SOS, tu ubicación GPS será enviada a los equipos de emergencia y contactos de tu <b>Perfil SOS</b>.</p>
            </div>
          )}

          {/* ── Botón SOS ── */}
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

          {/* ── Separador ── */}
          <div className="w-full h-px bg-zinc-800" />

          {/* ── Botón Linterna — más abajo, más grande ── */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <p className="text-sm text-zinc-400 uppercase tracking-widest font-bold">Linterna</p>
            <div className="relative flex items-center justify-center">
              {/* Halo linterna — blanco brillante cuando ON */}
              {flashOn && (
                <span className="absolute rounded-full"
                  style={{
                    width: flashSize + 40, height: flashSize + 40,
                    boxShadow: "0 0 32px 14px rgba(240, 240, 255, 0.65)",
                    animation: "flashPulse 1.8s ease-in-out infinite",
                  }} />
              )}
              <button
                onClick={toggleFlash}
                className="relative rounded-full flex items-center justify-center select-none"
                style={{
                  width: flashSize, height: flashSize,
                  background: flashOn
                    ? "radial-gradient(circle at 35% 30%, #e0e0e0, #909090, #404040)"
                    : "radial-gradient(circle at 35% 30%, #787878, #303030, #111)",
                  border: flashOn ? "3px solid #d0d0d0" : "3px solid #505050",
                  boxShadow: flashOn
                    ? "0 0 24px 8px rgba(220,220,255,0.4), inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.4)"
                    : "0 6px 16px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  {/* Cuerpo linterna */}
                  <rect x="16" y="20" width="12" height="18" rx="2.5"
                    fill={flashOn ? "#b0b0b0" : "#505050"}
                    stroke={flashOn ? "#d8d8d8" : "#404040"} strokeWidth="1.2"/>
                  {/* Cabeza linterna */}
                  <path d="M13 10h18l3 10H10L13 10z"
                    fill={flashOn ? "#c8c8c8" : "#606060"}
                    stroke={flashOn ? "#e0e0e0" : "#484848"} strokeWidth="1.2"/>
                  {/* Lente */}
                  <ellipse cx="22" cy="20" rx="5" ry="3"
                    fill={flashOn ? "#f0f0ff" : "#282828"}
                    stroke={flashOn ? "#ffffff" : "#404040"} strokeWidth="1"/>
                  {/* Rayos de luz cuando ON */}
                  {flashOn && (<>
                    <line x1="22" y1="6" x2="22" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="14" y1="8" x2="11" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="30" y1="8" x2="33" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="10" y1="14" x2="6" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="34" y1="14" x2="38" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </>)}
                </svg>
              </button>
            </div>
            <span className={`text-sm font-black tracking-widest uppercase ${flashOn ? "text-white" : "text-zinc-500"}`}>
              {flashOn ? "● ON" : "○ OFF"}
            </span>
            {flashError && <p className="text-xs text-red-400 text-center px-4">{flashError}</p>}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="px-5 pb-5 pt-3 border-t border-zinc-800 text-center">
          <p className="text-sm text-zinc-600">← → desliza para cerrar</p>
        </div>
      </div>

      <style>{`
        @keyframes sosPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.93); }
          50% { opacity: 1; transform: scale(1.14); }
        }
        @keyframes flashPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}
