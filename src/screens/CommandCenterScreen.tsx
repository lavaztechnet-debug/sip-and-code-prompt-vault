import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { MessageSquare, StickyNote, ArrowRight, ShieldCheck, Terminal, Sparkles, Cpu, Zap, Cloud, CloudOff, RefreshCw, CheckCircle2, AlertTriangle, Award, BookOpen, HelpCircle } from 'lucide-react';
import { getKeepNotes } from '../services/googleKeep';
import { SipCodeEmblem } from '../components/SipCodeEmblem';
import { FeatureGuideModal } from '../components/FeatureGuideModal';

export const CommandCenterScreen: React.FC = () => {
  const { prompts, profiles, activeProfile, termuxConfig, setCurrentScreen, syncState, lastSyncTime, triggerManualCloudSync } = useVault();
  const [isSyncingManual, setIsSyncingManual] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
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
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in flex flex-col gap-4 sm:gap-6 min-h-full">
      {/* Executive Hero */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 flex flex-col justify-center relative border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <SipCodeEmblem size="lg" showBadge withGlow className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)] truncate">
                  Sip &amp; Code • Edition
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-mono neu-pressed text-[var(--color-neu-text-light)] shrink-0">
                  v1.2.0
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-serif italic text-[var(--color-neu-text)] mt-0.5 leading-tight">
                Developer Lifestyle Studio
              </h1>
              <p className="text-[11px] sm:text-xs text-[var(--color-neu-text-light)] mt-0.5 leading-tight">
                Executive Prompt Vault &amp; Zero-Gradle Engineering Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Interactive Feature Guide Button */}
            <button
              onClick={() => {
                triggerHaptic('medium');
                setIsGuideOpen(true);
              }}
              title="Open Complete Step-by-Step Feature Guide"
              className="neu-convex px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 hover:shadow-md cursor-pointer shrink-0"
            >
              <BookOpen size={12} />
              <span>Guide</span>
            </button>

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
              className={`group px-2.5 sm:px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
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
                  <CloudOff size={11} className="text-amber-600" />
                  <span className="font-bold text-[8.5px] uppercase tracking-wider">Offline</span>
                </>
              ) : syncState === 'syncing' || isSyncingManual ? (
                <>
                  <RefreshCw size={11} className="animate-spin text-[var(--color-neu-accent)]" />
                  <span className="font-bold text-[8.5px] uppercase tracking-wider">Syncing</span>
                </>
              ) : syncState === 'error' ? (
                <>
                  <AlertTriangle size={11} className="text-red-500" />
                  <span className="font-bold text-[8.5px] uppercase tracking-wider">Alert</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
                  <Cloud size={11} className="text-emerald-600" />
                  <span className="font-bold text-[8.5px] uppercase tracking-wider hidden xs:inline">Synced</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="neu-pressed px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono text-[var(--color-neu-accent)] flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${termuxConfig.isConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            TERMUX BRIDGE: {termuxConfig.isConnected ? 'ONLINE' : 'STANDBY'}
          </div>
          <div className="neu-pressed px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono flex items-center gap-1">
            <Sparkles size={11} className="text-[var(--color-neu-accent)]" /> {profiles.length} PRESETS
          </div>
          <div className="neu-pressed px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono flex items-center gap-1">
            <ShieldCheck size={11} className="text-[var(--color-neu-accent)]" /> ZERO-COST STREAMING
          </div>
        </div>
      </header>
      
      {/* Quick Launch Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {/* Active Context Profile Spotlight */}
        <div className="sm:col-span-2 neu-flat rounded-[24px] p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] neu-convex flex items-center justify-center text-lg shrink-0">
              {activeProfile?.icon || '✨'}
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)] block">Active Context Preset</span>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--color-neu-text)] truncate">{activeProfile?.name || 'Default Context'}</h3>
              <p className="text-[9.5px] sm:text-[10px] text-[var(--color-neu-text-light)] truncate">{Object.keys(activeProfile?.variables || {}).length} variables ready</p>
            </div>
          </div>
          <button
            onClick={() => handleNavigate('creator')}
            className="neu-button px-3 py-2 rounded-[14px] text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1 shrink-0"
          >
            <Zap size={12} /> Studio
          </button>
        </div>

        {/* Prompt Refiner & Studio Spotlight Card */}
        <div className="sm:col-span-2 neu-flat rounded-[24px] p-5 flex flex-col justify-between gap-3 border border-[var(--color-neu-shadow-light)]/40">
          <div className="flex justify-between items-center">
            <h2 className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60">Intelligence &amp; Optimization Hub</h2>
            <span className="text-[9px] sm:text-[10px] font-bold text-[var(--color-neu-accent)] uppercase tracking-wider">AI Tokenomics Ready</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleNavigate('optimizer')}
              className="neu-button p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="p-2.5 rounded-xl neu-pressed text-[var(--color-neu-accent)] shrink-0">
                <Sparkles size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--color-neu-text)] truncate">Prompt Refiner</p>
                <p className="text-[10px] text-[var(--color-neu-text-light)] truncate">Token Pruning &amp; XML Guardrails</p>
              </div>
              <ArrowRight size={14} className="text-[var(--color-neu-text-light)] group-hover:text-[var(--color-neu-accent)] transition-colors shrink-0" />
            </button>

            <button
              onClick={() => handleNavigate('lab')}
              className="neu-button p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="p-2.5 rounded-xl neu-pressed text-[var(--color-neu-accent)] shrink-0">
                <StickyNote size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--color-neu-text)] truncate">Document Notepad</p>
                <p className="text-[10px] text-[var(--color-neu-text-light)] truncate">20-Typography Document Studio</p>
              </div>
              <ArrowRight size={14} className="text-[var(--color-neu-text-light)] group-hover:text-[var(--color-neu-accent)] transition-colors shrink-0" />
            </button>
          </div>
        </div>

        {/* Master Vault Button */}
        <button 
          onClick={() => handleNavigate('vault')}
          className="neu-button rounded-[24px] p-5 flex flex-col justify-between items-start text-left cursor-pointer active:scale-98"
        >
          <span className="text-[9.5px] font-bold text-[var(--color-neu-text-light)] uppercase tracking-widest">Master Vault</span>
          <span className="text-3xl font-serif text-[var(--color-neu-accent)] my-1">{prompts.length}</span>
          <span className="text-[9px] text-[var(--color-neu-text-light)]">Prompts &amp; Meta-Templates</span>
        </button>

        {/* Termux & Local Hub Button */}
        <button 
          onClick={() => handleNavigate('deployment')}
          className="neu-button rounded-[24px] p-5 flex flex-col justify-between items-start text-left cursor-pointer active:scale-98"
        >
          <span className="text-[9.5px] font-bold text-[var(--color-neu-text-light)] uppercase tracking-widest">Local Engine</span>
          <span className="text-3xl font-serif text-[var(--color-neu-accent)] flex items-center gap-1 my-1">
            <Cpu size={22} /> Termux
          </span>
          <span className="text-[9px] text-[var(--color-neu-text-light)]">llama.cpp &amp; Zero-Gradle</span>
        </button>

        {/* Full Feature Guide Walkthrough Spotlight Card */}
        <div className="sm:col-span-2 neu-flat rounded-[24px] p-4 sm:p-5 flex items-center justify-between gap-3 border border-[var(--color-neu-shadow-light)]/30">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl neu-convex text-[var(--color-neu-accent)] flex items-center justify-center shrink-0">
              <BookOpen size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Documentation &amp; Walkthrough
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-mono neu-pressed text-[var(--color-neu-text-light)] hidden xs:inline">
                  7 Core Guides
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--color-neu-text)] truncate">Step-by-Step Feature Guide</h3>
              <p className="text-[10px] text-[var(--color-neu-text-light)] truncate">Master the Vault, Token Pruning, XML Guardrails, Zero-Cost AI &amp; Termux</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('medium');
              setIsGuideOpen(true);
            }}
            className="neu-convex px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 shrink-0 hover:shadow-md cursor-pointer transition-all active:scale-95"
          >
            <span>Read Guide</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Feature Guide Modal */}
      <FeatureGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
};
