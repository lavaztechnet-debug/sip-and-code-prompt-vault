import React, { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import { Prompt } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { extractVariables } from '../utils/parser';
import { streamPromptExecution, OPENROUTER_FREE_MODELS } from '../services/aiRunner';
import { 
  Sparkles, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  FileCode, 
  Brain, 
  ArrowRight, 
  Copy, 
  Check, 
  Save, 
  Play, 
  RefreshCw, 
  Sliders, 
  DollarSign, 
  TrendingDown, 
  Layers, 
  Eye, 
  ChevronDown,
  BookOpen,
  Send
} from 'lucide-react';

type OptimizationMode = 'compression' | 'xml_guardrails' | 'few_shot' | 'reasoning';

interface ModelPricing {
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
  badge?: string;
  isFree?: boolean;
}

const MODEL_PRICINGS: ModelPricing[] = [
  { name: 'OpenRouter Free Tier (Llama 3.1 8B)', provider: 'OpenRouter', inputPerMillion: 0, outputPerMillion: 0, badge: 'Zero Cost', isFree: true },
  { name: 'Gemini 2.5 Flash', provider: 'Google', inputPerMillion: 0.075, outputPerMillion: 0.30, badge: 'Fastest' },
  { name: 'DeepSeek V3 / R1', provider: 'DeepSeek', inputPerMillion: 0.55, outputPerMillion: 2.19, badge: 'High ROI' },
  { name: 'GPT-4o Mini', provider: 'OpenAI', inputPerMillion: 0.15, outputPerMillion: 0.60, badge: 'Standard' },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', inputPerMillion: 3.00, outputPerMillion: 15.00, badge: 'Flagship' },
  { name: 'GPT-4o', provider: 'OpenAI', inputPerMillion: 2.50, outputPerMillion: 10.00, badge: 'Flagship' },
];

export const OptimizerScreen: React.FC = () => {
  const { prompts, activePrompt, setActivePrompt, addPrompt, setCurrentScreen } = useVault();
  
  const [selectedPromptId, setSelectedPromptId] = useState<string>(activePrompt?.id || prompts[0]?.id || '');
  const [originalText, setOriginalText] = useState<string>(activePrompt?.template || prompts[0]?.template || '');
  const [optimizedText, setOptimizedText] = useState<string>('');
  const [mode, setMode] = useState<OptimizationMode>('compression');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [callVolume, setCallVolume] = useState<number>(10000);
  const [testOutput, setTestOutput] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'diff' | 'tokenomics' | 'test'>('diff');

  // Load active prompt if changed
  useEffect(() => {
    if (activePrompt) {
      setSelectedPromptId(activePrompt.id);
      setOriginalText(activePrompt.template);
      generateOptimization(activePrompt.template, mode);
    } else if (prompts.length > 0 && !originalText) {
      setSelectedPromptId(prompts[0].id);
      setOriginalText(prompts[0].template);
      generateOptimization(prompts[0].template, mode);
    }
  }, [activePrompt]);

  // Handle prompt selector
  const handleSelectPrompt = (id: string) => {
    const found = prompts.find(p => p.id === id);
    if (found) {
      setSelectedPromptId(found.id);
      setOriginalText(found.template);
      setActivePrompt(found);
      generateOptimization(found.template, mode);
      triggerHaptic('light');
    }
  };

  // Rule-based and semantic prompt optimization generator
  const generateOptimization = (input: string, optMode: OptimizationMode) => {
    if (!input.trim()) {
      setOptimizedText('');
      return;
    }

    setIsOptimizing(true);

    setTimeout(() => {
      let result = '';
      const lines = input.split('\n').map(l => l.trim()).filter(Boolean);
      const titleLine = lines[0] || 'Task';
      const variables = extractVariables(input);

      switch (optMode) {
        case 'compression': {
          // Token compression: removes fluff, compacts structures, uses imperative syntax
          let compressed = input
            .replace(/\b(please|kindly|you must make sure to|make sure that you|i would like you to|in this task you will|your job is to)\b/gi, '')
            .replace(/\b(in order to|as a matter of fact|it is important to note that)\b/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

          const bullets = lines.filter(l => l.startsWith('-') || l.startsWith('*') || l.match(/^\d+\./));
          if (bullets.length > 0) {
            result = `Role: Specialized Expert\nDirective: ${titleLine.replace(/^#*\s*/, '')}\n\nConstraints:\n` +
              bullets.map(b => b.replace(/^[-*•\d.]\s*/, '• ')).join('\n') +
              (variables.length > 0 ? `\n\nParameters:\n${variables.map(v => `• [${v}]`).join('\n')}` : '') +
              `\n\nOutput: Strictly deliver verified, concise production code/content with zero preamble.`;
          } else {
            result = `Role: Specialized Assistant\nTask: ${compressed}\n\nRules:\n• Direct execution only\n• High fidelity, zero fluff\n• Retain all exact parameters.`;
          }
          break;
        }

        case 'xml_guardrails': {
          // XML Guardrails & Enterprise Structure
          const varsXml = variables.length > 0 
            ? `  <parameters>\n${variables.map(v => `    <param name="${v}">[${v}]</param>`).join('\n')}\n  </parameters>\n` 
            : '';

          result = `<system_role>\nYou are an elite, production-grade AI system. Adhere strictly to the execution envelope.\n</system_role>\n\n<context>\n${input.slice(0, 300)}...\n</context>\n\n${varsXml}<rules>\n  1. Output ONLY requested deliverables with zero boilerplate or pleasantries.\n  2. Validate all internal edge cases, syntax, and logic prior to emission.\n  3. If parameters are ambiguous, request clarification before executing.\n</rules>\n\n<negative_constraints>\n  - DO NOT output conversational filler ("Sure!", "Here is...").\n  - DO NOT omit necessary type signatures or implementation steps.\n</negative_constraints>\n\n<output_format>\nMarkdown with explicit, copyable codeblocks and highlighted parameters.\n</output_format>`;
          break;
        }

        case 'few_shot': {
          // Few-Shot Demonstration & Concrete Grounding
          result = `# ROLE & OBJECTIVE\nExecute the following directive with high precision:\n${input}\n\n## INPUT PARAMETERS\n${variables.map(v => `- \`${v}\`: [${v}]`).join('\n') || '- None'}\n\n## EXAMPLE 1 (Demonstration)\n**Input:**\nScenario: High-priority production deployment\nTarget: [CONFIG_KEY] -> "ENABLED"\n\n**Output:**\n\`\`\`json\n{\n  "status": "success",\n  "audit_trail": true,\n  "payload": {\n    "environment": "production",\n    "decision": "approved"\n  }\n}\n\`\`\`\n\n## ACTIVE EXECUTION\nProcess provided parameters and emit identical high-fidelity standard.`;
          break;
        }

        case 'reasoning': {
          // Chain-of-Thought & Reasoning Hardener
          result = `You are a deep-reasoning specialist. Think through this problem methodically before answering.\n\nDirective:\n${input}\n\nExecution Framework:\n<thinking>\n1. Deconstruct the primary requirements and potential edge cases.\n2. Formulate 2-3 architectural approaches, weighing trade-offs.\n3. Validate the solution against constraints (${variables.join(', ') || 'none'}).\n4. Synthesize the final optimal deliverable.\n</thinking>\n\n<final_output>\n[Provide the complete, pristine solution here with zero markdown flaws]\n</final_output>`;
          break;
        }
      }

      setOptimizedText(result);
      setIsOptimizing(false);
      triggerHaptic('light');
    }, 200);
  };

  const handleModeChange = (newMode: OptimizationMode) => {
    setMode(newMode);
    generateOptimization(originalText, newMode);
    triggerHaptic('medium');
  };

  // Metrics Calculations
  const origTokens = Math.ceil(originalText.length / 4);
  const optTokens = Math.ceil(optimizedText.length / 4);
  const tokenDelta = optTokens - origTokens;
  const tokenPercent = origTokens > 0 ? Math.round(((optTokens - origTokens) / origTokens) * 100) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedText);
    setCopied(true);
    triggerHaptic('success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveAsCustomPrompt = () => {
    const newPrompt: Prompt = {
      id: `opt-${Date.now().toString().slice(-4)}`,
      title: `Optimized: ${prompts.find(p => p.id === selectedPromptId)?.title || 'Custom Prompt'}`,
      category: 'Prompt Engineering',
      tags: ['optimized', mode, 'refactored'],
      template: optimizedText,
      example: 'Example generated from optimizer studio.',
      notes: `Refactored with ${mode} optimization engine. Saved ~${Math.abs(tokenDelta)} tokens (${tokenPercent}%).`,
      isFavorite: true,
    };

    addPrompt(newPrompt);
    setSavedSuccess(true);
    triggerHaptic('success');
    setTimeout(() => setSavedSuccess(null as any), 2500);
  };

  const handleRunLiveTest = async () => {
    if (!optimizedText.trim()) return;
    setIsTesting(true);
    setTestOutput('');
    setActiveTab('test');
    triggerHaptic('medium');

    const defaultModel = OPENROUTER_FREE_MODELS[0]?.id || 'meta-llama/llama-3.3-70b-instruct:free';

    try {
      await streamPromptExecution(
        optimizedText,
        defaultModel,
        {
          systemPrompt: 'You are a precise, production-grade AI assistant. Follow all instructions and delimiters accurately.',
          temperature: 0.3,
          maxTokens: 1024,
        },
        {
          onChunk: (_chunk, fullText) => {
            setTestOutput(fullText);
          },
          onComplete: (fullText) => {
            setTestOutput(fullText);
            setIsTesting(false);
            triggerHaptic('success');
          },
          onError: (err) => {
            setTestOutput(`Error running test: ${err || 'Check network connection'}`);
            setIsTesting(false);
            triggerHaptic('error');
          }
        }
      );
    } catch (err: any) {
      setTestOutput(`Error running test: ${err.message || 'Check network connection'}`);
      setIsTesting(false);
      triggerHaptic('error');
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in h-full flex flex-col gap-4 sm:gap-5">
      
      {/* Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col justify-between border border-[var(--color-neu-shadow-light)]/40 gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl neu-pressed text-[var(--color-neu-accent)]">
              <Sparkles size={18} />
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-bold leading-tight">Prompt Refiner & Tokenomics Studio</h1>
              <p className="text-[10px] sm:text-[11px] text-[var(--color-neu-text-light)]">
                Algorithmic compression, enterprise XML guardrails & live cost ROI
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentScreen('lab');
              triggerHaptic('light');
            }}
            className="neu-button px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer flex items-center gap-1 shrink-0"
          >
            <BookOpen size={12} />
            <span className="hidden sm:inline">Open in Notepad</span>
          </button>
        </div>

        {/* Prompt Selector Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={selectedPromptId}
              onChange={(e) => handleSelectPrompt(e.target.value)}
              className="w-full appearance-none neu-pressed rounded-xl px-3 py-2 text-xs font-semibold bg-transparent text-[var(--color-neu-text)] outline-none cursor-pointer pr-8"
            >
              {prompts.map(p => (
                <option key={p.id} value={p.id} className="bg-[var(--color-neu-bg)] text-[var(--color-neu-text)]">
                  [{p.category}] {p.title} ({Math.ceil(p.template.length / 4)} tokens)
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-neu-text-light)] pointer-events-none" />
          </div>

          <button
            onClick={() => generateOptimization(originalText, mode)}
            disabled={isOptimizing}
            className="neu-button p-2.5 rounded-xl text-[var(--color-neu-accent)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Re-run Optimization"
          >
            <RefreshCw size={14} className={isOptimizing ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      {/* Mode Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => handleModeChange('compression')}
          className={`p-2.5 rounded-2xl flex flex-col items-start gap-1 cursor-pointer transition-all ${
            mode === 'compression'
              ? 'neu-pressed text-[var(--color-neu-accent)] font-bold'
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Zap size={14} className="text-amber-500" />
            <span className="font-bold">Token Pruner</span>
          </div>
          <span className="text-[9.5px] opacity-70 leading-tight text-left">
            Strips filler, cuts 30-50% cost
          </span>
        </button>

        <button
          onClick={() => handleModeChange('xml_guardrails')}
          className={`p-2.5 rounded-2xl flex flex-col items-start gap-1 cursor-pointer transition-all ${
            mode === 'xml_guardrails'
              ? 'neu-pressed text-[var(--color-neu-accent)] font-bold'
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="font-bold">XML Guardrails</span>
          </div>
          <span className="text-[9.5px] opacity-70 leading-tight text-left">
            Hardened schema & delimiters
          </span>
        </button>

        <button
          onClick={() => handleModeChange('few_shot')}
          className={`p-2.5 rounded-2xl flex flex-col items-start gap-1 cursor-pointer transition-all ${
            mode === 'few_shot'
              ? 'neu-pressed text-[var(--color-neu-accent)] font-bold'
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <FileCode size={14} className="text-cyan-500" />
            <span className="font-bold">Few-Shot Base</span>
          </div>
          <span className="text-[9.5px] opacity-70 leading-tight text-left">
            Concrete I/O demonstrations
          </span>
        </button>

        <button
          onClick={() => handleModeChange('reasoning')}
          className={`p-2.5 rounded-2xl flex flex-col items-start gap-1 cursor-pointer transition-all ${
            mode === 'reasoning'
              ? 'neu-pressed text-[var(--color-neu-accent)] font-bold'
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Brain size={14} className="text-purple-500" />
            <span className="font-bold">Reasoning CoT</span>
          </div>
          <span className="text-[9.5px] opacity-70 leading-tight text-left">
            Step-by-step scratchpad
          </span>
        </button>
      </div>

      {/* Main Studio View with Tabs */}
      <div className="neu-flat rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex-1 flex flex-col gap-3 overflow-hidden border border-[var(--color-neu-shadow-light)]/40 shadow-xl">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[var(--color-neu-shadow-dark)]/20 pb-2.5">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab('diff');
                triggerHaptic('light');
              }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all ${
                activeTab === 'diff'
                  ? 'neu-pressed text-[var(--color-neu-accent)]'
                  : 'neu-button text-[var(--color-neu-text-light)]'
              }`}
            >
              <Eye size={12} />
              <span>Diff & Editor</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('tokenomics');
                triggerHaptic('light');
              }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all ${
                activeTab === 'tokenomics'
                  ? 'neu-pressed text-[var(--color-neu-accent)]'
                  : 'neu-button text-[var(--color-neu-text-light)]'
              }`}
            >
              <DollarSign size={12} />
              <span>Tokenomics & ROI</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('test');
                triggerHaptic('light');
              }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all ${
                activeTab === 'test'
                  ? 'neu-pressed text-[var(--color-neu-accent)]'
                  : 'neu-button text-[var(--color-neu-text-light)]'
              }`}
            >
              <Play size={12} />
              <span>Live Test</span>
              {testOutput && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold ${
              tokenDelta <= 0 ? 'neu-pressed text-emerald-600' : 'neu-pressed text-amber-600'
            }`}>
              {tokenDelta <= 0 ? `↓ ${Math.abs(tokenPercent)}% Tokens` : `↑ +${tokenPercent}% Guardrails`}
            </span>
          </div>
        </div>

        {/* Tab 1: Diff & Editor View */}
        {activeTab === 'diff' && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto no-scrollbar">
            {/* Original Box */}
            <div className="flex flex-col gap-1.5 min-h-[160px]">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[var(--color-neu-text-light)]">
                <span>Original Prompt</span>
                <span className="font-mono">{origTokens} tokens ({originalText.length} chars)</span>
              </div>
              <textarea
                value={originalText}
                onChange={(e) => {
                  setOriginalText(e.target.value);
                  generateOptimization(e.target.value, mode);
                }}
                placeholder="Type or paste prompt template here..."
                className="flex-1 w-full neu-pressed rounded-2xl p-3 text-[11px] sm:text-xs font-mono bg-transparent text-[var(--color-neu-text)] outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Optimized Output Box */}
            <div className="flex flex-col gap-1.5 min-h-[160px]">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[var(--color-neu-accent)]">
                <span className="flex items-center gap-1">
                  <Sparkles size={11} /> Optimized Directive
                </span>
                <span className="font-mono">{optTokens} tokens ({optTokens < origTokens ? `${origTokens - optTokens} saved` : 'structured'})</span>
              </div>
              <textarea
                value={optimizedText}
                onChange={(e) => setOptimizedText(e.target.value)}
                placeholder="Optimized result..."
                className="flex-1 w-full neu-pressed rounded-2xl p-3 text-[11px] sm:text-xs font-mono bg-transparent text-[var(--color-neu-text)] outline-none resize-none leading-relaxed border border-[var(--color-neu-accent)]/20"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Tokenomics & ROI Calculator */}
        {activeTab === 'tokenomics' && (
          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
            {/* Call Volume Slider */}
            <div className="neu-pressed rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--color-neu-text)] flex items-center gap-1.5">
                  <Layers size={14} className="text-[var(--color-neu-accent)]" />
                  Monthly Invocation Volume:
                </label>
                <span className="text-xs font-mono font-bold text-[var(--color-neu-accent)]">
                  {callVolume.toLocaleString()} calls/mo
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="5000"
                value={callVolume}
                onChange={(e) => setCallVolume(Number(e.target.value))}
                className="w-full accent-[var(--color-neu-accent)] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-[var(--color-neu-text-light)]">
                <span>1k/mo (Hobby)</span>
                <span>100k/mo (Production)</span>
                <span>500k/mo (Enterprise)</span>
              </div>
            </div>

            {/* Pricing Matrix */}
            <div className="space-y-2">
              <h3 className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                Multi-Model Cost Comparison & Optimization Savings
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MODEL_PRICINGS.map(m => {
                  const origMonthlyCost = (origTokens * callVolume * m.inputPerMillion) / 1000000;
                  const optMonthlyCost = (optTokens * callVolume * m.inputPerMillion) / 1000000;
                  const savings = origMonthlyCost - optMonthlyCost;

                  return (
                    <div key={m.name} className="neu-pressed rounded-2xl p-3 flex flex-col justify-between gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-[var(--color-neu-text-light)] block">
                            {m.provider}
                          </span>
                          <span className="text-xs font-bold text-[var(--color-neu-text)]">
                            {m.name}
                          </span>
                        </div>
                        {m.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold ${
                            m.isFree ? 'neu-flat text-emerald-600' : 'neu-flat text-[var(--color-neu-accent)]'
                          }`}>
                            {m.badge}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-[var(--color-neu-shadow-dark)]/20 text-center font-mono">
                        <div>
                          <span className="text-[8.5px] text-[var(--color-neu-text-light)] block">Original</span>
                          <span className="text-[11px] font-bold">${origMonthlyCost.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[8.5px] text-[var(--color-neu-text-light)] block">Optimized</span>
                          <span className="text-[11px] font-bold text-[var(--color-neu-accent)]">${optMonthlyCost.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[8.5px] text-emerald-600 font-bold block">Saved / Mo</span>
                          <span className="text-[11px] font-bold text-emerald-600">
                            {savings >= 0 ? `-$${savings.toFixed(2)}` : `+$${Math.abs(savings).toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Live Test Runner */}
        {activeTab === 'test' && (
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-neu-text)] flex items-center gap-1.5">
                <Play size={13} className="text-[var(--color-neu-accent)]" />
                Live Assistant Execution Test
              </span>
              <button
                onClick={handleRunLiveTest}
                disabled={isTesting || !optimizedText.trim()}
                className="neu-convex px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send size={11} />
                <span>{isTesting ? 'Generating...' : 'Execute Optimized Prompt'}</span>
              </button>
            </div>

            <div className="flex-1 neu-pressed rounded-2xl p-3.5 overflow-y-auto min-h-[180px]">
              {isTesting ? (
                <div className="flex items-center justify-center h-full gap-2 text-xs font-mono text-[var(--color-neu-accent)] animate-pulse">
                  <Sparkles size={16} className="animate-spin" />
                  <span>Streaming model evaluation response...</span>
                </div>
              ) : testOutput ? (
                <pre className="text-xs font-mono text-[var(--color-neu-text)] whitespace-pre-wrap leading-relaxed">
                  {testOutput}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-xs text-[var(--color-neu-text-light)]">
                  <p>Click "Execute Optimized Prompt" to test this refined template with the AI Runner.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="pt-2 border-t border-[var(--color-neu-shadow-dark)]/30 flex items-center justify-between gap-2">
          <div className="text-[10px] font-mono text-[var(--color-neu-text-light)] truncate">
            {savedSuccess ? (
              <span className="text-emerald-600 font-bold">✓ Saved to Master Vault!</span>
            ) : (
              <span>Tokens: {origTokens} → {optTokens} ({tokenPercent}%)</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="neu-button px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-[var(--color-neu-text)] cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSaveAsCustomPrompt}
              className="neu-button px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-[var(--color-neu-text)] hover:text-[var(--color-neu-accent)] cursor-pointer"
              title="Save to Master Vault"
            >
              <Save size={12} />
              <span>Save to Vault</span>
            </button>

            <button
              onClick={handleRunLiveTest}
              className="neu-convex px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1 cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <Play size={12} />
              <span>Test AI</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
