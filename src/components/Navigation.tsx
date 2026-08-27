import React from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { ScreenName } from '../types';
import { Home, Library, PenTool, Beaker, Zap, Sparkles, Palette, TerminalSquare } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useVault();

  const handleNavClick = (id: ScreenName) => {
    if (currentScreen !== id) {
      setCurrentScreen(id);
      triggerHaptic('medium');
    }
  };

  const navItems: { id: ScreenName; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Command', icon: <Home size={18} /> },
    { id: 'vault', label: 'Vault', icon: <Library size={18} /> },
    { id: 'creator', label: 'Creator', icon: <PenTool size={18} /> },
    { id: 'optimizer', label: 'Refiner', icon: <Sparkles size={18} /> },
    { id: 'lab', label: 'Lab', icon: <Beaker size={18} /> },
    { id: 'product_studio', label: 'Studio', icon: <Zap size={18} /> },
    { id: 'sandbox', label: 'Themes', icon: <Palette size={18} /> },
    { id: 'deployment', label: 'Termux', icon: <TerminalSquare size={18} /> },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-[max(8px,calc(env(safe-area-inset-bottom,0px)+6px))] left-3 right-3 sm:left-6 sm:right-6 max-w-xl mx-auto neu-flat rounded-[28px] p-1.5 z-50 overflow-x-auto no-scrollbar shadow-2xl border border-[var(--color-neu-shadow-light)]/40"
    >
      <div className="flex justify-between items-center min-w-max px-1 gap-2">
        {navItems.map(item => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center min-w-[54px] h-[52px] px-2 rounded-[20px] transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive 
                  ? 'neu-pressed text-[var(--color-neu-accent)] font-bold scale-[1.03]' 
                  : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
              }`}
              title={item.label}
            >
              <div className="relative flex items-center justify-center">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--color-neu-accent)]" />
                )}
              </div>
              <span className={`text-[8.5px] font-sans uppercase tracking-tight mt-0.5 leading-none ${isActive ? 'font-bold text-[var(--color-neu-accent)]' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
