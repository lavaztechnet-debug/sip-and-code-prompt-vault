import { VariableProfile } from '../types';
import { getCurrentUser } from './googleAuth';
import { db } from './firestore';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const STORAGE_KEY = 'prompt_vault_variable_profiles';
const ACTIVE_PROFILE_KEY = 'prompt_vault_active_profile_id';

export const INITIAL_VARIABLE_PROFILES: VariableProfile[] = [
  {
    id: 'prof-android-architect',
    name: 'Android 16 & Kotlin Architect',
    description: 'Specialized profile for Android 16 (API 36), Room, Coroutines, and Termux CLI zero-Gradle builds.',
    icon: '📱',
    variables: {
      profession: 'Principal Android Systems Architect',
      domain: 'Android 16 (API 36) & Kotlin Systems Development',
      goal: 'Design a modular, zero-Gradle, high-performance offline architecture',
      tone: 'Authoritative, precise, and performance-centric',
      language: 'Kotlin',
      tech_stack: 'Kotlin, Coroutines, Flow, SQLite/Room, AAPT2, D8',
      product_type: 'offline-first native Android utility',
      target_audience: 'Power users, systems engineers, and CLI enthusiasts',
      packages: 'git, nodejs, openjdk-17, clang, python, aapt, zipalign',
      entities_list: 'PromptEntity, VariablePresetEntity, ExecutionLogEntity',
      model_target: 'on-device llama.cpp and OpenRouter free-tier LLMs',
    },
    isDefault: true,
  },
  {
    id: 'prof-termux-hacker',
    name: 'Termux CLI & Linux Systems',
    description: 'Profile for POSIX shell scripting, ARM64 optimization, proot-distro, and microservices.',
    icon: '⚡',
    variables: {
      profession: 'Linux Systems & Embedded Android Engineer',
      domain: 'Termux POSIX Shell & ARM64 Linux Subsystems',
      goal: 'Scaffold zero-overhead CLI utilities and automated local pipelines',
      tone: 'Concise, rigorous, and UNIX-philosophical',
      language: 'Bash & POSIX Shell',
      packages: 'build-essential, cmake, git, python, curl, jq, termux-api',
      target_environment: 'Termux Android CLI environment',
      script_purpose: 'Automate build, testing, and daemon background execution',
    },
  },
  {
    id: 'prof-meta-optimizer',
    name: 'Meta-Prompt Optimizer & Evaluator',
    description: 'Context for DSPy-style prompt teleprompter optimization, boundary constraints, and few-shot calibration.',
    icon: '🧠',
    variables: {
      profession: 'Staff Prompt Engineer & LLM Alignment Architect',
      domain: 'DSPy Optimization, Prompt Decompilation & Guardrails',
      goal: 'Maximize reasoning fidelity, eliminate hallucinations, and minimize token burn',
      tone: 'Analytical, formal, and structured',
      target_model: 'DeepSeek-R1 / Llama 3.3 70B Free',
      constraint_level: 'Strict zero-shot formatting with schema enforcement',
    },
  },
  {
    id: 'prof-saas-founder',
    name: 'B2B SaaS Founder & PRD Lead',
    description: 'Profile for drafting high-converting PRDs, product strategy, technical roadmaps, and value propositions.',
    icon: '💼',
    variables: {
      profession: 'Founder & Chief Product Officer',
      domain: 'B2B Developer Tooling & AI Workspaces',
      product_type: 'AI-assisted developer workspace and prompt vault',
      target_audience: 'AI Engineers, prompt designers, and technical team leads',
      goal: 'Achieve product-market fit and frictionless developer onboarding',
      tone: 'Strategic, clear, and impact-driven',
    },
  },
  {
    id: 'prof-creative-writer',
    name: 'Cyberpunk & Sci-Fi Author',
    description: 'Vivid, atmospheric setting and character parameters for speculative fiction and world-building.',
    icon: '🌌',
    variables: {
      genre: 'Neo-Cyberpunk Hard Sci-Fi',
      setting: 'Orbital Sub-Stratosphere Colony 09 in the year 2142',
      character_description: 'An augmented neural interface repair technician with an obsolete cybernetic eye',
      discovery: 'An encrypted quantum telemetry broadcast transmitting from an abandoned lunar relay station',
      tone: 'Atmospheric, gritty, sensory, and cinematic',
    },
  },
];

