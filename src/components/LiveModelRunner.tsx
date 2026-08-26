import React, { useState, useRef, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import { OPENROUTER_FREE_MODELS, streamPromptExecution } from '../services/aiRunner';
import { createKeepNote } from '../services/googleKeep';
import { triggerHaptic } from '../utils/haptics';
import { Play, Square, Copy, Check, Sparkles, Terminal, Share2, FileText, ChevronDown, RefreshCw } from 'lucide-react';

interface Props {
  promptText: string;
  defaultModelId?: string;
  onSaveAsPrompt?: (output: string) => void;
  onClose?: () => void;
}

export const LiveModelRunner: React.FC<Props> = ({ promptText, defaultModelId, onSaveAsPrompt, onClose }) => {
  const { termuxConfig, addPrompt } = useVault();
  const [selectedModelId, setSelectedModelId] = useState<string>(
    defaultModelId || (termuxConfig.isConnected ? 'local_termux_llama' : OPENROUTER_FREE_MODELS[0].id)
  );
  
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamOutput, setStreamOutput] = useState<string>('');
  const [systemPrompt, setSystemPrompt] = useState<string>('You are an expert AI software architect and systems engineer. Output clean, modular, production-ready code with actionable analysis.');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(0.7);

  // Metrics
  const [metrics, setMetrics] = useState<{ tokens: number; tps: number; elapsedMs: number }>({
    tokens: 0,
    tps: 0,
    elapsedMs: 0,
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [savedToKeep, setSavedToKeep] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const outputContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [streamOutput]);

  const handleStartStream = async () => {
    if (!promptText.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsStreaming(true);
    setStreamOutput('');
    setMetrics({ tokens: 0, tps: 0, elapsedMs: 0 });
    setSavedToKeep(false);
    triggerHaptic('light');

    try {
      await streamPromptExecution(
        promptText,
        selectedModelId,
        {
          systemPrompt: systemPrompt.trim() || undefined,
          temperature,
          abortSignal: abortController.signal,
        },
        {
          onChunk: (_chunk, fullText) => {
            setStreamOutput(fullText);
          },
          onMetrics: (m) => {
            setMetrics(m);
          },
          onComplete: (finalText) => {
            setStreamOutput(finalText);
            setIsStreaming(false);
            triggerHaptic('success');
          },
          onError: (err) => {
            console.error('Stream error:', err);
            setStreamOutput(prev => prev + `\n\n[Execution Error: ${err}]`);
            setIsStreaming(false);
          },
        }
      );
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setStreamOutput(`[Stream Aborted / Failed: ${e.message}]`);
      }
      setIsStreaming(false);
    }
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    triggerHaptic('light');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(streamOutput || promptText);
    setCopied(true);
    triggerHaptic('light');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToGoogleKeep = () => {
    if (!streamOutput) return;
    createKeepNote({
      title: `AI Execution: ${new Date().toLocaleTimeString()}`,
      body: `PROMPT INVOCATION:\n${promptText}\n\nRESPONSE:\n${streamOutput}`,
      category: 'Tools',
      tags: ['AI Stream', selectedModelId],
    });
    setSavedToKeep(true);
    triggerHaptic('success');
    setTimeout(() => setSavedToKeep(false), 2500);
  };

  const handleCreatePromptFromOutput = () => {
    if (!streamOutput) return;
    addPrompt({
      id: `custom-${Date.now()}`,
      title: `Synthesized Output (${new Date().toLocaleTimeString()})`,
      category: 'Tools',
      tags: ['ai-stream', 'custom-output'],
      template: streamOutput,
      example: promptText,
      notes: `Generated via live streaming model: ${selectedModelId}`,
    });
    triggerHaptic('success');
    alert('Saved as custom template in Master Vault!');
  };

  return (
    <div className="neu-flat rounded-[24px] p-5 space-y-4 shadow-xl border border-[var(--color-neu-accent)]/20 animate-fade-in">
      {/* Header & Model Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-neu-shadow-dark)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] neu-convex flex items-center justify-center text-[var(--color-neu-accent)]">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[var(--color-neu-text)]">Live Model Playground & Token Streamer</h3>
            <p className="text-[10px] text-[var(--color-neu-text-light)]">Stream completions with zero-cost models & Termux</p>
          </div>
        </div>

        {/* Model Picker Dropdown */}
        <div className="neu-pressed rounded-[14px] px-3 py-1.5 flex items-center gap-2">
          <select
            value={selectedModelId}
            onChange={e => {
              setSelectedModelId(e.target.value);
              triggerHaptic('selection');
            }}
            disabled={isStreaming}
            className="bg-transparent text-xs font-semibold text-[var(--color-neu-accent)] outline-none cursor-pointer max-w-[220px] truncate"
          >
            {OPENROUTER_FREE_MODELS.map(m => (
              <option key={m.id} value={m.id} className="bg-[var(--color-neu-base)] text-[var(--color-neu-text)]">
                {m.provider === 'local_termux' ? '⚡ [Termux]' : '🌐'} {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Toggle */}
      <div className="flex justify-between items-center text-[10px] text-[var(--color-neu-text-light)]">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 font-bold text-[var(--color-neu-accent)] hover:underline"
        >
          <ChevronDown size={12} className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          <span>{showAdvanced ? 'Hide Parameters' : 'System Prompt & Temperature'}</span>
        </button>

        {metrics.tokens > 0 && (
          <div className="flex items-center gap-3 font-mono text-[9px]">
            <span>Tokens: <strong className="text-[var(--color-neu-text)]">{metrics.tokens}</strong></span>
            <span>Speed: <strong className="text-[var(--color-neu-accent)]">{metrics.tps} TPS</strong></span>
            <span>Time: <strong>{metrics.elapsedMs}ms</strong></span>
          </div>
        )}
      </div>

      {/* Advanced Options Accordion */}
      {showAdvanced && (
        <div className="neu-pressed rounded-[16px] p-3 space-y-3 animate-fade-in text-xs">
          <div>
            <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
              System Instruction
            </label>
            <textarea
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              rows={2}
              className="w-full bg-transparent p-2 text-xs font-mono text-[var(--color-neu-text)] outline-none rounded-[10px] resize-none"
              placeholder="System prompt override..."
            />
          </div>
          <div>
            <div className="flex justify-between text-[9px] font-bold text-[var(--color-neu-text-light)] uppercase tracking-wider mb-1">
              <span>Temperature</span>
              <span>{temperature}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.4"
              step="0.05"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[var(--color-neu-accent)]"
            />
          </div>
        </div>
      )}

      {/* Streaming Output Canvas */}
      <div 
        ref={outputContainerRef}
        className="neu-pressed rounded-[18px] p-4 min-h-[160px] max-h-[300px] overflow-y-auto no-scrollbar font-mono text-xs text-[var(--color-neu-text)] relative leading-relaxed whitespace-pre-wrap selection:bg-[var(--color-neu-accent)]/20"
      >
        {streamOutput ? (
          <>
            {streamOutput}
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-[var(--color-neu-accent)] animate-pulse align-middle" />
            )}
          </>
        ) : (
          <span className="text-[var(--color-neu-text-light)] opacity-60 italic">
            Click "Stream Test" below to invoke the active model and observe real-time token streaming...
          </span>
        )}
      </div>

      {/* Controls and Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        {/* Play / Stop Button */}
        <div className="flex items-center gap-2">
          {!isStreaming ? (
            <button
              onClick={handleStartStream}
              disabled={!promptText.trim()}
              className="neu-convex px-4 py-2.5 rounded-[16px] text-xs font-bold text-[var(--color-neu-accent)] uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
            >
              <Play size={14} className="fill-[var(--color-neu-accent)]" /> Stream Test
            </button>
          ) : (
            <button
              onClick={handleStopStream}
              className="neu-button px-4 py-2.5 rounded-[16px] text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2"
            >
              <Square size={14} className="fill-red-500" /> Stop
            </button>
          )}

          {isStreaming && (
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-neu-text-light)]">
              <RefreshCw size={12} className="animate-spin text-[var(--color-neu-accent)]" />
              <span>Generating...</span>
            </div>
          )}
        </div>

        {/* Action Buttons for Stream Output */}
        {streamOutput && !isStreaming && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`p-2.5 rounded-[12px] text-xs flex items-center gap-1 cursor-pointer transition-all ${
                copied ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
              }`}
              title="Copy output"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span className="text-[10px] font-bold">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSaveToGoogleKeep}
              className={`p-2.5 rounded-[12px] text-xs flex items-center gap-1 cursor-pointer transition-all ${
                savedToKeep ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
              }`}
              title="Save to Google Keep note"
            >
              <FileText size={14} className={savedToKeep ? 'text-emerald-600' : ''} />
              <span className="text-[10px] font-bold">{savedToKeep ? 'Saved' : 'Keep'}</span>
            </button>

            <button
              onClick={handleCreatePromptFromOutput}
              className="neu-button p-2.5 rounded-[12px] text-[var(--color-neu-accent)] text-xs flex items-center gap-1 cursor-pointer hover:shadow-md transition-all"
              title="Save as custom template in Vault"
            >
              <Sparkles size={14} />
              <span className="text-[10px] font-bold">Fork Template</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
