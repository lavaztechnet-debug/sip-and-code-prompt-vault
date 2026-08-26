import React, { useState } from 'react';
import { VaultProvider, useVault } from './context/VaultContext';
import { Navigation } from './components/Navigation';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { Palette } from 'lucide-react';
import { triggerHaptic } from './utils/haptics';

// Screens
import { CommandCenterScreen } from './screens/CommandCenterScreen';
import { VaultScreen } from './screens/VaultScreen';
import { CreatorScreen } from './screens/CreatorScreen';
import { WorkspaceHubScreen } from './screens/WorkspaceHubScreen';
import { LabScreen } from './screens/LabScreen';
import { ProductStudioScreen } from './screens/ProductStudioScreen';
import { SandboxScreen } from './screens/SandboxScreen';
import { DeploymentScreen } from './screens/DeploymentScreen';

const MainLayout: React.FC = () => {
  const { currentScreen, activeTheme } = useVault();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'command_center': return <CommandCenterScreen />;
      case 'vault': return <VaultScreen />;
      case 'creator': return <CreatorScreen />;
      case 'workspace': return <WorkspaceHubScreen />;
      case 'lab': return <LabScreen />;
      case 'product_studio': return <ProductStudioScreen />;
      case 'sandbox': return <SandboxScreen />;
      case 'deployment': return <DeploymentScreen />;
      default: return <CommandCenterScreen />;
    }
  };

  return (
    <div className="h-screen w-full bg-[var(--color-neu-bg)] text-[var(--color-neu-text)] relative overflow-hidden flex flex-col">
      {/* Floating Global Theme Quick-Switcher */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => {
            setIsThemeModalOpen(true);
            triggerHaptic('light');
          }}
          className="neu-button px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer text-xs font-bold transition-transform hover:scale-105 active:scale-95 border border-[var(--color-neu-shadow-light)]/40 shadow-md"
          title="Change Theme & Atmosphere"
        >
          <div 
            className="w-2.5 h-2.5 rounded-full shadow-xs" 
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
          <Palette size={13} className="text-[var(--color-neu-accent)]" />
          <span className="hidden sm:inline text-[11px] text-[var(--color-neu-text)]">
            {activeTheme.name}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {renderScreen()}
      </div>

      <Navigation />

      <ThemeSelectorModal 
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <VaultProvider>
      <MainLayout />
    </VaultProvider>
  );
}

