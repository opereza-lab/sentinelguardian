import React, { useState, useEffect } from "react";
import { db, auth } from "@/api/base44Client";
import { sosI18n, getOrCreateDeviceId, getSystemMode, setSystemMode } from "../components/sos/sosUtils";
import { useLang } from "../components/LanguageContext";
import { User, Phone, Plus, Trash2, Save, Shield } from "lucide-react";

export default function EmergencyProfile() {
  const { lang } = useLang();
  const t = sosI18n[lang] || sosI18n.es;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", age: "", medical_condition: "", people_with_you: 0,
    trapped: false, sos_role: "user", emergency_contacts: [],
  });
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [mode, setMode] = useState(getSystemMode());

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    const user = await auth.me();
    const profiles = await db.UserProfile.filter({ created_by: user.email });
    if (profiles.length > 0) {
      const p = profiles[0];
      setProfile(p);
      setForm({
        name: p.name || "",
        age: p.age || "",
        medical_condition: p.medical_condition || "",
        people_with_you: p.people_with_you || 0,
        trapped: p.trapped || false,
        sos_role: p.sos_role || "user",
        emergency_contacts: p.emergency_contacts || [],
      });
      // Cachear contactos para acceso offline desde SOS
      try {
        localStorage.setItem("sg_emergency_contacts", JSON.stringify(p.emergency_contacts || []));
      } catch {}
    } else {
      const deviceId = getOrCreateDeviceId();
      const created = await db.UserProfile.create({ device_id: deviceId, sos_role: "user" });
      setProfile(created);
    }
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    const deviceId = getOrCreateDeviceId();
    const data = { ...form, age: parseInt(form.age) || 0, device_id: deviceId };
    if (profile?.id) {
      await db.UserProfile.update(profile.id, data);
    } else {
      const created = await db.UserProfile.create(data);
      setProfile(created);
    }
    // Cachear contactos de emergencia en localStorage para acceso offline desde SOS
    try {
      localStorage.setItem("sg_emergency_contacts", JSON.stringify(form.emergency_contacts || []));
    } catch {}
    setSaving(false);
  }

  function addContact() {
    if (!newContact.name || !newContact.phone) return;
    setForm(f => ({ ...f, emergency_contacts: [...(f.emergency_contacts || []), newContact] }));
    setNewContact({ name: "", phone: "" });
  }

  function removeContact(i) {
    setForm(f => ({ ...f, emergency_contacts: f.emergency_contacts.filter((_, idx) => idx !== i) }));
  }

  function toggleMode() {
    const next = mode === "test" ? "real" : "test";
    setMode(next);
    setSystemMode(next);
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-muted-foreground">...</div>;

  return (
    <div className="max-w-lg mx-auto px-4 py-8 pt-16">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-primary" />
        <h1 className="font-military text-2xl text-foreground tracking-widest">{t.profile.toUpperCase()}</h1>
      </div>

      {/* Role selector */}
      <div className="mb-6 p-4 bg-card border border-border rounded">
        <div className="text-xs text-muted-foreground tracking-widest uppercase mb-3">ROL SOS</div>
        <div className="flex gap-2">
          {["user", "rescuer", "both"].map(r => (
            <button
              key={r}
              onClick={() => setForm(f => ({ ...f, sos_role: r }))}
              className={`flex-1 py-2 rounded text-xs font-bold uppercase tracking-wide transition-all ${form.sos_role === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
            >
              {r === "user" ? "Usuario" : r === "rescuer" ? "Rescatista" : "Ambos"}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">{t.name}</label>
          <input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground"
            placeholder={t.name}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">{t.age}</label>
          <input
            type="number"
            value={form.age}
            onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground"
            placeholder="0"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">{t.medicalCondition}</label>
          <input
            value={form.medical_condition}
            onChange={e => setForm(f => ({ ...f, medical_condition: e.target.value }))}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground"
            placeholder="ninguna"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">{t.peopleWithYou}</label>
          <input
            type="number"
            value={form.people_with_you}
            onChange={e => setForm(f => ({ ...f, people_with_you: parseInt(e.target.value) || 0 }))}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-muted-foreground uppercase tracking-widest">{t.trapped}</label>
          <button
            onClick={() => setForm(f => ({ ...f, trapped: !f.trapped }))}
            className={`px-4 py-1.5 rounded text-xs font-bold ${form.trapped ? "bg-red-500 text-white" : "bg-secondary text-muted-foreground"}`}
          >
            {form.trapped ? t.yes : t.no}
          </button>
        </div>
      </div>

      {/* Emergency contacts */}
      <div className="mb-6 p-4 bg-card border border-border rounded">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground uppercase tracking-widest">{t.emergencyContacts}</span>
        </div>
        {(form.emergency_contacts || []).map((c, i) => (
          <div key={i} className="flex items-center justify-between mb-2 p-2 bg-secondary rounded">
            <div>
              <div className="text-sm text-foreground">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.phone}</div>
            </div>
            <button onClick={() => removeContact(i)} className="text-red-400 hover:text-red-300">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            value={newContact.name}
            onChange={e => setNewContact(n => ({ ...n, name: e.target.value }))}
            placeholder={t.contactName}
            className="flex-1 bg-secondary border border-border rounded px-2 py-1.5 text-xs text-foreground"
          />
          <input
            value={newContact.phone}
            onChange={e => setNewContact(n => ({ ...n, phone: e.target.value }))}
            placeholder={t.contactPhone}
            className="flex-1 bg-secondary border border-border rounded px-2 py-1.5 text-xs text-foreground"
            type="tel"
          />
          <button onClick={addContact} className="bg-primary text-primary-foreground rounded px-2 py-1.5">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="mb-6 p-4 bg-card border border-border rounded flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-foreground uppercase tracking-widest">{mode === "test" ? t.testMode : t.realMode}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{mode === "test" ? "Los SOS no se enviarán como reales" : "⚠️ SOS reales activados"}</div>
        </div>
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded text-xs font-bold uppercase transition-all ${mode === "test" ? "bg-yellow-500 text-black" : "bg-green-600 text-white"}`}
        >
          {mode === "test" ? "TEST" : "REAL"}
        </button>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-primary text-primary-foreground py-3 rounded font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {saving ? t.sending : t.save}
      </button>
    </div>
  );
}
