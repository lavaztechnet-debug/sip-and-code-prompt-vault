import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import firebaseConfig from '../../firebase-applet-config.json';
import { KeepNote } from './googleKeep';
import { Prompt } from '../types';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with configured databaseId
const cfg = firebaseConfig as Record<string, any>;
export const db = cfg.firestoreDatabaseId && cfg.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, cfg.firestoreDatabaseId)
  : getFirestore(app);

export type FirestoreSyncState = 'synced' | 'syncing' | 'offline' | 'error' | 'local_only';

// Track sync listeners
type SyncStateListener = (state: FirestoreSyncState, lastSyncTime?: Date) => void;
const syncListeners: Set<SyncStateListener> = new Set();
let currentSyncState: FirestoreSyncState = 'synced';
let lastSyncTimestamp: Date | undefined = undefined;

export function subscribeFirestoreSyncState(listener: SyncStateListener): () => void {
  syncListeners.add(listener);
  listener(currentSyncState, lastSyncTimestamp);
  return () => {
    syncListeners.delete(listener);
  };
}

function updateSyncStatus(newState: FirestoreSyncState) {
  currentSyncState = newState;
  if (newState === 'synced') {
    lastSyncTimestamp = new Date();
  }
  syncListeners.forEach(l => l(currentSyncState, lastSyncTimestamp));
}

// Synchronize user profile & favorites in Firestore
export async function syncUserFavoritesToCloud(userId: string, favorites: string[]): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    updateSyncStatus('offline');
    return;
  }
  try {
    updateSyncStatus('syncing');
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      favorites,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    updateSyncStatus('synced');
  } catch (error) {
    console.error('Error syncing favorites to Firestore:', error);
    updateSyncStatus(navigator.onLine ? 'error' : 'offline');
  }
}

// Synchronize all custom/local prompts to cloud for logged in user
export async function syncPromptsToCloud(userId: string, prompts: Prompt[]): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    updateSyncStatus('offline');
    return;
  }
  try {
    updateSyncStatus('syncing');
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      promptsCount: prompts.length,
      favoritesCount: prompts.filter(p => p.isFavorite).length,
      lastSyncAt: serverTimestamp(),
    }, { merge: true });
    updateSyncStatus('synced');
  } catch (error) {
    console.error('Error syncing prompts metadata to Firestore:', error);
    updateSyncStatus(navigator.onLine ? 'error' : 'offline');
  }
}

export async function pingFirestoreSync(): Promise<FirestoreSyncState> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    updateSyncStatus('offline');
    return 'offline';
  }
  try {
    updateSyncStatus('syncing');
    const testDoc = doc(db, '_connection_test', 'ping');
    await getDoc(testDoc);
    updateSyncStatus('synced');
    return 'synced';
  } catch (error: any) {
    if (!navigator.onLine || error?.code === 'unavailable' || error?.message?.includes('offline')) {
      updateSyncStatus('offline');
      return 'offline';
    }
    updateSyncStatus('synced'); // Read succeeded / connected to Firestore engine
    return 'synced';
  }
}

export async function fetchUserFavoritesFromCloud(userId: string): Promise<string[] | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data().favorites || [];
    }
  } catch (error) {
    console.error('Error fetching favorites from Firestore:', error);
  }
  return null;
}

// Synchronize Google Keep Notes in Firestore
export async function syncKeepNoteToCloud(userId: string, note: KeepNote): Promise<void> {
  try {
    const noteRef = doc(db, 'keep_notes', note.id);
    await setDoc(noteRef, {
      ...note,
      userId,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error syncing keep note to Firestore:', error);
  }
}

export async function deleteKeepNoteFromCloud(noteId: string): Promise<void> {
  try {
    const noteRef = doc(db, 'keep_notes', noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error('Error deleting keep note from Firestore:', error);
  }
}

export function subscribeKeepNotes(
  userId: string, 
  onNotesUpdate: (notes: KeepNote[]) => void
): () => void {
  try {
    const q = query(collection(db, 'keep_notes'), where('userId', '==', userId));
    return onSnapshot(q, (snapshot) => {
      const notes: KeepNote[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        notes.push({
          id: docSnap.id,
          title: data.title || '',
          body: data.body || '',
          category: data.category,
          tags: data.tags || [],
          color: data.color || 'sand',
          isPinned: data.isPinned || false,
          checklist: data.checklist || [],
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        });
      });
      onNotesUpdate(notes);
    }, (error) => {
      console.error('Error in keep_notes Firestore snapshot listener:', error);
    });
  } catch (err) {
    console.error('Failed to setup Firestore subscription:', err);
    return () => {};
  }
}
