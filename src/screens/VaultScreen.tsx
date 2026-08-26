import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { Category, Prompt } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { createKeepNote } from '../services/googleKeep';
import { ConfirmModal } from '../components/ConfirmModal';
import { Search, Copy, Star, Play, StickyNote, MessageSquare, Check } from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Meta Prompts',
  'Termux CLI',
  'Prompt Engineering',
  'Android System',
  'Documents',
  'Tools',
  'Creative',
  'General Apps',
  'Image & Gallery',
  'Horror',
  'Music',
  'Utility'
];

export const VaultScreen: React.FC = () => {
  const { prompts, toggleFavorite, setActivePrompt, setCurrentScreen } = useVault();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [keepConfirmPrompt, setKeepConfirmPrompt] = useState<Prompt | null>(null);
  const [savedKeepId, setSavedKeepId] = useState<string | null>(null);
  
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

  const handleSendToChat = (prompt: Prompt) => {
    setActivePrompt(prompt);
    setCurrentScreen('workspace');
    triggerHaptic('medium');
  };

  return (
    <div className="p-6 pt-12 animate-fade-in h-full flex flex-col gap-6">
      <header className="neu-flat rounded-[24px] p-6 flex flex-col justify-center">
        <h1 className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-4">Master Vault • {prompts.length} Prompts</h1>
        <div className="neu-pressed rounded-full p-2 flex items-center mb-4">
          <Search className="ml-3 text-[var(--color-neu-text-light)]" size={20} />
          <input 
            type="text" 
            placeholder="Search prompts, tags, or content..." 
            className="w-full bg-transparent border-none outline-none px-4 py-2 text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)] text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
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
      
      <div className="flex-1 overflow-y-auto space-y-4 pb-24 no-scrollbar">
        {filteredPrompts.map(prompt => (
          <div key={prompt.id} className="neu-flat rounded-[24px] p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider neu-pressed text-[var(--color-neu-accent)] mb-2">
                  {prompt.category}
                </span>
                <h3 className="text-sm font-bold leading-tight">{prompt.title}</h3>
              </div>
              <button 
                onClick={() => handleToggleFavorite(prompt.id)}
                className={`p-3 rounded-2xl ${prompt.isFavorite ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-button text-[var(--color-neu-text-light)]'}`}
              >
                <Star size={16} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <p className="text-xs text-[var(--color-neu-text-light)] line-clamp-2 leading-relaxed font-mono opacity-80">
              {prompt.template}
            </p>
            
            {/* Action Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--color-neu-shadow-dark)]/30">
              <button 
                onClick={() => handleCopy(prompt.template, prompt.id)}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                  copiedId === prompt.id ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button text-[var(--color-neu-text)]'
                }`}
              >
                {copiedId === prompt.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                {copiedId === prompt.id ? 'Copied' : 'Copy'}
              </button>

              <button 
                onClick={() => handleAskAI(prompt)}
                className="neu-convex py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] cursor-pointer hover:shadow-md transition-all active:animate-neu-exec"
              >
                <Play size={13} /> Ask AI
              </button>

              <button 
                onClick={() => handleSaveToKeep(prompt)}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                  savedKeepId === prompt.id ? 'neu-pressed animate-neu-success text-emerald-600 font-bold' : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)]'
                }`}
              >
                {savedKeepId === prompt.id ? <Check size={13} className="text-emerald-600" /> : <StickyNote size={13} />}
                {savedKeepId === prompt.id ? 'Saved' : 'Keep'}
              </button>

              <button 
                onClick={() => handleSendToChat(prompt)}
                className="neu-button py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)] cursor-pointer"
              >
                <MessageSquare size={13} /> Chat
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
    </div>
  );
};
