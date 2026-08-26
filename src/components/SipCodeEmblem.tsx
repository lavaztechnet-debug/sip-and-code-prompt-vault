import React, { useState } from 'react';

interface SipCodeEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBadge?: boolean;
  withGlow?: boolean;
}

export const SipCodeEmblem: React.FC<SipCodeEmblemProps> = ({
  size = 'md',
  className = '',
  showBadge = false,
  withGlow = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('/icon.svg');

  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-48 h-48',
  };

  const handleImgError = () => {
    // Fallback between svg and png
    if (imgSrc === '/icon.svg') {
      setImgSrc('/icon.png');
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Outer tactile neumorphic ring */}
      <div 
        className={`rounded-full p-1 neu-convex transition-all duration-300 ${sizeClasses[size]} ${
          withGlow ? 'shadow-lg shadow-amber-500/20' : ''
        }`}
      >
        <img
          src={imgSrc}
          alt="Sip & Code - Developer Lifestyle Asset"
          onError={handleImgError}
          referrerPolicy="no-referrer"
          className="w-full h-full rounded-full object-contain select-none"
        />
      </div>

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black font-black text-[8px] tracking-wider px-1.5 py-0.5 rounded-full shadow-xs uppercase border border-amber-300">
          LLD
        </span>
      )}
    </div>
  );
};
