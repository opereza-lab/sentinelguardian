import React, { useState, useRef, useEffect } from "react";

const HOLD_DURATION = 3000;

export default function SOSSwipePanel({ visible, onClose }) {
  const [sosActive, setSosActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [countdown, setCountdown] = useState(null); // null | 3 | 2 | 1 | "ACTIVO" | "DESACTIVADO"
  const [showInfo, setShowInfo] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const holdTimer = useRef(null);
  const countdownInterval = useRef(null);
  const holdStart = useRef(null);

  const clearTimers = () => {
    clearTimeout(holdTimer.current);
    clearInterval(countdownInterval.current);
  };

  const startHold = () => {
    if (countdown !== null) return;
    setHolding(true);
    holdStart.current = Date.now();
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
          setCountdown(null);
          setHolding(false);
          if (!sosActive) setShowWarning(true);
        }, 900);
      }
    }, 1000);
  };

  const cancelHold = () => {
    clearTimers();
    setHolding(false);
    setCountdown(null);
  };

  // Swipe left to close
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx > 60) onClose();
    touchStartX.current = null;
  };

  const isActive = sosActive;
  const pulseColor = isActive ? "rgba(34,197,94,0.7)" : "rgba(220,38,38,0.7)";
  const btnBg = isActive ? "#16a34a" : "#dc2626";
  const btnBorder = isActive ? "#22c55e" : "#ef4444";

  return (
    <>
      {/* Overlay */}
      {visible && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col items-center justify-center gap-6 bg-zinc-900 border-l border-zinc-700 transition-transform duration-300"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close swipe hint */}
        <div className="absolute top-4 left-4 text-xs text-zinc-500 flex items-center gap-1">
          <span>← desliza para cerrar</span>
        </div>

        {/* Info button */}
        <button
          onClick={() => setShowInfo(p => !p)}
          className="absolute top-4 right-4 text-xs text-zinc-400 border border-zinc-600 rounded-full w-6 h-6 flex items-center justify-center hover:border-zinc-300"
        >?</button>

        {/* Info panel */}
        {showInfo && (
          <div className="absolute top-12 right-2 left-2 bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-xs text-zinc-300 z-10 space-y-1">
            <p className="font-bold text-white mb-1">📋 Instrucciones SOS</p>
            <p>• <b>Activar:</b> mantén presionado el botón 3 seg → cuenta regresiva → ACTIVO.</p>
            <p>• <b>Desactivar:</b> mismo procedimiento → DESACTIVADO.</p>
            <p>• Al soltar antes de 3 seg, se cancela la acción.</p>
            <p>• El botón cambia a <span className="text-green-400">verde</span> cuando está activo y a <span className="text-red-400">rojo</span> cuando inactivo.</p>
            <button onClick={() => setShowInfo(false)} className="mt-2 text-zinc-500 underline">Cerrar</button>
          </div>
        )}

        {/* Status label */}
        <div className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isActive ? "bg-green-900 text-green-300" : "bg-red-900/50 text-red-300"}`}>
          {isActive ? "● ACTIVO" : "○ INACTIVO"}
        </div>

        {/* SOS Button */}
        <div className="relative flex items-center justify-center">
          {/* Pulse rings */}
          {(isActive || holding) && (
            <>
              <span className="absolute rounded-full animate-ping"
                style={{ width: 160, height: 160, background: pulseColor, opacity: 0.25 }} />
              <span className="absolute rounded-full animate-ping"
                style={{ width: 130, height: 130, background: pulseColor, opacity: 0.35, animationDelay: "0.4s" }} />
            </>
          )}
          {!isActive && !holding && (
            <span className="absolute rounded-full"
              style={{ width: 140, height: 140, boxShadow: `0 0 24px 8px ${pulseColor}`, borderRadius: "50%", animation: "sosPulse 2s ease-in-out infinite" }} />
          )}

          <button
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={(e) => { e.preventDefault(); startHold(); }}
            onTouchEnd={cancelHold}
            className="relative rounded-full flex items-center justify-center font-black text-white select-none"
            style={{
              width: 110,
              height: 110,
              background: btnBg,
              border: `4px solid ${btnBorder}`,
              boxShadow: `0 0 32px 10px ${pulseColor}`,
              fontSize: countdown !== null ? 28 : 32,
              transition: "background 0.4s, box-shadow 0.4s",
              cursor: "pointer",
              WebkitUserSelect: "none",
              touchAction: "none",
            }}
          >
            {countdown !== null ? countdown : "SOS"}
          </button>
        </div>

        {/* Hold instruction */}
        <p className="text-xs text-zinc-400 text-center px-4 leading-relaxed">
          {holding
            ? "Suelta para cancelar..."
            : isActive
            ? "Mantén 3 seg para DESACTIVAR"
            : "Mantén 3 seg para ACTIVAR"}
        </p>

        {/* Warning message */}
        {showWarning && isActive && (
          <div className="mx-4 bg-red-900/60 border border-red-600 rounded-lg p-3 text-xs text-red-200 text-center">
            ⚠️ <b>ADVERTENCIA:</b> Al activar el SOS, tu ubicación GPS será enviada a los equipos de emergencia y a los contactos registrados en tu <b>Perfil SOS</b>.
            <button onClick={() => setShowWarning(false)} className="block mt-2 text-red-400 underline mx-auto">Entendido</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes sosPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }
      `}</style>
    </>
  );
}
