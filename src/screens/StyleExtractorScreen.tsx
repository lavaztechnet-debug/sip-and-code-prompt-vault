import React, { useState, useRef, useEffect } from 'react';
import { useVault } from '../context/VaultContext';
import { triggerHaptic } from '../utils/haptics';
import { 
  extractStyleDNAFromImage, 
  styleDnaToVaultTheme, 
  SAMPLE_STYLE_PRESETS, 
  StyleDNA, 
  StylePresetSample,
  ExtractedColor,
  rgbToHex,
  rgbToHsl,
  getColorName
} from '../services/styleExtractor';
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Palette, 
  Layers, 
  Sun, 
  Download, 
  Eye, 
  Sliders, 
  Code, 
  Compass, 
  Zap, 
  CheckCircle2, 
  FileCode, 
  RotateCw, 
  ClipboardCheck, 
  BookmarkPlus,
  Pipette,
  Maximize2
} from 'lucide-react';
import { Prompt } from '../types';

export const StyleExtractorScreen: React.FC = () => {
  const { addPrompt, updateCustomThemeColors, activeTheme, setCurrentScreen } = useVault();
  
  const [imageSrc, setImageSrc] = useState<string>(SAMPLE_STYLE_PRESETS[0].svgDataUri);
  const [activePresetId, setActivePresetId] = useState<string>(SAMPLE_STYLE_PRESETS[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [styleDNA, setStyleDNA] = useState<StyleDNA | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeExportTab, setActiveExportTab] = useState<'prompt' | 'tailwind' | 'kotlin' | 'json'>('prompt');
  const [appliedThemeFeedback, setAppliedThemeFeedback] = useState<boolean>(false);
  const [savedPromptFeedback, setSavedPromptFeedback] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Interactive Eyedropper state
  const [hoverColor, setHoverColor] = useState<{ hex: string; rgb: string; name: string } | null>(null);
  const [isEyedropperActive, setIsEyedropperActive] = useState<boolean>(false);
  const [customAddedColors, setCustomAddedColors] = useState<ExtractedColor[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);

  // Analyze default image on mount
  useEffect(() => {
    handleAnalyze(SAMPLE_STYLE_PRESETS[0].svgDataUri);
  }, []);

  const handleAnalyze = async (src: string) => {
    setIsAnalyzing(true);
    triggerHaptic('medium');
    try {
      const dna = await extractStyleDNAFromImage(src);
      setStyleDNA(dna);
      setCustomAddedColors([]);
    } catch (err) {
      console.error('Failed to extract style DNA:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageFile(file);
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImageSrc(dataUrl);
        setActivePresetId('');
        handleAnalyze(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

  const handlePasteClipboard = async () => {
    triggerHaptic('light');
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          for (const type of item.types) {
            if (type.startsWith('image/')) {
              const blob = await item.getType(type);
              const reader = new FileReader();
              reader.onload = (ev) => {
                const dataUrl = ev.target?.result as string;
                if (dataUrl) {
                  setImageSrc(dataUrl);
                  setActivePresetId('');
                  handleAnalyze(dataUrl);
                }
              };
              reader.readAsDataURL(blob);
              return;
            }
          }
        }
      }
      alert('No image found on clipboard. Please copy an image or drag & drop a file.');
    } catch (err) {
      console.warn('Clipboard read error:', err);
      alert('Clipboard access permission is required to paste images.');
    }
  };

  const handleSelectPreset = (preset: StylePresetSample) => {
    triggerHaptic('selection');
    setActivePresetId(preset.id);
    setImageSrc(preset.svgDataUri);
    handleAnalyze(preset.svgDataUri);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    triggerHaptic('success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleApplyAsAppTheme = () => {
    if (!styleDNA) return;
    triggerHaptic('success');
    const vaultTheme = styleDnaToVaultTheme(styleDNA);
    updateCustomThemeColors(vaultTheme.colors);
    setAppliedThemeFeedback(true);
    setTimeout(() => setAppliedThemeFeedback(false), 3000);
  };

  const handleSaveToVault = () => {
    if (!styleDNA) return;
    triggerHaptic('success');
    const newPrompt: Prompt = {
      id: `style_dna_${Date.now()}`,
      title: `${styleDNA.archetypeTag} Visual System Prompt`,
      category: 'Image & Gallery',
      tags: ['Visual Style DNA', 'Design System', styleDNA.archetypeTag, 'Midjourney'],
      template: `A high-fidelity mobile application interface for [SUBJECT], designed in the authentic ${styleDNA.archetype} aesthetic. Featuring ${styleDNA.surfaceFinish}, deep ambient lighting 135-degree top-left angle, dual-offset soft shadows ([LIGHT_SHADOW] and [DARK_SHADOW]), high-contrast typography, and [ACCENT_COLOR] primary CTA buttons. 8k resolution, modern dribbble showcase.`,
      example: styleDNA.aiPromptBlueprint,
      notes: `Extracted from Visual Style DNA with ${styleDNA.contrastRatio} WCAG ${styleDNA.wcagCompliance} optical readability score. Primary background: ${styleDNA.colors[0]?.hex || '#EEF1F8'}.`,
      isFavorite: true
    };
    addPrompt(newPrompt);
    setSavedPromptFeedback(true);
    setTimeout(() => setSavedPromptFeedback(false), 3000);
  };

  // Interactive Eyedropper on Canvas
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isEyedropperActive && !e.buttons) return;
    const img = imageElementRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * img.naturalWidth);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * img.naturalHeight);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);
      const name = getColorName(hsl);
      setHoverColor({
        hex,
        rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
        name
      });
    } catch (e) {}
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (hoverColor) {
      triggerHaptic('selection');
      const newColor: ExtractedColor = {
        hex: hoverColor.hex,
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
        role: 'accent',
        name: `Sampled: ${hoverColor.name}`,
        percentage: 10,
        isDark: false
      };
      setCustomAddedColors(prev => [newColor, ...prev.slice(0, 3)]);
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-[max(14px,calc(env(safe-area-inset-top,0px)+14px))] pb-4 sm:pb-6 animate-fade-in flex flex-col gap-4 sm:gap-6 w-full">
      {/* Header Banner */}
      <header className="neu-flat rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 flex flex-col justify-between relative border border-[var(--color-neu-shadow-light)]/40">
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[16px] neu-convex flex items-center justify-center text-[var(--color-neu-accent)] shrink-0 shadow-md">
              <Eye size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                  Visual Intelligence Core
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-mono neu-pressed text-[var(--color-neu-accent)] font-bold">
                  HIGH PRIORITY
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-bold text-[var(--color-neu-text)] mt-0.5 leading-tight">
                Multimodal Visual Style DNA &amp; Design System Extractor
              </h1>
              <p className="text-[10.5px] sm:text-xs text-[var(--color-neu-text-light)] mt-0.5 leading-tight">
                Upload any UI screenshot or asset to extract semantic color palettes, lighting vectors, and design tokens.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Sample Presets Carousel */}
        <div className="mt-4 pt-3 border-t border-[var(--color-neu-shadow-dark)]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-neu-text-light)]">
              Instant Sample Gallery:
            </span>
            <span className="text-[8.5px] font-mono text-[var(--color-neu-accent)]">
              6 Curated Specs
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {SAMPLE_STYLE_PRESETS.map(preset => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-[9.5px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'neu-pressed text-[var(--color-neu-accent)] font-bold scale-[1.02]'
                      : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
                  }`}
                >
                  <Sparkles size={11} className={isSelected ? 'text-[var(--color-neu-accent)]' : 'opacity-60'} />
                  <span>{preset.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Upload Dropzone & Interactive Image Workspace */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Image Canvas & Dropzone */}
        <div className="md:col-span-6 flex flex-col gap-3">
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`neu-flat rounded-[24px] p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all border ${
              isDragging 
                ? 'border-[var(--color-neu-accent)] bg-[var(--color-neu-accent)]/5 scale-[1.01]' 
                : 'border-[var(--color-neu-shadow-light)]/40'
            }`}
          >
            {/* Image Preview / Canvas */}
            <div className="w-full relative rounded-2xl overflow-hidden neu-pressed p-2 flex items-center justify-center bg-black/5 min-h-[220px]">
              {imageSrc ? (
                <img
                  ref={imageElementRef}
                  src={imageSrc}
                  alt="Extracted Visual UI Asset"
                  onMouseMove={handleCanvasMouseMove}
                  onClick={handleCanvasClick}
                  className={`max-h-[240px] w-auto max-w-full object-contain rounded-xl transition-opacity ${
                    isAnalyzing ? 'opacity-40 animate-pulse' : 'opacity-100'
                  } ${isEyedropperActive ? 'cursor-crosshair' : 'cursor-default'}`}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[var(--color-neu-text-light)] py-8">
                  <ImageIcon size={36} className="opacity-40 mb-2" />
                  <p className="text-xs font-bold">No image loaded</p>
                </div>
              )}

              {/* Eyedropper Live Loupe Tooltip */}
              {hoverColor && isEyedropperActive && (
                <div className="absolute top-3 left-3 neu-flat rounded-xl p-2 flex items-center gap-2 border border-white/40 shadow-xl backdrop-blur-md pointer-events-none z-20">
                  <div 
                    className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                    style={{ backgroundColor: hoverColor.hex }}
                  />
                  <div className="text-[9px] font-mono leading-tight">
                    <p className="font-bold text-[var(--color-neu-text)]">{hoverColor.hex}</p>
                    <p className="text-[8px] text-[var(--color-neu-text-light)]">{hoverColor.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Buttons & Tools Row */}
            <div className="flex items-center justify-between w-full mt-3 gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => {
                  triggerHaptic('light');
                  fileInputRef.current?.click();
                }}
                className="neu-button flex-1 py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Upload size={13} />
                <span>Upload Image</span>
              </button>

              <button
                onClick={handlePasteClipboard}
                title="Paste screenshot from clipboard"
                className="neu-button py-2 px-3 rounded-xl text-[10px] font-bold text-[var(--color-neu-text)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ClipboardCheck size={13} />
                <span className="hidden sm:inline">Paste</span>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('selection');
                  setIsEyedropperActive(!isEyedropperActive);
                }}
                className={`py-2 px-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                  isEyedropperActive 
                    ? 'neu-pressed text-[var(--color-neu-accent)] font-bold' 
                    : 'neu-button text-[var(--color-neu-text-light)] hover:text-[var(--color-neu-text)]'
                }`}
                title="Toggle Interactive Pixel Eyedropper"
              >
                <Pipette size={13} />
                <span className="hidden sm:inline">Eyedropper</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Style DNA Intelligence Overview */}
        <div className="md:col-span-6 flex flex-col gap-3">
          {styleDNA ? (
            <div className="neu-flat rounded-[24px] p-5 flex flex-col justify-between gap-4 border border-[var(--color-neu-shadow-light)]/40 h-full">
              {/* Primary Archetype Badge */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[8.5px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                    Identified Archetype
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono neu-pressed text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> {styleDNA.confidence}% Match
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[var(--color-neu-text)] mt-1">
                  {styleDNA.archetype}
                </h2>
                <p className="text-[11px] text-[var(--color-neu-text-light)] mt-1 leading-relaxed">
                  {styleDNA.summary}
                </p>
              </div>

              {/* Design Matrix Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="neu-pressed p-2.5 rounded-xl text-center">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-[var(--color-neu-text-light)] block">
                    3D Depth
                  </span>
                  <span className="text-[11px] font-bold text-[var(--color-neu-accent)]">
                    {styleDNA.depthLevel}
                  </span>
                </div>

                <div className="neu-pressed p-2.5 rounded-xl text-center">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-[var(--color-neu-text-light)] block">
                    Surface Finish
                  </span>
                  <span className="text-[10px] font-bold text-[var(--color-neu-text)] truncate block" title={styleDNA.surfaceFinish}>
                    {styleDNA.surfaceFinish.split(' ')[0]} Finish
                  </span>
                </div>

                <div className="neu-pressed p-2.5 rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-[var(--color-neu-text-light)] block">
                    WCAG Readability
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-600">
                    {styleDNA.wcagCompliance} ({styleDNA.contrastRatio})
                  </span>
                </div>
              </div>

              {/* Instant Action Bridges */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[var(--color-neu-shadow-dark)]/20">
                <button
                  onClick={handleApplyAsAppTheme}
                  className="neu-button flex-1 py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-accent)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 hover:shadow-md"
                >
                  {appliedThemeFeedback ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-600">Applied as Live Theme!</span>
                    </>
                  ) : (
                    <>
                      <Palette size={13} />
                      <span>Apply as App Theme</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSaveToVault}
                  className="neu-convex py-2.5 px-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-neu-text)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 hover:shadow-md"
                >
                  {savedPromptFeedback ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-600">Saved to Vault!</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus size={13} />
                      <span>Save Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="neu-flat rounded-[24px] p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
              <RotateCw size={24} className="animate-spin text-[var(--color-neu-accent)] mb-2" />
              <p className="text-xs font-bold text-[var(--color-neu-text)]">Extracting Visual Style DNA...</p>
            </div>
          )}
        </div>
      </section>

      {/* Extracted Semantic Color Palette */}
      {styleDNA && (
        <section className="neu-flat rounded-[24px] p-5 flex flex-col gap-3 border border-[var(--color-neu-shadow-light)]/40">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[8.5px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Semantic Palette &amp; Contrast Specs
              </span>
              <h3 className="text-sm font-bold text-[var(--color-neu-text)]">
                Extracted Color Hierarchy ({styleDNA.colorHarmony} Harmony)
              </h3>
            </div>
            <span className="text-[9px] font-mono text-[var(--color-neu-text-light)]">
              {styleDNA.colorTemperature} Spectrum
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-1">
            {[...styleDNA.colors, ...customAddedColors].map((col, idx) => {
              const isCopied = copiedKey === `color_${idx}`;
              return (
                <div
                  key={`${col.hex}_${idx}`}
                  onClick={() => handleCopy(col.hex, `color_${idx}`)}
                  className="neu-button p-3 rounded-2xl flex flex-col items-start gap-2 text-left cursor-pointer group active:scale-95 relative"
                >
                  <div 
                    className="w-full h-10 rounded-xl shadow-inner border border-black/10 flex items-center justify-end p-1.5"
                    style={{ backgroundColor: col.hex }}
                  >
                    <span className="text-[9px] font-mono px-1 py-0.5 rounded-md bg-black/40 text-white font-bold backdrop-blur-xs">
                      {col.percentage}%
                    </span>
                  </div>
                  <div className="w-full min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[var(--color-neu-text)] truncate">
                        {col.hex}
                      </span>
                      {isCopied ? (
                        <Check size={11} className="text-emerald-500 shrink-0" />
                      ) : (
                        <Copy size={11} className="text-[var(--color-neu-text-light)] opacity-40 group-hover:opacity-100 shrink-0" />
                      )}
                    </div>
                    <span className="text-[8.5px] text-[var(--color-neu-text-light)] capitalize truncate block">
                      {col.role} • {col.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Live Interactive Component Sandbox Rendered in Extracted DNA */}
      {styleDNA && (
        <section className="neu-flat rounded-[24px] p-5 flex flex-col gap-4 border border-[var(--color-neu-shadow-light)]/40">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[8.5px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Live Interactive Sandbox
              </span>
              <h3 className="text-sm font-bold text-[var(--color-neu-text)]">
                Component Rendered in Extracted Design DNA
              </h3>
            </div>
            <span className="text-[9px] font-bold text-[var(--color-neu-accent)] uppercase">
              Tactile Verification
            </span>
          </div>

          <div 
            className="p-5 rounded-2xl neu-pressed flex flex-wrap items-center justify-around gap-4"
            style={{ 
              backgroundColor: styleDNA.colors.find(c => c.role === 'background')?.hex || 'var(--color-neu-bg)'
            }}
          >
            {/* Interactive Tactile Button */}
            <button
              onClick={() => triggerHaptic('medium')}
              className="neu-button px-5 py-2.5 rounded-2xl text-xs font-bold transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              style={{
                color: styleDNA.colors.find(c => c.role === 'accent')?.hex || 'var(--color-neu-accent)'
              }}
            >
              <Zap size={14} />
              <span>Extracted Button</span>
            </button>

            {/* Recessed Pill Chip */}
            <div 
              className="neu-pressed px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
              style={{
                color: styleDNA.colors.find(c => c.role === 'text')?.hex || 'var(--color-neu-text)'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: styleDNA.colors.find(c => c.role === 'accent')?.hex || '#F59E0B' }}
              />
              <span>Pill Token: {styleDNA.tokens.borderRadius.pill}</span>
            </div>

            {/* Convex Mini Card */}
            <div 
              className="neu-convex p-3.5 rounded-2xl flex items-center gap-3 shadow-md"
              style={{
                color: styleDNA.colors.find(c => c.role === 'text')?.hex || 'var(--color-neu-text)'
              }}
            >
              <div 
                className="w-7 h-7 rounded-xl neu-pressed flex items-center justify-center font-bold text-xs"
                style={{ color: styleDNA.colors.find(c => c.role === 'accent')?.hex }}
              >
                3D
              </div>
              <div className="text-[10.5px] leading-tight">
                <p className="font-bold">{styleDNA.depthLevel}</p>
                <p className="text-[9px] opacity-75">Shadow: {styleDNA.tokens.shadows.flat.slice(0, 18)}...</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Multi-Format Export Hub */}
      {styleDNA && (
        <section className="neu-flat rounded-[24px] p-5 flex flex-col gap-3 border border-[var(--color-neu-shadow-light)]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[8.5px] uppercase tracking-widest font-bold text-[var(--color-neu-accent)]">
                Production Code &amp; Blueprint Generator
              </span>
              <h3 className="text-sm font-bold text-[var(--color-neu-text)]">
                Multi-Platform Design System Exports
              </h3>
            </div>

            {/* Export Tabs */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveExportTab('prompt')}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  activeExportTab === 'prompt' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-button text-[var(--color-neu-text-light)]'
                }`}
              >
                Midjourney
              </button>
              <button
                onClick={() => setActiveExportTab('tailwind')}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  activeExportTab === 'tailwind' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-button text-[var(--color-neu-text-light)]'
                }`}
              >
                Tailwind CSS
              </button>
              <button
                onClick={() => setActiveExportTab('kotlin')}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  activeExportTab === 'kotlin' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-button text-[var(--color-neu-text-light)]'
                }`}
              >
                Jetpack Compose
              </button>
              <button
                onClick={() => setActiveExportTab('json')}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  activeExportTab === 'json' ? 'neu-pressed text-[var(--color-neu-accent)]' : 'neu-button text-[var(--color-neu-text-light)]'
                }`}
              >
                Tokens JSON
              </button>
            </div>
          </div>

          {/* Export Code Container */}
          <div className="relative">
            <pre className="neu-pressed rounded-2xl p-4 text-[10.5px] font-mono overflow-x-auto text-[var(--color-neu-text)] leading-relaxed max-h-56 no-scrollbar">
              {activeExportTab === 'prompt' && styleDNA.aiPromptBlueprint}
              {activeExportTab === 'tailwind' && styleDNA.tailwindConfig}
              {activeExportTab === 'kotlin' && styleDNA.jetpackComposeSnippet}
              {activeExportTab === 'json' && styleDNA.designTokensJson}
            </pre>

            <button
              onClick={() => {
                const text = 
                  activeExportTab === 'prompt' ? styleDNA.aiPromptBlueprint :
                  activeExportTab === 'tailwind' ? styleDNA.tailwindConfig :
                  activeExportTab === 'kotlin' ? styleDNA.jetpackComposeSnippet :
                  styleDNA.designTokensJson;
                handleCopy(text, 'active_tab_copy');
              }}
              className="absolute top-3 right-3 neu-button p-2 rounded-xl text-[var(--color-neu-accent)] cursor-pointer active:scale-95 shadow-md"
              title="Copy code snippet to clipboard"
            >
              {copiedKey === 'active_tab_copy' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
