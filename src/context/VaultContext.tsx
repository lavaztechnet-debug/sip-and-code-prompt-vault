import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Prompt, ScreenName, VariableProfile, TermuxBridgeConfig, ThemeStyle, ThemeColors } from '../types';
import { initialPrompts } from '../data/initialPrompts';
import { getCurrentUser } from '../services/googleAuth';
import { 
  syncUserFavoritesToCloud, 
  syncPromptsToCloud, 
  subscribeFirestoreSyncState, 
  pingFirestoreSync,
  FirestoreSyncState 
} from '../services/firestore';
import { 
  getVariableProfiles, 
  saveVariableProfiles, 
  getActiveProfileId, 
  setActiveProfileId as persistActiveProfileId,
  createVariableProfile,
  updateVariableProfile as persistUpdateProfile,
  deleteVariableProfile as persistDeleteProfile
} from '../services/variableProfiles';
import {
  getTermuxBridgeConfig,
  saveTermuxBridgeConfig,
  getOpenRouterApiKey,
  saveOpenRouterApiKey,
  DEFAULT_TERMUX_CONFIG
} from '../services/aiRunner';
import { AVAILABLE_THEMES, DEFAULT_THEME_ID } from '../data/themes';
import { 
  getStoredThemeId, 
  getThemeById, 
  applyThemeToDOM, 
  saveActiveThemeId 
} from '../services/themeManager';

interface VaultContextType {
  prompts: Prompt[];
  addPrompt: (prompt: Prompt) => void;
  updatePrompt: (prompt: Prompt) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  currentScreen: ScreenName;
  setCurrentScreen: (screen: ScreenName) => void;
  activePrompt: Prompt | null;
  setActivePrompt: (prompt: Prompt | null) => void;
  
  // Variable Profiles
  profiles: VariableProfile[];
  activeProfile: VariableProfile | null;
  setActiveProfile: (id: string) => void;
  addProfile: (profile: Omit<VariableProfile, 'id' | 'updatedAt'>) => VariableProfile;
  updateProfile: (profile: VariableProfile) => void;
  deleteProfile: (id: string) => void;

  // Termux & OpenRouter Configuration
  termuxConfig: TermuxBridgeConfig;
  updateTermuxConfig: (config: Partial<TermuxBridgeConfig>) => void;
  openRouterKey: string;
  setOpenRouterKey: (key: string) => void;

  // Firestore Sync State
  syncState: FirestoreSyncState;
  lastSyncTime?: Date;
  triggerManualCloudSync: () => Promise<void>;

