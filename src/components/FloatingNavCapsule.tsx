import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { ScreenName } from '../types';
import { Menu, Home, Library, Eye, Sparkles, Beaker, Zap, Palette, TerminalSquare } from 'lucide-react';
import { NavigationDrawer } from './NavigationDrawer';

interface FloatingNavCapsuleProps {
  onOpenThemeModal?: () => void;
}

export const FloatingNavCapsule: React.FC<FloatingNavCapsuleProps> = ({ onOpenThemeModal }) => {
  const { currentScreen, setCurrentScreen } = useVault();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const screenMetadata: Record<ScreenName, { label: string; icon: React.ReactNode }> = {
    command_center: { label: 'Command', icon: <Home size={15} /> },
    vault: { label: 'Vault', icon: <Library size={15} /> },
    style_dna: { label: 'Style DNA', icon: <Eye size={15} /> },
    creator: { label: 'Creator', icon: <Sparkles size={15} /> },
    optimizer: { label: 'Refiner', icon: <Sparkles size={15} /> },
    lab: { label: 'AI Lab', icon: <Beaker size={15} /> },
    product_studio: { label: 'Studio', icon: <Zap size={15} /> },
    sandbox: { label: 'Themes', icon: <Palette size={15} /> },
    deployment: { label: 'Termux', icon: <TerminalSquare size={15} /> }
  };

  const activeMeta = screenMetadata[currentScreen] || { label: 'Menu', icon: <Home size={15} /> };

  return (
    <>
      {/* Floating Top-Left Tactile Menu Trigger */}
      <div className="fixed top-[max(12px,calc(env(safe-area-inset-top,0px)+10px))] left-4 z-40">
        <button
          onClick={() => {
            triggerHaptic('medium');
            setIsDrawerOpen(true);
          }}
          className="neu-button px-3.5 py-1.5 rounded-full flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-[var(--color-neu-shadow-light)]/50 shadow-md backdrop-blur-xs group"
          title="Open Vault Navigation Menu"
        >
          <div className="w-5 h-5 rounded-lg neu-pressed flex items-center justify-center text-[var(--color-neu-accent)] shrink-0">
            <Menu size={13} className="transition-transform group-hover:rotate-90" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-neu-text)]">
            <span className="text-[var(--color-neu-accent)] shrink-0">{activeMeta.icon}</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider">{activeMeta.label}</span>
          </div>
        </button>
      </div>

      {/* Slide-over Tactile Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenThemeModal={onOpenThemeModal}
      />
    </>
  );
};
