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

export type CrisisMode = 'exercise' | 'real';

export type PhaseId = string;

export interface Phase {
  id: PhaseId;
  title: string;
  checklist: ChecklistItem[];
  notes: string;
  injects: Inject[];
  order: number;
  customizable?: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'strategic' | 'operational';
  owner?: Role;
  assignedUser?: string;
  dueAt?: string;
  status: 'todo' | 'doing' | 'done' | 'n/a';
  evidence?: string[];
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  url?: string;
  uploadedAt: string;
}

export interface Inject {
  id: string;
  title: string;
  description?: string;
  plannedAt?: string;
  releasedAt?: string;
  attachments?: string[];
  phaseId?: PhaseId;
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  owner?: Role;
  assignedUser?: string;
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
  audience: 'Direction' | 'DPO' | 'ANSSI' | 'CERT' | 'CNIL' | 'Partenaires' | 'Collaborateurs' | string;
  subject: string;
  message: string;
  author?: Role;
  approvedBy?: Role;
  sentAt?: string;
  template?: boolean;
}

export interface JournalEvent {
  id: string;
  kind: 'action' | 'decision' | 'comm' | 'inject' | 'note' | 'incident' | 'technical' | 'legal';
  refId?: string;
  at: string;
  summary: string;
  details?: string;
  attachments?: FileAttachment[];
  author?: Role | string;
  category?: 'technical' | 'legal' | 'communication' | 'direction' | 'general';
  severity?: SeverityLevel;
}

export interface CrisisExercise {
  id: string;
  title: string;
  description: string;
  mode: CrisisMode;
  startedAt?: string;
  endedAt?: string;
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
  users: CrisisUser[];
  settings: CrisisSettings;
}

export interface CrisisUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  lastSeen?: string;
}

export interface CrisisSettings {
  encryptData: boolean;
  autoSave: boolean;
  notificationsEnabled: boolean;
  timezone: string;
  customPhases: boolean;
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