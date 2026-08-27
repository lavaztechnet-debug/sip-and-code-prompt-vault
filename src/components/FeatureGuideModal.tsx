import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { ScreenName } from '../types';
import { 
  X, 
  BookOpen, 
  Library, 
  Sparkles, 
  Cpu, 
  Zap, 
  PenTool, 
  Beaker, 
  Palette, 
  Terminal, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Copy, 
  FileText, 
  ShieldCheck, 
  Play, 
  Search, 
  Layers, 
  Share2, 
  RefreshCw,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface FeatureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuideSection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  targetScreen?: ScreenName;
  steps: {
    title: string;
    description: string;
    tip?: string;
  }[];
  proTips: string[];
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'vault',
    title: 'Master Vault & Inspector',
    subtitle: 'Browse 320+ curated prompts, inspect variables & launch instantly',
    badge: 'Core Feature',
    icon: <Library size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'vault',
    steps: [
      {
        title: '1. Filter & Search by Category',
        description: 'Use the category filter carousel (17 categories: Meta-Prompts, General Apps, Code, Design, Horror, Music, Utility, etc.) or search by keywords, titles, or tags in the search bar.',
        tip: 'Tap the star icon on any card to add it to your persistent Favorites list.'
      },
      {
        title: '2. Inspect & Dynamic Parameter Injection',
        description: 'Tap the "Inspect" button (or click any prompt title) to open the Inspector modal. The app automatically detects variable placeholders like [variable] or {{topic}} and provides live input fields.',
        tip: 'Watch the live injected output preview update in real-time as you type parameter values.'
      },
      {
        title: '3. One-Touch Copy & AI Studio Bridge',
        description: 'Tap "Copy" to copy the filled prompt with tactile haptic feedback, or tap "Ask AI" / "Launch in AI Studio" to carry the prompt directly into the AI Assistant workspace.',
        tip: 'You can also tap "Refine" to bring the prompt directly into the Prompt Optimizer Studio.'
      }
    ],
    proTips: [
      'Variable syntax: Use [VARIABLE_NAME] or {{VARIABLE_NAME}} in templates to create auto-detectable fields.',
      'Tap any card text directly to quick-open the Inspector with live token and word metrics.'
    ]
  },
  {
    id: 'optimizer',
    title: 'Prompt Refiner & Tokenomics',
    subtitle: 'Cut token costs by 30-50%, inject XML guardrails & calculate ROI',
    badge: 'AI Engineering',
    icon: <Sparkles size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'optimizer',
    steps: [
      {
        title: '1. Select a Prompt Template',
        description: 'Choose any existing prompt from the dropdown menu, or type/paste your own raw prompt into the Original Prompt editor.',
      },
      {
        title: '2. Choose an Optimization Engine',
        description: 'Select one of four algorithmic optimization presets: Token Pruner (strips fluff, compacts rules), XML Guardrails (structured enterprise delimiters), Few-Shot Base (input/output demonstration pairs), or Reasoning CoT (step-by-step thinking scratchpads).',
        tip: 'Switching engines generates the refined prompt instantly with real-time character & token diff tracking.'
      },
      {
        title: '3. Analyze Tokenomics & Multi-Model ROI',
        description: 'Switch to the "Tokenomics & ROI" tab and drag the monthly invocation volume slider (1k to 500k calls/mo) to see exact monthly cost savings across OpenRouter Free, Gemini 2.5 Flash, DeepSeek R1, Claude 3.5 Sonnet, and GPT-4o.',
      },
      {
        title: '4. Live Test & Save to Vault',
        description: 'Switch to the "Live Test" tab to execute the optimized prompt against the streaming AI runner, or tap "Save to Vault" to store it as a custom prompt.',
      }
    ],
    proTips: [
      'XML Guardrails are ideal for structured JSON output and mission-critical API payloads.',
      'Token Pruner typically reduces prompt token count by 30–50% without losing functional instructions.'
    ]
  },
  {
    id: 'assistant',
    title: 'Zero-Cost AI Assistant',
    subtitle: 'Stream with free OpenRouter models with live token typing',
    badge: 'AI Engine',
    icon: <Zap size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'product_studio',
    steps: [
      {
        title: '1. Free OpenRouter API Key Setup',
        description: 'Obtain a 100% free API key from openrouter.ai/keys and enter it into the setup modal. Keys are encrypted and stored locally with AES-backed security.',
        tip: 'The app enforces a strict Zero-Cost Guard, querying exclusively free models with pricing = $0.00.'
      },
      {
        title: '2. Select a Free High-Performance Model',
        description: 'Choose from top-tier free models such as Meta Llama 3.3 70B Instruct, Google Gemma 2 9B IT, Mistral 7B, or Qwen 2.5.',
        tip: 'If a model experiences rate limits (HTTP 429), the assistant automatically fails over to the next available free model.'
      },
      {
        title: '3. Use Context Presets & Live Streaming',
        description: 'Select variable context presets (e.g. Developer, Marketer, Researcher) to auto-fill global parameters, then watch responses stream in with live typewriter rendering.',
      },
      {
        title: '4. Thread History & Save as Prompt',
        description: 'Manage multi-session conversational threads, copy messages, or tap "Save as Prompt" to save any AI answer directly into your Vault.',
      }
    ],
    proTips: [
      'Toggle the System Base Prompt option in settings to enforce persistent personas across all chats.',
      'Tap the Copy icon on any individual chat bubble for instant markdown copying.'
    ]
  },
  {
    id: 'creator',
    title: 'Creator & Batch Import/Export',
    subtitle: 'Build custom prompts, import TXT/JSON & export full packages',
    badge: 'Workflow',
    icon: <PenTool size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'creator',
    steps: [
      {
        title: '1. Create Custom Single Prompts',
        description: 'Enter title, category, dynamic template with [variable] placeholders, example invocations, and tags.',
      },
      {
        title: '2. Batch Import from TXT or JSON',
        description: 'Paste structured multi-prompt text blocks (using Title:, Category:, Prompt template:, Example:) or JSON arrays. The parser validates fields and displays a preview count.',
        tip: 'Choose your conflict resolution mode: Append (add new), Replace (overwrite), or Merge.'
      },
      {
        title: '3. Bulk Export & Share Sheet',
        description: 'Export your entire library or filtered categories to timestamped JSON or TXT files. Use native Android Share Sheet or download directly.',
      }
    ],
    proTips: [
      'Export files are named prompts-export-YYYYMMDD-HHMM.json for clean version-controlled backups.',
      'Custom prompts are automatically synced to Firestore cloud database when online.'
    ]
  },
  {
    id: 'lab',
    title: '20-Typography Document Studio',
    subtitle: 'Draft blueprints & notes with 20 cursive & developer fonts',
    badge: 'Notepad',
    icon: <Beaker size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'lab',
    steps: [
      {
        title: '1. Select from 20 Curated Typefaces',
        description: 'Toggle between 10 Script/Cursive fonts (Dancing Script, Pacifico, Great Vibes, Caveat, Parisienne, etc.) and 10 Developer/Serif fonts (Inter, JetBrains Mono, Fira Code, Playfair Display, Cinzel, Space Grotesk).',
      },
      {
        title: '2. Real-Time Keystroke Persistence',
        description: 'Draft notes, blueprints, or prompt sequences. Content is auto-saved on every keystroke so you never lose user effort.',
      },
      {
        title: '3. Clean TXT & Printable PDF Export',
        description: 'Export your document with one click as a clean plaintext .txt file or a formatted, printable vector PDF document.',
      }
    ],
    proTips: [
      'Use JetBrains Mono or Fira Code for alignment when drafting code prompts and tabular data.',
      'The word count and reading time meters at the top bar update live as you write.'
    ]
  },
  {
    id: 'deployment',
    title: 'Termux & Zero-Gradle CLI Hub',
    subtitle: 'Compile pure Kotlin APKs on Android & run on-device llama.cpp',
    badge: 'Systems Eng',
    icon: <Cpu size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'deployment',
    steps: [
      {
        title: '1. Zero-Gradle Kotlin Pipeline',
        description: 'View and copy the complete standalone Termux bash script that builds the Android 16 (API 36) APK using raw CLI tools (aapt2, kotlinc, d8, apksigner) with zero Gradle overhead.',
      },
      {
        title: '2. Local llama.cpp Engine Bridge',
        description: 'Configure localhost connection to an on-device llama.cpp server running inside Termux (e.g. http://127.0.0.1:8080) for 100% air-gapped, offline AI inference.',
      },
      {
        title: '3. One-Click Heredoc Script Copy',
        description: 'Copy the full, single-file executable build.sh script directly to your clipboard for instant execution in Termux.',
      }
    ],
    proTips: [
      'No Gradle wrappers or Android Studio required—compiles in seconds directly on Android hardware.',
      'Supports GGUF quantized models (Q4_K_M, Q8_0) for local zero-latency execution.'
    ]
  },
  {
    id: 'themes',
    title: 'Neumorphic Deck & Themes',
    subtitle: 'Tactile materials, soft dual-offset shadows & contrast modes',
    badge: 'Aesthetics',
    icon: <Palette size={18} className="text-[var(--color-neu-accent)]" />,
    targetScreen: 'sandbox',
    steps: [
      {
        title: '1. Switch Material Decks',
        description: 'Select between 6 tactile surface languages: Classic Pearl & Lavender, Tan & White, Beige & Ivory, Matte Rubber, Gloss Plastic, and Brushed Chrome.',
      },
      {
        title: '2. Configure Variable Context Profiles',
        description: 'Set up custom parameter profiles ([NAME], [ROLE], [COMPANY], [TECH_STACK]) to inject consistent user identity across all prompts.',
      },
      {
        title: '3. Cloud Database & Sync Management',
        description: 'Monitor live Firestore synchronization, trigger manual cloud backups, or reset defaults safely.',
      }
    ],
    proTips: [
      'All themes adhere to WCAG AA contrast standards with dual-offset soft neumorphic shadows.',
      'Variable profiles automatically populate dynamic variables across the Master Vault and AI Assistant.'
    ]
  }
];

