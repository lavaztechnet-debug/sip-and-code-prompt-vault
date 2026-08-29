export type Category = 
  | 'All'
  | 'General Apps' 
  | 'Android System' 
  | 'Prompt Engineering' 
  | 'Meta Prompts'
  | 'Termux CLI'
  | 'Documents' 
  | 'Tools' 
  | 'Code & Architecture'
  | 'Research & Synthesis'
  | 'Writing & Content'
  | 'Business & Strategy'
  | 'Monetization & Sales'
  | 'Productivity & Systems'
  | 'Career & Leadership'
  | 'Data & Analytics'
  | 'UI/UX & Design'
  | 'Learning & Mastery'
  | 'Life & Strategy'
  | 'Image & Gallery' 
  | 'Creative' 
  | 'Horror' 
  | 'Music' 
  | 'Utility';

export interface Prompt {
  id: string;
  title: string;
  category: Category;
  tags: string[];
  template: string;
  example: string;
  notes: string;
  isFavorite?: boolean;
}

export interface VariableProfile {
  id: string;
  name: string;
  description: string;
  icon?: string;
  variables: Record<string, string>;
  isDefault?: boolean;
  updatedAt?: string;
}

export interface AIModelOption {
  id: string;
  name: string;
  provider: 'openrouter' | 'local_termux' | 'simulation';
  contextLength: number;
  description: string;
  tag: 'Free' | 'Local' | 'Fast' | 'Reasoning';
  pricing: string;
}

export interface TermuxBridgeConfig {
  endpoint: string; // e.g. "http://localhost:8080/v1" or "http://127.0.0.1:11434/v1"
  modelName: string;
  apiKey?: string;
  systemPrompt?: string;
  temperature: number;
  maxTokens: number;
  isConnected: boolean;
  lastPingMs?: number;
}

export type ThemeCategory = 'Light' | 'Dark' | 'Cyber' | 'Warm' | 'Vibrant';

export interface ThemeColors {
  bg: string;
  shadowDark: string;
  shadowLight: string;
  text: string;
  textLight: string;
  accent: string;
  convexGrad1?: string;
  convexGrad2?: string;
  concaveGrad1?: string;
  concaveGrad2?: string;
  border?: string;
}

export interface ThemeStyle {
  id: string;
  name: string;
  category: ThemeCategory;
  description: string;
  colors: ThemeColors;
  isDark?: boolean;
}

export type ScreenName = 
  | 'command_center'
  | 'vault'
  | 'style_dna'
  | 'creator'
  | 'lab'
  | 'product_studio'
  | 'optimizer'
  | 'sandbox'
  | 'deployment';

export type NavigationMode = 'drawer' | 'dock';

