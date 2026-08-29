import React from 'react';
import { useVault } from '../context/VaultContext';
import { FileText, Database, Code, ArrowRight, Sparkles, Award, Palette, Layers, Terminal } from 'lucide-react';
import { SipCodeEmblem } from '../components/SipCodeEmblem';

export const ProductStudioScreen: React.FC = () => {
  const { prompts, setActivePrompt, setCurrentScreen } = useVault();

  const loadTool = (titleSubstring: string) => {
    const prompt = prompts.find(p => p.title.includes(titleSubstring));
    if (prompt) {
      setActivePrompt(prompt);
      setCurrentScreen('creator');
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-4 sm:pb-6 animate-fade-in flex flex-col gap-4 sm:gap-6 w-full">
      {/* Brand & Studio Showcase Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 flex flex-col justify-center border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex items-center gap-4">
          <SipCodeEmblem size="lg" showBadge withGlow className="shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Thread-Art Edition
              </span>
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono neu-pressed text-[var(--color-neu-accent)] font-bold">
                Premium Asset
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-serif italic text-[var(--color-neu-text)] mt-0.5">
              SIP &amp; CODE Studio
            </h1>
            <p className="text-[11px] sm:text-xs text-[var(--color-neu-text-light)] mt-0.5">
              Idea-to-Product scaffolding, architecture blueprints &amp; developer lifestyle tooling.
            </p>
          </div>
        </div>
        
        <div className="w-full h-12 sm:h-16 flex items-end gap-2 mt-4 p-2 rounded-[16px] neu-pressed">
          <div className="flex-1 bg-[var(--color-neu-text-light)] rounded-t-lg transition-all" style={{ height: '40%' }}></div>
          <div className="flex-1 bg-[var(--color-neu-accent)] rounded-t-lg transition-all" style={{ height: '80%', opacity: 0.8 }}></div>
          <div className="flex-1 bg-[var(--color-neu-text)] rounded-t-lg transition-all" style={{ height: '60%' }}></div>
          <div className="flex-1 bg-[var(--color-neu-accent)] rounded-t-lg transition-all" style={{ height: '95%' }}></div>
          <div className="flex-1 bg-[var(--color-neu-text-light)] rounded-t-lg transition-all" style={{ height: '50%' }}></div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 gap-3.5 flex-1 overflow-y-auto no-scrollbar pb-6">
        <button onClick={() => loadTool('Product Requirement Document')} className="w-full neu-button rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 flex items-center gap-4 text-left cursor-pointer hover:shadow-md transition-all">
          <div className="neu-pressed w-11 h-11 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center shrink-0">
            <FileText size={19} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase truncate">PRD Generator</h3>
            <p className="text-[9.5px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-0.5 opacity-80 truncate">Scaffold full product specs</p>
          </div>
        </button>

        <button onClick={() => loadTool('Room Schema')} className="w-full neu-button rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 flex items-center gap-4 text-left cursor-pointer hover:shadow-md transition-all">
          <div className="neu-pressed w-11 h-11 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center shrink-0">
            <Database size={19} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase truncate">Room Schema Creator</h3>
            <p className="text-[9.5px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-0.5 opacity-80 truncate">Generate Android DB entities</p>
          </div>
        </button>

        <button onClick={() => loadTool('Termux Setup')} className="w-full neu-button rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 flex items-center gap-4 text-left cursor-pointer hover:shadow-md transition-all">
          <div className="neu-pressed w-11 h-11 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center shrink-0">
            <Code size={19} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase truncate">Termux Builder</h3>
            <p className="text-[9.5px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-0.5 opacity-80 truncate">Automated environment scripts</p>
          </div>
        </button>
      </div>
    </div>
  );
};
