import React, { useState, useRef, useEffect } from "react";

const HOLD_DURATION = 3000;
const PULSE_DURATION = 2000;
const LOW_BATTERY_THRESHOLD = 20;
const LOW_BATTERY_BEEP_INTERVAL = 15000;

function createBeep(audioCtxRef) {
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
    osc.frequency.value = 1200;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1.0, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

async function getFlashlightTrack() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    return stream.getVideoTracks()[0];
  } catch { return null; }
}

export default function SOSSwipePanel({ visible, onClose }) {
  const [sosActive, setSosActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [flashSupported, setFlashSupported] = useState(true);

  const holdTimer = useRef(null);
  const countdownInterval = useRef(null);
  const warningTimer = useRef(null);
  const audioCtxRef = useRef(null);
  const beepInterval = useRef(null);
  const flashTrackRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
  }, []);

  const isLowBattery = batteryLevel <= LOW_BATTERY_THRESHOLD;

  useEffect(() => {
    if (!sosActive) {
      clearInterval(beepInterval.current);
      return;
    }
    if (isLowBattery) {
      createBeep(audioCtxRef);
      beepInterval.current = setInterval(() => createBeep(audioCtxRef), LOW_BATTERY_BEEP_INTERVAL);
    } else {
      const delay = PULSE_DURATION * 0.5;
      const t = setTimeout(() => {
        createBeep(audioCtxRef);
        beepInterval.current = setInterval(() => createBeep(audioCtxRef), PULSE_DURATION);
      }, delay);
      return () => { clearTimeout(t); clearInterval(beepInterval.current); };
    }
    return () => clearInterval(beepInterval.current);
  }, [sosActive, isLowBattery]);

  const toggleFlash = async () => {
    if (!flashOn) {
      if (!flashTrackRef.current) {
        const track = await getFlashlightTrack();
        if (!track) { setFlashSupported(false); return; }
        flashTrackRef.current = track;
      }
      try {
        await flashTrackRef.current.applyConstraints({ advanced: [{ torch: true }] });
        setFlashOn(true);
      } catch { setFlashSupported(false); }
    } else {
      try {
        await flashTrackRef.current.applyConstraints({ advanced: [{ torch: false }] });
        setFlashOn(false);
      } catch {}
    }
  };

  useEffect(() => {
    return () => {
      if (flashTrackRef.current) {
        flashTrackRef.current.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
        flashTrackRef.current.stop();
      }
    };
  }, []);

  const clearTimers = () => {
    clearTimeout(holdTimer.current);
    clearInterval(countdownInterval.current);
    clearTimeout(warningTimer.current);
  };

  const startHold = () => {
    if (countdown !== null) return;
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
        const finalLabel = !sosActive ? "ACTIVO" : "DESACTIVADO";
        setCountdown(finalLabel);
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
  const pulseColor = isActive ? "rgba(34,197,94,0.8)" : "rgba(220,38,38,0.75)";
  const btnBg = isActive ? "#16a34a" : "#dc2626";
  const btnBorder = isActive ? "#22c55e" : "#ef4444";
  const pulseDur = `${PULSE_DURATION}ms`;

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
        {/* HEADER — instrucciones siempre visibles */}
        <div className="px-5 pt-5 pb-3 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-zinc-500 tracking-widest uppercase">SentinelGuardian SOS</span>
            <button onClick={onClose} className="text-zinc-500 hover:text-white text-xl leading-none">✕</button>
          </div>
          <div className="bg-zinc-900 rounded-lg px-3 py-2 text-[11px] text-zinc-400 space-y-0.5">
            <p>• <b className="text-white">Activar:</b> mantén el botón SOS 3 seg → <span className="text-green-400">ACTIVO</span></p>
            <p>• <b className="text-white">Desactivar:</b> mismo procedimiento → <span className="text-red-400">DESACTIVADO</span></p>
            <p>• Suelta antes de 3 seg para cancelar</p>
            {isLowBattery && (
              <p className="text-yellow-400 font-bold mt-1">⚡ Batería baja ({batteryLevel}%) — pitido reducido a 1/15 seg</p>
            )}
          </div>
        </div>

        {/* CUERPO CENTRAL */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 relative">

          {/* Status */}
          <div className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${isActive ? "bg-green-900/60 text-green-300 border-green-700" : "bg-red-900/40 text-red-300 border-red-800"}`}>
            {isActive ? "● SOS ACTIVO" : "○ SOS INACTIVO"}
          </div>

          {/* Advertencia — sobre el botón, aparece después de 1 segundo */}
          {showWarning && !isActive && (
            <div className="w-full max-w-xs bg-red-950 border border-red-700 rounded-xl p-3 text-xs text-red-200 text-center shadow-xl">
              ⚠️ <b>ADVERTENCIA:</b> Al activar el SOS, tu ubicación GPS será enviada a los equipos de emergencia y contactos de tu <b>Perfil SOS</b>.
            </div>
          )}

          {/* Botón SOS */}
          <div className="relative flex items-center justify-center">
            {(isActive || holding) && (<>
              <span className="absolute rounded-full" style={{ width: 230, height: 230, background: pulseColor, opacity: 0.12, animation: `sosPulse ${pulseDur} ease-in-out infinite` }} />
              <span className="absolute rounded-full" style={{ width: 190, height: 190, background: pulseColor, opacity: 0.20, animation: `sosPulse ${pulseDur} ease-in-out infinite`, animationDelay: `${PULSE_DURATION * 0.3}ms` }} />
            </>)}
            {!isActive && !holding && (
              <span className="absolute rounded-full" style={{ width: 190, height: 190, boxShadow: `0 0 32px 12px ${pulseColor}`, animation: `sosPulse ${pulseDur} ease-in-out infinite` }} />
            )}
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={(e) => { e.preventDefault(); startHold(); }}
              onTouchEnd={cancelHold}
              className="relative rounded-full flex items-center justify-center font-black text-white select-none"
              style={{
                width: 155,
                height: 155,
                background: btnBg,
                border: `5px solid ${btnBorder}`,
                boxShadow: `0 0 44px 16px ${pulseColor}`,
                fontSize: countdown !== null ? 36 : 44,
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

          {/* Instrucción hold */}
          <p className="text-xs text-zinc-400 text-center leading-relaxed">
            {holding ? "Suelta para cancelar..." : isActive ? "Mantén 3 seg para DESACTIVAR" : "Mantén 3 seg para ACTIVAR"}
          </p>

          {/* Separador */}
          <div className="w-full h-px bg-zinc-800" />

          {/* Botón Linterna */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Linterna</p>
            <div className="relative flex items-center justify-center">
              {flashOn && (
                <span className="absolute rounded-full" style={{
                  width: 110, height: 110,
                  boxShadow: "0 0 26px 10px rgba(255, 210, 60, 0.45)",
                  animation: "flashPulse 1.8s ease-in-out infinite",
                }} />
              )}
              <button
                onClick={toggleFlash}
                disabled={!flashSupported}
                className="relative rounded-full flex items-center justify-center select-none"
                style={{
                  width: 80, height: 80,
                  background: flashOn
                    ? "radial-gradient(circle at 35% 35%, #c0a060, #6b5520, #3a2e10)"
                    : "radial-gradient(circle at 35% 35%, #6b6b6b, #2a2a2a, #111)",
                  border: flashOn ? "3px solid #d4a820" : "3px solid #444",
                  boxShadow: flashOn
                    ? "0 0 22px 8px rgba(255,200,40,0.35), inset 0 2px 4px rgba(255,255,200,0.15)"
                    : "0 4px 12px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.05)",
                  cursor: flashSupported ? "pointer" : "not-allowed",
                  opacity: flashSupported ? 1 : 0.4,
                  transition: "all 0.3s",
                }}
              >
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <path d="M14 6h8l3 10H11L14 6z" fill={flashOn ? "#ffe080" : "#888"} stroke={flashOn ? "#d4a820" : "#555"} strokeWidth="1.2"/>
                  <rect x="12" y="16" width="12" height="14" rx="2" fill={flashOn ? "#c89020" : "#555"} stroke={flashOn ? "#d4a820" : "#444"} strokeWidth="1.2"/>
                  <circle cx="18" cy="21" r="3" fill={flashOn ? "#ffe090" : "#333"} stroke={flashOn ? "#ffd040" : "#555"} strokeWidth="1"/>
                  {flashOn && (<>
                    <line x1="18" y1="4" x2="18" y2="1" stroke="#ffe080" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11" y1="6" x2="8.5" y2="3.5" stroke="#ffe080" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="25" y1="6" x2="27.5" y2="3.5" stroke="#ffe080" strokeWidth="1.5" strokeLinecap="round"/>
                  </>)}
                </svg>
              </button>
            </div>
            <span className={`text-[11px] font-bold tracking-widest uppercase ${flashOn ? "text-yellow-400" : "text-zinc-500"}`}>
              {!flashSupported ? "No disponible" : flashOn ? "ON" : "OFF"}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-5 pb-5 pt-3 border-t border-zinc-800 text-center">
          <p className="text-[10px] text-zinc-600">← → desliza para cerrar</p>
        </div>
      </div>

      <style>{`
        @keyframes sosPulse {
          0%, 100% { opacity: 0.45; transform: scale(0.94); }
          50% { opacity: 1; transform: scale(1.13); }
        }
        @keyframes flashPulse {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.09); }
        }
      `}</style>
    </>
  );
}