export function getVariableProfiles(): VariableProfile[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse variable profiles:', e);
  }
  return INITIAL_VARIABLE_PROFILES;
}

export function saveVariableProfiles(profiles: VariableProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    const user = getCurrentUser();
    if (user && db) {
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, { variableProfiles: profiles, updatedAt: serverTimestamp() }, { merge: true }).catch(err => {
        console.error('Error syncing profiles to Firestore:', err);
      });
    }
  } catch (e) {
    console.error('Failed to save variable profiles:', e);
  }
}

export function getActiveProfileId(): string {
  try {
    const saved = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (saved) return saved;
  } catch (e) {}
  return INITIAL_VARIABLE_PROFILES[0].id;
}

export function setActiveProfileId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch (e) {}
}

export function createVariableProfile(profile: Omit<VariableProfile, 'id' | 'updatedAt'>): VariableProfile {
  const profiles = getVariableProfiles();
  const newProfile: VariableProfile = {
    ...profile,
    id: `prof-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    updatedAt: new Date().toISOString(),
  };
  const updated = [...profiles, newProfile];
  saveVariableProfiles(updated);
  return newProfile;
}

export function updateVariableProfile(updatedProfile: VariableProfile): void {
  const profiles = getVariableProfiles();
  const updated = profiles.map(p => p.id === updatedProfile.id ? { ...updatedProfile, updatedAt: new Date().toISOString() } : p);
  saveVariableProfiles(updated);
}

export function deleteVariableProfile(id: string): void {
  const profiles = getVariableProfiles();
  if (profiles.length <= 1) return; // Keep at least one
  const updated = profiles.filter(p => p.id !== id);
  saveVariableProfiles(updated);
}

/**
 * Extracts placeholder variable names from a prompt template string.
 * Supports both [variable_name] and {{variable_name}} syntax.
 */
export function extractPlaceholders(template: string): string[] {
  const bracketMatches = template.match(/\[([a-zA-Z0-9_\-\/]+)\]/g) || [];
  const mustacheMatches = template.match(/\{\{([a-zA-Z0-9_\-\/]+)\}\}/g) || [];
  
  const extracted = new Set<string>();
  
  bracketMatches.forEach(m => {
    const key = m.slice(1, -1).trim();
    if (key) extracted.add(key);
  });
  
  mustacheMatches.forEach(m => {
    const key = m.slice(2, -2).trim();
    if (key) extracted.add(key);
  });
  
  return Array.from(extracted);
}

/**
 * Applies a variable profile to a given prompt template and returns resolved text and matched mapping.
 */
export function applyProfileToTemplate(
  template: string, 
  profile: VariableProfile,
  existingVariables: Record<string, string> = {}
): {
  resolvedText: string;
  populatedVariables: Record<string, string>;
  matchedCount: number;
  unmatchedCount: number;
} {
  const placeholders = extractPlaceholders(template);
  const populatedVariables: Record<string, string> = { ...existingVariables };
  let matchedCount = 0;
  let unmatchedCount = 0;

  placeholders.forEach(ph => {
    const normalizedKey = ph.toLowerCase().trim();
    // Direct match or normalized key match
    let matchValue = profile.variables[ph];
    if (!matchValue) {
      const foundKey = Object.keys(profile.variables).find(k => k.toLowerCase() === normalizedKey);
      if (foundKey) matchValue = profile.variables[foundKey];
    }

    if (matchValue) {
      populatedVariables[ph] = matchValue;
      matchedCount++;
    } else if (!populatedVariables[ph]) {
      unmatchedCount++;
    }
  });

  let resolvedText = template;
  Object.entries(populatedVariables).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      resolvedText = resolvedText.split(`[${key}]`).join(val);
      resolvedText = resolvedText.split(`{{${key}}}`).join(val);
    }
  });

  return {
    resolvedText,
    populatedVariables,
    matchedCount,
    unmatchedCount,
  };
}
