/**
 * Utilities for extracting and injecting dynamic variable placeholders in prompt templates.
 * Supports syntax: [variable_name], {{variable_name}}, and {variable_name}.
 */

export function extractVariables(template: string): string[] {
  if (!template) return [];
  
  // Match [var], {{var}}, and standard uppercase placeholders like [YOUR_NAME] or {{TOPIC}}
  const squareBracketRegex = /\[([a-zA-Z0-9_\s-]+)\]/g;
  const doubleCurlyRegex = /\{\{([a-zA-Z0-9_\s-]+)\}\}/g;
  
  const vars = new Set<string>();
  let match;
  
  while ((match = squareBracketRegex.exec(template)) !== null) {
    const trimmed = match[1].trim();
    if (trimmed && !trimmed.startsWith('http') && !trimmed.startsWith('/') && trimmed.length < 50) {
      vars.add(trimmed);
    }
  }
  
  while ((match = doubleCurlyRegex.exec(template)) !== null) {
    const trimmed = match[1].trim();
    if (trimmed && trimmed.length < 50) {
      vars.add(trimmed);
    }
  }
  
  return Array.from(vars);
}

export function injectVariables(template: string, values: Record<string, string>): string {
  if (!template) return '';
  let result = template;
  
  Object.entries(values).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      // Replace [key]
      const squareRegex = new RegExp(`\\[${escapeRegExp(key)}\\]`, 'g');
      result = result.replace(squareRegex, val);
      
      // Replace {{key}}
      const curlyRegex = new RegExp(`\\{\\{${escapeRegExp(key)}\\}\\}`, 'g');
      result = result.replace(curlyRegex, val);
    }
  });
  
  return result;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
