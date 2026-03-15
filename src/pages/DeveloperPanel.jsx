import React, { useState, useEffect } from "react";
import { db, auth } from "@/api/base44Client";
import { getSystemMode, setSystemMode } from "../components/sos/sosUtils";
import { Terminal, Zap, Trash2, ToggleLeft, ToggleRight, Shield, AlertTriangle } from "lucide-react";

async function simulateSOSLoad(count, intervalMs, onProgress) {
  for (let i = 0; i < count; i++) {
    const lat = (Math.random() * 140 - 70).toFixed(6);
    const lng = (Math.random() * 360 - 180).toFixed(6);
    await db.SosEvent.create({
      timestamp: new Date().toISOString(),
      device_id: `simulated_device_${String(i).padStart(4, "0")}`,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      accuracy: Math.round(Math.random() * 50 + 5),
      battery_level: Math.round(Math.random() * 100),
      name: "Simulated User",
      age: 35,
      medical_condition: "none",
      people_with_you: 2,
      trapped: false,
      status: "pending",
      mode: "test",
    });
    onProgress(i + 1);
    if (intervalMs > 0) await new Promise(r => setTimeout(r, intervalMs));
  }
}

export default function DeveloperPanel() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(getSystemMode());
  const [stressCount, setStressCount] = useState(100);
  const [stressInterval, setStressInterval] = useState(100);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState([]);
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => {
    auth.me().then(u => setUser(u));
  }, []);

  function addLog(msg) {
    setLog(l => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...l.slice(0, 49)]);
  }

  function toggleMode() {
    const next = mode === "test" ? "real" : "test";
    setMode(next);
    setSystemMode(next);
    addLog(`Modo cambiado a: ${next.toUpperCase()}`);
  }

  async function runStressTest() {
    setRunning(true);
    setProgress(0);
    addLog(`Iniciando stress test: ${stressCount} eventos, intervalo ${stressInterval}ms`);
    await simulateSOSLoad(stressCount, stressInterval, (n) => {
      setProgress(n);
      if (n % 10 === 0) addLog(`Progreso: ${n}/${stressCount}`);
    });
    addLog(`✅ Stress test completado: ${stressCount} eventos creados`);
    setRunning(false);
  }

  async function cleanTestData() {
    setCleaning(true);
    addLog("Limpiando datos de prueba...");
    const testEvents = await db.SosEvent.filter({ mode: "test" });
    let deleted = 0;
    for (const e of testEvents) {
      await db.SosEvent.delete(e.id);
      deleted++;
    }
    const testBeacons = await db.BeaconUpdate.filter({ mode: "test" });
    for (const b of testBeacons) {
      await db.BeaconUpdate.delete(b.id);
      deleted++;
    }
    addLog(`✅ Eliminados ${deleted} registros de prueba`);
    setCleaning(false);
  }

  if (!user) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center px-8">
        <Shield className="w-12 h-12 text-muted-foreground" />
        <div className="text-muted-foreground text-sm">Acceso restringido a administradores.</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pt-16">
      <div className="flex items-center gap-2 mb-6">
        <Terminal className="w-5 h-5 text-primary" />
        <h1 className="font-military text-2xl text-foreground tracking-widest">PANEL DEVELOPER</h1>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono">ADMIN</span>
      </div>

      {/* Mode toggle */}
      <div className="p-5 bg-card border border-border rounded mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-foreground text-sm uppercase tracking-wide">MODO DEL SISTEMA</div>
            <div className={`text-lg font-black tracking-widest mt-1 ${mode === "test" ? "text-yellow-400" : "text-green-400"}`}>
              {mode === "test" ? "🟡 TEST" : "🟢 REAL"}
            </div>
            {mode === "real" && (
              <div className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Los SOS enviados serán alertas reales
              </div>
            )}
          </div>
          <button
            onClick={toggleMode}
            className={`px-5 py-2.5 rounded font-bold uppercase text-sm tracking-wide transition-all ${mode === "test" ? "bg-green-600 text-white hover:bg-green-500" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
          >
            {mode === "test" ? "Activar modo REAL" : "Activar modo TEST"}
          </button>
        </div>
      </div>

      {/* Stress test */}
      <div className="p-5 bg-card border border-border rounded mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-yellow-400" />
          <div className="font-bold text-foreground text-sm uppercase tracking-wide">STRESS TEST</div>
        </div>
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Eventos</label>
            <input
              type="number"
              value={stressCount}
              onChange={e => setStressCount(parseInt(e.target.value) || 0)}
              className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground"
              min={1} max={5000}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Intervalo (ms)</label>
            <input
              type="number"
              value={stressInterval}
              onChange={e => setStressInterval(parseInt(e.target.value) || 0)}
              className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground"
              min={0}
            />
          </div>
        </div>
        {running && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progreso</span><span>{progress}/{stressCount}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${(progress / stressCount) * 100}%` }}
              />
            </div>
          </div>
        )}
        <button
          onClick={runStressTest}
          disabled={running}
          className="w-full bg-yellow-500 text-black py-2.5 rounded font-bold uppercase tracking-widest text-sm disabled:opacity-50"
        >
          {running ? `Ejecutando... ${progress}/${stressCount}` : "▶ Ejecutar Stress Test"}
        </button>
      </div>

      {/* Clean test data */}
      <div className="p-5 bg-card border border-border rounded mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-400" />
            <div>
              <div className="font-bold text-foreground text-sm uppercase tracking-wide">LIMPIAR DATOS DE PRUEBA</div>
              <div className="text-xs text-muted-foreground">Elimina todos los registros con mode = "test"</div>
            </div>
          </div>
          <button
            onClick={cleanTestData}
            disabled={cleaning}
            className="bg-red-600 text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wide hover:bg-red-500 disabled:opacity-50"
          >
            {cleaning ? "Limpiando..." : "Limpiar"}
          </button>
        </div>
      </div>

      {/* Console log */}
      <div className="p-4 bg-black/60 border border-border rounded font-mono">
        <div className="text-xs text-green-400 font-bold mb-2 tracking-widest">CONSOLE LOG</div>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {log.length === 0 && <div className="text-xs text-muted-foreground">Sin actividad.</div>}
          {log.map((l, i) => (
            <div key={i} className="text-xs text-green-300 font-mono leading-relaxed">{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
