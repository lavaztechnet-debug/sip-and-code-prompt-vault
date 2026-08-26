import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { MessageSquare, StickyNote, ArrowRight, ShieldCheck, Terminal, Sparkles, Cpu, Zap, Cloud, CloudOff, RefreshCw, CheckCircle2, AlertTriangle, Award } from 'lucide-react';
import { getKeepNotes } from '../services/googleKeep';
import { SipCodeEmblem } from '../components/SipCodeEmblem';

export const CommandCenterScreen: React.FC = () => {
  const { prompts, profiles, activeProfile, termuxConfig, setCurrentScreen, syncState, lastSyncTime, triggerManualCloudSync } = useVault();
  const [isSyncingManual, setIsSyncingManual] = useState(false);
  const keepNotes = getKeepNotes();

  const handleNavigate = (screen: any) => {
    triggerHaptic('medium');
    setCurrentScreen(screen);
  };

  const handleManualSync = async () => {
    setIsSyncingManual(true);
    triggerHaptic('selection');
    await triggerManualCloudSync();
    setIsSyncingManual(false);
    triggerHaptic('success');
  };

  // Format relative or concise time for last sync
  const formatSyncTime = (date?: Date) => {
    if (!date) return 'Just now';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="p-6 pt-12 animate-fade-in h-full flex flex-col gap-6">
      {/* Executive Hero */}
      <header className="neu-flat rounded-[28px] p-7 flex flex-col justify-center relative border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <SipCodeEmblem size="lg" showBadge withGlow className="shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Sip & Code • Edition
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono neu-pressed text-[var(--color-neu-text-light)]">
                  v1.2.0
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif italic text-[var(--color-neu-text)] mt-1">
                Developer Lifestyle Studio
              </h1>
              <p className="text-xs text-[var(--color-neu-text-light)] mt-0.5">
                Executive Prompt Vault &amp; Zero-Gradle Engineering Suite
              </p>
            </div>
          </div>

          {/* Unobtrusive Firestore Sync Status Indicator */}
          <button
            onClick={handleManualSync}
            disabled={isSyncingManual}
            title={
              syncState === 'offline'
                ? 'Offline Mode: Changes saved locally in SQLite/LocalStorage'
                : syncState === 'syncing' || isSyncingManual
                ? 'Synchronizing local vault with Firestore cloud...'
                : syncState === 'error'
                ? 'Sync Warning: Retrying Firestore connection'
                : `Firestore Synced (${formatSyncTime(lastSyncTime)})`
            }
            className={`group px-3 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              syncState === 'offline'
                ? 'neu-pressed text-amber-700 bg-amber-500/10 border border-amber-500/30'
                : syncState === 'error'
                ? 'neu-pressed text-red-600 bg-red-500/10'
                : syncState === 'syncing' || isSyncingManual
                ? 'neu-pressed text-[var(--color-neu-accent)]'
                : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)]'
            }`}
          >
            {syncState === 'offline' ? (
              <>
                <CloudOff size={12} className="text-amber-600" />
                <span className="font-bold text-[9px] uppercase tracking-wider">Offline</span>
              </>
            ) : syncState === 'syncing' || isSyncingManual ? (
              <>
                <RefreshCw size={12} className="animate-spin text-[var(--color-neu-accent)]" />
                <span className="font-bold text-[9px] uppercase tracking-wider">Syncing</span>
              </>
            ) : syncState === 'error' ? (
              <>
                <AlertTriangle size={12} className="text-red-500" />
                <span className="font-bold text-[9px] uppercase tracking-wider">Sync Alert</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
                <Cloud size={12} className="text-emerald-600" />
                <span className="font-bold text-[9px] uppercase tracking-wider">Cloud Synced</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-5">
          <div className="neu-pressed px-3.5 py-1.5 rounded-full text-[10px] font-mono text-[var(--color-neu-accent)] flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${termuxConfig.isConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            TERMUX BRIDGE: {termuxConfig.isConnected ? 'ONLINE' : 'STANDBY'}
          </div>
          <div className="neu-pressed px-3.5 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1">
            <Sparkles size={11} className="text-[var(--color-neu-accent)]" /> {profiles.length} CONTEXT PRESETS
          </div>
          <div className="neu-pressed px-3.5 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1">
            <ShieldCheck size={11} className="text-[var(--color-neu-accent)]" /> ZERO-COST STREAMING: ACTIVE
          </div>
        </div>
      </header>
      
      {/* Quick Launch Bento Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1 mb-24 overflow-y-auto no-scrollbar">
        {/* Active Context Profile Spotlight */}
        <div className="col-span-2 neu-flat rounded-[24px] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] neu-convex flex items-center justify-center text-lg">
              {activeProfile?.icon || '✨'}
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">Active Context Preset</span>
              <h3 className="text-xs font-bold text-[var(--color-neu-text)]">{activeProfile?.name || 'Default Context'}</h3>
              <p className="text-[10px] text-[var(--color-neu-text-light)]">{Object.keys(activeProfile?.variables || {}).length} variables ready</p>
            </div>
          </div>
          <button
            onClick={() => handleNavigate('creator')}
            className="neu-button px-3 py-2 rounded-[14px] text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1"
          >
            <Zap size={12} /> Launch Studio
          </button>
        </div>

        {/* Google Workspace Card */}
        <div className="col-span-2 neu-flat rounded-[24px] p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-widest font-bold opacity-60">Google Workspace Hub</h2>
            <span className="text-[10px] font-bold text-[var(--color-neu-accent)] uppercase tracking-wider">Keep & Chat Connected</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleNavigate('workspace')}
              className="neu-button p-4 rounded-2xl flex items-center gap-3 text-left group"
            >
              <div className="p-2.5 rounded-xl neu-pressed text-[var(--color-neu-accent)]">
                <MessageSquare size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--color-neu-text)] truncate">Google Chat</p>
                <p className="text-[10px] text-[var(--color-neu-text-light)]">Spaces & Live Messaging</p>
              </div>
              <ArrowRight size={14} className="text-[var(--color-neu-text-light)] group-hover:text-[var(--color-neu-accent)] transition-colors" />
            </button>

            <button
              onClick={() => handleNavigate('workspace')}
              className="neu-button p-4 rounded-2xl flex items-center gap-3 text-left group"
            >
              <div className="p-2.5 rounded-xl neu-pressed text-[var(--color-neu-accent)]">
                <StickyNote size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--color-neu-text)] truncate">Google Keep</p>
                <p className="text-[10px] text-[var(--color-neu-text-light)]">{keepNotes.length} Studio Notes</p>
              </div>
              <ArrowRight size={14} className="text-[var(--color-neu-text-light)] group-hover:text-[var(--color-neu-accent)] transition-colors" />
            </button>
          </div>
        </div>

        {/* Master Vault Button */}
        <button 
          onClick={() => handleNavigate('vault')}
          className="neu-button rounded-[24px] p-6 flex flex-col justify-between items-start text-left"
        >
          <span className="text-[10px] font-bold text-[var(--color-neu-text-light)] uppercase tracking-widest">Master Vault</span>
          <span className="text-3xl font-serif text-[var(--color-neu-accent)]">{prompts.length}</span>
          <span className="text-[9px] text-[var(--color-neu-text-light)]">Prompts & Meta-Templates</span>
        </button>

        {/* Termux & Local Hub Button */}
        <button 
          onClick={() => handleNavigate('deployment')}
          className="neu-button rounded-[24px] p-6 flex flex-col justify-between items-start text-left"
        >
          <span className="text-[10px] font-bold text-[var(--color-neu-text-light)] uppercase tracking-widest">Local Engine</span>
          <span className="text-3xl font-serif text-[var(--color-neu-accent)] flex items-center gap-1">
            <Cpu size={24} /> Termux
          </span>
          <span className="text-[9px] text-[var(--color-neu-text-light)]">llama.cpp & Zero-Gradle</span>
        </button>
      </div>
    </div>
  );
};
