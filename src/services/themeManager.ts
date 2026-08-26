import { ThemeStyle, ThemeColors } from '../types';
import { AVAILABLE_THEMES, DEFAULT_THEME_ID } from '../data/themes';

const STORAGE_KEY = 'prompt_vault_active_theme';
const CUSTOM_OVERRIDE_KEY = 'prompt_vault_custom_theme_overrides';

export function getStoredThemeId(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && AVAILABLE_THEMES.some(t => t.id === saved)) {
      return saved;
    }
  } catch (e) {
    console.warn('Error reading stored theme:', e);
  }
  return DEFAULT_THEME_ID;
}

export function getThemeById(id: string): ThemeStyle {
  const found = AVAILABLE_THEMES.find(t => t.id === id);
  return found || AVAILABLE_THEMES[0];
}

export function applyThemeToDOM(theme: ThemeStyle, customColors?: Partial<ThemeColors>) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const colors = { ...theme.colors, ...(customColors || {}) };

  // Set CSS variables
  root.style.setProperty('--color-neu-bg', colors.bg);
  root.style.setProperty('--color-neu-shadow-dark', colors.shadowDark);
  root.style.setProperty('--color-neu-shadow-light', colors.shadowLight);
  root.style.setProperty('--color-neu-text', colors.text);
  root.style.setProperty('--color-neu-text-light', colors.textLight);
  root.style.setProperty('--color-neu-accent', colors.accent);

  if (colors.convexGrad1 && colors.convexGrad2) {
    root.style.setProperty('--color-neu-convex-1', colors.convexGrad1);
    root.style.setProperty('--color-neu-convex-2', colors.convexGrad2);
  } else {
    root.style.setProperty('--color-neu-convex-1', colors.bg);
    root.style.setProperty('--color-neu-convex-2', colors.shadowDark);
  }

  if (colors.concaveGrad1 && colors.concaveGrad2) {
    root.style.setProperty('--color-neu-concave-1', colors.concaveGrad1);
    root.style.setProperty('--color-neu-concave-2', colors.concaveGrad2);
  } else {
    root.style.setProperty('--color-neu-concave-1', colors.shadowDark);
    root.style.setProperty('--color-neu-concave-2', colors.bg);
  }

  if (colors.border) {
    root.style.setProperty('--color-neu-border', colors.border);
  }

  // Set dataset attributes for conditional Tailwind styling
  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-theme-mode', theme.isDark ? 'dark' : 'light');

  // Update theme meta color if tag exists
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', colors.bg);
  }
}

export function saveActiveThemeId(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch (e) {
    console.warn('Failed to persist active theme:', e);
  }
}
