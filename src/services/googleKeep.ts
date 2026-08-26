import { syncKeepNoteToCloud, deleteKeepNoteFromCloud } from './firestore';
import { getCurrentUser } from './googleAuth';

export interface KeepNote {
  id: string;
  title: string;
  body: string;
  category?: string;
  tags: string[];
  color: 'default' | 'amber' | 'lavender' | 'sand' | 'teal' | 'rose';
  isPinned?: boolean;
  checklist?: { id: string; text: string; done: boolean }[];
  updatedAt: string;
}

const STORAGE_KEY = 'prompt_vault_keep_notes';

const INITIAL_KEEP_NOTES: KeepNote[] = [
  {
    id: 'keep-1',
    title: '🧠 Prompt Architecture Checklist',
    body: 'Essential parameters for high-converting agent prompts: 1. Role framing 2. Chain-of-thought instructions 3. Strict output boundaries 4. Zero-shot guardrails.',
    category: 'Prompt Engineering',
    tags: ['ai-guidelines', 'prompting', 'keep'],
    color: 'sand',
    isPinned: true,
    checklist: [
      { id: 'c1', text: 'Define exact output JSON schema', done: true },
      { id: 'c2', text: 'Set temperature to 0.2 for deterministic code', done: true },
      { id: 'c3', text: 'Inject few-shot examples', done: false },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'keep-2',
    title: '⚡ Termux Build Script Snippet',
    body: 'Run command: pkg update && pkg install nodejs git -y && npm run dev --host 0.0.0.0',
    category: 'Android System',
    tags: ['termux', 'cli', 'android'],
    color: 'amber',
    isPinned: false,
    updatedAt: new Date().toISOString(),
  }
];

export function getKeepNotes(): KeepNote[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load Keep notes:', e);
  }
  return INITIAL_KEEP_NOTES;
}

export function saveKeepNotes(notes: KeepNote[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function createKeepNote(note: Partial<Omit<KeepNote, 'id' | 'updatedAt'>> & { title: string; body: string }): KeepNote {
  const notes = getKeepNotes();
  const newNote: KeepNote = {
    category: 'General',
    tags: [],
    color: 'sand',
    isPinned: false,
    ...note,
    id: `keep-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    updatedAt: new Date().toISOString(),
  };
  const updated = [newNote, ...notes];
  saveKeepNotes(updated);
  
  const user = getCurrentUser();
  if (user) {
    syncKeepNoteToCloud(user.uid, newNote);
  }

  return newNote;
}

export function updateKeepNote(updatedNote: KeepNote): void {
  const notes = getKeepNotes();
  const updated = notes.map(n => n.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : n);
  saveKeepNotes(updated);

  const user = getCurrentUser();
  if (user) {
    syncKeepNoteToCloud(user.uid, updatedNote);
  }
}

export function deleteKeepNote(id: string): void {
  const notes = getKeepNotes();
  const updated = notes.filter(n => n.id !== id);
  saveKeepNotes(updated);

  deleteKeepNoteFromCloud(id);
}

export function exportToGoogleKeepWeb(title: string, body: string): void {
  // Google Keep web note creation deep link or clipboard + keep.google.com
  const keepUrl = `https://keep.google.com/#create?title=${encodeURIComponent(title)}&text=${encodeURIComponent(body)}`;
  if (typeof window !== 'undefined') {
    window.open(keepUrl, '_blank', 'noopener,noreferrer');
  }
}
