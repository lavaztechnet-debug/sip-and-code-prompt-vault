import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { Category, Prompt } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { createKeepNote } from '../services/googleKeep';
import { ConfirmModal } from '../components/ConfirmModal';
import { PromptInspectModal } from '../components/PromptInspectModal';
import { FeatureGuideModal } from '../components/FeatureGuideModal';
import { ExportVaultModal } from '../components/ExportVaultModal';
import { Search, Copy, Star, Play, StickyNote, Sparkles, Check, Eye, BookOpen, Download, Share2 } from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Meta Prompts',
  'Prompt Engineering',
  'Code & Architecture',
  'Research & Synthesis',
  'Writing & Content',
  'Business & Strategy',
  'Monetization & Sales',
  'Productivity & Systems',
  'Career & Leadership',
  'Data & Analytics',
  'UI/UX & Design',
  'Learning & Mastery',
  'Life & Strategy',
  'Termux CLI',
  'Android System',
  'Creative',
  'General Apps',
  'Image & Gallery',
  'Horror',
  'Music',
  'Documents',
  'Tools',
  'Utility'
];

export const VaultScreen: React.FC = () => {
  const { prompts, toggleFavorite, setActivePrompt, setCurrentScreen } = useVault();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [keepConfirmPrompt, setKeepConfirmPrompt] = useState<Prompt | null>(null);
  const [savedKeepId, setSavedKeepId] = useState<string | null>(null);
  const [inspectingPrompt, setInspectingPrompt] = useState<Prompt | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.template.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAskAI = (prompt: any) => {
    triggerHaptic('medium');
    setActivePrompt(prompt);
    setCurrentScreen('creator');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerHaptic('success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    triggerHaptic('light');
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    triggerHaptic('medium');
  };

  const handleSaveToKeep = (prompt: Prompt) => {
    setKeepConfirmPrompt(prompt);
    triggerHaptic('light');
  };

  const confirmSaveToKeep = () => {
    if (!keepConfirmPrompt) return;
    createKeepNote({
      title: keepConfirmPrompt.title,
      body: keepConfirmPrompt.template,
      category: keepConfirmPrompt.category,
      tags: [...keepConfirmPrompt.tags, 'vault-export'],
      color: 'sand',
      isPinned: false,
    });
    setSavedKeepId(keepConfirmPrompt.id);
    setKeepConfirmPrompt(null);
    triggerHaptic('success');
    setTimeout(() => setSavedKeepId(null), 2500);
  };

  const handleOptimizePrompt = (prompt: Prompt) => {
    setActivePrompt(prompt);
    setCurrentScreen('optimizer');
    triggerHaptic('medium');
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-4 sm:pb-6 animate-fade-in flex flex-col gap-4 sm:gap-6 w-full">
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 flex flex-col justify-center border border-[var(--color-neu-shadow-light)]/40 shrink-0">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60">Master Vault • {prompts.length} Prompts</h1>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                triggerHaptic('medium');
                setIsExportOpen(true);
              }}
              className="neu-convex px-2.5 py-1 rounded-full text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center gap-1 cursor-pointer hover:shadow-md transition-all"
              title="Export All Vault Prompts"
            >
              <Download size={11} />
              <span>Export All</span>
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                setIsGuideOpen(true);
              }}
              className="neu-button px-2.5 py-1 rounded-full text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] flex items-center gap-1 cursor-pointer hover:text-[var(--color-neu-text)]"
              title="Step-by-Step Feature Guide"
            >
              <BookOpen size={11} />
              <span>Guide</span>
            </button>
          </div>
        </div>
        <div className="neu-pressed rounded-full p-1.5 flex items-center mb-3">
          <Search className="ml-3 text-[var(--color-neu-text-light)] shrink-0" size={18} />
          <input 
            type="text" 
            placeholder="Search prompts, tags, or content..." 
            className="w-full bg-transparent border-none outline-none px-3 py-1.5 text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)] text-xs sm:text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 cursor-pointer ${
                selectedCategory === category 
                  ? 'neu-pressed text-[var(--color-neu-accent)]' 
                  : 'neu-button text-[var(--color-neu-text-light)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>
      
      <div className="space-y-3.5 w-full pb-4">
        {filteredPrompts.map(prompt => (
          <div key={prompt.id} className="neu-flat rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <div 
                className="flex-1 pr-2 min-w-0 cursor-pointer group"
                onClick={() => {
                  setInspectingPrompt(prompt);
                  triggerHaptic('light');
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider neu-pressed text-[var(--color-neu-accent)]">
                    {prompt.category}
                  </span>
                  <span className="text-[9.5px] font-mono text-[var(--color-neu-text-light)] opacity-60">
                    {prompt.id}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold leading-tight truncate group-hover:text-[var(--color-neu-accent)] transition-colors flex items-center gap-1.5">
                  <span>{prompt.title}</span>
                </h3>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    setInspectingPrompt(prompt);
                    triggerHaptic('light');
                  }}
                  className="p-2 rounded-xl neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer"
                  title="Inspect Prompt"
                >
                  <Eye size={15} />
                </button>
                <button 
                  onClick={() => handleToggleFavorite(prompt.id)}
                  className={`p-2 rounded-xl cursor-pointer shrink-0 ${prompt.isFavorite ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-button text-[var(--color-neu-text-light)]'}`}
                  title="Toggle Favorite"
                >
                  <Star size={15} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            
            <p 
              onClick={() => {
                setInspectingPrompt(prompt);
                triggerHaptic('light');
              }}
              className="text-[11px] sm:text-xs text-[var(--color-neu-text-light)] line-clamp-2 leading-relaxed font-mono opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            >
              {prompt.template}
            </p>
            
            {/* Action Grid */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2 border-t border-[var(--color-neu-shadow-dark)]/30">
              <button 
                onClick={() => {
                  setInspectingPrompt(prompt);
                  triggerHaptic('light');
                }}
                className="neu-button py-2 rounded-xl flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer transition-all"
              >
                <Eye size={11} /> <span>Inspect</span>
              </button>

              <button 
                onClick={() => handleCopy(prompt.template, prompt.id)}
                className={`py-2 rounded-xl flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                  copiedId === prompt.id ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button text-[var(--color-neu-text)]'
                }`}
              >
                {copiedId === prompt.id ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                <span>{copiedId === prompt.id ? 'Copied' : 'Copy'}</span>
              </button>

              <button 
                onClick={() => handleAskAI(prompt)}
                className="neu-convex py-2 rounded-xl flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] cursor-pointer hover:shadow-md transition-all active:animate-neu-exec"
              >
                <Play size={11} /> <span>Ask AI</span>
              </button>

              <button 
                onClick={() => handleSaveToKeep(prompt)}
                className={`py-2 rounded-xl flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                  savedKeepId === prompt.id ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)]'
                }`}
              >
                {savedKeepId === prompt.id ? <Check size={11} className="text-emerald-600" /> : <StickyNote size={11} />}
                <span>{savedKeepId === prompt.id ? 'Saved' : 'Keep'}</span>
              </button>

              <button 
                onClick={() => handleOptimizePrompt(prompt)}
                className="neu-button py-2 rounded-xl flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer"
                title="Refine & Optimize Prompt"
              >
                <Sparkles size={11} /> <span>Refine</span>
              </button>
            </div>
          </div>
        ))}
        {filteredPrompts.length === 0 && (
          <div className="text-center text-[var(--color-neu-text-light)] p-8 text-sm">No prompts found.</div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!keepConfirmPrompt}
        title="Save to Google Keep"
        description={`Save "${keepConfirmPrompt?.title}" directly to your Google Keep studio notes?`}
        details={keepConfirmPrompt?.template}
        confirmLabel="Save Note"
        onConfirm={confirmSaveToKeep}
        onCancel={() => setKeepConfirmPrompt(null)}
      />

      <PromptInspectModal
        prompt={inspectingPrompt}
        isOpen={!!inspectingPrompt}
        onClose={() => setInspectingPrompt(null)}
        onAskAI={handleAskAI}
        onToggleFavorite={handleToggleFavorite}
        onOptimize={handleOptimizePrompt}
      />

      <FeatureGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <ExportVaultModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        prompts={prompts}
        initialCategory={selectedCategory}
      />
    </div>
  );
};
