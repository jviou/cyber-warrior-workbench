export const API = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!r.ok) throw new Error(`${init?.method ?? 'GET'} ${path} -> ${r.status}`);
  return r.json() as Promise<T>;
}

export type Action = {
  id?: number | string;
  title: string;
  description?: string;
  owner?: string;
  priority?: 'low' | 'med' | 'high';
  status?: 'todo' | 'doing' | 'done';
  dueAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Journal = {
  id?: number | string;
  kind: string;              // action|decision|comm|inject|note
  at?: string;               // ISO
  summary: string;
  details?: string;
  actionId?: number | string;
};

export const Actions = {
  list: () => http<Action[]>('/actions?_sort=createdAt&_order=desc'),
  create: (a: Action) =>
    http<Action>('/actions', {
      method: 'POST',
      body: JSON.stringify({ createdAt: new Date().toISOString(), status: 'todo', ...a }),
    }),
  update: (id: number | string, patch: Partial<Action>) =>
    http<Action>(`/actions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ updatedAt: new Date().toISOString(), ...patch }),
    }),
  remove: (id: number | string) => http<void>(`/actions/${id}`, { method: 'DELETE' }),
};

export const JournalApi = {
  list: () => http<Journal[]>('/journal?_sort=at&_order=desc'),
  add: (e: Journal) =>
    http<Journal>('/journal', {
      method: 'POST',
      body: JSON.stringify({ at: new Date().toISOString(), ...e }),
    }),
};

// trace légère côté backend JSON
export async function audit(entity: string, op: 'create'|'update'|'delete', before?: unknown, after?: unknown, actor = 'ui') {
  try {
    await http('/audit', {
      method: 'POST',
      body: JSON.stringify({ entity, op, before, after, ts: new Date().toISOString(), actor }),
    });
  } catch {}
}
