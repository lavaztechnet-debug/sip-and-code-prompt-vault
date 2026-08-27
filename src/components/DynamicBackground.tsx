import React from 'react';

export const DynamicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply">
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-neu-shadow-dark)] blur-[80px] opacity-20 animate-blob mix-blend-screen" />
      <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-neu-accent)] blur-[100px] opacity-15 animate-blob animation-delay-2000 mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-[var(--color-neu-shadow-dark)] blur-[100px] opacity-20 animate-blob animation-delay-4000 mix-blend-screen" />
      
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
    </div>
  );
};
