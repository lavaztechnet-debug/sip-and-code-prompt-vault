import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { extractPlaceholders, applyProfileToTemplate } from '../services/variableProfiles';
import { OPENROUTER_FREE_MODELS, streamPromptExecution } from '../services/aiRunner';
import { createKeepNote } from '../services/googleKeep';
import { VariableProfilesModal } from '../components/VariableProfilesModal';
import { Plus, ArrowDown, Play, Square, Sparkles, Trash2, Copy, Check, StickyNote, Sliders, RefreshCw } from 'lucide-react';

interface ChainStep {
  id: string;
  promptId: string;
  customTemplate?: string;
  variables: Record<string, string>;
  output?: string;
  isStreaming?: boolean;
}

export const LabScreen: React.FC = () => {
  const { prompts, profiles, activeProfile, setActiveProfile } = useVault();
  const [chain, setChain] = useState<ChainStep[]>([
    { id: 'step-1', promptId: prompts[0]?.id || '', variables: {} },
    { id: 'step-2', promptId: prompts[1]?.id || '', variables: {} },
  ]);

  const [selectedModelId, setSelectedModelId] = useState<string>(OPENROUTER_FREE_MODELS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isRunningChain, setIsRunningChain] = useState<boolean>(false);
  const [showProfilesModal, setShowProfilesModal] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedToKeep, setSavedToKeep] = useState<boolean>(false);

  const addStep = () => {
    setChain([...chain, { id: `step-${Date.now()}`, promptId: '', variables: {} }]);
    triggerHaptic('light');
  };

  const removeStep = (index: number) => {
    if (chain.length <= 1) return;
    setChain(chain.filter((_, i) => i !== index));
    triggerHaptic('light');
  };

  const handleStepPromptChange = (index: number, promptId: string) => {
    const targetPrompt = prompts.find(p => p.id === promptId);
    const newChain = [...chain];
    newChain[index].promptId = promptId;
    if (targetPrompt && activeProfile) {
      const { populatedVariables } = applyProfileToTemplate(targetPrompt.template, activeProfile);
      newChain[index].variables = populatedVariables;
    }
    setChain(newChain);
    triggerHaptic('selection');
  };

  const handleStepVarChange = (stepIndex: number, varName: string, value: string) => {
    const newChain = [...chain];
    newChain[stepIndex].variables = {
      ...newChain[stepIndex].variables,
      [varName]: value,
    };
    setChain(newChain);
  };

  const compileStepText = (step: ChainStep, previousOutput: string = ''): string => {
    const prompt = prompts.find(p => p.id === step.promptId);
    let template = step.customTemplate || prompt?.template || '';
    if (!template) return '';

    // Replace previous output tokens if any
    template = template.replaceAll('[previous_output]', previousOutput).replaceAll('{{previous_output}}', previousOutput);
    template = template.replaceAll('[code]', previousOutput || (step.variables['code'] || ''));

    const vars = step.variables;
    Object.entries(vars).forEach(([k, v]) => {
      if (v) {
        template = template.replaceAll(`[${k}]`, v).replaceAll(`{{${k}}}`, v);
      }
    });

    return template;
  };

  const handleRunChain = async () => {
    setIsRunningChain(true);
    triggerHaptic('medium');

    let previousOutput = '';

    for (let i = 0; i < chain.length; i++) {
      setActiveStepIndex(i);
      const step = chain[i];
      const compiledPrompt = compileStepText(step, previousOutput);

      if (!compiledPrompt) continue;

      // Update step status
      setChain(prev => {
        const next = [...prev];
        next[i].isStreaming = true;
        next[i].output = '';
        return next;
      });

      try {
        await new Promise<void>((resolve) => {
          streamPromptExecution(
            compiledPrompt,
            selectedModelId,
            { temperature: 0.7 },
            {
              onChunk: (_chunk, fullText) => {
                setChain(prev => {
                  const next = [...prev];
                  next[i].output = fullText;
                  return next;
                });
              },
              onComplete: (finalText) => {
                previousOutput = finalText;
                setChain(prev => {
                  const next = [...prev];
                  next[i].isStreaming = false;
                  next[i].output = finalText;
                  return next;
                });
                resolve();
              },
              onError: (err) => {
                setChain(prev => {
                  const next = [...prev];
                  next[i].isStreaming = false;
                  next[i].output = `[Error: ${err}]`;
                  return next;
                });
                resolve();
              },
            }
          );
        });
      } catch (e) {
        console.error('Step execution failed:', e);
      }
    }

    setIsRunningChain(false);
    setActiveStepIndex(null);
    triggerHaptic('success');
  };

  const handleApplyProfileToAll = (profile = activeProfile) => {
    if (!profile) return;
    const updatedChain = chain.map(step => {
      const prompt = prompts.find(p => p.id === step.promptId);
      if (prompt) {
        const { populatedVariables } = applyProfileToTemplate(prompt.template, profile, step.variables);
        return { ...step, variables: populatedVariables };
      }
      return step;
    });
    setChain(updatedChain);
    triggerHaptic('success');
  };

  const handleSaveChainToKeep = () => {
    const summary = chain
      .map((s, idx) => {
        const p = prompts.find(pr => pr.id === s.promptId);
        return `### Step ${idx + 1}: ${p?.title || 'Custom Step'}\n\n**Output:**\n${s.output || '(none)'}`;
      })
      .join('\n\n---\n\n');

    createKeepNote({
      title: `Prompt Chain Execution (${new Date().toLocaleTimeString()})`,
      body: summary,
      category: 'Tools',
      tags: ['prompt-chain', 'lab-execution'],
    });
    setSavedToKeep(true);
    triggerHaptic('success');
    setTimeout(() => setSavedToKeep(false), 2500);
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in flex flex-col min-h-full gap-4 sm:gap-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 flex items-center justify-between border border-[var(--color-neu-shadow-light)]/40">
        <div>
          <h1 className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60">Prompt Engineering Lab</h1>
          <p className="text-lg sm:text-xl font-serif italic text-[var(--color-neu-accent)] mt-0.5">Multi-Step Chain Builder</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProfilesModal(true)}
            className="neu-button p-2.5 sm:p-3 rounded-[16px] text-[var(--color-neu-accent)] cursor-pointer"
            title="Context Preset"
          >
            <Sliders size={17} />
          </button>
        </div>
      </header>

      {/* Model & Preset Controls */}
      <div className="neu-flat rounded-[20px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
            Execution Engine:
          </span>
          <select
            value={selectedModelId}
            onChange={e => setSelectedModelId(e.target.value)}
            className="neu-pressed rounded-[12px] px-3 py-1 text-xs font-semibold text-[var(--color-neu-accent)] outline-none bg-transparent"
          >
            {OPENROUTER_FREE_MODELS.map(m => (
              <option key={m.id} value={m.id} className="bg-[var(--color-neu-base)] text-[var(--color-neu-text)]">
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {activeProfile && (
          <button
            onClick={() => handleApplyProfileToAll(activeProfile)}
            className="neu-convex px-3 py-1.5 rounded-[12px] text-[11px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1 self-start sm:self-auto"
          >
            <Sparkles size={13} /> Auto-Fill With "{activeProfile.name}"
          </button>
        )}
      </div>
      
      {/* Chain Steps Container */}
      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-10">
        {chain.map((step, index) => {
          const targetPrompt = prompts.find(p => p.id === step.promptId);
          const detectedVars = targetPrompt ? extractPlaceholders(targetPrompt.template) : [];
          const isCurrentlyActive = activeStepIndex === index;

          return (
            <React.Fragment key={step.id}>
              <div className={`neu-flat rounded-[24px] p-6 transition-all ${isCurrentlyActive ? 'border border-[var(--color-neu-accent)]/50 shadow-xl' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)]">
                      Step {index + 1}
                    </span>
                    {step.isStreaming && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-green-600 animate-pulse">
                        <RefreshCw size={10} className="animate-spin" /> Streaming...
                      </span>
                    )}
                  </div>
                  {chain.length > 1 && (
                    <button
                      onClick={() => removeStep(index)}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      title="Remove step"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                {/* Template Selector */}
                <div className="neu-pressed rounded-[16px] p-2 mb-3">
                  <select 
                    className="w-full bg-transparent outline-none text-[var(--color-neu-text)] p-2.5 appearance-none text-xs font-semibold"
                    value={step.promptId}
                    onChange={(e) => handleStepPromptChange(index, e.target.value)}
                  >
                    <option value="">Select a prompt template...</option>
                    {prompts.map(p => (
                      <option key={p.id} value={p.id}>{p.category}: {p.title}</option>
                    ))}
                  </select>
                </div>

                {/* Step Variables Form */}
                {detectedVars.length > 0 && (
                  <div className="space-y-2 mt-3 pt-3 border-t border-[var(--color-neu-shadow-dark)]/20">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                      Step Parameters
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {detectedVars.map(v => (
                        <div key={v} className="neu-pressed rounded-[12px] p-2 flex flex-col">
                          <label className="text-[9px] font-mono font-bold text-[var(--color-neu-accent)]">[{v}]</label>
                          <input
                            type="text"
                            value={step.variables[v] || ''}
                            onChange={e => handleStepVarChange(index, v, e.target.value)}
                            placeholder={index > 0 && (v === 'code' || v === 'request') ? 'Piped from previous step...' : `Enter ${v}`}
                            className="bg-transparent text-xs text-[var(--color-neu-text)] outline-none font-medium"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step Live Output */}
                {step.output && (
                  <div className="mt-4 pt-3 border-t border-[var(--color-neu-shadow-dark)]/30 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                        Step Output
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(step.output || '');
                          setCopiedIndex(index);
                          triggerHaptic('light');
                          setTimeout(() => setCopiedIndex(null), 2000);
                        }}
                        className="neu-button px-2 py-1 rounded-[8px] text-[9px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1"
                      >
                        {copiedIndex === index ? <Check size={10} /> : <Copy size={10} />}
                        <span>{copiedIndex === index ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="neu-pressed rounded-[14px] p-3 text-xs font-mono text-[var(--color-neu-text)] max-h-40 overflow-y-auto no-scrollbar whitespace-pre-wrap leading-relaxed">
                      {step.output}
                    </div>
                  </div>
                )}
              </div>

              {index < chain.length - 1 && (
                <div className="flex justify-center text-[var(--color-neu-accent)] py-1 opacity-70">
                  <ArrowDown size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Chain Actions Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={addStep}
            className="neu-button flex-1 py-3.5 rounded-[20px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <Plus size={16} /> Add Chain Step
          </button>
          
          {!isRunningChain ? (
            <button 
              onClick={handleRunChain}
              className="neu-convex flex-1 py-3.5 rounded-[20px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-neu-accent)] cursor-pointer hover:shadow-lg transition-all"
            >
              <Play size={16} /> Execute Full Chain
            </button>
          ) : (
            <button 
              onClick={() => setIsRunningChain(false)}
              className="neu-button flex-1 py-3.5 rounded-[20px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 animate-neu-pulse cursor-pointer"
            >
              <Square size={16} /> Stop Chain
            </button>
          )}
        </div>

        {/* Save to Keep */}
        {chain.some(s => s.output) && (
          <div className="pt-2">
            <button
              onClick={handleSaveChainToKeep}
              className={`w-full py-3.5 rounded-[20px] text-xs font-bold uppercase tracking-wider text-[var(--color-neu-text)] flex items-center justify-center gap-2 cursor-pointer transition-all ${
                savedToKeep ? 'neu-pressed animate-neu-success text-emerald-600' : 'neu-button'
              }`}
            >
              <StickyNote size={15} className="text-[var(--color-neu-accent)]" />
              {savedToKeep ? 'Saved Full Chain to Google Keep!' : 'Save Full Chain to Google Keep Studio'}
            </button>
          </div>
        )}
      </div>

      <VariableProfilesModal
        isOpen={showProfilesModal}
        onClose={() => setShowProfilesModal(false)}
        onApplyProfile={p => handleApplyProfileToAll(p)}
      />
    </div>
  );
};
