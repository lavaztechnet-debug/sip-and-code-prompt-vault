import React, { useState, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import { TermuxBridgeConfig } from '../types';
import { pingTermuxBridge } from '../services/aiRunner';
import { triggerHaptic } from '../utils/haptics';
import { X, Terminal, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ExternalLink, Cpu, Play } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TermuxBridgeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { termuxConfig, updateTermuxConfig, openRouterKey, setOpenRouterKey } = useVault();
  const [activeTab, setActiveTab] = useState<'termux' | 'openrouter' | 'guides'>('termux');
  
  // Local Config Form State
  const [endpoint, setEndpoint] = useState(termuxConfig.endpoint);
  const [modelName, setModelName] = useState(termuxConfig.modelName);
  const [localApiKey, setLocalApiKey] = useState(termuxConfig.apiKey || '');
  const [temperature, setTemperature] = useState(termuxConfig.temperature);
  const [maxTokens, setMaxTokens] = useState(termuxConfig.maxTokens);
  
  // OpenRouter State
  const [routerKey, setRouterKey] = useState(openRouterKey);

  // Ping Test State
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{ success: boolean; latencyMs: number; error?: string } | null>(null);
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEndpoint(termuxConfig.endpoint);
      setModelName(termuxConfig.modelName);
      setLocalApiKey(termuxConfig.apiKey || '');
      setTemperature(termuxConfig.temperature);
      setMaxTokens(termuxConfig.maxTokens);
      setRouterKey(openRouterKey);
    }
  }, [isOpen, termuxConfig, openRouterKey]);

  if (!isOpen) return null;

  const handleTestPing = async () => {
    setIsPinging(true);
    triggerHaptic('selection');
    const result = await pingTermuxBridge(endpoint);
    setIsPinging(false);
    setPingResult(result);
    updateTermuxConfig({ isConnected: result.success, lastPingMs: result.latencyMs });
    triggerHaptic(result.success ? 'success' : 'light');
  };

  const handleSaveTermuxConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateTermuxConfig({
      endpoint: endpoint.trim(),
      modelName: modelName.trim() || 'default-local-model',
      apiKey: localApiKey.trim(),
      temperature,
      maxTokens,
    });
    triggerHaptic('success');
  };

  const handleSaveRouterKey = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenRouterKey(routerKey.trim());
    triggerHaptic('success');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    triggerHaptic('light');
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const llamaSetupScript = `#!/data/data/com.termux/files/usr/bin/bash
# 1-Click Termux llama.cpp Setup
pkg update -y && pkg install -y clang cmake git libopenblas curl
mkdir -p ~/local-llm && cd ~/local-llm
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build -DGGML_BLAS=ON -DGGML_BLAS_VENDOR=OpenBLAS
cmake --build build --config Release -j\$(nproc)
echo "Compilation complete! Start server with:"
echo "./build/bin/llama-server --host 0.0.0.0 --port 8080 -m ~/models/your_model.gguf -c 4096"`;

  const curlTestScript = `curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "local-model",
    "messages": [{"role": "user", "content": "Hello from Termux!"}],
    "temperature": 0.7
  }'`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="neu-flat rounded-[28px] w-full max-w-xl max-h-[90vh] flex flex-col p-6 shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[var(--color-neu-shadow-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] neu-convex flex items-center justify-center text-lg text-[var(--color-neu-accent)]">
              <Cpu size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-neu-text)]">Local LLM & Model Engine Hub</h2>
              <p className="text-[11px] text-[var(--color-neu-text-light)]">Termux on-device server & OpenRouter Free tier</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="neu-button p-2.5 rounded-full text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={() => { setActiveTab('termux'); triggerHaptic('selection'); }}
            className={`flex-1 py-2.5 rounded-[16px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'termux' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)]'
            }`}
          >
            <Terminal size={14} /> Termux Local LLM
          </button>
          <button
            onClick={() => { setActiveTab('openrouter'); triggerHaptic('selection'); }}
            className={`flex-1 py-2.5 rounded-[16px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'openrouter' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)]'
            }`}
          >
            <span>🌐</span> OpenRouter Free Tier
          </button>
          <button
            onClick={() => { setActiveTab('guides'); triggerHaptic('selection'); }}
            className={`flex-1 py-2.5 rounded-[16px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'guides' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)]'
            }`}
          >
            <span>📜</span> Termux Scripts
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
          {/* 1. TERMUX LOCAL BRIDGE */}
          {activeTab === 'termux' && (
            <form onSubmit={handleSaveTermuxConfig} className="space-y-4">
              <div className="neu-flat rounded-[20px] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${termuxConfig.isConnected ? 'bg-green-500 shadow-md shadow-green-500/50 animate-pulse' : 'bg-amber-500'}`} />
                    <span className="text-xs font-bold text-[var(--color-neu-text)]">
                      {termuxConfig.isConnected ? 'Local Bridge Active' : 'Offline / Standby'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleTestPing}
                    disabled={isPinging}
                    className="neu-button px-3 py-1.5 rounded-[12px] text-[11px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} className={isPinging ? 'animate-spin' : ''} />
                    {isPinging ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>

                {pingResult && (
                  <div className={`p-3 rounded-[14px] text-xs flex items-center gap-2 ${pingResult.success ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {pingResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>
                      {pingResult.success ? `Connected! Latency: ${pingResult.latencyMs}ms` : `Failed: ${pingResult.error}`}
                    </span>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
                    Local API Endpoint (OpenAI / llama.cpp / Ollama)
                  </label>
                  <div className="neu-pressed rounded-[14px] p-1">
                    <input
                      type="text"
                      value={endpoint}
                      onChange={e => setEndpoint(e.target.value)}
                      placeholder="http://localhost:8080/v1"
                      className="w-full bg-transparent p-2 text-xs font-mono text-[var(--color-neu-text)] outline-none"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-[var(--color-neu-text-light)] mt-1">
                    Defaults: `http://localhost:8080/v1` for llama.cpp server, `http://localhost:11434/v1` for Ollama.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
                      Model Identifier
                    </label>
                    <div className="neu-pressed rounded-[14px] p-1">
                      <input
                        type="text"
                        value={modelName}
                        onChange={e => setModelName(e.target.value)}
                        placeholder="local-model"
                        className="w-full bg-transparent p-2 text-xs font-mono text-[var(--color-neu-text)] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
                      Auth Token (Optional)
                    </label>
                    <div className="neu-pressed rounded-[14px] p-1">
                      <input
                        type="password"
                        value={localApiKey}
                        onChange={e => setLocalApiKey(e.target.value)}
                        placeholder="None required"
                        className="w-full bg-transparent p-2 text-xs text-[var(--color-neu-text)] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
                      Temperature: {temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={temperature}
                      onChange={e => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-[var(--color-neu-accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
                      Max Tokens: {maxTokens}
                    </label>
                    <input
                      type="range"
                      min="256"
                      max="8192"
                      step="256"
                      value={maxTokens}
                      onChange={e => setMaxTokens(parseInt(e.target.value, 10))}
                      className="w-full accent-[var(--color-neu-accent)]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-[20px] neu-convex text-xs font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center justify-center gap-2"
              >
                <Check size={16} /> Save Local Bridge Configuration
              </button>
            </form>
          )}

          {/* 2. OPENROUTER FREE TIER */}
          {activeTab === 'openrouter' && (
            <form onSubmit={handleSaveRouterKey} className="space-y-4">
              <div className="neu-flat rounded-[20px] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--color-neu-text)]">OpenRouter Free Tier Catalog</span>
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1 hover:underline"
                  >
                    <span>Get Free Key</span> <ExternalLink size={12} />
                  </a>
                </div>

                <p className="text-[11px] text-[var(--color-neu-text-light)] leading-relaxed">
                  Enter your OpenRouter key to stream from 100% zero-cost `:free` models (Llama 3.3 70B, Gemini 2.0 Flash Exp, DeepSeek R1 Distill, Qwen 2.5 Coder). If no key is set, the app runs simulated local responses.
                </p>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">
                    OpenRouter API Key (sk-or-v1-...)
                  </label>
                  <div className="neu-pressed rounded-[14px] p-1">
                    <input
                      type="password"
                      value={routerKey}
                      onChange={e => setRouterKey(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="w-full bg-transparent p-2 text-xs font-mono text-[var(--color-neu-text)] outline-none"
                    />
                  </div>
                </div>

                <div className="neu-pressed rounded-[14px] p-3 text-[10px] text-[var(--color-neu-text-light)] space-y-1">
                  <div className="font-bold text-[var(--color-neu-text)]">Active Free Models Supported:</div>
                  <ul className="list-disc list-inside space-y-0.5 font-mono text-[9px]">
                    <li>meta-llama/llama-3.3-70b-instruct:free ($0.00)</li>
                    <li>google/gemini-2.0-flash-exp:free ($0.00)</li>
                    <li>deepseek/deepseek-r1:free ($0.00)</li>
                    <li>qwen/qwen-2.5-coder-32b-instruct:free ($0.00)</li>
                  </ul>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-[20px] neu-convex text-xs font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center justify-center gap-2"
              >
                <Check size={16} /> Save OpenRouter API Key
              </button>
            </form>
          )}

          {/* 3. TERMUX SCRIPTS */}
          {activeTab === 'guides' && (
            <div className="space-y-4">
              <div className="neu-flat rounded-[20px] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--color-neu-text)]">llama.cpp Termux Setup Script</span>
                  <button
                    onClick={() => copyToClipboard(llamaSetupScript, 'llama')}
                    className="neu-button px-2.5 py-1 rounded-[10px] text-[10px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1"
                  >
                    {copiedScript === 'llama' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedScript === 'llama' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="neu-pressed rounded-[12px] p-2.5 max-h-36 overflow-y-auto no-scrollbar font-mono text-[9px] text-[var(--color-neu-text-light)] whitespace-pre">
                  {llamaSetupScript}
                </div>
              </div>

              <div className="neu-flat rounded-[20px] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--color-neu-text)]">Test Curl Endpoint Script</span>
                  <button
                    onClick={() => copyToClipboard(curlTestScript, 'curl')}
                    className="neu-button px-2.5 py-1 rounded-[10px] text-[10px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1"
                  >
                    {copiedScript === 'curl' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedScript === 'curl' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="neu-pressed rounded-[12px] p-2.5 max-h-36 overflow-y-auto no-scrollbar font-mono text-[9px] text-[var(--color-neu-text-light)] whitespace-pre">
                  {curlTestScript}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--color-neu-shadow-dark)]">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-[20px] neu-button text-xs font-bold text-[var(--color-neu-text-light)] uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
