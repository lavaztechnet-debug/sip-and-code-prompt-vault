import React, { useState } from 'react';
import { VaultProvider, useVault } from './context/VaultContext';
import { Navigation } from './components/Navigation';
import { FloatingNavCapsule } from './components/FloatingNavCapsule';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { Palette } from 'lucide-react';
import { triggerHaptic } from './utils/haptics';

// Screens
import { CommandCenterScreen } from './screens/CommandCenterScreen';
import { VaultScreen } from './screens/VaultScreen';
import { StyleExtractorScreen } from './screens/StyleExtractorScreen';
import { CreatorScreen } from './screens/CreatorScreen';
import { OptimizerScreen } from './screens/OptimizerScreen';
import { LabScreen } from './screens/LabScreen';
import { ProductStudioScreen } from './screens/ProductStudioScreen';
import { SandboxScreen } from './screens/SandboxScreen';
import { DeploymentScreen } from './screens/DeploymentScreen';
import { DynamicBackground } from './components/DynamicBackground';

const MainLayout: React.FC = () => {
  const { currentScreen, activeTheme, navigationMode } = useVault();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'command_center': return <CommandCenterScreen />;
      case 'vault': return <VaultScreen />;
      case 'style_dna': return <StyleExtractorScreen />;
      case 'creator': return <CreatorScreen />;
      case 'optimizer': return <OptimizerScreen />;
      case 'lab': return <LabScreen />;
      case 'product_studio': return <ProductStudioScreen />;
      case 'sandbox': return <SandboxScreen />;
      case 'deployment': return <DeploymentScreen />;
      default: return <CommandCenterScreen />;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[var(--color-neu-bg)] text-[var(--color-neu-text)] relative overflow-hidden flex flex-col select-none">
      <DynamicBackground />

      {/* Floating Tactile Top Navigation Capsule (Drawer Trigger) */}
      <FloatingNavCapsule onOpenThemeModal={() => setIsThemeModalOpen(true)} />

      {/* Floating Global Theme Quick-Switcher respecting Top Safe Area */}
      <div className="fixed top-[max(12px,calc(env(safe-area-inset-top,0px)+10px))] right-4 z-40">
        <button
          onClick={() => {
            setIsThemeModalOpen(true);
            triggerHaptic('light');
          }}
          className="neu-button px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer text-xs font-bold transition-transform hover:scale-105 active:scale-95 border border-[var(--color-neu-shadow-light)]/50 shadow-md backdrop-blur-xs"
          title="Change Theme & Atmosphere"
        >
          <div 
            className="w-2.5 h-2.5 rounded-full shadow-xs shrink-0" 
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
          <Palette size={13} className="text-[var(--color-neu-accent)] shrink-0" />
          <span className="text-[10px] sm:text-[11px] text-[var(--color-neu-text)] font-semibold truncate max-w-[80px] sm:max-w-none">
            {activeTheme.name}
          </span>
        </button>
      </div>

      {/* Main Screen Canvas with dynamic bottom padding */}
      <div className={`flex-1 overflow-y-auto no-scrollbar w-full max-w-2xl mx-auto flex flex-col ${navigationMode === 'dock' ? 'pb-24' : 'pb-4 sm:pb-6'}`}>
        {renderScreen()}
      </div>

      {/* Optional classic bottom dock if user toggles to 'dock' mode */}
      {navigationMode === 'dock' && <Navigation />}

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

