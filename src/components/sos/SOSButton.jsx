import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  getOrCreateDeviceId, getGPSPosition, getBatteryLevel,
  sendSOSEvent, sendBeaconUpdate, simulateSMS,
  getSOSActive, setSOSActive, getSystemMode, processOfflineQueue
} from "./sosUtils";

export default function SOSButton({ profile, lang = "es" }) {
  const [isActive, setIsActive] = useState(getSOSActive);
  const [holding, setHolding] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const holdTimer = useRef(null);
  const countdownTimer = useRef(null);
  const beaconTimer = useRef(null);
  const queueTimer = useRef(null);

  // Start/stop beacon based on SOS state
  useEffect(() => {
    if (isActive) {
      startBeacon();
    } else {
      if (beaconTimer.current) clearInterval(beaconTimer.current);
    }
    return () => { if (beaconTimer.current) clearInterval(beaconTimer.current); };
  }, [isActive]);

  // Offline queue processor
  useEffect(() => {
    queueTimer.current = setInterval(processOfflineQueue, 30000);
    return () => clearInterval(queueTimer.current);
  }, []);

  async function startBeacon() {
    const sendBeacon = async () => {
      try {
        const loc = await getGPSPosition();
        const battery = await getBatteryLevel();
        await sendBeaconUpdate({
          device_id: getOrCreateDeviceId(),
          timestamp: new Date().toISOString(),
          latitude: loc.latitude,
          longitude: loc.longitude,
          accuracy: loc.accuracy,
          battery_level: battery,
          mode: getSystemMode(),
        });
      } catch (e) {}
    };
    sendBeacon();
    const getBattInterval = async () => {
      const b = await getBatteryLevel();
      return b !== null && b < 15 ? 300000 : 60000;
    };
    const scheduleBeacon = async () => {
      const interval = await getBattInterval();
      beaconTimer.current = setTimeout(async () => {
        await sendBeacon();
        scheduleBeacon();
      }, interval);
    };
    scheduleBeacon();
  }

  const startHold = useCallback(() => {
    setHolding(true);
    setCountdown(3);
    let count = 3;
    countdownTimer.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownTimer.current);
        triggerAction();
      }
    }, 1000);
  }, [isActive]);

  const cancelHold = useCallback(() => {
    setHolding(false);
    setCountdown(null);
    clearInterval(countdownTimer.current);
    clearTimeout(holdTimer.current);
  }, []);

  async function triggerAction() {
    setHolding(false);
    setCountdown(null);
    if (!isActive) {
      // Activate SOS
      const newActive = true;
      setIsActive(newActive);
      setSOSActive(true);
      try {
        const loc = await getGPSPosition().catch(() => ({ latitude: 0, longitude: 0, accuracy: 0 }));
        const battery = await getBatteryLevel();
        const deviceId = getOrCreateDeviceId();
        const timestamp = new Date().toISOString();
        const mode = getSystemMode();
        const person = {
          name: profile?.name || "",
          age: profile?.age || 0,
          medical_condition: profile?.medical_condition || "",
          people_with_you: profile?.people_with_you || 0,
          trapped: profile?.trapped || false,
        };
        const payload = {
          event_type: "SOS",
          mode,
          timestamp,
          device_id: deviceId,
          battery_level: battery,
          location: loc,
          person,
        };
        await sendSOSEvent(payload);
        simulateSMS(profile?.emergency_contacts || [], person, loc, timestamp, mode);
      } catch (e) {}
    } else {
      // Deactivate SOS
      setIsActive(false);
      setSOSActive(false);
    }
  }

  const color = isActive ? "#00C853" : "#FF3B30";

  return (
    <>
      {/* Screen border glow when active */}
      {isActive && (
        <div
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            boxShadow: "inset 0 0 20px 8px #00C853",
            animation: "sosPulse 2s ease-in-out infinite",
          }}
        />
      )}

      {/* SOS Semicircle button - top center */}
      <div
        className="fixed top-0 left-1/2 z-50"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={(e) => { e.preventDefault(); startHold(); }}
          onTouchEnd={(e) => { e.preventDefault(); cancelHold(); }}
          style={{
            width: 110,
            height: 55,
            borderRadius: "0 0 110px 110px",
            backgroundColor: color,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 6,
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            position: "relative",
            boxShadow: `0 4px 15px ${color}88`,
            animation: "sosPulse 2s ease-in-out infinite",
          }}
        >
          {holding && countdown !== null ? (
            <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{countdown}</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>s</span>
            </div>
          ) : (
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: 2 }}>SOS</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes sosPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px 2px ${color}66; }
          50% { opacity: 0.85; box-shadow: 0 0 20px 8px ${color}99; }
        }
      `}</style>
    </>
  );
}
