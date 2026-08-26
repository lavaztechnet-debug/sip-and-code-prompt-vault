import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { pingTermuxBridge } from '../services/aiRunner';
import { TermuxBridgeModal } from '../components/TermuxBridgeModal';
import { BulkExportModal } from '../components/BulkExportModal';
import { SipCodeEmblem } from '../components/SipCodeEmblem';
import { Terminal, Download, Share2, Copy, Check, RefreshCw, Cpu, Code2, ShieldCheck, Zap, FileJson, Layers } from 'lucide-react';

export const DeploymentScreen: React.FC = () => {
  const { prompts, profiles, termuxConfig, updateTermuxConfig } = useVault();
  const [activeScriptTab, setActiveScriptTab] = useState<'vault_export' | 'llm_server' | 'zero_gradle'>('vault_export');
  const [copied, setCopied] = useState<boolean>(false);
  const [showTermuxModal, setShowTermuxModal] = useState<boolean>(false);
  const [showBulkExportModal, setShowBulkExportModal] = useState<boolean>(false);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const handleTestPing = async () => {
    setIsPinging(true);
    triggerHaptic('selection');
    const res = await pingTermuxBridge(termuxConfig.endpoint);
    setIsPinging(false);
    updateTermuxConfig({ isConnected: res.success, lastPingMs: res.latencyMs });
    triggerHaptic(res.success ? 'success' : 'light');
  };

  const getVaultExportScript = () => {
    return `#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# PROMPT VAULT - TERMUX NATIVE DEPLOYMENT & SYNC ENGINE
# Generated: ${new Date().toISOString()}
# Prompts: ${prompts.length} | Profiles: ${profiles.length}
# ==============================================================================

set -e
echo "🚀 Initializing Prompt Vault in Termux environment..."

VAULT_DIR="$HOME/prompt-vault"
mkdir -p "$VAULT_DIR/data" "$VAULT_DIR/profiles" "$VAULT_DIR/scripts"

# 1. Exporting Master Vault Prompts JSON
cat << 'JSON_PROMPTS' > "$VAULT_DIR/data/prompts.json"
${JSON.stringify(prompts, null, 2)}
JSON_PROMPTS

# 2. Exporting Reusable Variable Profiles
cat << 'JSON_PROFILES' > "$VAULT_DIR/profiles/variable_presets.json"
${JSON.stringify(profiles, null, 2)}
JSON_PROFILES

echo "✅ Successfully synced ${prompts.length} prompts and ${profiles.length} variable presets to $VAULT_DIR"
echo "📂 Run 'cd ~/prompt-vault && ls -la' to inspect."
`;
  };

  const getLLMServerScript = () => {
    return `#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# TERMUX LOCAL LLM SERVER (llama.cpp ARM64 NEON)
# Target Endpoint: ${termuxConfig.endpoint}
# Model: ${termuxConfig.modelName}
# ==============================================================================

set -e
echo "⚡ Starting on-device LLM bootstrap..."

# 1. Install toolchain
pkg update -y
pkg install -y clang cmake git libopenblas curl jq

# 2. Clone and build llama.cpp with ARM NEON acceleration
mkdir -p ~/local-llm && cd ~/local-llm
if [ ! -d "llama.cpp" ]; then
    git clone https://github.com/ggerganov/llama.cpp
fi
cd llama.cpp
cmake -B build -DGGML_BLAS=ON -DGGML_BLAS_VENDOR=OpenBLAS
cmake --build build --config Release -j$(nproc)

# 3. Launch Local Server with Wake-Lock
termux-wake-lock 2>/dev/null || true
echo "🚀 Launching OpenAI-compatible local server on port 8080..."
./build/bin/llama-server --host 0.0.0.0 --port 8080 -m ~/models/qwen2.5-coder.gguf -c 4096 -t 6
`;
  };

  const getZeroGradleScript = () => {
    return `#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# TERMUX ZERO-GRADLE KOTLIN COMPILER PIPELINE (Android 16 API 36)
# ==============================================================================

set -e
echo "🔨 Compiling standalone Android APK without Gradle..."

ANDROID_JAR="/data/data/com.termux/files/usr/share/java/android.jar"
SRC_DIR="./src"
BUILD_DIR="./build"
mkdir -p "$BUILD_DIR/obj" "$BUILD_DIR/bin"

# 1. Compile Resources with AAPT2
aapt2 compile --dir res -o "$BUILD_DIR/compiled_res.zip"
aapt2 link -I "$ANDROID_JAR" --manifest AndroidManifest.xml -o "$BUILD_DIR/app-unsigned.apk" --java "$SRC_DIR" "$BUILD_DIR/compiled_res.zip"

# 2. Compile Kotlin Sources with kotlinc CLI
kotlinc -cp "$ANDROID_JAR" $(find $SRC_DIR -name "*.kt") -d "$BUILD_DIR/obj"

# 3. Convert Bytecode to Dalvik Executable (D8)
d8 --min-api 26 --output "$BUILD_DIR/bin" $(find $BUILD_DIR/obj -name "*.class")

# 4. Pack into APK, Align & Sign
cd "$BUILD_DIR/bin" && zip -u ../app-unsigned.apk classes.dex && cd ../..
zipalign -v -p 4 "$BUILD_DIR/app-unsigned.apk" "$BUILD_DIR/app-aligned.apk"
apksigner sign --ks ~/.android/debug.keystore --ks-pass pass:android "$BUILD_DIR/app-aligned.apk"

echo "🎉 Standalone APK built: $BUILD_DIR/app-aligned.apk"
`;
  };

  const getActiveScript = () => {
    switch (activeScriptTab) {
      case 'llm_server': return getLLMServerScript();
      case 'zero_gradle': return getZeroGradleScript();
      default: return getVaultExportScript();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveScript());
    setCopied(true);
    triggerHaptic('success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const scriptText = getActiveScript();
    const blob = new Blob([scriptText], { type: 'text/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeScriptTab === 'llm_server' ? 'termux-llama-server.sh' : (activeScriptTab === 'zero_gradle' ? 'build-zero-gradle.sh' : 'prompt-vault-sync.sh');
    a.click();
    URL.revokeObjectURL(url);
    triggerHaptic('success');
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in h-full flex flex-col gap-4 sm:gap-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 flex items-center justify-between border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex items-center gap-3">
          <SipCodeEmblem size="sm" withGlow className="shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">On-Device Subsystem</span>
            </div>
            <h1 className="text-base sm:text-lg font-serif italic text-[var(--color-neu-text)] mt-0.5 truncate">Termux &amp; LLM Deployment</h1>
            <p className="text-[9.5px] sm:text-[10px] text-[var(--color-neu-text-light)] truncate">Zero-Gradle Pipelines &amp; Exporters</p>
          </div>
        </div>
        <button
          onClick={() => setShowTermuxModal(true)}
          className="neu-button p-2.5 sm:p-3 rounded-[16px] text-[var(--color-neu-accent)] cursor-pointer shrink-0"
          title="Configure Bridge"
        >
          <Terminal size={17} />
        </button>
      </header>

      {/* Local Bridge Status Card */}
      <div className="neu-flat rounded-[24px] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${termuxConfig.isConnected ? 'bg-green-500 shadow-md shadow-green-500/50 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <span className="text-xs font-bold text-[var(--color-neu-text)]">
                Local Termux Bridge: {termuxConfig.isConnected ? 'Connected' : 'Standby / Localhost'}
              </span>
              <p className="text-[10px] font-mono text-[var(--color-neu-text-light)]">{termuxConfig.endpoint}</p>
            </div>
          </div>
          <button
            onClick={handleTestPing}
            disabled={isPinging}
            className="neu-button px-3 py-1.5 rounded-[12px] text-[11px] font-bold text-[var(--color-neu-accent)] flex items-center gap-1.5"
          >
            <RefreshCw size={13} className={isPinging ? 'animate-spin' : ''} />
            {isPinging ? 'Pinging...' : 'Ping Bridge'}
          </button>
        </div>

        {termuxConfig.lastPingMs !== undefined && (
          <div className="text-[10px] font-mono text-[var(--color-neu-text-light)]">
            Last ping response: <strong className="text-[var(--color-neu-accent)]">{termuxConfig.lastPingMs}ms</strong>
          </div>
        )}
      </div>

      {/* Script Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => { setActiveScriptTab('vault_export'); triggerHaptic('selection'); }}
          className={`flex-1 py-2.5 rounded-[16px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeScriptTab === 'vault_export' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)]'
          }`}
        >
          <Download size={14} /> Vault Sync
        </button>
        <button
          onClick={() => { setActiveScriptTab('llm_server'); triggerHaptic('selection'); }}
          className={`flex-1 py-2.5 rounded-[16px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeScriptTab === 'llm_server' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)]'
          }`}
        >
          <Cpu size={14} /> llama.cpp Server
        </button>
        <button
          onClick={() => { setActiveScriptTab('zero_gradle'); triggerHaptic('selection'); }}
          className={`flex-1 py-2.5 rounded-[16px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeScriptTab === 'zero_gradle' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)]'
          }`}
        >
          <Code2 size={14} /> Zero-Gradle Build
        </button>
      </div>

      {/* Script Preview Box */}
      <div className="neu-flat rounded-[24px] p-5 flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
            Generated Bash Pipeline
          </span>
          <span className="text-[10px] font-mono text-[var(--color-neu-accent)]">
            POSIX / ARM64 Compatible
          </span>
        </div>

        <div className="neu-pressed rounded-[16px] p-4 relative flex-1 overflow-y-auto no-scrollbar font-mono text-[10px] text-[var(--color-neu-text-light)] whitespace-pre leading-relaxed">
          {getActiveScript()}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={handleCopy} 
            className="py-3.5 rounded-[20px] neu-button text-xs font-bold flex items-center justify-center gap-2 text-[var(--color-neu-text)]"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY SCRIPT'}</span>
          </button>

          <button 
            onClick={handleDownload} 
            className="py-3.5 rounded-[20px] neu-convex text-xs font-bold flex items-center justify-center gap-2 text-[var(--color-neu-accent)]"
          >
            <Download size={16} />
            <span>SAVE SCRIPT FILE</span>
          </button>
        </div>

        {/* Bulk Export Banner Card */}
        <div className="p-4 rounded-[20px] neu-pressed flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[14px] neu-convex text-[var(--color-neu-accent)]">
              <FileJson size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[var(--color-neu-text)]">Bulk Multi-Select Export</h3>
              <p className="text-[10px] text-[var(--color-neu-text-light)]">Select specific prompts or categories & export as JSON/TXT</p>
            </div>
          </div>
          <button
            onClick={() => { setShowBulkExportModal(true); triggerHaptic('medium'); }}
            className="neu-button px-3.5 py-2 rounded-[14px] text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Layers size={13} /> Open Exporter
          </button>
        </div>

        {/* System Diagnostics Metrics */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-neu-shadow-dark)]/30 text-xs">
          <div className="flex justify-between items-end pb-1 border-b border-[var(--color-neu-shadow-dark)]/20">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Vault Library</span>
            <span className="text-xs font-mono font-bold text-[var(--color-neu-text)]">{prompts.length} Prompts</span>
          </div>
          <div className="flex justify-between items-end pb-1 border-b border-[var(--color-neu-shadow-dark)]/20">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Variable Presets</span>
            <span className="text-xs font-mono font-bold text-[var(--color-neu-text)]">{profiles.length} Profiles</span>
          </div>
          <div className="flex justify-between items-end pb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Android 16 API 36 Target</span>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <ShieldCheck size={14} /> ZERO-GRADLE READY
            </span>
          </div>
        </div>
      </div>

      <BulkExportModal
        isOpen={showBulkExportModal}
        onClose={() => setShowBulkExportModal(false)}
        prompts={prompts}
      />

      <TermuxBridgeModal
        isOpen={showTermuxModal}
        onClose={() => setShowTermuxModal(false)}
      />
    </div>
  );
};
