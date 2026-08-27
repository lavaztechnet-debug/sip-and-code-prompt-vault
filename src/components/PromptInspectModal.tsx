import React, { useState } from 'react';
import { Prompt } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { extractVariables, injectVariables } from '../utils/parser';
import { 
  X, 
  Copy, 
  Check, 
  Play, 
  Star, 
  Code, 
  Sliders, 
  Info, 
  Tag, 
  Sparkles,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface PromptInspectModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
  onAskAI: (prompt: Prompt, filledTemplate?: string) => void;
  onToggleFavorite: (id: string) => void;
  onOptimize?: (prompt: Prompt) => void;
}

export const PromptInspectModal: React.FC<PromptInspectModalProps> = ({
  prompt,
  isOpen,
  onClose,
  onAskAI,
  onToggleFavorite,
  onOptimize
}) => {
  const [activeTab, setActiveTab] = useState<'variables' | 'raw' | 'details'>('variables');
  const [copiedType, setCopiedType] = useState<'raw' | 'filled' | 'json' | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  if (!isOpen || !prompt) return null;

  const variables = extractVariables(prompt.template);
  const filledTemplate = injectVariables(prompt.template, variableValues);

  const handleCopy = (text: string, type: 'raw' | 'filled' | 'json') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    triggerHaptic('success');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleVariableChange = (varName: string, val: string) => {
    setVariableValues(prev => ({
      ...prev,
      [varName]: val
    }));
  };

  const handleLaunchAI = () => {
    triggerHaptic('medium');
    const promptWithFilled: Prompt = {
      ...prompt,
      template: filledTemplate
    };
    onAskAI(promptWithFilled, filledTemplate);
    onClose();
  };

  const wordCount = prompt.template.trim().split(/\s+/).filter(Boolean).length;
  const charCount = prompt.template.length;
  const tokenEstimate = Math.ceil(charCount / 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="neu-flat rounded-[28px] sm:rounded-[32px] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-[var(--color-neu-shadow-light)]/40 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[var(--color-neu-shadow-dark)]/30 flex items-center justify-between gap-3 bg-[var(--color-neu-bg)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl neu-pressed text-[var(--color-neu-accent)] shrink-0">
              <Sparkles size={16} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider neu-pressed text-[var(--color-neu-accent)]">
                  {prompt.category}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-neu-text-light)]">
                  {prompt.id}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold truncate leading-tight mt-0.5">
                {prompt.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                onToggleFavorite(prompt.id);
                triggerHaptic('medium');
              }}
              className={`p-2 sm:p-2.5 rounded-xl cursor-pointer transition-all ${
                prompt.isFavorite
                  ? 'neu-pressed text-[var(--color-neu-accent)]'
                  : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)]'
              }`}
              title="Toggle Favorite"
            >
              <Star size={16} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="p-2 sm:p-2.5 rounded-xl neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-[var(--color-neu-bg)]/80 flex items-center justify-between border-b border-[var(--color-neu-shadow-dark)]/20 text-[10px] sm:text-[11px] font-mono text-[var(--color-neu-text-light)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FileText size={12} className="opacity-70" /> {wordCount} words
            </span>
            <span className="flex items-center gap-1">
              <Layers size={12} className="opacity-70" /> ~{tokenEstimate} tokens
            </span>
            <span className="flex items-center gap-1">
              <Sliders size={12} className="opacity-70" /> {variables.length} vars
            </span>
          </div>
          {prompt.isCustom && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold neu-pressed text-amber-500">
              Custom Prompt
            </span>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-5 pt-3 pb-1 flex gap-2 border-b border-[var(--color-neu-shadow-dark)]/20">
          <button
            onClick={() => {
              setActiveTab('variables');
              triggerHaptic('light');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'variables'
                ? 'neu-pressed text-[var(--color-neu-accent)]'
                : 'neu-button text-[var(--color-neu-text-light)]'
            }`}
          >
            <Sliders size={13} />
            <span>Interactive Injection</span>
            {variables.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[8.5px] bg-[var(--color-neu-accent)] text-white ml-0.5">
                {variables.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('raw');
              triggerHaptic('light');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'raw'
                ? 'neu-pressed text-[var(--color-neu-accent)]'
                : 'neu-button text-[var(--color-neu-text-light)]'
            }`}
          >
            <Code size={13} />
            <span>Template & Code</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('details');
              triggerHaptic('light');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'details'
                ? 'neu-pressed text-[var(--color-neu-accent)]'
                : 'neu-button text-[var(--color-neu-text-light)]'
            }`}
          >
            <Info size={13} />
            <span>Metadata & JSON</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {activeTab === 'variables' && (
            <div className="space-y-4">
              {variables.length > 0 ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                      Fill Dynamic Variables ({variables.length})
                    </label>
                    <button
                      onClick={() => setVariableValues({})}
                      className="text-[9.5px] text-[var(--color-neu-accent)] hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {variables.map(v => (
                      <div key={v} className="neu-pressed rounded-xl p-2.5">
                        <span className="block text-[9px] font-mono font-bold text-[var(--color-neu-accent)] mb-1">
                          [{v}]
                        </span>
                        <input
                          type="text"
                          placeholder={`Enter ${v}...`}
                          value={variableValues[v] || ''}
                          onChange={(e) => handleVariableChange(v, e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-xs text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)]/60 font-sans"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="neu-pressed rounded-2xl p-4 text-center">
                  <p className="text-xs text-[var(--color-neu-text-light)]">
                    This prompt has no dynamic <code className="text-[var(--color-neu-accent)]">[variable]</code> placeholders. It is ready for direct invocation.
                  </p>
                </div>
              )}

              {/* Live Preview */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                    Live Injected Output Preview
                  </label>
                  <button
                    onClick={() => handleCopy(filledTemplate, 'filled')}
                    className="neu-button px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 text-[var(--color-neu-text)] cursor-pointer"
                  >
                    {copiedType === 'filled' ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                    <span>{copiedType === 'filled' ? 'Copied' : 'Copy Injected'}</span>
                  </button>
                </div>
                <div className="neu-pressed rounded-2xl p-3.5 max-h-48 overflow-y-auto">
                  <pre className="text-[11px] sm:text-xs font-mono text-[var(--color-neu-text)] whitespace-pre-wrap leading-relaxed">
                    {filledTemplate}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                    Raw Prompt Template
                  </label>
                  <button
                    onClick={() => handleCopy(prompt.template, 'raw')}
                    className="neu-button px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 text-[var(--color-neu-text)] cursor-pointer"
                  >
                    {copiedType === 'raw' ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                    <span>{copiedType === 'raw' ? 'Copied Template' : 'Copy Raw'}</span>
                  </button>
                </div>
                <div className="neu-pressed rounded-2xl p-3.5 max-h-60 overflow-y-auto">
                  <pre className="text-[11px] sm:text-xs font-mono text-[var(--color-neu-text)] whitespace-pre-wrap leading-relaxed selection:bg-[var(--color-neu-accent)] selection:text-white">
                    {prompt.template}
                  </pre>
                </div>
              </div>

              {/* Tags */}
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] flex items-center gap-1">
                    <Tag size={11} /> Associated Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {prompt.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-[9.5px] font-mono neu-flat text-[var(--color-neu-text)]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="neu-pressed rounded-xl p-3">
                  <span className="text-[9px] font-bold uppercase text-[var(--color-neu-text-light)] block">
                    ID
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--color-neu-accent)] truncate block">
                    {prompt.id}
                  </span>
                </div>
                <div className="neu-pressed rounded-xl p-3">
                  <span className="text-[9px] font-bold uppercase text-[var(--color-neu-text-light)] block">
                    Category
                  </span>
                  <span className="text-xs font-bold truncate block">
                    {prompt.category}
                  </span>
                </div>
                <div className="neu-pressed rounded-xl p-3">
                  <span className="text-[9px] font-bold uppercase text-[var(--color-neu-text-light)] block">
                    Created / Seeded
                  </span>
                  <span className="text-xs font-mono truncate block">
                    {prompt.createdAt ? new Date(prompt.createdAt).toLocaleString() : 'System Default'}
                  </span>
                </div>
                <div className="neu-pressed rounded-xl p-3">
                  <span className="text-[9px] font-bold uppercase text-[var(--color-neu-text-light)] block">
                    Status
                  </span>
                  <span className="text-xs font-bold text-emerald-600 truncate block">
                    {prompt.isFavorite ? '★ Favorited' : 'Standard'}
                  </span>
                </div>
              </div>

              {/* JSON Payload */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] flex items-center gap-1">
                    <Code size={11} /> Structured JSON Export
                  </label>
                  <button
                    onClick={() => handleCopy(JSON.stringify(prompt, null, 2), 'json')}
                    className="neu-button px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 text-[var(--color-neu-text)] cursor-pointer"
                  >
                    {copiedType === 'json' ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                    <span>{copiedType === 'json' ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <div className="neu-pressed rounded-2xl p-3.5 max-h-48 overflow-y-auto">
                  <pre className="text-[10.5px] font-mono text-[var(--color-neu-text-light)] whitespace-pre leading-normal">
                    {JSON.stringify(prompt, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 pt-3 border-t border-[var(--color-neu-shadow-dark)]/30 flex items-center justify-between gap-3 bg-[var(--color-neu-bg)]">
          <div className="text-[10.5px] text-[var(--color-neu-text-light)] font-mono">
            {variables.length > 0 && Object.keys(variableValues).length > 0 ? (
              <span className="text-emerald-600 font-bold">
                ✓ {Object.keys(variableValues).length}/{variables.length} injected
              </span>
            ) : (
              <span>Ready</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onOptimize && (
              <button
                onClick={() => {
                  onOptimize(prompt);
                  onClose();
                  triggerHaptic('medium');
                }}
                className="neu-button px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer"
                title="Refine in Optimizer Studio"
              >
                <Sparkles size={13} />
                <span>Refine</span>
              </button>
            )}

            <button
              onClick={() => handleCopy(filledTemplate, 'filled')}
              className="neu-button px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text)] cursor-pointer"
            >
              <Copy size={13} />
              <span>Copy</span>
            </button>

            <button
              onClick={handleLaunchAI}
              className="neu-convex px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] hover:shadow-md cursor-pointer transition-all active:animate-neu-exec"
            >
              <Play size={13} />
              <span>Launch in AI Studio</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