  // Theme Management
  allThemes: ThemeStyle[];
  activeTheme: ThemeStyle;
  activeThemeId: string;
  setTheme: (themeId: string) => void;
  customThemeColors?: Partial<ThemeColors>;
  updateCustomThemeColors: (colors: Partial<ThemeColors>) => void;
  resetCustomThemeColors: () => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('command_center');
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);

  const [profiles, setProfiles] = useState<VariableProfile[]>(getVariableProfiles());
  const [activeProfileId, setActiveProfileIdState] = useState<string>(getActiveProfileId());

  const [termuxConfig, setTermuxConfigState] = useState<TermuxBridgeConfig>(getTermuxBridgeConfig());
  const [openRouterKey, setOpenRouterKeyState] = useState<string>(getOpenRouterApiKey());

  const [syncState, setSyncState] = useState<FirestoreSyncState>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<Date | undefined>(undefined);

  // Theme State
  const [activeThemeId, setActiveThemeIdState] = useState<string>(getStoredThemeId());
  const [customThemeColors, setCustomThemeColors] = useState<Partial<ThemeColors> | undefined>(undefined);

  const activeTheme = getThemeById(activeThemeId);

  // Apply theme to DOM whenever theme or custom tweaks change
  useEffect(() => {
    applyThemeToDOM(activeTheme, customThemeColors);
  }, [activeTheme, customThemeColors]);

  const setTheme = (id: string) => {
    const target = getThemeById(id);
    setActiveThemeIdState(target.id);
    saveActiveThemeId(target.id);
    applyThemeToDOM(target, customThemeColors);
  };

  const updateCustomThemeColors = (colors: Partial<ThemeColors>) => {
    setCustomThemeColors(prev => {
      const next = { ...(prev || {}), ...colors };
      applyThemeToDOM(activeTheme, next);
      return next;
    });
  };

  const resetCustomThemeColors = () => {
    setCustomThemeColors(undefined);
    applyThemeToDOM(activeTheme, undefined);
  };

  // Subscribe to network online/offline events & firestore sync state
  useEffect(() => {
    const unsub = subscribeFirestoreSyncState((state, time) => {
      setSyncState(state);
      if (time) setLastSyncTime(time);
    });

    const handleOnline = () => {
      pingFirestoreSync();
      const user = getCurrentUser();
      if (user && prompts.length > 0) {
        syncPromptsToCloud(user.uid, prompts);
      }
    };

    const handleOffline = () => {
      setSyncState('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setSyncState('offline');
    } else {
      pingFirestoreSync();
    }

    return () => {
      unsub();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load from local storage or merge with initial
  useEffect(() => {
    const saved = localStorage.getItem('prompt_vault_prompts');
    if (saved) {
      try {
        const parsed: Prompt[] = JSON.parse(saved);
        // Merge missing initial prompts to ensure newly added prompts appear
        const existingIds = new Set(parsed.map(p => p.id));
        const missingInitial = initialPrompts.filter(p => !existingIds.has(p.id));
        const merged = [...parsed, ...missingInitial];
        setPrompts(merged);
      } catch (e) {
        setPrompts(initialPrompts);
      }
    } else {
      setPrompts(initialPrompts);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('prompt_vault_prompts', JSON.stringify(prompts));

      // Sync favorites to cloud if user is logged in
      const user = getCurrentUser();
      if (user) {
        const favoriteIds = prompts.filter(p => p.isFavorite).map(p => p.id);
        syncUserFavoritesToCloud(user.uid, favoriteIds);
      }
    }
  }, [prompts]);

  const addPrompt = (prompt: Prompt) => setPrompts(prev => [prompt, ...prev]);
  
  const updatePrompt = (updated: Prompt) => {
    setPrompts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };
  
  const deletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };
  
  const toggleFavorite = (id: string) => {
    setPrompts(prev => prev.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  // Variable Profiles Operations
  const setActiveProfile = (id: string) => {
    setActiveProfileIdState(id);
    persistActiveProfileId(id);
  };

  const addProfile = (profileData: Omit<VariableProfile, 'id' | 'updatedAt'>) => {
    const newProfile = createVariableProfile(profileData);
    setProfiles(getVariableProfiles());
    setActiveProfile(newProfile.id);
    return newProfile;
  };

  const updateProfile = (profile: VariableProfile) => {
    persistUpdateProfile(profile);
    setProfiles(getVariableProfiles());
  };

  const deleteProfile = (id: string) => {
    persistDeleteProfile(id);
    const updated = getVariableProfiles();
    setProfiles(updated);
    if (activeProfileId === id && updated.length > 0) {
      setActiveProfile(updated[0].id);
    }
  };

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || null;

  // Termux Bridge Operations
  const updateTermuxConfig = (partial: Partial<TermuxBridgeConfig>) => {
    const updated = { ...termuxConfig, ...partial };
    setTermuxConfigState(updated);
    saveTermuxBridgeConfig(updated);
  };

  const setOpenRouterKey = (key: string) => {
    setOpenRouterKeyState(key);
    saveOpenRouterApiKey(key);
  };

  const triggerManualCloudSync = async () => {
    const user = getCurrentUser();
    if (!user) {
      // Local ping
      await pingFirestoreSync();
      return;
    }
    const favoriteIds = prompts.filter(p => p.isFavorite).map(p => p.id);
    await syncUserFavoritesToCloud(user.uid, favoriteIds);
    await syncPromptsToCloud(user.uid, prompts);
  };

  return (
    <VaultContext.Provider value={{
      prompts, addPrompt, updatePrompt, deletePrompt, toggleFavorite,
      currentScreen, setCurrentScreen, activePrompt, setActivePrompt,
      profiles, activeProfile, setActiveProfile, addProfile, updateProfile, deleteProfile,
      termuxConfig, updateTermuxConfig, openRouterKey, setOpenRouterKey,
      syncState, lastSyncTime, triggerManualCloudSync,
      allThemes: AVAILABLE_THEMES, activeTheme, activeThemeId, setTheme,
      customThemeColors, updateCustomThemeColors, resetCustomThemeColors
    }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};
