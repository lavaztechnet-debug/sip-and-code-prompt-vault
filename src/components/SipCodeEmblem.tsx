import React from 'react';
import { triggerHaptic } from '../utils/haptics';

export interface SipCodeEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  className?: string;
  showBadge?: boolean;
  withGlow?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const SipCodeEmblem: React.FC<SipCodeEmblemProps> = ({
  size = 'md',
  className = '',
  showBadge = false,
  withGlow = false,
  interactive = false,
  onClick,
}) => {
  const sizeMap: Record<string, { box: string; pixelSize: number }> = {
    xs: { box: 'w-7 h-7', pixelSize: 28 },
    sm: { box: 'w-10 h-10', pixelSize: 40 },
    md: { box: 'w-16 h-16', pixelSize: 64 },
    lg: { box: 'w-20 h-20 sm:w-22 sm:h-22', pixelSize: 88 },
    xl: { box: 'w-28 h-28', pixelSize: 112 },
    '2xl': { box: 'w-40 h-40', pixelSize: 160 },
  };

  const currentSize = typeof size === 'string' && sizeMap[size] 
    ? sizeMap[size] 
    : { box: '', pixelSize: typeof size === 'number' ? size : 40 };

  const customStyle = typeof size === 'number' 
    ? { width: `${size}px`, height: `${size}px` } 
    : undefined;

  const handleClick = (e: React.MouseEvent) => {
    if (interactive || onClick) {
      e.stopPropagation();
      triggerHaptic('light');
      if (onClick) onClick();
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 group ${interactive || onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
    >
      {/* Ambient Neumorphic Backlight Ring */}
      <div 
        style={customStyle}
        className={`rounded-full p-1 neu-convex transition-all duration-500 overflow-hidden shrink-0 flex items-center justify-center relative ${
          currentSize.box || (!customStyle ? 'w-10 h-10' : '')
        } ${
          withGlow ? 'shadow-lg shadow-amber-500/25 ring-1 ring-amber-500/30' : ''
        } ${
          interactive ? 'group-hover:scale-105 group-active:scale-95' : ''
        }`}
      >
        {/* Crisp Animated Vector SVG */}
        <svg 
          viewBox="0 0 512 512" 
          className="w-full h-full max-w-full max-h-full block select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Radial Gradient */}
            <radialGradient id={`emblemBg-${currentSize.pixelSize}`} cx="50%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#222632"/>
              <stop offset="55%" stopColor="#12151d"/>
              <stop offset="100%" stopColor="#08090d"/>
            </radialGradient>

            {/* Precision 24k Gold Bezel Gradient */}
            <linearGradient id={`emblemGoldRim-${currentSize.pixelSize}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb"/>
              <stop offset="14%" stopColor="#fde047"/>
              <stop offset="30%" stopColor="#d97706"/>
              <stop offset="48%" stopColor="#fffbeb"/>
              <stop offset="65%" stopColor="#f59e0b"/>
              <stop offset="85%" stopColor="#92400e"/>
              <stop offset="100%" stopColor="#fef08a"/>
            </linearGradient>

            {/* Deep Metallic Gold Dial Plate */}
            <radialGradient id={`emblemGoldPlate-${currentSize.pixelSize}`} cx="40%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#fffbeb"/>
              <stop offset="20%" stopColor="#facc15"/>
              <stop offset="50%" stopColor="#ca8a04"/>
              <stop offset="82%" stopColor="#78350f"/>
              <stop offset="100%" stopColor="#451a03"/>
            </radialGradient>

            {/* Ultra-Vibrant Luminous Steam Gradient */}
            <linearGradient id={`emblemLuminousSteam-${currentSize.pixelSize}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95"/>
              <stop offset="30%" stopColor="#38bdf8"/>
              <stop offset="60%" stopColor="#e0e7ff"/>
              <stop offset="85%" stopColor="#fde047"/>
              <stop offset="100%" stopColor="#f472b6"/>
            </linearGradient>

            {/* Glowing Cyber Steam Underlay */}
            <linearGradient id={`emblemSteamHalo-${currentSize.pixelSize}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0891b2"/>
              <stop offset="50%" stopColor="#38bdf8"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>

            {/* Electric Neon Cup Outline Gradient */}
            <linearGradient id={`emblemNeonCupGrad-${currentSize.pixelSize}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff"/>
              <stop offset="25%" stopColor="#38bdf8"/>
              <stop offset="50%" stopColor="#e0f2fe"/>
              <stop offset="75%" stopColor="#00f0ff"/>
              <stop offset="100%" stopColor="#38bdf8"/>
            </linearGradient>

            <linearGradient id={`emblemCyberGrad-${currentSize.pixelSize}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8"/>
              <stop offset="45%" stopColor="#06b6d4"/>
              <stop offset="80%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>

            {/* Warm Amber Center Glow */}
            <radialGradient id={`emblemAmberGlow-${currentSize.pixelSize}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#d97706" stopOpacity="0"/>
            </radialGradient>

            {/* Drop Shadows */}
            <filter id={`emblemShadow-${currentSize.pixelSize}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.65"/>
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.35"/>
            </filter>

            {/* Steam Luminous Halo Filter */}
            <filter id={`emblemSteamSuperGlow-${currentSize.pixelSize}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="wideBlur"/>
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="sharpBlur"/>
              <feMerge>
                <feMergeNode in="wideBlur"/>
                <feMergeNode in="sharpBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Neon Cup Outline Glow Filter */}
            <filter id={`emblemNeonCupGlow-${currentSize.pixelSize}`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="neonBlur"/>
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="coreBlur"/>
              <feMerge>
                <feMergeNode in="neonBlur"/>
                <feMergeNode in="coreBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id={`emblemGlow-${currentSize.pixelSize}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id={`emblemSubtleGlow-${currentSize.pixelSize}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <style>{`
              @keyframes sipSteamLeft_${currentSize.pixelSize} {
                0% { transform: translate(0, 0) scale(0.96); opacity: 0.75; }
                50% { transform: translate(-5px, -14px) scale(1.12); opacity: 1; filter: drop-shadow(0 0 10px #38bdf8); }
                100% { transform: translate(-10px, -26px) scale(1.22); opacity: 0.6; }
              }
              @keyframes sipSteamCenter_${currentSize.pixelSize} {
                0% { transform: translate(0, 0) scale(0.96); opacity: 0.8; }
                50% { transform: translate(2px, -18px) scale(1.15); opacity: 1; filter: drop-shadow(0 0 12px #fde047); }
                100% { transform: translate(4px, -32px) scale(1.28); opacity: 0.55; }
              }
              @keyframes sipSteamRight_${currentSize.pixelSize} {
                0% { transform: translate(0, 0) scale(0.96); opacity: 0.75; }
                50% { transform: translate(6px, -13px) scale(1.1); opacity: 1; filter: drop-shadow(0 0 10px #f472b6); }
                100% { transform: translate(10px, -24px) scale(1.2); opacity: 0.6; }
              }
              @keyframes sipBlink_${currentSize.pixelSize} {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.15; }
              }
              @keyframes sipPulseGlow_${currentSize.pixelSize} {
                0%, 100% { opacity: 0.45; transform: scale(1); }
                50% { opacity: 0.85; transform: scale(1.08); }
              }
              @keyframes sipNeonCupFlicker_${currentSize.pixelSize} {
                0%, 100% { 
                  opacity: 1; 
                  filter: drop-shadow(0 0 8px #00f0ff) drop-shadow(0 0 16px #06b6d4); 
                }
                8% { opacity: 0.95; }
                9% { opacity: 0.25; filter: drop-shadow(0 0 2px #00f0ff); }
                11% { opacity: 1; filter: drop-shadow(0 0 10px #00f0ff) drop-shadow(0 0 18px #06b6d4); }
                13% { opacity: 0.35; }
                15% { opacity: 1; }
                48% { opacity: 0.95; }
                49% { opacity: 0.4; }
                51% { opacity: 1; filter: drop-shadow(0 0 12px #00f0ff) drop-shadow(0 0 22px #38bdf8); }
                70% { opacity: 0.9; }
                72% { opacity: 1; }
                88% { opacity: 0.95; }
                89% { opacity: 0.3; }
                91% { opacity: 1; }
              }
              .sip-anim-left-${currentSize.pixelSize} {
                animation: sipSteamLeft_${currentSize.pixelSize} 3.2s ease-in-out infinite alternate;
                transform-origin: -44px -74px;
              }
              .sip-anim-center-${currentSize.pixelSize} {
                animation: sipSteamCenter_${currentSize.pixelSize} 2.6s ease-in-out infinite 0.4s alternate;
                transform-origin: 0px -130px;
              }
              .sip-anim-right-${currentSize.pixelSize} {
                animation: sipSteamRight_${currentSize.pixelSize} 3.0s ease-in-out infinite 0.8s alternate;
                transform-origin: 44px -74px;
              }
              .sip-anim-blink-${currentSize.pixelSize} {
                animation: sipBlink_${currentSize.pixelSize} 1.1s step-end infinite;
              }
              .sip-anim-glow-${currentSize.pixelSize} {
                animation: sipPulseGlow_${currentSize.pixelSize} 3.6s ease-in-out infinite;
                transform-origin: 256px 225px;
              }
              .sip-anim-neon-cup-${currentSize.pixelSize} {
                animation: sipNeonCupFlicker_${currentSize.pixelSize} 3.8s ease-in-out infinite;
              }
            `}</style>
          </defs>

          {/* 1. Base Slate Tile */}
          <rect 
            x="16" y="16" width="480" height="480" rx="108" 
            fill={`url(#emblemBg-${currentSize.pixelSize})`} 
            filter={`url(#emblemShadow-${currentSize.pixelSize})`}
          />
          
          {/* Gold Micro-Bevel Outer Frame */}
          <rect 
            x="18" y="18" width="476" height="476" rx="106" 
            fill="none" 
            stroke={`url(#emblemGoldRim-${currentSize.pixelSize})`} 
            strokeWidth="3.5" 
            opacity="0.9"
          />
          <rect x="26" y="26" width="460" height="460" rx="98" fill="none" stroke="#252a36" strokeWidth="1.5" opacity="0.6"/>

          {/* Cyber Corner Marks */}
          <path d="M 48 76 L 48 48 L 76 48" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
          <path d="M 464 76 L 464 48 L 436 48" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
          <path d="M 48 436 L 48 464 L 76 464" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
          <path d="M 464 436 L 464 464 L 436 464" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>

          {/* 2. Central Gold Medallion Dial */}
          <g filter={`url(#emblemShadow-${currentSize.pixelSize})`}>
            <circle cx="256" cy="226" r="178" fill={`url(#emblemGoldRim-${currentSize.pixelSize})`}/>
            <circle cx="256" cy="226" r="170" fill="#12141a" stroke="#78350f" strokeWidth="2"/>
            <circle cx="256" cy="226" r="164" fill={`url(#emblemGoldPlate-${currentSize.pixelSize})`}/>
            <circle cx="256" cy="226" r="148" fill="#0f1116" stroke="#fef08a" strokeWidth="1.5"/>
            <circle cx="256" cy="226" r="144" fill={`url(#emblemBg-${currentSize.pixelSize})`}/>
          </g>

          {/* Ambient Warm Amber Glow */}
          <circle 
            cx="256" cy="225" r="98" 
            fill={`url(#emblemAmberGlow-${currentSize.pixelSize})`} 
            className={`sip-anim-glow-${currentSize.pixelSize}`}
          />

          {/* Circuitry Traces */}
          <g opacity="0.5" stroke="#38bdf8" strokeWidth="1.5" fill="none">
            <path d="M 130 226 L 168 226 L 186 208" strokeDasharray="3 3"/>
            <circle cx="130" cy="226" r="2.5" fill="#38bdf8"/>
            <path d="M 382 226 L 344 226 L 326 244" strokeDasharray="3 3"/>
            <circle cx="382" cy="226" r="2.5" fill="#38bdf8"/>
            <path d="M 256 100 L 256 126" strokeDasharray="3 3"/>
            <circle cx="256" cy="100" r="2.5" fill="#38bdf8"/>
          </g>

          {/* Arched Text: SIP & CODE */}
          <path id={`archPath-${currentSize.pixelSize}`} d="M 136 194 A 134 134 0 0 1 376 194" fill="none"/>
          <text 
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontWeight="900" 
            fontSize="23" 
            fill="#fffbeb" 
            letterSpacing="4.5" 
            filter={`url(#emblemSubtleGlow-${currentSize.pixelSize})`}
          >
            <textPath href={`#archPath-${currentSize.pixelSize}`} startOffset="50%" textAnchor="middle">
              SIP &amp; CODE
            </textPath>
          </text>

          {/* 3. Center Tactile Porcelain Mug & Animated High-Prominence Steam */}
          <g transform="translate(256, 234)">
            {/* Left Animated High-Visibility Steam Ribbon { */}
            <g className={`sip-anim-left-${currentSize.pixelSize}`}>
              {/* Wide Glow Halo Underlay */}
              <path 
                d="M -44 -74 C -36 -88, -26 -98, -38 -114 C -44 -122, -50 -126, -52 -134 C -48 -142, -36 -148, -32 -158 C -24 -172, -34 -186, -46 -196" 
                fill="none" 
                stroke={`url(#emblemSteamHalo-${currentSize.pixelSize})`} 
                strokeWidth="12" 
                strokeLinecap="round" 
                opacity="0.65"
                filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}
              />
              {/* Foreground Neon Gradient */}
              <path 
                d="M -44 -74 C -36 -88, -26 -98, -38 -114 C -44 -122, -50 -126, -52 -134 C -48 -142, -36 -148, -32 -158 C -24 -172, -34 -186, -46 -196" 
                fill="none" 
                stroke={`url(#emblemLuminousSteam-${currentSize.pixelSize})`} 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}
              />
              {/* Bright Pure White Core Line */}
              <path 
                d="M -44 -74 C -36 -88, -26 -98, -38 -114 C -44 -122, -50 -126, -52 -134 C -48 -142, -36 -148, -32 -158 C -24 -172, -34 -186, -46 -196" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.95"
              />
            </g>
            
            {/* Center Animated High-Visibility Sparkle Steam Ribbon ; */}
            <g className={`sip-anim-center-${currentSize.pixelSize}`}>
              {/* Wide Glow Halo Underlay */}
              <circle cx="0" cy="-172" r="7" fill="#fde047" opacity="0.65" filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}/>
              <path 
                d="M 0 -158 C 4 -146, -2 -134, -5 -122 C -8 -110, 0 -98, 2 -86" 
                fill="none" 
                stroke={`url(#emblemSteamHalo-${currentSize.pixelSize})`} 
                strokeWidth="10" 
                strokeLinecap="round" 
                opacity="0.65"
                filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}
              />
              {/* Foreground Neon Gradient */}
              <circle cx="0" cy="-172" r="5" fill="#ffffff" stroke="#fde047" strokeWidth="2" filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}/>
              <path 
                d="M 0 -158 C 4 -146, -2 -134, -5 -122 C -8 -110, 0 -98, 2 -86" 
                fill="none" 
                stroke={`url(#emblemLuminousSteam-${currentSize.pixelSize})`} 
                strokeWidth="5.5" 
                strokeLinecap="round" 
                filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}
              />
              {/* Pure White Core Line */}
              <path 
                d="M 0 -158 C 4 -146, -2 -134, -5 -122 C -8 -110, 0 -98, 2 -86" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                opacity="0.95"
              />
            </g>

            {/* Right Animated High-Visibility Steam Ribbon } */}
            <g className={`sip-anim-right-${currentSize.pixelSize}`}>
              {/* Wide Glow Halo Underlay */}
              <path 
                d="M 44 -74 C 36 -88, 26 -98, 38 -114 C 44 -122, 50 -126, 52 -134 C 48 -142, 36 -148, 32 -158 C 24 -172, 34 -186, 46 -196" 
                fill="none" 
                stroke={`url(#emblemSteamHalo-${currentSize.pixelSize})`} 
                strokeWidth="12" 
                strokeLinecap="round" 
                opacity="0.65"
                filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}
              />
              {/* Foreground Neon Gradient */}
              <path 
                d="M 44 -74 C 36 -88, 26 -98, 38 -114 C 44 -122, 50 -126, 52 -134 C 48 -142, 36 -148, 32 -158 C 24 -172, 34 -186, 46 -196" 
                fill="none" 
                stroke={`url(#emblemLuminousSteam-${currentSize.pixelSize})`} 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                filter={`url(#emblemSteamSuperGlow-${currentSize.pixelSize})`}
              />
              {/* Bright Pure White Core Line */}
              <path 
                d="M 44 -74 C 36 -88, 26 -98, 38 -114 C 44 -122, 50 -126, 52 -134 C 48 -142, 36 -148, 32 -158 C 24 -172, 34 -186, 46 -196" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.95"
              />
            </g>

            {/* Saucer Plate */}
            <ellipse 
              cx="0" cy="74" rx="78" ry="15" 
              fill="#090a0d" 
              stroke={`url(#emblemGoldRim-${currentSize.pixelSize})`} 
              strokeWidth="2.5" 
              filter={`url(#emblemShadow-${currentSize.pixelSize})`}
            />
            <ellipse cx="0" cy="72" rx="68" ry="10.5" fill="#1e222b"/>

            {/* Cup Handle */}
            <path 
              d="M 46 -18 C 90 -18, 90 48, 42 48" 
              fill="none" 
              stroke={`url(#emblemGoldRim-${currentSize.pixelSize})`} 
              strokeWidth="12" 
              strokeLinecap="round" 
              filter={`url(#emblemShadow-${currentSize.pixelSize})`}
            />
            <path d="M 46 -18 C 84 -18, 84 48, 42 48" fill="none" stroke="#15171e" strokeWidth="6" strokeLinecap="round"/>

            {/* Cup Outer Body */}
            <path 
              d="M -54 -38 L -42 58 C -40 70, 40 70, 42 58 L 54 -38 Z" 
              fill={`url(#emblemBg-${currentSize.pixelSize})`} 
              stroke={`url(#emblemGoldRim-${currentSize.pixelSize})`} 
              strokeWidth="3.5" 
              filter={`url(#emblemShadow-${currentSize.pixelSize})`}
            />

            {/* Cup Rim & Crema */}
            <ellipse cx="0" cy="-38" rx="54" ry="16" fill="#14161c" stroke={`url(#emblemGoldRim-${currentSize.pixelSize})`} strokeWidth="3"/>
            <ellipse cx="0" cy="-38" rx="48" ry="12.5" fill={`url(#emblemGoldPlate-${currentSize.pixelSize})`} opacity="0.35"/>
            <ellipse cx="0" cy="-37" rx="45" ry="10" fill="#2d1505"/>
            
            {/* Latte Art Swirl */}
            <ellipse cx="-4" cy="-37" rx="34" ry="7" fill="#542b0c" opacity="0.85"/>
            <path d="M -18 -37 C -8 -41, 10 -33, 20 -38" fill="none" stroke="#fde047" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>

            {/* ============================================== */}
            {/* NEON BLINKING OUTLINE SURROUNDING COFFEE CUP   */}
            {/* ============================================== */}
            <g 
              className={`sip-anim-neon-cup-${currentSize.pixelSize}`} 
              filter={`url(#emblemNeonCupGlow-${currentSize.pixelSize})`}
            >
              {/* Neon Saucer Base Outer Outline */}
              <ellipse 
                cx="0" cy="74" rx="80" ry="16.5" 
                fill="none" 
                stroke={`url(#emblemNeonCupGrad-${currentSize.pixelSize})`} 
                strokeWidth="3" 
                opacity="0.95"
              />
              <ellipse cx="0" cy="74" rx="80" ry="16.5" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85"/>

              {/* Neon Cup Handle Outer Arc */}
              <path 
                d="M 46 -18 C 93 -18, 93 50, 42 50" 
                fill="none" 
                stroke={`url(#emblemNeonCupGrad-${currentSize.pixelSize})`} 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
              <path d="M 46 -18 C 93 -18, 93 50, 42 50" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85"/>

              {/* Neon Cup Body Silhouette Outline */}
              <path 
                d="M -56 -38 L -43 60 C -41 72, 41 72, 43 60 L 56 -38" 
                fill="none" 
                stroke={`url(#emblemNeonCupGrad-${currentSize.pixelSize})`} 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
              <path d="M -56 -38 L -43 60 C -41 72, 41 72, 43 60 L 56 -38" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85"/>

              {/* Neon Cup Rim Outline */}
              <ellipse 
                cx="0" cy="-38" rx="56" ry="17.5" 
                fill="none" 
                stroke={`url(#emblemNeonCupGrad-${currentSize.pixelSize})`} 
                strokeWidth="3"
              />
              <ellipse cx="0" cy="-38" rx="56" ry="17.5" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85"/>
            </g>

            {/* Cup Front Emblem: Interactive Terminal Screen >_ VAULT */}
            <rect 
              x="-34" y="-10" width="68" height="44" rx="12" 
              fill="#0d0e12" 
              stroke={`url(#emblemGoldRim-${currentSize.pixelSize})`} 
              strokeWidth="1.8" 
              filter={`url(#emblemSubtleGlow-${currentSize.pixelSize})`}
            />
            <text 
              x="-8" y="11" 
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" 
              fontWeight="900" 
              fontSize="17" 
              fill="#38bdf8" 
              textAnchor="middle" 
              filter={`url(#emblemGlow-${currentSize.pixelSize})`}
            >
              &gt;
            </text>
            <text 
              x="8" y="11" 
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" 
              fontWeight="900" 
              fontSize="17" 
              fill="#38bdf8" 
              textAnchor="middle" 
              className={`sip-anim-blink-${currentSize.pixelSize}`}
              filter={`url(#emblemGlow-${currentSize.pixelSize})`}
            >
              _
            </text>
            <text 
              x="0" y="27" 
              fontFamily="system-ui, -apple-system, sans-serif" 
              fontWeight="900" 
              fontSize="9" 
              fill="#fde047" 
              textAnchor="middle" 
              letterSpacing="1.5"
            >
              VAULT
            </text>
          </g>

          {/* 4. Bottom Metallic Banner Ribbon */}
          <g transform="translate(256, 416)" filter={`url(#emblemShadow-${currentSize.pixelSize})`}>
            <rect x="-160" y="-17" width="320" height="34" rx="17" fill={`url(#emblemGoldRim-${currentSize.pixelSize})`} stroke="#582900" strokeWidth="2"/>
            <rect x="-155" y="-13" width="310" height="26" rx="13" fill="#0f1116" stroke="#facc15" strokeWidth="1.2"/>
            <text 
              y="5" 
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
              fontWeight="900" 
              fontSize="11" 
              fill="#fffbeb" 
              textAnchor="middle" 
              letterSpacing="2.8" 
              filter={`url(#emblemSubtleGlow-${currentSize.pixelSize})`}
            >
              PROMPT VAULT STUDIO
            </text>
          </g>

          {/* Bottom Accent Edition Tag */}
          <g transform="translate(256, 458)">
            <rect x="-68" y="-10" width="136" height="20" rx="10" fill="#0d0e12" stroke={`url(#emblemCyberGrad-${currentSize.pixelSize})`} strokeWidth="1.5"/>
            <text 
              y="4" 
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" 
              fontWeight="bold" 
              fontSize="8.5" 
              fill="#38bdf8" 
              textAnchor="middle" 
              letterSpacing="1.8"
            >
              ANDROID • CLI
            </text>
          </g>
        </svg>
      </div>

      {/* Tactile LLD Badge */}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-[8px] tracking-wider px-1.5 py-0.5 rounded-full shadow-md uppercase border border-amber-300 pointer-events-none z-10 animate-pulse">
          LLD
        </span>
      )}
    </div>
  );
};
