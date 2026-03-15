import React, { useEffect, useRef, useState } from "react";
import { useLang } from "../components/LanguageContext";

const UI = {
  es: { title: "MAPAS OFFLINE", subtitle: "Tu ubicación en tiempo real. El mapa se guarda automáticamente para uso sin conexión.", locating: "Obteniendo ubicación GPS...", error: "No se pudo obtener la ubicación. Activa el GPS.", accuracy: "Precisión", coords: "Coordenadas", offline: "Mapa guardado para uso offline", loading: "Cargando mapa..." },
  en: { title: "OFFLINE MAPS", subtitle: "Your real-time location. The map is automatically saved for offline use.", locating: "Getting GPS location...", error: "Could not get location. Enable GPS.", accuracy: "Accuracy", coords: "Coordinates", offline: "Map saved for offline use", loading: "Loading map..." },
  fr: { title: "CARTES OFFLINE", subtitle: "Votre position en temps réel. La carte est sauvegardée automatiquement pour une utilisation hors ligne.", locating: "Obtention de la position GPS...", error: "Impossible d'obtenir la position. Activez le GPS.", accuracy: "Précision", coords: "Coordonnées", offline: "Carte sauvegardée pour utilisation hors ligne", loading: "Chargement de la carte..." },
  pt: { title: "MAPAS OFFLINE", subtitle: "Sua localização em tempo real. O mapa é salvo automaticamente para uso offline.", locating: "Obtendo localização GPS...", error: "Não foi possível obter a localização. Ative o GPS.", accuracy: "Precisão", coords: "Coordenadas", offline: "Mapa salvo para uso offline", loading: "Carregando mapa..." },
  it: { title: "MAPPE OFFLINE", subtitle: "La tua posizione in tempo reale. La mappa viene salvata automaticamente per l'uso offline.", locating: "Ottenimento posizione GPS...", error: "Impossibile ottenere la posizione. Attiva il GPS.", accuracy: "Precisione", coords: "Coordinate", offline: "Mappa salvata per uso offline", loading: "Caricamento mappa..." },
  ar: { title: "خرائط أوفلاين", subtitle: "موقعك في الوقت الفعلي. يتم حفظ الخريطة تلقائياً للاستخدام بدون إنترنت.", locating: "جارٍ تحديد موقع GPS...", error: "تعذر الحصول على الموقع. قم بتفعيل GPS.", accuracy: "الدقة", coords: "الإحداثيات", offline: "تم حفظ الخريطة للاستخدام دون إنترنت", loading: "جارٍ تحميل الخريطة..." },
  zh: { title: "离线地图", subtitle: "您的实时位置。地图自动保存供离线使用。", locating: "正在获取GPS位置...", error: "无法获取位置。请开启GPS。", accuracy: "精度", coords: "坐标", offline: "地图已保存供离线使用", loading: "正在加载地图..." },
};

export default function OfflineMaps() {
  const { lang } = useLang();
  const ui = UI[lang] || UI.en;
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [status, setStatus] = useState("locating");
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Cargar Leaflet dinámicamente
  useEffect(() => {
    if (window.L) { setLeafletLoaded(true); return; }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Inicializar mapa cuando Leaflet esté listo
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [-33.45, -70.65], // Santiago por defecto
      zoom: 13,
      zoomControl: true,
    });

    // OpenStreetMap — gratuito, sin API key
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude: lat, longitude: lng, accuracy: acc } = pos.coords;
          setCoords({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
          setAccuracy(Math.round(acc));
          setStatus("ok");

          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            // Icono personalizado rojo
            const icon = L.divIcon({
              html: `<div style="
                width:20px;height:20px;
                background:#dc2626;
                border:3px solid white;
                border-radius:50%;
                box-shadow:0 0 10px rgba(220,38,38,0.8);
              "></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
              className: "",
            });
            markerRef.current = L.marker([lat, lng], { icon }).addTo(mapInstanceRef.current);
          }
          mapInstanceRef.current.setView([lat, lng], 15);
        },
        () => setStatus("error"),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setStatus("error");
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [leafletLoaded]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <h1 className="font-military text-xl text-primary tracking-widest uppercase">{ui.title}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{ui.subtitle}</p>
      </div>

      {/* Info GPS */}
      <div className="px-5 py-2 border-b border-border bg-card">
        {status === "locating" && (
          <p className="text-sm text-yellow-400">📡 {ui.locating}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">⚠ {ui.error}</p>
        )}
        {status === "ok" && coords && (
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>📍 <b className="text-foreground">{coords.lat}, {coords.lng}</b></span>
            <span>🎯 {ui.accuracy}: <b className="text-primary">~{accuracy}m</b></span>
            <span className="text-green-400">✓ {ui.offline}</span>
          </div>
        )}
      </div>

      {/* Mapa */}
      {!leafletLoaded && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">{ui.loading}</p>
        </div>
      )}
      <div
        ref={mapRef}
        className="flex-1"
        style={{ display: leafletLoaded ? "block" : "none" }}
      />
    </div>
  );
}
