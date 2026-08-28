import React from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { ScreenName } from '../types';
import { 
  Home, 
  Library, 
  Eye, 
  PenTool, 
  Sparkles, 
  Beaker, 
  Zap, 
  Palette, 
  TerminalSquare, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Cloud,
  CheckCircle2,
  FolderLock
} from 'lucide-react';
import { SipCodeEmblem } from './SipCodeEmblem';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenThemeModal?: () => void;
}

interface NavSection {
  title: string;
  items: {
    id: ScreenName;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ 
  isOpen, 
  onClose,
  onOpenThemeModal 
}) => {
  const { currentScreen, setCurrentScreen, prompts, activeProfile, activeTheme, syncState } = useVault();

  const handleNavClick = (id: ScreenName) => {
    triggerHaptic('selection');
    setCurrentScreen(id);
    onClose();
  };

  const sections: NavSection[] = [
    {
      title: 'Vault & Intelligence',
      items: [
        { 
          id: 'command_center', 
          label: 'Command Center', 
          description: 'Dashboard, sync status & quick triggers', 
          icon: <Home size={18} /> 
        },
        { 
          id: 'vault', 
          label: 'Master Vault', 
          description: `${prompts.length} verified meta-prompts`, 
          icon: <Library size={18} />,
          badge: `${prompts.length}`
        },
        { 
          id: 'style_dna', 
          label: 'Style DNA Extractor', 
          description: 'Extract palettes, lighting & design tokens', 
          icon: <Eye size={18} />,
          badge: 'NEW'
        },
      ]
    },
    {
      title: 'AI Creation & Synthesis',
      items: [
        { 
          id: 'creator', 
          label: 'Prompt Creator', 
          description: 'Craft & parameterize custom prompts', 
          icon: <PenTool size={18} /> 
        },
        { 
          id: 'optimizer', 
          label: 'Prompt Refiner', 
          description: 'Multi-pass prompt compression & hardening', 
          icon: <Sparkles size={18} /> 
        },
        { 
          id: 'lab', 
          label: 'Zero-Cost AI Lab', 
          description: 'Streaming inference via OpenRouter :free', 
          icon: <Beaker size={18} />,
          badge: ':free'
        },
        { 
          id: 'product_studio', 
          label: 'Product Studio', 
          description: '20-font blueprint notepad & PDF export', 
          icon: <Zap size={18} /> 
        },
      ]
    },
    {
      title: 'System & Architecture',
      items: [
        { 
          id: 'sandbox', 
          label: 'Theme Studio', 
          description: 'Sculpted 3D neumorphic materials & colors', 
          icon: <Palette size={18} /> 
        },
        { 
          id: 'deployment', 
          label: 'Termux & Zero-Gradle', 
          description: 'Android 16 raw CLI build pipeline', 
          icon: <TerminalSquare size={18} /> 
        },
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in flex">
      {/* Backdrop */}
      <div 
        onClick={() => {
          triggerHaptic('light');
          onClose();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside 
        aria-label="App Navigation Drawer"
        className="relative w-[85%] max-w-[340px] h-full neu-flat bg-[var(--color-neu-bg)] z-50 flex flex-col justify-between shadow-2xl border-r border-[var(--color-neu-shadow-light)]/40 overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="p-5 pt-[max(18px,calc(env(safe-area-inset-top,0px)+16px))] pb-4 border-b border-[var(--color-neu-shadow-dark)]/20 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SipCodeEmblem size="sm" withGlow={false} showBadge={false} className="shrink-0" />
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[var(--color-neu-text)] tracking-tight truncate">
                  Prompt Vault
                </h2>
                <p className="text-[9.5px] font-mono text-[var(--color-neu-text-light)] truncate">
                  Android 16 • Zero-Gradle CLI
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="neu-button p-2 rounded-full text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] cursor-pointer active:scale-95 shrink-0"
              title="Close Menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* User Profile & Sync Mini Card */}
          <div className="neu-pressed rounded-[16px] p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base leading-none shrink-0">{activeProfile.avatar}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[var(--color-neu-text)] truncate">
                  {activeProfile.name}
                </p>
                <p className="text-[8.5px] font-mono text-[var(--color-neu-accent)] uppercase">
                  {activeProfile.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{syncState.isSynced ? 'Cloud' : 'Local'}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-4">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-text-light)]">
                {section.title}
              </h3>
              <div className="space-y-1 pt-1">
                {section.items.map(item => {
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full p-2.5 rounded-[16px] flex items-center justify-between text-left transition-all cursor-pointer ${
                        isActive
                          ? 'neu-pressed text-[var(--color-neu-accent)] font-bold scale-[1.01]'
                          : 'neu-button text-[var(--color-neu-text)] hover:text-[var(--color-neu-accent)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-xl shrink-0 ${isActive ? 'text-[var(--color-neu-accent)]' : 'text-[var(--color-neu-text-light)]'}`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold truncate">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-bold ${
                                isActive ? 'bg-[var(--color-neu-accent)] text-white' : 'neu-pressed text-[var(--color-neu-accent)]'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] text-[var(--color-neu-text-light)] truncate font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={14} className={`shrink-0 ${isActive ? 'text-[var(--color-neu-accent)]' : 'text-[var(--color-neu-text-light)] opacity-40'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer: Theme Quick Action & Metadata */}
        <div className="p-4 pb-[max(16px,calc(env(safe-area-inset-bottom,0px)+12px))] border-t border-[var(--color-neu-shadow-dark)]/20 flex flex-col gap-2 bg-black/5">
          {onOpenThemeModal && (
            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
                onOpenThemeModal();
              }}
              className="neu-button w-full py-2.5 px-3 rounded-[16px] text-xs font-bold text-[var(--color-neu-text)] flex items-center justify-between cursor-pointer active:scale-95"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div 
                  className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0" 
                  style={{ backgroundColor: activeTheme.colors.accent }}
                />
                <span className="truncate">{activeTheme.name}</span>
              </div>
              <span className="text-[9px] font-mono text-[var(--color-neu-accent)] uppercase">
                Change Theme
              </span>
            </button>
          )}

          <div className="flex items-center justify-between text-[8.5px] font-mono text-[var(--color-neu-text-light)] px-1">
            <span>v2.0.0 • SQLite/Encrypted</span>
            <span>API 36 Ready</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
