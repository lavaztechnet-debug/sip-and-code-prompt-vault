import React, { useState } from 'react';
import { Prompt, Category } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { Download, CheckSquare, Square, Search, Filter, FileJson, X, Check, Share2 } from 'lucide-react';

interface BulkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: Prompt[];
}

export const BulkExportModal: React.FC<BulkExportModalProps> = ({ isOpen, onClose, prompts }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(prompts.map(p => p.id)));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [exportCopied, setExportCopied] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [exportFormat, setExportFormat] = useState<'json' | 'txt'>('json');

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(prompts.map(p => p.category)))];

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.template.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

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

  const handleSelectAll = () => {
    triggerHaptic('light');
    setSelectedIds(new Set(prompts.map(p => p.id)));
  };

  const handleDeselectAll = () => {
    triggerHaptic('light');
    setSelectedIds(new Set());
  };

  const handleSelectFiltered = () => {
    triggerHaptic('light');
    setSelectedIds(new Set(filteredPrompts.map(p => p.id)));
  };

  const generateExportContent = (): string => {
    const chosenPrompts = prompts.filter(p => selectedIds.has(p.id));

    if (exportFormat === 'json') {
      if (includeMetadata) {
        return JSON.stringify({
          version: '1.0.0',
          app: 'Prompt Vault (Zero-Gradle & Termux Engine)',
          exportedAt: new Date().toISOString(),
          totalCount: chosenPrompts.length,
          prompts: chosenPrompts
        }, null, 2);
      }
      return JSON.stringify(chosenPrompts, null, 2);
    } else {
      // Structured Key-Value TXT
      return chosenPrompts.map((p, idx) => {
        return `### PROMPT #${idx + 1}: ${p.title}\n` +
               `Category: ${p.category}\n` +
               `Tags: ${p.tags.join(', ')}\n` +
               `Favorite: ${p.isFavorite ? 'Yes' : 'No'}\n` +
               `\n[Template]\n${p.template}\n` +
               (p.example ? `\n[Example]\n${p.example}\n` : '') +
               (p.notes ? `\n[Notes]\n${p.notes}\n` : '') +
               `\n--------------------------------------------------------------------------------\n`;
      }).join('\n');
    }
  };

  const handleDownloadFile = () => {
    if (selectedIds.size === 0) return;
    triggerHaptic('success');
    const content = generateExportContent();
    const mimeType = exportFormat === 'json' ? 'application/json' : 'text/plain';
    const ext = exportFormat === 'json' ? 'json' : 'txt';
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 12);
    const filename = `prompt-vault-export-${timestamp}.${ext}`;

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareOrCopy = async () => {
    if (selectedIds.size === 0) return;
    const content = generateExportContent();
    if (navigator.share && navigator.canShare && navigator.canShare({ text: content })) {
      try {
        await navigator.share({
          title: `Prompt Vault Export (${selectedIds.size} prompts)`,
          text: content,
        });
        triggerHaptic('success');
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(content);
    setExportCopied(true);
    triggerHaptic('success');
    setTimeout(() => setExportCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="neu-flat w-full max-w-xl rounded-[28px] p-6 max-h-[90vh] flex flex-col gap-4 border border-[var(--color-neu-shadow-light)]/40 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">Bulk Vault Exporter</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono neu-pressed text-[var(--color-neu-accent)]">
                {selectedIds.size} / {prompts.length} Selected
              </span>
            </div>
            <h2 className="text-lg font-serif italic text-[var(--color-neu-accent)] mt-0.5">Export Multi-Select Prompts</h2>
          </div>
          <button 
            onClick={onClose}
            className="neu-button p-2 rounded-full text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Format & Options Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 neu-pressed rounded-[18px]">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-[10px] uppercase text-[var(--color-neu-text-light)] mr-1">Format:</span>
            <button
              onClick={() => { setExportFormat('json'); triggerHaptic('selection'); }}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                exportFormat === 'json' ? 'neu-convex text-[var(--color-neu-accent)] font-bold' : 'neu-flat text-[var(--color-neu-text-light)]'
              }`}
            >
              JSON Array
            </button>
            <button
              onClick={() => { setExportFormat('txt'); triggerHaptic('selection'); }}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                exportFormat === 'txt' ? 'neu-convex text-[var(--color-neu-accent)] font-bold' : 'neu-flat text-[var(--color-neu-text-light)]'
              }`}
            >
              Structured TXT
            </button>
          </div>

          <label className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-neu-text-light)] cursor-pointer">
            <input 
              type="checkbox" 
              checked={includeMetadata} 
              onChange={e => setIncludeMetadata(e.target.checked)}
              className="accent-[var(--color-neu-accent)] rounded" 
            />
            <span>Include Header Manifest</span>
          </label>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="neu-pressed rounded-[16px] px-3 py-2 flex items-center flex-1">
              <Search size={14} className="text-[var(--color-neu-text-light)] mr-2" />
              <input
                type="text"
                placeholder="Filter by title, keyword, or tag..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs outline-none text-[var(--color-neu-text)]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); triggerHaptic('light'); }}
              className="neu-pressed rounded-[16px] px-3 py-2 text-xs text-[var(--color-neu-text)] outline-none cursor-pointer"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Quick Selection Pills */}
          <div className="flex items-center justify-between text-[10px] font-mono px-1">
            <div className="flex gap-2">
              <button 
                onClick={handleSelectAll}
                className="hover:underline text-[var(--color-neu-accent)] font-bold cursor-pointer"
              >
                Select All ({prompts.length})
              </button>
              <span>•</span>
              <button 
                onClick={handleSelectFiltered}
                className="hover:underline text-[var(--color-neu-text-light)] cursor-pointer"
              >
                Select Filtered ({filteredPrompts.length})
              </button>
              <span>•</span>
              <button 
                onClick={handleDeselectAll}
                className="hover:underline text-[var(--color-neu-text-light)] cursor-pointer"
              >
                Clear
              </button>
            </div>
            <span className="text-[var(--color-neu-text-light)]">
              {selectedIds.size} chosen
            </span>
          </div>
        </div>

        {/* Scrollable Prompts List with Checkboxes */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 max-h-[300px] neu-pressed p-3 rounded-[20px]">
          {filteredPrompts.length === 0 ? (
            <div className="text-center text-xs text-[var(--color-neu-text-light)] py-8">
              No matching prompts found.
            </div>
          ) : (
            filteredPrompts.map(prompt => {
              const isSelected = selectedIds.has(prompt.id);
              return (
                <div
                  key={prompt.id}
                  onClick={() => toggleSelect(prompt.id)}
                  className={`p-3 rounded-[14px] flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected ? 'neu-flat bg-[var(--color-neu-bg)] border border-[var(--color-neu-accent)]/20' : 'bg-transparent hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1 rounded-md ${isSelected ? 'text-[var(--color-neu-accent)]' : 'text-[var(--color-neu-text-light)]'}`}>
                      {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full neu-pressed text-[var(--color-neu-accent)]">
                          {prompt.category}
                        </span>
                        {prompt.isFavorite && <span className="text-amber-500 text-xs">★</span>}
                      </div>
                      <h4 className="text-xs font-bold text-[var(--color-neu-text)] truncate mt-0.5">
                        {prompt.title}
                      </h4>
                      <p className="text-[10px] text-[var(--color-neu-text-light)] truncate font-mono opacity-80">
                        {prompt.template}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Action Footer */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleShareOrCopy}
            disabled={selectedIds.size === 0}
            className="neu-button py-3 rounded-[18px] text-xs font-bold flex items-center justify-center gap-2 text-[var(--color-neu-text)] cursor-pointer disabled:opacity-50"
          >
            {exportCopied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
            <span>{exportCopied ? 'COPIED JSON' : 'COPY / SHARE'}</span>
          </button>

          <button
            onClick={handleDownloadFile}
            disabled={selectedIds.size === 0}
            className="neu-convex py-3 rounded-[18px] text-xs font-bold flex items-center justify-center gap-2 text-[var(--color-neu-accent)] cursor-pointer disabled:opacity-50 shadow-md"
          >
            <Download size={16} />
            <span>EXPORT {selectedIds.size} PROMPTS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
