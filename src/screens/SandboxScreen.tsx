import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { ThemeStyle, ThemeCategory } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { SipCodeEmblem } from '../components/SipCodeEmblem';
import { 
  Palette, 
  Check, 
  Sparkles, 
  Copy, 
  RotateCcw, 
  Sun, 
  Moon, 
  Terminal, 
  Flame, 
  Layers, 
  Sliders, 
  Eye, 
  Code, 
  CheckCircle2,
  Menu,
  Dock
} from 'lucide-react';

export const SandboxScreen: React.FC = () => {
  const { 
    allThemes, 
    activeTheme, 
    activeThemeId, 
    setTheme, 
    customThemeColors, 
    updateCustomThemeColors, 
    resetCustomThemeColors,
    navigationMode,
    setNavigationMode 
  } = useVault();

  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory | 'All'>('All');
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [sliderVal, setSliderVal] = useState<number>(65);
  const [copiedTokens, setCopiedTokens] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'custom_tuner' | 'components'>('themes');

  const categories: (ThemeCategory | 'All')[] = ['All', 'Light', 'Dark', 'Cyber', 'Warm', 'Vibrant'];

  const filteredThemes = selectedCategory === 'All' 
    ? allThemes 
    : allThemes.filter(t => t.category === selectedCategory);

  const handleSelectTheme = (theme: ThemeStyle) => {
    setTheme(theme.id);
    triggerHaptic('medium');
  };

  const handleCopyTokens = () => {
    const cssText = `/* ${activeTheme.name} Neumorphic Theme Tokens */
:root {
  --color-neu-bg: ${customThemeColors?.bg || activeTheme.colors.bg};
  --color-neu-shadow-dark: ${customThemeColors?.shadowDark || activeTheme.colors.shadowDark};
  --color-neu-shadow-light: ${customThemeColors?.shadowLight || activeTheme.colors.shadowLight};
  --color-neu-text: ${customThemeColors?.text || activeTheme.colors.text};
  --color-neu-text-light: ${customThemeColors?.textLight || activeTheme.colors.textLight};
  --color-neu-accent: ${customThemeColors?.accent || activeTheme.colors.accent};
}`;
    navigator.clipboard.writeText(cssText);
    setCopiedTokens(true);
    triggerHaptic('light');
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in min-h-full flex flex-col gap-4 sm:gap-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <SipCodeEmblem size="md" withGlow className="shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Atmosphere &amp; Visual Design
              </span>
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono neu-pressed text-[var(--color-neu-text-light)]">
                {allThemes.length} Curated Styles
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-serif italic text-[var(--color-neu-text)] mt-0.5">
              Tactile Style &amp; Theme Studio
            </h1>
            <p className="text-[11px] sm:text-xs text-[var(--color-neu-text-light)] mt-0.5">
              Select atmosphere themes, fine-tune tactile elevation, and test UI components.
            </p>
          </div>
        </div>

        {/* Current Active Badge */}
        <div className="neu-pressed px-3.5 py-1.5 rounded-[16px] flex items-center gap-2 shrink-0">
          <div 
            className="w-3 h-3 rounded-full border border-black/20"
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
          <div>
            <span className="text-[8.5px] uppercase tracking-widest font-bold text-[var(--color-neu-text-light)] block leading-none">
              Active Theme
            </span>
            <span className="text-[11px] font-bold text-[var(--color-neu-text)] font-sans">
              {activeTheme.name}
            </span>
          </div>
        </div>
      </header>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => { setActiveTab('themes'); triggerHaptic('light'); }}
          className={`px-4 py-2 rounded-[16px] text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'themes' 
              ? 'neu-pressed text-[var(--color-neu-accent)]' 
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <Palette size={14} />
          <span>Themes Catalog</span>
        </button>

        <button
          onClick={() => { setActiveTab('components'); triggerHaptic('light'); }}
          className={`px-4 py-2 rounded-[16px] text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'components' 
              ? 'neu-pressed text-[var(--color-neu-accent)]' 
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <Eye size={14} />
          <span>Tactile Sandbox</span>
        </button>

        <button
          onClick={() => { setActiveTab('custom_tuner'); triggerHaptic('light'); }}
          className={`px-4 py-2 rounded-[16px] text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'custom_tuner' 
              ? 'neu-pressed text-[var(--color-neu-accent)]' 
              : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
          }`}
        >
          <Sliders size={14} />
          <span>Color Tuner</span>
        </button>
      </div>

      {/* TAB 1: THEMES CATALOG */}
      {activeTab === 'themes' && (
        <div className="flex flex-col gap-5">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  triggerHaptic('light');
                }}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'neu-pressed text-[var(--color-neu-accent)]'
                    : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
                }`}
              >
                {cat === 'Light' && <Sun size={12} />}
                {cat === 'Dark' && <Moon size={12} />}
                {cat === 'Cyber' && <Terminal size={12} />}
                {cat === 'Warm' && <Flame size={12} />}
                {cat === 'Vibrant' && <Sparkles size={12} />}
                {cat === 'All' && <Layers size={12} />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredThemes.map(theme => {
              const isActive = theme.id === activeThemeId;
              return (
                <div
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme)}
                  className={`rounded-[24px] p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-4 text-left ${
                    isActive 
                      ? 'neu-pressed ring-2 ring-[var(--color-neu-accent)] shadow-lg' 
                      : 'neu-button hover:scale-[1.01]'
                  }`}
                  style={{
                    border: `1px solid ${theme.colors.shadowDark}40`
                  }}
                >
                  {/* Top Info */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-[var(--color-neu-text)]">{theme.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full neu-pressed text-[var(--color-neu-text-light)]">
                          {theme.category}
                        </span>
                        {isActive && (
                          <span className="w-5 h-5 rounded-full neu-pressed text-[var(--color-neu-accent)] flex items-center justify-center">
                            <Check size={12} className="stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-neu-text-light)] mt-1.5 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  {/* Swatch & Live Box Preview */}
                  <div 
                    className="rounded-[18px] p-3.5 flex flex-col gap-2.5 shadow-inner"
                    style={{ backgroundColor: theme.colors.bg }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                          style={{ backgroundColor: theme.colors.bg }} 
                          title="Background"
                        />
                        <div 
                          className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                          style={{ backgroundColor: theme.colors.text }} 
                          title="Primary Text"
                        />
                        <div 
                          className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                          style={{ backgroundColor: theme.colors.accent }} 
                          title="Accent"
                        />
                      </div>

                      <span 
                        className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: theme.colors.bg,
                          color: theme.colors.accent,
                          border: `1px solid ${theme.colors.shadowDark}`
                        }}
                      >
                        {theme.isDark ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </div>

                    <div 
                      className="w-full py-2 px-3 rounded-[12px] text-center text-xs font-bold tracking-wider uppercase transition-all"
                      style={{
                        backgroundColor: theme.colors.bg,
                        color: theme.colors.text,
                        boxShadow: `3px 3px 6px ${theme.colors.shadowDark}, -3px -3px 6px ${theme.colors.shadowLight}`
                      }}
                    >
                      {isActive ? 'Active Theme' : 'Apply Theme'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TACTILE SANDBOX COMPONENT TESTER */}
      {activeTab === 'components' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Surface Elevations */}
          <div className="neu-flat rounded-[24px] p-6 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
              Tactile Surface Elevations
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="neu-flat p-4 rounded-[18px] text-center">
                <span className="text-xs font-bold block">NEU FLAT</span>
                <span className="text-[10px] text-[var(--color-neu-text-light)]">Base Elevation</span>
              </div>
              <div className="neu-pressed p-4 rounded-[18px] text-center">
                <span className="text-xs font-bold block">NEU PRESSED</span>
                <span className="text-[10px] text-[var(--color-neu-text-light)]">Inset Well</span>
              </div>
              <div className="neu-convex p-4 rounded-[18px] text-center">
                <span className="text-xs font-bold block">CONVEX</span>
                <span className="text-[10px] text-[var(--color-neu-text-light)]">Curved Out</span>
              </div>
              <div className="neu-concave p-4 rounded-[18px] text-center">
                <span className="text-xs font-bold block">CONCAVE</span>
                <span className="text-[10px] text-[var(--color-neu-text-light)]">Curved In</span>
              </div>
            </div>

            {/* Interactive Toggle Switch */}
            <div className="mt-2 flex items-center justify-between p-3.5 neu-pressed rounded-[18px]">
              <div>
                <span className="text-xs font-bold block">Tactile Toggle Switch</span>
                <span className="text-[10px] text-[var(--color-neu-text-light)]">State: {toggleState ? 'Active' : 'Standby'}</span>
              </div>
              <button
                onClick={() => { setToggleState(!toggleState); triggerHaptic('light'); }}
                className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer ${
                  toggleState ? 'neu-pressed bg-[var(--color-neu-accent)]/10' : 'neu-pressed'
                }`}
              >
                <div className={`w-6 h-6 rounded-full transition-transform neu-button ${
                  toggleState ? 'translate-x-6 bg-[var(--color-neu-accent)] text-[var(--color-neu-bg)]' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Interactive Slider */}
            <div className="flex flex-col gap-2 p-3.5 neu-flat rounded-[18px]">
              <div className="flex justify-between text-xs font-bold">
                <span>Tactile Slider Control</span>
                <span className="font-mono text-[var(--color-neu-accent)]">{sliderVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={e => setSliderVal(Number(e.target.value))}
                className="w-full accent-[var(--color-neu-accent)] cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Buttons & Medallion Preview */}
          <div className="neu-flat rounded-[24px] p-6 flex flex-col gap-5 justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Emblem &amp; Interactive Tokens
              </h3>
              <p className="text-xs text-[var(--color-neu-text-light)] mt-1">
                Visual preview of the brand medallion and interactive action buttons in this theme.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 py-4">
              <SipCodeEmblem size="lg" showBadge withGlow />
              <div className="flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono neu-pressed text-[var(--color-neu-accent)] font-bold">
                  SIP &amp; CODE VAULT
                </span>
                <span className="text-xs font-serif italic text-[var(--color-neu-text-light)]">
                  Tactile Geometry Active
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => triggerHaptic('heavy')}
                className="w-full py-3.5 rounded-[18px] neu-button font-bold text-xs uppercase tracking-widest text-[var(--color-neu-accent)] cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
              >
                Depress Tactile Button
              </button>

              <button 
                onClick={handleCopyTokens}
                className="w-full py-3 rounded-[16px] neu-pressed font-bold text-xs uppercase tracking-wider text-[var(--color-neu-text)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy size={13} />
                <span>{copiedTokens ? 'CSS Tokens Copied!' : 'Copy Theme CSS Tokens'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM COLOR TUNER */}
      {activeTab === 'custom_tuner' && (
        <div className="flex flex-col gap-6">
          {/* Navigation Layout Preference */}
          <div className="neu-flat rounded-[24px] p-6 flex flex-col gap-4">
            <div>
              <span className="text-[9.5px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                UI &amp; Navigation Ergonomics
              </span>
              <h3 className="text-sm font-serif italic text-[var(--color-neu-text)] mt-0.5">
                Navigation Architecture
              </h3>
              <p className="text-xs text-[var(--color-neu-text-light)] mt-0.5">
                Select between the uncluttered Top Capsule &amp; Slide-over Tactile Drawer or classic Bottom Dock.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setNavigationMode('drawer');
                  triggerHaptic('medium');
                }}
                className={`p-4 rounded-[18px] flex items-start gap-3 text-left transition-all cursor-pointer ${
                  navigationMode === 'drawer'
                    ? 'neu-pressed text-[var(--color-neu-accent)] border border-[var(--color-neu-accent)]/30'
                    : 'neu-button text-[var(--color-neu-text)]'
                }`}
              >
                <div className="p-2 rounded-xl neu-convex text-[var(--color-neu-accent)] shrink-0">
                  <Menu size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">Slide-Over Tactile Drawer</span>
                    {navigationMode === 'drawer' && (
                      <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-bold bg-[var(--color-neu-accent)] text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--color-neu-text-light)] mt-1 leading-relaxed">
                    Zero screen intrusion. Minimal top-left floating capsule that opens a categorized side hub.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setNavigationMode('dock');
                  triggerHaptic('medium');
                }}
                className={`p-4 rounded-[18px] flex items-start gap-3 text-left transition-all cursor-pointer ${
                  navigationMode === 'dock'
                    ? 'neu-pressed text-[var(--color-neu-accent)] border border-[var(--color-neu-accent)]/30'
                    : 'neu-button text-[var(--color-neu-text)]'
                }`}
              >
                <div className="p-2 rounded-xl neu-convex text-[var(--color-neu-text-light)] shrink-0">
                  <Dock size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">Bottom Navigation Dock</span>
                    {navigationMode === 'dock' && (
                      <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-bold bg-[var(--color-neu-accent)] text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--color-neu-text-light)] mt-1 leading-relaxed">
                    Classic fixed bottom scrollable dock with 9 quick-switch icons.
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="neu-flat rounded-[24px] p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Live Color Override Studio
                </h3>
                <p className="text-xs text-[var(--color-neu-text-light)] mt-1">
                  Directly tune active background, shadow, and accent colors for custom lighting conditions.
                </p>
              </div>

              <button
                onClick={() => {
                  resetCustomThemeColors();
                  triggerHaptic('light');
                }}
                className="px-3 py-1.5 rounded-[14px] neu-button text-xs font-bold text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset to Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Background Color */}
              <div className="neu-pressed rounded-[20px] p-4 flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-neu-text)] flex items-center justify-between">
                  <span>Background Canvas</span>
                  <span className="font-mono text-[10px] text-[var(--color-neu-text-light)]">
                    {customThemeColors?.bg || activeTheme.colors.bg}
                  </span>
                </label>
                <input
                  type="color"
                  value={customThemeColors?.bg || activeTheme.colors.bg}
                  onChange={e => updateCustomThemeColors({ bg: e.target.value })}
                  className="w-full h-10 rounded-[12px] cursor-pointer bg-transparent border-0"
                />
              </div>

              {/* Accent Color */}
              <div className="neu-pressed rounded-[20px] p-4 flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-neu-text)] flex items-center justify-between">
                  <span>Accent Color</span>
                  <span className="font-mono text-[10px] text-[var(--color-neu-text-light)]">
                    {customThemeColors?.accent || activeTheme.colors.accent}
                  </span>
                </label>
                <input
                  type="color"
                  value={customThemeColors?.accent || activeTheme.colors.accent}
                  onChange={e => updateCustomThemeColors({ accent: e.target.value })}
                  className="w-full h-10 rounded-[12px] cursor-pointer bg-transparent border-0"
                />
              </div>

              {/* Text Color */}
              <div className="neu-pressed rounded-[20px] p-4 flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-neu-text)] flex items-center justify-between">
                  <span>Primary Text</span>
                  <span className="font-mono text-[10px] text-[var(--color-neu-text-light)]">
                    {customThemeColors?.text || activeTheme.colors.text}
                  </span>
                </label>
                <input
                  type="color"
                  value={customThemeColors?.text || activeTheme.colors.text}
                  onChange={e => updateCustomThemeColors({ text: e.target.value })}
                  className="w-full h-10 rounded-[12px] cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>

            <div className="p-4 rounded-[18px] neu-pressed flex items-center justify-between text-xs font-mono text-[var(--color-neu-text-light)]">
              <span>Changes apply immediately across all application views and persistent state.</span>
              <button
                onClick={handleCopyTokens}
                className="px-3 py-1 rounded-[12px] neu-button text-[var(--color-neu-accent)] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Copy size={12} />
                <span>Copy CSS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
