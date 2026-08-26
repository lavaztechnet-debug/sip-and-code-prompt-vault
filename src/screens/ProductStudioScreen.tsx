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
    <div className="p-6 pt-12 animate-fade-in pb-32 flex flex-col h-full gap-6">
      {/* Brand & Studio Showcase Header */}
      <header className="neu-flat rounded-[28px] p-7 flex flex-col justify-center border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex items-center gap-5">
          <SipCodeEmblem size="xl" showBadge withGlow className="shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Thread-Art Edition
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono neu-pressed text-[var(--color-neu-accent)] font-bold">
                Premium Asset
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif italic text-[var(--color-neu-text)] mt-1">
              SIP &amp; CODE Studio
            </h1>
            <p className="text-xs text-[var(--color-neu-text-light)] mt-0.5">
              Idea-to-Product scaffolding, architecture blueprints &amp; developer lifestyle tooling.
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 flex items-end gap-2 mt-6 p-2 rounded-[16px] neu-pressed">
          <div className="flex-1 bg-[var(--color-neu-text-light)] rounded-t-lg transition-all" style={{ height: '40%' }}></div>
          <div className="flex-1 bg-[var(--color-neu-accent)] rounded-t-lg transition-all" style={{ height: '80%', opacity: 0.8 }}></div>
          <div className="flex-1 bg-[var(--color-neu-text)] rounded-t-lg transition-all" style={{ height: '60%' }}></div>
          <div className="flex-1 bg-[var(--color-neu-accent)] rounded-t-lg transition-all" style={{ height: '95%' }}></div>
          <div className="flex-1 bg-[var(--color-neu-text-light)] rounded-t-lg transition-all" style={{ height: '50%' }}></div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto no-scrollbar pb-10">
        <button onClick={() => loadTool('Product Requirement Document')} className="w-full neu-button rounded-[24px] p-6 flex flex-col gap-4 text-left cursor-pointer hover:shadow-md transition-all">
          <div className="neu-pressed w-12 h-12 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide uppercase">PRD Generator</h3>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-1 opacity-80">Scaffold full product specs</p>
          </div>
        </button>

        <button onClick={() => loadTool('Room Schema')} className="w-full neu-button rounded-[24px] p-6 flex flex-col gap-4 text-left cursor-pointer hover:shadow-md transition-all">
          <div className="neu-pressed w-12 h-12 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center">
            <Database size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide uppercase">Room Schema Creator</h3>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-1 opacity-80">Generate Android DB entities</p>
          </div>
        </button>

        <button onClick={() => loadTool('Termux Setup')} className="w-full neu-button rounded-[24px] p-6 flex flex-col gap-4 text-left cursor-pointer hover:shadow-md transition-all">
          <div className="neu-pressed w-12 h-12 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center">
            <Code size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide uppercase">Termux Builder</h3>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-1 opacity-80">Automated environment scripts</p>
          </div>
        </button>
      </div>
    </div>
  );
};
