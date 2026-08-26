import React from 'react';
import { User } from 'firebase/auth';
import { LogOut, CheckCircle, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface GoogleAuthButtonProps {
  user: User | null;
  isLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  compact?: boolean;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  user,
  isLoading,
  onSignIn,
  onSignOut,
  compact = false,
}) => {
  const handleSignInClick = () => {
    triggerHaptic('medium');
    onSignIn();
  };

  const handleSignOutClick = () => {
    triggerHaptic('light');
    onSignOut();
  };

  if (user) {
    if (compact) {
      return (
        <div className="flex items-center gap-2">
          <div className="neu-pressed px-3 py-1.5 rounded-full flex items-center gap-2">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'Google Account'} 
                className="w-5 h-5 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-[var(--color-neu-accent)] text-white text-[10px] flex items-center justify-center font-bold">
                {(user.displayName || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <span className="text-[11px] font-semibold truncate max-w-[100px] text-[var(--color-neu-text)]">
              {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
            </span>
          </div>
          <button
            onClick={handleSignOutClick}
            title="Sign Out"
            className="neu-button p-2 rounded-xl text-[var(--color-neu-text-light)] hover:text-rose-500 transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      );
    }

    return (
      <div className="neu-flat rounded-[24px] p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'Google User'} 
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[var(--color-neu-accent)]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl neu-pressed text-[var(--color-neu-accent)] flex items-center justify-center font-bold text-lg">
              {(user.displayName || user.email || 'G')[0].toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[var(--color-neu-text)]">
                {user.displayName || 'Google Account'}
              </span>
              <ShieldCheck size={14} className="text-[var(--color-neu-accent)]" />
            </div>
            <p className="text-[11px] text-[var(--color-neu-text-light)] truncate max-w-[180px]">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOutClick}
          className="neu-button px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] hover:text-rose-500 flex items-center gap-1.5"
        >
          <LogOut size={12} />
          Sign Out
        </button>
      </div>
    );
  }

  // Official GSI Styled Button
  return (
    <button
      onClick={handleSignInClick}
      disabled={isLoading}
      className="neu-button px-5 py-3.5 rounded-2xl flex items-center justify-center gap-3 group transition-all w-full max-w-sm disabled:opacity-50"
    >
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-neu-text)]">
        {isLoading ? 'Connecting...' : 'Sign in with Google'}
      </span>
    </button>
  );
};
