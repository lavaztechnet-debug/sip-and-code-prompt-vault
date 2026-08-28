import React, { useState } from 'react';
import { Prompt, Category } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { 
  Download, 
  Share2, 
  Copy, 
  Check, 
  X, 
  FileJson, 
  FileText, 
  FileSpreadsheet, 
  Terminal, 
  CheckSquare, 
  Square, 
  Search, 
  Sparkles,
  Archive,
  Layers,
  Code
} from 'lucide-react';

export type ExportFormat = 'json' | 'txt' | 'markdown' | 'csv' | 'bash';

interface ExportVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: Prompt[];
  initialCategory?: Category | 'All';
}

export const ExportVaultModal: React.FC<ExportVaultModalProps> = ({ 
  isOpen, 
  onClose, 
  prompts, 
  initialCategory = 'All' 
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(prompts.map(p => p.id)));
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(prompts.map(p => p.category)))];

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.template.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesFav = !onlyFavorites || p.isFavorite;
    return matchesSearch && matchesCat && matchesFav;
  });

  const handleSelectAll = () => {
    triggerHaptic('light');
    setSelectedIds(new Set(prompts.map(p => p.id)));
  };

  const handleSelectFiltered = () => {
    triggerHaptic('light');
    setSelectedIds(new Set(filteredPrompts.map(p => p.id)));
  };

  const handleDeselectAll = () => {
    triggerHaptic('light');
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    triggerHaptic('selection');
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Helper to escape CSV fields
  const escapeCsv = (str: string = ''): string => {
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Generate exported payload based on chosen format
  const generateExportContent = (): { content: string; filename: string; mimeType: string } => {
    const chosenPrompts = prompts.filter(p => selectedIds.has(p.id));
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 12);

    switch (selectedFormat) {
      case 'json': {
        const payload = includeMetadata ? {
          manifest: {
            app: 'Prompt Vault',
            platform: 'Android 16 / Zero-Gradle CLI Hub',
            version: '2.0.0',
            exportedAt: now.toISOString(),
            totalPrompts: chosenPrompts.length,
            categories: Array.from(new Set(chosenPrompts.map(p => p.category)))
          },
          prompts: chosenPrompts
        } : chosenPrompts;

        return {
          content: JSON.stringify(payload, null, 2),
          filename: `prompt-vault-export-${timestamp}.json`,
          mimeType: 'application/json'
        };
      }

      case 'txt': {
        const header = includeMetadata ? 
`================================================================================
PROMPT VAULT - MASTER PROMPTS ARCHIVE
Generated: ${now.toUTCString()}
Total Prompts: ${chosenPrompts.length}
================================================================================\n\n` : '';

        const body = chosenPrompts.map((p, idx) => {
          return `--- [PROMPT #${idx + 1}] --------------------------------------------------------\n` +
                 `Title: ${p.title}\n` +
                 `Category: ${p.category}\n` +
                 `Tags: ${p.tags.join(', ')}\n` +
                 `Favorite: ${p.isFavorite ? 'Yes' : 'No'}\n` +
                 `When to use / Notes: ${p.notes || 'N/A'}\n\n` +
                 `Prompt Template:\n${p.template}\n\n` +
                 (p.example ? `Example Invocation:\n${p.example}\n\n` : '');
        }).join('\n');

        return {
          content: header + body,
          filename: `prompt-vault-export-${timestamp}.txt`,
          mimeType: 'text/plain'
        };
      }

      case 'markdown': {
        let md = `# 🛡️ Prompt Vault - Master Prompts Archive\n\n`;
        if (includeMetadata) {
          md += `> **Export Date:** ${now.toLocaleString()}  \n`;
          md += `> **Total Exported Prompts:** \`${chosenPrompts.length}\`  \n`;
          md += `> **Categories:** ${Array.from(new Set(chosenPrompts.map(p => p.category))).map(c => `\`${c}\``).join(', ')}\n\n`;
          md += `---\n\n`;
        }

        // Group by Category
        const byCategory: Record<string, Prompt[]> = {};
        chosenPrompts.forEach(p => {
          if (!byCategory[p.category]) byCategory[p.category] = [];
          byCategory[p.category].push(p);
        });

        Object.entries(byCategory).forEach(([cat, list]) => {
          md += `## 📁 Category: ${cat} (${list.length})\n\n`;
          list.forEach(p => {
            md += `### ${p.title} ${p.isFavorite ? '⭐' : ''}\n\n`;
            md += `- **ID:** \`${p.id}\`\n`;
            md += `- **Tags:** ${p.tags.map(t => `\`#${t}\``).join(' ')}\n\n`;
            if (p.notes) {
              md += `**Usage Notes:**\n> ${p.notes}\n\n`;
            }
            md += `**Prompt Template:**\n\`\`\`text\n${p.template}\n\`\`\`\n\n`;
            if (p.example) {
              md += `**Example Invocation:**\n\`\`\`text\n${p.example}\n\`\`\`\n\n`;
            }
            md += `---\n\n`;
          });
        });

        return {
          content: md,
          filename: `prompt-vault-export-${timestamp}.md`,
          mimeType: 'text/markdown'
        };
      }

      case 'csv': {
        const headers = ['ID', 'Title', 'Category', 'Tags', 'Favorite', 'Template', 'Example', 'Notes'];
        const rows = chosenPrompts.map(p => [
          escapeCsv(p.id),
          escapeCsv(p.title),
          escapeCsv(p.category),
          escapeCsv(p.tags.join('; ')),
          escapeCsv(p.isFavorite ? 'TRUE' : 'FALSE'),
          escapeCsv(p.template),
          escapeCsv(p.example || ''),
          escapeCsv(p.notes || '')
        ].join(','));

        return {
          content: [headers.join(','), ...rows].join('\n'),
          filename: `prompt-vault-export-${timestamp}.csv`,
          mimeType: 'text/csv'
        };
      }

      case 'bash': {
        const bashScript = `#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# PROMPT VAULT - TERMUX / CLI RESTORE & IMPORT SCRIPT
# Generated: ${now.toISOString()}
# Total Prompts: ${chosenPrompts.length}
# ==============================================================================

set -e
echo "📦 Restoring ${chosenPrompts.length} Prompt Vault templates to Termux..."

TARGET_DIR="$HOME/prompt-vault/data"
mkdir -p "$TARGET_DIR"

cat << 'EOF' > "$TARGET_DIR/vault_prompts.json"
${JSON.stringify(chosenPrompts, null, 2)}
EOF

echo "✅ Saved to $TARGET_DIR/vault_prompts.json"
echo "🔍 Prompt Count: $(jq '. | length' "$TARGET_DIR/vault_prompts.json" 2>/dev/null || echo "${chosenPrompts.length}")"
`;
        return {
          content: bashScript,
          filename: `restore-vault-prompts-${timestamp}.sh`,
          mimeType: 'application/x-sh'
        };
      }
    }
  };

  const handleDownload = () => {
    if (selectedIds.size === 0) return;
    triggerHaptic('success');
    const { content, filename, mimeType } = generateExportContent();
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopyOrShare = async () => {
    if (selectedIds.size === 0) return;
    const { content, filename } = generateExportContent();

    if (navigator.share && navigator.canShare && navigator.canShare({ text: content })) {
      try {
        await navigator.share({
          title: `Prompt Vault (${selectedIds.size} Prompts)`,
          text: content
        });
        triggerHaptic('success');
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(content);
    setCopied(true);
    triggerHaptic('success');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatButtons: { id: ExportFormat; label: string; icon: React.ReactNode; ext: string }[] = [
    { id: 'json', label: 'JSON Archive', icon: <FileJson size={14} />, ext: '.json' },
    { id: 'markdown', label: 'Markdown Doc', icon: <FileText size={14} />, ext: '.md' },
    { id: 'txt', label: 'Structured TXT', icon: <FileText size={14} />, ext: '.txt' },
    { id: 'csv', label: 'CSV Spreadsheet', icon: <FileSpreadsheet size={14} />, ext: '.csv' },
    { id: 'bash', label: 'Termux Script', icon: <Terminal size={14} />, ext: '.sh' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <div className="neu-flat w-full max-w-2xl rounded-[28px] p-5 sm:p-6 max-h-[92vh] flex flex-col gap-4 border border-[var(--color-neu-shadow-light)]/50 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] neu-convex flex items-center justify-center text-[var(--color-neu-accent)] shrink-0 shadow-md">
              <Archive size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Master Vault Exporter
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono neu-pressed text-[var(--color-neu-accent)] font-bold">
                  {selectedIds.size} / {prompts.length} Prompts
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif italic text-[var(--color-neu-text)] mt-0.5 leading-tight">
                Export Vault Prompts
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="neu-button p-2 rounded-full text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] cursor-pointer"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Format Selector Pills */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-text-light)]">
            Export Format &amp; Schema:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {formatButtons.map(fmt => {
              const isSelected = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => {
                    setSelectedFormat(fmt.id);
                    triggerHaptic('selection');
                  }}
                  className={`p-2.5 rounded-xl text-[10px] font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    isSelected
                      ? 'neu-pressed text-[var(--color-neu-accent)] font-bold scale-[1.02]'
                      : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
                  }`}
                >
                  {fmt.icon}
                  <span className="truncate">{fmt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 neu-pressed rounded-[18px]">
          <label className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-neu-text-light)] cursor-pointer">
            <input 
              type="checkbox" 
              checked={includeMetadata} 
              onChange={e => setIncludeMetadata(e.target.checked)}
              className="accent-[var(--color-neu-accent)] rounded w-3.5 h-3.5" 
            />
            <span>Include Manifest Metadata Header</span>
          </label>

          <label className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-neu-text-light)] cursor-pointer">
            <input 
              type="checkbox" 
              checked={onlyFavorites} 
              onChange={e => setOnlyFavorites(e.target.checked)}
              className="accent-[var(--color-neu-accent)] rounded w-3.5 h-3.5" 
            />
            <span>Only Favorites (★)</span>
          </label>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="neu-pressed rounded-[16px] px-3 py-2 flex items-center flex-1">
              <Search size={14} className="text-[var(--color-neu-text-light)] mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search prompt title, tag, or content..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs outline-none text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); triggerHaptic('light'); }}
              className="neu-pressed rounded-[16px] px-3 py-2 text-xs text-[var(--color-neu-text)] outline-none cursor-pointer max-w-[140px]"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Quick Selection Actions */}
          <div className="flex items-center justify-between text-[10px] font-mono px-1">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSelectAll}
                className="hover:underline text-[var(--color-neu-accent)] font-bold cursor-pointer"
              >
                All ({prompts.length})
              </button>
              <span>•</span>
              <button 
                onClick={handleSelectFiltered}
                className="hover:underline text-[var(--color-neu-text-light)] cursor-pointer"
              >
                Filtered ({filteredPrompts.length})
              </button>
              <span>•</span>
              <button 
                onClick={handleDeselectAll}
                className="hover:underline text-[var(--color-neu-text-light)] cursor-pointer"
              >
                Clear
              </button>
            </div>
            <span className="text-[var(--color-neu-text-light)] font-bold">
              {selectedIds.size} selected
            </span>
          </div>
        </div>

        {/* Scrollable Prompts List with Visual Toggles */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 max-h-[220px] neu-pressed p-3 rounded-[20px]">
          {filteredPrompts.length === 0 ? (
            <div className="text-center text-xs text-[var(--color-neu-text-light)] py-6">
              No matching prompts found for current filter.
            </div>
          ) : (
            filteredPrompts.map(prompt => {
              const isSelected = selectedIds.has(prompt.id);
              return (
                <div
                  key={prompt.id}
                  onClick={() => toggleSelect(prompt.id)}
                  className={`p-2.5 rounded-[14px] flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected ? 'neu-flat bg-[var(--color-neu-bg)] border border-[var(--color-neu-accent)]/20' : 'bg-transparent hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`shrink-0 ${isSelected ? 'text-[var(--color-neu-accent)]' : 'text-[var(--color-neu-text-light)]'}`}>
                      {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8.5px] uppercase font-bold px-2 py-0.5 rounded-full neu-pressed text-[var(--color-neu-accent)]">
                          {prompt.category}
                        </span>
                        {prompt.isFavorite && <span className="text-amber-500 text-xs">★</span>}
                      </div>
                      <h4 className="text-xs font-bold text-[var(--color-neu-text)] truncate mt-0.5">
                        {prompt.title}
                      </h4>
                      <p className="text-[9.5px] text-[var(--color-neu-text-light)] truncate font-mono opacity-80">
                        {prompt.template}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopyOrShare}
            disabled={selectedIds.size === 0}
            className="neu-button py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-[var(--color-neu-text)] cursor-pointer disabled:opacity-40 active:scale-95"
          >
            {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy / Share'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={selectedIds.size === 0}
            className="neu-convex py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-[var(--color-neu-accent)] cursor-pointer disabled:opacity-40 shadow-md active:scale-95"
          >
            {downloadSuccess ? <Check size={16} className="text-emerald-600" /> : <Download size={16} />}
            <span>{downloadSuccess ? 'Downloaded!' : `Export ${selectedIds.size} Prompts`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
