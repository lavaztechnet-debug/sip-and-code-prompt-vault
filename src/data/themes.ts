import { ThemeStyle } from '../types';

export const AVAILABLE_THEMES: ThemeStyle[] = [
  {
    id: 'classic_sand',
    name: 'Warm Sand',
    category: 'Warm',
    description: 'Classic tactile clay neumorphism with warm earthy undertones and soft cream highlights.',
    isDark: false,
    colors: {
      bg: '#E6E2D3',
      shadowDark: '#C5C1B3',
      shadowLight: '#FFFFFF',
      text: '#4A4538',
      textLight: '#867E6E',
      accent: '#2D2A24',
      convexGrad1: '#F6F2E2',
      convexGrad2: '#CFCBC0',
      concaveGrad1: '#CFCBC0',
      concaveGrad2: '#F6F2E2',
      border: '#D8D4C5'
    }
  },
  {
    id: 'obsidian_titanium',
    name: 'Obsidian Titanium',
    category: 'Dark',
    description: 'Executive dark matte carbon slate with deep ambient shadows and warm amber accents.',
    isDark: true,
    colors: {
      bg: '#181A1F',
      shadowDark: '#0D0F12',
      shadowLight: '#23272F',
      text: '#E2E8F0',
      textLight: '#8B949E',
      accent: '#F59E0B',
      convexGrad1: '#1F2229',
      convexGrad2: '#14161A',
      concaveGrad1: '#14161A',
      concaveGrad2: '#1F2229',
      border: '#2D3139'
    }
  },
  {
    id: 'cyberpunk_matrix',
    name: 'Cyberpunk Terminal',
    category: 'Cyber',
    description: 'High-contrast nocturnal terminal with electric cyan, synthwave pink, and neon matrix highlights.',
    isDark: true,
    colors: {
      bg: '#0D1117',
      shadowDark: '#05070A',
      shadowLight: '#161E2E',
      text: '#38F9D7',
      textLight: '#58A6FF',
      accent: '#00F2FE',
      convexGrad1: '#131A24',
      convexGrad2: '#080B10',
      concaveGrad1: '#080B10',
      concaveGrad2: '#131A24',
      border: '#1F2D3D'
    }
  },
  {
    id: 'nordic_frost',
    name: 'Nordic Polar Frost',
    category: 'Light',
    description: 'Clean Scandinavian architectural white-gray palette with royal cobalt accents.',
    isDark: false,
    colors: {
      bg: '#EEF2F6',
      shadowDark: '#CAD3DC',
      shadowLight: '#FFFFFF',
      text: '#1E293B',
      textLight: '#64748B',
      accent: '#0284C7',
      convexGrad1: '#F8FAFC',
      convexGrad2: '#E2E8F0',
      concaveGrad1: '#E2E8F0',
      concaveGrad2: '#F8FAFC',
      border: '#CBD5E1'
    }
  },
  {
    id: 'vintage_espresso',
    name: 'Vintage Espresso',
    category: 'Warm',
    description: 'Handcrafted antiquarian parchment, rich roasted coffee bean, and warm sepia tones.',
    isDark: false,
    colors: {
      bg: '#EBE2D5',
      shadowDark: '#C9BEAD',
      shadowLight: '#FAF5ED',
      text: '#3E2723',
      textLight: '#6D4C41',
      accent: '#4E342E',
      convexGrad1: '#F4ECE0',
      convexGrad2: '#D6CBBD',
      concaveGrad1: '#D6CBBD',
      concaveGrad2: '#F4ECE0',
      border: '#DDD2C3'
    }
  },
  {
    id: 'emerald_phosphor',
    name: 'Emerald Phosphor',
    category: 'Cyber',
    description: 'Deep military-grade phosphor CRT monitor theme with luminous mint and emerald readouts.',
    isDark: true,
    colors: {
      bg: '#0C1814',
      shadowDark: '#040B09',
      shadowLight: '#152C24',
      text: '#4EFA94',
      textLight: '#2ECC71',
      accent: '#00FF88',
      convexGrad1: '#12241E',
      convexGrad2: '#08110E',
      concaveGrad1: '#08110E',
      concaveGrad2: '#12241E',
      border: '#1E3B30'
    }
  },
  {
    id: 'royal_indigo',
    name: 'Royal Velvet Indigo',
    category: 'Dark',
    description: 'Deep midnight blue and interstellar indigo with radiant violet and lavender glow.',
    isDark: true,
    colors: {
      bg: '#131524',
      shadowDark: '#080911',
      shadowLight: '#20233C',
      text: '#E0E7FF',
      textLight: '#818CF8',
      accent: '#6366F1',
      convexGrad1: '#191C30',
      convexGrad2: '#0E101C',
      concaveGrad1: '#0E101C',
      concaveGrad2: '#191C30',
      border: '#272B4B'
    }
  },
  {
    id: 'terracotta_stone',
    name: 'Tuscan Terracotta',
    category: 'Warm',
    description: 'Mediterranean sun-baked clay, blush granite, and rich Tuscan ceramic tones.',
    isDark: false,
    colors: {
      bg: '#F3EAE5',
      shadowDark: '#D4C5BD',
      shadowLight: '#FFFFFF',
      text: '#4A3531',
      textLight: '#8C6D65',
      accent: '#9E4738',
      convexGrad1: '#FAF4F1',
      convexGrad2: '#E2D5CF',
      concaveGrad1: '#E2D5CF',
      concaveGrad2: '#FAF4F1',
      border: '#E0D0C8'
    }
  },
  {
    id: 'desert_amber',
    name: 'Desert Sunset Amber',
    category: 'Vibrant',
    description: 'Atmospheric twilight dunes with scorched copper, molten amber, and smoky basalt.',
    isDark: true,
    colors: {
      bg: '#211B17',
      shadowDark: '#100D0B',
      shadowLight: '#332B25',
      text: '#FED7AA',
      textLight: '#FB923C',
      accent: '#F97316',
      convexGrad1: '#2B231E',
      convexGrad2: '#181411',
      concaveGrad1: '#181411',
      concaveGrad2: '#2B231E',
      border: '#3B3029'
    }
  },
  {
    id: 'monochrome_studio',
    name: 'Monochrome Industrial',
    category: 'Light',
    description: 'Swiss brutalist neutral studio with high-contrast grayscale geometry and deep tactile bevels.',
    isDark: false,
    colors: {
      bg: '#EAEAEA',
      shadowDark: '#C7C7C7',
      shadowLight: '#FFFFFF',
      text: '#171717',
      textLight: '#525252',
      accent: '#0A0A0A',
      convexGrad1: '#F5F5F5',
      convexGrad2: '#D9D9D9',
      concaveGrad1: '#D9D9D9',
      concaveGrad2: '#F5F5F5',
      border: '#D0D0D0'
    }
  },
  {
    id: 'tokyo_synthwave',
    name: 'Tokyo Synthwave',
    category: 'Vibrant',
    description: 'Retro-futuristic neon dusk with vivid magenta, laser cyan, and deep purple titanium.',
    isDark: true,
    colors: {
      bg: '#161321',
      shadowDark: '#0A0811',
      shadowLight: '#241F36',
      text: '#F472B6',
      textLight: '#38BDF8',
      accent: '#E879F9',
      convexGrad1: '#1E192D',
      convexGrad2: '#100E18',
      concaveGrad1: '#100E18',
      concaveGrad2: '#1E192D',
      border: '#2C2542'
    }
  },
  {
    id: 'medallion_gold',
    name: 'Sip & Code Gold',
    category: 'Warm',
    description: 'Signature luxury medallion coin styling with polished champagne gold and deep bronze shadow rings.',
    isDark: true,
    colors: {
      bg: '#1A1C20',
      shadowDark: '#0C0D0F',
      shadowLight: '#282C33',
      text: '#FDE68A',
      textLight: '#D4AF37',
      accent: '#F59E0B',
      convexGrad1: '#22252B',
      convexGrad2: '#141519',
      concaveGrad1: '#141519',
      concaveGrad2: '#22252B',
      border: '#3D341C'
    }
  }
];

export const DEFAULT_THEME_ID = 'classic_sand';
