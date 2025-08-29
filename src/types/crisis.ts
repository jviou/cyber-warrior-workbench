// Crisis Management Data Types

export type Role = 
  | 'IncidentManager'
  | 'RSSI'
  | 'ITOps'
  | 'Comms'
  | 'Legal'
  | 'DPO'
  | 'Exec'
  | string;

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export type PhaseId = 'P1' | 'P2' | 'P3' | 'P4';

export interface Phase {
  id: PhaseId;
  title: string;
  checklist: ChecklistItem[];
  notes: string;
  injects: Inject[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  owner?: Role;
  dueAt?: string; // ISO
  status: 'todo' | 'doing' | 'done' | 'n/a';
  evidence?: string[]; // file handles
}

export interface Inject {
  id: string;
  title: string;
  description?: string;
  plannedAt?: string; // ISO
  releasedAt?: string; // ISO when triggered
  attachments?: string[];
  phaseId?: PhaseId;
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  owner?: Role;
  priority: 'low' | 'med' | 'high';
  status: 'todo' | 'doing' | 'done';
  dueAt?: string;
  createdAt: string;
  relatedInjectId?: string;
}

export interface Decision {
  id: string;
  question: string;
  optionChosen: string;
  rationale?: string;
  validator?: Role;
  decidedAt: string;
  impacts?: string[];
}

export interface Communication {
  id: string;
  audience: 'Interne' | 'Direction' | 'DPO' | 'CERT' | 'Partenaires' | string;
  subject: string;
  message: string;
  author?: Role;
  approvedBy?: Role;
  sentAt?: string;
}

export interface JournalEvent {
  id: string;
  kind: 'action' | 'decision' | 'comm' | 'inject' | 'note';
  refId?: string;
  at: string;
  summary: string;
  details?: string;
}

export interface CrisisExercise {
  id: string;
  title: string;
  description: string;
  startedAt?: string;
  severity: SeverityLevel;
  objectives: string[];
  rules: string[];
  keyContacts: { role: string; name: string; contact: string }[];
  phases: Phase[];
  actions: ActionItem[];
  decisions: Decision[];
  communications: Communication[];
  journal: JournalEvent[];
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'link' | 'document' | 'note';
  url?: string;
  content?: string;
  addedAt: string;
}

export interface TimerState {
  isRunning: boolean;
  startTime?: number;
  pausedDuration: number;
  currentTime: number;
}