export const FeatureGuideModal: React.FC<FeatureGuideModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentScreen } = useVault();
  const [activeSectionId, setActiveSectionId] = useState<string>(GUIDE_SECTIONS[0].id);

  if (!isOpen) return null;

  const currentSection = GUIDE_SECTIONS.find(s => s.id === activeSectionId) || GUIDE_SECTIONS[0];
  const currentIndex = GUIDE_SECTIONS.findIndex(s => s.id === activeSectionId);

  const handleNext = () => {
    if (currentIndex < GUIDE_SECTIONS.length - 1) {
      setActiveSectionId(GUIDE_SECTIONS[currentIndex + 1].id);
      triggerHaptic('light');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSectionId(GUIDE_SECTIONS[currentIndex - 1].id);
      triggerHaptic('light');
    }
  };

  const handleNavigateToFeature = (screen?: ScreenName) => {
    if (screen) {
      setCurrentScreen(screen);
      triggerHaptic('medium');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="neu-flat rounded-[28px] sm:rounded-[32px] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-[var(--color-neu-shadow-light)]/40 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[var(--color-neu-shadow-dark)]/30 flex items-center justify-between gap-3 bg-[var(--color-neu-bg)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl neu-pressed text-[var(--color-neu-accent)] shrink-0">
              <BookOpen size={18} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Documentation &amp; Walkthrough
                </span>
                <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono neu-pressed text-[var(--color-neu-text-light)]">
                  7 Core Modules
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-[var(--color-neu-text)] truncate leading-tight mt-0.5">
                Complete Feature Guide
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-xl neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer shrink-0"
            title="Close Guide"
          >
            <X size={16} />
          </button>
        </div>

        {/* Section Pill Carousel */}
        <div className="px-4 sm:px-5 py-2.5 bg-[var(--color-neu-bg)]/80 flex items-center gap-1.5 overflow-x-auto border-b border-[var(--color-neu-shadow-dark)]/20 no-scrollbar">
          {GUIDE_SECTIONS.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                triggerHaptic('light');
              }}
              className={`px-3 py-1.5 rounded-xl text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                activeSectionId === section.id
                  ? 'neu-pressed text-[var(--color-neu-accent)]'
                  : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{section.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 no-scrollbar">
          
          {/* Section Hero Banner */}
          <div className="neu-pressed rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[var(--color-neu-shadow-light)]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl neu-convex flex items-center justify-center shrink-0">
                {currentSection.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[8.5px] font-bold uppercase tracking-wider neu-flat text-[var(--color-neu-accent)]">
                    {currentSection.badge}
                  </span>
                  <span className="text-[9.5px] font-mono text-[var(--color-neu-text-light)]">
                    Step {currentIndex + 1} of {GUIDE_SECTIONS.length}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[var(--color-neu-text)] mt-0.5">
                  {currentSection.title}
                </h3>
                <p className="text-xs text-[var(--color-neu-text-light)] leading-relaxed mt-0.5">
                  {currentSection.subtitle}
                </p>
              </div>
            </div>

            {currentSection.targetScreen && (
              <button
                onClick={() => handleNavigateToFeature(currentSection.targetScreen)}
                className="neu-convex px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 shrink-0 hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Try Feature</span>
                <ChevronRight size={13} />
              </button>
            )}
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h4 className="text-[10.5px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Step-by-Step Instructions</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {currentSection.steps.map((step, idx) => (
                <div key={idx} className="neu-flat rounded-2xl p-4 flex flex-col gap-1.5 border border-[var(--color-neu-shadow-light)]/30">
                  <h5 className="text-xs sm:text-sm font-bold text-[var(--color-neu-text)] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full neu-pressed text-[10px] font-mono font-bold flex items-center justify-center text-[var(--color-neu-accent)] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step.title}</span>
                  </h5>
                  <p className="text-[11px] sm:text-xs text-[var(--color-neu-text-light)] leading-relaxed pl-6.5">
                    {step.description}
                  </p>
                  {step.tip && (
                    <div className="ml-6.5 mt-1 neu-pressed rounded-xl px-3 py-1.5 text-[10.5px] text-[var(--color-neu-accent)] font-medium flex items-center gap-1.5">
                      <Sparkles size={11} className="shrink-0" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips Box */}
          {currentSection.proTips.length > 0 && (
            <div className="neu-pressed rounded-2xl p-4 space-y-2 border border-[var(--color-neu-accent)]/20">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Architect Pro Tips</span>
              </h4>
              <ul className="space-y-1.5 pl-1">
                {currentSection.proTips.map((tip, idx) => (
                  <li key={idx} className="text-[11px] text-[var(--color-neu-text)] flex items-start gap-2 leading-relaxed font-sans">
                    <span className="text-[var(--color-neu-accent)] font-bold text-xs">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 pt-3 border-t border-[var(--color-neu-shadow-dark)]/30 flex items-center justify-between gap-3 bg-[var(--color-neu-bg)]">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="neu-button px-3.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-[var(--color-neu-text-light)] disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {GUIDE_SECTIONS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSectionId(s.id);
                  triggerHaptic('light');
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-[var(--color-neu-accent)]'
                    : 'bg-[var(--color-neu-shadow-dark)] hover:bg-[var(--color-neu-accent)]/50'
                }`}
                title={s.title}
              />
            ))}
          </div>

          {currentIndex === GUIDE_SECTIONS.length - 1 ? (
            <button
              onClick={() => {
                triggerHaptic('success');
                onClose();
              }}
              className="neu-convex px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 cursor-pointer hover:shadow-md"
            >
              <span>Done</span>
              <CheckCircle2 size={13} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="neu-convex px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1.5 cursor-pointer hover:shadow-md"
            >
              <span>Next</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
