import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { ThemeStyle, ThemeCategory } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { 
  Palette, 
  Check, 
  Sparkles, 
  X, 
  Sun, 
  Moon, 
  Terminal, 
  Flame, 
  Layers,
  Copy,
  RotateCcw
} from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { allThemes, activeThemeId, setTheme, resetCustomThemeColors } = useVault();
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory | 'All'>('All');
  const [copiedTokens, setCopiedTokens] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories: (ThemeCategory | 'All')[] = ['All', 'Light', 'Dark', 'Cyber', 'Warm', 'Vibrant'];

  const filteredThemes = selectedCategory === 'All' 
    ? allThemes 
    : allThemes.filter(t => t.category === selectedCategory);

  const handleSelectTheme = (theme: ThemeStyle) => {
    setTheme(theme.id);
    triggerHaptic('medium');
  };

  const getCategoryIcon = (cat: ThemeCategory | 'All') => {
    switch (cat) {
      case 'Light': return <Sun size={13} />;
      case 'Dark': return <Moon size={13} />;
      case 'Cyber': return <Terminal size={13} />;
      case 'Warm': return <Flame size={13} />;
      case 'Vibrant': return <Sparkles size={13} />;
      default: return <Layers size={13} />;
    }
  };

  const handleCopyTokens = (theme: ThemeStyle) => {
    const cssText = `/* ${theme.name} Theme CSS Variables */
:root {
  --color-neu-bg: ${theme.colors.bg};
  --color-neu-shadow-dark: ${theme.colors.shadowDark};
  --color-neu-shadow-light: ${theme.colors.shadowLight};
  --color-neu-text: ${theme.colors.text};
  --color-neu-text-light: ${theme.colors.textLight};
  --color-neu-accent: ${theme.colors.accent};
}`;
    navigator.clipboard.writeText(cssText);
    setCopiedTokens(true);
    triggerHaptic('light');
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl max-h-[90vh] rounded-[28px] neu-flat p-6 flex flex-col gap-5 border border-[var(--color-neu-shadow-light)]/40 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] neu-pressed flex items-center justify-center text-[var(--color-neu-accent)]">
              <Palette size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Tactile Style Engine
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono neu-pressed text-[var(--color-neu-text-light)]">
                  {allThemes.length} Styles
                </span>
              </div>
              <h2 className="text-xl font-serif italic text-[var(--color-neu-text)]">
                Select Theme &amp; Atmosphere
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full neu-button flex items-center justify-center text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                triggerHaptic('light');
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'neu-pressed text-[var(--color-neu-accent)]'
                  : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto no-scrollbar pr-1 max-h-[52vh]">
          {filteredThemes.map(theme => {
            const isActive = theme.id === activeThemeId;
            return (
              <div
                key={theme.id}
                onClick={() => handleSelectTheme(theme)}
                className={`relative rounded-[22px] p-4.5 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 text-left ${
                  isActive 
                    ? 'neu-pressed ring-2 ring-[var(--color-neu-accent)] shadow-md' 
                    : 'neu-button hover:opacity-95'
                }`}
                style={{
                  border: `1px solid ${theme.colors.shadowDark}40`
                }}
              >
                {/* Top Info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-[var(--color-neu-text)]">{theme.name}</h3>
                      <span className="text-[8px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded-full neu-pressed text-[var(--color-neu-text-light)]">
                        {theme.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--color-neu-text-light)] line-clamp-2 mt-0.5">
                      {theme.description}
                    </p>
                  </div>

                  {isActive ? (
                    <span className="shrink-0 w-6 h-6 rounded-full neu-pressed text-[var(--color-neu-accent)] flex items-center justify-center">
                      <Check size={14} className="stroke-[3]" />
                    </span>
                  ) : null}
                </div>

                {/* Color Swatch Preview */}
                <div 
                  className="rounded-[14px] p-2.5 flex items-center justify-between gap-2 shadow-inner"
                  style={{ backgroundColor: theme.colors.bg }}
                >
                  <div className="flex items-center gap-1.5">
                    {/* Circle Swatches */}
                    <div 
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                      style={{ backgroundColor: theme.colors.bg }} 
                      title="Background"
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                      style={{ backgroundColor: theme.colors.text }} 
                      title="Text Primary"
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                      style={{ backgroundColor: theme.colors.accent }} 
                      title="Accent"
                    />
                  </div>

                  {/* Tactile Pill Sample */}
                  <div 
                    className="px-2.5 py-1 rounded-[10px] text-[9px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: theme.colors.bg,
                      color: theme.colors.text,
                      boxShadow: `2px 2px 5px ${theme.colors.shadowDark}, -2px -2px 5px ${theme.colors.shadowLight}`
                    }}
                  >
                    Preview
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-neu-shadow-dark)]/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const current = allThemes.find(t => t.id === activeThemeId);
                if (current) handleCopyTokens(current);
              }}
              className="px-3 py-1.5 rounded-[14px] neu-button text-[11px] font-bold text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] flex items-center gap-1.5 cursor-pointer"
            >
              <Copy size={13} />
              <span>{copiedTokens ? 'CSS Copied!' : 'Copy CSS Tokens'}</span>
            </button>

            <button
              onClick={() => {
                resetCustomThemeColors();
                triggerHaptic('light');
              }}
              className="px-3 py-1.5 rounded-[14px] neu-button text-[11px] font-bold text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] flex items-center gap-1.5 cursor-pointer"
              title="Reset any custom color overrides"
            >
              <RotateCcw size={12} />
              <span>Reset Tweaks</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[16px] neu-pressed font-bold text-xs uppercase tracking-wider text-[var(--color-neu-accent)] hover:opacity-90 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
