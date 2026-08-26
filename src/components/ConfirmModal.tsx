import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  details?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  description,
  details,
  confirmLabel = 'Confirm & Proceed',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    triggerHaptic('medium');
    onConfirm();
  };

  const handleCancel = () => {
    triggerHaptic('light');
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="neu-flat rounded-[28px] p-6 max-w-md w-full flex flex-col gap-5 border border-[var(--color-neu-shadow-light)] shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isDestructive ? 'neu-pressed text-rose-500' : 'neu-pressed text-[var(--color-neu-accent)]'}`}>
              <AlertCircle size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-neu-text)]">{title}</h3>
              <p className="text-[11px] text-[var(--color-neu-text-light)] mt-0.5">Permission confirmation required</p>
            </div>
          </div>
          <button 
            onClick={handleCancel}
            className="neu-button p-2 rounded-xl text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="text-xs text-[var(--color-neu-text)] leading-relaxed">
          {description}
        </div>

        {details && (
          <div className="neu-pressed rounded-[16px] p-3 text-[11px] font-mono text-[var(--color-neu-text-light)] max-h-32 overflow-y-auto no-scrollbar whitespace-pre-wrap">
            {details}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="neu-button flex-1 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${
              isDestructive 
                ? 'neu-convex text-rose-600 bg-rose-50/20' 
                : 'neu-convex text-[var(--color-neu-accent)]'
            }`}
          >
            <CheckCircle2 size={14} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
