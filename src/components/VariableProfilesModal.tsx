import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { VariableProfile } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { X, Plus, Trash2, Check, Sparkles, Edit3, Bookmark } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile?: (profile: VariableProfile) => void;
}

export const VariableProfilesModal: React.FC<Props> = ({ isOpen, onClose, onApplyProfile }) => {
  const { profiles, activeProfile, setActiveProfile, addProfile, updateProfile, deleteProfile } = useVault();
  const [selectedProfileId, setSelectedProfileId] = useState<string>(activeProfile?.id || profiles[0]?.id || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Edit / Create Form State
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formIcon, setFormIcon] = useState('📦');
  const [formVariables, setFormVariables] = useState<Array<{ key: string; value: string }>>([]);
  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');

  if (!isOpen) return null;

  const currentProfile = profiles.find(p => p.id === selectedProfileId) || activeProfile || profiles[0];

  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
    setActiveProfile(id);
    setIsEditing(false);
    setIsCreating(false);
    triggerHaptic('selection');
  };

  const handleStartCreate = () => {
    setFormName('');
    setFormDesc('');
    setFormIcon('✨');
    setFormVariables([
      { key: 'profession', value: '' },
      { key: 'domain', value: '' },
      { key: 'tone', value: '' },
      { key: 'tech_stack', value: '' }
    ]);
    setIsCreating(true);
    setIsEditing(false);
    triggerHaptic('light');
  };

  const handleStartEdit = (profile: VariableProfile) => {
    setFormName(profile.name);
    setFormDesc(profile.description);
    setFormIcon(profile.icon || '📦');
    setFormVariables(
      Object.entries(profile.variables).map(([key, value]) => ({ key, value }))
    );
    setIsEditing(true);
    setIsCreating(false);
    triggerHaptic('light');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const variablesMap: Record<string, string> = {};
    formVariables.forEach(({ key, value }) => {
      if (key.trim()) {
        variablesMap[key.trim()] = value;
      }
    });

    if (isCreating) {
      const created = addProfile({
        name: formName.trim(),
        description: formDesc.trim() || 'Custom context preset',
        icon: formIcon || '✨',
        variables: variablesMap,
      });
      setSelectedProfileId(created.id);
      setIsCreating(false);
    } else if (isEditing && currentProfile) {
      updateProfile({
        ...currentProfile,
        name: formName.trim(),
        description: formDesc.trim(),
        icon: formIcon,
        variables: variablesMap,
      });
      setIsEditing(false);
    }
    triggerHaptic('success');
  };

  const handleAddVariableRow = () => {
    if (!newKey.trim()) return;
    setFormVariables([...formVariables, { key: newKey.trim(), value: newVal.trim() }]);
    setNewKey('');
    setNewVal('');
    triggerHaptic('light');
  };

  const handleRemoveVariableRow = (index: number) => {
    setFormVariables(formVariables.filter((_, i) => i !== index));
    triggerHaptic('selection');
  };

  const handleApply = (profile: VariableProfile) => {
    setActiveProfile(profile.id);
    onApplyProfile?.(profile);
    triggerHaptic('success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="neu-flat rounded-[28px] w-full max-w-xl max-h-[90vh] flex flex-col p-6 shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[var(--color-neu-shadow-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] neu-convex flex items-center justify-center text-lg">
              ✨
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-neu-text)]">Variable Profiles (Context Presets)</h2>
              <p className="text-[11px] text-[var(--color-neu-text-light)]">1-click auto-fill for prompt parameters</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="neu-button p-2.5 rounded-full text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
          {/* Profile Carousel / Pills */}
          {!isEditing && !isCreating && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)]">
                  Available Presets ({profiles.length})
                </span>
                <button
                  onClick={handleStartCreate}
                  className="neu-button px-3 py-1.5 rounded-[12px] flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-neu-accent)]"
                >
                  <Plus size={14} /> New Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {profiles.map(p => {
                  const isSelected = p.id === selectedProfileId;
                  const varCount = Object.keys(p.variables).length;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProfile(p.id)}
                      className={`p-3.5 rounded-[18px] cursor-pointer transition-all ${
                        isSelected 
                          ? 'neu-pressed border border-[var(--color-neu-accent)]/50' 
                          : 'neu-flat hover:opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{p.icon || '📦'}</span>
                          <span className="text-xs font-bold text-[var(--color-neu-text)] line-clamp-1">{p.name}</span>
                        </div>
                        {isSelected && <Check size={14} className="text-[var(--color-neu-accent)] shrink-0" />}
                      </div>
                      <p className="text-[10px] text-[var(--color-neu-text-light)] line-clamp-2 mb-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="flex items-center justify-between text-[9px] font-mono text-[var(--color-neu-text-light)] opacity-80">
                        <span>{varCount} variables mapped</span>
                        {p.isDefault && <span className="text-[var(--color-neu-accent)] font-semibold">Default</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Profile Detail Viewer */}
              {currentProfile && (
                <div className="neu-pressed rounded-[20px] p-4 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currentProfile.icon || '📦'}</span>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-neu-text)]">{currentProfile.name}</h4>
                        <p className="text-[10px] text-[var(--color-neu-text-light)]">{currentProfile.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(currentProfile)}
                        className="neu-button p-2 rounded-[12px] text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]"
                        title="Edit profile"
                      >
                        <Edit3 size={14} />
                      </button>
                      {profiles.length > 1 && !currentProfile.isDefault && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete profile "${currentProfile.name}"?`)) {
                              deleteProfile(currentProfile.id);
                              triggerHaptic('light');
                            }
                          }}
                          className="neu-button p-2 rounded-[12px] text-red-500 hover:text-red-600"
                          title="Delete profile"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Variables Table */}
                  <div className="space-y-1.5 pt-2 max-h-48 overflow-y-auto no-scrollbar">
                    {Object.entries(currentProfile.variables).map(([key, val]) => (
                      <div key={key} className="neu-flat rounded-[12px] p-2 flex items-center justify-between text-xs gap-3">
                        <span className="font-mono text-[10px] font-bold text-[var(--color-neu-accent)] shrink-0">
                          [{key}]
                        </span>
                        <span className="font-mono text-[10px] text-[var(--color-neu-text)] text-right truncate">
                          {val || '(empty)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Edit or Create Form */}
          {(isEditing || isCreating) && (
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-neu-shadow-dark)]">
                <span className="text-xs font-bold text-[var(--color-neu-accent)] uppercase tracking-wider">
                  {isCreating ? 'Create New Preset' : `Edit: ${formName}`}
                </span>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setIsCreating(false); }}
                  className="text-xs text-[var(--color-neu-text-light)] underline"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">Icon</label>
                  <div className="neu-pressed rounded-[14px] p-1">
                    <input
                      type="text"
                      value={formIcon}
                      onChange={e => setFormIcon(e.target.value)}
                      className="w-full bg-transparent p-2 text-center text-lg outline-none"
                      maxLength={2}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">Profile Name</label>
                  <div className="neu-pressed rounded-[14px] p-1">
                    <input
                      type="text"
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder="e.g., Full-Stack React Dev"
                      className="w-full bg-transparent p-2 text-xs font-semibold text-[var(--color-neu-text)] outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block mb-1">Description</label>
                <div className="neu-pressed rounded-[14px] p-1">
                  <input
                    type="text"
                    value={formDesc}
                    onChange={e => setFormDesc(e.target.value)}
                    placeholder="Short description of this context bundle"
                    className="w-full bg-transparent p-2 text-xs text-[var(--color-neu-text)] outline-none"
                  />
                </div>
              </div>

              {/* Variable Keys & Values List */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text-light)] block">
                  Context Variables ({formVariables.length})
                </label>
                
                <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                  {formVariables.map((row, idx) => (
                    <div key={idx} className="neu-flat rounded-[14px] p-2 flex items-center gap-2">
                      <div className="w-1/3 neu-pressed rounded-[10px] p-1">
                        <input
                          type="text"
                          value={row.key}
                          onChange={e => {
                            const updated = [...formVariables];
                            updated[idx].key = e.target.value;
                            setFormVariables(updated);
                          }}
                          placeholder="key"
                          className="w-full bg-transparent px-2 py-1 text-[11px] font-mono font-bold text-[var(--color-neu-accent)] outline-none"
                        />
                      </div>
                      <div className="flex-1 neu-pressed rounded-[10px] p-1">
                        <input
                          type="text"
                          value={row.value}
                          onChange={e => {
                            const updated = [...formVariables];
                            updated[idx].value = e.target.value;
                            setFormVariables(updated);
                          }}
                          placeholder="value"
                          className="w-full bg-transparent px-2 py-1 text-[11px] text-[var(--color-neu-text)] outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVariableRow(idx)}
                        className="p-1.5 text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Variable Sub-row */}
                <div className="neu-pressed rounded-[14px] p-2 flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={newKey}
                    onChange={e => setNewKey(e.target.value)}
                    placeholder="new_variable"
                    className="w-1/3 bg-transparent px-2 py-1 text-[11px] font-mono text-[var(--color-neu-accent)] outline-none"
                  />
                  <input
                    type="text"
                    value={newVal}
                    onChange={e => setNewVal(e.target.value)}
                    placeholder="value"
                    className="flex-1 bg-transparent px-2 py-1 text-[11px] text-[var(--color-neu-text)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddVariableRow}
                    className="neu-button px-2.5 py-1.5 rounded-[10px] text-[10px] font-bold text-[var(--color-neu-text)] shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[20px] neu-convex text-xs font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center justify-center gap-2"
                >
                  <Bookmark size={15} /> Save Variable Profile
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        {!isEditing && !isCreating && currentProfile && (
          <div className="pt-4 border-t border-[var(--color-neu-shadow-dark)] flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-[20px] neu-button text-xs font-bold text-[var(--color-neu-text-light)] uppercase tracking-wider"
            >
              Close
            </button>
            <button
              onClick={() => handleApply(currentProfile)}
              className="flex-2 py-3.5 rounded-[20px] neu-convex text-xs font-bold text-[var(--color-neu-accent)] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Apply "{currentProfile.name}"
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
