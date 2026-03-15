// Reemplaza base44.entities con almacenamiento local (localStorage)
// Para migrar a Supabase en el futuro, solo cambiar este archivo

const PREFIX = 'sg_';

function getAll(table) {
  try { return JSON.parse(localStorage.getItem(PREFIX + table) || '[]'); }
  catch { return []; }
}

function saveAll(table, data) {
  localStorage.setItem(PREFIX + table, JSON.stringify(data));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const db = {
  SosEvent: {
    create: (data) => {
      const record = { ...data, id: genId(), created_date: new Date().toISOString() };
      const all = getAll('SosEvent'); all.push(record); saveAll('SosEvent', all);
      return Promise.resolve(record);
    },
    filter: (filters) => {
      const all = getAll('SosEvent');
      return Promise.resolve(all.filter(r => Object.entries(filters).every(([k, v]) => r[k] === v)));
    },
    list: (sort, limit) => {
      const all = getAll('SosEvent');
      return Promise.resolve(all.slice(0, limit || all.length));
    },
    update: (id, data) => {
      const all = getAll('SosEvent');
      const idx = all.findIndex(r => r.id === id);
      if (idx >= 0) { all[idx] = { ...all[idx], ...data }; saveAll('SosEvent', all); return Promise.resolve(all[idx]); }
      return Promise.resolve(null);
    },
    delete: (id) => {
      saveAll('SosEvent', getAll('SosEvent').filter(r => r.id !== id));
      return Promise.resolve(true);
    },
    subscribe: () => {
      return () => {};
    },
  },
  BeaconUpdate: {
    create: (data) => {
      const record = { ...data, id: genId(), created_date: new Date().toISOString() };
      const all = getAll('BeaconUpdate'); all.push(record); saveAll('BeaconUpdate', all);
      return Promise.resolve(record);
    },
    filter: (filters) => {
      const all = getAll('BeaconUpdate');
      return Promise.resolve(all.filter(r => Object.entries(filters).every(([k, v]) => r[k] === v)));
    },
    delete: (id) => {
      saveAll('BeaconUpdate', getAll('BeaconUpdate').filter(r => r.id !== id));
      return Promise.resolve(true);
    },
  },
  UserProfile: {
    create: (data) => {
      const record = { ...data, id: genId(), created_date: new Date().toISOString() };
      const all = getAll('UserProfile'); all.push(record); saveAll('UserProfile', all);
      return Promise.resolve(record);
    },
    filter: () => Promise.resolve(getAll('UserProfile')),
    update: (id, data) => {
      const all = getAll('UserProfile');
      const idx = all.findIndex(r => r.id === id);
      if (idx >= 0) { all[idx] = { ...all[idx], ...data }; saveAll('UserProfile', all); return Promise.resolve(all[idx]); }
      return Promise.resolve(null);
    },
  },
};

export const auth = {
  me: () => Promise.resolve({ email: 'user@local.com', role: 'admin' }),
  logout: () => {},
  redirectToLogin: () => {},
};
