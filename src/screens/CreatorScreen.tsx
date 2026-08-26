import React, { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { createKeepNote } from '../services/googleKeep';
import { ConfirmModal } from '../components/ConfirmModal';
import { VariableProfilesModal } from '../components/VariableProfilesModal';
import { TermuxBridgeModal } from '../components/TermuxBridgeModal';
import { LiveModelRunner } from '../components/LiveModelRunner';
import { extractPlaceholders, applyProfileToTemplate } from '../services/variableProfiles';
import { VariableProfile, Prompt } from '../types';
import { Play, Copy, StickyNote, MessageSquare, Check, Sparkles, Sliders, Terminal, BookmarkPlus, Zap, BookmarkCheck } from 'lucide-react';

export const CreatorScreen: React.FC = () => {
  const { activePrompt, setCurrentScreen, profiles, activeProfile, setActiveProfile, addPrompt, updatePrompt } = useVault();
  const [template, setTemplate] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [compiled, setCompiled] = useState('');
  const [showKeepConfirm, setShowKeepConfirm] = useState(false);
  const [keepSavedSuccess, setKeepSavedSuccess] = useState(false);
  const [vaultSavedSuccess, setVaultSavedSuccess] = useState(false);
  const [isExecutingAnim, setIsExecutingAnim] = useState(false);
  const [promptTitle, setPromptTitle] = useState('');
  
  // Modals & Panels
  const [showProfilesModal, setShowProfilesModal] = useState(false);
  const [showTermuxModal, setShowTermuxModal] = useState(false);
  const [showModelRunner, setShowModelRunner] = useState(false);
  const [profileAppliedToast, setProfileAppliedToast] = useState<string | null>(null);

  useEffect(() => {
    if (activePrompt) {
      setTemplate(activePrompt.template);
      setPromptTitle(activePrompt.title);
    } else {
      setTemplate('Act as a [profession] with experience in [domain]. Your goal is to [goal]. Adopt a tone that is [tone]. Reply to: [request]');
      setPromptTitle('Custom Variable Prompt');
    }
  }, [activePrompt]);

  const detectedVars = extractPlaceholders(template);

  useEffect(() => {
    let result = template;
    detectedVars.forEach(v => {
      const val = variables[v] !== undefined && variables[v] !== '' ? variables[v] : `[${v}]`;
      result = result.split(`[${v}]`).join(val);
      result = result.split(`{{${v}}}`).join(val);
    });
    setCompiled(result);
  }, [template, variables, detectedVars]);

  const handleVarChange = (name: string, value: string) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyActiveProfile = (profileToApply?: VariableProfile) => {
    const prof = profileToApply || activeProfile;
    if (!prof) return;

    const { populatedVariables, matchedCount } = applyProfileToTemplate(template, prof, variables);
    setVariables(populatedVariables);
    triggerHaptic('success');
    setProfileAppliedToast(`Applied "${prof.name}" (${matchedCount} variables matched)`);
    setTimeout(() => setProfileAppliedToast(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compiled);
    triggerHaptic('success');
  };

  const handleExecute = () => {
    setIsExecutingAnim(true);
    triggerHaptic('medium');
    setShowModelRunner(true);
    setTimeout(() => setIsExecutingAnim(false), 900);
  };

  const handleSaveToVault = () => {
    if (!template.trim()) return;
    const newPrompt: Prompt = {
      id: activePrompt ? activePrompt.id : `prompt_custom_${Date.now()}`,
      title: promptTitle || 'Custom Dynamic Prompt',
      category: activePrompt ? activePrompt.category : 'Prompt Engineering',
      tags: activePrompt ? activePrompt.tags : ['custom-builder', 'injected-variable'],
      template: template,
      example: compiled !== template ? compiled : (activePrompt?.example || ''),
      notes: activePrompt?.notes || 'Created via Live Variable Builder studio',
      isFavorite: activePrompt?.isFavorite || false,
    };

    if (activePrompt) {
      updatePrompt(newPrompt);
    } else {
      addPrompt(newPrompt);
    }
    
    setVaultSavedSuccess(true);
    triggerHaptic('success');
    setTimeout(() => setVaultSavedSuccess(false), 2200);
  };

  const renderHighlightedPreview = () => {
    if (!template) return null;
    
    const regex = /\[([a-zA-Z0-9_\-\/]+)\]|\{\{([a-zA-Z0-9_\-\/]+)\}\}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        parts.push(template.substring(lastIndex, match.index));
      }
      
      const varName = match[1] || match[2];
      const varValue = variables[varName];
      
      parts.push(
        <span key={`var-${match.index}`} className="text-[var(--color-neu-accent)] font-bold px-1.5 py-0.5 rounded-[8px] mx-[2px] neu-pressed inline-block transform -translate-y-[1px]">
          {varValue || `[${varName}]`}
        </span>
      );
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < template.length) {
      parts.push(template.substring(lastIndex));
    }

    return <div className="leading-relaxed">{parts}</div>;
  };

  const handleSaveToKeep = () => {
    setShowKeepConfirm(true);
    triggerHaptic('light');
  };

  const confirmSaveToKeep = () => {
    setShowKeepConfirm(false);
    createKeepNote({
      title: activePrompt ? activePrompt.title : 'Custom Compiled Prompt',
      body: compiled,
      category: activePrompt ? activePrompt.category : 'Prompt Engineering',
      tags: ['compiled-prompt', 'creator-studio'],
    });
    setKeepSavedSuccess(true);
    triggerHaptic('success');
    setTimeout(() => setKeepSavedSuccess(false), 2500);
  };

  const handleSendToChat = () => {
    triggerHaptic('medium');
    setCurrentScreen('workspace');
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in flex flex-col min-h-full gap-4 sm:gap-6">
      {/* Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 flex items-center justify-between border border-[var(--color-neu-shadow-light)]/40">
        <div>
          <h1 className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60">Prompt Creator Studio</h1>
          <p className="text-lg sm:text-xl font-serif italic text-[var(--color-neu-accent)] mt-0.5">Live Variable Builder</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTermuxModal(true)}
            className="neu-button p-2.5 sm:p-3 rounded-[16px] text-[var(--color-neu-accent)] cursor-pointer"
            title="Local Termux Bridge & Engine Hub"
          >
            <Terminal size={17} />
          </button>
          <button
            onClick={() => setShowProfilesModal(true)}
            className="neu-button p-2.5 sm:p-3 rounded-[16px] text-[var(--color-neu-accent)] cursor-pointer"
            title="Manage Context Profiles"
          >
            <Sliders size={17} />
          </button>
        </div>
      </header>

      {/* Variable Profile Carousel Banner */}
      <div className="neu-flat rounded-[24px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] shrink-0 mr-1 flex items-center gap-1">
            <Sparkles size={12} className="text-[var(--color-neu-accent)]" /> Preset:
          </span>
          {profiles.map(p => {
            const isActive = activeProfile?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProfile(p.id);
                  handleApplyActiveProfile(p);
                }}
                className={`px-3 py-1.5 rounded-[14px] text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'neu-pressed text-[var(--color-neu-accent)] font-bold border border-[var(--color-neu-accent)]/40'
                    : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
                }`}
              >
                <span>{p.icon || '📦'}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleApplyActiveProfile()}
          className="neu-convex px-4 py-2 rounded-[14px] text-xs font-bold text-[var(--color-neu-accent)] uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0"
        >
          <Zap size={14} /> Quick Auto-Fill
        </button>
      </div>

      {profileAppliedToast && (
        <div className="p-3 rounded-[16px] bg-[var(--color-neu-accent)]/15 border border-[var(--color-neu-accent)]/30 text-xs font-bold text-[var(--color-neu-accent)] flex items-center gap-2 animate-fade-in">
          <Check size={16} />
          <span>{profileAppliedToast}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col gap-6">
        {/* Template Input */}
        <div className="neu-flat rounded-[24px] p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]">Template</h3>
            <span className="text-[10px] font-mono text-[var(--color-neu-text-light)]">
              {detectedVars.length} parameters detected
            </span>
          </div>
          <div className="neu-pressed rounded-[16px] p-4">
            <textarea
              className="w-full bg-transparent resize-none outline-none text-[var(--color-neu-text)] text-sm leading-relaxed min-h-[100px]"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="Enter prompt template with [variables] or {{variables}}..."
            />
          </div>
        </div>

        {/* Dynamic Variable Parameter Form */}
        {detectedVars.length > 0 && (
          <div className="neu-flat rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]">
                Parameter Injection Slots
              </h3>
              <button
                onClick={() => setVariables({})}
                className="text-[10px] text-[var(--color-neu-text-light)] hover:underline"
              >
                Clear all values
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detectedVars.map((v, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold text-[var(--color-neu-accent)]">
                    [{v}]
                  </label>
                  <div className="neu-pressed rounded-[16px] p-3">
                    <input 
                      type="text" 
                      className="w-full bg-transparent outline-none text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)] text-sm font-medium" 
                      placeholder={`Enter value for [${v}]...`}
                      value={variables[v] || ''}
                      onChange={(e) => handleVarChange(v, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compiled Output Preview */}
        <div className="neu-flat rounded-[24px] p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]">Compiled Prompt</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                title="Copy prompt"
                className="neu-button p-2.5 rounded-[14px] text-[var(--color-neu-accent)] flex items-center gap-1 text-xs font-bold"
              >
                <Copy size={15} />
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
          </div>
          <div className="neu-convex rounded-[16px] p-4 text-sm leading-relaxed min-h-[100px] text-[var(--color-neu-text)] whitespace-pre-wrap font-mono opacity-90 overflow-y-auto max-h-60 no-scrollbar">
            {renderHighlightedPreview()}
          </div>

          {/* Workspace Action Bridges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[var(--color-neu-shadow-dark)]/30">
            <button
              onClick={handleSaveToVault}
              className={`py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] flex items-center justify-center gap-2 cursor-pointer transition-all ${
                vaultSavedSuccess ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button'
              }`}
            >
              {vaultSavedSuccess ? <BookmarkCheck size={14} className="text-emerald-600" /> : <BookmarkPlus size={14} />}
              {vaultSavedSuccess ? 'Saved to Vault' : 'Save to Vault'}
            </button>

            <button
              onClick={handleSaveToKeep}
              className={`py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text)] flex items-center justify-center gap-2 cursor-pointer transition-all ${
                keepSavedSuccess ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button'
              }`}
            >
              {keepSavedSuccess ? <Check size={14} className="text-emerald-600" /> : <StickyNote size={14} className="text-[var(--color-neu-accent)]" />}
              {keepSavedSuccess ? 'Saved to Keep' : 'Save to Keep'}
            </button>

            <button
              onClick={handleSendToChat}
              className="neu-button py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={14} className="text-[var(--color-neu-accent)]" />
              Send to Chat
            </button>
          </div>
        </div>

        {/* Live Model Playground Drawer */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]">
              Live Model Execution Playground
            </h3>
            <button
              onClick={() => setShowModelRunner(!showModelRunner)}
              className="text-xs font-bold text-[var(--color-neu-accent)] hover:underline cursor-pointer"
            >
              {showModelRunner ? 'Hide Runner' : 'Show Live Runner'}
            </button>
          </div>

          {showModelRunner ? (
            <LiveModelRunner
              promptText={compiled}
              onClose={() => setShowModelRunner(false)}
            />
          ) : (
            <button 
              onClick={handleExecute}
              className={`w-full py-4 rounded-[24px] flex items-center justify-center gap-3 text-sm font-bold tracking-widest text-[var(--color-neu-accent)] mt-2 cursor-pointer transition-all ${
                isExecutingAnim ? 'neu-pressed animate-neu-exec text-amber-600' : 'neu-convex'
              }`}
            >
              <Play size={18} className={isExecutingAnim ? 'animate-spin' : ''} />
              {isExecutingAnim ? 'STREAMING BOOTSTRAP...' : 'LAUNCH LIVE MODEL STREAMER'}
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showKeepConfirm}
        title="Save to Google Keep"
        description="Save this compiled prompt into your Google Keep Studio notes?"
        details={compiled}
        confirmLabel="Save Note"
        onConfirm={confirmSaveToKeep}
        onCancel={() => setShowKeepConfirm(false)}
      />

      <VariableProfilesModal
        isOpen={showProfilesModal}
        onClose={() => setShowProfilesModal(false)}
        onApplyProfile={(p) => handleApplyActiveProfile(p)}
      />

      <TermuxBridgeModal
        isOpen={showTermuxModal}
        onClose={() => setShowTermuxModal(false)}
      />
    </div>
  );
};
