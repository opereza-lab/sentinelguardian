import React, { useState, useEffect } from "react";
import { db } from "@/api/base44Client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { AlertTriangle, RefreshCw, Users, MapPin, Battery, Clock } from "lucide-react";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createSOSIcon(mode) {
  const color = mode === "test" ? "#FFD600" : "#FF3B30";
  return L.divIcon({
    html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 0 8px ${color}99;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:#000;">SOS</div>`,
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

const STATUS_LABELS = { pending: "Pendiente", rescue_assigned: "Rescate asignado", rescued: "Rescatado" };
const STATUS_COLORS = { pending: "text-red-400", rescue_assigned: "text-yellow-400", rescued: "text-green-400" };

function EventCard({ event, onStatusChange }) {
  return (
    <div className={`p-3 bg-card border rounded mb-2 ${event.mode === "test" ? "border-yellow-500/40" : "border-red-500/30"}`}>
      {event.mode === "test" && (
        <div className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded mb-2 inline-block">TEST EVENT</div>
      )}
      <div className="font-bold text-sm text-foreground">{event.name || "Desconocido"}</div>
      <div className="text-xs text-muted-foreground">
        Edad: {event.age || "?"} · {event.medical_condition || "Sin condición"}
      </div>
      <div className="text-xs text-muted-foreground">
        Personas: {event.people_with_you || 0} · Atrapado: {event.trapped ? "SÍ 🚨" : "No"}
      </div>
      {event.latitude && event.longitude && (
        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3" />
          {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
        </div>
      )}
      {event.battery_level && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Battery className="w-3 h-3" /> {event.battery_level}%
        </div>
      )}
      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" />
        {new Date(event.timestamp || event.created_date).toLocaleTimeString()}
      </div>
      <div className={`text-xs font-bold mt-1 ${STATUS_COLORS[event.status]}`}>{STATUS_LABELS[event.status]}</div>
      <div className="flex gap-1 mt-2 flex-wrap">
        {["pending", "rescue_assigned", "rescued"].map(s => (
          <button
            key={s}
            onClick={() => onStatusChange(event.id, s)}
            className={`text-[10px] px-2 py-0.5 rounded border transition-all ${event.status === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RescueDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadEvents();
    const unsub = db.SosEvent.subscribe((ev) => {
      if (ev.type === "create") setEvents(prev => [ev.data, ...prev]);
      else if (ev.type === "update") setEvents(prev => prev.map(e => e.id === ev.id ? ev.data : e));
      else if (ev.type === "delete") setEvents(prev => prev.filter(e => e.id !== ev.id));
    });
    return unsub;
  }, []);

  async function loadEvents() {
    setLoading(true);
    const data = await db.SosEvent.list("-created_date", 500);
    setEvents(data);
    setLoading(false);
  }

  async function changeStatus(id, status) {
    await db.SosEvent.update(id, { status });
  }

  const filtered = events.filter(e => {
    if (filter === "pending") return e.status === "pending";
    if (filter === "real") return e.mode === "real";
    if (filter === "test") return e.mode === "test";
    return true;
  });

  const mapCenter = filtered.length > 0 && filtered[0].latitude
    ? [filtered[0].latitude, filtered[0].longitude]
    : [40.4168, -3.7038];

  return (
    <div className="h-screen flex flex-col pt-14 bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="font-military text-lg text-foreground tracking-widest">DASHBOARD RESCATE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{events.length} eventos</span>
          <button onClick={loadEvents} className="text-muted-foreground hover:text-primary transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-border bg-card">
        {["all", "pending", "real", "test"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide transition-all ${filter === f ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
          >
            {f === "all" ? "Todos" : f === "pending" ? "Activos" : f === "real" ? "Reales" : "Test"}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          {loading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Cargando...</div>
          ) : (
            <MapContainer center={mapCenter} zoom={5} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filtered.filter(e => e.latitude && e.longitude).map(e => (
                <Marker
                  key={e.id}
                  position={[e.latitude, e.longitude]}
                  icon={createSOSIcon(e.mode)}
                  eventHandlers={{ click: () => setSelected(e) }}
                >
                  <Popup>
                    <div style={{ minWidth: 160 }}>
                      {e.mode === "test" && <div style={{ color: "#FFD600", fontWeight: 700, fontSize: 10 }}>⚠ TEST EVENT</div>}
                      <div style={{ fontWeight: 700 }}>{e.name || "Desconocido"}</div>
                      <div style={{ fontSize: 12 }}>Edad: {e.age} | {e.medical_condition || "-"}</div>
                      <div style={{ fontSize: 12 }}>Personas: {e.people_with_you} | Atrapado: {e.trapped ? "SÍ" : "No"}</div>
                      <div style={{ fontSize: 11, color: "#aaa" }}>{STATUS_LABELS[e.status]}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        <div className="w-64 overflow-y-auto bg-background border-l border-border p-2 hidden md:block">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground uppercase tracking-widest">Víctimas ({filtered.length})</span>
          </div>
          {filtered.map(e => (
            <EventCard key={e.id} event={e} onStatusChange={changeStatus} />
          ))}
        </div>
      </div>

      <div className="md:hidden overflow-y-auto max-h-48 border-t border-border p-2 bg-background">
        <div className="text-xs font-bold text-muted-foreground mb-2 px-1 uppercase tracking-widest">Víctimas ({filtered.length})</div>
        {filtered.slice(0, 20).map(e => (
          <EventCard key={e.id} event={e} onStatusChange={changeStatus} />
        ))}
      </div>
    </div>
  );
}
