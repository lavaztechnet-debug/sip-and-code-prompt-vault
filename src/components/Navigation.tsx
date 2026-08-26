import React from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { ScreenName } from '../types';
import { Home, Library, PenTool, Beaker, Zap, MessageSquare, Palette, TerminalSquare } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useVault();

  const handleNavClick = (id: ScreenName) => {
    if (currentScreen !== id) {
      setCurrentScreen(id);
      triggerHaptic('medium');
    }
  };

  const navItems: { id: ScreenName; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Command', icon: <Home size={20} /> },
    { id: 'vault', label: 'Vault', icon: <Library size={20} /> },
    { id: 'creator', label: 'Creator', icon: <PenTool size={20} /> },
    { id: 'workspace', label: 'Workspace', icon: <MessageSquare size={20} /> },
    { id: 'lab', label: 'Lab', icon: <Beaker size={20} /> },
    { id: 'product_studio', label: 'Studio', icon: <Zap size={20} /> },
    { id: 'sandbox', label: 'Sandbox', icon: <Palette size={20} /> },
    { id: 'deployment', label: 'Deploy', icon: <TerminalSquare size={20} /> },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 neu-flat rounded-[32px] p-2 z-50 overflow-x-auto no-scrollbar">
      <div className="flex justify-between items-center min-w-max px-2 gap-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 ${
              currentScreen === item.id ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-flat text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </nav>
  );
};
