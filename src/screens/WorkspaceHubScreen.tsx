import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  MessageSquare, 
  StickyNote, 
  Send, 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  Trash2, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  Copy,
  Users,
  Layers,
  Check
} from 'lucide-react';
import { 
  initAuth, 
  googleSignIn, 
  googleSignOut, 
  getAccessToken, 
  getCurrentUser 
} from '../services/googleAuth';
import { 
  listChatSpaces, 
  createChatSpace, 
  listChatMessages, 
  sendChatMessage, 
  ChatSpace, 
  ChatMessage 
} from '../services/googleChat';
import { 
  getKeepNotes, 
  createKeepNote, 
  updateKeepNote, 
  deleteKeepNote, 
  exportToGoogleKeepWeb, 
  KeepNote 
} from '../services/googleKeep';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { ConfirmModal } from '../components/ConfirmModal';
import { triggerHaptic } from '../utils/haptics';
import { useVault } from '../context/VaultContext';

type Tab = 'chat' | 'keep';

export const WorkspaceHubScreen: React.FC = () => {
  const { setActivePrompt, setCurrentScreen } = useVault();
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Google Chat State
  const [spaces, setSpaces] = useState<ChatSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ChatSpace | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [showNewSpaceInput, setShowNewSpaceInput] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Google Keep State
  const [keepNotes, setKeepNotes] = useState<KeepNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('Prompt Engineering');
  const [selectedColor, setSelectedColor] = useState<KeepNote['color']>('sand');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Confirmation Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    details?: string;
    confirmLabel?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  // Auth Initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, token) => {
        setUser(u);
        setAccessToken(token);
        setIsAuthLoading(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setIsAuthLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Load Keep Notes locally
  useEffect(() => {
    setKeepNotes(getKeepNotes());
  }, []);

  // Load Spaces when access token changes
  useEffect(() => {
    if (accessToken) {
      loadSpaces();
    }
  }, [accessToken]);

  // Load messages when selected space changes
  useEffect(() => {
    if (accessToken && selectedSpace) {
      loadMessages(selectedSpace.name);
    }
  }, [selectedSpace, accessToken]);

  const handleSignIn = async () => {
    setIsAuthLoading(true);
    setChatError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        triggerHaptic('success');
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setChatError(err.message || 'Failed to sign in with Google');
      triggerHaptic('error');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setUser(null);
    setAccessToken(null);
    setSpaces([]);
    setSelectedSpace(null);
    setMessages([]);
    triggerHaptic('light');
  };

  // Google Chat Actions
  const loadSpaces = async () => {
    if (!accessToken) return;
    setIsLoadingSpaces(true);
    setChatError(null);
    try {
      const fetchedSpaces = await listChatSpaces(accessToken);
      setSpaces(fetchedSpaces);
      if (fetchedSpaces.length > 0 && !selectedSpace) {
        setSelectedSpace(fetchedSpaces[0]);
      }
    } catch (err: any) {
      console.error('Error fetching chat spaces:', err);
      setChatError(err.message || 'Failed to load Google Chat spaces');
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  const loadMessages = async (spaceName: string) => {
    if (!accessToken) return;
    setIsLoadingMessages(true);
    try {
      const fetched = await listChatMessages(accessToken, spaceName);
      setMessages(fetched.reverse()); // chronological order
    } catch (err: any) {
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const initiateSendMessage = () => {
    if (!chatInput.trim() || !selectedSpace || !accessToken) return;

    setModalConfig({
      isOpen: true,
      title: 'Send Message to Google Chat',
      description: `You are about to post a message to "${selectedSpace.displayName || selectedSpace.name}". Confirm to proceed with permission.`,
      details: chatInput,
      confirmLabel: 'Send to Chat',
      isDestructive: false,
      onConfirm: async () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        try {
          await sendChatMessage(accessToken, selectedSpace.name, chatInput);
          setChatInput('');
          triggerHaptic('success');
          loadMessages(selectedSpace.name);
        } catch (err: any) {
          console.error('Failed to send message:', err);
          setChatError(err.message || 'Failed to send message');
          triggerHaptic('error');
        }
      },
    });
  };

  const initiateCreateSpace = () => {
    if (!newSpaceName.trim() || !accessToken) return;

    setModalConfig({
      isOpen: true,
      title: 'Create Google Chat Space',
      description: `Create a new Google Chat space named "${newSpaceName}" in your organization/workspace?`,
      confirmLabel: 'Create Space',
      isDestructive: false,
      onConfirm: async () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        try {
          const created = await createChatSpace(accessToken, newSpaceName.trim());
          setNewSpaceName('');
          setShowNewSpaceInput(false);
          triggerHaptic('success');
          await loadSpaces();
          setSelectedSpace(created);
        } catch (err: any) {
          console.error('Failed to create space:', err);
          setChatError(err.message || 'Failed to create space');
          triggerHaptic('error');
        }
      },
    });
  };

  // Google Keep Actions
  const initiateCreateKeepNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() && !newNoteBody.trim()) return;

    setModalConfig({
      isOpen: true,
      title: 'Save Note to Google Keep Studio',
      description: `Save new note "${newNoteTitle || 'Untitled Note'}" to your Prompt Vault Keep Studio?`,
      details: newNoteBody,
      confirmLabel: 'Save Note',
      isDestructive: false,
      onConfirm: () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        const note = createKeepNote({
          title: newNoteTitle.trim() || 'Untitled Note',
          body: newNoteBody.trim(),
          category: newNoteCategory,
          tags: ['keep', newNoteCategory.toLowerCase().replace(/\s+/g, '-')],
          color: selectedColor,
          isPinned: false,
        });
        setKeepNotes(getKeepNotes());
        setNewNoteTitle('');
        setNewNoteBody('');
        setShowNoteForm(false);
        triggerHaptic('success');
      },
    });
  };

  const initiateDeleteKeepNote = (id: string, title: string) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete Google Keep Note',
      description: `Are you sure you want to delete note "${title}"? This action cannot be undone.`,
      confirmLabel: 'Delete Note',
      isDestructive: true,
      onConfirm: () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        deleteKeepNote(id);
        setKeepNotes(getKeepNotes());
        triggerHaptic('medium');
      },
    });
  };

  const toggleChecklistItem = (note: KeepNote, itemId: string) => {
    if (!note.checklist) return;
    const updatedChecklist = note.checklist.map(item => 
      item.id === itemId ? { ...item, done: !item.done } : item
    );
    updateKeepNote({ ...note, checklist: updatedChecklist });
    setKeepNotes(getKeepNotes());
    triggerHaptic('light');
  };

  const handleSendNoteToChat = (note: KeepNote) => {
    setChatInput(`📌 *${note.title}*\n\n${note.body}`);
    setActiveTab('chat');
    triggerHaptic('medium');
  };

  const handleLoadNoteToCreator = (note: KeepNote) => {
    setActivePrompt({
      id: note.id,
      title: note.title,
      category: 'Prompt Engineering',
      tags: note.tags,
      template: note.body,
      example: '',
      notes: `Imported from Google Keep Note (${note.title})`,
    });
    setCurrentScreen('creator');
    triggerHaptic('medium');
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerHaptic('success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-[max(86px,calc(env(safe-area-inset-bottom,0px)+86px))] animate-fade-in h-full flex flex-col gap-4 sm:gap-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 flex flex-col gap-3.5 border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex justify-between items-center gap-2">
          <div>
            <h1 className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60">
              Google Workspace Hub
            </h1>
            <p className="text-lg sm:text-xl font-serif italic text-[var(--color-neu-accent)] mt-0.5">
              Google Chat &amp; Google Keep
            </p>
          </div>
          <GoogleAuthButton 
            user={user} 
            isLoading={isAuthLoading} 
            onSignIn={handleSignIn} 
            onSignOut={handleSignOut}
            compact
          />
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-3 p-1.5 neu-pressed rounded-[18px]">
          <button
            onClick={() => { setActiveTab('chat'); triggerHaptic('light'); }}
            className={`py-2.5 rounded-[14px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeTab === 'chat'
                ? 'neu-flat text-[var(--color-neu-accent)]'
                : 'text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
            }`}
          >
            <MessageSquare size={16} />
            Google Chat
          </button>
          <button
            onClick={() => { setActiveTab('keep'); triggerHaptic('light'); }}
            className={`py-2.5 rounded-[14px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeTab === 'keep'
                ? 'neu-flat text-[var(--color-neu-accent)]'
                : 'text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
            }`}
          >
            <StickyNote size={16} />
            Google Keep
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      {activeTab === 'chat' ? (
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {!user ? (
            <div className="neu-flat rounded-[24px] p-8 flex flex-col items-center justify-center text-center gap-5 flex-1">
              <div className="w-16 h-16 rounded-[20px] neu-pressed text-[var(--color-neu-accent)] flex items-center justify-center">
                <MessageSquare size={28} />
              </div>
              <div className="max-w-xs">
                <h3 className="font-bold text-base text-[var(--color-neu-text)]">Connect Google Chat</h3>
                <p className="text-xs text-[var(--color-neu-text-light)] mt-1.5 leading-relaxed">
                  Sign in with permission to browse your Google Chat spaces, send prompts, and collaborate with your team.
                </p>
              </div>
              <GoogleAuthButton 
                user={user} 
                isLoading={isAuthLoading} 
                onSignIn={handleSignIn} 
                onSignOut={handleSignOut}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-5 overflow-hidden">
              {/* Space Selector & Controls */}
              <div className="neu-flat rounded-[24px] p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-[var(--color-neu-accent)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]">
                      Active Spaces ({spaces.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={loadSpaces}
                      disabled={isLoadingSpaces}
                      title="Refresh Spaces"
                      className="neu-button p-2 rounded-xl text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]"
                    >
                      <RefreshCw size={14} className={isLoadingSpaces ? 'animate-spin' : ''} />
                    </button>
                    <button
                      onClick={() => setShowNewSpaceInput(!showNewSpaceInput)}
                      className="neu-button px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] flex items-center gap-1"
                    >
                      <Plus size={12} />
                      New Space
                    </button>
                  </div>
                </div>

                {showNewSpaceInput && (
                  <div className="flex gap-2 animate-fade-in">
                    <div className="neu-pressed rounded-[14px] px-3 py-2 flex-1">
                      <input
                        type="text"
                        placeholder="Enter space display name..."
                        className="w-full bg-transparent text-xs outline-none text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)]"
                        value={newSpaceName}
                        onChange={e => setNewSpaceName(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={initiateCreateSpace}
                      disabled={!newSpaceName.trim()}
                      className="neu-button px-4 rounded-[14px] text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] disabled:opacity-50"
                    >
                      Create
                    </button>
                  </div>
                )}

                {/* Spaces Carousel / List */}
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                  {spaces.length === 0 ? (
                    <p className="text-xs text-[var(--color-neu-text-light)] py-2">
                      {isLoadingSpaces ? 'Loading spaces...' : 'No Google Chat spaces found. Create one above!'}
                    </p>
                  ) : (
                    spaces.map(sp => (
                      <button
                        key={sp.name}
                        onClick={() => { setSelectedSpace(sp); triggerHaptic('light'); }}
                        className={`px-4 py-2.5 rounded-[16px] text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                          selectedSpace?.name === sp.name
                            ? 'neu-pressed text-[var(--color-neu-accent)]'
                            : 'neu-button text-[var(--color-neu-text-light)]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-neu-accent)] opacity-70" />
                        {sp.displayName || sp.name.replace('spaces/', 'Space ')}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="neu-flat rounded-[24px] p-5 flex-1 flex flex-col gap-3 min-h-[220px] overflow-hidden">
                <div className="flex justify-between items-center pb-2 border-b border-[var(--color-neu-shadow-dark)]/30">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)]">
                    {selectedSpace ? (selectedSpace.displayName || 'Direct Messages') : 'Select a Space'}
                  </span>
                  {selectedSpace && (
                    <button
                      onClick={() => loadMessages(selectedSpace.name)}
                      disabled={isLoadingMessages}
                      className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)] flex items-center gap-1"
                    >
                      <RefreshCw size={10} className={isLoadingMessages ? 'animate-spin' : ''} />
                      Sync
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                      <p className="text-xs text-[var(--color-neu-text-light)]">
                        {isLoadingMessages ? 'Retrieving messages...' : 'No messages found in this space. Send one below!'}
                      </p>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={msg.name || i} className="neu-pressed rounded-[16px] p-3 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)]">
                            {msg.sender?.displayName || 'User'}
                          </span>
                          {msg.createTime && (
                            <span className="text-[9px] text-[var(--color-neu-text-light)]">
                              {new Date(msg.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--color-neu-text)] whitespace-pre-wrap leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Composer */}
                <div className="flex gap-2 pt-2">
                  <div className="neu-pressed rounded-[16px] px-4 py-2.5 flex-1 flex items-center">
                    <input
                      type="text"
                      placeholder="Type message or paste compiled prompt..."
                      className="w-full bg-transparent text-xs outline-none text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)]"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          initiateSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={initiateSendMessage}
                    disabled={!chatInput.trim() || !selectedSpace}
                    className="neu-convex px-4 py-2.5 rounded-[16px] text-[var(--color-neu-accent)] flex items-center justify-center disabled:opacity-40"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Google Keep Tab */
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
          {/* Keep Studio Actions */}
          <div className="neu-flat rounded-[24px] p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold tracking-wide uppercase text-[var(--color-neu-text)]">
                  Keep Notes & Blueprints
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-neu-text-light)] mt-0.5">
                  Synchronized Knowledge Scratchpad
                </p>
              </div>
              <button
                onClick={() => setShowNoteForm(!showNoteForm)}
                className="neu-button px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] flex items-center gap-1.5"
              >
                <Plus size={14} />
                {showNoteForm ? 'Cancel' : 'New Note'}
              </button>
            </div>

            {/* Note Creation Form */}
            {showNoteForm && (
              <form onSubmit={initiateCreateKeepNote} className="neu-pressed rounded-[20px] p-5 flex flex-col gap-4 animate-fade-in">
                <input
                  type="text"
                  placeholder="Note Title (e.g., Code Refactor Blueprint)..."
                  className="w-full bg-transparent text-sm font-bold outline-none text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)]"
                  value={newNoteTitle}
                  onChange={e => setNewNoteTitle(e.target.value)}
                />
                <textarea
                  placeholder="Write note or prompt template body..."
                  rows={4}
                  className="w-full bg-transparent text-xs outline-none resize-none text-[var(--color-neu-text)] placeholder-[var(--color-neu-text-light)] leading-relaxed"
                  value={newNoteBody}
                  onChange={e => setNewNoteBody(e.target.value)}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Color:</span>
                    {(['sand', 'amber', 'lavender', 'teal'] as const).map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColor === color ? 'border-[var(--color-neu-accent)] scale-110' : 'border-transparent'
                        }`}
                        style={{
                          backgroundColor:
                            color === 'sand' ? '#E6E2D3' :
                            color === 'amber' ? '#F59E0B' :
                            color === 'lavender' ? '#EAE6F5' : '#14B8A6'
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="neu-convex px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)]"
                  >
                    Save to Keep
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keepNotes.map(note => (
              <div 
                key={note.id} 
                className="neu-flat rounded-[24px] p-5 flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)]">
                      {note.category || 'Note'}
                    </span>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopyText(`${note.title}\n\n${note.body}`, note.id)}
                        title="Copy note"
                        className="neu-button p-2 rounded-xl text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)]"
                      >
                        {copiedId === note.id ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      </button>
                      <button
                        onClick={() => initiateDeleteKeepNote(note.id, note.title)}
                        title="Delete note"
                        className="neu-button p-2 rounded-xl text-[var(--color-neu-text-light)] hover:text-rose-500"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-[var(--color-neu-text)] leading-tight">
                    {note.title}
                  </h4>
                  <p className="text-xs text-[var(--color-neu-text)] opacity-80 whitespace-pre-wrap leading-relaxed">
                    {note.body}
                  </p>

                  {/* Checklist if present */}
                  {note.checklist && note.checklist.length > 0 && (
                    <div className="neu-pressed rounded-[16px] p-3 flex flex-col gap-2 mt-1">
                      {note.checklist.map(item => (
                        <div 
                          key={item.id} 
                          onClick={() => toggleChecklistItem(note, item.id)}
                          className="flex items-center gap-2.5 cursor-pointer text-xs select-none"
                        >
                          {item.done ? (
                            <CheckSquare size={14} className="text-[var(--color-neu-accent)]" />
                          ) : (
                            <Square size={14} className="text-[var(--color-neu-text-light)]" />
                          )}
                          <span className={item.done ? 'line-through opacity-50' : 'text-[var(--color-neu-text)]'}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Bridges */}
                <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-neu-shadow-dark)]/30">
                  <button
                    onClick={() => handleLoadNoteToCreator(note)}
                    className="neu-button flex-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-accent)] flex items-center justify-center gap-1"
                  >
                    <Sparkles size={11} />
                    Load in Creator
                  </button>
                  <button
                    onClick={() => handleSendNoteToChat(note)}
                    className="neu-button flex-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest text-[var(--color-neu-text-light)] flex items-center justify-center gap-1"
                  >
                    <MessageSquare size={11} />
                    Send to Chat
                  </button>
                  <button
                    onClick={() => exportToGoogleKeepWeb(note.title, note.body)}
                    title="Open in Google Keep Web"
                    className="neu-button p-2 rounded-xl text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-accent)]"
                  >
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory User Confirmation Modal for Destructive & Mutating Ops */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        description={modalConfig.description}
        details={modalConfig.details}
        confirmLabel={modalConfig.confirmLabel}
        isDestructive={modalConfig.isDestructive}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
